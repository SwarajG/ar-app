document.addEventListener("visibilitychange", () => {
    //console.log(document.visibilityState);

    if (document.hidden) {
        // Pause the XR session when page is hidden to stop cam usage
        XR8.pause()
    } else {
        // Reload the page on page resume
        window.location.reload();
    }
});