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
    
    users.push({ name, email, password });
    localStorage.setItem('englishLearningUsers', JSON.stringify(users));
    console.log("✅ Usuario registrado exitosamente");
    
    if (typeof showNotification === 'function') {
        showNotification('¡Registro exitoso! Ahora puedes iniciar sesión.', 'success');
    } else {
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    }
    
    console.log("🔄 Cambiando a tab de login...");
    document.querySelector('.auth-tab[data-tab="login"]').click();
    console.log("✅ Cambio a tab de login completado");
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
    
    // Verificar si el usuario ya tiene un nivel asignado
    const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
    const hasLevel = userProgress.level && userProgress.level > 0;
    
    if (!hasLevel) {
        console.log("🎯 Usuario nuevo, mostrando diagnóstico...");
        // Mostrar modal de diagnóstico
        if (typeof showDiagnosticModal === 'function') {
            showDiagnosticModal();
            console.log("✅ Modal de diagnóstico mostrado");
        } else {
            console.warn("⚠️ showDiagnosticModal no está disponible");
            // Fallback: asignar nivel 1 por defecto
            const defaultProgress = {
                level: 1,
                xp: 0,
                lessonsCompleted: 0,
                vocabularyWordsLearned: 0,
                practiceStreak: 0
            };
            localStorage.setItem('englishLearningProgress', JSON.stringify(defaultProgress));
            console.log("✅ Nivel por defecto asignado");
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
        
        console.log("🎉 Login completado exitosamente");
    } catch (error) {
        console.error("❌ Error durante la carga:", error);
    }
}

function getCurrentUser() {
    const session = JSON.parse(localStorage.getItem('englishLearningSession') || 'null');
    if (!session) return null;
    return session;
}

function updateUserDisplay() {
    const userDisplay = document.getElementById('userDisplay');
    const session = getCurrentUser();
    if (session && session.name) {
        userDisplay.innerHTML = `<i class="fas fa-user"></i> ${session.name}`;
        userDisplay.style.display = 'block';
    } else if (userDisplay) {
        userDisplay.style.display = 'none';
    }
}

function checkAuth() {
    console.log("🔐 Iniciando verificación de autenticación...");
    try {
        const session = JSON.parse(localStorage.getItem('englishLearningSession') || 'null');
        console.log("📋 Sesión encontrada en localStorage:", session);
        
        if (session && session.email) {
            console.log("🔐 Sesión encontrada, ocultando modal...");
            hideAuthModal();
            updateUserDisplay();
            
            try {
                console.log("📊 Cargando progreso...");
                if (typeof loadProgress === "function") {
                    loadProgress();
                    console.log("✅ Progreso cargado");
                } else {
                    console.warn("⚠️ loadProgress no está disponible");
                }
                
                console.log("🎨 Actualizando UI...");
                if (typeof updateUI === "function") {
                    updateUI();
                    console.log("✅ UI actualizada");
                } else {
                    console.warn("⚠️ updateUI no está disponible");
                }
                
                console.log("📚 Cargando lección actual...");
                if (typeof loadCurrentLesson === "function") {
                    loadCurrentLesson();
                    console.log("✅ Lección actual cargada");
                } else {
                    console.warn("⚠️ loadCurrentLesson no está disponible");
                }
                
                console.log("🎉 Autenticación verificada exitosamente");
            } catch (error) {
                console.error("❌ Error durante la verificación de autenticación:", error);
            }
        } else {
            console.log("🔐 No hay sesión, mostrando modal de login...");
            console.log("🎯 Llamando a showAuthModal()...");
            showAuthModal();
            console.log("✅ showAuthModal() ejecutado");
        }
    } catch (error) {
        console.error("❌ Error en checkAuth:", error);
        // Si hay error, mostrar modal de login como fallback
        console.log("🔄 Mostrando modal de login como fallback...");
        showAuthModal();
    }
}

function logout() {
    localStorage.removeItem('englishLearningSession');
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

// Función de inicialización para el módulo de autenticación
function initAuth() {
    console.log("🚀 Módulo de autenticación inicializado");
    try {
        setupAuthTabs();
        console.log("✅ Tabs de autenticación configurados");
        
        checkAuth();
        console.log("✅ Verificación de autenticación completada");
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
