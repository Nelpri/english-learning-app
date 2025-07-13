// English Learning App - Ciclo APA
// Aprender, Practicar, Aplicar

// Estado global de la aplicación
const appState = {
    currentLevel: 1,
    currentXP: 0,
    streakDays: 0,
    lessonsCompleted: 0,
    grammarExercises: 0,
    conversationsCompleted: 0,
    vocabularyWordsLearned: 0,
    achievements: [],
    currentLesson: 0,
    userProgress: {},
    lastLoginDate: null,
    weeklyProgress: {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0
    }
};

// Base de datos de lecciones (estructura escalable)
const LESSONS_DATABASE = {
    level1: [
        {
            id: 1,
            title: "Saludos Básicos",
            difficulty: "Principiante",
            vocabulary: [
                { english: "Hello", spanish: "Hola", pronunciation: "həˈloʊ" },
                { english: "Good morning", spanish: "Buenos días", pronunciation: "ɡʊd ˈmɔrnɪŋ" },
                { english: "Good afternoon", spanish: "Buenas tardes", pronunciation: "ɡʊd ˌæftərˈnun" },
                { english: "Good evening", spanish: "Buenas noches", pronunciation: "ɡʊd ˈivnɪŋ" },
                { english: "How are you?", spanish: "¿Cómo estás?", pronunciation: "haʊ ɑr ju" },
                { english: "I'm fine, thank you", spanish: "Estoy bien, gracias", pronunciation: "aɪm faɪn θæŋk ju" }
            ],
            grammar: {
                title: "Presente Simple - Verbos 'To Be'",
                explanation: "El verbo 'to be' (ser/estar) es fundamental en inglés. Sus formas son: I am, You are, He/She/It is, We are, They are.",
                examples: [
                    "I am a student. (Soy un estudiante)",
                    "You are my friend. (Tú eres mi amigo)",
                    "She is happy. (Ella está feliz)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cómo se dice 'Hola' en inglés?",
                    options: ["Hello", "Goodbye", "Thank you", "Please"],
                    correct: 0
                },
                {
                    type: "grammar",
                    question: "Completa: I ___ a student.",
                    options: ["am", "are", "is", "be"],
                    correct: 0
                }
            ]
        },
        {
            id: 2,
            title: "Números y Colores",
            difficulty: "Principiante",
            vocabulary: [
                { english: "One", spanish: "Uno", pronunciation: "wʌn" },
                { english: "Two", spanish: "Dos", pronunciation: "tu" },
                { english: "Three", spanish: "Tres", pronunciation: "θri" },
                { english: "Red", spanish: "Rojo", pronunciation: "rɛd" },
                { english: "Blue", spanish: "Azul", pronunciation: "blu" },
                { english: "Green", spanish: "Verde", pronunciation: "ɡrin" }
            ],
            grammar: {
                title: "Artículos Indefinidos",
                explanation: "Los artículos indefinidos 'a' y 'an' se usan antes de sustantivos singulares. 'A' se usa antes de consonantes, 'an' antes de vocales.",
                examples: [
                    "A car (Un carro)",
                    "An apple (Una manzana)",
                    "A book (Un libro)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cuál es el número 'tres' en inglés?",
                    options: ["One", "Two", "Three", "Four"],
                    correct: 2
                }
            ]
        },
        {
            id: 3,
            title: "Familia y Profesiones",
            difficulty: "Principiante",
            vocabulary: [
                { english: "Mother", spanish: "Madre", pronunciation: "ˈmʌðər" },
                { english: "Father", spanish: "Padre", pronunciation: "ˈfɑːðər" },
                { english: "Sister", spanish: "Hermana", pronunciation: "ˈsɪstər" },
                { english: "Brother", spanish: "Hermano", pronunciation: "ˈbrʌðər" },
                { english: "Teacher", spanish: "Maestro", pronunciation: "ˈtiːtʃər" },
                { english: "Doctor", spanish: "Doctor", pronunciation: "ˈdɑktər" },
                { english: "Engineer", spanish: "Ingeniero", pronunciation: "ˌendʒɪˈnɪr" }
            ],
            grammar: {
                title: "Pronombres Posesivos",
                explanation: "Los pronombres posesivos indican pertenencia: my, your, his, her, its, our, their.",
                examples: [
                    "My mother (Mi madre)",
                    "Your father (Tu padre)",
                    "His sister (Su hermana)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cómo se dice 'hermana' en inglés?",
                    options: ["Brother", "Sister", "Mother", "Father"],
                    correct: 1
                },
                {
                    type: "grammar",
                    question: "Completa: ___ mother is a teacher.",
                    options: ["My", "Your", "His", "Her"],
                    correct: 0
                }
            ]
        },
        {
            id: 4,
            title: "Comida y Bebidas",
            difficulty: "Principiante",
            vocabulary: [
                { english: "Bread", spanish: "Pan", pronunciation: "brɛd" },
                { english: "Milk", spanish: "Leche", pronunciation: "mɪlk" },
                { english: "Coffee", spanish: "Café", pronunciation: "ˈkɔfi" },
                { english: "Water", spanish: "Agua", pronunciation: "ˈwɔtər" },
                { english: "Apple", spanish: "Manzana", pronunciation: "ˈæpəl" },
                { english: "Banana", spanish: "Plátano", pronunciation: "bəˈnɑnə" },
                { english: "Restaurant", spanish: "Restaurante", pronunciation: "ˈrɛstərɑnt" }
            ],
            grammar: {
                title: "There is / There are",
                explanation: "'There is' se usa para singular, 'There are' para plural. Indican existencia.",
                examples: [
                    "There is a book on the table. (Hay un libro en la mesa)",
                    "There are three cars in the parking lot. (Hay tres carros en el estacionamiento)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cómo se dice 'agua' en inglés?",
                    options: ["Milk", "Coffee", "Water", "Bread"],
                    correct: 2
                }
            ]
        },
        {
            id: 5,
            title: "Tiempo y Fechas",
            difficulty: "Básico",
            vocabulary: [
                { english: "Today", spanish: "Hoy", pronunciation: "təˈdeɪ" },
                { english: "Yesterday", spanish: "Ayer", pronunciation: "ˈjɛstərdeɪ" },
                { english: "Tomorrow", spanish: "Mañana", pronunciation: "təˈmɑroʊ" },
                { english: "Week", spanish: "Semana", pronunciation: "wik" },
                { english: "Month", spanish: "Mes", pronunciation: "mʌnθ" },
                { english: "Year", spanish: "Año", pronunciation: "jɪr" },
                { english: "Birthday", spanish: "Cumpleaños", pronunciation: "ˈbɜrθdeɪ" }
            ],
            grammar: {
                title: "Presente Simple - Tercera Persona",
                explanation: "En tercera persona singular (he/she/it) agregamos 's' al verbo.",
                examples: [
                    "He works in an office. (Él trabaja en una oficina)",
                    "She studies English. (Ella estudia inglés)",
                    "It rains a lot. (Llueve mucho)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cómo se dice 'mañana' en inglés?",
                    options: ["Today", "Yesterday", "Tomorrow", "Week"],
                    correct: 2
                }
            ]
        },
        {
            id: 6,
            title: "Tecnología y Negocios",
            difficulty: "Intermedio",
            vocabulary: [
                { english: "Computer", spanish: "Computadora", pronunciation: "kəmˈpjutər" },
                { english: "Internet", spanish: "Internet", pronunciation: "ˈɪntərnɛt" },
                { english: "Website", spanish: "Sitio web", pronunciation: "ˈwɛbsaɪt" },
                { english: "Email", spanish: "Correo electrónico", pronunciation: "ˈimeɪl" },
                { english: "Meeting", spanish: "Reunión", pronunciation: "ˈmitɪŋ" },
                { english: "Project", spanish: "Proyecto", pronunciation: "ˈprɑdʒɛkt" },
                { english: "Client", spanish: "Cliente", pronunciation: "ˈklaɪənt" },
                { english: "Business", spanish: "Negocio", pronunciation: "ˈbɪznəs" }
            ],
            grammar: {
                title: "Presente Continuo",
                explanation: "Se usa para acciones que están ocurriendo ahora. Estructura: Subject + am/is/are + verb-ing",
                examples: [
                    "I am working on a project. (Estoy trabajando en un proyecto)",
                    "She is sending an email. (Ella está enviando un correo)",
                    "They are having a meeting. (Ellos están teniendo una reunión)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cómo se dice 'reunión' en inglés?",
                    options: ["Meeting", "Project", "Client", "Business"],
                    correct: 0
                }
            ]
        },
        {
            id: 7,
            title: "Deportes y Actividades",
            difficulty: "Básico",
            vocabulary: [
                { english: "Football", spanish: "Fútbol", pronunciation: "ˈfʊtbɔl" },
                { english: "Basketball", spanish: "Baloncesto", pronunciation: "ˈbæskɪtbɔl" },
                { english: "Tennis", spanish: "Tenis", pronunciation: "ˈtɛnəs" },
                { english: "Swimming", spanish: "Natación", pronunciation: "ˈswɪmɪŋ" },
                { english: "Running", spanish: "Correr", pronunciation: "ˈrʌnɪŋ" },
                { english: "Gym", spanish: "Gimnasio", pronunciation: "dʒɪm" },
                { english: "Exercise", spanish: "Ejercicio", pronunciation: "ˈɛksərsaɪz" },
                { english: "Team", spanish: "Equipo", pronunciation: "tim" }
            ],
            grammar: {
                title: "Verbos de Deporte",
                explanation: "Los verbos de deporte pueden usarse con 'play', 'go' o 'do' según el deporte.",
                examples: [
                    "I play football. (Juego fútbol)",
                    "I go swimming. (Voy a nadar)",
                    "I do exercise. (Hago ejercicio)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cómo se dice 'gimnasio' en inglés?",
                    options: ["Gym", "Exercise", "Team", "Swimming"],
                    correct: 0
                }
            ]
        },
        {
            id: 8,
            title: "Viajes y Transporte",
            difficulty: "Intermedio",
            vocabulary: [
                { english: "Airplane", spanish: "Avión", pronunciation: "ˈɛrpleɪn" },
                { english: "Train", spanish: "Tren", pronunciation: "treɪn" },
                { english: "Bus", spanish: "Autobús", pronunciation: "bʌs" },
                { english: "Taxi", spanish: "Taxi", pronunciation: "ˈtæksi" },
                { english: "Passport", spanish: "Pasaporte", pronunciation: "ˈpæspɔrt" },
                { english: "Ticket", spanish: "Boleto", pronunciation: "ˈtɪkət" },
                { english: "Luggage", spanish: "Equipaje", pronunciation: "ˈlʌɡɪdʒ" },
                { english: "Destination", spanish: "Destino", pronunciation: "ˌdɛstəˈneɪʃən" }
            ],
            grammar: {
                title: "Going to (Futuro Planificado)",
                explanation: "Se usa para planes futuros. Estructura: Subject + am/is/are + going to + verb",
                examples: [
                    "I am going to travel to New York. (Voy a viajar a Nueva York)",
                    "She is going to buy a ticket. (Ella va a comprar un boleto)",
                    "They are going to arrive tomorrow. (Ellos van a llegar mañana)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cómo se dice 'pasaporte' en inglés?",
                    options: ["Ticket", "Passport", "Luggage", "Destination"],
                    correct: 1
                }
            ]
        },
        {
            id: 9,
            title: "Emociones y Sentimientos",
            difficulty: "Básico",
            vocabulary: [
                { english: "Happy", spanish: "Feliz", pronunciation: "ˈhæpi" },
                { english: "Sad", spanish: "Triste", pronunciation: "sæd" },
                { english: "Angry", spanish: "Enojado", pronunciation: "ˈæŋɡri" },
                { english: "Excited", spanish: "Emocionado", pronunciation: "ɪkˈsaɪtəd" },
                { english: "Nervous", spanish: "Nervioso", pronunciation: "ˈnɜrvəs" },
                { english: "Surprised", spanish: "Sorprendido", pronunciation: "sərˈpraɪzd" },
                { english: "Tired", spanish: "Cansado", pronunciation: "ˈtaɪrd" },
                { english: "Worried", spanish: "Preocupado", pronunciation: "ˈwɜrid" }
            ],
            grammar: {
                title: "Adjetivos de Emoción",
                explanation: "Los adjetivos de emoción describen cómo nos sentimos. Se usan con 'be'.",
                examples: [
                    "I am happy today. (Estoy feliz hoy)",
                    "She is excited about the trip. (Ella está emocionada por el viaje)",
                    "They are worried about the exam. (Ellos están preocupados por el examen)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cómo se dice 'emocionado' en inglés?",
                    options: ["Happy", "Excited", "Nervous", "Surprised"],
                    correct: 1
                }
            ]
        },
        {
            id: 10,
            title: "Casa y Hogar",
            difficulty: "Básico",
            vocabulary: [
                { english: "Kitchen", spanish: "Cocina", pronunciation: "ˈkɪtʃən" },
                { english: "Bedroom", spanish: "Dormitorio", pronunciation: "ˈbɛdrum" },
                { english: "Bathroom", spanish: "Baño", pronunciation: "ˈbæθrum" },
                { english: "Living room", spanish: "Sala", pronunciation: "ˈlɪvɪŋ rum" },
                { english: "Dining room", spanish: "Comedor", pronunciation: "ˈdaɪnɪŋ rum" },
                { english: "Garden", spanish: "Jardín", pronunciation: "ˈɡɑrdən" },
                { english: "Garage", spanish: "Garaje", pronunciation: "ɡəˈrɑʒ" },
                { english: "Furniture", spanish: "Muebles", pronunciation: "ˈfɜrnɪtʃər" }
            ],
            grammar: {
                title: "There is / There are (Habitaciones)",
                explanation: "Se usa para describir lo que hay en una habitación o lugar.",
                examples: [
                    "There is a table in the kitchen. (Hay una mesa en la cocina)",
                    "There are two beds in the bedroom. (Hay dos camas en el dormitorio)",
                    "There is a sofa in the living room. (Hay un sofá en la sala)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cómo se dice 'cocina' en inglés?",
                    options: ["Kitchen", "Bedroom", "Bathroom", "Living room"],
                    correct: 0
                }
            ]
        },
        {
            id: 11,
            title: "Profesiones Avanzadas",
            difficulty: "Intermedio",
            vocabulary: [
                { english: "Entrepreneur", spanish: "Emprendedor", pronunciation: "ˌɑntrəprəˈnɜr" },
                { english: "Manager", spanish: "Gerente", pronunciation: "ˈmænɪdʒər" },
                { english: "Designer", spanish: "Diseñador", pronunciation: "dɪˈzaɪnər" },
                { english: "Developer", spanish: "Desarrollador", pronunciation: "dɪˈvɛləpər" },
                { english: "Consultant", spanish: "Consultor", pronunciation: "kənˈsʌltənt" },
                { english: "Analyst", spanish: "Analista", pronunciation: "ˈænəlɪst" },
                { english: "Director", spanish: "Director", pronunciation: "dəˈrɛktər" },
                { english: "Specialist", spanish: "Especialista", pronunciation: "ˈspɛʃəlɪst" }
            ],
            grammar: {
                title: "Presente Perfecto",
                explanation: "Se usa para acciones que comenzaron en el pasado y continúan en el presente.",
                examples: [
                    "I have worked here for 5 years. (He trabajado aquí por 5 años)",
                    "She has been a manager since 2020. (Ella ha sido gerente desde 2020)",
                    "They have studied English for 2 years. (Ellos han estudiado inglés por 2 años)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cómo se dice 'emprendedor' en inglés?",
                    options: ["Entrepreneur", "Manager", "Designer", "Developer"],
                    correct: 0
                }
            ]
        },
        {
            id: 12,
            title: "Comida Internacional",
            difficulty: "Intermedio",
            vocabulary: [
                { english: "Pizza", spanish: "Pizza", pronunciation: "ˈpitsə" },
                { english: "Sushi", spanish: "Sushi", pronunciation: "ˈsuʃi" },
                { english: "Pasta", spanish: "Pasta", pronunciation: "ˈpɑstə" },
                { english: "Burger", spanish: "Hamburguesa", pronunciation: "ˈbɜrɡər" },
                { english: "Salad", spanish: "Ensalada", pronunciation: "ˈsæləd" },
                { english: "Dessert", spanish: "Postre", pronunciation: "dɪˈzɜrt" },
                { english: "Appetizer", spanish: "Aperitivo", pronunciation: "ˈæpətaɪzər" },
                { english: "Beverage", spanish: "Bebida", pronunciation: "ˈbɛvərɪdʒ" }
            ],
            grammar: {
                title: "Would like (Preferencias)",
                explanation: "Se usa para expresar preferencias y hacer pedidos de manera educada.",
                examples: [
                    "I would like a pizza, please. (Me gustaría una pizza, por favor)",
                    "She would like to try the sushi. (A ella le gustaría probar el sushi)",
                    "They would like some dessert. (A ellos les gustaría algo de postre)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cómo se dice 'postre' en inglés?",
                    options: ["Salad", "Dessert", "Appetizer", "Beverage"],
                    correct: 1
                }
            ]
        }
    ]
};

