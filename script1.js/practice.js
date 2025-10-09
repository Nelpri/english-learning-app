// Módulo de práctica: ejercicios de vocabulario, gramática, listening, pronunciación

/* Variable global para el índice de lección de práctica */
let practiceLessonIndex = 0;

/* Respuesta seleccionada en listening */
var selectedListeningAnswer = null;

function loadPracticeModes() {
    try {
        console.log("🎯 Cargando modos de práctica integrados");
        
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

        // Agregar tarjeta de escritura si no existe
        if (!document.querySelector('.mode-card[data-mode="writing"]')) {
            const writingCard = document.createElement('div');
            writingCard.className = 'mode-card';
            writingCard.setAttribute('data-mode', 'writing');
            writingCard.innerHTML = `
                <i class="fas fa-pen-fancy"></i>
                <h3>Escritura</h3>
                <p>Practica redacción y composición</p>
            `;
            document.querySelector('.practice-modes').appendChild(writingCard);
        }

        // Agregar tarjeta de dashboard si no existe
        if (!document.querySelector('.mode-card[data-mode="dashboard"]')) {
            const dashboardCard = document.createElement('div');
            dashboardCard.className = 'mode-card';
            dashboardCard.setAttribute('data-mode', 'dashboard');
            dashboardCard.innerHTML = `
                <i class="fas fa-chart-line"></i>
                <h3>Dashboard</h3>
                <p>Ver progreso y estadísticas</p>
            `;
            document.querySelector('.practice-modes').appendChild(dashboardCard);
        }

        // Mostrar información de sincronización
        const syncInfo = document.createElement('div');
        syncInfo.className = 'sync-info';
        syncInfo.innerHTML = `
            <div class="sync-message">
                <i class="fas fa-sync-alt"></i>
                <span>Los ejercicios de práctica están sincronizados con tu progreso y nivel actual</span>
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
                
                if (mode === 'dashboard') {
                    // Mostrar dashboard de práctica
                    if (window.practiceSystem && typeof window.practiceSystem.loadPracticeDashboard === 'function') {
                        window.practiceSystem.loadPracticeDashboard();
                    } else {
                        loadPracticeExercise(mode);
                    }
                } else {
                    // Iniciar sesión de práctica con el nuevo sistema
                    if (window.practiceSystem && typeof window.practiceSystem.startPracticeSession === 'function') {
                        window.practiceSystem.startPracticeSession(mode);
                        window.practiceSystem.loadPracticeExercises();
                    } else {
                        // Fallback al sistema anterior
                        loadPracticeExercise(mode);
                    }
                }
                
                document.querySelector('.practice-modes').style.display = 'none';
                practiceArea.style.display = 'block';
            };
        });
        
        console.log("✅ Modos de práctica integrados cargados");
        
    } catch (error) {
        console.error("❌ Error al cargar modos de práctica:", error);
    }
}

function loadPracticeExercise(mode, categoryKey = null) {
    console.log("🎯 Cargando ejercicio de práctica:", mode, "categoría:", categoryKey);
    try {
        const practiceArea = document.getElementById('practiceArea');
        if (!practiceArea) {
            console.error("❌ Área de práctica no encontrada");
            return;
        }
        
        // Sincronizar práctica con el sistema global de lecciones
        if (typeof appState !== 'undefined' && typeof getAllowedLessonsByLevel === 'function') {
            const allowedLessons = getAllowedLessonsByLevel();
            if (practiceLessonIndex !== appState.currentLesson) {
                practiceLessonIndex = appState.currentLesson;
                console.log("🔄 Sincronizando práctica con lección global:", practiceLessonIndex);
            }
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
        
        // Agregar información de la lección actual
        const lessonInfo = document.createElement('div');
        lessonInfo.className = 'practice-lesson-info';
        if (typeof appState !== 'undefined' && typeof getAllowedLessonsByLevel === 'function') {
            const allowedLessons = getAllowedLessonsByLevel();
            const currentLesson = allowedLessons[appState.currentLesson];
            if (currentLesson) {
                lessonInfo.innerHTML = `
                    <div class="practice-lesson-title">${currentLesson.title}</div>
                    <div class="practice-lesson-counter">Lección ${appState.currentLesson + 1} de ${allowedLessons.length}</div>
                `;
            }
        }
        
        practiceHeader.appendChild(backBtn);
        practiceHeader.appendChild(modeTitle);
        practiceHeader.appendChild(lessonInfo);
        
        // Limpiar área de práctica
        practiceArea.innerHTML = '';
        practiceArea.appendChild(practiceHeader);
        
        // Cargar ejercicio según el modo
        let exerciseContent;
        
        // Cargar ejercicio directamente según el modo
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
            case 'writing':
                if (typeof window.startWritingExercise === 'function') {
                    const userLevel = window.appState ? window.appState.currentLevel : 1;
                    window.startWritingExercise(userLevel);
                    return; // El sistema de escritura maneja su propia interfaz
                } else {
                    exerciseContent = createDefaultExerciseContent(mode);
                }
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
const allOptions = (exercise.options || []).map((opt) => ({
    text: opt,
    isCorrect: opt === exercise.correct
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
    
    // Obtener la palabra o elemento correcto para ajustar dificultad
    const exerciseDiv = button.closest('.vocabulary-exercise') || button.closest('.grammar-exercise');
    const word = exerciseDiv ? exerciseDiv.querySelector('.english')?.textContent || button.textContent : null;
    
    if (word && typeof adjustDifficulty === 'function') {
        adjustDifficulty(word, isCorrect);
    }
    
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
        
        // Sumar experiencia al estado global de la aplicación
        if (typeof appState !== 'undefined') {
            appState.currentXP += 10;
            console.log("✅ XP sumado en práctica:", appState.currentXP);
        }
        
        playSuccessSound();
        practiceStreak++;
        
        // Verificar logro de puntuación perfecta (si es el primer ejercicio correcto de la sesión)
        if (practiceStreak === 1) {
            // Verificar si ya tiene el logro de puntuación perfecta
            const perfectScoreAchievement = ACHIEVEMENTS_SYSTEM.achievements.find(a => a.id === 'perfect_score');
            if (perfectScoreAchievement && !perfectScoreAchievement.unlocked) {
                perfectScoreAchievement.unlocked = true;
                perfectScoreAchievement.unlockedAt = new Date().toISOString();
                if (typeof appState !== 'undefined') {
                    appState.currentXP += perfectScoreAchievement.xpReward;
                }
                ACHIEVEMENTS_SYSTEM.showAchievementNotification(perfectScoreAchievement);
            }
        }
        
        // Verificar si se completó la lección actual (5 aciertos consecutivos)
        if (practiceStreak >= 5) {
            console.log("🎯 Lección completada en práctica, actualizando estado global...");
            
            // Marcar la lección actual como completada en el sistema global
            if (typeof markLessonCompleted === 'function' && typeof appState !== 'undefined') {
                markLessonCompleted(appState.currentLesson);
                console.log("✅ Lección marcada como completada:", appState.currentLesson);
            }
            
            // Avanzar a la siguiente lección en el sistema global
            if (typeof appState !== 'undefined') {
                const allowedLessons = getAllowedLessonsByLevel();
                if (appState.currentLesson < allowedLessons.length - 1) {
                    appState.currentLesson++;
                    console.log("🚀 Avanzando a lección:", appState.currentLesson);
                    
                    // Cargar la nueva lección en la sección principal
                    if (typeof loadCurrentLesson === 'function') {
                        loadCurrentLesson();
                    }
                    
                    // Actualizar el botón "siguiente lección"
                    if (typeof updateNextLessonButton === 'function') {
                        updateNextLessonButton();
                    }
                    
                    showNotification('¡Lección completada! Avanzando a la siguiente... 🚀', 'success');
                } else {
                    showNotification('¡Felicidades! Has completado todas las lecciones disponibles. 🎓', 'success');
                }
            }
            
            // Reiniciar streak para la nueva lección
            practiceStreak = 0;
        }
    } else {
        if (resultDiv) {
        resultDiv.innerHTML = '<div class="error">Incorrecto. Intenta de nuevo.</div>';
        }
        playFailSound();
        practiceStreak = 0;
    }
    
    // Actualizar UI y guardar progreso
    if (typeof updateUI === 'function') {
        updateUI();
    }
    if (typeof saveProgress === 'function') {
        saveProgress();
    }
    
    // Registrar actividad en estadísticas
    if (typeof STATISTICS_SYSTEM !== 'undefined' && STATISTICS_SYSTEM.recordActivity) {
        STATISTICS_SYSTEM.recordActivity('exercise_completed', {
            type: 'vocabulary',
            success: isCorrect,
            xpEarned: isCorrect ? 10 : 0
        });
    }
    
    setTimeout(() => {
        // Si estamos en la sección de práctica y modo vocabulario, gramática o listening, avanzar a la siguiente pregunta
        const practiceArea = document.getElementById('practiceArea');
        if (practiceArea && practiceArea.offsetParent !== null) {
            // Buscar el título de la sección para saber el modo
            const header = practiceArea.querySelector('.practice-header h3');
            if (header) {
                const modo = header.textContent.trim().toLowerCase();
                if (['vocabulario', 'gramática', 'comprensión'].includes(modo)) {
                    // Solo cargar nuevo ejercicio si no se completó la lección
                    if (isCorrect && practiceStreak < 5) {
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
    
    // Sincronizar con el sistema global de lecciones
    if (typeof appState !== 'undefined') {
        appState.currentLesson = practiceLessonIndex;
        console.log("🔄 Sincronizando práctica con lección global:", appState.currentLesson);
        
        // Cargar la nueva lección en la sección principal
        if (typeof loadCurrentLesson === 'function') {
            loadCurrentLesson();
        }
        
        // Actualizar el botón "siguiente lección"
        if (typeof updateNextLessonButton === 'function') {
            updateNextLessonButton();
        }
    }
    
    // Cargar el ejercicio con la nueva lección
    loadPracticeExercise(mode);
    
    // Reasignar event listeners
    setTimeout(() => {
        reattachOptionBtnListeners();
    }, 50);
}

// Sistema de cola de audio para evitar conflictos
let audioQueue = [];
let isPlaying = false;

// Función unificada para reproducir audio del ejercicio de listening
function playListeningAudio(text, exerciseIndex = null) {
    try {
        console.log("🎵 Solicitando reproducción de audio:", text, exerciseIndex !== null ? `(ejercicio ${exerciseIndex})` : "(sin ejercicio específico)");
        
    // Verificar si Web Speech API está disponible
    if (!window.speechSynthesis) {
        showNotification('Tu navegador no soporta audio. Intenta con Chrome o Edge.', 'error');
        return;
    }
    
        // Agregar a la cola de audio
        const audioRequest = { text, exerciseIndex, timestamp: Date.now() };
        audioQueue.push(audioRequest);
        console.log("📋 Audio agregado a la cola. Cola actual:", audioQueue.length, "Ejercicio:", exerciseIndex);
        
        // Si no se está reproduciendo nada, procesar la cola
        if (!isPlaying) {
            processAudioQueue();
        }
        
    } catch (error) {
        console.error("❌ Error al solicitar audio:", error);
        showNotification('Error al solicitar audio. Intenta nuevamente.', 'error');
    }
}

// Función para procesar la cola de audio
function processAudioQueue() {
    if (audioQueue.length === 0 || isPlaying) {
        return;
    }
    
    isPlaying = true;
    const audioRequest = audioQueue.shift();
    console.log("🎵 Procesando audio de la cola:", audioRequest.text);
    
    // Detener audio anterior si existe
    if (window.currentListeningAudio) {
        speechSynthesis.cancel();
        window.currentListeningAudio = null;
    }
    
    // Crear nueva síntesis de voz
    const utterance = new SpeechSynthesisUtterance(audioRequest.text);
    
    // Configurar voz en inglés
    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => 
        voice.lang.startsWith('en') && voice.name.includes('Google')
    ) || voices.find(voice => voice.lang.startsWith('en'));
    
    if (englishVoice) {
        utterance.voice = englishVoice;
        console.log("🗣️ Voz seleccionada:", englishVoice.name, englishVoice.lang);
    }
    
    // Configurar parámetros de audio
    utterance.lang = 'en-US';
    utterance.rate = window.listeningAudioSpeed || 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Eventos de la síntesis
            utterance.onstart = () => {
            console.log("▶️ Audio iniciado para ejercicio:", audioRequest.exerciseIndex);
            if (audioRequest.exerciseIndex !== null) {
                // Cambiar botón a pausar para ejercicios específicos
                const exerciseDiv = document.querySelector(`#listeningResult${audioRequest.exerciseIndex}`)?.closest('.listening-exercise');
                if (exerciseDiv) {
                    const playBtn = exerciseDiv.querySelector('.btn-primary');
                    if (playBtn) {
                        playBtn.innerHTML = '<i class="fas fa-pause"></i> Reproduciendo...';
                        playBtn.disabled = true;
                        console.log("✅ Botón del ejercicio", audioRequest.exerciseIndex, "actualizado a pausar");
                    }
                }
            } else {
                // Cambiar botón general de pausa
    const playBtn = document.querySelector('.play-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    if (playBtn && pauseBtn) {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    }
            }
        };
    
            utterance.onend = () => {
            console.log("⏹️ Audio terminado para ejercicio:", audioRequest.exerciseIndex);
            isPlaying = false;
            
            if (audioRequest.exerciseIndex !== null) {
                // Restaurar botón para ejercicios específicos
                const exerciseDiv = document.querySelector(`#listeningResult${audioRequest.exerciseIndex}`)?.closest('.listening-exercise');
                if (exerciseDiv) {
                    const playBtn = exerciseDiv.querySelector('.btn-primary');
                    if (playBtn) {
                        playBtn.innerHTML = '<i class="fas fa-play"></i> Reproducir Audio';
                        playBtn.disabled = false;
                        console.log("✅ Botón del ejercicio", audioRequest.exerciseIndex, "restaurado a reproducir");
                    }
                }
            } else {
                // Restaurar botón general
                const playBtn = document.querySelector('.play-btn');
                const pauseBtn = document.querySelector('.pause-btn');
        if (playBtn && pauseBtn) {
            playBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'none';
        }
            }
            
            // Procesar siguiente audio en la cola
            setTimeout(() => {
                processAudioQueue();
            }, 100);
    };
    
    utterance.onerror = (event) => {
            console.error("❌ Error en síntesis de voz para ejercicio", audioRequest.exerciseIndex, ":", event);
            isPlaying = false;
            
            if (audioRequest.exerciseIndex !== null) {
                // Restaurar botón para ejercicios específicos
                const exerciseDiv = document.querySelector(`#listeningResult${audioRequest.exerciseIndex}`)?.closest('.listening-exercise');
                if (exerciseDiv) {
                    const playBtn = exerciseDiv.querySelector('.btn-primary');
                    if (playBtn) {
                        playBtn.innerHTML = '<i class="fas fa-play"></i> Reproducir Audio';
                        playBtn.disabled = false;
                        console.log("✅ Botón del ejercicio", audioRequest.exerciseIndex, "restaurado por error");
                    }
                }
            } else {
                // Restaurar botón general
                const playBtn = document.querySelector('.play-btn');
                const pauseBtn = document.querySelector('.pause-btn');
        if (playBtn && pauseBtn) {
            playBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'none';
        }
            }
            
        showNotification('Error al reproducir audio. Intenta nuevamente.', 'error');
            
                    // Procesar siguiente audio en la cola
        setTimeout(() => {
            processAudioQueue();
        }, 100);
    };
    
    // Guardar referencia global
    window.currentListeningAudio = utterance;
    
    // Reproducir audio
        speechSynthesis.speak(utterance);
    console.log("✅ Audio enviado a reproducción:", audioRequest.text);
}

// Función para limpiar cola de audio cuando se cambie de ejercicio
function clearAudioQueueForExercise(exerciseIndex) {
    try {
        // Filtrar la cola para mantener solo audios de otros ejercicios
        audioQueue = audioQueue.filter(request => request.exerciseIndex !== exerciseIndex);
        console.log("🗑️ Cola de audio limpiada para ejercicio", exerciseIndex, "Cola restante:", audioQueue.length);
        
        // Si el audio actual es del ejercicio que se está limpiando, detenerlo
        if (window.currentListeningAudio && audioQueue.length === 0) {
            speechSynthesis.cancel();
            window.currentListeningAudio = null;
            isPlaying = false;
            console.log("⏹️ Audio detenido para ejercicio", exerciseIndex);
        }
    } catch (error) {
        console.error("❌ Error al limpiar cola de audio para ejercicio:", error);
    }
}

// Función unificada para pausar audio del ejercicio de listening
function pauseListeningAudio() {
    try {
        console.log("⏸️ Pausando audio...");
        
        // Detener audio actual si existe
        if (window.currentListeningAudio) {
        speechSynthesis.cancel();
            window.currentListeningAudio = null;
            console.log("✅ Audio pausado correctamente");
        }
        
        // Limpiar cola de audio
        audioQueue = [];
        isPlaying = false;
        console.log("🗑️ Cola de audio limpiada");
        
        // Restaurar botones generales
    const playBtn = document.querySelector('.play-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    if (playBtn && pauseBtn) {
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
    }
    
        // Restaurar barra de progreso
    const progressFill = document.querySelector('.audio-progress .progress-fill');
    const currentTimeSpan = document.querySelector('.current-time');
    if (progressFill) progressFill.style.width = '0%';
    if (currentTimeSpan) currentTimeSpan.textContent = '0:00';
        
        // Restaurar botones de ejercicios específicos
        const exerciseButtons = document.querySelectorAll('.listening-exercise .btn-primary');
        exerciseButtons.forEach(btn => {
            if (btn.innerHTML.includes('Reproduciendo')) {
                btn.innerHTML = '<i class="fas fa-play"></i> Reproducir Audio';
                btn.disabled = false;
            }
        });
        
    } catch (error) {
        console.error("❌ Error al pausar audio:", error);
    }
}

// Función para cambiar velocidad del audio
function changeListeningSpeed(speed) {
    try {
        window.listeningAudioSpeed = parseFloat(speed);
        console.log("⚡ Velocidad de audio cambiada a:", speed);
        
        // Actualizar velocidad del audio actual si existe
        if (window.currentListeningAudio) {
            window.currentListeningAudio.rate = window.listeningAudioSpeed;
        }
    } catch (error) {
        console.error("❌ Error al cambiar velocidad:", error);
    }
}

// Función para limpiar cola de audio
function clearAudioQueue() {
    try {
        audioQueue = [];
        isPlaying = false;
        console.log("🗑️ Cola de audio limpiada manualmente");
    } catch (error) {
        console.error("❌ Error al limpiar cola de audio:", error);
    }
}

// Función para obtener estado de la cola de audio
function getAudioQueueStatus() {
    return {
        queueLength: audioQueue.length,
        isPlaying: isPlaying,
        currentAudio: window.currentListeningAudio ? 'playing' : 'stopped'
    };
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
    
    // Bloquear todos los botones inmediatamente
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.6';
        btn.style.cursor = 'not-allowed';
    });
    
    if (isCorrect) {
        resultMessage.innerHTML = '<span style="color: var(--success-color);">✅ ¡Correcto! Has identificado bien el audio.</span>';
        playSuccessSound();
        if (typeof appState !== 'undefined') {
            appState.currentXP += 15;
            try { if (typeof checkLevelUp === 'function') checkLevelUp(); } catch (e) { console.error("checkLevelUp error:", e); }
            try { if (typeof updateHeaderElements === 'function') updateHeaderElements(); } catch (e) { console.error("updateHeaderElements error:", e); }
            try { if (typeof saveProgress === 'function') saveProgress(); } catch (e) { console.error("saveProgress error:", e); }
        }
        showNotification('¡Excelente comprensión auditiva! +15 XP', 'success');
        
        // Marcar botón seleccionado como correcto
        selectedListeningAnswer.style.background = 'var(--success-color)';
        selectedListeningAnswer.style.color = 'white';
        selectedListeningAnswer.style.borderColor = 'var(--success-color)';
    } else {
        resultMessage.innerHTML = '<span style="color: var(--error-color);">❌ Incorrecto. Intenta escuchar el audio nuevamente.</span>';
        playFailSound();
        showNotification('Sigue practicando tu comprensión auditiva', 'info');
        
        // Marcar botón seleccionado como incorrecto
        selectedListeningAnswer.style.background = 'var(--error-color)';
        selectedListeningAnswer.style.color = 'white';
        selectedListeningAnswer.style.borderColor = 'var(--error-color)';
        
        // Marcar la opción correcta
        const correctButton = document.querySelector('[data-correct="true"]');
        if (correctButton) {
            correctButton.style.background = 'var(--success-color)';
            correctButton.style.color = 'white';
            correctButton.style.borderColor = 'var(--success-color)';
        }
    }
    
    resultDiv.style.display = 'block';
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
        // Inicializar el sistema de práctica integrado
        if (window.practiceSystem && typeof window.practiceSystem.initialize === 'function') {
            // Obtener datos del usuario actual
            const currentUser = window.appState?.currentUser || {
                email: 'guest',
                currentLevel: 1
            };
            
            window.practiceSystem.initialize(currentUser);
            console.log("✅ Sistema de práctica integrado inicializado");
        }
        
        // Cargar modos de práctica y configurar event listeners
        loadPracticeModes();
        
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
window.clearAudioQueue = clearAudioQueue;
window.clearAudioQueueForExercise = clearAudioQueueForExercise;
window.getAudioQueueStatus = getAudioQueueStatus;
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
    // Obtener el escenario basado en el progreso del usuario
    const currentLesson = appState?.currentLesson || 0;
    const userLevel = appState?.currentLevel || 1;
    
    // Determinar qué escenario mostrar según el progreso
    let scenario;
    
    // Si hay conversación específica para la lección actual, usarla
    if (LESSON_CONVERSATIONS && LESSON_CONVERSATIONS[currentLesson + 1]) {
        scenario = LESSON_CONVERSATIONS[currentLesson + 1];
        console.log("📚 Usando conversación específica de la lección:", currentLesson + 1);
    } else {
        // Usar escenario general basado en el nivel del usuario
        const scenarioIndex = Math.min(Math.floor(userLevel / 2), CONVERSATION_SCENARIOS.length - 1);
        scenario = CONVERSATION_SCENARIOS[scenarioIndex];
        console.log("🎯 Usando escenario general para nivel:", userLevel, "índice:", scenarioIndex);
    }
    
    const chatMessages = document.getElementById('chatMessages');
    
    document.getElementById('scenarioTitle').textContent = scenario.title;
    document.getElementById('scenarioDescription').textContent = scenario.description;
    
    // Limpiar mensajes anteriores
    chatMessages.innerHTML = '';
    
    // Agregar mensajes iniciales
    scenario.messages.forEach(message => {
        addMessageToChat(message.text, message.type);
    });
    
    console.log("✅ Escenario de conversación cargado:", scenario.title);
}

