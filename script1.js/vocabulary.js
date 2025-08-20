// Módulo de vocabulario: categorías, palabras difíciles, detalle

// Función para obtener vocabulario por categoría
function getVocabularyByCategory(categoryKey) {
    console.log("📚 Obteniendo vocabulario para categoría:", categoryKey);
    try {
        // La categoría difficult-words es especial, no tiene vocabulario predefinido
        if (categoryKey === 'difficult-words') {
            console.log("🚩 Categoría especial: difficult-words");
            return getDifficultWords();
        }
        
        if (window.VOCABULARY_DATABASE && window.VOCABULARY_DATABASE[categoryKey]) {
            const vocabulary = window.VOCABULARY_DATABASE[categoryKey];
            console.log("✅ Vocabulario encontrado:", vocabulary.length, "palabras");
            return vocabulary;
        } else {
            console.warn("⚠️ Base de datos de vocabulario no disponible para:", categoryKey);
            return [];
        }
    } catch (error) {
        console.error("❌ Error al obtener vocabulario:", error);
        return [];
    }
}

// Función para obtener estadísticas de vocabulario por categoría
function getVocabularyStats() {
    console.log("📊 Obteniendo estadísticas de vocabulario...");
    const stats = {};
    
    try {
        // Inicializar estadísticas para cada categoría
        if (window.VOCABULARY_CATEGORIES) {
            window.VOCABULARY_CATEGORIES.forEach(category => {
                stats[category.key] = {
                    learned: 0,
                    total: 0,
                    percentage: 0
                };
            });
            
            // Obtener progreso guardado
            const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
            const learnedWords = userProgress.learnedWords || [];
            
            // Calcular estadísticas por categoría
            window.VOCABULARY_CATEGORIES.forEach(category => {
                const vocabulary = getVocabularyByCategory(category.key);
                if (stats[category.key]) {
                    stats[category.key].total = vocabulary.length;
                    
                    // Contar palabras aprendidas en esta categoría
                    const learnedInCategory = learnedWords.filter(word => 
                        vocabulary.some(vocab => vocab.english === word.english)
                    );
                    stats[category.key].learned = learnedInCategory.length;
                    
                    // Calcular porcentaje
                    stats[category.key].percentage = stats[category.key].total > 0 ? 
                        Math.round((stats[category.key].learned / stats[category.key].total) * 100) : 0;
                }
            });
            
            console.log("✅ Estadísticas calculadas:", stats);
        } else {
            console.warn("⚠️ VOCABULARY_CATEGORIES no disponible");
        }
    } catch (error) {
        console.error("❌ Error al calcular estadísticas:", error);
    }
    
    return stats;
}

