const API_URL = "http://localhost:8080/api/students";

const form = document.getElementById("studentForm");


// CREATE / UPDATE STUDENT
form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const id = document.getElementById("studentId").value;

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value,
        year: parseInt(document.getElementById("year").value),
        phone: document.getElementById("phone").value
    };

    let response;

    // CREATE
    if (id === "") {

        response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

    }

    // UPDATE
    else {

        response = await fetch(API_URL + "/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

    }

    if (response.ok) {

        alert("Student saved successfully!");

        clearForm();

        loadStudents();

    }

    else {

        const error = await response.json();

        alert(JSON.stringify(error));

    }

});


// READ ALL STUDENTS
async function loadStudents() {

    const response = await fetch(API_URL);

    const students = await response.json();

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    students.forEach(student => {

        const row = `
            <tr>

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${student.email}</td>

                <td>${student.department}</td>

                <td>${student.year}</td>

                <td>${student.phone}</td>

                <td>

                    <button
                        class="edit"
                        onclick="editStudent(${student.id})">
                        Edit
                    </button>

                    <button
                        onclick="deleteStudent(${student.id})">
                        Delete
                    </button>

                </td>

            </tr>
        `;

        table.innerHTML += row;

    });

}


// EDIT STUDENT
async function editStudent(id) {

    const response = await fetch(API_URL + "/" + id);

    const student = await response.json();

    document.getElementById("studentId").value = student.id;

    document.getElementById("name").value = student.name;

    document.getElementById("email").value = student.email;

    document.getElementById("department").value = student.department;

    document.getElementById("year").value = student.year;

    document.getElementById("phone").value = student.phone;

}


// DELETE STUDENT
async function deleteStudent(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) {
        return;
    }

    const response = await fetch(API_URL + "/" + id, {
        method: "DELETE"
    });

    if (response.ok) {

        alert("Student deleted successfully!");

        loadStudents();

    }

    else {

        alert("Student not found");

    }

}


// CLEAR FORM
function clearForm() {

    document.getElementById("studentForm").reset();

    document.getElementById("studentId").value = "";

}


// LOAD STUDENTS WHEN PAGE OPENS
loadStudents();