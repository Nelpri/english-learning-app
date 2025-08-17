// Módulo de utilidades generales: helpers, shuffle, sonidos, etc.

function shuffleArray(array) {
    // Lógica para mezclar un array

}

function showNotification(message, type) {
    // Lógica para mostrar notificaciones
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
    }, duration);
}

function playSuccessSound() {
    // Lógica para reproducir sonido de éxito
    createSound(800, 0.3, 'sine');
}

function playFailSound() {
    // Lógica para reproducir sonido de fallo
    createSound(200, 0.5, 'sawtooth');
}

function speakText(text, language = 'en-US', rate = 0.8) {
    // Lógica para síntesis de voz
    if ('speechSynthesis' in window) {
        // Detener cualquier pronunciación anterior
        speechSynthesis.cancel();
        
        // Limpiar el texto de caracteres problemáticos para la síntesis de voz
        const cleanText = cleanTextForSpeech(text);
        
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = language;
        utterance.rate = rate;
        utterance.volume = 1;
        
        // Esperar a que las voces estén disponibles
        const speakWithVoice = () => {
        const voices = speechSynthesis.getVoices();
            const englishVoice = voices.find(voice => 
                voice.lang.startsWith('en') && (voice.name.includes('US') || voice.name.includes('en-US'))
            ) || voices.find(voice => voice.lang.startsWith('en'));
            
        if (englishVoice) {
            utterance.voice = englishVoice;
        }
        
        speechSynthesis.speak(utterance);
        };
        
        // Si las voces ya están disponibles, usar directamente
        if (speechSynthesis.getVoices().length > 0) {
            speakWithVoice();
        } else {
            // Esperar a que las voces se carguen
            speechSynthesis.onvoiceschanged = speakWithVoice;
        }
        
        return true;
    }
        return false;
}

function cleanTextForSpeech(text) {
    // Lógica para limpiar texto para voz
    if (!text) return '';
    
    let cleanText = text;
    
    // Reemplazar apóstrofes y caracteres especiales
    cleanText = cleanText.replace(/'/g, "'");
    cleanText = cleanText.replace(/"/g, '"');
    cleanText = cleanText.replace(/"/g, '"');
    cleanText = cleanText.replace(/…/g, '...');
    cleanText = cleanText.replace(/–/g, '-');
    cleanText = cleanText.replace(/—/g, '-');
    
    // Manejar contracciones específicas del inglés
    const contractions = {
        // Contracciones con 'm (am)
        "i'm": "i am",
        // Contracciones con 're (are)
        "you're": "you are",
        "we're": "we are",
        "they're": "they are",
        "there're": "there are",
        // Contracciones con 's (is/has)
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
        // Contracciones con 'll (will)
        "i'll": "i will",
        "you'll": "you will",
        "he'll": "he will",
        "she'll": "she will",
        "it'll": "it will",
        "we'll": "we will",
        "they'll": "they will",
        "that'll": "that will",
        "there'll": "there will",
        // Contracciones con 'd (would/had)
        "i'd": "i would",
        "you'd": "you would",
        "he'd": "he would",
        "she'd": "she would",
        "it'd": "it would",
        "we'd": "we would",
        "they'd": "they would",
        "that'd": "that would",
        "there'd": "there would",
        // Contracciones con 've (have)
        "i've": "i have",
        "you've": "you have",
        "we've": "we have",
        "they've": "they have",
        "could've": "could have",
        "should've": "should have",
        "would've": "would have",
        "might've": "might have",
        "must've": "must have",
        // Contracciones negativas con 't
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
        "mustn't": "must not",
        "mightn't": "might not",
        "shan't": "shall not",
        "needn't": "need not",
        "daren't": "dare not",
        // Contracciones informales
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
    
    // Reemplazo insensible a mayúsculas y mantiene capitalización inicial
    Object.entries(contractions).forEach(([contraction, expansion]) => {
        // Regex insensible a mayúsculas y global
        const regex = new RegExp(`\\b${contraction}\\b`, 'gi');
        cleanText = cleanText.replace(regex, (match) => {
            // Si la palabra original empieza con mayúscula, capitaliza la expansión
            if (match[0] === match[0].toUpperCase()) {
                return expansion.charAt(0).toUpperCase() + expansion.slice(1);
            } else {
                return expansion;
            }
        });
    });
    
    return cleanText;
}

// Función para crear sonidos usando Web Audio API
function createSound(frequency, duration, type = 'sine') {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
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
    } catch (e) {
        console.log('Audio no disponible:', e);
    }
}

// Exportar funciones globalmente
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
