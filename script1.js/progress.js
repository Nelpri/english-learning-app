// Módulo de progreso: estadísticas, rachas, logros visuales

// Sistema de estadísticas básico
const STATISTICS_SYSTEM = {
    recordActivity: function(type, data) {
        console.log("📊 Actividad registrada:", type, data);
        // Aquí se puede implementar el registro de estadísticas
    },
    
    createDetailedStatsPanel: function() {
        return `
            <div class="stats-dashboard">
                <h3><i class="fas fa-chart-bar"></i> Estadísticas Detalladas</h3>
                <div class="stats-section">
                    <h4>Actividad Reciente</h4>
                    <p>No hay estadísticas disponibles aún. ¡Completa lecciones para ver tu progreso!</p>
                </div>
            </div>
        `;
    }
};

function loadProgress() {
    console.log("📊 Iniciando carga de progreso...");
    try {
        // Lógica para cargar progreso
        const saved = localStorage.getItem('englishLearningProgress');
        if (saved) {
            const savedProgress = JSON.parse(saved);
            // Actualizar appState con el progreso guardado
            Object.assign(appState, savedProgress);
            console.log("✅ Progreso cargado desde localStorage:", savedProgress);
        } else {
            console.log("ℹ️ No hay progreso guardado, usando valores por defecto");
        }
        
        // Cargar logros del usuario
        if (typeof ACHIEVEMENTS_SYSTEM !== 'undefined' && typeof ACHIEVEMENTS_SYSTEM.loadUserAchievements === 'function') {
            ACHIEVEMENTS_SYSTEM.loadUserAchievements();
            console.log("🏆 Logros del usuario cargados");
        } else {
            console.warn("⚠️ ACHIEVEMENTS_SYSTEM no está disponible");
        }
        
        // Cargar gráfico de progreso
        loadProgressChart();
        
        // Cargar panel de logros
        loadAchievementsPanel();
        
        // Cargar panel de estadísticas detalladas
        loadDetailedStatsPanel();
        
        console.log("✅ Progreso cargado exitosamente");
    } catch (error) {
        console.error("❌ Error al cargar progreso:", error);
    }
}

function saveProgress() {
    // Lógica para guardar progreso
    localStorage.setItem('englishLearningProgress', JSON.stringify({
        ...appState,
        lastSaved: new Date().toISOString()
    }));
    
    // Guardar logros del usuario
    ACHIEVEMENTS_SYSTEM.saveUserAchievements();
}

