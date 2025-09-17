// Módulo de autenticación: registro, login, logout, overlays/modales

function handleRegister(e) {
    console.log("📝 Iniciando handleRegister...");
    e.preventDefault();
    console.log("✅ Evento preventDefault ejecutado");
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    
    console.log("📋 Datos del formulario:", { name, email, password: password ? "***" : "vacía" });
    
    let users = JSON.parse(localStorage.getItem('englishLearningUsers') || '[]');
    console.log("👥 Usuarios existentes:", users.length);
    
    if (users.find(u => u.email === email)) {
        console.log("⚠️ Email ya registrado");
        if (typeof showNotification === 'function') {
            showNotification('El email ya está registrado', 'error');
        } else {
            alert('El email ya está registrado');
        }
        return;
    }
    
    // Crear nuevo usuario
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('englishLearningUsers', JSON.stringify(users));
    console.log("✅ Usuario registrado exitosamente");
    
    // LIMPIAR cualquier progreso previo para asegurar que sea usuario nuevo
    localStorage.removeItem('englishLearningProgress');
    console.log("🧹 Progreso previo limpiado para usuario nuevo");
    
    // Hacer login automático después del registro
    console.log("🔄 Haciendo login automático...");
    
    // Guardar sesión del usuario
    localStorage.setItem('englishLearningSession', JSON.stringify({
        email: newUser.email, 
        name: newUser.name 
    }));
    
    // Ocultar modal de autenticación
    hideAuthModal();
    
    // Mostrar notificación de bienvenida
    if (typeof showNotification === 'function') {
        showNotification(`🎉 ¡Bienvenido a English Learning, ${newUser.name}!`, 'success');
    } else {
        alert(`🎉 ¡Bienvenido a English Learning, ${newUser.name}!`);
    }
    
    console.log("🚪 Modal de autenticación ocultado");
    
    // Actualizar display del usuario
    updateUserDisplay(newUser);
    
    // Actualizar también el display del header principal
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userLevelDisplay = document.getElementById('userLevelDisplay');
    
    if (userNameDisplay && userLevelDisplay) {
        userNameDisplay.textContent = newUser.name;
        userLevelDisplay.textContent = 'Nivel 1';
    }
    
    // Verificar si es usuario nuevo (debe serlo)
    const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
    const hasLevel = userProgress.level && userProgress.level > 0;
    
    if (!hasLevel) {
        console.log("🎯 Usuario nuevo, mostrando diagnóstico...");
        
        // Verificar que la función esté disponible
        console.log("🔍 Verificando disponibilidad de showDiagnosticModal...");
        console.log("showDiagnosticModal disponible:", typeof showDiagnosticModal === 'function');
        console.log("showDiagnosticModal en window:", typeof window.showDiagnosticModal === 'function');
        
        // Mostrar modal de diagnóstico con delay para asegurar que el DOM esté listo
        setTimeout(() => {
            console.log("⏰ Timeout ejecutado, verificando función nuevamente...");
            console.log("showDiagnosticModal disponible:", typeof showDiagnosticModal === 'function');
            console.log("showDiagnosticModal en window:", typeof window.showDiagnosticModal === 'function');
            
            if (typeof showDiagnosticModal === 'function') {
                console.log("✅ Función disponible, ejecutando...");
                try {
                    showDiagnosticModal();
                    console.log("✅ Modal de diagnóstico mostrado para usuario nuevo");
                } catch (error) {
                    console.error("❌ Error al ejecutar showDiagnosticModal:", error);
                }
            } else if (typeof window.showDiagnosticModal === 'function') {
                console.log("✅ Función disponible en window, ejecutando...");
                try {
                    window.showDiagnosticModal();
                    console.log("✅ Modal de diagnóstico mostrado para usuario nuevo (via window)");
                } catch (error) {
                    console.error("❌ Error al ejecutar window.showDiagnosticModal:", error);
                }
            } else {
                console.warn("⚠️ showDiagnosticModal no está disponible");
                console.warn("🔍 Buscando función en diferentes ubicaciones...");
                
                // Buscar la función en diferentes lugares
                const possibleLocations = [
                    'showDiagnosticModal',
                    'window.showDiagnosticModal',
                    'global.showDiagnosticModal'
                ];
                
                possibleLocations.forEach(location => {
                    try {
                        const func = eval(location);
                        if (typeof func === 'function') {
                            console.log(`✅ Función encontrada en: ${location}`);
                        } else {
                            console.log(`❌ No es función en: ${location}`);
                        }
                    } catch (error) {
                        console.log(`❌ Error al evaluar: ${location}`);
                    }
                });
                
                // NO asignar nivel por defecto aquí
                // El nivel se asignará DESPUÉS de completar el diagnóstico
                console.log("⏸️ Saltando asignación de nivel hasta completar diagnóstico");
            }
        }, 500);
    }
    
    // NO cargar progreso y UI cuando se muestra el diagnóstico
    // Estas funciones se ejecutarán después de completar el diagnóstico
    console.log("⏸️ Saltando carga de progreso/UI hasta completar diagnóstico");
}

