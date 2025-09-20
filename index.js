// Find the script tag that loaded this file
const currentScript = document.currentScript;
const TOKEN = currentScript.getAttribute("TFV0-TOKEN") || null; // null if missing

document.addEventListener("DOMContentLoaded", () => {
    const WEBHOOK_URL = "http://141.147.118.157:5678/webhook/02baf2f4-bf6a-49c3-9282-e5da8ae8bcb2";
    const domain = window.location.hostname;

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
        popup.style.zIndex = "2147483647";

        const title = document.createElement("div");
        title.style.fontWeight = "bold";
        title.style.marginBottom = "8px";
        title.style.fontSize = "15px";
        title.innerText = "This site uses Themium FrameworkV0";

        const text = document.createElement("div");
        text.style.fontSize = "13px";
        text.style.lineHeight = "1.4em";
        text.innerText = "Themium isn't free, although you can use it for free. We need supporters. Supporters of Themium get the full thing for free.";

        popup.appendChild(title);
        popup.appendChild(text);

        document.body.appendChild(popup);
    }

    function observePopup() {
        const observer = new MutationObserver(() => {
            if (!document.getElementById("custom-popup-bubble")) {
                createPopup();
            }
        });
        observer.observe(document.body, { childList: true });
    }

    function injectStyles(premium) {
        console.log('[TFV0]: Injecting Styles..')
        if (premium === true) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = "https://themium.github.io/FrameworkV0/v0.css";
            document.head.appendChild(link);
            console.log('[TFV0]: Injected Styles!')
        } else {
            console.log('[TFV0]: Injecting Styles.. (Free Version)')
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = "https://themium.github.io/FrameworkV0/v0-free.css";
            document.head.appendChild(link);
            console.log('[TFV0]: Injected Styles! (Free Version)')
        }
    }

    // If no token → fallback to not subscribed immediately
    if (!TOKEN) {
        console.warn("[TFV0]: ⚠️ No token provided. Defaulting to free mode.");
        createPopup();
        observePopup();
        injectStyles(false);
        return; // skip webhook call
    }

    // If token exists, check subscription via webhook
    fetch(`${WEBHOOK_URL}?website=${encodeURIComponent(domain)}&token=${encodeURIComponent(TOKEN)}`)
        .then(res => res.json())
        .then(data => {
            if (data.subscribed === "true") {
                console.log("[TFV0]: Subscription active. Popup not injected.");
                injectStyles(true);
            } else {
                console.log("[TFV0]: hi my names stuffzez! im the creator! and uhh i decided to remove the premium thing so you can use it for free (for now) because there is basically nothing in TFV0 yet.")
                //createPopup();
                //observePopup();
                injectStyles(true);
            }
        })
        .catch(err => {
            console.error("[TFV0]: Premium webhook request failed:", err);
            console.log("[TFV0]: hi my names stuffzez! im the creator! and uhh i decided to remove the premium thing so you can use it for free (for now) because there is basically nothing in TFV0 yet.")
            //createPopup();
            //observePopup();
            injectStyles(false);
        });
});
