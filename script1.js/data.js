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
        },
        {
            id: 3,
            title: "Colores Básicos",
            difficulty: "Principiante",
            mcer: "A1",
            vocabulary: [
                { english: "Red", spanish: "Rojo", pronunciation: "/red/" },
                { english: "Blue", spanish: "Azul", pronunciation: "/bluː/" },
                { english: "Green", spanish: "Verde", pronunciation: "/ɡriːn/" },
                { english: "Yellow", spanish: "Amarillo", pronunciation: "/ˈjeloʊ/" },
                { english: "Black", spanish: "Negro", pronunciation: "/blæk/" }
            ],
            grammar: {
                title: "Adjetivos de Color",
                content: "Los colores son adjetivos que describen la apariencia de los objetos"
            }
        },
        {
            id: 4,
            title: "Días de la Semana",
            difficulty: "Principiante",
            mcer: "A1",
            vocabulary: [
                { english: "Monday", spanish: "Lunes", pronunciation: "/ˈmʌndeɪ/" },
                { english: "Tuesday", spanish: "Martes", pronunciation: "/ˈtjuːzdeɪ/" },
                { english: "Wednesday", spanish: "Miércoles", pronunciation: "/ˈwenzdeɪ/" },
                { english: "Thursday", spanish: "Jueves", pronunciation: "/ˈθɜːzdeɪ/" },
                { english: "Friday", spanish: "Viernes", pronunciation: "/ˈfraɪdeɪ/" }
            ],
            grammar: {
                title: "Preposiciones de Tiempo Básicas",
                content: "On Monday (el lunes), in the morning (por la mañana)"
            }
        },
        {
            id: 5,
            title: "Respuestas Sí/No",
            difficulty: "Principiante",
            mcer: "A1",
            vocabulary: [
                { english: "Yes", spanish: "Sí", pronunciation: "/jes/" },
                { english: "No", spanish: "No", pronunciation: "/noʊ/" },
                { english: "Maybe", spanish: "Tal vez", pronunciation: "/ˈmeɪbi/" },
                { english: "I don't know", spanish: "No sé", pronunciation: "/aɪ doʊnt noʊ/" },
                { english: "Of course", spanish: "Por supuesto", pronunciation: "/əv kɔːrs/" }
            ],
            grammar: {
                title: "Verbo To Be en Afirmativo y Negativo",
                content: "I am (soy), I am not (no soy), Yes I am, No I'm not"
            }
        },
        {
            id: 6,
            title: "Presentaciones Básicas",
            difficulty: "Principiante",
            mcer: "A1",
            vocabulary: [
                { english: "My name is", spanish: "Me llamo", pronunciation: "/maɪ neɪm ɪz/" },
                { english: "I am from", spanish: "Soy de", pronunciation: "/aɪ æm frɒm/" },
                { english: "Nice to meet you", spanish: "Mucho gusto", pronunciation: "/naɪs tə miːt juː/" },
                { english: "Where are you from?", spanish: "¿De dónde eres?", pronunciation: "/weər ɑːr juː frɒm/" },
                { english: "I live in", spanish: "Vivo en", pronunciation: "/aɪ lɪv ɪn/" }
            ],
            grammar: {
                title: "Verbo To Be para Descripciones",
                content: "I am from Colombia (soy de Colombia), He is from Spain (él es de España)"
            }
        }
    ],
    level2: [
        {
            id: 4,
            title: "Familia Básica",
            difficulty: "Básico",
            mcer: "A2",
            vocabulary: [
                { english: "Mother", spanish: "Madre", pronunciation: "/ˈmʌðər/" },
                { english: "Father", spanish: "Padre", pronunciation: "/ˈfɑːðər/" },
                { english: "Sister", spanish: "Hermana", pronunciation: "/ˈsɪstər/" },
                { english: "Brother", spanish: "Hermano", pronunciation: "/ˈbrʌðər/" },
                { english: "Baby", spanish: "Bebé", pronunciation: "/ˈbeɪbi/" }
            ],
            grammar: {
                title: "Posesivos",
                content: "my (mi), your (tu), his (su - de él), her (su - de ella), our (nuestro)"
            }
        },
        {
            id: 5,
            title: "Animales Domésticos",
            difficulty: "Básico",
            mcer: "A2",
            vocabulary: [
                { english: "Dog", spanish: "Perro", pronunciation: "/dɔːɡ/" },
                { english: "Cat", spanish: "Gato", pronunciation: "/kæt/" },
                { english: "Bird", spanish: "Pájaro", pronunciation: "/bɜːrd/" },
                { english: "Fish", spanish: "Pez", pronunciation: "/fɪʃ/" },
                { english: "Rabbit", spanish: "Conejo", pronunciation: "/ˈræbɪt/" }
            ],
            grammar: {
                title: "Plurales Regulares",
                content: "Para formar plurales regulares en inglés, agregamos -s al final de la palabra"
            }
        },
        {
            id: 6,
            title: "Comida Básica",
            difficulty: "Básico",
            mcer: "A2",
            vocabulary: [
                { english: "Bread", spanish: "Pan", pronunciation: "/bred/" },
                { english: "Milk", spanish: "Leche", pronunciation: "/mɪlk/" },
                { english: "Apple", spanish: "Manzana", pronunciation: "/ˈæpəl/" },
                { english: "Water", spanish: "Agua", pronunciation: "/ˈwɔːtər/" },
                { english: "Rice", spanish: "Arroz", pronunciation: "/raɪs/" }
            ],
            grammar: {
                title: "Sustantivos Contables e Incontables",
                content: "Los sustantivos contables pueden contarse (apples), los incontables no (water)"
            }
        },
        {
            id: 7,
            title: "Preguntas Básicas",
            difficulty: "Básico",
            mcer: "A2",
            vocabulary: [
                { english: "What", spanish: "Qué", pronunciation: "/wʌt/" },
                { english: "Where", spanish: "Dónde", pronunciation: "/weər/" },
                { english: "When", spanish: "Cuándo", pronunciation: "/wen/" },
                { english: "Who", spanish: "Quién", pronunciation: "/huː/" },
                { english: "Why", spanish: "Por qué", pronunciation: "/waɪ/" }
            ],
            grammar: {
                title: "Preguntas con Wh- Words",
                content: "What is your name? (¿Cómo te llamas?), Where do you live? (¿Dónde vives?)"
            }
        },
        {
            id: 8,
            title: "Preferencias de Comida",
            difficulty: "Básico",
            mcer: "A2",
            vocabulary: [
                { english: "I like", spanish: "Me gusta", pronunciation: "/aɪ laɪk/" },
                { english: "I don't like", spanish: "No me gusta", pronunciation: "/aɪ doʊnt laɪk/" },
                { english: "Delicious", spanish: "Delicioso", pronunciation: "/dɪˈlɪʃəs/" },
                { english: "I prefer", spanish: "Prefiero", pronunciation: "/aɪ prɪˈfɜːr/" },
                { english: "Healthy", spanish: "Saludable", pronunciation: "/ˈhelθi/" }
            ],
            grammar: {
                title: "Verbo Like en Presente Simple",
                content: "I like apples (me gustan las manzanas), She likes coffee (a ella le gusta el café)"
            }
        },
        {
            id: 9,
            title: "Descripciones Simples",
            difficulty: "Básico",
            mcer: "A2",
            vocabulary: [
                { english: "Big", spanish: "Grande", pronunciation: "/bɪɡ/" },
                { english: "Small", spanish: "Pequeño", pronunciation: "/smɔːl/" },
                { english: "Tall", spanish: "Alto", pronunciation: "/tɔːl/" },
                { english: "Short", spanish: "Bajo", pronunciation: "/ʃɔːrt/" },
                { english: "Beautiful", spanish: "Hermoso", pronunciation: "/ˈbjuːtɪfl/" }
            ],
            grammar: {
                title: "Adjetivos Descriptivos",
                content: "The house is big (la casa es grande), The cat is small (el gato es pequeño)"
            }
        }
    ],
    level3: [
        {
            id: 7,
            title: "Colores Avanzados",
            difficulty: "Intermedio",
            mcer: "B1",
            vocabulary: [
                { english: "Purple", spanish: "Morado", pronunciation: "/ˈpɜːrpl/" },
                { english: "Orange", spanish: "Naranja", pronunciation: "/ˈɔːrɪndʒ/" },
                { english: "Pink", spanish: "Rosa", pronunciation: "/pɪŋk/" },
                { english: "Brown", spanish: "Marrón", pronunciation: "/braʊn/" },
                { english: "Gray", spanish: "Gris", pronunciation: "/ɡreɪ/" }
            ],
            grammar: {
                title: "Adjetivos Comparativos",
                content: "Para comparar usamos: big - bigger, small - smaller, beautiful - more beautiful"
            }
        },
        {
            id: 8,
            title: "Tiempo y Fechas",
            difficulty: "Intermedio",
            mcer: "B1",
            vocabulary: [
                { english: "Today", spanish: "Hoy", pronunciation: "/təˈdeɪ/" },
                { english: "Yesterday", spanish: "Ayer", pronunciation: "/ˈjestərdeɪ/" },
                { english: "Tomorrow", spanish: "Mañana", pronunciation: "/təˈmɒroʊ/" },
                { english: "Week", spanish: "Semana", pronunciation: "/wiːk/" },
                { english: "Month", spanish: "Mes", pronunciation: "/mʌnθ/" }
            ],
            grammar: {
                title: "Presente Simple",
                content: "I work, you work, he/she/it works, we work, they work"
            }
        },
        {
            id: 9,
            title: "Tecnología Básica",
            difficulty: "Intermedio",
            mcer: "B1",
            vocabulary: [
                { english: "Computer", spanish: "Computadora", pronunciation: "/kəmˈpjuːtər/" },
                { english: "Phone", spanish: "Teléfono", pronunciation: "/foʊn/" },
                { english: "Internet", spanish: "Internet", pronunciation: "/ˈɪntərnet/" },
                { english: "Email", spanish: "Correo electrónico", pronunciation: "/ˈiːmeɪl/" },
                { english: "Website", spanish: "Sitio web", pronunciation: "/ˈwebsaɪt/" }
            ],
            grammar: {
                title: "Verbos Regulares en Pasado",
                content: "Para verbos regulares agregamos -ed: work → worked, play → played"
            }
        }
    ],
    level4: [
        {
            id: 10,
            title: "Deportes y Actividades",
            difficulty: "Intermedio Alto",
            mcer: "B1+",
            vocabulary: [
                { english: "Football", spanish: "Fútbol", pronunciation: "/ˈfʊtbɔːl/" },
                { english: "Basketball", spanish: "Baloncesto", pronunciation: "/ˈbæskɪtbɔːl/" },
                { english: "Swimming", spanish: "Natación", pronunciation: "/ˈswɪmɪŋ/" },
                { english: "Running", spanish: "Correr", pronunciation: "/ˈrʌnɪŋ/" },
                { english: "Cycling", spanish: "Ciclismo", pronunciation: "/ˈsaɪklɪŋ/" }
            ],
            grammar: {
                title: "Presente Continuo",
                content: "I am working, you are working, he/she/it is working"
            }
        },
        {
            id: 11,
            title: "Viajes y Transporte",
            difficulty: "Intermedio Alto",
            mcer: "B1+",
            vocabulary: [
                { english: "Airport", spanish: "Aeropuerto", pronunciation: "/ˈeəpɔːt/" },
                { english: "Train station", spanish: "Estación de tren", pronunciation: "/treɪn ˈsteɪʃn/" },
                { english: "Bus stop", spanish: "Parada de autobús", pronunciation: "/bʌs stɒp/" },
                { english: "Passport", spanish: "Pasaporte", pronunciation: "/ˈpæspɔːt/" },
                { english: "Ticket", spanish: "Boleto", pronunciation: "/ˈtɪkɪt/" }
            ],
            grammar: {
                title: "Futuro con 'Going to'",
                content: "I am going to travel, you are going to visit, he is going to arrive"
            }
        },
        {
            id: 12,
            title: "Emociones y Sentimientos",
            difficulty: "Intermedio Alto",
            mcer: "B1+",
            vocabulary: [
                { english: "Happy", spanish: "Feliz", pronunciation: "/ˈhæpi/" },
                { english: "Sad", spanish: "Triste", pronunciation: "/sæd/" },
                { english: "Excited", spanish: "Emocionado", pronunciation: "/ɪkˈsaɪtɪd/" },
                { english: "Nervous", spanish: "Nervioso", pronunciation: "/ˈnɜːvəs/" },
                { english: "Proud", spanish: "Orgulloso", pronunciation: "/praʊd/" }
            ],
            grammar: {
                title: "Adjetivos con 'Feel'",
                content: "I feel happy, you feel sad, he feels excited, they feel proud"
            }
        }
    ],
    level5: [
        {
            id: 13,
            title: "Negocios y Trabajo",
            difficulty: "Avanzado",
            mcer: "B2",
            vocabulary: [
                { english: "Meeting", spanish: "Reunión", pronunciation: "/ˈmiːtɪŋ/" },
                { english: "Presentation", spanish: "Presentación", pronunciation: "/ˌprezənˈteɪʃən/" },
                { english: "Deadline", spanish: "Fecha límite", pronunciation: "/ˈdedlaɪn/" },
                { english: "Project", spanish: "Proyecto", pronunciation: "/ˈprɑːdʒekt/" },
                { english: "Budget", spanish: "Presupuesto", pronunciation: "/ˈbʌdʒɪt/" }
            ],
            grammar: {
                title: "Vocabulario de Negocios",
                content: "Términos formales para el entorno laboral y profesional"
            }
        },
        {
            id: 14,
            title: "Ciencia y Tecnología",
            difficulty: "Avanzado",
            mcer: "B2",
            vocabulary: [
                { english: "Research", spanish: "Investigación", pronunciation: "/rɪˈsɜːrtʃ/" },
                { english: "Experiment", spanish: "Experimento", pronunciation: "/ɪkˈsperɪmənt/" },
                { english: "Innovation", spanish: "Innovación", pronunciation: "/ˌɪnəˈveɪʃən/" },
                { english: "Analysis", spanish: "Análisis", pronunciation: "/əˈnæləsɪs/" },
                { english: "Discovery", spanish: "Descubrimiento", pronunciation: "/dɪˈskʌvəri/" }
            ],
            grammar: {
                title: "Términos Científicos",
                content: "Vocabulario especializado para campos científicos y tecnológicos"
            }
        }
    ],
    level6: [
        {
            id: 15,
            title: "Negocios Avanzados",
            difficulty: "Experto",
            mcer: "C1",
            vocabulary: [
                { english: "Stakeholder", spanish: "Parte interesada", pronunciation: "/ˈsteɪkhoʊldər/" },
                { english: "Leverage", spanish: "Aprovechar/Apalancar", pronunciation: "/ˈlevərɪdʒ/" },
                { english: "Synergy", spanish: "Sinergia", pronunciation: "/ˈsɪnərdʒi/" },
                { english: "Benchmark", spanish: "Punto de referencia", pronunciation: "/ˈbentʃmɑːrk/" },
                { english: "Scalability", spanish: "Escalabilidad", pronunciation: "/ˌskeɪləˈbɪləti/" }
            ],
            grammar: {
                title: "Subjuntivo Avanzado",
                content: "It's imperative that we consider all possibilities. I suggest that he be consulted before making any decisions."
            }
        },
        {
            id: 16,
            title: "Ciencia y Tecnología",
            difficulty: "Experto",
            mcer: "C1",
            vocabulary: [
                { english: "Algorithm", spanish: "Algoritmo", pronunciation: "/ˈælɡərɪðəm/" },
                { english: "Quantum", spanish: "Cuántico", pronunciation: "/ˈkwɑːntəm/" },
                { english: "Biotechnology", spanish: "Biotecnología", pronunciation: "/ˌbaɪoʊtekˈnɑːlədʒi/" },
                { english: "Nanotechnology", spanish: "Nanotecnología", pronunciation: "/ˌnænoʊtekˈnɑːlədʒi/" },
                { english: "Artificial Intelligence", spanish: "Inteligencia Artificial", pronunciation: "/ˌɑːrtɪˈfɪʃəl ɪnˈtelɪdʒəns/" }
            ],
            grammar: {
                title: "Voz Pasiva Compleja",
                content: "The research findings were being analyzed when the breakthrough occurred. The data should have been processed earlier."
            }
        },
        {
            id: 17,
            title: "Política y Sociedad",
            difficulty: "Experto",
            mcer: "C1",
            vocabulary: [
                { english: "Democracy", spanish: "Democracia", pronunciation: "/dɪˈmɑːkrəsi/" },
                { english: "Bureaucracy", spanish: "Burocracia", pronunciation: "/bjʊˈrɑːkrəsi/" },
                { english: "Transparency", spanish: "Transparencia", pronunciation: "/trænsˈpærənsi/" },
                { english: "Accountability", spanish: "Rendición de cuentas", pronunciation: "/əˌkaʊntəˈbɪləti/" },
                { english: "Governance", spanish: "Gobernanza", pronunciation: "/ˈɡʌvərnəns/" }
            ],
            grammar: {
                title: "Estructuras Formales",
                content: "Were it not for the current circumstances, we would proceed with the implementation. Had the committee been informed earlier, the decision might have been different."
            }
        }
    ],
    level7: [
        {
            id: 18,
            title: "Literatura y Arte",
            difficulty: "Experto Avanzado",
            mcer: "C2",
            vocabulary: [
                { english: "Metaphor", spanish: "Metáfora", pronunciation: "/ˈmetəfɔːr/" },
                { english: "Allegory", spanish: "Alegoría", pronunciation: "/ˈæləɡɔːri/" },
                { english: "Aesthetic", spanish: "Estético", pronunciation: "/esˈθetɪk/" },
                { english: "Renaissance", spanish: "Renacimiento", pronunciation: "/ˈrenəsɑːns/" },
                { english: "Postmodernism", spanish: "Posmodernismo", pronunciation: "/ˌpoʊstˈmɑːdərnɪzəm/" }
            ],
            grammar: {
                title: "Lenguaje Figurativo",
                content: "The author employs a myriad of literary devices to convey the underlying themes. The narrative structure juxtaposes contrasting perspectives."
            }
        },
        {
            id: 19,
            title: "Filosofía y Ética",
            difficulty: "Experto Avanzado",
            mcer: "C2",
            vocabulary: [
                { english: "Epistemology", spanish: "Epistemología", pronunciation: "/ɪˌpɪstəˈmɑːlədʒi/" },
                { english: "Metaphysics", spanish: "Metafísica", pronunciation: "/ˌmetəˈfɪzɪks/" },
                { english: "Phenomenology", spanish: "Fenomenología", pronunciation: "/fəˌnɑːməˈnɑːlədʒi/" },
                { english: "Utilitarianism", spanish: "Utilitarismo", pronunciation: "/ˌjuːtɪlɪˈteriənɪzəm/" },
                { english: "Deontology", spanish: "Deontología", pronunciation: "/ˌdiːɑːnˈtɑːlədʒi/" }
            ],
            grammar: {
                title: "Construcciones Filosóficas",
                content: "It behooves us to consider the implications thereof. The aforementioned principles notwithstanding, one must acknowledge the inherent complexity."
            }
        },
        {
            id: 20,
            title: "Medicina y Salud Avanzada",
            difficulty: "Experto Avanzado",
            mcer: "C2",
            vocabulary: [
                { english: "Pathophysiology", spanish: "Fisiopatología", pronunciation: "/ˌpæθoʊˌfɪziˈɑːlədʒi/" },
                { english: "Pharmacokinetics", spanish: "Farmacocinética", pronunciation: "/ˌfɑːrməkoʊkɪˈnetɪks/" },
                { english: "Immunocompromised", spanish: "Inmunocomprometido", pronunciation: "/ɪˌmjuːnoʊˈkɑːmprəmaɪzd/" },
                { english: "Nosocomial", spanish: "Nosocomial", pronunciation: "/ˌnoʊsəˈkoʊmiəl/" },
                { english: "Idiosyncratic", spanish: "Idiosincrásico", pronunciation: "/ˌɪdioʊsɪnˈkrætɪk/" }
            ],
            grammar: {
                title: "Terminología Médica",
                content: "The patient presented with a constellation of symptoms that were indicative of a systemic disorder. The treatment protocol necessitated a multidisciplinary approach."
            }
        }
    ]
};