// Escenarios de conversación para la sección "Aplicar"
const CONVERSATION_SCENARIOS = [
    {
        id: 1,
        title: "En el Restaurante",
        description: "Practica ordenar comida en inglés",
        messages: [
            { type: "bot", text: "Hello! Welcome to our restaurant. How can I help you today?" },
            { type: "user", text: "Hi! I'd like to order some food." },
            { type: "bot", text: "Great! What would you like to eat?" },
            { type: "user", text: "I'd like a hamburger, please." },
            { type: "bot", text: "Excellent choice! Would you like something to drink?" }
        ],
        vocabulary: ["hamburger", "drink", "water", "soda", "please", "thank you"]
    },
    {
        id: 2,
        title: "En la Tienda",
        description: "Practica comprando en una tienda",
        messages: [
            { type: "bot", text: "Good morning! Can I help you find something?" },
            { type: "user", text: "Yes, I'm looking for a shirt." },
            { type: "bot", text: "What size do you need?" },
            { type: "user", text: "Medium, please." }
        ],
        vocabulary: ["shirt", "size", "medium", "large", "small", "price"]
    },
    {
        id: 3,
        title: "En el Aeropuerto",
        description: "Practica viajando en avión",
        messages: [
            { type: "bot", text: "Good morning! Do you have your passport ready?" },
            { type: "user", text: "Yes, here it is." },
            { type: "bot", text: "Where are you traveling to today?" },
            { type: "user", text: "I'm going to New York." },
            { type: "bot", text: "Great! Your flight leaves at 3 PM. Have a good trip!" }
        ],
        vocabulary: ["passport", "travel", "flight", "trip", "destination"]
    },
    {
        id: 4,
        title: "En el Hotel",
        description: "Practica reservando una habitación",
        messages: [
            { type: "bot", text: "Welcome! How can I help you today?" },
            { type: "user", text: "I'd like to book a room for tonight." },
            { type: "bot", text: "How many people will be staying?" },
            { type: "user", text: "Just two people, please." },
            { type: "bot", text: "Perfect! I have a double room available. That will be $120 per night." }
        ],
        vocabulary: ["book", "room", "hotel", "stay", "reservation", "price"]
    },
    {
        id: 5,
        title: "En el Doctor",
        description: "Practica una visita médica",
        messages: [
            { type: "bot", text: "Hello! What brings you in today?" },
            { type: "user", text: "I have a headache and fever." },
            { type: "bot", text: "How long have you been feeling this way?" },
            { type: "user", text: "Since yesterday morning." },
            { type: "bot", text: "I'll examine you. It looks like you have a cold. Take this medicine." }
        ],
        vocabulary: ["headache", "fever", "sick", "medicine", "doctor", "symptoms"]
    },
    {
        id: 6,
        title: "En la Oficina",
        description: "Practica conversaciones de trabajo",
        messages: [
            { type: "bot", text: "Good morning! How is the project going?" },
            { type: "user", text: "It's going well. I'm working on the website design." },
            { type: "bot", text: "Great! When will you finish it?" },
            { type: "user", text: "I think I'll finish it by Friday." },
            { type: "bot", text: "Perfect! Let's have a meeting to discuss the details." }
        ],
        vocabulary: ["project", "website", "meeting", "finish", "discuss", "details"]
    },
    {
        id: 7,
        title: "En el Gimnasio",
        description: "Practica conversaciones sobre deportes",
        messages: [
            { type: "bot", text: "Hi! Are you new here?" },
            { type: "user", text: "Yes, I'm looking for a good exercise routine." },
            { type: "bot", text: "What sports do you like?" },
            { type: "user", text: "I enjoy swimming and running." },
            { type: "bot", text: "Great! I can help you create a fitness plan." }
        ],
        vocabulary: ["exercise", "routine", "sports", "swimming", "running", "fitness"]
    },
    {
        id: 8,
        title: "En el Aeropuerto",
        description: "Practica viajando en avión",
        messages: [
            { type: "bot", text: "Good morning! Do you have your passport ready?" },
            { type: "user", text: "Yes, here it is." },
            { type: "bot", text: "Where are you traveling to today?" },
            { type: "user", text: "I'm going to New York." },
            { type: "bot", text: "Great! Your flight leaves at 3 PM. Have a good trip!" }
        ],
        vocabulary: ["passport", "travel", "flight", "trip", "destination"]
    },
    {
        id: 9,
        title: "En el Restaurante Internacional",
        description: "Practica ordenando comida internacional",
        messages: [
            { type: "bot", text: "Welcome! What would you like to try today?" },
            { type: "user", text: "I'd like to try the sushi, please." },
            { type: "bot", text: "Excellent choice! Would you like some dessert too?" },
            { type: "user", text: "Yes, I'd like the chocolate cake." },
            { type: "bot", text: "Perfect! Your order will be ready in 15 minutes." }
        ],
        vocabulary: ["sushi", "dessert", "chocolate", "cake", "order", "ready"]
    },
    {
        id: 10,
        title: "En la Reunión de Negocios",
        description: "Practica presentaciones de trabajo",
        messages: [
            { type: "bot", text: "Good morning everyone! Let's start the meeting." },
            { type: "user", text: "I have a presentation about our new project." },
            { type: "bot", text: "Great! What's the main goal of this project?" },
            { type: "user", text: "We want to improve our website and attract more clients." },
            { type: "bot", text: "Excellent! I'm excited about this project." }
        ],
        vocabulary: ["presentation", "project", "goal", "website", "clients", "excited"]
    }
];

