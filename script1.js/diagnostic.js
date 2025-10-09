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
        
        console.log("🔍 Elementos encontrados:", {
            diagnosticModal: !!diagnosticModal
        });
        
        if (diagnosticModal) {
            console.log("✅ Modal de diagnóstico encontrado");
            
            // Resetear el estado del diagnóstico
            currentQuestion = 0;
            diagnosticAnswers = [];
            diagnosticScore = 0;
            console.log("🔄 Estado del diagnóstico reseteado");
            
            // Ocultar cualquier overlay de autenticación que pueda estar interfiriendo
            const authOverlay = document.getElementById('authOverlay');
            if (authOverlay) {
                authOverlay.style.display = 'none';
                console.log("🚪 Overlay de autenticación ocultado");
            }
            
            // Ocultar modal de autenticación si está visible
            const authModal = document.getElementById('authModal');
            if (authModal) {
                authModal.style.display = 'none';
                console.log("🚪 Modal de autenticación ocultado");
            }
            
            // Ocultar la aplicación principal para mostrar solo el diagnóstico
            const mainApp = document.getElementById('mainApp');
            if (mainApp) {
                mainApp.style.display = 'none';
                console.log("🚪 Aplicación principal ocultada");
            }
            
            // Mostrar modal de diagnóstico
            diagnosticModal.style.display = 'block';
            diagnosticModal.style.zIndex = '1000';
            console.log("🎨 Modal de diagnóstico mostrado (display: block)");
            
            // Mostrar primera pregunta
            console.log("📝 Intentando mostrar primera pregunta...");
            showQuestion();
            console.log("✅ Modal de diagnóstico mostrado correctamente");
            
            // Asegurar que el modal esté visible
            setTimeout(() => {
                console.log("⏰ Verificación tardía del modal...");
                if (diagnosticModal.style.display !== 'block') {
                    console.log("🔧 Modal no está visible, forzando display...");
                    diagnosticModal.style.display = 'block';
                    diagnosticModal.style.visibility = 'visible';
                    diagnosticModal.style.opacity = '1';
                    console.log("🔧 Modal forzado a mostrar");
                }
                
                // Verificar que la pregunta se haya mostrado
                const questionContainer = document.getElementById('questionContainer');
                if (questionContainer && questionContainer.innerHTML.trim() === '') {
                    console.log("⚠️ Contenedor de pregunta vacío, reintentando...");
                    showQuestion();
                }
            }, 200);
            
        } else {
            console.error("❌ Modal de diagnóstico no encontrado");
            console.error("🔍 Buscando elementos con ID 'diagnosticModal'...");
            const allElements = document.querySelectorAll('[id*="diagnostic"]');
            console.log("Elementos relacionados con diagnóstico:", allElements);
        }
    } catch (error) {
        console.error("❌ Error al mostrar modal de diagnóstico:", error);
        console.error("Stack trace:", error.stack);
    }
}

