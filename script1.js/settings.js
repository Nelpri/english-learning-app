// Sistema de configuración de la aplicación
class SettingsSystem {
    constructor() {
        this.settings = {
            language: 'es',
            theme: 'light',
            notifications: true,
            soundEffects: true,
            autoAdvance: false,
            practiceMode: 'adaptive',
            difficulty: 'normal',
            dailyGoal: 50,
            weeklyGoal: 350
        };

        this.init();
    }

    init() {
        this.loadSettings();
        this.createSettingsUI();
        this.bindEvents();
        console.log("✅ Sistema de configuración inicializado");
    }

    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('englishLearningSettings');
            if (savedSettings) {
                this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
            }
            console.log("✅ Configuración cargada:", this.settings);
        } catch (error) {
            console.error("❌ Error al cargar configuración:", error);
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('englishLearningSettings', JSON.stringify(this.settings));
            console.log("💾 Configuración guardada");
        } catch (error) {
            console.error("❌ Error al guardar configuración:", error);
        }
    }

    createSettingsUI() {
        const settingsContainer = document.createElement('div');
        settingsContainer.className = 'settings-container';
        settingsContainer.innerHTML = `
            <h2><i class="fas fa-cog"></i> Configuración</h2>

            <div class="settings-section">
                <h3><i class="fas fa-sync-alt"></i> Sincronización entre Dispositivos</h3>
                <p>Sincroniza tu progreso entre diferentes dispositivos y navegadores.</p>
                <div id="syncContainer">
                    <!-- La UI de sincronización se cargará aquí dinámicamente -->
                </div>
            </div>

            <div class="settings-section">
                <h3><i class="fas fa-user"></i> Información del Usuario</h3>
                <p>Información básica sobre tu cuenta y progreso</p>
                <div class="user-info">
                    <p><strong>Nombre:</strong> ${appState?.currentUser?.name || 'Usuario'}</p>
                    <p><strong>Email:</strong> ${appState?.currentUser?.email || 'guest@example.com'}</p>
                    <p><strong>Nivel Actual:</strong> ${appState?.currentLevel || 1}</p>
                    <p><strong>XP Total:</strong> ${appState?.currentXP || 0}</p>
                </div>
            </div>

            <div class="settings-section">
                <h3><i class="fas fa-palette"></i> Apariencia</h3>
                <p>Personaliza la apariencia de la aplicación</p>

                <div class="setting-item">
                    <label for="themeSelect">Tema:</label>
                    <select id="themeSelect">
                        <option value="light">Claro</option>
                        <option value="dark">Oscuro</option>
                        <option value="auto">Automático</option>
                    </select>
                </div>

                <div class="setting-item">
                    <label for="languageSelect">Idioma:</label>
                    <select id="languageSelect">
                        <option value="es">Español</option>
                        <option value="en">English</option>
                    </select>
                </div>
            </div>

            <div class="settings-section">
                <h3><i class="fas fa-bell"></i> Notificaciones</h3>
                <p>Configura las notificaciones y sonidos</p>

                <div class="setting-item">
                    <label for="notificationsToggle">Notificaciones:</label>
                    <select id="notificationsToggle">
                        <option value="true">Activadas</option>
                        <option value="false">Desactivadas</option>
                    </select>
                </div>

                <div class="setting-item">
                    <label for="soundEffectsToggle">Efectos de sonido:</label>
                    <select id="soundEffectsToggle">
                        <option value="true">Activados</option>
                        <option value="false">Desactivados</option>
                    </select>
                </div>
            </div>

            <div class="settings-section">
                <h3><i class="fas fa-brain"></i> Aprendizaje</h3>
                <p>Ajusta los parámetros de aprendizaje</p>

                <div class="setting-item">
                    <label for="practiceModeSelect">Modo de práctica:</label>
                    <select id="practiceModeSelect">
                        <option value="adaptive">Adaptativo</option>
                        <option value="sequential">Secuencial</option>
                        <option value="random">Aleatorio</option>
                    </select>
                </div>

                <div class="setting-item">
                    <label for="difficultySelect">Dificultad:</label>
                    <select id="difficultySelect">
                        <option value="easy">Fácil</option>
                        <option value="normal">Normal</option>
                        <option value="hard">Difícil</option>
                    </select>
                </div>

                <div class="setting-item">
                    <label for="autoAdvanceToggle">Avance automático:</label>
                    <select id="autoAdvanceToggle">
                        <option value="false">Manual</option>
                        <option value="true">Automático</option>
                    </select>
                </div>
            </div>

            <div class="settings-section">
                <h3><i class="fas fa-target"></i> Metas</h3>
                <p>Establece tus objetivos de aprendizaje</p>

                <div class="setting-item">
                    <label for="dailyGoalInput">Meta diaria (XP):</label>
                    <select id="dailyGoalInput">
                        <option value="25">25 XP</option>
                        <option value="50">50 XP</option>
                        <option value="75">75 XP</option>
                        <option value="100">100 XP</option>
                    </select>
                </div>

                <div class="setting-item">
                    <label for="weeklyGoalInput">Meta semanal (XP):</label>
                    <select id="weeklyGoalInput">
                        <option value="175">175 XP</option>
                        <option value="350">350 XP</option>
                        <option value="525">525 XP</option>
                        <option value="700">700 XP</option>
                    </select>
                </div>
            </div>

            <div class="settings-section">
                <h3><i class="fas fa-chart-bar"></i> Estadísticas de Uso</h3>
                <p>Resumen de tu actividad en la aplicación</p>
                <div class="usage-stats">
                    <div class="stat-item">
                        <span class="stat-label">Sesiones totales:</span>
                        <span class="stat-value">${this.getTotalSessions()}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Tiempo total:</span>
                        <span class="stat-value">${this.getTotalTime()}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">XP ganado:</span>
                        <span class="stat-value">${appState?.currentXP || 0}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Lecciones completadas:</span>
                        <span class="stat-value">${this.getCompletedLessons()}</span>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3><i class="fas fa-database"></i> Datos</h3>
                <p>Gestiona tus datos y progreso</p>

                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button class="btn btn-secondary" onclick="settingsSystem.exportData()">
                        <i class="fas fa-download"></i> Exportar Datos
                    </button>
                    <button class="btn btn-secondary" onclick="settingsSystem.importData()">
                        <i class="fas fa-upload"></i> Importar Datos
                    </button>
                    <button class="btn btn-danger" onclick="settingsSystem.resetProgress()">
                        <i class="fas fa-trash"></i> Reiniciar Progreso
                    </button>
                </div>
            </div>
        `;

        return settingsContainer;
    }

    bindEvents() {
        // Tema
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.value = this.settings.theme;
            themeSelect.addEventListener('change', (e) => {
                this.settings.theme = e.target.value;
                this.applyTheme();
                this.saveSettings();
            });
        }

        // Idioma
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.settings.language;
            languageSelect.addEventListener('change', (e) => {
                this.settings.language = e.target.value;
                this.saveSettings();
                showNotification('Idioma actualizado. Recarga la página para aplicar cambios.', 'info');
            });
        }

        // Notificaciones
        const notificationsToggle = document.getElementById('notificationsToggle');
        if (notificationsToggle) {
            notificationsToggle.value = this.settings.notifications.toString();
            notificationsToggle.addEventListener('change', (e) => {
                this.settings.notifications = e.target.value === 'true';
                this.saveSettings();
            });
        }

        // Efectos de sonido
        const soundEffectsToggle = document.getElementById('soundEffectsToggle');
        if (soundEffectsToggle) {
            soundEffectsToggle.value = this.settings.soundEffects.toString();
            soundEffectsToggle.addEventListener('change', (e) => {
                this.settings.soundEffects = e.target.value === 'true';
                this.saveSettings();
            });
        }

        // Modo de práctica
        const practiceModeSelect = document.getElementById('practiceModeSelect');
        if (practiceModeSelect) {
            practiceModeSelect.value = this.settings.practiceMode;
            practiceModeSelect.addEventListener('change', (e) => {
                this.settings.practiceMode = e.target.value;
                this.saveSettings();
            });
        }

        // Dificultad
        const difficultySelect = document.getElementById('difficultySelect');
        if (difficultySelect) {
            difficultySelect.value = this.settings.difficulty;
            difficultySelect.addEventListener('change', (e) => {
                this.settings.difficulty = e.target.value;
                this.saveSettings();
            });
        }

        // Avance automático
        const autoAdvanceToggle = document.getElementById('autoAdvanceToggle');
        if (autoAdvanceToggle) {
            autoAdvanceToggle.value = this.settings.autoAdvance.toString();
            autoAdvanceToggle.addEventListener('change', (e) => {
                this.settings.autoAdvance = e.target.value === 'true';
                this.saveSettings();
            });
        }

        // Meta diaria
        const dailyGoalInput = document.getElementById('dailyGoalInput');
        if (dailyGoalInput) {
            dailyGoalInput.value = this.settings.dailyGoal.toString();
            dailyGoalInput.addEventListener('change', (e) => {
                this.settings.dailyGoal = parseInt(e.target.value);
                this.saveSettings();
            });
        }

        // Meta semanal
        const weeklyGoalInput = document.getElementById('weeklyGoalInput');
        if (weeklyGoalInput) {
            weeklyGoalInput.value = this.settings.weeklyGoal.toString();
            weeklyGoalInput.addEventListener('change', (e) => {
                this.settings.weeklyGoal = parseInt(e.target.value);
                this.saveSettings();
            });
        }
    }

    applyTheme() {
        const root = document.documentElement;
        if (this.settings.theme === 'dark') {
            root.style.setProperty('--background-color', '#1a1a1a');
            root.style.setProperty('--surface-color', '#2a2a2a');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--text-secondary', '#cccccc');
            root.style.setProperty('--border-color', '#404040');
        } else if (this.settings.theme === 'light') {
            root.style.setProperty('--background-color', '#f1f5f9');
            root.style.setProperty('--surface-color', '#ffffff');
            root.style.setProperty('--text-primary', '#1e293b');
            root.style.setProperty('--text-secondary', '#64748b');
            root.style.setProperty('--border-color', '#e2e8f0');
        } else if (this.settings.theme === 'auto') {
            // Detectar preferencia del sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                this.settings.theme = 'dark';
                this.applyTheme();
            } else {
                this.settings.theme = 'light';
                this.applyTheme();
            }
        }
    }

    getTotalSessions() {
        try {
            const practiceHistory = JSON.parse(localStorage.getItem('practiceHistory') || '[]');
            return practiceHistory.length;
        } catch {
            return 0;
        }
    }

    getTotalTime() {
        try {
            const practiceHistory = JSON.parse(localStorage.getItem('practiceHistory') || '[]');
            const totalMinutes = practiceHistory.reduce((total, session) => {
                if (session.startTime && session.endTime) {
                    const duration = new Date(session.endTime) - new Date(session.startTime);
                    return total + (duration / (1000 * 60)); // Convertir a minutos
                }
                return total;
            }, 0);
            return Math.round(totalMinutes) + ' min';
        } catch {
            return '0 min';
        }
    }

    getCompletedLessons() {
        try {
            const progress = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
            return Object.values(progress).filter(completed => completed).length;
        } catch {
            return 0;
        }
    }

    exportData() {
        try {
            const data = {
                settings: this.settings,
                appState: window.appState || {},
                practiceHistory: JSON.parse(localStorage.getItem('practiceHistory') || '[]'),
                lessonProgress: JSON.parse(localStorage.getItem('lessonProgress') || '{}'),
                vocabularyProgress: JSON.parse(localStorage.getItem('vocabularyProgress') || '{}'),
                exportDate: new Date().toISOString()
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `english-learning-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            showNotification('Datos exportados correctamente', 'success');
        } catch (error) {
            console.error('Error al exportar datos:', error);
            showNotification('Error al exportar datos', 'error');
        }
    }

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = JSON.parse(event.target.result);

                        // Importar configuración
                        if (data.settings) {
                            this.settings = { ...this.settings, ...data.settings };
                            this.saveSettings();
                        }

                        // Importar estado de la aplicación
                        if (data.appState && window.appState) {
                            Object.assign(window.appState, data.appState);
                        }

                        // Importar historial de práctica
                        if (data.practiceHistory) {
                            localStorage.setItem('practiceHistory', JSON.stringify(data.practiceHistory));
                        }

                        // Importar progreso de lecciones
                        if (data.lessonProgress) {
                            localStorage.setItem('lessonProgress', JSON.stringify(data.lessonProgress));
                        }

                        // Importar progreso de vocabulario
                        if (data.vocabularyProgress) {
                            localStorage.setItem('vocabularyProgress', JSON.stringify(data.vocabularyProgress));
                        }

                        showNotification('Datos importados correctamente. Recarga la página para aplicar cambios.', 'success');
                    } catch (error) {
                        console.error('Error al importar datos:', error);
                        showNotification('Error al importar datos. Verifica el formato del archivo.', 'error');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    resetProgress() {
        if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
            // Limpiar localStorage
            localStorage.removeItem('englishLearningUser');
            localStorage.removeItem('practiceHistory');
            localStorage.removeItem('lessonProgress');
            localStorage.removeItem('vocabularyProgress');
            localStorage.removeItem('englishLearningSettings');

            // Reiniciar estado global
            if (window.appState) {
                window.appState.currentXP = 0;
                window.appState.currentLevel = 1;
                window.appState.currentLesson = 0;
            }

            showNotification('Progreso reiniciado correctamente. Recarga la página para aplicar cambios.', 'warning');
        }
    }

    showSettings() {
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = '';
            mainContent.appendChild(this.createSettingsUI());
            this.bindEvents();

            // Cargar UI de sincronización si está disponible
            setTimeout(() => {
                if (window.syncSystem && typeof window.syncSystem.createSyncUI === 'function') {
                    const syncContainer = document.getElementById('syncContainer');
                    if (syncContainer) {
                        const syncUI = window.syncSystem.createSyncUI();
                        syncContainer.appendChild(syncUI);
                    }
                }
            }, 100);
        }
    }
}

// Instancia global del sistema de configuración
window.settingsSystem = new SettingsSystem();

// Función para mostrar configuración desde la navegación
function showSettings() {
    if (window.settingsSystem) {
        window.settingsSystem.showSettings();
    }
}

// Exportar función global
window.showSettings = showSettings;