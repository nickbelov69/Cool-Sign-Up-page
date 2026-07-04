const panel = document.getElementById("form-section");
const handle = document.getElementById("drag-handle");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const passwordField = password.parentElement;
const confirmField = confirmPassword.parentElement;

const inputs = document.querySelectorAll("input");
const rulesUI = document.querySelectorAll("[data-rule]");

let isDragging = false;

/* ---------------- DRAG PANEL ---------------- */

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
    panel.classList.toggle("open", newWidth > 200);
});


/* ---------------- INPUT LISTENERS ---------------- */

inputs.forEach(input => {
    input.addEventListener("input", validateAll);
});


/* ---------------- MAIN VALIDATION ---------------- */

function validateAll() {
    validateSimpleFields();
    validatePassword();
}


/* ---------------- SIMPLE FIELDS ---------------- */

function validateSimpleFields() {
    inputs.forEach(input => {

        if (input.id === "password" || input.id === "confirmPassword") return;

        const field = input.parentElement;
        const value = input.value.trim();

        let isValid = false;

        // FIRST NAME / LAST NAME / GENERIC TEXT
        if (input.type === "text") {
            isValid = value.length > 0;
        }

        // EMAIL → должен содержать @ и .
        if (input.type === "email") {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        // PHONE → только цифры (и минимум длина)
        if (input.type === "tel") {
            isValid = /^\d{7,15}$/.test(value);
        }

        field.classList.toggle("valid", isValid);
        field.classList.toggle("invalid", !isValid);
    });
}


/* ---------------- PASSWORD VALIDATION ---------------- */

function validatePassword() {
    const value = password.value;
    const confirmValue = confirmPassword.value;

    const rules = {
        length: value.length >= 8,
        number: /\d/.test(value),
        uppercase: /[A-Z]/.test(value),
        special: /[^A-Za-z0-9]/.test(value)
    };

    const isPasswordValid =
        rules.length &&
        rules.number &&
        rules.uppercase &&
        rules.special;

    renderRules(rules);
    renderPasswordState(isPasswordValid);
    renderConfirmState(isPasswordValid, value, confirmValue);
}


/* ---------------- PASSWORD RULES UI ---------------- */

function renderRules(rules) {
    rulesUI.forEach(el => {
        const type = el.dataset.rule;
        const ok = rules[type];

        el.textContent =
            (ok ? "✅ " : "❌ ") +
            el.textContent.slice(2);
    });
}


/* ---------------- STATES ---------------- */

function renderPasswordState(valid) {
    passwordField.classList.toggle("valid", valid);
    passwordField.classList.toggle("invalid", !valid);
}

function renderConfirmState(isPasswordValid, value, confirmValue) {
    if (!confirmValue) {
        confirmField.classList.remove("valid", "invalid");
        return;
    }

    const match = isPasswordValid && value === confirmValue;

    confirmField.classList.toggle("valid", match);
    confirmField.classList.toggle("invalid", !match);
}