import express from 'express';
import { createConnection } from 'mysql';
import { json } from 'body-parser';

const app = express();
const port = 3000;

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: '*LoboSQL7319+',
    database: 'parqueaderoDB'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.message);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

app.use(json());

app.get('/registros', (req, res) => {
    db.query('SELECT * FROM registros', (err, results) => {
        if (err) {
            console.error('Error al obtener registros: ' + err.message);
            res.status(500).send('Error del servidor');
            return;
        }
        res.json(results);
    });
});

app.post('/registros', (req, res) => {
    const { tipo, placa } = req.body;
    if (!tipo || !placa) {
        res.status(400).send('Faltan datos obligatorios');
        return;
    }

    db.query('SELECT COUNT(*) AS count FROM registros WHERE tipo_vehiculo = ?', [tipo], (err, results) => {
        if (err) {
            console.error('Error al obtener el número de registros: ' + err.message);
            res.status(500).send('Error del servidor');
            return;
        }

        const count = results[0].count;
        if ((tipo === 'carro' && count >= 5) || (tipo === 'moto' && count >= 10)) {
            res.status(400).send(`No hay cupo disponible para ${tipo}s`);
            return;
        }

        db.query('INSERT INTO registros (tipo_vehiculo, placa) VALUES (?, ?)', [tipo, placa], (err, result) => {
            if (err) {
                console.error('Error al crear un nuevo registro: ' + err.message);
                res.status(500).send('Error del servidor');
                return;
            }
            res.status(201).send('Registro creado exitosamente');
        });
    });
});

app.put('/registros/:id', (req, res) => {
    const id = req.params.id;
    const { tipo, placa } = req.body;
    db.query('UPDATE registros SET tipo_vehiculo=?, placa=? WHERE id=?', [tipo, placa, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el registro: ' + err.message);
            res.status(500).send('Error del servidor');
            return;
        }
        res.send('Registro actualizado exitosamente');
    });
});

app.delete('/registros/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM registros WHERE id=?', [id], (err, result) => {
        if (err) {
            console.error('Error al borrar el registro: ' + err.message);
            res.status(500).send('Error del servidor');
            return;
        }
        res.send('Registro eliminado exitosamente');
    });
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
