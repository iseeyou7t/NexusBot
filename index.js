require('dotenv').config();
const express = require('express');
const path = require('path');
const Discord = require('discord.js');
const passport = require('passport');
const session = require('express-session');
const DiscordStrategy = require('passport-discord').Strategy;
const MongoStore = require('connect-mongo');

// Initialize Express app
const app = express();

// Discord.js Client
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessages
    ]
});

// Connect to Discord
client.login(process.env.DISCORD_BOT_TOKEN)
    .then(() => console.log('Discord bot logged in'))
    .catch(err => console.error('Discord login error:', err));

// Database connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        secure: process.env.NODE_ENV === 'production'
    }
}));

// Passport configuration
passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'guilds']
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback',
    passport.authenticate('discord', {
        failureRedirect: '/',
        successRedirect: '/dashboard'
    })
);

app.get('/api/user', (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: 'Unauthorized' });
    res.json(req.user);
});

app.get('/api/user/servers', async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: 'Unauthorized' });
    
    try {
        const guilds = await client.guilds.fetch();
        const userGuilds = req.user.guilds.map(g => g.id);
        
        const servers = await Promise.all(guilds.map(async guild => {
            const fullGuild = await guild.fetch();
            return {
                id: guild.id,
                name: guild.name,
                icon: guild.icon,
                botInServer: userGuilds.includes(guild.id),
                memberCount: fullGuild.memberCount
            };
        }));
        
        res.json(servers);
    } catch (error) {
        console.error('Error fetching servers:', error);
        res.status(500).json({ error: 'Failed to fetch servers' });
    }
});

app.get('/api/check-bot', async (req, res) => {
    try {
        const guildId = req.query.guild_id;
        const guild = await client.guilds.fetch(guildId).catch(() => null);
        res.json({ botAdded: !!guild });
    } catch (error) {
        res.status(500).json({ error: 'Check failed' });
    }
});

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