// Función para avanzar al siguiente escenario de conversación
function nextConversationScenario() {
    try {
        console.log("🚀 Avanzando al siguiente escenario de conversación...");
        
        // Obtener el escenario actual
        const currentLesson = appState?.currentLesson || 0;
        const userLevel = appState?.currentLevel || 1;
        
        // Verificar si hay siguiente escenario
        let nextScenario = null;
        
        // Primero verificar si hay conversación específica para la siguiente lección
        if (LESSON_CONVERSATIONS && LESSON_CONVERSATIONS[currentLesson + 2]) {
            nextScenario = LESSON_CONVERSATIONS[currentLesson + 2];
            console.log("📚 Siguiente conversación específica de lección:", currentLesson + 2);
        } else {
            // Usar siguiente escenario general
            const currentScenarioIndex = Math.min(Math.floor(userLevel / 2), CONVERSATION_SCENARIOS.length - 1);
            const nextScenarioIndex = currentScenarioIndex + 1;
            
            if (nextScenarioIndex < CONVERSATION_SCENARIOS.length) {
                nextScenario = CONVERSATION_SCENARIOS[nextScenarioIndex];
                console.log("🎯 Siguiente escenario general:", nextScenarioIndex);
            } else {
                console.log("🏁 No hay más escenarios disponibles");
                showNotification('¡Felicidades! Has completado todos los escenarios de conversación disponibles. 🎓', 'success');
                return;
            }
        }
        
        if (nextScenario) {
            // Cargar el nuevo escenario
            loadConversationScenario();
            
            // Mostrar notificación de avance
            showNotification(`Avanzando a: ${nextScenario.title} 🚀`, 'success');
            
            // Actualizar UI
            if (typeof updateUI === 'function') {
                updateUI();
            }
        }
        
    } catch (error) {
        console.error("❌ Error al avanzar escenario de conversación:", error);
        showNotification('Error al avanzar al siguiente escenario', 'error');
    }
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
        // Obtener vocabulario de la lección actual del sistema global (prioridad alta)
        let vocabulary = [];
        let lessonSource = '';
        
        if (typeof appState !== 'undefined' && typeof getAllowedLessonsByLevel === 'function') {
            const allowedLessons = getAllowedLessonsByLevel();
            const currentLesson = allowedLessons[appState.currentLesson];
            if (currentLesson && currentLesson.vocabulary) {
                vocabulary = currentLesson.vocabulary;
                lessonSource = `lección actual: ${currentLesson.title}`;
                console.log("📝 Usando vocabulario de lección actual:", currentLesson.title);
            } else {
                console.warn("⚠️ No se encontró vocabulario en la lección actual");
            }
        }
        
        // Si no hay vocabulario de lección actual, usar categoría específica
        if (vocabulary.length === 0 && categoryKey && window.VOCABULARY_DATABASE && window.VOCABULARY_DATABASE[categoryKey]) {
            vocabulary = window.VOCABULARY_DATABASE[categoryKey];
            lessonSource = `categoría: ${categoryKey}`;
            console.log("📝 Usando vocabulario de categoría:", categoryKey);
        }
        
        // Si aún no hay vocabulario, usar vocabulario general
        if (vocabulary.length === 0) {
            console.warn("⚠️ No hay vocabulario disponible para ejercicios");
            return createNoVocabularyMessage();
        }
        
        console.log("📝 Vocabulario disponible para ejercicios:", vocabulary.length, "palabras de", lessonSource);
        
        // Crear contenedor de ejercicios
        const exerciseContainer = document.createElement('div');
        exerciseContainer.className = 'exercise-container';
        
        // Agregar información de la lección actual
        if (typeof appState !== 'undefined' && typeof getAllowedLessonsByLevel === 'function') {
            const allowedLessons = getAllowedLessonsByLevel();
            const currentLesson = allowedLessons[appState.currentLesson];
            if (currentLesson) {
                const lessonInfo = document.createElement('div');
                lessonInfo.style.cssText = `
                    background: var(--background-color);
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    border-left: 4px solid var(--primary-color);
                `;
                lessonInfo.innerHTML = `
                    <h4 style="color: var(--primary-color); margin: 0 0 0.5rem 0;">
                        <i class="fas fa-book"></i> Practicando: ${currentLesson.title}
                    </h4>
                    <p style="margin: 0; color: var(--text-secondary);">
                        Vocabulario: ${currentLesson.vocabulary.length} palabras | 
                        Gramática: ${currentLesson.grammar.title}
                    </p>
                `;
                exerciseContainer.appendChild(lessonInfo);
            }
        }
        
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
        question.textContent = `¿Cómo se dice "${word.spanish}" en inglés?`;
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
        
        // Obtener la palabra para ajustar dificultad
        const exerciseDiv = selectedButton.closest('.vocabulary-exercise');
        const word = exerciseDiv ? exerciseDiv.querySelector('.english')?.textContent || selectedButton.textContent : null;
        
        if (word && typeof adjustDifficulty === 'function') {
            adjustDifficulty(word, isCorrect);
        }
        
        // Deshabilitar todos los botones de este ejercicio
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
        
        // Sumar XP basado en el rendimiento
        let xpEarned = 0;
        if (percentage >= 80) {
            xpEarned = 25; // Excelente: +25 XP
        } else if (percentage >= 60) {
            xpEarned = 15; // Bueno: +15 XP
        } else {
            xpEarned = 5;  // Necesita mejorar: +5 XP
        }
        
        // Sumar XP al usuario si está disponible el sistema global
        if (typeof appState !== 'undefined' && typeof LEVEL_SYSTEM !== 'undefined') {
            appState.currentXP += xpEarned;
            console.log("✅ XP sumado por práctica:", xpEarned);
            console.log("📊 XP total después de práctica:", appState.currentXP);
            
            // Verificar si subió de nivel
            if (typeof checkLevelUp === 'function') {
                const leveledUp = checkLevelUp();
                if (leveledUp) {
                    console.log("🎉 ¡Usuario subió de nivel por práctica!");
                }
            }
            
            // Actualizar la UI si está disponible
            if (typeof updateUI === 'function') {
                updateUI();
            }
            
            // Actualizar el display del usuario si está disponible
            if (typeof updateUserDisplay === 'function') {
                // Obtener usuario del localStorage directamente
                const userData = localStorage.getItem('englishLearningUser');
                if (userData) {
                    const currentUser = JSON.parse(userData);
                    updateUserDisplay(currentUser);
                }
            }
            
            // Actualizar directamente los elementos del header
            updateHeaderElements();
            
            // Guardar progreso si está disponible
            if (typeof saveProgress === 'function') {
                saveProgress();
            }
        }
        
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
        
        // Crear mensaje de XP ganado
        const xpMessage = xpEarned > 0 ? 
            `<div style="background: var(--accent-color); color: white; padding: 0.5rem 1rem; border-radius: 20px; margin: 1rem 0; font-weight: bold;">
                <i class="fas fa-star"></i> +${xpEarned} XP ganados!
            </div>` : '';
        
        // Verificar si se puede activar el botón "siguiente lección"
        let nextLessonMessage = '';
        if (typeof appState !== 'undefined' && typeof getAllowedLessonsByLevel === 'function') {
            const allowedLessons = getAllowedLessonsByLevel();
            const hasNextLesson = appState.currentLesson < allowedLessons.length - 1;
            
            if (hasNextLesson) {
                nextLessonMessage = `
                    <div style="background: var(--success-color); color: white; padding: 0.5rem 1rem; border-radius: 20px; margin: 1rem 0; font-weight: bold;">
                        <i class="fas fa-arrow-right"></i> ¡Botón "Siguiente Lección" activado!
                    </div>
                `;
            }
        }
        
        resultsContent.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">${resultIcon}</div>
            <h3 style="color: ${resultColor}; margin-bottom: 1rem;">${resultMessage}</h3>
            <div style="font-size: 2rem; font-weight: bold; color: var(--primary-color); margin-bottom: 1rem;">
                ${correct}/${total} correctas
            </div>
            <div style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 1rem;">
                ${percentage}% de acierto
            </div>
            ${xpMessage}
            ${nextLessonMessage}
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
        console.log("✅ XP ganado:", xpEarned);
        
        // Activar el botón "siguiente lección" si está disponible
        if (typeof updateNextLessonButton === 'function') {
            updateNextLessonButton();
        }
        
    } catch (error) {
        console.error("❌ Error al mostrar resultados:", error);
    }
}

// Funciones placeholder para otros tipos de ejercicios
function createGrammarExerciseContent() {
    console.log("📝 Creando ejercicios de gramática inteligentes");
    try {
        // Obtener información de la lección actual
        let currentLesson = null;
        let lessonSource = '';
        
        if (typeof appState !== 'undefined' && typeof getAllowedLessonsByLevel === 'function') {
            const allowedLessons = getAllowedLessonsByLevel();
            currentLesson = allowedLessons[appState.currentLesson];
            if (currentLesson) {
                lessonSource = `lección actual: ${currentLesson.title}`;
                console.log("📝 Usando gramática de lección actual:", currentLesson.title);
            }
        }
        
        // Obtener nivel del usuario
        const userLevel = window.appState?.currentLevel || 1;
        const userMCER = getUserLevelMCER(userLevel);
        
        console.log("👤 Nivel del usuario:", userLevel, "MCER:", userMCER);
        
        // Crear contenedor de ejercicios
        const exerciseContainer = document.createElement('div');
        exerciseContainer.className = 'exercise-container';
        
        // Agregar información de la lección actual
        if (currentLesson) {
            const lessonInfo = document.createElement('div');
            lessonInfo.style.cssText = `
                background: var(--background-color);
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1.5rem;
                border-left: 4px solid var(--accent-color);
            `;
            lessonInfo.innerHTML = `
                <h4 style="color: var(--accent-color); margin: 0 0 0.5rem 0;">
                    <i class="fas fa-pen-fancy"></i> Practicando Gramática: ${currentLesson.title}
                </h4>
                <p style="margin: 0; color: var(--text-secondary);">
                    Tema: ${currentLesson.grammar.title} | 
                    Contenido: ${currentLesson.grammar.content}
                </p>
            `;
            exerciseContainer.appendChild(lessonInfo);
        }
        
        // Crear múltiples ejercicios de gramática
        const exercises = [];
        const numExercises = 5;
        
        for (let i = 0; i < numExercises; i++) {
            const exercise = createSingleGrammarExercise(userMCER, i, currentLesson);
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
        resultsBtn.innerHTML = '<i class="fas fa-check"></i> Ver Resultados de Gramática';
        resultsBtn.onclick = () => showGrammarResults(exercises);
        resultsBtn.style.marginTop = '2rem';
        resultsBtn.style.width = '100%';
        
        exerciseContainer.appendChild(resultsBtn);
        
        console.log("✅ Ejercicios de gramática creados:", exercises.length);
        return exerciseContainer;
        
    } catch (error) {
        console.error("❌ Error al crear ejercicios de gramática:", error);
        return createErrorMessage("Error al crear ejercicios de gramática");
    }
}

function createSingleGrammarExercise(userMCER, exerciseIndex, lesson) {
    try {
        // Obtener ejercicios de gramática según el nivel
        let grammarExercises = [];
        
        if (window.GRAMMAR_POOLS && window.GRAMMAR_POOLS[userMCER]) {
            grammarExercises = window.GRAMMAR_POOLS[userMCER];
        }
        
        // Si no hay ejercicios específicos, crear ejercicios básicos
        if (grammarExercises.length === 0) {
            grammarExercises = createBasicGrammarExercises(userMCER);
        }
        
        // Seleccionar ejercicio aleatorio
        const exercise = grammarExercises[exerciseIndex % grammarExercises.length];
        
        // Crear opciones y mezclarlas
        const allOptions = [...exercise.options];
        allOptions.sort(() => Math.random() - 0.5);
        
        // Crear contenedor del ejercicio
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'grammar-exercise';
        exerciseDiv.style.marginBottom = '2rem';
        exerciseDiv.style.padding = '1.5rem';
        exerciseDiv.style.border = '2px solid var(--border-color)';
        exerciseDiv.style.borderRadius = '12px';
        exerciseDiv.style.backgroundColor = 'var(--surface-color)';
        
        // Título del ejercicio
        const title = document.createElement('h4');
        title.innerHTML = `<i class="fas fa-pen-fancy"></i> Ejercicio de Gramática ${exerciseIndex + 1}`;
        title.style.marginBottom = '1rem';
        title.style.color = 'var(--primary-color)';
        
        // Pregunta
        const question = document.createElement('p');
        question.innerHTML = `<strong>${exercise.question.replace(/</g, '<').replace(/>/g, '>')}</strong>`;
        question.style.fontSize = '1.1rem';
        question.style.marginBottom = '1.5rem';
        question.style.padding = '1rem';
        question.style.backgroundColor = 'var(--background-color)';
        question.style.borderRadius = '8px';
        question.style.borderLeft = '4px solid var(--accent-color)';
        
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
            optionBtn.dataset.correct = (option === exercise.correct).toString();
            optionBtn.dataset.exerciseIndex = exerciseIndex.toString();
            optionBtn.dataset.exerciseType = 'grammar';
            
            // Event listener para seleccionar opción
            optionBtn.onclick = function() {
                selectGrammarOption(this, exerciseIndex, lesson);
            };
            
            optionsGrid.appendChild(optionBtn);
        });
        
        // Resultado del ejercicio
        const resultDiv = document.createElement('div');
        resultDiv.className = 'exercise-result';
        resultDiv.id = `grammarResult${exerciseIndex}`;
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
        console.error("❌ Error al crear ejercicio de gramática individual:", error);
        return null;
    }
}

function createBasicGrammarExercises(userMCER) {
    // Crear ejercicios básicos según el nivel MCER
    const basicExercises = {
        'A1': [
            {
                question: "Complete: I ___ a student.",
                options: ["am", "are", "is", "be"],
                correct: "am",
                explanation: "Se usa 'am' con 'I' en presente simple"
            },
            {
                question: "Complete: She ___ English.",
                options: ["speak", "speaks", "speaking", "spoke"],
                correct: "speaks",
                explanation: "Se usa 'speaks' con 'she' en presente simple"
            },
            {
                question: "Complete: ___ apple",
                options: ["a", "an", "the", "none"],
                correct: "an",
                explanation: "Se usa 'an' antes de vocales"
            },
            {
                question: "Complete: They ___ students.",
                options: ["am", "are", "is", "be"],
                correct: "are",
                explanation: "Se usa 'are' con 'they' en presente simple"
            },
            {
                question: "Complete: He ___ a car.",
                options: ["have", "has", "having", "had"],
                correct: "has",
                explanation: "Se usa 'has' con 'he' en presente simple"
            }
        ],
        'A2': [
            {
                question: "Complete: Yesterday I ___ to the store.",
                options: ["go", "went", "going", "goes"],
                correct: "went",
                explanation: "Se usa 'went' (pasado simple) para acciones pasadas"
            },
            {
                question: "Complete: I have ___ studying for two hours.",
                options: ["be", "been", "being", "am"],
                correct: "been",
                explanation: "Se usa 'been' con 'have' en presente perfecto continuo"
            },
            {
                question: "Complete: The book ___ on the table.",
                options: ["lay", "laying", "lying", "lies"],
                correct: "lies",
                explanation: "Se usa 'lies' (presente simple) para estado actual"
            },
            {
                question: "Complete: She suggested that he ___ the meeting.",
                options: ["attend", "attends", "attended", "attending"],
                correct: "attend",
                explanation: "Se usa infinitivo sin 'to' después de 'suggested that'"
            },
            {
                question: "Complete: The project ___ by the team last month.",
                options: ["complete", "completed", "was completed", "has completed"],
                correct: "was completed",
                explanation: "Se usa voz pasiva para acciones pasadas"
            }
        ]
    };
    
    return basicExercises[userMCER] || basicExercises['A1'];
}

function selectGrammarOption(selectedButton, exerciseIndex, lesson) {
    try {
        const isCorrect = selectedButton.dataset.correct === 'true';
        const resultDiv = document.getElementById(`grammarResult${exerciseIndex}`);
        
        // Obtener la opción correcta para ajustar dificultad (usar el texto como "palabra")
        const word = selectedButton.textContent.trim();
        if (word && typeof adjustDifficulty === 'function') {
            adjustDifficulty(word, isCorrect);
        }
        
        // Deshabilitar todos los botones de este ejercicio
        const exerciseDiv = selectedButton.closest('.grammar-exercise');
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
        
        console.log("✅ Opción de gramática seleccionada para ejercicio", exerciseIndex, "Correcta:", isCorrect);
        
    } catch (error) {
        console.error("❌ Error al seleccionar opción de gramática:", error);
    }
}

function showGrammarResults(exercises) {
    try {
        // Calcular resultados
        let correct = 0;
        let total = 0;
        
        exercises.forEach((exercise, index) => {
            const resultDiv = document.getElementById(`grammarResult${index}`);
            if (resultDiv && resultDiv.style.display !== 'none') {
                total++;
                if (resultDiv.innerHTML.includes('Correcto')) {
                    correct++;
                }
            }
        });
        
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        
        // Sumar XP basado en el rendimiento
        let xpEarned = 0;
        if (percentage >= 80) {
            xpEarned = 20; // Excelente: +20 XP
        } else if (percentage >= 60) {
            xpEarned = 12; // Bueno: +12 XP
        } else {
            xpEarned = 5;  // Necesita mejorar: +5 XP
        }
        
        // Sumar XP al usuario si está disponible el sistema global
        if (typeof appState !== 'undefined' && typeof LEVEL_SYSTEM !== 'undefined') {
            appState.currentXP += xpEarned;
            console.log("✅ XP sumado por práctica de gramática:", xpEarned);
            console.log("📊 XP total después de práctica:", appState.currentXP);
            
            // Verificar si subió de nivel
            if (typeof checkLevelUp === 'function') {
                const leveledUp = checkLevelUp();
                if (leveledUp) {
                    console.log("🎉 ¡Usuario subió de nivel por práctica de gramática!");
                }
            }
            
            // Actualizar la UI si está disponible
            if (typeof updateUI === 'function') {
                updateUI();
            }
            
            // Actualizar el display del usuario si está disponible
            if (typeof updateUserDisplay === 'function') {
                // Obtener usuario del localStorage directamente
                const userData = localStorage.getItem('englishLearningUser');
                if (userData) {
                    const currentUser = JSON.parse(userData);
                    updateUserDisplay(currentUser);
                }
            }
            
            // Guardar progreso si está disponible
            if (typeof saveProgress === 'function') {
                saveProgress();
            }
        }
        
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
            resultMessage = '¡Excelente gramática!';
            resultIcon = '🎯';
            resultColor = 'var(--success-color)';
        } else if (percentage >= 60) {
            resultMessage = '¡Buen trabajo gramatical!';
            resultIcon = '📚';
            resultColor = 'var(--warning-color)';
        } else {
            resultMessage = '¡Sigue estudiando gramática!';
            resultIcon = '📖';
            resultColor = 'var(--error-color)';
        }
        
        // Crear mensaje de XP ganado
        const xpMessage = xpEarned > 0 ? 
            `<div style="background: var(--accent-color); color: white; padding: 0.5rem 1rem; border-radius: 20px; margin: 1rem 0; font-weight: bold;">
                <i class="fas fa-star"></i> +${xpEarned} XP ganados!
            </div>` : '';
        
        // Verificar si se puede activar el botón "siguiente lección"
        let nextLessonMessage = '';
        if (typeof appState !== 'undefined' && typeof getAllowedLessonsByLevel === 'function') {
            const allowedLessons = getAllowedLessonsByLevel();
            const hasNextLesson = appState.currentLesson < allowedLessons.length - 1;
            
            if (hasNextLesson) {
                nextLessonMessage = `
                    <div style="background: var(--success-color); color: white; padding: 0.5rem 1rem; border-radius: 20px; margin: 1rem 0; font-weight: bold;">
                        <i class="fas fa-arrow-right"></i> ¡Botón "Siguiente Lección" activado!
                    </div>
                `;
            }
        }
        
        resultsContent.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">${resultIcon}</div>
            <h3 style="color: ${resultColor}; margin-bottom: 1rem;">${resultMessage}</h3>
            <div style="font-size: 2rem; font-weight: bold; color: var(--primary-color); margin-bottom: 1rem;">
                ${correct}/${total} correctas
            </div>
            <div style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 1rem;">
                ${percentage}% de acierto
            </div>
            ${xpMessage}
            ${nextLessonMessage}
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
        
        console.log("✅ Resultados de gramática mostrados:", correct, "de", total, "correctas (", percentage, "%)");
        console.log("✅ XP ganado:", xpEarned);
        
        // Activar el botón "siguiente lección" si está disponible
        if (typeof updateNextLessonButton === 'function') {
            updateNextLessonButton();
        }
        
    } catch (error) {
        console.error("❌ Error al mostrar resultados de gramática:", error);
    }
}

