// Sistema de pruebas de nivel MCER
// Genera y evalúa pruebas para avanzar entre niveles

class LevelTestSystem {
    constructor() {
        this.testQuestions = {
            A1: this.generateA1Questions(),
            A2: this.generateA2Questions(),
            B1: this.generateB1Questions(),
            B1Plus: this.generateB1PlusQuestions(),
            B2: this.generateB2Questions()
        };
        this.currentTest = null;
        this.testResults = {};
    }

    // Generar preguntas para nivel A1
    generateA1Questions() {
        return {
            vocabulary: [
                {
                    question: "¿Cómo se dice 'Hola' en inglés?",
                    options: ["Hello", "Goodbye", "Thank you", "Please"],
                    correct: 0,
                    type: "vocabulary"
                },
                {
                    question: "¿Cuál es el número '5' en inglés?",
                    options: ["Four", "Five", "Six", "Seven"],
                    correct: 1,
                    type: "vocabulary"
                },
                {
                    question: "¿Cómo se dice 'Rojo' en inglés?",
                    options: ["Blue", "Green", "Red", "Yellow"],
                    correct: 2,
                    type: "vocabulary"
                }
            ],
            grammar: [
                {
                    question: "Completa: 'I ___ a student.'",
                    options: ["am", "is", "are", "be"],
                    correct: 0,
                    type: "grammar"
                },
                {
                    question: "¿Cuál es el plural de 'cat'?",
                    options: ["cat", "cats", "cates", "caties"],
                    correct: 1,
                    type: "grammar"
                },
                {
                    question: "Completa: 'This is ___ apple.'",
                    options: ["a", "an", "the", "some"],
                    correct: 1,
                    type: "grammar"
                }
            ],
            listening: [
                {
                    question: "Escucha y selecciona la palabra correcta:",
                    audio: "hello",
                    options: ["Hello", "Help", "House", "Happy"],
                    correct: 0,
                    type: "listening"
                },
                {
                    question: "Escucha y selecciona el número:",
                    audio: "three",
                    options: ["Two", "Three", "Four", "Five"],
                    correct: 1,
                    type: "listening"
                }
            ],
            pronunciation: [
                {
                    question: "Pronuncia la palabra: 'Beautiful'",
                    word: "Beautiful",
                    type: "pronunciation"
                },
                {
                    question: "Pronuncia la frase: 'Good morning'",
                    word: "Good morning",
                    type: "pronunciation"
                }
            ]
        };
    }

    // Generar preguntas para nivel A2
    generateA2Questions() {
        return {
            vocabulary: [
                {
                    question: "¿Cómo se dice 'Familia' en inglés?",
                    options: ["Family", "Friend", "House", "People"],
                    correct: 0,
                    type: "vocabulary"
                },
                {
                    question: "¿Cuál es la traducción de 'Comida'?",
                    options: ["Food", "Drink", "Water", "Bread"],
                    correct: 0,
                    type: "vocabulary"
                },
                {
                    question: "¿Cómo se dice 'Tiempo' en inglés?",
                    options: ["Time", "Clock", "Hour", "Minute"],
                    correct: 0,
                    type: "vocabulary"
                }
            ],
            grammar: [
                {
                    question: "Completa: 'She ___ to school every day.'",
                    options: ["go", "goes", "going", "went"],
                    correct: 1,
                    type: "grammar"
                },
                {
                    question: "¿Cuál es la forma correcta del pasado de 'play'?",
                    options: ["play", "played", "playing", "plays"],
                    correct: 1,
                    type: "grammar"
                },
                {
                    question: "Completa: 'I have ___ books.'",
                    options: ["much", "many", "a lot", "lots"],
                    correct: 1,
                    type: "grammar"
                }
            ],
            listening: [
                {
                    question: "Escucha y selecciona la respuesta correcta:",
                    audio: "How are you?",
                    options: ["I'm fine", "I'm 25", "I'm a student", "I'm from Spain"],
                    correct: 0,
                    type: "listening"
                }
            ],
            pronunciation: [
                {
                    question: "Pronuncia la palabra: 'Comfortable'",
                    word: "Comfortable",
                    type: "pronunciation"
                }
            ]
        };
    }