function handleLogin(e) {
    console.log("🔐 Iniciando handleLogin...");
    e.preventDefault();
    console.log("✅ Evento preventDefault ejecutado");
    
    console.log("📝 Evento recibido:", e);
    console.log("🎯 Elemento que disparó el evento:", e.target);
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    console.log("📧 Email:", email);
    console.log("🔑 Contraseña:", password ? "***" : "vacía");
    
    let users = JSON.parse(localStorage.getItem('englishLearningUsers') || '[]');
    console.log("👥 Usuarios encontrados:", users.length);
    console.log("📋 Lista de usuarios:", users);
    
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        console.log("❌ Usuario no encontrado o contraseña incorrecta");
        if (typeof showNotification === 'function') {
            showNotification('Email o contraseña incorrectos', 'error');
        } else {
            console.warn("⚠️ showNotification no está disponible");
            alert('Email o contraseña incorrectos');
        }
        return;
    }
    
    console.log("✅ Usuario autenticado:", user.name);
    
    localStorage.setItem('englishLearningSession', JSON.stringify({
        email: user.email, 
        name: user.name 
    }));
    console.log("💾 Sesión guardada en localStorage");
    
    hideAuthModal();
    console.log("🚪 Modal ocultado");
    
    if (typeof showNotification === 'function') {
        showNotification(`👋 ¡Bienvenido de vuelta, ${user.name}!`, 'success');
        console.log("🔔 Notificación mostrada");
    } else {
        console.warn("⚠️ showNotification no está disponible");
        alert(`👋 ¡Bienvenido de vuelta, ${user.name}!`);
    }
    
    const currentUser = getCurrentUser();
    if (currentUser) {
        updateUserDisplay(currentUser);
    }
    console.log("👤 Display del usuario actualizado");
    
    // Actualizar también el display del header principal
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userLevelDisplay = document.getElementById('userLevelDisplay');
    
    if (userNameDisplay && userLevelDisplay) {
        userNameDisplay.textContent = user.name;
        
        // Obtener nivel del usuario
        const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
        const level = userProgress.level || 1;
        userLevelDisplay.textContent = `Nivel ${level}`;
    }
    
    // Verificar autenticación y progreso después del login
    console.log("🔍 Verificando autenticación después del login...");
    try {
        checkAuth();
        console.log("✅ checkAuth ejecutado exitosamente");
    } catch (error) {
        console.error("❌ Error en checkAuth:", error);
    }
    
    try {
        console.log("📊 Cargando progreso...");
        if (typeof loadProgress === 'function') {
            loadProgress();
            console.log("✅ Progreso cargado");
        } else {
            console.warn("⚠️ loadProgress no está disponible");
        }
        
        console.log("🎨 Actualizando UI...");
        if (typeof updateUI === 'function') {
            updateUI();
            console.log("✅ UI actualizada");
        } else {
            console.warn("⚠️ updateUI no está disponible");
        }
        
        console.log("📚 Cargando lección actual...");
        if (typeof loadCurrentLesson === 'function') {
            loadCurrentLesson();
            console.log("✅ Lección actual cargada");
        } else {
            console.warn("⚠️ loadCurrentLesson no está disponible");
        }
        
        // Inicializar sistema de práctica si está disponible
        console.log("🎯 Inicializando sistema de práctica...");
        if (window.practiceSystem && typeof window.practiceSystem.initialize === 'function') {
            const currentUser = {
                email: user.email,
                name: user.name,
                currentLevel: 1 // Nivel por defecto, se actualizará después del diagnóstico
            };
            window.practiceSystem.initialize(currentUser);
            console.log("✅ Sistema de práctica inicializado");
        } else {
            console.warn("⚠️ Sistema de práctica no disponible");
        }
        
        console.log("🎉 Login completado exitosamente");
    } catch (error) {
        console.error("❌ Error durante la carga:", error);
    }
}

// Función para obtener el usuario actual de la sesión
function getCurrentUser() {
    try {
        console.log("🔍 Buscando usuario actual...");
        
        // 1. Intentar obtener de englishLearningSession
        let session = JSON.parse(localStorage.getItem('englishLearningSession') || 'null');
        if (session && session.email) {
            console.log("✅ Usuario encontrado en englishLearningSession:", session.name);
            return session;
        }
        
        // 2. Intentar obtener de englishLearningUser
        session = JSON.parse(localStorage.getItem('englishLearningUser') || 'null');
        if (session && session.email) {
            console.log("✅ Usuario encontrado en englishLearningUser:", session.name);
            return session;
        }
        
        // 3. Intentar obtener de appState si está disponible
        if (typeof appState !== 'undefined' && appState.currentUser) {
            console.log("✅ Usuario encontrado en appState:", appState.currentUser.name);
            return appState.currentUser;
        }
        
        // 4. Verificar si hay algún usuario en localStorage
        const allKeys = Object.keys(localStorage);
        const userKeys = allKeys.filter(key => key.includes('user') || key.includes('session'));
        console.log("🔍 Claves relacionadas con usuario encontradas:", userKeys);
        
        for (const key of userKeys) {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                if (data && data.name && data.email) {
                    console.log(`✅ Usuario encontrado en ${key}:`, data.name);
                    return data;
                }
            } catch (e) {
                // Ignorar errores de parsing
            }
        }
        
        console.log("❌ No se encontró usuario activo");
        return null;
        
    } catch (error) {
        console.error("❌ Error al obtener usuario actual:", error);
        return null;
    }
}

// Función para verificar si hay una sesión activa
function isAuthenticated() {
    const session = getCurrentUser();
    return !!(session && session.email);
}

// Función para obtener el nivel correcto basado en XP
function getCorrectLevelFromXP(xp) {
    if (typeof LEVEL_SYSTEM === 'undefined' || !LEVEL_SYSTEM.levels) {
        return 1; // Nivel por defecto
    }
    
    // Buscar el nivel más alto que el usuario puede alcanzar con su XP
    let correctLevel = 1;
    for (let i = LEVEL_SYSTEM.levels.length - 1; i >= 0; i--) {
        if (xp >= LEVEL_SYSTEM.levels[i].xpRequired) {
            correctLevel = LEVEL_SYSTEM.levels[i].level;
            break;
        }
    }
    
    return correctLevel;
}