function createListeningExerciseContent() {
    console.log("🎧 Creando ejercicios de listening con audio real");
    try {
        // Crear contenedor de ejercicios
        const exerciseContainer = document.createElement('div');
        exerciseContainer.className = 'exercise-container';
        
        // Crear múltiples ejercicios de listening
        const exercises = [];
        const numExercises = 3; // Menos ejercicios para listening
        
        for (let i = 0; i < numExercises; i++) {
            const exercise = createSingleListeningExercise(i);
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
        resultsBtn.innerHTML = '<i class="fas fa-check"></i> Ver Resultados de Listening';
        resultsBtn.onclick = () => showListeningResults(exercises);
        resultsBtn.style.marginTop = '2rem';
        resultsBtn.style.width = '100%';
        
        exerciseContainer.appendChild(resultsBtn);
        
        console.log("✅ Ejercicios de listening creados:", exercises.length);
        return exerciseContainer;
        
    } catch (error) {
        console.error("❌ Error al crear ejercicios de listening:", error);
        return createErrorMessage("Error al crear ejercicios de listening");
    }
}

function createSingleListeningExercise(exerciseIndex) {
    try {
        // Crear ejercicios de listening con diferentes niveles de dificultad
        const listeningExercises = [
            {
                type: 'word',
                text: "Hello",
                question: "¿Qué palabra escuchaste?",
                options: ["Hello", "Hi", "Goodbye", "Thanks"],
                correct: "Hello",
                difficulty: "A1"
            },
            {
                type: 'phrase',
                text: "How are you today?",
                question: "¿Qué frase escuchaste?",
                options: [
                    "How are you today?",
                    "How do you do?",
                    "What's your name?",
                    "Where are you from?"
                ],
                correct: "How are you today?",
                difficulty: "A1"
            },
            {
                type: 'sentence',
                text: "I would like to order a coffee, please.",
                question: "¿Qué oración escuchaste?",
                options: [
                    "I would like to order a coffee, please.",
                    "Can I have a coffee, please?",
                    "I want to buy a coffee.",
                    "Please give me a coffee."
                ],
                correct: "I would like to order a coffee, please.",
                difficulty: "A2"
            }
        ];
        
        const exercise = listeningExercises[exerciseIndex % listeningExercises.length];
        
        // Crear contenedor del ejercicio
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'listening-exercise';
        exerciseDiv.style.marginBottom = '2rem';
        exerciseDiv.style.padding = '1.5rem';
        exerciseDiv.style.border = '2px solid var(--border-color)';
        exerciseDiv.style.borderRadius = '12px';
        exerciseDiv.style.backgroundColor = 'var(--surface-color)';
        
        // Título del ejercicio
        const title = document.createElement('h4');
        title.innerHTML = `<i class="fas fa-headphones"></i> Ejercicio de Listening ${exerciseIndex + 1}`;
        title.style.marginBottom = '1rem';
        title.style.color = 'var(--primary-color)';
        
        // Controles de audio
        const audioControls = document.createElement('div');
        audioControls.className = 'audio-controls';
        audioControls.style.marginBottom = '1.5rem';
        audioControls.style.padding = '1rem';
        audioControls.style.backgroundColor = 'var(--background-color)';
        audioControls.style.borderRadius = '8px';
        audioControls.style.border = '1px solid var(--border-color)';
        
        // Botón de reproducir
        const playBtn = document.createElement('button');
        playBtn.className = 'btn btn-primary';
        playBtn.innerHTML = '<i class="fas fa-play"></i> Reproducir Audio';
        playBtn.style.marginRight = '1rem';
        playBtn.onclick = () => {
            console.log("🎵 Reproduciendo audio para ejercicio", exerciseIndex, ":", exercise.text);
            playListeningAudio(exercise.text, exerciseIndex);
        };
        
        // Botón de pausar
        const pauseBtn = document.createElement('button');
        pauseBtn.className = 'btn btn-secondary';
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
        pauseBtn.style.marginRight = '1rem';
        pauseBtn.onclick = () => pauseListeningAudio();
        
        // Control de velocidad
        const speedControl = document.createElement('div');
        speedControl.style.display = 'inline-block';
        speedControl.style.marginLeft = '1rem';
        
        const speedLabel = document.createElement('label');
        speedLabel.textContent = 'Velocidad: ';
        speedLabel.style.marginRight = '0.5rem';
        
        const speedSelect = document.createElement('select');
        speedSelect.style.padding = '0.5rem';
        speedSelect.style.borderRadius = '4px';
        speedSelect.style.border = '1px solid var(--border-color)';
        
        const speeds = [
            { value: 0.7, label: 'Lento' },
            { value: 1.0, label: 'Normal' },
            { value: 1.3, label: 'Rápido' }
        ];
        
        speeds.forEach(speed => {
            const option = document.createElement('option');
            option.value = speed.value;
            option.textContent = speed.label;
            if (speed.value === 1.0) option.selected = true;
            speedSelect.appendChild(option);
        });
        
        speedSelect.onchange = (e) => changeListeningSpeed(parseFloat(e.target.value));
        
        speedControl.appendChild(speedLabel);
        speedControl.appendChild(speedSelect);
        
        // Agregar controles
        audioControls.appendChild(playBtn);
        audioControls.appendChild(pauseBtn);
        audioControls.appendChild(speedControl);
        
        // Pregunta
        const question = document.createElement('p');
        question.innerHTML = `<strong>${exercise.question}</strong>`;
        question.style.fontSize = '1.1rem';
        question.style.marginBottom = '1.5rem';
        question.style.padding = '1rem';
        question.style.backgroundColor = 'var(--background-color)';
        question.style.borderRadius = '8px';
        question.style.borderLeft = '4px solid var(--pronunciation-color)';
        
        // Opciones
        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'options-grid';
        optionsGrid.style.display = 'grid';
        optionsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
        optionsGrid.style.gap = '1rem';
        optionsGrid.style.marginBottom = '1rem';
        
        exercise.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'btn btn-secondary option-btn';
            optionBtn.textContent = option;
            optionBtn.style.width = '100%';
            optionBtn.style.padding = '1rem';
            optionBtn.style.fontSize = '1rem';
            
            // Marcar la opción correcta
            optionBtn.dataset.correct = (option === exercise.correct).toString();
            optionBtn.dataset.exerciseIndex = exerciseIndex.toString();
            optionBtn.dataset.exerciseType = 'listening';
            
            // Event listener para seleccionar opción
            optionBtn.onclick = function() {
                selectListeningOption(this, exerciseIndex);
            };
            
            optionsGrid.appendChild(optionBtn);
        });
        
        // Resultado del ejercicio
        const resultDiv = document.createElement('div');
        resultDiv.className = 'exercise-result';
        resultDiv.id = `listeningResult${exerciseIndex}`;
        resultDiv.style.display = 'none';
        resultDiv.style.padding = '1rem';
        resultDiv.style.borderRadius = '8px';
        resultDiv.style.marginTop = '1rem';
        resultDiv.style.textAlign = 'center';
        resultDiv.style.fontWeight = '600';
        
        // Ensamblar ejercicio
        exerciseDiv.appendChild(title);
        exerciseDiv.appendChild(audioControls);
        exerciseDiv.appendChild(question);
        exerciseDiv.appendChild(optionsGrid);
        exerciseDiv.appendChild(resultDiv);
        
        return exerciseDiv;
        
    } catch (error) {
        console.error("❌ Error al crear ejercicio de listening individual:", error);
        return null;
    }
}


function selectListeningOption(selectedButton, exerciseIndex) {
    try {
        const isCorrect = selectedButton.dataset.correct === 'true';
        const resultDiv = document.getElementById(`listeningResult${exerciseIndex}`);
        
        // Deshabilitar todos los botones de este ejercicio
        const exerciseDiv = selectedButton.closest('.listening-exercise');
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
            resultDiv.innerHTML = '<i class="fas fa-check-circle"></i> ¡Correcto! +10 XP';
        } else {
            resultDiv.style.background = 'rgba(239, 68, 68, 0.1)';
            resultDiv.style.color = 'var(--error-color)';
            resultDiv.style.border = '1px solid var(--error-color)';
            resultDiv.innerHTML = '<i class="fas fa-times-circle"></i> Incorrecto';
        }
        
        // Actualizar progreso del usuario
        if (isCorrect && typeof appState !== 'undefined') {
            // Sumar XP por respuesta correcta
            appState.currentXP += 10;
            
            // Actualizar racha de práctica
            if (!appState.practiceStreak) appState.practiceStreak = 0;
            appState.practiceStreak++;
            
            // Guardar progreso
            if (typeof saveProgress === 'function') {
                saveProgress();
                console.log("💾 Progreso guardado después de respuesta correcta");
            }
            
            // Actualizar UI del header
            if (typeof updateHeaderElements === 'function') {
                updateHeaderElements();
            }
            
            console.log("✅ XP sumado:", appState.currentXP, "Racha:", appState.practiceStreak);
        }
        
        // Limpiar cola de audio para este ejercicio
        if (typeof clearAudioQueueForExercise === 'function') {
            clearAudioQueueForExercise(exerciseIndex);
        }
        
        console.log("✅ Opción de listening seleccionada para ejercicio", exerciseIndex, "Correcta:", isCorrect);
        
    } catch (error) {
        console.error("❌ Error al seleccionar opción de listening:", error);
    }
}

function showListeningResults(exercises) {
    try {
        // Calcular resultados
        let correct = 0;
        let total = 0;
        
        exercises.forEach((exercise, index) => {
            const resultDiv = document.getElementById(`listeningResult${index}`);
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
            resultMessage = '¡Excelente comprensión auditiva!';
            resultIcon = '🎧';
            resultColor = 'var(--success-color)';
        } else if (percentage >= 60) {
            resultMessage = '¡Buen trabajo auditivo!';
            resultIcon = '👂';
            resultColor = 'var(--warning-color)';
        } else {
            resultMessage = '¡Sigue practicando listening!';
            resultIcon = '🔊';
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
        
        console.log("✅ Resultados de listening mostrados:", correct, "de", total, "correctas (", percentage, "%)");
        
    } catch (error) {
        console.error("❌ Error al mostrar resultados de listening:", error);
    }
}

function createPronunciationExerciseContent() {
    console.log("🎤 Creando ejercicios de pronunciación con grabación de voz");
    try {
        // Crear contenedor de ejercicios
        const exerciseContainer = document.createElement('div');
        exerciseContainer.className = 'exercise-container';
        
        // Crear múltiples ejercicios de pronunciación
        const exercises = [];
        const numExercises = 3; // Menos ejercicios para pronunciación
        
        for (let i = 0; i < numExercises; i++) {
            const exercise = createSinglePronunciationExercise(i);
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
        resultsBtn.innerHTML = '<i class="fas fa-check"></i> Ver Resultados de Pronunciación';
        resultsBtn.onclick = () => showPronunciationResults(exercises);
        resultsBtn.style.marginTop = '2rem';
        resultsBtn.style.width = '100%';
        
        exerciseContainer.appendChild(resultsBtn);
        
        console.log("✅ Ejercicios de pronunciación creados:", exercises.length);
        return exerciseContainer;
        
    } catch (error) {
        console.error("❌ Error al crear ejercicios de pronunciación:", error);
        return createErrorMessage("Error al crear ejercicios de pronunciación");
    }
}

function createSinglePronunciationExercise(exerciseIndex) {
    try {
        // Crear ejercicios de pronunciación con diferentes niveles de dificultad
        const pronunciationExercises = [
            {
                word: "Hello",
                translation: "Hola",
                pronunciation: "/həˈloʊ/",
                difficulty: "A1",
                tips: "Enfoca en la 'h' aspirada y la 'o' larga"
            },
            {
                word: "Beautiful",
                translation: "Hermoso/a",
                pronunciation: "/ˈbjuːtɪfʊl/",
                difficulty: "A2",
                tips: "Enfoca en la 'u' larga y la 'l' final"
            },
            {
                word: "International",
                translation: "Internacional",
                pronunciation: "/ˌɪntərˈnæʃənəl/",
                difficulty: "B1",
                tips: "Enfoca en el acento en 'na' y la 'l' final"
            }
        ];
        
        const exercise = pronunciationExercises[exerciseIndex % pronunciationExercises.length];
        
        // Crear contenedor del ejercicio
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'pronunciation-exercise';
        exerciseDiv.style.marginBottom = '2rem';
        exerciseDiv.style.padding = '1.5rem';
        exerciseDiv.style.border = '2px solid var(--border-color)';
        exerciseDiv.style.borderRadius = '12px';
        exerciseDiv.style.backgroundColor = 'var(--surface-color)';
        
        // Título del ejercicio
        const title = document.createElement('h4');
        title.innerHTML = `<i class="fas fa-microphone"></i> Ejercicio de Pronunciación ${exerciseIndex + 1}`;
        title.style.marginBottom = '1rem';
        title.style.color = 'var(--primary-color)';
        
        // Palabra a pronunciar
        const wordDisplay = document.createElement('div');
        wordDisplay.style.textAlign = 'center';
        wordDisplay.style.marginBottom = '1.5rem';
        wordDisplay.style.padding = '1rem';
        wordDisplay.style.backgroundColor = 'var(--background-color)';
        wordDisplay.style.borderRadius = '8px';
        
        const wordText = document.createElement('h3');
        wordText.textContent = exercise.word;
        wordText.style.fontSize = '2rem';
        wordText.style.color = 'var(--primary-color)';
        wordText.style.marginBottom = '0.5rem';
        
        const translationText = document.createElement('p');
        translationText.textContent = exercise.translation;
        translationText.style.fontSize = '1.1rem';
        translationText.style.color = 'var(--text-secondary)';
        translationText.style.marginBottom = '0.5rem';
        
        const pronunciationText = document.createElement('p');
        pronunciationText.textContent = exercise.pronunciation;
        pronunciationText.style.fontSize = '1rem';
        pronunciationText.style.color = 'var(--pronunciation-color)';
        pronunciationText.style.fontFamily = 'monospace';
        
        wordDisplay.appendChild(wordText);
        wordDisplay.appendChild(translationText);
        wordDisplay.appendChild(pronunciationText);
        
        // Controles de audio
        const audioControls = document.createElement('div');
        audioControls.className = 'audio-controls';
        audioControls.style.marginBottom = '1.5rem';
        audioControls.style.padding = '1rem';
        audioControls.style.backgroundColor = 'var(--background-color)';
        audioControls.style.borderRadius = '8px';
        audioControls.style.border = '1px solid var(--border-color)';
        audioControls.style.textAlign = 'center';
        
        // Botón para escuchar pronunciación correcta
        const listenBtn = document.createElement('button');
        listenBtn.className = 'btn btn-secondary';
        listenBtn.innerHTML = '<i class="fas fa-volume-up"></i> Escuchar Pronunciación Correcta';
        listenBtn.style.marginRight = '1rem';
        listenBtn.onclick = () => playCorrectPronunciation(exercise.word);
        
        // Botón para grabar
        const recordBtn = document.createElement('button');
        recordBtn.className = 'btn btn-primary';
        recordBtn.innerHTML = '<i class="fas fa-microphone"></i> Grabar Mi Pronunciación';
        recordBtn.style.marginRight = '1rem';
        recordBtn.onclick = () => startRecording(exerciseIndex);
        
        // Botón para detener grabación
        const stopBtn = document.createElement('button');
        stopBtn.className = 'btn btn-secondary';
        stopBtn.innerHTML = '<i class="fas fa-stop"></i> Detener';
        stopBtn.style.display = 'none';
        stopBtn.onclick = () => stopRecording(exerciseIndex);
        
        // Agregar controles
        audioControls.appendChild(listenBtn);
        audioControls.appendChild(recordBtn);
        audioControls.appendChild(stopBtn);
        
        // Área de grabación
        const recordingArea = document.createElement('div');
        recordingArea.className = 'recording-area';
        recordingArea.id = `recordingArea${exerciseIndex}`;
        recordingArea.style.display = 'none';
        recordingArea.style.marginBottom = '1.5rem';
        recordingArea.style.padding = '1rem';
        recordingArea.style.backgroundColor = 'var(--background-color)';
        recordingArea.style.borderRadius = '8px';
        recordingArea.style.border = '2px solid var(--pronunciation-color)';
        recordingArea.style.textAlign = 'center';
        
        const recordingStatus = document.createElement('p');
        recordingStatus.id = `recordingStatus${exerciseIndex}`;
        recordingStatus.innerHTML = '<i class="fas fa-circle" style="color: red; animation: pulse 1s infinite;"></i> Grabando...';
        recordingStatus.style.fontWeight = '600';
        recordingStatus.style.color = 'var(--pronunciation-color)';
        
        const recordingTimer = document.createElement('p');
        recordingTimer.id = `recordingTimer${exerciseIndex}`;
        recordingTimer.textContent = '00:00';
        recordingTimer.style.fontSize = '1.2rem';
        recordingTimer.style.fontWeight = '700';
        recordingTimer.style.color = 'var(--text-primary)';
        
        recordingArea.appendChild(recordingStatus);
        recordingArea.appendChild(recordingTimer);
        
        // Área de reproducción
        const playbackArea = document.createElement('div');
        playbackArea.className = 'playback-area';
        playbackArea.id = `playbackArea${exerciseIndex}`;
        playbackArea.style.display = 'none';
        playbackArea.style.marginBottom = '1.5rem';
        playbackArea.style.padding = '1rem';
        playbackArea.style.backgroundColor = 'var(--background-color)';
        playbackArea.style.borderRadius = '8px';
        playbackArea.style.border = '2px solid var(--border-color)';
        playbackArea.style.textAlign = 'center';
        
        const playbackTitle = document.createElement('h5');
        playbackTitle.textContent = 'Tu Grabación:';
        playbackTitle.style.marginBottom = '1rem';
        playbackTitle.style.color = 'var(--text-primary)';
        
        const playbackControls = document.createElement('div');
        playbackControls.style.display = 'flex';
        playbackControls.style.justifyContent = 'center';
        playbackControls.style.gap = '1rem';
        
        const playRecordingBtn = document.createElement('button');
        playRecordingBtn.className = 'btn btn-secondary';
        playRecordingBtn.innerHTML = '<i class="fas fa-play"></i> Reproducir';
        playRecordingBtn.onclick = () => playRecording(exerciseIndex);
        
        const deleteRecordingBtn = document.createElement('button');
        deleteRecordingBtn.className = 'btn btn-secondary';
        deleteRecordingBtn.innerHTML = '<i class="fas fa-trash"></i> Eliminar';
        deleteRecordingBtn.onclick = () => deleteRecording(exerciseIndex);
        
        playbackControls.appendChild(playRecordingBtn);
        playbackControls.appendChild(deleteRecordingBtn);
        
        playbackArea.appendChild(playbackTitle);
        playbackArea.appendChild(playbackControls);
        
        // Área de evaluación
        const evaluationArea = document.createElement('div');
        evaluationArea.className = 'evaluation-area';
        evaluationArea.id = `evaluationArea${exerciseIndex}`;
        evaluationArea.style.display = 'none';
        evaluationArea.style.marginBottom = '1.5rem';
        evaluationArea.style.padding = '1rem';
        evaluationArea.style.backgroundColor = 'var(--background-color)';
        evaluationArea.style.borderRadius = '8px';
        evaluationArea.style.border = '2px solid var(--accent-color)';
        evaluationArea.style.textAlign = 'center';
        
        const evaluationTitle = document.createElement('h5');
        evaluationTitle.textContent = 'Evaluación de Pronunciación:';
        evaluationTitle.style.marginBottom = '1rem';
        evaluationTitle.style.color = 'var(--text-primary)';
        
        const evaluationScore = document.createElement('div');
        evaluationScore.id = `evaluationScore${exerciseIndex}`;
        evaluationScore.style.fontSize = '2rem';
        evaluationScore.style.fontWeight = '700';
        evaluationScore.style.marginBottom = '1rem';
        
        const evaluationFeedback = document.createElement('p');
        evaluationFeedback.id = `evaluationFeedback${exerciseIndex}`;
        evaluationFeedback.style.color = 'var(--text-secondary)';
        evaluationFeedback.style.marginBottom = '1rem';
        
        const evaluationTips = document.createElement('div');
        evaluationTips.id = `evaluationTips${exerciseIndex}`;
        evaluationTips.style.padding = '0.5rem';
        evaluationTips.style.backgroundColor = 'var(--surface-color)';
        evaluationTips.style.borderRadius = '4px';
        evaluationTips.style.borderLeft = '3px solid var(--accent-color)';
        
        evaluationArea.appendChild(evaluationTitle);
        evaluationArea.appendChild(evaluationScore);
        evaluationArea.appendChild(evaluationFeedback);
        evaluationArea.appendChild(evaluationTips);
        
        // Botón de evaluación
        const evaluateBtn = document.createElement('button');
        evaluateBtn.className = 'btn btn-primary';
        evaluateBtn.innerHTML = '<i class="fas fa-star"></i> Evaluar Pronunciación';
        evaluateBtn.style.marginBottom = '1rem';
        evaluateBtn.style.width = '100%';
        evaluateBtn.onclick = () => evaluatePronunciation(exerciseIndex, exercise);
        
        // Resultado del ejercicio
        const resultDiv = document.createElement('div');
        resultDiv.className = 'exercise-result';
        resultDiv.id = `pronunciationResult${exerciseIndex}`;
        resultDiv.style.display = 'none';
        resultDiv.style.padding = '1rem';
        resultDiv.style.borderRadius = '8px';
        resultDiv.style.marginTop = '1rem';
        resultDiv.style.textAlign = 'center';
        resultDiv.style.fontWeight = '600';
        
        // Ensamblar ejercicio
        exerciseDiv.appendChild(title);
        exerciseDiv.appendChild(wordDisplay);
        exerciseDiv.appendChild(audioControls);
        exerciseDiv.appendChild(recordingArea);
        exerciseDiv.appendChild(playbackArea);
        exerciseDiv.appendChild(evaluationArea);
        exerciseDiv.appendChild(evaluateBtn);
        exerciseDiv.appendChild(resultDiv);
        
        return exerciseDiv;
        
    } catch (error) {
        console.error("❌ Error al crear ejercicio de pronunciación individual:", error);
        return null;
    }
}

// Variables globales para grabación
let mediaRecorder = null;
let audioChunks = [];
let recordingStartTime = null;
let recordingTimer = null;
let currentRecordingExercise = null;

function startRecording(exerciseIndex) {
    try {
        console.log("🎤 Iniciando grabación para ejercicio", exerciseIndex);
        
        // Verificar si ya hay una grabación en curso
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            console.log("⚠️ Ya hay una grabación en curso, cancelando...");
            return;
        }
        
        // Verificar si MediaRecorder está disponible
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            showNotification('Tu navegador no soporta grabación de audio. Intenta con Chrome o Edge.', 'error');
            return;
        }
        
        // Obtener acceso al micrófono
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                // Configurar grabación
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];
                currentRecordingExercise = exerciseIndex;
                
                // Eventos de grabación
                mediaRecorder.ondataavailable = (event) => {
                    audioChunks.push(event.data);
                };
                
                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    
                    // Guardar URL del audio
                    window[`recordingAudio${exerciseIndex}`] = audioUrl;
                    
                    // Mostrar área de reproducción
                    const playbackArea = document.getElementById(`playbackArea${exerciseIndex}`);
                    if (playbackArea) {
                        playbackArea.style.display = 'block';
                    }
                    
                    // Ocultar área de grabación
                    const recordingArea = document.getElementById(`recordingArea${exerciseIndex}`);
                    if (recordingArea) {
                        recordingArea.style.display = 'none';
                    }
                    
                    // Detener timer
                    if (recordingTimer) {
                        clearInterval(recordingTimer);
                        recordingTimer = null;
                    }
                    
                    console.log("✅ Grabación completada para ejercicio", exerciseIndex);
                    
                    // Evaluar pronunciación automáticamente
                    evaluatePronunciationFromRecording(exerciseIndex, audioBlob);
                };
                
                // Iniciar grabación
                mediaRecorder.start();
                recordingStartTime = Date.now();
                
                // Mostrar área de grabación
                const recordingArea = document.getElementById(`recordingArea${exerciseIndex}`);
                if (recordingArea) {
                    recordingArea.style.display = 'block';
                }
                
                // Ocultar controles iniciales y mostrar área de grabación
                const initialControls = document.querySelector(`#recordingArea${exerciseIndex}`)?.previousElementSibling;
                if (initialControls && initialControls.style) {
                    initialControls.style.display = 'none';
                }
                
                // Iniciar timer
                recordingTimer = setInterval(() => {
                    const elapsed = Date.now() - recordingStartTime;
                    const seconds = Math.floor(elapsed / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const displaySeconds = seconds % 60;
                    
                    const timerDisplay = document.getElementById(`recordingTimer${exerciseIndex}`);
                    if (timerDisplay) {
                        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;
                    }
                }, 1000);
                
                console.log("🎤 Grabación iniciada");
                
            })
            .catch(error => {
                console.error("❌ Error al acceder al micrófono:", error);
                showNotification('Error al acceder al micrófono. Verifica los permisos.', 'error');
            });
            
    } catch (error) {
        console.error("❌ Error al iniciar grabación:", error);
    }
}