    // Generar preguntas para nivel B1
    generateB1Questions() {
        return {
            vocabulary: [
                {
                    question: "¿Cómo se dice 'Tecnología' en inglés?",
                    options: ["Technology", "Computer", "Internet", "Science"],
                    correct: 0,
                    type: "vocabulary"
                },
                {
                    question: "¿Cuál es la traducción de 'Investigación'?",
                    options: ["Research", "Study", "Learn", "Teach"],
                    correct: 0,
                    type: "vocabulary"
                }
            ],
            grammar: [
                {
                    question: "Completa: 'If I ___ time, I would travel.'",
                    options: ["have", "had", "will have", "would have"],
                    correct: 1,
                    type: "grammar"
                },
                {
                    question: "¿Cuál es la forma correcta del presente perfecto de 'see'?",
                    options: ["I see", "I saw", "I have seen", "I will see"],
                    correct: 2,
                    type: "grammar"
                }
            ],
            listening: [
                {
                    question: "Escucha y selecciona la respuesta correcta:",
                    audio: "What's your profession?",
                    options: ["I'm a teacher", "I'm 30 years old", "I like music", "I'm from London"],
                    correct: 0,
                    type: "listening"
                }
            ],
            pronunciation: [
                {
                    question: "Pronuncia la palabra: 'Pronunciation'",
                    word: "Pronunciation",
                    type: "pronunciation"
                }
            ]
        };
    }

    // Generar preguntas para nivel B1+
    generateB1PlusQuestions() {
        return {
            vocabulary: [
                {
                    question: "¿Cómo se dice 'Emocionado' en inglés?",
                    options: ["Excited", "Happy", "Sad", "Angry"],
                    correct: 0,
                    type: "vocabulary"
                },
                {
                    question: "¿Cuál es la traducción de 'Aeropuerto'?",
                    options: ["Airport", "Station", "Port", "Terminal"],
                    correct: 0,
                    type: "vocabulary"
                }
            ],
            grammar: [
                {
                    question: "Completa: 'I wish I ___ more time.'",
                    options: ["have", "had", "will have", "would have"],
                    correct: 1,
                    type: "grammar"
                }
            ],
            listening: [
                {
                    question: "Escucha y selecciona la respuesta correcta:",
                    audio: "What are your plans for the weekend?",
                    options: ["I'm going to visit my family", "I work on weekends", "I don't like weekends", "Weekends are boring"],
                    correct: 0,
                    type: "listening"
                }
            ],
            pronunciation: [
                {
                    question: "Pronuncia la palabra: 'Entrepreneurship'",
                    word: "Entrepreneurship",
                    type: "pronunciation"
                }
            ]
        };
    }

    // Generar preguntas para nivel B2
    generateB2Questions() {
        return {
            vocabulary: [
                {
                    question: "¿Cómo se dice 'Innovación' en inglés?",
                    options: ["Innovation", "Invention", "Creation", "Discovery"],
                    correct: 0,
                    type: "vocabulary"
                },
                {
                    question: "¿Cuál es la traducción de 'Presupuesto'?",
                    options: ["Budget", "Money", "Cost", "Price"],
                    correct: 0,
                    type: "vocabulary"
                }
            ],
            grammar: [
                {
                    question: "Completa: 'The project ___ by the team last month.'",
                    options: ["is completed", "was completed", "has been completed", "will be completed"],
                    correct: 1,
                    type: "grammar"
                }
            ],
            listening: [
                {
                    question: "Escucha y selecciona la respuesta correcta:",
                    audio: "What are the main challenges in your industry?",
                    options: ["I think the main challenges are...", "I don't work in an industry", "I'm not sure", "That's a good question"],
                    correct: 0,
                    type: "listening"
                }
            ],
            pronunciation: [
                {
                    question: "Pronuncia la palabra: 'Sophisticated'",
                    word: "Sophisticated",
                    type: "pronunciation"
                }
            ]
        };
    }

    // Obtener preguntas para un nivel específico
    getQuestionsForLevel(level) {
        const levelMap = {
            1: 'A1',
            2: 'A2', 
            3: 'B1',
            4: 'B1Plus',
            5: 'B2'
        };
        
        const mcerLevel = levelMap[level] || 'A1';
        return this.testQuestions[mcerLevel];
    }

    // Iniciar prueba de nivel
    startLevelTest(level) {
        const questions = this.getQuestionsForLevel(level);
        this.currentTest = {
            level: level,
            questions: questions,
            answers: {},
            startTime: new Date(),
            currentQuestion: 0
        };
        
        console.log(`🎯 Prueba de nivel ${level} iniciada`);
        return this.currentTest;
    }