function updateUserDisplay(user) {
    console.log("👤 Actualizando display del usuario...");
    try {
        // Obtener elementos del header principal
        const userNameDisplay = document.getElementById('userNameDisplay');
        const userLevelDisplay = document.getElementById('userLevelDisplay');
        const currentXPElement = document.getElementById('currentXP');
        const currentLevelElement = document.getElementById('currentLevel');
        const levelProgressFill = document.getElementById('levelProgressFill');
        const levelProgressText = document.getElementById('levelProgressText');
        
        if (user) {
            console.log("✅ Usuario encontrado, mostrando información:", user.name);
            
            // Obtener progreso del usuario desde appState o localStorage
            let userProgress;
            if (typeof appState !== 'undefined' && appState.currentXP !== undefined) {
                userProgress = appState;
                console.log("📊 Progreso del usuario desde appState:", userProgress);
            } else {
                userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
                console.log("📊 Progreso del usuario desde localStorage:", userProgress);
            }
            
            // Obtener nivel y XP
            let level = userProgress.currentLevel || 1;
            const xp = userProgress.currentXP || 0;
            
            // Calcular nivel MCER basado en XP
            let mcerLevel;
            if (xp < 100) mcerLevel = 'A1';
            else if (xp < 300) mcerLevel = 'A1+';
            else if (xp < 600) mcerLevel = 'A2';
            else if (xp < 1000) mcerLevel = 'A2+';
            else if (xp < 1500) mcerLevel = 'B1';
            else if (xp < 2500) mcerLevel = 'B1+';
            else if (xp < 4000) mcerLevel = 'B2';
            else if (xp < 6000) mcerLevel = 'B2+';
            else if (xp < 9000) mcerLevel = 'C1';
            else mcerLevel = 'C2';
            
            console.log("📊 Nivel MCER calculado automáticamente:", mcerLevel);
            
            // Si hay diagnóstico, usar el nivel más alto entre diagnóstico y cálculo automático
            const diagnosticLevel = appState?.diagnosticLevel || userProgress.diagnosticLevel;
            if (diagnosticLevel) {
                const mcerLevels = ['A1', 'A1+', 'A2', 'A2+', 'B1', 'B1+', 'B2', 'B2+', 'C1', 'C2'];
                const diagnosticIndex = mcerLevels.indexOf(diagnosticLevel);
                const calculatedIndex = mcerLevels.indexOf(mcerLevel);
                
                if (diagnosticIndex > calculatedIndex) {
                    mcerLevel = diagnosticLevel;
                    console.log("🎯 Usando nivel MCER del diagnóstico (más alto):", mcerLevel);
                } else {
                    console.log("🎯 Usando nivel MCER calculado (más alto):", mcerLevel);
                }
            }
            
            console.log("📊 Nivel calculado:", { level, xp, mcerLevel });
            
            // Actualizar nombre del usuario en el header
            if (userNameDisplay) {
                userNameDisplay.textContent = user.name;
                console.log("✅ Nombre del usuario actualizado:", user.name);
            } else {
                console.warn("⚠️ Elemento userNameDisplay no encontrado");
            }
            
            // Actualizar nivel MCER en el header
            if (userLevelDisplay) {
                userLevelDisplay.textContent = `Nivel ${mcerLevel}`;
                console.log("✅ Nivel MCER actualizado:", mcerLevel);
            } else {
                console.warn("⚠️ Elemento userLevelDisplay no encontrado");
            }
            
            // Actualizar XP en el header
            if (currentXPElement) {
                currentXPElement.textContent = xp;
                console.log("✅ XP del header actualizado:", xp);
            } else {
                console.warn("⚠️ Elemento currentXP no encontrado");
            }
            
            // Actualizar nivel en el header
            if (currentLevelElement) {
                currentLevelElement.textContent = level;
                console.log("✅ Nivel del header actualizado:", level);
            } else {
                console.warn("⚠️ Elemento currentLevel no encontrado");
            }
            
            // Sincronizar nivel con experiencia antes de calcular progreso
            if (typeof LEVEL_SYSTEM !== 'undefined' && LEVEL_SYSTEM.levels) {
                const correctLevel = getCorrectLevelFromXP(xp);
                if (correctLevel !== level) {
                    console.log(`🔄 Sincronizando nivel: ${level} → ${correctLevel} (XP: ${xp})`);
                    level = correctLevel;
                    // Actualizar el nivel en appState
                    if (typeof appState !== 'undefined') {
                        appState.currentLevel = level;
                    }
                }
            }
            
            // Actualizar barra de progreso si está disponible
            if (levelProgressFill && levelProgressText) {
                try {
                    // Calcular progreso del nivel actual CORRECTAMENTE usando LEVEL_SYSTEM
                    let xpRequiredForNextLevel = 100; // Valor por defecto
                    let xpForCurrentLevel = 0;
                    
                    // Buscar el nivel actual y siguiente en LEVEL_SYSTEM
                    if (typeof LEVEL_SYSTEM !== 'undefined' && LEVEL_SYSTEM.levels) {
                        const currentLevelData = LEVEL_SYSTEM.levels.find(l => l.level === level);
                        const nextLevelData = LEVEL_SYSTEM.levels.find(l => l.level === level + 1);
                        
                        if (currentLevelData && nextLevelData) {
                            xpForCurrentLevel = currentLevelData.xpRequired;
                            xpRequiredForNextLevel = nextLevelData.xpRequired - currentLevelData.xpRequired;
                        }
                    } else {
                        // Fallback al cálculo anterior
                        xpForCurrentLevel = (level - 1) * 100;
                        xpRequiredForNextLevel = 100;
                    }
                    
                    const xpInCurrentLevel = Math.max(0, xp - xpForCurrentLevel);
                    
                    // Si ya se superó el XP del nivel actual, mostrar progreso completo
                    let progressPercentage;
                    if (xpInCurrentLevel >= xpRequiredForNextLevel) {
                        progressPercentage = 100;
                        // Verificar si debería subir de nivel
                        if (typeof checkLevelUp === 'function') {
                            checkLevelUp();
                        }
                    } else {
                        progressPercentage = (xpInCurrentLevel / xpRequiredForNextLevel) * 100;
                    }
                    
                    levelProgressFill.style.width = `${progressPercentage}%`;
                    levelProgressText.textContent = `${xpInCurrentLevel} / ${xpRequiredForNextLevel} XP`;
                    console.log("✅ Barra de progreso actualizada:", {
                        xpTotal: xp,
                        nivel: level,
                        xpAcumulado: xpForCurrentLevel,
                        xpEnNivel: xpInCurrentLevel,
                        xpRequerido: xpRequiredForNextLevel,
                        progreso: progressPercentage + "%",
                        estado: progressPercentage >= 100 ? "NIVEL COMPLETADO" : "EN PROGRESO"
                    });
                } catch (error) {
                    console.warn("⚠️ No se pudo actualizar barra de progreso:", error);
                }
            } else {
                console.warn("⚠️ Elementos de barra de progreso no encontrados");
            }
            
            console.log("✅ Display del usuario actualizado completamente");
            console.log("📊 Resumen:", { name: user.name, level, xp, mcerLevel });
            
        } else {
            console.log("❌ No hay usuario activo, reseteando display");
            
            // Resetear el display del header principal
            if (userNameDisplay) userNameDisplay.textContent = 'Usuario';
            if (userLevelDisplay) userLevelDisplay.textContent = 'Nivel A1';
            if (currentXPElement) currentXPElement.textContent = '0';
            if (currentLevelElement) currentLevelElement.textContent = '1';
            if (levelProgressFill) levelProgressFill.style.width = '0%';
            if (levelProgressText) levelProgressText.textContent = '0 / 100 XP';
            
            console.log("✅ Display reseteado");
        }
    } catch (error) {
        console.error("❌ Error al actualizar display del usuario:", error);
    }
}

