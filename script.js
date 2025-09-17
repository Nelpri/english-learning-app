// script.js
// Archivo principal de inicialización y orquestación
// Aquí solo conectamos los módulos y lanzamos la app

// ✅ Esperamos a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ App inicializada");
    console.log("🚀 Iniciando inicialización de módulos...");

    // --- Inicialización de módulos ---
    console.log("📊 Inicializando módulo de datos...");
    if (typeof initData === "function") {
        initData();
        console.log("✅ initData completado");
        } else {
        console.error("❌ initData no encontrado");
    }

    console.log("💾 Inicializando módulo de almacenamiento...");
    if (typeof initStorage === "function") {
        initStorage();
        console.log("✅ initStorage completado");
            } else {
        console.error("❌ initStorage no encontrado");
    }

    console.log("🔧 Inicializando módulo de utilidades...");
    if (typeof initUtils === "function") {
        initUtils();
        console.log("✅ initUtils completado");
    } else {
        console.error("❌ initUtils no encontrado");
    }

    console.log("🔐 Inicializando módulo de autenticación...");
    if (typeof initAuth === "function") {
        initAuth();
        console.log("✅ initAuth completado");
            } else {
        console.error("❌ initAuth no encontrado");
    }

    console.log("🔍 Inicializando módulo de diagnóstico...");
    if (typeof initDiagnostic === "function") {
        initDiagnostic();
        console.log("✅ initDiagnostic completado");
        } else {
        console.error("❌ initDiagnostic no encontrado");
    }

    console.log("🧭 Inicializando módulo de navegación...");
    if (typeof initNavigation === "function") {
        initNavigation();
        console.log("✅ initNavigation completado");
    } else {
        console.error("❌ initNavigation no encontrado");
    }

    console.log("📚 Inicializando módulo de lecciones...");
    if (typeof initLessons === "function") {
        initLessons();
        console.log("✅ initLessons completado");
    } else {
        console.error("❌ initLessons no encontrado");
    }

    console.log("🎯 Inicializando módulo de práctica...");
    if (typeof initPractice === "function") {
        initPractice();
        console.log("✅ initPractice completado");
    } else {
        console.error("❌ initPractice no encontrado");
    }

    console.log("📊 Inicializando módulo de progreso...");
    if (typeof initProgress === "function") {
        initProgress();
        console.log("✅ initProgress completado");
                        } else {
        console.error("❌ initProgress no encontrado");
    }

    console.log("🏆 Inicializando módulo de logros...");
    if (typeof initAchievements === "function") {
        initAchievements();
        console.log("✅ initAchievements completado");
        } else {
        console.error("❌ initAchievements no encontrado");
    }

    console.log("📚 Inicializando módulo de vocabulario...");
    if (typeof initVocab === "function") {
        initVocab();
        console.log("✅ initVocab completado");
    } else {
        console.error("❌ initVocab no encontrado");
    }

    console.log("📊 Inicializando sistema de progreso de módulos...");
    if (typeof ModuleProgressSystem !== "undefined") {
        console.log("✅ Sistema de progreso de módulos cargado");
    } else {
        console.error("❌ Sistema de progreso de módulos no encontrado");
    }

    console.log("🎯 Inicializando sistema de pruebas de nivel...");
    if (typeof LevelTestSystem !== "undefined") {
        console.log("✅ Sistema de pruebas de nivel cargado");
    } else {
        console.error("❌ Sistema de pruebas de nivel no encontrado");
    }

    console.log("🖥️ Inicializando interfaz de pruebas...");
    if (typeof TestInterface !== "undefined") {
        console.log("✅ Interfaz de pruebas cargada");
    } else {
        console.error("❌ Interfaz de pruebas no encontrada");
    }

    console.log("🚀 Todos los módulos fueron llamados");
    console.log("🎉 Inicialización completada");
});
