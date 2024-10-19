const revModel = require("../models/reviewModel");
const Util = {};

// Genera el formulario HTML dinámicamente
Util.getNav = async function (req, res, next) {
    let data = await revModel.getClassifications()
    let formHTML = '<div class="container-form"><form id="reviewForm">';

    // Código de la clase
    formHTML += `
        <label for="codeClass">Class Code</label>
        <input type="text" id="codeClass" name="codeClass" required>
    `;

    // Dropdown de calificaciones
    formHTML += `
        <label for="grades">Grades</label>
        <div class="dropdown">  
            <div class="select">
                <span class="selected">Grades</span>
                <div class="caret"></div>
            </div>
            <ul class="menu">
                <li>A+</li>
                <li>A-</li>
                <li>B+</li>
                <li>B-</li>
                <li>C+</li>
                <li>C-</li>
                <li>D</li>
                <li>F</li>
            </ul>
        </div>`;

    // Slider de dificultad
    formHTML += `
        <label for="difficulty">Difficulty</label>
        <div class="slider-container">
            <div class="range-slider" data-slider-id="difficulty-slider">
                <span class="rs-bullet">0</span>
                <input class="rs-range" type="range" id="difficulty" name="difficulty" value="0" min="0" max="5" step="0.5">
            </div>
            <div class="box-minmax">
                <span>0</span><span>5</span>
            </div>
        </div>`;

    // Slider de horas por semana
    formHTML += `
        <label for="hoursPerWeek">Hours per Week</label>
        <div class="slider-container">
            <div class="range-slider" data-slider-id="hours-slider">
                <span class="rs-bullet">0</span>
                <input class="rs-range" type="range" id="hoursPerWeek" name="hoursPerWeek" value="0" min="0" max="30" step="0.5">
            </div>
            <div class="box-minmax">
                <span>0</span><span>30</span>
            </div>
        </div>`;

    // Checkbox de tipo de evaluación
    formHTML += `
        <label>Evaluation Type</label>
        <div class="checkbox-group">
            <label class="container-checkbox">Final Project
                <input type="checkbox" id="finalProject" name="finalProject">
                <span class="checkmark"></span>
            </label>
            <label class="container-checkbox">Final Test
                <input type="checkbox" id="finalTest" name="finalTest">
                <span class="checkmark"></span>
            </label>
        </div>`;

    // Slider de satisfacción general
    formHTML += `
        <label for="overallSatisfaction">Overall Satisfaction</label>
        <div class="slider-container">
            <div class="range-slider" data-slider-id="satisfaction-slider">
                <span class="rs-bullet">0</span>
                <input class="rs-range" type="range" id="overallSatisfaction" name="overallSatisfaction" value="0" min="0" max="5" step="0.5">
            </div>
            <div class="box-minmax">
                <span>0</span><span>5</span>
            </div>
        </div>`;

    // Botones de radio para el tipo de clase
    formHTML += `
        <label>Class Type</label>
        <div class="radio-group">
            <input type="radio" id="remote" name="onlinevsperson" value="remote">
            <label for="remote" class="radio-label">Remote</label>
            <input type="radio" id="in-person" name="onlinevsperson" value="in-person">
            <label for="in-person" class="radio-label">In Person</label>
            <input type="radio" id="hybrid" name="onlinevsperson" value="hybrid">
            <label for="hybrid" class="radio-label">Hybrid</label>
        </div>`;

    // Campo de texto para el término
    formHTML += `
        <label for="term">Term</label>
        <input type="text" id="term" name="term" required>
    `;

    // Dropdown para el maestro
    formHTML += `
        <label for="teacher">Teacher</label>
        <div class="dropdown">  
            <div class="select">
                <span class="selected">Teacher</span>
                <div class="caret"></div>
            </div>
            <ul class="menu">
                <li>Brother Clemments</li>
                <li>Brother Helfrich</li>
                <li>Sister Hansen</li>
                <li>Brother Briggs</li>
                <li>Brother Birch</li>
                <li>Brother Thompson</li>
            </ul>
        </div>`;

    // Botón de envío
    formHTML += '<button type="submit" class="submit-button">Submit</button>';

    // Cerrar el formulario
    formHTML += '</form></div>';

    return formHTML;
};

// Manejo de errores
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;