// Sistema de logros
const ACHIEVEMENTS = {
    FIRST_LESSON: {
        id: 'FIRST_LESSON',
        name: '🎓 Primera Lección',
        description: 'Completaste tu primera lección',
        condition: () => appState.lessonsCompleted >= 1,
        earned: false
    },
    WEEK_STREAK: {
        id: 'WEEK_STREAK',
        name: '🔥 Racha Semanal',
        description: '7 días consecutivos de estudio',
        condition: () => appState.streakDays >= 7,
        earned: false
    },
    VOCABULARY_MASTER: {
        id: 'VOCABULARY_MASTER',
        name: '📚 Maestro del Vocabulario',
        description: 'Aprendiste 50 palabras',
        condition: () => getTotalVocabularyLearned() >= 50,
        earned: false
    },
    GRAMMAR_EXPERT: {
        id: 'GRAMMAR_EXPERT',
        name: '✏️ Experto en Gramática',
        description: 'Completaste 20 ejercicios de gramática',
        condition: () => appState.grammarExercises >= 20,
        earned: false
    },
    CONVERSATION_PRO: {
        id: 'CONVERSATION_PRO',
        name: '💬 Profesional de Conversación',
        description: 'Completaste 10 conversaciones',
        condition: () => appState.conversationsCompleted >= 10,
        earned: false
    },
    DAILY_LEARNER: {
        id: 'DAILY_LEARNER',
        name: '📅 Aprendiz Diario',
        description: '30 días consecutivos de estudio',
        condition: () => appState.streakDays >= 30,
        earned: false
    },
    SPEED_LEARNER: {
        id: 'SPEED_LEARNER',
        name: '⚡ Aprendiz Veloz',
        description: 'Completaste 5 lecciones en un día',
        condition: () => appState.lessonsCompleted >= 5,
        earned: false
    }
};