// Sistema de conversaciones coordinadas por lección
const LESSON_CONVERSATIONS = {
    // Lección 1: Saludos Básicos
    1: {
        title: "Saludos en la Oficina",
        description: "Practica saludar a colegas en inglés",
        messages: [
            { type: "bot", text: "Good morning! How are you today?" },
            { type: "user", text: "Good morning! I'm fine, thank you. How are you?" },
            { type: "bot", text: "I'm very well, thank you. Nice to meet you!" }
        ],
        vocabulary: ["Hello", "Good morning", "How are you?", "I'm fine", "Thank you", "Nice to meet you"]
    },
    // Lección 2: Números del 1 al 10
    2: {
        title: "Contando en la Tienda",
        description: "Practica contar objetos en inglés",
        messages: [
            { type: "bot", text: "Hello! How many apples would you like?" },
            { type: "user", text: "I would like five apples, please." },
            { type: "bot", text: "Great! Five apples. That will be $2.50." }
        ],
        vocabulary: ["How many", "One", "Two", "Three", "Four", "Five", "Apples", "Please"]
    },
    // Lección 3: Colores Básicos
    3: {
        title: "Describiendo Objetos",
        description: "Practica describir colores en inglés",
        messages: [
            { type: "bot", text: "What color is your car?" },
            { type: "user", text: "My car is blue. What about yours?" },
            { type: "bot", text: "My car is red. Blue is a nice color!" }
        ],
        vocabulary: ["What color", "My car", "Blue", "Red", "Nice color", "What about yours"]
    }
};

// Escenarios de conversación para la sección "Aplicar" (conversaciones generales)
const CONVERSATION_SCENARIOS = [
    {
        id: 1,
        title: "En el Restaurante",
        description: "Practica ordenar comida en inglés",
        messages: [
            { type: "bot", text: "Hello! Welcome to our restaurant. How can I help you today?" },
            { type: "user", text: "Hi! I'd like to see the menu, please." },
            { type: "bot", text: "Of course! Here's our menu. What would you like to order?" }
        ],
        level: "A1"
    },
    {
        id: 2,
        title: "En la Tienda",
        description: "Practica comprando en una tienda",
        messages: [
            { type: "bot", text: "Good morning! Can I help you find something?" },
            { type: "user", text: "Yes, I'm looking for a gift for my friend." },
            { type: "bot", text: "Great! What kind of things does your friend like?" }
        ],
        level: "A1"
    },
    {
        id: 3,
        title: "En el Aeropuerto",
        description: "Practica check-in y preguntas de viaje",
        messages: [
            { type: "bot", text: "Good morning! Do you have your passport and ticket?" },
            { type: "user", text: "Yes, here they are." },
            { type: "bot", text: "Thank you. Are you checking any bags today?" }
        ],
        level: "A2"
    },
    {
        id: 4,
        title: "En el Hotel",
        description: "Practica hacer reservas y solicitar servicios",
        messages: [
            { type: "bot", text: "Good afternoon! Welcome to our hotel. Do you have a reservation?" },
            { type: "user", text: "Yes, I have a reservation under the name Smith." },
            { type: "bot", text: "Perfect! Let me check that for you. Would you like a room with a city view or garden view?" }
        ],
        level: "A2"
    },
    {
        id: 5,
        title: "En el Doctor",
        description: "Practica describir síntomas y entender diagnósticos",
        messages: [
            { type: "bot", text: "Good morning! What seems to be the problem today?" },
            { type: "user", text: "I have a headache and feel very tired." },
            { type: "bot", text: "How long have you been experiencing these symptoms?" }
        ],
        level: "B1"
    },
    {
        id: 6,
        title: "En la Oficina",
        description: "Practica reuniones de trabajo y presentaciones",
        messages: [
            { type: "bot", text: "Good morning everyone! Let's start today's meeting. First, let's review last week's progress." },
            { type: "user", text: "I'd like to present the quarterly sales report." },
            { type: "bot", text: "Excellent! Please go ahead. What were the key highlights?" }
        ],
        level: "B1"
    },
    {
        id: 7,
        title: "En el Gimnasio",
        description: "Practica conversaciones sobre fitness y salud",
        messages: [
            { type: "bot", text: "Hi there! Are you new to our gym? I can show you around if you'd like." },
            { type: "user", text: "Yes, I'm new. I'm interested in strength training." },
            { type: "bot", text: "Great! We have excellent equipment for that. Have you worked with weights before?" }
        ],
        level: "B2"
    },
    {
        id: 8,
        title: "Reunión de Negocios",
        description: "Practica negociaciones y presentaciones ejecutivas",
        messages: [
            { type: "bot", text: "Thank you for coming today. We're here to discuss the partnership proposal. What are your thoughts on the terms?" },
            { type: "user", text: "I think the proposal is interesting, but we need to review the financial projections." },
            { type: "bot", text: "Absolutely. We've prepared detailed financial models. Let's examine them together." }
        ],
        level: "B2"
    },
    {
        id: 9,
        title: "Conferencia Académica",
        description: "Practica discusiones académicas y presentaciones de investigación",
        messages: [
            { type: "bot", text: "Welcome to the conference. Your research on renewable energy is fascinating. Could you elaborate on your methodology?" },
            { type: "user", text: "Certainly. We used a multi-phase approach combining quantitative and qualitative analysis." },
            { type: "bot", text: "That's impressive. What were the most significant findings from your study?" }
        ],
        level: "C1"
    },
    {
        id: 10,
        title: "Debate Político",
        description: "Practica argumentación política y análisis de políticas públicas",
        messages: [
            { type: "bot", text: "The current policy framework needs substantial reform. What's your perspective on the proposed legislative changes?" },
            { type: "user", text: "I believe the legislation addresses key issues, but the implementation timeline seems unrealistic." },
            { type: "bot", text: "That's a valid concern. How do you propose we address the implementation challenges?" }
        ],
        level: "C1"
    },
    {
        id: 11,
        title: "Simposio Científico",
        description: "Practica discusiones sobre investigación científica avanzada",
        messages: [
            { type: "bot", text: "The implications of your quantum computing research are profound. How do you envision this technology evolving?" },
            { type: "user", text: "We're at the threshold of a paradigm shift. The scalability challenges we're facing require innovative approaches." },
            { type: "bot", text: "Fascinating. What role do you see artificial intelligence playing in overcoming these limitations?" }
        ],
        level: "C2"
    },
    {
        id: 12,
        title: "Panel Filosófico",
        description: "Practica discusiones filosóficas profundas y análisis conceptual",
        messages: [
            { type: "bot", text: "The ontological implications of consciousness in artificial entities raise fundamental questions about the nature of existence." },
            { type: "user", text: "Indeed. We must consider whether consciousness is emergent or inherent, and what that means for moral agency." },
            { type: "bot", text: "A profound observation. How do you reconcile this with traditional ethical frameworks?" }
        ],
        level: "C2"
    }
];

