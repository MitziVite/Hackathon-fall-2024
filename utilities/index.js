const revModel = require("../models/reviewModel");
const Util = {};

// Genera el formulario HTML dinámicamente
Util.getNav = async function (req, res, next) {
    let data = await revModel.getClassifications()
    

    return formHTML;
};



// Manejo de errores
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);



Util.createOutcomes = function(outcomesList){

    console.log('Starting to create HTML')
    let outcomeHTML = "<ul>";
    outcomesList.forEach(outcome => {
        outcomeHTML += `<li>${outcome['value']}</li>`;
    });
    outcomeHTML += `</ul>`
    console.log('creted HTML list items')
    return outcomeHTML;
}
module.exports = Util;
