// Módulo de diagnóstico: evaluación inicial del nivel del usuario

let currentQuestion = 0;
let diagnosticAnswers = [];
let diagnosticScore = 0;

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
        const diagnosticForm = document.getElementById('diagnosticForm');
        const diagnosticResult = document.getElementById('diagnosticResult');
        
        if (diagnosticForm && diagnosticResult) {
            // Ocultar resultado anterior si existe
            diagnosticResult.style.display = 'none';
            
            // Mostrar formulario
            diagnosticForm.style.display = 'block';
            
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
            const progress = ((currentQuestion + 1) / 12) * 100;
            progressFill.style.width = progress + '%';
            progressText.textContent = `${currentQuestion + 1}/12`;
            console.log("✅ Progreso actualizado:", progress + '%');
        }
    } catch (error) {
        console.error("❌ Error al actualizar progreso:", error);
    }
}

function handleDiagnosticSubmit(e) {
    console.log("📝 Enviando diagnóstico...");
    e.preventDefault();
    
    try {
        const formData = new FormData(e.target);
        const answers = {};
        
        // Recopilar respuestas
        for (let [key, value] of formData.entries()) {
            answers[key] = value;
        }
        
        console.log("📋 Respuestas recopiladas:", answers);
        
        // Calcular puntuación
        diagnosticScore = calculateScore(answers);
        console.log("🎯 Puntuación calculada:", diagnosticScore);
        
        // Determinar nivel
        const level = determineLevel(diagnosticScore);
        console.log("📊 Nivel determinado:", level);
        
        // Guardar progreso del usuario
        saveUserProgress(level);
        console.log("💾 Progreso del usuario guardado");
        
        // Mostrar resultado
        showDiagnosticResult(level, diagnosticScore);
        console.log("✅ Resultado del diagnóstico mostrado");
        
    } catch (error) {
        console.error("❌ Error al procesar diagnóstico:", error);
    }
}

function calculateScore(answers) {
    console.log("🧮 Calculando puntuación...");
    let score = 0;
    
    // Respuestas correctas
    const correctAnswers = {
        q1: 'a', // cat = gato
        q2: 'c', // gracias = thanks
        q3: 'b', // she reads a book
        q4: 'a', // what's the time
        q5: 'b', // children (plural de child)
        q6: 'b', // went (pasado de go)
        q7: 'b', // been (participio de be)
        q8: 'c', // were (subjuntivo)
        q9: 'c', // lying (gerundio de lie)
        q10: 'a', // attend (subjuntivo)
        q11: 'c', // was completed (pasiva)
        q12: 'b'  // does (tercera persona singular)
    };
    
    for (let question in answers) {
        if (answers[question] === correctAnswers[question]) {
            score++;
        }
    }
    
    console.log("✅ Puntuación calculada:", score, "de 12");
    return score;
}

function determineLevel(score) {
    console.log("📊 Determinando nivel basado en puntuación:", score);
    
    if (score >= 10) return 3;      // Avanzado
    if (score >= 7) return 2;       // Intermedio
    if (score >= 4) return 1;       // Básico
    return 1;                        // Principiante por defecto
}

function saveUserProgress(level) {
    console.log("💾 Guardando progreso del usuario, nivel:", level);
    try {
        const userProgress = {
            level: level,
            xp: 0,
            lessonsCompleted: 0,
            vocabularyWordsLearned: 0,
            practiceStreak: 0,
            diagnosticCompleted: true,
            diagnosticScore: diagnosticScore,
            lastPracticeDate: new Date().toISOString()
        };
        
        localStorage.setItem('englishLearningProgress', JSON.stringify(userProgress));
        console.log("✅ Progreso guardado:", userProgress);
        
        // Actualizar appState global
        if (window.appState) {
            window.appState.currentLevel = level;
            console.log("✅ appState actualizado");
        }
        
    } catch (error) {
        console.error("❌ Error al guardar progreso:", error);
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
                <p>Puntuación: ${score}/12</p>
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
