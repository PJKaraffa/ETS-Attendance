function addStudent() {
  const nameInput = document.getElementById("studentName");
  const name = nameInput.value.trim();

  if (name === "") {
    alert("Please enter a student name.");
    return;
  }

  const tbody = document.querySelector("#attendanceTable tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${name}</td>
    <td><input type="checkbox" onchange="updateTotal(this)"></td>
    <td><input type="checkbox" onchange="updateTotal(this)"></td>
    <td><input type="checkbox" onchange="updateTotal(this)"></td>
    <td><input type="checkbox" onchange="updateTotal(this)"></td>
    <td><input type="checkbox" onchange="updateTotal(this)"></td>
    <td class="total">0</td>
  `;

  tbody.appendChild(row);
  nameInput.value = "";
}

function updateTotal(checkbox) {
  const row = checkbox.closest("tr");
  const checks = row.querySelectorAll("input[type='checkbox']");
  let total = 0;

  checks.forEach(box => {
    if (box.checked) total++;
  });

  row.querySelector(".total").textContent = total;
}