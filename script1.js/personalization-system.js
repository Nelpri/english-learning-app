// Sistema de personalización de contenido según nivel del usuario

class PersonalizationSystem {
    constructor() {
        this.userProfile = null;
        this.learningPreferences = null;
        this.contentRecommendations = null;
        this.adaptiveContent = null;
        
        this.initPersonalizationSystem();
    }

    // Inicializar sistema de personalización
    initPersonalizationSystem() {
        try {
            this.loadUserProfile();
            this.loadLearningPreferences();
            this.generateContentRecommendations();
            this.setupAdaptiveContent();
            
            console.log("🎯 Sistema de personalización inicializado");
        } catch (error) {
            console.error("❌ Error al inicializar sistema de personalización:", error);
        }
    }

    // Cargar perfil del usuario
    loadUserProfile() {
        try {
            const userData = JSON.parse(localStorage.getItem('englishLearningSession') || '{}');
            const progressData = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
            
            this.userProfile = {
                name: userData.name || 'Usuario',
                level: userData.level || 1,
                xp: userData.xp || 0,
                mcerLevel: userData.mcerLevel || 'A1',
                diagnosticLevel: progressData.diagnosticLevel || 'A1',
                learningStyle: progressData.learningStyle || 'visual',
                difficultyPreference: progressData.difficultyPreference || 'medium',
                timePreference: progressData.timePreference || 'morning',
                interests: progressData.interests || [],
                strengths: progressData.strengths || [],
                weaknesses: progressData.weaknesses || [],
                completedLessons: progressData.lessonsCompleted || 0,
                practiceStreak: progressData.streakDays || 0,
                lastActivity: progressData.lastActivity || new Date().toISOString()
            };
            
            console.log("👤 Perfil del usuario cargado:", this.userProfile);
        } catch (error) {
            console.error("❌ Error al cargar perfil del usuario:", error);
        }
    }

    // Cargar preferencias de aprendizaje
    loadLearningPreferences() {
        try {
            const preferences = JSON.parse(localStorage.getItem('learningPreferences') || '{}');
            
            this.learningPreferences = {
                // Estilo de aprendizaje
                learningStyle: preferences.learningStyle || this.detectLearningStyle(),
                
                // Preferencias de dificultad
                difficultyPreference: preferences.difficultyPreference || 'medium',
                adaptiveDifficulty: preferences.adaptiveDifficulty !== false,
                
                // Preferencias de tiempo
                sessionLength: preferences.sessionLength || 30, // minutos
                timePreference: preferences.timePreference || this.detectTimePreference(),
                
                // Preferencias de contenido
                contentTypes: preferences.contentTypes || ['vocabulary', 'grammar', 'listening', 'speaking'],
                topics: preferences.topics || this.getDefaultTopics(),
                
                // Preferencias de feedback
                feedbackLevel: preferences.feedbackLevel || 'detailed',
                hintsEnabled: preferences.hintsEnabled !== false,
                explanationsEnabled: preferences.explanationsEnabled !== false,
                
                // Preferencias de gamificación
                gamificationLevel: preferences.gamificationLevel || 'medium',
                notificationsEnabled: preferences.notificationsEnabled !== false,
                
                // Preferencias de accesibilidad
                fontSize: preferences.fontSize || 'medium',
                highContrast: preferences.highContrast || false,
                reducedMotion: preferences.reducedMotion || false
            };
            
            console.log("⚙️ Preferencias de aprendizaje cargadas:", this.learningPreferences);
        } catch (error) {
            console.error("❌ Error al cargar preferencias de aprendizaje:", error);
        }
    }

    // Detectar estilo de aprendizaje
    detectLearningStyle() {
        try {
            const progressData = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
            const stats = progressData.learningStats || {};
            
            // Analizar patrones de uso
            const visualScore = (stats.vocabularyCompleted || 0) + (stats.imageExercises || 0);
            const auditoryScore = (stats.listeningCompleted || 0) + (stats.pronunciationExercises || 0);
            const kinestheticScore = (stats.speakingExercises || 0) + (stats.writingExercises || 0);
            
            if (visualScore > auditoryScore && visualScore > kinestheticScore) {
                return 'visual';
            } else if (auditoryScore > visualScore && auditoryScore > kinestheticScore) {
                return 'auditory';
            } else if (kinestheticScore > visualScore && kinestheticScore > auditoryScore) {
                return 'kinesthetic';
            } else {
                return 'mixed';
            }
        } catch (error) {
            console.error("❌ Error al detectar estilo de aprendizaje:", error);
            return 'mixed';
        }
    }

