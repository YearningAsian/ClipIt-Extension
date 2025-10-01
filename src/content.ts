// ClipIt Content Script
console.log('ClipIt content script loaded');

// Create and inject the ClipIt overlay button
function createClipItButton() {
  // Check if button already exists
  if (document.getElementById('clipit-overlay-btn')) {
    return;
  }
  
  const button = document.createElement('button');
  button.id = 'clipit-overlay-btn';
  button.className = 'clipit-overlay-btn';
  button.innerHTML = '📎';
  button.title = 'Save with ClipIt';
  
  // Add click handler
  button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'clipPage' });
    showClipNotification();
  });
  
  // Add to page
  document.body.appendChild(button);
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    if (button.parentNode) {
      button.classList.add('clipit-hidden');
    }
  }, 5000);
}

// Show notification when page is clipped
function showClipNotification() {
  // Remove existing notification
  const existing = document.getElementById('clipit-notification');
  if (existing) {
    existing.remove();
  }
  
  const notification = document.createElement('div');
  notification.id = 'clipit-notification';
  notification.className = 'clipit-notification';
  notification.innerHTML = `
    <div class="clipit-notification-content">
      <span class="clipit-notification-icon">✅</span>
      <span class="clipit-notification-text">Page saved to ClipIt!</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('clipit-show');
  }, 10);
  
  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('clipit-show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Handle text selection for quick clipping
function handleTextSelection() {
  let selectionTimeout: NodeJS.Timeout;
  
  document.addEventListener('mouseup', () => {
    clearTimeout(selectionTimeout);
    selectionTimeout = setTimeout(() => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 10) {
        showSelectionClipButton(selection);
      } else {
        hideSelectionClipButton();
      }
    }, 100);
  });
  
  document.addEventListener('keyup', () => {
    clearTimeout(selectionTimeout);
    selectionTimeout = setTimeout(() => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 10) {
        showSelectionClipButton(selection);
      } else {
        hideSelectionClipButton();
      }
    }, 100);
  });
}

function showSelectionClipButton(selection: Selection) {
  hideSelectionClipButton(); // Remove any existing button
  
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  
  const button = document.createElement('button');
  button.id = 'clipit-selection-btn';
  button.className = 'clipit-selection-btn';
  button.innerHTML = '📎 Clip Selection';
  button.title = 'Save selected text with ClipIt';
  
  button.style.position = 'fixed';
  button.style.left = `${rect.left + window.scrollX}px`;
  button.style.top = `${rect.bottom + window.scrollY + 5}px`;
  button.style.zIndex = '10001';
  
  button.addEventListener('click', () => {
    clipSelection(selection.toString());
    hideSelectionClipButton();
  });
  
  document.body.appendChild(button);
}

function hideSelectionClipButton() {
  const existing = document.getElementById('clipit-selection-btn');
  if (existing) {
    existing.remove();
  }
}

function clipSelection(selectedText: string) {
  chrome.runtime.sendMessage({
    action: 'clipSelection',
    text: selectedText,
    url: window.location.href,
    title: document.title
  });
  showClipNotification();
}

// Initialize content script
function init() {
  // Create overlay button on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createClipItButton);
  } else {
    createClipItButton();
  }
  
  // Handle text selection
  handleTextSelection();
  
  // Show button on hover near top-right corner
  document.addEventListener('mousemove', (e) => {
    const button = document.getElementById('clipit-overlay-btn');
    if (button && e.clientX > window.innerWidth - 100 && e.clientY < 100) {
      button.classList.remove('clipit-hidden');
    }
  });
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'pageClipped') {
    showClipNotification();
  }
  return true;
});

// Start the content script
init();