// Funciones de utilidad
function getTotalVocabularyLearned() {
    let total = 0;
    Object.values(appState.userProgress).forEach(lesson => {
        if (lesson.vocabularyCompleted) {
            total += lesson.vocabulary.length || 0;
        }
    });
    return total;
}

// Categorías de vocabulario
const VOCABULARY_CATEGORIES = {
    basic: {
        name: "Básico",
        description: "Palabras fundamentales para principiantes",
        lessons: [1, 2, 4, 9, 10]
    },
    business: {
        name: "Negocios",
        description: "Vocabulario para el mundo empresarial",
        lessons: [6, 11]
    },
    technology: {
        name: "Tecnología",
        description: "Términos tecnológicos y digitales",
        lessons: [6]
    },
    sports: {
        name: "Deportes",
        description: "Actividades físicas y deportes",
        lessons: [7]
    },
    travel: {
        name: "Viajes",
        description: "Transporte y turismo",
        lessons: [8]
    },
    food: {
        name: "Comida",
        description: "Alimentos y gastronomía",
        lessons: [4, 12]
    },
    emotions: {
        name: "Emociones",
        description: "Sentimientos y estados de ánimo",
        lessons: [9]
    },
    home: {
        name: "Hogar",
        description: "Partes de la casa y muebles",
        lessons: [10]
    }
};

