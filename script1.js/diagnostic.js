// Módulo de diagnóstico: evaluación inicial del nivel del usuario

let currentQuestion = 0;
let diagnosticAnswers = [];
let diagnosticScore = 0;

// Base de datos de preguntas del diagnóstico
const DIAGNOSTIC_QUESTIONS = [
    {
        question: "¿Cuál es la traducción de 'cat'?",
        options: ["Gato", "Perro", "Casa", "Mesa"],
        correct: 0
    },
    {
        question: "¿Cómo se dice 'gracias' en inglés?",
        options: ["Hello", "Please", "Thanks", "Sorry"],
        correct: 2
    },
    {
        question: "¿Cuál es la forma correcta?: 'She ___ a book.'",
        options: ["read", "reads", "reading", "is read"],
        correct: 1
    },
    {
        question: "¿Cómo se pregunta la hora?: '___ the time?'",
        options: ["What's", "How's", "Where's", "Who's"],
        correct: 0
    },
    {
        question: "¿Cuál es el plural de 'child'?",
        options: ["childs", "children", "childes", "child's"],
        correct: 1
    },
    {
        question: "¿Cuál es la forma correcta del pasado?: 'Yesterday I ___ to the store.'",
        options: ["go", "went", "going", "goes"],
        correct: 1
    },
    {
        question: "¿Cuál es la forma correcta?: 'I have ___ studying for two hours.'",
        options: ["be", "been", "being", "am"],
        correct: 1
    },
    {
        question: "¿Cuál es la forma correcta?: 'If I ___ rich, I would travel the world.'",
        options: ["am", "was", "were", "be"],
        correct: 2
    },
    {
        question: "¿Cuál es la forma correcta?: 'The book ___ on the table is mine.'",
        options: ["lay", "laying", "lying", "lies"],
        correct: 2
    },
    {
        question: "¿Cuál es la forma correcta?: 'She suggested that he ___ the meeting.'",
        options: ["attend", "attends", "attended", "attending"],
        correct: 0
    },
    {
        question: "¿Cuál es la forma correcta?: 'The project ___ by the team last month.'",
        options: ["complete", "completed", "was completed", "has completed"],
        correct: 2
    },
    {
        question: "¿Cuál es la forma correcta?: 'Not only ___ she speak English, but also French.'",
        options: ["do", "does", "did", "done"],
        correct: 1
    }
];

function showDiagnosticModal() {
    console.log("🎯 Mostrando modal de diagnóstico...");
    try {
        const diagnosticModal = document.getElementById('diagnosticModal');
        const diagnosticOverlay = document.getElementById('diagnosticOverlay');
        
        if (diagnosticModal) {
            console.log("✅ Modal de diagnóstico encontrado");
            diagnosticModal.style.display = 'block';
            
            // Crear overlay si no existe
            if (!diagnosticOverlay) {
                const overlay = document.createElement('div');
                overlay.id = 'diagnosticOverlay';
                overlay.className = 'auth-overlay';
                overlay.style.zIndex = '999';
                document.body.appendChild(overlay);
                console.log("✅ Overlay de diagnóstico creado");
            } else {
                diagnosticOverlay.style.display = 'block';
            }
            
            // Resetear el diagnóstico
            currentQuestion = 0;
            diagnosticAnswers = [];
            diagnosticScore = 0;
            
            // Mostrar primera pregunta
            showQuestion();
            console.log("✅ Modal de diagnóstico mostrado correctamente");
        } else {
            console.error("❌ Modal de diagnóstico no encontrado");
        }
    } catch (error) {
        console.error("❌ Error al mostrar modal de diagnóstico:", error);
    }
}

function hideDiagnosticModal() {
    console.log("🚪 Ocultando modal de diagnóstico...");
    try {
        const diagnosticModal = document.getElementById('diagnosticModal');
        const diagnosticOverlay = document.getElementById('diagnosticOverlay');
        
        if (diagnosticModal) {
            diagnosticModal.style.display = 'none';
        }
        
        if (diagnosticOverlay) {
            diagnosticOverlay.style.display = 'none';
        }
        
        console.log("✅ Modal de diagnóstico ocultado");
    } catch (error) {
        console.error("❌ Error al ocultar modal de diagnóstico:", error);
    }
}

