// Background script for ClipIt Chrome Extension
console.log('ClipIt background script loaded');

// Install event - set up context menu
chrome.runtime.onInstalled.addListener(() => {
  console.log('ClipIt extension installed');
  
  // Create context menu item
  chrome.contextMenus.create({
    id: 'clipit-save-page',
    title: 'Save with ClipIt',
    contexts: ['page', 'selection']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'clipit-save-page' && tab) {
    clipCurrentPage(tab);
  }
});

// Handle keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === 'clip-page') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        clipCurrentPage(tabs[0]);
      }
    });
  }
});

// Handle messages from popup and content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'clipPage':
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          clipCurrentPage(tabs[0]);
          sendResponse({ success: true });
        }
      });
      return true; // Keep message channel open for async response
      
    case 'getClips':
      getStoredClips().then(clips => {
        sendResponse({ clips });
      });
      return true;
      
    case 'deleteClip':
      deleteClip(request.clipId).then(() => {
        sendResponse({ success: true });
      });
      return true;
  }
});

// Main clipping function
async function clipCurrentPage(tab: chrome.tabs.Tab) {
  if (!tab.id || !tab.url) return;
  
  try {
    // Inject content script if needed and extract page content
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractPageContent
    });
    
    if (results && results[0] && results[0].result) {
      const pageData = results[0].result;
      const clip = {
        id: generateId(),
        url: tab.url,
        title: tab.title || pageData.title,
        content: pageData.content,
        summary: pageData.summary,
        tags: generateTags(pageData.content),
        actionItems: extractActionItems(pageData.content),
        timestamp: Date.now(),
        favicon: tab.favIconUrl
      };
      
      await saveClip(clip);
      
      // Show notification
      chrome.notifications?.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'ClipIt',
        message: `Saved: ${clip.title}`
      });
    }
  } catch (error) {
    console.error('Error clipping page:', error);
  }
}

// Function injected into page to extract content
function extractPageContent() {
  const title = document.title;
  const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  
  // Get main content (simplified extraction)
  const content = document.body.innerText.substring(0, 5000); // Limit content length
  
  // Basic summary (first few sentences)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const summary = sentences.slice(0, 3).join('. ') + '.';
  
  return {
    title,
    content,
    summary,
    metaDescription
  };
}

// Utility functions
function generateTags(content: string): string[] {
  // Basic tag generation based on keywords
  const keywords = [
    'productivity', 'technology', 'business', 'marketing', 'design',
    'development', 'ai', 'data', 'research', 'tutorial', 'news'
  ];
  
  const contentLower = content.toLowerCase();
  return keywords.filter(keyword => 
    contentLower.includes(keyword)
  ).slice(0, 5);
}

function extractActionItems(content: string): string[] {
  // Basic action item detection
  const actionPatterns = [
    /(?:need to|must|should|will|todo|action item)[^.!?]*[.!?]/gi,
    /\b\w+ to \w+[^.!?]*by \w+[^.!?]*[.!?]/gi
  ];
  
  const items: string[] = [];
  actionPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      items.push(...matches.slice(0, 3)); // Limit to 3 items per pattern
    }
  });
  
  return items.slice(0, 5); // Max 5 action items
}

// Storage functions
async function saveClip(clip: any): Promise<void> {
  const clips = await getStoredClips();
  clips.unshift(clip); // Add to beginning
  
  // Keep only last 100 clips
  if (clips.length > 100) {
    clips.splice(100);
  }
  
  await chrome.storage.local.set({ clips });
}

async function getStoredClips(): Promise<any[]> {
  const result = await chrome.storage.local.get(['clips']);
  return result.clips || [];
}

async function deleteClip(clipId: string): Promise<void> {
  const clips = await getStoredClips();
  const filteredClips = clips.filter(clip => clip.id !== clipId);
  await chrome.storage.local.set({ clips: filteredClips });
}