// Función para obtener vocabulario por categoría
function getVocabularyByCategory(category) {
    const categoryData = VOCABULARY_CATEGORIES[category];
    if (!categoryData) return [];
    
    let vocabulary = [];
    categoryData.lessons.forEach(lessonId => {
        const lesson = LESSONS_DATABASE.level1.find(l => l.id === lessonId);
        if (lesson) {
            vocabulary = vocabulary.concat(lesson.vocabulary);
        }
    });
    
    return vocabulary;
}

// Función para obtener estadísticas de vocabulario
function getVocabularyStats() {
    const stats = {};
    Object.keys(VOCABULARY_CATEGORIES).forEach(category => {
        const vocabulary = getVocabularyByCategory(category);
        stats[category] = {
            total: vocabulary.length,
            learned: 0 // Esto se calcularía basado en el progreso del usuario
        };
    });
    return stats;
}

// Sistema de pronunciación
function speakText(text, language = 'en-US', rate = 0.8) {
    if ('speechSynthesis' in window) {
        // Detener cualquier pronunciación anterior
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        utterance.rate = rate;
        utterance.volume = 1;
        
        // Obtener voces disponibles y seleccionar una voz en inglés
        const voices = speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => 
            voice.lang.startsWith('en') && voice.name.includes('US')
        );
        if (englishVoice) {
            utterance.voice = englishVoice;
        }
        
        speechSynthesis.speak(utterance);
        return true;
    }
    return false;
}

