document.addEventListener("DOMContentLoaded", function () {
    // Handle the membership form only on the contact page.
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Collect the selected plan and all checked fitness goals.
            const selectedPlan = document.querySelector('input[name="plan"]:checked');

            const goals = [];
            document.querySelectorAll('input[name="goals"]:checked').forEach(function (box) {
                goals.push(box.value);
            });

            // Store every submitted field so the result page can build a table.
            const data = {
                "Name": document.getElementById("name").value,
                "Email": document.getElementById("email").value,
                "Phone": document.getElementById("phone").value,
                "Age": document.getElementById("age").value,
                "Plan": selectedPlan? selectedPlan.value: "Not selected",
                "Goals": goals.length > 0 ? goals.join(", ") : "Not selected",
                "Interest": document.getElementById("interest").value,
                "Message": document.getElementById("message").value
            };

            localStorage.setItem("formData", JSON.stringify(data));
            window.location.href = "success.html";
        });
    }

    // Build the submission table on the fresh success page.
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
    // Add smooth scrolling 
    document.querySelectorAll(".back-to-top").forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });
});