    // Obtener pregunta actual
    getCurrentQuestion() {
        if (!this.currentTest) return null;
        
        const { questions, currentQuestion } = this.currentTest;
        const questionTypes = Object.keys(questions);
        const currentType = questionTypes[currentQuestion % questionTypes.length];
        const questionIndex = Math.floor(currentQuestion / questionTypes.length);
        
        if (questions[currentType] && questions[currentType][questionIndex]) {
            return {
                ...questions[currentType][questionIndex],
                questionNumber: this.currentTest.currentQuestion + 1,
                totalQuestions: this.getTotalQuestions(),
                type: currentType
            };
        }
        
        return null;
    }

    // Obtener total de preguntas
    getTotalQuestions() {
        if (!this.currentTest) return 0;
        
        const { questions } = this.currentTest;
        return Object.values(questions).reduce((total, typeQuestions) => total + typeQuestions.length, 0);
    }

    // Responder pregunta
    answerQuestion(answer) {
        if (!this.currentTest) return false;
        
        const currentQ = this.getCurrentQuestion();
        if (!currentQ) return false;
        
        this.currentTest.answers[this.currentTest.currentQuestion] = answer;
        this.currentTest.currentQuestion++;
        
        return true;
    }

    // Verificar si la prueba está completada
    isTestCompleted() {
        if (!this.currentTest) return false;
        return this.currentTest.currentQuestion >= this.getTotalQuestions();
    }

    // Evaluar prueba
    evaluateTest() {
        if (!this.currentTest || !this.isTestCompleted()) {
            return null;
        }
        
        const { questions, answers } = this.currentTest;
        let correctAnswers = 0;
        let totalAnswers = 0;
        const results = {
            vocabulary: { correct: 0, total: 0 },
            grammar: { correct: 0, total: 0 },
            listening: { correct: 0, total: 0 },
            pronunciation: { correct: 0, total: 0 }
        };
        
        // Evaluar respuestas
        Object.keys(questions).forEach(type => {
            questions[type].forEach((question, index) => {
                const answerIndex = Object.keys(questions).indexOf(type) * questions[type].length + index;
                const userAnswer = answers[answerIndex];
                
                if (userAnswer !== undefined) {
                    totalAnswers++;
                    results[type].total++;
                    
                    if (type === 'pronunciation') {
                        // Para pronunciación, simular evaluación (en implementación real usarías Web Speech API)
                        const pronunciationScore = Math.random() * 40 + 60; // 60-100%
                        if (pronunciationScore >= 75) {
                            correctAnswers++;
                            results[type].correct++;
                        }
                    } else if (userAnswer === question.correct) {
                        correctAnswers++;
                        results[type].correct++;
                    }
                }
            });
        });
        
        const percentage = Math.round((correctAnswers / totalAnswers) * 100);
        const passed = percentage >= 70;
        
        const evaluation = {
            level: this.currentTest.level,
            score: percentage,
            passed: passed,
            correctAnswers: correctAnswers,
            totalAnswers: totalAnswers,
            results: results,
            timeSpent: new Date() - this.currentTest.startTime,
            date: new Date().toISOString()
        };
        
        // Guardar resultado
        this.testResults[`level${this.currentTest.level}`] = evaluation;
        
        // Actualizar sistema de progreso
        if (window.moduleProgressSystem) {
            window.moduleProgressSystem.completeLevelTest(this.currentTest.level, percentage, passed);
        }
        
        console.log(`📊 Prueba evaluada: ${percentage}% - ${passed ? 'APROBADA' : 'REPROBADA'}`);
        
        return evaluation;
    }

    // Obtener resultados de una prueba
    getTestResults(level) {
        return this.testResults[`level${level}`] || null;
    }

    // Obtener estadísticas de pruebas
    getTestStats() {
        const stats = {
            totalTests: Object.keys(this.testResults).length,
            passedTests: 0,
            averageScore: 0,
            totalScore: 0
        };
        
        Object.values(this.testResults).forEach(result => {
            if (result.passed) stats.passedTests++;
            stats.totalScore += result.score;
        });
        
        if (stats.totalTests > 0) {
            stats.averageScore = Math.round(stats.totalScore / stats.totalTests);
        }
        
        return stats;
    }
}

// Instancia global del sistema de pruebas
window.levelTestSystem = new LevelTestSystem();

// Exportar para uso en otros módulos
window.LevelTestSystem = LevelTestSystem;