function playRecording(exerciseIndex) {
    try {
        const audioUrl = window[`recordingAudio${exerciseIndex}`];
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play().catch(error => {
                console.error("❌ Error al reproducir grabación:", error);
                showNotification('Error al reproducir la grabación', 'error');
            });
        } else {
            showNotification('No hay grabación disponible', 'warning');
        }
    } catch (error) {
        console.error("❌ Error al reproducir grabación:", error);
        showNotification('Error al reproducir la grabación', 'error');
    }
}

function evaluatePronunciationFromRecording(exerciseIndex, audioBlob) {
    try {
        console.log("🔍 Evaluando pronunciación para ejercicio", exerciseIndex);
        
        // Obtener el ejercicio actual de forma más robusta
        let currentExercise = null;
        
        // Intentar obtener desde practiceSystem
        if (window.practiceSystem?.currentSession?.exercises?.[exerciseIndex]) {
            currentExercise = window.practiceSystem.currentSession.exercises[exerciseIndex];
        }
        
        // Si no se encuentra, buscar en el DOM
        if (!currentExercise) {
            const exerciseElement = document.querySelector('.exercise-content');
            if (exerciseElement) {
                const wordElement = exerciseElement.querySelector('h5');
                if (wordElement) {
                    currentExercise = {
                        word: wordElement.textContent.trim(),
                        translation: exerciseElement.querySelector('p')?.textContent?.trim() || '',
                        pronunciation: exerciseElement.querySelector('p:last-of-type')?.textContent?.trim() || ''
                    };
                }
            }
        }
        
        if (!currentExercise || !currentExercise.word) {
            console.error("❌ No se encontró el ejercicio para evaluar");
            showNotification('Error: No se pudo obtener la información del ejercicio', 'error');
            return;
        }
        
        const expectedWord = currentExercise.word.toLowerCase().trim();
        console.log("📝 Palabra esperada:", expectedWord);
        
        // Mostrar indicador de evaluación
        showNotification('🔍 Evaluando tu pronunciación...', 'info', 2000);
        
        // Simular análisis de pronunciación (en una implementación real usarías Web Speech API o servicios de reconocimiento)
        setTimeout(() => {
            const pronunciationScore = analyzePronunciation(expectedWord);
            handlePronunciationResult(exerciseIndex, pronunciationScore, expectedWord);
        }, 2000);
        
    } catch (error) {
        console.error("❌ Error al evaluar pronunciación:", error);
        showNotification('Error al evaluar la pronunciación', 'error');
    }
}

function analyzePronunciation(expectedWord) {
    // Simulación de análisis de pronunciación
    // En una implementación real, aquí usarías Web Speech API o servicios de reconocimiento de voz
    
    // Generar puntuación aleatoria entre 60-95 para simular variabilidad
    const baseScore = Math.random() * 35 + 60;
    
    // Ajustar según la longitud de la palabra (palabras más largas son más difíciles)
    const lengthFactor = Math.max(0.8, 1 - (expectedWord.length - 3) * 0.05);
    
    // Ajustar según complejidad de la palabra
    const complexityFactor = expectedWord.includes('th') || expectedWord.includes('ch') || 
                           expectedWord.includes('sh') ? 0.85 : 1.0;
    
    const finalScore = Math.round(baseScore * lengthFactor * complexityFactor);
    
    console.log(`📊 Puntuación de pronunciación: ${finalScore}/100`);
    return Math.min(100, Math.max(0, finalScore));
}

function handlePronunciationResult(exerciseIndex, score, expectedWord) {
    try {
        const isCorrect = score >= 75; // Umbral de 75% para considerar correcto
        
        if (isCorrect) {
            // Pronunciación correcta
            showNotification(`🎉 ¡Excelente! Pronunciación correcta (${score}%)`, 'success', 3000);
            
            // Otorgar XP por pronunciación correcta
            if (typeof window.practiceSystem?.addXP === 'function') {
                window.practiceSystem.addXP(15); // 15 XP por pronunciación correcta
            }
            
            // Avanzar al siguiente ejercicio después de 2 segundos
            setTimeout(() => {
                if (typeof window.practiceSystem?.nextExercise === 'function') {
                    window.practiceSystem.nextExercise();
                }
            }, 2000);
            
        } else {
            // Pronunciación necesita mejora
            showNotification(`📚 Inténtalo de nuevo. Puntuación: ${score}%. Intenta pronunciar más claramente.`, 'warning', 4000);
            
            // Mostrar sugerencias de mejora
            setTimeout(() => {
                showPronunciationTips(expectedWord);
            }, 1000);
        }
        
        // Actualizar la interfaz con el resultado
        updatePronunciationResult(exerciseIndex, score, isCorrect);
        
    } catch (error) {
        console.error("❌ Error al manejar resultado de pronunciación:", error);
        showNotification('Error al procesar el resultado', 'error');
    }
}

function showPronunciationTips(word) {
    const tips = {
        'beautiful': 'Pronuncia "beau-ti-ful" con énfasis en la primera sílaba',
        'hello': 'Pronuncia "he-llo" con la "h" aspirada',
        'thank you': 'Pronuncia "thank you" con la "th" suave',
        'good morning': 'Pronuncia "good mor-ning" con pausa entre palabras',
        'how are you': 'Pronuncia "how are you" con entonación ascendente al final'
    };
    
    const tip = tips[word.toLowerCase()] || `Intenta pronunciar "${word}" más despacio y con claridad`;
    showNotification(`💡 Consejo: ${tip}`, 'info', 5000);
}

function updatePronunciationResult(exerciseIndex, score, isCorrect) {
    try {
        // Bloquear todos los botones de grabación y reproducción para este ejercicio
        const exerciseContainer = document.querySelector('.exercise-content');
        if (exerciseContainer) {
            const allButtons = exerciseContainer.querySelectorAll('button');
            allButtons.forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = '0.6';
                btn.style.cursor = 'not-allowed';
            });
        }
        
        const playbackArea = document.getElementById(`playbackArea${exerciseIndex}`);
        if (playbackArea) {
            // Agregar indicador de resultado
            const resultIndicator = document.createElement('div');
            resultIndicator.style.cssText = `
                margin-top: 1rem;
                padding: 0.5rem;
                border-radius: 6px;
                text-align: center;
                font-weight: bold;
                background: ${isCorrect ? 'var(--success-color)' : 'var(--warning-color)'};
                color: white;
            `;
            resultIndicator.innerHTML = `
                <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                ${isCorrect ? '¡Correcto!' : 'Inténtalo de nuevo'} (${score}%)
            `;
            
            playbackArea.appendChild(resultIndicator);
        }
    } catch (error) {
        console.error("❌ Error al actualizar resultado de pronunciación:", error);
    }
}

function stopRecording(exerciseIndex) {
    try {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            
            // Detener stream de audio
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
            
            // La transición de estados se maneja en el evento onstop del MediaRecorder
            
            console.log("⏹️ Grabación detenida");
        }
    } catch (error) {
        console.error("❌ Error al detener grabación:", error);
    }
}


function deleteRecording(exerciseIndex) {
    try {
        // Liberar URL del audio
        if (window[`recordingAudio${exerciseIndex}`]) {
            URL.revokeObjectURL(window[`recordingAudio${exerciseIndex}`]);
            delete window[`recordingAudio${exerciseIndex}`];
        }
        
        // Ocultar área de reproducción
        const playbackArea = document.getElementById(`playbackArea${exerciseIndex}`);
        if (playbackArea) {
            playbackArea.style.display = 'none';
        }
        
        console.log("🗑️ Grabación eliminada del ejercicio", exerciseIndex);
    } catch (error) {
        console.error("❌ Error al eliminar grabación:", error);
    }
}

function playCorrectPronunciation(word) {
    try {
        // Obtener el índice del ejercicio actual
        const exerciseIndex = window.practiceSystem?.currentSession?.currentExercise || 0;
        
        // Detener audio anterior si existe
        if (window.currentListeningAudio) {
            speechSynthesis.cancel();
        }
        
        // Crear nueva síntesis de voz
        const utterance = new SpeechSynthesisUtterance(word);
        
        // Configurar voz en inglés
        const voices = speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => 
            voice.lang.startsWith('en') && voice.name.includes('Google')
        ) || voices.find(voice => voice.lang.startsWith('en'));
        
        if (englishVoice) {
            utterance.voice = englishVoice;
        }
        
        // Usar el sistema de cola de audio con el índice correcto
        if (typeof window.playListeningAudio === 'function') {
            window.playListeningAudio(word, exerciseIndex);
        } else {
            // Fallback al método directo
            utterance.rate = 0.8;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            window.currentListeningAudio = utterance;
            speechSynthesis.speak(utterance);
        }
        
        console.log("🔊 Reproduciendo pronunciación correcta:", word, "ejercicio:", exerciseIndex);
        
    } catch (error) {
        console.error("❌ Error al reproducir pronunciación correcta:", error);
    }
}

function evaluatePronunciation(exerciseIndex, exercise) {
    try {
        console.log("⭐ Evaluando pronunciación del ejercicio", exerciseIndex);
        
        // Verificar si hay grabación
        if (!window[`recordingAudio${exerciseIndex}`]) {
            showNotification('Primero debes grabar tu pronunciación.', 'warning');
            return;
        }
        
        // Simular evaluación de IA (en una implementación real, aquí se enviaría el audio a un servicio de IA)
        const evaluationScore = Math.floor(Math.random() * 40) + 60; // Score entre 60-100
        const evaluationFeedback = getPronunciationFeedback(evaluationScore);
        const evaluationTips = exercise.tips;
        
        // Mostrar área de evaluación
        const evaluationArea = document.getElementById(`evaluationArea${exerciseIndex}`);
        if (evaluationArea) {
            evaluationArea.style.display = 'block';
        }
        
        // Actualizar elementos de evaluación
        const scoreElement = document.getElementById(`evaluationScore${exerciseIndex}`);
        const feedbackElement = document.getElementById(`evaluationFeedback${exerciseIndex}`);
        const tipsElement = document.getElementById(`evaluationTips${exerciseIndex}`);
        
        if (scoreElement) {
            scoreElement.textContent = `${evaluationScore}/100`;
            scoreElement.style.color = getScoreColor(evaluationScore);
        }
        
        if (feedbackElement) {
            feedbackElement.textContent = evaluationFeedback;
        }
        
        if (tipsElement) {
            tipsElement.innerHTML = `<strong>💡 Consejo:</strong> ${evaluationTips}`;
        }
        
        // Mostrar resultado
        const resultDiv = document.getElementById(`pronunciationResult${exerciseIndex}`);
        if (resultDiv) {
            resultDiv.style.display = 'block';
            resultDiv.style.background = 'rgba(16, 185, 129, 0.1)';
            resultDiv.style.color = 'var(--success-color)';
            resultDiv.style.border = '1px solid var(--success-color)';
            resultDiv.innerHTML = '<i class="fas fa-check-circle"></i> Pronunciación evaluada';
        }
        
        console.log("✅ Pronunciación evaluada:", evaluationScore, "/100");
        
    } catch (error) {
        console.error("❌ Error al evaluar pronunciación:", error);
    }
}

function getPronunciationFeedback(score) {
    if (score >= 90) return "¡Excelente pronunciación! Muy clara y natural.";
    if (score >= 80) return "Muy buena pronunciación. Solo pequeños ajustes necesarios.";
    if (score >= 70) return "Buena pronunciación. Practica un poco más para mejorar.";
    if (score >= 60) return "Pronunciación aceptable. Necesitas más práctica.";
    return "Pronunciación necesita mejora. Sigue practicando.";
}

function getScoreColor(score) {
    if (score >= 90) return 'var(--success-color)';
    if (score >= 80) return 'var(--warning-color)';
    if (score >= 70) return 'var(--accent-color)';
    return 'var(--error-color)';
}

function showPronunciationResults(exercises) {
    try {
        // Calcular resultados
        let totalScore = 0;
        let totalExercises = 0;
        
        exercises.forEach((exercise, index) => {
            const scoreElement = document.getElementById(`evaluationScore${index}`);
            if (scoreElement && scoreElement.textContent) {
                const score = parseInt(scoreElement.textContent.split('/')[0]);
                totalScore += score;
                totalExercises++;
            }
        });
        
        const averageScore = totalExercises > 0 ? Math.round(totalScore / totalExercises) : 0;
        
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
        
        if (averageScore >= 90) {
            resultMessage = '¡Excelente pronunciación!';
            resultIcon = '🎤';
            resultColor = 'var(--success-color)';
        } else if (averageScore >= 80) {
            resultMessage = '¡Muy buena pronunciación!';
            resultIcon = '🎵';
            resultColor = 'var(--warning-color)';
        } else if (averageScore >= 70) {
            resultMessage = '¡Buena pronunciación!';
            resultIcon = '🎧';
            resultColor = 'var(--accent-color)';
        } else {
            resultMessage = '¡Sigue practicando pronunciación!';
            resultIcon = '📢';
            resultColor = 'var(--error-color)';
        }
        
        resultsContent.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">${resultIcon}</div>
            <h3 style="color: ${resultColor}; margin-bottom: 1rem;">${resultMessage}</h3>
            <div style="font-size: 2rem; font-weight: bold; color: var(--primary-color); margin-bottom: 1rem;">
                ${averageScore}/100
            </div>
            <div style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 2rem;">
                Puntuación promedio
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
        
        console.log("✅ Resultados de pronunciación mostrados:", averageScore, "/100");
        
    } catch (error) {
        console.error("❌ Error al mostrar resultados de pronunciación:", error);
    }
}

