// Módulo de vocabulario: categorías, palabras difíciles, detalle

function loadVocabularyCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    const vocabularyDetail = document.getElementById('vocabularyDetail');
    
    // Ocultar detalle y mostrar categorías
    vocabularyDetail.style.display = 'none';
    categoriesGrid.style.display = 'grid';
    
    categoriesGrid.innerHTML = '';
    
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
    
    Object.entries(VOCABULARY_CATEGORIES).forEach(([key, category]) => {
        const vocabulary = getVocabularyByCategory(key);
        const stats = getVocabularyStats();
        const categoryStats = stats[key];
        
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.onclick = () => loadVocabularyDetail(key);
        
        // Agregar iconos específicos para cada categoría
        const categoryIcons = {
            basic: '📚',
            business: '💼',
            technology: '💻',
            sports: '⚽',
            travel: '✈️',
            food: '🍽️',
            emotions: '😊',
            home: '🏠',
            health: '🏥',
            work: '👔',
            shopping: '🛍️',
            education: '🎓',
            entertainment: '🎬',
            environment: '🌍',
            finance: '💰',
            legal: '⚖️',
            medical: '🩺',
            academic: '📖',
            social_media: '📱',
            weather: '🌤️',
            transportation: '🚗'
        };
        
        const icon = categoryIcons[key] || '📝';
        
        categoryCard.innerHTML = `
            <h3>${icon} ${category.name}</h3>
            <p>${category.description}</p>
            <div class="category-stats">
                <span>${categoryStats.learned}/${categoryStats.total} palabras</span>
                <span>${categoryStats.percentage}%</span>
            </div>
            <div class="category-progress">
                <div class="category-progress-fill" style="width: ${categoryStats.percentage}%"></div>
            </div>
            <div class="category-actions">
                <button class="btn btn-primary practice-category-btn" data-category="${key}">
                    <i class="fas fa-play"></i> Practicar
                </button>
            </div>
        `;
        
        categoriesGrid.appendChild(categoryCard);
    });
    
    // Agregar event listeners para los botones de práctica
    document.querySelectorAll('.practice-category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const categoryKey = btn.dataset.category;
            startCategoryPractice(categoryKey);
        });
    });
}

function loadVocabularyDetail(categoryKey) {
    // Lógica para cargar detalle de vocabulario por categoría
    const categoriesGrid = document.getElementById('categoriesGrid');
    const vocabularyDetail = document.getElementById('vocabularyDetail');
    const category = VOCABULARY_CATEGORIES[categoryKey];
    const vocabulary = getVocabularyByCategory(categoryKey);
    
    // Ocultar categorías y mostrar detalle
    categoriesGrid.style.display = 'none';
    vocabularyDetail.style.display = 'block';
    
    vocabularyDetail.innerHTML = `
        <button class="back-button" onclick="loadVocabularyCategories()">
            <i class="fas fa-arrow-left"></i> Volver a Categorías
        </button>
        <h3>
            <i class="fas fa-book"></i>
            ${category.name} - ${vocabulary.length} palabras
        </h3>
        <div class="vocabulary-list">
            ${vocabulary.map((item, index) => `
                <div class="vocabulary-item-detail" data-word-index="${index}">
                    <div class="vocab-header">
                        <div class="english">${item.english}</div>
                        <button class="speak-btn" onclick="speakText('${cleanTextForSpeech(item.english)}', 'en-US')" title="Escuchar pronunciación">
                            <i class="fas fa-volume-up"></i>
                        </button>
                        <button class="difficult-btn" 
                                data-english="${item.english}"
                                data-spanish="${item.spanish}"
                                data-pronunciation="${item.pronunciation}"
                                title="${isWordDifficult(item) ? 'Quitar de difíciles' : 'Marcar como difícil'}">
                            ${isWordDifficult(item) ? '🚩' : '🏳️'}
                        </button>
                    </div>
                    <div class="spanish">${item.spanish}</div>
                    <div class="pronunciation">[${item.pronunciation}]</div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Agregar event listeners para los botones de palabras difíciles
    const difficultButtons = vocabularyDetail.querySelectorAll('.difficult-btn');
    difficultButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wordObj = {
                english: this.getAttribute('data-english'),
                spanish: this.getAttribute('data-spanish'),
                pronunciation: this.getAttribute('data-pronunciation')
            };
            toggleDifficultWord(wordObj, this);
        });
    });
    
    // Agregar event listeners para los botones de audio del ejercicio de listening
    const playBtn = vocabularyDetail.querySelector('.play-btn');
    const pauseBtn = vocabularyDetail.querySelector('.pause-btn');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            const text = this.getAttribute('data-text');
            console.log('Reproduciendo audio:', text);
            playListeningAudio(text);
        });
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            pauseListeningAudio();
        });
    }
}

