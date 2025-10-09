// Sistema de integración con APIs externas
class APIIntegrationSystem {
    constructor() {
        this.apiKeys = {
            // APIs gratuitas que no requieren clave
            dictionary: 'https://api.dictionaryapi.dev/api/v2/entries/en/',
            translation: 'https://api.mymemory.translated.net/get',
            // Para futuras implementaciones con APIs que requieren clave
            // pexels: 'YOUR_PEXELS_API_KEY',
            // unsplash: 'YOUR_UNSPLASH_API_KEY'
        };

        this.cache = new Map();
        this.cacheTimeout = 1000 * 60 * 60; // 1 hora

        this.init();
    }

    init() {
        console.log("🔌 Inicializando sistema de integración con APIs externas...");
        console.log("✅ Sistema de APIs inicializado");
    }

    // API de Diccionario (gratuita)
    async getWordDefinition(word) {
        try {
            // Verificar cache primero
            const cached = this.getFromCache(`dict_${word}`);
            if (cached) {
                return cached;
            }

            console.log(`📚 Consultando definición de "${word}"...`);

            const response = await fetch(`${this.apiKeys.dictionary}${encodeURIComponent(word)}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data || data.length === 0) {
                throw new Error('Palabra no encontrada');
            }

            // Procesar la respuesta
            const definition = this.processDictionaryResponse(data[0]);

            // Guardar en cache
            this.saveToCache(`dict_${word}`, definition);

            return definition;

        } catch (error) {
            console.error('❌ Error al obtener definición:', error);
            return {
                word: word,
                error: true,
                message: 'No se pudo obtener la definición. Verifica tu conexión a internet.'
            };
        }
    }

    processDictionaryResponse(data) {
        const definition = {
            word: data.word,
            phonetic: data.phonetic || '',
            meanings: []
        };

        // Procesar significados
        if (data.meanings && data.meanings.length > 0) {
            data.meanings.forEach(meaning => {
                const processedMeaning = {
                    partOfSpeech: meaning.partOfSpeech,
                    definitions: meaning.definitions.map(def => ({
                        definition: def.definition,
                        example: def.example || '',
                        synonyms: def.synonyms || [],
                        antonyms: def.antonyms || []
                    }))
                };
                definition.meanings.push(processedMeaning);
            });
        }

        return definition;
    }

    // API de Traducción (gratuita)
    async translateText(text, fromLang = 'en', toLang = 'es') {
        try {
            // Verificar cache
            const cacheKey = `trans_${fromLang}_${toLang}_${text}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) {
                return cached;
            }

            console.log(`🌐 Traduciendo "${text}" de ${fromLang} a ${toLang}...`);

            const params = new URLSearchParams({
                q: text,
                langpair: `${fromLang}|${toLang}`
            });

            const response = await fetch(`${this.apiKeys.translation}?${params}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.responseStatus !== 200) {
                throw new Error(data.responseDetails || 'Error en la traducción');
            }

            const translation = {
                original: text,
                translated: data.responseData.translatedText,
                fromLang: fromLang,
                toLang: toLang,
                match: data.responseData.match
            };

            // Guardar en cache
            this.saveToCache(cacheKey, translation);

            return translation;

        } catch (error) {
            console.error('❌ Error al traducir:', error);
            return {
                original: text,
                translated: text, // fallback al texto original
                error: true,
                message: 'No se pudo traducir. Verifica tu conexión a internet.'
            };
        }
    }

    // API de Imágenes (simulada - en producción usar Pexels o Unsplash)
    async getImagesForWord(word, count = 3) {
        try {
            // Simular búsqueda de imágenes (en producción usar API real)
            console.log(`🖼️ Buscando imágenes para "${word}"...`);

            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 500));

            // Devolver URLs de placeholder (en producción serían URLs reales de la API)
            const images = [];
            for (let i = 0; i < count; i++) {
                images.push({
                    url: `https://picsum.photos/300/200?random=${word}_${i}`,
                    alt: `${word} - imagen ${i + 1}`,
                    source: 'placeholder'
                });
            }