function checkAuth() {
    console.log("🔍 Verificando autenticación...");
    try {
        // Debug del estado actual
        debugLocalStorage();
        
        // Verificar si ya se está mostrando el diagnóstico
        const diagnosticModal = document.getElementById('diagnosticModal');
        if (diagnosticModal && diagnosticModal.style.display === 'block') {
            console.log("⚠️ Diagnóstico ya visible, saltando checkAuth...");
            return true;
        }
        
        const session = getCurrentUser();
        
        if (session && session.email) {
            console.log("✅ Usuario autenticado:", session.email);
            
            // Actualizar UI del usuario
            updateUserDisplay(session);
            
            // Ocultar modal de autenticación si está visible
            hideAuthModal();
            
            // Verificar si el usuario ya completó el diagnóstico
            const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
            const userSpecificProgress = userProgress[session.email] || {};
            const hasLevel = userSpecificProgress.level && userSpecificProgress.diagnosticCompleted;
            
            console.log("🔍 Verificando progreso del usuario:", session.email);
            console.log("📊 Progreso completo en localStorage:", userProgress);
            console.log("📊 Progreso específico del usuario:", userSpecificProgress);
            console.log("✅ Tiene nivel:", userSpecificProgress.level);
            console.log("✅ Diagnóstico completado:", userSpecificProgress.diagnosticCompleted);
            console.log("🎯 hasLevel evaluado como:", hasLevel);
            
            // También verificar en el nivel raíz por compatibilidad
            const rootLevel = userProgress.level || userProgress.currentLevel;
            const rootDiagnosticCompleted = userProgress.diagnosticCompleted;
            console.log("🔍 Verificando también nivel raíz:");
            console.log("📊 Nivel raíz:", rootLevel);
            console.log("📊 Diagnóstico completado raíz:", rootDiagnosticCompleted);
            
            // Si no hay progreso específico pero sí en el nivel raíz, migrar
            // También migrar si hay nivel pero no diagnosticCompleted (usuarios existentes)
            if (!userSpecificProgress.level && rootLevel && (rootDiagnosticCompleted || rootLevel > 1)) {
                console.log("🔄 Migrando progreso del nivel raíz al usuario específico...");
                migrateUserProgress(session);
                
                // Re-verificar después de la migración
                const updatedUserProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
                const updatedUserSpecificProgress = updatedUserProgress[session.email] || {};
                const updatedHasLevel = updatedUserSpecificProgress.level && updatedUserSpecificProgress.diagnosticCompleted;
                
                console.log("📊 Progreso después de migración:", updatedUserSpecificProgress);
                console.log("🎯 hasLevel después de migración:", updatedHasLevel);
                
                if (updatedHasLevel) {
                    console.log("✅ Progreso migrado exitosamente, saltando diagnóstico");
                    restoreUserProgress(session);
                    setTimeout(() => {
                        console.log("🔄 Sincronizando display del usuario migrado...");
                        updateUserDisplay(session);
                    }, 100);
                    return true;
                }
            }
            
            if (!hasLevel) {
                console.log("🎯 Usuario nuevo, mostrando diagnóstico...");
                
                // Verificar que la función esté disponible
                console.log("🔍 Verificando disponibilidad de showDiagnosticModal...");
                console.log("showDiagnosticModal disponible:", typeof showDiagnosticModal === 'function');
                console.log("showDiagnosticModal en window:", typeof window.showDiagnosticModal === 'function');
                
                // Mostrar modal de diagnóstico con delay para asegurar que el DOM esté listo
                setTimeout(() => {
                    console.log("⏰ Timeout ejecutado, verificando función nuevamente...");
                    console.log("showDiagnosticModal disponible:", typeof showDiagnosticModal === 'function');
                    console.log("showDiagnosticModal en window:", typeof window.showDiagnosticModal === 'function');
                    
                    if (typeof showDiagnosticModal === 'function') {
                        showDiagnosticModal();
                        console.log("✅ Diagnóstico mostrado correctamente");
                    } else if (typeof window.showDiagnosticModal === 'function') {
                        window.showDiagnosticModal();
                        console.log("✅ Diagnóstico mostrado desde window");
                    } else {
                        console.error("❌ showDiagnosticModal no está disponible");
                        // Fallback: mostrar notificación
                        if (typeof showNotification === 'function') {
                            showNotification('Error: No se pudo mostrar el diagnóstico', 'error');
                        }
                    }
                }, 500);
            } else {
                console.log("✅ Usuario ya tiene nivel asignado:", userProgress.level);
                
                // Restaurar progreso del usuario
                restoreUserProgress(session);
                
                // Sincronizar automáticamente el display del usuario
                setTimeout(() => {
                    console.log("🔄 Sincronizando display del usuario existente...");
                    updateUserDisplay(session);
                }, 100);
            }
            
            return true;
        } else {
            console.log("❌ No hay sesión activa");
            updateUserDisplay(null);
            
            // NO mostrar diagnóstico automáticamente aquí
            // Solo mostrar modal de autenticación
            console.log("🚪 Mostrando modal de autenticación para usuario no autenticado");
            showAuthModal();
            
            return false;
        }
    } catch (error) {
        console.error("❌ Error en checkAuth:", error);
        updateUserDisplay(null);
        return false;
    }
}

