let students = JSON.parse(localStorage.getItem("students")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || {};

const startDate = new Date("2026-08-31");
const endDate = new Date("2027-06-18");

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
  localStorage.setItem("attendance", JSON.stringify(attendance));
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric"
  });
}

function getWeeks() {
  let weeks = [];
  let current = new Date(startDate);

  while (current <= endDate) {
    let week = [];

    for (let i = 0; i < 5; i++) {
      let d = new Date(current);
      d.setDate(current.getDate() + i);

      if (d <= endDate) {
        week.push(d);
      }
    }

    weeks.push(week);
    current.setDate(current.getDate() + 7);
  }

  return weeks;
}

function loadWeeks() {
  const weekSelect = document.getElementById("weekSelect");
  const weeks = getWeeks();

  weekSelect.innerHTML = "";

  weeks.forEach((week, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${formatDate(week[0])} - ${formatDate(week[week.length - 1])}`;
    weekSelect.appendChild(option);
  });
}

function addStudent() {
  const input = document.getElementById("studentName");
  const name = input.value.trim();

  if (name === "") {
    alert("Enter a student name.");
    return;
  }

  students.push(name);
  input.value = "";

  saveData();
  buildTable();
}

function buildTable() {
  const tbody = document.getElementById("attendanceBody");
  const weekIndex = document.getElementById("weekSelect").value;
  const week = getWeeks()[weekIndex];

  tbody.innerHTML = "";

  students.forEach(student => {
    const row = document.createElement("tr");

    let html = `<td>${student}</td>`;

    week.forEach(date => {
      const dateKey = date.toISOString().split("T")[0];
      const key = `${student}_${dateKey}`;
      const checked = attendance[key] ? "checked" : "";

      html += `
        <td>
          <input type="checkbox" ${checked}
          onchange="markAttendance('${student}', '${dateKey}', this.checked)">
          <br>${formatDate(date)}
        </td>
      `;
    });

    html += `<td class="total">0</td>`;
    row.innerHTML = html;
    tbody.appendChild(row);

    updateRowTotal(row);
  });
}

function markAttendance(student, dateKey, isChecked) {
  const key = `${student}_${dateKey}`;
  attendance[key] = isChecked;

  saveData();
  buildTable();
}

function updateRowTotal(row) {
  const checks = row.querySelectorAll("input[type='checkbox']");
  let total = 0;

  checks.forEach(box => {
    if (box.checked) total++;
  });

  row.querySelector(".total").textContent = total;
}

loadWeeks();
buildTable();