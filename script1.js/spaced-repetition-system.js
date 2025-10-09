// Sistema de repetición espaciada mejorado (Algoritmo SM-2+)

class SpacedRepetitionSystem {
    constructor() {
        this.algorithm = 'SM-2+';
        this.defaultInterval = 1; // días
        this.defaultEaseFactor = 2.5;
        this.defaultRepetitions = 0;
        this.maxInterval = 365; // días
        this.minEaseFactor = 1.3;
        this.maxEaseFactor = 3.0;
        this.reviewThreshold = 0.6; // 60% de aciertos para considerar dominio
        
        this.initSpacedRepetitionSystem();
    }

    // Inicializar sistema de repetición espaciada
    initSpacedRepetitionSystem() {
        try {
            this.loadUserData();
            this.scheduleReviews();
            this.setupReviewNotifications();
            
            console.log("🔄 Sistema de repetición espaciada inicializado");
        } catch (error) {
            console.error("❌ Error al inicializar sistema de repetición espaciada:", error);
        }
    }

    // Cargar datos del usuario
    loadUserData() {
        try {
            const userData = JSON.parse(localStorage.getItem('englishLearningSession') || '{}');
            const up = (typeof window.getUserProgress === 'function')
                ? window.getUserProgress()
                : (JSON.parse(localStorage.getItem('englishLearningProgress') || '{}') || {});
            
            this.userLevel = userData.level || 1;
            this.userXP = userData.xp || 0;
            this.learningStats = up.learningStats || {};
            this.reviewData = up.srsReviews || {};
            this.difficultWords = up.difficultWords || [];
            
            console.log("📊 Datos del usuario cargados para SRS");
        } catch (error) {
            console.error("❌ Error al cargar datos del usuario:", error);
        }
    }

    // Programar revisiones
    scheduleReviews() {
        try {
            const now = new Date();
            const scheduledReviews = [];
            
            // Obtener todas las palabras que necesitan revisión
            Object.keys(this.reviewData).forEach(wordEnglish => {
                const wordData = this.reviewData[wordEnglish];
                const nextReview = new Date(wordData.nextReview);
                
                if (nextReview <= now) {
                    scheduledReviews.push({
                        word: wordEnglish,
                        data: wordData,
                        priority: this.calculatePriority(wordData)
                    });
                }
            });
            
            // Ordenar por prioridad
            scheduledReviews.sort((a, b) => b.priority - a.priority);
            
            this.scheduledReviews = scheduledReviews;
            console.log("📅 Revisiones programadas:", scheduledReviews.length);
            
        } catch (error) {
            console.error("❌ Error al programar revisiones:", error);
        }
    }

    // Calcular prioridad de revisión
    calculatePriority(wordData) {
        try {
            const now = new Date();
            const nextReview = new Date(wordData.nextReview);
            const daysOverdue = Math.floor((now - nextReview) / (1000 * 60 * 60 * 24));
            const difficulty = wordData.difficulty || 2.5;
            const repetitions = wordData.repetitions || 0;
            const consecutiveCorrect = wordData.consecutiveCorrect || 0;
            
            // Prioridad basada en:
            // 1. Días de retraso (más retraso = mayor prioridad)
            // 2. Dificultad (más difícil = mayor prioridad)
            // 3. Repeticiones (menos repeticiones = mayor prioridad)
            // 4. Racha de aciertos (menos aciertos = mayor prioridad)
            
            const overdueWeight = Math.min(daysOverdue * 0.1, 2.0);
            const difficultyWeight = (difficulty - 1.3) / (3.0 - 1.3);
            const repetitionWeight = Math.max(0, (10 - repetitions) / 10);
            const streakWeight = Math.max(0, (5 - consecutiveCorrect) / 5);
            
            const priority = overdueWeight + difficultyWeight + repetitionWeight + streakWeight;
            
            return Math.max(0, priority);
            
        } catch (error) {
            console.error("❌ Error al calcular prioridad:", error);
            return 0;
        }
    }

    // Configurar notificaciones de revisión
    setupReviewNotifications() {
        try {
            // Verificar si hay revisiones pendientes cada hora
            setInterval(() => {
                this.checkPendingReviews();
            }, 60 * 60 * 1000); // 1 hora
            
            // Verificar al cargar la página
            this.checkPendingReviews();
            
        } catch (error) {
            console.error("❌ Error al configurar notificaciones:", error);
        }
    }

    // Verificar revisiones pendientes
    checkPendingReviews() {
        try {
            const pendingReviews = this.scheduledReviews.filter(review => {
                const nextReview = new Date(review.data.nextReview);
                return nextReview <= new Date();
            });
            
            if (pendingReviews.length > 0) {
                this.showReviewNotification(pendingReviews.length);
            }
            
        } catch (error) {
            console.error("❌ Error al verificar revisiones pendientes:", error);
        }
    }

