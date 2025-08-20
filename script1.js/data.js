// Módulo de datos globales: contiene las bases de datos de lecciones, vocabulario, etc.

// Base de datos de lecciones (estructura escalable)
const LESSONS_DATABASE = {
    level1: [
        {
            id: 1,
            title: "Saludos Básicos",
            difficulty: "Principiante",
            mcer: "A1",
            vocabulary: [
                { english: "Hello", spanish: "Hola", pronunciation: "/həˈloʊ/" },
                { english: "Good morning", spanish: "Buenos días", pronunciation: "/ɡʊd ˈmɔːrnɪŋ/" },
                { english: "Good afternoon", spanish: "Buenas tardes", pronunciation: "/ɡʊd ˌæftərˈnuːn/" },
                { english: "Good evening", spanish: "Buenas noches", pronunciation: "/ɡʊd ˈiːvnɪŋ/" },
                { english: "How are you?", spanish: "¿Cómo estás?", pronunciation: "/haʊ ɑːr juː/" }
            ],
            grammar: {
                title: "Pronombres Personales",
                content: "I (yo), you (tú/usted), he (él), she (ella), it (ello), we (nosotros), they (ellos)"
            }
        },
        {
            id: 2,
            title: "Números del 1 al 10",
            difficulty: "Principiante",
            mcer: "A1",
            vocabulary: [
                { english: "One", spanish: "Uno", pronunciation: "/wʌn/" },
                { english: "Two", spanish: "Dos", pronunciation: "/tuː/" },
                { english: "Three", spanish: "Tres", pronunciation: "/θriː/" },
                { english: "Four", spanish: "Cuatro", pronunciation: "/fɔːr/" },
                { english: "Five", spanish: "Cinco", pronunciation: "/faɪv/" }
            ],
            grammar: {
                title: "Artículos Indefinidos",
                content: "a (un/una), an (un/una - antes de vocales)"
            }
        }
    ],
    level2: [
        {
            id: 3,
            title: "Colores Básicos",
            difficulty: "Básico",
            mcer: "A2",
            vocabulary: [
                { english: "Red", spanish: "Rojo", pronunciation: "/red/" },
                { english: "Blue", spanish: "Azul", pronunciation: "/bluː/" },
                { english: "Green", spanish: "Verde", pronunciation: "/ɡriːn/" },
                { english: "Yellow", spanish: "Amarillo", pronunciation: "/ˈjeloʊ/" },
                { english: "Black", spanish: "Negro", pronunciation: "/blæk/" }
            ],
            grammar: {
                title: "Adjetivos",
                content: "Los adjetivos van antes del sustantivo en inglés"
            }
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
            { type: "user", text: "Hi! I'd like to see the menu, please." },
            { type: "bot", text: "Of course! Here's our menu. What would you like to order?" }
        ]
    },
    {
        id: 2,
        title: "En la Tienda",
        description: "Practica comprando en una tienda",
        messages: [
            { type: "bot", text: "Good morning! Can I help you find something?" },
            { type: "user", text: "Yes, I'm looking for a gift for my friend." },
            { type: "bot", text: "Great! What kind of things does your friend like?" }
        ]
    }
];

// Pools de gramática por nivel MCER para ampliar ejercicios en todas las lecciones
const GRAMMAR_POOLS = {
    A1: [
        { type: "articles", question: "Complete: ___ apple", options: ["a", "an", "the", "none"], correct: "an" },
        { type: "pronouns", question: "___ am a student", options: ["I", "You", "He", "She"], correct: "I" }
    ],
    A2: [
        { type: "present_simple", question: "She ___ English", options: ["speak", "speaks", "speaking", "spoke"], correct: "speaks" },
        { type: "adjectives", question: "The car is ___", options: ["fast", "fastly", "fasting", "faster"], correct: "fast" }
    ]
};

