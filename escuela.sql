\c template1
DROP DATABASE escuela;
CREATE DATABASE escuela;
\c escuela

CREATE TABLE estudiantes (
  nombre VARCHAR(50),
  rut VARCHAR(12) UNIQUE,
  curso VARCHAR(50),
  nivel INT
);

SELECT * FROM estudiantes;