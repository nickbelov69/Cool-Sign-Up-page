const panel = document.getElementById("form-section");
const handle = document.getElementById("drag-handle");

let isDragging = false;

handle.addEventListener("mousedown", () => {
    isDragging = true;
    document.body.style.userSelect = "none";
});

window.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "";
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const min = 60;
    const max = window.innerWidth - 100;

    let newWidth = window.innerWidth - e.clientX;

    if (newWidth < min) newWidth = min;
    if (newWidth > max) newWidth = max;

    panel.style.width = newWidth + "px";

    if (newWidth > 200) {
        panel.classList.add("open");
    } else {
        panel.classList.remove("open");
    }
});

