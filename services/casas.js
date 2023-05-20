const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, alquiler, camas, baños, direccion, ciudad, foto 
    FROM casas LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function create(casa) {
    const result = await db.query(
        `INSERT INTO casas 
      (alquiler, camas, baños, direccion, ciudad, foto) 
      VALUES 
      ( '${casa.alquiler}',
        '${casa.camas}',
        '${casa.baños}',
        '${casa.direccion}',
        '${casa.ciudad}',
        '${casa.foto}')`
    );

    let message = 'Error al crear los datos de la casa';

    if (result.affectedRows) {
        message = 'Datos de la casa creados correctamente';
    }

    return { message };
}

async function update(id, casa) {
    const result = await db.query(
        `UPDATE casas 
      SET alquiler="${casa.alquiler}",
      camas="${casa.camas}",
      baños="${casa.baños}",
      direccion="${casa.direccion}",
      ciudad="${casa.ciudad}",
      foto="${casa.foto}" 
      WHERE id=${id}`
    );

    let message = 'Error al actualizar los datos de la casa';

    if (result.affectedRows) {
        message = 'Datos de la casa actualizados correctamente';
    }

    return { message };
}

async function remove(id) {
    const result = await db.query(
        `DELETE FROM casas WHERE id=${id}`
    );

    let message = 'Error al eliminar los datos de la casa';

    if (result.affectedRows) {
        message = 'Datos de la casa eliminados correctamnente';
    }

    return { message };
}

module.exports = {
    getMultiple,
    create,
    update,
    remove
}