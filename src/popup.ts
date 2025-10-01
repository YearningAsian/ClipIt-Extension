// ClipIt Popup Script
document.addEventListener('DOMContentLoaded', async () => {
  await initializePopup();
});

async function initializePopup() {
  // Get current tab info
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];
  
  if (currentTab) {
    updateCurrentPageInfo(currentTab);
  }
  
  // Load recent clips
  await loadRecentClips();
  
  // Set up event listeners
  setupEventListeners();
}

function updateCurrentPageInfo(tab: chrome.tabs.Tab) {
  const titleElement = document.getElementById('page-title');
  const urlElement = document.getElementById('page-url');
  
  if (titleElement && urlElement) {
    titleElement.textContent = tab.title || 'Untitled Page';
    urlElement.textContent = tab.url || '';
  }
}

async function loadRecentClips() {
  try {
    const response = await chrome.runtime.sendMessage({ action: 'getClips' });
    const clips = response.clips || [];
    displayClips(clips.slice(0, 5)); // Show last 5 clips
  } catch (error) {
    console.error('Error loading clips:', error);
    displayError('Failed to load clips');
  }
}

function displayClips(clips: any[]) {
  const clipsList = document.getElementById('clips-list');
  if (!clipsList) return;
  
  if (clips.length === 0) {
    clipsList.innerHTML = '<div class="loading">No clips yet. Start clipping!</div>';
    return;
  }
  
  clipsList.innerHTML = clips.map(clip => `
    <div class="clip-item" data-clip-id="${clip.id}">
      <div class="clip-title">${escapeHtml(clip.title)}</div>
      <div class="clip-url">${escapeHtml(clip.url)}</div>
      ${clip.tags && clip.tags.length > 0 ? `
        <div class="clip-tags">
          ${clip.tags.slice(0, 3).map((tag: string) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `).join('');
  
  // Add click listeners to clip items
  clipsList.querySelectorAll('.clip-item').forEach(item => {
    item.addEventListener('click', () => {
      const clipId = item.getAttribute('data-clip-id');
      if (clipId) {
        openClipInDashboard(clipId);
      }
    });
  });
}

function displayError(message: string) {
  const clipsList = document.getElementById('clips-list');
  if (clipsList) {
    clipsList.innerHTML = `<div class="loading" style="color: #ef4444;">${escapeHtml(message)}</div>`;
  }
}

function setupEventListeners() {
  // Clip current page button
  const clipBtn = document.getElementById('clip-btn');
  clipBtn?.addEventListener('click', handleClipPage);
  
  // Quick note button
  const quickNoteBtn = document.getElementById('quick-note-btn');
  const quickNoteSection = document.getElementById('quick-note-section');
  quickNoteBtn?.addEventListener('click', () => {
    if (quickNoteSection) {
      quickNoteSection.style.display = quickNoteSection.style.display === 'none' ? 'flex' : 'none';
    }
  });
  
  // Save note button
  const saveNoteBtn = document.getElementById('save-note-btn');
  saveNoteBtn?.addEventListener('click', handleSaveNote);
  
  // Cancel note button
  const cancelNoteBtn = document.getElementById('cancel-note-btn');
  const noteSection = document.getElementById('quick-note-section');
  cancelNoteBtn?.addEventListener('click', () => {
    if (noteSection) {
      noteSection.style.display = 'none';
      const textarea = document.getElementById('quick-note-text') as HTMLTextAreaElement;
      if (textarea) textarea.value = '';
    }
  });
  
  // Dashboard button
  const dashboardBtn = document.getElementById('dashboard-btn');
  dashboardBtn?.addEventListener('click', openDashboard);
  
  // Settings button
  const settingsBtn = document.getElementById('settings-btn');
  settingsBtn?.addEventListener('click', openSettings);
}

async function handleClipPage() {
  const clipBtn = document.getElementById('clip-btn');
  if (!clipBtn) return;
  
  try {
    clipBtn.textContent = 'Clipping...';
    clipBtn.setAttribute('disabled', 'true');
    
    await chrome.runtime.sendMessage({ action: 'clipPage' });
    
    clipBtn.innerHTML = '<span class="icon">✅</span> Clipped!';
    
    // Reload clips to show the new one
    setTimeout(async () => {
      await loadRecentClips();
      clipBtn.innerHTML = '<span class="icon">📎</span> Clip This Page';
      clipBtn.removeAttribute('disabled');
    }, 1500);
    
  } catch (error) {
    console.error('Error clipping page:', error);
    clipBtn.innerHTML = '<span class="icon">❌</span> Error';
    setTimeout(() => {
      clipBtn.innerHTML = '<span class="icon">📎</span> Clip This Page';
      clipBtn.removeAttribute('disabled');
    }, 2000);
  }
}

async function handleSaveNote() {
  const textarea = document.getElementById('quick-note-text') as HTMLTextAreaElement;
  const noteSection = document.getElementById('quick-note-section');
  
  if (!textarea || !textarea.value.trim()) return;
  
  try {
    // Get current tab
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = tabs[0];
    
    if (currentTab) {
      const noteClip = {
        id: generateId(),
        url: currentTab.url,
        title: `Note: ${currentTab.title}`,
        content: textarea.value.trim(),
        summary: textarea.value.trim(),
        tags: ['note'],
        actionItems: [],
        timestamp: Date.now(),
        favicon: currentTab.favIconUrl,
        isNote: true
      };
      
      // Save through background script
      await chrome.storage.local.get(['clips']).then(result => {
        const clips = result.clips || [];
        clips.unshift(noteClip);
        return chrome.storage.local.set({ clips });
      });
      
      // Hide note section and clear textarea
      if (noteSection) {
        noteSection.style.display = 'none';
        textarea.value = '';
      }
      
      // Reload clips
      await loadRecentClips();
    }
  } catch (error) {
    console.error('Error saving note:', error);
  }
}

function openClipInDashboard(clipId: string) {
  chrome.tabs.create({
    url: `http://localhost:4200/clip/${clipId}`
  });
}

function openDashboard() {
  chrome.tabs.create({
    url: 'http://localhost:4200'
  });
}

function openSettings() {
  chrome.tabs.create({
    url: 'http://localhost:4200/settings'
  });
}

// Utility functions
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function generateId(): string {
  return 'clip_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}