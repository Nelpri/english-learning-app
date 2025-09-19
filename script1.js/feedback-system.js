// Sistema de feedback mejorado con explicaciones detalladas

class FeedbackSystem {
    constructor() {
        this.feedbackTemplates = {
            grammar: {
                correct: {
                    articles: "¡Correcto! Usamos 'an' antes de palabras que empiezan con sonido de vocal (a, e, i, o, u).",
                    pronouns: "¡Perfecto! 'I' es el pronombre personal de primera persona singular.",
                    present_simple: "¡Excelente! En tercera persona singular (he, she, it) agregamos 's' al verbo.",
                    past_tense: "¡Muy bien! Los verbos regulares en pasado terminan en '-ed'.",
                    conditionals: "¡Correcto! En condicionales tipo 2 usamos 'if + past simple, would + infinitive'."
                },
                incorrect: {
                    articles: "Incorrecto. Recuerda: 'a' antes de consonantes, 'an' antes de vocales. Ejemplo: 'a book', 'an apple'.",
                    pronouns: "Incorrecto. Los pronombres personales son: I, you, he, she, it, we, they. 'I' siempre se escribe con mayúscula.",
                    present_simple: "Incorrecto. En presente simple, tercera persona singular necesita 's': he works, she studies, it runs.",
                    past_tense: "Incorrecto. Para formar el pasado: verbos regulares + '-ed', irregulares cambian completamente.",
                    conditionals: "Incorrecto. En condicionales tipo 2: If + past simple, would + infinitive sin 'to'."
                }
            },
            vocabulary: {
                correct: {
                    basic: "¡Perfecto! Has usado la palabra correcta en el contexto adecuado.",
                    advanced: "¡Excelente! Tu vocabulario está mejorando. Esta palabra es de nivel avanzado.",
                    pronunciation: "¡Muy bien! La pronunciación es correcta. Continúa practicando."
                },
                incorrect: {
                    basic: "Incorrecto. Revisa el significado de la palabra y su uso en contexto.",
                    advanced: "Incorrecto. Esta palabra es más avanzada. Sigue estudiando vocabulario.",
                    pronunciation: "Incorrecto. Practica la pronunciación escuchando el audio varias veces."
                }
            },
            listening: {
                correct: {
                    basic: "¡Correcto! Has entendido la información principal del audio.",
                    detail: "¡Excelente! Captaste los detalles específicos del audio.",
                    inference: "¡Muy bien! Hiciste una inferencia correcta basada en el contexto."
                },
                incorrect: {
                    basic: "Incorrecto. Escucha nuevamente el audio, prestando atención a las palabras clave.",
                    detail: "Incorrecto. Los detalles específicos requieren escucha atenta. Intenta de nuevo.",
                    inference: "Incorrecto. La inferencia debe basarse en el contexto del audio. Escucha otra vez."
                }
            },
            pronunciation: {
                correct: {
                    excellent: "¡Pronunciación excelente! (90-100%) Tu acento es muy claro.",
                    good: "¡Muy buena pronunciación! (70-89%) Casi perfecto, sigue practicando.",
                    acceptable: "¡Pronunciación aceptable! (50-69%) Bien, pero puedes mejorar."
                },
                incorrect: {
                    poor: "Pronunciación necesita mejora (0-49%). Practica escuchando y repitiendo.",
                    unclear: "La pronunciación no es clara. Habla más despacio y articula mejor.",
                    wrong: "Pronunciación incorrecta. Escucha el audio modelo y repite."
                }
            }
        };
    }

    // Generar feedback personalizado
    generateFeedback(exerciseType, isCorrect, userAnswer, correctAnswer, context = {}) {
        try {
            const feedback = {
                isCorrect: isCorrect,
                message: '',
                explanation: '',
                tip: '',
                encouragement: '',
                visual: this.getVisualFeedback(isCorrect),
                sound: this.getSoundFeedback(isCorrect)
            };

            // Obtener template base
            const template = this.feedbackTemplates[exerciseType];
            if (!template) {
                return this.getGenericFeedback(isCorrect);
            }

            // Seleccionar mensaje específico
            const category = this.categorizeAnswer(exerciseType, userAnswer, correctAnswer, context);
            const messageTemplate = isCorrect ? template.correct[category] : template.incorrect[category];
            
            if (messageTemplate) {
                feedback.message = messageTemplate;
            } else {
                feedback.message = isCorrect ? 
                    "¡Correcto! Muy bien hecho." : 
                    "Incorrecto. Intenta de nuevo.";
            }

            // Agregar explicación detallada
            feedback.explanation = this.getDetailedExplanation(exerciseType, userAnswer, correctAnswer, context);
            
            // Agregar tip de mejora
            feedback.tip = this.getImprovementTip(exerciseType, isCorrect, context);
            
            // Agregar mensaje de ánimo
            feedback.encouragement = this.getEncouragement(isCorrect, context);

            return feedback;

        } catch (error) {
            console.error("❌ Error al generar feedback:", error);
            return this.getGenericFeedback(isCorrect);
        }
    }