function logout() {
    localStorage.removeItem('englishLearningSession');
    
    // Resetear el display del header principal
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userLevelDisplay = document.getElementById('userLevelDisplay');
    
    if (userNameDisplay && userLevelDisplay) {
        userNameDisplay.textContent = 'Usuario';
        userLevelDisplay.textContent = 'Nivel A1';
    }
    
    const currentUser = getCurrentUser();
    if (currentUser) {
        updateUserDisplay(currentUser);
    }
    showAuthModal();
}

function showAuthModal() {
    console.log("🚪 Iniciando showAuthModal...");
    try {
        const authOverlay = document.getElementById('authOverlay');
        const authModal = document.getElementById('authModal');
        
        console.log("🎯 Elementos encontrados:", {
            authOverlay: !!authOverlay,
            authModal: !!authModal
        });
        
        if (authOverlay && authModal) {
            console.log("✅ Elementos encontrados, mostrando modal...");
            
            // Verificar estilos antes de cambiar
            console.log("🎨 Estilos ANTES del cambio:", {
                overlayDisplay: authOverlay.style.display,
                modalDisplay: authModal.style.display,
                overlayVisibility: authOverlay.style.visibility,
                modalVisibility: authModal.style.visibility,
                overlayOpacity: authOverlay.style.opacity,
                modalOpacity: authModal.style.opacity,
                overlayZIndex: authOverlay.style.zIndex,
                modalZIndex: authModal.style.zIndex
            });
            
            authOverlay.style.display = 'block';
            authModal.style.display = 'block';
            
            console.log("🎨 Estilos aplicados");
            
            // Verificar que el modal sea visible
            setTimeout(() => {
                const isVisible = authModal.style.display === 'block';
                console.log("👁️ Modal visible:", isVisible);
                console.log("🎨 Estilos DESPUÉS del cambio:", {
                    overlayDisplay: authOverlay.style.display,
                    modalDisplay: authModal.style.display,
                    overlayVisibility: authOverlay.style.visibility,
                    modalVisibility: authModal.style.visibility,
                    overlayOpacity: authOverlay.style.opacity,
                    modalOpacity: authModal.style.opacity,
                    overlayZIndex: authOverlay.style.zIndex,
                    modalZIndex: authModal.style.zIndex
                });
                
                // Verificar si hay estilos CSS que puedan estar interfiriendo
                const computedOverlay = window.getComputedStyle(authOverlay);
                const computedModal = window.getComputedStyle(authModal);
                
                console.log("🎨 Estilos CSS computados:", {
                    overlayDisplay: computedOverlay.display,
                    modalDisplay: computedModal.display,
                    overlayVisibility: computedOverlay.visibility,
                    modalVisibility: computedModal.visibility,
                    overlayOpacity: computedOverlay.opacity,
                    modalOpacity: computedModal.opacity,
                    overlayZIndex: computedOverlay.zIndex,
                    modalZIndex: computedModal.zIndex
                });
                
                // Verificar si el modal está en el viewport
                const modalRect = authModal.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                
                console.log("📍 Posición del modal:", {
                    top: modalRect.top,
                    left: modalRect.left,
                    width: modalRect.width,
                    height: modalRect.height,
                    visible: modalRect.width > 0 && modalRect.height > 0,
                    viewportWidth: viewportWidth,
                    viewportHeight: viewportHeight,
                    inViewport: modalRect.left >= 0 && modalRect.right <= viewportWidth && modalRect.top >= 0 && modalRect.bottom <= viewportHeight
                });
                
                // Si el modal está fuera del viewport, ajustar la posición
                if (modalRect.left < 0 || modalRect.right > viewportWidth || modalRect.top < 0 || modalRect.bottom > viewportHeight) {
                    console.log("⚠️ Modal fuera del viewport, ajustando posición...");
                    
                    // Ajustar a pantallas pequeñas
                    if (viewportWidth <= 600) {
                        authModal.style.left = '2.5vw';
                        authModal.style.transform = 'translate(0, -50%)';
                        console.log("✅ Modal ajustado para pantallas pequeñas");
                    }
                }
                
            }, 100);
        } else {
            console.error("❌ Elementos no encontrados");
        }
    } catch (error) {
        console.error("❌ Error en showAuthModal:", error);
    }
}

