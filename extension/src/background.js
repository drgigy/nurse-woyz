chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "nurse-voice-transfer",
    title: "Transfer Note",
    contexts: ["editable"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "nurse-voice-transfer" || !tab?.id) return;
  chrome.tabs.sendMessage(tab.id, { type: "START_NOTE_TRANSFER" }, { frameId: info.frameId });
});