            return images;

        } catch (error) {
            console.error('❌ Error al obtener imágenes:', error);
            return [];
        }
    }

    // API de Pronunciación (simulada - usa Web Speech API del navegador)
    async getPronunciationAudio(word) {
        try {
            console.log(`🔊 Generando pronunciación para "${word}"...`);

            // Verificar si Web Speech API está disponible
            if (!window.speechSynthesis) {
                throw new Error('Web Speech API no disponible');
            }

            return {
                word: word,
                available: true,
                method: 'browser_speech_api'
            };

        } catch (error) {
            console.error('❌ Error al obtener pronunciación:', error);
            return {
                word: word,
                available: false,
                error: error.message
            };
        }
    }

    // API de Contenido Educativo (simulada)
    async getEducationalContent(topic, type = 'explanation') {
        try {
            console.log(`📖 Obteniendo contenido educativo sobre "${topic}"...`);

            // Simular contenido educativo
            await new Promise(resolve => setTimeout(resolve, 300));

            const content = {
                topic: topic,
                type: type,
                title: `Explicación sobre ${topic}`,
                content: this.generateEducationalContent(topic, type),
                examples: this.generateExamples(topic),
                difficulty: 'intermediate'
            };

            return content;

        } catch (error) {
            console.error('❌ Error al obtener contenido educativo:', error);
            return {
                topic: topic,
                error: true,
                message: 'No se pudo cargar el contenido educativo.'
            };
        }
    }

    generateEducationalContent(topic, type) {
        // Contenido educativo simulado
        const contents = {
            grammar: {
                explanation: `La gramática del inglés incluye reglas para sustantivos, verbos, adjetivos y más. El tema "${topic}" se refiere a las reglas específicas para construir oraciones correctas.`,
                examples: [
                    "I eat apples. (Yo como manzanas)",
                    "She runs fast. (Ella corre rápido)",
                    "They are happy. (Ellos están felices)"
                ]
            },
            vocabulary: {
                explanation: `El vocabulario en inglés se construye aprendiendo palabras por categorías. "${topic}" es una categoría importante que incluye términos relacionados con este tema.`,
                examples: [
                    "House - Casa",
                    "Car - Auto",
                    "Book - Libro"
                ]
            }
        };

        return contents[type]?.explanation || `Contenido educativo sobre ${topic}. Este tema es fundamental para el aprendizaje del inglés.`;
    }

    generateExamples(topic) {
        // Generar ejemplos relacionados con el tema
        const examples = [
            `Ejemplo 1: Oración simple con ${topic}`,
            `Ejemplo 2: Pregunta sobre ${topic}`,
            `Ejemplo 3: Respuesta usando ${topic}`
        ];

        return examples;
    }

    // Sistema de cache
    saveToCache(key, data) {
        const cacheEntry = {
            data: data,
            timestamp: Date.now()
        };
        this.cache.set(key, cacheEntry);

        // Limpiar cache antiguo
        this.cleanOldCache();
    }

    getFromCache(key) {
        const entry = this.cache.get(key);
        if (!entry) return null;

        // Verificar si no ha expirado
        if (Date.now() - entry.timestamp > this.cacheTimeout) {
            this.cache.delete(key);
            return null;
        }

        return entry.data;
    }

    cleanOldCache() {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now - entry.timestamp > this.cacheTimeout) {
                this.cache.delete(key);
            }
        }
    }

    // Crear UI para mostrar contenido de APIs
    createDefinitionCard(definition) {
        if (definition.error) {
            return this.createErrorCard(definition.message);
        }

        const card = document.createElement('div');
        card.className = 'api-content-card definition-card';
        card.innerHTML = `
            <div class="card-header">
                <h4><i class="fas fa-book"></i> Definición: ${definition.word}</h4>
                ${definition.phonetic ? `<span class="phonetic">/${definition.phonetic}/</span>` : ''}
            </div>
            <div class="card-content">
                ${definition.meanings.map(meaning => `
                    <div class="meaning">
                        <h5 class="part-of-speech">${meaning.partOfSpeech}</h5>
                        <ul class="definitions">
                            ${meaning.definitions.map(def => `
                                <li>
                                    <p class="definition-text">${def.definition}</p>
                                    ${def.example ? `<p class="example"><em>"${def.example}"</em></p>` : ''}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        `;

        return card;
    }

    createTranslationCard(translation) {
        if (translation.error) {
            return this.createErrorCard(translation.message);
        }

        const card = document.createElement('div');
        card.className = 'api-content-card translation-card';
        card.innerHTML = `
            <div class="card-header">
                <h4><i class="fas fa-language"></i> Traducción</h4>
            </div>
            <div class="card-content">
                <div class="translation-pair">
                    <div class="original">
                        <span class="lang-label">${translation.fromLang.toUpperCase()}:</span>
                        <p>${translation.original}</p>
                    </div>
                    <div class="translated">
                        <span class="lang-label">${translation.toLang.toUpperCase()}:</span>
                        <p>${translation.translated}</p>
                    </div>
                </div>
                ${translation.match ? `<div class="match-info">Coincidencia: ${Math.round(translation.match * 100)}%</div>` : ''}
            </div>
        `;

        return card;
    }

    createImagesCard(images, word) {
        const card = document.createElement('div');
        card.className = 'api-content-card images-card';
        card.innerHTML = `
            <div class="card-header">
                <h4><i class="fas fa-images"></i> Imágenes relacionadas: ${word}</h4>
            </div>
            <div class="card-content">
                <div class="images-grid">
                    ${images.map(img => `
                        <div class="image-item">
                            <img src="${img.url}" alt="${img.alt}" loading="lazy">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        return card;
    }

    createEducationalCard(content) {
        if (content.error) {
            return this.createErrorCard(content.message);
        }

        const card = document.createElement('div');
        card.className = 'api-content-card educational-card';
        card.innerHTML = `
            <div class="card-header">
                <h4><i class="fas fa-graduation-cap"></i> ${content.title}</h4>
            </div>
            <div class="card-content">
                <div class="educational-content">
                    <p>${content.content}</p>
                    <h5>Ejemplos:</h5>
                    <ul class="examples-list">
                        ${content.examples.map(example => `<li>${example}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        return card;
    }

    createErrorCard(message) {
        const card = document.createElement('div');
        card.className = 'api-content-card error-card';
        card.innerHTML = `
            <div class="card-header">
                <h4><i class="fas fa-exclamation-triangle"></i> Error</h4>
            </div>
            <div class="card-content">
                <p class="error-message">${message}</p>
            </div>
        `;

        return card;
    }

    // Función para mostrar contenido de API en un modal
    async showAPIContent(type, params) {
        try {
            let content;

            switch (type) {
                case 'definition':
                    content = await this.getWordDefinition(params.word);
                    return this.createDefinitionCard(content);

                case 'translation':
                    content = await this.translateText(params.text, params.from, params.to);
                    return this.createTranslationCard(content);

                case 'images':
                    content = await this.getImagesForWord(params.word, params.count);
                    return this.createImagesCard(content, params.word);

                case 'educational':
                    content = await this.getEducationalContent(params.topic, params.type);
                    return this.createEducationalCard(content);

                default:
                    throw new Error('Tipo de contenido no soportado');
            }

        } catch (error) {
            console.error('❌ Error al mostrar contenido de API:', error);
            return this.createErrorCard('Error al cargar el contenido solicitado.');
        }
    }
}

// Instancia global del sistema de APIs
window.apiIntegrationSystem = new APIIntegrationSystem();

// Funciones globales para acceso desde otros módulos
window.getWordDefinition = (word) => window.apiIntegrationSystem.getWordDefinition(word);
window.translateText = (text, from, to) => window.apiIntegrationSystem.translateText(text, from, to);
window.getImagesForWord = (word, count) => window.apiIntegrationSystem.getImagesForWord(word, count);
window.showAPIContent = (type, params) => window.apiIntegrationSystem.showAPIContent(type, params);