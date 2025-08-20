// Módulo de práctica: ejercicios de vocabulario, gramática, listening, pronunciación

function loadPracticeModes() {
    // Lógica para cargar modos de práctica
    const modeCards = document.querySelectorAll('.mode-card');
    const practiceArea = document.getElementById('practiceArea');

    // Agregar tarjeta de pronunciación si no existe
    if (!document.querySelector('.mode-card[data-mode="pronunciation"]')) {
        const pronunciationCard = document.createElement('div');
        pronunciationCard.className = 'mode-card';
        pronunciationCard.setAttribute('data-mode', 'pronunciation');
        pronunciationCard.innerHTML = `
            <i class="fas fa-microphone"></i>
            <h3>Pronunciación</h3>
            <p>Graba y compara tu voz</p>
        `;
        document.querySelector('.practice-modes').appendChild(pronunciationCard);
    }

    // Mostrar información de sincronización
    const syncInfo = document.createElement('div');
    syncInfo.className = 'sync-info';
    syncInfo.innerHTML = `
        <div class="sync-message">
            <i class="fas fa-sync-alt"></i>
            <span>Los ejercicios de práctica están sincronizados con tu lección actual de aprendizaje</span>
        </div>
    `;
    
    // Insertar antes de los mode cards
    const practiceModes = document.querySelector('.practice-modes');
    if (practiceModes && !document.querySelector('.sync-info')) {
        practiceModes.insertBefore(syncInfo, practiceModes.firstChild);
    }

    document.querySelectorAll('.mode-card').forEach(card => {
        card.onclick = () => {
            const mode = card.dataset.mode;
            loadPracticeExercise(mode);
            document.querySelector('.practice-modes').style.display = 'none';
            practiceArea.style.display = 'block';
        };
    });
}

function loadPracticeExercise(mode, categoryKey = null) {
    console.log("🎯 Cargando ejercicio de práctica:", mode, "categoría:", categoryKey);
    try {
        const practiceArea = document.getElementById('practiceArea');
        if (!practiceArea) {
            console.error("❌ Área de práctica no encontrada");
            return;
        }
        
        // Mostrar área de práctica
        practiceArea.style.display = 'block';
        
        // Crear header de práctica
        const practiceHeader = document.createElement('div');
        practiceHeader.className = 'practice-header';
        
        const backBtn = document.createElement('button');
        backBtn.className = 'btn btn-secondary';
        backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Volver a Modos';
        backBtn.onclick = () => {
            document.querySelector('.practice-modes').style.display = 'grid';
            practiceArea.style.display = 'none';
        };
        
        const modeTitle = document.createElement('h3');
        modeTitle.textContent = getModeTitle(mode);
        
        practiceHeader.appendChild(backBtn);
        practiceHeader.appendChild(modeTitle);
        
        // Limpiar área de práctica
        practiceArea.innerHTML = '';
        practiceArea.appendChild(practiceHeader);
        
        // Cargar ejercicio según el modo
        let exerciseContent;
        
        switch (mode) {
            case 'vocabulary':
                exerciseContent = createVocabularyExerciseContent(categoryKey);
                break;
            case 'grammar':
                exerciseContent = createGrammarExerciseContent();
                break;
            case 'listening':
                exerciseContent = createListeningExerciseContent();
                break;
            case 'pronunciation':
                exerciseContent = createPronunciationExerciseContent();
                break;
            case 'spaced-repetition':
                exerciseContent = createSpacedRepetitionExerciseContent();
                break;
            default:
                exerciseContent = createDefaultExerciseContent(mode);
        }
        
        if (exerciseContent) {
            practiceArea.appendChild(exerciseContent);
            console.log("✅ Ejercicio de práctica cargado:", mode);
        } else {
            practiceArea.innerHTML = `
                <div class="practice-header">
                    <button class="btn btn-secondary" onclick="document.querySelector('.practice-modes').style.display='grid';document.getElementById('practiceArea').style.display='none'">
                        <i class="fas fa-arrow-left"></i> Volver a Modos
                    </button>
                    <h3>${getModeTitle(mode)}</h3>
                </div>
                <div class="exercise-container">
                    <p>Ejercicios de ${getModeTitle(mode)} no disponibles aún.</p>
                </div>
            `;
        }
        
    } catch (error) {
        console.error("❌ Error al cargar ejercicio de práctica:", error);
    }
}

function getModeTitle(mode) {
    const titles = {
        'vocabulary': 'Ejercicios de Vocabulario',
        'grammar': 'Ejercicios de Gramática',
        'listening': 'Ejercicios de Comprensión Auditiva',
        'pronunciation': 'Ejercicios de Pronunciación',
        'spaced-repetition': 'Repaso Espaciado'
    };
    return titles[mode] || mode;
}

