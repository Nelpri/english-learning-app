// Sistema de conversaciones realistas e interactivas

class ConversationSystem {
    constructor() {
        this.currentConversation = null;
        this.conversationHistory = [];
        this.userProfile = null;
        this.conversationContext = {};
        this.voiceRecognition = null;
        this.speechSynthesis = null;
        this.isRecording = false;
        this.isSpeaking = false;
        
        this.initConversationSystem();
    }

    // Inicializar sistema de conversaciones
    initConversationSystem() {
        try {
            this.setupVoiceRecognition();
            this.setupSpeechSynthesis();
            this.loadUserProfile();
            this.setupConversationTemplates();
            
            console.log("🗣️ Sistema de conversaciones inicializado");
        } catch (error) {
            console.error("❌ Error al inicializar sistema de conversaciones:", error);
        }
    }

    // Configurar reconocimiento de voz
    setupVoiceRecognition() {
        try {
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                this.voiceRecognition = new SpeechRecognition();
                
                this.voiceRecognition.continuous = false;
                this.voiceRecognition.interimResults = true;
                this.voiceRecognition.lang = 'en-US';
                this.voiceRecognition.maxAlternatives = 1;
                
                this.voiceRecognition.onstart = () => {
                    this.isRecording = true;
                    this.showRecordingIndicator();
                };
                
                this.voiceRecognition.onresult = (event) => {
                    this.handleVoiceResult(event);
                };
                
                this.voiceRecognition.onerror = (event) => {
                    this.handleVoiceError(event);
                };
                
                this.voiceRecognition.onend = () => {
                    this.isRecording = false;
                    this.hideRecordingIndicator();
                };
                
                console.log("🎤 Reconocimiento de voz configurado");
            } else {
                console.warn("⚠️ Reconocimiento de voz no disponible");
            }
        } catch (error) {
            console.error("❌ Error al configurar reconocimiento de voz:", error);
        }
    }

    // Configurar síntesis de voz
    setupSpeechSynthesis() {
        try {
            if ('speechSynthesis' in window) {
                this.speechSynthesis = window.speechSynthesis;
                console.log("🔊 Síntesis de voz configurada");
            } else {
                console.warn("⚠️ Síntesis de voz no disponible");
            }
        } catch (error) {
            console.error("❌ Error al configurar síntesis de voz:", error);
        }
    }

    // Cargar perfil del usuario
    loadUserProfile() {
        try {
            const userData = JSON.parse(localStorage.getItem('englishLearningSession') || '{}');
            this.userProfile = {
                name: userData.name || 'Usuario',
                level: userData.level || 1,
                mcerLevel: userData.mcerLevel || 'A1',
                interests: userData.interests || [],
                conversationStyle: userData.conversationStyle || 'friendly'
            };
        } catch (error) {
            console.error("❌ Error al cargar perfil del usuario:", error);
        }
    }

    // Configurar plantillas de conversación
    setupConversationTemplates() {
        this.conversationTemplates = {
            'restaurant': {
                title: 'En el Restaurante',
                level: 'A1',
                context: {
                    location: 'restaurant',
                    time: 'evening',
                    participants: ['waiter', 'customer'],
                    mood: 'friendly'
                },
                scenarios: [
                    {
                        id: 'order_food',
                        description: 'Ordenar comida',
                        messages: [
                            { speaker: 'waiter', text: 'Good evening! Welcome to our restaurant. Do you have a reservation?', audio: true },
                            { speaker: 'customer', text: 'No, we don\'t have a reservation. Do you have a table for two?', audio: true },
                            { speaker: 'waiter', text: 'Of course! Right this way, please. Here are your menus.', audio: true },
                            { speaker: 'customer', text: 'Thank you. Could you tell me about today\'s specials?', audio: true }
                        ]
                    },
                    {
                        id: 'ask_questions',
                        description: 'Hacer preguntas sobre el menú',
                        messages: [
                            { speaker: 'customer', text: 'What do you recommend?', audio: true },
                            { speaker: 'waiter', text: 'I highly recommend our grilled salmon. It\'s fresh and delicious.', audio: true },
                            { speaker: 'customer', text: 'That sounds great! Is it spicy?', audio: true },
                            { speaker: 'waiter', text: 'Not at all. It\'s mild and flavorful.', audio: true }
                        ]
                    }
                ]
            },
            'hotel': {
                title: 'En el Hotel',
                level: 'A2',
                context: {
                    location: 'hotel',
                    time: 'morning',
                    participants: ['receptionist', 'guest'],
                    mood: 'professional'
                },
                scenarios: [
                    {
                        id: 'check_in',
                        description: 'Check-in en el hotel',
                        messages: [
                            { speaker: 'receptionist', text: 'Good morning! Welcome to our hotel. How may I help you?', audio: true },
                            { speaker: 'guest', text: 'Hi, I have a reservation under the name Smith.', audio: true },
                            { speaker: 'receptionist', text: 'Let me check that for you. Yes, I found your reservation for two nights.', audio: true },
                            { speaker: 'guest', text: 'Perfect! What time is check-out?', audio: true }
                        ]
                    }
                ]
            },
            'business_meeting': {
                title: 'Reunión de Negocios',
                level: 'B2',
                context: {
                    location: 'office',
                    time: 'afternoon',
                    participants: ['manager', 'employee'],
                    mood: 'professional'
                },
                scenarios: [
                    {
                        id: 'project_discussion',
                        description: 'Discutir proyecto',
                        messages: [
                            { speaker: 'manager', text: 'Let\'s discuss the quarterly results. How are we performing?', audio: true },
                            { speaker: 'employee', text: 'We\'ve exceeded our targets by 15%. The new strategy is working well.', audio: true },
                            { speaker: 'manager', text: 'Excellent! What challenges are we facing?', audio: true },
                            { speaker: 'employee', text: 'The main challenge is scaling our operations to meet demand.', audio: true }
                        ]
                    }
                ]
            }
        };
    }

    // Iniciar conversación
    startConversation(templateId, scenarioId = null) {
        try {
            const template = this.conversationTemplates[templateId];
            if (!template) {
                throw new Error(`Template de conversación no encontrado: ${templateId}`);
            }
            
            const scenario = scenarioId ? 
                template.scenarios.find(s => s.id === scenarioId) : 
                template.scenarios[0];
            
            if (!scenario) {
                throw new Error(`Escenario no encontrado: ${scenarioId}`);
            }
            
            this.currentConversation = {
                template: template,
                scenario: scenario,
                currentMessage: 0,
                userResponses: [],
                startTime: new Date(),
                context: { ...template.context }
            };
            
            this.conversationHistory = [];
            this.conversationContext = {};
            
            this.displayConversationInterface();
            this.displayNextMessage();
            
            console.log("🗣️ Conversación iniciada:", templateId, scenarioId);
            return true;
            
        } catch (error) {
            console.error("❌ Error al iniciar conversación:", error);
            return false;
        }
    }

    // Mostrar interfaz de conversación
    displayConversationInterface() {
        try {
            const conversationContainer = document.getElementById('conversationContainer');
            if (!conversationContainer) {
                console.error("❌ Contenedor de conversación no encontrado");
                return;
            }
            
            const conversation = this.currentConversation;
            const template = conversation.template;
            const scenario = conversation.scenario;
            
            conversationContainer.innerHTML = `
                <div class="conversation-header">
                    <h3>${template.title}</h3>
                    <p>${scenario.description}</p>
                    <div class="conversation-controls">
                        <button id="startRecording" class="btn btn-primary">
                            <i class="fas fa-microphone"></i> Grabar Respuesta
                        </button>
                        <button id="playAudio" class="btn btn-secondary">
                            <i class="fas fa-play"></i> Reproducir
                        </button>
                        <button id="skipMessage" class="btn btn-info">
                            <i class="fas fa-forward"></i> Saltar
                        </button>
                    </div>
                </div>
                <div class="conversation-messages" id="conversationMessages">
                    <!-- Mensajes se cargarán aquí -->
                </div>
                <div class="conversation-input">
                    <div class="input-group">
                        <input type="text" id="textInput" placeholder="Escribe tu respuesta aquí..." class="form-input">
                        <button id="sendText" class="btn btn-primary">Enviar</button>
                    </div>
                    <div class="recording-indicator" id="recordingIndicator" style="display: none;">
                        <i class="fas fa-microphone"></i>
                        <span>Grabando...</span>
                    </div>
                </div>
            `;
            
            this.setupConversationEventListeners();
            
        } catch (error) {
            console.error("❌ Error al mostrar interfaz de conversación:", error);
        }
    }

    // Configurar event listeners de conversación
    setupConversationEventListeners() {
        try {
            const startRecordingBtn = document.getElementById('startRecording');
            const playAudioBtn = document.getElementById('playAudio');
            const skipMessageBtn = document.getElementById('skipMessage');
            const textInput = document.getElementById('textInput');
            const sendTextBtn = document.getElementById('sendText');
            
            if (startRecordingBtn) {
                startRecordingBtn.addEventListener('click', () => this.startVoiceRecording());
            }
            
            if (playAudioBtn) {
                playAudioBtn.addEventListener('click', () => this.playCurrentMessage());
            }
            
            if (skipMessageBtn) {
                skipMessageBtn.addEventListener('click', () => this.skipCurrentMessage());
            }
            
            if (textInput) {
                textInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.sendTextResponse();
                    }
                });
            }
            
            if (sendTextBtn) {
                sendTextBtn.addEventListener('click', () => this.sendTextResponse());
            }
            
        } catch (error) {
            console.error("❌ Error al configurar event listeners:", error);
        }
    }

    // Mostrar siguiente mensaje
    displayNextMessage() {
        try {
            const conversation = this.currentConversation;
            const messages = conversation.scenario.messages;
            const currentIndex = conversation.currentMessage;
            
            if (currentIndex >= messages.length) {
                this.endConversation();
                return;
            }
            
            const message = messages[currentIndex];
            const messagesContainer = document.getElementById('conversationMessages');
            
            if (!messagesContainer) return;
            
            const messageElement = document.createElement('div');
            messageElement.className = `message ${message.speaker}`;
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="speaker-name">${this.getSpeakerName(message.speaker)}</div>
                    <div class="message-text">${message.text}</div>
                    ${message.audio ? '<div class="audio-indicator"><i class="fas fa-volume-up"></i></div>' : ''}
                </div>
            `;
            
            messagesContainer.appendChild(messageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Reproducir audio si está disponible
            if (message.audio) {
                this.playMessageAudio(message.text);
            }
            
            // Mostrar opciones de respuesta si es el turno del usuario
            if (message.speaker === 'customer' || message.speaker === 'guest' || message.speaker === 'employee') {
                this.showResponseOptions(message);
            } else {
                // Es el turno del sistema, avanzar automáticamente después de un delay
                setTimeout(() => {
                    conversation.currentMessage++;
                    this.displayNextMessage();
                }, 3000);
            }
            
        } catch (error) {
            console.error("❌ Error al mostrar siguiente mensaje:", error);
        }
    }

    // Obtener nombre del hablante
    getSpeakerName(speaker) {
        const speakerNames = {
            'waiter': 'Mesero',
            'customer': 'Cliente',
            'receptionist': 'Recepcionista',
            'guest': 'Huésped',
            'manager': 'Gerente',
            'employee': 'Empleado'
        };
        
        return speakerNames[speaker] || speaker;
    }

    // Mostrar opciones de respuesta
    showResponseOptions(message) {
        try {
            const conversation = this.currentConversation;
            const responses = this.generateResponseOptions(message);
            
            const messagesContainer = document.getElementById('conversationMessages');
            const responseElement = document.createElement('div');
            responseElement.className = 'response-options';
            responseElement.innerHTML = `
                <div class="response-title">Elige tu respuesta:</div>
                <div class="response-buttons">
                    ${responses.map((response, index) => `
                        <button class="response-btn" data-response="${index}">
                            ${response.text}
                        </button>
                    `).join('')}
                </div>
            `;
            
            messagesContainer.appendChild(responseElement);
            
            // Configurar event listeners para botones de respuesta
            responseElement.querySelectorAll('.response-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const responseIndex = parseInt(e.target.dataset.response);
                    this.selectResponse(responses[responseIndex]);
                });
            });
            
        } catch (error) {
            console.error("❌ Error al mostrar opciones de respuesta:", error);
        }
    }

    // Generar opciones de respuesta
    generateResponseOptions(message) {
        try {
            const conversation = this.currentConversation;
            const scenario = conversation.scenario;
            const context = conversation.context;
            
            // Generar respuestas basadas en el contexto y nivel del usuario
            const responses = this.getContextualResponses(message, context);
            
            // Filtrar respuestas por nivel del usuario
            const userLevel = this.userProfile?.level || 1;
            const filteredResponses = responses.filter(response => 
                response.level <= userLevel
            );
            
            return filteredResponses.slice(0, 3); // Máximo 3 opciones
            
        } catch (error) {
            console.error("❌ Error al generar opciones de respuesta:", error);
            return [];
        }
    }

    // Obtener respuestas contextuales
    getContextualResponses(message, context) {
        const responseTemplates = {
            'restaurant': [
                { text: 'Yes, I have a reservation.', level: 1, type: 'confirmation' },
                { text: 'No, we don\'t have a reservation.', level: 1, type: 'negation' },
                { text: 'Could you recommend something?', level: 2, type: 'question' },
                { text: 'What are your specialties?', level: 2, type: 'question' },
                { text: 'I\'d like to see the wine list, please.', level: 3, type: 'request' }
            ],
            'hotel': [
                { text: 'I have a reservation under Smith.', level: 1, type: 'confirmation' },
                { text: 'Do you have any rooms available?', level: 2, type: 'question' },
                { text: 'What amenities do you offer?', level: 2, type: 'question' },
                { text: 'Could you arrange airport transportation?', level: 3, type: 'request' }
            ],
            'business_meeting': [
                { text: 'The project is on track.', level: 3, type: 'status' },
                { text: 'We\'ve encountered some challenges.', level: 3, type: 'problem' },
                { text: 'I need more resources to complete this.', level: 4, type: 'request' },
                { text: 'Let me present the data analysis.', level: 4, type: 'presentation' }
            ]
        };
        
        const location = context.location || 'restaurant';
        return responseTemplates[location] || responseTemplates['restaurant'];
    }

    // Seleccionar respuesta
    selectResponse(response) {
        try {
            const conversation = this.currentConversation;
            
            // Agregar respuesta del usuario al historial
            conversation.userResponses.push({
                text: response.text,
                type: response.type,
                timestamp: new Date(),
                level: response.level
            });
            
            // Mostrar respuesta del usuario
            this.displayUserResponse(response.text);
            
            // Evaluar respuesta
            this.evaluateResponse(response);
            
            // Avanzar a la siguiente parte de la conversación
            conversation.currentMessage++;
            setTimeout(() => {
                this.displayNextMessage();
            }, 1000);
            
        } catch (error) {
            console.error("❌ Error al seleccionar respuesta:", error);
        }
    }

    // Mostrar respuesta del usuario
    displayUserResponse(text) {
        try {
            const messagesContainer = document.getElementById('conversationMessages');
            const userMessageElement = document.createElement('div');
            userMessageElement.className = 'message user';
            userMessageElement.innerHTML = `
                <div class="message-content">
                    <div class="speaker-name">Tú</div>
                    <div class="message-text">${text}</div>
                </div>
            `;
            
            messagesContainer.appendChild(userMessageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
        } catch (error) {
            console.error("❌ Error al mostrar respuesta del usuario:", error);
        }
    }

    // Evaluar respuesta
    evaluateResponse(response) {
        try {
            const conversation = this.currentConversation;
            const currentMessage = conversation.scenario.messages[conversation.currentMessage - 1];
            
            // Evaluar gramática, vocabulario y contexto
            const evaluation = {
                grammar: this.evaluateGrammar(response.text),
                vocabulary: this.evaluateVocabulary(response.text),
                context: this.evaluateContext(response, currentMessage),
                pronunciation: 0 // Se evaluará si hay audio
            };
            
            // Calcular puntuación total
            const totalScore = (evaluation.grammar + evaluation.vocabulary + evaluation.context) / 3;
            
            // Mostrar feedback
            this.showConversationFeedback(evaluation, totalScore);
            
            // Actualizar progreso
            this.updateConversationProgress(totalScore);
            
        } catch (error) {
            console.error("❌ Error al evaluar respuesta:", error);
        }
    }

    // Evaluar gramática
    evaluateGrammar(text) {
        try {
            // Análisis básico de gramática
            const grammarScore = Math.random() * 0.4 + 0.6; // Simulado por ahora
            return Math.min(grammarScore, 1.0);
        } catch (error) {
            console.error("❌ Error al evaluar gramática:", error);
            return 0.5;
        }
    }

    // Evaluar vocabulario
    evaluateVocabulary(text) {
        try {
            // Análisis básico de vocabulario
            const vocabularyScore = Math.random() * 0.4 + 0.6; // Simulado por ahora
            return Math.min(vocabularyScore, 1.0);
        } catch (error) {
            console.error("❌ Error al evaluar vocabulario:", error);
            return 0.5;
        }
    }

    // Evaluar contexto
    evaluateContext(response, message) {
        try {
            // Evaluar si la respuesta es apropiada para el contexto
            const contextScore = Math.random() * 0.4 + 0.6; // Simulado por ahora
            return Math.min(contextScore, 1.0);
        } catch (error) {
            console.error("❌ Error al evaluar contexto:", error);
            return 0.5;
        }
    }

    // Mostrar feedback de conversación
    showConversationFeedback(evaluation, totalScore) {
        try {
            const feedbackElement = document.createElement('div');
            feedbackElement.className = 'conversation-feedback';
            feedbackElement.innerHTML = `
                <div class="feedback-content">
                    <h4>Feedback de tu respuesta:</h4>
                    <div class="feedback-scores">
                        <div class="score-item">
                            <span>Gramática:</span>
                            <div class="score-bar">
                                <div class="score-fill" style="width: ${evaluation.grammar * 100}%"></div>
                            </div>
                            <span>${Math.round(evaluation.grammar * 100)}%</span>
                        </div>
                        <div class="score-item">
                            <span>Vocabulario:</span>
                            <div class="score-bar">
                                <div class="score-fill" style="width: ${evaluation.vocabulary * 100}%"></div>
                            </div>
                            <span>${Math.round(evaluation.vocabulary * 100)}%</span>
                        </div>
                        <div class="score-item">
                            <span>Contexto:</span>
                            <div class="score-bar">
                                <div class="score-fill" style="width: ${evaluation.context * 100}%"></div>
                            </div>
                            <span>${Math.round(evaluation.context * 100)}%</span>
                        </div>
                    </div>
                    <div class="total-score">
                        <strong>Puntuación total: ${Math.round(totalScore * 100)}%</strong>
                    </div>
                </div>
            `;
            
            const messagesContainer = document.getElementById('conversationMessages');
            messagesContainer.appendChild(feedbackElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
        } catch (error) {
            console.error("❌ Error al mostrar feedback de conversación:", error);
        }
    }

    // Actualizar progreso de conversación
    updateConversationProgress(score) {
        try {
            const conversation = this.currentConversation;
            if (!conversation.progress) {
                conversation.progress = {
                    totalScore: 0,
                    responseCount: 0,
                    averageScore: 0
                };
            }
            
            conversation.progress.totalScore += score;
            conversation.progress.responseCount++;
            conversation.progress.averageScore = conversation.progress.totalScore / conversation.progress.responseCount;
            
            // Actualizar XP basado en el rendimiento
            const xpGained = Math.round(score * 20); // Máximo 20 XP por respuesta
            if (typeof window.addXP === 'function') {
                window.addXP(xpGained);
            }
            
        } catch (error) {
            console.error("❌ Error al actualizar progreso de conversación:", error);
        }
    }

    // Iniciar grabación de voz
    startVoiceRecording() {
        try {
            if (!this.voiceRecognition) {
                console.warn("⚠️ Reconocimiento de voz no disponible");
                return;
            }
            
            if (this.isRecording) {
                this.stopVoiceRecording();
                return;
            }
            
            this.voiceRecognition.start();
            
        } catch (error) {
            console.error("❌ Error al iniciar grabación de voz:", error);
        }
    }

    // Detener grabación de voz
    stopVoiceRecording() {
        try {
            if (this.voiceRecognition && this.isRecording) {
                this.voiceRecognition.stop();
            }
        } catch (error) {
            console.error("❌ Error al detener grabación de voz:", error);
        }
    }

    // Manejar resultado de voz
    handleVoiceResult(event) {
        try {
            const result = event.results[event.results.length - 1];
            const transcript = result[0].transcript;
            
            if (result.isFinal) {
                // Procesar respuesta de voz
                this.processVoiceResponse(transcript);
            }
            
        } catch (error) {
            console.error("❌ Error al manejar resultado de voz:", error);
        }
    }

    // Procesar respuesta de voz
    processVoiceResponse(transcript) {
        try {
            const conversation = this.currentConversation;
            
            // Agregar respuesta del usuario al historial
            conversation.userResponses.push({
                text: transcript,
                type: 'voice',
                timestamp: new Date(),
                level: this.userProfile?.level || 1
            });
            
            // Mostrar respuesta del usuario
            this.displayUserResponse(transcript);
            
            // Evaluar respuesta
            const response = { text: transcript, type: 'voice' };
            this.evaluateResponse(response);
            
            // Avanzar a la siguiente parte de la conversación
            conversation.currentMessage++;
            setTimeout(() => {
                this.displayNextMessage();
            }, 1000);
            
        } catch (error) {
            console.error("❌ Error al procesar respuesta de voz:", error);
        }
    }

    // Manejar error de voz
    handleVoiceError(event) {
        try {
            console.error("❌ Error de reconocimiento de voz:", event.error);
            
            if (event.error === 'not-allowed') {
                this.showNotification('Permiso de micrófono denegado', 'error');
            } else if (event.error === 'no-speech') {
                this.showNotification('No se detectó habla', 'warning');
            } else if (event.error === 'audio-capture') {
                this.showNotification('Error de captura de audio', 'error');
            }
            
        } catch (error) {
            console.error("❌ Error al manejar error de voz:", error);
        }
    }

    // Mostrar indicador de grabación
    showRecordingIndicator() {
        try {
            const indicator = document.getElementById('recordingIndicator');
            if (indicator) {
                indicator.style.display = 'block';
            }
        } catch (error) {
            console.error("❌ Error al mostrar indicador de grabación:", error);
        }
    }

    // Ocultar indicador de grabación
    hideRecordingIndicator() {
        try {
            const indicator = document.getElementById('recordingIndicator');
            if (indicator) {
                indicator.style.display = 'none';
            }
        } catch (error) {
            console.error("❌ Error al ocultar indicador de grabación:", error);
        }
    }

    // Reproducir mensaje actual
    playCurrentMessage() {
        try {
            const conversation = this.currentConversation;
            const messages = conversation.scenario.messages;
            const currentIndex = conversation.currentMessage;
            
            if (currentIndex < messages.length) {
                const message = messages[currentIndex];
                this.playMessageAudio(message.text);
            }
            
        } catch (error) {
            console.error("❌ Error al reproducir mensaje actual:", error);
        }
    }

    // Reproducir audio del mensaje
    playMessageAudio(text) {
        try {
            if (this.speechSynthesis) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';
                utterance.rate = 0.9;
                utterance.pitch = 1.0;
                
                this.speechSynthesis.speak(utterance);
            }
            
        } catch (error) {
            console.error("❌ Error al reproducir audio del mensaje:", error);
        }
    }

    // Saltar mensaje actual
    skipCurrentMessage() {
        try {
            const conversation = this.currentConversation;
            conversation.currentMessage++;
            this.displayNextMessage();
            
        } catch (error) {
            console.error("❌ Error al saltar mensaje actual:", error);
        }
    }

    // Enviar respuesta de texto
    sendTextResponse() {
        try {
            const textInput = document.getElementById('textInput');
            if (!textInput || !textInput.value.trim()) return;
            
            const text = textInput.value.trim();
            textInput.value = '';
            
            // Procesar respuesta de texto
            this.processVoiceResponse(text);
            
        } catch (error) {
            console.error("❌ Error al enviar respuesta de texto:", error);
        }
    }

    // Finalizar conversación
    endConversation() {
        try {
            const conversation = this.currentConversation;
            if (!conversation) return;
            
            // Calcular estadísticas finales
            const finalStats = this.calculateFinalStats(conversation);
            
            // Mostrar resumen
            this.showConversationSummary(finalStats);
            
            // Guardar progreso
            this.saveConversationProgress(conversation, finalStats);
            
            // Limpiar conversación actual
            this.currentConversation = null;
            
        } catch (error) {
            console.error("❌ Error al finalizar conversación:", error);
        }
    }

    // Calcular estadísticas finales
    calculateFinalStats(conversation) {
        try {
            const progress = conversation.progress || { totalScore: 0, responseCount: 0, averageScore: 0 };
            const duration = new Date() - conversation.startTime;
            
            return {
                averageScore: progress.averageScore,
                totalResponses: progress.responseCount,
                duration: Math.round(duration / 1000), // segundos
                level: this.userProfile?.level || 1,
                xpGained: Math.round(progress.averageScore * 50) // Máximo 50 XP
            };
            
        } catch (error) {
            console.error("❌ Error al calcular estadísticas finales:", error);
            return {};
        }
    }

    // Mostrar resumen de conversación
    showConversationSummary(stats) {
        try {
            const messagesContainer = document.getElementById('conversationMessages');
            const summaryElement = document.createElement('div');
            summaryElement.className = 'conversation-summary';
            summaryElement.innerHTML = `
                <div class="summary-content">
                    <h3>¡Conversación completada!</h3>
                    <div class="summary-stats">
                        <div class="stat-item">
                            <span>Puntuación promedio:</span>
                            <span>${Math.round(stats.averageScore * 100)}%</span>
                        </div>
                        <div class="stat-item">
                            <span>Respuestas:</span>
                            <span>${stats.totalResponses}</span>
                        </div>
                        <div class="stat-item">
                            <span>Duración:</span>
                            <span>${stats.duration}s</span>
                        </div>
                        <div class="stat-item">
                            <span>XP ganado:</span>
                            <span>${stats.xpGained}</span>
                        </div>
                    </div>
                    <div class="summary-actions">
                        <button class="btn btn-primary" onclick="conversationSystem.startConversation('${this.currentConversation?.template?.title || 'restaurant'}')">
                            Repetir
                        </button>
                        <button class="btn btn-secondary" onclick="conversationSystem.closeConversation()">
                            Cerrar
                        </button>
                    </div>
                </div>
            `;
            
            messagesContainer.appendChild(summaryElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
        } catch (error) {
            console.error("❌ Error al mostrar resumen de conversación:", error);
        }
    }

    // Guardar progreso de conversación
    saveConversationProgress(conversation, stats) {
        try {
            const progressData = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
            
            if (!progressData.conversations) {
                progressData.conversations = [];
            }
            
            progressData.conversations.push({
                template: conversation.template.title,
                scenario: conversation.scenario.id,
                stats: stats,
                timestamp: new Date().toISOString()
            });
            
            localStorage.setItem('englishLearningProgress', JSON.stringify(progressData));
            
        } catch (error) {
            console.error("❌ Error al guardar progreso de conversación:", error);
        }
    }

    // Cerrar conversación
    closeConversation() {
        try {
            const conversationContainer = document.getElementById('conversationContainer');
            if (conversationContainer) {
                conversationContainer.innerHTML = '';
            }
            
            this.currentConversation = null;
            
        } catch (error) {
            console.error("❌ Error al cerrar conversación:", error);
        }
    }

    // Obtener estado del sistema
    getConversationStatus() {
        return {
            currentConversation: this.currentConversation,
            isRecording: this.isRecording,
            isSpeaking: this.isSpeaking,
            voiceRecognitionAvailable: !!this.voiceRecognition,
            speechSynthesisAvailable: !!this.speechSynthesis,
            templates: Object.keys(this.conversationTemplates)
        };
    }
}

// Instancia global del sistema de conversaciones
const conversationSystem = new ConversationSystem();

// Exportar funciones globales
window.conversationSystem = conversationSystem;
window.startConversation = (templateId, scenarioId) => conversationSystem.startConversation(templateId, scenarioId);
window.getConversationStatus = () => conversationSystem.getConversationStatus();

console.log("✅ Sistema de conversaciones cargado");
