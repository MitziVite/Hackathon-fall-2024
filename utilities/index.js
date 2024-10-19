const revModel = require("../models/reviewModel");
const Util = {};

// Genera el formulario HTML dinámicamente
Util.getNav = async function (req, res, next) {
    let data = await revModel.getClassifications()
    

    return formHTML;
};

// Manejo de errores
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;
