/* =========================================
   EDUTRACK STUDENT MANAGEMENT SYSTEM
   ========================================= */


/* -----------------------------------------
   DEFAULT STUDENT DATA
----------------------------------------- */

const defaultStudents = [
  {
    id: 1,
    name: "Aarav Sharma",
    roll: "AIDS001",
    department: "AI & DS",
    year: "3rd Year",
    score: 88,
    attendance: 92,
    maths: 88,
    science: 88,
    english: 88
  },

  {
    id: 2,
    name: "Priya Patil",
    roll: "CS014",
    department: "Computer Science",
    year: "2nd Year",
    score: 91,
    attendance: 95,
    maths: 91,
    science: 91,
    english: 91
  },

  {
    id: 3,
    name: "Rahul Deshmukh",
    roll: "IT021",
    department: "Information Technology",
    year: "3rd Year",
    score: 76,
    attendance: 84,
    maths: 76,
    science: 76,
    english: 76
  },

  {
    id: 4,
    name: "Sneha Joshi",
    roll: "EC008",
    department: "Electronics",
    year: "1st Year",
    score: 83,
    attendance: 89,
    maths: 83,
    science: 83,
    english: 83
  },

  {
    id: 5,
    name: "Yash Verma",
    roll: "ME019",
    department: "Mechanical",
    year: "4th Year",
    score: 72,
    attendance: 78,
    maths: 72,
    science: 72,
    english: 72
  },

  {
    id: 6,
    name: "Ananya Kulkarni",
    roll: "AIDS017",
    department: "AI & DS",
    year: "2nd Year",
    score: 94,
    attendance: 96,
    maths: 94,
    science: 94,
    english: 94
  }
];


/* -----------------------------------------
   LOCAL STORAGE
----------------------------------------- */

function getStudents() {

  const saved = localStorage.getItem("edutrack_students");

  if (saved) {
    return JSON.parse(saved);
  }

  localStorage.setItem(
    "edutrack_students",
    JSON.stringify(defaultStudents)
  );

  return defaultStudents;
}


function saveStudents(students) {

  localStorage.setItem(
    "edutrack_students",
    JSON.stringify(students)
  );

}


/* -----------------------------------------
   DASHBOARD
----------------------------------------- */

function loadDashboard() {

  const students = getStudents();

  const totalElement =
    document.getElementById("totalStudents");

  const departmentElement =
    document.getElementById("totalDepartments");

  const scoreElement =
    document.getElementById("averageScore");

  const attendanceElement =
    document.getElementById("averageAttendance");


  if (!totalElement) return;


  /*
  🐛 BUG #1 — WRONG STUDENT COUNT

  The actual number of students is:

      students.length

  But this intentionally adds 1.

  AI agent should identify and fix this.
  */

  totalElement.textContent =
    students.length + 1;


  const departments =
    [...new Set(
      students.map(student => student.department)
    )];

  departmentElement.textContent =
    departments.length;


  const averageScore =
    students.reduce(
      (sum, student) => sum + student.score,
      0
    ) / students.length;

  scoreElement.textContent =
    Math.round(averageScore) + "%";


  const averageAttendance =
    students.reduce(
      (sum, student) => sum + student.attendance,
      0
    ) / students.length;

  attendanceElement.textContent =
    Math.round(averageAttendance) + "%";


  renderRecentStudents(students);

  renderDepartmentStats(students);
}


/* -----------------------------------------
   RECENT STUDENTS
----------------------------------------- */

function renderRecentStudents(students) {

  const container =
    document.getElementById("recentStudents");

  if (!container) return;


  const recent =
    [...students]
      .reverse()
      .slice(0, 5);


  container.innerHTML = recent.map(student => {

    const initials =
      getInitials(student.name);

    return `

      <div class="recent-student">

        <div class="student-avatar">
          ${initials}
        </div>

        <div class="student-info">

          <strong>
            ${student.name}
          </strong>

          <small>
            ${student.department} • ${student.year}
          </small>

        </div>

        <span class="score">
          ${student.score}%
        </span>

      </div>

    `;

  }).join("");
}


/* -----------------------------------------
   DEPARTMENT STATISTICS
----------------------------------------- */

