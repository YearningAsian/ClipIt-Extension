# ClipIt Extension

A smart Chrome extension that revolutionizes web clipping with AI-powered features.

## 🚀 Overview

ClipIt Extension goes beyond traditional bookmarking by providing intelligent content processing, automatic summarization, and smart organization of your saved web content.

## ✨ Features

### 🤖 AI-Powered Processing
- **Auto-Summarize & Tag**: Instantly generates bullet-point summaries of articles, videos, and web content
- **Smart Tagging**: Automatically suggests relevant tags (#Productivity, #AI, #Marketing) for effortless organization
- **Action Item Detection**: Scans emails and project updates for actionable items and integrates with your to-do list
- **Related Notes Finder**: Recognizes content similar to previously saved items to prevent duplicates

### 🔧 Core Functionality
- **One-Click Clipping**: Save any webpage, article, or content with a single click
- **Content Analysis**: Deep content understanding for better categorization
- **Smart Organization**: Automatic filing system based on content type and relevance
- **Cross-Platform Sync**: Seamlessly sync with the ClipIt web application

## 🏗️ Project Structure

```
ClipIt-Extension/
├── manifest.json          # Chrome extension manifest
├── src/
│   ├── popup/             # Extension popup interface
│   │   ├── popup.html
│   │   ├── popup.ts
│   │   └── popup.css
│   ├── content/           # Content scripts
│   │   ├── content.ts
│   │   └── content.css
│   ├── background/        # Background service worker
│   │   └── background.ts
│   └── types/             # TypeScript type definitions
│       └── chrome.d.ts
├── icons/                 # Extension icons
├── dist/                  # Built extension files
├── webpack.config.js      # Build configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## 🛠️ Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Chrome browser

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ClipIt-Extension.git
   cd ClipIt-Extension
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the extension:**
   ```bash
   npm run build
   ```

4. **Load in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build the extension for production |
| `npm run dev` | Build with watch mode for development |
| `npm run clean` | Clean the dist directory |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

## 🔧 Configuration

### API Integration
The extension connects to the ClipIt web application API for:
- Content processing and AI analysis
- User authentication and sync
- Data storage and retrieval

### Permissions
The extension requires the following permissions:
- `activeTab` - Access current tab content
- `storage` - Local data storage
- `contextMenus` - Right-click menu integration
- `host_permissions` - Access to web pages for content extraction

## 🚀 Usage

1. **Install the extension** from the Chrome Web Store or load unpacked for development
2. **Click the ClipIt icon** in your browser toolbar
3. **Clip content** by clicking "Save Current Page" or using the context menu
4. **View your clips** in the popup or visit the ClipIt web application
5. **Let AI organize** your content automatically with tags and summaries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📊 Roadmap

- [ ] Enhanced AI summarization
- [ ] Multi-language support
- [ ] Integration with popular productivity tools
- [ ] Offline mode capabilities
- [ ] Advanced search and filtering
- [ ] Team collaboration features

## 🔗 Related Projects

- [ClipIt Web Application](https://github.com/yourusername/ClipIt) - The main Angular application

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports

If you find a bug, please create an issue on GitHub with:
- Chrome version
- Extension version
- Steps to reproduce
- Expected vs actual behavior

## 💡 Feature Requests

We welcome feature requests! Please open an issue with:
- Clear description of the feature
- Use case explanation
- Any relevant examples or mockups