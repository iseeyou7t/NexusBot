// Configuration
const BOT_CLIENT_ID = "1321862179418411150";
const PERMISSIONS = "8"; // Administrator permissions
const REDIRECT_URI = "http://localhost:3000/auth/discord/callback";
const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${BOT_CLIENT_ID}&permissions=${PERMISSIONS}&scope=bot%20applications.commands&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

document.getElementById('inviteBotBtn').addEventListener('click', async () => {
    try {
        // First check if user is logged in
        const userResponse = await fetch('/api/user');
        if (!userResponse.ok) {
            // If not logged in, redirect to Discord OAuth
            window.location.href = '/auth/discord';
            return;
        }

        // If logged in, show server selection
        showServerSelection();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to initiate bot invite');
    }
});

async function showServerSelection() {
    try {
        const response = await fetch('/api/user/servers');
        const servers = await response.json();
        
        const serverList = document.getElementById('serverList');
        serverList.innerHTML = '';
        
        servers.forEach(server => {
            if (!server.botInServer) {
                const serverBtn = document.createElement('button');
                serverBtn.className = 'server-btn';
                serverBtn.innerHTML = `
                    <img src="${server.icon ? 
                        `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=64` : 
                        'https://cdn.discordapp.com/embed/avatars/0.png'}" 
                        alt="${server.name}" class="server-icon">
                    <span>${server.name}</span>
                `;
                serverBtn.onclick = () => inviteToServer(server.id);
                serverList.appendChild(serverBtn);
            }
        });
        
        document.getElementById('serverSelection').classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching servers:', error);
        // Fallback to generic invite if server list fails
        window.open(INVITE_URL, '_blank');
    }
}

function inviteToServer(guildId) {
    window.open(`${INVITE_URL}&guild_id=${guildId}`, '_blank');
    
    // Optional: Start checking for bot addition
    startBotAdditionCheck(guildId);
}

function startBotAdditionCheck(guildId) {
    const checkInterval = setInterval(async () => {
        try {
            const response = await fetch(`/api/check-bot?guild_id=${guildId}`);
            const data = await response.json();
            
            if (data.botAdded) {
                clearInterval(checkInterval);
                alert('Bot successfully added to your server!');
                window.location.reload();
            }
        } catch (error) {
            console.error('Check failed:', error);
            clearInterval(checkInterval);
        }
    }, 3000); // Check every 3 seconds
}
