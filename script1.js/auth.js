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
    
    updateUserDisplay();
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
    
    // Verificar si el usuario ya tiene un nivel asignado
    const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
    const hasLevel = userProgress.level && userProgress.level > 0;
    
    if (!hasLevel) {
        console.log("🎯 Usuario nuevo, mostrando diagnóstico...");
        // Mostrar modal de diagnóstico
        if (typeof showDiagnosticModal === 'function') {
            // Pequeño delay para asegurar que el DOM esté listo
            setTimeout(() => {
                showDiagnosticModal();
                console.log("✅ Modal de diagnóstico mostrado");
            }, 100);
        } else {
            console.warn("⚠️ showDiagnosticModal no está disponible");
            // NO asignar nivel por defecto aquí
            // El nivel se asignará DESPUÉS de completar el diagnóstico
            console.log("⏸️ Saltando asignación de nivel hasta completar diagnóstico");
        }
    } else {
        console.log("📊 Usuario existente, nivel actual:", userProgress.level);
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
                currentLevel: userProgress.level || 1
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
        const session = JSON.parse(localStorage.getItem('englishLearningSession') || 'null');
        return session;
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

function updateUserDisplay(user) {
    console.log("👤 Actualizando display del usuario...");
    try {
        const userDisplay = document.getElementById('userDisplay');
        const userNameDisplay = document.getElementById('userNameDisplay');
        const userLevelDisplay = document.getElementById('userLevelDisplay');
        
        // Verificar si los elementos existen antes de continuar
        if (!userDisplay) {
            console.log("⚠️ Elemento userDisplay no encontrado, saltando actualización");
            return;
        }
        
        if (user) {
            console.log("✅ Usuario encontrado, mostrando información");
            userDisplay.style.display = 'flex';
            
            const userInfo = userDisplay.querySelector('.user-info');
            const userName = userDisplay.querySelector('.user-name');
            const userLevel = userDisplay.querySelector('.user-level');
            
            if (userInfo && userName && userLevel) {
                userName.textContent = user.name;
                
                // Obtener nivel del usuario
                const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
                const level = userProgress.level || 1;
                
                const levelNames = {
                    1: "Principiante",
                    2: "Intermedio", 
                    3: "Avanzado"
                };
                
                const levelText = levelNames[level] || "Principiante";
                userLevel.textContent = levelText;
                
                // Actualizar también el display en el header principal
                if (userNameDisplay && userLevelDisplay) {
                    userNameDisplay.textContent = user.name;
                    userLevelDisplay.textContent = `Nivel ${level}`;
                }
                
                console.log("✅ Display del usuario actualizado");
            } else {
                console.warn("⚠️ Elementos internos de userDisplay no encontrados");
            }
        } else {
            console.log("❌ No hay usuario activo, ocultando display");
            userDisplay.style.display = 'none';
            
            // Resetear el display del header principal
            if (userNameDisplay && userLevelDisplay) {
                userNameDisplay.textContent = 'Usuario';
                userLevelDisplay.textContent = 'Nivel A1';
            }
        }
    } catch (error) {
        console.error("❌ Error al actualizar display del usuario:", error);
    }
}

function checkAuth() {
    console.log("🔍 Verificando autenticación...");
    try {
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
            const hasLevel = userProgress.level && userProgress.diagnosticCompleted;
            
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
    
    updateUserDisplay();
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
            console.log("✅ Sesión ya activa, saltando verificación de autenticación");
        }
        
        console.log("✅ Módulo de autenticación inicializado correctamente");
        
    } catch (error) {
        console.error("❌ Error en inicialización del módulo de autenticación:", error);
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
