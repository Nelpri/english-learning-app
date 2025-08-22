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

// Categorías de vocabulario expandidas
const VOCABULARY_CATEGORIES = [
    {
        key: 'greetings',
        title: 'Saludos y Presentaciones',
        description: 'Expresiones básicas para saludar y presentarse',
        icon: 'fas fa-handshake',
        wordCount: 25,
        level: 'A1'
    },
    {
        key: 'numbers',
        title: 'Números',
        description: 'Números del 1 al 1000 y operaciones básicas',
        icon: 'fas fa-calculator',
        wordCount: 50,
        level: 'A1'
    },
    {
        key: 'colors',
        title: 'Colores',
        description: 'Colores básicos, tonos y variaciones',
        icon: 'fas fa-palette',
        wordCount: 35,
        level: 'A1'
    },
    {
        key: 'family',
        title: 'Familia',
        description: 'Miembros de la familia y relaciones',
        icon: 'fas fa-users',
        wordCount: 30,
        level: 'A1'
    },
    {
        key: 'food',
        title: 'Comida y Bebidas',
        description: 'Alimentos, bebidas, comidas del día y cocina',
        icon: 'fas fa-utensils',
        wordCount: 60,
        level: 'A2'
    },
    {
        key: 'animals',
        title: 'Animales',
        description: 'Animales domésticos, salvajes, marinos y de granja',
        icon: 'fas fa-paw',
        wordCount: 45,
        level: 'A2'
    },
    {
        key: 'weather',
        title: 'Clima y Tiempo',
        description: 'Condiciones climáticas, estaciones y fenómenos',
        icon: 'fas fa-cloud-sun',
        wordCount: 40,
        level: 'A2'
    },
    {
        key: 'body',
        title: 'Partes del Cuerpo',
        description: 'Anatomía humana y expresiones relacionadas',
        icon: 'fas fa-user',
        wordCount: 35,
        level: 'A2'
    },
    {
        key: 'clothes',
        title: 'Ropa y Accesorios',
        description: 'Vestimenta, calzado y complementos',
        icon: 'fas fa-tshirt',
        wordCount: 40,
        level: 'A2'
    },
    {
        key: 'house',
        title: 'Casa y Hogar',
        description: 'Habitaciones, muebles y objetos del hogar',
        icon: 'fas fa-home',
        wordCount: 45,
        level: 'A2'
    },
    {
        key: 'transport',
        title: 'Transporte',
        description: 'Medios de transporte y viajes',
        icon: 'fas fa-car',
        wordCount: 35,
        level: 'A2'
    },
    {
        key: 'work',
        title: 'Trabajo y Profesiones',
        description: 'Oficios, profesiones y entorno laboral',
        icon: 'fas fa-briefcase',
        wordCount: 40,
        level: 'B1'
    },
    {
        key: 'school',
        title: 'Educación',
        description: 'Escuela, universidad y aprendizaje',
        icon: 'fas fa-graduation-cap',
        wordCount: 35,
        level: 'B1'
    },
    {
        key: 'health',
        title: 'Salud y Medicina',
        description: 'Síntomas, tratamientos y bienestar',
        icon: 'fas fa-heartbeat',
        wordCount: 40,
        level: 'B1'
    },
    {
        key: 'technology',
        title: 'Tecnología',
        description: 'Dispositivos, internet y herramientas digitales',
        icon: 'fas fa-laptop',
        wordCount: 35,
        level: 'B1'
    },
    {
        key: 'sports',
        title: 'Deportes y Ejercicio',
        description: 'Actividades deportivas y fitness',
        icon: 'fas fa-futbol',
        wordCount: 40,
        level: 'B1'
    },
    {
        key: 'entertainment',
        title: 'Entretenimiento',
        description: 'Música, películas, libros y hobbies',
        icon: 'fas fa-music',
        wordCount: 45,
        level: 'B1'
    },
    {
        key: 'business',
        title: 'Negocios y Economía',
        description: 'Comercio, finanzas y emprendimiento',
        icon: 'fas fa-chart-line',
        wordCount: 40,
        level: 'B2'
    },
    {
        key: 'politics',
        title: 'Política y Sociedad',
        description: 'Gobierno, leyes y temas sociales',
        icon: 'fas fa-landmark',
        wordCount: 35,
        level: 'B2'
    },
    {
        key: 'science',
        title: 'Ciencia y Naturaleza',
        description: 'Física, química, biología y ecología',
        icon: 'fas fa-atom',
        wordCount: 40,
        level: 'B2'
    },
    {
        key: 'art',
        title: 'Arte y Cultura',
        description: 'Pintura, escultura, literatura y tradiciones',
        icon: 'fas fa-paint-brush',
        wordCount: 35,
        level: 'B2'
    },
    {
        key: 'emotions',
        title: 'Emociones y Sentimientos',
        description: 'Estados emocionales y expresiones afectivas',
        icon: 'fas fa-smile',
        wordCount: 30,
        level: 'B1'
    },
    {
        key: 'time',
        title: 'Tiempo y Fechas',
        description: 'Horas, días, meses y expresiones temporales',
        icon: 'fas fa-clock',
        wordCount: 35,
        level: 'A1'
    },
    {
        key: 'shopping',
        title: 'Compras y Comercio',
        description: 'Tiendas, productos y transacciones',
        icon: 'fas fa-shopping-cart',
        wordCount: 40,
        level: 'A2'
    },
    {
        key: 'difficult-words',
        title: 'Palabras Difíciles',
        description: 'Palabras que has marcado como difíciles',
        icon: 'fas fa-exclamation-triangle',
        wordCount: 0,
        isSpecial: true,
        level: 'C1'
    }
];

