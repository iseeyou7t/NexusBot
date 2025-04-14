/* ================ Tailwind Directives ================ */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ================ Custom Fonts ================ */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* ================ Base Styles ================ */
@layer base {
    html {
        @apply h-full;
        font-family: 'Inter', system-ui, sans-serif;
        scroll-behavior: smooth;
    }
    
    body {
        @apply bg-gray-900 text-gray-100 antialiased h-full;
        background-image: 
            radial-gradient(at 20% 30%, rgba(139, 92, 246, 0.1) 0, transparent 50%),
            radial-gradient(at 80% 70%, rgba(59, 130, 246, 0.1) 0, transparent 50%);
    }
    
    #app {
        @apply min-h-full flex flex-col;
    }
}

/* ================ Custom Components ================ */
@layer components {
    /* Glass Morphism Effect */
    .glass-panel {
        @apply bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg;
        backdrop-filter: blur(16px) saturate(180%);
    }
    
    /* Buttons */
    .btn {
        @apply inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900;
    }
    
    .btn-primary {
        @apply bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 shadow-lg hover:shadow-purple-500/20 hover:from-purple-600/90 hover:to-blue-600/90 focus:ring-purple-500;
    }
    
    .btn-secondary {
        @apply bg-gray-700 hover:bg-gray-600 text-gray-100 px-5 py-2.5 focus:ring-gray-500;
    }
    
    /* Inputs */
    .input {
        @apply bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all w-full;
    }
    
    /* Toggle Switches */
    .toggle {
        @apply relative inline-flex items-center cursor-pointer;
    }
    
    .toggle-input {
        @apply sr-only peer;
    }
    
    .toggle-slider {
        @apply w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600;
    }
    
    /* Cards */
    .card {
        @apply glass-panel rounded-xl overflow-hidden transition-all hover:shadow-xl hover:border-purple-400/30;
    }
    
    /* Badges */
    .badge {
        @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
    }
    
    .badge-primary {
        @apply bg-purple-500/20 text-purple-400;
    }
    
    .badge-success {
        @apply bg-green-500/20 text-green-400;
    }
    
    .badge-danger {
        @apply bg-red-500/20 text-red-400;
    }
    
    /* Tables */
    .table {
        @apply min-w-full divide-y divide-gray-700/50;
    }
    
    .table th {
        @apply px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider bg-gray-900/50;
    }
    
    .table td {
        @apply px-4 py-3 whitespace-nowrap text-sm;
    }
    
    /* Animations */
    .animate-float {
        animation: float 6s ease-in-out infinite;
    }
    
    .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
}

/* ================ Custom Utilities ================ */
@layer utilities {
    /* Text Gradients */
    .text-gradient {
        @apply bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500;
    }
    
    /* Custom Scrollbar */
    .scrollbar-thin::-webkit-scrollbar {
        @apply w-2 h-2;
    }
    
    .scrollbar-thin::-webkit-scrollbar-track {
        @apply bg-gray-800;
    }
    
    .scrollbar-thin::-webkit-scrollbar-thumb {
        @apply bg-gray-600 rounded-full hover:bg-gray-500;
    }
    
    /* Animation Keyframes */
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    /* Tab System */
    .tab-btn.active {
        @apply border-b-2 border-purple-500 bg-gray-800/30 text-purple-400;
    }
    
    .tab-panel {
        animation: fadeIn 0.3s ease-out;
    }
}

/* ================ Custom Styles ================ */
/* Noise Texture for Background */
.noise-bg::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.10'/%3E%3C/svg%3E");
    pointer-events: none;
}

/* Glow Effects */
.glow-effect {
    position: relative;
}

.glow-effect::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(168, 85, 247, 0.3) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.glow-effect:hover::after {
    opacity: 1;
}

/* Custom Checkboxes */
.checkbox-custom {
    @apply h-5 w-5 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-800;
}

/* Tooltips */
[data-tooltip] {
    @apply relative;
}

[data-tooltip]::after {
    @apply absolute z-50 hidden px-3 py-1 text-sm bg-gray-700 text-white rounded whitespace-nowrap;
    content: attr(data-tooltip);
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 5px;
}

[data-tooltip]:hover::after {
    @apply block;
}