function createVocabularyExercise(lesson) {
    // Lógica para crear ejercicio de vocabulario
    const vocab = lesson.vocabulary[Math.floor(Math.random() * lesson.vocabulary.length)];
    const options = lesson.vocabulary
        .filter(item => item.english !== vocab.english)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(item => item.english);
    
    options.push(vocab.english);
    options.sort(() => Math.random() - 0.5);
    
    return `
        <div class="exercise-container">
            <h4>¿Cómo se dice "${vocab.spanish}" en inglés?</h4>
            <div class="options-grid">
                ${options.map((option, index) => `
                    <button class="btn btn-secondary option-btn" data-correct="${option === vocab.english}" data-index="${index}">
                        ${option}
                    </button>
                `).join('')}
            </div>
            <div id="exerciseResult" class="exercise-result"></div>
        </div>
    `;
}

// Los pools de gramática están definidos globalmente en data.js

function createGrammarExercise(lesson) {
    // Lógica para crear ejercicio de gramática
    const lessonGrammar = Array.isArray(lesson.practiceExercises)
    ? lesson.practiceExercises.filter(e => e.type === 'grammar')
    : [];
const mcer = getLessonMCERFromDifficulty(lesson.difficulty);
const pool = GRAMMAR_POOLS[mcer] || [];
const grammarExercises = [...lessonGrammar, ...pool];

if (grammarExercises.length === 0) {
    return `
        <div class="exercise-container">
            <h4>Completa la oración:</h4>
            <div class="grammar-exercise">
                <p>I ___ a student.</p>
                <div class="options-grid">
                    <button class="btn btn-secondary option-btn" data-correct="true">am</button>
                    <button class="btn btn-secondary option-btn" data-correct="false">are</button>
                    <button class="btn btn-secondary option-btn" data-correct="false">is</button>
                </div>
            </div>
            <div id="exerciseResult" class="exercise-result"></div>
        </div>
    `;
}

const exercise = grammarExercises[Math.floor(Math.random() * grammarExercises.length)];
const allOptions = (exercise.options || []).map((opt, idx) => ({
    text: opt,
    isCorrect: idx === exercise.correct
}));
allOptions.sort(() => Math.random() - 0.5);

return `
    <div class="exercise-container">
        <h4>Completa la oración:</h4>
        <div class="grammar-exercise">
            <p>${exercise.question}</p>
            <div class="options-grid">
                ${allOptions.map(o => `
                    <button class="btn btn-secondary option-btn" data-correct="${o.isCorrect}">${o.text}</button>
                `).join('')}
            </div>
        </div>
        <div id="exerciseResult" class="exercise-result"></div>
    </div>
`;
}

