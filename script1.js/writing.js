// Módulo de ejercicios de escritura: práctica de composición y redacción

class WritingSystem {
    constructor() {
        this.currentExercise = null;
        this.userText = '';
        this.startTime = null;
        this.wordCount = 0;
        this.grammarErrors = [];
        this.vocabularyScore = 0;
    }

    // Iniciar ejercicio de escritura
    startWritingExercise(level, exerciseId = null) {
        try {
            console.log("📝 Iniciando ejercicio de escritura para nivel:", level);
            
            // Obtener ejercicio de escritura
            const exercise = this.getWritingExercise(level, exerciseId);
            if (!exercise) {
                console.error("❌ No se pudo obtener ejercicio de escritura");
                return;
            }

            this.currentExercise = exercise;
            this.userText = '';
            this.startTime = new Date();
            this.wordCount = 0;
            this.grammarErrors = [];
            this.vocabularyScore = 0;

            this.createWritingInterface(exercise);
            console.log("✅ Interfaz de escritura creada");

        } catch (error) {
            console.error("❌ Error al iniciar ejercicio de escritura:", error);
        }
    }

    // Obtener ejercicio de escritura por nivel
    getWritingExercise(level, exerciseId = null) {
        try {
            const levelKey = this.getLevelKey(level);
            const exercises = WRITING_EXERCISES[levelKey];
            
            if (!exercises || exercises.length === 0) {
                console.error("❌ No hay ejercicios disponibles para el nivel:", level);
                return null;
            }

            // Si se especifica un ID, buscar ese ejercicio
            if (exerciseId) {
                return exercises.find(ex => ex.id === exerciseId);
            }

            // Seleccionar ejercicio aleatorio
            const randomIndex = Math.floor(Math.random() * exercises.length);
            return exercises[randomIndex];

        } catch (error) {
            console.error("❌ Error al obtener ejercicio de escritura:", error);
            return null;
        }
    }

    // Convertir nivel numérico a clave MCER
    getLevelKey(level) {
        const levelMap = {
            1: 'A1',
            2: 'A2', 
            3: 'B1',
            4: 'B2',
            5: 'B2',
            6: 'C1',
            7: 'C1',
            8: 'C2',
            9: 'C2',
            10: 'C2'
        };
        return levelMap[level] || 'A1';
    }

    // Crear interfaz de escritura
    createWritingInterface(exercise) {
        const practiceArea = document.getElementById('practiceArea');
        if (!practiceArea) {
            console.error("❌ Área de práctica no encontrada");
            return;
        }

        practiceArea.innerHTML = `
            <div class="writing-container">
                <div class="writing-header">
                    <h3>📝 Ejercicio de Escritura</h3>
                    <div class="writing-level">Nivel: ${exercise.id <= 2 ? 'A1' : exercise.id <= 4 ? 'A2' : exercise.id <= 6 ? 'B1' : exercise.id <= 8 ? 'B2' : exercise.id <= 10 ? 'C1' : 'C2'}</div>
                </div>
                
                <div class="writing-prompt">
                    <h4>${exercise.title}</h4>
                    <p class="prompt-text">${exercise.prompt}</p>
                    <div class="example-text">
                        <strong>Ejemplo:</strong> ${exercise.example}
                    </div>
                </div>

                <div class="writing-area">
                    <textarea 
                        id="writingTextarea" 
                        placeholder="Escribe tu respuesta aquí..."
                        rows="8"
                        maxlength="${exercise.maxWords * 8}"
                    ></textarea>
                    
                    <div class="writing-stats">
                        <div class="word-count">
                            <span id="wordCount">0</span> palabras
                        </div>
                        <div class="char-count">
                            <span id="charCount">0</span> caracteres
                        </div>
                        <div class="target-words">
                            Objetivo: ${exercise.minWords}-${exercise.maxWords} palabras
                        </div>
                    </div>
                </div>

                <div class="writing-actions">
                    <button id="submitWriting" class="btn btn-primary" disabled>
                        <i class="fas fa-check"></i> Enviar Texto
                    </button>
                    <button id="clearWriting" class="btn btn-secondary">
                        <i class="fas fa-trash"></i> Limpiar
                    </button>
                    <button id="getHint" class="btn btn-info">
                        <i class="fas fa-lightbulb"></i> Pista
                    </button>
                </div>

                <div class="writing-feedback" id="writingFeedback" style="display: none;">
                    <h4>📊 Evaluación</h4>
                    <div id="feedbackContent"></div>
                </div>
            </div>
        `;

        this.setupWritingEventListeners();
    }