function hideAuthModal() {
    console.log("🚪 Iniciando hideAuthModal...");
    try {
        const authOverlay = document.getElementById('authOverlay');
        const authModal = document.getElementById('authModal');
        
        console.log("🎯 Elementos encontrados:", {
            authOverlay: !!authOverlay,
            authModal: !!authModal
        });
        
        if (authOverlay && authModal) {
            console.log("✅ Elementos encontrados, ocultando modal...");
            authOverlay.style.display = 'none';
            authModal.style.display = 'none';
            console.log("🎨 Estilos aplicados para ocultar");
        } else {
            console.error("❌ Elementos no encontrados");
        }
    } catch (error) {
        console.error("❌ Error en hideAuthModal:", error);
    }
}

function setupAuthTabs() {
    console.log("🔧 Iniciando setupAuthTabs...");
    try {
        const tabs = document.querySelectorAll('.auth-tab');
        const forms = document.querySelectorAll('.auth-form');
        
        console.log("🎯 Elementos encontrados:", {
            tabs: tabs.length,
            forms: forms.length
        });
        
        if (tabs.length > 0 && forms.length > 0) {
            console.log("✅ Elementos encontrados, configurando eventos...");
            
            // Configurar eventos de tabs
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    console.log("🖱️ Tab clickeado:", this.dataset.tab);
                    tabs.forEach(t => t.classList.remove('active'));
                    forms.forEach(f => f.classList.remove('active'));
                    this.classList.add('active');
                    
                    const targetForm = document.querySelector(`.auth-form[data-tab="${this.dataset.tab}"]`);
                    if (targetForm) {
                        targetForm.classList.add('active');
                        console.log("✅ Formulario activado:", this.dataset.tab);
                    } else {
                        console.warn("⚠️ Formulario no encontrado para:", this.dataset.tab);
                    }
                });
            });
            
            // Configurar eventos de formularios
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            
            if (loginForm) {
                console.log("🔐 Configurando evento de login...");
                loginForm.addEventListener('submit', handleLogin);
                console.log("✅ Evento de login configurado");
            } else {
                console.error("❌ Formulario de login no encontrado");
            }
            
            if (registerForm) {
                console.log("📝 Configurando evento de registro...");
                registerForm.addEventListener('submit', handleRegister);
                console.log("✅ Evento de registro configurado");
            } else {
                console.error("❌ Formulario de registro no encontrado");
            }
            
            console.log("✅ Eventos de tabs y formularios configurados correctamente");
        } else {
            console.error("❌ No se encontraron tabs o forms");
        }
    } catch (error) {
        console.error("❌ Error en setupAuthTabs:", error);
    }
}

// Variable para controlar si los tabs ya se configuraron
let authTabsConfigured = false;

// Función de inicialización para el módulo de autenticación
function initAuth() {
    console.log("🚀 Módulo de autenticación inicializado");
    try {
        // Solo configurar tabs una vez
        if (!authTabsConfigured) {
            setupAuthTabs();
            console.log("✅ Tabs de autenticación configurados");
            authTabsConfigured = true;
        } else {
            console.log("✅ Tabs ya configurados, saltando...");
        }
        
        // Verificar autenticación cada vez
        const session = getCurrentUser();
        if (!session || !session.email) {
            console.log("🔍 No hay sesión activa, verificando autenticación...");
            checkAuth();
            console.log("✅ Verificación de autenticación completada");
        } else {
            console.log("✅ Sesión ya activa, restaurando progreso del usuario...");
            restoreUserProgress(session);
            console.log("✅ Progreso del usuario restaurado");
        }
        
        console.log("✅ Módulo de autenticación inicializado correctamente");
        
    } catch (error) {
        console.error("❌ Error en inicialización del módulo de autenticación:", error);
    }
}

// Función de sincronización global para resolver problemas de estado
function syncUserDisplay() {
    console.log("🔄 Iniciando sincronización global del display del usuario...");
    
    try {
        // 1. Obtener usuario actual
        const currentUser = getCurrentUser();
        if (!currentUser) {
            console.log("❌ No hay usuario activo para sincronizar");
            return;
        }
        
        console.log("✅ Usuario encontrado para sincronización:", currentUser.name);
        
        // 2. Actualizar display del usuario
        updateUserDisplay(currentUser);
        
        // 3. Verificar que los elementos se hayan actualizado correctamente
        const userNameDisplay = document.getElementById('userNameDisplay');
        const userLevelDisplay = document.getElementById('userLevelDisplay');
        
        if (userNameDisplay && userLevelDisplay) {
            console.log("✅ Verificación de sincronización:");
            console.log("   - Nombre:", userNameDisplay.textContent);
            console.log("   - Nivel:", userLevelDisplay.textContent);
        }
        
        console.log("✅ Sincronización global completada");
        
    } catch (error) {
        console.error("❌ Error en sincronización global:", error);
    }
}