function updateUI() {
    console.log("🎨 Iniciando actualización de UI...");
    try {
        // Lógica para actualizar la UI
        const currentLevelElement = document.getElementById('currentLevel');
        const currentXPElement = document.getElementById('currentXP');
        const streakDaysElement = document.getElementById('streakDays');
        const lessonsCompletedElement = document.getElementById('lessonsCompleted');
        const achievementsEarnedElement = document.getElementById('achievementsEarned');
        
        if (currentLevelElement) currentLevelElement.textContent = appState.currentLevel;
        if (currentXPElement) currentXPElement.textContent = appState.currentXP;
        if (streakDaysElement) streakDaysElement.textContent = appState.streakDays;
        if (lessonsCompletedElement) lessonsCompletedElement.textContent = appState.lessonsCompleted;
        
        // Actualizar contador de logros usando el nuevo sistema
        if (typeof ACHIEVEMENTS_SYSTEM !== 'undefined' && typeof ACHIEVEMENTS_SYSTEM.getAchievementProgress === 'function') {
            const achievementProgress = ACHIEVEMENTS_SYSTEM.getAchievementProgress();
            if (achievementsEarnedElement) achievementsEarnedElement.textContent = achievementProgress.unlocked;
        } else {
            console.warn("⚠️ ACHIEVEMENTS_SYSTEM no está disponible para actualizar logros");
        }
        
        // Actualizar barra de progreso del nivel
        const xpForNextLevel = getXPForNextLevel(appState.currentLevel);
        const xpInCurrentLevel = appState.currentXP % LEVEL_SYSTEM.xpPerLevel;
        const progressPercentage = (xpInCurrentLevel / LEVEL_SYSTEM.xpPerLevel) * 100;
        
        // Actualizar elementos visuales de la barra de progreso
        const progressFill = document.getElementById('levelProgressFill');
        const progressText = document.getElementById('levelProgressText');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${progressPercentage}%`;
            progressText.textContent = `${Math.round(progressPercentage)}%`;
        }
        
        // Actualizar información del usuario en el header
        if (typeof updateUserDisplay === 'function') {
            updateUserDisplay();
            console.log("👤 Display del usuario actualizado");
        } else {
            console.warn("⚠️ updateUserDisplay no está disponible");
        }
        
        // Mostrar nivel MCER en el header si hay usuario
        if (typeof getCurrentUser === 'function') {
            const user = getCurrentUser();
            if (user && user.mcer) {
                const levelElement = document.getElementById('currentLevel');
                if (levelElement) {
                    levelElement.textContent = `${appState.currentLevel} (${user.mcer})`;
                }
            }
        } else {
            console.warn("⚠️ getCurrentUser no está disponible");
        }
        
        console.log("✅ UI actualizada exitosamente");
    } catch (error) {
        console.error("❌ Error al actualizar UI:", error);
    }
}

function loadProgressChart() {
    console.log("📊 Iniciando carga del gráfico de progreso...");
    try {
        // Lógica para cargar el gráfico de progreso
        const chartContainer = document.getElementById('weeklyChart');
        if (!chartContainer || chartContainer.nodeName !== 'CANVAS') {
            console.warn('No se encontró el canvas para el gráfico de progreso.');
            return;
        }
        
        // Verificar si Chart.js está disponible
        if (typeof Chart === 'undefined') {
            console.warn('⚠️ Chart.js no está disponible');
            // Crear un mensaje informativo en lugar del gráfico
            chartContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666;">
                    <div style="text-align: center;">
                        <i class="fas fa-chart-bar" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                        <p>Gráfico de progreso no disponible</p>
                        <small>Chart.js no está cargado</small>
                    </div>
                </div>
            `;
            return;
        }
        
        const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        // Simular datos de progreso semanal
        const weeklyData = [
            appState.currentXP * 0.1,
            appState.currentXP * 0.15,
            appState.currentXP * 0.12,
            appState.currentXP * 0.18,
            appState.currentXP * 0.14,
            appState.currentXP * 0.20,
            appState.currentXP * 0.22
        ];
        
        // Crear gráfico con Chart.js
        const ctx = chartContainer.getContext('2d');
        // Destruir gráfico anterior si existe
        if (window.weeklyChart && typeof window.weeklyChart.destroy === 'function') {
            window.weeklyChart.destroy();
        }
        
        window.weeklyChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: weekDays,
                datasets: [{
                    label: 'XP Ganados',
                    data: weeklyData,
                    backgroundColor: 'rgba(79, 70, 229, 0.8)',
                    borderColor: 'rgba(79, 70, 229, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
        
        console.log("✅ Gráfico de progreso cargado exitosamente");
    } catch (error) {
        console.error("❌ Error al cargar el gráfico de progreso:", error);
    }
}

function loadDetailedStatsPanel() {
    console.log("📊 Iniciando carga del panel de estadísticas detalladas...");
    try {
        // Lógica para cargar panel de estadísticas detalladas
        const progressContainer = document.querySelector('.progress-container');
        if (!progressContainer) {
            console.warn("⚠️ No se encontró el contenedor de progreso");
            return;
        }
        
        // Verificar si ya existe el panel de estadísticas
        let statsPanel = progressContainer.querySelector('.stats-dashboard');
        if (!statsPanel) {
            statsPanel = document.createElement('div');
            statsPanel.className = 'stats-dashboard';
            progressContainer.appendChild(statsPanel);
        }
        
        // Verificar si STATISTICS_SYSTEM está disponible
        if (typeof STATISTICS_SYSTEM === 'undefined' || typeof STATISTICS_SYSTEM.createDetailedStatsPanel !== 'function') {
            console.warn("⚠️ STATISTICS_SYSTEM no está disponible");
            statsPanel.innerHTML = '<p>Panel de estadísticas no disponible</p>';
            return;
        }
        
        statsPanel.innerHTML = STATISTICS_SYSTEM.createDetailedStatsPanel();
        console.log("✅ Panel de estadísticas detalladas cargado exitosamente");
    } catch (error) {
        console.error("❌ Error al cargar panel de estadísticas:", error);
    }
}

function loadAchievementsPanel() {
    console.log("🏆 Iniciando carga del panel de logros...");
    try {
        // Lógica para cargar panel de logros
        const progressContainer = document.querySelector('.progress-container');
        if (!progressContainer) {
            console.warn("⚠️ No se encontró el contenedor de progreso");
            return;
        }
        
        // Verificar si ya existe el panel de logros
        let achievementsPanel = progressContainer.querySelector('.achievements-panel');
        if (!achievementsPanel) {
            achievementsPanel = document.createElement('div');
            achievementsPanel.className = 'achievements-panel';
            progressContainer.appendChild(achievementsPanel);
        }
        
        // Verificar si ACHIEVEMENTS_SYSTEM está disponible
        if (typeof ACHIEVEMENTS_SYSTEM === 'undefined' || typeof ACHIEVEMENTS_SYSTEM.getAchievementProgress !== 'function') {
            console.warn("⚠️ ACHIEVEMENTS_SYSTEM no está disponible");
            achievementsPanel.innerHTML = '<p>Panel de logros no disponible</p>';
            return;
        }
        
        const achievementProgress = ACHIEVEMENTS_SYSTEM.getAchievementProgress();
        
        achievementsPanel.innerHTML = `
            <div class="achievements-header">
                <h3 class="achievements-title">
                    <i class="fas fa-trophy"></i> Logros y Recompensas
                </h3>
                <div class="achievements-progress">
                    <span>${achievementProgress.unlocked}/${achievementProgress.total}</span>
                    <span>(${achievementProgress.percentage}%)</span>
                </div>
            </div>
            <div class="achievements-grid">
                ${ACHIEVEMENTS_SYSTEM.achievements.map(achievement => `
                    <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
                        <div class="achievement-card-header">
                            <div class="achievement-card-icon">
                                ${achievement.icon}
                            </div>
                            <h4 class="achievement-card-title">${achievement.title}</h4>
                        </div>
                        <p class="achievement-card-description">${achievement.description}</p>
                        <div class="achievement-card-reward">
                            <span class="achievement-xp-reward">+${achievement.xpReward} XP</span>
                            ${achievement.unlocked && achievement.unlockedAt ? 
                                `<span class="achievement-unlock-date">Desbloqueado: ${new Date(achievement.unlockedAt).toLocaleDateString()}</span>` : 
                                '<span class="achievement-unlock-date">No desbloqueado</span>'
                            }
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        console.log("✅ Panel de logros cargado exitosamente");
    } catch (error) {
        console.error("❌ Error al cargar panel de logros:", error);
    }
}

function checkDailyStreak() {
    // Lógica para verificar racha diaria
    const today = new Date().toDateString();
    const lastLogin = appState.lastLoginDate ? new Date(appState.lastLoginDate).toDateString() : null;
    
    if (lastLogin !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toDateString();
        
        if (lastLogin === yesterdayString) {
            appState.streakDays++;
        } else {
            appState.streakDays = 1;
        }
        
        appState.lastLoginDate = new Date().toISOString();
        saveProgress();
        
        // Verificar logros de racha después de actualizar
        ACHIEVEMENTS_SYSTEM.checkAchievements();
        
        // Registrar actividad de racha
        STATISTICS_SYSTEM.recordActivity('streak_updated', {
            streakDays: appState.streakDays,
            xpEarned: 0
        });
    }
}

// Función para obtener el nivel MCER del usuario
function getUserLevelMCER() {
    console.log("🎯 Obteniendo nivel MCER del usuario...");
    try {
        // Usar appState en lugar de userProgress
        const userLevel = appState.currentLevel || 1;
        console.log("📊 Nivel actual del usuario:", userLevel);
        
        // Mapear nivel a MCER
        let mcer;
        if (userLevel <= 5) mcer = 'A1';
        else if (userLevel <= 10) mcer = 'A2';
        else if (userLevel <= 15) mcer = 'B1';
        else if (userLevel <= 20) mcer = 'B2';
        else if (userLevel <= 25) mcer = 'C1';
        else mcer = 'C2';
        
        console.log("🏆 Nivel MCER determinado:", mcer);
        return mcer;
    } catch (error) {
        console.error("❌ Error al obtener nivel MCER:", error);
        return 'A1'; // Valor por defecto
    }
}

// Función para obtener XP requerido para el siguiente nivel
function getXPForNextLevel(currentLevel) {
    const nextLevel = LEVEL_SYSTEM.levels.find(level => level.level === currentLevel + 1);
    if (nextLevel) {
        return nextLevel.xpRequired;
    }
    return LEVEL_SYSTEM.xpPerLevel; // Valor por defecto
}

// Función de inicialización para el módulo de progreso
function initProgress() {
    console.log("🚀 Módulo de progreso inicializado");
    try {
        // Cargar progreso al inicializar
        loadProgress();
        console.log("✅ Progreso cargado en inicialización");
    } catch (error) {
        console.error("❌ Error en inicialización del módulo de progreso:", error);
    }
}

// Exportar funciones globalmente
window.loadProgress = loadProgress;
window.saveProgress = saveProgress;
window.updateUI = updateUI;
window.loadProgressChart = loadProgressChart;
window.loadDetailedStatsPanel = loadDetailedStatsPanel;
window.loadAchievementsPanel = loadAchievementsPanel;
window.checkDailyStreak = checkDailyStreak;
window.getUserLevelMCER = getUserLevelMCER;
window.initProgress = initProgress;
window.STATISTICS_SYSTEM = STATISTICS_SYSTEM;