    // Categorizar la respuesta para feedback específico
    categorizeAnswer(exerciseType, userAnswer, correctAnswer, context) {
        switch (exerciseType) {
            case 'grammar':
                return context.grammarType || 'basic';
            case 'vocabulary':
                return context.difficulty || 'basic';
            case 'listening':
                return context.questionType || 'basic';
            case 'pronunciation':
                const score = context.score || 0;
                if (score >= 90) return 'excellent';
                if (score >= 70) return 'good';
                if (score >= 50) return 'acceptable';
                return 'poor';
            default:
                return 'basic';
        }
    }

    // Obtener explicación detallada
    getDetailedExplanation(exerciseType, userAnswer, correctAnswer, context) {
        const explanations = {
            grammar: {
                articles: `La regla es: "a" + consonante (a book), "an" + vocal (an apple). 
                          También: "a" + consonante silenciosa (a university), "an" + vocal silenciosa (an hour).`,
                pronouns: `Pronombres personales: I (yo), you (tú/usted), he (él), she (ella), it (ello), we (nosotros), they (ellos). 
                          "I" siempre se escribe con mayúscula, incluso en medio de una oración.`,
                present_simple: `Presente simple: I/you/we/they + verbo base, he/she/it + verbo + s. 
                                Excepciones: go→goes, do→does, have→has, be→is/are.`,
                past_tense: `Pasado simple: verbos regulares + "-ed" (worked, studied), 
                            irregulares cambian completamente (go→went, see→saw, have→had).`,
                conditionals: `Condicionales tipo 2: If + past simple, would + infinitive. 
                              Ejemplo: "If I had time, I would travel." (Si tuviera tiempo, viajaría.)`
            },
            vocabulary: {
                basic: `Esta palabra es fundamental para el nivel básico. 
                        Practícala en diferentes contextos para memorizarla mejor.`,
                advanced: `Esta palabra es de nivel avanzado. 
                          Aparece frecuentemente en textos académicos y profesionales.`,
                pronunciation: `La pronunciación correcta es: ${correctAnswer}. 
                               Escucha el audio varias veces y repite hasta que te suene natural.`
            },
            listening: {
                basic: `En listening básico, enfócate en palabras clave y el mensaje principal. 
                        No necesitas entender cada palabra.`,
                detail: `Para detalles específicos, escucha números, fechas, nombres y lugares. 
                         Estos suelen ser las respuestas a preguntas de detalle.`,
                inference: `La inferencia requiere entender el contexto y el tono. 
                           Presta atención a palabras que indiquen opinión o emoción.`
            }
        };

        const category = this.categorizeAnswer(exerciseType, userAnswer, correctAnswer, context);
        return explanations[exerciseType]?.[category] || '';
    }

    // Obtener tip de mejora
    getImprovementTip(exerciseType, isCorrect, context) {
        const tips = {
            grammar: isCorrect ? 
                "💡 Tip: Practica con más ejercicios similares para consolidar la regla." :
                "💡 Tip: Estudia la regla gramatical y haz ejercicios de práctica adicionales.",
            vocabulary: isCorrect ?
                "💡 Tip: Usa esta palabra en una oración propia para memorizarla mejor." :
                "💡 Tip: Crea tarjetas de vocabulario y repasa regularmente.",
            listening: isCorrect ?
                "💡 Tip: Escucha audios de diferentes acentos para mejorar tu comprensión." :
                "💡 Tip: Practica con audios más lentos y aumenta la velocidad gradualmente.",
            pronunciation: isCorrect ?
                "💡 Tip: Graba tu voz y compárala con el modelo para seguir mejorando." :
                "💡 Tip: Practica la pronunciación lenta y clara, luego aumenta la velocidad."
        };

        return tips[exerciseType] || "💡 Tip: Sigue practicando para mejorar tu nivel.";
    }