function getVocabularyByCategory(category) {
    // Lógica para obtener vocabulario por categoría
    const categoryData = VOCABULARY_CATEGORIES[category];
    if (!categoryData) return [];
    
    let vocabulary = [];
    
    // Si la categoría tiene vocabulario directo, usarlo
    if (categoryData.vocabulary) {
        vocabulary = vocabulary.concat(categoryData.vocabulary);
    }
    
    // Si tiene lecciones asociadas, buscar en todos los niveles
    if (categoryData.lessons) {
    categoryData.lessons.forEach(lessonId => {
            // Buscar en todos los niveles de la base de datos
            Object.values(LESSONS_DATABASE).forEach(levelLessons => {
                const lesson = levelLessons.find(l => l.id === lessonId);
        if (lesson) {
            vocabulary = vocabulary.concat(lesson.vocabulary);
        }
    });
        });
    }
    
    return vocabulary;
}

function getDifficultWords() {
    // Lógica para obtener palabras difíciles
    const user = getCurrentUser();
    if (!user) return [];
    const key = `difficult_words_${user.email}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
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

function toggleDifficultWord(wordObj, clickedButtonEl) {
    // Lógica para alternar palabra difícil
    let difficult = getDifficultWords();
    const wasDifficult = isWordDifficult(wordObj);
    
    if (wasDifficult) {
        difficult = difficult.filter(w => !(w.english === wordObj.english && w.spanish === wordObj.spanish));
        showNotification(`"${wordObj.english}" removida de palabras difíciles`, 'info');
    } else {
        difficult.push(wordObj);
        showNotification(`"${wordObj.english}" marcada como difícil`, 'success');
    }
    
    saveDifficultWords(difficult);
    
    // Actualizar visualmente el botón que se hizo clic
    const clickedButton = clickedButtonEl || document.querySelector(`.difficult-btn[data-english="${wordObj.english}"][data-spanish="${wordObj.spanish}"]`);
    if (clickedButton) {
        if (wasDifficult) {
            clickedButton.innerHTML = '🏳️';
            clickedButton.title = 'Marcar como difícil';
        } else {
            clickedButton.innerHTML = '🚩';
            clickedButton.title = 'Quitar de difíciles';
        }
    }
    
    // Refrescar vista si estamos en detalle
    if (document.getElementById('vocabularyDetail').style.display === 'block') {
        // Recargar detalle actual
        const currentCategory = document.getElementById('vocabularyDetail').getAttribute('data-category');
        if (currentCategory) loadVocabularyDetail(currentCategory);
    }
    
    // Refrescar sección de difíciles si está visible
    if (document.getElementById('difficultWordsSection')) {
        loadDifficultWordsSection();
    }
}

function loadDifficultWordsSection() {
    // Lógica para cargar la sección de palabras difíciles
    const difficult = getDifficultWords();
    const categoriesGrid = document.getElementById('categoriesGrid');
    const vocabularyDetail = document.getElementById('vocabularyDetail');
    
    // Ocultar categorías y mostrar detalle
    categoriesGrid.style.display = 'none';
    vocabularyDetail.style.display = 'block';
    
    if (difficult.length === 0) {
        vocabularyDetail.innerHTML = `
            <button class="back-button" onclick="loadVocabularyCategories()">
                <i class="fas fa-arrow-left"></i> Volver a Categorías
            </button>
            <h3><span style="font-size:1.2em">🚩</span> Palabras Difíciles</h3>
            <p>No tienes palabras marcadas como difíciles aún. ¡Marca algunas palabras mientras estudias!</p>
        `;
        return;
    }
    
    vocabularyDetail.innerHTML = `
        <button class="back-button" onclick="loadVocabularyCategories()">
            <i class="fas fa-arrow-left"></i> Volver a Categorías
        </button>
        <h3>
            <span style="font-size:1.2em">🚩</span> Palabras Difíciles - ${difficult.length} palabras
        </h3>
        <p>Repasa estas palabras que has marcado como difíciles para mejorar tu vocabulario.</p>
        <div class="vocabulary-list">
            ${difficult.map(item => `
                <div class="vocabulary-item-detail">
                    <div class="vocab-header">
                        <div class="english">${item.english}</div>
                        <button class="speak-btn" onclick="speakText('${cleanTextForSpeech(item.english)}', 'en-US')" title="Escuchar pronunciación">
                            <i class="fas fa-volume-up"></i>
                        </button>
                        <button class="difficult-btn" 
                                data-english="${item.english}"
                                data-spanish="${item.spanish}"
                                data-pronunciation="${item.pronunciation}"
                                title="Quitar de difíciles">
                            🚩
                        </button>
                    </div>
                    <div class="spanish">${item.spanish}</div>
                    <div class="pronunciation">[${item.pronunciation}]</div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Agregar event listeners para los botones de palabras difíciles
    const difficultButtons = vocabularyDetail.querySelectorAll('.difficult-btn');
    difficultButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wordObj = {
                english: this.getAttribute('data-english'),
                spanish: this.getAttribute('data-spanish'),
                pronunciation: this.getAttribute('data-pronunciation')
            };
            toggleDifficultWord(wordObj, this);
        });
    });
}