    // Detectar preferencia de tiempo
    detectTimePreference() {
        try {
            const now = new Date();
            const hour = now.getHours();
            
            if (hour >= 6 && hour < 12) {
                return 'morning';
            } else if (hour >= 12 && hour < 18) {
                return 'afternoon';
            } else if (hour >= 18 && hour < 22) {
                return 'evening';
            } else {
                return 'night';
            }
        } catch (error) {
            console.error("❌ Error al detectar preferencia de tiempo:", error);
            return 'morning';
        }
    }

    // Obtener temas por defecto
    getDefaultTopics() {
        const level = this.userProfile?.level || 1;
        
        if (level <= 2) {
            return ['greetings', 'family', 'colors', 'numbers', 'food'];
        } else if (level <= 4) {
            return ['work', 'travel', 'shopping', 'health', 'entertainment'];
        } else if (level <= 6) {
            return ['business', 'technology', 'science', 'politics', 'culture'];
        } else {
            return ['academic', 'professional', 'creative', 'philosophical', 'specialized'];
        }
    }

    // Generar recomendaciones de contenido
    generateContentRecommendations() {
        try {
            const level = this.userProfile?.level || 1;
            const learningStyle = this.learningPreferences?.learningStyle || 'mixed';
            const interests = this.userProfile?.interests || [];
            const weaknesses = this.userProfile?.weaknesses || [];
            
            this.contentRecommendations = {
                // Recomendaciones por nivel
                levelBased: this.getLevelBasedRecommendations(level),
                
                // Recomendaciones por estilo de aprendizaje
                styleBased: this.getStyleBasedRecommendations(learningStyle),
                
                // Recomendaciones por intereses
                interestBased: this.getInterestBasedRecommendations(interests),
                
                // Recomendaciones para mejorar debilidades
                weaknessBased: this.getWeaknessBasedRecommendations(weaknesses),
                
                // Recomendaciones de tiempo
                timeBased: this.getTimeBasedRecommendations(),
                
                // Recomendaciones de dificultad
                difficultyBased: this.getDifficultyBasedRecommendations()
            };
            
            console.log("📚 Recomendaciones de contenido generadas:", this.contentRecommendations);
        } catch (error) {
            console.error("❌ Error al generar recomendaciones de contenido:", error);
        }
    }

    // Obtener recomendaciones basadas en nivel
    getLevelBasedRecommendations(level) {
        const recommendations = {
            1: {
                lessons: ['greetings', 'numbers', 'colors'],
                exercises: ['vocabulary', 'pronunciation'],
                difficulty: 'easy',
                duration: 15
            },
            2: {
                lessons: ['family', 'food', 'time'],
                exercises: ['vocabulary', 'grammar', 'listening'],
                difficulty: 'easy-medium',
                duration: 20
            },
            3: {
                lessons: ['work', 'travel', 'shopping'],
                exercises: ['grammar', 'listening', 'speaking'],
                difficulty: 'medium',
                duration: 25
            },
            4: {
                lessons: ['health', 'entertainment', 'technology'],
                exercises: ['listening', 'speaking', 'writing'],
                difficulty: 'medium-hard',
                duration: 30
            },
            5: {
                lessons: ['business', 'politics', 'science'],
                exercises: ['speaking', 'writing', 'advanced-grammar'],
                difficulty: 'hard',
                duration: 35
            }
        };
        
        return recommendations[level] || recommendations[1];
    }

    // Obtener recomendaciones basadas en estilo de aprendizaje
    getStyleBasedRecommendations(style) {
        const recommendations = {
            visual: {
                preferredExercises: ['vocabulary', 'image-matching', 'reading'],
                contentTypes: ['images', 'diagrams', 'charts'],
                presentation: 'visual-heavy'
            },
            auditory: {
                preferredExercises: ['listening', 'pronunciation', 'speaking'],
                contentTypes: ['audio', 'music', 'conversations'],
                presentation: 'audio-heavy'
            },
            kinesthetic: {
                preferredExercises: ['speaking', 'writing', 'role-play'],
                contentTypes: ['interactive', 'hands-on', 'simulations'],
                presentation: 'interactive-heavy'
            },
            mixed: {
                preferredExercises: ['vocabulary', 'grammar', 'listening', 'speaking'],
                contentTypes: ['multimedia', 'varied', 'balanced'],
                presentation: 'balanced'
            }
        };
        
        return recommendations[style] || recommendations.mixed;
    }