    // Mostrar notificación de revisión
    showReviewNotification(count) {
        try {
            if (typeof window.showNotification === 'function') {
                const message = count === 1 
                    ? 'Tienes 1 palabra pendiente de revisión' 
                    : `Tienes ${count} palabras pendientes de revisión`;
                
                window.showNotification(message, 'info', 5000);
            }
        } catch (error) {
            console.error("❌ Error al mostrar notificación de revisión:", error);
        }
    }

    // Agregar palabra al sistema SRS
    addWordToSRS(wordEnglish, wordSpanish, pronunciation, category = 'general') {
        try {
            const wordData = {
                english: wordEnglish,
                spanish: wordSpanish,
                pronunciation: pronunciation,
                category: category,
                difficulty: this.defaultEaseFactor,
                repetitions: 0,
                consecutiveCorrect: 0,
                consecutiveIncorrect: 0,
                lastReviewed: new Date().toISOString(),
                nextReview: new Date().toISOString(),
                totalReviews: 0,
                correctReviews: 0,
                incorrectReviews: 0,
                averageResponseTime: 0,
                lastResponseTime: 0,
                addedDate: new Date().toISOString()
            };
            
            this.reviewData[wordEnglish] = wordData;
            this.saveReviewData();
            
            console.log("➕ Palabra agregada al SRS:", wordEnglish);
            return true;
            
        } catch (error) {
            console.error("❌ Error al agregar palabra al SRS:", error);
            return false;
        }
    }

