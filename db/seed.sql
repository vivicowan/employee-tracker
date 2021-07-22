USE employee_trackerDB;

INSERT INTO department (department)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 1),
    ("Salesperson", 80000, 1),

    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),

    ("Account Manager", 160000, 3),
    ("Accountant", 125000, 3),

    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Lucy", "Roberts", 1, NULL),
    ("Clayton", "Valentine", 2, 1),
    ("Truda", "Carllen", 3, NULL),
    ("Kevin", "Tupik", 4, 3),
    ("Lonnie", "Wolf", 5, NULL),
    ("Nick", "Fujita", 6, 5),
    ("Lane", "Owens", 7, NULL),
    ("Julian", "Huffman", 8, 7);