// Función para restaurar el progreso del usuario
function restoreUserProgress(user) {
    console.log("🔄 Restaurando progreso del usuario:", user.email);
    
    try {
        // 1. Obtener progreso guardado del usuario
        const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
        const userSpecificProgress = userProgress[user.email] || {};
        
        console.log("📊 Progreso encontrado para usuario:", user.email, userSpecificProgress);
        
        // 2. Restaurar appState si está disponible
        if (typeof window.appState !== 'undefined') {
            // Restaurar XP
            if (userSpecificProgress.xp && userSpecificProgress.xp > 0) {
                window.appState.currentXP = userSpecificProgress.xp;
                console.log("✅ XP restaurado:", userSpecificProgress.xp);
            }
            
            // Restaurar nivel
            if (userSpecificProgress.level && userSpecificProgress.level > 0) {
                window.appState.currentLevel = userSpecificProgress.level;
                console.log("✅ Nivel restaurado:", userSpecificProgress.level);
            }
            
            // Restaurar lecciones completadas
            if (userSpecificProgress.lessonsCompleted !== undefined) {
                window.appState.lessonsCompleted = userSpecificProgress.lessonsCompleted;
                console.log("✅ Lecciones completadas restauradas:", userSpecificProgress.lessonsCompleted);
            }
            
            // Restaurar racha
            if (userSpecificProgress.streakDays !== undefined) {
                window.appState.streakDays = userSpecificProgress.streakDays;
                console.log("✅ Racha restaurada:", userSpecificProgress.streakDays);
            }
            
            // Restaurar nivel MCER
            if (userSpecificProgress.diagnosticLevel) {
                window.appState.diagnosticLevel = userSpecificProgress.diagnosticLevel;
                console.log("✅ Nivel MCER restaurado:", userSpecificProgress.diagnosticLevel);
            }
            
            // Restaurar progreso semanal
            if (userSpecificProgress.weeklyProgress) {
                window.appState.weeklyProgress = userSpecificProgress.weeklyProgress;
                console.log("✅ Progreso semanal restaurado");
            }
        } else {
            console.log("⚠️ appState no disponible, esperando a que se inicialice...");
        }
        
        // 3. Actualizar UI del header
        if (typeof window.updateHeaderElements === 'function') {
            window.updateHeaderElements();
            console.log("✅ Header actualizado con progreso restaurado");
        }
        
        // 4. Actualizar display del usuario
        updateUserDisplay(user);
        
        console.log("✅ Progreso del usuario restaurado completamente");
        
    } catch (error) {
        console.error("❌ Error al restaurar progreso del usuario:", error);
    }
}

// Función para depurar el estado del localStorage
function debugLocalStorage() {
    console.log("🔍 === DEBUG LOCALSTORAGE ===");
    try {
        const session = localStorage.getItem('englishLearningSession');
        const progress = localStorage.getItem('englishLearningProgress');
        
        console.log("📱 Sesión actual:", session ? JSON.parse(session) : "No hay sesión");
        console.log("📊 Progreso completo:", progress ? JSON.parse(progress) : "No hay progreso");
        
        if (progress) {
            const progressData = JSON.parse(progress);
            console.log("🔑 Claves en progreso:", Object.keys(progressData));
            
            // Verificar si hay datos en el nivel raíz
            if (progressData.level) {
                console.log("📈 Datos en nivel raíz:", {
                    level: progressData.level,
                    xp: progressData.xp,
                    diagnosticCompleted: progressData.diagnosticCompleted,
                    diagnosticLevel: progressData.diagnosticLevel
                });
            }
            
            // Verificar datos por usuario
            if (session) {
                const sessionData = JSON.parse(session);
                const userEmail = sessionData.email;
                if (progressData[userEmail]) {
                    console.log("👤 Datos del usuario específico:", progressData[userEmail]);
                } else {
                    console.log("❌ No hay datos específicos para el usuario:", userEmail);
                }
            }
        }
        console.log("🔍 === FIN DEBUG ===");
    } catch (error) {
        console.error("❌ Error en debug localStorage:", error);
    }
}

// Función para migrar progreso del nivel raíz al usuario específico
function migrateUserProgress(user) {
    console.log("🔄 Migrando progreso del usuario:", user.email);
    
    try {
        const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
        
        console.log("📊 Estado antes de migración:", userProgress);
        
        // Si hay progreso en el nivel raíz pero no en el usuario específico, migrarlo
        // También migrar si hay nivel pero no diagnosticCompleted (usuarios existentes)
        const rootLevel = userProgress.level || userProgress.currentLevel;
        const rootDiagnosticCompleted = userProgress.diagnosticCompleted;
        
        if (rootLevel && !userProgress[user.email] && (rootDiagnosticCompleted || rootLevel > 1)) {
            console.log("📦 Migrando progreso del nivel raíz al usuario específico...");
            
            userProgress[user.email] = {
                xp: userProgress.xp || userProgress.currentXP || 0,
                level: userProgress.level || userProgress.currentLevel || 1,
                lessonsCompleted: userProgress.lessonsCompleted || 0,
                streakDays: userProgress.streakDays || 0,
                diagnosticLevel: userProgress.diagnosticLevel || 'A1',
                weeklyProgress: userProgress.weeklyProgress || {
                    sunday: 0, monday: 0, tuesday: 0, wednesday: 0,
                    thursday: 0, friday: 0, saturday: 0
                },
                vocabularyWordsLearned: userProgress.vocabularyWordsLearned || 0,
                diagnosticCompleted: userProgress.diagnosticCompleted || (rootLevel > 1)
            };
            
            localStorage.setItem('englishLearningProgress', JSON.stringify(userProgress));
            console.log("✅ Progreso migrado exitosamente");
            console.log("📊 Estado después de migración:", userProgress);
        } else {
            console.log("ℹ️ No se requiere migración");
            console.log("📊 Razón:", {
                hasRootLevel: !!userProgress.level,
                hasRootDiagnostic: !!userProgress.diagnosticCompleted,
                hasUserSpecific: !!userProgress[user.email]
            });
        }
    } catch (error) {
        console.error("❌ Error al migrar progreso del usuario:", error);
    }
}

