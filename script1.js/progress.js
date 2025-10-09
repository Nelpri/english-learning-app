// Módulo de progreso: estadísticas, rachas, logros visuales

 // Sistema de estadísticas avanzado
 const STATISTICS_SYSTEM = {
     // Almacenar actividades diarias
     recordActivity: function(type, data) {
         console.log("📊 Actividad registrada:", type, data);
         try {
             const email = getCurrentUserEmail();
             const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
             const store = getProgressStore();
 
             if (!store[email]) store[email] = {};
             if (!store[email].dailyStats) store[email].dailyStats = {};
             if (!store[email].dailyStats[today]) {
                 store[email].dailyStats[today] = {
                     date: today,
                     activities: [],
                     totalXP: 0,
                     lessonsCompleted: 0,
                     practiceTime: 0,
                     vocabularyLearned: 0
                 };
             }
 
             const dayStats = store[email].dailyStats[today];
             dayStats.activities.push({
                 type: type,
                 data: data,
                 timestamp: new Date().toISOString()
             });
 
             // Actualizar métricas según tipo de actividad
             switch(type) {
                 case 'lesson_completed':
                     dayStats.lessonsCompleted++;
                     dayStats.totalXP += data.xpEarned || 0;
                     break;
                 case 'practice_session':
                     dayStats.practiceTime += data.timeSpent || 0;
                     dayStats.totalXP += data.xpEarned || 0;
                     break;
                 case 'vocabulary_learned':
                     dayStats.vocabularyLearned += data.wordsCount || 0;
                     dayStats.totalXP += data.xpEarned || 0;
                     break;
                 case 'streak_updated':
                     // Ya manejado en checkDailyStreak
                     break;
             }
 
             saveProgressStore(store);
         } catch (e) {
             console.error('Error al registrar actividad:', e);
         }
     },
 
     // Obtener estadísticas de los últimos 30 días
     getLast30DaysStats: function() {
         try {
             const email = getCurrentUserEmail();
             const store = getProgressStore();
             const stats = store[email]?.dailyStats || {};
             const today = new Date();
             const days = [];
 
             for (let i = 29; i >= 0; i--) {
                 const date = new Date(today);
                 date.setDate(today.getDate() - i);
                 const dateStr = date.toISOString().split('T')[0];
                 const dayData = stats[dateStr] || {
                     date: dateStr,
                     totalXP: 0,
                     lessonsCompleted: 0,
                     practiceTime: 0,
                     vocabularyLearned: 0
                 };
                 days.push(dayData);
             }
 
             return days;
         } catch (e) {
             console.error('Error al obtener estadísticas de 30 días:', e);
             return [];
         }
     },
 
     // Calcular predicción de progreso
     predictProgress: function(days = 7) {
         try {
             const last30Days = this.getLast30DaysStats();
             const recentDays = last30Days.slice(-14); // Últimas 2 semanas
 
             const avgXP = recentDays.reduce((sum, day) => sum + day.totalXP, 0) / recentDays.length;
             const avgLessons = recentDays.reduce((sum, day) => sum + day.lessonsCompleted, 0) / recentDays.length;
             const avgPractice = recentDays.reduce((sum, day) => sum + day.practiceTime, 0) / recentDays.length;
 
             const currentXP = appState.currentXP || 0;
             const currentLevel = appState.currentLevel || 1;
 
             // Estimar XP futuro
             const predictedXP = currentXP + (avgXP * days);
             const predictedLessons = Math.round(avgLessons * days);
 
             // Estimar nivel futuro
             let predictedLevel = currentLevel;
             if (typeof LEVEL_SYSTEM !== 'undefined' && LEVEL_SYSTEM.levels) {
                 for (let level of LEVEL_SYSTEM.levels) {
                     if (predictedXP >= level.xpRequired) {
                         predictedLevel = level.level;
                     }
                 }
             }
 
             return {
                 days: days,
                 predictedXP: Math.round(predictedXP),
                 predictedLevel: predictedLevel,
                 predictedLessons: predictedLessons,
                 avgDailyXP: Math.round(avgXP),
                 avgDailyLessons: Math.round(avgLessons * 10) / 10,
                 avgDailyPractice: Math.round(avgPractice)
             };
         } catch (e) {
             console.error('Error en predicción de progreso:', e);
             return null;
         }
     },
 
     // Crear heatmap de estudio diario
     createStudyHeatmap: function() {
         const days = this.getLast30DaysStats();
         const maxXP = Math.max(...days.map(d => d.totalXP));
 
         return `
             <div class="study-heatmap">
                 <h4><i class="fas fa-calendar-alt"></i> Actividad de Estudio (Últimos 30 días)</h4>
                 <div class="heatmap-grid">
                     ${days.map(day => {
                         const intensity = maxXP > 0 ? (day.totalXP / maxXP) * 4 : 0;
                         const intensityClass = intensity === 0 ? 'none' :
                                              intensity < 1 ? 'low' :
                                              intensity < 2 ? 'medium' :
                                              intensity < 3 ? 'high' : 'very-high';
 
                         return `
                             <div class="heatmap-day ${intensityClass}" title="${day.date}: ${day.totalXP} XP, ${day.lessonsCompleted} lecciones">
                                 <span class="day-number">${new Date(day.date).getDate()}</span>
                             </div>
                         `;
                     }).join('')}
                 </div>
                 <div class="heatmap-legend">
                     <span>Menos</span>
                     <div class="legend-colors">
                         <div class="legend-color none"></div>
                         <div class="legend-color low"></div>
                         <div class="legend-color medium"></div>
                         <div class="legend-color high"></div>
                         <div class="legend-color very-high"></div>
                     </div>
                     <span>Más</span>
                 </div>
             </div>
         `;
     },
 
     createDetailedStatsPanel: function() {
         const last30Days = this.getLast30DaysStats();
         const totalXP = last30Days.reduce((sum, day) => sum + day.totalXP, 0);
         const totalLessons = last30Days.reduce((sum, day) => sum + day.lessonsCompleted, 0);
         const totalPractice = last30Days.reduce((sum, day) => sum + day.practiceTime, 0);
         const totalVocabulary = last30Days.reduce((sum, day) => sum + day.vocabularyLearned, 0);
 
         const prediction = this.predictProgress(7);
         const heatmap = this.createStudyHeatmap();
 
         return `
             <div class="stats-dashboard">
                 <h3><i class="fas fa-chart-bar"></i> Estadísticas Detalladas</h3>
 
                 <div class="stats-overview">
                     <div class="stat-card">
                         <i class="fas fa-star"></i>
                         <h4>XP Total (30 días)</h4>
                         <span class="stat-value">${totalXP}</span>
                     </div>
                     <div class="stat-card">
                         <i class="fas fa-book"></i>
                         <h4>Lecciones Completadas</h4>
                         <span class="stat-value">${totalLessons}</span>
                     </div>
                     <div class="stat-card">
                         <i class="fas fa-clock"></i>
                         <h4>Tiempo de Práctica</h4>
                         <span class="stat-value">${Math.round(totalPractice / 60)}min</span>
                     </div>
                     <div class="stat-card">
                         <i class="fas fa-language"></i>
                         <h4>Vocabulario Aprendido</h4>
                         <span class="stat-value">${totalVocabulary}</span>
                     </div>
                 </div>
 
                 ${heatmap}
 
                 <div class="progress-prediction">
                     <h4><i class="fas fa-crystal-ball"></i> Predicción de Progreso (7 días)</h4>
                     ${prediction ? `
                         <div class="prediction-grid">
                             <div class="prediction-item">
                                 <span class="prediction-label">XP Estimado:</span>
                                 <span class="prediction-value">${prediction.predictedXP} (+${prediction.predictedXP - (appState.currentXP || 0)})</span>
                             </div>
                             <div class="prediction-item">
                                 <span class="prediction-label">Nivel Estimado:</span>
                                 <span class="prediction-value">${prediction.predictedLevel}</span>
                             </div>
                             <div class="prediction-item">
                                 <span class="prediction-label">Lecciones Estimadas:</span>
                                 <span class="prediction-value">${prediction.predictedLessons}</span>
                             </div>
                             <div class="prediction-item">
                                 <span class="prediction-label">Promedio Diario:</span>
                                 <span class="prediction-value">${prediction.avgDailyXP} XP</span>
                             </div>
                         </div>
                         <p class="prediction-note">Basado en tu actividad de las últimas 2 semanas</p>
                     ` : '<p>No hay suficientes datos para generar predicciones</p>'}
                 </div>
 
                 <div class="stats-section">
                     <h4>Actividad Reciente</h4>
                     <div class="recent-activity">
                         ${last30Days.slice(-7).reverse().map(day => `
                             <div class="activity-item">
                                 <span class="activity-date">${new Date(day.date).toLocaleDateString()}</span>
                                 <span class="activity-stats">
                                     ${day.totalXP} XP • ${day.lessonsCompleted} lecciones • ${Math.round(day.practiceTime / 60)}min práctica
                                 </span>
                             </div>
                         `).join('')}
                     </div>
                 </div>
             </div>
         `;
     }
 };