// Sistema de niveles y XP mejorado
const LEVEL_SYSTEM = {
    xpPerLesson: 50,
    xpPerExercise: 10,
    xpPerStreak: 5,
    levels: [
        { level: 1, xpRequired: 0, title: "Principiante" },
        { level: 2, xpRequired: 100, title: "Básico" },
        { level: 3, xpRequired: 250, title: "Intermedio" },
        { level: 4, xpRequired: 500, title: "Avanzado" },
        { level: 5, xpRequired: 1000, title: "Experto" }
    ]
};

// Estado global de la aplicación
const appState = {
    currentLesson: 0,
    currentLevel: 1,
    currentXP: 0,
    vocabularyWordsLearned: 0,
    lessonsCompleted: 0,
    practiceStreak: 0,
    lastPracticeDate: null,
    weeklyProgress: {
        sunday: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0
    }
};

// Variables globales para el ejercicio de listening
let currentListeningAudio = null;
let listeningAudioSpeed = 1.0;
let selectedListeningAnswer = null;

// Categorías de vocabulario
const VOCABULARY_CATEGORIES = [
    {
        key: 'greetings',
        title: 'Saludos y Presentaciones',
        description: 'Expresiones básicas para saludar y presentarse',
        icon: 'fas fa-handshake',
        wordCount: 15
    },
    {
        key: 'numbers',
        title: 'Números',
        description: 'Números del 1 al 100 y operaciones básicas',
        icon: 'fas fa-calculator',
        wordCount: 25
    },
    {
        key: 'colors',
        title: 'Colores',
        description: 'Colores básicos y sus variaciones',
        icon: 'fas fa-palette',
        wordCount: 20
    },
    {
        key: 'family',
        title: 'Familia',
        description: 'Miembros de la familia y relaciones',
        icon: 'fas fa-users',
        wordCount: 18
    },
    {
        key: 'food',
        title: 'Comida y Bebidas',
        description: 'Alimentos, bebidas y comidas del día',
        icon: 'fas fa-utensils',
        wordCount: 30
    },
    {
        key: 'animals',
        title: 'Animales',
        description: 'Animales domésticos, salvajes y de granja',
        icon: 'fas fa-paw',
        wordCount: 25
    },
    {
        key: 'weather',
        title: 'Clima y Tiempo',
        description: 'Condiciones climáticas y estaciones',
        icon: 'fas fa-cloud-sun',
        wordCount: 22
    },
    {
        key: 'difficult-words',
        title: 'Palabras Difíciles',
        description: 'Palabras que has marcado como difíciles',
        icon: 'fas fa-exclamation-triangle',
        wordCount: 0,
        isSpecial: true
    }
];

