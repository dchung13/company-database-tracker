INSERT INTO department (name)
VALUES ('Human Resources'),
    ('Billing Buffalo'),
    ('Recruitment Rat'),
    ('Management Monster'),
    ('Cubicle Creature'),
    ('Customer Support Snake');

INSERT INTO roles (title, salary, department_id)
VALUES ('HR Rep', 65000, 1),
    ('Billing Rep', 53000, 2),
    ('Management Rep', 89000, 3),
    ('Cubicle Rep', 70000, 4),
    ('Customer Support Rep', 57000, 5);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ('Bryan', 'Nguyen', 1),
    ('Jonathan', 'Borroel', 2),
    ('Evan', 'Schindler', 3),
    ('David', 'Vo', 4),
    ('Jedd', 'Lin', 5),
    ('Scarlett', 'Borroel', 2);