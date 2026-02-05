const widgetConfigs = {
    symbolOverview: {
        url: "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js",
        config: (isDark) => ({
            "symbols": [
                ["Google", "NASDAQ:GOOGL|1D"],
                ["Microsoft", "NASDAQ:MSFT|1D"],
                ["OANDA:XAUUSD|1D"],
                ["OANDA:XAGUSD|1D"],
                ["INDEX:BTCUSD|1D"],
                ["INDEX:ETHUSD|1D"],
                ["NASDAQ:NVDA|1D"],
                ["BSE:SENSEX|1D"]
            ],
            "chartOnly": false,
            "width": "100%",
            "height": "100%",
            "locale": "en",
            "colorTheme": isDark ? "dark" : "light",
            "autosize": true,
            "showVolume": false,
            "showMA": false,
            "hideDateRanges": false,
            "hideMarketStatus": false,
            "hideSymbolLogo": false,
            "scalePosition": "right",
            "scaleMode": "Normal",
            "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
            "fontSize": "12",
            "noTimeScale": false,
            "valuesTracking": "1",
            "changeMode": "price-only",
            "chartType": "area",
            "headerFontSize": "medium",
            "backgroundColor": isDark ? "rgba(10, 10, 10, 1)" : "rgba(255, 255, 255, 1)",
            "widgetFontColor": isDark ? "#DBDBDB" : "#333333",
            "lineWidth": 2,
            "lineType": 0,
            "upColor": "#13ec5b",
            "downColor": "#ff4d4d",
            "borderUpColor": "#13ec5b",
            "borderDownColor": "#ff4d4d",
            "wickUpColor": "#13ec5b",
            "wickDownColor": "#ff4d4d",
            "dateRanges": ["1d|1", "1m|30", "12m|1D", "60m|1W", "all|1M"],
            "dateFormat": "dd MMM 'yy"
        })
    },
    cryptoHeatmap: {
        url: "https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js",
        config: (isDark) => ({
            "dataSource": "CryptoWithoutStable",
            "blockSize": "market_cap_calc",
            "blockColor": "24h_close_change|5",
            "locale": "en",
            "symbolUrl": "",
            "colorTheme": isDark ? "dark" : "light",
            "hasTopBar": true,
            "isDataSetEnabled": true,
            "isZoomEnabled": true,
            "hasSymbolTooltip": true,
            "isMonoSize": false,
            "width": "100%",
            "height": "100%"
        })
    },
    forexHeatmap: {
        url: "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js",
        config: (isDark) => ({
            "colorTheme": isDark ? "dark" : "light",
            "isTransparent": false,
            "locale": "en",
            "currencies": ["EUR", "USD", "JPY", "GBP", "AUD", "CAD"],
            "backgroundColor": isDark ? "#0F0F0F" : "#FFFFFF",
            "fontSize": "18",
            "widgetFontColor": isDark ? "#FFFFFF" : "#333333",
            "width": "100%",
            "height": "100%"
        })
    },
    stockHeatmap: {
        url: "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js",
        config: (isDark) => ({
            "dataSource": "SENSEX",
            "blockSize": "market_cap_basic",
            "blockColor": "change",
            "grouping": "sector",
            "locale": "en",
            "symbolUrl": "",
            "colorTheme": isDark ? "dark" : "light",
            "exchanges": ["BSE", "NYSE", "EURONEXT", "NASDAQ", "SSE", "TPEX", "TSX"],
            "hasTopBar": true,
            "isDataSetEnabled": true,
            "isZoomEnabled": true,
            "hasSymbolTooltip": false,
            "isMonoSize": false,
            "width": "100%",
            "height": "100%"
        })
    }
};

const initializedWidgets = new Set();
let activeWidgetType = 'symbolOverview';

function initTradingWidgets() {
    renderSingleWidget(activeWidgetType, 'widget-display');
}

function renderSingleWidget(type, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    activeWidgetType = type;
    const isDark = document.documentElement.classList.contains('dark');
    const widgetData = widgetConfigs[type];

    // Hide all existing widget contents
    const allContents = container.querySelectorAll('.widget-content-wrapper');
    allContents.forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('flex');
    });

    // Check if this widget type already exists in the container
    let existingWidget = container.querySelector(`[data-widget-type="${type}"]`);

    if (existingWidget) {
        // Instant switch for already loaded widgets
        existingWidget.classList.remove('hidden');
        return;
    }

    if (widgetData) {
        container.classList.add('relative');

        // Create wrapper for the new widget
        const wrapper = document.createElement('div');
        wrapper.className = 'widget-content-wrapper h-full w-full';
        wrapper.setAttribute('data-widget-type', type);

        wrapper.innerHTML = `
            <div class="widget-loader terminal-loading-overlay absolute inset-0 font-mono">
                <div class="scanline-effect"></div>
                <div class="flex flex-col items-center gap-4 text-primary">
                    <span class="material-symbols-outlined text-4xl animate-pulse">settings_input_component</span>
                    <div class="space-y-1 text-center">
                        <p class="text-[10px] uppercase tracking-[0.3em] font-bold glitch-text">Establishing_Market_Node</p>
                        <p class="loader-status text-[8px] text-zinc-500 uppercase tracking-widest opacity-80">Syncing with TradingView_Cloud...</p>
                    </div>
                    <div class="loading-bar-container mt-2">
                        <div class="loading-bar-progress"></div>
                    </div>
                </div>
            </div>
            <div class="widget-real-content h-full w-full opacity-0 transition-opacity duration-1000">
                <div class="tradingview-widget-container h-full w-full">
                    <div class="tradingview-widget-container__widget h-full w-full"></div>
                </div>
            </div>
        `;

        container.appendChild(wrapper);

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = widgetData.url;
        script.async = true;
        script.innerHTML = JSON.stringify(widgetData.config(isDark));

        const widgetRealContent = wrapper.querySelector('.widget-real-content');
        const widgetContainer = widgetRealContent.querySelector('.tradingview-widget-container__widget');

        widgetContainer.appendChild(script);

        // Run the "intentional" loader sequence for first-time load
        setTimeout(() => {
            const loader = wrapper.querySelector('.widget-loader');
            const status = wrapper.querySelector('.loader-status');
            if (status) status.innerText = "Connection_Established_v4.2";

            setTimeout(() => {
                if (loader) loader.classList.add('hidden');
                if (widgetRealContent) widgetRealContent.classList.remove('opacity-0');
            }, 500);
        }, 1500);
    }
}

function switchWidget(type, btn) {
    const buttons = btn.parentElement.querySelectorAll('button');
    buttons.forEach(b => {
        b.classList.remove('text-primary');
        b.classList.add('text-zinc-500');
    });
    btn.classList.add('text-primary');
    btn.classList.remove('text-zinc-500');

    renderSingleWidget(type, 'widget-display');
}
