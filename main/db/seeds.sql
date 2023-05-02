INSERT INTO department (name)
VALUES ('Human Resources'),
    ('Billing Buffalo'),
    ('Recruitment Rat'),
    ('Management Monster'),
    ('Cubicle Creature'),
    ('Customer Support Snake');

INSERT INTO roles (title, salary, department_id)
VALUES ('HR Rep', 110000, 1),
    ('Billing Rep', 41000, 2),
    ('Management Rep', 149000, 3),
    ('Cubicle Rep', 130000, 4),
    ('Customer Support Rep', 71000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Bryan', 'Nguyen', 1, null),
    ('Jonathan', 'Borroel', 2, 1),
    ('Evan', 'Schindler', 3, null),
    ('David', 'Vo', 4, 3),
    ('Jedd', 'Lin', 5, 3),
    ('Scarlett', 'Borroel', 2, 1);