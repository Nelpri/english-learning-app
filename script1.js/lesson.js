// Módulo de lecciones: carga y gestión de lecciones, progreso, repaso

function loadCurrentLesson() {
    console.log("📚 Iniciando carga de lección actual...");
    console.log("🎯 appState.currentLesson:", appState.currentLesson);
    
    const allowedLessons = getAllowedLessonsByLevel();
    console.log("📋 Lecciones permitidas:", allowedLessons.length);
    console.log("📋 Lecciones disponibles:", allowedLessons.map(l => l.title));
    
    const currentLesson = allowedLessons[appState.currentLesson];
    if (!currentLesson) {
        console.warn("⚠️ No se encontró lección para el índice:", appState.currentLesson);
        console.warn("⚠️ Índice fuera de rango. Total lecciones:", allowedLessons.length);
        return;
    }
    
    console.log("✅ Lección encontrada:", currentLesson.title);
    console.log("✅ Vocabulario de la lección:", currentLesson.vocabulary.length, "palabras");
    
    try {
        // Actualizar título y dificultad
        const lessonTitleElement = document.getElementById('lessonTitle');
        const lessonDifficultyElement = document.getElementById('lessonDifficulty');
        
        if (lessonTitleElement) {
            lessonTitleElement.textContent = currentLesson.title;
            console.log("📝 Título actualizado:", currentLesson.title);
        } else {
            console.warn("⚠️ Elemento lessonTitle no encontrado");
        }
        
        if (lessonDifficultyElement) {
            lessonDifficultyElement.textContent = currentLesson.difficulty;
            console.log("📝 Dificultad actualizada:", currentLesson.difficulty);
        } else {
            console.warn("⚠️ Elemento lessonDifficulty no encontrado");
        }
        
        // Verificar si la lección ya fue completada
        const isCompleted = isLessonCompleted(appState.currentLesson);
        const lessonHeader = document.querySelector('.lesson-header');
        
        // Agregar o actualizar indicador de completado
        let completedBadge = lessonHeader.querySelector('.completed-badge');
        if (isCompleted) {
            if (!completedBadge) {
                completedBadge = document.createElement('span');
                completedBadge.className = 'completed-badge';
                lessonHeader.appendChild(completedBadge);
            }
            completedBadge.innerHTML = `<i class="fas fa-check-circle"></i> Completada`;
        } else if (completedBadge) {
            completedBadge.remove();
        }
        
        // Cargar vocabulario
        const vocabularyGrid = document.getElementById('vocabularyGrid');
        if (vocabularyGrid) {
            vocabularyGrid.innerHTML = '';
            console.log("🧹 Vocabulario anterior limpiado");
            
            currentLesson.vocabulary.forEach((item, index) => {
                const vocabItem = document.createElement('div');
                vocabItem.className = 'vocabulary-item';
                vocabItem.innerHTML = `
                    <div class="vocab-header">
                        <div class="english">${item.english}</div>
                        <div class="pronunciation-buttons">
                            <button class="speak-btn" onclick="speakText('${item.english}', 'en-US')" title="Escuchar pronunciación">
                                <i class="fas fa-volume-up"></i>
                            </button>
                        </div>
                    </div>
                    <div class="spanish">${item.spanish}</div>
                    <div class="pronunciation">[${item.pronunciation}]</div>
                `;
                vocabularyGrid.appendChild(vocabItem);
                console.log(`📚 Vocabulario ${index + 1} agregado:`, item.english);
            });
            console.log("📚 Vocabulario cargado:", currentLesson.vocabulary.length, "palabras");
        } else {
            console.warn("⚠️ Elemento vocabularyGrid no encontrado");
        }
        
        // Cargar gramática
        const grammarContent = document.getElementById('grammarContent');
        if (grammarContent) {
            grammarContent.innerHTML = `
                <h5>${currentLesson.grammar.title}</h5>
                <p>${currentLesson.grammar.content}</p>
            `;
            console.log("📖 Gramática cargada:", currentLesson.grammar.title);
        } else {
            console.warn("⚠️ Elemento grammarContent no encontrado");
        }
        
        // Actualizar estado del botón "siguiente lección"
        updateNextLessonButton();
        
        // Asegurar que la sección de aprender esté visible
        ensureLearnSectionVisible();
        
        // Sincronizar con el estado global y actualizar UI
        console.log("🔄 Sincronizando estado global...");
        
        // Actualizar UI si está disponible
        if (typeof updateUI === 'function') {
            console.log("🎨 Actualizando UI...");
            updateUI();
        }
        
        // Actualizar display del usuario si está disponible
        if (typeof updateUserDisplay === 'function') {
            console.log("👤 Actualizando display del usuario...");
            const currentUser = getCurrentUser();
            if (currentUser) {
                updateUserDisplay(currentUser);
            }
        }
        
        // Guardar progreso si está disponible
        if (typeof saveProgress === 'function') {
            console.log("💾 Guardando progreso...");
            saveProgress();
        }
        
        console.log("✅ Lección cargada exitosamente:", currentLesson.title);
    } catch (error) {
        console.error("❌ Error al cargar la lección:", error);
        console.error("❌ Stack trace:", error.stack);
    }
}

