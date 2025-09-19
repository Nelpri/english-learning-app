// Sistema de imágenes para vocabulario y ejercicios

class ImageSystem {
    constructor() {
        this.imageCache = new Map();
        this.baseImagePath = 'images/vocabulary/';
        this.fallbackImages = {
            // Imágenes de respaldo usando emojis y símbolos
            'animals': '🐶',
            'food': '🍎',
            'colors': '🎨',
            'numbers': '🔢',
            'family': '👨‍👩‍👧‍👦',
            'body': '👤',
            'clothes': '👕',
            'house': '🏠',
            'transport': '🚗',
            'nature': '🌳',
            'sports': '⚽',
            'music': '🎵',
            'technology': '💻',
            'work': '💼',
            'travel': '✈️',
            'health': '🏥',
            'education': '📚',
            'entertainment': '🎬'
        };
        
        this.initImageSystem();
    }

    // Inicializar sistema de imágenes
    initImageSystem() {
        try {
            // Pre-cargar imágenes comunes
            this.preloadCommonImages();
            console.log("🖼️ Sistema de imágenes inicializado");
        } catch (error) {
            console.error("❌ Error al inicializar sistema de imágenes:", error);
        }
    }

    // Pre-cargar imágenes comunes
    preloadCommonImages() {
        const commonWords = [
            'apple', 'cat', 'dog', 'house', 'car', 'book', 'water', 'tree',
            'sun', 'moon', 'star', 'heart', 'hand', 'eye', 'foot', 'head'
        ];

        commonWords.forEach(word => {
            this.preloadImage(word);
        });
    }

    // Pre-cargar imagen
    preloadImage(word) {
        try {
            const imageUrl = this.getImageUrl(word);
            const img = new Image();
            
            img.onload = () => {
                this.imageCache.set(word, imageUrl);
                console.log("🖼️ Imagen pre-cargada:", word);
            };
            
            img.onerror = () => {
                console.warn("⚠️ No se pudo cargar imagen para:", word);
            };
            
            img.src = imageUrl;
        } catch (error) {
            console.error("❌ Error al pre-cargar imagen:", error);
        }
    }

    // Obtener URL de imagen
    getImageUrl(word) {
        // Intentar diferentes fuentes de imágenes
        const sources = [
            `${this.baseImagePath}${word.toLowerCase()}.jpg`,
            `${this.baseImagePath}${word.toLowerCase()}.png`,
            `https://images.unsplash.com/photo-${this.getUnsplashId(word)}?w=300&h=300&fit=crop`,
            `https://picsum.photos/300/300?random=${this.getRandomSeed(word)}`
        ];

        return sources[0]; // Por ahora usar la ruta local
    }

    // Obtener ID de Unsplash (simulado)
    getUnsplashId(word) {
        const wordIds = {
            'apple': '1567306304907-938dd5da2720',
            'cat': '1518791841217-8f162f1e1130',
            'dog': '1552053831-71594a27632d',
            'house': '156401379991-4d8b0b0b0b0b',
            'car': '1549317331-075d4c7c86c8',
            'book': '1481623274831-8a21b8fda706',
            'water': '1506905925346-12b90bffd4f0',
            'tree': '1441974231531-c6227db76b6e'
        };
        
        return wordIds[word.toLowerCase()] || '1567306304907-938dd5da2720';
    }

    // Obtener semilla aleatoria para Picsum
    getRandomSeed(word) {
        let hash = 0;
        for (let i = 0; i < word.length; i++) {
            hash = ((hash << 5) - hash + word.charCodeAt(i)) & 0xffffffff;
        }
        return Math.abs(hash);
    }

    // Obtener imagen para palabra
    getImageForWord(word, category = null) {
        try {
            // Verificar caché
            if (this.imageCache.has(word)) {
                return this.imageCache.get(word);
            }

            // Generar imagen
            const imageUrl = this.getImageUrl(word);
            this.imageCache.set(word, imageUrl);
            return imageUrl;

        } catch (error) {
            console.error("❌ Error al obtener imagen:", error);
            return this.getFallbackImage(category);
        }
    }

    // Obtener imagen de respaldo
    getFallbackImage(category) {
        if (category && this.fallbackImages[category]) {
            return this.fallbackImages[category];
        }
        return '📝'; // Imagen genérica
    }