    // Obtener recomendaciones basadas en intereses
    getInterestBasedRecommendations(interests) {
        const interestMap = {
            'technology': ['programming', 'AI', 'gadgets', 'internet'],
            'travel': ['countries', 'cultures', 'transportation', 'accommodation'],
            'food': ['cooking', 'restaurants', 'ingredients', 'cuisines'],
            'sports': ['fitness', 'games', 'athletes', 'competitions'],
            'music': ['instruments', 'genres', 'artists', 'concerts'],
            'art': ['painting', 'sculpture', 'museums', 'creativity'],
            'science': ['research', 'experiments', 'discoveries', 'theories'],
            'business': ['management', 'finance', 'marketing', 'entrepreneurship']
        };
        
        const recommendations = [];
        interests.forEach(interest => {
            if (interestMap[interest]) {
                recommendations.push(...interestMap[interest]);
            }
        });
        
        return recommendations;
    }

    // Obtener recomendaciones para mejorar debilidades
    getWeaknessBasedRecommendations(weaknesses) {
        const weaknessMap = {
            'vocabulary': ['vocabulary-drills', 'word-games', 'flashcards'],
            'grammar': ['grammar-exercises', 'sentence-building', 'error-correction'],
            'listening': ['listening-practice', 'audio-exercises', 'pronunciation'],
            'speaking': ['speaking-practice', 'pronunciation', 'conversation'],
            'writing': ['writing-exercises', 'essay-practice', 'creative-writing'],
            'reading': ['reading-comprehension', 'text-analysis', 'vocabulary-in-context']
        };
        
        const recommendations = [];
        weaknesses.forEach(weakness => {
            if (weaknessMap[weakness]) {
                recommendations.push(...weaknessMap[weakness]);
            }
        });
        
        return recommendations;
    }

