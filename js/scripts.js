document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const selectedPlan = document.querySelector('input[name="plan"]:checked');

            const goals = [];
            document.querySelectorAll('input[name="goals"]:checked').forEach(function (box) {
                goals.push(box.value);
            });

            const data = {
                "Name": document.getElementById("name").value,
                "Email": document.getElementById("email").value,
                "Phone": document.getElementById("phone").value,
                "Age": document.getElementById("age").value,
                "Plan": selectedPlan ? selectedPlan.value : "Not selected",
                "Goals": goals.length > 0 ? goals.join(", ") : "Not selected",
                "Interest": document.getElementById("interest").value,
                "Message": document.getElementById("message").value
            };

            localStorage.setItem("formData", JSON.stringify(data));
            window.location.href = "success.html";
        });
    }

    const table = document.getElementById("resultTable");

    if (table) {
        const savedData = JSON.parse(localStorage.getItem("formData"));

        if (savedData) {
            for (let key in savedData) {
                const row = document.createElement("tr");

                const fieldCell = document.createElement("td");
                fieldCell.textContent = key;

                const valueCell = document.createElement("td");
                valueCell.textContent = savedData[key];

                row.appendChild(fieldCell);
                row.appendChild(valueCell);
                table.appendChild(row);
            }
        }
    }
});