function createSpacedRepetitionExerciseContent() {
    console.log("🧠 Creando ejercicios de repaso espaciado inteligente");
    try {
        // Crear contenedor de ejercicios
        const exerciseContainer = document.createElement('div');
        exerciseContainer.className = 'exercise-container';
        
        // Obtener palabras para repaso espaciado
        const wordsForReview = getWordsForSpacedRepetition();
        
        if (wordsForReview.length === 0) {
            return createNoSpacedRepetitionMessage();
        }
        
        console.log("📚 Palabras para repaso espaciado:", wordsForReview.length);
        
        // Crear ejercicios de repaso
        const exercises = [];
        const numExercises = Math.min(5, wordsForReview.length);
        
        for (let i = 0; i < numExercises; i++) {
            const exercise = createSingleSpacedRepetitionExercise(wordsForReview[i], i);
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
        resultsBtn.innerHTML = '<i class="fas fa-check"></i> Ver Resultados del Repaso';
        resultsBtn.onclick = () => showSpacedRepetitionResults(exercises);
        resultsBtn.style.marginTop = '2rem';
        resultsBtn.style.width = '100%';
        
        exerciseContainer.appendChild(resultsBtn);
        
        console.log("✅ Ejercicios de repaso espaciado creados:", exercises.length);
        return exerciseContainer;
        
    } catch (error) {
        console.error("❌ Error al crear ejercicios de repaso espaciado:", error);
        return createErrorMessage("Error al crear ejercicios de repaso espaciado");
    }
}

function getWordsForSpacedRepetition() {
    try {
        const wordsForReview = [];
        
        // Obtener palabras de todas las categorías
        if (window.VOCABULARY_DATABASE) {
            Object.keys(window.VOCABULARY_DATABASE).forEach(categoryKey => {
                if (categoryKey !== 'difficult-words') {
                    const categoryWords = window.VOCABULARY_DATABASE[categoryKey];
                    categoryWords.forEach(word => {
                        // Simular historial de repaso (en una implementación real, esto vendría de localStorage)
                        const reviewHistory = getWordReviewHistory(word.english);
                        const nextReviewDate = calculateNextReviewDate(reviewHistory);
                        
                        // Si la palabra está lista para repaso
                        if (isWordReadyForReview(nextReviewDate)) {
                            wordsForReview.push({
                                ...word,
                                category: categoryKey,
                                reviewHistory: reviewHistory,
                                nextReviewDate: nextReviewDate,
                                difficulty: calculateWordDifficulty(reviewHistory)
                            });
                        }
                    });
                }
            });
        }
        
        // Ordenar por prioridad de repaso (palabras más difíciles primero)
        wordsForReview.sort((a, b) => b.difficulty - a.difficulty);
        
        return wordsForReview;
        
    } catch (error) {
        console.error("❌ Error al obtener palabras para repaso espaciado:", error);
        return [];
    }
}

function getWordReviewHistory(word) {
    try {
        const email = (typeof window.getCurrentUserEmail === 'function') ? window.getCurrentUserEmail() : (window.appState?.currentUser?.email || 'guest');
        const namespacedKey = `wordReview_${email}_${word}`;
        const legacyKey = `wordReview_${word}`;

        // Intentar leer clave namespaced
        const storedNamespaced = localStorage.getItem(namespacedKey);
        if (storedNamespaced) {
            return JSON.parse(storedNamespaced);
        }

        // Migración: si existe clave legacy, usarla y copiarla al espacio con email
        const storedLegacy = localStorage.getItem(legacyKey);
        if (storedLegacy) {
            try {
                const legacyData = JSON.parse(storedLegacy);
                localStorage.setItem(namespacedKey, storedLegacy);
                console.log("🔄 Migrado historial de repaso legacy → namespaced:", namespacedKey);
                return legacyData;
            } catch (_) {
                // continuar a valor por defecto
            }
        }

        // Historial por defecto para palabras nuevas
        return {
            word: word,
            reviews: [],
            correctCount: 0,
            incorrectCount: 0,
            lastReviewDate: null,
            nextReviewDate: new Date().toISOString(),
            difficulty: 1.0
        };
    } catch (error) {
        console.error("❌ Error al obtener historial de repaso:", error);
        return {
            word: word,
            reviews: [],
            correctCount: 0,
            incorrectCount: 0,
            lastReviewDate: null,
            nextReviewDate: new Date().toISOString(),
            difficulty: 1.0
        };
    }
}

function calculateNextReviewDate(reviewHistory) {
    try {
        if (!reviewHistory || reviewHistory.reviews.length === 0) {
            // Primera vez: repasar en 1 día
            return new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        }
        
        const lastReview = reviewHistory.reviews[reviewHistory.reviews.length - 1];
        const lastReviewDate = new Date(lastReview.date);
        const difficulty = reviewHistory.difficulty;
        
        // Algoritmo de repaso espaciado basado en la dificultad
        let daysToAdd = 1;
        
        if (lastReview.wasCorrect) {
            // Si fue correcta, aumentar el intervalo
            if (reviewHistory.correctCount === 1) daysToAdd = 3;
            else if (reviewHistory.correctCount === 2) daysToAdd = 7;
            else if (reviewHistory.correctCount === 3) daysToAdd = 14;
            else if (reviewHistory.correctCount === 4) daysToAdd = 30;
            else daysToAdd = 60;
        } else {
            // Si fue incorrecta, repasar pronto
            daysToAdd = 1;
        }
        
        // Ajustar por dificultad
        daysToAdd = Math.max(1, Math.floor(daysToAdd * difficulty));
        
        return new Date(lastReviewDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000).toISOString();
        
    } catch (error) {
        console.error("❌ Error al calcular fecha de próximo repaso:", error);
        return new Date().toISOString();
    }
}

function isWordReadyForReview(nextReviewDate) {
    try {
        return new Date(nextReviewDate) <= new Date();
    } catch (error) {
        console.error("❌ Error al verificar si palabra está lista para repaso:", error);
        return false;
    }
}

function calculateWordDifficulty(reviewHistory) {
    try {
        if (!reviewHistory || reviewHistory.reviews.length === 0) {
            return 1.0; // Dificultad base
        }
        
        const totalReviews = reviewHistory.reviews.length;
        const correctRate = reviewHistory.correctCount / totalReviews;
        
        // Calcular dificultad basada en el historial
        let difficulty = 1.0;
        
        if (correctRate < 0.3) difficulty = 2.5; // Muy difícil
        else if (correctRate < 0.5) difficulty = 2.0; // Difícil
        else if (correctRate < 0.7) difficulty = 1.5; // Moderado
        else if (correctRate < 0.9) difficulty = 1.2; // Fácil
        else difficulty = 1.0; // Muy fácil
        
        // Ajustar por tiempo desde último repaso
        if (reviewHistory.lastReviewDate) {
            const daysSinceLastReview = (Date.now() - new Date(reviewHistory.lastReviewDate).getTime()) / (24 * 60 * 60 * 1000);
            if (daysSinceLastReview > 30) difficulty *= 1.5; // Aumentar dificultad si no se ha repasado en mucho tiempo
        }
        
        return Math.min(3.0, Math.max(0.5, difficulty)); // Limitar entre 0.5 y 3.0
        
    } catch (error) {
        console.error("❌ Error al calcular dificultad de palabra:", error);
        return 1.0;
    }
}

function createSingleSpacedRepetitionExercise(wordData, exerciseIndex) {
    try {
        // Crear contenedor del ejercicio
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'spaced-repetition-exercise';
        exerciseDiv.style.marginBottom = '2rem';
        exerciseDiv.style.padding = '1.5rem';
        exerciseDiv.style.border = '2px solid var(--border-color)';
        exerciseDiv.style.borderRadius = '12px';
        exerciseDiv.style.backgroundColor = 'var(--surface-color)';
        
        // Título del ejercicio
        const title = document.createElement('h4');
        title.innerHTML = `<i class="fas fa-brain"></i> Repaso Espaciado ${exerciseIndex + 1}`;
        title.style.marginBottom = '1rem';
        title.style.color = 'var(--primary-color)';
        
        // Información de la palabra
        const wordInfo = document.createElement('div');
        wordInfo.style.marginBottom = '1.5rem';
        wordInfo.style.padding = '1rem';
        wordInfo.style.backgroundColor = 'var(--background-color)';
        wordInfo.style.borderRadius = '8px';
        wordInfo.style.borderLeft = '4px solid var(--accent-color)';
        
        const wordText = document.createElement('h3');
        wordText.textContent = wordData.english;
        wordText.style.fontSize = '1.8rem';
        wordText.style.color = 'var(--primary-color)';
        wordText.style.marginBottom = '0.5rem';
        
        const translationText = document.createElement('p');
        translationText.textContent = wordData.spanish;
        translationText.style.fontSize = '1.1rem';
        translationText.style.color = 'var(--text-secondary)';
        translationText.style.marginBottom = '0.5rem';
        
        const pronunciationText = document.createElement('p');
        pronunciationText.textContent = wordData.pronunciation;
        pronunciationText.style.fontSize = '1rem';
        pronunciationText.style.color = 'var(--pronunciation-color)';
        pronunciationText.style.fontFamily = 'monospace';
        
        wordInfo.appendChild(wordText);
        wordInfo.appendChild(translationText);
        wordInfo.appendChild(pronunciationText);
        
        // Estadísticas de repaso
        const reviewStats = document.createElement('div');
        reviewStats.style.marginBottom = '1.5rem';
        reviewStats.style.padding = '0.5rem';
        reviewStats.style.backgroundColor = 'var(--surface-color)';
        reviewStats.style.borderRadius = '4px';
        reviewStats.style.border = '1px solid var(--border-color)';
        reviewStats.style.fontSize = '0.9rem';
        reviewStats.style.color = 'var(--text-secondary)';
        
        const totalReviews = wordData.reviewHistory.reviews.length;
        const correctRate = totalReviews > 0 ? Math.round((wordData.reviewHistory.correctCount / totalReviews) * 100) : 0;
        const difficultyLevel = wordData.difficulty >= 2.0 ? 'Difícil' : wordData.difficulty >= 1.5 ? 'Moderado' : 'Fácil';
        
        reviewStats.innerHTML = `
            <strong>📊 Estadísticas:</strong> ${totalReviews} repasos | 
            <strong>✅ Aciertos:</strong> ${correctRate}% | 
            <strong>🎯 Dificultad:</strong> ${difficultyLevel}
        `;
        
        // Pregunta
        const question = document.createElement('p');
        question.innerHTML = `<strong>¿Recuerdas qué significa "${wordData.english}"?</strong>`;
        question.style.fontSize = '1.1rem';
        question.style.marginBottom = '1.5rem';
        question.style.padding = '1rem';
        question.style.backgroundColor = 'var(--background-color)';
        question.style.borderRadius = '8px';
        
        // Opciones de calidad de recuerdo
        const qualityOptions = document.createElement('div');
        qualityOptions.className = 'quality-options';
        qualityOptions.style.marginBottom = '1.5rem';
        
        const qualityTitle = document.createElement('h5');
        qualityTitle.textContent = '¿Qué tan bien recordaste esta palabra?';
        qualityTitle.style.marginBottom = '1rem';
        qualityTitle.style.color = 'var(--text-primary)';
        
        const qualityGrid = document.createElement('div');
        qualityGrid.style.display = 'grid';
        qualityGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
        qualityGrid.style.gap = '0.5rem';
        
        const qualityLevels = [
            { key: 'again', label: 'Olvidé', icon: '😵', color: 'var(--error-color)' },
            { key: 'hard', label: 'Difícil', icon: '😰', color: 'var(--warning-color)' },
            { key: 'good', label: 'Bien', icon: '😊', color: 'var(--success-color)' },
            { key: 'easy', label: 'Fácil', icon: '😎', color: 'var(--info-color)' }
        ];
        
        qualityLevels.forEach(level => {
            const qualityBtn = document.createElement('button');
            qualityBtn.className = 'btn quality-btn';
            qualityBtn.dataset.quality = level.key;
            qualityBtn.dataset.exerciseIndex = exerciseIndex.toString();
            qualityBtn.style.cssText = `
                padding: 1rem 0.5rem;
                border: 2px solid ${level.color};
                background: var(--surface-color);
                color: ${level.color};
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
            `;
            
            qualityBtn.innerHTML = `
                <span style="font-size: 1.5rem;">${level.icon}</span>
                <span>${level.label}</span>
            `;
            
            qualityBtn.onclick = function() {
                selectQualityLevel(this, exerciseIndex, wordData);
            };
            
            qualityGrid.appendChild(qualityBtn);
        });
        
        qualityOptions.appendChild(qualityTitle);
        qualityOptions.appendChild(qualityGrid);
        
        // Resultado del ejercicio
        const resultDiv = document.createElement('div');
        resultDiv.className = 'exercise-result';
        resultDiv.id = `spacedRepetitionResult${exerciseIndex}`;
        resultDiv.style.display = 'none';
        resultDiv.style.padding = '1rem';
        resultDiv.style.borderRadius = '8px';
        resultDiv.style.marginTop = '1rem';
        resultDiv.style.textAlign = 'center';
        resultDiv.style.fontWeight = '600';
        
        // Ensamblar ejercicio
        exerciseDiv.appendChild(title);
        exerciseDiv.appendChild(wordInfo);
        exerciseDiv.appendChild(reviewStats);
        exerciseDiv.appendChild(question);
        exerciseDiv.appendChild(qualityOptions);
        exerciseDiv.appendChild(resultDiv);
        
        return exerciseDiv;
        
    } catch (error) {
        console.error("❌ Error al crear ejercicio de repaso espaciado individual:", error);
        return null;
    }
}

function selectQualityLevel(selectedButton, exerciseIndex, wordData) {
    try {
        const quality = selectedButton.dataset.quality;
        const resultDiv = document.getElementById(`spacedRepetitionResult${exerciseIndex}`);
        
        // Deshabilitar todos los botones de calidad
        const exerciseDiv = selectedButton.closest('.spaced-repetition-exercise');
        const allQualityBtns = exerciseDiv.querySelectorAll('.quality-btn');
        allQualityBtns.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.6';
        });
        
        // Marcar botón seleccionado
        selectedButton.style.transform = 'scale(1.05)';
        selectedButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        
        // Actualizar historial de repaso
        updateWordReviewHistory(wordData.english, quality);
        
        // Mostrar resultado
        resultDiv.style.display = 'block';
        resultDiv.style.background = 'rgba(16, 185, 129, 0.1)';
        resultDiv.style.color = 'var(--success-color)';
        resultDiv.style.border = '1px solid var(--success-color)';
        
        const qualityMessages = {
            'again': '😵 Palabra marcada para repaso inmediato',
            'hard': '😰 Palabra marcada como difícil',
            'good': '😊 ¡Bien recordado!',
            'easy': '😎 ¡Excelente memoria!'
        };
        
        resultDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${qualityMessages[quality]}`;
        
        console.log("✅ Calidad seleccionada para repaso espaciado:", quality, "ejercicio", exerciseIndex);
        
    } catch (error) {
        console.error("❌ Error al seleccionar nivel de calidad:", error);
    }
}

function updateWordReviewHistory(word, quality) {
    try {
        const history = getWordReviewHistory(word);
        if (!history) return;

        // Agregar nueva revisión
        const newReview = {
            date: new Date().toISOString(),
            quality: quality,
            wasCorrect: quality === 'good' || quality === 'easy'
        };

        history.reviews.push(newReview);
        history.lastReviewDate = new Date().toISOString();

        // Actualizar contadores
        if (newReview.wasCorrect) {
            history.correctCount++;
        } else {
            history.incorrectCount++;
        }

        // Calcular próxima fecha de repaso
        history.nextReviewDate = calculateNextReviewDate(history);

        // Actualizar dificultad
        history.difficulty = calculateWordDifficulty(history);

        // Guardar en localStorage con clave por usuario
        const email = (typeof window.getCurrentUserEmail === 'function') ? window.getCurrentUserEmail() : (window.appState?.currentUser?.email || 'guest');
        const namespacedKey = `wordReview_${email}_${word}`;
        localStorage.setItem(namespacedKey, JSON.stringify(history));

        console.log("💾 Historial de repaso actualizado para:", word, "calidad:", quality, "usuario:", email);
    } catch (error) {
        console.error("❌ Error al actualizar historial de repaso:", error);
    }
}

function createNoSpacedRepetitionMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'exercise-container';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.padding = '3rem';
    
    messageDiv.innerHTML = `
        <i class="fas fa-calendar-check" style="font-size: 3rem; color: var(--info-color); margin-bottom: 1rem;"></i>
        <h3>No hay palabras para repaso</h3>
        <p>Completa algunos ejercicios de vocabulario primero para que el sistema de repaso espaciado pueda programar revisiones.</p>
        <button class="btn btn-primary" onclick="document.querySelector('.nav-tab[data-tab=\"vocabulary\"]').click()">
            <i class="fas fa-book-open"></i> Ir a Vocabulario
        </button>
    `;
    
    return messageDiv;
}

function showSpacedRepetitionResults(exercises) {
    try {
        // Calcular resultados
        let totalExercises = exercises.length;
        let completedExercises = 0;
        
        exercises.forEach((exercise, index) => {
            const resultDiv = document.getElementById(`spacedRepetitionResult${index}`);
            if (resultDiv && resultDiv.style.display !== 'none') {
                completedExercises++;
            }
        });
        
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
        
        resultsContent.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">🧠</div>
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Repaso Espaciado Completado</h3>
            <div style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 2rem;">
                Has completado ${completedExercises} de ${totalExercises} ejercicios de repaso
            </div>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                El sistema ha actualizado tu historial de repaso y programado las próximas revisiones de manera inteligente.
            </p>
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
        
        console.log("✅ Resultados de repaso espaciado mostrados:", completedExercises, "de", totalExercises, "completados");
        
    } catch (error) {
        console.error("❌ Error al mostrar resultados de repaso espaciado:", error);
    }
}

function createDefaultExerciseContent(mode) {
    return createErrorMessage(`Ejercicios de ${mode} no implementados aún`);
}

// Sistema de conversaciones con IA generativa
class ConversationAI {
    constructor() {
        this.conversationHistory = [];
        this.currentScenario = null;
        this.userLevel = 1;
        this.userMCER = 'A1';
        this.conversationContext = '';
    }
    
    initializeConversation(scenarioId) {
        try {
            console.log("🤖 Inicializando conversación con IA para escenario:", scenarioId);
            
            // Obtener escenario
            if (window.CONVERSATION_SCENARIOS) {
                this.currentScenario = window.CONVERSATION_SCENARIOS.find(s => s.id === scenarioId);
            }
            
            if (!this.currentScenario) {
                this.currentScenario = {
                    id: 1,
                    title: "Conversación General",
                    description: "Practica inglés en una conversación libre",
                    context: "You are having a casual conversation in English. Keep responses natural and appropriate for the user's level."
                };
            }
            
            // Obtener nivel del usuario
            if (window.appState) {
                this.userLevel = window.appState.currentLevel || 1;
                this.userMCER = this.getUserLevelMCER(this.userLevel);
            }
            
            // Configurar contexto de la conversación
            this.conversationContext = this.generateConversationContext();
            
            // Limpiar historial
            this.conversationHistory = [];
            
            console.log("✅ Conversación inicializada. Nivel usuario:", this.userMCER);
            
        } catch (error) {
            console.error("❌ Error al inicializar conversación:", error);
        }
    }
    
    getUserLevelMCER(level) {
        if (level <= 2) return 'A1';
        if (level <= 4) return 'A2';
        if (level <= 6) return 'B1';
        if (level <= 8) return 'B2';
        return 'C1';
    }
    
    updateUserLevel() {
        try {
            if (window.appState) {
                this.userLevel = window.appState.currentLevel || 1;
                this.userMCER = this.getUserLevelMCER(this.userLevel);
                console.log("🔄 Nivel actualizado:", this.userLevel, "MCER:", this.userMCER);
            }
        } catch (error) {
            console.error("❌ Error al actualizar nivel del usuario:", error);
        }
    }
    
    generateConversationContext() {
        const contexts = {
            'A1': "You are a friendly English teacher helping a beginner student. Use simple vocabulary and short sentences. Be encouraging and patient.",
            'A2': "You are a helpful conversation partner for an elementary English learner. Use basic vocabulary and simple grammar structures. Be supportive and clear.",
            'B1': "You are an engaging conversation partner for an intermediate English learner. Use varied vocabulary and common expressions. Be conversational and helpful.",
            'B2': "You are a natural conversation partner for an upper-intermediate English learner. Use rich vocabulary and complex structures. Be engaging and challenging.",
            'C1': "You are an advanced conversation partner. Use sophisticated language and complex ideas. Be intellectually stimulating and challenging."
        };
        
        return contexts[this.userMCER] || contexts['A1'];
    }
    
    generateResponse(userMessage) {
        try {
            console.log("🤖 Generando respuesta para:", userMessage);
            
            // Agregar mensaje del usuario al historial
            this.conversationHistory.push({
                role: 'user',
                content: userMessage,
                timestamp: new Date().toISOString()
            });
            
            // Generar respuesta contextual usando IA
            const aiResponse = this.createContextualResponse(userMessage);
            
            // Agregar respuesta de la IA al historial
            this.conversationHistory.push({
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date().toISOString()
            });
            
            console.log("✅ Respuesta generada:", aiResponse);
            return aiResponse;
            
        } catch (error) {
            console.error("❌ Error al generar respuesta:", error);
            return "I'm sorry, I'm having trouble understanding. Could you please repeat that?";
        }
    }
    
    createContextualResponse(userMessage) {
        try {
            // Analizar el mensaje del usuario
            const messageAnalysis = this.analyzeUserMessage(userMessage);
            
            // Generar respuesta basada en el análisis
            let response = '';
            
            // Respuestas para diferentes tipos de mensajes
            if (messageAnalysis.isGreeting) {
                response = this.generateGreetingResponse();
            } else if (messageAnalysis.isQuestion) {
                response = this.generateQuestionResponse(messageAnalysis);
            } else if (messageAnalysis.isStatement) {
                response = this.generateStatementResponse(messageAnalysis);
            } else if (messageAnalysis.isFarewell) {
                response = this.generateFarewellResponse();
            } else {
                response = this.generateGeneralResponse(messageAnalysis);
            }
            
            // Ajustar respuesta según el nivel del usuario
            response = this.adjustResponseForLevel(response);
            
            // Agregar elementos de conversación natural
            response = this.addConversationalElements(response);
            
            return response;
            
        } catch (error) {
            console.error("❌ Error al crear respuesta contextual:", error);
            return "That's interesting! Tell me more about that.";
        }
    }
    
    analyzeUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        return {
            isGreeting: this.isGreeting(lowerMessage),
            isQuestion: this.isQuestion(lowerMessage),
            isStatement: this.isStatement(lowerMessage),
            isFarewell: this.isFarewell(lowerMessage),
            hasGrammarErrors: this.detectGrammarErrors(message),
            vocabularyLevel: this.assessVocabularyLevel(message),
            sentiment: this.analyzeSentiment(lowerMessage),
            topics: this.extractTopics(lowerMessage)
        };
    }
    
    isGreeting(message) {
        const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy'];
        return greetings.some(greeting => message.includes(greeting));
    }
    
    isQuestion(message) {
        const questionWords = ['what', 'when', 'where', 'who', 'why', 'how', 'can', 'could', 'would', 'do', 'does', 'is', 'are'];
        return questionWords.some(word => message.includes(word)) || message.includes('?');
    }
    
    isStatement(message) {
        return !this.isQuestion(message) && !this.isGreeting(message) && !this.isFarewell(message);
    }
    
    isFarewell(message) {
        const farewells = ['goodbye', 'bye', 'see you', 'take care', 'have a nice day', 'good night'];
        return farewells.some(farewell => message.includes(farewell));
    }
    
    detectGrammarErrors(message) {
        // Detección básica de errores gramaticales comunes
        const errors = [];
        
        // Verificar mayúsculas al inicio de oraciones
        if (message.length > 0 && message[0] !== message[0].toUpperCase()) {
            errors.push('missing_capitalization');
        }
        
        // Verificar signos de puntuación
        if (message.length > 0 && !message.endsWith('.') && !message.endsWith('!') && !message.endsWith('?')) {
            errors.push('missing_punctuation');
        }
        
        return errors;
    }
    
    assessVocabularyLevel(message) {
        const words = message.split(' ');
        const simpleWords = ['hello', 'hi', 'good', 'bad', 'big', 'small', 'yes', 'no'];
        const intermediateWords = ['interesting', 'beautiful', 'wonderful', 'amazing', 'fantastic'];
        const advancedWords = ['extraordinary', 'magnificent', 'phenomenal', 'exceptional', 'remarkable'];
        
        let level = 'basic';
        
        if (advancedWords.some(word => message.toLowerCase().includes(word))) {
            level = 'advanced';
        } else if (intermediateWords.some(word => message.toLowerCase().includes(word))) {
            level = 'intermediate';
        }
        
        return level;
    }
    
    analyzeSentiment(message) {
        const positiveWords = ['good', 'great', 'excellent', 'wonderful', 'amazing', 'love', 'like', 'happy', 'nice'];
        const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'sad', 'angry', 'upset'];
        
        const positiveCount = positiveWords.filter(word => message.includes(word)).length;
        const negativeCount = negativeWords.filter(word => message.includes(word)).length;
        
        if (positiveCount > negativeCount) return 'positive';
        if (negativeCount > positiveCount) return 'negative';
        return 'neutral';
    }
    
    extractTopics(message) {
        const topics = [];
        
        if (message.includes('family') || message.includes('mother') || message.includes('father')) topics.push('family');
        if (message.includes('work') || message.includes('job') || message.includes('career')) topics.push('work');
        if (message.includes('food') || message.includes('eat') || message.includes('restaurant')) topics.push('food');
        if (message.includes('travel') || message.includes('trip') || message.includes('vacation')) topics.push('travel');
        if (message.includes('weather') || message.includes('sunny') || message.includes('rainy')) topics.push('weather');
        if (message.includes('hobby') || message.includes('sport') || message.includes('music')) topics.push('hobbies');
        
        return topics;
    }
    
    generateGreetingResponse() {
        const responses = [
            "Hello! How are you doing today?",
            "Hi there! It's great to see you!",
            "Hey! How's your day going so far?",
            "Good to see you! How have you been?",
            "Hello! What's new with you today?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    generateQuestionResponse(analysis) {
        if (analysis.topics.includes('family')) {
            return "That's a great question about family! Families are so important. What would you like to know?";
        } else if (analysis.topics.includes('work')) {
            return "Work can be both challenging and rewarding. Tell me more about your experience!";
        } else if (analysis.topics.includes('food')) {
            return "Food is such a wonderful topic! Everyone has different tastes. What's your favorite cuisine?";
        } else {
            return "That's an interesting question! I'd love to hear more about your thoughts on this.";
        }
    }
    
    generateStatementResponse(analysis) {
        let response = "That's really interesting! ";
        
        if (analysis.sentiment === 'positive') {
            response += "I'm glad to hear that. It sounds like you're having a great time!";
        } else if (analysis.sentiment === 'negative') {
            response += "I'm sorry to hear that. Is there anything I can help you with?";
        } else {
            response += "Tell me more about that. I'd love to learn more!";
        }
        
        return response;
    }
    
    generateFarewellResponse() {
        const responses = [
            "Goodbye! It was great talking with you today!",
            "See you later! Have a wonderful day!",
            "Take care! I enjoyed our conversation!",
            "Bye for now! Come back soon!",
            "Have a great day! It was nice chatting with you!"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    generateGeneralResponse(analysis) {
        let response = "That's really interesting! ";
        
        if (analysis.vocabularyLevel === 'advanced') {
            response += "You have such a rich vocabulary! I'm impressed by your English skills.";
        } else if (analysis.vocabularyLevel === 'intermediate') {
            response += "You're making great progress with your English! Keep up the good work.";
        } else {
            response += "You're doing well with the basics! Practice makes perfect.";
        }
        
        if (analysis.topics.length > 0) {
            response += ` I love talking about ${analysis.topics[0]} too!`;
        }
        
        return response;
    }
    
    adjustResponseForLevel(response) {
        if (this.userMCER === 'A1') {
            // Simplificar para principiantes
            return response
                .replace(/really/g, 'very')
                .replace(/interesting/g, 'good')
                .replace(/wonderful/g, 'nice')
                .replace(/fantastic/g, 'great');
        } else if (this.userMCER === 'A2') {
            // Mantener simple pero con más variedad
            return response
                .replace(/extraordinary/g, 'amazing')
                .replace(/phenomenal/g, 'wonderful');
        }
        
        return response;
    }
    
    addConversationalElements(response) {
        // Agregar elementos naturales de conversación
        const conversationalElements = [
            "You know, ",
            "Actually, ",
            "Well, ",
            "I think ",
            "In my opinion, "
        ];
        
        // 30% de probabilidad de agregar elemento conversacional
        if (Math.random() < 0.3) {
            const element = conversationalElements[Math.floor(Math.random() * conversationalElements.length)];
            response = element + response.toLowerCase();
        }
        
        return response;
    }
    
    getConversationSummary() {
        try {
            const summary = {
                totalMessages: this.conversationHistory.length,
                userMessages: this.conversationHistory.filter(msg => msg.role === 'user').length,
                aiMessages: this.conversationHistory.filter(msg => msg.role === 'assistant').length,
                topics: this.extractAllTopics(),
                vocabularyLevel: this.assessOverallVocabularyLevel(),
                grammarErrors: this.countGrammarErrors(),
                duration: this.calculateConversationDuration()
            };
            
            return summary;
            
        } catch (error) {
            console.error("❌ Error al generar resumen de conversación:", error);
            return null;
        }
    }
    
    extractAllTopics() {
        const allTopics = new Set();
        this.conversationHistory.forEach(msg => {
            if (msg.role === 'user') {
                const topics = this.extractTopics(msg.content.toLowerCase());
                topics.forEach(topic => allTopics.add(topic));
            }
        });
        return Array.from(allTopics);
    }
    
    assessOverallVocabularyLevel() {
        let totalLevel = 0;
        let messageCount = 0;
        
        this.conversationHistory.forEach(msg => {
            if (msg.role === 'user') {
                const level = this.assessVocabularyLevel(msg.content);
                if (level === 'basic') totalLevel += 1;
                else if (level === 'intermediate') totalLevel += 2;
                else if (level === 'advanced') totalLevel += 3;
                messageCount++;
            }
        });
        
        if (messageCount === 0) return 'basic';
        
        const averageLevel = totalLevel / messageCount;
        if (averageLevel < 1.5) return 'basic';
        if (averageLevel < 2.5) return 'intermediate';
        return 'advanced';
    }
    
    countGrammarErrors() {
        let totalErrors = 0;
        this.conversationHistory.forEach(msg => {
            if (msg.role === 'user') {
                const errors = this.detectGrammarErrors(msg.content);
                totalErrors += errors.length;
            }
        });
        return totalErrors;
    }
    
    calculateConversationDuration() {
        if (this.conversationHistory.length < 2) return 0;
        
        const startTime = new Date(this.conversationHistory[0].timestamp);
        const endTime = new Date(this.conversationHistory[this.conversationHistory.length - 1].timestamp);
        
        return Math.round((endTime - startTime) / 1000); // en segundos
    }
}

// Instancia global de la IA de conversación
window.conversationAI = new ConversationAI();

// Función para iniciar conversación con IA
function startAIConversation(scenarioId = 1) {
    try {
        console.log("🚀 Iniciando conversación con IA, escenario:", scenarioId);
        
        // Inicializar IA de conversación
        if (window.conversationAI) {
            window.conversationAI.initializeConversation(scenarioId);
        }
        
        // Cambiar a la pestaña "Aplicar"
        const applyTab = document.querySelector('.nav-tab[data-tab="apply"]');
        if (applyTab) {
            applyTab.click();
        }
        
        // Esperar a que se cargue la sección
        setTimeout(() => {
            loadAIConversationInterface(scenarioId);
        }, 300);
        
    } catch (error) {
        console.error("❌ Error al iniciar conversación con IA:", error);
    }
}

function loadAIConversationInterface(scenarioId) {
    try {
        const conversationArea = document.getElementById('chatMessages');
        const scenarioTitle = document.getElementById('scenarioTitle');
        const scenarioDescription = document.getElementById('scenarioDescription');
        
        if (!conversationArea) {
            console.error("❌ Área de chat no encontrada");
            return;
        }
        
        // Limpiar conversación anterior
        conversationArea.innerHTML = '';
        
        // Configurar título y descripción
        if (scenarioTitle && scenarioDescription) {
            if (window.conversationAI && window.conversationAI.currentScenario) {
                scenarioTitle.textContent = window.conversationAI.currentScenario.title;
                scenarioDescription.textContent = window.conversationAI.currentScenario.description;
            }
        }
        
        // Agregar mensaje de bienvenida de la IA
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'message bot';
        welcomeMessage.innerHTML = `
            <div class="ai-avatar">🤖</div>
            <div class="message-content">
                <p>Hello! I'm your AI conversation partner. I'm here to help you practice English in a natural way.</p>
                <p>Just type your message and I'll respond appropriately for your level. Let's start chatting!</p>
            </div>
        `;
        
        conversationArea.appendChild(welcomeMessage);
        conversationArea.scrollTop = conversationArea.scrollHeight;
        
        // Configurar input de chat
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendMessageBtn');
        
        if (chatInput && sendButton) {
            // Event listener para enviar con Enter
            chatInput.onkeypress = (e) => {
                if (e.key === 'Enter') {
                    sendAIMessage();
                }
            };
            
            // Event listener para botón de enviar
            sendButton.onclick = sendAIMessage;
        }
        
        console.log("✅ Interfaz de conversación con IA cargada");
        
    } catch (error) {
        console.error("❌ Error al cargar interfaz de conversación con IA:", error);
    }
}

function sendAIMessage() {
    try {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        // Agregar mensaje del usuario
        addAIMessageToChat(message, 'user');
        
        // Limpiar input
        chatInput.value = '';
        
        // Actualizar progreso del módulo "Aplicar"
        if (window.moduleProgressSystem && window.appState) {
            const currentLevel = window.appState.currentLevel || 1;
            const applyProgress = {
                progress: 75, // 75% por participar en conversación
                totalTasks: 1,
                completedTasks: 0,
                completed: false
            };
            
            window.moduleProgressSystem.updateModuleProgress('apply', currentLevel, applyProgress);
            console.log("💬 Progreso de módulo 'Aplicar' actualizado:", applyProgress);
        }
        
        // Generar respuesta de la IA
        setTimeout(() => {
            if (window.conversationAI) {
                const aiResponse = window.conversationAI.generateResponse(message);
                addAIMessageToChat(aiResponse, 'bot');
            } else {
                addAIMessageToChat("I'm sorry, I'm having trouble responding right now. Please try again.", 'bot');
            }
        }, 1000);
        
    } catch (error) {
        console.error("❌ Error al enviar mensaje:", error);
    }
}

function addAIMessageToChat(text, type) {
    try {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        if (type === 'user') {
            messageDiv.innerHTML = `
                <div class="user-avatar">👤</div>
                <div class="message-content">
                    <p>${text}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="ai-avatar">🤖</div>
                <div class="message-content">
                    <p>${text}</p>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
    } catch (error) {
        console.error("❌ Error al agregar mensaje al chat:", error);
    }
}