// Función para restaurar el progreso del usuario
function restoreUserProgress(user) {
    console.log("🔄 Restaurando progreso del usuario:", user.email);
    
    try {
        // 0. Migrar progreso si es necesario
        migrateUserProgress(user);
        
        // 1. Obtener progreso guardado del usuario
        const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
        const userSpecificProgress = userProgress[user.email] || {};
        
        console.log("📊 Progreso encontrado para usuario:", userSpecificProgress);
        
        // 2. Restaurar en appState si está disponible
        if (typeof window.appState !== 'undefined') {
            // Restaurar XP
            if (userSpecificProgress.xp !== undefined) {
                window.appState.currentXP = userSpecificProgress.xp;
                console.log("✅ XP restaurado:", userSpecificProgress.xp);
            }
            
            // Restaurar nivel
            if (userSpecificProgress.level !== undefined) {
                window.appState.currentLevel = userSpecificProgress.level;
                console.log("✅ Nivel restaurado:", userSpecificProgress.level);
            }
            
            // Restaurar lecciones completadas
            if (userSpecificProgress.lessonsCompleted !== undefined) {
                window.appState.lessonsCompleted = userSpecificProgress.lessonsCompleted;
                console.log("✅ Lecciones completadas restauradas:", userSpecificProgress.lessonsCompleted);
            }
            
            // Restaurar racha
            if (userSpecificProgress.streakDays !== undefined) {
                window.appState.streakDays = userSpecificProgress.streakDays;
                console.log("✅ Racha restaurada:", userSpecificProgress.streakDays);
            }
            
            // Restaurar nivel del diagnóstico
            if (userSpecificProgress.diagnosticLevel !== undefined) {
                window.appState.diagnosticLevel = userSpecificProgress.diagnosticLevel;
                console.log("✅ Nivel del diagnóstico restaurado:", userSpecificProgress.diagnosticLevel);
            }
            
            // Restaurar progreso semanal
            if (userSpecificProgress.weeklyProgress !== undefined) {
                window.appState.weeklyProgress = userSpecificProgress.weeklyProgress;
                console.log("✅ Progreso semanal restaurado");
            }
            
            // Restaurar vocabulario aprendido
            if (userSpecificProgress.vocabularyWordsLearned !== undefined) {
                window.appState.vocabularyWordsLearned = userSpecificProgress.vocabularyWordsLearned;
                console.log("✅ Vocabulario aprendido restaurado:", userSpecificProgress.vocabularyWordsLearned);
            }
            
            console.log("✅ Estado de la app restaurado completamente");
        }
        
        // 3. Actualizar UI del header
        if (typeof updateHeaderElements === 'function') {
            updateHeaderElements();
            console.log("✅ Header actualizado con progreso restaurado");
        }
        
        // 4. Guardar progreso actualizado por usuario específico
        if (typeof window.appState !== 'undefined') {
            const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
            
            // Crear o actualizar progreso específico del usuario
            if (!userProgress[user.email]) {
                userProgress[user.email] = {};
            }
            
            // Actualizar progreso específico del usuario
            userProgress[user.email].xp = window.appState.currentXP;
            userProgress[user.email].level = window.appState.currentLevel;
            userProgress[user.email].lessonsCompleted = window.appState.lessonsCompleted;
            userProgress[user.email].streakDays = window.appState.streakDays;
            userProgress[user.email].diagnosticLevel = window.appState.diagnosticLevel;
            userProgress[user.email].weeklyProgress = window.appState.weeklyProgress;
            userProgress[user.email].vocabularyWordsLearned = window.appState.vocabularyWordsLearned;
            
            // Mantener compatibilidad en el nivel raíz
            userProgress.xp = window.appState.currentXP;
            userProgress.level = window.appState.currentLevel;
            userProgress.lessonsCompleted = window.appState.lessonsCompleted;
            userProgress.streakDays = window.appState.streakDays;
            userProgress.diagnosticLevel = window.appState.diagnosticLevel;
            userProgress.weeklyProgress = window.appState.weeklyProgress;
            userProgress.vocabularyWordsLearned = window.appState.vocabularyWordsLearned;
            
            localStorage.setItem('englishLearningProgress', JSON.stringify(userProgress));
            console.log("💾 Progreso actualizado y guardado para usuario:", user.email);
        }
        
        // 5. Actualizar display del usuario
        updateUserDisplay(user);
        console.log("✅ Display del usuario actualizado");
        
    } catch (error) {
        console.error("❌ Error al restaurar progreso del usuario:", error);
    }
}

// Función para forzar la actualización del display
function forceUpdateDisplay() {
    console.log("🔧 Forzando actualización del display...");
    
    try {
        const currentUser = getCurrentUser();
        if (currentUser) {
            updateUserDisplay(currentUser);
            console.log("✅ Display forzado a actualizar");
        } else {
            console.log("❌ No se pudo forzar la actualización - usuario no encontrado");
        }
    } catch (error) {
        console.error("❌ Error al forzar actualización:", error);
    }
}

// Exportar funciones globalmente
window.handleRegister = handleRegister;
window.handleLogin = handleLogin;
window.setupAuthTabs = setupAuthTabs;
window.checkAuth = checkAuth;
window.logout = logout;
window.updateUserDisplay = updateUserDisplay;
window.showAuthModal = showAuthModal;
window.hideAuthModal = hideAuthModal;
window.initAuth = initAuth;
window.syncUserDisplay = syncUserDisplay;
window.debugLocalStorage = debugLocalStorage;
window.migrateUserProgress = migrateUserProgress;
window.restoreUserProgress = restoreUserProgress;
window.forceUpdateDisplay = forceUpdateDisplay;
window.getCurrentUser = getCurrentUser;
