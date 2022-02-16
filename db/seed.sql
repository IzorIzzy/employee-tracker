USE employee_tracker;

INSERT INTO department
    (name)
VALUES
    ("Finance"),
    ("Sales"),
    ("Engineering"),
    ("Legal");

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ("Accountant", 80000,  1),
    ("Software Engineer", 80000, 3),
    ("Lawyer", 120000, 4),
    ("Sales Rep", 70000, 2);

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES
    ("Issachar", "Moore", 3),
    ("George", "Clooney", 4),
    ("Bootsy", "Collins", 1),
    ("Blade", "Vampire", 2);
