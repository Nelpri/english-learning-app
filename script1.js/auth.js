// Módulo de autenticación: registro, login, logout, overlays/modales

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    let users = JSON.parse(localStorage.getItem('englishLearningUsers') || '[]');
    if (users.find(u => u.email === email)) {
        showNotification('El email ya está registrado', 'error');
        return;
    }
    users.push({ name, email, password });
    localStorage.setItem('englishLearningUsers', JSON.stringify(users));
    showNotification('¡Registro exitoso! Ahora puedes iniciar sesión.', 'success');
    document.querySelector('.auth-tab[data-tab="login"]').click();
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    let users = JSON.parse(localStorage.getItem('englishLearningUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        showNotification('Email o contraseña incorrectos', 'error');
        return;
    }
    localStorage.setItem('englishLearningSession', JSON.stringify({
        email: user.email, 
        name: user.name 
    }));
    hideAuthModal();
    showNotification(`👋 ¡Bienvenido de vuelta, ${user.name}!`, 'success');
    updateUserDisplay();
    loadProgress();
    updateUI();
    loadCurrentLesson();
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
    const session = JSON.parse(localStorage.getItem('englishLearningSession') || 'null');
    if (session && session.email) {
        hideAuthModal();
        updateUserDisplay();
        loadProgress();
        updateUI();
        loadCurrentLesson();
    } else {
        showAuthModal();
    }
}

function logout() {
    localStorage.removeItem('englishLearningSession');
    updateUserDisplay();
    showAuthModal();
}

function showAuthModal() {
    document.getElementById('authOverlay').style.display = 'block';
    document.getElementById('authModal').style.display = 'block';
}

function hideAuthModal() {
    document.getElementById('authOverlay').style.display = 'none';
    document.getElementById('authModal').style.display = 'none';
}

function setupAuthTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            document.querySelector(`.auth-form[data-tab="${this.dataset.tab}"]`)?.classList.add('active');
        });
    });
}

window.handleRegister = handleRegister;
window.handleLogin = handleLogin;
window.setupAuthTabs = setupAuthTabs;
window.checkAuth = checkAuth;
window.logout = logout;
window.updateUserDisplay = updateUserDisplay;
window.showAuthModal = showAuthModal;
window.hideAuthModal = hideAuthModal;