function hideDiagnosticModal() {
    console.log("🚪 Ocultando modal de diagnóstico...");
    try {
        const diagnosticModal = document.getElementById('diagnosticModal');
        
        if (diagnosticModal) {
            diagnosticModal.style.display = 'none';
            console.log("✅ Modal de diagnóstico ocultado");
        }
        
        // Mostrar la aplicación principal después de completar el diagnóstico
        const mainApp = document.getElementById('mainApp');
        if (mainApp) {
            mainApp.style.display = 'block';
            console.log("🚪 Aplicación principal mostrada");
        }
        
        // Limpiar cualquier estado residual
        currentQuestion = 0;
        diagnosticAnswers = [];
        diagnosticScore = 0;
        console.log("🔄 Estado del diagnóstico reseteado");
        
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
        
        console.log("🔍 Elementos de pregunta encontrados:", {
            questionContainer: !!questionContainer,
            diagnosticForm: !!diagnosticForm,
            diagnosticResult: !!diagnosticResult
        });
        
        if (questionContainer && diagnosticForm && diagnosticResult) {
            // Ocultar resultado anterior si existe
            diagnosticResult.style.display = 'none';
            console.log("✅ Resultado anterior ocultado");
            
            // Mostrar formulario
            diagnosticForm.style.display = 'block';
            console.log("✅ Formulario de diagnóstico mostrado");
            
            // Obtener la pregunta actual
            const question = DIAGNOSTIC_QUESTIONS[currentQuestion];
            
            if (!question) {
                console.error("❌ Pregunta no encontrada para el índice:", currentQuestion);
                console.log("📊 Preguntas disponibles:", DIAGNOSTIC_QUESTIONS.length);
                return;
            }
            
            console.log("📝 Pregunta a mostrar:", question.question);
            
            // Crear el HTML de la pregunta
            const questionHTML = `
                <div class="form-group">
                    <p class="question-number">Pregunta ${currentQuestion + 1} de ${DIAGNOSTIC_QUESTIONS.length}</p>
                    <p style="font-size: 1.1rem; margin-bottom: 1rem; color: var(--text-primary);">${question.question}</p>
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        ${question.options.map((option, index) => `
                            <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; border: 2px solid var(--border-color); border-radius: 8px; cursor: pointer; transition: all 0.3s ease;">
                                <input type="radio" name="q${currentQuestion + 1}" value="${index}" required style="margin: 0;">
                                <span style="font-weight: 500; color: var(--text-primary);">${String.fromCharCode(97 + index)}) ${option}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
            
            console.log("🎨 HTML de pregunta generado, aplicando al contenedor...");
            questionContainer.innerHTML = questionHTML;
            console.log("✅ HTML de pregunta aplicado al contenedor");
            
            // Verificar que el contenido se haya aplicado
            if (questionContainer.innerHTML.trim() === '') {
                console.error("❌ El contenedor de pregunta está vacío después de aplicar HTML");
                return;
            }
            
            // Agregar eventos de hover a las opciones
            const optionLabels = questionContainer.querySelectorAll('label');
            console.log("🎯 Opciones encontradas:", optionLabels.length);
            
            optionLabels.forEach((label, index) => {
                label.addEventListener('mouseenter', () => {
                    label.style.borderColor = 'var(--primary-color)';
                    label.style.backgroundColor = 'var(--background-color)';
                });
                label.addEventListener('mouseleave', () => {
                    label.style.borderColor = 'var(--border-color)';
                    label.style.backgroundColor = 'transparent';
                });
                console.log(`✅ Eventos agregados a opción ${index + 1}`);
            });
            
            // Actualizar el texto del botón
            const submitButton = diagnosticForm.querySelector('button[type="submit"]');
            if (submitButton) {
                if (currentQuestion === DIAGNOSTIC_QUESTIONS.length - 1) {
                    submitButton.textContent = 'Finalizar Diagnóstico';
                    submitButton.style.background = 'linear-gradient(135deg, var(--success-color), #059669)';
                    console.log("🎯 Botón actualizado: Finalizar Diagnóstico");
                } else {
                    submitButton.textContent = 'Siguiente Pregunta';
                    submitButton.style.background = 'linear-gradient(135deg, var(--primary-color), var(--primary-light))';
                    console.log("🎯 Botón actualizado: Siguiente Pregunta");
                }
            } else {
                console.warn("⚠️ Botón de envío no encontrado");
            }
            
            // Actualizar progreso
            updateDiagnosticProgress();
            console.log("✅ Progreso del diagnóstico actualizado");
            
            console.log("✅ Pregunta mostrada correctamente");
            
            // Verificación final
            setTimeout(() => {
                const finalCheck = questionContainer.innerHTML.trim();
                if (finalCheck === '') {
                    console.error("❌ VERIFICACIÓN FINAL: El contenedor de pregunta está vacío");
                } else {
                    console.log("✅ VERIFICACIÓN FINAL: El contenedor de pregunta tiene contenido");
                }
            }, 100);
            
        } else {
            console.error("❌ Elementos de pregunta no encontrados");
            console.error("Elementos faltantes:", {
                questionContainer: !questionContainer ? 'FALTA' : 'OK',
                diagnosticForm: !diagnosticForm ? 'FALTA' : 'OK',
                diagnosticResult: !diagnosticResult ? 'FALTA' : 'OK'
            });
        }
    } catch (error) {
        console.error("❌ Error al mostrar pregunta:", error);
        console.error("Stack trace:", error.stack);
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
        if (diagnosticScore >= 11) {
            level = 5; // B2 - Intermedio Alto
        } else if (diagnosticScore >= 10) {
            level = 4; // B1+ - Avanzado+
        } else if (diagnosticScore >= 9) {
            level = 3; // B1 - Avanzado
        } else if (diagnosticScore >= 7) {
            level = 2; // A2 - Intermedio
        } else if (diagnosticScore >= 5) {
            level = 1; // A1 - Principiante
        } else {
            level = 1; // A1 - Principiante (fallback)
        }
        
        console.log("📊 Puntuación final:", diagnosticScore, "/", DIAGNOSTIC_QUESTIONS.length);
        console.log("🎯 Nivel asignado:", level);
        
        // Calcular XP inicial basado en el nivel diagnosticado
        let initialXP;
        if (level === 1) {
            initialXP = 0; // A1 - Principiante
        } else if (level === 2) {
            initialXP = 300; // A2 - Intermedio
        } else if (level === 3) {
            initialXP = 1000; // B1 - Avanzado
        } else if (level === 4) {
            initialXP = 1500; // B1+ - Avanzado+
        } else if (level === 5) {
            initialXP = 2000; // B2 - Intermedio Alto
        } else if (level === 6) {
            initialXP = 3000; // B2+ - Intermedio Alto+
        } else if (level === 7) {
            initialXP = 4000; // C1 - Avanzado
        } else if (level === 8) {
            initialXP = 6000; // C1+ - Avanzado+
        } else if (level === 9) {
            initialXP = 8000; // C2 - Maestría
        } else {
            initialXP = 10000; // C2+ - Maestría+
        }
        
        // Guardar progreso del usuario (namespaced por email)
        try {
            if (typeof window.setUserProgressFields === 'function') {
                window.setUserProgressFields({
                    currentLevel: level,
                    currentXP: initialXP,
                    level: level, // compat
                    xp: initialXP, // compat
                    lessonsCompleted: 0,
                    vocabularyWordsLearned: 0,
                    practiceStreak: 0,
                    diagnosticCompleted: true,
                    diagnosticScore: diagnosticScore
                });
            } else {
                const userProgress = {
                    currentLevel: level,
                    currentXP: initialXP,
                    level: level,
                    xp: initialXP,
                    lessonsCompleted: 0,
                    vocabularyWordsLearned: 0,
                    practiceStreak: 0,
                    diagnosticCompleted: true,
                    diagnosticScore: diagnosticScore
                };
                localStorage.setItem('englishLearningProgress', JSON.stringify(userProgress));
            }
            console.log("✅ Progreso guardado");
        } catch (e) {
            console.error("❌ Error guardando progreso de diagnóstico:", e);
        }
        
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
            
            // Mapear nivel a MCER
            const mcerLevels = {
                1: "A1",
                2: "A2", 
                3: "B1",
                4: "B1+",
                5: "B2",
                6: "B2+",
                7: "C1",
                8: "C1+",
                9: "C2",
                10: "C2+"
            };
            
            const levelNames = {
                1: `Principiante (${mcerLevels[1]})`,
                2: `Intermedio (${mcerLevels[2]})`,
                3: `Avanzado (${mcerLevels[3]})`,
                4: `Avanzado+ (${mcerLevels[4]})`,
                5: `Intermedio Alto (${mcerLevels[5]})`,
                6: `Intermedio Alto+ (${mcerLevels[6]})`,
                7: `Avanzado Alto (${mcerLevels[7]})`,
                8: `Avanzado Alto+ (${mcerLevels[8]})`,
                9: `Maestría (${mcerLevels[9]})`,
                10: `Maestría+ (${mcerLevels[10]})`
            };
            
            const levelDescriptions = {
                1: "Perfecto para comenzar tu viaje de aprendizaje del inglés. Te enfocarás en vocabulario básico, saludos, números y estructuras simples.",
                2: "Excelente progreso. Continuarás con tiempos verbales, adjetivos comparativos y conversaciones más complejas.",
                3: "¡Impresionante! Estás listo para desafíos avanzados, incluyendo expresiones idiomáticas y gramática compleja.",
                4: "¡Excelente nivel! Dominas estructuras complejas y estás listo para expresiones idiomáticas y vocabulario avanzado.",
                5: "¡Nivel intermedio alto! Tienes un dominio sólido del inglés y puedes manejar conversaciones complejas con fluidez.",
                6: "¡Nivel intermedio alto+! Tu inglés es muy bueno y puedes expresarte con precisión en situaciones profesionales.",
                7: "¡Nivel avanzado alto! Tienes un dominio excepcional del inglés y puedes manejar cualquier situación comunicativa.",
                8: "¡Nivel avanzado alto+! Tu inglés es casi nativo y puedes expresarte con elegancia y precisión.",
                9: "¡Nivel de maestría! Tienes un dominio nativo del inglés y puedes expresarte con fluidez y naturalidad.",
                10: "¡Nivel de maestría+! Tu inglés es excepcional y puedes manejar cualquier registro y contexto comunicativo."
            };
            
            const levelColors = {
                1: "linear-gradient(135deg, #10b981, #059669)",
                2: "linear-gradient(135deg, #f59e0b, #d97706)",
                3: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                4: "linear-gradient(135deg, #ec4899, #be185d)",
                5: "linear-gradient(135deg, #06b6d4, #0891b2)",
                6: "linear-gradient(135deg, #84cc16, #65a30d)",
                7: "linear-gradient(135deg, #f97316, #ea580c)",
                8: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                9: "linear-gradient(135deg, #ef4444, #dc2626)",
                10: "linear-gradient(135deg, #000000, #374151)"
            };
            
            const percentage = Math.round((score / DIAGNOSTIC_QUESTIONS.length) * 100);
            
            // Guardar el nivel MCER en almacén por usuario
            const mcerLevel = mcerLevels[level];
            // Obtener usuario actual
            const currentUser = window.getCurrentUser ? window.getCurrentUser() : null;
            if (!currentUser || !currentUser.email) {
                console.error("❌ No se pudo obtener usuario actual para guardar progreso");
                return;
            }
            try {
                if (typeof window.setUserProgressFields === 'function') {
                    window.setUserProgressFields({
                        diagnosticLevel: mcerLevel,
                        currentLevel: level,
                        level: level, // compat
                        diagnosticCompleted: true
                    });
                } else {
                    const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
                    if (!userProgress[currentUser.email]) {
                        userProgress[currentUser.email] = {};
                    }
                    userProgress[currentUser.email].diagnosticLevel = mcerLevel;
                    userProgress[currentUser.email].currentLevel = level;
                    userProgress[currentUser.email].diagnosticCompleted = true;

                    // Compatibilidad mínima en raíz
                    userProgress.diagnosticLevel = mcerLevel;
                    userProgress.currentLevel = level;
                    userProgress.diagnosticCompleted = true;

                    localStorage.setItem('englishLearningProgress', JSON.stringify(userProgress));
                }
            } catch (e) {
                console.error("❌ Error al guardar diagnóstico por usuario:", e);
            }
            
            console.log("💾 Nivel MCER guardado para usuario:", currentUser.email, "Nivel:", mcerLevel);
            
            console.log("💾 Nivel MCER guardado:", mcerLevel);
            
            // Obtener progreso actual del usuario
            const userProgress = (typeof window.getUserProgress === 'function') ? window.getUserProgress() : {};

            // Restaurar progreso en appState si está disponible
            if (typeof window.appState !== 'undefined') {
                window.appState.diagnosticLevel = mcerLevel;
                window.appState.currentLevel = level;
                window.appState.currentXP = userProgress.currentXP || userProgress.xp || 0;
                console.log("✅ appState actualizado con nivel del diagnóstico");

                // Actualizar UI del header
                if (typeof window.updateHeaderElements === 'function') {
                    window.updateHeaderElements();
                    console.log("✅ Header actualizado después del diagnóstico");
                }
            }

            // Restaurar progreso completo del usuario si está autenticado
            if (typeof window.restoreUserProgress === 'function' && typeof window.getCurrentUser === 'function') {
                const currentUser = window.getCurrentUser();
                if (currentUser) {
                    window.restoreUserProgress(currentUser);
                    console.log("✅ Progreso completo del usuario restaurado después del diagnóstico");
                }
            }

            // Actualizar display del usuario
            if (typeof window.updateUserDisplay === 'function' && typeof window.getCurrentUser === 'function') {
                const currentUser = window.getCurrentUser();
                if (currentUser) {
                    window.updateUserDisplay(currentUser);
                    console.log("✅ Display del usuario restaurado después del diagnóstico");
                }
            }

            // Cerrar modal de diagnóstico después de un delay
            setTimeout(() => {
                hideDiagnosticModal();
                console.log("✅ Modal de diagnóstico cerrado");
            }, 3000);
            
            diagnosticResult.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🎯</div>
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem; font-size: 1.5rem;">¡Diagnóstico Completado!</h3>
                    
                    <div style="background: ${levelColors[level]}; color: white; padding: 1rem 2rem; border-radius: 25px; margin: 1.5rem 0; display: inline-block; font-weight: 600; font-size: 1.2rem;">
                        ${levelNames[level]}
                    </div>
                    
                    <div style="background: var(--background-color); padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0; text-align: left;">
                        <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">📊 Tu Puntuación</h4>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem;">Obtuviste <strong>${score} de ${DIAGNOSTIC_QUESTIONS.length}</strong> respuestas correctas</p>
                        
                        <div style="background: var(--border-color); height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 0.5rem;">
                            <div style="background: ${levelColors[level]}; height: 100%; width: ${percentage}%; transition: width 0.5s ease;"></div>
                        </div>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; text-align: center;">${percentage}% de acierto</p>
                    </div>
                    
                    <div style="background: var(--surface-color); padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0; border-left: 4px solid var(--primary-color);">
                        <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">📚 ¿Qué significa este nivel?</h4>
                        <p style="color: var(--text-secondary); line-height: 1.6;">${levelDescriptions[level]}</p>
                    </div>
                    
                    <p style="color: var(--text-secondary); margin: 1.5rem 0; font-size: 1.1rem;">¡Perfecto! Ahora puedes comenzar a aprender con lecciones adaptadas a tu nivel.</p>
                    
                    <button class="btn btn-violet" onclick="startLearning()" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; border-radius: 25px; box-shadow: var(--shadow-md);">
                        🚀 Comenzar a Aprender
                    </button>
                </div>
            `;
            
            console.log("✅ Resultado del diagnóstico mostrado");
        } else {
            console.error("❌ Elementos de resultado no encontrados");
        }
    } catch (error) {
        console.error("❌ Error al mostrar resultado del diagnóstico:", error);
    }
}

function startLearning() {
    console.log("🚀 Iniciando aprendizaje...");
    try {
        // Ocultar modal de diagnóstico
        hideDiagnosticModal();
        
        // Cargar contenido de la aplicación DESPUÉS de ocultar el diagnóstico
        setTimeout(() => {
            console.log("⏰ Cargando contenido de la aplicación...");
            
            // Inicializar el estado desde el diagnóstico usando la nueva función
            if (typeof initializeFromDiagnostic === 'function') {
                console.log("🎯 Inicializando estado desde diagnóstico...");
                const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
                const diagnosticLevel = userProgress.diagnosticLevel || 'A1';
                initializeFromDiagnostic(diagnosticLevel);
            } else {
                console.warn("⚠️ initializeFromDiagnostic no disponible, usando método alternativo...");
                
                // Método alternativo: actualizar el display del header principal
                const currentUser = JSON.parse(localStorage.getItem('englishLearningSession') || '{}');
                const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
                
                if (currentUser.name) {
                    const userNameDisplay = document.getElementById('userNameDisplay');
                    const userLevelDisplay = document.getElementById('userLevelDisplay');
                    
                    if (userNameDisplay && userLevelDisplay) {
                        userNameDisplay.textContent = currentUser.name;
                        const level = userProgress.currentLevel || userProgress.level || 1;
                        userLevelDisplay.textContent = `Nivel ${level}`;
                    }
                }
                
                // Ejecutar checkAuth para cargar la aplicación principal
                if (typeof checkAuth === 'function') {
                    console.log("🔍 Ejecutando checkAuth para cargar aplicación...");
                    checkAuth();
                }
            }
            
            // Sincronizar automáticamente el display del usuario después de un breve delay
            setTimeout(() => {
                console.log("🔄 Sincronizando display del usuario...");
                if (typeof updateUserDisplay === 'function') {
                    const currentUser = getCurrentUser();
                    if (currentUser) {
                        updateUserDisplay(currentUser);
                        console.log("✅ Display del usuario sincronizado automáticamente");
                    }
                }
                
                // Verificar que la sincronización funcionó
                setTimeout(() => {
                    const userNameDisplay = document.getElementById('userNameDisplay');
                    const userLevelDisplay = document.getElementById('userLevelDisplay');
                    
                    if (userNameDisplay && userLevelDisplay) {
                        console.log("✅ Verificación de sincronización:");
                        console.log("   - Nombre:", userNameDisplay.textContent);
                        console.log("   - Nivel:", userLevelDisplay.textContent);
                        
                        if (userNameDisplay.textContent === 'Usuario' || userLevelDisplay.textContent === 'Nivel A1') {
                            console.warn("⚠️ La sincronización no funcionó correctamente, forzando...");
                            if (typeof forceUpdateDisplay === 'function') {
                                forceUpdateDisplay();
                            }
                        }
                    }
                }, 300);
            }, 200);
            
            console.log("🎉 Aprendizaje iniciado correctamente");
        }, 100); // Pequeño delay para asegurar que el modal se oculte primero
        
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
