// Sistema de gamificación mejorado con insignias, streaks y retos

class GamificationSystem {
    constructor() {
        this.achievements = {
            streaks: {
                'streak_3': { name: '🔥 Racha de 3 días', description: 'Practica 3 días seguidos', icon: '🔥', xp: 50 },
                'streak_7': { name: '⚡ Racha de 7 días', description: 'Practica 7 días seguidos', icon: '⚡', xp: 150 },
                'streak_30': { name: '🏆 Racha de 30 días', description: 'Practica 30 días seguidos', icon: '🏆', xp: 500 },
                'streak_100': { name: '👑 Racha de 100 días', description: 'Practica 100 días seguidos', icon: '👑', xp: 2000 }
            },
            lessons: {
                'first_lesson': { name: '🎓 Primera lección', description: 'Completa tu primera lección', icon: '🎓', xp: 25 },
                'lesson_10': { name: '📚 10 lecciones', description: 'Completa 10 lecciones', icon: '📚', xp: 100 },
                'lesson_50': { name: '🎯 50 lecciones', description: 'Completa 50 lecciones', icon: '🎯', xp: 500 },
                'lesson_100': { name: '🌟 100 lecciones', description: 'Completa 100 lecciones', icon: '🌟', xp: 1000 }
            },
            practice: {
                'practice_5': { name: '💪 5 sesiones', description: 'Completa 5 sesiones de práctica', icon: '💪', xp: 75 },
                'practice_25': { name: '🎮 25 sesiones', description: 'Completa 25 sesiones de práctica', icon: '🎮', xp: 300 },
                'practice_100': { name: '🏅 100 sesiones', description: 'Completa 100 sesiones de práctica', icon: '🏅', xp: 1000 }
            },
            vocabulary: {
                'vocab_50': { name: '📖 50 palabras', description: 'Aprende 50 palabras', icon: '📖', xp: 100 },
                'vocab_200': { name: '📚 200 palabras', description: 'Aprende 200 palabras', icon: '📚', xp: 400 },
                'vocab_500': { name: '📖 500 palabras', description: 'Aprende 500 palabras', icon: '📖', xp: 800 }
            },
            levels: {
                'level_5': { name: '⭐ Nivel 5', description: 'Alcanza el nivel 5', icon: '⭐', xp: 200 },
                'level_10': { name: '🌟 Nivel 10', description: 'Alcanza el nivel 10', icon: '🌟', xp: 500 },
                'level_15': { name: '💫 Nivel 15', description: 'Alcanza el nivel 15', icon: '💫', xp: 1000 }
            },
            special: {
                'perfect_score': { name: '🎯 Puntuación perfecta', description: 'Obtén 100% en una sesión', icon: '🎯', xp: 100 },
                'speed_demon': { name: '⚡ Velocidad', description: 'Completa 5 ejercicios en menos de 2 minutos', icon: '⚡', xp: 150 },
                'night_owl': { name: '🦉 Noctámbulo', description: 'Practica después de las 10 PM', icon: '🦉', xp: 50 },
                'early_bird': { name: '🐦 Madrugador', description: 'Practica antes de las 7 AM', icon: '🐦', xp: 50 }
            }
        };

        this.dailyChallenges = {
            monday: { name: 'Lunes Motivador', description: 'Completa 3 ejercicios de gramática', reward: 50, type: 'grammar' },
            tuesday: { name: 'Martes de Vocabulario', description: 'Aprende 10 palabras nuevas', reward: 75, type: 'vocabulary' },
            wednesday: { name: 'Miércoles de Escucha', description: 'Completa 2 ejercicios de listening', reward: 60, type: 'listening' },
            thursday: { name: 'Jueves de Escritura', description: 'Completa 1 ejercicio de escritura', reward: 100, type: 'writing' },
            friday: { name: 'Viernes de Conversación', description: 'Participa en 1 conversación simulada', reward: 80, type: 'conversation' },
            saturday: { name: 'Sábado de Repaso', description: 'Completa 5 ejercicios de repaso', reward: 90, type: 'review' },
            sunday: { name: 'Domingo de Descanso', description: 'Mantén tu racha activa', reward: 30, type: 'streak' }
        };

        this.userAchievements = this.loadUserAchievements();
        this.dailyProgress = this.loadDailyProgress();
    }

    // Cargar logros del usuario
    loadUserAchievements() {
        try {
            const stored = localStorage.getItem('englishLearningAchievements');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error("❌ Error al cargar logros:", error);
            return {};
        }
    }