    // Crear elemento de imagen
    createImageElement(word, options = {}) {
        try {
            const img = document.createElement('img');
            const imageUrl = this.getImageForWord(word, options.category);
            
            img.src = imageUrl;
            img.alt = word;
            img.className = options.className || 'vocabulary-image';
            img.style.cssText = `
                width: ${options.width || '200px'};
                height: ${options.height || '200px'};
                object-fit: cover;
                border-radius: ${options.borderRadius || '8px'};
                box-shadow: ${options.shadow || '0 4px 8px rgba(0,0,0,0.1)'};
                transition: transform 0.3s ease;
                cursor: pointer;
            `;

            // Efecto hover
            img.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
            });

            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });

            // Click para reproducir audio
            img.addEventListener('click', () => {
                if (typeof window.playPronunciation === 'function') {
                    window.playPronunciation(word);
                }
            });

            // Manejo de errores
            img.onerror = () => {
                img.src = 'data:image/svg+xml;base64,' + this.createFallbackSVG(word);
                img.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                img.style.color = 'white';
                img.style.display = 'flex';
                img.style.alignItems = 'center';
                img.style.justifyContent = 'center';
                img.style.fontSize = '48px';
            };

            return img;

        } catch (error) {
            console.error("❌ Error al crear elemento de imagen:", error);
            return this.createFallbackElement(word);
        }
    }

    // Crear SVG de respaldo
    createFallbackSVG(word) {
        const svg = `
            <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="200" fill="#667eea"/>
                <text x="100" y="100" text-anchor="middle" dy="0.3em" 
                      font-family="Arial, sans-serif" font-size="24" fill="white">
                    ${word.toUpperCase()}
                </text>
            </svg>
        `;
        return btoa(svg);
    }

    // Crear elemento de respaldo
    createFallbackElement(word) {
        const div = document.createElement('div');
        div.className = 'vocabulary-image-fallback';
        div.style.cssText = `
            width: 200px;
            height: 200px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            color: white;
            cursor: pointer;
            transition: transform 0.3s ease;
        `;
        div.textContent = this.getFallbackImage();
        div.title = word;

        div.addEventListener('click', () => {
            if (typeof window.playPronunciation === 'function') {
                window.playPronunciation(word);
            }
        });

        return div;
    }

    // Crear galería de imágenes
    createImageGallery(words, options = {}) {
        try {
            const gallery = document.createElement('div');
            gallery.className = 'image-gallery';
            gallery.style.cssText = `
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                padding: 20px;
            `;

            words.forEach(word => {
                const imageContainer = document.createElement('div');
                imageContainer.className = 'image-container';
                imageContainer.style.cssText = `
                    text-align: center;
                    padding: 10px;
                    border-radius: 12px;
                    background: white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    transition: transform 0.3s ease;
                `;

                const img = this.createImageElement(word, options);
                const label = document.createElement('div');
                label.textContent = word;
                label.style.cssText = `
                    margin-top: 10px;
                    font-weight: 600;
                    color: var(--text-primary);
                    font-size: 1.1rem;
                `;

                imageContainer.appendChild(img);
                imageContainer.appendChild(label);
                gallery.appendChild(imageContainer);

                // Efecto hover en contenedor
                imageContainer.addEventListener('mouseenter', () => {
                    imageContainer.style.transform = 'translateY(-5px)';
                });

                imageContainer.addEventListener('mouseleave', () => {
                    imageContainer.style.transform = 'translateY(0)';
                });
            });

            return gallery;

        } catch (error) {
            console.error("❌ Error al crear galería de imágenes:", error);
            return document.createElement('div');
        }
    }

    // Crear ejercicio de imagen
    createImageExercise(word, options = {}) {
        try {
            const exercise = document.createElement('div');
            exercise.className = 'image-exercise';
            exercise.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                padding: 20px;
                background: var(--card-bg);
                border-radius: 12px;
                box-shadow: var(--shadow);
            `;

            const img = this.createImageElement(word, {
                width: '300px',
                height: '300px',
                ...options
            });

            const question = document.createElement('h3');
            question.textContent = options.question || '¿Qué palabra describe esta imagen?';
            question.style.cssText = `
                text-align: center;
                color: var(--text-primary);
                margin: 0;
            `;

            exercise.appendChild(question);
            exercise.appendChild(img);

            return exercise;

        } catch (error) {
            console.error("❌ Error al crear ejercicio de imagen:", error);
            return document.createElement('div');
        }
    }

    // Obtener estadísticas de imágenes
    getImageStats() {
        return {
            cachedImages: this.imageCache.size,
            availableCategories: Object.keys(this.fallbackImages).length,
            systemReady: true
        };
    }
}

// Instancia global del sistema de imágenes
const imageSystem = new ImageSystem();

// Exportar funciones globales
window.getImageForWord = (word, category) => imageSystem.getImageForWord(word, category);
window.createImageElement = (word, options) => imageSystem.createImageElement(word, options);
window.createImageGallery = (words, options) => imageSystem.createImageGallery(words, options);
window.createImageExercise = (word, options) => imageSystem.createImageExercise(word, options);
window.getImageStats = () => imageSystem.getImageStats();
window.imageSystem = imageSystem;

console.log("✅ Sistema de imágenes cargado");
