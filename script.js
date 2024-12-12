let employees = [];
let currentPage = 1;
const employeesPerPage = 5;

// Toggle the navigation menu on small screens
function toggleMenu() {
    const menuItems = document.querySelector('.nav-menu ul');
    if (menuItems.style.display === 'block') {
        menuItems.style.display = 'none';  // Hide the menu
    } else {
        menuItems.style.display = 'block';  // Show the menu
    }
}

function showPage(page) {
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('employee-listing').style.display = 'none';

    if (page === 'registration') {
        document.getElementById('registration-form').style.display = 'block';
    }

    if (page === 'listing') {
        loadEmployees();
        document.getElementById('employee-listing').style.display = 'block';
    }
}

function submitForm(event) {
    event.preventDefault();
    
    // Get values from the form
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const about = document.getElementById('about').value;
    const joining_date = document.getElementById('joining_date').value;

    // Create a new employee object and push it to the employees array
    const employee = { name, position, about, joining_date };
    employees.push(employee);
    
    // Store the updated employees list in localStorage
    localStorage.setItem('employees', JSON.stringify(employees));

    // Alert the user
    alert("Employee registered successfully!");

    // Reset the form fields to default state
    document.getElementById('employee-form').reset();

    // Optionally, you can display the Employee Listing page
    showPage('listing');
}

function loadEmployees() {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
        employees = JSON.parse(storedEmployees);
    }
    displayEmployees();
}

function displayEmployees() {
    const tableBody = document.getElementById('employee-table-body');
    tableBody.innerHTML = '';

    const startIndex = (currentPage - 1) * employeesPerPage;
    const endIndex = startIndex + employeesPerPage;
    const currentEmployees = employees.slice(startIndex, endIndex);

    currentEmployees.forEach((emp, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.name}</td>
            <td>${emp.position}</td>
            <td>${emp.about}</td>
            <td>${emp.joining_date}</td>
            <td><button onclick="removeEmployee(${startIndex + index})">Remove</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function removeEmployee(index) {
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
    displayEmployees();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayEmployees();
    }
}

function nextPage() {
    if (currentPage * employeesPerPage < employees.length) {
        currentPage++;
        displayEmployees();
    }
}

function filterEmployees() {
    const searchText = document.getElementById('search-bar').value.toLowerCase();
    employees = employees.filter(emp => emp.name.toLowerCase().includes(searchText));
    displayEmployees();
}

function filterEmployeesListing() {
    const searchText = document.getElementById('search-list').value.toLowerCase();
    employees = employees.filter(emp => emp.name.toLowerCase().includes(searchText));
    displayEmployees();
}

// Initial call to load the employee list on page load
loadEmployees();