// Función para actualizar el estado del botón "siguiente lección"
function updateNextLessonButton() {
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    if (!nextLessonBtn) {
        console.log("❌ Botón 'nextLessonBtn' no encontrado en el DOM");
        return;
    }
    
    const allowedLessons = getAllowedLessonsByLevel();
    const hasNextLesson = appState.currentLesson < allowedLessons.length - 1;
    
    console.log("🔘 Actualizando botón siguiente lección:", {
        leccionActual: appState.currentLesson,
        totalLecciones: allowedLessons.length,
        haySiguiente: hasNextLesson,
        botonEncontrado: !!nextLessonBtn,
        botonVisible: nextLessonBtn.offsetParent !== null,
        botonDisplay: window.getComputedStyle(nextLessonBtn).display
    });
    
    if (hasNextLesson) {
        nextLessonBtn.disabled = false;
        nextLessonBtn.classList.remove('btn-disabled');
        nextLessonBtn.classList.add('btn-primary');
        nextLessonBtn.title = `Siguiente: ${allowedLessons[appState.currentLesson + 1].title}`;
        nextLessonBtn.style.display = 'inline-block'; // Asegurar que sea visible
        console.log("✅ Botón habilitado para:", allowedLessons[appState.currentLesson + 1].title);
        console.log("🔍 Estado del botón después de habilitar:", {
            disabled: nextLessonBtn.disabled,
            classes: nextLessonBtn.className,
            display: nextLessonBtn.style.display,
            visible: nextLessonBtn.offsetParent !== null
        });
    } else {
        nextLessonBtn.disabled = true;
        nextLessonBtn.classList.remove('btn-primary');
        nextLessonBtn.classList.add('btn-disabled');
        nextLessonBtn.title = '¡Felicidades! Has completado todas las lecciones de este nivel';
        console.log("🏁 No hay más lecciones disponibles en este nivel");
    }
}

// Función para asegurar que la sección de aprender esté visible
function ensureLearnSectionVisible() {
    try {
        // Verificar si estamos en la sección de aprender
        const learnSection = document.getElementById('learn');
        const learnTab = document.querySelector('.nav-tab[data-tab="learn"]');
        
        if (!learnSection || !learnTab) {
            console.log("⚠️ Sección de aprender no encontrada");
            return;
        }
        
        // Verificar si la sección está activa
        const isLearnActive = learnSection.classList.contains('active');
        const isTabActive = learnTab.classList.contains('active');
        
        console.log("🔍 Estado de la sección aprender:", {
            seccionActiva: isLearnActive,
            tabActivo: isTabActive,
            seccionVisible: learnSection.style.display !== 'none'
        });
        
        // Si no está activa, activarla
        if (!isLearnActive || !isTabActive) {
            console.log("🔄 Activando sección de aprender...");
            
            // Desactivar todas las secciones
            const allSections = document.querySelectorAll('.content-section');
            allSections.forEach(section => section.classList.remove('active'));
            
            // Desactivar todas las tabs
            const allTabs = document.querySelectorAll('.nav-tab');
            allTabs.forEach(tab => tab.classList.remove('active'));
            
            // Activar sección de aprender
            learnSection.classList.add('active');
            learnTab.classList.add('active');
            
            console.log("✅ Sección de aprender activada");
        }
        
        // Asegurar que el botón esté visible
        const nextLessonBtn = document.getElementById('nextLessonBtn');
        if (nextLessonBtn) {
            nextLessonBtn.style.display = 'inline-block';
            nextLessonBtn.style.visibility = 'visible';
            console.log("✅ Botón siguiente lección forzado a ser visible");
        }
        
    } catch (error) {
        console.error("❌ Error al asegurar visibilidad de la sección aprender:", error);
    }
}

