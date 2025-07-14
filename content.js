function extractEmailsFromPage() {
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/gi;
  const bodyText = document.body.innerText;
  const matches = bodyText.match(regex) || [];
  return [...new Set(matches)]; // Remove duplicates
}

// Listen for request from popup
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "extractEmails") {
    const emails = extractEmailsFromPage();
    sendResponse({ emails });
  }
});
