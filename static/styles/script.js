window.addEventListener('pageshow', function (event) {
    if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
        document.querySelector('form').reset();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const number = document.getElementById("number").value.trim();

        const nameRegex = /^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']+$/u;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        if (!nameRegex.test(name)) {
            alert("Ім'я повинно починатися з великої літери та містити тільки літери.");
            e.preventDefault();
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Будь ласка, введіть коректну електронну адресу.");
            e.preventDefault();
            return;
        }

        if (!phoneRegex.test(number)) {
            alert("Номер телефону має містити рівно 10 цифр.");
            e.preventDefault();
            return;
        }
    });
});
