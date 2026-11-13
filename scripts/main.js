// Menú móvil, modo de alto contraste y año del footer.

const body = document.body;
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const menuIcon = document.querySelector('.menu-toggle__icon');
const brand = document.querySelector('.brand');
const a11yToggle = document.querySelector('.a11y-toggle');
const year = document.querySelector('#year');

const CONTRAST_KEY = 'game-sa-contrast';

function setMenu(open) {
    if (!navbar || !menuToggle) return;

    navbar.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (menuIcon) menuIcon.textContent = open ? '✕' : '☰';
}

menuToggle?.addEventListener('click', () => {
    setMenu(!navbar.classList.contains('is-open'));
});

navbar?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
});

brand?.addEventListener('click', () => setMenu(false));

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
});

window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
});

function setContrast(enabled) {
    body.classList.toggle('a11y-contrast', enabled);

    if (a11yToggle) {
        a11yToggle.setAttribute('aria-pressed', String(enabled));
        a11yToggle.title = enabled
            ? 'Desactivar el modo de alto contraste'
            : 'Activar el modo de alto contraste';
    }

    try {
        localStorage.setItem(CONTRAST_KEY, enabled ? '1' : '0');
    } catch (error) {
        // localStorage puede estar bloqueado; el cambio sigue funcionando en la sesión.
    }
}

if (a11yToggle) {
    let storedContrast = null;

    try {
        storedContrast = localStorage.getItem(CONTRAST_KEY);
    } catch (error) {
        storedContrast = null;
    }

    if (storedContrast === '1') setContrast(true);

    a11yToggle.addEventListener('click', () => {
        setContrast(!body.classList.contains('a11y-contrast'));
    });
}

if (year) {
    year.textContent = new Date().getFullYear();
}