    // Guardar logros del usuario
    saveUserAchievements() {
        try {
            localStorage.setItem('englishLearningAchievements', JSON.stringify(this.userAchievements));
        } catch (error) {
            console.error("❌ Error al guardar logros:", error);
        }
    }

    // Cargar progreso diario
    loadDailyProgress() {
        try {
            const stored = localStorage.getItem('englishLearningDailyProgress');
            return stored ? JSON.parse(stored) : {
                currentStreak: 0,
                longestStreak: 0,
                lastActivityDate: null,
                dailyChallenges: {},
                weeklyProgress: 0
            };
        } catch (error) {
            console.error("❌ Error al cargar progreso diario:", error);
            return {
                currentStreak: 0,
                longestStreak: 0,
                lastActivityDate: null,
                dailyChallenges: {},
                weeklyProgress: 0
            };
        }
    }

    // Guardar progreso diario
    saveDailyProgress() {
        try {
            localStorage.setItem('englishLearningDailyProgress', JSON.stringify(this.dailyProgress));
        } catch (error) {
            console.error("❌ Error al guardar progreso diario:", error);
        }
    }

    // Verificar y otorgar logros
    checkAchievements(action, data = {}) {
        try {
            const newAchievements = [];

            switch (action) {
                case 'lesson_completed':
                    newAchievements.push(...this.checkLessonAchievements(data));
                    break;
                case 'practice_completed':
                    newAchievements.push(...this.checkPracticeAchievements(data));
                    break;
                case 'vocabulary_learned':
                    newAchievements.push(...this.checkVocabularyAchievements(data));
                    break;
                case 'level_up':
                    newAchievements.push(...this.checkLevelAchievements(data));
                    break;
                case 'perfect_score':
                    newAchievements.push(...this.checkSpecialAchievements('perfect_score', data));
                    break;
                case 'daily_activity':
                    newAchievements.push(...this.checkDailyAchievements(data));
                    break;
            }

            // Otorgar nuevos logros
            newAchievements.forEach(achievement => {
                this.grantAchievement(achievement);
            });

            return newAchievements;

        } catch (error) {
            console.error("❌ Error al verificar logros:", error);
            return [];
        }
    }

    // Verificar logros de lecciones
    checkLessonAchievements(data) {
        const achievements = [];
        const totalLessons = data.totalLessons || 0;

        if (totalLessons === 1 && !this.userAchievements.first_lesson) {
            achievements.push('first_lesson');
        }
        if (totalLessons >= 10 && !this.userAchievements.lesson_10) {
            achievements.push('lesson_10');
        }
        if (totalLessons >= 50 && !this.userAchievements.lesson_50) {
            achievements.push('lesson_50');
        }
        if (totalLessons >= 100 && !this.userAchievements.lesson_100) {
            achievements.push('lesson_100');
        }

        return achievements;
    }

    // Verificar logros de práctica
    checkPracticeAchievements(data) {
        const achievements = [];
        const totalSessions = data.totalSessions || 0;

        if (totalSessions >= 5 && !this.userAchievements.practice_5) {
            achievements.push('practice_5');
        }
        if (totalSessions >= 25 && !this.userAchievements.practice_25) {
            achievements.push('practice_25');
        }
        if (totalSessions >= 100 && !this.userAchievements.practice_100) {
            achievements.push('practice_100');
        }

        return achievements;
    }

    // Verificar logros de vocabulario
    checkVocabularyAchievements(data) {
        const achievements = [];
        const totalWords = data.totalWords || 0;

        if (totalWords >= 50 && !this.userAchievements.vocab_50) {
            achievements.push('vocab_50');
        }
        if (totalWords >= 200 && !this.userAchievements.vocab_200) {
            achievements.push('vocab_200');
        }
        if (totalWords >= 500 && !this.userAchievements.vocab_500) {
            achievements.push('vocab_500');
        }

        return achievements;
    }

    // Verificar logros de nivel
    checkLevelAchievements(data) {
        const achievements = [];
        const level = data.level || 0;

        if (level >= 5 && !this.userAchievements.level_5) {
            achievements.push('level_5');
        }
        if (level >= 10 && !this.userAchievements.level_10) {
            achievements.push('level_10');
        }
        if (level >= 15 && !this.userAchievements.level_15) {
            achievements.push('level_15');
        }

        return achievements;
    }

