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
        { english: "Goat", spanish: "Cabra", pronunciation: "/ɡoʊt/" },
        { english: "Chicken", spanish: "Pollo", pronunciation: "/ˈtʃɪkɪn/" },
        { english: "Duck", spanish: "Pato", pronunciation: "/dʌk/" },
        { english: "Rabbit", spanish: "Conejo", pronunciation: "/ˈræbɪt/" },
        { english: "Mouse", spanish: "Ratón", pronunciation: "/maʊs/" },
        { english: "Rat", spanish: "Rata", pronunciation: "/ræt/" },
        { english: "Elephant", spanish: "Elefante", pronunciation: "/ˈelɪfənt/" },
        { english: "Lion", spanish: "León", pronunciation: "/ˈlaɪən/" },
        { english: "Tiger", spanish: "Tigre", pronunciation: "/ˈtaɪɡər/" },
        { english: "Bear", spanish: "Oso", pronunciation: "/beər/" },
        { english: "Wolf", spanish: "Lobo", pronunciation: "/wʊlf/" },
        { english: "Fox", spanish: "Zorro", pronunciation: "/fɒks/" },
        { english: "Deer", spanish: "Ciervo", pronunciation: "/dɪər/" },
        { english: "Monkey", spanish: "Mono", pronunciation: "/ˈmʌŋki/" },
        { english: "Gorilla", spanish: "Gorila", pronunciation: "/ɡəˈrɪlə/" },
        { english: "Chimpanzee", spanish: "Chimpancé", pronunciation: "/ˌtʃɪmpænˈziː/" },
        { english: "Giraffe", spanish: "Jirafa", pronunciation: "/dʒəˈrɑːf/" },
        { english: "Zebra", spanish: "Cebra", pronunciation: "/ˈzebrə/" },
        { english: "Kangaroo", spanish: "Canguro", pronunciation: "/ˌkæŋɡəˈruː/" },
        { english: "Koala", spanish: "Koala", pronunciation: "/koʊˈɑːlə/" },
        { english: "Panda", spanish: "Panda", pronunciation: "/ˈpændə/" },
        { english: "Penguin", spanish: "Pingüino", pronunciation: "/ˈpeŋɡwɪn/" },
        { english: "Dolphin", spanish: "Delfín", pronunciation: "/ˈdɒlfɪn/" },
        { english: "Whale", spanish: "Ballena", pronunciation: "/weɪl/" },
        { english: "Shark", spanish: "Tiburón", pronunciation: "/ʃɑːrk/" },
        { english: "Octopus", spanish: "Pulpo", pronunciation: "/ˈɒktəpəs/" },
        { english: "Squid", spanish: "Calamar", pronunciation: "/skwɪd/" },
        { english: "Crab", spanish: "Cangrejo", pronunciation: "/kræb/" },
        { english: "Lobster", spanish: "Langosta", pronunciation: "/ˈlɒbstər/" },
        { english: "Snail", spanish: "Caracol", pronunciation: "/sneɪl/" },
        { english: "Spider", spanish: "Araña", pronunciation: "/ˈspaɪdər/" },
        { english: "Bee", spanish: "Abeja", pronunciation: "/biː/" },
        { english: "Butterfly", spanish: "Mariposa", pronunciation: "/ˈbʌtəflaɪ/" },
        { english: "Ant", spanish: "Hormiga", pronunciation: "/ænt/" },
        { english: "Mosquito", spanish: "Mosquito", pronunciation: "/məˈskiːtoʊ/" },
        { english: "Fly", spanish: "Mosca", pronunciation: "/flaɪ/" },
        { english: "Ladybug", spanish: "Mariquita", pronunciation: "/ˈleɪdibʌɡ/" },
        { english: "Grasshopper", spanish: "Saltamontes", pronunciation: "/ˈɡrɑːshɒpər/" },
        { english: "Cricket", spanish: "Grillo", pronunciation: "/ˈkrɪkɪt/" },
        { english: "Firefly", spanish: "Luciérnaga", pronunciation: "/ˈfaɪərflaɪ/" },
        { english: "Dragonfly", spanish: "Libélula", pronunciation: "/ˈdræɡənflaɪ/" },
        { english: "Moth", spanish: "Polilla", pronunciation: "/mɒθ/" },
        { english: "Caterpillar", spanish: "Oruga", pronunciation: "/ˈkætəpɪlər/" },
        { english: "Worm", spanish: "Gusano", pronunciation: "/wɜːm/" },
        { english: "Snake", spanish: "Serpiente", pronunciation: "/sneɪk/" },
        { english: "Lizard", spanish: "Lagarto", pronunciation: "/ˈlɪzərd/" },
        { english: "Turtle", spanish: "Tortuga", pronunciation: "/ˈtɜːtl/" },
        { english: "Frog", spanish: "Rana", pronunciation: "/frɒɡ/" },
        { english: "Toad", spanish: "Sapo", pronunciation: "/toʊd/" },
        { english: "Salamander", spanish: "Salamandra", pronunciation: "/ˈsæləmændər/" },
        { english: "Newt", spanish: "Tritón", pronunciation: "/njuːt/" },
        { english: "Axolotl", spanish: "Ajolote", pronunciation: "/ˈæksəlɒtl/" }
    ],
    weather: [
        { english: "Sunny", spanish: "Soleado", pronunciation: "/ˈsʌni/" },
        { english: "Cloudy", spanish: "Nublado", pronunciation: "/ˈklaʊdi/" },
        { english: "Rainy", spanish: "Lluvioso", pronunciation: "/ˈreɪni/" },
        { english: "Snowy", spanish: "Nevado", pronunciation: "/ˈsnəʊi/" },
        { english: "Windy", spanish: "Ventoso", pronunciation: "/ˈwɪndi/" },
        { english: "Foggy", spanish: "Neblinoso", pronunciation: "/ˈfɒɡi/" },
        { english: "Stormy", spanish: "Tormentoso", pronunciation: "/ˈstɔːmi/" },
        { english: "Clear", spanish: "Despejado", pronunciation: "/klɪər/" },
        { english: "Overcast", spanish: "Cubierto", pronunciation: "/ˈəʊvəkɑːst/" },
        { english: "Misty", spanish: "Brumoso", pronunciation: "/ˈmɪsti/" },
        { english: "Drizzle", spanish: "Llovizna", pronunciation: "/ˈdrɪzl/" },
        { english: "Shower", spanish: "Chubasco", pronunciation: "/ˈʃaʊər/" },
        { english: "Downpour", spanish: "Aguacero", pronunciation: "/ˈdaʊnpɔːr/" },
        { english: "Thunder", spanish: "Trueno", pronunciation: "/ˈθʌndər/" },
        { english: "Lightning", spanish: "Relámpago", pronunciation: "/ˈlaɪtnɪŋ/" },
        { english: "Rainbow", spanish: "Arcoíris", pronunciation: "/ˈreɪnbəʊ/" },
        { english: "Hail", spanish: "Granizo", pronunciation: "/heɪl/" },
        { english: "Sleet", spanish: "Aguanieve", pronunciation: "/sliːt/" },
        { english: "Frost", spanish: "Escarcha", pronunciation: "/frɒst/" },
        { english: "Ice", spanish: "Hielo", pronunciation: "/aɪs/" },
        { english: "Heat", spanish: "Calor", pronunciation: "/hiːt/" },
        { english: "Cold", spanish: "Frío", pronunciation: "/kəʊld/" },
        { english: "Warm", spanish: "Templado", pronunciation: "/wɔːm/" },
        { english: "Cool", spanish: "Fresco", pronunciation: "/kuːl/" },
        { english: "Hot", spanish: "Caliente", pronunciation: "/hɒt/" },
        { english: "Freezing", spanish: "Helado", pronunciation: "/ˈfriːzɪŋ/" },
        { english: "Boiling", spanish: "Hirviendo", pronunciation: "/ˈbɔɪlɪŋ/" },
        { english: "Mild", spanish: "Suave", pronunciation: "/maɪld/" },
        { english: "Humid", spanish: "Húmedo", pronunciation: "/ˈhjuːmɪd/" },
        { english: "Dry", spanish: "Seco", pronunciation: "/draɪ/" },
        { english: "Wet", spanish: "Mojado", pronunciation: "/wet/" },
        { english: "Damp", spanish: "Húmedo", pronunciation: "/dæmp/" },
        { english: "Breeze", spanish: "Brisa", pronunciation: "/briːz/" },
        { english: "Gale", spanish: "Vendaval", pronunciation: "/ɡeɪl/" },
        { english: "Hurricane", spanish: "Huracán", pronunciation: "/ˈhʌrɪkən/" },
        { english: "Tornado", spanish: "Tornado", pronunciation: "/tɔːˈneɪdəʊ/" },
        { english: "Typhoon", spanish: "Tifón", pronunciation: "/taɪˈfuːn/" },
        { english: "Cyclone", spanish: "Ciclón", pronunciation: "/ˈsaɪkləʊn/" },
        { english: "Blizzard", spanish: "Tormenta de nieve", pronunciation: "/ˈblɪzəd/" },
        { english: "Avalanche", spanish: "Avalancha", pronunciation: "/ˈævəlɑːntʃ/" },
        { english: "Flood", spanish: "Inundación", pronunciation: "/flʌd/" },
        { english: "Drought", spanish: "Sequía", pronunciation: "/draʊt/" },
        { english: "Heatwave", spanish: "Ola de calor", pronunciation: "/ˈhiːtweɪv/" },
        { english: "Cold snap", spanish: "Ola de frío", pronunciation: "/ˈkəʊld snæp/" },
        { english: "Monsoon", spanish: "Monzón", pronunciation: "/mɒnˈsuːn/" },
        { english: "El Niño", spanish: "El Niño", pronunciation: "/el ˈniːnjəʊ/" },
        { english: "La Niña", spanish: "La Niña", pronunciation: "/lɑː ˈniːnjə/" },
        { english: "Climate", spanish: "Clima", pronunciation: "/ˈklaɪmət/" },
        { english: "Temperature", spanish: "Temperatura", pronunciation: "/ˈtemprətʃər/" },
        { english: "Forecast", spanish: "Pronóstico", pronunciation: "/ˈfɔːkɑːst/" },
        { english: "Meteorologist", spanish: "Meteorólogo", pronunciation: "/ˌmiːtiəˈrɒlədʒɪst/" },
        { english: "Weather station", spanish: "Estación meteorológica", pronunciation: "/ˈweðər ˈsteɪʃən/" },
        { english: "Barometer", spanish: "Barómetro", pronunciation: "/bəˈrɒmɪtər/" },
        { english: "Thermometer", spanish: "Termómetro", pronunciation: "/θəˈmɒmɪtər/" },
        { english: "Hygrometer", spanish: "Higrómetro", pronunciation: "/haɪˈɡrɒmɪtər/" },
        { english: "Anemometer", spanish: "Anemómetro", pronunciation: "/ˌænɪˈmɒmɪtər/" },
        { english: "Rain gauge", spanish: "Pluviómetro", pronunciation: "/ˈreɪn ɡeɪdʒ/" }
    ],
    school: [
        { english: "Student", spanish: "Estudiante", pronunciation: "/ˈstjuːdənt/" },
        { english: "Teacher", spanish: "Maestro", pronunciation: "/ˈtiːtʃər/" },
        { english: "Professor", spanish: "Profesor", pronunciation: "/prəˈfesər/" },
        { english: "Principal", spanish: "Director", pronunciation: "/ˈprɪnsəpl/" },
        { english: "Classroom", spanish: "Salón de clases", pronunciation: "/ˈklɑːsruːm/" },
        { english: "Library", spanish: "Biblioteca", pronunciation: "/ˈlaɪbrəri/" },
        { english: "Cafeteria", spanish: "Cafetería", pronunciation: "/ˌkæfəˈtɪəriə/" },
        { english: "Gymnasium", spanish: "Gimnasio", pronunciation: "/dʒɪmˈneɪziəm/" },
        { english: "Laboratory", spanish: "Laboratorio", pronunciation: "/ləˈbɒrətri/" },
        { english: "Auditorium", spanish: "Auditorio", pronunciation: "/ˌɔːdɪˈtɔːriəm/" },
        { english: "Office", spanish: "Oficina", pronunciation: "/ˈɒfɪs/" },
        { english: "Playground", spanish: "Patio de recreo", pronunciation: "/ˈpleɪɡraʊnd/" },
        { english: "Parking lot", spanish: "Estacionamiento", pronunciation: "/ˈpɑːkɪŋ lɒt/" },
        { english: "Bus stop", spanish: "Parada de autobús", pronunciation: "/ˈbʌs stɒp/" },
        { english: "Textbook", spanish: "Libro de texto", pronunciation: "/ˈtekstbʊk/" },
        { english: "Notebook", spanish: "Cuaderno", pronunciation: "/ˈnəʊtbʊk/" },
        { english: "Pencil", spanish: "Lápiz", pronunciation: "/ˈpensl/" },
        { english: "Pen", spanish: "Bolígrafo", pronunciation: "/pen/" },
        { english: "Eraser", spanish: "Borrador", pronunciation: "/ɪˈreɪzər/" },
        { english: "Ruler", spanish: "Regla", pronunciation: "/ˈruːlər/" },
        { english: "Scissors", spanish: "Tijeras", pronunciation: "/ˈsɪzəz/" },
        { english: "Glue", spanish: "Pegamento", pronunciation: "/ɡluː/" },
        { english: "Tape", spanish: "Cinta", pronunciation: "/teɪp/" },
        { english: "Stapler", spanish: "Engrapadora", pronunciation: "/ˈsteɪplər/" },
        { english: "Paper", spanish: "Papel", pronunciation: "/ˈpeɪpər/" },
        { english: "Folder", spanish: "Carpeta", pronunciation: "/ˈfəʊldər/" },
        { english: "Backpack", spanish: "Mochila", pronunciation: "/ˈbækpæk/" },
        { english: "Lunchbox", spanish: "Lonchera", pronunciation: "/ˈlʌntʃbɒks/" },
        { english: "Water bottle", spanish: "Botella de agua", pronunciation: "/ˈwɔːtər ˈbɒtl/" },
        { english: "Calculator", spanish: "Calculadora", pronunciation: "/ˈkælkjuleɪtər/" },
        { english: "Computer", spanish: "Computadora", pronunciation: "/kəmˈpjuːtər/" },
        { english: "Projector", spanish: "Proyector", pronunciation: "/prəˈdʒektər/" },
        { english: "Whiteboard", spanish: "Pizarra blanca", pronunciation: "/ˈwaɪtbɔːd/" },
        { english: "Chalkboard", spanish: "Pizarra", pronunciation: "/ˈtʃɔːkbɔːd/" },
        { english: "Chalk", spanish: "Tiza", pronunciation: "/tʃɔːk/" },
        { english: "Marker", spanish: "Marcador", pronunciation: "/ˈmɑːkər/" },
        { english: "Desk", spanish: "Escritorio", pronunciation: "/desk/" },
        { english: "Chair", spanish: "Silla", pronunciation: "/tʃeər/" },
        { english: "Table", spanish: "Mesa", pronunciation: "/ˈteɪbl/" },
        { english: "Clock", spanish: "Reloj", pronunciation: "/klɒk/" },
        { english: "Calendar", spanish: "Calendario", pronunciation: "/ˈkælɪndər/" },
        { english: "Schedule", spanish: "Horario", pronunciation: "/ˈʃedjuːl/" },
        { english: "Assignment", spanish: "Tarea", pronunciation: "/əˈsaɪnmənt/" },
        { english: "Homework", spanish: "Deberes", pronunciation: "/ˈhəʊmwɜːk/" },
        { english: "Test", spanish: "Examen", pronunciation: "/test/" },
        { english: "Quiz", spanish: "Prueba", pronunciation: "/kwɪz/" },
        { english: "Grade", spanish: "Calificación", pronunciation: "/ɡreɪd/" },
        { english: "Report card", spanish: "Boleta de calificaciones", pronunciation: "/rɪˈpɔːt kɑːd/" },
        { english: "Diploma", spanish: "Diploma", pronunciation: "/dɪˈpləʊmə/" },
        { english: "Certificate", spanish: "Certificado", pronunciation: "/səˈtɪfɪkət/" },
        { english: "Degree", spanish: "Título", pronunciation: "/dɪˈɡriː/" },
        { english: "Bachelor's", spanish: "Licenciatura", pronunciation: "/ˈbætʃələz/" },
        { english: "Master's", spanish: "Maestría", pronunciation: "/ˈmɑːstəz/" },
        { english: "Doctorate", spanish: "Doctorado", pronunciation: "/ˈdɒktərət/" },
        { english: "Scholarship", spanish: "Beca", pronunciation: "/ˈskɒləʃɪp/" },
        { english: "Grant", spanish: "Subvención", pronunciation: "/ɡrɑːnt/" },
        { english: "Tuition", spanish: "Matrícula", pronunciation: "/tjuːˈɪʃən/" },
        { english: "Fee", spanish: "Tarifa", pronunciation: "/fiː/" },
        { english: "Curriculum", spanish: "Plan de estudios", pronunciation: "/kəˈrɪkjələm/" },
        { english: "Syllabus", spanish: "Programa", pronunciation: "/ˈsɪləbəs/" },
        { english: "Lecture", spanish: "Conferencia", pronunciation: "/ˈlektʃər/" },
        { english: "Seminar", spanish: "Seminario", pronunciation: "/ˈsemɪnɑːr/" },
        { english: "Workshop", spanish: "Taller", pronunciation: "/ˈwɜːkʃɒp/" },
        { english: "Tutorial", spanish: "Tutorial", pronunciation: "/tjuːˈtɔːriəl/" },
        { english: "Study group", spanish: "Grupo de estudio", pronunciation: "/ˈstʌdi ɡruːp/" },
        { english: "Peer", spanish: "Compañero", pronunciation: "/pɪər/" },
        { english: "Mentor", spanish: "Mentor", pronunciation: "/ˈmentɔːr/" },
        { english: "Advisor", spanish: "Asesor", pronunciation: "/ədˈvaɪzər/" },
        { english: "Counselor", spanish: "Consejero", pronunciation: "/ˈkaʊnsələr/" },
        { english: "Librarian", spanish: "Bibliotecario", pronunciation: "/laɪˈbreəriən/" },
        { english: "Nurse", spanish: "Enfermera", pronunciation: "/nɜːs/" },
        { english: "Security guard", spanish: "Guardia de seguridad", pronunciation: "/sɪˈkjʊərəti ɡɑːd/" },
        { english: "Janitor", spanish: "Conserje", pronunciation: "/ˈdʒænɪtər/" },
        { english: "Custodian", spanish: "Custodio", pronunciation: "/kʌˈstəʊdiən/" }
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