// Función para grabar audio del usuario
async function recordAudio() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];
        
        return new Promise((resolve, reject) => {
            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };
            
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                resolve(audioUrl);
            };
            
            mediaRecorder.onerror = reject;
            mediaRecorder.start();
            
            // Detener grabación después de 5 segundos
            setTimeout(() => {
                mediaRecorder.stop();
                stream.getTracks().forEach(track => track.stop());
            }, 5000);
        });
    } catch (error) {
        console.error('Error al grabar audio:', error);
        throw error;
    }
}

function saveProgress() {
    localStorage.setItem('englishLearningProgress', JSON.stringify({
        ...appState,
        lastSaved: new Date().toISOString()
    }));
}

function loadProgress() {
    const saved = localStorage.getItem('englishLearningProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        Object.assign(appState, progress);
        updateUI();
    }
}

function updateUI() {
    document.getElementById('currentLevel').textContent = appState.currentLevel;
    document.getElementById('currentXP').textContent = appState.currentXP;
    document.getElementById('streakDays').textContent = appState.streakDays;
    document.getElementById('lessonsCompleted').textContent = appState.lessonsCompleted;
    document.getElementById('achievementsEarned').textContent = appState.achievements.length;
}

// Navegación entre secciones
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const contentSections = document.querySelectorAll('.content-section');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Actualizar navegación
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Mostrar sección correspondiente
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetTab) {
                    section.classList.add('active');
                }
            });
            
            // Cargar contenido específico
            loadSectionContent(targetTab);
        });
    });
}

function loadSectionContent(section) {
    switch(section) {
        case 'learn':
            loadCurrentLesson();
            break;
        case 'practice':
            loadPracticeModes();
            break;
        case 'apply':
            loadConversationScenario();
            break;
        case 'progress':
            loadProgressChart();
            break;
        case 'vocabulary':
            loadVocabularyCategories();
            break;
    }
}

// Sección APRENDER
function loadCurrentLesson() {
    const currentLesson = LESSONS_DATABASE.level1[appState.currentLesson];
    if (!currentLesson) return;

    document.getElementById('lessonTitle').textContent = currentLesson.title;
    document.getElementById('lessonDifficulty').textContent = currentLesson.difficulty;

    // Cargar vocabulario
    const vocabularyGrid = document.getElementById('vocabularyGrid');
    vocabularyGrid.innerHTML = '';
    
    currentLesson.vocabulary.forEach(item => {
        const vocabItem = document.createElement('div');
        vocabItem.className = 'vocabulary-item';
        vocabItem.innerHTML = `
            <div class="vocab-header">
                <div class="english">${item.english}</div>
                <button class="speak-btn" onclick="speakText('${item.english}', 'en-US')" title="Escuchar pronunciación">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="spanish">${item.spanish}</div>
            <div class="pronunciation">[${item.pronunciation}]</div>
        `;
        vocabularyGrid.appendChild(vocabItem);
    });

    // Cargar gramática
    const grammarContent = document.getElementById('grammarContent');
    grammarContent.innerHTML = `
        <h5>${currentLesson.grammar.title}</h5>
        <p>${currentLesson.grammar.explanation}</p>
        <div class="examples">
            <h6>Ejemplos:</h6>
            <ul>
                ${currentLesson.grammar.examples.map(example => `<li>${example}</li>`).join('')}
            </ul>
        </div>
    `;
}

// Sección PRACTICAR
function loadPracticeModes() {
    const modeCards = document.querySelectorAll('.mode-card');
    const practiceArea = document.getElementById('practiceArea');

    modeCards.forEach(card => {
        card.addEventListener('click', () => {
            const mode = card.dataset.mode;
            loadPracticeExercise(mode);
            
            // Ocultar modos y mostrar área de práctica
            document.querySelector('.practice-modes').style.display = 'none';
            practiceArea.style.display = 'block';
        });
    });
}