function loadVocabularyCategories() {
    console.log("📚 Cargando categorías de vocabulario...");
    try {
        const categoriesGrid = document.getElementById('categoriesGrid');
        const vocabularyDetail = document.getElementById('vocabularyDetail');
        
        if (!categoriesGrid) {
            console.error("❌ Elemento categoriesGrid no encontrado");
            return;
        }
        
        // Ocultar detalle y mostrar categorías
        if (vocabularyDetail) {
            vocabularyDetail.style.display = 'none';
        }
        categoriesGrid.style.display = 'grid';
        
        categoriesGrid.innerHTML = '';
        
        // Verificar que VOCABULARY_CATEGORIES esté disponible
        if (!window.VOCABULARY_CATEGORIES) {
            console.error("❌ VOCABULARY_CATEGORIES no disponible");
            categoriesGrid.innerHTML = '<p>Error: Categorías de vocabulario no disponibles</p>';
            return;
        }
        
        // Agregar sección de palabras difíciles al inicio
        const difficultWords = getDifficultWords();
        if (difficultWords.length > 0) {
            const difficultCard = document.createElement('div');
            difficultCard.className = 'category-card difficult-words-card';
            difficultCard.onclick = () => loadDifficultWordsSection();
            
            difficultCard.innerHTML = `
                <h3><span style="font-size:1.2em">🚩</span> Palabras Difíciles</h3>
                <p>Repasa las palabras que has marcado como difíciles</p>
                <div class="category-stats">
                    <span>${difficultWords.length} palabras</span>
                    <span>Para repasar</span>
                </div>
                <div class="category-progress">
                    <div class="category-progress-fill" style="width: 100%; background: linear-gradient(90deg, #ff6b6b, #ee5a24);"></div>
                </div>
            `;
            
            categoriesGrid.appendChild(difficultCard);
        }
        
        // Obtener estadísticas
        const stats = getVocabularyStats();
        console.log("📊 Estadísticas obtenidas:", stats);
        
        // Crear tarjetas para cada categoría
        window.VOCABULARY_CATEGORIES.forEach(category => {
            console.log("🎯 Procesando categoría:", category.key);
            
            // Obtener vocabulario para esta categoría
            const vocabulary = getVocabularyByCategory(category.key);
            console.log("📝 Vocabulario para", category.key, ":", vocabulary.length, "palabras");
            
            // Obtener estadísticas de esta categoría
            const categoryStats = stats[category.key];
            console.log("📊 Estadísticas para", category.key, ":", categoryStats);
            
            if (categoryStats) {
                const categoryCard = document.createElement('div');
                categoryCard.className = 'category-card';
                categoryCard.onclick = () => loadVocabularyDetail(category.key);
                
                // Agregar iconos específicos para cada categoría
                const categoryIcons = {
                    greetings: '👋',
                    numbers: '🔢',
                    colors: '🎨',
                    family: '👨‍👩‍👧‍👦',
                    food: '🍽️',
                    animals: '🐾',
                    weather: '🌤️',
                    'difficult-words': '🚩'
                };
                
                const icon = categoryIcons[category.key] || '📚';
                
                categoryCard.innerHTML = `
                    <h3>${icon} ${category.title}</h3>
                    <p>${category.description}</p>
                    <div class="category-stats">
                        <span>${categoryStats.learned}/${categoryStats.total} palabras</span>
                        <span>${categoryStats.percentage}% completado</span>
                    </div>
                    <div class="category-progress">
                        <div class="category-progress-fill" style="width: ${categoryStats.percentage}%"></div>
                    </div>
                `;
                
                categoriesGrid.appendChild(categoryCard);
                console.log("✅ Tarjeta creada para:", category.key);
            } else {
                console.warn("⚠️ Estadísticas no disponibles para:", category.key);
            }
        });
        
        console.log("✅ Categorías de vocabulario cargadas correctamente");
        
    } catch (error) {
        console.error("❌ Error en loadVocabularyCategories:", error);
        if (categoriesGrid) {
            categoriesGrid.innerHTML = '<p>Error al cargar categorías de vocabulario</p>';
        }
    }
}