function createListeningExercise(lesson) {
    // Lógica para crear ejercicio de listening
    // Seleccionar una frase o palabra del vocabulario de la lección
    const vocab = lesson.vocabulary[Math.floor(Math.random() * lesson.vocabulary.length)];
    const safeEnglish = vocab.english.replace(/'/g, "\\'");
    
    // Crear ejercicios de comprensión auditiva
    const listeningExercises = [
        {
            type: 'word',
            text: vocab.english,
            question: `¿Qué palabra escuchaste?`,
            options: [
                vocab.english,
                vocab.spanish,
                vocab.english.split('').reverse().join(''), // Opción incorrecta
                vocab.english.toUpperCase()
            ]
        },
        {
            type: 'phrase',
            text: `Hello, how are you?`,
            question: `¿Qué frase escuchaste?`,
            options: [
                'Hello, how are you?',
                'Hi, how are you?',
                'Hello, how do you do?',
                'Hi, how do you do?'
            ]
        },
        {
            type: 'question',
            text: `What is your name?`,
            question: `¿Qué pregunta escuchaste?`,
            options: [
                'What is your name?',
                'What is your age?',
                'Where are you from?',
                'How old are you?'
            ]
        }
    ];
    
    const exercise = listeningExercises[Math.floor(Math.random() * listeningExercises.length)];
    
    return `
        <div class="exercise-container">
            <h4><i class="fas fa-headphones"></i> Ejercicio de Comprensión Auditiva</h4>
            <div class="listening-exercise">
                <div class="audio-player">
                    <div class="audio-controls">
                        <button class="play-btn" data-text="${exercise.text.replace(/"/g, '&quot;')}" title="Reproducir audio">
                            <i class="fas fa-play"></i>
                </button>
                        <button class="pause-btn" title="Pausar" style="display: none;">
                            <i class="fas fa-pause"></i>
                        </button>
                </div>
                    <div class="speed-controls">
                        <label>Velocidad:</label>
                        <select onchange="changeListeningSpeed(this.value)">
                            <option value="0.7">Lento</option>
                            <option value="1.0" selected>Normal</option>
                            <option value="1.3">Rápido</option>
                        </select>
            </div>
                    <div class="audio-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 0%"></div>
        </div>
                        <div class="time-display">
                            <span class="current-time">0:00</span> / <span class="total-time">0:00</span>
                        </div>
                    </div>
                </div>
                
                <div class="transcript-section">
                    <button class="show-transcript-btn" onclick="toggleTranscript()" title="Mostrar/ocultar transcripción">
                        <i class="fas fa-eye"></i> Mostrar Transcripción
            </button>
                    <div class="transcript-container" style="display: none;">
                        <div class="transcript-text">${exercise.text}</div>
        </div>
                </div>
                
                <div class="questions-section">
                    <h4><i class="fas fa-question-circle"></i> ${exercise.question}</h4>
                    <div class="questions-container">
                        <div class="question-card">
                            <div class="options-grid">
                                ${exercise.options.map((option, index) => `
                                    <button class="option-btn" data-correct="${option === exercise.text}" onclick="handleListeningAnswer(this)">
                                        ${String.fromCharCode(65 + index)}. ${option}
                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                    
                <div class="exercise-actions">
                    <button class="btn btn-secondary" onclick="resetListeningExercise()">
                        <i class="fas fa-redo"></i> Repetir
                    </button>
                    <button class="btn btn-primary" onclick="checkListeningAnswers()">
                        <i class="fas fa-check"></i> Verificar Respuesta
                    </button>
                </div>
                
                <div class="exercise-result" style="display: none;">
                    <h4>Resultado</h4>
                    <p class="result-message"></p>
                    <button class="btn btn-primary" onclick="nextListeningExercise()">
                        <i class="fas fa-arrow-right"></i> Siguiente Ejercicio
                    </button>
                </div>
                </div>
        </div>
    `;
}

function createPronunciationPractice(lesson) {
    // Lógica para crear práctica de pronunciación
      // Elegir una palabra aleatoria del vocabulario de la lección
      const vocab = lesson.vocabulary[Math.floor(Math.random() * lesson.vocabulary.length)];
      const cleanEnglish = cleanTextForSpeech(vocab.english);
      return `
          <div class="exercise-container">
              <h4>Practica la pronunciación de:</h4>
              <div class="pronunciation-practice">
                  <div class="english">${vocab.english}</div>
                  <button class="speak-btn" onclick="speakText('${cleanEnglish}', 'en-US')" title="Escuchar pronunciación">
                      <i class="fas fa-volume-up"></i>
                      </button>
                  <button class="practice-btn" onclick="practicePronunciation('${cleanEnglish}')" title="Grabar tu pronunciación">
                          <i class="fas fa-microphone"></i> Grabar
                      </button>
              </div>
          </div>
      `;
  }
  
  // Las variables de listening están definidas globalmente en data.js


function handleExerciseAnswer(button) {
    // Lógica para manejar respuesta de ejercicio
    const isCorrect = button.dataset.correct === 'true';
    const resultDiv = document.getElementById('exerciseResult');
    
    // Deshabilitar todos los botones
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === 'true') {
            btn.style.background = 'var(--success-color)';
            btn.style.color = 'white';
        } else if (btn === button && !isCorrect) {
            btn.style.background = 'var(--error-color)';
            btn.style.color = 'white';
        }
    });
    
    // Emojis motivadores
    const emojis = ['🎉', '🚀', '👏', '💪', '🌟', '🔥', '😃', '🥳', '🏆', '😎'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    if (isCorrect) {
        if (resultDiv) {
            resultDiv.innerHTML = `<div class="success exercise-success-animate">¡Correcto! ${randomEmoji} ¡Sigue así!</div>`;
        }
        appState.currentXP += 10;
        playSuccessSound();
        practiceStreak++;
        
        // Verificar logro de puntuación perfecta (si es el primer ejercicio correcto de la sesión)
        if (practiceStreak === 1) {
            // Verificar si ya tiene el logro de puntuación perfecta
            const perfectScoreAchievement = ACHIEVEMENTS_SYSTEM.achievements.find(a => a.id === 'perfect_score');
            if (perfectScoreAchievement && !perfectScoreAchievement.unlocked) {
                perfectScoreAchievement.unlocked = true;
                perfectScoreAchievement.unlockedAt = new Date().toISOString();
                appState.currentXP += perfectScoreAchievement.xpReward;
                ACHIEVEMENTS_SYSTEM.showAchievementNotification(perfectScoreAchievement);
            }
        }
    } else {
        if (resultDiv) {
        resultDiv.innerHTML = '<div class="error">Incorrecto. Intenta de nuevo.</div>';
        }
        playFailSound();
        practiceStreak = 0;
    }
    
    updateUI();
    saveProgress();
    
    // Registrar actividad en estadísticas
    STATISTICS_SYSTEM.recordActivity('exercise_completed', {
        type: 'vocabulary',
        success: isCorrect,
        xpEarned: isCorrect ? 10 : 0
    });
    
    setTimeout(() => {
        // Si estamos en la sección de práctica y modo vocabulario, gramática o listening, avanzar a la siguiente pregunta
        const practiceArea = document.getElementById('practiceArea');
        if (practiceArea && practiceArea.offsetParent !== null) {
            // Buscar el título de la sección para saber el modo
            const header = practiceArea.querySelector('.practice-header h3');
            if (header) {
                const modo = header.textContent.trim().toLowerCase();
                if (['vocabulario', 'gramática', 'comprensión'].includes(modo)) {
                    // Avance automático de lección tras 5 aciertos
                    const allowedLessons = getAllowedLessonsByLevel();
                    if (isCorrect && practiceStreak >= 5) {
                        practiceStreak = 0;
                        practiceLessonIndex++;
                        if (practiceLessonIndex >= allowedLessons.length) {
                            practiceLessonIndex = 0;
                            showNotification('¡Felicidades! Has completado todas las lecciones de tu nivel. ¡Sigue practicando para subir de nivel! 🎓', 'success');
                        } else {
                            showNotification('¡Avanzas a la siguiente lección de tu nivel! 🚀', 'success');
                        }
                        loadPracticeExercise(modo === 'vocabulario' ? 'vocabulary' : modo === 'gramática' ? 'grammar' : 'listening');
                        return;
                    }
                    if (isCorrect) {
                        loadPracticeExercise(modo === 'vocabulario' ? 'vocabulary' : modo === 'gramática' ? 'grammar' : 'listening');
                        return;
                    }
                }
            }
        }
        
        // Volver a habilitar botones para siguiente ejercicio
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = false;
            btn.style.background = '';
            btn.style.color = '';
        });
        if (resultDiv) {
        resultDiv.innerHTML = '';
        }
    }, 1200);
}

function reattachOptionBtnListeners() {
    // Lógica para re-adjuntar listeners de opciones
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.onclick = function() { handleExerciseAnswer(btn); };
    });
}

function nextPracticeLesson(mode) {
    // Lógica para avanzar a la siguiente lección de práctica
    const allowedLessons = getAllowedLessonsByLevel();
    
    // Avanzar al siguiente índice
    practiceLessonIndex++;
    
    // Si llegamos al final, volver al inicio
    if (practiceLessonIndex >= allowedLessons.length) {
        practiceLessonIndex = 0;
        showNotification('¡Has completado todas las lecciones de práctica! Volviendo al inicio. 🔄', 'info');
    } else {
        showNotification('Avanzando a la siguiente lección de práctica... 🚀', 'success');
    }
    
    // Cargar el ejercicio con la nueva lección
    loadPracticeExercise(mode);
    
    // Reasignar event listeners
    setTimeout(() => {
        reattachOptionBtnListeners();
    }, 50);
}

// Función para reproducir audio del ejercicio de listening
function playListeningAudio(text) {
    // Verificar si Web Speech API está disponible
    if (!window.speechSynthesis) {
        showNotification('Tu navegador no soporta audio. Intenta con Chrome o Edge.', 'error');
        return;
    }
    
    // Cancelar audio anterior si existe
    if (currentListeningAudio) {
        speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = listeningAudioSpeed;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Mostrar botón de pausa
    const playBtn = document.querySelector('.play-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    if (playBtn && pauseBtn) {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    }
    
    // Simular progreso del audio
    let progress = 0;
    const progressFill = document.querySelector('.audio-progress .progress-fill');
    const currentTimeSpan = document.querySelector('.current-time');
    const totalTimeSpan = document.querySelector('.total-time');
    
    const progressInterval = setInterval(() => {
        progress += 2;
        if (progressFill) progressFill.style.width = `${progress}%`;
        if (currentTimeSpan) currentTimeSpan.textContent = formatTime(Math.floor(progress / 2));
        if (totalTimeSpan) totalTimeSpan.textContent = formatTime(Math.floor(100 / 2));
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            if (playBtn && pauseBtn) {
                playBtn.style.display = 'inline-block';
                pauseBtn.style.display = 'none';
            }
            if (progressFill) progressFill.style.width = '0%';
            if (currentTimeSpan) currentTimeSpan.textContent = '0:00';
        }
    }, 100);
    
    utterance.onend = () => {
        clearInterval(progressInterval);
        if (playBtn && pauseBtn) {
            playBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'none';
        }
        if (progressFill) progressFill.style.width = '0%';
        if (currentTimeSpan) currentTimeSpan.textContent = '0:00';
    };
    
    utterance.onerror = (event) => {
        console.error('Error en audio:', event);
        clearInterval(progressInterval);
        if (playBtn && pauseBtn) {
            playBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'none';
        }
        if (progressFill) progressFill.style.width = '0%';
        if (currentTimeSpan) currentTimeSpan.textContent = '0:00';
        showNotification('Error al reproducir audio. Intenta nuevamente.', 'error');
    };
    
    currentListeningAudio = utterance;
    
    try {
        speechSynthesis.speak(utterance);
        console.log('Reproduciendo audio:', text);
    } catch (error) {
        console.error('Error al iniciar audio:', error);
        showNotification('Error al reproducir audio. Intenta con otro navegador.', 'error');
    }
}

// Función para pausar audio del ejercicio de listening
function pauseListeningAudio() {
    if (currentListeningAudio) {
        speechSynthesis.cancel();
        currentListeningAudio = null;
    }
    
    const playBtn = document.querySelector('.play-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    if (playBtn && pauseBtn) {
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
    }
    
    const progressFill = document.querySelector('.audio-progress .progress-fill');
    const currentTimeSpan = document.querySelector('.current-time');
    if (progressFill) progressFill.style.width = '0%';
    if (currentTimeSpan) currentTimeSpan.textContent = '0:00';
}

// Función para cambiar velocidad del audio
function changeListeningSpeed(speed) {
    listeningAudioSpeed = parseFloat(speed);
    if (currentListeningAudio) {
        currentListeningAudio.rate = listeningAudioSpeed;
    }
}

// Función para mostrar/ocultar transcripción
function toggleTranscript() {
    const transcriptContainer = document.querySelector('.transcript-container');
    const showBtn = document.querySelector('.show-transcript-btn');
    
    if (transcriptContainer && showBtn) {
        if (transcriptContainer.style.display === 'none') {
            transcriptContainer.style.display = 'block';
            showBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Ocultar Transcripción';
        } else {
            transcriptContainer.style.display = 'none';
            showBtn.innerHTML = '<i class="fas fa-eye"></i> Mostrar Transcripción';
        }
    }
}

// Función para manejar selección de respuesta
function handleListeningAnswer(button) {
    // Remover selección anterior
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Seleccionar nueva respuesta
    button.classList.add('selected');
    selectedListeningAnswer = button;
}

// Función para verificar respuestas
function checkListeningAnswers() {
    if (!selectedListeningAnswer) {
        showNotification('Por favor selecciona una respuesta', 'warning');
        return;
    }
    
    const isCorrect = selectedListeningAnswer.getAttribute('data-correct') === 'true';
    const resultDiv = document.querySelector('.exercise-result');
    const resultMessage = resultDiv.querySelector('.result-message');
    
    if (isCorrect) {
        resultMessage.innerHTML = '<span style="color: var(--success-color);">✅ ¡Correcto! Has identificado bien el audio.</span>';
        playSuccessSound();
        addXP(15);
        showNotification('¡Excelente comprensión auditiva! +15 XP', 'success');
    } else {
        resultMessage.innerHTML = '<span style="color: var(--error-color);">❌ Incorrecto. Intenta escuchar el audio nuevamente.</span>';
        playFailSound();
        showNotification('Sigue practicando tu comprensión auditiva', 'info');
    }
    
    resultDiv.style.display = 'block';
    
    // Deshabilitar botones de opciones
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.getAttribute('data-correct') === 'true') {
            btn.style.background = 'var(--success-color)';
            btn.style.color = 'white';
        }
    });
}

// Función para resetear ejercicio
function resetListeningExercise() {
    selectedListeningAnswer = null;
    
    // Resetear botones
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('selected');
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
    });
    
    // Ocultar resultado
    const resultDiv = document.querySelector('.exercise-result');
    if (resultDiv) resultDiv.style.display = 'none';
    
    // Resetear audio
    pauseListeningAudio();
    
    // Ocultar transcripción
    const transcriptContainer = document.querySelector('.transcript-container');
    const showBtn = document.querySelector('.show-transcript-btn');
    if (transcriptContainer) transcriptContainer.style.display = 'none';
    if (showBtn) showBtn.innerHTML = '<i class="fas fa-eye"></i> Mostrar Transcripción';
}

// Función para siguiente ejercicio
function nextListeningExercise() {
    // Cargar nuevo ejercicio de listening
    const allowedLessons = getAllowedLessonsByLevel();
    const currentLesson = allowedLessons[practiceLessonIndex];
    const practiceArea = document.getElementById('practiceArea');
    
    if (practiceArea) {
        practiceArea.innerHTML = createListeningExercise(currentLesson);
        resetListeningExercise();
    }
}

// Función de inicialización para el módulo de práctica
function initPractice() {
    console.log("🚀 Módulo de práctica inicializado");
    try {
        // Verificar que las funciones principales estén disponibles
        console.log("🎯 loadPracticeModes disponible:", typeof loadPracticeModes === 'function');
        console.log("📝 loadPracticeExercise disponible:", typeof loadPracticeExercise === 'function');
        console.log("💬 sendChatMessage disponible:", typeof sendChatMessage === 'function');
        console.log("🎵 createListeningExercise disponible:", typeof createListeningExercise === 'function');
        
        console.log("✅ Módulo de práctica inicializado correctamente");
    } catch (error) {
        console.error("❌ Error en inicialización del módulo de práctica:", error);
    }
}

// Exportar funciones globalmente
window.sendChatMessage = sendChatMessage;
window.handleExerciseAnswer = handleExerciseAnswer;
window.completeLesson = completeLesson;
window.reviewLesson = reviewLesson;
window.playListeningAudio = playListeningAudio;
window.pauseListeningAudio = pauseListeningAudio;
window.changeListeningSpeed = changeListeningSpeed;
window.toggleTranscript = toggleTranscript;
window.handleListeningAnswer = handleListeningAnswer;
window.checkListeningAnswers = checkListeningAnswers;
window.resetListeningExercise = resetListeningExercise;
window.nextListeningExercise = nextListeningExercise;
window.loadConversationScenario = loadConversationScenario;
window.addMessageToChat = addMessageToChat;
window.backToPracticeModes = backToPracticeModes;
window.initPractice = initPractice;
window.loadPracticeExercise = loadPracticeExercise;
window.createVocabularyExerciseContent = createVocabularyExerciseContent;
window.createSingleVocabularyExercise = createSingleVocabularyExercise;
window.selectVocabularyOption = selectVocabularyOption;
window.createNoVocabularyMessage = createNoVocabularyMessage;
window.createErrorMessage = createErrorMessage;
window.showVocabularyResults = showVocabularyResults;
window.createGrammarExerciseContent = createGrammarExerciseContent;
window.createListeningExerciseContent = createListeningExerciseContent;
window.createPronunciationExerciseContent = createPronunciationExerciseContent;
window.createSpacedRepetitionExerciseContent = createSpacedRepetitionExerciseContent;
window.createDefaultExerciseContent = createDefaultExerciseContent;
window.getModeTitle = getModeTitle;

// Funciones de conversación
function loadConversationScenario() {
    const scenario = CONVERSATION_SCENARIOS[0]; // Por ahora usamos el primero
    const chatMessages = document.getElementById('chatMessages');
    
    document.getElementById('scenarioTitle').textContent = scenario.title;
    document.getElementById('scenarioDescription').textContent = scenario.description;
    
    // Limpiar mensajes anteriores
    chatMessages.innerHTML = '';
    
    // Agregar mensajes iniciales
    scenario.messages.forEach(message => {
        addMessageToChat(message.text, message.type);
    });
}

function addMessageToChat(text, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Exportar funciones de conversación
window.loadConversationScenario = loadConversationScenario;
window.addMessageToChat = addMessageToChat;

// Función para volver a los modos de práctica
function backToPracticeModes() {
    document.querySelector('.practice-modes').style.display = 'grid';
    document.getElementById('practiceArea').style.display = 'none';
}

// Función para enviar mensajes de chat
function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message) {
        // Agregar mensaje del usuario
        addMessageToChat(message, 'user');
        
        // Limpiar input
        chatInput.value = '';
        
        // Simular respuesta del bot (aquí se puede implementar IA más adelante)
        setTimeout(() => {
            const responses = [
                "That's interesting! Tell me more.",
                "I understand. Can you give me an example?",
                "Great point! How would you say that in a different way?",
                "I see what you mean. Let's practice that together.",
                "Excellent! You're making great progress."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessageToChat(randomResponse, 'bot');
        }, 1000);
    }
}

window.backToPracticeModes = backToPracticeModes;
window.sendChatMessage = sendChatMessage;

function createVocabularyExerciseContent(categoryKey) {
    console.log("📚 Creando ejercicio de vocabulario para categoría:", categoryKey);
    try {
        // Obtener vocabulario de la categoría
        let vocabulary = [];
        if (categoryKey && window.VOCABULARY_DATABASE && window.VOCABULARY_DATABASE[categoryKey]) {
            vocabulary = window.VOCABULARY_DATABASE[categoryKey];
        } else {
            // Si no hay categoría específica, usar vocabulario de la lección actual
            if (window.appState && window.appState.currentLesson) {
                const currentLesson = window.appState.currentLesson;
                if (currentLesson.vocabulary) {
                    vocabulary = currentLesson.vocabulary;
                }
            }
        }
        
        if (vocabulary.length === 0) {
            console.warn("⚠️ No hay vocabulario disponible para ejercicios");
            return createNoVocabularyMessage();
        }
        
        console.log("📝 Vocabulario disponible para ejercicios:", vocabulary.length, "palabras");
        
        // Crear contenedor de ejercicios
        const exerciseContainer = document.createElement('div');
        exerciseContainer.className = 'exercise-container';
        
        // Crear múltiples ejercicios
        const exercises = [];
        const numExercises = Math.min(5, vocabulary.length); // Máximo 5 ejercicios
        
        for (let i = 0; i < numExercises; i++) {
            const exercise = createSingleVocabularyExercise(vocabulary, i);
            if (exercise) {
                exercises.push(exercise);
            }
        }
        
        // Agregar ejercicios al contenedor
        exercises.forEach(exercise => {
            exerciseContainer.appendChild(exercise);
        });
        
        // Agregar botón de resultados
        const resultsBtn = document.createElement('button');
        resultsBtn.className = 'btn btn-primary';
        resultsBtn.innerHTML = '<i class="fas fa-check"></i> Ver Resultados';
        resultsBtn.onclick = () => showVocabularyResults(exercises);
        resultsBtn.style.marginTop = '2rem';
        resultsBtn.style.width = '100%';
        
        exerciseContainer.appendChild(resultsBtn);
        
        console.log("✅ Ejercicios de vocabulario creados:", exercises.length);
        return exerciseContainer;
        
    } catch (error) {
        console.error("❌ Error al crear ejercicios de vocabulario:", error);
        return createErrorMessage("Error al crear ejercicios de vocabulario");
    }
}

function createSingleVocabularyExercise(vocabulary, exerciseIndex) {
    try {
        // Seleccionar palabra para este ejercicio
        const wordIndex = exerciseIndex % vocabulary.length;
        const word = vocabulary[wordIndex];
        
        // Crear opciones incorrectas
        const incorrectOptions = vocabulary
            .filter((_, index) => index !== wordIndex)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(w => w.english);
        
        // Agregar opción correcta y mezclar
        const allOptions = [...incorrectOptions, word.english];
        allOptions.sort(() => Math.random() - 0.5);
        
        // Crear contenedor del ejercicio
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'vocabulary-exercise';
        exerciseDiv.style.marginBottom = '2rem';
        exerciseDiv.style.padding = '1.5rem';
        exerciseDiv.style.border = '2px solid var(--border-color)';
        exerciseDiv.style.borderRadius = '12px';
        exerciseDiv.style.backgroundColor = 'var(--surface-color)';
        
        // Título del ejercicio
        const title = document.createElement('h4');
        title.innerHTML = `<i class="fas fa-question-circle"></i> Ejercicio ${exerciseIndex + 1}`;
        title.style.marginBottom = '1rem';
        title.style.color = 'var(--primary-color)';
        
        // Pregunta
        const question = document.createElement('p');
        question.innerHTML = `¿Cómo se dice <strong>"${word.spanish}"</strong> en inglés?`;
        question.style.fontSize = '1.1rem';
        question.style.marginBottom = '1.5rem';
        
        // Opciones
        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'options-grid';
        optionsGrid.style.display = 'grid';
        optionsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
        optionsGrid.style.gap = '1rem';
        optionsGrid.style.marginBottom = '1rem';
        
        allOptions.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'btn btn-secondary option-btn';
            optionBtn.textContent = option;
            optionBtn.style.width = '100%';
            optionBtn.style.padding = '1rem';
            optionBtn.style.fontSize = '1rem';
            
            // Marcar la opción correcta
            optionBtn.dataset.correct = (option === word.english).toString();
            optionBtn.dataset.exerciseIndex = exerciseIndex.toString();
            
            // Event listener para seleccionar opción
            optionBtn.onclick = function() {
                selectVocabularyOption(this, exerciseIndex);
            };
            
            optionsGrid.appendChild(optionBtn);
        });
        
        // Resultado del ejercicio
        const resultDiv = document.createElement('div');
        resultDiv.className = 'exercise-result';
        resultDiv.id = `exerciseResult${exerciseIndex}`;
        resultDiv.style.display = 'none';
        resultDiv.style.padding = '1rem';
        resultDiv.style.borderRadius = '8px';
        resultDiv.style.marginTop = '1rem';
        resultDiv.style.textAlign = 'center';
        resultDiv.style.fontWeight = '600';
        
        // Ensamblar ejercicio
        exerciseDiv.appendChild(title);
        exerciseDiv.appendChild(question);
        exerciseDiv.appendChild(optionsGrid);
        exerciseDiv.appendChild(resultDiv);
        
        return exerciseDiv;
        
    } catch (error) {
        console.error("❌ Error al crear ejercicio individual:", error);
        return null;
    }
}

function selectVocabularyOption(selectedButton, exerciseIndex) {
    try {
        const isCorrect = selectedButton.dataset.correct === 'true';
        const resultDiv = document.getElementById(`exerciseResult${exerciseIndex}`);
        
        // Deshabilitar todos los botones de este ejercicio
        const exerciseDiv = selectedButton.closest('.vocabulary-exercise');
        const allButtons = exerciseDiv.querySelectorAll('.option-btn');
        allButtons.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.6';
        });
        
        // Marcar botón seleccionado
        if (isCorrect) {
            selectedButton.style.background = 'var(--success-color)';
            selectedButton.style.color = 'white';
            selectedButton.style.borderColor = 'var(--success-color)';
        } else {
            selectedButton.style.background = 'var(--error-color)';
            selectedButton.style.color = 'white';
            selectedButton.style.borderColor = 'var(--error-color)';
            
            // Marcar la opción correcta
            const correctButton = exerciseDiv.querySelector('[data-correct="true"]');
            if (correctButton) {
                correctButton.style.background = 'var(--success-color)';
                correctButton.style.color = 'white';
                correctButton.style.borderColor = 'var(--success-color)';
            }
        }
        
        // Mostrar resultado
        resultDiv.style.display = 'block';
        if (isCorrect) {
            resultDiv.style.background = 'rgba(16, 185, 129, 0.1)';
            resultDiv.style.color = 'var(--success-color)';
            resultDiv.style.border = '1px solid var(--success-color)';
            resultDiv.innerHTML = '<i class="fas fa-check-circle"></i> ¡Correcto!';
        } else {
            resultDiv.style.background = 'rgba(239, 68, 68, 0.1)';
            resultDiv.style.color = 'var(--error-color)';
            resultDiv.style.border = '1px solid var(--error-color)';
            resultDiv.innerHTML = '<i class="fas fa-times-circle"></i> Incorrecto';
        }
        
        console.log("✅ Opción seleccionada para ejercicio", exerciseIndex, "Correcta:", isCorrect);
        
    } catch (error) {
        console.error("❌ Error al seleccionar opción:", error);
    }
}

function createNoVocabularyMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'exercise-container';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.padding = '3rem';
    
    messageDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--warning-color); margin-bottom: 1rem;"></i>
        <h3>No hay vocabulario disponible</h3>
        <p>Completa algunas lecciones primero para tener vocabulario para practicar.</p>
        <button class="btn btn-primary" onclick="document.querySelector('.nav-tab[data-tab=\"learn\"]').click()">
            <i class="fas fa-book"></i> Ir a Aprender
        </button>
    `;
    
    return messageDiv;
}

function createErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'exercise-container';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.padding = '3rem';
    
    errorDiv.innerHTML = `
        <i class="fas fa-times-circle" style="font-size: 3rem; color: var(--error-color); margin-bottom: 1rem;"></i>
        <h3>Error</h3>
        <p>${message}</p>
        <button class="btn btn-secondary" onclick="document.querySelector('.practice-modes').style.display='grid';document.getElementById('practiceArea').style.display='none'">
            <i class="fas fa-arrow-left"></i> Volver
        </button>
    `;
    
    return errorDiv;
}

