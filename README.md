# Android Style Widget System

A beautiful and interactive widget system inspired by Android OS, built with GridStack.js.

## Features

- **Android-like Grid Layout**: 4-column grid system similar to Android home screens
- **Drag & Drop**: Easily move widgets around the screen
- **Resizable Widgets**: Resize widgets using edges and corners
- **Float Layout**: Widgets maintain their position when others are removed (no auto-rearrange)
- **Multiple Widget Types**:
  - 🕐 Clock - Real-time clock with date
  - 🌤️ Weather - Weather information display
  - 📅 Calendar - Event list widget
  - 🎵 Music - Music player widget
  - 🖼️ Photo - Photo gallery widget
  - 📝 Notes - Note-taking widget
- **Persistent Storage**: Layouts are saved to localStorage
- **Edit Mode**: Toggle between edit and view modes
- **Responsive Design**: Works on different screen sizes

## Technologies Used

- **GridStack.js** - Powerful grid layout library
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern styling with gradients and animations
- **LocalStorage API** - For persistent widget layouts

## GridStack.js Configuration

The system uses the following GridStack configuration for Android-like behavior:

```javascript
GridStack.init({
    column: 4,              // 4 columns like Android
    cellHeight: 80,         // Cell height in pixels
    margin: 8,              // Margin between widgets
    maxRow: 8,              // Maximum 8 rows
    float: true,            // Don't auto-rearrange when widget removed
    disableOneColumnMode: true,  // Keep 4 columns in responsive mode
    resizable: {
        handles: 'e, s, se'  // Right edge, bottom edge, and corner
    },
    draggable: {
        scroll: true,
        appendTo: 'body'
    },
    animate: true
});
```

## Key Features Explained

### Float Layout (`float: true`)
- When a widget is removed, other widgets stay in their positions
- No automatic rearrangement or floating to fill gaps
- Similar to Android where widgets maintain their positions

### Fixed Grid Size (`maxRow: 8`)
- Limits the grid to 8 rows maximum
- Prevents infinite grid expansion
- Creates a defined workspace area

### Resize Handles (`handles: 'e, s, se'`)
- **e** (east): Right edge resize
- **s** (south): Bottom edge resize
- **se** (southeast): Corner resize
- Custom CSS styling for visual handles

### Persistent Storage
- Layouts automatically save to localStorage
- Restored on page reload
- Manual save/clear options available

## Usage

### Getting Started

Simply open `index.html` in a web browser. No build process required!

### Adding Widgets

1. Click widget templates at the top to add specific widgets
2. Click "Add Widget" button for a random widget
3. Drag widgets from template area

### Managing Widgets

- **Move**: Drag widgets to reposition
- **Resize**: Drag edges or corners to resize
- **Remove**: Click the × button on widget header
- **Save Layout**: Click "Save Layout" to persist changes
- **Clear All**: Remove all widgets at once

### Edit Mode

Toggle "Edit Mode" to:
- **ON**: Enable dragging and resizing (default)
- **OFF**: Lock all widgets in place (view mode)

## File Structure

```
.
├── index.html      # Main HTML structure
├── style.css       # Styling and Android-like design
├── app.js          # Widget system logic and GridStack configuration
└── README.md       # This file
```

## Customization

### Adding New Widget Types

Edit `app.js` and add to the `getWidgetConfig()` method:

```javascript
newWidget: {
    icon: '🎮',
    title: 'New Widget',
    defaultSize: { w: 2, h: 2 },
    minSize: { w: 1, h: 1 },
    maxSize: { w: 4, h: 4 }
}
```

### Changing Grid Configuration

Modify the `GridStack.init()` call in `app.js`:

```javascript
column: 6,        // Change to 6 columns
cellHeight: 100,  // Taller cells
maxRow: 10,       // More rows
```

### Styling

Edit `style.css` to customize:
- Colors and gradients
- Widget appearance
- Resize handle styles
- Animations

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

Requires ES6+ support.

## License

MIT License - Feel free to use and modify!

## Credits

Built with [GridStack.js](https://gridstackjs.com/) - The best grid layout library for web applications.
