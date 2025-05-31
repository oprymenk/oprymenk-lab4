document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const number = document.getElementById("number").value.trim();
        const gender = form.querySelector('input[name="gender"]:checked')?.value;

        const nameRegex = /^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']+$/u;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        let errors = [];

        if (!nameRegex.test(name)) {
            errors.push("Ім'я повинно починатися з великої літери та містити тільки літери.");
        }

        if (!emailRegex.test(email)) {
            errors.push("Будь ласка, введіть коректну електронну адресу.");
        }

        if (!phoneRegex.test(number)) {
            errors.push("Номер телефону має містити рівно 10 цифр.");
        }

        if (!gender) {
            errors.push("Будь ласка, виберіть стать.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        const formData = new FormData(form);

        fetch("submit.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            alert(result);
            form.reset();
        })
        .catch(error => {
            alert("Помилка під час надсилання форми: " + error);
        });
    });
});