// Utilidades para progreso por usuario (namespacing seguro)
function getCurrentUserEmail() {
    try {
        const session = JSON.parse(localStorage.getItem('englishLearningSession') || 'null');
        if (session && session.email) return session.email;
        const user = JSON.parse(localStorage.getItem('englishLearningUser') || 'null');
        if (user && user.email) return user.email;
        if (typeof appState !== 'undefined' && appState.currentUser && appState.currentUser.email) return appState.currentUser.email;
        return 'guest';
    } catch (e) {
        return 'guest';
    }
}

function getProgressStore() {
    try {
        const raw = localStorage.getItem('englishLearningProgress');
        return raw ? (JSON.parse(raw) || {}) : {};
    } catch (e) {
        return {};
    }
}

function saveProgressStore(store) {
    try {
        localStorage.setItem('englishLearningProgress', JSON.stringify(store || {}));
        return true;
    } catch (e) {
        console.error('❌ Error al guardar progreso:', e);
        return false;
    }
}

function getUserProgress() {
    try {
        const email = getCurrentUserEmail();
        const store = getProgressStore();
        if (!store[email]) store[email] = {};
        return store[email];
    } catch (e) {
        return {};
    }
}

function getUserProgressField(key, defaultValue = undefined) {
    try {
        const up = getUserProgress();
        if (Object.prototype.hasOwnProperty.call(up, key)) return up[key];
        return defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

function setUserProgressField(key, value) {
    try {
        const email = getCurrentUserEmail();
        const store = getProgressStore();
        if (!store[email]) store[email] = {};
        store[email][key] = value;

        // Mantener snapshot legacy mínimo
        if (key === 'xp') store.currentXP = value;
        if (key === 'level') store.level = value;

        store.lastSaved = new Date().toISOString();
        saveProgressStore(store);
        return true;
    } catch (e) {
        console.error('❌ Error en setUserProgressField:', e);
        return false;
    }
}

function setUserProgressFields(partial) {
    try {
        const email = getCurrentUserEmail();
        const store = getProgressStore();
        if (!store[email]) store[email] = {};
        Object.assign(store[email], partial || {});

        if (partial && 'xp' in partial) store.currentXP = partial.xp;
        if (partial && 'level' in partial) store.level = partial.level;

        store.lastSaved = new Date().toISOString();
        saveProgressStore(store);
        return true;
    } catch (e) {
        console.error('❌ Error en setUserProgressFields:', e);
        return false;
    }
}

// Utilidades para progreso por usuario
/* duplicado getCurrentUserEmail eliminado: se mantiene la versión única definida en la cabecera */

function loadProgress() {
    console.log("📊 Iniciando carga de progreso...");
    try {
        const email = getCurrentUserEmail();
        const raw = localStorage.getItem('englishLearningProgress');
        let store = {};
        if (raw) {
            try { store = JSON.parse(raw) || {}; } catch (e) { store = {}; }
        }

        const hasRootData = store && (store.level || store.currentLevel || store.xp || store.currentXP);
        let progressSource = store[email];

        // Migración desde nivel raíz si existe (compatibilidad hacia espacio por usuario)
        if (!progressSource && hasRootData) {
            progressSource = {
                xp: store.currentXP ?? store.xp ?? 0,
                level: store.currentLevel ?? store.level ?? 1,
                lessonsCompleted: store.lessonsCompleted ?? 0,
                streakDays: store.streakDays ?? 0,
                diagnosticLevel: store.diagnosticLevel ?? 'A1',
                weeklyProgress: store.weeklyProgress ?? null,
                vocabularyWordsLearned: store.vocabularyWordsLearned ?? 0,
                diagnosticCompleted: store.diagnosticCompleted ?? false
            };
            store[email] = progressSource;
            localStorage.setItem('englishLearningProgress', JSON.stringify(store));
            console.log("🔄 Migrado progreso raíz → usuario:", email);
        }

        if (progressSource) {
            if (typeof appState !== 'undefined') {
                if (progressSource.xp !== undefined) appState.currentXP = progressSource.xp;
                if (progressSource.level !== undefined) appState.currentLevel = progressSource.level;
                if (progressSource.lessonsCompleted !== undefined) appState.lessonsCompleted = progressSource.lessonsCompleted;
                if (progressSource.streakDays !== undefined) appState.streakDays = progressSource.streakDays;
                if (progressSource.weeklyProgress !== undefined) appState.weeklyProgress = progressSource.weeklyProgress;
                if (progressSource.diagnosticLevel !== undefined) appState.diagnosticLevel = progressSource.diagnosticLevel;
                if (progressSource.vocabularyWordsLearned !== undefined) appState.vocabularyWordsLearned = progressSource.vocabularyWordsLearned;
                if (progressSource.diagnosticCompleted !== undefined) appState.diagnosticCompleted = progressSource.diagnosticCompleted;
            }
            console.log("✅ Progreso cargado para", email, progressSource);
        } else {
            console.log("ℹ️ No hay progreso guardado para", email, "usando valores por defecto");
        }
        
        // Cargar logros del usuario
        if (typeof ACHIEVEMENTS_SYSTEM !== 'undefined' && typeof ACHIEVEMENTS_SYSTEM.loadUserAchievements === 'function') {
            ACHIEVEMENTS_SYSTEM.loadUserAchievements();
            console.log("🏆 Logros del usuario cargados");
        } else {
            console.warn("⚠️ ACHIEVEMENTS_SYSTEM no está disponible");
        }
        
        // Cargar gráfico de progreso y paneles
        loadProgressChart();
        loadAchievementsPanel();
        loadDetailedStatsPanel();
        
        console.log("✅ Progreso cargado exitosamente");
    } catch (error) {
        console.error("❌ Error al cargar progreso:", error);
    }
}

function saveProgress() {
    try {
        const email = getCurrentUserEmail();
        const raw = localStorage.getItem('englishLearningProgress');
        let store = {};
        if (raw) {
            try { store = JSON.parse(raw) || {}; } catch (e) { store = {}; }
        }

        if (!store[email]) store[email] = {};
        const entry = store[email];

        // Persistir solo los campos relevantes por usuario
        entry.xp = (typeof appState !== 'undefined' ? appState.currentXP : entry.xp) ?? 0;
        entry.level = (typeof appState !== 'undefined' ? appState.currentLevel : entry.level) ?? 1;
        entry.lessonsCompleted = (typeof appState !== 'undefined' ? appState.lessonsCompleted : entry.lessonsCompleted) ?? 0;
        entry.streakDays = (typeof appState !== 'undefined' ? appState.streakDays : entry.streakDays) ?? 0;
        entry.diagnosticLevel = (typeof appState !== 'undefined' ? appState.diagnosticLevel : entry.diagnosticLevel) ?? 'A1';
        entry.weeklyProgress = (typeof appState !== 'undefined' ? appState.weeklyProgress : entry.weeklyProgress) ?? null;
        entry.vocabularyWordsLearned = (typeof appState !== 'undefined' ? appState.vocabularyWordsLearned : entry.vocabularyWordsLearned) ?? 0;
        entry.diagnosticCompleted = (typeof appState !== 'undefined' ? appState.diagnosticCompleted : entry.diagnosticCompleted) ?? false;
        entry.lastSaved = new Date().toISOString();

        // Compatibilidad: reflejar un snapshot mínimo en raíz (para lecturas legacy)
        store.currentXP = entry.xp;
        store.level = entry.level;
        store.lessonsCompleted = entry.lessonsCompleted;
        store.streakDays = entry.streakDays;
        store.diagnosticLevel = entry.diagnosticLevel;
        store.weeklyProgress = entry.weeklyProgress;
        store.vocabularyWordsLearned = entry.vocabularyWordsLearned;
        store.diagnosticCompleted = entry.diagnosticCompleted;
        store.lastSaved = entry.lastSaved;

        localStorage.setItem('englishLearningProgress', JSON.stringify(store));

        // Guardar logros del usuario si el sistema está disponible
        if (typeof ACHIEVEMENTS_SYSTEM !== 'undefined' && typeof ACHIEVEMENTS_SYSTEM.saveUserAchievements === 'function') {
            ACHIEVEMENTS_SYSTEM.saveUserAchievements();
        }
    } catch (e) {
        console.error("❌ Error al guardar progreso:", e);
    }
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
        const levelProgress = calculateLevelProgress();
        const progressPercentage = levelProgress.percentage;
        const xpInCurrentLevel = levelProgress.xpInLevel;
        const xpForNextLevel = levelProgress.xpForNext;
        
        // Actualizar elementos visuales de la barra de progreso
        const progressFill = document.getElementById('levelProgressFill');
        const progressText = document.getElementById('levelProgressText');
        
        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
            console.log("📊 Barra de progreso actualizada:", progressPercentage + "%");
        }
        
        if (progressText) {
            if (xpForNextLevel > 0) {
                progressText.textContent = `${xpInCurrentLevel}/${xpForNextLevel} XP`;
            } else {
                progressText.textContent = "Nivel Máximo";
            }
            console.log("📊 Texto de progreso actualizado");
        }
        
        // Actualizar display del usuario
        const currentUser = getCurrentUser();
        if (currentUser) {
            updateUserDisplay(currentUser);
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
            // Reemplazar el canvas por un contenedor informativo accesible
            const fallback = document.createElement('div');
            fallback.className = 'chart-fallback';
            fallback.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100%;color:#666;text-align:center;padding:1rem;border:1px dashed #ccc;border-radius:8px;';
            fallback.innerHTML = `
                <div>
                    <i class="fas fa-chart-bar" aria-hidden="true" style="font-size:2rem; margin-bottom: 0.5rem;"></i>
                    <p role="status">Gráfico de progreso no disponible</p>
                    <small>Chart.js no está cargado</small>
                </div>
            `;
            chartContainer.replaceWith(fallback);
            return;
        }
        
        const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        // Simular datos de progreso semanal
        const wp = (typeof appState !== 'undefined' && appState.weeklyProgress) ? appState.weeklyProgress : {};
        const weeklyData = [
            Number(wp.monday || 0),
            Number(wp.tuesday || 0),
            Number(wp.wednesday || 0),
            Number(wp.thursday || 0),
            Number(wp.friday || 0),
            Number(wp.saturday || 0),
            Number(wp.sunday || 0)
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
        const userXP = appState.currentXP || 0;
        console.log("📊 Nivel actual del usuario:", userLevel);
        console.log("📊 XP total del usuario:", userXP);
        
        // Mapear nivel y XP a MCER de manera más precisa
        let mcer;
        if (userXP < 100) mcer = 'A1';
        else if (userXP < 300) mcer = 'A1+';
        else if (userXP < 600) mcer = 'A2';
        else if (userXP < 1000) mcer = 'A2+';
        else if (userXP < 1500) mcer = 'B1';
        else if (userXP < 2500) mcer = 'B1+';
        else if (userXP < 4000) mcer = 'B2';
        else if (userXP < 6000) mcer = 'B2+';
        else if (userXP < 9000) mcer = 'C1';
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
    try {
        if (typeof LEVEL_SYSTEM === 'undefined' || !Array.isArray(LEVEL_SYSTEM.levels)) return 0;
        const current = LEVEL_SYSTEM.levels.find(level => level.level === currentLevel) || null;
        const next = LEVEL_SYSTEM.levels.find(level => level.level === currentLevel + 1) || null;
        if (!next) return 0; // nivel máximo alcanzado
        if (!current) return next.xpRequired; // si no se encontró nivel actual, usar xp absoluto del próximo
        return Math.max(0, next.xpRequired - current.xpRequired);
    } catch (e) {
        console.error('❌ Error en getXPForNextLevel:', e);
        return 0;
    }
}

// Función para obtener el nivel correcto basado en XP (copiada de auth.js)
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

// Función para calcular el progreso hacia el siguiente nivel
function calculateLevelProgress() {
    const currentXP = appState.currentXP || 0;
    
    // Sincronizar nivel con XP (usar la misma lógica que auth.js)
    let currentLevel = appState.currentLevel || 1;
    if (typeof LEVEL_SYSTEM !== 'undefined' && LEVEL_SYSTEM.levels) {
        const correctLevel = getCorrectLevelFromXP(currentXP);
        if (correctLevel !== currentLevel) {
            console.log(`🔄 Progress.js: Sincronizando nivel: ${currentLevel} → ${correctLevel} (XP: ${currentXP})`);
            currentLevel = correctLevel;
            appState.currentLevel = currentLevel;
        }
    }
    
    // Encontrar el nivel correcto basado en el XP actual
    let currentLevelData = null;
    let nextLevelData = null;
    
    // Buscar el nivel más alto que el usuario puede alcanzar con su XP actual
    for (let i = LEVEL_SYSTEM.levels.length - 1; i >= 0; i--) {
        if (currentXP >= LEVEL_SYSTEM.levels[i].xpRequired) {
            currentLevelData = LEVEL_SYSTEM.levels[i];
            nextLevelData = LEVEL_SYSTEM.levels[i + 1] || null;
            break;
        }
    }
    
    // Si no se encuentra nivel, usar el nivel 1
    if (!currentLevelData) {
        currentLevelData = LEVEL_SYSTEM.levels[0];
        nextLevelData = LEVEL_SYSTEM.levels[1];
    }
    
    const xpInCurrentLevel = currentXP - currentLevelData.xpRequired;
    const xpForNextLevel = nextLevelData ? nextLevelData.xpRequired - currentLevelData.xpRequired : 0;
    
    if (xpForNextLevel === 0) return { percentage: 100, xpInLevel: xpInCurrentLevel, xpForNext: 0 };
    
    const percentage = Math.max(0, Math.min((xpInCurrentLevel / xpForNextLevel) * 100, 100));
    
    console.log("📊 Progress.js: Cálculo de progreso:", {
        currentXP,
        currentLevel: currentLevelData.level,
        xpInCurrentLevel,
        xpForNextLevel,
        percentage: Math.round(percentage) + "%"
    });
    
    return {
        percentage: Math.round(percentage),
        xpInLevel: Math.max(0, xpInCurrentLevel),
        xpForNext: xpForNextLevel,
        currentLevel: currentLevelData.level
    };
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
window.getCorrectLevelFromXP = getCorrectLevelFromXP;
window.initProgress = initProgress;
window.STATISTICS_SYSTEM = STATISTICS_SYSTEM;

// Exponer utilidades de progreso por usuario (si no están ya definidas en window)
try {
    if (typeof window !== 'undefined') {
        window.getCurrentUserEmail = window.getCurrentUserEmail || getCurrentUserEmail;
        window.getUserProgress = window.getUserProgress || getUserProgress;
        window.getUserProgressField = window.getUserProgressField || getUserProgressField;
        window.setUserProgressField = window.setUserProgressField || setUserProgressField;
        window.setUserProgressFields = window.setUserProgressFields || setUserProgressFields;
    }
} catch (e) {
    console.warn('⚠️ No se pudo exponer utilidades de progreso por usuario:', e);
}