// Sistema de ejercicios coordinados por lección
const LESSON_EXERCISES = {
    // Lección 1: Saludos Básicos
    1: {
        vocabulary: [
            { question: "¿Cómo se dice 'Hola' en inglés?", answer: "Hello", options: ["Hello", "Good morning", "Goodbye", "Thank you"] },
            { question: "¿Cómo se dice 'Buenos días' en inglés?", answer: "Good morning", options: ["Hello", "Good morning", "Good afternoon", "Good evening"] },
            { question: "¿Cómo se dice '¿Cómo estás?' en inglés?", answer: "How are you?", options: ["What is your name?", "How are you?", "Where are you from?", "How old are you?"] }
        ],
        grammar: [
            { question: "Complete: ___ am a student", answer: "I", options: ["I", "You", "He", "She"] },
            { question: "Complete: ___ are my friend", answer: "You", options: ["I", "You", "He", "She"] }
        ]
    },
    // Lección 2: Números del 1 al 10
    2: {
        vocabulary: [
            { question: "¿Cómo se dice 'Uno' en inglés?", answer: "One", options: ["One", "Two", "Three", "Four"] },
            { question: "¿Cómo se dice 'Cinco' en inglés?", answer: "Five", options: ["Four", "Five", "Six", "Seven"] }
        ],
        grammar: [
            { question: "Complete: ___ apple", answer: "an", options: ["a", "an", "the", "none"] },
            { question: "Complete: ___ book", answer: "a", options: ["a", "an", "the", "none"] }
        ]
    },
    // Lección 3: Colores Básicos
    3: {
        vocabulary: [
            { question: "¿Cómo se dice 'Rojo' en inglés?", answer: "Red", options: ["Red", "Blue", "Green", "Yellow"] },
            { question: "¿Cómo se dice 'Azul' en inglés?", answer: "Blue", options: ["Red", "Blue", "Green", "Yellow"] }
        ],
        grammar: [
            { question: "Complete: The car is ___", answer: "red", options: ["red", "reds", "redly", "redder"] },
            { question: "Complete: The sky is ___", answer: "blue", options: ["blue", "blues", "bluely", "bluer"] }
        ]
    }
};

// Pools de gramática por nivel MCER para ampliar ejercicios en todas las lecciones
const GRAMMAR_POOLS = {
    A1: [
        { type: "articles", question: "Complete: ___ apple", options: ["a", "an", "the", "none"], correct: "an" },
        { type: "pronouns", question: "___ am a student", options: ["I", "You", "He", "She"], correct: "I" }
    ],
    A2: [
        { type: "present_simple", question: "She ___ English", options: ["speak", "speaks", "speaking", "spoke"], correct: "speaks" },
        { type: "adjectives", question: "The car is ___", answer: "fast", options: ["fast", "fastly", "fasting", "faster"], correct: "fast" }
    ],
    B1: [
        { type: "past_perfect", question: "By the time we arrived, they ___ already left", options: ["have", "had", "has", "were"], correct: "had" },
        { type: "conditionals", question: "If I ___ more time, I would travel more", options: ["have", "had", "will have", "would have"], correct: "had" }
    ],
    B2: [
        { type: "passive_voice", question: "The report ___ by the team yesterday", options: ["was completed", "completed", "is completed", "has completed"], correct: "was completed" },
        { type: "reported_speech", question: "She said she ___ the meeting", options: ["attended", "had attended", "will attend", "attends"], correct: "had attended" }
    ],
    C1: [
        { type: "subjunctive", question: "It's essential that he ___ informed immediately", options: ["be", "is", "was", "will be"], correct: "be" },
        { type: "inversion", question: "___ had I seen such a beautiful sunset", options: ["Rarely", "Never", "Seldom", "Hardly"], correct: "Never" }
    ],
    C2: [
        { type: "complex_structures", question: "___ it not for your help, I wouldn't have succeeded", options: ["Were", "Had", "If", "Should"], correct: "Had" },
        { type: "formal_language", question: "The committee ___ to consider all proposals", options: ["is behooved", "behooves", "behooved", "has behooved"], correct: "behooves" }
    ]
};

// Ejercicios de listening avanzados por nivel
const LISTENING_EXERCISES = {
    A1: [
        {
            audio: "Hello, my name is John. I am from Canada. I speak English and French.",
            questions: [
                { question: "What is the person's name?", options: ["John", "James", "Jack", "Joe"], correct: "John" },
                { question: "Where is he from?", options: ["Canada", "Australia", "America", "England"], correct: "Canada" },
                { question: "How many languages does he speak?", options: ["One", "Two", "Three", "Four"], correct: "Two" }
            ]
        }
    ],
    A2: [
        {
            audio: "Yesterday I went to the supermarket. I bought some milk, bread, and apples. The total cost was fifteen dollars.",
            questions: [
                { question: "When did the person go shopping?", options: ["Today", "Yesterday", "Last week", "Tomorrow"], correct: "Yesterday" },
                { question: "What did they buy?", options: ["Vegetables", "Milk, bread, apples", "Meat", "Dessert"], correct: "Milk, bread, apples" },
                { question: "How much did they spend?", options: ["$10", "$15", "$20", "$25"], correct: "$15" }
            ]
        }
    ],
    B1: [
        {
            audio: "The meeting has been postponed until next Tuesday due to the CEO's unexpected travel. All participants should prepare the quarterly reports beforehand.",
            questions: [
                { question: "Why was the meeting postponed?", options: ["Bad weather", "CEO's travel", "Technical issues", "Holiday"], correct: "CEO's travel" },
                { question: "When is the new meeting date?", options: ["Next Monday", "Next Tuesday", "Next Wednesday", "Next Thursday"], correct: "Next Tuesday" },
                { question: "What should participants prepare?", options: ["Presentations", "Quarterly reports", "Budget plans", "Marketing strategies"], correct: "Quarterly reports" }
            ]
        }
    ],
    B2: [
        {
            audio: "The research indicates that climate change is accelerating at an unprecedented rate. Scientists have observed significant shifts in weather patterns, which could have profound implications for global agriculture and water resources.",
            questions: [
                { question: "What is accelerating according to the research?", options: ["Technology", "Climate change", "Population growth", "Urbanization"], correct: "Climate change" },
                { question: "What have scientists observed?", options: ["New species", "Weather pattern shifts", "Ocean currents", "Mountain ranges"], correct: "Weather pattern shifts" },
                { question: "What could be affected by these changes?", options: ["Transportation", "Agriculture and water", "Education", "Entertainment"], correct: "Agriculture and water" }
            ]
        }
    ],
    C1: [
        {
            audio: "The pharmaceutical industry faces unprecedented challenges in developing effective treatments for rare diseases. Despite regulatory hurdles and limited patient populations, researchers are leveraging cutting-edge biotechnology to create personalized medicine solutions that could revolutionize healthcare delivery.",
            questions: [
                { question: "What challenges does the pharmaceutical industry face?", options: ["High costs", "Regulatory issues", "Limited patients", "All of the above"], correct: "All of the above" },
                { question: "What technology are researchers using?", options: ["Traditional methods", "Cutting-edge biotechnology", "Artificial intelligence", "Robotics"], correct: "Cutting-edge biotechnology" },
                { question: "What could these solutions revolutionize?", options: ["Education", "Transportation", "Healthcare delivery", "Agriculture"], correct: "Healthcare delivery" }
            ]
        }
    ],
    C2: [
        {
            audio: "The epistemological foundations of quantum mechanics challenge our conventional understanding of reality itself. The observer effect and wave-particle duality suggest that consciousness may play a fundamental role in the manifestation of physical phenomena, raising profound questions about the nature of existence and the limits of human knowledge.",
            questions: [
                { question: "What do quantum mechanics challenge?", options: ["Technology", "Mathematics", "Understanding of reality", "Physics laws"], correct: "Understanding of reality" },
                { question: "What suggests consciousness may be important?", options: ["Observer effect", "Wave-particle duality", "Both A and B", "Neither A nor B"], correct: "Both A and B" },
                { question: "What questions are raised?", options: ["About technology", "About nature of existence", "About politics", "About economics"], correct: "About nature of existence" }
            ]
        }
    ]
};

// Ejercicios de escritura por nivel MCER
const WRITING_EXERCISES = {
    A1: [
        {
            id: 1,
            title: "Autopresentación",
            prompt: "Escribe 3-4 oraciones sobre ti mismo. Incluye tu nombre, edad, nacionalidad y una cosa que te gusta hacer.",
            example: "Hello! My name is Maria. I am 25 years old. I am from Spain. I like to read books.",
            keyWords: ["name", "age", "nationality", "like"],
            minWords: 15,
            maxWords: 25
        },
        {
            id: 2,
            title: "Mi Familia",
            prompt: "Describe a tu familia. Escribe sobre 2-3 miembros de tu familia y qué hacen.",
            example: "My family is small. My father is a teacher. My mother works in an office. My brother is a student.",
            keyWords: ["family", "father", "mother", "brother", "sister", "works", "student"],
            minWords: 20,
            maxWords: 35
        }
    ],
    A2: [
        {
            id: 3,
            title: "Mi Rutina Diaria",
            prompt: "Describe tu rutina diaria. Escribe sobre lo que haces desde que te levantas hasta que te acuestas.",
            example: "I wake up at 7 AM every day. I have breakfast at home. I go to work by bus. I finish work at 5 PM.",
            keyWords: ["wake up", "breakfast", "work", "bus", "finish"],
            minWords: 40,
            maxWords: 60
        },
        {
            id: 4,
            title: "Mi Ciudad",
            prompt: "Describe tu ciudad o pueblo. Escribe sobre los lugares importantes y qué puedes hacer allí.",
            example: "I live in Madrid. It's a big city with many parks and museums. There are good restaurants and shops.",
            keyWords: ["city", "parks", "museums", "restaurants", "shops"],
            minWords: 35,
            maxWords: 50
        }
    ],
    B1: [
        {
            id: 5,
            title: "Mi Pasatiempo Favorito",
            prompt: "Escribe sobre tu pasatiempo favorito. Explica por qué te gusta y qué haces cuando lo practicas.",
            example: "My favorite hobby is photography. I enjoy taking pictures of nature and people. It helps me relax and be creative.",
            keyWords: ["hobby", "photography", "enjoy", "relax", "creative"],
            minWords: 60,
            maxWords: 80
        },
        {
            id: 6,
            title: "Una Experiencia de Viaje",
            prompt: "Describe un viaje que hiciste. Incluye dónde fuiste, qué hiciste y qué te gustó más.",
            example: "Last summer I visited Paris. I saw the Eiffel Tower and visited many museums. The food was amazing.",
            keyWords: ["visited", "saw", "museums", "food", "amazing"],
            minWords: 70,
            maxWords: 100
        }
    ],
    B2: [
        {
            id: 7,
            title: "Opinión sobre la Tecnología",
            prompt: "Escribe tu opinión sobre el impacto de la tecnología en la sociedad moderna. Incluye ventajas y desventajas.",
            example: "Technology has revolutionized our lives. While it makes communication easier, it can also create social isolation.",
            keyWords: ["technology", "revolutionized", "communication", "social isolation"],
            minWords: 120,
            maxWords: 150
        },
        {
            id: 8,
            title: "Problema Ambiental",
            prompt: "Describe un problema ambiental que te preocupa y explica qué se puede hacer para solucionarlo.",
            example: "Climate change is a serious problem. We can reduce our carbon footprint by using renewable energy and public transport.",
            keyWords: ["climate change", "carbon footprint", "renewable energy", "public transport"],
            minWords: 100,
            maxWords: 130
        }
    ],
    C1: [
        {
            id: 9,
            title: "Análisis de Política",
            prompt: "Analiza una política gubernamental actual y evalúa sus implicaciones sociales y económicas.",
            example: "The new education policy aims to improve digital literacy. However, it may widen the gap between urban and rural students.",
            keyWords: ["policy", "digital literacy", "urban", "rural", "gap"],
            minWords: 180,
            maxWords: 220
        },
        {
            id: 10,
            title: "Ensayo sobre Globalización",
            prompt: "Escribe un ensayo sobre los efectos de la globalización en las culturas locales y la identidad nacional.",
            example: "Globalization has created both opportunities and challenges for cultural preservation. While it promotes diversity, it may also lead to cultural homogenization.",
            keyWords: ["globalization", "cultural preservation", "diversity", "homogenization"],
            minWords: 200,
            maxWords: 250
        }
    ],
    C2: [
        {
            id: 11,
            title: "Análisis Filosófico",
            prompt: "Analiza la relación entre la inteligencia artificial y la conciencia humana desde una perspectiva filosófica.",
            example: "The emergence of artificial intelligence raises fundamental questions about consciousness and free will. Can machines truly think, or do they merely simulate cognitive processes?",
            keyWords: ["artificial intelligence", "consciousness", "free will", "cognitive processes"],
            minWords: 250,
            maxWords: 300
        },
        {
            id: 12,
            title: "Crítica Literaria",
            prompt: "Escribe una crítica detallada de una obra literaria, analizando sus temas, estilo y relevancia contemporánea.",
            example: "The novel's exploration of existential themes resonates with contemporary anxieties about identity and meaning in an increasingly complex world.",
            keyWords: ["existential themes", "contemporary anxieties", "identity", "meaning"],
            minWords: 280,
            maxWords: 350
        }
    ]
};