    // Verificar logros especiales
    checkSpecialAchievements(type, data) {
        const achievements = [];

        if (type === 'perfect_score' && data.score === 100 && !this.userAchievements.perfect_score) {
            achievements.push('perfect_score');
        }

        if (type === 'speed_demon' && data.time < 120 && !this.userAchievements.speed_demon) {
            achievements.push('speed_demon');
        }

        const hour = new Date().getHours();
        if (hour >= 22 && !this.userAchievements.night_owl) {
            achievements.push('night_owl');
        }
        if (hour < 7 && !this.userAchievements.early_bird) {
            achievements.push('early_bird');
        }

        return achievements;
    }

    // Verificar logros diarios
    checkDailyAchievements(data) {
        const achievements = [];
        const today = new Date().toDateString();

        // Verificar racha
        this.updateStreak();
        const streak = this.dailyProgress.currentStreak;

        if (streak >= 3 && !this.userAchievements.streak_3) {
            achievements.push('streak_3');
        }
        if (streak >= 7 && !this.userAchievements.streak_7) {
            achievements.push('streak_7');
        }
        if (streak >= 30 && !this.userAchievements.streak_30) {
            achievements.push('streak_30');
        }
        if (streak >= 100 && !this.userAchievements.streak_100) {
            achievements.push('streak_100');
        }

        return achievements;
    }

    // Actualizar racha
    updateStreak() {
        const today = new Date().toDateString();
        const lastActivity = this.dailyProgress.lastActivityDate;

        if (lastActivity === today) {
            // Ya se registró actividad hoy
            return;
        }

        if (lastActivity) {
            const lastDate = new Date(lastActivity);
            const todayDate = new Date(today);
            const diffTime = todayDate - lastDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Día consecutivo
                this.dailyProgress.currentStreak++;
            } else if (diffDays > 1) {
                // Racha rota
                this.dailyProgress.currentStreak = 1;
            }
        } else {
            // Primera actividad
            this.dailyProgress.currentStreak = 1;
        }

        this.dailyProgress.lastActivityDate = today;
        this.dailyProgress.longestStreak = Math.max(
            this.dailyProgress.longestStreak,
            this.dailyProgress.currentStreak
        );

