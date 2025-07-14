document.getElementById("extract").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: "extractEmails" }, (response) => {
    const emails = response?.emails || [];
    const list = document.getElementById("emailList");
    list.innerHTML = "";
    emails.forEach(email => {
      const li = document.createElement("li");
      li.textContent = email;
      list.appendChild(li);
    });
    list.dataset.emails = JSON.stringify(emails);
  });
});

document.getElementById("save").addEventListener("click", () => {
  const emails = JSON.parse(document.getElementById("emailList").dataset.emails || "[]");
  chrome.storage.local.get(["savedEmails"], (result) => {
    const existing = new Set(result.savedEmails || []);
    emails.forEach(e => existing.add(e));
    chrome.storage.local.set({ savedEmails: Array.from(existing) }, () => {
      alert("Emails saved successfully.");
    });
  });
});
