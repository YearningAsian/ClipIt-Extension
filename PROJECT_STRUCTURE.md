# ClipIt Chrome Extension - Project Structure

This document outlines the complete folder structure for the ClipIt Chrome Extension, organized by features and technology stack components.

## 🎯 **Complete ClipIt Project Structure**

```
ClipIt-Extension/
├── 📁 src/                                    # Main source code
│   ├── 📁 features/                           # Core feature modules
│   │   ├── 📁 clipping/                       # Intelligent Clipping
│   │   │   ├── 📁 article/                    # Full article clipping
│   │   │   │   └── ArticleClipper.ts          # Article extraction & summarization
│   │   │   ├── 📁 highlight/                  # Text highlight clipping
│   │   │   │   └── HighlightClipper.ts        # Highlight extraction
│   │   │   ├── 📁 image/                      # Image clipping
│   │   │   └── 📁 video/                      # Video/YouTube clipping
│   │   ├── 📁 organization/                   # Auto-Organization
│   │   │   # Auto-tagging, collections, duplicate detection
│   │   ├── 📁 chat-rag/                       # Chat with Your Clips
│   │   │   └── ChatRAG.ts                     # RAG pipeline implementation
│   │   ├── 📁 content-suite/                  # In-Note Content Tools
│   │   │   # Rewriter, Proofreader, Writer APIs
│   │   └── 📁 sync/                           # Cross-Platform Sync
│   │       # Firebase sync, cross-device functionality
│   │
│   ├── 📁 services/                           # Service layer
│   │   ├── 📁 ai/                             # AI services
│   │   │   ├── 📁 on-device/                  # Chrome Built-in AI
│   │   │   │   └── OnDeviceAI.ts              # Gemini Nano, Summarizer, Prompt APIs
│   │   │   └── 📁 cloud/                      # Cloud AI
│   │   │       └── CloudAI.ts                 # Gemini Developer API
│   │   ├── 📁 storage/                        # Data storage services
│   │   │   # chrome.storage.local + Firebase Firestore
│   │   └── 📁 auth/                           # Authentication
│   │       # chrome.identity + Firebase Auth
│   │
│   ├── 📁 ui/                                 # User interface
│   │   ├── 📁 popup/                          # Extension popup
│   │   │   └── 📁 components/                 # Popup components
│   │   ├── 📁 content/                        # Content scripts
│   │   │   # Web page interaction, highlighting
│   │   └── 📁 shared/                         # Shared UI components
│   │       └── 📁 components/                 # Reusable components
│   │
│   ├── 📁 config/                             # Configuration
│   │   ├── constants.ts                       # App constants
│   │   └── firebase.ts                        # Firebase configuration
│   │
│   ├── 📁 types/                              # TypeScript definitions
│   │   └── index.ts                           # Core type definitions
│   │
│   ├── 📁 utils/                              # Utility functions
│   │   # Helper functions, common utilities
│   │
│   ├── background.ts                          # Service Worker
│   ├── content.ts                             # Content Script
│   ├── popup.ts                               # Popup Logic
│   ├── popup.html                             # Popup HTML
│   ├── popup.css                              # Popup Styles
│   └── content.css                            # Content Styles
│
├── 📁 functions/                              # Firebase Cloud Functions
│   └── 📁 src/                                # Cloud functions source
│       ├── 📁 ai/                             # Cloud AI endpoints
│       ├── 📁 sync/                           # Sync logic
│       └── 📁 auth/                           # Authentication handlers
│
├── 📁 config/                                 # Project configuration
├── 📁 dist/                                   # Built extension
├── 📁 icons/                                  # Extension icons
├── manifest.json                              # Chrome Extension Manifest V3
├── package.json                               # Dependencies
├── tsconfig.json                              # TypeScript config
└── webpack.config.js                          # Build configuration
```

## 🚀 **Feature-to-Folder Mapping**

### **I. Intelligent Clipping** → `src/features/clipping/`
**Multi-Format Clipping (Article, Highlight, Image, Video)**

- **📄 Article Clipping**: `article/ArticleClipper.ts`
  - Full page content extraction
  - Auto-summarization using Summarizer API
  - Metadata extraction (title, author, publish date)

- **✨ Highlight Clipping**: `highlight/HighlightClipper.ts` 
  - Selected text extraction
  - Context preservation
  - Smart snippet creation

- **🖼️ Image Clipping**: `image/`
  - Visual content analysis
  - Image-to-text extraction
  - Alt-text generation

- **🎬 Video Clipping**: `video/`
  - YouTube transcript extraction
  - Video metadata capture
  - Timestamp preservation