function showQuestion() {
    console.log("❓ Mostrando pregunta:", currentQuestion + 1);
    try {
        const questionContainer = document.getElementById('questionContainer');
        const diagnosticForm = document.getElementById('diagnosticForm');
        const diagnosticResult = document.getElementById('diagnosticResult');
        const submitButton = diagnosticForm.querySelector('button[type="submit"]');
        
        if (questionContainer && diagnosticForm && diagnosticResult) {
            // Ocultar resultado anterior si existe
            diagnosticResult.style.display = 'none';
            
            // Mostrar formulario
            diagnosticForm.style.display = 'block';
            
            // Obtener la pregunta actual
            const question = DIAGNOSTIC_QUESTIONS[currentQuestion];
            
            // Crear el HTML de la pregunta
            questionContainer.innerHTML = `
                <div class="form-group">
                    <p class="question-number">Pregunta ${currentQuestion + 1} de ${DIAGNOSTIC_QUESTIONS.length}</p>
                    <p>${question.question}</p>
                    ${question.options.map((option, index) => `
                        <label><input type="radio" name="q${currentQuestion + 1}" value="${index}" required> ${String.fromCharCode(97 + index)}) ${option}</label><br>
                    `).join('')}
                </div>
            `;
            
            // Actualizar el texto del botón
            if (currentQuestion === DIAGNOSTIC_QUESTIONS.length - 1) {
                submitButton.textContent = 'Finalizar Diagnóstico';
            } else {
                submitButton.textContent = 'Siguiente Pregunta';
            }
            
            // Actualizar progreso
            updateDiagnosticProgress();
            
            console.log("✅ Pregunta mostrada correctamente");
        } else {
            console.error("❌ Elementos de pregunta no encontrados");
        }
    } catch (error) {
        console.error("❌ Error al mostrar pregunta:", error);
    }
}

function updateDiagnosticProgress() {
    console.log("📊 Actualizando progreso del diagnóstico...");
    try {
        const progressFill = document.querySelector('.diagnostic-progress .progress-fill');
        const progressText = document.querySelector('.diagnostic-progress .progress-text');
        
        if (progressFill && progressText) {
            const progress = ((currentQuestion + 1) / DIAGNOSTIC_QUESTIONS.length) * 100;
            progressFill.style.width = progress + '%';
            progressText.textContent = `${currentQuestion + 1}/${DIAGNOSTIC_QUESTIONS.length}`;
            console.log("✅ Progreso actualizado:", progress + '%');
        } else {
            console.warn("⚠️ Elementos de progreso no encontrados");
        }
    } catch (error) {
        console.error("❌ Error al actualizar progreso:", error);
    }
}

function handleDiagnosticSubmit(e) {
    console.log("📝 Manejando envío de diagnóstico...");
    e.preventDefault();
    
    try {
        // Obtener la respuesta seleccionada
        const selectedOption = document.querySelector(`input[name="q${currentQuestion + 1}"]:checked`);
        
        if (!selectedOption) {
            console.warn("⚠️ No se seleccionó ninguna opción");
            if (typeof showNotification === 'function') {
                showNotification('Por favor selecciona una respuesta', 'warning');
            } else {
                alert('Por favor selecciona una respuesta');
            }
            return;
        }
        
        const answer = parseInt(selectedOption.value);
        const question = DIAGNOSTIC_QUESTIONS[currentQuestion];
        
        // Guardar respuesta
        diagnosticAnswers[currentQuestion] = answer;
        
        // Verificar si es correcta
        if (answer === question.correct) {
            diagnosticScore++;
            console.log("✅ Respuesta correcta");
        } else {
            console.log("❌ Respuesta incorrecta");
        }
        
        console.log("📊 Puntuación actual:", diagnosticScore);
        
        // Avanzar a la siguiente pregunta o finalizar
        if (currentQuestion < DIAGNOSTIC_QUESTIONS.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            // Finalizar diagnóstico
            completeDiagnostic();
        }
        
    } catch (error) {
        console.error("❌ Error al manejar envío:", error);
    }
}