function loadVocabularyDetail(categoryKey) {
    console.log("📖 Cargando detalle de vocabulario para:", categoryKey);
    try {
        const categoriesGrid = document.getElementById('categoriesGrid');
        const vocabularyDetail = document.getElementById('vocabularyDetail');
        
        if (!categoriesGrid || !vocabularyDetail) {
            console.error("❌ Elementos no encontrados para cargar detalle");
            return;
        }
        
        // Ocultar categorías y mostrar detalle
        categoriesGrid.style.display = 'none';
        vocabularyDetail.style.display = 'block';
        
        // Obtener vocabulario para esta categoría
        const vocabulary = getVocabularyByCategory(categoryKey);
        console.log("📝 Vocabulario obtenido:", vocabulary.length, "palabras");
        
        if (vocabulary.length === 0) {
            vocabularyDetail.innerHTML = `
                <button class="back-button" onclick="loadVocabularyCategories()">
                    <i class="fas fa-arrow-left"></i> Volver a Categorías
                </button>
                <h3><i class="fas fa-exclamation-triangle"></i> Categoría Vacía</h3>
                <p>Esta categoría no tiene vocabulario disponible aún.</p>
            `;
            return;
        }
        
        // Obtener información de la categoría
        const categoryInfo = window.VOCABULARY_CATEGORIES.find(cat => cat.key === categoryKey);
        const categoryTitle = categoryInfo ? categoryInfo.title : categoryKey;
        const categoryDescription = categoryInfo ? categoryInfo.description : '';
        
        // Crear el contenido del detalle usando la función robusta
        const vocabularyHTML = createVocabularyHTML(vocabulary, categoryKey, categoryTitle, categoryDescription);
        
        if (vocabularyHTML) {
            // Limpiar el contenedor
            vocabularyDetail.innerHTML = '';
            // Agregar el nuevo contenido
            vocabularyDetail.appendChild(vocabularyHTML);
        } else {
            // Fallback si hay error
            vocabularyDetail.innerHTML = `
                <button class="back-button" onclick="loadVocabularyCategories()">
                    <i class="fas fa-arrow-left"></i> Volver a Categorías
                </button>
                <h3>Error</h3>
                <p>Ocurrió un error al cargar el vocabulario.</p>
            `;
        }
        
        console.log("✅ Detalle de vocabulario cargado para:", categoryKey);
        
    } catch (error) {
        console.error("❌ Error al cargar detalle de vocabulario:", error);
        if (vocabularyDetail) {
            vocabularyDetail.innerHTML = `
                <button class="back-button" onclick="loadVocabularyCategories()">
                    <i class="fas fa-arrow-left"></i> Volver a Categorías
                </button>
                <h3>Error</h3>
                <p>Ocurrió un error al cargar el vocabulario.</p>
            `;
        }
    }
}

function getDifficultWords() {
    console.log("🚩 Obteniendo palabras difíciles...");
    try {
        const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
        const difficultWords = userProgress.difficultWords || [];
        console.log("✅ Palabras difíciles encontradas:", difficultWords.length);
        return difficultWords;
    } catch (error) {
        console.error("❌ Error al obtener palabras difíciles:", error);
        return [];
    }
}

function saveDifficultWords(words) {
    // Lógica para guardar palabras difíciles
    const user = getCurrentUser();
    if (!user) return;
    const key = `difficult_words_${user.email}`;
    localStorage.setItem(key, JSON.stringify(words));
}

function isWordDifficult(wordObj) {
    // Lógica para verificar si una palabra es difícil
    const difficult = getDifficultWords();
    return difficult.some(w => w.english === wordObj.english && w.spanish === wordObj.spanish);
}

function toggleDifficultWord(english, spanish, pronunciation) {
    console.log("🚩 Alternando palabra difícil:", english);
    try {
        const userProgress = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
        let difficultWords = userProgress.difficultWords || [];
        
        // Buscar si la palabra ya está marcada como difícil
        const existingIndex = difficultWords.findIndex(word => word.english === english);
        
        if (existingIndex !== -1) {
            // Quitar de palabras difíciles
            difficultWords.splice(existingIndex, 1);
            console.log("✅ Palabra removida de difíciles:", english);
            
            if (typeof showNotification === 'function') {
                showNotification(`"${english}" removida de palabras difíciles`, 'success');
            }
        } else {
            // Agregar a palabras difíciles
            const wordObj = { english, spanish, pronunciation };
            difficultWords.push(wordObj);
            console.log("✅ Palabra marcada como difícil:", english);
            
            if (typeof showNotification === 'function') {
                showNotification(`"${english}" marcada como difícil`, 'info');
            }
        }
        
        // Guardar en localStorage
        userProgress.difficultWords = difficultWords;
        localStorage.setItem('englishLearningProgress', JSON.stringify(userProgress));
        
        // Actualizar la UI si estamos en la vista de detalle
        const vocabularyDetail = document.getElementById('vocabularyDetail');
        if (vocabularyDetail && vocabularyDetail.style.display !== 'none') {
            // Recargar la vista actual
            const currentCategory = getCurrentCategoryFromView();
            if (currentCategory) {
                loadVocabularyDetail(currentCategory);
            }
        }
        
        console.log("💾 Palabras difíciles actualizadas:", difficultWords.length);
        
    } catch (error) {
        console.error("❌ Error al alternar palabra difícil:", error);
    }
}

