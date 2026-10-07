const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const search = document.getElementById("search");
const emptyMessage = document.getElementById("emptyMessage");

let students = JSON.parse(localStorage.getItem("students")) || [];

function save() {
  localStorage.setItem("students", JSON.stringify(students));
}

function render(filter = "") {
  table.innerHTML = "";
  const term = filter.toLowerCase();

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(term) ||
    s.roll.toLowerCase().includes(term) ||
    s.course.toLowerCase().includes(term)
  );

  emptyMessage.style.display = filtered.length ? "none" : "block";

  filtered.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(student.name)}</td>
      <td>${escapeHtml(student.roll)}</td>
      <td>${escapeHtml(student.course)}</td>
      <td>${student.attendance}%</td>
      <td>${student.marks}</td>
      <td><button class="delete" onclick="deleteStudent(${students.indexOf(student)})">Delete</button></td>
    `;
    table.appendChild(row);
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[c]));
}

form.addEventListener("submit", e => {
  e.preventDefault();

  students.push({
    name: document.getElementById("name").value.trim(),
    roll: document.getElementById("roll").value.trim(),
    course: document.getElementById("course").value.trim(),
    attendance: document.getElementById("attendance").value,
    marks: document.getElementById("marks").value
  });

  save();
  form.reset();
  render(search.value);
});

function deleteStudent(index) {
  if (confirm("Delete this student?")) {
    students.splice(index, 1);
    save();
    render(search.value);
  }
}

search.addEventListener("input", () => render(search.value));
render();
