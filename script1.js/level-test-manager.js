// Gestor de pruebas de nivel
// Maneja la lógica de negocio y actualización de la interfaz

class LevelTestManager {
    constructor() {
        this.initializeManager();
    }

    // Inicializar el gestor
    initializeManager() {
        this.setupEventListeners();
        this.updateTestStatus();
        console.log("✅ Gestor de pruebas de nivel inicializado");
    }

    // Configurar event listeners
    setupEventListeners() {
        // Actualizar estado cuando se cambie de pestaña
        document.addEventListener('tabChanged', () => {
            this.updateTestStatus();
        });

        // Actualizar estado cuando se complete un módulo
        document.addEventListener('moduleCompleted', (event) => {
            this.updateTestStatus();
        });

        // Actualizar estado cuando se complete una prueba
        document.addEventListener('testCompleted', (event) => {
            this.updateTestStatus();
        });
    }

    // Actualizar estado de las pruebas
    updateTestStatus() {
        if (!window.moduleProgressSystem) {
            console.warn("⚠️ Sistema de progreso no disponible");
            return;
        }

        const currentLevel = window.moduleProgressSystem.getCurrentLevel();
        const levelProgress = window.moduleProgressSystem.getLevelProgress(currentLevel);
        const testStatus = window.moduleProgressSystem.getLevelTestStatus(currentLevel);
        
        this.renderTestStatus(currentLevel, levelProgress, testStatus);
    }

    // Renderizar estado de las pruebas
    renderTestStatus(level, levelProgress, testStatus) {
        const statusContainer = document.getElementById('levelTestStatus');
        const testButton = document.getElementById('takeLevelTest');
        
        if (!statusContainer) return;

        let statusHTML = '';
        
        // Mostrar progreso de módulos
        statusHTML += `
            <div class="modules-progress" style="margin-bottom: 1.5rem;">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">
                    Progreso del Nivel ${level}
                </h4>
                <div class="modules-grid" style="
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-bottom: 1rem;
                ">
                    ${this.renderModuleProgress('Aprender', levelProgress.completedModules >= 1, levelProgress.averageProgress)}
                    ${this.renderModuleProgress('Vocabulario', levelProgress.completedModules >= 2, levelProgress.averageProgress)}
                    ${this.renderModuleProgress('Practicar', levelProgress.completedModules >= 3, levelProgress.averageProgress)}
                    ${this.renderModuleProgress('Aplicar', levelProgress.completedModules >= 4, levelProgress.averageProgress)}
                </div>
                <div class="overall-progress" style="
                    background: var(--background-color);
                    padding: 1rem;
                    border-radius: 8px;
                    text-align: center;
                ">
                    <div style="font-weight: bold; margin-bottom: 0.5rem;">
                        Progreso General: ${levelProgress.averageProgress}%
                    </div>
                    <div class="progress-bar" style="
                        width: 100%;
                        height: 8px;
                        background: var(--border-color);
                        border-radius: 4px;
                        overflow: hidden;
                    ">
                        <div style="
                            height: 100%;
                            background: var(--primary-color);
                            width: ${levelProgress.averageProgress}%;
                            transition: width 0.3s ease;
                        "></div>
                    </div>
                </div>
            </div>
        `;

        // Mostrar estado de la prueba
        if (testStatus.unlocked) {
            if (testStatus.taken) {
                statusHTML += this.renderTestResult(testStatus);
            } else {
                statusHTML += `
                    <div class="test-unlocked" style="
                        background: var(--success-color);
                        color: white;
                        padding: 1rem;
                        border-radius: 8px;
                        text-align: center;
                        margin-bottom: 1rem;
                    ">
                        <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                        <h4 style="margin: 0 0 0.5rem 0;">¡Prueba de Nivel Desbloqueada!</h4>
                        <p style="margin: 0;">Todos los módulos están completados. ¡Toma la prueba para avanzar!</p>
                    </div>
                `;
                
                if (testButton) {
                    testButton.style.display = 'block';
                }
            }
        } else {
            const remainingModules = 4 - levelProgress.completedModules;
            statusHTML += `
                <div class="test-locked" style="
                    background: var(--warning-color);
                    color: white;
                    padding: 1rem;
                    border-radius: 8px;
                    text-align: center;
                ">
                    <i class="fas fa-lock" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <h4 style="margin: 0 0 0.5rem 0;">Prueba Bloqueada</h4>
                    <p style="margin: 0;">
                        Completa ${remainingModules} módulo${remainingModules !== 1 ? 's' : ''} más para desbloquear la prueba de nivel.
                    </p>
                </div>
            `;
            
            if (testButton) {
                testButton.style.display = 'none';
            }
        }

        statusContainer.innerHTML = statusHTML;
    }