function getCurrentCategoryFromView() {
    try {
        const vocabularyDetail = document.getElementById('vocabularyDetail');
        if (vocabularyDetail && vocabularyDetail.style.display !== 'none') {
            // Buscar el botón de práctica para obtener la categoría
            const practiceBtn = vocabularyDetail.querySelector('.practice-category-btn');
            if (practiceBtn && practiceBtn.onclick) {
                // Extraer la categoría del onclick
                const onclickStr = practiceBtn.onclick.toString();
                const match = onclickStr.match(/startCategoryPractice\('([^']+)'\)/);
                if (match) {
                    return match[1];
                }
            }
        }
        return null;
    } catch (error) {
        console.error("❌ Error al obtener categoría actual:", error);
        return null;
    }
}

function loadDifficultWordsSection() {
    console.log("🚩 Cargando sección de palabras difíciles...");
    try {
        const categoriesGrid = document.getElementById('categoriesGrid');
        const vocabularyDetail = document.getElementById('vocabularyDetail');
        
        if (categoriesGrid && vocabularyDetail) {
            categoriesGrid.style.display = 'none';
            vocabularyDetail.style.display = 'block';
            
            const difficultWords = getDifficultWords();
            
            if (difficultWords.length > 0) {
                vocabularyDetail.innerHTML = `
                    <button class="back-button" onclick="loadVocabularyCategories()">
                        <i class="fas fa-arrow-left"></i> Volver a Categorías
                    </button>
                    <h3><i class="fas fa-exclamation-triangle"></i> Palabras Difíciles</h3>
                    <p>Estas son las palabras que has marcado como difíciles. ¡Repásalas!</p>
                    <div class="vocabulary-list">
                        ${difficultWords.map(word => `
                            <div class="vocabulary-item-detail">
                                <div class="vocab-header">
                                    <span class="english">${word.english}</span>
                                    <div>
                                        <button class="speak-btn" onclick="speakWord('${word.english}')" title="Escuchar">
                                            <i class="fas fa-volume-up"></i>
                                        </button>
                                        <button class="difficult-btn" onclick="toggleDifficultWord('${word.english}')" title="Marcar como fácil">
                                            <i class="fas fa-check"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="spanish">${word.spanish}</div>
                                <div class="pronunciation">${word.pronunciation}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                vocabularyDetail.innerHTML = `
                    <button class="back-button" onclick="loadVocabularyCategories()">
                        <i class="fas fa-arrow-left"></i> Volver a Categorías
                    </button>
                    <h3><i class="fas fa-exclamation-triangle"></i> Palabras Difíciles</h3>
                    <p>No tienes palabras marcadas como difíciles aún. ¡Marca palabras mientras aprendes!</p>
                `;
            }
            
            console.log("✅ Sección de palabras difíciles cargada");
        } else {
            console.error("❌ Elementos no encontrados para cargar palabras difíciles");
        }
    } catch (error) {
        console.error("❌ Error al cargar palabras difíciles:", error);
    }
}

function speakWord(text) {
    console.log("🔊 Pronunciando palabra:", text);
    try {
        // Limpiar el texto de caracteres de escape
        const cleanText = text.replace(/\\'/g, "'").replace(/\\"/g, '"');
        console.log("🧹 Texto limpio:", cleanText);
        
        if (typeof window.speakText === 'function') {
            window.speakText(cleanText, 'en-US');
            console.log("✅ Palabra pronunciada usando speakText");
        } else if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            utterance.pitch = 1.0;
            
            // Configurar voz en inglés si está disponible
            const voices = speechSynthesis.getVoices();
            const englishVoice = voices.find(voice => 
                voice.lang.startsWith('en') && voice.lang.includes('US')
            );
            
            if (englishVoice) {
                utterance.voice = englishVoice;
                console.log("🎤 Voz en inglés configurada:", englishVoice.name);
            }
            
            speechSynthesis.speak(utterance);
            console.log("✅ Palabra pronunciada usando SpeechSynthesis");
        } else {
            console.warn("⚠️ Funcionalidad de pronunciación no disponible");
        }
    } catch (error) {
        console.error("❌ Error al pronunciar palabra:", error);
    }
}

