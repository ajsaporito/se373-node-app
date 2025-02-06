const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware').isAuthenticated;

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', {
    title: "Dashboard",
    user: req.user.username
  });
});

router.get('/add', isAuthenticated, (req, res) => {
  res.render('add', {
    title: "Add an Employee"
  });
});

router.get('/view', isAuthenticated, async (req, res) => {
  const response = await fetch('http://localhost:3000/api/employees'); 
  const employees = await response.json();

  res.render('view', {
    title: "View Employees",
    employees
  });
});

router.get('/update/:id', isAuthenticated, async (req, res) => {
  const { id }  = req.params;
  const response = await fetch(`http://localhost:3000/api/employees/${id}`);
  const employee = await response.json();

  if (!response.ok) {
    return res.status(404).send('Page not found.');
  }

  const departments = [
    { name: 'Manager', selected: employee.department === 'Manager' },
    { name: 'Senior Dev', selected: employee.department === 'Senior Dev' },
    { name: 'Junior Dev', selected: employee.department === 'Junior Dev' },
  ];

  res.render('update', {
    title: "Update an Employee",
    employee,
    departments
  });
});

router.get('/delete', isAuthenticated, (req, res) => {
  const { firstName, lastName } = req.query;
  
  if (!firstName || !lastName) {
    return res.status(400).send("Bad request.");
  }
  
  res.render('delete', {
    title: "Deleted Employee",
    employee: { firstName, lastName }
  });
});

module.exports = router;
