// Link Stylesheet
const fw_sylesheet_link_2218 = document.createElement("link");
fw_sylesheet_link_2218.rel = "stylesheet";
fw_sylesheet_link_2218.type = "text/css";
fw_sylesheet_link_2218.href = "https://themium.github.io/FrameworkV0/v0.css";
document.head.appendChild(fw_sylesheet_link_2218);

(function () {
    const TOKEN = "YOUR_TOKEN_HERE"; // set token here
    const WEBHOOK_URL = "https://yourwebhook.com/hook"; // set your webhook URL here

    const domain = window.location.hostname;

    // Function to create popup
    function createPopup() {
        if (document.getElementById("custom-popup-bubble")) return;

        const popup = document.createElement("div");
        popup.id = "custom-popup-bubble";
        popup.style.position = "fixed";
        popup.style.bottom = "20px";
        popup.style.right = "20px";
        popup.style.background = "#1e1e1e";
        popup.style.color = "#fff";
        popup.style.padding = "15px 20px";
        popup.style.borderRadius = "12px";
        popup.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
        popup.style.fontFamily = "Arial, sans-serif";
        popup.style.maxWidth = "280px";
        popup.style.zIndex = "999999";

        const title = document.createElement("div");
        title.style.fontWeight = "bold";
        title.style.marginBottom = "8px";
        title.style.fontSize = "15px";
        title.innerText = "Lorem ipsum sid amet";

        const text = document.createElement("div");
        text.style.fontSize = "13px";
        text.style.lineHeight = "1.4em";
        text.innerText = "Lorem gadshy 4e73984y6398gewhjrgvbysliudgiyhodsafb mndsfbkjdsgbkjdsr";

        popup.appendChild(title);
        popup.appendChild(text);

        document.body.appendChild(popup);
    }

    // MutationObserver to re-add popup if deleted
    function observePopup() {
        const observer = new MutationObserver(() => {
            if (!document.getElementById("custom-popup-bubble")) {
                createPopup();
            }
        });
        observer.observe(document.body, { childList: true });
    }

    // Call webhook
    fetch(`${WEBHOOK_URL}?website=${encodeURIComponent(domain)}&token=${encodeURIComponent(TOKEN)}`)
        .then(res => res.json())
        .then(data => {
            if (data.subscribed === "true") {
                console.log("✅ Subscription active. Popup not injected.");
            } else {
                createPopup();
                observePopup();
            }
        })
        .catch(err => {
            console.error("Webhook request failed:", err);
            // Fallback: still inject popup
            createPopup();
            observePopup();
        });
})();