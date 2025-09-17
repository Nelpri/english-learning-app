// Interfaz de usuario para las pruebas de nivel
// Maneja la visualización y interacción con las pruebas

class TestInterface {
    constructor() {
        this.currentTest = null;
        this.testContainer = null;
        this.initializeInterface();
    }

    // Inicializar interfaz
    initializeInterface() {
        this.createTestModal();
        this.setupEventListeners();
        console.log("✅ Interfaz de pruebas inicializada");
    }

    // Crear modal de prueba
    createTestModal() {
        const modal = document.createElement('div');
        modal.id = 'levelTestModal';
        modal.className = 'test-modal';
        modal.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            overflow-y: auto;
        `;

        modal.innerHTML = `
            <div class="test-modal-content" style="
                background: var(--surface-color);
                margin: 2rem auto;
                padding: 2rem;
                border-radius: 12px;
                max-width: 800px;
                min-height: 600px;
                position: relative;
            ">
                <div class="test-header" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 2px solid var(--border-color);
                ">
                    <h2 id="testTitle" style="color: var(--primary-color); margin: 0;">
                        Prueba de Nivel
                    </h2>
                    <button id="closeTestModal" style="
                        background: var(--error-color);
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        cursor: pointer;
                    ">✕ Cerrar</button>
                </div>
                
                <div class="test-progress" style="
                    margin-bottom: 2rem;
                    background: var(--background-color);
                    padding: 1rem;
                    border-radius: 8px;
                ">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span id="questionCounter">Pregunta 1 de 10</span>
                        <span id="testTimer">00:00</span>
                    </div>
                    <div class="progress-bar" style="
                        width: 100%;
                        height: 8px;
                        background: var(--border-color);
                        border-radius: 4px;
                        overflow: hidden;
                    ">
                        <div id="testProgressFill" style="
                            height: 100%;
                            background: var(--primary-color);
                            width: 0%;
                            transition: width 0.3s ease;
                        "></div>
                    </div>
                </div>
                
                <div id="testContent" class="test-content">
                    <!-- Contenido de la prueba se carga aquí -->
                </div>
                
                <div class="test-actions" style="
                    margin-top: 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                ">
                    <button id="prevQuestion" style="
                        background: var(--secondary-color);
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 6px;
                        cursor: pointer;
                        display: none;
                    ">← Anterior</button>
                    
                    <div style="display: flex; gap: 1rem;">
                        <button id="skipQuestion" style="
                            background: var(--warning-color);
                            color: white;
                            border: none;
                            padding: 0.75rem 1.5rem;
                            border-radius: 6px;
                            cursor: pointer;
                        ">Omitir</button>
                        <button id="nextQuestion" style="
                            background: var(--primary-color);
                            color: white;
                            border: none;
                            padding: 0.75rem 1.5rem;
                            border-radius: 6px;
                            cursor: pointer;
                        ">Siguiente →</button>
                        <button id="finishTest" style="
                            background: var(--success-color);
                            color: white;
                            border: none;
                            padding: 0.75rem 1.5rem;
                            border-radius: 6px;
                            cursor: pointer;
                            display: none;
                        ">Finalizar Prueba</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.testContainer = modal;
    }

