// Módulo de lecciones: carga y gestión de lecciones, progreso, repaso

function loadCurrentLesson() {
    console.log("📚 Iniciando carga de lección actual...");
    console.log("🎯 appState.currentLesson:", appState.currentLesson);
    
    const allowedLessons = getAllowedLessonsByLevel();
    console.log("📋 Lecciones permitidas:", allowedLessons.length);
    
    const currentLesson = allowedLessons[appState.currentLesson];
    if (!currentLesson) {
        console.warn("⚠️ No se encontró lección para el índice:", appState.currentLesson);
        return;
    }
    
    console.log("✅ Lección encontrada:", currentLesson.title);
    
    try {
        document.getElementById('lessonTitle').textContent = currentLesson.title;
        document.getElementById('lessonDifficulty').textContent = currentLesson.difficulty;
        console.log("📝 Título y dificultad actualizados");
        
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
        vocabularyGrid.innerHTML = '';
        
        currentLesson.vocabulary.forEach(item => {
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
        });
        console.log("📚 Vocabulario cargado:", currentLesson.vocabulary.length, "palabras");
        
        // Cargar gramática
        const grammarContent = document.getElementById('grammarContent');
        grammarContent.innerHTML = `
            <h5>${currentLesson.grammar.title}</h5>
            <p>${currentLesson.grammar.content}</p>
        `;
        console.log("📖 Gramática cargada:", currentLesson.grammar.title);
        
        console.log("✅ Lección cargada exitosamente");
    } catch (error) {
        console.error("❌ Error al cargar la lección:", error);
    }
}

// Función para verificar si una lección está completada
function isLessonCompleted(lessonId) {
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    return completedLessons.includes(lessonId);
}

// Función para marcar una lección como completada
function markLessonCompleted(lessonId) {
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
    }
}

// Función para verificar si subió de nivel
function checkLevelUp() {
    const currentLevel = appState.currentLevel;
    const currentXP = appState.currentXP;
    
    // Buscar el siguiente nivel
    const nextLevel = LEVEL_SYSTEM.levels.find(level => level.level === currentLevel + 1);
    
    if (nextLevel && currentXP >= nextLevel.xpRequired) {
        appState.currentLevel = nextLevel.level;
        if (typeof showNotification === 'function') {
            showNotification(`🎉 ¡Subiste al nivel ${nextLevel.level}: ${nextLevel.title}!`, 'success');
        } else {
            alert(`🎉 ¡Subiste al nivel ${nextLevel.level}: ${nextLevel.title}!`);
        }
        return true;
    }
    
    return false;
}


function completeLesson() {
    const currentLessonId = appState.currentLesson;
    
    // Verificar si la lección ya fue completada
    if (isLessonCompleted(currentLessonId)) {
        if (typeof showNotification === 'function') {
            showNotification('Esta lección ya fue completada anteriormente.', 'info');
        } else {
            alert('Esta lección ya fue completada anteriormente.');
        }
        // Solo avanzar a la siguiente lección sin sumar XP
        appState.currentLesson++;
        if (appState.currentLesson >= LESSONS_DATABASE.level1.length) {
            appState.currentLesson = 0; // Volver al inicio si se completaron todas
        }
        loadCurrentLesson();
        return;
    }
    
    // Marcar lección como completada y sumar XP
    markLessonCompleted(currentLessonId);
    appState.lessonsCompleted++;
    appState.currentXP += LEVEL_SYSTEM.xpPerLesson;
    appState.vocabularyWordsLearned += LESSONS_DATABASE.level1[currentLessonId].vocabulary.length;
    
    // Actualizar progreso semanal
    const today = new Date().getDay();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = dayNames[today];
    appState.weeklyProgress[currentDay] += LEVEL_SYSTEM.xpPerLesson;
    
    // Verificar si subió de nivel
    const leveledUp = checkLevelUp();
    
    // Mostrar notificación
    const xpMessage = leveledUp ? 
        `¡Lección completada! +${LEVEL_SYSTEM.xpPerLesson} XP` : 
        `¡Lección completada! +${LEVEL_SYSTEM.xpPerLesson} XP`;
    if (typeof showNotification === 'function') {
        showNotification(xpMessage, 'success');
    } else {
        alert(xpMessage);
    }
    
    // Avanzar a la siguiente lección
    appState.currentLesson++;
    if (appState.currentLesson >= LESSONS_DATABASE.level1.length) {
        appState.currentLesson = 0; // Volver al inicio si se completaron todas
    }
    loadCurrentLesson();
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
        const mcer = getUserLevelMCER();
        console.log("🏆 Nivel MCER del usuario:", mcer);
        
        // Relación MCER -> dificultad y niveles
        const allowedDifficulties = [];
        const allowedLevels = [];
        
        if (mcer === 'A1') {
            allowedDifficulties.push('Principiante');
            allowedLevels.push('level1');
        } else if (mcer === 'A2') {
            allowedDifficulties.push('Principiante', 'Básico');
            allowedLevels.push('level1');
        } else if (mcer === 'B1') {
            allowedDifficulties.push('Principiante', 'Básico', 'Intermedio');
            allowedLevels.push('level1', 'level2');
        } else if (mcer === 'B2') {
            allowedDifficulties.push('Principiante', 'Básico', 'Intermedio', 'Avanzado');
            allowedLevels.push('level1', 'level2', 'level3');
        } else if (mcer === 'C1' || mcer === 'C2') {
            allowedDifficulties.push('Principiante', 'Básico', 'Intermedio', 'Avanzado', 'Experto');
            allowedLevels.push('level1', 'level2', 'level3', 'level4');
        }
        
        console.log("🎯 Dificultades permitidas:", allowedDifficulties);
        console.log("📊 Niveles permitidos:", allowedLevels);
        
        // Combinar lecciones de todos los niveles permitidos
        let allLessons = [];
        allowedLevels.forEach(level => {
            if (LESSONS_DATABASE[level]) {
                console.log(`📖 Agregando lecciones del nivel: ${level} (${LESSONS_DATABASE[level].length} lecciones)`);
                allLessons = allLessons.concat(LESSONS_DATABASE[level]);
            } else {
                console.warn(`⚠️ Nivel ${level} no encontrado en LESSONS_DATABASE`);
            }
        });
        
        console.log("📚 Total de lecciones disponibles:", allLessons.length);
        
        // Filtrar por dificultad
        const filteredLessons = allLessons.filter(lesson => allowedDifficulties.includes(lesson.difficulty));
        console.log("✅ Lecciones filtradas por dificultad:", filteredLessons.length);
        
        return filteredLessons;
    } catch (error) {
        console.error("❌ Error al obtener lecciones permitidas:", error);
        // Retornar lecciones del nivel 1 como fallback
        if (LESSONS_DATABASE.level1) {
            console.log("🔄 Usando lecciones del nivel 1 como fallback");
            return LESSONS_DATABASE.level1;
        }
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
        
        // Cargar la lección actual al inicializar
        loadCurrentLesson();
        console.log("✅ Lección actual cargada en inicialización");
    } catch (error) {
        console.error("❌ Error en inicialización del módulo de lecciones:", error);
    }
}

// Exportar funciones globalmente
window.loadCurrentLesson = loadCurrentLesson;
window.completeLesson = completeLesson;
window.reviewLesson = reviewLesson;
window.getAllowedLessonsByLevel = getAllowedLessonsByLevel;
window.getLessonMCERFromDifficulty = getLessonMCERFromDifficulty;
window.isLessonCompleted = isLessonCompleted;
window.markLessonCompleted = markLessonCompleted;
window.checkLevelUp = checkLevelUp;
window.initLessons = initLessons;
