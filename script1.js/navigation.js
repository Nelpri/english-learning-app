// Módulo de navegación: cambio de secciones/tabs con estados de carga

// Función para mostrar overlay de carga
function showLoading() {
    let loadingOverlay = document.getElementById('loadingOverlay');
    if (!loadingOverlay) {
        loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'loadingOverlay';
        loadingOverlay.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            ">
                <div style="
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    text-align: center;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                ">
                    <div style="font-size: 2rem; margin-bottom: 1rem; color: var(--primary-color);">⏳</div>
                    <p style="margin: 0; color: var(--text-primary);">Cargando sección...</p>
                </div>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
    }
    loadingOverlay.style.display = 'flex';
}

// Función para ocultar overlay de carga
function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar loading antes de cambiar sección
            showLoading();
            
            // Cambiar sección después de un breve delay para animación suave
            setTimeout(() => {
                loadSectionContent(this.dataset.tab);
                hideLoading();
            }, 300); // Delay para permitir que la animación de fadeIn se vea bien
        });
    });
}

function loadSectionContent(section) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(s => {
        s.classList.remove('active');
        s.style.opacity = '0'; // Añadir fade out para transición suave
    });

    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.add('active');

        // Manejar secciones especiales que requieren carga dinámica
        if (section === 'settings') {
            // Cargar contenido de configuración dinámicamente
            if (window.settingsSystem && typeof window.settingsSystem.showSettings === 'function') {
                window.settingsSystem.showSettings();
            }
        } else if (section === 'community') {
            // Cargar contenido de comunidad dinámicamente
            if (window.communitySystem && typeof window.communitySystem.showCommunity === 'function') {
                window.communitySystem.showCommunity();
            }
        }

        // Fade in suave
        setTimeout(() => {
            targetSection.style.opacity = '1';
        }, 100);
    }
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
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.initNavigation = initNavigation;
