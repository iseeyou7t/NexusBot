// Configuration
const BOT_CLIENT_ID = "1321862179418411150";
const PERMISSIONS = "8"; // Administrator permissions
const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${BOT_CLIENT_ID}&permissions=${PERMISSIONS}&scope=bot%20applications.commands`;

document.getElementById('inviteBotBtn').addEventListener('click', () => {
    // Simple version - opens invite directly
    window.open(INVITE_URL, '_blank');
    
    // Advanced version with server selection (uncomment to use)
    // showServerSelection();
});

// Advanced server selection function
async function showServerSelection() {
    try {
        const response = await fetch('/api/user/servers');
        const servers = await response.json();
        
        const serverList = document.getElementById('serverList');
        serverList.innerHTML = '';
        
        if (servers.length === 0) {
            serverList.innerHTML = '<p>No servers available</p>';
            return;
        }
        
        servers.forEach(server => {
            const serverBtn = document.createElement('button');
            serverBtn.className = 'server-btn';
            serverBtn.innerHTML = `
                <img src="${server.icon ? 
                    `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=64` : 
                    'https://cdn.discordapp.com/embed/avatars/0.png'}" 
                    alt="${server.name}" class="server-icon">
                <span>${server.name}</span>
            `;
            serverBtn.onclick = () => {
                window.open(`${INVITE_URL}&guild_id=${server.id}`, '_blank');
            };
            serverList.appendChild(serverBtn);
        });
        
        document.getElementById('serverSelection').classList.remove('hidden');
    } catch (error) {
        console.error('Error:', error);
        // Fallback to basic invite if server list fails
        window.open(INVITE_URL, '_blank');
    }
}
