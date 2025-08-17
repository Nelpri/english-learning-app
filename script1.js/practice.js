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

function loadPracticeExercise(mode) {
    // Lógica para cargar ejercicio de práctica

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

// Pools de gramática por nivel MCER para ampliar ejercicios en todas las lecciones
const GRAMMAR_POOLS = {
    A1: [
        { question: "I ___ a student.", options: ["am", "are", "is", "be"], correct: 0 },
        { question: "You ___ my friend.", options: ["am", "are", "is", "be"], correct: 1 },
        { question: "She ___ happy.", options: ["am", "are", "is", "be"], correct: 2 },
        { question: "We ___ from Mexico.", options: ["am", "are", "is", "be"], correct: 1 },
        { question: "___ this your book?", options: ["Is", "Are", "Am", "Be"], correct: 0 },
        { question: "There ___ a cat under the table.", options: ["is", "are", "am", "be"], correct: 0 },
        { question: "There ___ two apples on the desk.", options: ["is", "are", "am", "be"], correct: 1 },
        { question: "I have ___ apple.", options: ["a", "an", "the", "some"], correct: 1 }
    ],
    A2: [
        { question: "She ___ to work every day.", options: ["go", "goes", "going", "gone"], correct: 1 },
        { question: "They ___ English on Mondays.", options: ["study", "studies", "studied", "studying"], correct: 0 },
        { question: "There ___ any milk in the fridge.", options: ["isn't", "aren't", "don't", "hasn't"], correct: 0 },
        { question: "I ___ like coffee.", options: ["don't", "doesn't", "am not", "didn't"], correct: 0 },
        { question: "He ___ TV now.", options: ["watch", "watches", "is watching", "watched"], correct: 2 },
        { question: "We ___ dinner at 8 yesterday.", options: ["have", "had", "are having", "will have"], correct: 1 },
        { question: "Which sentence is correct?", options: ["She don't like tea.", "She doesn't like tea.", "She isn't like tea.", "She not like tea."], correct: 1 },
        { question: "Choose the correct article: ___ umbrella.", options: ["a", "an", "the", "some"], correct: 1 }
    ],
    B1: [
        { question: "If it ___ tomorrow, we'll stay at home.", options: ["rains", "rained", "is raining", "rain"], correct: 0 },
        { question: "I ___ my keys. I can't find them.", options: ["lost", "have lost", "had lost", "lose"], correct: 1 },
        { question: "While I ___, she called me.", options: ["worked", "was working", "have worked", "work"], correct: 1 },
        { question: "It's the ___ movie I've ever seen.", options: ["more interesting", "most interesting", "interestinger", "much interesting"], correct: 1 },
        { question: "He said that he ___ the report.", options: ["finished", "had finished", "has finished", "finishes"], correct: 1 },
        { question: "We have to ___ the deadline.", options: ["meet", "do", "make", "arrive"], correct: 0 },
        { question: "Choose the correct preposition: interested ___ science.", options: ["on", "in", "at", "for"], correct: 1 },
        { question: "By the time we arrived, the show ___.", options: ["started", "had started", "has started", "was starting"], correct: 1 }
    ],
    B2: [
        { question: "If I ___ more time, I would learn Italian.", options: ["have", "had", "will have", "would have"], correct: 1 },
        { question: "The meeting was ___ by the CEO.", options: ["lead", "led", "leading", "lead by"], correct: 1 },
        { question: "He denied ___ the money.", options: ["take", "to take", "taking", "taken"], correct: 2 },
        { question: "Hardly ___ we arrived when it started to rain.", options: ["had", "have", "did", "were"], correct: 0 },
        { question: "I'd rather you ___ earlier next time.", options: ["come", "came", "will come", "had come"], correct: 1 },
        { question: "Not only ___ brilliant, but also humble.", options: ["she is", "is she", "she was", "was she"], correct: 1 },
        { question: "We look forward to ___ from you.", options: ["hear", "hearing", "to hear", "heard"], correct: 1 },
        { question: "She insisted ___ paying the bill.", options: ["to", "on", "for", "at"], correct: 1 }
    ],
    C1: [
        { question: "Only after the speech ___ to ask questions.", options: ["we begin", "did we begin", "we did begin", "we had begun"], correct: 1 },
        { question: "Had I known, I ___ earlier.", options: ["would leave", "would have left", "left", "had left"], correct: 1 },
        { question: "It's high time we ___ home.", options: ["go", "went", "had gone", "would go"], correct: 1 },
        { question: "No sooner ___ the news than she called me.", options: ["she heard", "had she heard", "she had heard", "has she heard"], correct: 1 },
        { question: "He suggested that she ___ present.", options: ["be", "is", "was", "will be"], correct: 0 },
        { question: "Were it not for his help, we ___ failed.", options: ["would", "will have", "would have", "have"], correct: 2 }
    ],
    C2: [
        { question: "Scarcely ___ the plane taken off when the engine failed.", options: ["had", "has", "did", "was"], correct: 0 },
        { question: "Little ___ he know about the consequences.", options: ["does", "did", "has", "had"], correct: 1 },
        { question: "Were she to arrive now, we ___ ready.", options: ["are", "would be", "were", "will be"], correct: 1 },
        { question: "Seldom ___ such an eloquent speech.", options: ["we hear", "do we hear", "we heard", "we have heard"], correct: 1 },
        { question: "At no time ___ the suspect leave the room.", options: ["was", "did", "has", "had"], correct: 1 },
        { question: "Only when I looked again ___ the error.", options: ["I noticed", "did I notice", "had I noticed", "I had noticed"], correct: 1 }
    ]
}

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
  
  // Variables globales para el ejercicio de listening
  let currentListeningAudio = null;
  let listeningAudioSpeed = 1.0;
  let selectedListeningAnswer = null;


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

// Variables globales para el ejercicio de listening
let currentListeningAudio = null;
let listeningAudioSpeed = 1.0;
let selectedListeningAnswer = null;

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

// Exportar funciones globalmente
window.sendChatMessage = typeof sendChatMessage !== 'undefined' ? sendChatMessage : function(){};
window.handleExerciseAnswer = typeof handleExerciseAnswer !== 'undefined' ? handleExerciseAnswer : function(){};
window.completeLesson = typeof completeLesson !== 'undefined' ? completeLesson : function(){};
window.reviewLesson = typeof reviewLesson !== 'undefined' ? reviewLesson : function(){};
window.playListeningAudio = playListeningAudio;
window.pauseListeningAudio = pauseListeningAudio;
window.changeListeningSpeed = changeListeningSpeed;
window.toggleTranscript = toggleTranscript;
window.handleListeningAnswer = handleListeningAnswer;
window.checkListeningAnswers = checkListeningAnswers;
window.resetListeningExercise = resetListeningExercise;
window.nextListeningExercise = nextListeningExercise;

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

window.backToPracticeModes = backToPracticeModes;
