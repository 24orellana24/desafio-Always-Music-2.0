const { Pool } = require('pg');

const argumentos = process.argv.slice(2)

const config = {
  user: 'joseorellanaaravena',
  host: 'localhost',
  database: 'escuela',
  password: '240512',
  port: 5432,
  max: 50,
  min: 0,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

const pool = new Pool(config);

if (argumentos[0] === 'nuevo') {
  nuevo()
} else if (argumentos[0] === 'consulta') {
  consulta()
} else if (argumentos[0] === 'editar') {
  editar()
} else if (argumentos[0] === 'eliminar') {
  eliminar()
}

function nuevo() {
  pool.connect(async (error, client, release) => {
    if (error) {
      console.log('Error de conexión: ', error.code)
    } else {
      try {
        const SQLquery = {
          name: 'fetch-user',
          text: 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *;',
          values: [argumentos[1], argumentos[2], argumentos[3], argumentos[4]]
        }
        const res = await client.query(SQLquery);
        console.log(`Estudiante "${res.rows[0].nombre.toUpperCase()}" agrgado con éxito`);
      } catch (error) {
        console.error('Error de query: ', error.code)
      }
    }
    release();
    pool.end();
  });
}

function consulta() {
  pool.connect(async (error, client, release) => {
    if (error) {
      console.log('Error de conexión: ', error.code)
    } else {
      try {
        if (argumentos.length == 1) {
          const SQLquery = {
            name: 'fetch-user',
            text: 'SELECT * FROM estudiantes;',
          }
          const res = await client.query(SQLquery)
          console.log('Registros totales de la base:\n', res.rows);
        } else if (argumentos.length == 2) {
          const SQLquery = {
            name: 'fetch-user',
            text: 'SELECT * FROM estudiantes WHERE rut=$1;',
            values: [argumentos[1]]
          }
          const res = await client.query(SQLquery)
          console.log('Los datos del rut consultado son:\n', res.rows);
        } 
      } catch (error) {
        console.error('Error de query: ', error)
      }
    }
    release();
    pool.end();
  });
}

function editar() {
  pool.connect(async (error, client, release) => {
    if (error) {
      console.log('Error de conexión: ', error.code)
    } else {
      try {
        const SQLquery = {
          name: 'fetch-user',
          text: 'UPDATE estudiantes SET nombre=$1, curso=$3, nivel=$4 WHERE rut=$2 RETURNING *;',
          values: [argumentos[1], argumentos[2], argumentos[3], argumentos[4]]
        }
        const res = await client.query(SQLquery);
        console.log(`Estudiante "${res.rows[0].nombre.toUpperCase()}" editado con éxito`);
      } catch (error) {
        console.error('Error de query: ', error.code)
      }
    }
    release();
    pool.end();
  });
}

function eliminar() {
  pool.connect(async (error, client, release) => {
    if (error) {
      console.log('Error de conexión: ', error.code)
    } else {
      try {
        const SQLquery = {
          name: 'fetch-user',
          text: 'DELETE FROM estudiantes WHERE rut=$1;',
          values: [argumentos[1]]
        }
        const res = await client.query(SQLquery);
        console.log(`Registro de estuduante con rut "${argumentos[1]}" eliminado con éxito`);
      } catch (error) {
        console.error('Error de query: ', error.code)
      }
    }
    release();
    pool.end();
  });
}