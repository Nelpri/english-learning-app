// script1.js/utils.js
// Módulo de utilidades generales: helpers, shuffle, sonidos, etc.

/* Mezcla (Fisher-Yates) */
function shuffleArray(array) {
    if (!Array.isArray(array)) return array;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/* Notificaciones simples */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    // Para mensajes largos, usar un diseño diferente
    if (typeof message === 'string' && message.length > 100) {
        notification.style.maxWidth = '400px';
        notification.style.padding = '1.5rem';
    }

    const icon = type === 'success' ? 'check-circle' :
                 type === 'error' ? 'exclamation-circle' :
                 type === 'warning' ? 'exclamation-triangle' : 'info-circle';

    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Auto-remover con pequeña animación (si se desea, se puede mejorar)
    const duration = (typeof message === 'string' && message.length > 10) ? 5000 : 3000;
    setTimeout(() => {
        try {
            notification.remove();
        } catch(e) {}
    }, duration);
}

/* Sonidos simples usando Web Audio API */
function createSound(frequency, duration = 0.3, type = 'sine') {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const audioContext = new AudioCtx();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);

        // Cerrar contexto pasados unos segundos para liberar recursos
        setTimeout(() => {
            try { audioContext.close(); } catch (e) {}
        }, (duration + 0.5) * 1000);
    } catch (e) {
        console.log('Audio no disponible:', e);
    }
}

function playSuccessSound() {
    createSound(800, 0.25, 'sine');
}

function playFailSound() {
    createSound(200, 0.35, 'sawtooth');
}

/* Síntesis de voz (Text-to-Speech) */
function speakText(text, language = 'en-US', rate = 0.9) {
    if (!text) return false;
    if (!('speechSynthesis' in window)) return false;

    // Detener cualquier pronunciación anterior
    try { speechSynthesis.cancel(); } catch (e) {}

    const cleanText = cleanTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language;
    utterance.rate = rate;
    utterance.volume = 1;

    const speakWithVoice = () => {
        const voices = speechSynthesis.getVoices() || [];
        const englishVoice = voices.find(v => v.lang && v.lang.startsWith('en') && (v.name.includes('US') || v.name.includes('en-US')))
                          || voices.find(v => v.lang && v.lang.startsWith('en'));
        if (englishVoice) utterance.voice = englishVoice;
        try { speechSynthesis.speak(utterance); } catch (e) {}
    };

    if (speechSynthesis.getVoices().length > 0) {
        speakWithVoice();
    } else {
        speechSynthesis.onvoiceschanged = speakWithVoice;
    }
    return true;
}

/* Limpieza de texto para TTS y manejo de contracciones */
function cleanTextForSpeech(text) {
    if (!text) return '';
    let cleanText = String(text);

    // Normalizaciones básicas
    cleanText = cleanText.replace(/…/g, '...');
    cleanText = cleanText.replace(/[–—]/g, '-');

    // Contracciones comunes -> expansión
    const contractions = {
        "i'm": "i am",
        "you're": "you are",
        "we're": "we are",
        "they're": "they are",
        "there're": "there are",
        "it's": "it is",
        "he's": "he is",
        "she's": "she is",
        "that's": "that is",
        "what's": "what is",
        "where's": "where is",
        "who's": "who is",
        "how's": "how is",
        "when's": "when is",
        "why's": "why is",
        "there's": "there is",
        "here's": "here is",
        "let's": "let us",
        "i'll": "i will",
        "you'll": "you will",
        "he'll": "he will",
        "she'll": "she will",
        "it'll": "it will",
        "we'll": "we will",
        "they'll": "they will",
        "i'd": "i would",
        "you'd": "you would",
        "i've": "i have",
        "you've": "you have",
        "don't": "do not",
        "doesn't": "does not",
        "didn't": "did not",
        "can't": "can not",
        "cannot": "can not",
        "won't": "will not",
        "wouldn't": "would not",
        "shouldn't": "should not",
        "couldn't": "could not",
        "isn't": "is not",
        "aren't": "are not",
        "wasn't": "was not",
        "weren't": "were not",
        "hasn't": "has not",
        "haven't": "have not",
        "hadn't": "had not",
        "gonna": "going to",
        "wanna": "want to",
        "gotta": "got to",
        "lemme": "let me",
        "gimme": "give me",
        "kinda": "kind of",
        "sorta": "sort of",
        "outta": "out of",
        "lotsa": "lots of",
        "cuppa": "cup of"
    };

    // Escapar caracteres especiales al armar regex
    const escapeRegex = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    Object.entries(contractions).forEach(([contraction, expansion]) => {
        const regex = new RegExp(`\\b${escapeRegex(contraction)}\\b`, 'gi');
        cleanText = cleanText.replace(regex, (match) => {
            // Mantener mayúscula inicial si aplica
            if (match[0] === match[0].toUpperCase()) {
                return expansion.charAt(0).toUpperCase() + expansion.slice(1);
            }
            return expansion;
        });
    });

    return cleanText;
}

