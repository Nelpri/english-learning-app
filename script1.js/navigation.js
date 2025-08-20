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

// Función de inicialización para el módulo de navegación
function initNavigation() {
    console.log("🚀 Módulo de navegación inicializado");
    try {
        // Verificar que las funciones estén disponibles
        console.log("🧭 initializeNavigation disponible:", typeof initializeNavigation === 'function');
        console.log("📄 loadSectionContent disponible:", typeof loadSectionContent === 'function');
        
        // Inicializar navegación
        initializeNavigation();
        console.log("✅ Navegación inicializada correctamente");
    } catch (error) {
        console.error("❌ Error en inicialización del módulo de navegación:", error);
    }
}

// Exportar funciones globalmente
window.initializeNavigation = initializeNavigation;
window.loadSectionContent = loadSectionContent;
window.initNavigation = initNavigation;
