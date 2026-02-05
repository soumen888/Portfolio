const portfolioData = {
    techStack: [
        {
            type: 'CORE',
            title: 'The Engine',
            icon: 'code',
            items: [
                { name: 'Python (Data/Analysis)', delay: '0ms' },
                { name: 'Rust (Execution/Foundry)', delay: '50ms' },
                { name: 'Go (High-Concurrency)', delay: '100ms' }
            ],
            delay: '100ms',
            class: 'border-primary/20 bg-primary/5'
        },
        {
            type: 'AUTO-PILOT',
            title: 'Automated Pipelines',
            icon: 'psychology',
            desc: 'Leveraging cloud-native workflows for maximum engineering velocity. Manual labor is a bug.',
            tags: ['PyTorch', 'Agents', 'Jupyter'],
            delay: '200ms',
            class: 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-surface-dark'
        },
        {
            type: 'LEGACY WASTE',
            title: 'Non-Skills (Table Stakes)',
            icon: 'desk',
            desc: '"If you\'re listing these as skills, you\'re not an engineer, you\'re a clerk."',
            legacyItems: [
                { name: 'MS Office / Excel', label: 'CLERICAL' },
                { name: 'G-Suite / Slides', label: 'BASELINE' },
                { name: 'Zoom / Meetings', label: 'HIGH NOISE' },
                { name: 'Slow Typing...', label: 'ZERO ALPHA' }
            ],
            delay: '300ms',
            class: 'border-volatility-red/20 bg-volatility-red/5 md:col-span-2',
            isLegacy: true
        }
    ],
    markets: [
        { name: 'DEX', icon: 'account_balance_wallet' },
        { name: 'Forex', icon: 'public' },
        { name: 'On-chain Analysis', icon: 'dataset' },
        { name: 'CEX & Stocks', icon: 'monitoring' },
        { name: 'FNO', icon: 'currency_exchange' },
        { name: 'Commodities', icon: 'oil_barrel' }
    ],
    projects: [
        {
            title: 'Qrypton.trade',
            subtitle: 'DEX Aggregator & Core System',
            desc: 'Architected a high-performance DEX aggregator with deep Jupiter integration. Optimized routing logic to reduce slippage and transaction costs by 10 bps.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt1ryuzzMwF_XuT_xZw9z1fN2xQEhTpf6LMlKNZJnS8O1M5R7K90vZ5X3RYGuM-rbcYSQh3gzB1mrNfhfx6XXKC0UpwAZ9uxIIBNX4g7URt-1mChRdSmxCiPHO7FRqXw79Zym3pzf1o1gQuWSJ1U5F_Xki4nX7oOzHsNTi6QPcaPDfjOHWQiY899mnVLpUXyyH-N2tglvlpqycwYxyUTcNIoozt0FbBKpWpEUDNDycR5PsdPABaXB2dMMo-z9p-O2YJzWp4Li6oNs',
            badge: 'ARCHITECT',
            tags: ['Jupiter', 'Helius', 'Alchemy', 'Chainstack', 'Quicknode', 'Rust']
        },
        {
            title: 'Density Exchange',
            subtitle: 'On-chain Research & Intelligence',
            desc: 'Research focused on on-chain behavioral analysis. Built automated data pipelines using Python/Jupyter.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCeea3GrztMf9CV3ESyw22kL9IUDmRl9Z-gF6HkIfmdNF0e-E661LVk-3X0d1-kH9HKLsqKkFOfGnKN333U43BZHNwc9jqRywBcisVo5MYLRwNZbHYu1ykLJstNQv64j09AjVW9JtujhAxDIII1Z3ZogwegE6Nkypj-jvQ9MsPUsnIfdEmlU0xQz9Y5OfwecOO8RnWnE3wOUViFF--xZCLrz3hQrTMbmip1QOAZIcSbaFX6D1DLVeK0M1mL8ZH9DVdp2NSvHF9oj0',
            badge: 'RESEARCH',
            tags: ['Arkham', 'Jupyter', 'Etherscan']
        }
    ]
};