### **II. Proactive Organization** → `src/features/organization/`
**Auto-Organizing Knowledge Base**

- Auto-tagging system using Prompt API
- Semantic clustering for Collections
- Duplicate content detection
- Action item extraction
- Smart categorization

### **III. Active Knowledge Hub** → `src/features/chat-rag/`
**"Chat with Your Clips" (Hybrid RAG)**

- **🔒 Local RAG**: `ChatRAG.ts`
  - On-device semantic search
  - Privacy-first question answering
  - Instant response using Prompt API

- **☁️ Advanced Analysis**
  - Cloud-based deep insights
  - Complex query processing
  - Cross-reference analysis

### **IV. In-Note Content Suite** → `src/features/content-suite/`
**Direct content enhancement within saved notes**

- **Rewriter API**: Text refinement and restructuring
- **Proofreader API**: Grammar and style correction  
- **Writer API**: Content expansion and generation
- **Highlight-to-enhance**: Text selection workflows

### **V. Cross-Platform Sync** → `src/features/sync/`
**Seamless Cross-Device Experience**

- Firebase Firestore integration
- Real-time synchronization
- Conflict resolution
- Offline-first architecture
- Device management

## 🔧 **Technology Stack Organization**

### **On-Device AI Stack** → `src/services/ai/on-device/`
**Chrome's Built-in AI (Privacy-First Core)**

- **🧠 Gemini Nano**: Foundation model
- **📝 Summarizer API**: Text summarization
- **💭 Prompt API**: General AI tasks, JSON generation
- **✍️ Writer API**: Content creation
- **🔄 Rewriter API**: Content refinement  
- **✅ Proofreader API**: Grammar checking

### **Cloud AI Stack** → `src/services/ai/cloud/`
**Optional Power & Reach**

- **☁️ Gemini Developer API**: Advanced analysis
- **🚀 Firebase Cloud Functions**: Serverless backend
- **🔗 API Gateway**: Request routing and management

### **Storage Architecture** → `src/services/storage/`
**Hybrid Local + Cloud Storage**

- **💾 chrome.storage.local**: Primary on-device database
- **☁️ Firebase Firestore**: Cloud sync database
- **🔄 Sync Engine**: Bidirectional synchronization
- **📱 Offline Support**: Local-first architecture

### **Authentication System** → `src/services/auth/`
**Secure Identity Management**

- **🔐 chrome.identity**: Browser-native Google Sign-In
- **🛡️ Firebase Authentication**: Backend session management
- **🎫 Token Management**: Secure credential handling

### **User Interface** → `src/ui/`
**Modern Extension Interface**

- **🎨 Popup Interface**: Main user interaction
- **📄 Content Scripts**: Web page integration
- **🧩 Shared Components**: Reusable UI elements
- **🎯 Context Menus**: Right-click functionality

### **Firebase Cloud Functions** → `functions/src/`
**Serverless Backend Architecture**

- **🤖 AI Endpoints**: Cloud AI processing
- **🔄 Sync Handlers**: Data synchronization
- **🔐 Auth Middleware**: Authentication processing
- **📊 Analytics**: Usage tracking and insights

## 📋 **Development Workflow**

### **Build Process**
- **TypeScript Compilation**: Source → JavaScript
- **Asset Bundling**: Webpack optimization
- **Extension Packaging**: Manifest V3 compliance
- **Hot Reloading**: Development efficiency

### **Testing Strategy**
- **Unit Tests**: Jest framework
- **Integration Tests**: Extension API testing
- **E2E Tests**: User workflow validation
- **AI API Mocking**: Offline development

### **Deployment Pipeline**
- **Local Development**: `npm run dev`
- **Production Build**: `npm run build`
- **Firebase Deploy**: `firebase deploy`
- **Extension Packaging**: Chrome Web Store ready

## 🎯 **Key Design Principles**

1. **🔒 Privacy by Default**: All core features work offline
2. **☁️ Power by Choice**: Optional cloud features enhance experience
3. **📱 Cross-Platform**: Seamless device synchronization
4. **🚀 Performance**: Optimized for speed and efficiency
5. **🧩 Modularity**: Clean separation of concerns
6. **🔄 Scalability**: Ready for future feature expansion

## 🛠️ **Getting Started**

1. **Install Dependencies**: `npm install`
2. **Build Extension**: `npm run build`
3. **Load in Chrome**: Load unpacked from `dist/`
4. **Setup Firebase**: Configure cloud features (optional)
5. **Start Development**: `npm run dev`

This structure ensures ClipIt remains maintainable, scalable, and aligned with modern Chrome extension development best practices while supporting the full hybrid on-device + cloud architecture.