    // Obtener recomendaciones basadas en tiempo
    getTimeBasedRecommendations() {
        const now = new Date();
        const hour = now.getHours();
        const dayOfWeek = now.getDay();
        
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            // Fin de semana
            return {
                sessionLength: 45,
                contentTypes: ['entertainment', 'conversation', 'games'],
                difficulty: 'medium',
                focus: 'fun-learning'
            };
        } else if (hour >= 6 && hour < 9) {
            // Mañana temprano
            return {
                sessionLength: 20,
                contentTypes: ['vocabulary', 'grammar'],
                difficulty: 'easy-medium',
                focus: 'warm-up'
            };
        } else if (hour >= 9 && hour < 17) {
            // Horario laboral
            return {
                sessionLength: 15,
                contentTypes: ['business', 'professional'],
                difficulty: 'medium',
                focus: 'work-related'
            };
        } else if (hour >= 17 && hour < 22) {
            // Tarde/noche
            return {
                sessionLength: 30,
                contentTypes: ['conversation', 'listening', 'speaking'],
                difficulty: 'medium-hard',
                focus: 'interactive'
            };
        } else {
            // Noche/madrugada
            return {
                sessionLength: 20,
                contentTypes: ['reading', 'listening'],
                difficulty: 'easy',
                focus: 'relaxed'
            };
        }
    }

    // Obtener recomendaciones basadas en dificultad
    getDifficultyBasedRecommendations() {
        const level = this.userProfile?.level || 1;
        const recentPerformance = this.getRecentPerformance();
        
        if (recentPerformance > 0.8) {
            // Rendimiento alto - aumentar dificultad
            return {
                difficulty: 'hard',
                challengeLevel: 'high',
                newContent: true
            };
        } else if (recentPerformance > 0.6) {
            // Rendimiento medio - mantener dificultad
            return {
                difficulty: 'medium',
                challengeLevel: 'medium',
                newContent: false
            };
        } else {
            // Rendimiento bajo - reducir dificultad
            return {
                difficulty: 'easy',
                challengeLevel: 'low',
                newContent: false
            };
        }
    }

    // Obtener rendimiento reciente
    getRecentPerformance() {
        try {
            const progressData = JSON.parse(localStorage.getItem('englishLearningProgress') || '{}');
            const recentSessions = progressData.recentSessions || [];
            
            if (recentSessions.length === 0) return 0.5;
            
            const totalScore = recentSessions.reduce((sum, session) => sum + (session.score || 0), 0);
            return totalScore / recentSessions.length;
        } catch (error) {
            console.error("❌ Error al obtener rendimiento reciente:", error);
            return 0.5;
        }
    }

    // Configurar contenido adaptativo
    setupAdaptiveContent() {
        try {
            this.adaptiveContent = {
                // Contenido adaptativo por nivel
                levelContent: this.getAdaptiveLevelContent(),
                
                // Contenido adaptativo por estilo
                styleContent: this.getAdaptiveStyleContent(),
                
                // Contenido adaptativo por tiempo
                timeContent: this.getAdaptiveTimeContent(),
                
                // Contenido adaptativo por rendimiento
                performanceContent: this.getAdaptivePerformanceContent()
            };
            
            console.log("🔄 Contenido adaptativo configurado:", this.adaptiveContent);
        } catch (error) {
            console.error("❌ Error al configurar contenido adaptativo:", error);
        }
    }

    // Obtener contenido adaptativo por nivel
    getAdaptiveLevelContent() {
        const level = this.userProfile?.level || 1;
        
        if (level <= 2) {
            return {
                lessonLength: 15,
                exerciseCount: 5,
                vocabularyCount: 10,
                grammarComplexity: 'basic',
                audioSpeed: 0.8
            };
        } else if (level <= 4) {
            return {
                lessonLength: 25,
                exerciseCount: 8,
                vocabularyCount: 15,
                grammarComplexity: 'intermediate',
                audioSpeed: 0.9
            };
        } else if (level <= 6) {
            return {
                lessonLength: 35,
                exerciseCount: 12,
                vocabularyCount: 20,
                grammarComplexity: 'advanced',
                audioSpeed: 1.0
            };
        } else {
            return {
                lessonLength: 45,
                exerciseCount: 15,
                vocabularyCount: 25,
                grammarComplexity: 'expert',
                audioSpeed: 1.1
            };
        }
    }

    // Obtener contenido adaptativo por estilo
    getAdaptiveStyleContent() {
        const style = this.learningPreferences?.learningStyle || 'mixed';
        
        const styleConfigs = {
            visual: {
                imageRatio: 0.7,
                textRatio: 0.3,
                interactiveRatio: 0.4,
                audioRatio: 0.2
            },
            auditory: {
                imageRatio: 0.2,
                textRatio: 0.3,
                interactiveRatio: 0.3,
                audioRatio: 0.7
            },
            kinesthetic: {
                imageRatio: 0.3,
                textRatio: 0.2,
                interactiveRatio: 0.7,
                audioRatio: 0.3
            },
            mixed: {
                imageRatio: 0.4,
                textRatio: 0.4,
                interactiveRatio: 0.5,
                audioRatio: 0.4
            }
        };
        
        return styleConfigs[style] || styleConfigs.mixed;
    }

    // Obtener contenido adaptativo por tiempo
    getAdaptiveTimeContent() {
        const timePref = this.learningPreferences?.timePreference || 'morning';
        const sessionLength = this.learningPreferences?.sessionLength || 30;
        
        if (sessionLength <= 15) {
            return {
                quickMode: true,
                exerciseCount: 3,
                lessonLength: 10,
                focus: 'essential'
            };
        } else if (sessionLength <= 30) {
            return {
                quickMode: false,
                exerciseCount: 6,
                lessonLength: 20,
                focus: 'balanced'
            };
        } else {
            return {
                quickMode: false,
                exerciseCount: 10,
                lessonLength: 35,
                focus: 'comprehensive'
            };
        }
    }

    // Obtener contenido adaptativo por rendimiento
    getAdaptivePerformanceContent() {
        const performance = this.getRecentPerformance();
        
        if (performance > 0.8) {
            return {
                difficulty: 'hard',
                newContent: true,
                challengeLevel: 'high',
                reviewRatio: 0.2
            };
        } else if (performance > 0.6) {
            return {
                difficulty: 'medium',
                newContent: true,
                challengeLevel: 'medium',
                reviewRatio: 0.3
            };
        } else {
            return {
                difficulty: 'easy',
                newContent: false,
                challengeLevel: 'low',
                reviewRatio: 0.5
            };
        }
    }

    // Personalizar contenido de lección
    personalizeLessonContent(lesson) {
        try {
            const personalizedLesson = { ...lesson };
            
            // Ajustar vocabulario según nivel
            personalizedLesson.vocabulary = this.personalizeVocabulary(lesson.vocabulary);
            
            // Ajustar ejercicios según estilo de aprendizaje
            personalizedLesson.exercises = this.personalizeExercises(lesson.exercises);
            
            // Ajustar gramática según nivel
            personalizedLesson.grammar = this.personalizeGrammar(lesson.grammar);
            
            // Ajustar contenido multimedia
            personalizedLesson.multimedia = this.personalizeMultimedia(lesson.multimedia);
            
            console.log("🎯 Lección personalizada:", personalizedLesson);
            return personalizedLesson;
            
        } catch (error) {
            console.error("❌ Error al personalizar contenido de lección:", error);
            return lesson;
        }
    }

    // Personalizar vocabulario
    personalizeVocabulary(vocabulary) {
        const level = this.userProfile?.level || 1;
        const interests = this.userProfile?.interests || [];
        
        // Filtrar vocabulario por nivel
        const levelFiltered = vocabulary.filter(word => {
            const wordLevel = word.level || 1;
            return wordLevel <= level;
        });
        
        // Priorizar vocabulario de intereses
        const interestFiltered = levelFiltered.sort((a, b) => {
            const aInterest = interests.some(interest => 
                a.category && a.category.includes(interest)
            );
            const bInterest = interests.some(interest => 
                b.category && b.category.includes(interest)
            );
            
            if (aInterest && !bInterest) return -1;
            if (!aInterest && bInterest) return 1;
            return 0;
        });
        
        return interestFiltered;
    }

    // Personalizar ejercicios
    personalizeExercises(exercises) {
        const style = this.learningPreferences?.learningStyle || 'mixed';
        const stylePrefs = this.contentRecommendations?.styleBased || {};
        
        return exercises.map(exercise => {
            const personalizedExercise = { ...exercise };
            
            // Ajustar tipo de ejercicio según estilo
            if (style === 'visual' && exercise.type === 'text') {
                personalizedExercise.type = 'image-text';
            } else if (style === 'auditory' && exercise.type === 'text') {
                personalizedExercise.type = 'audio-text';
            } else if (style === 'kinesthetic' && exercise.type === 'text') {
                personalizedExercise.type = 'interactive-text';
            }
            
            return personalizedExercise;
        });
    }

    // Personalizar gramática
    personalizeGrammar(grammar) {
        const level = this.userProfile?.level || 1;
        const weaknesses = this.userProfile?.weaknesses || [];
        
        // Filtrar gramática por nivel
        const levelFiltered = grammar.filter(rule => {
            const ruleLevel = rule.level || 1;
            return ruleLevel <= level;
        });
        
        // Priorizar gramática de debilidades
        const weaknessFiltered = levelFiltered.sort((a, b) => {
            const aWeakness = weaknesses.some(weakness => 
                a.category && a.category.includes(weakness)
            );
            const bWeakness = weaknesses.some(weakness => 
                b.category && b.category.includes(weakness)
            );
            
            if (aWeakness && !bWeakness) return -1;
            if (!aWeakness && bWeakness) return 1;
            return 0;
        });
        
        return weaknessFiltered;
    }

    // Personalizar multimedia
    personalizeMultimedia(multimedia) {
        const style = this.learningPreferences?.learningStyle || 'mixed';
        const styleConfig = this.adaptiveContent?.styleContent || {};
        
        return {
            ...multimedia,
            imageRatio: styleConfig.imageRatio || 0.4,
            audioRatio: styleConfig.audioRatio || 0.4,
            interactiveRatio: styleConfig.interactiveRatio || 0.5
        };
    }

    // Obtener recomendaciones personalizadas
    getPersonalizedRecommendations() {
        try {
            const recommendations = {
                // Recomendaciones principales
                primary: this.getPrimaryRecommendations(),
                
                // Recomendaciones secundarias
                secondary: this.getSecondaryRecommendations(),
                
                // Recomendaciones de mejora
                improvement: this.getImprovementRecommendations(),
                
                // Recomendaciones de tiempo
                timeBased: this.getTimeBasedRecommendations()
            };
            
            return recommendations;
        } catch (error) {
            console.error("❌ Error al obtener recomendaciones personalizadas:", error);
            return {};
        }
    }

    // Obtener recomendaciones principales
    getPrimaryRecommendations() {
        const level = this.userProfile?.level || 1;
        const style = this.learningPreferences?.learningStyle || 'mixed';
        
        return {
            lessons: this.getLevelBasedRecommendations(level).lessons,
            exercises: this.getStyleBasedRecommendations(style).preferredExercises,
            difficulty: this.getDifficultyBasedRecommendations().difficulty,
            duration: this.getLevelBasedRecommendations(level).duration
        };
    }

    // Obtener recomendaciones secundarias
    getSecondaryRecommendations() {
        const interests = this.userProfile?.interests || [];
        const topics = this.learningPreferences?.topics || [];
        
        return {
            topics: [...interests, ...topics].slice(0, 5),
            contentTypes: this.learningPreferences?.contentTypes || ['vocabulary', 'grammar'],
            sessionLength: this.learningPreferences?.sessionLength || 30
        };
    }

    // Obtener recomendaciones de mejora
    getImprovementRecommendations() {
        const weaknesses = this.userProfile?.weaknesses || [];
        const performance = this.getRecentPerformance();
        
        return {
            focusAreas: weaknesses,
            performance: performance,
            improvementPlan: this.generateImprovementPlan(weaknesses, performance)
        };
    }

    // Generar plan de mejora
    generateImprovementPlan(weaknesses, performance) {
        const plan = [];
        
        weaknesses.forEach(weakness => {
            const exercises = this.getWeaknessBasedRecommendations([weakness]);
            plan.push({
                area: weakness,
                exercises: exercises,
                frequency: performance < 0.5 ? 'daily' : 'weekly',
                duration: performance < 0.5 ? 20 : 15
            });
        });
        
        return plan;
    }

    // Actualizar perfil del usuario
    updateUserProfile(updates) {
        try {
            this.userProfile = { ...this.userProfile, ...updates };
            
            // Guardar en localStorage
            const userData = JSON.parse(localStorage.getItem('englishLearningSession') || '{}');
            const updatedUserData = { ...userData, ...updates };
            localStorage.setItem('englishLearningSession', JSON.stringify(updatedUserData));
            
            // Regenerar recomendaciones
            this.generateContentRecommendations();
            this.setupAdaptiveContent();
            
            console.log("👤 Perfil del usuario actualizado:", this.userProfile);
        } catch (error) {
            console.error("❌ Error al actualizar perfil del usuario:", error);
        }
    }

    // Actualizar preferencias de aprendizaje
    updateLearningPreferences(updates) {
        try {
            this.learningPreferences = { ...this.learningPreferences, ...updates };
            
            // Guardar en localStorage
            localStorage.setItem('learningPreferences', JSON.stringify(this.learningPreferences));
            
            // Regenerar recomendaciones
            this.generateContentRecommendations();
            this.setupAdaptiveContent();
            
            console.log("⚙️ Preferencias de aprendizaje actualizadas:", this.learningPreferences);
        } catch (error) {
            console.error("❌ Error al actualizar preferencias de aprendizaje:", error);
        }
    }

    // Obtener estado del sistema
    getPersonalizationStatus() {
        return {
            userProfile: this.userProfile,
            learningPreferences: this.learningPreferences,
            contentRecommendations: this.contentRecommendations,
            adaptiveContent: this.adaptiveContent
        };
    }
}

// Instancia global del sistema de personalización
const personalizationSystem = new PersonalizationSystem();

// Exportar funciones globales
window.personalizationSystem = personalizationSystem;
window.personalizeLessonContent = (lesson) => personalizationSystem.personalizeLessonContent(lesson);
window.getPersonalizedRecommendations = () => personalizationSystem.getPersonalizedRecommendations();
window.updateUserProfile = (updates) => personalizationSystem.updateUserProfile(updates);
window.updateLearningPreferences = (updates) => personalizationSystem.updateLearningPreferences(updates);

console.log("✅ Sistema de personalización cargado");
