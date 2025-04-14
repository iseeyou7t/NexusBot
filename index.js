require('dotenv').config();
const express = require('express');
const Discord = require('discord.js');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;

const app = express();
const client = new Discord.Client({
    intents: ['Guilds']
});

// Initialize Discord bot
client.login(process.env.DISCORD_BOT_TOKEN);

// Passport configuration
passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'guilds']
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

app.use(passport.initialize());

// Routes
app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/',
    successRedirect: '/'
}));

app.get('/api/user', (req, res) => {
    // In a real app, you'd check the session
    res.json({ status: 'Not implemented - use real session check' });
});

app.get('/api/user/servers', async (req, res) => {
    try {
        // This would come from the user's session in a real app
        const mockServers = [
            {
                id: '123',
                name: 'Test Server',
                icon: null,
                botInServer: false
            }
        ];
        res.json(mockServers);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
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

// Serve static files
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