function loadPracticeExercise(mode) {
    const practiceArea = document.getElementById('practiceArea');
    const currentLesson = LESSONS_DATABASE.level1[appState.currentLesson];
    
    if (!currentLesson) return;

    let exerciseHTML = '';
    
    switch(mode) {
        case 'vocabulary':
            exerciseHTML = createVocabularyExercise(currentLesson);
            break;
        case 'grammar':
            exerciseHTML = createGrammarExercise(currentLesson);
            break;
        case 'listening':
            exerciseHTML = createListeningExercise(currentLesson);
            break;
    }
    
    practiceArea.innerHTML = `
        <div class="practice-header">
            <button class="btn btn-secondary" onclick="backToPracticeModes()">
                <i class="fas fa-arrow-left"></i> Volver
            </button>
            <h3>${mode.charAt(0).toUpperCase() + mode.slice(1)}</h3>
        </div>
        ${exerciseHTML}
    `;
}

function createVocabularyExercise(lesson) {
    const vocab = lesson.vocabulary[Math.floor(Math.random() * lesson.vocabulary.length)];
    const options = lesson.vocabulary
        .filter(item => item.english !== vocab.english)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(item => item.english);
    
    options.push(vocab.english);
    options.sort(() => Math.random() - 0.5);
    
    return `
        <div class="exercise-container">
            <h4>¿Cómo se dice "${vocab.spanish}" en inglés?</h4>
            <div class="options-grid">
                ${options.map((option, index) => `
                    <button class="btn btn-secondary option-btn" data-correct="${option === vocab.english}" data-index="${index}">
                        ${option}
                    </button>
                `).join('')}
            </div>
            <div id="exerciseResult" class="exercise-result"></div>
        </div>
    `;
}

function createGrammarExercise(lesson) {
    return `
        <div class="exercise-container">
            <h4>Completa la oración:</h4>
            <div class="grammar-exercise">
                <p>I ___ a student.</p>
                <div class="options-grid">
                    <button class="btn btn-secondary option-btn" data-correct="true">am</button>
                    <button class="btn btn-secondary option-btn" data-correct="false">are</button>
                    <button class="btn btn-secondary option-btn" data-correct="false">is</button>
                </div>
            </div>
            <div id="exerciseResult" class="exercise-result"></div>
        </div>
    `;
}

function createListeningExercise(lesson) {
    return `
        <div class="exercise-container">
            <h4>Escucha y repite:</h4>
            <div class="listening-exercise">
                <div class="audio-player">
                    <i class="fas fa-play-circle"></i>
                    <span>Reproducir audio</span>
                </div>
                <div class="pronunciation-practice">
                    <p>Practica la pronunciación de: <strong>Hello</strong></p>
                    <button class="btn btn-primary">Grabar</button>
                </div>
            </div>
        </div>
    `;
}

function backToPracticeModes() {
    document.querySelector('.practice-modes').style.display = 'grid';
    document.getElementById('practiceArea').style.display = 'none';
}

// Sección APLICAR
function loadConversationScenario() {
    const scenario = CONVERSATION_SCENARIOS[0]; // Por ahora usamos el primero
    const chatMessages = document.getElementById('chatMessages');
    
    document.getElementById('scenarioTitle').textContent = scenario.title;
    document.getElementById('scenarioDescription').textContent = scenario.description;
    
    // Limpiar mensajes anteriores
    chatMessages.innerHTML = '';
    
    // Agregar mensajes iniciales
    scenario.messages.forEach(message => {
        addMessageToChat(message.text, message.type);
    });
}

