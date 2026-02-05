function renderTechStack() {
    const container = document.getElementById('tech-stack-grid');
    if (!container) return;

    container.innerHTML = portfolioData.techStack.map(stack => {
        let content = '';
        if (stack.items) {
            content = `
                <ul class="space-y-3 font-mono text-sm text-zinc-600 dark:text-zinc-300">
                    ${stack.items.map(item => `
                        <li class="flex items-center gap-2 text-primary group-hover:translate-x-1 transition-transform" style="transition-delay: ${item.delay}">
                            <span class="material-symbols-outlined text-xs">check_circle</span>
                            <span class="text-zinc-700 dark:text-zinc-300">${item.name}</span>
                        </li>
                    `).join('')}
                </ul>`;
        } else if (stack.desc && !stack.isLegacy) {
            content = `
                <p class="text-zinc-500 dark:text-zinc-400 text-xs font-mono mb-4 leading-relaxed">${stack.desc}</p>
                <div class="flex flex-wrap gap-2">
                    ${stack.tags.map(tag => `<span class="text-[10px] font-mono text-primary px-2 py-1 rounded bg-primary/10">${tag}</span>`).join('')}
                </div>`;
        } else if (stack.isLegacy) {
            content = `
                <p class="text-zinc-500 text-xs italic mb-4">${stack.desc}</p>
                <div class="grid grid-cols-2 gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    ${stack.legacyItems.map(item => `
                        <div class="p-3 bg-zinc-100 dark:bg-black/40 rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-between hover:border-volatility-red/30 transition-colors group/item">
                            <span class="text-[10px] font-mono text-zinc-600 dark:text-zinc-300 group-hover/item:line-through">${item.name}</span>
                            <span class="text-[8px] font-bold text-volatility-red">${item.label}</span>
                        </div>
                    `).join('')}
                </div>`;
        }

        return `
            <div class="p-6 rounded-xl border group stagger-item card-glow transition-all duration-500 hover:-translate-y-2 ${stack.class}" style="transition-delay: ${stack.delay}">
                <div class="text-primary mb-4 flex items-center justify-between">
                    <span class="material-symbols-outlined text-4xl group-hover:rotate-12 transition-transform">${stack.icon}</span>
                    <span class="text-[10px] font-bold border ${stack.isLegacy ? 'border-volatility-red text-volatility-red' : 'border-primary text-primary'} px-2 py-0.5">${stack.type}</span>
                </div>
                <h3 class="text-slate-900 dark:text-white font-bold mb-4">${stack.title}</h3>
                ${content}
            </div>`;
    }).join('');
}

function renderMarkets() {
    const container = document.getElementById('markets-grid');
    if (!container) return;

    container.innerHTML = portfolioData.markets.map(market => `
        <div class="p-4 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-surface-dark flex flex-col items-center gap-2 hover:border-primary transition-colors">
            <span class="material-symbols-outlined text-primary">${market.icon}</span>
            <span class="text-xs font-bold uppercase tracking-widest text-center">${market.name}</span>
        </div>
    `).join('');
}

function renderProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    container.innerHTML = portfolioData.projects.map(project => `
        <div class="group relative bg-white dark:bg-surface-dark rounded-xl overflow-hidden border border-zinc-200 dark:border-border-dark hover:border-primary transition-all duration-500">
            <div class="aspect-video bg-zinc-900 overflow-hidden relative">
                <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-40" src="${project.image}" />
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div class="absolute top-4 right-4 z-20">
                    <span class="bg-primary text-black text-[10px] font-bold px-2 py-1 rounded">${project.badge}</span>
                </div>
                <div class="absolute bottom-6 left-6 z-20">
                    <h3 class="text-2xl font-bold text-white uppercase">${project.title}</h3>
                    <p class="text-primary text-xs font-mono">${project.subtitle}</p>
                </div>
            </div>
            <div class="p-6 space-y-4">
                <p class="text-zinc-400 text-sm">${project.desc}</p>
                <div class="flex flex-wrap gap-2">
                    ${project.tags.map(tag => `
                        <span class="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] rounded">${tag}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

async function typeWriter(text, elementId, speed = 50) {
    const element = document.getElementById(elementId);
    if (!element) return;
    for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i);
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

async function initTerminal() {
    const cmd1 = "cat profile.json";
    const cmd2 = "run --founding-mode --ai-accelerated";

    await typeWriter(cmd1, 'terminal-cmd-1', 100);
    const cursor1 = document.getElementById('cursor-1');
    if (cursor1) cursor1.classList.add('hidden');

    const content = document.getElementById('terminal-content');
    if (content) {
        content.classList.remove('opacity-0');
        await new Promise(resolve => setTimeout(resolve, 800));
    }

    const cmd2Container = document.getElementById('terminal-cmd-2-container');
    const cursor2 = document.getElementById('cursor-2');
    if (cmd2Container) cmd2Container.classList.remove('opacity-0');
    if (cursor2) cursor2.classList.remove('hidden');
    await typeWriter(cmd2, 'terminal-cmd-2', 70);
}

function initContactForm() {
    const contactBtn = document.querySelector('button[class*="bg-primary"]');
    if (contactBtn) {
        contactBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const btn = e.target;
            btn.disabled = true;
            btn.textContent = "SEND_REQUEST...";
            btn.classList.add('animate-pulse');

            await new Promise(resolve => setTimeout(resolve, 1500));

            btn.textContent = "CONNECTED_SUCCESS";
            btn.classList.remove('animate-pulse', 'bg-primary');
            btn.classList.add('bg-zinc-700', 'text-primary');

            const formInputs = document.querySelectorAll('#contact input, #contact textarea');
            formInputs.forEach(input => {
                input.value = "";
                input.placeholder = "PACKET_RECEIVED ✓";
                input.disabled = true;
            });

            setTimeout(() => {
                btn.textContent = "INIT_CONNECT";
                btn.disabled = false;
                btn.classList.remove('bg-zinc-700', 'text-primary');
                btn.classList.add('bg-primary', 'text-black');
                formInputs.forEach(input => {
                    input.disabled = false;
                    if (input.tagName === 'INPUT') input.placeholder = "SOL / FX / EQUITY...";
                    else input.placeholder = "Define the objective...";
                });
            }, 5000);
        });
    }
}

function initScrollReveal() {
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));
}

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    function updateThemeIcon() {
        const isDark = html.classList.contains('dark');
        if (themeIcon) themeIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcon();
            if (typeof initTradingWidgets === 'function') {
                initTradingWidgets();
            }
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') html.classList.remove('dark');
    else if (savedTheme === 'dark') html.classList.add('dark');
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) html.classList.add('dark');
    else html.classList.remove('dark');
    updateThemeIcon();
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function toggleAudio() {
    const container = document.getElementById('audio-player-container');
    const audio = document.getElementById('audio-player');
    const btn = document.querySelector('button[onclick="toggleAudio()"]');

    if (container.classList.contains('hidden')) {
        container.classList.remove('hidden');
        audio.currentTime = 160; // Start at 2:40
        audio.play().catch(e => console.error("Audio play failed:", e));
        if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-sm animate-spin text-primary">settings_voice</span> SYSTEM_AUDIO : [STAGING]';
    } else {
        container.classList.add('hidden');
        audio.pause();
        if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-sm text-zinc-500">settings_voice</span> SYSTEM_AUDIO : [OFFLINE]';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        renderTechStack();
        renderMarkets();
        renderProjects();
        initTradingWidgets();
        initTerminal();
        initContactForm();
        initScrollReveal();
        initThemeToggle();
        initSmoothScroll();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});