    // Obtener mensaje de ánimo
    getEncouragement(isCorrect, context) {
        const encouragements = {
            correct: [
                "¡Sigue así! 🎉",
                "¡Excelente progreso! ⭐",
                "¡Muy bien! Continúa así 💪",
                "¡Perfecto! Estás mejorando 🚀",
                "¡Genial! Sigue practicando 🌟"
            ],
            incorrect: [
                "No te preocupes, ¡sigue intentando! 💪",
                "Cada error es una oportunidad de aprender 📚",
                "¡Tú puedes! Sigue practicando 🌟",
                "La práctica hace al maestro 🎯",
                "¡No te rindas! Cada intento cuenta 💫"
            ]
        };

        const list = isCorrect ? encouragements.correct : encouragements.incorrect;
        return list[Math.floor(Math.random() * list.length)];
    }

    // Obtener feedback visual
    getVisualFeedback(isCorrect) {
        return {
            icon: isCorrect ? '✅' : '❌',
            color: isCorrect ? '#27ae60' : '#e74c3c',
            animation: isCorrect ? 'bounce' : 'shake'
        };
    }

    // Obtener feedback sonoro
    getSoundFeedback(isCorrect) {
        return {
            sound: isCorrect ? 'success' : 'error',
            volume: 0.5
        };
    }

    // Feedback genérico
    getGenericFeedback(isCorrect) {
        return {
            isCorrect: isCorrect,
            message: isCorrect ? "¡Correcto!" : "Incorrecto",
            explanation: isCorrect ? "Muy bien hecho." : "Intenta de nuevo.",
            tip: "💡 Tip: Sigue practicando para mejorar.",
            encouragement: isCorrect ? "¡Sigue así! 🎉" : "¡No te rindas! 💪",
            visual: this.getVisualFeedback(isCorrect),
            sound: this.getSoundFeedback(isCorrect)
        };
    }

    // Mostrar feedback en la interfaz
    showFeedback(feedback, containerId = 'feedbackContainer') {
        try {
            let container = document.getElementById(containerId);
            if (!container) {
                container = document.createElement('div');
                container.id = containerId;
                container.className = 'feedback-container';
                document.body.appendChild(container);
            }

            container.innerHTML = `
                <div class="feedback-popup ${feedback.isCorrect ? 'correct' : 'incorrect'}">
                    <div class="feedback-header">
                        <span class="feedback-icon">${feedback.visual.icon}</span>
                        <span class="feedback-message">${feedback.message}</span>
                    </div>
                    <div class="feedback-content">
                        ${feedback.explanation ? `<div class="feedback-explanation">${feedback.explanation}</div>` : ''}
                        ${feedback.tip ? `<div class="feedback-tip">${feedback.tip}</div>` : ''}
                        <div class="feedback-encouragement">${feedback.encouragement}</div>
                    </div>
                    <button class="feedback-close" onclick="this.parentElement.parentElement.style.display='none'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

            // Reproducir sonido
            this.playFeedbackSound(feedback.sound);

            // Auto-cerrar después de 5 segundos
            setTimeout(() => {
                if (container) {
                    container.style.display = 'none';
                }
            }, 5000);

        } catch (error) {
            console.error("❌ Error al mostrar feedback:", error);
        }
    }

    // Reproducir sonido de feedback
    playFeedbackSound(sound) {
        try {
            if (typeof window.playNotificationSound === 'function') {
                window.playNotificationSound(sound);
            }
        } catch (error) {
            console.error("❌ Error al reproducir sonido:", error);
        }
    }
}

// Instancia global del sistema de feedback
const feedbackSystem = new FeedbackSystem();

// Exportar funciones globales
window.showDetailedFeedback = (exerciseType, isCorrect, userAnswer, correctAnswer, context) => {
    const feedback = feedbackSystem.generateFeedback(exerciseType, isCorrect, userAnswer, correctAnswer, context);
    feedbackSystem.showFeedback(feedback);
    return feedback;
};

window.feedbackSystem = feedbackSystem;

console.log("✅ Sistema de feedback mejorado cargado");