// Función para avanzar a la siguiente lección
function nextLesson() {
    console.log("🚀 Avanzando a la siguiente lección...");
    console.log("🎯 Lección actual antes del avance:", appState.currentLesson);
    
    const allowedLessons = getAllowedLessonsByLevel();
    console.log("📋 Total de lecciones disponibles:", allowedLessons.length);
    console.log("📋 Lecciones disponibles:", allowedLessons.map(l => l.title));
    
    // Marcar la lección actual como completada y sumar XP
    const currentLessonId = appState.currentLesson;
    if (!isLessonCompleted(currentLessonId)) {
        console.log("🎯 Marcando lección como completada y sumando XP...");
        markLessonCompleted(currentLessonId);
        appState.lessonsCompleted++;
        appState.currentXP += LEVEL_SYSTEM.xpPerLesson;
        appState.vocabularyWordsLearned += allowedLessons[currentLessonId].vocabulary.length;
        
        console.log("✅ XP sumado:", LEVEL_SYSTEM.xpPerLesson);
        console.log("📊 XP total:", appState.currentXP);
        console.log("📚 Lecciones completadas:", appState.lessonsCompleted);
        
        // Actualizar progreso semanal
        const today = new Date().getDay();
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const currentDay = dayNames[today];
        appState.weeklyProgress[currentDay] += LEVEL_SYSTEM.xpPerLesson;
        
        // Verificar si subió de nivel
        const leveledUp = checkLevelUp();
        
        // Actualizar progreso del módulo "Aprender"
        if (window.moduleProgressSystem) {
            const currentLevel = appState.currentLevel || 1;
            const allowedLessons = getAllowedLessonsByLevel();
            const learnProgress = {
                progress: Math.round(((appState.currentLesson + 1) / allowedLessons.length) * 100),
                totalTasks: allowedLessons.length,
                completedTasks: appState.currentLesson + 1,
                completed: (appState.currentLesson + 1) >= allowedLessons.length
            };
            
            window.moduleProgressSystem.updateModuleProgress('learn', currentLevel, learnProgress);
            console.log("📚 Progreso de módulo 'Aprender' actualizado:", learnProgress);
        }
        
        // Debug: Mostrar estado antes de guardar
        console.log("🔍 Estado antes de guardar:", {
            currentXP: appState.currentXP,
            currentLevel: appState.currentLevel,
            currentLesson: appState.currentLesson
        });
        
        // Mostrar notificación de XP
        if (typeof showNotification === 'function') {
            const xpMessage = leveledUp ?
                `🎉 ¡Subiste de nivel! +${LEVEL_SYSTEM.xpPerLesson} XP` :
                `✅ Lección completada! +${LEVEL_SYSTEM.xpPerLesson} XP`;
            showNotification(xpMessage, 'success');
        } else {
            const xpMessage = leveledUp ?
                `🎉 ¡Subiste de nivel! +${LEVEL_SYSTEM.xpPerLesson} XP` :
                `✅ Lección completada! +${LEVEL_SYSTEM.xpPerLesson} XP`;
            alert(xpMessage);
        }
    } else {
        console.log("ℹ️ Lección ya completada anteriormente, no se suma XP");
    }
    
    // Verificar si hay siguiente lección DESPUÉS de procesar la actual
    const hasNextLesson = appState.currentLesson < allowedLessons.length - 1;
    console.log("✅ ¿Hay siguiente lección?", hasNextLesson);
    
    if (!hasNextLesson) {
        console.log("🏁 No hay más lecciones disponibles");
        if (typeof showNotification === 'function') {
            showNotification('¡Felicidades! Has completado todas las lecciones disponibles para tu nivel. 🎓', 'success');
        } else {
            alert('¡Felicidades! Has completado todas las lecciones disponibles para tu nivel. 🎓');
        }
        
        // Aún así, actualizar la UI y el progreso
        if (typeof updateUI === 'function') {
            console.log("🔄 Actualizando UI...");
            updateUI();
        }
        
        if (typeof updateUserDisplay === 'function') {
            console.log("🔄 Actualizando display del usuario...");
            const currentUser = getCurrentUser();
            if (currentUser) {
                updateUserDisplay(currentUser);
            }
        }
        
        if (typeof saveProgress === 'function') {
            console.log("💾 Guardando progreso...");
            saveProgress();
        }
        
        return;
    }
    
    // Avanzar al siguiente índice de lección
    appState.currentLesson++;
    console.log("📚 Nueva lección actual:", appState.currentLesson);
    console.log("📚 Título de la nueva lección:", allowedLessons[appState.currentLesson].title);
    
    // Guardar progreso ANTES de cargar la nueva lección
    if (typeof saveProgress === 'function') {
        console.log("💾 Guardando progreso de lección...");
        saveProgress();
    }
    
    // Cargar la nueva lección sin interrupciones
    console.log("🔄 Llamando a loadCurrentLesson...");
    loadCurrentLesson();
    
    // Sincronizar estado global después de cargar la lección
    console.log("🔄 Sincronizando estado global...");
    syncGlobalState();
    
    console.log("✅ Avance de lección completado exitosamente");
}

