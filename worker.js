/*
 * This script is always running in background and don't have access to the curent tab
 * so it's a listener. It triggers event with sendMessage and executeScript
 */

// set status to active initially
chrome.storage.sync.get("active", ({ active }) => {
  console.log(active)
  if (!active) chrome.storage.sync.set({ active: true });
});

// set strength to max initially
chrome.storage.sync.get("strength", ({ strength }) => {
  console.log(strength)
  if (!strength) chrome.storage.sync.set({ strength: 255 });
  console.log(strength)
});

// tab update listener
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!changeInfo.status === "complete") {
    return;
  }
  // apply dark mode if viewing PDF
  if (tab.url && tab.url.includes(".pdf")) {
    console.log("Viewing a PDF!");
    if (tabId)
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["scripts/invert.js"],
      });
  }
  console.log("Tab updated!");
  return;
});
