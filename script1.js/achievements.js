// Sistema de Logros y Gamificación (modularizado)
const ACHIEVEMENTS_SYSTEM = {
    achievements: [
        {
            id: 'first_lesson',
            title: 'Primer Paso',
            description: 'Completa tu primera lección',
            icon: '🎯',
            xpReward: 50,
            unlocked: false
        },
        {
            id: 'streak_7',
            title: 'Constancia',
            description: '7 días consecutivos de estudio',
            icon: '🔥',
            xpReward: 100,
            unlocked: false
        },
        {
            id: 'streak_30',
            title: 'Dedicación',
            description: '30 días consecutivos de estudio',
            icon: '💎',
            xpReward: 300,
            unlocked: false
        },
        {
            id: 'vocabulary_100',
            title: 'Palabras Maestro',
            description: 'Aprende 100 palabras',
            icon: '📚',
            xpReward: 150,
            unlocked: false
        },
        {
            id: 'vocabulary_500',
            title: 'Léxico Rico',
            description: 'Aprende 500 palabras',
            icon: '📖',
            xpReward: 400,
            unlocked: false
        },
        {
            id: 'lessons_10',
            title: 'Estudiante Aplicado',
            description: 'Completa 10 lecciones',
            icon: '🎓',
            xpReward: 200,
            unlocked: false
        },
        {
            id: 'lessons_50',
            title: 'Experto en Aprendizaje',
            description: 'Completa 50 lecciones',
            icon: '👨‍🎓',
            xpReward: 500,
            unlocked: false
        },
        {
            id: 'perfect_score',
            title: 'Perfección',
            description: 'Obtén 100% en un ejercicio',
            icon: '⭐',
            xpReward: 75,
            unlocked: false
        },
        {
            id: 'practice_master',
            title: 'Maestro de la Práctica',
            description: 'Completa 100 ejercicios de práctica',
            icon: '🏋️',
            xpReward: 250,
            unlocked: false
        },
        {
            id: 'level_up_3',
            title: 'Ascenso Rápido',
            description: 'Sube 3 niveles',
            icon: '🚀',
            xpReward: 300,
            unlocked: false
        }
    ],
    
    checkAchievements() {
        const user = getCurrentUser();
        if (!user) return;
        
        const unlockedAchievements = [];
        
        this.achievements.forEach(achievement => {
            if (achievement.unlocked) return;
            
            let shouldUnlock = false;
            
            switch(achievement.id) {
                case 'first_lesson':
                    shouldUnlock = appState.lessonsCompleted >= 1;
                    break;
                case 'streak_7':
                    shouldUnlock = appState.streakDays >= 7;
                    break;
                case 'streak_30':
                    shouldUnlock = appState.streakDays >= 30;
                    break;
                case 'vocabulary_100':
                    shouldUnlock = appState.vocabularyWordsLearned >= 100;
                    break;
                case 'vocabulary_500':
                    shouldUnlock = appState.vocabularyWordsLearned >= 500;
                    break;
                case 'lessons_10':
                    shouldUnlock = appState.lessonsCompleted >= 10;
                    break;
                case 'lessons_50':
                    shouldUnlock = appState.lessonsCompleted >= 50;
                    break;
                case 'perfect_score':
                    break;
                case 'practice_master':
                    shouldUnlock = (appState.grammarExercises || 0) >= 100;
                    break;
                case 'level_up_3':
                    shouldUnlock = appState.currentLevel >= 3;
                    break;
            }
            
            if (shouldUnlock) {
                achievement.unlocked = true;
                unlockedAchievements.push(achievement);
                appState.currentXP += achievement.xpReward;
                this.showAchievementNotification(achievement);
            }
        });
        
        if (unlockedAchievements.length > 0) {
            updateUI();
            saveProgress();
        }
    },
    
    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification achievement-popup';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-text">
                    <h4>¡Logro Desbloqueado!</h4>
                    <p><strong>${achievement.title}</strong></p>
                    <p>${achievement.description}</p>
                    <span class="achievement-xp">+${achievement.xpReward} XP</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.parentElement && notification.remove(), 300);
        }, 5000);
    },
    
    loadUserAchievements() {
        const user = getCurrentUser();
        if (!user) return;
        
        const userAchievements = JSON.parse(localStorage.getItem(`achievements_${user.email}`) || '[]');
        
        this.achievements.forEach(achievement => {
            const userAchievement = userAchievements.find(ua => ua.id === achievement.id);
            if (userAchievement) {
                achievement.unlocked = userAchievement.unlocked;
                achievement.unlockedAt = userAchievement.unlockedAt;
            }
        });
    },
    
    saveUserAchievements() {
        const user = getCurrentUser();
        if (!user) return;
        
        const achievementsToSave = this.achievements.map(achievement => ({
            id: achievement.id,
            unlocked: achievement.unlocked,
            unlockedAt: achievement.unlockedAt
        }));
        
        localStorage.setItem(`achievements_${user.email}`, JSON.stringify(achievementsToSave));
    },
    
    getUnlockedAchievements() {
        return this.achievements.filter(achievement => achievement.unlocked);
    },
    
    getAchievementProgress() {
        const user = getCurrentUser();
        if (!user) return { unlocked: 0, total: 0, percentage: 0 };
        
        const unlocked = this.getUnlockedAchievements().length;
        const total = this.achievements.length;
        const percentage = Math.round((unlocked / total) * 100);
        
        return { unlocked, total, percentage };
    }
};

function checkAchievements() {
    ACHIEVEMENTS_SYSTEM.checkAchievements();
}

function unlockAchievement(achievement) {
    ACHIEVEMENTS_SYSTEM.showAchievementNotification(achievement);
}

// Función de inicialización para el módulo de logros
function initAchievements() {
    console.log("🚀 Módulo de logros inicializado");
    try {
        // Verificar que las funciones estén disponibles
        console.log("🏆 checkAchievements disponible:", typeof checkAchievements === 'function');
        console.log("🔓 unlockAchievement disponible:", typeof unlockAchievement === 'function');
        console.log("📊 getAchievementProgress disponible:", typeof getAchievementProgress === 'function');
        console.log("💾 saveUserAchievements disponible:", typeof saveUserAchievements === 'function');
        
        // Cargar logros del usuario si es posible
        if (typeof loadUserAchievements === 'function') {
            loadUserAchievements();
            console.log("✅ Logros del usuario cargados");
        }
        
        console.log("✅ Módulo de logros inicializado correctamente");
    } catch (error) {
        console.error("❌ Error en inicialización del módulo de logros:", error);
    }
}

// Exportar funciones globalmente
window.ACHIEVEMENTS_SYSTEM = ACHIEVEMENTS_SYSTEM;
window.checkAchievements = checkAchievements;
window.unlockAchievement = unlockAchievement;
window.initAchievements = initAchievements;