// Función para verificar si una lección está completada
function isLessonCompleted(lessonId) {
    // Usar el sistema unificado de appState
    if (typeof appState !== 'undefined' && appState.userProgress) {
        return appState.userProgress[lessonId]?.completed || false;
    }
    
    // Fallback al sistema anterior
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    return completedLessons.includes(lessonId);
}

// Función para marcar una lección como completada
function markLessonCompleted(lessonId) {
    // Usar el sistema unificado de appState
    if (typeof appState !== 'undefined') {
        if (!appState.userProgress) {
            appState.userProgress = {};
        }
        appState.userProgress[lessonId] = {
            completed: true,
            completedAt: new Date().toISOString(),
            xpEarned: LEVEL_SYSTEM.xpPerLesson
        };
        console.log("✅ Lección marcada como completada en appState:", lessonId);
        return;
    }
    
    // Fallback al sistema anterior
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
        console.log("✅ Lección marcada como completada en localStorage:", lessonId);
    } else {
        console.log("ℹ️ Lección ya estaba marcada como completada:", lessonId);
    }
}

// Función para verificar si subió de nivel
function checkLevelUp() {
    const currentLevel = appState.currentLevel;
    const currentXP = appState.currentXP;
    
    console.log("🔍 Verificando subida de nivel...");
    console.log("📊 Nivel actual:", currentLevel);
    console.log("📊 XP actual:", currentXP);
    
    // Buscar el siguiente nivel
    const nextLevel = LEVEL_SYSTEM.levels.find(level => level.level === currentLevel + 1);
    
    if (nextLevel && currentXP >= nextLevel.xpRequired) {
        console.log("🎉 ¡Subiendo de nivel!");
        console.log("📈 De nivel", currentLevel, "a nivel", nextLevel.level);
        
        appState.currentLevel = nextLevel.level;
        
        // Mostrar notificación de subida de nivel
        if (typeof showNotification === 'function') {
            showNotification(`🎉 ¡Subiste al nivel ${nextLevel.level}: ${nextLevel.title}!`, 'success');
        } else {
            alert(`🎉 ¡Subiste al nivel ${nextLevel.level}: ${nextLevel.title}!`);
        }
        
        // Actualizar la UI para mostrar el nuevo nivel
        if (typeof updateUI === 'function') {
            updateUI();
        }
        
        // Actualizar el display del usuario
        if (typeof updateUserDisplay === 'function') {
            const currentUser = getCurrentUser();
            if (currentUser) {
                updateUserDisplay(currentUser);
            }
        }
        
        return true;
    }
    
    console.log("ℹ️ No hay subida de nivel por ahora");
    return false;
}


// Función unificada para completar lección (reemplaza a completeLesson)
function completeLesson() {
    console.log("🎯 Completando lección actual...");
    nextLesson(); // Usar la función unificada
}

function reviewLesson() {
    if (typeof showNotification === 'function') {
        showNotification('Repasando lección actual...', 'info');
    } else {
        alert('Repasando lección actual...');
    }
}