// Función para mostrar resumen de conversación
function showConversationSummary() {
    try {
        if (!window.conversationAI) return;
        
        const summary = window.conversationAI.getConversationSummary();
        if (!summary) return;
        
        // Crear modal de resumen
        const summaryModal = document.createElement('div');
        summaryModal.style.cssText = `
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
        
        const summaryContent = document.createElement('div');
        summaryContent.style.cssText = `
            background: var(--surface-color);
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        summaryContent.innerHTML = `
            <h3 style="color: var(--primary-color); margin-bottom: 1.5rem;">
                <i class="fas fa-chart-bar"></i> Resumen de Conversación
            </h3>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem;">
                <div style="background: var(--background-color); padding: 1rem; border-radius: 8px;">
                    <h4 style="color: var(--text-secondary); margin-bottom: 0.5rem;">Total Mensajes</h4>
                    <p style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">${summary.totalMessages}</p>
                </div>
                
                <div style="background: var(--background-color); padding: 1rem; border-radius: 8px;">
                    <h4 style="color: var(--text-secondary); margin-bottom: 0.5rem;">Duración</h4>
                    <p style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">${summary.duration}s</p>
                </div>
                
                <div style="background: var(--background-color); padding: 1rem; border-radius: 8px;">
                    <h4 style="color: var(--text-secondary); margin-bottom: 0.5rem;">Nivel Vocabulario</h4>
                    <p style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">${summary.vocabularyLevel}</p>
                </div>
                
                <div style="background: var(--background-color); padding: 1rem; border-radius: 8px;">
                    <h4 style="color: var(--text-secondary); margin-bottom: 0.5rem;">Errores Gramaticales</h4>
                    <p style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">${summary.grammarErrors}</p>
                </div>
            </div>
            
            <div style="text-align: left; margin-bottom: 2rem;">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Temas Conversados:</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${summary.topics.map(topic => 
                        `<span style="background: var(--accent-color); color: white; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.9rem;">${topic}</span>`
                    ).join('')}
                </div>
            </div>
            
            <button class="btn btn-primary" onclick="this.closest('.results-modal').remove()">
                <i class="fas fa-check"></i> Continuar
            </button>
        `;
        
        summaryModal.appendChild(summaryContent);
        summaryModal.className = 'results-modal';
        document.body.appendChild(summaryModal);
        
        console.log("✅ Resumen de conversación mostrado");
        
    } catch (error) {
        console.error("❌ Error al mostrar resumen de conversación:", error);
    }
}

// Exportar funciones de IA de conversación
window.startAIConversation = startAIConversation;
window.loadAIConversationInterface = loadAIConversationInterface;
window.sendAIMessage = sendAIMessage;
window.addAIMessageToChat = addAIMessageToChat;
window.showConversationSummary = showConversationSummary;

// Sistema de práctica integrado y encadenado
class PracticeSystem {
    constructor() {
        this.currentUser = null;
        this.userLevel = 1;
        this.userMCER = 'A1';
        this.practiceHistory = [];
        this.currentSession = null;
        this.unlockedCategories = new Set();
        this.practiceStreak = 0;
        this.sessionXP = 0;
        this.dailyGoal = 100; // XP diario objetivo
    }
    
    initialize(userData) {
        try {
            console.log("🚀 Inicializando sistema de práctica integrado");
            
            this.currentUser = userData;
            this.userLevel = userData.currentLevel || 1;
            this.userMCER = this.getUserLevelMCER(this.userLevel);
            
            // Desbloquear categorías según el nivel
            this.unlockCategoriesByLevel();
            
            // Cargar historial de práctica
            this.loadPracticeHistory();
            
            console.log("✅ Sistema de práctica inicializado. Nivel:", this.userMCER);
            
        } catch (error) {
            console.error("❌ Error al inicializar sistema de práctica:", error);
        }
    }
    
    getUserLevelMCER(level) {
        if (level <= 2) return 'A1';
        if (level <= 4) return 'A2';
        if (level <= 6) return 'B1';
        if (level <= 8) return 'B2';
        return 'C1';
    }
    
    updateUserLevel() {
        try {
            if (window.appState) {
                this.userLevel = window.appState.currentLevel || 1;
                this.userMCER = this.getUserLevelMCER(this.userLevel);
                console.log("🔄 Nivel actualizado:", this.userLevel, "MCER:", this.userMCER);
            }
        } catch (error) {
            console.error("❌ Error al actualizar nivel del usuario:", error);
        }
    }
    
    syncWithGlobalProgress() {
        try {
            if (window.appState) {
                // Sincronizar con la lección actual del sistema global
                const currentLesson = window.appState.currentLesson || 0;
                const currentLevel = window.appState.currentLevel || 1;
                
                console.log("🔄 Sincronizando práctica con progreso global:");
                console.log("📚 Lección actual:", currentLesson);
                console.log("📊 Nivel actual:", currentLevel);
                
                // Actualizar el contexto de práctica con la lección actual
                this.currentSession = {
                    ...this.currentSession,
                    currentLesson: currentLesson,
                    userLevel: currentLevel,
                    userMCER: this.userMCER
                };
                
                console.log("✅ Práctica sincronizada con progreso global");
            }
        } catch (error) {
            console.error("❌ Error al sincronizar con progreso global:", error);
        }
    }
    
    unlockCategoriesByLevel() {
        // Limpiar categorías desbloqueadas
        this.unlockedCategories.clear();
        
        // Desbloquear categorías según el nivel MCER
        if (this.userMCER === 'A1') {
            ['greetings', 'numbers', 'colors', 'family', 'time'].forEach(cat => 
                this.unlockedCategories.add(cat)
            );
        } else if (this.userMCER === 'A2') {
            ['greetings', 'numbers', 'colors', 'family', 'time', 'food', 'animals', 'weather', 'body', 'clothes', 'house', 'transport', 'shopping'].forEach(cat => 
                this.unlockedCategories.add(cat)
            );
        } else if (this.userMCER === 'B1') {
            ['greetings', 'numbers', 'colors', 'family', 'time', 'food', 'animals', 'weather', 'body', 'clothes', 'house', 'transport', 'shopping', 'work', 'school', 'health', 'technology', 'sports', 'entertainment', 'emotions'].forEach(cat => 
                this.unlockedCategories.add(cat)
            );
        } else if (this.userMCER === 'B2') {
            // Todas las categorías excepto las más avanzadas
            ['greetings', 'numbers', 'colors', 'family', 'time', 'food', 'animals', 'weather', 'body', 'clothes', 'house', 'transport', 'shopping', 'work', 'school', 'health', 'technology', 'sports', 'entertainment', 'emotions', 'business', 'politics', 'science', 'art'].forEach(cat => 
                this.unlockedCategories.add(cat)
            );
        } else {
            // Nivel C1: todas las categorías
            ['greetings', 'numbers', 'colors', 'family', 'time', 'food', 'animals', 'weather', 'body', 'clothes', 'house', 'transport', 'shopping', 'work', 'school', 'health', 'technology', 'sports', 'entertainment', 'emotions', 'business', 'politics', 'science', 'art'].forEach(cat => 
                this.unlockedCategories.add(cat)
            );
        }
        
        // Siempre desbloquear palabras difíciles
        this.unlockedCategories.add('difficult-words');
        
        console.log("🔓 Categorías desbloqueadas:", Array.from(this.unlockedCategories));
    }
    
    loadPracticeHistory() {
        try {
            const stored = localStorage.getItem(`practiceHistory_${this.currentUser.email}`);
            if (stored) {
                this.practiceHistory = JSON.parse(stored);
            }
        } catch (error) {
            console.error("❌ Error al cargar historial de práctica:", error);
        }
    }
    
    savePracticeHistory() {
        try {
            localStorage.setItem(`practiceHistory_${this.currentUser.email}`, JSON.stringify(this.practiceHistory));
        } catch (error) {
            console.error("❌ Error al guardar historial de práctica:", error);
        }
    }
    
    startPracticeSession(mode, categoryKey = null) {
        try {
            // Actualizar nivel del usuario antes de iniciar
            this.updateUserLevel();
            
            console.log("🎯 Iniciando sesión de práctica:", mode, "categoría:", categoryKey);
            console.log("📊 Nivel del usuario:", this.userMCER || 'A1');
            
            // Sincronizar con el progreso global de lecciones
            this.syncWithGlobalProgress();
            
            // Limpiar cola de audio anterior
            if (typeof window.clearAudioQueue === 'function') {
                window.clearAudioQueue();
                console.log("🗑️ Cola de audio limpiada al iniciar nueva sesión");
            }
            
            this.currentSession = {
                id: Date.now(),
                mode: mode,
                categoryKey: categoryKey,
                startTime: new Date().toISOString(),
                exercises: [],
                currentExercise: 0,
                correctAnswers: 0,
                totalAnswers: 0,
                xpEarned: 0
            };
            
            // Generar ejercicios según el modo y categoría
            this.generateExercises(mode, categoryKey);
            
            console.log("✅ Sesión de práctica iniciada");
            
        } catch (error) {
            console.error("❌ Error al iniciar sesión de práctica:", error);
        }
    }
    
    generateExercises(mode, categoryKey) {
        try {
            let exercises = [];
            
            switch (mode) {
                case 'vocabulary':
                    exercises = this.generateVocabularyExercises(categoryKey);
                    break;
                case 'grammar':
                    exercises = this.generateGrammarExercises();
                    break;
                case 'listening':
                    exercises = this.generateListeningExercises();
                    break;
                case 'pronunciation':
                    exercises = this.generatePronunciationExercises();
                    break;
                case 'spaced-repetition':
                    exercises = this.generateSpacedRepetitionExercises();
                    break;
                default:
                    exercises = this.generateMixedExercises();
            }
            
            this.currentSession.exercises = exercises;
            console.log("📝 Ejercicios generados:", exercises.length);
            
        } catch (error) {
            console.error("❌ Error al generar ejercicios:", error);
        }
    }
    