function addMessageToChat(text, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Sección PROGRESO
function loadProgressChart() {
    const chartContainer = document.getElementById('weeklyChart');
    const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    
    // Simular datos de progreso semanal
    const weeklyData = [
        appState.currentXP * 0.1,
        appState.currentXP * 0.15,
        appState.currentXP * 0.12,
        appState.currentXP * 0.18,
        appState.currentXP * 0.14,
        appState.currentXP * 0.20,
        appState.currentXP * 0.22
    ];
    
    // Crear gráfico con Chart.js
    const ctx = chartContainer.getContext('2d');
    
    // Destruir gráfico anterior si existe
    if (window.weeklyChart) {
        window.weeklyChart.destroy();
    }
    
    window.weeklyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: weekDays,
            datasets: [{
                label: 'XP Ganados',
                data: weeklyData,
                backgroundColor: 'rgba(79, 70, 229, 0.8)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Sistema de logros
function checkAchievements() {
    Object.values(ACHIEVEMENTS).forEach(achievement => {
        if (!achievement.earned && achievement.condition()) {
            unlockAchievement(achievement);
        }
    });
}

function unlockAchievement(achievement) {
    achievement.earned = true;
    appState.achievements.push(achievement.id);
    
    const notification = document.getElementById('achievementNotification');
    const achievementText = document.getElementById('achievementText');
    
    achievementText.textContent = achievement.name;
    notification.style.display = 'flex';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
    
    saveProgress();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    initializeNavigation();
    loadCurrentLesson();
    
    // Event listeners para ejercicios
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('option-btn')) {
            handleExerciseAnswer(e.target);
        }
    });
    
    // Event listener para chat
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatInput = document.getElementById('chatInput');
    
    if (sendMessageBtn && chatInput) {
        sendMessageBtn.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    // Botones de lección
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    const reviewLessonBtn = document.getElementById('reviewLessonBtn');
    
    if (nextLessonBtn) {
        nextLessonBtn.addEventListener('click', completeLesson);
    }
    
    if (reviewLessonBtn) {
        reviewLessonBtn.addEventListener('click', reviewLesson);
    }
});

function handleExerciseAnswer(button) {
    const isCorrect = button.dataset.correct === 'true';
    const resultDiv = document.getElementById('exerciseResult');
    
    // Deshabilitar todos los botones
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === 'true') {
            btn.style.background = 'var(--success-color)';
            btn.style.color = 'white';
        } else if (btn === button && !isCorrect) {
            btn.style.background = 'var(--error-color)';
            btn.style.color = 'white';
        }
    });
    
    if (isCorrect) {
        resultDiv.innerHTML = '<div class="success">¡Correcto! 🎉</div>';
        appState.currentXP += 10;
    } else {
        resultDiv.innerHTML = '<div class="error">Incorrecto. Intenta de nuevo.</div>';
    }
    
    updateUI();
    saveProgress();
    
    setTimeout(() => {
        // Volver a habilitar botones para siguiente ejercicio
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = false;
            btn.style.background = '';
            btn.style.color = '';
        });
        resultDiv.innerHTML = '';
    }, 2000);
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message) {
        addMessageToChat(message, 'user');
        chatInput.value = '';
        
        // Simular respuesta del bot
        setTimeout(() => {
            const responses = [
                "That's great! Can you tell me more?",
                "I understand. What else would you like to practice?",
                "Excellent! You're doing very well.",
                "That's correct! Keep practicing."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessageToChat(randomResponse, 'bot');
        }, 1000);
    }
}

function completeLesson() {
    appState.lessonsCompleted++;
    appState.currentXP += 50;
    appState.vocabularyWordsLearned += LESSONS_DATABASE.level1[appState.currentLesson].vocabulary.length;
    appState.currentLesson++;
    
    // Actualizar progreso semanal
    const today = new Date().getDay();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = dayNames[today];
    appState.weeklyProgress[currentDay] += 50;
    
    if (appState.currentLesson >= LESSONS_DATABASE.level1.length) {
        appState.currentLevel++;
        appState.currentLesson = 0;
    }
    
    // Guardar progreso de la lección
    if (!appState.userProgress[appState.currentLesson]) {
        appState.userProgress[appState.currentLesson] = {
            vocabularyCompleted: true,
            grammarCompleted: true,
            practiceCompleted: true
        };
    }
    
    updateUI();
    saveProgress();
    checkAchievements();
    
    // Cargar siguiente lección
    loadCurrentLesson();
    
    // Mostrar notificación de éxito
    showNotification('¡Lección completada! +50 XP', 'success');
}

function reviewLesson() {
    showNotification('Repasando lección actual...', 'info');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Verificar racha diaria
function checkDailyStreak() {
    const today = new Date().toDateString();
    const lastLogin = appState.lastLoginDate ? new Date(appState.lastLoginDate).toDateString() : null;
    
    if (lastLogin !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toDateString();
        
        if (lastLogin === yesterdayString) {
            appState.streakDays++;
        } else {
            appState.streakDays = 1;
        }
        
        appState.lastLoginDate = new Date().toISOString();
        saveProgress();
    }
}

// Funciones para la sección de vocabulario
function loadVocabularyCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    const vocabularyDetail = document.getElementById('vocabularyDetail');
    
    // Ocultar detalle y mostrar categorías
    vocabularyDetail.style.display = 'none';
    categoriesGrid.style.display = 'grid';
    
    categoriesGrid.innerHTML = '';
    
    Object.entries(VOCABULARY_CATEGORIES).forEach(([key, category]) => {
        const vocabulary = getVocabularyByCategory(key);
        const learnedCount = Math.floor(vocabulary.length * 0.3); // Simular progreso
        
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.onclick = () => loadVocabularyDetail(key);
        
        categoryCard.innerHTML = `
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <div class="category-stats">
                <span>${learnedCount}/${vocabulary.length} palabras</span>
                <span>${Math.round((learnedCount / vocabulary.length) * 100)}%</span>
            </div>
            <div class="category-progress">
                <div class="category-progress-fill" style="width: ${(learnedCount / vocabulary.length) * 100}%"></div>
            </div>
        `;
        
        categoriesGrid.appendChild(categoryCard);
    });
}

function loadVocabularyDetail(categoryKey) {
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
            ${vocabulary.map(item => `
                <div class="vocabulary-item-detail">
                    <div class="vocab-header">
                        <div class="english">${item.english}</div>
                        <button class="speak-btn" onclick="speakText('${item.english}', 'en-US')" title="Escuchar pronunciación">
                            <i class="fas fa-volume-up"></i>
                        </button>
                    </div>
                    <div class="spanish">${item.spanish}</div>
                    <div class="pronunciation">[${item.pronunciation}]</div>
                </div>
            `).join('')}
        </div>
    `;
}

// Inicializar verificación de racha
checkDailyStreak(); 