function renderDepartmentStats(students) {

  const container =
    document.getElementById("departmentStats");

  if (!container) return;


  const departments = {};


  students.forEach(student => {

    if (!departments[student.department]) {
      departments[student.department] = 0;
    }

    departments[student.department]++;

  });


  const total =
    students.length;


  container.innerHTML =
    Object.entries(departments)
      .map(([department, count]) => {

        const percentage =
          Math.round((count / total) * 100);

        return `

          <div class="department-item">

            <div class="department-header">

              <span>
                ${department}
              </span>

              <strong>
                ${count}
              </strong>

            </div>

            <div class="progress">

              <div style="width:${percentage}%"></div>

            </div>

          </div>

        `;

      })
      .join("");
}


/* -----------------------------------------
   STUDENT TABLE
----------------------------------------- */

function renderStudents() {

  const table =
    document.getElementById("studentTable");

  if (!table) return;


  const searchInput =
    document.getElementById("searchInput");

  const filter =
    document.getElementById("departmentFilter");


  const search =
    searchInput
      ? searchInput.value.trim()
      : "";


  const department =
    filter
      ? filter.value
      : "all";


  let students =
    getStudents();


  /*
  🐛 BUG #2 — SEARCH BUG

  This search is intentionally case-sensitive.

  Example:

      "Aarav" → works
      "aarav" → doesn't work

  An AI coding agent should fix this by
  normalizing both values with toLowerCase().
  */

  if (search) {

    students =
      students.filter(student =>
        student.name.includes(search)
      );

  }


  if (department !== "all") {

    students =
      students.filter(
        student =>
          student.department === department
      );

  }


  table.innerHTML =
    students.map(student => {

      const initials =
        getInitials(student.name);

      return `

        <tr>

          <td>

            <div class="student-cell">

              <div class="student-avatar">
                ${initials}
              </div>

              <div>

                <strong>
                  ${student.name}
                </strong>

                <small>
                  ${student.roll}
                </small>

              </div>

            </div>

          </td>


          <td>
            ${student.roll}
          </td>


          <td>

            <span class="badge">
              ${student.department}
            </span>

          </td>


          <td>
            ${student.year}
          </td>


          <td class="score-good">
            <span class="clickable-percentage" onclick="showWrongPercentageAlert(${student.id})" title="Click to view calculation">${student.score}%</span>
          </td>


          <td class="attendance-good">
            ${student.attendance}%
          </td>


          <td>

            <button
              class="marks-btn"
              onclick="openMarksModal(${student.id})"
              title="Add Marks"
            >
              📝
            </button>

            <button
              class="delete-btn"
              onclick="deleteStudent(${student.id})"
              title="Delete student"
            >
              🗑
            </button>

          </td>

        </tr>

      `;

    }).join("");


  const empty =
    document.getElementById("emptyState");

  if (empty) {

    empty.classList.toggle(
      "hidden",
      students.length !== 0
    );

  }

}


/* -----------------------------------------
   DELETE STUDENT
----------------------------------------- */

function deleteStudent(id) {

  const confirmed =
    confirm(
      "Are you sure you want to delete this student?"
    );


  if (!confirmed) return;


  let students =
    getStudents();


  students =
    students.filter(
      student => student.id !== id
    );


  saveStudents(students);


  renderStudents();

}


/* -----------------------------------------
   MODAL
----------------------------------------- */

function openModal() {

  const modal =
    document.getElementById("studentModal");

  if (modal) {
    modal.classList.add("show");
  }

}


function closeModal() {

  const modal =
    document.getElementById("studentModal");

  if (modal) {
    modal.classList.remove("show");
  }

}


/* -----------------------------------------
   ADD STUDENT
----------------------------------------- */

function setupStudentForm() {

  const form =
    document.getElementById("studentForm");

  if (!form) return;


  form.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const studentScore = Number(document.getElementById("studentScore").value);
      const student = {

        id: Date.now(),

        name:
          document.getElementById("studentName").value.trim(),

        roll:
          document.getElementById("rollNumber").value.trim(),

        department:
          document.getElementById("studentDepartment").value,

        year:
          document.getElementById("studentYear").value,

        score: studentScore,

        attendance:
          Number(
            document.getElementById("studentAttendance").value
          ),

        maths: studentScore,
        science: studentScore,
        english: studentScore

      };


      const students =
        getStudents();


      students.push(student);


      saveStudents(students);


      form.reset();

      closeModal();

      renderStudents();


      alert(
        "Student added successfully!"
      );

    }
  );

}


/* -----------------------------------------
   REPORTS
----------------------------------------- */