    generateVocabularyExercises(categoryKey) {
        try {
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
                vocabulary = this.getDefaultVocabulary();
            }
            
            // Mezclar el vocabulario disponible
            const shuffledVocabulary = [...vocabulary].sort(() => Math.random() - 0.5);
            
            // Crear 5 ejercicios de vocabulario
            const exercises = [];
            const numExercises = Math.min(5, shuffledVocabulary.length);
            
            for (let i = 0; i < numExercises; i++) {
                const word = shuffledVocabulary[i];
                
                // Obtener opciones incorrectas únicas
                const otherWords = shuffledVocabulary.filter((_, index) => index !== i);
                const shuffledOtherWords = otherWords.sort(() => Math.random() - 0.5);
                
                const incorrectOptions = shuffledOtherWords
                    .slice(0, 3)
                    .map(w => w.english);
                
                const allOptions = [...incorrectOptions, word.english];
                allOptions.sort(() => Math.random() - 0.5);
                
                exercises.push({
                    type: 'vocabulary',
                    question: `¿Cómo se dice "${word.spanish}" en inglés?`,
                    correctAnswer: word.english,
                    options: allOptions,
                    word: word,
                    xpValue: 10
                });
            }
            
            console.log("📖 Ejercicios de vocabulario generados:", exercises.length, "ejercicios únicos");
            
            return exercises;
            
        } catch (error) {
            console.error("❌ Error al generar ejercicios de vocabulario:", error);
            return [];
        }
    }
    
    generateGrammarExercises() {
        try {
            const exercises = [];
            const grammarExercises = this.getGrammarExercisesByLevel();
            
            // Mezclar los ejercicios disponibles
            const shuffledExercises = [...grammarExercises].sort(() => Math.random() - 0.5);
            
            // Tomar hasta 5 ejercicios diferentes
            const numExercises = Math.min(5, shuffledExercises.length);
            
            for (let i = 0; i < numExercises; i++) {
                const exercise = shuffledExercises[i];
                exercises.push({
                    type: 'grammar',
                    question: exercise.question,
                    correctAnswer: exercise.correct,
                    options: exercise.options.sort(() => Math.random() - 0.5),
                    explanation: exercise.explanation,
                    xpValue: 15
                });
            }
            
            console.log("📚 Ejercicios de gramática generados:", exercises.length, "ejercicios únicos");
            return exercises;
            
        } catch (error) {
            console.error("❌ Error al generar ejercicios de gramática:", error);
            return [];
        }
    }
    
    generateListeningExercises() {
        try {
            const exercises = [];
            const listeningExercises = this.getListeningExercisesByLevel();
            
            // Mezclar los ejercicios disponibles
            const shuffledExercises = [...listeningExercises].sort(() => Math.random() - 0.5);
            
            // Tomar hasta 3 ejercicios diferentes
            const numExercises = Math.min(3, shuffledExercises.length);
            
            for (let i = 0; i < numExercises; i++) {
                const exercise = shuffledExercises[i];
                exercises.push({
                    type: 'listening',
                    question: exercise.question,
                    correctAnswer: exercise.correct,
                    options: exercise.options.sort(() => Math.random() - 0.5),
                    audioText: exercise.text,
                    xpValue: 20
                });
            }
            
            console.log("🎧 Ejercicios de listening generados:", exercises.length, "ejercicios únicos");
            return exercises;
            
        } catch (error) {
            console.error("❌ Error al generar ejercicios de listening:", error);
            return [];
        }
    }
    
    generatePronunciationExercises() {
        try {
            const exercises = [];
            const pronunciationExercises = this.getPronunciationExercisesByLevel();
            
            // Mezclar los ejercicios disponibles
            const shuffledExercises = [...pronunciationExercises].sort(() => Math.random() - 0.5);
            
            // Tomar hasta 3 ejercicios diferentes
            const numExercises = Math.min(3, shuffledExercises.length);
            
            for (let i = 0; i < numExercises; i++) {
                const exercise = shuffledExercises[i];
                exercises.push({
                    type: 'pronunciation',
                    word: exercise.word,
                    translation: exercise.translation,
                    pronunciation: exercise.pronunciation,
                    tips: exercise.tips,
                    xpValue: 25
                });
            }
            
            console.log("🎤 Ejercicios de pronunciación generados:", exercises.length, "ejercicios únicos");
            return exercises;
            
        } catch (error) {
            console.error("❌ Error al generar ejercicios de pronunciación:", error);
            return [];
        }
    }
    
    generateSpacedRepetitionExercises() {
        try {
            const exercises = [];
            const wordsForReview = this.getWordsForSpacedRepetition();
            
            for (let i = 0; i < 5; i++) {
                if (i < wordsForReview.length) {
                    const word = wordsForReview[i];
                    exercises.push({
                        type: 'spaced-repetition',
                        word: word.english,
                        translation: word.spanish,
                        pronunciation: word.pronunciation,
                        reviewHistory: word.reviewHistory,
                        difficulty: word.difficulty,
                        xpValue: 15
                    });
                }
            }
            
            return exercises;
            
        } catch (error) {
            console.error("❌ Error al generar ejercicios de repaso espaciado:", error);
            return [];
        }
    }
    
    generateMixedExercises() {
        try {
            const exercises = [];
            
            // Mezclar diferentes tipos de ejercicios
            const vocabularyEx = this.generateVocabularyExercises();
            const grammarEx = this.generateGrammarExercises();
            const listeningEx = this.generateListeningExercises();
            
            exercises.push(...vocabularyEx.slice(0, 2));
            exercises.push(...grammarEx.slice(0, 2));
            exercises.push(...listeningEx.slice(0, 1));
            
            // Mezclar el orden
            exercises.sort(() => Math.random() - 0.5);
            
            return exercises;
            
        } catch (error) {
            console.error("❌ Error al generar ejercicios mixtos:", error);
            return [];
        }
    }
    
    submitAnswer(exerciseIndex, answer, isCorrect) {
        try {
            if (!this.currentSession) return;
            
            const exercise = this.currentSession.exercises[exerciseIndex];
            if (!exercise) return;
            
            // Registrar respuesta
            exercise.userAnswer = answer;
            exercise.isCorrect = isCorrect;
            exercise.answeredAt = new Date().toISOString();
            
            // Actualizar estadísticas
            this.currentSession.totalAnswers++;
            if (isCorrect) {
                this.currentSession.correctAnswers++;
                this.currentSession.xpEarned += exercise.xpValue;
                this.sessionXP += exercise.xpValue;
                this.practiceStreak++;
                
                // Actualizar XP del usuario en appState
                if (window.appState) {
                    window.appState.currentXP += exercise.xpValue;
                    console.log("✅ XP sumado en appState:", window.appState.currentXP);
                    
                    // Actualizar UI del header inmediatamente
                    if (typeof window.updateHeaderElements === 'function') {
                        window.updateHeaderElements();
                    }
                }
            } else {
                this.practiceStreak = 0;
            }
            
            // Verificar si la sesión está completa
            if (this.currentSession.totalAnswers >= this.currentSession.exercises.length) {
                this.completePracticeSession();
            }
            
            console.log("✅ Respuesta registrada. XP ganado:", exercise.xpValue, "Ejercicio:", exerciseIndex);
            
        } catch (error) {
            console.error("❌ Error al registrar respuesta:", error);
        }
    }
    
    completePracticeSession() {
        try {
            if (!this.currentSession) return;
            
            // Calcular XP total y bonificaciones
            let totalXP = this.currentSession.xpEarned;
            
            // Bonificación por racha
            if (this.practiceStreak >= 5) {
                const streakBonus = Math.floor(totalXP * 0.2); // 20% bonus
                totalXP += streakBonus;
                console.log("🔥 Bonificación por racha:", streakBonus, "XP");
            }
            
            // Bonificación por completar sesión
            const completionBonus = 25;
            totalXP += completionBonus;
            
            // Actualizar XP del usuario
            if (window.appState) {
                window.appState.currentXP += totalXP;
                this.checkLevelUp();
                
                // Actualizar progreso del módulo de práctica
                if (window.moduleProgressSystem) {
                    const currentLevel = window.appState.currentLevel || 1;
                    const practiceProgress = this.calculatePracticeProgress();
                    
                    window.moduleProgressSystem.updateModuleProgress('practice', currentLevel, {
                        progress: practiceProgress.percentage,
                        totalTasks: practiceProgress.totalExercises,
                        completedTasks: practiceProgress.completedExercises,
                        completed: practiceProgress.percentage >= 80 // 80% para considerar completado
                    });
                    
                    console.log("📊 Progreso de práctica actualizado:", practiceProgress);
                }
                
                // Guardar progreso inmediatamente
                if (typeof window.saveProgress === 'function') {
                    window.saveProgress();
                    console.log("💾 Progreso guardado después de práctica");
                }
                
                // Actualizar UI del header
                if (typeof window.updateHeaderElements === 'function') {
                    window.updateHeaderElements();
                    console.log("✅ Header actualizado después de práctica");
                }
            }
            
            // Limpiar cola de audio completa
            if (typeof window.clearAudioQueue === 'function') {
                window.clearAudioQueue();
                console.log("🗑️ Cola de audio limpiada al completar sesión");
            }
            
            // Guardar historial
            this.currentSession.endTime = new Date().toISOString();
            this.currentSession.totalXP = totalXP;
            this.practiceHistory.push(this.currentSession);
            this.savePracticeHistory();
            
            // Mostrar resultados
            this.showSessionResults();
            
            console.log("🎉 Sesión completada. XP total:", totalXP);
            
        } catch (error) {
            console.error("❌ Error al completar sesión:", error);
        }
    }
    
    checkLevelUp() {
        try {
            if (!window.appState || !window.LEVEL_SYSTEM) return;
            
            const currentXP = window.appState.currentXP;
            const currentLevel = window.appState.currentLevel;
            
            // Buscar el siguiente nivel
            const nextLevel = window.LEVEL_SYSTEM.levels.find(level => 
                level.level > currentLevel && level.xpRequired <= currentXP
            );
            
            if (nextLevel) {
                // Subir de nivel
                window.appState.currentLevel = nextLevel.level;
                window.appState.currentXP = currentXP;
                
                // Mostrar notificación de subida de nivel
                if (typeof window.showNotification === 'function') {
                    window.showNotification(`¡Felicidades! Has subido al nivel ${nextLevel.level} - ${nextLevel.title}! 🎉`, 'success');
                }
                
                // Desbloquear nuevas categorías
                this.unlockCategoriesByLevel();
                
                console.log("🚀 Usuario subió al nivel:", nextLevel.level);
            }
            
        } catch (error) {
            console.error("❌ Error al verificar subida de nivel:", error);
        }
    }

    // Calcular progreso de práctica
    calculatePracticeProgress() {
        if (!this.currentSession) {
            return {
                totalExercises: 0,
                completedExercises: 0,
                percentage: 0
            };
        }

        const totalExercises = this.currentSession.exercises.length;
        const completedExercises = this.currentSession.completedExercises || 0;
        const percentage = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;

        return {
            totalExercises,
            completedExercises,
            percentage
        };
    }

    // Mostrar feedback detallado con explicaciones
    showDetailedFeedback(userAnswer, isCorrect) {
        try {
            if (typeof window.showDetailedFeedback === 'function') {
                const exercise = this.currentSession.exercises[this.currentSession.currentExercise];
                const context = {
                    exerciseType: exercise.type,
                    difficulty: this.getExerciseDifficulty(exercise),
                    grammarType: exercise.grammarType,
                    questionType: exercise.questionType
                };
                
                window.showDetailedFeedback(
                    exercise.type,
                    isCorrect,
                    userAnswer,
                    exercise.correctAnswer,
                    context
                );
            } else {
                // Fallback al feedback básico
                this.showExerciseFeedback(isCorrect);
            }
        } catch (error) {
            console.error("❌ Error al mostrar feedback detallado:", error);
            this.showExerciseFeedback(isCorrect);
        }
    }

    // Obtener dificultad del ejercicio
    getExerciseDifficulty(exercise) {
        if (exercise.type === 'vocabulary') {
            return exercise.difficulty || 'basic';
        } else if (exercise.type === 'grammar') {
            return exercise.grammarType || 'basic';
        } else if (exercise.type === 'listening') {
            return exercise.questionType || 'basic';
        }
        return 'basic';
    }
    
    showSessionResults() {
        try {
            if (!this.currentSession) return;
            
            const accuracy = (this.currentSession.correctAnswers / this.currentSession.totalAnswers) * 100;
            const totalXP = this.currentSession.totalXP;
            
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
                max-width: 500px;
                width: 90%;
            `;
            
            let resultMessage = '';
            let resultIcon = '';
            let resultColor = '';
            
            if (accuracy >= 80) {
                resultMessage = '¡Excelente trabajo!';
                resultIcon = '🎉';
                resultColor = 'var(--success-color)';
            } else if (accuracy >= 60) {
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
                <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary-color); margin-bottom: 1rem;">
                    ${this.currentSession.correctAnswers}/${this.currentSession.totalAnswers} correctas
                </div>
                <div style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 1rem;">
                    ${Math.round(accuracy)}% de acierto
                </div>
                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color); margin-bottom: 2rem;">
                    +${totalXP} XP ganados
                </div>
                <div style="margin-bottom: 2rem;">
                    <button class="btn btn-primary" onclick="this.closest('.results-modal').remove()" style="margin-right: 1rem;">
                        <i class="fas fa-check"></i> Continuar
                    </button>
                    <button class="btn btn-secondary" onclick="window.practiceSystem.showPracticeDashboard();this.closest('.results-modal').remove()">
                        <i class="fas fa-home"></i> Dashboard
                    </button>
                </div>
            `;
            
            resultsModal.appendChild(resultsContent);
            resultsModal.className = 'results-modal';
            document.body.appendChild(resultsModal);
            
        } catch (error) {
            console.error("❌ Error al mostrar resultados de sesión:", error);
        }
    }
    
    showPracticeDashboard() {
        try {
            // Cambiar a la pestaña de práctica
            const practiceTab = document.querySelector('.nav-tab[data-tab="practice"]');
            if (practiceTab) {
                practiceTab.click();
            }
            
            // Cargar dashboard de práctica
            setTimeout(() => {
                this.loadPracticeDashboard();
            }, 300);
            
        } catch (error) {
            console.error("❌ Error al mostrar dashboard de práctica:", error);
        }
    }
    
    loadPracticeDashboard() {
        try {
            const practiceArea = document.getElementById('practiceArea');
            if (!practiceArea) return;
            
            // Limpiar área de práctica
            practiceArea.innerHTML = '';
            practiceArea.style.display = 'block';
            
            // Ocultar modos de práctica
            const practiceModes = document.querySelector('.practice-modes');
            if (practiceModes) {
                practiceModes.style.display = 'none';
            }
            
            // Crear dashboard
            const dashboard = this.createPracticeDashboard();
            practiceArea.appendChild(dashboard);
            
        } catch (error) {
            console.error("❌ Error al cargar dashboard de práctica:", error);
        }
    }
    
    createPracticeDashboard() {
        try {
            const dashboard = document.createElement('div');
            dashboard.className = 'practice-dashboard';
            
            // Header del dashboard
            const header = document.createElement('div');
            header.className = 'practice-header';
            header.innerHTML = `
                <button class="btn btn-secondary" onclick="window.practiceSystem.showPracticeModes()">
                    <i class="fas fa-arrow-left"></i> Volver a Modos
                </button>
                <h3>Dashboard de Práctica</h3>
                <div class="practice-stats">
                    <span class="stat">XP: ${this.sessionXP}</span>
                    <span class="stat">Racha: ${this.practiceStreak}</span>
                </div>
            `;
            
            // Estadísticas del usuario
            const stats = this.createUserStats();
            
            // Categorías disponibles
            const categories = this.createAvailableCategories();
            
            // Historial reciente
            const history = this.createRecentHistory();
            
            dashboard.appendChild(header);
            dashboard.appendChild(stats);
            dashboard.appendChild(categories);
            dashboard.appendChild(history);
            
            return dashboard;
            
        } catch (error) {
            console.error("❌ Error al crear dashboard de práctica:", error);
            return document.createElement('div');
        }
    }
    
    createUserStats() {
        try {
            const stats = document.createElement('div');
            stats.className = 'user-stats';
            stats.style.cssText = `
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            `;
            
            const statsData = [
                { icon: '🎯', label: 'Nivel Actual', value: this.userLevel },
                { icon: '⭐', label: 'XP Total', value: window.appState?.currentXP || 0 },
                { icon: '🔥', label: 'Racha Actual', value: this.practiceStreak },
                { icon: '📚', label: 'Sesiones Hoy', value: this.getTodaySessions() },
                { icon: '🎓', label: 'Categorías Desbloqueadas', value: this.unlockedCategories.size },
                { icon: '📊', label: 'Precisión Promedio', value: this.getAverageAccuracy() + '%' }
            ];
            
            statsData.forEach(stat => {
                const statCard = document.createElement('div');
                statCard.className = 'stat-card';
                statCard.style.cssText = `
                    background: var(--surface-color);
                    padding: 1.5rem;
                    border-radius: 12px;
                    text-align: center;
                    border: 2px solid var(--border-color);
                `;
                
                statCard.innerHTML = `
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">${stat.icon}</div>
                    <h4 style="color: var(--text-secondary); margin-bottom: 0.5rem; font-size: 0.9rem;">${stat.label}</h4>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">${stat.value}</div>
                `;
                
                stats.appendChild(statCard);
            });
            
            return stats;
            
        } catch (error) {
            console.error("❌ Error al crear estadísticas del usuario:", error);
            return document.createElement('div');
        }
    }
    
    createAvailableCategories() {
        try {
            const container = document.createElement('div');
            container.className = 'available-categories';
            container.style.marginBottom = '2rem';
            
            const title = document.createElement('h4');
            title.textContent = 'Categorías Disponibles para Práctica';
            title.style.cssText = `
                color: var(--primary-color);
                margin-bottom: 1rem;
                font-size: 1.2rem;
            `;
            
            const grid = document.createElement('div');
            grid.style.cssText = `
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
            `;
            
            // Filtrar categorías por nivel del usuario
            const availableCategories = window.VOCABULARY_CATEGORIES.filter(cat => 
                this.unlockedCategories.has(cat.key)
            );
            
            availableCategories.forEach(category => {
                const card = document.createElement('div');
                card.className = 'category-card';
                card.style.cssText = `
                    background: var(--surface-color);
                    padding: 1.5rem;
                    border-radius: 12px;
                    border: 2px solid var(--border-color);
                    cursor: pointer;
                    transition: all 0.3s ease;
                `;
                
                card.innerHTML = `
                    <div style="text-align: center;">
                        <i class="${category.icon}" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                        <h5 style="color: var(--text-primary); margin-bottom: 0.5rem;">${category.title}</h5>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">${category.description}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="background: var(--accent-color); color: white; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">${category.level}</span>
                            <span style="color: var(--text-secondary); font-size: 0.9rem;">${category.wordCount} palabras</span>
                        </div>
                    </div>
                `;
                
                card.onclick = () => this.startCategoryPractice(category.key);
                card.onmouseenter = () => {
                    card.style.transform = 'translateY(-4px)';
                    card.style.borderColor = 'var(--primary-color)';
                    card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                };
                card.onmouseleave = () => {
                    card.style.transform = 'translateY(0)';
                    card.style.borderColor = 'var(--border-color)';
                    card.style.boxShadow = 'none';
                };
                
                grid.appendChild(card);
            });
            
            container.appendChild(title);
            container.appendChild(grid);
            
            return container;
            
        } catch (error) {
            console.error("❌ Error al crear categorías disponibles:", error);
            return document.createElement('div');
        }
    }
    
    createRecentHistory() {
        try {
            const container = document.createElement('div');
            container.className = 'recent-history';
            
            const title = document.createElement('h4');
            title.textContent = 'Historial Reciente de Práctica';
            title.style.cssText = `
                color: var(--primary-color);
                margin-bottom: 1rem;
                font-size: 1.2rem;
            `;
            
            const historyList = document.createElement('div');
            historyList.style.cssText = `
                background: var(--surface-color);
                border-radius: 12px;
                padding: 1rem;
                border: 2px solid var(--border-color);
            `;
            
            if (this.practiceHistory.length === 0) {
                historyList.innerHTML = `
                    <p style="text-align: center; color: var(--text-secondary); padding: 2rem;">
                        No hay historial de práctica aún. ¡Comienza a practicar!
                    </p>
                `;
            } else {
                // Mostrar las últimas 5 sesiones
                const recentSessions = this.practiceHistory.slice(-5).reverse();
                
                recentSessions.forEach(session => {
                    const sessionItem = document.createElement('div');
                    sessionItem.style.cssText = `
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 1rem;
                        border-bottom: 1px solid var(--border-color);
                    `;
                    
                    const accuracy = (session.correctAnswers / session.totalAnswers) * 100;
                    const date = new Date(session.startTime).toLocaleDateString();
                    
                    sessionItem.innerHTML = `
                        <div>
                            <strong style="color: var(--text-primary);">${session.mode}</strong>
                            <span style="color: var(--text-secondary); font-size: 0.9rem; margin-left: 1rem;">${date}</span>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <span style="color: var(--text-secondary);">${Math.round(accuracy)}%</span>
                            <span style="background: var(--accent-color); color: white; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">+${session.totalXP} XP</span>
                        </div>
                    `;
                    
                    historyList.appendChild(sessionItem);
                });
            }
            
            container.appendChild(title);
            container.appendChild(historyList);
            
            return container;
            
        } catch (error) {
            console.error("❌ Error al crear historial reciente:", error);
            return document.createElement('div');
        }
    }
    
    startCategoryPractice(categoryKey) {
        try {
            console.log("🎯 Iniciando práctica de categoría:", categoryKey);
            
            // Iniciar sesión de práctica de vocabulario
            this.startPracticeSession('vocabulary', categoryKey);
            
            // Cargar ejercicios
            this.loadPracticeExercises();
            
        } catch (error) {
            console.error("❌ Error al iniciar práctica de categoría:", error);
        }
    }
    
    loadPracticeExercises() {
        try {
            if (!this.currentSession || !this.currentSession.exercises) return;
            
            const practiceArea = document.getElementById('practiceArea');
            if (!practiceArea) return;
            
            // Limpiar área de práctica
            practiceArea.innerHTML = '';
            
            // Crear header de práctica
            const header = document.createElement('div');
            header.className = 'practice-header';
            header.innerHTML = `
                <button class="btn btn-secondary" onclick="window.practiceSystem.showPracticeDashboard()">
                    <i class="fas fa-arrow-left"></i> Volver al Dashboard
                </button>
                <h3>Práctica de ${this.currentSession.mode}</h3>
                <div class="session-progress">
                    <span>Ejercicio ${this.currentSession.currentExercise + 1} de ${this.currentSession.exercises.length}</span>
                </div>
            `;
            
            practiceArea.appendChild(header);
            
            // Cargar ejercicio actual
            this.loadCurrentExercise();
            
        } catch (error) {
            console.error("❌ Error al cargar ejercicios de práctica:", error);
        }
    }
    
    loadCurrentExercise() {
        try {
            if (!this.currentSession || !this.currentSession.exercises) return;
            
            const currentExercise = this.currentSession.exercises[this.currentSession.currentExercise];
            if (!currentExercise) return;
            
            const practiceArea = document.getElementById('practiceArea');
            if (!practiceArea) return;
            
            // Limpiar contenido anterior
            const existingContent = practiceArea.querySelector('.exercise-content');
            if (existingContent) {
                existingContent.remove();
            }
            
            // Crear contenido del ejercicio
            const exerciseContent = this.createExerciseContent(currentExercise);
            practiceArea.appendChild(exerciseContent);
            
            console.log("✅ Ejercicio cargado:", this.currentSession.currentExercise, "Tipo:", currentExercise.type);
            
            // Limpiar cola de audio del ejercicio anterior
            if (this.currentSession.currentExercise > 0 && typeof window.clearAudioQueueForExercise === 'function') {
                window.clearAudioQueueForExercise(this.currentSession.currentExercise - 1);
            }
            
        } catch (error) {
            console.error("❌ Error al cargar ejercicio actual:", error);
        }
    }
    
    createExerciseContent(exercise) {
        try {
            const container = document.createElement('div');
            container.className = 'exercise-content';
            container.style.cssText = `
                background: var(--surface-color);
                border-radius: 12px;
                padding: 2rem;
                margin-top: 1rem;
                border: 2px solid var(--border-color);
            `;
            
            // Título del ejercicio
            const title = document.createElement('h4');
            title.innerHTML = `<i class="fas fa-question-circle"></i> Ejercicio ${this.currentSession.currentExercise + 1}`;
            title.style.cssText = `
                color: var(--primary-color);
                margin-bottom: 1.5rem;
                font-size: 1.3rem;
            `;
            
            // Pregunta
            const question = document.createElement('p');
            question.innerHTML = exercise.question;
            question.style.cssText = `
                font-size: 1.2rem;
                margin-bottom: 2rem;
                padding: 1rem;
                background: var(--background-color);
                border-radius: 8px;
                border-left: 4px solid var(--accent-color);
            `;
            
            // Opciones (si es ejercicio de opción múltiple)
            let optionsContainer = null;
            if (exercise.options && exercise.options.length > 0) {
                optionsContainer = document.createElement('div');
                optionsContainer.className = 'options-grid';
                optionsContainer.style.cssText = `
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-bottom: 2rem;
                `;
                
                exercise.options.forEach(option => {
                    const optionBtn = document.createElement('button');
                    optionBtn.className = 'btn btn-secondary option-btn';
                    optionBtn.textContent = option;
                    optionBtn.style.cssText = `
                        padding: 1rem;
                        font-size: 1rem;
                        text-align: center;
                    `;
                    
                    optionBtn.onclick = () => this.handleExerciseAnswer(option, option === exercise.correctAnswer);
                    
                    optionsContainer.appendChild(optionBtn);
                });
            }
            
            // Contenido específico según el tipo de ejercicio
            let specificContent = null;
            
            if (exercise.type === 'pronunciation') {
                specificContent = this.createPronunciationContent(exercise);
            } else if (exercise.type === 'listening') {
                specificContent = this.createListeningContent(exercise);
            }
            
            // Ensamblar ejercicio
            container.appendChild(title);
            container.appendChild(question);
            
            if (optionsContainer) {
                container.appendChild(optionsContainer);
            }
            
            if (specificContent) {
                container.appendChild(specificContent);
            }
            
            return container;
            
        } catch (error) {
            console.error("❌ Error al crear contenido del ejercicio:", error);
            return document.createElement('div');
        }
    }
    
    createPronunciationContent(exercise) {
        try {
            const exerciseIndex = this.currentSession.currentExercise || 0;
            const container = document.createElement('div');
            container.style.cssText = `
                background: var(--background-color);
                padding: 1.5rem;
                border-radius: 8px;
                margin-bottom: 1.5rem;
                border: 1px solid var(--border-color);
            `;
            
            container.innerHTML = `
                <div style="text-align: center; margin-bottom: 1rem;">
                    <h5 style="color: var(--text-primary); margin-bottom: 0.5rem;">${exercise.word}</h5>
                    <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">${exercise.translation}</p>
                    <p style="color: var(--pronunciation-color); font-family: monospace;">${exercise.pronunciation}</p>
                </div>
                
                <!-- Área de grabación -->
                <div id="recordingArea${exerciseIndex}" style="text-align: center; margin-bottom: 1rem; display: none;">
                    <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">
                        <i class="fas fa-microphone"></i> Grabando... 
                        <span id="recordingTimer${exerciseIndex}" style="font-weight: bold; color: var(--accent-color);">00:00</span>
                    </p>
                    <button class="btn btn-danger" onclick="window.stopRecording(${exerciseIndex})">
                        <i class="fas fa-stop"></i> Detener Grabación
                    </button>
                </div>
                
                <!-- Área de reproducción -->
                <div id="playbackArea${exerciseIndex}" style="text-align: center; margin-bottom: 1rem; display: none;">
                    <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">
                        <i class="fas fa-check-circle" style="color: var(--success-color);"></i> Grabación completada
                    </p>
                    <button class="btn btn-info" onclick="window.playRecording(${exerciseIndex})" style="margin-right: 1rem;">
                        <i class="fas fa-play"></i> Escuchar Mi Grabación
                    </button>
                    <button class="btn btn-secondary" onclick="window.startRecording(${exerciseIndex})">
                        <i class="fas fa-microphone"></i> Grabar Nuevamente
                    </button>
                </div>
                
                <!-- Controles iniciales -->
                <div style="text-align: center;">
                    <button class="btn btn-primary" onclick="window.practiceSystem.playCorrectPronunciation('${exercise.word}')" style="margin-right: 1rem;">
                        <i class="fas fa-volume-up"></i> Escuchar Pronunciación
                    </button>
                    <button class="btn btn-secondary" onclick="window.practiceSystem.startRecording(${exerciseIndex})">
                        <i class="fas fa-microphone"></i> Grabar Mi Pronunciación
                    </button>
                </div>
            `;
            
            return container;
            
        } catch (error) {
            console.error("❌ Error al crear contenido de pronunciación:", error);
            return document.createElement('div');
        }
    }
    
    createListeningContent(exercise) {
        try {
            const container = document.createElement('div');
            container.style.cssText = `
                background: var(--background-color);
                padding: 1.5rem;
                border-radius: 8px;
                margin-bottom: 1.5rem;
                border: 1px solid var(--border-color);
            `;

            // Escapar comillas para el onclick
            const escapedAudioText = exercise.audioText.replace(/'/g, "\\'").replace(/"/g, '\\"');

            container.innerHTML = `
                <div style="text-align: center; margin-bottom: 1rem;">
                    <button class="btn btn-primary" onclick="window.practiceSystem.playListeningAudio('${escapedAudioText}', ${this.currentSession.currentExercise})">
                        <i class="fas fa-play"></i> Reproducir Audio
                    </button>
                </div>
            `;

            return container;

        } catch (error) {
            console.error("❌ Error al crear contenido de listening:", error);
            return document.createElement('div');
        }
    }
    
    handleExerciseAnswer(answer, isCorrect) {
        try {
            console.log("🎯 PracticeSystem: Procesando respuesta, ejercicio actual:", this.currentSession.currentExercise);
            const exercise = this.currentSession?.exercises?.[this.currentSession.currentExercise];
            
            // BLOQUEAR TODOS LOS BOTONES INMEDIATAMENTE
            const exerciseContainer = document.querySelector('.exercise-content');
            if (exerciseContainer) {
                const allButtons = exerciseContainer.querySelectorAll('button');
                allButtons.forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = '0.6';
                    btn.style.cursor = 'not-allowed';
                });
                
                // Marcar visualmente la respuesta correcta/incorrecta
                const optionButtons = exerciseContainer.querySelectorAll('.option-btn');
                optionButtons.forEach(btn => {
                    const isCorrectOption = btn.textContent.trim() === answer;
                    if (isCorrectOption) {
                        if (isCorrect) {
                            btn.style.background = 'var(--success-color)';
                            btn.style.color = 'white';
                            btn.style.borderColor = 'var(--success-color)';
                        } else {
                            btn.style.background = 'var(--error-color)';
                            btn.style.color = 'white';
                            btn.style.borderColor = 'var(--error-color)';
                        }
                    }
                });
            }
            
            // Registrar respuesta
            this.submitAnswer(this.currentSession.currentExercise, answer, isCorrect);
            
            // Verificar logros y desafíos
            if (typeof window.checkAchievements === 'function') {
                window.checkAchievements('exercise_completed', {
                    type: exercise.type,
                    isCorrect: isCorrect,
                    score: isCorrect ? 100 : 0
                });
            }
            
            if (typeof window.checkDailyChallenge === 'function') {
                window.checkDailyChallenge('exercise_completed', {
                    type: exercise.type,
                    isCorrect: isCorrect
                });
            }
            
            // Mostrar feedback detallado
            this.showDetailedFeedback(answer, isCorrect);
            
            // Limpiar cola de audio para este ejercicio
            if (typeof window.clearAudioQueueForExercise === 'function') {
                window.clearAudioQueueForExercise(this.currentSession.currentExercise);
            }
            
            // Avanzar al siguiente ejercicio o completar sesión
            setTimeout(() => {
                this.nextExercise();
            }, 1500);
            
        } catch (error) {
            console.error("❌ Error al manejar respuesta del ejercicio:", error);
        }
    }
    
    showExerciseFeedback(isCorrect) {
        try {
            const exerciseContent = document.querySelector('.exercise-content');
            if (!exerciseContent) return;
            
            // Crear mensaje de feedback
            const feedback = document.createElement('div');
            feedback.className = 'exercise-feedback';
            feedback.style.cssText = `
                padding: 1rem;
                border-radius: 8px;
                text-align: center;
                font-weight: 600;
                margin-top: 1rem;
                animation: fadeIn 0.3s ease;
            `;
            
            if (isCorrect) {
                feedback.style.background = 'rgba(16, 185, 129, 0.1)';
                feedback.style.color = 'var(--success-color)';
                feedback.style.border = '1px solid var(--success-color)';
                feedback.innerHTML = '<i class="fas fa-check-circle"></i> ¡Correcto! +10 XP';
            } else {
                feedback.style.background = 'rgba(239, 68, 68, 0.1)';
                feedback.style.color = 'var(--error-color)';
                feedback.style.border = '1px solid var(--error-color)';
                feedback.innerHTML = '<i class="fas fa-times-circle"></i> Incorrecto. ¡Sigue practicando!';
            }
            
            exerciseContent.appendChild(feedback);
            
        } catch (error) {
            console.error("❌ Error al mostrar feedback del ejercicio:", error);
        }
    }
    
    nextExercise() {
        try {
            if (!this.currentSession) return;
            
            // Limpiar cola de audio del ejercicio anterior
            if (typeof window.clearAudioQueueForExercise === 'function') {
                window.clearAudioQueueForExercise(this.currentSession.currentExercise);
            }
            
            this.currentSession.currentExercise++;
            
            if (this.currentSession.currentExercise >= this.currentSession.exercises.length) {
                // Sesión completada
                this.completePracticeSession();
            } else {
                // Cargar siguiente ejercicio
                this.loadCurrentExercise();
            }
            
        } catch (error) {
            console.error("❌ Error al avanzar al siguiente ejercicio:", error);
        }
    }
    
    showPracticeModes() {
        try {
            const practiceArea = document.getElementById('practiceArea');
            if (!practiceArea) return;
            
            // Limpiar área de práctica
            practiceArea.innerHTML = '';
            practiceArea.style.display = 'none';
            
            // Mostrar modos de práctica
            const practiceModes = document.querySelector('.practice-modes');
            if (practiceModes) {
                practiceModes.style.display = 'grid';
            }
            
        } catch (error) {
            console.error("❌ Error al mostrar modos de práctica:", error);
        }
    }
    
    // Métodos auxiliares
    getTodaySessions() {
        try {
            const today = new Date().toDateString();
            return this.practiceHistory.filter(session => 
                new Date(session.startTime).toDateString() === today
            ).length;
        } catch (error) {
            return 0;
        }
    }
    
    getAverageAccuracy() {
        try {
            if (this.practiceHistory.length === 0) return 0;
            
            const totalAccuracy = this.practiceHistory.reduce((sum, session) => {
                const accuracy = (session.correctAnswers / session.totalAnswers) * 100;
                return sum + accuracy;
            }, 0);
            
            return Math.round(totalAccuracy / this.practiceHistory.length);
        } catch (error) {
            return 0;
        }
    }
    
    getDefaultVocabulary() {
        // Vocabulario por defecto si no hay categoría específica
        const vocabulary = {
            'A1': [
            { english: "Hello", spanish: "Hola", pronunciation: "/həˈloʊ/" },
            { english: "Good", spanish: "Bueno", pronunciation: "/ɡʊd/" },
            { english: "Bad", spanish: "Malo", pronunciation: "/bæd/" },
            { english: "Yes", spanish: "Sí", pronunciation: "/jes/" },
                { english: "No", spanish: "No", pronunciation: "/noʊ/" },
                { english: "Big", spanish: "Grande", pronunciation: "/bɪɡ/" },
                { english: "Small", spanish: "Pequeño", pronunciation: "/smɔːl/" },
                { english: "Hot", spanish: "Caliente", pronunciation: "/hɒt/" },
                { english: "Cold", spanish: "Frío", pronunciation: "/kəʊld/" },
                { english: "Fast", spanish: "Rápido", pronunciation: "/fɑːst/" }
            ],
            'A2': [
                { english: "Beautiful", spanish: "Hermoso/a", pronunciation: "/ˈbjuːtɪfʊl/" },
                { english: "Interesting", spanish: "Interesante", pronunciation: "/ˈɪntrəstɪŋ/" },
                { english: "Important", spanish: "Importante", pronunciation: "/ɪmˈpɔːtənt/" },
                { english: "Difficult", spanish: "Difícil", pronunciation: "/ˈdɪfɪkəlt/" },
                { english: "Easy", spanish: "Fácil", pronunciation: "/ˈiːzi/" },
                { english: "Expensive", spanish: "Caro", pronunciation: "/ɪkˈspensɪv/" },
                { english: "Cheap", spanish: "Barato", pronunciation: "/tʃiːp/" },
                { english: "Modern", spanish: "Moderno", pronunciation: "/ˈmɒdn/" },
                { english: "Traditional", spanish: "Tradicional", pronunciation: "/trəˈdɪʃənl/" },
                { english: "Professional", spanish: "Profesional", pronunciation: "/prəˈfeʃənl/" }
            ],
            'B1': [
                { english: "Accomplish", spanish: "Lograr", pronunciation: "/əˈkʌmplɪʃ/" },
                { english: "Achievement", spanish: "Logro", pronunciation: "/əˈtʃiːvmənt/" },
                { english: "Opportunity", spanish: "Oportunidad", pronunciation: "/ˌɒpəˈtjuːnəti/" },
                { english: "Responsibility", spanish: "Responsabilidad", pronunciation: "/rɪˌspɒnsəˈbɪləti/" },
                { english: "Experience", spanish: "Experiencia", pronunciation: "/ɪkˈspɪəriəns/" },
                { english: "Knowledge", spanish: "Conocimiento", pronunciation: "/ˈnɒlɪdʒ/" },
                { english: "Development", spanish: "Desarrollo", pronunciation: "/dɪˈveləpmənt/" },
                { english: "Improvement", spanish: "Mejora", pronunciation: "/ɪmˈpruːvmənt/" },
                { english: "Challenge", spanish: "Desafío", pronunciation: "/ˈtʃælɪndʒ/" },
                { english: "Success", spanish: "Éxito", pronunciation: "/səkˈses/" }
            ],
            'B2': [
                { english: "Sophisticated", spanish: "Sofisticado/a", pronunciation: "/səˈfɪstɪkeɪtɪd/" },
                { english: "Extraordinary", spanish: "Extraordinario/a", pronunciation: "/ɪkˈstrɔːdɪnəri/" },
                { english: "Phenomenal", spanish: "Fenomenal", pronunciation: "/fəˈnɒmɪnl/" },
                { english: "Magnificent", spanish: "Magnífico/a", pronunciation: "/mæɡˈnɪfɪsnt/" },
                { english: "Remarkable", spanish: "Notable", pronunciation: "/rɪˈmɑːkəbəl/" },
                { english: "Outstanding", spanish: "Destacado/a", pronunciation: "/aʊtˈstændɪŋ/" },
                { english: "Exceptional", spanish: "Excepcional", pronunciation: "/ɪkˈsepʃənl/" },
                { english: "Incredible", spanish: "Increíble", pronunciation: "/ɪnˈkredəbəl/" },
                { english: "Amazing", spanish: "Asombroso/a", pronunciation: "/əˈmeɪzɪŋ/" },
                { english: "Wonderful", spanish: "Maravilloso/a", pronunciation: "/ˈwʌndəfʊl/" }
            ]
        };
        
        // Retornar vocabulario según el nivel del usuario
        const userLevel = this.userMCER || 'A1';
        const levelVocabulary = vocabulary[userLevel] || vocabulary['A1'];
        
        console.log("📖 Vocabulario por defecto generado para nivel", userLevel, ":", levelVocabulary.length, "palabras");
        return levelVocabulary;
    }
    
    getGrammarExercisesByLevel() {
        // Ejercicios de gramática según el nivel del usuario
        const exercises = {
            'A1': [
                {
                    question: "Complete: I ___ a student.",
                    options: ["am", "are", "is", "be"],
                    correct: "am",
                    explanation: "Se usa 'am' con 'I' en presente simple"
                },
                {
                    question: "Complete: She ___ English.",
                    options: ["speak", "speaks", "speaking", "spoke"],
                    correct: "speaks",
                    explanation: "Se usa 'speaks' con 'she' en presente simple"
                },
                {
                    question: "Complete: They ___ in the park.",
                    options: ["is", "are", "am", "be"],
                    correct: "are",
                    explanation: "Se usa 'are' con 'they' en presente simple"
                },
                {
                    question: "Complete: We ___ happy.",
                    options: ["is", "are", "am", "be"],
                    correct: "are",
                    explanation: "Se usa 'are' con 'we' en presente simple"
                },
                {
                    question: "Complete: He ___ a car.",
                    options: ["have", "has", "having", "had"],
                    correct: "has",
                    explanation: "Se usa 'has' con 'he' en presente simple"
                }
            ],
            'A2': [
                {
                    question: "Complete: Yesterday I ___ to the store.",
                    options: ["go", "went", "going", "goes"],
                    correct: "went",
                    explanation: "Se usa 'went' (pasado simple) para acciones pasadas"
                },
                {
                    question: "Complete: She ___ to school every day.",
                    options: ["go", "goes", "going", "went"],
                    correct: "goes",
                    explanation: "Se usa 'goes' con 'she' en presente simple"
                },
                {
                    question: "Complete: I ___ a book right now.",
                    options: ["read", "am reading", "reads", "reading"],
                    correct: "am reading",
                    explanation: "Se usa presente continuo para acciones en progreso"
                },
                {
                    question: "Complete: They ___ in London.",
                    options: ["live", "lives", "living", "lived"],
                    correct: "live",
                    explanation: "Se usa 'live' con 'they' en presente simple"
                },
                {
                    question: "Complete: We ___ dinner at 8 PM.",
                    options: ["have", "has", "having", "had"],
                    correct: "have",
                    explanation: "Se usa 'have' con 'we' en presente simple"
                }
            ],
            'B1': [
                {
                    question: "Complete: I ___ English for three years.",
                    options: ["study", "am studying", "have been studying", "studied"],
                    correct: "have been studying",
                    explanation: "Se usa presente perfecto continuo para duración"
                },
                {
                    question: "Complete: If I ___ rich, I would travel the world.",
                    options: ["am", "was", "were", "will be"],
                    correct: "were",
                    explanation: "Se usa 'were' en condicionales hipotéticas"
                },
                {
                    question: "Complete: She ___ to Paris next month.",
                    options: ["go", "goes", "will go", "going"],
                    correct: "will go",
                    explanation: "Se usa 'will' para planes futuros"
                },
                {
                    question: "Complete: The movie ___ when I arrived.",
                    options: ["start", "starts", "had started", "will start"],
                    correct: "had started",
                    explanation: "Se usa pasado perfecto para acciones anteriores"
                },
                {
                    question: "Complete: I wish I ___ speak French.",
                    options: ["can", "could", "will", "would"],
                    correct: "could",
                    explanation: "Se usa 'could' en 'wish' para deseos imposibles"
                }
            ],
            'B2': [
                {
                    question: "Complete: Despite ___ tired, she continued working.",
                    options: ["being", "to be", "was", "is"],
                    correct: "being",
                    explanation: "Se usa gerundio después de 'despite'"
                },
                {
                    question: "Complete: The book ___ by many students.",
                    options: ["read", "reads", "is read", "is reading"],
                    correct: "is read",
                    explanation: "Se usa voz pasiva para enfatizar la acción"
                },
                {
                    question: "Complete: I would have called you if I ___ your number.",
                    options: ["had", "have", "would have", "will have"],
                    correct: "had",
                    explanation: "Se usa pasado perfecto en condicionales del tercer tipo"
                },
                {
                    question: "Complete: Not only ___ she speak English, but also French.",
                    options: ["does", "do", "did", "will"],
                    correct: "does",
                    explanation: "Se usa inversión con 'not only'"
                },
                {
                    question: "Complete: The more you practice, ___ you become.",
                    options: ["the better", "better", "more better", "the best"],
                    correct: "the better",
                    explanation: "Se usa estructura comparativa 'the more... the better'"
                }
            ]
        };
        
        // Retornar ejercicios según el nivel del usuario
        const userLevel = this.userMCER || 'A1';
        const levelExercises = exercises[userLevel] || exercises['A1'];
        
        console.log("📚 Ejercicios de gramática generados para nivel", userLevel, ":", levelExercises.length);
        return levelExercises;
    }
    
    getListeningExercisesByLevel() {
        // Ejercicios de listening según el nivel del usuario
        const exercises = {
            'A1': [
            {
                text: "Hello",
                question: "¿Qué palabra escuchaste?",
                options: ["Hello", "Hi", "Goodbye", "Thanks"],
                correct: "Hello"
                },
                {
                    text: "Good morning",
                    question: "¿Qué frase escuchaste?",
                    options: ["Good morning", "Good afternoon", "Good evening", "Good night"],
                    correct: "Good morning"
                },
                {
                    text: "Thank you",
                    question: "¿Qué expresión escuchaste?",
                    options: ["Thank you", "You're welcome", "Please", "Sorry"],
                    correct: "Thank you"
                },
                {
                    text: "How are you?",
                    question: "¿Qué pregunta escuchaste?",
                    options: ["How are you?", "What's your name?", "Where are you from?", "How old are you?"],
                    correct: "How are you?"
                },
                {
                    text: "My name is",
                    question: "¿Qué frase escuchaste?",
                    options: ["My name is", "I am", "I have", "I like"],
                    correct: "My name is"
                }
            ],
            'A2': [
                {
                    text: "I would like a coffee",
                    question: "¿Qué oración escuchaste?",
                    options: ["I would like a coffee", "I want a coffee", "I need a coffee", "I have a coffee"],
                    correct: "I would like a coffee"
                },
                {
                    text: "What time is it?",
                    question: "¿Qué pregunta escuchaste?",
                    options: ["What time is it?", "What day is it?", "What date is it?", "What month is it?"],
                    correct: "What time is it?"
                },
                {
                    text: "I'm going to the store",
                    question: "¿Qué oración escuchaste?",
                    options: ["I'm going to the store", "I went to the store", "I go to the store", "I will go to the store"],
                    correct: "I'm going to the store"
                },
                {
                    text: "Can you help me?",
                    question: "¿Qué pregunta escuchaste?",
                    options: ["Can you help me?", "Do you help me?", "Will you help me?", "Are you helping me?"],
                    correct: "Can you help me?"
                },
                {
                    text: "I don't understand",
                    question: "¿Qué oración escuchaste?",
                    options: ["I don't understand", "I don't know", "I don't like", "I don't have"],
                    correct: "I don't understand"
                }
            ],
            'B1': [
                {
                    text: "I've been studying English for two years",
                    question: "¿Qué oración escuchaste?",
                    options: [
                        "I've been studying English for two years",
                        "I studied English for two years",
                        "I will study English for two years",
                        "I study English for two years"
                    ],
                    correct: "I've been studying English for two years"
                },
                {
                    text: "If I had more time, I would travel more",
                    question: "¿Qué oración escuchaste?",
                    options: [
                        "If I had more time, I would travel more",
                        "If I have more time, I will travel more",
                        "If I had more time, I will travel more",
                        "If I have more time, I would travel more"
                    ],
                    correct: "If I had more time, I would travel more"
                },
                {
                    text: "The movie was so interesting that I watched it twice",
                    question: "¿Qué oración escuchaste?",
                    options: [
                        "The movie was so interesting that I watched it twice",
                        "The movie was very interesting and I watched it twice",
                        "The movie was interesting so I watched it twice",
                        "The movie was interesting but I watched it twice"
                    ],
                    correct: "The movie was so interesting that I watched it twice"
                }
            ],
            'B2': [
                {
                    text: "Despite the weather being terrible, we decided to go hiking",
                    question: "¿Qué oración escuchaste?",
                    options: [
                        "Despite the weather being terrible, we decided to go hiking",
                        "Although the weather was terrible, we decided to go hiking",
                        "Even though the weather was terrible, we decided to go hiking",
                        "The weather was terrible but we decided to go hiking"
                    ],
                    correct: "Despite the weather being terrible, we decided to go hiking"
                },
                {
                    text: "I would have attended the meeting if I had known about it earlier",
                    question: "¿Qué oración escuchaste?",
                    options: [
                        "I would have attended the meeting if I had known about it earlier",
                        "I will attend the meeting if I know about it earlier",
                        "I would attend the meeting if I knew about it earlier",
                        "I attended the meeting because I knew about it earlier"
                    ],
                    correct: "I would have attended the meeting if I had known about it earlier"
                },
                {
                    text: "The research findings suggest that climate change is accelerating",
                    question: "¿Qué oración escuchaste?",
                    options: [
                        "The research findings suggest that climate change is accelerating",
                        "The research shows that climate change is getting worse",
                        "The study indicates that climate change is speeding up",
                        "The evidence proves that climate change is happening faster"
                    ],
                    correct: "The research findings suggest that climate change is accelerating"
                }
            ]
        };
        
        // Retornar ejercicios según el nivel del usuario
        const userLevel = this.userMCER || 'A1';
        const levelExercises = exercises[userLevel] || exercises['A1'];
        
        console.log("🎧 Ejercicios de listening generados para nivel", userLevel, ":", levelExercises.length);
        return levelExercises;
    }
    
    getPronunciationExercisesByLevel() {
        // Ejercicios de pronunciación según el nivel del usuario
        const exercises = {
            'A1': [
            {
                word: "Hello",
                translation: "Hola",
                pronunciation: "/həˈloʊ/",
                tips: "Enfoca en la 'h' aspirada y la 'o' larga"
                },
                {
                    word: "Beautiful",
                    translation: "Hermoso/a",
                    pronunciation: "/ˈbjuːtɪfʊl/",
                    tips: "Enfoca en la 'u' larga y la 'l' final"
                },
                {
                    word: "Thank you",
                    translation: "Gracias",
                    pronunciation: "/ˈθæŋk juː/",
                    tips: "Enfoca en el sonido 'th' y la 'u' larga"
                }
            ],
            'A2': [
                {
                    word: "International",
                    translation: "Internacional",
                    pronunciation: "/ˌɪntərˈnæʃənəl/",
                    tips: "Enfoca en el acento en 'na' y la 'l' final"
                },
                {
                    word: "Comfortable",
                    translation: "Cómodo/a",
                    pronunciation: "/ˈkʌmftəbəl/",
                    tips: "Enfoca en la 'o' silenciosa y la 'a' final"
                },
                {
                    word: "Interesting",
                    translation: "Interesante",
                    pronunciation: "/ˈɪntrəstɪŋ/",
                    tips: "Enfoca en el acento en 'in' y la 'ng' final"
                }
            ],
            'B1': [
                {
                    word: "Nevertheless",
                    translation: "Sin embargo",
                    pronunciation: "/ˌnevərðəˈles/",
                    tips: "Enfoca en el acento en 'less' y la 'th'"
                },
                {
                    word: "Responsibility",
                    translation: "Responsabilidad",
                    pronunciation: "/rɪˌspɒnsəˈbɪləti/",
                    tips: "Enfoca en el acento en 'bil' y la 'ty' final"
                },
                {
                    word: "Opportunity",
                    translation: "Oportunidad",
                    pronunciation: "/ˌɒpəˈtjuːnəti/",
                    tips: "Enfoca en el acento en 'tu' y la 'ty' final"
                }
            ],
            'B2': [
                {
                    word: "Sophisticated",
                    translation: "Sofisticado/a",
                    pronunciation: "/səˈfɪstɪkeɪtɪd/",
                    tips: "Enfoca en el acento en 'sti' y la 'ed' final"
                },
                {
                    word: "Accomplishment",
                    translation: "Logro",
                    pronunciation: "/əˈkʌmplɪʃmənt/",
                    tips: "Enfoca en el acento en 'plish' y la 'ment' final"
                },
                {
                    word: "Extraordinary",
                    translation: "Extraordinario/a",
                    pronunciation: "/ɪkˈstrɔːdɪnəri/",
                    tips: "Enfoca en el acento en 'tra' y la 'ry' final"
                }
            ]
        };
        
        // Retornar ejercicios según el nivel del usuario
        const userLevel = this.userMCER || 'A1';
        const levelExercises = exercises[userLevel] || exercises['A1'];
        
        console.log("🎤 Ejercicios de pronunciación generados para nivel", userLevel, ":", levelExercises.length);
        return levelExercises;
    }
    
    getWordsForSpacedRepetition() {
        // Obtener palabras para repaso espaciado
        return [];
    }
    
    playCorrectPronunciation(word) {
        try {
            if (typeof window.playListeningAudio === 'function') {
                const exerciseIndex = this.currentSession?.currentExercise || 0;
                window.playListeningAudio(word, exerciseIndex);
            }
        } catch (error) {
            console.error("❌ Error al reproducir pronunciación:", error);
        }
    }
    
    playListeningAudio(text, exerciseIndex = null) {
        try {
            console.log("🎵 PracticeSystem: Reproduciendo audio:", text, "ejercicio:", exerciseIndex);
            if (typeof window.playListeningAudio === 'function') {
                window.playListeningAudio(text, exerciseIndex);
            } else {
                console.error("❌ Función playListeningAudio no encontrada");
            }
        } catch (error) {
            console.error("❌ Error al reproducir audio:", error);
        }
    }
    
    startRecording(exerciseIndex = 0) {
        try {
            if (typeof window.startRecording === 'function') {
                window.startRecording(exerciseIndex);
            }
        } catch (error) {
            console.error("❌ Error al iniciar grabación:", error);
        }
    }
}