    // Procesar respuesta de revisión
    processReviewResponse(wordEnglish, quality, responseTime = 0) {
        try {
            if (!this.reviewData[wordEnglish]) {
                console.warn("⚠️ Palabra no encontrada en SRS:", wordEnglish);
                return false;
            }
            
            const wordData = this.reviewData[wordEnglish];
            const now = new Date();
            
            // Actualizar estadísticas
            wordData.totalReviews++;
            wordData.lastReviewed = now.toISOString();
            wordData.lastResponseTime = responseTime;
            
            // Calcular tiempo de respuesta promedio
            if (wordData.averageResponseTime === 0) {
                wordData.averageResponseTime = responseTime;
            } else {
                wordData.averageResponseTime = (wordData.averageResponseTime + responseTime) / 2;
            }
            
            // Procesar calidad de respuesta
            if (quality >= 3) {
                // Respuesta correcta
                wordData.correctReviews++;
                wordData.consecutiveCorrect++;
                wordData.consecutiveIncorrect = 0;
                
                // Calcular nuevo intervalo
                const newInterval = this.calculateNewInterval(wordData, quality);
                wordData.nextReview = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000).toISOString();
                
                // Actualizar dificultad
                wordData.difficulty = this.calculateNewDifficulty(wordData, quality);
                
            } else {
                // Respuesta incorrecta
                wordData.incorrectReviews++;
                wordData.consecutiveCorrect = 0;
                wordData.consecutiveIncorrect++;
                
                // Reiniciar intervalo
                wordData.nextReview = now.toISOString();
                
                // Aumentar dificultad
                wordData.difficulty = Math.min(wordData.difficulty + 0.2, this.maxEaseFactor);
            }
            
            // Actualizar repeticiones
            wordData.repetitions++;
            
            // Guardar datos
            this.reviewData[wordEnglish] = wordData;
            this.saveReviewData();
            
            // Recalcular prioridades
            this.scheduleReviews();
            
            console.log("✅ Respuesta de revisión procesada:", wordEnglish, quality);
            return true;
            
        } catch (error) {
            console.error("❌ Error al procesar respuesta de revisión:", error);
            return false;
        }
    }

    // Calcular nuevo intervalo
    calculateNewInterval(wordData, quality) {
        try {
            const repetitions = wordData.repetitions;
            const difficulty = wordData.difficulty;
            
            if (repetitions === 0) {
                return 1; // Primera revisión: 1 día
            } else if (repetitions === 1) {
                return 6; // Segunda revisión: 6 días
            } else if (repetitions === 2) {
                return Math.min(15, Math.floor(6 * difficulty)); // Tercera revisión
            } else {
                // Revisiones posteriores: intervalo anterior * dificultad
                const lastInterval = this.getLastInterval(wordData);
                const newInterval = Math.floor(lastInterval * difficulty);
                return Math.min(newInterval, this.maxInterval);
            }
            
        } catch (error) {
            console.error("❌ Error al calcular nuevo intervalo:", error);
            return 1;
        }
    }

    // Obtener último intervalo
    getLastInterval(wordData) {
        try {
            const lastReviewed = new Date(wordData.lastReviewed);
            const nextReview = new Date(wordData.nextReview);
            return Math.floor((nextReview - lastReviewed) / (1000 * 60 * 60 * 24));
        } catch (error) {
            console.error("❌ Error al obtener último intervalo:", error);
            return 1;
        }
    }

    // Calcular nueva dificultad
    calculateNewDifficulty(wordData, quality) {
        try {
            const currentDifficulty = wordData.difficulty;
            const consecutiveCorrect = wordData.consecutiveCorrect;
            
            // Ajustar dificultad basado en calidad de respuesta
            let newDifficulty = currentDifficulty;
            
            if (quality >= 4) {
                // Respuesta excelente: mantener o reducir dificultad
                newDifficulty = Math.max(currentDifficulty - 0.1, this.minEaseFactor);
            } else if (quality === 3) {
                // Respuesta buena: mantener dificultad
                newDifficulty = currentDifficulty;
            } else if (quality === 2) {
                // Respuesta regular: aumentar dificultad
                newDifficulty = Math.min(currentDifficulty + 0.1, this.maxEaseFactor);
            } else {
                // Respuesta mala: aumentar dificultad significativamente
                newDifficulty = Math.min(currentDifficulty + 0.3, this.maxEaseFactor);
            }
            
            // Ajustar basado en racha de aciertos
            if (consecutiveCorrect >= 5) {
                newDifficulty = Math.max(newDifficulty - 0.05, this.minEaseFactor);
            } else if (consecutiveCorrect === 0 && wordData.consecutiveIncorrect >= 3) {
                newDifficulty = Math.min(newDifficulty + 0.1, this.maxEaseFactor);
            }
            
            return Math.max(this.minEaseFactor, Math.min(this.maxEaseFactor, newDifficulty));
            
        } catch (error) {
            console.error("❌ Error al calcular nueva dificultad:", error);
            return wordData.difficulty;
        }
    }

    // Obtener palabras para revisión
    getWordsForReview(limit = 20) {
        try {
            const now = new Date();
            const wordsForReview = [];
            
            Object.keys(this.reviewData).forEach(wordEnglish => {
                const wordData = this.reviewData[wordEnglish];
                const nextReview = new Date(wordData.nextReview);
                
                if (nextReview <= now) {
                    wordsForReview.push({
                        english: wordEnglish,
                        spanish: wordData.spanish,
                        pronunciation: wordData.pronunciation,
                        category: wordData.category,
                        difficulty: wordData.difficulty,
                        repetitions: wordData.repetitions,
                        priority: this.calculatePriority(wordData),
                        data: wordData
                    });
                }
            });
            
            // Ordenar por prioridad y limitar
            wordsForReview.sort((a, b) => b.priority - a.priority);
            return wordsForReview.slice(0, limit);
            
        } catch (error) {
            console.error("❌ Error al obtener palabras para revisión:", error);
            return [];
        }
    }

    // Obtener estadísticas de SRS
    getSRSStats() {
        try {
            const totalWords = Object.keys(this.reviewData).length;
            const wordsForReview = this.getWordsForReview().length;
            const totalReviews = Object.values(this.reviewData).reduce((sum, word) => sum + word.totalReviews, 0);
            const correctReviews = Object.values(this.reviewData).reduce((sum, word) => sum + word.correctReviews, 0);
            const accuracy = totalReviews > 0 ? (correctReviews / totalReviews) * 100 : 0;
            
            // Calcular palabras por dificultad
            const difficultyStats = {
                easy: 0,
                medium: 0,
                hard: 0
            };
            
            Object.values(this.reviewData).forEach(word => {
                if (word.difficulty < 2.0) {
                    difficultyStats.easy++;
                } else if (word.difficulty < 2.5) {
                    difficultyStats.medium++;
                } else {
                    difficultyStats.hard++;
                }
            });
            
            // Calcular palabras por categoría
            const categoryStats = {};
            Object.values(this.reviewData).forEach(word => {
                const category = word.category || 'general';
                categoryStats[category] = (categoryStats[category] || 0) + 1;
            });
            
            return {
                totalWords,
                wordsForReview,
                totalReviews,
                correctReviews,
                accuracy: Math.round(accuracy * 100) / 100,
                difficultyStats,
                categoryStats,
                averageDifficulty: this.calculateAverageDifficulty(),
                reviewEfficiency: this.calculateReviewEfficiency()
            };
            
        } catch (error) {
            console.error("❌ Error al obtener estadísticas de SRS:", error);
            return {};
        }
    }

    // Calcular dificultad promedio
    calculateAverageDifficulty() {
        try {
            const words = Object.values(this.reviewData);
            if (words.length === 0) return 0;
            
            const totalDifficulty = words.reduce((sum, word) => sum + word.difficulty, 0);
            return Math.round((totalDifficulty / words.length) * 100) / 100;
            
        } catch (error) {
            console.error("❌ Error al calcular dificultad promedio:", error);
            return 0;
        }
    }

    // Calcular eficiencia de revisión
    calculateReviewEfficiency() {
        try {
            const words = Object.values(this.reviewData);
            if (words.length === 0) return 0;
            
            const totalReviews = words.reduce((sum, word) => sum + word.totalReviews, 0);
            const correctReviews = words.reduce((sum, word) => sum + word.correctReviews, 0);
            
            if (totalReviews === 0) return 0;
            
            const accuracy = correctReviews / totalReviews;
            const averageInterval = this.calculateAverageInterval();
            
            // Eficiencia = precisión * (1 / intervalo promedio)
            const efficiency = accuracy * (1 / Math.max(averageInterval, 1));
            return Math.round(efficiency * 100) / 100;
            
        } catch (error) {
            console.error("❌ Error al calcular eficiencia de revisión:", error);
            return 0;
        }
    }

    // Calcular intervalo promedio
    calculateAverageInterval() {
        try {
            const words = Object.values(this.reviewData);
            if (words.length === 0) return 1;
            
            const totalInterval = words.reduce((sum, word) => {
                const interval = this.getLastInterval(word);
                return sum + interval;
            }, 0);
            
            return Math.round(totalInterval / words.length);
            
        } catch (error) {
            console.error("❌ Error al calcular intervalo promedio:", error);
            return 1;
        }
    }

    // Optimizar algoritmo SRS
    optimizeSRS() {
        try {
            const stats = this.getSRSStats();
            const words = Object.values(this.reviewData);
            
            // Ajustar parámetros basado en rendimiento
            if (stats.accuracy > 0.8) {
                // Alto rendimiento: aumentar intervalos
                this.maxInterval = Math.min(this.maxInterval * 1.1, 730); // máximo 2 años
            } else if (stats.accuracy < 0.6) {
                // Bajo rendimiento: reducir intervalos
                this.maxInterval = Math.max(this.maxInterval * 0.9, 30); // mínimo 1 mes
            }
            
            // Ajustar factor de dificultad basado en rendimiento
            if (stats.accuracy > 0.85) {
                this.minEaseFactor = Math.max(this.minEaseFactor - 0.05, 1.2);
            } else if (stats.accuracy < 0.6) {
                this.minEaseFactor = Math.min(this.minEaseFactor + 0.05, 1.5);
            }
            
            // Recalcular intervalos para palabras existentes
            words.forEach(word => {
                if (word.repetitions > 2) {
                    const newInterval = this.calculateNewInterval(word, 3); // asumir calidad 3
                    word.nextReview = new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000).toISOString();
                }
            });
            
            this.saveReviewData();
            console.log("🔧 Algoritmo SRS optimizado");
            
        } catch (error) {
            console.error("❌ Error al optimizar SRS:", error);
        }
    }

    // Guardar datos de revisión
    saveReviewData() {
        try {
            if (typeof window.setUserProgressFields === 'function') {
                window.setUserProgressFields({ srsReviews: this.reviewData });
            } else {
                const progressData = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
                progressData.srsReviews = this.reviewData;
                localStorage.setItem('englishLearningProgress', JSON.stringify(progressData));
            }
            
            console.log("💾 Datos de SRS guardados");
        } catch (error) {
            console.error("❌ Error al guardar datos de SRS:", error);
        }
    }

    // Obtener estado del sistema
    getSRSStatus() {
        return {
            algorithm: this.algorithm,
            totalWords: Object.keys(this.reviewData).length,
            wordsForReview: this.getWordsForReview().length,
            stats: this.getSRSStats(),
            parameters: {
                defaultInterval: this.defaultInterval,
                defaultEaseFactor: this.defaultEaseFactor,
                maxInterval: this.maxInterval,
                minEaseFactor: this.minEaseFactor,
                maxEaseFactor: this.maxEaseFactor
            }
        };
    }
}

// Instancia global del sistema de repetición espaciada
const spacedRepetitionSystem = new SpacedRepetitionSystem();

// Exportar funciones globales
window.spacedRepetitionSystem = spacedRepetitionSystem;
window.addWordToSRS = (word, spanish, pronunciation, category) => spacedRepetitionSystem.addWordToSRS(word, spanish, pronunciation, category);
window.processReviewResponse = (word, quality, responseTime) => spacedRepetitionSystem.processReviewResponse(word, quality, responseTime);
window.getWordsForReview = (limit) => spacedRepetitionSystem.getWordsForReview(limit);
window.getSRSStats = () => spacedRepetitionSystem.getSRSStats();
window.optimizeSRS = () => spacedRepetitionSystem.optimizeSRS();

console.log("✅ Sistema de repetición espaciada cargado");