function getAllowedLessonsByLevel() {
    console.log("📚 Iniciando obtención de lecciones permitidas por nivel...");
    try {
        // Obtener el nivel actual del usuario
        let userLevel = 1;
        
        // Intentar obtener desde appState primero
        if (typeof appState !== 'undefined' && appState.currentLevel) {
            userLevel = appState.currentLevel;
            console.log("📊 Nivel obtenido desde appState:", userLevel);
        } else {
            // Fallback a localStorage
            const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
            userLevel = userProgress.currentLevel || userProgress.level || 1;
            console.log("📊 Nivel obtenido desde localStorage:", userLevel);
        }
        
        // Obtener todas las lecciones disponibles hasta el nivel del usuario
        const allLessons = [];
        
        // Incluir lecciones de todos los niveles hasta el nivel actual
        if (LESSONS_DATABASE) {
            // Siempre incluir level1 (A1)
            if (LESSONS_DATABASE.level1) {
                allLessons.push(...LESSONS_DATABASE.level1);
                console.log("📖 Agregando lecciones level1:", LESSONS_DATABASE.level1.length);
            }
            
            // Incluir level2 (A2) para niveles 3+
            if (userLevel >= 3 && LESSONS_DATABASE.level2) {
                allLessons.push(...LESSONS_DATABASE.level2);
                console.log("📖 Agregando lecciones level2:", LESSONS_DATABASE.level2.length);
            }
            
            // Incluir level3 (B1) para niveles 4+
            if (userLevel >= 4 && LESSONS_DATABASE.level3) {
                allLessons.push(...LESSONS_DATABASE.level3);
                console.log("📖 Agregando lecciones level3:", LESSONS_DATABASE.level3.length);
            }
            
            // Incluir level4 (B2) para niveles 6+
            if (userLevel >= 6 && LESSONS_DATABASE.level4) {
                allLessons.push(...LESSONS_DATABASE.level4);
                console.log("📖 Agregando lecciones level4:", LESSONS_DATABASE.level4.length);
            }
            
            // Incluir level5 (B2+) para niveles 8+
            if (userLevel >= 8 && LESSONS_DATABASE.level5) {
                allLessons.push(...LESSONS_DATABASE.level5);
                console.log("📖 Agregando lecciones level5:", LESSONS_DATABASE.level5.length);
            }
        }
        
        console.log("🎯 Nivel del usuario:", userLevel, "→ Total lecciones disponibles:", allLessons.length);
        
        if (allLessons.length > 0) {
            return allLessons;
        } else if (LESSONS_DATABASE && LESSONS_DATABASE.level1) {
            console.log("⚠️ No se encontraron lecciones, usando level1 como fallback");
            return LESSONS_DATABASE.level1;
        }
        
        // Si no hay LESSONS_DATABASE, crear lecciones de ejemplo
        console.log("⚠️ LESSONS_DATABASE no disponible, creando lecciones de ejemplo");
        return [
            {
                title: "Saludos Básicos",
                difficulty: "Principiante",
                vocabulary: [
                    { english: "Hello", spanish: "Hola", pronunciation: "həˈloʊ" },
                    { english: "Goodbye", spanish: "Adiós", pronunciation: "ɡʊdˈbaɪ" },
                    { english: "Good morning", spanish: "Buenos días", pronunciation: "ɡʊd ˈmɔːrnɪŋ" }
                ],
                grammar: {
                    title: "Saludos Básicos",
                    content: "Los saludos son expresiones que usamos para saludar a otras personas."
                }
            },
            {
                title: "Números del 1 al 10",
                difficulty: "Principiante",
                vocabulary: [
                    { english: "One", spanish: "Uno", pronunciation: "wʌn" },
                    { english: "Two", spanish: "Dos", pronunciation: "tuː" },
                    { english: "Three", spanish: "Tres", pronunciation: "θriː" }
                ],
                grammar: {
                    title: "Números Cardinales",
                    content: "Los números cardinales se usan para contar y enumerar."
                }
            },
            {
                title: "Colores Básicos",
                difficulty: "Principiante",
                vocabulary: [
                    { english: "Red", spanish: "Rojo", pronunciation: "red" },
                    { english: "Blue", spanish: "Azul", pronunciation: "bluː" },
                    { english: "Green", spanish: "Verde", pronunciation: "ɡriːn" }
                ],
                grammar: {
                    title: "Colores",
                    content: "Los colores son adjetivos que describen la apariencia de los objetos."
                }
            }
        ];
        
    } catch (error) {
        console.error("❌ Error al obtener lecciones permitidas:", error);
        return [];
    }
}
// Lógica para obtener el MCER según dificultad
function getLessonMCERFromDifficulty(difficulty) {
    if (!difficulty) return 'A1';
    const d = String(difficulty).toLowerCase();
    if (d.includes('principiante')) return 'A1';
    if (d.includes('básico')) return 'A2';
    if (d.includes('intermedio')) return 'B1';
    if (d.includes('avanzado')) return 'B2';
    return 'A1';
}

