const {
    Pool
} = require('pg');
const jwt = require('jsonwebtoken');

const {
    encriptarContraseña,
    verificarContraseña
} = require('../middleware/encrypt.js');
const secretKey = "pepe";
const pool = new Pool({
    user: 'tu_usuario',
    host: '0.0.0.0',
    database: 'tu_base_de_datos',
    password: 'tu_contraseña',
    port: 5432,
});
const obtenerDatosDesdeBD = async () => {

    var pass = "pepe";
    console.log(await encriptarContraseña(pass));
    try {
        const result = await pool.connect();
        console.log('Usuario insertado correctamente');
    } catch (error) {
        console.error('Error al obtener datos desde la base de datos:', error);
        throw error;
    } finally {
    }
};
const register = async (persona) => {
    const client = await pool.connect();

    try {
        // Llamada al procedimiento almacenado con múltiples parámetros
        const result = await client.query(
            `CALL public.sp_add_persona($1, $2,$3,$4,$5,$6)`,
            [persona.nombre, persona.correo, persona.instrumento, await encriptarContraseña(persona.pass), persona.fecha_nacimiento, persona.apellido]
        );

        // Obtener el resultado del procedimiento almacenado
        const resultado = result;
    } finally {
        client.release();
    }

};
const login = async (persona, res) => {
    const client = await pool.connect();

    try {
        // Llamada al procedimiento almacenado con múltiples parámetros
        const result = await client.query(
            `SELECT public.sp_login_persona($1) as _password`, [persona.correo]);

        // Obtener el resultadoS
        const encryptedPassword = result.rows[0]._password;
        console.log('Contraseña encriptada:', encryptedPassword);
        console.log(persona.pass);
        if (await verificarContraseña(persona.pass, encryptedPassword)) {
            const token = jwt.sign(persona, secretKey, {
                expiresIn: '1h'
            });
            res.json({
                token
            });
        } else {
            res.status(403).send("Not authorization");
        }
    } catch (error) {
        res.status(500).send("Error server");
        console.log("error login", error);
    } finally {
        client.release();
    }
}
module.exports = {
    obtenerDatosDesdeBD,
    register,
    login
};