function startCategoryPractice(categoryKey) {
    console.log("�� Iniciando práctica para categoría:", categoryKey);
    try {
        // Cambiar a la pestaña de práctica
        const practiceTab = document.querySelector('.nav-tab[data-tab="practice"]');
        if (practiceTab) {
            practiceTab.click();
        }
        
        // Esperar un momento para que se cargue la sección de práctica
        setTimeout(() => {
            // Cargar ejercicio de vocabulario para esta categoría
            if (typeof window.loadPracticeExercise === 'function') {
                window.loadPracticeExercise('vocabulary', categoryKey);
                console.log("✅ Ejercicio de práctica iniciado para categoría:", categoryKey);
            } else {
                console.error("❌ Función loadPracticeExercise no disponible");
                // Fallback: mostrar mensaje
                const practiceArea = document.getElementById('practiceArea');
                if (practiceArea) {
                    practiceArea.style.display = 'block';
                    practiceArea.innerHTML = `
                        <div class="practice-header">
                            <button class="btn btn-secondary" onclick="document.querySelector('.practice-modes').style.display='grid';document.getElementById('practiceArea').style.display='none'">
                                <i class="fas fa-arrow-left"></i> Volver a Modos
                            </button>
                            <h3>Práctica de Vocabulario</h3>
                        </div>
                        <div class="exercise-container">
                            <p>Práctica de vocabulario para la categoría: ${categoryKey}</p>
                            <p>Los ejercicios de práctica no están disponibles aún.</p>
                        </div>
                    `;
                }
            }
        }, 300);
        
    } catch (error) {
        console.error("❌ Error al iniciar práctica de categoría:", error);
    }
}

