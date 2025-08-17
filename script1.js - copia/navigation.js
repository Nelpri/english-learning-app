// Módulo de navegación: cambio de secciones/tabs

function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            loadSectionContent(this.dataset.tab);
        });
    });
}

function loadSectionContent(section) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(section)?.classList.add('active');
}