// Base de datos de vocabulario por categoría
const VOCABULARY_DATABASE = {
    greetings: [
        { english: "Hello", spanish: "Hola", pronunciation: "/həˈloʊ/" },
        { english: "Hi", spanish: "Hola", pronunciation: "/haɪ/" },
        { english: "Good morning", spanish: "Buenos días", pronunciation: "/ɡʊd ˈmɔːrnɪŋ/" },
        { english: "Good afternoon", spanish: "Buenas tardes", pronunciation: "/ɡʊd ˌæftərˈnuːn/" },
        { english: "Good evening", spanish: "Buenas noches", pronunciation: "/ɡʊd ˈiːvnɪŋ/" },
        { english: "Goodbye", spanish: "Adiós", pronunciation: "/ɡʊdˈbaɪ/" },
        { english: "See you later", spanish: "Hasta luego", pronunciation: "/siː juː ˈleɪtər/" },
        { english: "How are you?", spanish: "¿Cómo estás?", pronunciation: "/haʊ ɑːr juː/" },
        { english: "I'm fine", spanish: "Estoy bien", pronunciation: "/aɪm faɪn/" },
        { english: "Nice to meet you", spanish: "Encantado de conocerte", pronunciation: "/naɪs tuː miːt juː/" },
        { english: "My name is...", spanish: "Mi nombre es...", pronunciation: "/maɪ neɪm ɪz/" },
        { english: "What's your name?", spanish: "¿Cómo te llamas?", pronunciation: "/wɒts jɔːr neɪm/" },
        { english: "Pleased to meet you", spanish: "Un placer conocerte", pronunciation: "/pliːzd tuː miːt juː/" },
        { english: "Take care", spanish: "Cuídate", pronunciation: "/teɪk keər/" },
        { english: "Have a nice day", spanish: "Que tengas un buen día", pronunciation: "/hæv ə naɪs deɪ/" }
    ],
    numbers: [
        { english: "One", spanish: "Uno", pronunciation: "/wʌn/" },
        { english: "Two", spanish: "Dos", pronunciation: "/tuː/" },
        { english: "Three", spanish: "Tres", pronunciation: "/θriː/" },
        { english: "Four", spanish: "Cuatro", pronunciation: "/fɔːr/" },
        { english: "Five", spanish: "Cinco", pronunciation: "/faɪv/" },
        { english: "Six", spanish: "Seis", pronunciation: "/sɪks/" },
        { english: "Seven", spanish: "Siete", pronunciation: "/ˈsevən/" },
        { english: "Eight", spanish: "Ocho", pronunciation: "/eɪt/" },
        { english: "Nine", spanish: "Nueve", pronunciation: "/naɪn/" },
        { english: "Ten", spanish: "Diez", pronunciation: "/ten/" },
        { english: "Eleven", spanish: "Once", pronunciation: "/ɪˈlevən/" },
        { english: "Twelve", spanish: "Doce", pronunciation: "/twelv/" },
        { english: "Thirteen", spanish: "Trece", pronunciation: "/ˌθɜːrˈtiːn/" },
        { english: "Fourteen", spanish: "Catorce", pronunciation: "/ˌfɔːrˈtiːn/" },
        { english: "Fifteen", spanish: "Quince", pronunciation: "/ˌfɪfˈtiːn/" },
        { english: "Twenty", spanish: "Veinte", pronunciation: "/ˈtwenti/" },
        { english: "Thirty", spanish: "Treinta", pronunciation: "/ˈθɜːrti/" },
        { english: "Forty", spanish: "Cuarenta", pronunciation: "/ˈfɔːrti/" },
        { english: "Fifty", spanish: "Cincuenta", pronunciation: "/ˈfɪfti/" },
        { english: "Hundred", spanish: "Cien", pronunciation: "/ˈhʌndrəd/" },
        { english: "Thousand", spanish: "Mil", pronunciation: "/ˈθaʊznd/" },
        { english: "Million", spanish: "Millón", pronunciation: "/ˈmɪljən/" },
        { english: "First", spanish: "Primero", pronunciation: "/fɜːrst/" },
        { english: "Second", spanish: "Segundo", pronunciation: "/ˈsekənd/" },
        { english: "Third", spanish: "Tercero", pronunciation: "/θɜːrd/" },
        { english: "Last", spanish: "Último", pronunciation: "/læst/" }
    ],
    colors: [
        { english: "Red", spanish: "Rojo", pronunciation: "/red/" },
        { english: "Blue", spanish: "Azul", pronunciation: "/bluː/" },
        { english: "Green", spanish: "Verde", pronunciation: "/ɡriːn/" },
        { english: "Yellow", spanish: "Amarillo", pronunciation: "/ˈjeloʊ/" },
        { english: "Black", spanish: "Negro", pronunciation: "/blæk/" },
        { english: "White", spanish: "Blanco", pronunciation: "/waɪt/" },
        { english: "Purple", spanish: "Morado", pronunciation: "/ˈpɜːrpl/" },
        { english: "Orange", spanish: "Naranja", pronunciation: "/ˈɔːrɪndʒ/" },
        { english: "Pink", spanish: "Rosa", pronunciation: "/pɪŋk/" },
        { english: "Brown", spanish: "Marrón", pronunciation: "/braʊn/" },
        { english: "Gray", spanish: "Gris", pronunciation: "/ɡreɪ/" },
        { english: "Gold", spanish: "Dorado", pronunciation: "/ɡoʊld/" },
        { english: "Silver", spanish: "Plateado", pronunciation: "/ˈsɪlvər/" },
        { english: "Light blue", spanish: "Azul claro", pronunciation: "/laɪt bluː/" },
        { english: "Dark green", spanish: "Verde oscuro", pronunciation: "/dɑːrk ɡriːn/" },
        { english: "Bright red", spanish: "Rojo brillante", pronunciation: "/braɪt red/" },
        { english: "Pale yellow", spanish: "Amarillo pálido", pronunciation: "/peɪl ˈjeloʊ/" },
        { english: "Navy blue", spanish: "Azul marino", pronunciation: "/ˈneɪvi bluː/" },
        { english: "Forest green", spanish: "Verde bosque", pronunciation: "/ˈfɔːrɪst ɡriːn/" },
        { english: "Crimson", spanish: "Carmesí", pronunciation: "/ˈkrɪmzən/" }
    ],
    family: [
        { english: "Mother", spanish: "Madre", pronunciation: "/ˈmʌðər/" },
        { english: "Father", spanish: "Padre", pronunciation: "/ˈfɑːðər/" },
        { english: "Sister", spanish: "Hermana", pronunciation: "/ˈsɪstər/" },
        { english: "Brother", spanish: "Hermano", pronunciation: "/ˈbrʌðər/" },
        { english: "Daughter", spanish: "Hija", pronunciation: "/ˈdɔːtər/" },
        { english: "Son", spanish: "Hijo", pronunciation: "/sʌn/" },
        { english: "Grandmother", spanish: "Abuela", pronunciation: "/ˈɡrænmʌðər/" },
        { english: "Grandfather", spanish: "Abuelo", pronunciation: "/ˈɡrænfɑːðər/" },
        { english: "Aunt", spanish: "Tía", pronunciation: "/ænt/" },
        { english: "Uncle", spanish: "Tío", pronunciation: "/ˈʌŋkl/" },
        { english: "Cousin", spanish: "Primo/a", pronunciation: "/ˈkʌzən/" },
        { english: "Niece", spanish: "Sobrina", pronunciation: "/niːs/" },
        { english: "Nephew", spanish: "Sobrino", pronunciation: "/ˈnefjuː/" },
        { english: "Wife", spanish: "Esposa", pronunciation: "/waɪf/" },
        { english: "Husband", spanish: "Esposo", pronunciation: "/ˈhʌzbənd/" },
        { english: "Parents", spanish: "Padres", pronunciation: "/ˈpeərənts/" },
        { english: "Children", spanish: "Hijos", pronunciation: "/ˈtʃɪldrən/" },
        { english: "Family", spanish: "Familia", pronunciation: "/ˈfæməli/" }
    ],
    food: [
        { english: "Apple", spanish: "Manzana", pronunciation: "/ˈæpl/" },
        { english: "Banana", spanish: "Plátano", pronunciation: "/bəˈnɑːnə/" },
        { english: "Bread", spanish: "Pan", pronunciation: "/bred/" },
        { english: "Milk", spanish: "Leche", pronunciation: "/mɪlk/" },
        { english: "Water", spanish: "Agua", pronunciation: "/ˈwɔːtər/" },
        { english: "Coffee", spanish: "Café", pronunciation: "/ˈkɔːfi/" },
        { english: "Tea", spanish: "Té", pronunciation: "/tiː/" },
        { english: "Rice", spanish: "Arroz", pronunciation: "/raɪs/" },
        { english: "Chicken", spanish: "Pollo", pronunciation: "/ˈtʃɪkɪn/" },
        { english: "Fish", spanish: "Pescado", pronunciation: "/fɪʃ/" },
        { english: "Beef", spanish: "Carne de res", pronunciation: "/biːf/" },
        { english: "Pork", spanish: "Cerdo", pronunciation: "/pɔːrk/" },
        { english: "Vegetables", spanish: "Verduras", pronunciation: "/ˈvedʒtəblz/" },
        { english: "Fruits", spanish: "Frutas", pronunciation: "/fruːts/" },
        { english: "Cheese", spanish: "Queso", pronunciation: "/tʃiːz/" },
        { english: "Eggs", spanish: "Huevos", pronunciation: "/eɡz/" },
        { english: "Butter", spanish: "Mantequilla", pronunciation: "/ˈbʌtər/" },
        { english: "Sugar", spanish: "Azúcar", pronunciation: "/ˈʃʊɡər/" },
        { english: "Salt", spanish: "Sal", pronunciation: "/sɔːlt/" },
        { english: "Oil", spanish: "Aceite", pronunciation: "/ɔɪl/" },
        { english: "Soup", spanish: "Sopa", pronunciation: "/suːp/" },
        { english: "Salad", spanish: "Ensalada", pronunciation: "/ˈsæləd/" },
        { english: "Pizza", spanish: "Pizza", pronunciation: "/ˈpiːtsə/" },
        { english: "Hamburger", spanish: "Hamburguesa", pronunciation: "/ˈhæmbɜːrɡər/" },
        { english: "French fries", spanish: "Papas fritas", pronunciation: "/frentʃ fraɪz/" },
        { english: "Ice cream", spanish: "Helado", pronunciation: "/aɪs kriːm/" },
        { english: "Cake", spanish: "Pastel", pronunciation: "/keɪk/" },
        { english: "Cookie", spanish: "Galleta", pronunciation: "/ˈkʊki/" },
        { english: "Chocolate", spanish: "Chocolate", pronunciation: "/ˈtʃɔːklət/" },
        { english: "Juice", spanish: "Jugo", pronunciation: "/dʒuːs/" },
        { english: "Wine", spanish: "Vino", pronunciation: "/waɪn/" },
        { english: "Beer", spanish: "Cerveza", pronunciation: "/bɪr/" }
    ],
    animals: [
        { english: "Dog", spanish: "Perro", pronunciation: "/dɔːɡ/" },
        { english: "Cat", spanish: "Gato", pronunciation: "/kæt/" },
        { english: "Bird", spanish: "Pájaro", pronunciation: "/bɜːrd/" },
        { english: "Fish", spanish: "Pez", pronunciation: "/fɪʃ/" },
        { english: "Horse", spanish: "Caballo", pronunciation: "/hɔːrs/" },
        { english: "Cow", spanish: "Vaca", pronunciation: "/kaʊ/" },
        { english: "Pig", spanish: "Cerdo", pronunciation: "/pɪɡ/" },
        { english: "Sheep", spanish: "Oveja", pronunciation: "/ʃiːp/" },
        { english: "Chicken", spanish: "Pollo", pronunciation: "/ˈtʃɪkɪn/" },
        { english: "Duck", spanish: "Pato", pronunciation: "/dʌk/" },
        { english: "Lion", spanish: "León", pronunciation: "/ˈlaɪən/" },
        { english: "Tiger", spanish: "Tigre", pronunciation: "/ˈtaɪɡər/" },
        { english: "Elephant", spanish: "Elefante", pronunciation: "/ˈelɪfənt/" },
        { english: "Giraffe", spanish: "Jirafa", pronunciation: "/dʒəˈræf/" },
        { english: "Monkey", spanish: "Mono", pronunciation: "/ˈmʌŋki/" },
        { english: "Snake", spanish: "Serpiente", pronunciation: "/sneɪk/" },
        { english: "Spider", spanish: "Araña", pronunciation: "/ˈspaɪdər/" },
        { english: "Butterfly", spanish: "Mariposa", pronunciation: "/ˈbʌtərflaɪ/" },
        { english: "Bee", spanish: "Abeja", pronunciation: "/biː/" },
        { english: "Ant", spanish: "Hormiga", pronunciation: "/ænt/" },
        { english: "Mouse", spanish: "Ratón", pronunciation: "/maʊs/" },
        { english: "Rabbit", spanish: "Conejo", pronunciation: "/ˈræbɪt/" },
        { english: "Deer", spanish: "Ciervo", pronunciation: "/dɪr/" },
        { english: "Wolf", spanish: "Lobo", pronunciation: "/wʊlf/" },
        { english: "Bear", spanish: "Oso", pronunciation: "/ber/" },
        { english: "Fox", spanish: "Zorro", pronunciation: "/fɑːks/" }
    ],
    weather: [
        { english: "Sunny", spanish: "Soleado", pronunciation: "/ˈsʌni/" },
        { english: "Cloudy", spanish: "Nublado", pronunciation: "/ˈklaʊdi/" },
        { english: "Rainy", spanish: "Lluvioso", pronunciation: "/ˈreɪni/" },
        { english: "Snowy", spanish: "Nevado", pronunciation: "/ˈsnoʊi/" },
        { english: "Windy", spanish: "Ventoso", pronunciation: "/ˈwɪndi/" },
        { english: "Hot", spanish: "Caliente", pronunciation: "/hɑːt/" },
        { english: "Cold", spanish: "Frío", pronunciation: "/koʊld/" },
        { english: "Warm", spanish: "Templado", pronunciation: "/wɔːrm/" },
        { english: "Cool", spanish: "Fresco", pronunciation: "/kuːl/" },
        { english: "Rain", spanish: "Lluvia", pronunciation: "/reɪn/" },
        { english: "Snow", spanish: "Nieve", pronunciation: "/snoʊ/" },
        { english: "Wind", spanish: "Viento", pronunciation: "/wɪnd/" },
        { english: "Storm", spanish: "Tormenta", pronunciation: "/stɔːrm/" },
        { english: "Thunder", spanish: "Trueno", pronunciation: "/ˈθʌndər/" },
        { english: "Lightning", spanish: "Relámpago", pronunciation: "/ˈlaɪtnɪŋ/" },
        { english: "Fog", spanish: "Niebla", pronunciation: "/fɑːɡ/" },
        { english: "Mist", spanish: "Bruma", pronunciation: "/mɪst/" },
        { english: "Hail", spanish: "Granizo", pronunciation: "/heɪl/" },
        { english: "Sleet", spanish: "Aguanieve", pronunciation: "/sliːt/" },
        { english: "Drizzle", spanish: "Llovizna", pronunciation: "/ˈdrɪzl/" },
        { english: "Shower", spanish: "Chubasco", pronunciation: "/ˈʃaʊər/" },
        { english: "Breeze", spanish: "Brisa", pronunciation: "/briːz/" }
    ]
};