function createVocabularyHTML(vocabulary, categoryKey, categoryTitle, categoryDescription) {
    console.log("🔨 Creando HTML para vocabulario:", vocabulary.length, "palabras");
    try {
        const vocabularyItems = vocabulary.map(word => {
            // Crear elementos DOM en lugar de strings para evitar problemas de sintaxis
            const itemDiv = document.createElement('div');
            itemDiv.className = 'vocabulary-item-detail';
            
            const headerDiv = document.createElement('div');
            headerDiv.className = 'vocab-header';
            
            const englishSpan = document.createElement('span');
            englishSpan.className = 'english';
            englishSpan.textContent = word.english;
            
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'vocab-actions';
            
            // Botón de pronunciación
            const speakBtn = document.createElement('button');
            speakBtn.className = 'speak-btn';
            speakBtn.title = 'Escuchar pronunciación';
            speakBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            speakBtn.addEventListener('click', () => speakWord(word.english));
            
            // Botón de marcar difícil
            const difficultBtn = document.createElement('button');
            difficultBtn.className = 'difficult-btn';
            difficultBtn.title = 'Marcar como difícil';
            difficultBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            difficultBtn.addEventListener('click', () => toggleDifficultWord(word.english, word.spanish, word.pronunciation));
            
            actionsDiv.appendChild(speakBtn);
            actionsDiv.appendChild(difficultBtn);
            
            headerDiv.appendChild(englishSpan);
            headerDiv.appendChild(actionsDiv);
            
            const spanishDiv = document.createElement('div');
            spanishDiv.className = 'spanish';
            spanishDiv.textContent = word.spanish;
            
            const pronunciationDiv = document.createElement('div');
            pronunciationDiv.className = 'pronunciation';
            pronunciationDiv.textContent = word.pronunciation;
            
            itemDiv.appendChild(headerDiv);
            itemDiv.appendChild(spanishDiv);
            itemDiv.appendChild(pronunciationDiv);
            
            return itemDiv;
        });
        
        // Crear contenedor principal
        const container = document.createElement('div');
        
        // Botón de volver
        const backBtn = document.createElement('button');
        backBtn.className = 'back-button';
        backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Volver a Categorías';
        backBtn.addEventListener('click', loadVocabularyCategories);
        
        // Título
        const title = document.createElement('h3');
        title.innerHTML = '<i class="fas fa-book-open"></i> ' + categoryTitle;
        
        // Descripción
        const description = document.createElement('p');
        description.textContent = categoryDescription;
        
        // Estadísticas
        const statsDiv = document.createElement('div');
        statsDiv.className = 'vocabulary-stats';
        
        const wordsStat = document.createElement('span');
        wordsStat.className = 'stat-item';
        wordsStat.innerHTML = '<i class="fas fa-words"></i> ' + vocabulary.length + ' palabras';
        
        const availableStat = document.createElement('span');
        availableStat.className = 'stat-item';
        availableStat.innerHTML = '<i class="fas fa-target"></i> ' + vocabulary.length + ' disponibles';
        
        statsDiv.appendChild(wordsStat);
        statsDiv.appendChild(availableStat);
        
        // Lista de vocabulario
        const vocabularyList = document.createElement('div');
        vocabularyList.className = 'vocabulary-list';
        vocabularyItems.forEach(item => vocabularyList.appendChild(item));
        
        // Acciones
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'category-actions';
        
        const practiceBtn = document.createElement('button');
        practiceBtn.className = 'btn btn-primary practice-category-btn';
        practiceBtn.innerHTML = '<i class="fas fa-play"></i> Practicar ' + categoryTitle;
        practiceBtn.addEventListener('click', () => startCategoryPractice(categoryKey));
        
        actionsDiv.appendChild(practiceBtn);
        
        // Ensamblar todo
        container.appendChild(backBtn);
        container.appendChild(title);
        container.appendChild(description);
        container.appendChild(statsDiv);
        container.appendChild(vocabularyList);
        container.appendChild(actionsDiv);
        
        console.log("✅ HTML del vocabulario creado correctamente");
        return container;
        
    } catch (error) {
        console.error("❌ Error al crear HTML del vocabulario:", error);
        return null;
    }
}

// Función de inicialización para el módulo de vocabulario
function initVocab() {
    console.log("🚀 Módulo de vocabulario inicializado");
    try {
        // Verificar que las funciones estén disponibles
        console.log("📚 loadVocabularyCategories disponible:", typeof loadVocabularyCategories === 'function');
        console.log("🔍 loadVocabularyDetail disponible:", typeof loadVocabularyDetail === 'function');
        console.log("📊 getVocabularyStats disponible:", typeof getVocabularyStats === 'function');
        
        // Cargar categorías de vocabulario
        loadVocabularyCategories();
        console.log("✅ Categorías de vocabulario cargadas");
        
        console.log("✅ Módulo de vocabulario inicializado correctamente");
    } catch (error) {
        console.error("❌ Error en inicialización del módulo de vocabulario:", error);
    }
}

// Exportar funciones globalmente
window.loadVocabularyCategories = loadVocabularyCategories;
window.loadVocabularyDetail = loadVocabularyDetail;
window.getVocabularyStats = getVocabularyStats;
window.getVocabularyByCategory = getVocabularyByCategory;
window.getDifficultWords = getDifficultWords;
window.loadDifficultWordsSection = loadDifficultWordsSection;
window.speakWord = speakWord;
window.toggleDifficultWord = toggleDifficultWord;
window.startCategoryPractice = startCategoryPractice;
window.createVocabularyHTML = createVocabularyHTML;
window.initVocab = initVocab;
