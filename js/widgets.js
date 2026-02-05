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

    if (widgetData) {
        container.innerHTML = '';

        const widgetDiv = document.createElement('div');
        widgetDiv.className = 'tradingview-widget-container h-full w-full';
        widgetDiv.innerHTML = '<div class="tradingview-widget-container__widget h-full w-full"></div>';

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = widgetData.url;
        script.async = true;
        script.innerHTML = JSON.stringify(widgetData.config(isDark));

        widgetDiv.appendChild(script);
        container.appendChild(widgetDiv);
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
