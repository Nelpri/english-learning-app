// Módulo de almacenamiento: funciones para localStorage

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key, defaultValue = null) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
}

// Función de inicialización para el módulo de almacenamiento
function initStorage() {
    console.log("🚀 Módulo de almacenamiento inicializado");
    try {
        // Verificar que las funciones estén disponibles
        console.log("💾 saveToLocalStorage disponible:", typeof saveToLocalStorage === 'function');
        console.log("📂 loadFromLocalStorage disponible:", typeof loadFromLocalStorage === 'function');
        
        console.log("✅ Módulo de almacenamiento inicializado correctamente");
    } catch (error) {
        console.error("❌ Error en inicialización del módulo de almacenamiento:", error);
    }
}

// Exportar funciones globalmente
window.saveToLocalStorage = saveToStorage;
window.loadFromLocalStorage = loadFromStorage;
window.initStorage = initStorage;