    // Renderizar progreso de un módulo
    renderModuleProgress(moduleName, completed, progress) {
        return `
            <div class="module-card" style="
                background: ${completed ? 'var(--success-color)' : 'var(--surface-color)'};
                color: ${completed ? 'white' : 'var(--text-primary)'};
                padding: 1rem;
                border-radius: 8px;
                text-align: center;
                border: 2px solid ${completed ? 'var(--success-color)' : 'var(--border-color)'};
            ">
                <i class="fas ${completed ? 'fa-check-circle' : 'fa-circle'}" style="
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                "></i>
                <h5 style="margin: 0 0 0.5rem 0;">${moduleName}</h5>
                <div style="font-size: 0.9rem; opacity: 0.8;">
                    ${completed ? 'Completado' : 'En progreso'}
                </div>
            </div>
        `;
    }

    // Renderizar resultado de prueba
    renderTestResult(testStatus) {
        const resultColor = testStatus.passed ? 'var(--success-color)' : 'var(--error-color)';
        const resultIcon = testStatus.passed ? 'fa-trophy' : 'fa-redo';
        const resultText = testStatus.passed ? '¡Aprobada!' : 'Reprobada';
        
        return `
            <div class="test-result" style="
                background: ${resultColor};
                color: white;
                padding: 1.5rem;
                border-radius: 8px;
                text-align: center;
                margin-bottom: 1rem;
            ">
                <i class="fas ${resultIcon}" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                <h4 style="margin: 0 0 0.5rem 0;">${resultText}</h4>
                <div style="font-size: 2rem; font-weight: bold; margin: 0.5rem 0;">
                    ${testStatus.score}%
                </div>
                <p style="margin: 0; opacity: 0.9;">
                    ${testStatus.passed ? 
                        '¡Felicidades! Has avanzado al siguiente nivel.' : 
                        'Inténtalo de nuevo. Necesitas al menos 70% para aprobar.'
                    }
                </p>
            </div>
        `;
    }

    // Verificar si se puede tomar una prueba
    canTakeTest(level) {
        if (!window.moduleProgressSystem) return false;
        
        const levelProgress = window.moduleProgressSystem.getLevelProgress(level);
        const testStatus = window.moduleProgressSystem.getLevelTestStatus(level);
        
        return levelProgress.canTakeTest && testStatus.unlocked && !testStatus.taken;
    }

    // Obtener estadísticas de pruebas
    getTestStats() {
        if (!window.moduleProgressSystem || !window.levelTestSystem) {
            return null;
        }

        const overallStats = window.moduleProgressSystem.getOverallStats();
        const testStats = window.levelTestSystem.getTestStats();
        
        return {
            ...overallStats,
            ...testStats
        };
    }

    // Actualizar progreso de módulo
    updateModuleProgress(module, level, progressData) {
        if (window.moduleProgressSystem) {
            window.moduleProgressSystem.updateModuleProgress(module, level, progressData);
            this.updateTestStatus();
            
            // Disparar evento de módulo completado
            if (progressData.completed) {
                document.dispatchEvent(new CustomEvent('moduleCompleted', {
                    detail: { module, level, progressData }
                }));
            }
        }
    }

    // Completar módulo
    completeModule(module, level) {
        if (window.moduleProgressSystem) {
            window.moduleProgressSystem.completeModule(module, level);
            this.updateTestStatus();
            
            // Disparar evento de módulo completado
            document.dispatchEvent(new CustomEvent('moduleCompleted', {
                detail: { module, level, completed: true }
            }));
        }
    }
}

// Instancia global del gestor de pruebas
window.levelTestManager = new LevelTestManager();

// Exportar para uso en otros módulos
window.LevelTestManager = LevelTestManager;