// Función de inicialización para el módulo de lecciones
function initLessons() {
    console.log("🚀 Módulo de lecciones inicializado");
    try {
        // Verificar si LESSONS_DATABASE está disponible
        if (typeof LESSONS_DATABASE === 'undefined') {
            console.error("❌ LESSONS_DATABASE no está disponible");
            return;
        }
        
        console.log("📚 LESSONS_DATABASE disponible con niveles:", Object.keys(LESSONS_DATABASE));
        
        // Verificar si appState está disponible
        if (typeof appState === 'undefined') {
            console.error("❌ appState no está disponible");
            return;
        }
        
        console.log("📊 appState disponible:", appState);
        
        // Configurar event listeners para los botones de lección
        setupLessonEventListeners();
        
        // Cargar la lección actual al inicializar
        loadCurrentLesson();
        console.log("✅ Lección actual cargada en inicialización");
    } catch (error) {
        console.error("❌ Error en inicialización del módulo de lecciones:", error);
    }
}

// Función para configurar los event listeners de las lecciones
function setupLessonEventListeners() {
    console.log("🔗 Configurando event listeners de lecciones...");
    
    // Event listener para el botón "siguiente lección"
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    if (nextLessonBtn) {
        nextLessonBtn.addEventListener('click', nextLesson);
        console.log("✅ Event listener agregado al botón 'siguiente lección'");
    } else {
        console.warn("⚠️ Botón 'siguiente lección' no encontrado");
    }
    
    // Event listener para el botón "repasar"
    const reviewLessonBtn = document.getElementById('reviewLessonBtn');
    if (reviewLessonBtn) {
        reviewLessonBtn.setAttribute('aria-label', 'Repasar la lección actual');
        reviewLessonBtn.addEventListener('click', reviewLesson);
        // Asegurar navegación por teclado
        reviewLessonBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                reviewLesson();
            }
        });
        console.log("✅ Event listener agregado al botón 'repasar'");
    } else {
        console.warn("⚠️ Botón 'repasar' no encontrado");
    }
}

// Función de sincronización global para resolver problemas de estado
function syncGlobalState() {
    console.log("🔄 Iniciando sincronización global del estado...");
    
    try {
        // 1. Sincronizar appState con localStorage
        const storedProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
        
        console.log("🔍 Estado almacenado en localStorage:", {
            storedXP: storedProgress.xp,
            storedLevel: storedProgress.level,
            currentXP: appState.currentXP,
            currentLevel: appState.currentLevel
        });
        
        if (storedProgress.level && storedProgress.level !== appState.currentLevel) {
            console.log("📊 Sincronizando nivel desde localStorage:", storedProgress.level);
            appState.currentLevel = storedProgress.level;
        }
        
        if (storedProgress.xp && storedProgress.xp > appState.currentXP) {
            console.log("📊 Sincronizando XP desde localStorage:", storedProgress.xp);
            appState.currentXP = storedProgress.xp;
        } else if (appState.currentXP > 0) {
            console.log("📊 Preservando XP actual del appState:", appState.currentXP);
        }
        
        // Preservar diagnosticLevel si existe
        if (storedProgress.diagnosticLevel && !appState.diagnosticLevel) {
            console.log("🎯 Preservando nivel MCER del diagnóstico:", storedProgress.diagnosticLevel);
            appState.diagnosticLevel = storedProgress.diagnosticLevel;
        }
        
        // 2. Actualizar UI global
        if (typeof updateUI === 'function') {
            console.log("🎨 Actualizando UI global...");
            updateUI();
        }
        
        // 3. Actualizar display del usuario
        if (typeof updateUserDisplay === 'function') {
            console.log("👤 Actualizando display del usuario...");
            const currentUser = getCurrentUser();
            if (currentUser) {
                updateUserDisplay(currentUser);
            }
        }
        
        // 4. Actualizar botón de siguiente lección
        updateNextLessonButton();
        
        // 5. Guardar progreso sincronizado SOLO si no es después del diagnóstico
        const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
        if (typeof saveProgress === 'function' && !userProgress.diagnosticCompleted) {
            console.log("💾 Guardando progreso sincronizado...");
            saveProgress();
        } else if (userProgress.diagnosticCompleted) {
            console.log("⚠️ No guardando progreso - diagnóstico recién completado");
        }
        
        console.log("✅ Sincronización global completada");
        console.log("📊 Estado final:", {
            level: appState.currentLevel,
            xp: appState.currentXP,
            lesson: appState.currentLesson,
            diagnosticLevel: appState.diagnosticLevel
        });
        
    } catch (error) {
        console.error("❌ Error en sincronización global:", error);
    }
}

