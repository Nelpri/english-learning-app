// Módulo de lecciones: carga y gestión de lecciones, progreso, repaso

function loadCurrentLesson() {
    const allowedLessons = getAllowedLessonsByLevel();
    const currentLesson = allowedLessons[appState.currentLesson];
    if (!currentLesson) return;

    document.getElementById('lessonTitle').textContent = currentLesson.title;
    document.getElementById('lessonDifficulty').textContent = currentLesson.difficulty;

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
    }else if (completedBadge) {
        completedBadge.remove();
    }

    // Cargar vocabulario
    const vocabularyGrid = document.getElementById('vocabularyGrid');
    vocabularyGrid.innerHTML = '';
    
    currentLesson.vocabulary.forEach(item => {
        const vocabItem = document.createElement('div');
        vocabItem.className = 'vocabulary-item';
        // Limpiar texto para síntesis de voz
        const cleanEnglish = cleanTextForSpeech(item.english);
        vocabItem.innerHTML = `
                                <div class="vocab-header">
                                    <div class="english">${item.english}</div>
                <div class="pronunciation-buttons">
                    <button class="speak-btn" onclick="speakText('${cleanEnglish}', 'en-US')" title="Escuchar pronunciación">
                                        <i class="fas fa-volume-up"></i>
                                    </button>
                </div>
                                </div>
                                <div class="spanish">${item.spanish}</div>
                                <div class="pronunciation">[${item.pronunciation}]</div>
        `;
        vocabularyGrid.appendChild(vocabItem);
    });

    // Cargar gramática
    const grammarContent = document.getElementById('grammarContent');
    grammarContent.innerHTML = `
        <h5>${currentLesson.grammar.title}</h5>
        <p>${currentLesson.grammar.explanation}</p>
                        <div class="examples">
            <h6>Ejemplos:</h6>
                            <ul>
                ${currentLesson.grammar.examples.map(example => `<li>${example}</li>`).join('')}
                            </ul>
        </div>
    `;
}


function completeLesson() {
    const currentLessonId = appState.currentLesson;
    
    // Verificar si la lección ya fue completada
    if (isLessonCompleted(currentLessonId)) {
        showNotification('Esta lección ya fue completada anteriormente.', 'info');
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
    
    // Avanzar a la siguiente lección
    appState.currentLesson++;
    if (appState.currentLesson >= LESSONS_DATABASE.level1.length) {
        appState.currentLesson = 0; // Volver al inicio si se completaron todas
    }
    
    updateUI();
    saveProgress();
    checkAchievements();
    
    // Verificar logros específicos después de completar lección
    ACHIEVEMENTS_SYSTEM.checkAchievements();
    
    // Registrar actividad en estadísticas
    STATISTICS_SYSTEM.recordActivity('lesson_completed', {
        lessonId: currentLessonId,
        xpEarned: LEVEL_SYSTEM.xpPerLesson,
        success: true
    });
    
    // Cargar siguiente lección
    loadCurrentLesson();
    
    // Sincronizar práctica con la nueva lección
    if (document.getElementById('practice').classList.contains('active')) {
        // Si estamos en la sección de práctica, actualizar para mostrar la nueva lección
        const practiceArea = document.getElementById('practiceArea');
        if (practiceArea && practiceArea.style.display !== 'none') {
            // Si hay un ejercicio activo, recargarlo con la nueva lección
            const header = practiceArea.querySelector('.practice-header h3');
            if (header) {
                const modo = header.textContent.trim().toLowerCase();
                if (['vocabulario', 'gramática', 'comprensión', 'pronunciación'].includes(modo)) {
                    const modeMap = {
                        'vocabulario': 'vocabulary',
                        'gramática': 'grammar',
                        'comprensión': 'listening',
                        'pronunciación': 'pronunciation'
                    };
                    loadPracticeExercise(modeMap[modo]);
                }
            }
        }
    }
    
    // Mostrar notificación
    const xpMessage = leveledUp ? 
        `¡Lección completada! +${LEVEL_SYSTEM.xpPerLesson} XP` : 
        `¡Lección completada! +${LEVEL_SYSTEM.xpPerLesson} XP`;
    showNotification(xpMessage, 'success');// Lógica para completar la lección
}

function reviewLesson() {
    showNotification('Repasando lección actual...', 'info');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Para mensajes largos, usar un diseño diferente
    if (message.length > 100) {
        notification.style.maxWidth = '400px';
        notification.style.padding = '1.5m';
    }
    
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Para mensajes largos, mostrar por más tiempo
    const duration = message.length >10? 5000 : 3000;
    setTimeout(() => {
        notification.remove();
    }, duration);// Lógica para repasar la lección
}

function getAllowedLessonsByLevel() {
    const mcer = getUserLevelMCER();
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
    
    // Combinar lecciones de todos los niveles permitidos
    let allLessons = [];
    allowedLevels.forEach(level => {
        if (LESSONS_DATABASE[level]) {
            allLessons = allLessons.concat(LESSONS_DATABASE[level]);
        }
    });
    
    // Filtrar por dificultad
    return allLessons.filter(lesson => allowedDifficulties.includes(lesson.difficulty));// Lógica para obtener lecciones permitidas por nivel
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
