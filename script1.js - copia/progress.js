// Módulo de progreso: estadísticas, rachas, logros visuales

function loadProgress() {
    // Lógica para cargar progreso
    const saved = localStorage.getItem('englishLearningProgress');

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
    // Lógica para actualizar la UI
    document.getElementById('currentLevel').textContent = appState.currentLevel;
    document.getElementById('currentXP').textContent = appState.currentXP;
    document.getElementById('streakDays').textContent = appState.streakDays;
    document.getElementById('lessonsCompleted').textContent = appState.lessonsCompleted;
    // Actualizar contador de logros usando el nuevo sistema
    const achievementProgress = ACHIEVEMENTS_SYSTEM.getAchievementProgress();
    document.getElementById('achievementsEarned').textContent = achievementProgress.unlocked;
    
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
    updateUserDisplay();
    
    // Mostrar nivel MCER en el header si hay usuario
    const user = getCurrentUser();
    if (user && user.mcer) {
        const levelElement = document.getElementById('currentLevel');
        if (levelElement) {
            levelElement.textContent = `${appState.currentLevel} (${user.mcer})`;
        }
    }
}

function loadProgressChart() {
    // Lógica para cargar el gráfico de progreso
    const chartContainer = document.getElementById('weeklyChart');
    if (!chartContainer || chartContainer.nodeName !== 'CANVAS') {
        console.warn('No se encontró el canvas para el gráfico de progreso.');
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
    if (window.weeklyChart) {
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
    
    // Cargar panel de logros
    loadAchievementsPanel();
    
    // Cargar panel de estadísticas detalladas
    loadDetailedStatsPanel();
}

function loadDetailedStatsPanel() {
    // Lógica para cargar panel de estadísticas detalladas
    const progressContainer = document.querySelector('.progress-container');
    if (!progressContainer) return;
    
    // Verificar si ya existe el panel de estadísticas
    let statsPanel = progressContainer.querySelector('.stats-dashboard');
    if (!statsPanel) {
        statsPanel = document.createElement('div');
        statsPanel.className = 'stats-dashboard';
        progressContainer.appendChild(statsPanel);
    }
    

    
    statsPanel.innerHTML = STATISTICS_SYSTEM.createDetailedStatsPanel();
}

function loadAchievementsPanel() {
    // Lógica para cargar panel de logros
    const progressContainer = document.querySelector('.progress-container');
    if (!progressContainer) return;
    
    // Verificar si ya existe el panel de logros
    let achievementsPanel = progressContainer.querySelector('.achievements-panel');
    if (!achievementsPanel) {
        achievementsPanel = document.createElement('div');
        achievementsPanel.className = 'achievements-panel';
        progressContainer.appendChild(achievementsPanel);
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
