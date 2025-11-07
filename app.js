// Android Style Widget System using GridStack.js

class WidgetSystem {
    constructor() {
        this.grid = null;
        this.widgetCounter = 0;
        this.init();
    }

    init() {
        // Initialize GridStack with Android-like settings
        this.grid = GridStack.init({
            // Android style grid configuration
            column: 4,              // 4 columns like Android
            cellHeight: 80,         // Cell height in pixels
            margin: 8,              // Margin between widgets
            maxRow: 8,              // Maximum 8 rows

            // Behavior settings
            float: true,            // Don't auto-rearrange when widget removed
            disableOneColumnMode: true,  // Keep 4 columns in responsive mode

            // Resize handles - Android style (bottom, right, and corner)
            resizable: {
                handles: 'e, s, se'
            },

            // Enable dragging
            draggable: {
                scroll: true,
                appendTo: 'body',
                containment: null
            },

            // Animation
            animate: true,

            // Remove empty rows
            removeTimeout: 100
        });

        this.setupEventListeners();
        this.loadLayout();
        this.updateStatus();

        // Start clocks if any
        this.startClocks();
    }

    setupEventListeners() {
        // Add Widget Button
        document.getElementById('addWidget').addEventListener('click', () => {
            this.addRandomWidget();
        });

        // Save Layout Button
        document.getElementById('saveLayout').addEventListener('click', () => {
            this.saveLayout();
        });

        // Clear Layout Button
        document.getElementById('clearLayout').addEventListener('click', () => {
            if (confirm('Are you sure you want to remove all widgets?')) {
                this.clearLayout();
            }
        });

        // Edit Mode Toggle
        document.getElementById('editMode').addEventListener('change', (e) => {
            this.toggleEditMode(e.target.checked);
        });

        // Template Item Clicks
        document.querySelectorAll('.template-item').forEach(item => {
            item.addEventListener('click', () => {
                const widgetType = item.dataset.widgetType;
                this.addWidget(widgetType);
            });
        });

        // Grid events
        this.grid.on('added removed change', () => {
            this.updateStatus();
        });
    }

    addWidget(type, options = {}) {
        const widgetId = `widget-${++this.widgetCounter}`;
        const widgetConfig = this.getWidgetConfig(type);

        const widget = {
            id: widgetId,
            x: options.x,
            y: options.y,
            w: options.w || widgetConfig.defaultSize.w,
            h: options.h || widgetConfig.defaultSize.h,
            minW: widgetConfig.minSize.w,
            minH: widgetConfig.minSize.h,
            maxW: widgetConfig.maxSize.w,
            maxH: widgetConfig.maxSize.h,
            content: this.createWidgetContent(widgetId, type, widgetConfig)
        };

        this.grid.addWidget(widget);

        // Start clock if it's a clock widget
        if (type === 'clock') {
            this.startClock(widgetId);
        }

        return widgetId;
    }