function completeDiagnostic() {
    console.log("🎉 Completando diagnóstico...");
    try {
        // Calcular nivel basado en la puntuación
        let level = 1;
        if (diagnosticScore >= 8) {
            level = 3; // Avanzado
        } else if (diagnosticScore >= 5) {
            level = 2; // Intermedio
        } else {
            level = 1; // Principiante
        }
        
        console.log("📊 Puntuación final:", diagnosticScore, "/", DIAGNOSTIC_QUESTIONS.length);
        console.log("🎯 Nivel asignado:", level);
        
        // Guardar progreso del usuario
        const userProgress = {
            level: level,
            xp: 0,
            lessonsCompleted: 0,
            vocabularyWordsLearned: 0,
            practiceStreak: 0,
            diagnosticCompleted: true,
            diagnosticScore: diagnosticScore
        };
        
        localStorage.setItem('englishLearningProgress', JSON.stringify(userProgress));
        console.log("✅ Progreso guardado");
        
        // Mostrar resultado
        showDiagnosticResult(level, diagnosticScore);
        
    } catch (error) {
        console.error("❌ Error al completar diagnóstico:", error);
    }
}

function showDiagnosticResult(level, score) {
    console.log("🎉 Mostrando resultado del diagnóstico...");
    try {
        const diagnosticForm = document.getElementById('diagnosticForm');
        const diagnosticResult = document.getElementById('diagnosticResult');
        
        if (diagnosticForm && diagnosticResult) {
            // Ocultar formulario
            diagnosticForm.style.display = 'none';
            
            // Mostrar resultado
            diagnosticResult.style.display = 'block';
            
            const levelNames = {
                1: "Principiante (A1)",
                2: "Intermedio (A2)",
                3: "Avanzado (B1)"
            };
            
            diagnosticResult.innerHTML = `
                <h3>🎯 Resultado del Diagnóstico</h3>
                <p>Has completado la evaluación inicial. Tu nivel sugerido es:</p>
                <div class="level-badge">${levelNames[level]}</div>
                <p>Puntuación: ${score}/${DIAGNOSTIC_QUESTIONS.length}</p>
                <p>¡Perfecto! Ahora puedes comenzar a aprender con lecciones adaptadas a tu nivel.</p>
                <button class="btn btn-violet" onclick="startLearning()">Comenzar a Aprender</button>
            `;
            
            console.log("✅ Resultado del diagnóstico mostrado");
        } else {
            console.error("❌ Elementos de resultado no encontrados");
        }
    } catch (error) {
        console.error("❌ Error al mostrar resultado:", error);
    }
}

function startLearning() {
    console.log("🚀 Iniciando aprendizaje...");
    try {
        // Ocultar modal de diagnóstico
        hideDiagnosticModal();
        
        // Cargar contenido de la aplicación
        if (typeof loadProgress === 'function') {
            loadProgress();
            console.log("✅ Progreso cargado");
        }
        
        if (typeof updateUI === 'function') {
            updateUI();
            console.log("✅ UI actualizada");
        }
        
        if (typeof loadCurrentLesson === 'function') {
            loadCurrentLesson();
            console.log("✅ Lección actual cargada");
        }
        
        if (typeof loadVocabularyCategories === 'function') {
            loadVocabularyCategories();
            console.log("✅ Categorías de vocabulario cargadas");
        }
        
        console.log("🎉 Aprendizaje iniciado correctamente");
        
    } catch (error) {
        console.error("❌ Error al iniciar aprendizaje:", error);
    }
}

// Función de inicialización para el módulo de diagnóstico
function initDiagnostic() {
    console.log("🚀 Módulo de diagnóstico inicializado");
    try {
        // Configurar evento del formulario de diagnóstico
        const diagnosticForm = document.getElementById('diagnosticForm');
        if (diagnosticForm) {
            diagnosticForm.addEventListener('submit', handleDiagnosticSubmit);
            console.log("✅ Evento de diagnóstico configurado");
        } else {
            console.warn("⚠️ Formulario de diagnóstico no encontrado");
        }
        
        console.log("✅ Módulo de diagnóstico inicializado correctamente");
    } catch (error) {
        console.error("❌ Error en inicialización del módulo de diagnóstico:", error);
    }
}

// Exportar funciones globalmente
window.showDiagnosticModal = showDiagnosticModal;
window.hideDiagnosticModal = hideDiagnosticModal;
window.startLearning = startLearning;
window.initDiagnostic = initDiagnostic;