    // Configurar event listeners
    setupEventListeners() {
        // Cerrar modal
        document.getElementById('closeTestModal').addEventListener('click', () => {
            this.closeTest();
        });

        // Navegación de preguntas
        document.getElementById('prevQuestion').addEventListener('click', () => {
            this.previousQuestion();
        });

        document.getElementById('nextQuestion').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('skipQuestion').addEventListener('click', () => {
            this.skipQuestion();
        });

        document.getElementById('finishTest').addEventListener('click', () => {
            this.finishTest();
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.testContainer.style.display !== 'none') {
                this.closeTest();
            }
        });
    }

    // Iniciar prueba
    startTest(level) {
        if (!window.levelTestSystem) {
            console.error("❌ Sistema de pruebas no disponible");
            return;
        }

        this.currentTest = window.levelTestSystem.startLevelTest(level);
        this.showTestModal();
        this.loadCurrentQuestion();
        this.startTimer();
        
        console.log(`🎯 Prueba de nivel ${level} iniciada`);
    }

    // Mostrar modal de prueba
    showTestModal() {
        this.testContainer.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Cerrar prueba
    closeTest() {
        this.testContainer.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.currentTest = null;
        this.stopTimer();
    }

    // Cargar pregunta actual
    loadCurrentQuestion() {
        if (!this.currentTest) return;

        const question = window.levelTestSystem.getCurrentQuestion();
        if (!question) {
            this.finishTest();
            return;
        }

        this.updateProgress();
        this.renderQuestion(question);
    }

    // Actualizar progreso
    updateProgress() {
        const { currentQuestion } = this.currentTest;
        const totalQuestions = window.levelTestSystem.getTotalQuestions();
        const progress = (currentQuestion / totalQuestions) * 100;

        document.getElementById('questionCounter').textContent = 
            `Pregunta ${currentQuestion + 1} de ${totalQuestions}`;
        document.getElementById('testProgressFill').style.width = `${progress}%`;

        // Mostrar/ocultar botones según el progreso
        const prevBtn = document.getElementById('prevQuestion');
        const nextBtn = document.getElementById('nextQuestion');
        const finishBtn = document.getElementById('finishTest');

        prevBtn.style.display = currentQuestion > 0 ? 'block' : 'none';
        
        if (currentQuestion >= totalQuestions - 1) {
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            finishBtn.style.display = 'none';
        }
    }

    // Renderizar pregunta
    renderQuestion(question) {
        const content = document.getElementById('testContent');
        
        let questionHTML = `
            <div class="question-container" style="
                background: var(--background-color);
                padding: 2rem;
                border-radius: 8px;
                margin-bottom: 1rem;
            ">
                <h3 style="color: var(--text-primary); margin-bottom: 1.5rem;">
                    ${question.question}
                </h3>
        `;

        if (question.type === 'vocabulary' || question.type === 'grammar') {
            questionHTML += this.renderMultipleChoice(question);
        } else if (question.type === 'listening') {
            questionHTML += this.renderListeningQuestion(question);
        } else if (question.type === 'pronunciation') {
            questionHTML += this.renderPronunciationQuestion(question);
        }

        questionHTML += '</div>';
        content.innerHTML = questionHTML;

        // Configurar event listeners para las opciones
        this.setupQuestionListeners(question);
    }

    // Renderizar pregunta de opción múltiple
    renderMultipleChoice(question) {
        let html = '<div class="options-container" style="display: grid; gap: 1rem;">';
        
        question.options.forEach((option, index) => {
            html += `
                <button class="option-btn" data-answer="${index}" style="
                    background: var(--surface-color);
                    border: 2px solid var(--border-color);
                    padding: 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    text-align: left;
                    transition: all 0.3s ease;
                " onmouseover="this.style.borderColor='var(--primary-color)'" 
                   onmouseout="this.style.borderColor='var(--border-color)'">
                    ${String.fromCharCode(65 + index)}. ${option}
                </button>
            `;
        });
        
        html += '</div>';
        return html;
    }

    // Renderizar pregunta de listening
    renderListeningQuestion(question) {
        return `
            <div class="listening-question" style="text-align: center; margin: 2rem 0;">
                <button id="playAudio" style="
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1.1rem;
                    margin-bottom: 2rem;
                ">🎵 Reproducir Audio</button>
                
                <div class="options-container" style="display: grid; gap: 1rem; margin-top: 2rem;">
                    ${question.options.map((option, index) => `
                        <button class="option-btn" data-answer="${index}" style="
                            background: var(--surface-color);
                            border: 2px solid var(--border-color);
                            padding: 1rem;
                            border-radius: 8px;
                            cursor: pointer;
                            text-align: left;
                            transition: all 0.3s ease;
                        ">${String.fromCharCode(65 + index)}. ${option}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Renderizar pregunta de pronunciación
    renderPronunciationQuestion(question) {
        return `
            <div class="pronunciation-question" style="text-align: center; margin: 2rem 0;">
                <div style="
                    background: var(--primary-color);
                    color: white;
                    padding: 2rem;
                    border-radius: 8px;
                    margin-bottom: 2rem;
                    font-size: 1.5rem;
                    font-weight: bold;
                ">
                    ${question.word}
                </div>
                
                <button id="startRecording" style="
                    background: var(--success-color);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1.1rem;
                    margin-right: 1rem;
                ">🎤 Grabar Pronunciación</button>
                
                <button id="playRecording" style="
                    background: var(--secondary-color);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1.1rem;
                    display: none;
                ">▶️ Reproducir</button>
                
                <div id="recordingStatus" style="margin-top: 1rem; font-weight: bold;"></div>
            </div>
        `;
    }

    // Configurar event listeners de preguntas
    setupQuestionListeners(question) {
        // Opciones múltiples
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const answer = parseInt(e.target.dataset.answer);
                this.selectAnswer(answer);
            });
        });

        // Audio de listening
        const playAudioBtn = document.getElementById('playAudio');
        if (playAudioBtn) {
            playAudioBtn.addEventListener('click', () => {
                this.playListeningAudio(question.audio);
            });
        }

        // Pronunciación
        const startRecordingBtn = document.getElementById('startRecording');
        const playRecordingBtn = document.getElementById('playRecording');
        
        if (startRecordingBtn) {
            startRecordingBtn.addEventListener('click', () => {
                this.startPronunciationRecording(question.word);
            });
        }

        if (playRecordingBtn) {
            playRecordingBtn.addEventListener('click', () => {
                this.playPronunciationRecording();
            });
        }
    }

    // Seleccionar respuesta
    selectAnswer(answer) {
        if (!this.currentTest) return;

        // Marcar visualmente la selección
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.style.background = 'var(--surface-color)';
            btn.style.borderColor = 'var(--border-color)';
        });

        event.target.style.background = 'var(--primary-color)';
        event.target.style.borderColor = 'var(--primary-color)';
        event.target.style.color = 'white';

        // Guardar respuesta
        window.levelTestSystem.answerQuestion(answer);
        
        // Auto-avanzar después de un breve delay
        setTimeout(() => {
            this.nextQuestion();
        }, 1000);
    }

    // Reproducir audio de listening
    playListeningAudio(audioText) {
        if (typeof window.speakText === 'function') {
            window.speakText(audioText);
        } else {
            console.warn("⚠️ Función de síntesis de voz no disponible");
        }
    }

    // Iniciar grabación de pronunciación
    startPronunciationRecording(word) {
        const status = document.getElementById('recordingStatus');
        const startBtn = document.getElementById('startRecording');
        const playBtn = document.getElementById('playRecording');
        
        status.textContent = '🎤 Grabando... Habla ahora';
        startBtn.style.display = 'none';
        
        // Simular grabación (en implementación real usarías MediaRecorder)
        setTimeout(() => {
            status.textContent = '✅ Grabación completada';
            playBtn.style.display = 'inline-block';
            
            // Simular evaluación
            setTimeout(() => {
                status.textContent = '✅ Pronunciación evaluada (85%)';
                this.selectAnswer(0); // Simular respuesta correcta
            }, 2000);
        }, 3000);
    }

    // Reproducir grabación de pronunciación
    playPronunciationRecording() {
        console.log("▶️ Reproduciendo grabación de pronunciación");
    }

    // Pregunta anterior
    previousQuestion() {
        if (this.currentTest && this.currentTest.currentQuestion > 0) {
            this.currentTest.currentQuestion--;
            this.loadCurrentQuestion();
        }
    }

    // Siguiente pregunta
    nextQuestion() {
        if (this.currentTest) {
            this.currentTest.currentQuestion++;
            this.loadCurrentQuestion();
        }
    }

    // Omitir pregunta
    skipQuestion() {
        if (this.currentTest) {
            window.levelTestSystem.answerQuestion(-1); // -1 indica pregunta omitida
            this.nextQuestion();
        }
    }

    // Finalizar prueba
    finishTest() {
        if (!this.currentTest) return;

        const results = window.levelTestSystem.evaluateTest();
        if (results) {
            this.showTestResults(results);
        }
    }

    // Mostrar resultados de la prueba
    showTestResults(results) {
        const content = document.getElementById('testContent');
        
        const resultHTML = `
            <div class="test-results" style="text-align: center; padding: 2rem;">
                <div style="
                    background: ${results.passed ? 'var(--success-color)' : 'var(--error-color)'};
                    color: white;
                    padding: 2rem;
                    border-radius: 12px;
                    margin-bottom: 2rem;
                ">
                    <h2 style="margin: 0 0 1rem 0;">
                        ${results.passed ? '🎉 ¡FELICITACIONES!' : '😔 Inténtalo de nuevo'}
                    </h2>
                    <div style="font-size: 3rem; font-weight: bold; margin: 1rem 0;">
                        ${results.score}%
                    </div>
                    <p style="margin: 0; font-size: 1.2rem;">
                        ${results.passed ? 'Has aprobado la prueba' : 'Necesitas al menos 70% para aprobar'}
                    </p>
                </div>
                
                <div class="detailed-results" style="
                    background: var(--background-color);
                    padding: 2rem;
                    border-radius: 8px;
                    margin-bottom: 2rem;
                ">
                    <h3 style="color: var(--primary-color); margin-bottom: 1.5rem;">
                        Resultados Detallados
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        ${Object.entries(results.results).map(([type, result]) => `
                            <div style="
                                background: var(--surface-color);
                                padding: 1rem;
                                border-radius: 6px;
                                text-align: center;
                            ">
                                <div style="font-weight: bold; color: var(--text-primary); margin-bottom: 0.5rem;">
                                    ${this.getTypeName(type)}
                                </div>
                                <div style="font-size: 1.5rem; color: var(--primary-color);">
                                    ${result.correct}/${result.total}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="test-actions" style="display: flex; gap: 1rem; justify-content: center;">
                    ${results.passed ? `
                        <button onclick="window.testInterface.closeTest(); window.location.reload();" style="
                            background: var(--success-color);
                            color: white;
                            border: none;
                            padding: 1rem 2rem;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 1.1rem;
                        ">🚀 Continuar al Siguiente Nivel</button>
                    ` : `
                        <button onclick="window.testInterface.closeTest();" style="
                            background: var(--primary-color);
                            color: white;
                            border: none;
                            padding: 1rem 2rem;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 1.1rem;
                        ">📚 Seguir Practicando</button>
                    `}
                </div>
            </div>
        `;
        
        content.innerHTML = resultHTML;
        
        // Ocultar botones de navegación
        document.getElementById('prevQuestion').style.display = 'none';
        document.getElementById('nextQuestion').style.display = 'none';
        document.getElementById('finishTest').style.display = 'none';
        document.getElementById('skipQuestion').style.display = 'none';
    }

    // Obtener nombre del tipo de pregunta
    getTypeName(type) {
        const names = {
            vocabulary: 'Vocabulario',
            grammar: 'Gramática',
            listening: 'Comprensión Auditiva',
            pronunciation: 'Pronunciación'
        };
        return names[type] || type;
    }

    // Iniciar timer
    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            document.getElementById('testTimer').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    // Detener timer
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
}

// Instancia global de la interfaz de pruebas
window.testInterface = new TestInterface();

// Exportar para uso en otros módulos
window.TestInterface = TestInterface;