    // Configurar event listeners para escritura
    setupWritingEventListeners() {
        const textarea = document.getElementById('writingTextarea');
        const submitBtn = document.getElementById('submitWriting');
        const clearBtn = document.getElementById('clearWriting');
        const hintBtn = document.getElementById('getHint');

        if (textarea) {
            textarea.addEventListener('input', (e) => {
                this.updateWritingStats(e.target.value);
            });

            textarea.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    this.insertText('    '); // Insertar 4 espacios
                }
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                this.evaluateWriting();
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearWriting();
            });
        }

        if (hintBtn) {
            hintBtn.addEventListener('click', () => {
                this.showHint();
            });
        }
    }

    // Actualizar estadísticas de escritura
    updateWritingStats(text) {
        this.userText = text;
        this.wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
        
        const wordCountEl = document.getElementById('wordCount');
        const charCountEl = document.getElementById('charCount');
        const submitBtn = document.getElementById('submitWriting');

        if (wordCountEl) {
            wordCountEl.textContent = this.wordCount;
        }

        if (charCountEl) {
            charCountEl.textContent = text.length;
        }

        if (submitBtn) {
            const isValidLength = this.wordCount >= this.currentExercise.minWords && 
                                 this.wordCount <= this.currentExercise.maxWords;
            submitBtn.disabled = !isValidLength;
        }

        // Cambiar color según progreso
        if (wordCountEl) {
            if (this.wordCount < this.currentExercise.minWords) {
                wordCountEl.style.color = '#e74c3c'; // Rojo
            } else if (this.wordCount > this.currentExercise.maxWords) {
                wordCountEl.style.color = '#f39c12'; // Naranja
            } else {
                wordCountEl.style.color = '#27ae60'; // Verde
            }
        }
    }

    // Evaluar texto escrito
    evaluateWriting() {
        try {
            console.log("📊 Evaluando texto escrito...");
            
            const evaluation = this.analyzeText(this.userText);
            this.showEvaluation(evaluation);

            // Calcular XP basado en la evaluación
            const xpEarned = this.calculateXP(evaluation);
            this.awardXP(xpEarned);

        } catch (error) {
            console.error("❌ Error al evaluar escritura:", error);
        }
    }

    // Analizar texto del usuario
    analyzeText(text) {
        const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
        const charCount = text.length;
        const exercise = this.currentExercise;

        // Análisis básico
        const analysis = {
            wordCount: wordCount,
            charCount: charCount,
            lengthScore: this.evaluateLength(wordCount, exercise),
            vocabularyScore: this.evaluateVocabulary(text, exercise),
            grammarScore: this.evaluateGrammar(text),
            structureScore: this.evaluateStructure(text),
            overallScore: 0
        };

        // Calcular puntuación general
        analysis.overallScore = Math.round(
            (analysis.lengthScore * 0.2) +
            (analysis.vocabularyScore * 0.3) +
            (analysis.grammarScore * 0.3) +
            (analysis.structureScore * 0.2)
        );

        return analysis;
    }

    // Evaluar longitud del texto
    evaluateLength(wordCount, exercise) {
        if (wordCount < exercise.minWords) {
            return Math.max(0, (wordCount / exercise.minWords) * 50);
        } else if (wordCount > exercise.maxWords) {
            return Math.max(0, 100 - ((wordCount - exercise.maxWords) / exercise.maxWords) * 50);
        } else {
            return 100;
        }
    }

    // Evaluar vocabulario
    evaluateVocabulary(text, exercise) {
        const userWords = text.toLowerCase().split(/\s+/);
        const keyWords = exercise.keyWords.map(word => word.toLowerCase());
        
        let vocabularyScore = 0;
        let foundKeywords = 0;

        // Contar palabras clave encontradas
        keyWords.forEach(keyword => {
            if (userWords.includes(keyword)) {
                foundKeywords++;
            }
        });

        // Puntuación basada en palabras clave
        vocabularyScore = (foundKeywords / keyWords.length) * 100;

        // Bonus por vocabulario avanzado (palabras de más de 6 caracteres)
        const advancedWords = userWords.filter(word => word.length > 6 && /^[a-zA-Z]+$/.test(word));
        vocabularyScore += Math.min(20, advancedWords.length * 2);

        return Math.min(100, vocabularyScore);
    }

    // Evaluar gramática (análisis básico)
    evaluateGrammar(text) {
        let grammarScore = 100;

        // Detectar errores básicos
        const errors = [];

        // Verificar mayúsculas al inicio de oraciones
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        sentences.forEach(sentence => {
            if (sentence.trim() && !/^[A-Z]/.test(sentence.trim())) {
                errors.push("Falta mayúscula al inicio de oración");
            }
        });

        // Verificar espacios después de puntuación
        if (/[.!?][a-zA-Z]/.test(text)) {
            errors.push("Falta espacio después de puntuación");
        }

        // Verificar dobles espacios
        if (/\s{2,}/.test(text)) {
            errors.push("Espacios dobles detectados");
        }

        // Calcular puntuación
        grammarScore = Math.max(0, 100 - (errors.length * 10));

        return {
            score: grammarScore,
            errors: errors
        };
    }

    // Evaluar estructura del texto
    evaluateStructure(text) {
        let structureScore = 100;

        // Verificar párrafos
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        if (paragraphs.length === 0) {
            structureScore -= 20;
        }

        // Verificar conectores básicos
        const connectors = ['and', 'but', 'so', 'because', 'however', 'therefore', 'moreover', 'furthermore'];
        const hasConnectors = connectors.some(connector => text.toLowerCase().includes(connector));
        
        if (!hasConnectors && text.length > 100) {
            structureScore -= 15;
        }

        // Verificar variedad en inicio de oraciones
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        if (sentences.length > 2) {
            const firstWords = sentences.map(s => s.trim().split(/\s+/)[0].toLowerCase());
            const uniqueFirstWords = new Set(firstWords);
            
            if (uniqueFirstWords.size < sentences.length * 0.7) {
                structureScore -= 10;
            }
        }

        return Math.max(0, structureScore);
    }

    // Mostrar evaluación
    showEvaluation(evaluation) {
        const feedbackDiv = document.getElementById('writingFeedback');
        const contentDiv = document.getElementById('feedbackContent');

        if (!feedbackDiv || !contentDiv) return;

        const exercise = this.currentExercise;
        const grammarEval = typeof evaluation.grammarScore === 'object' ? 
                           evaluation.grammarScore : 
                           { score: evaluation.grammarScore, errors: [] };

        contentDiv.innerHTML = `
            <div class="evaluation-grid">
                <div class="evaluation-item">
                    <h5>📏 Longitud</h5>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${evaluation.lengthScore}%"></div>
                    </div>
                    <span class="score-text">${Math.round(evaluation.lengthScore)}/100</span>
                    <p>${evaluation.wordCount} palabras (objetivo: ${exercise.minWords}-${exercise.maxWords})</p>
                </div>

                <div class="evaluation-item">
                    <h5>📚 Vocabulario</h5>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${evaluation.vocabularyScore}%"></div>
                    </div>
                    <span class="score-text">${Math.round(evaluation.vocabularyScore)}/100</span>
                    <p>Uso de palabras clave y vocabulario apropiado</p>
                </div>

                <div class="evaluation-item">
                    <h5>📝 Gramática</h5>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${grammarEval.score}%"></div>
                    </div>
                    <span class="score-text">${Math.round(grammarEval.score)}/100</span>
                    ${grammarEval.errors.length > 0 ? 
                        `<ul class="error-list">
                            ${grammarEval.errors.map(error => `<li>${error}</li>`).join('')}
                        </ul>` : 
                        '<p>¡Excelente gramática!</p>'
                    }
                </div>

                <div class="evaluation-item">
                    <h5>🏗️ Estructura</h5>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${evaluation.structureScore}%"></div>
                    </div>
                    <span class="score-text">${Math.round(evaluation.structureScore)}/100</span>
                    <p>Organización y fluidez del texto</p>
                </div>

                <div class="evaluation-item overall-score">
                    <h5>🎯 Puntuación General</h5>
                    <div class="overall-score-display">
                        <span class="score-number">${evaluation.overallScore}</span>
                        <span class="score-max">/100</span>
                    </div>
                    <p class="score-feedback">
                        ${evaluation.overallScore >= 90 ? '¡Excelente trabajo!' :
                          evaluation.overallScore >= 80 ? '¡Muy bien!' :
                          evaluation.overallScore >= 70 ? 'Buen trabajo' :
                          evaluation.overallScore >= 60 ? 'Necesitas mejorar' :
                          'Requiere más práctica'}
                    </p>
                </div>
            </div>

            <div class="evaluation-suggestions">
                <h5>💡 Sugerencias para mejorar:</h5>
                <ul>
                    ${this.generateSuggestions(evaluation)}
                </ul>
            </div>
        `;

        feedbackDiv.style.display = 'block';
        feedbackDiv.scrollIntoView({ behavior: 'smooth' });
    }

    // Generar sugerencias de mejora
    generateSuggestions(evaluation) {
        const suggestions = [];

        if (evaluation.lengthScore < 80) {
            suggestions.push("Intenta alcanzar la longitud objetivo de palabras");
        }

        if (evaluation.vocabularyScore < 70) {
            suggestions.push("Usa más palabras clave del ejercicio");
        }

        if (evaluation.grammarScore < 80) {
            suggestions.push("Revisa la gramática y ortografía");
        }

        if (evaluation.structureScore < 70) {
            suggestions.push("Mejora la organización y estructura del texto");
        }

        if (suggestions.length === 0) {
            suggestions.push("¡Continúa practicando para mantener tu nivel!");
        }

        return suggestions.map(suggestion => `<li>${suggestion}</li>`).join('');
    }

    // Calcular XP ganado
    calculateXP(evaluation) {
        const baseXP = 20;
        const bonusXP = Math.round((evaluation.overallScore / 100) * 30);
        return baseXP + bonusXP;
    }

    // Otorgar XP
    awardXP(xpEarned) {
        if (window.appState) {
            window.appState.currentXP += xpEarned;
            
            if (typeof window.showNotification === 'function') {
                window.showNotification(`¡Ejercicio de escritura completado! +${xpEarned} XP`, 'success');
            }

            if (typeof window.saveProgress === 'function') {
                window.saveProgress();
            }
        }
    }

    // Limpiar texto
    clearWriting() {
        const textarea = document.getElementById('writingTextarea');
        if (textarea) {
            textarea.value = '';
            this.updateWritingStats('');
        }
    }

    // Mostrar pista
    showHint() {
        const exercise = this.currentExercise;
        const hint = `
            <strong>Pistas para este ejercicio:</strong><br>
            • Palabras clave sugeridas: ${exercise.keyWords.slice(0, 3).join(', ')}<br>
            • Longitud objetivo: ${exercise.minWords}-${exercise.maxWords} palabras<br>
            • Estructura: Usa conectores como "and", "but", "because"
        `;

        if (typeof window.showNotification === 'function') {
            window.showNotification(hint, 'info', 8000);
        }
    }

    // Insertar texto en el cursor
    insertText(text) {
        const textarea = document.getElementById('writingTextarea');
        if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const value = textarea.value;
            
            textarea.value = value.substring(0, start) + text + value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + text.length;
            textarea.focus();
            
            this.updateWritingStats(textarea.value);
        }
    }
}

// Instancia global del sistema de escritura
const writingSystem = new WritingSystem();

// Exportar funciones globales
window.startWritingExercise = (level, exerciseId) => writingSystem.startWritingExercise(level, exerciseId);
window.writingSystem = writingSystem;

console.log("✅ Sistema de escritura cargado");