        this.saveDailyProgress();
    }

    // Otorgar logro
    grantAchievement(achievementId) {
        try {
            const achievement = this.findAchievement(achievementId);
            if (!achievement) return;

            this.userAchievements[achievementId] = {
                unlocked: true,
                unlockedAt: new Date().toISOString(),
                xp: achievement.xp
            };

            this.saveUserAchievements();

            // Mostrar notificación
            this.showAchievementNotification(achievement);

            // Otorgar XP
            if (window.appState) {
                window.appState.currentXP += achievement.xp;
                if (typeof window.saveProgress === 'function') {
                    window.saveProgress();
                }
            }

            console.log("🏆 Logro desbloqueado:", achievement.name);

        } catch (error) {
            console.error("❌ Error al otorgar logro:", error);
        }
    }

    // Buscar logro por ID
    findAchievement(achievementId) {
        for (const category in this.achievements) {
            if (this.achievements[category][achievementId]) {
                return this.achievements[category][achievementId];
            }
        }
        return null;
    }

    // Mostrar notificación de logro
    showAchievementNotification(achievement) {
        try {
            if (typeof window.showNotification === 'function') {
                const message = `🏆 ¡Logro desbloqueado!<br><strong>${achievement.name}</strong><br>${achievement.description}<br>+${achievement.xp} XP`;
                window.showNotification(message, 'success', 5000);
            }
        } catch (error) {
            console.error("❌ Error al mostrar notificación de logro:", error);
        }
    }

    // Obtener desafío diario
    getDailyChallenge() {
        const day = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        return this.dailyChallenges[day] || this.dailyChallenges.monday;
    }

    // Verificar progreso del desafío diario
    checkDailyChallengeProgress(action, data = {}) {
        const challenge = this.getDailyChallenge();
        const today = new Date().toDateString();

        if (!this.dailyProgress.dailyChallenges[today]) {
            this.dailyProgress.dailyChallenges[today] = {
                challenge: challenge,
                progress: 0,
                completed: false
            };
        }

        const dailyChallenge = this.dailyProgress.dailyChallenges[today];

        if (dailyChallenge.completed) return;

        let progress = 0;
        switch (challenge.type) {
            case 'grammar':
                if (action === 'exercise_completed' && data.type === 'grammar') {
                    progress = 1;
                }
                break;
            case 'vocabulary':
                if (action === 'vocabulary_learned') {
                    progress = data.wordsLearned || 1;
                }
                break;
            case 'listening':
                if (action === 'exercise_completed' && data.type === 'listening') {
                    progress = 1;
                }
                break;
            case 'writing':
                if (action === 'writing_completed') {
                    progress = 1;
                }
                break;
            case 'conversation':
                if (action === 'conversation_completed') {
                    progress = 1;
                }
                break;
            case 'review':
                if (action === 'exercise_completed' && data.type === 'review') {
                    progress = 1;
                }
                break;
            case 'streak':
                if (action === 'daily_activity') {
                    progress = 1;
                }
                break;
        }

        dailyChallenge.progress += progress;

        // Verificar si se completó
        const target = this.getChallengeTarget(challenge);
        if (dailyChallenge.progress >= target) {
            dailyChallenge.completed = true;
            this.completeDailyChallenge(challenge);
        }

        this.saveDailyProgress();
    }

    // Obtener objetivo del desafío
    getChallengeTarget(challenge) {
        switch (challenge.type) {
            case 'grammar': return 3;
            case 'vocabulary': return 10;
            case 'listening': return 2;
            case 'writing': return 1;
            case 'conversation': return 1;
            case 'review': return 5;
            case 'streak': return 1;
            default: return 1;
        }
    }

    // Completar desafío diario
    completeDailyChallenge(challenge) {
        try {
            // Otorgar recompensa
            if (window.appState) {
                window.appState.currentXP += challenge.reward;
                if (typeof window.saveProgress === 'function') {
                    window.saveProgress();
                }
            }

            // Mostrar notificación
            if (typeof window.showNotification === 'function') {
                const message = `🎯 ¡Desafío diario completado!<br><strong>${challenge.name}</strong><br>+${challenge.reward} XP`;
                window.showNotification(message, 'success', 5000);
            }

            console.log("🎯 Desafío diario completado:", challenge.name);

        } catch (error) {
            console.error("❌ Error al completar desafío diario:", error);
        }
    }

    // Obtener estadísticas de gamificación
    getGamificationStats() {
        const totalAchievements = Object.keys(this.achievements).reduce((total, category) => {
            return total + Object.keys(this.achievements[category]).length;
        }, 0);

        const unlockedAchievements = Object.keys(this.userAchievements).length;
        const achievementPercentage = Math.round((unlockedAchievements / totalAchievements) * 100);

        return {
            totalAchievements,
            unlockedAchievements,
            achievementPercentage,
            currentStreak: this.dailyProgress.currentStreak,
            longestStreak: this.dailyProgress.longestStreak,
            dailyChallenge: this.getDailyChallenge(),
            dailyProgress: this.dailyProgress.dailyChallenges[new Date().toDateString()] || null
        };
    }

    // Mostrar panel de gamificación
    showGamificationPanel() {
        const stats = this.getGamificationStats();
        
        const panel = document.createElement('div');
        panel.className = 'gamification-panel';
        panel.innerHTML = `
            <div class="gamification-header">
                <h3>🏆 Logros y Desafíos</h3>
                <button class="close-panel" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="gamification-content">
                <div class="stats-section">
                    <h4>📊 Estadísticas</h4>
                    <div class="stat-item">
                        <span>Logros desbloqueados:</span>
                        <span>${stats.unlockedAchievements}/${stats.totalAchievements} (${stats.achievementPercentage}%)</span>
                    </div>
                    <div class="stat-item">
                        <span>Racha actual:</span>
                        <span>${stats.currentStreak} días</span>
                    </div>
                    <div class="stat-item">
                        <span>Mejor racha:</span>
                        <span>${stats.longestStreak} días</span>
                    </div>
                </div>
                <div class="challenge-section">
                    <h4>🎯 Desafío Diario</h4>
                    <div class="challenge-card">
                        <h5>${stats.dailyChallenge.name}</h5>
                        <p>${stats.dailyChallenge.description}</p>
                        <div class="challenge-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${stats.dailyProgress ? (stats.dailyProgress.progress / this.getChallengeTarget(stats.dailyChallenge)) * 100 : 0}%"></div>
                            </div>
                            <span>${stats.dailyProgress ? stats.dailyProgress.progress : 0}/${this.getChallengeTarget(stats.dailyChallenge)}</span>
                        </div>
                        <div class="challenge-reward">Recompensa: +${stats.dailyChallenge.reward} XP</div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
    }
}

// Instancia global del sistema de gamificación
const gamificationSystem = new GamificationSystem();

// Exportar funciones globales
window.checkAchievements = (action, data) => gamificationSystem.checkAchievements(action, data);
window.checkDailyChallenge = (action, data) => gamificationSystem.checkDailyChallengeProgress(action, data);
window.showGamificationPanel = () => gamificationSystem.showGamificationPanel();
window.gamificationSystem = gamificationSystem;

console.log("✅ Sistema de gamificación cargado");
