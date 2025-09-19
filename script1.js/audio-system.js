// Sistema de audio avanzado con múltiples voces y efectos

class AudioSystem {
    constructor() {
        this.audioQueue = [];
        this.isPlaying = false;
        this.currentAudio = null;
        this.voices = [];
        this.selectedVoice = null;
        this.audioContext = null;
        this.volume = 0.8;
        this.rate = 1.0;
        this.pitch = 1.0;
        
        this.initAudioSystem();
    }

    // Inicializar sistema de audio
    initAudioSystem() {
        try {
            // Obtener voces disponibles
            this.loadVoices();
            
            // Configurar audio context para efectos
            if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
                this.audioContext = new (AudioContext || webkitAudioContext)();
            }

            // Configurar eventos de voces
            if ('speechSynthesis' in window) {
                speechSynthesis.onvoiceschanged = () => {
                    this.loadVoices();
                };
            }

            console.log("🎵 Sistema de audio inicializado");

        } catch (error) {
            console.error("❌ Error al inicializar sistema de audio:", error);
        }
    }

    // Cargar voces disponibles
    loadVoices() {
        try {
            if ('speechSynthesis' in window) {
                this.voices = speechSynthesis.getVoices();
                
                // Filtrar voces en inglés
                this.voices = this.voices.filter(voice => 
                    voice.lang.startsWith('en') || 
                    voice.lang.startsWith('en-') ||
                    voice.name.toLowerCase().includes('english')
                );

                // Seleccionar voz por defecto
                if (this.voices.length > 0 && !this.selectedVoice) {
                    this.selectedVoice = this.voices.find(voice => 
                        voice.name.includes('Google') || 
                        voice.name.includes('Microsoft')
                    ) || this.voices[0];
                }

                console.log("🎤 Voces cargadas:", this.voices.length);
            }
        } catch (error) {
            console.error("❌ Error al cargar voces:", error);
        }
    }

    // Reproducir texto con voz
    speak(text, options = {}) {
        try {
            if (!('speechSynthesis' in window)) {
                console.warn("⚠️ Speech synthesis no disponible");
                return;
            }

            // Cancelar audio anterior
            speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            
            // Configurar voz
            if (options.voice) {
                utterance.voice = options.voice;
            } else if (this.selectedVoice) {
                utterance.voice = this.selectedVoice;
            }

            // Configurar parámetros
            utterance.rate = options.rate || this.rate;
            utterance.pitch = options.pitch || this.pitch;
            utterance.volume = options.volume || this.volume;
            utterance.lang = options.lang || 'en-US';

            // Eventos
            utterance.onstart = () => {
                this.isPlaying = true;
                if (options.onStart) options.onStart();
            };

            utterance.onend = () => {
                this.isPlaying = false;
                if (options.onEnd) options.onEnd();
            };

            utterance.onerror = (event) => {
                console.error("❌ Error en speech synthesis:", event.error);
                this.isPlaying = false;
                if (options.onError) options.onError(event);
            };

            // Reproducir
            speechSynthesis.speak(utterance);
            this.currentAudio = utterance;

            console.log("🎵 Reproduciendo:", text);

        } catch (error) {
            console.error("❌ Error al reproducir audio:", error);
        }
    }

    // Reproducir con efectos de sonido
    speakWithEffects(text, effects = {}) {
        try {
            // Efecto de fade in
            if (effects.fadeIn) {
                this.fadeInAudio(text, effects);
                return;
            }

            // Efecto de eco
            if (effects.echo) {
                this.echoAudio(text, effects);
                return;
            }

            // Reproducción normal con efectos
            this.speak(text, {
                ...effects,
                onStart: () => {
                    if (effects.onStart) effects.onStart();
                    this.playEffectSound('speech_start');
                },
                onEnd: () => {
                    if (effects.onEnd) effects.onEnd();
                    this.playEffectSound('speech_end');
                }
            });

        } catch (error) {
            console.error("❌ Error al reproducir audio con efectos:", error);
        }
    }

    // Efecto de fade in
    fadeInAudio(text, options = {}) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = options.voice || this.selectedVoice;
        utterance.rate = options.rate || this.rate;
        utterance.pitch = options.pitch || this.pitch;
        utterance.volume = 0;
        utterance.lang = options.lang || 'en-US';

        let volumeStep = 0.1;
        const volumeInterval = 100;

        utterance.onstart = () => {
            const fadeInterval = setInterval(() => {
                utterance.volume = Math.min(utterance.volume + volumeStep, this.volume);
                if (utterance.volume >= this.volume) {
                    clearInterval(fadeInterval);
                }
            }, volumeInterval);
        };

        speechSynthesis.speak(utterance);
    }

    // Efecto de eco
    echoAudio(text, options = {}) {
        const words = text.split(' ');
        let currentWord = 0;

        const speakWord = () => {
            if (currentWord < words.length) {
                this.speak(words[currentWord], {
                    ...options,
                    onEnd: () => {
                        currentWord++;
                        setTimeout(speakWord, 200); // Delay entre palabras
                    }
                });
            }
        };

        speakWord();
    }

    // Reproducir efectos de sonido
    playEffectSound(soundType) {
        try {
            if (!this.audioContext) return;

            const frequencies = {
                'correct': [523, 659, 784], // C, E, G
                'incorrect': [200, 150, 100], // Descending
                'notification': [800, 1000, 800], // Bell-like
                'speech_start': [440], // A
                'speech_end': [880], // A octave
                'achievement': [523, 659, 784, 1047], // C major chord
                'level_up': [659, 784, 1047, 1319] // E major chord
            };

            const freq = frequencies[soundType] || [440];
            this.playToneSequence(freq);

        } catch (error) {
            console.error("❌ Error al reproducir efecto de sonido:", error);
        }
    }

    // Reproducir secuencia de tonos
    playToneSequence(frequencies) {
        try {
            if (!this.audioContext) return;

            let currentTone = 0;
            const playTone = (freq, duration = 200) => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);

                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                oscillator.type = 'sine';

                // Fade in/out
                gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
                gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration / 1000);

                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + duration / 1000);

                currentTone++;
                if (currentTone < frequencies.length) {
                    setTimeout(() => playTone(frequencies[currentTone]), duration);
                }
            };

            playTone(frequencies[0]);

        } catch (error) {
            console.error("❌ Error al reproducir secuencia de tonos:", error);
        }
    }

    // Reproducir audio de pronunciación
    playPronunciation(word, options = {}) {
        try {
            const pronunciationOptions = {
                rate: 0.8, // Más lento para pronunciación
                pitch: 1.0,
                volume: this.volume,
                lang: 'en-US',
                ...options
            };

            this.speakWithEffects(word, {
                ...pronunciationOptions,
                onStart: () => {
                    console.log("🎤 Reproduciendo pronunciación:", word);
                    if (options.onStart) options.onStart();
                },
                onEnd: () => {
                    console.log("✅ Pronunciación completada:", word);
                    if (options.onEnd) options.onEnd();
                }
            });

        } catch (error) {
            console.error("❌ Error al reproducir pronunciación:", error);
        }
    }

    // Reproducir audio de listening
    playListeningAudio(text, options = {}) {
        try {
            const listeningOptions = {
                rate: options.speed || 0.9, // Velocidad ajustable
                pitch: 1.0,
                volume: this.volume,
                lang: 'en-US',
                ...options
            };

            this.speakWithEffects(text, {
                ...listeningOptions,
                onStart: () => {
                    console.log("🎧 Reproduciendo listening:", text);
                    if (options.onStart) options.onStart();
                },
                onEnd: () => {
                    console.log("✅ Listening completado:", text);
                    if (options.onEnd) options.onEnd();
                }
            });

        } catch (error) {
            console.error("❌ Error al reproducir listening:", error);
        }
    }

    // Cambiar velocidad de reproducción
    setPlaybackRate(rate) {
        this.rate = Math.max(0.5, Math.min(2.0, rate));
        console.log("🎵 Velocidad de reproducción:", this.rate);
    }

    // Cambiar volumen
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        console.log("🎵 Volumen:", this.volume);
    }

    // Cambiar voz
    setVoice(voiceName) {
        const voice = this.voices.find(v => v.name === voiceName);
        if (voice) {
            this.selectedVoice = voice;
            console.log("🎤 Voz seleccionada:", voice.name);
        } else {
            console.warn("⚠️ Voz no encontrada:", voiceName);
        }
    }

    // Obtener voces disponibles
    getAvailableVoices() {
        return this.voices.map(voice => ({
            name: voice.name,
            lang: voice.lang,
            gender: voice.name.toLowerCase().includes('female') ? 'female' : 'male'
        }));
    }

    // Detener reproducción
    stop() {
        try {
            speechSynthesis.cancel();
            this.isPlaying = false;
            this.currentAudio = null;
            console.log("⏹️ Audio detenido");
        } catch (error) {
            console.error("❌ Error al detener audio:", error);
        }
    }

    // Pausar reproducción
    pause() {
        try {
            speechSynthesis.pause();
            console.log("⏸️ Audio pausado");
        } catch (error) {
            console.error("❌ Error al pausar audio:", error);
        }
    }

    // Reanudar reproducción
    resume() {
        try {
            speechSynthesis.resume();
            console.log("▶️ Audio reanudado");
        } catch (error) {
            console.error("❌ Error al reanudar audio:", error);
        }
    }

    // Verificar si está reproduciendo
    isCurrentlyPlaying() {
        return this.isPlaying;
    }

    // Obtener estado del sistema
    getAudioStatus() {
        return {
            isPlaying: this.isPlaying,
            currentAudio: this.currentAudio,
            selectedVoice: this.selectedVoice,
            volume: this.volume,
            rate: this.rate,
            pitch: this.pitch,
            availableVoices: this.voices.length
        };
    }
}

// Instancia global del sistema de audio
const audioSystem = new AudioSystem();

// Exportar funciones globales
window.playAudio = (text, options) => audioSystem.speak(text, options);
window.playPronunciation = (word, options) => audioSystem.playPronunciation(word, options);
window.playListeningAudio = (text, options) => audioSystem.playListeningAudio(text, options);
window.playEffectSound = (soundType) => audioSystem.playEffectSound(soundType);
window.setPlaybackRate = (rate) => audioSystem.setPlaybackRate(rate);
window.setVolume = (volume) => audioSystem.setVolume(volume);
window.setVoice = (voiceName) => audioSystem.setVoice(voiceName);
window.getAvailableVoices = () => audioSystem.getAvailableVoices();
window.stopAudio = () => audioSystem.stop();
window.pauseAudio = () => audioSystem.pause();
window.resumeAudio = () => audioSystem.resume();
window.isAudioPlaying = () => audioSystem.isCurrentlyPlaying();
window.getAudioStatus = () => audioSystem.getAudioStatus();
window.audioSystem = audioSystem;

console.log("✅ Sistema de audio avanzado cargado");