function showVocabularyResults(exercises) {
    try {
        // Calcular resultados
        let correct = 0;
        let total = 0;
        
        exercises.forEach((exercise, index) => {
            const resultDiv = document.getElementById(`exerciseResult${index}`);
            if (resultDiv && resultDiv.style.display !== 'none') {
                total++;
                if (resultDiv.innerHTML.includes('Correcto')) {
                    correct++;
                }
            }
        });
        
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        
        // Crear modal de resultados
        const resultsModal = document.createElement('div');
        resultsModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const resultsContent = document.createElement('div');
        resultsContent.style.cssText = `
            background: var(--surface-color);
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            max-width: 400px;
            width: 90%;
        `;
        
        let resultMessage = '';
        let resultIcon = '';
        let resultColor = '';
        
        if (percentage >= 80) {
            resultMessage = '¡Excelente trabajo!';
            resultIcon = '🎉';
            resultColor = 'var(--success-color)';
        } else if (percentage >= 60) {
            resultMessage = '¡Buen trabajo!';
            resultIcon = '👍';
            resultColor = 'var(--warning-color)';
        } else {
            resultMessage = '¡Sigue practicando!';
            resultIcon = '💪';
            resultColor = 'var(--error-color)';
        }
        
        resultsContent.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">${resultIcon}</div>
            <h3 style="color: ${resultColor}; margin-bottom: 1rem;">${resultMessage}</h3>
            <div style="font-size: 2rem; font-weight: bold; color: var(--primary-color); margin-bottom: 1rem;">
                ${correct}/${total} correctas
            </div>
            <div style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 2rem;">
                ${percentage}% de acierto
            </div>
            <button class="btn btn-primary" onclick="this.closest('.results-modal').remove()" style="margin-right: 1rem;">
                <i class="fas fa-check"></i> Continuar
            </button>
            <button class="btn btn-secondary" onclick="document.querySelector('.practice-modes').style.display='grid';document.getElementById('practiceArea').style.display='none';this.closest('.results-modal').remove()">
                <i class="fas fa-home"></i> Volver
            </button>
        `;
        
        resultsModal.appendChild(resultsContent);
        resultsModal.className = 'results-modal';
        document.body.appendChild(resultsModal);
        
        console.log("✅ Resultados mostrados:", correct, "de", total, "correctas (", percentage, "%)");
        
    } catch (error) {
        console.error("❌ Error al mostrar resultados:", error);
    }
}

// Funciones placeholder para otros tipos de ejercicios
function createGrammarExerciseContent() {
    return createErrorMessage("Ejercicios de gramática no implementados aún");
}

function createListeningExerciseContent() {
    return createErrorMessage("Ejercicios de listening no implementados aún");
}

function createPronunciationExerciseContent() {
    return createErrorMessage("Ejercicios de pronunciación no implementados aún");
}

function createSpacedRepetitionExerciseContent() {
    return createErrorMessage("Ejercicios de repaso espaciado no implementados aún");
}

function createDefaultExerciseContent(mode) {
    return createErrorMessage(`Ejercicios de ${mode} no implementados aún`);
}