function loadReports() {

  const reportStudents =
    document.getElementById("reportStudents");

  if (!reportStudents) return;


  const students =
    getStudents();


  reportStudents.textContent =
    students.length;


  const averageScore =
    students.reduce(
      (sum, student) => sum + student.score,
      0
    ) / students.length;


  const averageAttendance =
    students.reduce(
      (sum, student) => sum + student.attendance,
      0
    ) / students.length;


  document.getElementById("reportScore")
    .textContent =
    Math.round(averageScore) + "%";


  document.getElementById("reportAttendance")
    .textContent =
    Math.round(averageAttendance) + "%";

}


/* -----------------------------------------
   UTILITY
----------------------------------------- */

function getInitials(name) {

  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

}


/* -----------------------------------------
   PAGE INITIALIZATION
----------------------------------------- */

/* -----------------------------------------
   MARKS MODAL & CALCULATION LOGIC
----------------------------------------- */

function openMarksModal(id) {
  const modal = document.getElementById("marksModal");
  if (!modal) return;

  const students = getStudents();
  const student = students.find(s => s.id === id);
  if (!student) return;

  document.getElementById("marksStudentId").value = student.id;
  document.getElementById("mathsMarks").value = student.maths !== undefined ? student.maths : student.score;
  document.getElementById("scienceMarks").value = student.science !== undefined ? student.science : student.score;
  document.getElementById("englishMarks").value = student.english !== undefined ? student.english : student.score;

  modal.classList.add("show");
}

function closeMarksModal() {
  const modal = document.getElementById("marksModal");
  if (modal) {
    modal.classList.remove("show");
  }
}

function setupMarksForm() {
  const form = document.getElementById("marksForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = Number(document.getElementById("marksStudentId").value);
    const maths = Number(document.getElementById("mathsMarks").value);
    const science = Number(document.getElementById("scienceMarks").value);
    const english = Number(document.getElementById("englishMarks").value);

    // BUG: Intentionally calculate percentage out of 400 instead of 300 to show wrong percentage
    const wrongScore = Math.round((maths + science + english) / 4);

    const students = getStudents();
    const student = students.find(s => s.id === id);
    if (student) {
      student.maths = maths;
      student.science = science;
      student.english = english;
      student.score = wrongScore;
    }

    saveStudents(students);
    closeMarksModal();
    renderStudents();
    loadDashboard();
    loadReports();

    alert(`Marks updated successfully!\nCalculated percentage is ${wrongScore}% (Bug formula: (${maths} + ${science} + ${english}) / 4)`);
  });
}

function showWrongPercentageAlert(id) {
  const students = getStudents();
  const student = students.find(s => s.id === id);
  if (!student) return;

  const maths = student.maths !== undefined ? student.maths : student.score;
  const science = student.science !== undefined ? student.science : student.score;
  const english = student.english !== undefined ? student.english : student.score;

  const total = maths + science + english;
  // Buggy calculation
  const wrongPercentage = Math.round(total / 4);
  const correctPercentage = Math.round(total / 3);

  alert(
    `Student Marks Details for ${student.name}:\n` +
    `-----------------------------------------\n` +
    `• Mathematics: ${maths}/100\n` +
    `• Science: ${science}/100\n` +
    `• English: ${english}/100\n` +
    `• Total Obtained: ${total}/300\n` +
    `-----------------------------------------\n` +
    `Calculated Percentage: ${wrongPercentage}%  ⚠️\n\n` +
    `[Bug details: The website calculated this percentage by dividing the total (${total}) by 4 instead of 3, resulting in ${wrongPercentage}% instead of ${correctPercentage}%!]`
  );
}

function showWrongAverageAlert() {
  const students = getStudents();
  if (students.length === 0) return;

  const averageScoreCorrect = Math.round(
    students.reduce((sum, student) => sum + student.score, 0) / students.length
  );

  // Buggy average score calculation (e.g. 25% lower than correct value)
  const wrongAverage = Math.round(averageScoreCorrect * 0.75);

  alert(
    `Overall Performance Average Score:\n` +
    `-----------------------------------------\n` +
    `Calculated Average: ${wrongAverage}%  ⚠️\n\n` +
    `[Bug details: The average score indicator on the page has a bug where it calculates ${wrongAverage}% instead of ${averageScoreCorrect}%!]`
  );
}

function setupReportsLinkBug() {
  const reportsLinks = document.querySelectorAll(".reports-link");
  reportsLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      console.warn("Reports navigation blocked by intentional bug.");
    });
  });
}


/* -----------------------------------------
   PAGE INITIALIZATION
----------------------------------------- */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    loadDashboard();

    renderStudents();

    setupStudentForm();

    setupMarksForm();

    loadReports();

    setupReportsLinkBug();

  }
);