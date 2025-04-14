// Configuration
const BOT_CLIENT_ID = "1321862179418411150";
const PERMISSIONS = "8"; // Administrator permissions
const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=1321862179418411150&permissions=8&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fcallback&integration_type=0&scope=identify+connections+guilds.join+guilds.channels.read+bot+rpc.notifications.read+rpc.voice.read+rpc+gdm.join+guilds.members.read+guilds+email+rpc.voice.write+rpc.video.write+rpc.screenshare.write+webhook.incoming+messages.read+rpc.activities.write+rpc.screenshare.read+rpc.video.read+applications.builds.upload+applications.commands+applications.entitlements+activities.write+relationships.read+voice+role_connections.write+presences.write+dm_channels.messages.read+gateway.connect+payment_sources.country_code+sdk.social_layer+sdk.social_layer_presence+lobbies.write+account.global_name.update+openid+dm_channels.messages.write+presences.read+dm_channels.read+relationships.write+activities.invites.write+activities.read+applications.store.update+applications.builds.read`;

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
