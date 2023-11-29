const bcrypt = require('bcrypt');
const saltRounds = 10;

const encriptarContraseña = async (contraseña) => {
  try {
    const hash = await bcrypt.hash(contraseña, saltRounds);
    return hash;
  } catch (error) {
    throw error;
  }
};

const verificarContraseña = async (contraseña, hash) => {
  try {
    const match = await bcrypt.compare(contraseña, hash);
    return match;
  } catch (error) {
    throw error;
  }
};
module.exports={
    encriptarContraseña,
    verificarContraseña
};