/* --- Función que faltaba: testContractions --- 
   Devuelve un array con muestras originales y cómo quedan tras cleanTextForSpeech.
*/
function testContractions(samples) {
    const defaultSamples = [
        "I'm going to school. Don't worry.",
        "You're right — it's complicated.",
        "They've been there, and they'd told us."
    ];
    const input = Array.isArray(samples) && samples.length ? samples : defaultSamples;
    return input.map(s => ({ original: s, cleaned: cleanTextForSpeech(s) }));
}

/* Helpers de tiempo */
function formatTime(totalSeconds) {
    totalSeconds = Number(totalSeconds) || 0;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

/* Pruebas de audio (simples) */
function testAudio() {
    try {
        createSound(440, 0.2, 'sine');
        return true;
    } catch (e) {
        console.warn('testAudio falló:', e);
        return false;
    }
}

/* Stub / helper para test de listening (placeholder) */
function testListeningExercise() {
    console.log('testListeningExercise: placeholder — verifica integración con practice.createListeningExercise si lo deseas.');
    return true;
}

/* Grabación básica con MediaRecorder (retorna Promise<Blob|null>) */
function recordAudio(duration = 3000) {
    return new Promise(async (resolve) => {
        if (!navigator.mediaDevices || !window.MediaRecorder) {
            console.warn('recordAudio: MediaRecorder no disponible en este navegador.');
            resolve(null);
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks = [];
            recorder.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                // Detener micrófono
                stream.getTracks().forEach(t => t.stop());
                resolve(blob);
            };
            recorder.start();
            setTimeout(() => {
                if (recorder.state !== 'inactive') recorder.stop();
            }, duration);
        } catch (err) {
            console.error('recordAudio error:', err);
            resolve(null);
        }
    });
}

// Función de inicialización para el módulo de utilidades
function initUtils() {
    console.log("🚀 Módulo de utilidades inicializado");
    try {
        // Verificar que las funciones principales estén disponibles
        console.log("🔔 showNotification disponible:", typeof showNotification === 'function');
        console.log("🔊 speakText disponible:", typeof speakText === 'function');
        console.log("🎵 playSuccessSound disponible:", typeof playSuccessSound === 'function');
        console.log("🎵 playFailSound disponible:", typeof playFailSound === 'function');
        console.log("🔀 shuffleArray disponible:", typeof shuffleArray === 'function');
        
        console.log("✅ Módulo de utilidades inicializado correctamente");
    } catch (error) {
        console.error("❌ Error en inicialización del módulo de utilidades:", error);
    }
}

/* Exportar funciones globalmente para uso desde script.js y otros módulos */
window.shuffleArray = shuffleArray;
window.showNotification = showNotification;
window.playSuccessSound = playSuccessSound;
window.playFailSound = playFailSound;
window.speakText = speakText;
window.cleanTextForSpeech = cleanTextForSpeech;
window.testContractions = testContractions;
window.recordAudio = recordAudio;
window.formatTime = formatTime;
window.testAudio = testAudio;
window.testListeningExercise = testListeningExercise;
window.createSound = createSound;
window.initUtils = initUtils;