// Base de datos de vocabulario por categoría expandida
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
        { english: "Have a nice day", spanish: "Que tengas un buen día", pronunciation: "/hæv ə naɪs deɪ/" },
        { english: "Good night", spanish: "Buenas noches", pronunciation: "/ɡʊd naɪt/" },
        { english: "See you tomorrow", spanish: "Hasta mañana", pronunciation: "/siː juː təˈmɒroʊ/" },
        { english: "Welcome", spanish: "Bienvenido", pronunciation: "/ˈwelkəm/" },
        { english: "Excuse me", spanish: "Disculpa", pronunciation: "/ɪkˈskjuːz miː/" },
        { english: "Sorry", spanish: "Lo siento", pronunciation: "/ˈsɒri/" },
        { english: "Thank you", spanish: "Gracias", pronunciation: "/ˈθæŋk juː/" },
        { english: "You're welcome", spanish: "De nada", pronunciation: "/jɔːr ˈwelkəm/" },
        { english: "Please", spanish: "Por favor", pronunciation: "/pliːz/" },
        { english: "Bless you", spanish: "Salud", pronunciation: "/bles juː/" },
        { english: "Congratulations", spanish: "Felicitaciones", pronunciation: "/kənˌɡrætʃəˈleɪʃənz/" }
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
        { english: "Sixteen", spanish: "Dieciséis", pronunciation: "/ˌsɪksˈtiːn/" },
        { english: "Seventeen", spanish: "Diecisiete", pronunciation: "/ˌsevənˈtiːn/" },
        { english: "Eighteen", spanish: "Dieciocho", pronunciation: "/ˌeɪˈtiːn/" },
        { english: "Nineteen", spanish: "Diecinueve", pronunciation: "/ˌnaɪnˈtiːn/" },
        { english: "Twenty", spanish: "Veinte", pronunciation: "/ˈtwenti/" },
        { english: "Thirty", spanish: "Treinta", pronunciation: "/ˈθɜːrti/" },
        { english: "Forty", spanish: "Cuarenta", pronunciation: "/ˈfɔːrti/" },
        { english: "Fifty", spanish: "Cincuenta", pronunciation: "/ˈfɪfti/" },
        { english: "Sixty", spanish: "Sesenta", pronunciation: "/ˈsɪksti/" },
        { english: "Seventy", spanish: "Setenta", pronunciation: "/ˈsevənti/" },
        { english: "Eighty", spanish: "Ochenta", pronunciation: "/ˈeɪti/" },
        { english: "Ninety", spanish: "Noventa", pronunciation: "/ˈnaɪnti/" },
        { english: "Hundred", spanish: "Cien", pronunciation: "/ˈhʌndrəd/" },
        { english: "Thousand", spanish: "Mil", pronunciation: "/ˈθaʊznd/" },
        { english: "Million", spanish: "Millón", pronunciation: "/ˈmɪljən/" },
        { english: "First", spanish: "Primero", pronunciation: "/fɜːrst/" },
        { english: "Second", spanish: "Segundo", pronunciation: "/ˈsekənd/" },
        { english: "Third", spanish: "Tercero", pronunciation: "/θɜːrd/" },
        { english: "Fourth", spanish: "Cuarto", pronunciation: "/fɔːrθ/" },
        { english: "Fifth", spanish: "Quinto", pronunciation: "/fɪfθ/" },
        { english: "Last", spanish: "Último", pronunciation: "/læst/" },
        { english: "Half", spanish: "Mitad", pronunciation: "/hɑːf/" },
        { english: "Quarter", spanish: "Cuarto", pronunciation: "/ˈkwɔːrtər/" },
        { english: "Double", spanish: "Doble", pronunciation: "/ˈdʌbl/" },
        { english: "Triple", spanish: "Triple", pronunciation: "/ˈtrɪpl/" },
        { english: "Zero", spanish: "Cero", pronunciation: "/ˈzɪəroʊ/" },
        { english: "Plus", spanish: "Más", pronunciation: "/plʌs/" },
        { english: "Minus", spanish: "Menos", pronunciation: "/ˈmaɪnəs/" },
        { english: "Equals", spanish: "Igual", pronunciation: "/ˈiːkwəlz/" },
        { english: "Percent", spanish: "Por ciento", pronunciation: "/pərˈsent/" },
        { english: "Decimal", spanish: "Decimal", pronunciation: "/ˈdesɪml/" },
        { english: "Fraction", spanish: "Fracción", pronunciation: "/ˈfrækʃən/" },
        { english: "Dozen", spanish: "Docena", pronunciation: "/ˈdʌzn/" },
        { english: "Score", spanish: "Veintena", pronunciation: "/skɔːr/" },
        { english: "Pair", spanish: "Par", pronunciation: "/per/" },
        { english: "Couple", spanish: "Pareja", pronunciation: "/ˈkʌpl/" }
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
        { english: "Crimson", spanish: "Carmesí", pronunciation: "/ˈkrɪmzən/" },
        { english: "Turquoise", spanish: "Turquesa", pronunciation: "/ˈtɜːrkwɔɪz/" },
        { english: "Lavender", spanish: "Lavanda", pronunciation: "/ˈlævəndər/" },
        { english: "Beige", spanish: "Beige", pronunciation: "/beɪʒ/" },
        { english: "Maroon", spanish: "Marrón rojizo", pronunciation: "/məˈruːn/" },
        { english: "Teal", spanish: "Verde azulado", pronunciation: "/tiːl/" },
        { english: "Indigo", spanish: "Índigo", pronunciation: "/ˈɪndɪɡoʊ/" },
        { english: "Violet", spanish: "Violeta", pronunciation: "/ˈvaɪələt/" },
        { english: "Coral", spanish: "Coral", pronunciation: "/ˈkɔːrəl/" },
        { english: "Olive", spanish: "Oliva", pronunciation: "/ˈɒlɪv/" },
        { english: "Tan", spanish: "Bronceado", pronunciation: "/tæn/" },
        { english: "Charcoal", spanish: "Carbón", pronunciation: "/ˈtʃɑːkoʊl/" },
        { english: "Ivory", spanish: "Marfil", pronunciation: "/ˈaɪvəri/" },
        { english: "Magenta", spanish: "Magenta", pronunciation: "/məˈdʒentə/" },
        { english: "Cyan", spanish: "Cian", pronunciation: "/ˈsaɪən/" },
        { english: "Lime", spanish: "Lima", pronunciation: "/laɪm/" },
        { english: "Aqua", spanish: "Agua", pronunciation: "/ˈækwə/" }
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
        { english: "Family", spanish: "Familia", pronunciation: "/ˈfæməli/" },
        { english: "Stepfather", spanish: "Padrastro", pronunciation: "/ˈstepfɑːðər/" },
        { english: "Stepmother", spanish: "Madrastra", pronunciation: "/ˈstepmʌðər/" },
        { english: "Stepsister", spanish: "Hermanastra", pronunciation: "/ˈstepsɪstər/" },
        { english: "Stepbrother", spanish: "Hermanastro", pronunciation: "/ˈstepbrʌðər/" },
        { english: "Mother-in-law", spanish: "Suegra", pronunciation: "/ˈmʌðər ɪn lɔː/" },
        { english: "Father-in-law", spanish: "Suegro", pronunciation: "/ˈfɑːðər ɪn lɔː/" },
        { english: "Sister-in-law", spanish: "Cuñada", pronunciation: "/ˈsɪstər ɪn lɔː/" },
        { english: "Brother-in-law", spanish: "Cuñado", pronunciation: "/ˈbrʌðər ɪn lɔː/" },
        { english: "Daughter-in-law", spanish: "Nuera", pronunciation: "/ˈdɔːtər ɪn lɔː/" },
        { english: "Son-in-law", spanish: "Yerno", pronunciation: "/sʌn ɪn lɔː/" },
        { english: "Godmother", spanish: "Madrina", pronunciation: "/ˈɡɒdmʌðər/" },
        { english: "Godfather", spanish: "Padrino", pronunciation: "/ˈɡɒdfɑːðər/" },
        { english: "Twin", spanish: "Gemelo/a", pronunciation: "/twɪn/" },
        { english: "Triplet", spanish: "Trillizo/a", pronunciation: "/ˈtrɪplət/" },
        { english: "Adopted", spanish: "Adoptado/a", pronunciation: "/əˈdɒptɪd/" },
        { english: "Foster", spanish: "De acogida", pronunciation: "/ˈfɒstər/" }
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
        { english: "Beer", spanish: "Cerveza", pronunciation: "/bɪr/" },
        { english: "Orange", spanish: "Naranja", pronunciation: "/ˈɒrɪndʒ/" },
        { english: "Strawberry", spanish: "Fresa", pronunciation: "/ˈstrɔːbəri/" },
        { english: "Grape", spanish: "Uva", pronunciation: "/ɡreɪp/" },
        { english: "Lemon", spanish: "Limón", pronunciation: "/ˈlemən/" },
        { english: "Lime", spanish: "Lima", pronunciation: "/laɪm/" },
        { english: "Peach", spanish: "Durazno", pronunciation: "/piːtʃ/" },
        { english: "Pear", spanish: "Pera", pronunciation: "/peər/" },
        { english: "Plum", spanish: "Ciruela", pronunciation: "/plʌm/" },
        { english: "Cherry", spanish: "Cereza", pronunciation: "/ˈtʃeri/" },
        { english: "Pineapple", spanish: "Piña", pronunciation: "/ˈpaɪnæpl/" },
        { english: "Mango", spanish: "Mango", pronunciation: "/ˈmæŋɡoʊ/" },
        { english: "Kiwi", spanish: "Kiwi", pronunciation: "/ˈkiːwiː/" },
        { english: "Coconut", spanish: "Coco", pronunciation: "/ˈkoʊkənʌt/" },
        { english: "Avocado", spanish: "Aguacate", pronunciation: "/ˌævəˈkɑːdoʊ/" },
        { english: "Tomato", spanish: "Tomate", pronunciation: "/təˈmɑːtoʊ/" },
        { english: "Potato", spanish: "Papa", pronunciation: "/pəˈteɪtoʊ/" },
        { english: "Carrot", spanish: "Zanahoria", pronunciation: "/ˈkærət/" },
        { english: "Onion", spanish: "Cebolla", pronunciation: "/ˈʌnjən/" },
        { english: "Garlic", spanish: "Ajo", pronunciation: "/ˈɡɑːrlɪk/" },
        { english: "Lettuce", spanish: "Lechuga", pronunciation: "/ˈletɪs/" },
        { english: "Spinach", spanish: "Espinaca", pronunciation: "/ˈspɪnɪtʃ/" },
        { english: "Broccoli", spanish: "Brócoli", pronunciation: "/ˈbrɒkəli/" },
        { english: "Cauliflower", spanish: "Coliflor", pronunciation: "/ˈkɒlɪflaʊər/" },
        { english: "Cucumber", spanish: "Pepino", pronunciation: "/ˈkjuːkʌmbər/" },
        { english: "Bell pepper", spanish: "Pimiento", pronunciation: "/bel ˈpepər/" },
        { english: "Mushroom", spanish: "Champiñón", pronunciation: "/ˈmʌʃruːm/" },
        { english: "Corn", spanish: "Maíz", pronunciation: "/kɔːrn/" },
        { english: "Peas", spanish: "Guisantes", pronunciation: "/piːz/" },
        { english: "Beans", spanish: "Frijoles", pronunciation: "/biːnz/" },
        { english: "Lentils", spanish: "Lentejas", pronunciation: "/ˈlentəlz/" },
        { english: "Chickpeas", spanish: "Garbanzos", pronunciation: "/ˈtʃɪkpiːz/" },
        { english: "Quinoa", spanish: "Quinua", pronunciation: "/ˈkiːnwɑː/" },
        { english: "Oatmeal", spanish: "Avena", pronunciation: "/ˈoʊtmiːl/" },
        { english: "Cereal", spanish: "Cereal", pronunciation: "/ˈsɪəriəl/" },
        { english: "Toast", spanish: "Tostada", pronunciation: "/toʊst/" },
        { english: "Sandwich", spanish: "Sándwich", pronunciation: "/ˈsænwɪtʃ/" },
        { english: "Pasta", spanish: "Pasta", pronunciation: "/ˈpɑːstə/" },
        { english: "Spaghetti", spanish: "Espagueti", pronunciation: "/spəˈɡeti/" },
        { english: "Lasagna", spanish: "Lasaña", pronunciation: "/ləˈzɑːnjə/" },
        { english: "Sushi", spanish: "Sushi", pronunciation: "/ˈsuːʃi/" },
        { english: "Taco", spanish: "Taco", pronunciation: "/ˈtɑːkoʊ/" },
        { english: "Burrito", spanish: "Burrito", pronunciation: "/bəˈriːtoʊ/" },
        { english: "Curry", spanish: "Curry", pronunciation: "/ˈkʌri/" },
        { english: "Stir fry", spanish: "Salteado", pronunciation: "/stɜːr fraɪ/" },
        { english: "Grilled", spanish: "A la parrilla", pronunciation: "/ɡrɪld/" },
        { english: "Baked", spanish: "Horneado", pronunciation: "/beɪkt/" },
        { english: "Fried", spanish: "Frito", pronunciation: "/fraɪd/" },
        { english: "Steamed", spanish: "Al vapor", pronunciation: "/stiːmd/" },
        { english: "Raw", spanish: "Crudo", pronunciation: "/rɔː/" },
        { english: "Organic", spanish: "Orgánico", pronunciation: "/ɔːrˈɡænɪk/" },
        { english: "Fresh", spanish: "Fresco", pronunciation: "/freʃ/" },
        { english: "Frozen", spanish: "Congelado", pronunciation: "/ˈfroʊzən/" },
        { english: "Canned", spanish: "Enlatado", pronunciation: "/kænd/" },
        { english: "Dried", spanish: "Seco", pronunciation: "/draɪd/" },
        { english: "Spicy", spanish: "Picante", pronunciation: "/ˈspaɪsi/" },
        { english: "Sweet", spanish: "Dulce", pronunciation: "/swiːt/" },
        { english: "Sour", spanish: "Ácido", pronunciation: "/ˈsaʊər/" },
        { english: "Bitter", spanish: "Amargo", pronunciation: "/ˈbɪtər/" },
        { english: "Salty", spanish: "Salado", pronunciation: "/ˈsɔːlti/" },
        { english: "Delicious", spanish: "Delicioso", pronunciation: "/dɪˈlɪʃəs/" },
        { english: "Tasty", spanish: "Sabroso", pronunciation: "/ˈteɪsti/" },
        { english: "Yummy", spanish: "Rico", pronunciation: "/ˈjʌmi/" },
        { english: "Gross", spanish: "Asqueroso", pronunciation: "/ɡroʊs/" },
        { english: "Bland", spanish: "Soso", pronunciation: "/blænd/" }
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
