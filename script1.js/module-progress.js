// Sistema de progreso por módulo y nivel
// Maneja el encadenamiento de módulos y pruebas de nivel

class ModuleProgressSystem {
    constructor() {
        this.moduleProgress = {
            learn: {},
            vocabulary: {},
            practice: {},
            apply: {}
        };
        this.levelTests = {};
        this.currentLevel = 1;
        this.maxLevel = 5;
        this.initializeProgress();
    }

    // Inicializar progreso desde localStorage
    initializeProgress() {
        try {
            const savedProgress = localStorage.getItem('moduleProgress');
            if (savedProgress) {
                this.moduleProgress = JSON.parse(savedProgress);
            }
            
            const savedTests = localStorage.getItem('levelTests');
            if (savedTests) {
                this.levelTests = JSON.parse(savedTests);
            }
            
            console.log("✅ Sistema de progreso de módulos inicializado");
        } catch (error) {
            console.error("❌ Error al inicializar progreso de módulos:", error);
        }
    }

    // Guardar progreso en localStorage
    saveProgress() {
        try {
            localStorage.setItem('moduleProgress', JSON.stringify(this.moduleProgress));
            localStorage.setItem('levelTests', JSON.stringify(this.levelTests));
            console.log("💾 Progreso de módulos guardado");
        } catch (error) {
            console.error("❌ Error al guardar progreso:", error);
        }
    }

    // Obtener progreso de un módulo específico
    getModuleProgress(module, level) {
        const moduleKey = `${module}_level${level}`;
        return this.moduleProgress[module]?.[moduleKey] || {
            completed: false,
            progress: 0,
            totalTasks: 0,
            completedTasks: 0,
            lastAccessed: null
        };
    }

    // Actualizar progreso de un módulo
    updateModuleProgress(module, level, progressData) {
        if (!this.moduleProgress[module]) {
            this.moduleProgress[module] = {};
        }
        
        const moduleKey = `${module}_level${level}`;
        this.moduleProgress[module][moduleKey] = {
            ...this.getModuleProgress(module, level),
            ...progressData,
            lastAccessed: new Date().toISOString()
        };
        
        this.saveProgress();
        console.log(`📊 Progreso actualizado: ${module} nivel ${level}`, progressData);
    }

    // Verificar si un módulo está completado
    isModuleCompleted(module, level) {
        const progress = this.getModuleProgress(module, level);
        return progress.completed;
    }

    // Verificar si todos los módulos de un nivel están completados
    areAllModulesCompleted(level) {
        const modules = ['learn', 'vocabulary', 'practice', 'apply'];
        return modules.every(module => this.isModuleCompleted(module, level));
    }

    // Obtener progreso general de un nivel
    getLevelProgress(level) {
        const modules = ['learn', 'vocabulary', 'practice', 'apply'];
        const moduleProgresses = modules.map(module => this.getModuleProgress(module, level));
        
        const totalProgress = moduleProgresses.reduce((sum, progress) => sum + progress.progress, 0);
        const averageProgress = totalProgress / modules.length;
        const completedModules = moduleProgresses.filter(p => p.completed).length;
        
        return {
            level,
            averageProgress: Math.round(averageProgress),
            completedModules,
            totalModules: modules.length,
            allCompleted: completedModules === modules.length,
            canTakeTest: completedModules >= 3 // Mínimo 3 módulos completados para hacer prueba
        };
    }

    // Marcar módulo como completado
    completeModule(module, level) {
        this.updateModuleProgress(module, level, {
            completed: true,
            progress: 100,
            completedTasks: this.getModuleProgress(module, level).totalTasks
        });
        
        // Verificar si se puede desbloquear la prueba de nivel
        this.checkLevelTestUnlock(level);
        
        console.log(`🎉 Módulo completado: ${module} nivel ${level}`);
    }

    // Verificar si se puede desbloquear la prueba de nivel
    checkLevelTestUnlock(level) {
        const levelProgress = this.getLevelProgress(level);
        if (levelProgress.canTakeTest && !this.levelTests[`level${level}`]) {
            this.levelTests[`level${level}`] = {
                unlocked: true,
                taken: false,
                passed: false,
                score: 0,
                dateUnlocked: new Date().toISOString()
            };
            this.saveProgress();
            console.log(`🔓 Prueba de nivel ${level} desbloqueada`);
        }
    }

    // Obtener estado de la prueba de nivel
    getLevelTestStatus(level) {
        return this.levelTests[`level${level}`] || {
            unlocked: false,
            taken: false,
            passed: false,
            score: 0
        };
    }

    // Marcar prueba de nivel como completada
    completeLevelTest(level, score, passed) {
        this.levelTests[`level${level}`] = {
            unlocked: true,
            taken: true,
            passed: passed,
            score: score,
            dateCompleted: new Date().toISOString()
        };
        
        if (passed && level < this.maxLevel) {
            // Desbloquear siguiente nivel
            this.currentLevel = level + 1;
            console.log(`🚀 Nivel ${level + 1} desbloqueado`);
        }
        
        this.saveProgress();
        console.log(`📝 Prueba de nivel ${level} completada. Puntuación: ${score}%`);
    }

    // Obtener nivel actual del usuario
    getCurrentLevel() {
        return this.currentLevel;
    }

    // Obtener módulos desbloqueados para un nivel
    getUnlockedModules(level) {
        const modules = ['learn', 'vocabulary', 'practice', 'apply'];
        return modules.filter(module => {
            // El primer módulo siempre está desbloqueado
            if (level === 1) return true;
            
            // Para niveles superiores, verificar que el nivel anterior esté completado
            const previousLevelTest = this.getLevelTestStatus(level - 1);
            return previousLevelTest.passed;
        });
    }

    // Obtener estadísticas generales
    getOverallStats() {
        const stats = {
            currentLevel: this.currentLevel,
            totalLevels: this.maxLevel,
            completedLevels: 0,
            totalModulesCompleted: 0,
            totalTestsPassed: 0
        };
        
        for (let level = 1; level <= this.maxLevel; level++) {
            const levelProgress = this.getLevelProgress(level);
            const testStatus = this.getLevelTestStatus(level);
            
            if (levelProgress.allCompleted) {
                stats.completedLevels++;
            }
            
            stats.totalModulesCompleted += levelProgress.completedModules;
            
            if (testStatus.passed) {
                stats.totalTestsPassed++;
            }
        }
        
        return stats;
    }
}

// Instancia global del sistema de progreso
window.moduleProgressSystem = new ModuleProgressSystem();

// Exportar para uso en otros módulos
window.ModuleProgressSystem = ModuleProgressSystem;