    addRandomWidget() {
        const types = ['clock', 'weather', 'calendar', 'music', 'photo', 'notes'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        this.addWidget(randomType);
    }

    getWidgetConfig(type) {
        const configs = {
            clock: {
                icon: '🕐',
                title: 'Clock',
                defaultSize: { w: 2, h: 2 },
                minSize: { w: 2, h: 2 },
                maxSize: { w: 4, h: 4 }
            },
            weather: {
                icon: '🌤️',
                title: 'Weather',
                defaultSize: { w: 2, h: 2 },
                minSize: { w: 2, h: 2 },
                maxSize: { w: 4, h: 4 }
            },
            calendar: {
                icon: '📅',
                title: 'Calendar',
                defaultSize: { w: 2, h: 3 },
                minSize: { w: 2, h: 2 },
                maxSize: { w: 4, h: 6 }
            },
            music: {
                icon: '🎵',
                title: 'Music Player',
                defaultSize: { w: 4, h: 2 },
                minSize: { w: 2, h: 1 },
                maxSize: { w: 4, h: 3 }
            },
            photo: {
                icon: '🖼️',
                title: 'Photo',
                defaultSize: { w: 2, h: 2 },
                minSize: { w: 1, h: 1 },
                maxSize: { w: 4, h: 4 }
            },
            notes: {
                icon: '📝',
                title: 'Notes',
                defaultSize: { w: 2, h: 3 },
                minSize: { w: 2, h: 2 },
                maxSize: { w: 4, h: 6 }
            }
        };

        return configs[type] || configs.notes;
    }

    createWidgetContent(widgetId, type, config) {
        let bodyContent = '';

        switch (type) {
            case 'clock':
                bodyContent = `
                    <div class="time" id="${widgetId}-time">12:00:00</div>
                    <div class="date" id="${widgetId}-date">Monday, Jan 1</div>
                `;
                break;
            case 'weather':
                bodyContent = `
                    <div>${config.icon}</div>
                    <div class="temp">72°F</div>
                    <div class="condition">Partly Cloudy</div>
                `;
                break;
            case 'calendar':
                bodyContent = `
                    <div class="event">Meeting @ 10:00 AM</div>
                    <div class="event">Lunch @ 12:30 PM</div>
                    <div class="event">Gym @ 6:00 PM</div>
                `;
                break;
            case 'music':
                bodyContent = `
                    <div class="song-title">Now Playing</div>
                    <div class="artist">Your Favorite Song</div>
                    <div>▶️ ⏸️ ⏭️</div>
                `;
                break;
            case 'photo':
                bodyContent = `<div style="font-size: 48px;">${config.icon}</div>`;
                break;
            case 'notes':
                bodyContent = `
                    <div>📝 My Notes</div>
                    <div style="font-size: 12px; margin-top: 10px; color: #9ca3af;">
                        Click to edit...
                    </div>
                `;
                break;
            default:
                bodyContent = `<div>${config.icon}</div>`;
        }

        return `
            <div class="grid-stack-item-content widget-${type}">
                <div class="widget-header">
                    <span>
                        <span class="widget-icon">${config.icon}</span>
                        ${config.title}
                    </span>
                    <button class="widget-close" onclick="widgetSystem.removeWidget('${widgetId}')" title="Remove widget">×</button>
                </div>
                <div class="widget-body">
                    ${bodyContent}
                </div>
            </div>
        `;
    }

    removeWidget(widgetId) {
        const element = document.getElementById(widgetId);
        if (element) {
            this.grid.removeWidget(element);
        }
    }

    saveLayout() {
        const serializedData = this.grid.save();
        localStorage.setItem('androidWidgetLayout', JSON.stringify(serializedData));

        // Update status
        document.getElementById('layoutStatus').textContent = 'Layout: Saved ✓';
        setTimeout(() => {
            document.getElementById('layoutStatus').textContent = 'Layout: Default';
        }, 2000);

        console.log('Layout saved:', serializedData);
    }

    loadLayout() {
        const savedLayout = localStorage.getItem('androidWidgetLayout');
        if (savedLayout) {
            try {
                const layout = JSON.parse(savedLayout);

                // Clear current widgets
                this.grid.removeAll();

                // Load saved widgets
                layout.forEach(item => {
                    // Extract widget type from content
                    const widgetType = this.extractWidgetType(item.content);
                    if (widgetType) {
                        this.addWidget(widgetType, {
                            x: item.x,
                            y: item.y,
                            w: item.w,
                            h: item.h
                        });
                    }
                });

                console.log('Layout loaded:', layout);
            } catch (error) {
                console.error('Error loading layout:', error);
            }
        } else {
            // Add some default widgets
            this.addDefaultWidgets();
        }
    }

    extractWidgetType(content) {
        const match = content.match(/widget-(\w+)/);
        return match ? match[1] : null;
    }

    addDefaultWidgets() {
        // Add some default widgets for demo
        this.addWidget('clock', { x: 0, y: 0, w: 2, h: 2 });
        this.addWidget('weather', { x: 2, y: 0, w: 2, h: 2 });
        this.addWidget('music', { x: 0, y: 2, w: 4, h: 2 });
        this.addWidget('calendar', { x: 0, y: 4, w: 2, h: 3 });
        this.addWidget('notes', { x: 2, y: 4, w: 2, h: 3 });
    }

    clearLayout() {
        this.grid.removeAll();
        localStorage.removeItem('androidWidgetLayout');
        this.widgetCounter = 0;
    }

    toggleEditMode(enabled) {
        if (enabled) {
            this.grid.enable();
            document.querySelector('.grid-stack').classList.remove('static');
        } else {
            this.grid.disable();
            document.querySelector('.grid-stack').classList.add('static');
        }
    }

    updateStatus() {
        const widgetCount = this.grid.getGridItems().length;
        document.getElementById('widgetCount').textContent = `Widgets: ${widgetCount}`;
    }

    // Clock functionality
    startClocks() {
        // Find all clock widgets and start them
        document.querySelectorAll('.widget-clock').forEach(widget => {
            const widgetId = widget.closest('.grid-stack-item').id;
            this.startClock(widgetId);
        });
    }

    startClock(widgetId) {
        const updateClock = () => {
            const timeElement = document.getElementById(`${widgetId}-time`);
            const dateElement = document.getElementById(`${widgetId}-date`);

            if (!timeElement || !dateElement) return;

            const now = new Date();

            // Format time
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}:${seconds}`;

            // Format date
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const dayName = days[now.getDay()];
            const monthName = months[now.getMonth()];
            const date = now.getDate();
            dateElement.textContent = `${dayName}, ${monthName} ${date}`;
        };

        // Update immediately
        updateClock();

        // Update every second
        setInterval(updateClock, 1000);
    }
}

// Initialize the widget system when DOM is ready
let widgetSystem;

document.addEventListener('DOMContentLoaded', () => {
    widgetSystem = new WidgetSystem();
    console.log('Android Widget System initialized');
});

// Prevent the default behavior on the grid to avoid issues
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.grid-stack-item')) {
        e.preventDefault();
    }
});