// Función para inicializar el estado desde el diagnóstico
function initializeFromDiagnostic(diagnosticLevel) {
    console.log("🎯 Inicializando estado desde diagnóstico:", diagnosticLevel);
    
    try {
        // Obtener el progreso guardado por el diagnóstico
        const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
        
        // Usar los valores del diagnóstico en lugar de sobrescribirlos
        const diagnosticLevelNum = userProgress.currentLevel || 1;
        const diagnosticXP = userProgress.currentXP || 0;
        
        console.log("📊 Valores del diagnóstico encontrados:", {
            level: diagnosticLevelNum,
            xp: diagnosticXP,
            mcerLevel: diagnosticLevel
        });
        
        // Actualizar appState con los valores del diagnóstico
        appState.currentLevel = diagnosticLevelNum;
        appState.currentXP = diagnosticXP;
        appState.currentLesson = 0;
        appState.diagnosticLevel = diagnosticLevel; // Agregar el nivel MCER del diagnóstico
        
        // NO sobrescribir localStorage, solo sincronizar appState
        console.log("🔄 Sincronizando appState con valores del diagnóstico...");
        
        // Sincronizar estado global
        syncGlobalState();
        
        console.log("✅ Estado inicializado desde diagnóstico:", {
            diagnosticLevel: diagnosticLevel,
            appLevel: diagnosticLevelNum,
            xp: diagnosticXP,
            appStateDiagnosticLevel: appState.diagnosticLevel
        });
        
    } catch (error) {
        console.error("❌ Error al inicializar desde diagnóstico:", error);
    }
}

// Función para obtener el nivel MCER actual
function getCurrentMCERLevel() {
    const xp = appState.currentXP || 0;
    
    if (xp < 100) return 'A1';
    else if (xp < 300) return 'A1+';
    else if (xp < 600) return 'A2';
    else if (xp < 1000) return 'A2+';
    else if (xp < 1500) return 'B1';
    else if (xp < 2500) return 'B1+';
    else if (xp < 4000) return 'B2';
    else if (xp < 6000) return 'B2+';
    else if (xp < 9000) return 'C1';
    else return 'C2';
}

// Exportar funciones globalmente
window.syncGlobalState = syncGlobalState;
window.initializeFromDiagnostic = initializeFromDiagnostic;
window.getCurrentMCERLevel = getCurrentMCERLevel;
window.loadCurrentLesson = loadCurrentLesson;
window.completeLesson = completeLesson;
window.reviewLesson = reviewLesson;
window.getAllowedLessonsByLevel = getAllowedLessonsByLevel;
window.getLessonMCERFromDifficulty = getLessonMCERFromDifficulty;
window.isLessonCompleted = isLessonCompleted;
window.markLessonCompleted = markLessonCompleted;
window.checkLevelUp = checkLevelUp;
window.initLessons = initLessons;
window.updateNextLessonButton = updateNextLessonButton;
window.ensureLearnSectionVisible = ensureLearnSectionVisible;
window.nextLesson = nextLesson;
window.setupLessonEventListeners = setupLessonEventListeners;
