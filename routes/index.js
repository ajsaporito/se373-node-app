const express = require('express');
const router = express.Router();

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
  const response = await fetch(`${res.locals.baseUrl}/api/employees`); 
  const employees = await response.json();

  res.render('view', {
    title: "View Employees",
    employees
  });
});

router.get('/update/:id', isAuthenticated, async (req, res) => {
  const { id }  = req.params;
  const response = await fetch(`${res.locals.baseUrl}/api/employees/${id}`);
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

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('error_msg', 'Please log in to see this page.');
  res.redirect('/login');
}

module.exports = router;