// Sistema de niveles y XP mejorado
const LEVEL_SYSTEM = {
    xpPerLesson: 50,
    xpPerExercise: 10,
    xpPerStreak: 5,
    levels: [
        { level: 1, xpRequired: 0, title: "Principiante", mcer: "A1" },
        { level: 2, xpRequired: 100, title: "Básico", mcer: "A2" },
        { level: 3, xpRequired: 250, title: "Intermedio", mcer: "B1" },
        { level: 4, xpRequired: 500, title: "Intermedio Alto", mcer: "B2" },
        { level: 5, xpRequired: 1000, title: "Avanzado", mcer: "B2+" },
        { level: 6, xpRequired: 2000, title: "Experto", mcer: "C1" },
        { level: 7, xpRequired: 3500, title: "Experto Avanzado", mcer: "C1+" },
        { level: 8, xpRequired: 5000, title: "Maestro", mcer: "C2" },
        { level: 9, xpRequired: 7000, title: "Gran Maestro", mcer: "C2+" },
        { level: 10, xpRequired: 10000, title: "Leyenda", mcer: "C2+" }
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
    body: [
        { english: "Head", spanish: "Cabeza", pronunciation: "/hed/" },
        { english: "Face", spanish: "Cara", pronunciation: "/feɪs/" },
        { english: "Eyes", spanish: "Ojos", pronunciation: "/aɪz/" },
        { english: "Nose", spanish: "Nariz", pronunciation: "/nəʊz/" },
        { english: "Mouth", spanish: "Boca", pronunciation: "/maʊθ/" },
        { english: "Ears", spanish: "Orejas", pronunciation: "/ɪəz/" },
        { english: "Hair", spanish: "Cabello", pronunciation: "/heər/" },
        { english: "Forehead", spanish: "Frente", pronunciation: "/ˈfɔːhed/" },
        { english: "Cheeks", spanish: "Mejillas", pronunciation: "/tʃiːks/" },
        { english: "Chin", spanish: "Barbilla", pronunciation: "/tʃɪn/" },
        { english: "Neck", spanish: "Cuello", pronunciation: "/nek/" },
        { english: "Shoulders", spanish: "Hombros", pronunciation: "/ˈʃəʊldəz/" },
        { english: "Arms", spanish: "Brazos", pronunciation: "/ɑːmz/" },
        { english: "Elbows", spanish: "Codos", pronunciation: "/ˈelbəʊz/" },
        { english: "Hands", spanish: "Manos", pronunciation: "/hændz/" },
        { english: "Fingers", spanish: "Dedos", pronunciation: "/ˈfɪŋɡəz/" },
        { english: "Thumbs", spanish: "Pulgares", pronunciation: "/θʌmz/" },
        { english: "Chest", spanish: "Pecho", pronunciation: "/tʃest/" },
        { english: "Back", spanish: "Espalda", pronunciation: "/bæk/" },
        { english: "Stomach", spanish: "Estómago", pronunciation: "/ˈstʌmək/" },
        { english: "Waist", spanish: "Cintura", pronunciation: "/weɪst/" },
        { english: "Hips", spanish: "Caderas", pronunciation: "/hɪps/" },
        { english: "Legs", spanish: "Piernas", pronunciation: "/leɡz/" },
        { english: "Knees", spanish: "Rodillas", pronunciation: "/niːz/" },
        { english: "Feet", spanish: "Pies", pronunciation: "/fiːt/" },
        { english: "Toes", spanish: "Dedos de los pies", pronunciation: "/təʊz/" },
        { english: "Ankles", spanish: "Tobillos", pronunciation: "/ˈæŋklz/" },
        { english: "Wrists", spanish: "Muñecas", pronunciation: "/rɪsts/" },
        { english: "Heart", spanish: "Corazón", pronunciation: "/hɑːt/" },
        { english: "Lungs", spanish: "Pulmones", pronunciation: "/lʌŋz/" },
        { english: "Brain", spanish: "Cerebro", pronunciation: "/breɪn/" },
        { english: "Liver", spanish: "Hígado", pronunciation: "/ˈlɪvər/" },
        { english: "Kidneys", spanish: "Riñones", pronunciation: "/ˈkɪdniz/" },
        { english: "Skin", spanish: "Piel", pronunciation: "/skɪn/" },
        { english: "Bones", spanish: "Huesos", pronunciation: "/bəʊnz/" },
        { english: "Muscles", spanish: "Músculos", pronunciation: "/ˈmʌslz/" },
        { english: "Blood", spanish: "Sangre", pronunciation: "/blʌd/" },
        { english: "Veins", spanish: "Venas", pronunciation: "/veɪnz/" }
    ],
    clothes: [
        { english: "Shirt", spanish: "Camisa", pronunciation: "/ʃɜːt/" },
        { english: "T-shirt", spanish: "Camiseta", pronunciation: "/ˈtiː ʃɜːt/" },
        { english: "Pants", spanish: "Pantalones", pronunciation: "/pænts/" },
        { english: "Jeans", spanish: "Jeans", pronunciation: "/dʒiːnz/" },
        { english: "Dress", spanish: "Vestido", pronunciation: "/dres/" },
        { english: "Skirt", spanish: "Falda", pronunciation: "/skɜːt/" },
        { english: "Sweater", spanish: "Suéter", pronunciation: "/ˈswetər/" },
        { english: "Jacket", spanish: "Chaqueta", pronunciation: "/ˈdʒækɪt/" },
        { english: "Coat", spanish: "Abrigo", pronunciation: "/kəʊt/" },
        { english: "Suit", spanish: "Traje", pronunciation: "/suːt/" },
        { english: "Tie", spanish: "Corbata", pronunciation: "/taɪ/" },
        { english: "Socks", spanish: "Calcetines", pronunciation: "/sɒks/" },
        { english: "Shoes", spanish: "Zapatos", pronunciation: "/ʃuːz/" },
        { english: "Boots", spanish: "Botas", pronunciation: "/buːts/" },
        { english: "Sandals", spanish: "Sandalias", pronunciation: "/ˈsændlz/" },
        { english: "Sneakers", spanish: "Tenis", pronunciation: "/ˈsniːkəz/" },
        { english: "High heels", spanish: "Tacones altos", pronunciation: "/haɪ hiːlz/" },
        { english: "Hat", spanish: "Sombrero", pronunciation: "/hæt/" },
        { english: "Cap", spanish: "Gorra", pronunciation: "/kæp/" },
        { english: "Scarf", spanish: "Bufanda", pronunciation: "/skɑːf/" },
        { english: "Gloves", spanish: "Guantes", pronunciation: "/ɡlʌvz/" },
        { english: "Belt", spanish: "Cinturón", pronunciation: "/belt/" },
        { english: "Watch", spanish: "Reloj", pronunciation: "/wɒtʃ/" },
        { english: "Jewelry", spanish: "Joyas", pronunciation: "/ˈdʒuːəlri/" },
        { english: "Ring", spanish: "Anillo", pronunciation: "/rɪŋ/" },
        { english: "Necklace", spanish: "Collar", pronunciation: "/ˈnekləs/" },
        { english: "Earrings", spanish: "Aretes", pronunciation: "/ˈɪərɪŋz/" },
        { english: "Bracelet", spanish: "Pulsera", pronunciation: "/ˈbreɪslət/" },
        { english: "Bag", spanish: "Bolsa", pronunciation: "/bæɡ/" },
        { english: "Handbag", spanish: "Bolso", pronunciation: "/ˈhændbæɡ/" },
        { english: "Backpack", spanish: "Mochila", pronunciation: "/ˈbækpæk/" },
        { english: "Wallet", spanish: "Billetera", pronunciation: "/ˈwɒlɪt/" },
        { english: "Sunglasses", spanish: "Gafas de sol", pronunciation: "/ˈsʌnɡlɑːsɪz/" },
        { english: "Glasses", spanish: "Gafas", pronunciation: "/ˈɡlɑːsɪz/" },
        { english: "Umbrella", spanish: "Paraguas", pronunciation: "/ʌmˈbrelə/" },
        { english: "Raincoat", spanish: "Impermeable", pronunciation: "/ˈreɪnkəʊt/" },
        { english: "Swimsuit", spanish: "Traje de baño", pronunciation: "/ˈswɪmsuːt/" },
        { english: "Pajamas", spanish: "Pijama", pronunciation: "/pəˈdʒɑːməz/" },
        { english: "Underwear", spanish: "Ropa interior", pronunciation: "/ˈʌndəweər/" },
        { english: "Bra", spanish: "Sostén", pronunciation: "/brɑː/" },
        { english: "Underpants", spanish: "Calzoncillos", pronunciation: "/ˈʌndəpænts/" }
    ],
    house: [
        { english: "House", spanish: "Casa", pronunciation: "/haʊs/" },
        { english: "Home", spanish: "Hogar", pronunciation: "/həʊm/" },
        { english: "Apartment", spanish: "Apartamento", pronunciation: "/əˈpɑːtmənt/" },
        { english: "Room", spanish: "Habitación", pronunciation: "/ruːm/" },
        { english: "Living room", spanish: "Sala", pronunciation: "/ˈlɪvɪŋ ruːm/" },
        { english: "Bedroom", spanish: "Dormitorio", pronunciation: "/ˈbedruːm/" },
        { english: "Kitchen", spanish: "Cocina", pronunciation: "/ˈkɪtʃɪn/" },
        { english: "Bathroom", spanish: "Baño", pronunciation: "/ˈbɑːθruːm/" },
        { english: "Dining room", spanish: "Comedor", pronunciation: "/ˈdaɪnɪŋ ruːm/" },
        { english: "Study", spanish: "Estudio", pronunciation: "/ˈstʌdi/" },
        { english: "Garage", spanish: "Garaje", pronunciation: "/ˈɡærɑːʒ/" },
        { english: "Garden", spanish: "Jardín", pronunciation: "/ˈɡɑːdn/" },
        { english: "Balcony", spanish: "Balcón", pronunciation: "/ˈbælkəni/" },
        { english: "Stairs", spanish: "Escaleras", pronunciation: "/steəz/" },
        { english: "Elevator", spanish: "Ascensor", pronunciation: "/ˈelɪveɪtər/" },
        { english: "Door", spanish: "Puerta", pronunciation: "/dɔːr/" },
        { english: "Window", spanish: "Ventana", pronunciation: "/ˈwɪndəʊ/" },
        { english: "Wall", spanish: "Pared", pronunciation: "/wɔːl/" },
        { english: "Floor", spanish: "Piso", pronunciation: "/flɔːr/" },
        { english: "Ceiling", spanish: "Techo", pronunciation: "/ˈsiːlɪŋ/" },
        { english: "Roof", spanish: "Techo", pronunciation: "/ruːf/" },
        { english: "Bed", spanish: "Cama", pronunciation: "/bed/" },
        { english: "Mattress", spanish: "Colchón", pronunciation: "/ˈmætrəs/" },
        { english: "Pillow", spanish: "Almohada", pronunciation: "/ˈpɪləʊ/" },
        { english: "Blanket", spanish: "Cobija", pronunciation: "/ˈblæŋkɪt/" },
        { english: "Sheet", spanish: "Sábana", pronunciation: "/ʃiːt/" },
        { english: "Table", spanish: "Mesa", pronunciation: "/ˈteɪbl/" },
        { english: "Chair", spanish: "Silla", pronunciation: "/tʃeər/" },
        { english: "Sofa", spanish: "Sofá", pronunciation: "/ˈsəʊfə/" },
        { english: "Armchair", spanish: "Sillón", pronunciation: "/ˈɑːmtʃeər/" },
        { english: "Desk", spanish: "Escritorio", pronunciation: "/desk/" },
        { english: "Bookshelf", spanish: "Estante de libros", pronunciation: "/ˈbʊkʃelf/" },
        { english: "Wardrobe", spanish: "Armario", pronunciation: "/ˈwɔːdrəʊb/" },
        { english: "Closet", spanish: "Closet", pronunciation: "/ˈklɒzɪt/" },
        { english: "Mirror", spanish: "Espejo", pronunciation: "/ˈmɪrər/" },
        { english: "Lamp", spanish: "Lámpara", pronunciation: "/læmp/" },
        { english: "Light", spanish: "Luz", pronunciation: "/laɪt/" },
        { english: "Curtain", spanish: "Cortina", pronunciation: "/ˈkɜːtn/" },
        { english: "Carpet", spanish: "Alfombra", pronunciation: "/ˈkɑːpɪt/" },
        { english: "Rug", spanish: "Tapete", pronunciation: "/rʌɡ/" },
        { english: "Painting", spanish: "Pintura", pronunciation: "/ˈpeɪntɪŋ/" },
        { english: "Picture", spanish: "Cuadro", pronunciation: "/ˈpɪktʃər/" },
        { english: "Clock", spanish: "Reloj", pronunciation: "/klɒk/" },
        { english: "Vase", spanish: "Florero", pronunciation: "/vɑːz/" },
        { english: "Plant", spanish: "Planta", pronunciation: "/plɑːnt/" },
        { english: "Flower", spanish: "Flor", pronunciation: "/ˈflaʊər/" }
    ],
    transport: [
        { english: "Car", spanish: "Carro", pronunciation: "/kɑːr/" },
        { english: "Bus", spanish: "Autobús", pronunciation: "/bʌs/" },
        { english: "Train", spanish: "Tren", pronunciation: "/treɪn/" },
        { english: "Airplane", spanish: "Avión", pronunciation: "/ˈeəpleɪn/" },
        { english: "Boat", spanish: "Barco", pronunciation: "/bəʊt/" },
        { english: "Ship", spanish: "Barco", pronunciation: "/ʃɪp/" },
        { english: "Motorcycle", spanish: "Motocicleta", pronunciation: "/ˈməʊtəsaɪkl/" },
        { english: "Bicycle", spanish: "Bicicleta", pronunciation: "/ˈbaɪsɪkl/" },
        { english: "Taxi", spanish: "Taxi", pronunciation: "/ˈtæksi/" },
        { english: "Truck", spanish: "Camión", pronunciation: "/trʌk/" },
        { english: "Van", spanish: "Furgoneta", pronunciation: "/væn/" },
        { english: "Subway", spanish: "Metro", pronunciation: "/ˈsʌbweɪ/" },
        { english: "Tram", spanish: "Tranvía", pronunciation: "/træm/" },
        { english: "Helicopter", spanish: "Helicóptero", pronunciation: "/ˈhelɪkɒptər/" },
        { english: "Rocket", spanish: "Cohete", pronunciation: "/ˈrɒkɪt/" },
        { english: "Wheel", spanish: "Rueda", pronunciation: "/wiːl/" },
        { english: "Engine", spanish: "Motor", pronunciation: "/ˈendʒɪn/" },
        { english: "Steering wheel", spanish: "Volante", pronunciation: "/ˈstɪərɪŋ wiːl/" },
        { english: "Brake", spanish: "Freno", pronunciation: "/breɪk/" },
        { english: "Gas pedal", spanish: "Acelerador", pronunciation: "/ɡæs ˈpedl/" },
        { english: "Gear", spanish: "Marcha", pronunciation: "/ɡɪər/" },
        { english: "Mirror", spanish: "Espejo", pronunciation: "/ˈmɪrər/" },
        { english: "Windshield", spanish: "Parabrisas", pronunciation: "/ˈwɪndʃiːld/" },
        { english: "Horn", spanish: "Bocina", pronunciation: "/hɔːn/" },
        { english: "Lights", spanish: "Luces", pronunciation: "/laɪts/" },
        { english: "Road", spanish: "Carretera", pronunciation: "/rəʊd/" },
        { english: "Street", spanish: "Calle", pronunciation: "/striːt/" },
        { english: "Highway", spanish: "Autopista", pronunciation: "/ˈhaɪweɪ/" },
        { english: "Bridge", spanish: "Puente", pronunciation: "/brɪdʒ/" },
        { english: "Tunnel", spanish: "Túnel", pronunciation: "/ˈtʌnl/" },
        { english: "Traffic light", spanish: "Semáforo", pronunciation: "/ˈtræfɪk laɪt/" },
        { english: "Stop sign", spanish: "Señal de stop", pronunciation: "/stɒp saɪn/" },
        { english: "Gas station", spanish: "Gasolinera", pronunciation: "/ɡæs ˈsteɪʃən/" },
        { english: "Parking lot", spanish: "Estacionamiento", pronunciation: "/ˈpɑːkɪŋ lɒt/" },
        { english: "Airport", spanish: "Aeropuerto", pronunciation: "/ˈeəpɔːt/" },
        { english: "Station", spanish: "Estación", pronunciation: "/ˈsteɪʃən/" },
        { english: "Port", spanish: "Puerto", pronunciation: "/pɔːt/" }
    ],
    work: [
        { english: "Work", spanish: "Trabajo", pronunciation: "/wɜːk/" },
        { english: "Job", spanish: "Empleo", pronunciation: "/dʒɒb/" },
        { english: "Career", spanish: "Carrera", pronunciation: "/kəˈrɪər/" },
        { english: "Profession", spanish: "Profesión", pronunciation: "/prəˈfeʃən/" },
        { english: "Doctor", spanish: "Doctor", pronunciation: "/ˈdɒktər/" },
        { english: "Teacher", spanish: "Maestro", pronunciation: "/ˈtiːtʃər/" },
        { english: "Engineer", spanish: "Ingeniero", pronunciation: "/ˌendʒɪˈnɪər/" },
        { english: "Lawyer", spanish: "Abogado", pronunciation: "/ˈlɔːjər/" },
        { english: "Nurse", spanish: "Enfermera", pronunciation: "/nɜːs/" },
        { english: "Police officer", spanish: "Oficial de policía", pronunciation: "/pəˈliːs ˈɒfɪsər/" },
        { english: "Firefighter", spanish: "Bombero", pronunciation: "/ˈfaɪəfaɪtər/" },
        { english: "Chef", spanish: "Chef", pronunciation: "/ʃef/" },
        { english: "Waiter", spanish: "Camarero", pronunciation: "/ˈweɪtər/" },
        { english: "Waitress", spanish: "Camarera", pronunciation: "/ˈweɪtrəs/" },
        { english: "Cashier", spanish: "Cajero", pronunciation: "/kæˈʃɪər/" },
        { english: "Salesperson", spanish: "Vendedor", pronunciation: "/ˈseɪlzpɜːsn/" },
        { english: "Manager", spanish: "Gerente", pronunciation: "/ˈmænɪdʒər/" },
        { english: "Boss", spanish: "Jefe", pronunciation: "/bɒs/" },
        { english: "Employee", spanish: "Empleado", pronunciation: "/ɪmˈplɔɪiː/" },
        { english: "Colleague", spanish: "Colega", pronunciation: "/ˈkɒliːɡ/" },
        { english: "Client", spanish: "Cliente", pronunciation: "/ˈklaɪənt/" },
        { english: "Customer", spanish: "Cliente", pronunciation: "/ˈkʌstəmər/" },
        { english: "Meeting", spanish: "Reunión", pronunciation: "/ˈmiːtɪŋ/" },
        { english: "Office", spanish: "Oficina", pronunciation: "/ˈɒfɪs/" },
        { english: "Desk", spanish: "Escritorio", pronunciation: "/desk/" },
        { english: "Computer", spanish: "Computadora", pronunciation: "/kəmˈpjuːtər/" },
        { english: "Phone", spanish: "Teléfono", pronunciation: "/fəʊn/" },
        { english: "Email", spanish: "Correo electrónico", pronunciation: "/ˈiːmeɪl/" },
        { english: "Salary", spanish: "Salario", pronunciation: "/ˈsæləri/" },
        { english: "Wage", spanish: "Salario", pronunciation: "/weɪdʒ/" },
        { english: "Overtime", spanish: "Horas extra", pronunciation: "/ˈəʊvətaɪm/" },
        { english: "Vacation", spanish: "Vacaciones", pronunciation: "/vəˈkeɪʃən/" },
        { english: "Sick leave", spanish: "Licencia por enfermedad", pronunciation: "/sɪk liːv/" },
        { english: "Resume", spanish: "Currículum", pronunciation: "/ˈrezjumeɪ/" },
        { english: "Interview", spanish: "Entrevista", pronunciation: "/ˈɪntəvjuː/" },
        { english: "Application", spanish: "Solicitud", pronunciation: "/ˌæplɪˈkeɪʃən/" },
        { english: "Contract", spanish: "Contrato", pronunciation: "/ˈkɒntrækt/" },
        { english: "Promotion", spanish: "Promoción", pronunciation: "/prəˈməʊʃən/" },
        { english: "Retirement", spanish: "Jubilación", pronunciation: "/rɪˈtaɪəmənt/" }
    ],
    health: [
        { english: "Health", spanish: "Salud", pronunciation: "/helθ/" },
        { english: "Sick", spanish: "Enfermo", pronunciation: "/sɪk/" },
        { english: "Ill", spanish: "Enfermo", pronunciation: "/ɪl/" },
        { english: "Well", spanish: "Bien", pronunciation: "/wel/" },
        { english: "Pain", spanish: "Dolor", pronunciation: "/peɪn/" },
        { english: "Headache", spanish: "Dolor de cabeza", pronunciation: "/ˈhedeɪk/" },
        { english: "Fever", spanish: "Fiebre", pronunciation: "/ˈfiːvər/" },
        { english: "Cough", spanish: "Tos", pronunciation: "/kɒf/" },
        { english: "Cold", spanish: "Resfriado", pronunciation: "/kəʊld/" },
        { english: "Flu", spanish: "Gripe", pronunciation: "/fluː/" },
        { english: "Sore throat", spanish: "Dolor de garganta", pronunciation: "/sɔː θrəʊt/" },
        { english: "Stomachache", spanish: "Dolor de estómago", pronunciation: "/ˈstʌməkeɪk/" },
        { english: "Backache", spanish: "Dolor de espalda", pronunciation: "/ˈbækeɪk/" },
        { english: "Toothache", spanish: "Dolor de muela", pronunciation: "/ˈtuːθeɪk/" },
        { english: "Injury", spanish: "Lesión", pronunciation: "/ˈɪndʒəri/" },
        { english: "Cut", spanish: "Corte", pronunciation: "/kʌt/" },
        { english: "Bruise", spanish: "Moretón", pronunciation: "/bruːz/" },
        { english: "Burn", spanish: "Quemadura", pronunciation: "/bɜːn/" },
        { english: "Broken bone", spanish: "Hueso roto", pronunciation: "/ˈbrəʊkən bəʊn/" },
        { english: "Sprain", spanish: "Esguince", pronunciation: "/spreɪn/" },
        { english: "Medicine", spanish: "Medicina", pronunciation: "/ˈmedsn/" },
        { english: "Pill", spanish: "Píldora", pronunciation: "/pɪl/" },
        { english: "Tablet", spanish: "Tableta", pronunciation: "/ˈtæblət/" },
        { english: "Syrup", spanish: "Jarabe", pronunciation: "/ˈsɪrəp/" },
        { english: "Bandage", spanish: "Vendaje", pronunciation: "/ˈbændɪdʒ/" },
        { english: "Band-aid", spanish: "Curita", pronunciation: "/ˈbændeɪd/" },
        { english: "Thermometer", spanish: "Termómetro", pronunciation: "/θəˈmɒmɪtər/" },
        { english: "Hospital", spanish: "Hospital", pronunciation: "/ˈhɒspɪtl/" },
        { english: "Doctor's office", spanish: "Consultorio médico", pronunciation: "/ˈdɒktəz ˈɒfɪs/" },
        { english: "Pharmacy", spanish: "Farmacia", pronunciation: "/ˈfɑːməsi/" },
        { english: "Dentist", spanish: "Dentista", pronunciation: "/ˈdentɪst/" },
        { english: "Surgeon", spanish: "Cirujano", pronunciation: "/ˈsɜːdʒən/" },
        { english: "Nurse", spanish: "Enfermera", pronunciation: "/nɜːs/" },
        { english: "Patient", spanish: "Paciente", pronunciation: "/ˈpeɪʃnt/" },
        { english: "Treatment", spanish: "Tratamiento", pronunciation: "/ˈtriːtmənt/" },
        { english: "Surgery", spanish: "Cirugía", pronunciation: "/ˈsɜːdʒəri/" },
        { english: "Recovery", spanish: "Recuperación", pronunciation: "/rɪˈkʌvəri/" },
        { english: "Exercise", spanish: "Ejercicio", pronunciation: "/ˈeksəsaɪz/" },
        { english: "Diet", spanish: "Dieta", pronunciation: "/ˈdaɪət/" },
        { english: "Sleep", spanish: "Sueño", pronunciation: "/sliːp/" },
        { english: "Rest", spanish: "Descanso", pronunciation: "/rest/" }
    ],
    technology: [
        { english: "Computer", spanish: "Computadora", pronunciation: "/kəmˈpjuːtər/" },
        { english: "Laptop", spanish: "Portátil", pronunciation: "/ˈlæptɒp/" },
        { english: "Desktop", spanish: "Computadora de escritorio", pronunciation: "/ˈdesktɒp/" },
        { english: "Tablet", spanish: "Tableta", pronunciation: "/ˈtæblət/" },
        { english: "Smartphone", spanish: "Teléfono inteligente", pronunciation: "/ˈsmɑːtfəʊn/" },
        { english: "Phone", spanish: "Teléfono", pronunciation: "/fəʊn/" },
        { english: "Mobile", spanish: "Móvil", pronunciation: "/ˈməʊbaɪl/" },
        { english: "Screen", spanish: "Pantalla", pronunciation: "/skriːn/" },
        { english: "Keyboard", spanish: "Teclado", pronunciation: "/ˈkiːbɔːd/" },
        { english: "Mouse", spanish: "Ratón", pronunciation: "/maʊs/" },
        { english: "Monitor", spanish: "Monitor", pronunciation: "/ˈmɒnɪtər/" },
        { english: "Printer", spanish: "Impresora", pronunciation: "/ˈprɪntər/" },
        { english: "Scanner", spanish: "Escáner", pronunciation: "/ˈskænər/" },
        { english: "Camera", spanish: "Cámara", pronunciation: "/ˈkæmərə/" },
        { english: "Microphone", spanish: "Micrófono", pronunciation: "/ˈmaɪkrəfəʊn/" },
        { english: "Speaker", spanish: "Altavoz", pronunciation: "/ˈspiːkər/" },
        { english: "Headphones", spanish: "Auriculares", pronunciation: "/ˈhedfəʊnz/" },
        { english: "Charger", spanish: "Cargador", pronunciation: "/ˈtʃɑːdʒər/" },
        { english: "Battery", spanish: "Batería", pronunciation: "/ˈbætəri/" },
        { english: "Cable", spanish: "Cable", pronunciation: "/ˈkeɪbl/" },
        { english: "USB", spanish: "USB", pronunciation: "/ˌjuː es ˈbiː/" },
        { english: "WiFi", spanish: "WiFi", pronunciation: "/ˈwaɪfaɪ/" },
        { english: "Internet", spanish: "Internet", pronunciation: "/ˈɪntənet/" },
        { english: "Website", spanish: "Sitio web", pronunciation: "/ˈwebsaɪt/" },
        { english: "App", spanish: "Aplicación", pronunciation: "/æp/" },
        { english: "Software", spanish: "Software", pronunciation: "/ˈsɒftweər/" },
        { english: "Program", spanish: "Programa", pronunciation: "/ˈprəʊɡræm/" },
        { english: "File", spanish: "Archivo", pronunciation: "/faɪl/" },
        { english: "Folder", spanish: "Carpeta", pronunciation: "/ˈfəʊldər/" },
        { english: "Email", spanish: "Correo electrónico", pronunciation: "/ˈiːmeɪl/" },
        { english: "Text message", spanish: "Mensaje de texto", pronunciation: "/tekst ˈmesɪdʒ/" },
        { english: "Social media", spanish: "Redes sociales", pronunciation: "/ˈsəʊʃl ˈmiːdiə/" },
        { english: "Password", spanish: "Contraseña", pronunciation: "/ˈpɑːswɜːd/" },
        { english: "Account", spanish: "Cuenta", pronunciation: "/əˈkaʊnt/" },
        { english: "Download", spanish: "Descargar", pronunciation: "/ˌdaʊnˈləʊd/" },
        { english: "Upload", spanish: "Subir", pronunciation: "/ˈʌpləʊd/" },
        { english: "Search", spanish: "Buscar", pronunciation: "/sɜːtʃ/" },
        { english: "Online", spanish: "En línea", pronunciation: "/ˈɒnlaɪn/" }
    ],
    sports: [
        { english: "Sports", spanish: "Deportes", pronunciation: "/spɔːts/" },
        { english: "Exercise", spanish: "Ejercicio", pronunciation: "/ˈeksəsaɪz/" },
        { english: "Football", spanish: "Fútbol", pronunciation: "/ˈfʊtbɔːl/" },
        { english: "Soccer", spanish: "Fútbol", pronunciation: "/ˈsɒkər/" },
        { english: "Basketball", spanish: "Baloncesto", pronunciation: "/ˈbɑːskɪtbɔːl/" },
        { english: "Baseball", spanish: "Béisbol", pronunciation: "/ˈbeɪsbɔːl/" },
        { english: "Tennis", spanish: "Tenis", pronunciation: "/ˈtenɪs/" },
        { english: "Volleyball", spanish: "Voleibol", pronunciation: "/ˈvɒlibɔːl/" },
        { english: "Swimming", spanish: "Natación", pronunciation: "/ˈswɪmɪŋ/" },
        { english: "Running", spanish: "Correr", pronunciation: "/ˈrʌnɪŋ/" },
        { english: "Cycling", spanish: "Ciclismo", pronunciation: "/ˈsaɪklɪŋ/" },
        { english: "Golf", spanish: "Golf", pronunciation: "/ɡɒlf/" },
        { english: "Hockey", spanish: "Hockey", pronunciation: "/ˈhɒki/" },
        { english: "Rugby", spanish: "Rugby", pronunciation: "/ˈrʌɡbi/" },
        { english: "Cricket", spanish: "Críquet", pronunciation: "/ˈkrɪkɪt/" },
        { english: "Boxing", spanish: "Boxeo", pronunciation: "/ˈbɒksɪŋ/" },
        { english: "Wrestling", spanish: "Lucha libre", pronunciation: "/ˈreslɪŋ/" },
        { english: "Martial arts", spanish: "Artes marciales", pronunciation: "/ˌmɑːʃl ˈɑːts/" },
        { english: "Karate", spanish: "Karate", pronunciation: "/kəˈrɑːti/" },
        { english: "Judo", spanish: "Judo", pronunciation: "/ˈdʒuːdəʊ/" },
        { english: "Taekwondo", spanish: "Taekwondo", pronunciation: "/taɪˈkwɒndəʊ/" },
        { english: "Gymnastics", spanish: "Gimnasia", pronunciation: "/dʒɪmˈnæstɪks/" },
        { english: "Dancing", spanish: "Baile", pronunciation: "/ˈdɑːnsɪŋ/" },
        { english: "Yoga", spanish: "Yoga", pronunciation: "/ˈjəʊɡə/" },
        { english: "Pilates", spanish: "Pilates", pronunciation: "/pɪˈlɑːtiːz/" },
        { english: "Weightlifting", spanish: "Levantamiento de pesas", pronunciation: "/ˈweɪtlɪftɪŋ/" },
        { english: "Fitness", spanish: "Fitness", pronunciation: "/ˈfɪtnəs/" },
        { english: "Gym", spanish: "Gimnasio", pronunciation: "/dʒɪm/" },
        { english: "Team", spanish: "Equipo", pronunciation: "/tiːm/" },
        { english: "Player", spanish: "Jugador", pronunciation: "/ˈpleɪər/" },
        { english: "Coach", spanish: "Entrenador", pronunciation: "/kəʊtʃ/" },
        { english: "Referee", spanish: "Árbitro", pronunciation: "/ˌrefəˈriː/" },
        { english: "Score", spanish: "Puntuación", pronunciation: "/skɔːr/" },
        { english: "Goal", spanish: "Gol", pronunciation: "/ɡəʊl/" },
        { english: "Win", spanish: "Ganar", pronunciation: "/wɪn/" },
        { english: "Lose", spanish: "Perder", pronunciation: "/luːz/" },
        { english: "Draw", spanish: "Empate", pronunciation: "/drɔː/" },
        { english: "Championship", spanish: "Campeonato", pronunciation: "/ˈtʃæmpiənʃɪp/" },
        { english: "Tournament", spanish: "Torneo", pronunciation: "/ˈtʊənəmənt/" },
        { english: "Medal", spanish: "Medalla", pronunciation: "/ˈmedl/" },
        { english: "Trophy", spanish: "Trofeo", pronunciation: "/ˈtrəʊfi/" }
    ],
    entertainment: [
        { english: "Music", spanish: "Música", pronunciation: "/ˈmjuːzɪk/" },
        { english: "Song", spanish: "Canción", pronunciation: "/sɒŋ/" },
        { english: "Singer", spanish: "Cantante", pronunciation: "/ˈsɪŋər/" },
        { english: "Band", spanish: "Banda", pronunciation: "/bænd/" },
        { english: "Concert", spanish: "Concierto", pronunciation: "/ˈkɒnsət/" },
        { english: "Guitar", spanish: "Guitarra", pronunciation: "/ɡɪˈtɑːr/" },
        { english: "Piano", spanish: "Piano", pronunciation: "/piˈænəʊ/" },
        { english: "Drums", spanish: "Batería", pronunciation: "/drʌmz/" },
        { english: "Violin", spanish: "Violín", pronunciation: "/ˌvaɪəˈlɪn/" },
        { english: "Flute", spanish: "Flauta", pronunciation: "/fluːt/" },
        { english: "Movie", spanish: "Película", pronunciation: "/ˈmuːvi/" },
        { english: "Film", spanish: "Película", pronunciation: "/fɪlm/" },
        { english: "Actor", spanish: "Actor", pronunciation: "/ˈæktər/" },
        { english: "Actress", spanish: "Actriz", pronunciation: "/ˈæktrəs/" },
        { english: "Director", spanish: "Director", pronunciation: "/daɪˈrektər/" },
        { english: "Theater", spanish: "Teatro", pronunciation: "/ˈθɪətər/" },
        { english: "Cinema", spanish: "Cine", pronunciation: "/ˈsɪnəmə/" },
        { english: "TV show", spanish: "Programa de TV", pronunciation: "/ˌtiː ˈviː ʃəʊ/" },
        { english: "Series", spanish: "Serie", pronunciation: "/ˈsɪəriːz/" },
        { english: "Episode", spanish: "Episodio", pronunciation: "/ˈepɪsəʊd/" },
        { english: "Channel", spanish: "Canal", pronunciation: "/ˈtʃænl/" },
        { english: "Remote control", spanish: "Control remoto", pronunciation: "/rɪˈməʊt kənˈtrəʊl/" },
        { english: "Book", spanish: "Libro", pronunciation: "/bʊk/" },
        { english: "Novel", spanish: "Novela", pronunciation: "/ˈnɒvl/" },
        { english: "Author", spanish: "Autor", pronunciation: "/ˈɔːθər/" },
        { english: "Writer", spanish: "Escritor", pronunciation: "/ˈraɪtər/" },
        { english: "Story", spanish: "Historia", pronunciation: "/ˈstɔːri/" },
        { english: "Chapter", spanish: "Capítulo", pronunciation: "/ˈtʃæptər/" },
        { english: "Page", spanish: "Página", pronunciation: "/peɪdʒ/" },
        { english: "Library", spanish: "Biblioteca", pronunciation: "/ˈlaɪbrəri/" },
        { english: "Magazine", spanish: "Revista", pronunciation: "/ˌmæɡəˈziːn/" },
        { english: "Newspaper", spanish: "Periódico", pronunciation: "/ˈnjuːzpeɪpər/" },
        { english: "Game", spanish: "Juego", pronunciation: "/ɡeɪm/" },
        { english: "Video game", spanish: "Videojuego", pronunciation: "/ˈvɪdiəʊ ɡeɪm/" },
        { english: "Player", spanish: "Jugador", pronunciation: "/ˈpleɪər/" },
        { english: "Level", spanish: "Nivel", pronunciation: "/ˈlevl/" },
        { english: "Score", spanish: "Puntuación", pronunciation: "/skɔːr/" },
        { english: "Hobby", spanish: "Pasatiempo", pronunciation: "/ˈhɒbi/" },
        { english: "Collection", spanish: "Colección", pronunciation: "/kəˈlekʃən/" },
        { english: "Photography", spanish: "Fotografía", pronunciation: "/fəˈtɒɡrəfi/" },
        { english: "Camera", spanish: "Cámara", pronunciation: "/ˈkæmərə/" },
        { english: "Photo", spanish: "Foto", pronunciation: "/ˈfəʊtəʊ/" },
        { english: "Picture", spanish: "Imagen", pronunciation: "/ˈpɪktʃər/" },
        { english: "Art", spanish: "Arte", pronunciation: "/ɑːt/" },
        { english: "Painting", spanish: "Pintura", pronunciation: "/ˈpeɪntɪŋ/" },
        { english: "Drawing", spanish: "Dibujo", pronunciation: "/ˈdrɔːɪŋ/" },
        { english: "Museum", spanish: "Museo", pronunciation: "/mjuːˈziːəm/" }
    ],
    business: [
        { english: "Business", spanish: "Negocio", pronunciation: "/ˈbɪznəs/" },
        { english: "Company", spanish: "Empresa", pronunciation: "/ˈkʌmpəni/" },
        { english: "Corporation", spanish: "Corporación", pronunciation: "/ˌkɔːpəˈreɪʃən/" },
        { english: "Office", spanish: "Oficina", pronunciation: "/ˈɒfɪs/" },
        { english: "Meeting", spanish: "Reunión", pronunciation: "/ˈmiːtɪŋ/" },
        { english: "Conference", spanish: "Conferencia", pronunciation: "/ˈkɒnfərəns/" },
        { english: "Presentation", spanish: "Presentación", pronunciation: "/ˌpreznˈteɪʃən/" },
        { english: "Project", spanish: "Proyecto", pronunciation: "/ˈprɒdʒekt/" },
        { english: "Plan", spanish: "Plan", pronunciation: "/plæn/" },
        { english: "Strategy", spanish: "Estrategia", pronunciation: "/ˈstrætədʒi/" },
        { english: "Goal", spanish: "Meta", pronunciation: "/ɡəʊl/" },
        { english: "Target", spanish: "Objetivo", pronunciation: "/ˈtɑːɡɪt/" },
        { english: "Deadline", spanish: "Fecha límite", pronunciation: "/ˈdedlaɪn/" },
        { english: "Budget", spanish: "Presupuesto", pronunciation: "/ˈbʌdʒɪt/" },
        { english: "Cost", spanish: "Costo", pronunciation: "/kɒst/" },
        { english: "Price", spanish: "Precio", pronunciation: "/praɪs/" },
        { english: "Expense", spanish: "Gasto", pronunciation: "/ɪkˈspens/" },
        { english: "Income", spanish: "Ingreso", pronunciation: "/ˈɪnkʌm/" },
        { english: "Profit", spanish: "Beneficio", pronunciation: "/ˈprɒfɪt/" },
        { english: "Loss", spanish: "Pérdida", pronunciation: "/lɒs/" },
        { english: "Investment", spanish: "Inversión", pronunciation: "/ɪnˈvestmənt/" },
        { english: "Stock", spanish: "Acción", pronunciation: "/stɒk/" },
        { english: "Market", spanish: "Mercado", pronunciation: "/ˈmɑːkɪt/" },
        { english: "Customer", spanish: "Cliente", pronunciation: "/ˈkʌstəmər/" },
        { english: "Client", spanish: "Cliente", pronunciation: "/klaɪənt/" },
        { english: "Service", spanish: "Servicio", pronunciation: "/ˈsɜːvɪs/" },
        { english: "Product", spanish: "Producto", pronunciation: "/ˈprɒdʌkt/" },
        { english: "Quality", spanish: "Calidad", pronunciation: "/ˈkwɒləti/" },
        { english: "Brand", spanish: "Marca", pronunciation: "/brænd/" },
        { english: "Advertising", spanish: "Publicidad", pronunciation: "/ˈædvətaɪzɪŋ/" },
        { english: "Marketing", spanish: "Mercadotecnia", pronunciation: "/ˈmɑːkɪtɪŋ/" },
        { english: "Sales", spanish: "Ventas", pronunciation: "/seɪlz/" },
        { english: "Revenue", spanish: "Ingresos", pronunciation: "/ˈrevənjuː/" },
        { english: "Tax", spanish: "Impuesto", pronunciation: "/tæks/" },
        { english: "Insurance", spanish: "Seguro", pronunciation: "/ɪnˈʃʊərəns/" },
        { english: "Loan", spanish: "Préstamo", pronunciation: "/ləʊn/" },
        { english: "Credit", spanish: "Crédito", pronunciation: "/ˈkredɪt/" },
        { english: "Debt", spanish: "Deuda", pronunciation: "/det/" },
        { english: "Bank", spanish: "Banco", pronunciation: "/bæŋk/" },
        { english: "Account", spanish: "Cuenta", pronunciation: "/əˈkaʊnt/" },
        { english: "Check", spanish: "Cheque", pronunciation: "/tʃek/" },
        { english: "Credit card", spanish: "Tarjeta de crédito", pronunciation: "/ˈkredɪt kɑːd/" },
        { english: "Cash", spanish: "Efectivo", pronunciation: "/kæʃ/" }
    ],
    politics: [
        { english: "Politics", spanish: "Política", pronunciation: "/ˈpɒlətɪks/" },
        { english: "Government", spanish: "Gobierno", pronunciation: "/ˈɡʌvənmənt/" },
        { english: "President", spanish: "Presidente", pronunciation: "/ˈprezɪdənt/" },
        { english: "Prime Minister", spanish: "Primer Ministro", pronunciation: "/ˌpraɪm ˈmɪnɪstər/" },
        { english: "Minister", spanish: "Ministro", pronunciation: "/ˈmɪnɪstər/" },
        { english: "Senator", spanish: "Senador", pronunciation: "/ˈsenətər/" },
        { english: "Representative", spanish: "Representante", pronunciation: "/ˌreprɪˈzentətɪv/" },
        { english: "Mayor", spanish: "Alcalde", pronunciation: "/meər/" },
        { english: "Governor", spanish: "Gobernador", pronunciation: "/ˈɡʌvənər/" },
        { english: "Election", spanish: "Elección", pronunciation: "/ɪˈlekʃən/" },
        { english: "Vote", spanish: "Voto", pronunciation: "/vəʊt/" },
        { english: "Voter", spanish: "Votante", pronunciation: "/ˈvəʊtər/" },
        { english: "Campaign", spanish: "Campaña", pronunciation: "/kæmˈpeɪn/" },
        { english: "Political party", spanish: "Partido político", pronunciation: "/pəˈlɪtɪkl ˈpɑːti/" },
        { english: "Democracy", spanish: "Democracia", pronunciation: "/dɪˈmɒkrəsi/" },
        { english: "Republic", spanish: "República", pronunciation: "/rɪˈpʌblɪk/" },
        { english: "Monarchy", spanish: "Monarquía", pronunciation: "/ˈmɒnəki/" },
        { english: "Dictatorship", spanish: "Dictadura", pronunciation: "/dɪkˈteɪtəʃɪp/" },
        { english: "Law", spanish: "Ley", pronunciation: "/lɔː/" },
        { english: "Constitution", spanish: "Constitución", pronunciation: "/ˌkɒnstɪˈtjuːʃən/" },
        { english: "Rights", spanish: "Derechos", pronunciation: "/raɪts/" },
        { english: "Freedom", spanish: "Libertad", pronunciation: "/ˈfriːdəm/" },
        { english: "Justice", spanish: "Justicia", pronunciation: "/ˈdʒʌstɪs/" },
        { english: "Court", spanish: "Tribunal", pronunciation: "/kɔːt/" },
        { english: "Judge", spanish: "Juez", pronunciation: "/dʒʌdʒ/" },
        { english: "Lawyer", spanish: "Abogado", pronunciation: "/ˈlɔːjər/" },
        { english: "Police", spanish: "Policía", pronunciation: "/pəˈliːs/" },
        { english: "Army", spanish: "Ejército", pronunciation: "/ˈɑːmi/" },
        { english: "Navy", spanish: "Marina", pronunciation: "/ˈneɪvi/" },
        { english: "Air Force", spanish: "Fuerza Aérea", pronunciation: "/eə fɔːs/" },
        { english: "War", spanish: "Guerra", pronunciation: "/wɔːr/" },
        { english: "Peace", spanish: "Paz", pronunciation: "/piːs/" },
        { english: "Treaty", spanish: "Tratado", pronunciation: "/ˈtriːti/" },
        { english: "Alliance", spanish: "Alianza", pronunciation: "/əˈlaɪəns/" },
        { english: "Diplomacy", spanish: "Diplomacia", pronunciation: "/dɪˈpləʊməsi/" },
        { english: "Embassy", spanish: "Embajada", pronunciation: "/ˈembəsi/" },
        { english: "Consulate", spanish: "Consulado", pronunciation: "/ˈkɒnsjələt/" }
    ],
    science: [
        { english: "Science", spanish: "Ciencia", pronunciation: "/ˈsaɪəns/" },
        { english: "Physics", spanish: "Física", pronunciation: "/ˈfɪzɪks/" },
        { english: "Chemistry", spanish: "Química", pronunciation: "/ˈkemɪstri/" },
        { english: "Biology", spanish: "Biología", pronunciation: "/baɪˈɒlədʒi/" },
        { english: "Mathematics", spanish: "Matemáticas", pronunciation: "/ˌmæθəˈmætɪks/" },
        { english: "Astronomy", spanish: "Astronomía", pronunciation: "/əˈstrɒnəmi/" },
        { english: "Geology", spanish: "Geología", pronunciation: "/dʒiˈɒlədʒi/" },
        { english: "Psychology", spanish: "Psicología", pronunciation: "/saɪˈkɒlədʒi/" },
        { english: "Medicine", spanish: "Medicina", pronunciation: "/ˈmedsn/" },
        { english: "Engineering", spanish: "Ingeniería", pronunciation: "/ˌendʒɪˈnɪərɪŋ/" },
        { english: "Technology", spanish: "Tecnología", pronunciation: "/tekˈnɒlədʒi/" },
        { english: "Research", spanish: "Investigación", pronunciation: "/rɪˈsɜːtʃ/" },
        { english: "Experiment", spanish: "Experimento", pronunciation: "/ɪkˈsperɪmənt/" },
        { english: "Laboratory", spanish: "Laboratorio", pronunciation: "/ləˈbɒrətri/" },
        { english: "Microscope", spanish: "Microscopio", pronunciation: "/ˈmaɪkrəskəʊp/" },
        { english: "Telescope", spanish: "Telescopio", pronunciation: "/ˈtelɪskəʊp/" },
        { english: "Test tube", spanish: "Tubo de ensayo", pronunciation: "/test tjuːb/" },
        { english: "Beaker", spanish: "Vaso de precipitados", pronunciation: "/ˈbiːkər/" },
        { english: "Flask", spanish: "Matraz", pronunciation: "/flɑːsk/" },
        { english: "Bunsen burner", spanish: "Mechero Bunsen", pronunciation: "/ˈbʌnsn ˈbɜːnər/" },
        { english: "Atom", spanish: "Átomo", pronunciation: "/ˈætəm/" },
        { english: "Molecule", spanish: "Molécula", pronunciation: "/ˈmɒlɪkjuːl/" },
        { english: "Cell", spanish: "Célula", pronunciation: "/sel/" },
        { english: "DNA", spanish: "ADN", pronunciation: "/ˌdiː en ˈeɪ/" },
        { english: "Gene", spanish: "Gen", pronunciation: "/dʒiːn/" },
        { english: "Evolution", spanish: "Evolución", pronunciation: "/ˌiːvəˈluːʃən/" },
        { english: "Species", spanish: "Especie", pronunciation: "/ˈspiːʃiːz/" },
        { english: "Ecosystem", spanish: "Ecosistema", pronunciation: "/ˈiːkəʊsɪstəm/" },
        { english: "Environment", spanish: "Medio ambiente", pronunciation: "/ɪnˈvaɪrənmənt/" },
        { english: "Climate", spanish: "Clima", pronunciation: "/ˈklaɪmət/" },
        { english: "Pollution", spanish: "Contaminación", pronunciation: "/pəˈluːʃən/" },
        { english: "Recycling", spanish: "Reciclaje", pronunciation: "/ˌriːˈsaɪklɪŋ/" },
        { english: "Conservation", spanish: "Conservación", pronunciation: "/ˌkɒnsəˈveɪʃən/" },
        { english: "Solar system", spanish: "Sistema solar", pronunciation: "/ˈsəʊlə ˈsɪstəm/" },
        { english: "Planet", spanish: "Planeta", pronunciation: "/ˈplænɪt/" },
        { english: "Star", spanish: "Estrella", pronunciation: "/stɑːr/" },
        { english: "Galaxy", spanish: "Galaxia", pronunciation: "/ˈɡæləksi/" },
        { english: "Universe", spanish: "Universo", pronunciation: "/ˈjuːnɪvɜːs/" },
        { english: "Gravity", spanish: "Gravedad", pronunciation: "/ˈɡrævəti/" },
        { english: "Energy", spanish: "Energía", pronunciation: "/ˈenədʒi/" },
        { english: "Force", spanish: "Fuerza", pronunciation: "/fɔːs/" },
        { english: "Matter", spanish: "Materia", pronunciation: "/ˈmætər/" }
    ],
    art: [
        { english: "Art", spanish: "Arte", pronunciation: "/ɑːt/" },
        { english: "Painting", spanish: "Pintura", pronunciation: "/ˈpeɪntɪŋ/" },
        { english: "Drawing", spanish: "Dibujo", pronunciation: "/ˈdrɔːɪŋ/" },
        { english: "Sculpture", spanish: "Escultura", pronunciation: "/ˈskʌlptʃər/" },
        { english: "Photography", spanish: "Fotografía", pronunciation: "/fəˈtɒɡrəfi/" },
        { english: "Music", spanish: "Música", pronunciation: "/ˈmjuːzɪk/" },
        { english: "Dance", spanish: "Baile", pronunciation: "/dɑːns/" },
        { english: "Theater", spanish: "Teatro", pronunciation: "/ˈθɪətər/" },
        { english: "Film", spanish: "Cine", pronunciation: "/fɪlm/" },
        { english: "Literature", spanish: "Literatura", pronunciation: "/ˈlɪtrətʃər/" },
        { english: "Poetry", spanish: "Poesía", pronunciation: "/ˈpəʊətri/" },
        { english: "Novel", spanish: "Novela", pronunciation: "/ˈnɒvl/" },
        { english: "Poem", spanish: "Poema", pronunciation: "/ˈpəʊɪm/" },
        { english: "Story", spanish: "Historia", pronunciation: "/ˈstɔːri/" },
        { english: "Artist", spanish: "Artista", pronunciation: "/ˈɑːtɪst/" },
        { english: "Painter", spanish: "Pintor", pronunciation: "/ˈpeɪntər/" },
        { english: "Sculptor", spanish: "Escultor", pronunciation: "/ˈskʌlptər/" },
        { english: "Photographer", spanish: "Fotógrafo", pronunciation: "/fəˈtɒɡrəfər/" },
        { english: "Musician", spanish: "Músico", pronunciation: "/mjuːˈzɪʃən/" },
        { english: "Dancer", spanish: "Bailarín", pronunciation: "/ˈdɑːnsər/" },
        { english: "Actor", spanish: "Actor", pronunciation: "/ˈæktər/" },
        { english: "Writer", spanish: "Escritor", pronunciation: "/ˈraɪtər/" },
        { english: "Poet", spanish: "Poeta", pronunciation: "/ˈpəʊɪt/" },
        { english: "Museum", spanish: "Museo", pronunciation: "/mjuːˈziːəm/" },
        { english: "Gallery", spanish: "Galería", pronunciation: "/ˈɡæləri/" },
        { english: "Exhibition", spanish: "Exposición", pronunciation: "/ˌeksɪˈbɪʃən/" },
        { english: "Performance", spanish: "Presentación", pronunciation: "/pəˈfɔːməns/" },
        { english: "Concert", spanish: "Concierto", pronunciation: "/ˈkɒnsət/" },
        { english: "Opera", spanish: "Ópera", pronunciation: "/ˈɒprə/" },
        { english: "Ballet", spanish: "Ballet", pronunciation: "/ˈbæleɪ/" },
        { english: "Jazz", spanish: "Jazz", pronunciation: "/dʒæz/" },
        { english: "Rock", spanish: "Rock", pronunciation: "/rɒk/" },
        { english: "Classical", spanish: "Clásico", pronunciation: "/ˈklæsɪkl/" },
        { english: "Folk", spanish: "Folclórico", pronunciation: "/fəʊk/" },
        { english: "Pop", spanish: "Pop", pronunciation: "/pɒp/" },
        { english: "Country", spanish: "Country", pronunciation: "/ˈkʌntri/" },
        { english: "Blues", spanish: "Blues", pronunciation: "/bluːz/" },
        { english: "Hip hop", spanish: "Hip hop", pronunciation: "/ˈhɪp hɒp/" },
        { english: "Electronic", spanish: "Electrónica", pronunciation: "/ɪˌlekˈtrɒnɪk/" }
    ],
    emotions: [
        { english: "Happy", spanish: "Feliz", pronunciation: "/ˈhæpi/" },
        { english: "Sad", spanish: "Triste", pronunciation: "/sæd/" },
        { english: "Angry", spanish: "Enojado", pronunciation: "/ˈæŋɡri/" },
        { english: "Excited", spanish: "Emocionado", pronunciation: "/ɪkˈsaɪtɪd/" },
        { english: "Scared", spanish: "Asustado", pronunciation: "/skeəd/" },
        { english: "Surprised", spanish: "Sorprendido", pronunciation: "/səˈpraɪzd/" },
        { english: "Confused", spanish: "Confundido", pronunciation: "/kənˈfjuːzd/" },
        { english: "Proud", spanish: "Orgulloso", pronunciation: "/praʊd/" },
        { english: "Embarrassed", spanish: "Avergonzado", pronunciation: "/ɪmˈbærəst/" },
        { english: "Jealous", spanish: "Celoso", pronunciation: "/ˈdʒeləs/" },
        { english: "Worried", spanish: "Preocupado", pronunciation: "/ˈwʌrid/" },
        { english: "Nervous", spanish: "Nervioso", pronunciation: "/ˈnɜːvəs/" },
        { english: "Calm", spanish: "Tranquilo", pronunciation: "/kɑːm/" },
        { english: "Relaxed", spanish: "Relajado", pronunciation: "/rɪˈlækst/" },
        { english: "Tired", spanish: "Cansado", pronunciation: "/ˈtaɪəd/" },
        { english: "Energetic", spanish: "Energético", pronunciation: "/ˌenəˈdʒetɪk/" },
        { english: "Bored", spanish: "Aburrido", pronunciation: "/bɔːd/" },
        { english: "Interested", spanish: "Interesado", pronunciation: "/ˈɪntrəstɪd/" },
        { english: "Curious", spanish: "Curioso", pronunciation: "/ˈkjʊəriəs/" },
        { english: "Confident", spanish: "Seguro", pronunciation: "/ˈkɒnfɪdənt/" },
        { english: "Shy", spanish: "Tímido", pronunciation: "/ʃaɪ/" },
        { english: "Brave", spanish: "Valiente", pronunciation: "/breɪv/" },
        { english: "Afraid", spanish: "Miedoso", pronunciation: "/əˈfreɪd/" },
        { english: "Lonely", spanish: "Solitario", pronunciation: "/ˈləʊnli/" },
        { english: "Loved", spanish: "Amado", pronunciation: "/lʌvd/" },
        { english: "Hated", spanish: "Odiado", pronunciation: "/ˈheɪtɪd/" },
        { english: "Grateful", spanish: "Agradecido", pronunciation: "/ˈɡreɪtfl/" },
        { english: "Hopeful", spanish: "Esperanzado", pronunciation: "/ˈhəʊpfl/" },
        { english: "Disappointed", spanish: "Decepcionado", pronunciation: "/ˌdɪsəˈpɔɪntɪd/" },
        { english: "Satisfied", spanish: "Satisfecho", pronunciation: "/ˈsætɪsfaɪd/" },
        { english: "Frustrated", spanish: "Frustrado", pronunciation: "/frʌˈstreɪtɪd/" }
    ],
    time: [
        { english: "Time", spanish: "Tiempo", pronunciation: "/taɪm/" },
        { english: "Hour", spanish: "Hora", pronunciation: "/ˈaʊər/" },
        { english: "Minute", spanish: "Minuto", pronunciation: "/ˈmɪnɪt/" },
        { english: "Second", spanish: "Segundo", pronunciation: "/ˈsekənd/" },
        { english: "Clock", spanish: "Reloj", pronunciation: "/klɒk/" },
        { english: "Watch", spanish: "Reloj", pronunciation: "/wɒtʃ/" },
        { english: "Morning", spanish: "Mañana", pronunciation: "/ˈmɔːnɪŋ/" },
        { english: "Afternoon", spanish: "Tarde", pronunciation: "/ˌɑːftəˈnuːn/" },
        { english: "Evening", spanish: "Noche", pronunciation: "/ˈiːvnɪŋ/" },
        { english: "Night", spanish: "Noche", pronunciation: "/naɪt/" },
        { english: "Midnight", spanish: "Medianoche", pronunciation: "/ˈmɪdnaɪt/" },
        { english: "Noon", spanish: "Mediodía", pronunciation: "/nuːn/" },
        { english: "Dawn", spanish: "Amanecer", pronunciation: "/dɔːn/" },
        { english: "Sunset", spanish: "Atardecer", pronunciation: "/ˈsʌnset/" },
        { english: "Today", spanish: "Hoy", pronunciation: "/təˈdeɪ/" },
        { english: "Yesterday", spanish: "Ayer", pronunciation: "/ˈjestədeɪ/" },
        { english: "Tomorrow", spanish: "Mañana", pronunciation: "/təˈmɒrəʊ/" },
        { english: "Week", spanish: "Semana", pronunciation: "/wiːk/" },
        { english: "Month", spanish: "Mes", pronunciation: "/mʌnθ/" },
        { english: "Year", spanish: "Año", pronunciation: "/jɪər/" },
        { english: "Decade", spanish: "Década", pronunciation: "/ˈdekeɪd/" },
        { english: "Century", spanish: "Siglo", pronunciation: "/ˈsentʃəri/" },
        { english: "Season", spanish: "Estación", pronunciation: "/ˈsiːzn/" },
        { english: "Spring", spanish: "Primavera", pronunciation: "/sprɪŋ/" },
        { english: "Summer", spanish: "Verano", pronunciation: "/ˈsʌmər/" },
        { english: "Autumn", spanish: "Otoño", pronunciation: "/ˈɔːtəm/" },
        { english: "Winter", spanish: "Invierno", pronunciation: "/ˈwɪntər/" },
        { english: "January", spanish: "Enero", pronunciation: "/ˈdʒænjueri/" },
        { english: "February", spanish: "Febrero", pronunciation: "/ˈfebrueri/" },
        { english: "March", spanish: "Marzo", pronunciation: "/mɑːtʃ/" },
        { english: "April", spanish: "Abril", pronunciation: "/ˈeɪprəl/" },
        { english: "May", spanish: "Mayo", pronunciation: "/meɪ/" },
        { english: "June", spanish: "Junio", pronunciation: "/dʒuːn/" },
        { english: "July", spanish: "Julio", pronunciation: "/dʒuˈlaɪ/" },
        { english: "August", spanish: "Agosto", pronunciation: "/ˈɔːɡəst/" },
        { english: "September", spanish: "Septiembre", pronunciation: "/sepˈtembər/" },
        { english: "October", spanish: "Octubre", pronunciation: "/ɒkˈtəʊbər/" },
        { english: "November", spanish: "Noviembre", pronunciation: "/nəʊˈvembər/" },
        { english: "December", spanish: "Diciembre", pronunciation: "/dɪˈsembər/" },
        { english: "Monday", spanish: "Lunes", pronunciation: "/ˈmʌndeɪ/" },
        { english: "Tuesday", spanish: "Martes", pronunciation: "/ˈtjuːzdeɪ/" },
        { english: "Wednesday", spanish: "Miércoles", pronunciation: "/ˈwenzdeɪ/" },
        { english: "Thursday", spanish: "Jueves", pronunciation: "/ˈθɜːzdeɪ/" },
        { english: "Friday", spanish: "Viernes", pronunciation: "/ˈfraɪdeɪ/" },
        { english: "Saturday", spanish: "Sábado", pronunciation: "/ˈsætədeɪ/" },
        { english: "Sunday", spanish: "Domingo", pronunciation: "/ˈsʌndeɪ/" },
        { english: "Weekend", spanish: "Fin de semana", pronunciation: "/ˌwiːkˈend/" },
        { english: "Holiday", spanish: "Vacaciones", pronunciation: "/ˈhɒlɪdeɪ/" },
        { english: "Birthday", spanish: "Cumpleaños", pronunciation: "/ˈbɜːθdeɪ/" },
        { english: "Anniversary", spanish: "Aniversario", pronunciation: "/ˌænɪˈvɜːsəri/" },
        { english: "Schedule", spanish: "Horario", pronunciation: "/ˈʃedjuːl/" },
        { english: "Appointment", spanish: "Cita", pronunciation: "/əˈpɔɪntmənt/" },
        { english: "Deadline", spanish: "Fecha límite", pronunciation: "/ˈdedlaɪn/" },
        { english: "Past", spanish: "Pasado", pronunciation: "/pɑːst/" },
        { english: "Present", spanish: "Presente", pronunciation: "/ˈpreznt/" },
        { english: "Future", spanish: "Futuro", pronunciation: "/ˈfjuːtʃər/" }
    ],
    shopping: [
        { english: "Shopping", spanish: "Compras", pronunciation: "/ˈʃɒpɪŋ/" },
        { english: "Store", spanish: "Tienda", pronunciation: "/stɔːr/" },
        { english: "Shop", spanish: "Tienda", pronunciation: "/ʃɒp/" },
        { english: "Mall", spanish: "Centro comercial", pronunciation: "/mɔːl/" },
        { english: "Market", spanish: "Mercado", pronunciation: "/ˈmɑːkɪt/" },
        { english: "Supermarket", spanish: "Supermercado", pronunciation: "/ˈsuːpəmɑːkɪt/" },
        { english: "Department store", spanish: "Tienda por departamentos", pronunciation: "/dɪˈpɑːtmənt stɔːr/" },
        { english: "Boutique", spanish: "Boutique", pronunciation: "/buːˈtiːk/" },
        { english: "Pharmacy", spanish: "Farmacia", pronunciation: "/ˈfɑːməsi/" },
        { english: "Bakery", spanish: "Panadería", pronunciation: "/ˈbeɪkəri/" },
        { english: "Butcher", spanish: "Carnicería", pronunciation: "/ˈbʊtʃər/" },
        { english: "Fishmonger", spanish: "Pescadería", pronunciation: "/ˈfɪʃmʌŋɡər/" },
        { english: "Greengrocer", spanish: "Verdulería", pronunciation: "/ˈɡriːnɡrəʊsər/" },
        { english: "Hardware store", spanish: "Ferretería", pronunciation: "/ˈhɑːdweə stɔːr/" },
        { english: "Bookstore", spanish: "Librería", pronunciation: "/ˈbʊkstɔːr/" },
        { english: "Shoe store", spanish: "Zapatería", pronunciation: "/ˈʃuː stɔːr/" },
        { english: "Jewelry store", spanish: "Joyería", pronunciation: "/ˈdʒuːəlri stɔːr/" },
        { english: "Gift shop", spanish: "Tienda de regalos", pronunciation: "/ˈɡɪft ʃɒp/" },
        { english: "Convenience store", spanish: "Tienda de conveniencia", pronunciation: "/kənˈviːniəns stɔːr/" },
        { english: "Online shopping", spanish: "Compras en línea", pronunciation: "/ˌɒnlaɪn ˈʃɒpɪŋ/" },
        { english: "Cashier", spanish: "Cajero", pronunciation: "/kæˈʃɪər/" },
        { english: "Salesperson", spanish: "Vendedor", pronunciation: "/ˈseɪlzpɜːsn/" },
        { english: "Customer", spanish: "Cliente", pronunciation: "/ˈkʌstəmər/" },
        { english: "Price", spanish: "Precio", pronunciation: "/praɪs/" },
        { english: "Cost", spanish: "Costo", pronunciation: "/kɒst/" },
        { english: "Sale", spanish: "Rebaja", pronunciation: "/seɪl/" },
        { english: "Discount", spanish: "Descuento", pronunciation: "/ˈdɪskaʊnt/" },
        { english: "Coupon", spanish: "Cupón", pronunciation: "/ˈkuːpɒn/" },
        { english: "Receipt", spanish: "Recibo", pronunciation: "/rɪˈsiːt/" },
        { english: "Change", spanish: "Cambio", pronunciation: "/tʃeɪndʒ/" },
        { english: "Cash", spanish: "Efectivo", pronunciation: "/kæʃ/" },
        { english: "Credit card", spanish: "Tarjeta de crédito", pronunciation: "/ˈkredɪt kɑːd/" },
        { english: "Debit card", spanish: "Tarjeta de débito", pronunciation: "/ˈdebɪt kɑːd/" },
        { english: "Check", spanish: "Cheque", pronunciation: "/tʃek/" },
        { english: "Money", spanish: "Dinero", pronunciation: "/ˈmʌni/" },
        { english: "Bill", spanish: "Factura", pronunciation: "/bɪl/" },
        { english: "Invoice", spanish: "Factura", pronunciation: "/ˈɪnvɔɪs/" },
        { english: "Warranty", spanish: "Garantía", pronunciation: "/ˈwɒrənti/" },
        { english: "Return", spanish: "Devolución", pronunciation: "/rɪˈtɜːn/" },
        { english: "Exchange", spanish: "Cambio", pronunciation: "/ɪksˈtʃeɪndʒ/" },
        { english: "Refund", spanish: "Reembolso", pronunciation: "/ˈriːfʌnd/" },
        { english: "Size", spanish: "Talla", pronunciation: "/saɪz/" },
        { english: "Color", spanish: "Color", pronunciation: "/ˈkʌlər/" },
        { english: "Brand", spanish: "Marca", pronunciation: "/brænd/" },
        { english: "Quality", spanish: "Calidad", pronunciation: "/ˈkwɒləti/" }
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
        
        if (typeof LESSON_EXERCISES !== 'undefined') {
            console.log("🎯 Ejercicios por lección disponibles:", Object.keys(LESSON_EXERCISES).length);
        }
        
        if (typeof LESSON_CONVERSATIONS !== 'undefined') {
            console.log("💬 Conversaciones por lección disponibles:", Object.keys(LESSON_CONVERSATIONS).length);
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
window.LESSON_EXERCISES = LESSON_EXERCISES;
window.LESSON_CONVERSATIONS = LESSON_CONVERSATIONS;
window.GRAMMAR_POOLS = GRAMMAR_POOLS;
window.LEVEL_SYSTEM = LEVEL_SYSTEM;
window.appState = appState;
window.currentListeningAudio = currentListeningAudio;
window.listeningAudioSpeed = listeningAudioSpeed;
// selectedListeningAnswer se declara en practice.js
window.VOCABULARY_CATEGORIES = VOCABULARY_CATEGORIES;
window.VOCABULARY_DATABASE = VOCABULARY_DATABASE;
window.initData = initData;