// Función para actualizar directamente los elementos del header
function updateHeaderElements() {
    try {
        console.log("🎯 Actualizando elementos del header directamente...");
        
        // Actualizar XP en el header
        const currentXPElement = document.getElementById('currentXP');
        if (currentXPElement && typeof appState !== 'undefined') {
            currentXPElement.textContent = appState.currentXP;
            console.log("✅ XP del header actualizado:", appState.currentXP);
        }
        
        // Actualizar nivel en el header
        const currentLevelElement = document.getElementById('currentLevel');
        if (currentLevelElement && typeof appState !== 'undefined') {
            currentLevelElement.textContent = appState.currentLevel;
            console.log("✅ Nivel del header actualizado:", appState.currentLevel);
        }
        
        // Actualizar barra de progreso del nivel
        if (typeof calculateLevelProgress === 'function') {
            const levelProgress = calculateLevelProgress();
            const progressFill = document.getElementById('levelProgressFill');
            const progressText = document.getElementById('levelProgressText');
            
            if (progressFill) {
                progressFill.style.width = `${levelProgress.percentage}%`;
                console.log("✅ Barra de progreso actualizada:", levelProgress.percentage + "%");
            }
            
            if (progressText) {
                if (levelProgress.xpForNext > 0) {
                    progressText.textContent = `${levelProgress.xpInLevel}/${levelProgress.xpForNext} XP`;
                } else {
                    progressText.textContent = "Nivel Máximo";
                }
                console.log("✅ Texto de progreso actualizado");
            }
        }
        
        // Actualizar nivel MCER en el header del usuario
        if (typeof getUserLevelMCER === 'function') {
            const mcerLevel = getUserLevelMCER();
            const userLevelDisplay = document.getElementById('userLevelDisplay');
            if (userLevelDisplay) {
                userLevelDisplay.textContent = `Nivel ${mcerLevel}`;
                console.log("✅ Nivel MCER del header actualizado:", mcerLevel);
            }
        }
        
        console.log("✅ Header actualizado completamente");
        
    } catch (error) {
        console.error("❌ Error al actualizar header:", error);
    }
}

// Instancia global del sistema de práctica
window.practiceSystem = new PracticeSystem();

// Exportar función de actualización del header
window.updateHeaderElements = updateHeaderElements;
