
    function toggleMenu() {
        const navbar = document.getElementById('navbar');
        navbar.classList.toggle('active');
    }



document.addEventListener('DOMContentLoaded', () => {
    initDropdowns();
    initSliders();
});

function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = dropdown.querySelector('.menu');
        const options = menu.querySelectorAll('li');
        const selected = dropdown.querySelector('.selected');

        // Abrir o cerrar el dropdown al hacer clic en el selector
        select.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleDropdown(dropdown);
        });

        // Seleccionar una opción del menú
        options.forEach(option => {
            option.addEventListener('click', () => {
                selected.innerText = option.innerText;
                select.classList.remove('select-clicked');
                caret.classList.remove('caret-rotate');
                menu.classList.remove('menu-open');
                options.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });
    });

    // Cerrar el dropdown si se hace clic fuera de él
    document.addEventListener('click', () => {
        dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.menu');
            if (menu.classList.contains('menu-open')) {
                toggleDropdown(dropdown);
            }
        });
    });
}

function toggleDropdown(dropdown) {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
}

function initSliders() {
    const sliders = document.querySelectorAll('.range-slider');

    sliders.forEach(slider => {
        const rangeInput = slider.querySelector('.rs-range');
        const bullet = slider.querySelector('.rs-bullet');

        // Inicializar la posición del bullet
        updateSliderValue(rangeInput, bullet);

        rangeInput.addEventListener('input', () => {
            updateSliderValue(rangeInput, bullet);
        });
    });
}

function updateSliderValue(rangeInput, bullet) {
    const value = rangeInput.value;
    bullet.innerHTML = value;

    // Calcular la posición del bullet basado en el valor del slider
    const bulletPosition = (value / rangeInput.max) * (rangeInput.clientWidth - bullet.clientWidth);
    bullet.style.left = `${bulletPosition}px`;
}