// Función de inicialización para el módulo de datos
function initData() {
    console.log("🚀 Módulo de datos globales inicializado");
    try {
        // Verificar que las variables globales estén disponibles
        console.log("📚 LESSONS_DATABASE disponible:", typeof LESSONS_DATABASE !== 'undefined');
        console.log("💬 CONVERSATION_SCENARIOS disponible:", typeof CONVERSATION_SCENARIOS !== 'undefined');
        console.log("📝 GRAMMAR_POOLS disponible:", typeof GRAMMAR_POOLS !== 'undefined');
        console.log("📊 LEVEL_SYSTEM disponible:", typeof LEVEL_SYSTEM !== 'undefined');
        console.log("🎯 appState disponible:", typeof appState !== 'undefined');
        
        if (typeof LESSONS_DATABASE !== 'undefined') {
            console.log("📖 Niveles disponibles en LESSONS_DATABASE:", Object.keys(LESSONS_DATABASE));
        }
        
        if (typeof appState !== 'undefined') {
            console.log("📊 Estado inicial de la app:", appState);
        }
        
        console.log("✅ Módulo de datos inicializado correctamente");
    } catch (error) {
        console.error("❌ Error en inicialización del módulo de datos:", error);
    }
}

// Exportar variables y funciones globalmente
window.LESSONS_DATABASE = LESSONS_DATABASE;
window.CONVERSATION_SCENARIOS = CONVERSATION_SCENARIOS;
window.GRAMMAR_POOLS = GRAMMAR_POOLS;
window.LEVEL_SYSTEM = LEVEL_SYSTEM;
window.appState = appState;
window.currentListeningAudio = currentListeningAudio;
window.listeningAudioSpeed = listeningAudioSpeed;
window.selectedListeningAnswer = selectedListeningAnswer;
window.VOCABULARY_CATEGORIES = VOCABULARY_CATEGORIES;
window.VOCABULARY_DATABASE = VOCABULARY_DATABASE;
window.initData = initData;
