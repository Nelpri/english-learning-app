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

// Variables globales para práctica
let practiceStreak = 0;
let practiceLessonIndex = 0; // Índice de la lección actual dentro de las permitidas



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
                { english: "I'm fine, thank you", spanish: "Estoy bien, gracias", pronunciation: "aɪm faɪn θæŋk ju" },
                { english: "Good night", spanish: "Buenas noches (al despedirse)", pronunciation: "ɡʊd naɪt" },
                { english: "See you later", spanish: "Hasta luego", pronunciation: "siː juː ˈleɪtər" },
                { english: "How's it going?", spanish: "¿Cómo va todo?", pronunciation: "haʊz ɪt ˈɡoʊɪŋ" },
                { english: "Nice to see you", spanish: "Me alegra verte", pronunciation: "naɪs tə siː juː" },
                { english: "What's up?", spanish: "¿Qué tal?", pronunciation: "wʌts ʌp" },
                { english: "Long time no see", spanish: "Cuánto tiempo sin verte", pronunciation: "lɔːŋ taɪm noʊ siː" }
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
                { english: "Green", spanish: "Verde", pronunciation: "ɡrin" },
                { english: "Four", spanish: "Cuatro", pronunciation: "fɔːr" },
                { english: "Five", spanish: "Cinco", pronunciation: "faɪv" },
                { english: "Yellow", spanish: "Amarillo", pronunciation: "ˈjɛloʊ" },
                { english: "Black", spanish: "Negro", pronunciation: "blæk" },
                { english: "White", spanish: "Blanco", pronunciation: "waɪt" },
                { english: "How many?", spanish: "¿Cuántos?", pronunciation: "haʊ ˈmɛni" },
                { english: "What color is it?", spanish: "¿De qué color es?", pronunciation: "wʌt ˈkʌlər ɪz ɪt" }
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
                { english: "Engineer", spanish: "Ingeniero", pronunciation: "ˌendʒɪˈnɪr" },
                { english: "Son", spanish: "Hijo", pronunciation: "sʌn" },
                { english: "Daughter", spanish: "Hija", pronunciation: "ˈdɔːtər" },
                { english: "Grandmother", spanish: "Abuela", pronunciation: "ˈɡrænˌmʌðər" },
                { english: "Grandfather", spanish: "Abuelo", pronunciation: "ˈɡrænˌfɑːðər" },
                { english: "Nurse", spanish: "Enfermero/a", pronunciation: "nɜːrs" },
                { english: "Lawyer", spanish: "Abogado/a", pronunciation: "ˈlɔɪər" },
                { english: "What do you do?", spanish: "¿A qué te dedicas?", pronunciation: "wʌt duː juː duː" },
                { english: "I am a student", spanish: "Soy estudiante", pronunciation: "aɪ æm ə ˈstuːdənt" }
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
                { english: "Restaurant", spanish: "Restaurante", pronunciation: "ˈrɛstərɑnt" },
                { english: "Juice", spanish: "Jugo", pronunciation: "dʒuːs" },
                { english: "Egg", spanish: "Huevo", pronunciation: "ɛɡ" },
                { english: "Cheese", spanish: "Queso", pronunciation: "tʃiːz" },
                { english: "Chicken", spanish: "Pollo", pronunciation: "ˈtʃɪkɪn" },
                { english: "Fish", spanish: "Pescado", pronunciation: "fɪʃ" },
                { english: "Vegetables", spanish: "Verduras", pronunciation: "ˈvɛdʒtəblz" },
                { english: "I'm hungry", spanish: "Tengo hambre", pronunciation: "aɪm ˈhʌŋɡri" },
                { english: "I'd like some water", spanish: "Quisiera un poco de agua", pronunciation: "aɪd laɪk sʌm ˈwɔtər" }
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
                { english: "Birthday", spanish: "Cumpleaños", pronunciation: "ˈbɜrθdeɪ" },
                { english: "Day", spanish: "Día", pronunciation: "deɪ" },
                { english: "Hour", spanish: "Hora", pronunciation: "ˈaʊər" },
                { english: "Minute", spanish: "Minuto", pronunciation: "ˈmɪnɪt" },
                { english: "Second", spanish: "Segundo", pronunciation: "ˈsɛkənd" },
                { english: "What time is it?", spanish: "¿Qué hora es?", pronunciation: "wʌt taɪm ɪz ɪt" },
                { english: "See you tomorrow", spanish: "Nos vemos mañana", pronunciation: "siː juː təˈmɑroʊ" },
                { english: "Next week", spanish: "La próxima semana", pronunciation: "nɛkst wiːk" }
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
                { english: "Business", spanish: "Negocio", pronunciation: "ˈbɪznəs" },
                { english: "Software", spanish: "Software", pronunciation: "ˈsɔftwɛr" },
                { english: "Database", spanish: "Base de datos", pronunciation: "ˈdeɪtəbeɪs" }
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
                { english: "Team", spanish: "Equipo", pronunciation: "tim" },
                { english: "Coach", spanish: "Entrenador", pronunciation: "koʊtʃ" },
                { english: "Championship", spanish: "Campeonato", pronunciation: "ˈtʃæmpiənʃɪp" }
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
        },
        {
            id: 13,
            title: "Medicina y Salud",
            difficulty: "Intermedio",
            vocabulary: [
                { english: "Hospital", spanish: "Hospital", pronunciation: "ˈhɑspɪtəl" },
                { english: "Doctor", spanish: "Doctor", pronunciation: "ˈdɑktər" },
                { english: "Nurse", spanish: "Enfermera", pronunciation: "nɜrs" },
                { english: "Medicine", spanish: "Medicina", pronunciation: "ˈmɛdəsən" },
                { english: "Pain", spanish: "Dolor", pronunciation: "peɪn" },
                { english: "Fever", spanish: "Fiebre", pronunciation: "ˈfivər" },
                { english: "Appointment", spanish: "Cita médica", pronunciation: "əˈpɔɪntmənt" },
                { english: "Emergency", spanish: "Emergencia", pronunciation: "ɪˈmɜrdʒənsi" },
                { english: "Symptom", spanish: "Síntoma", pronunciation: "ˈsɪmptəm" },
                { english: "Treatment", spanish: "Tratamiento", pronunciation: "ˈtritmənt" }
            ],
            grammar: {
                title: "Should (Consejos)",
                explanation: "Se usa para dar consejos y recomendaciones. Estructura: Subject + should + verb",
                examples: [
                    "You should see a doctor. (Deberías ver a un doctor)",
                    "She should take medicine. (Ella debería tomar medicina)",
                    "They should rest more. (Ellos deberían descansar más)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cómo se dice 'cita médica' en inglés?",
                    options: ["Hospital", "Appointment", "Medicine", "Emergency"],
                    correct: 1
                }
            ]
        },
        {
            id: 14,
            title: "Educación y Estudios",
            difficulty: "Intermedio",
            vocabulary: [
                { english: "University", spanish: "Universidad", pronunciation: "ˌjunəˈvɜrsəti" },
                { english: "College", spanish: "Colegio", pronunciation: "ˈkɑlɪdʒ" },
                { english: "School", spanish: "Escuela", pronunciation: "skul" },
                { english: "Student", spanish: "Estudiante", pronunciation: "ˈstudənt" },
                { english: "Professor", spanish: "Profesor", pronunciation: "prəˈfɛsər" },
                { english: "Classroom", spanish: "Aula", pronunciation: "ˈklæsrum" },
                { english: "Library", spanish: "Biblioteca", pronunciation: "ˈlaɪbrɛri" },
                { english: "Homework", spanish: "Tarea", pronunciation: "ˈhoʊmwɜrk" },
                { english: "Exam", spanish: "Examen", pronunciation: "ɪɡˈzæm" },
                { english: "Graduation", spanish: "Graduación", pronunciation: "ˌɡrædʒuˈeɪʃən" }
            ],
            grammar: {
                title: "Used to (Pasado Habitual)",
                explanation: "Se usa para hablar de hábitos o situaciones del pasado que ya no existen.",
                examples: [
                    "I used to study at that university. (Solía estudiar en esa universidad)",
                    "She used to live in New York. (Ella solía vivir en Nueva York)",
                    "They used to play football. (Ellos solían jugar fútbol)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cómo se dice 'tarea' en inglés?",
                    options: ["Homework", "Exam", "Library", "Classroom"],
                    correct: 0
                }
            ]
        },
        {
            id: 15,
            title: "Arte y Cultura",
            difficulty: "Avanzado",
            vocabulary: [
                { english: "Museum", spanish: "Museo", pronunciation: "mjuˈziəm" },
                { english: "Gallery", spanish: "Galería", pronunciation: "ˈɡæləri" },
                { english: "Painting", spanish: "Pintura", pronunciation: "ˈpeɪntɪŋ" },
                { english: "Sculpture", spanish: "Escultura", pronunciation: "ˈskʌlptʃər" },
                { english: "Artist", spanish: "Artista", pronunciation: "ˈɑrtɪst" },
                { english: "Exhibition", spanish: "Exposición", pronunciation: "ˌɛksəˈbɪʃən" },
                { english: "Masterpiece", spanish: "Obra maestra", pronunciation: "ˈmæstərpis" },
                { english: "Contemporary", spanish: "Contemporáneo", pronunciation: "kənˈtɛmpərɛri" },
                { english: "Classical", spanish: "Clásico", pronunciation: "ˈklæsɪkəl" },
                { english: "Creative", spanish: "Creativo", pronunciation: "kriˈeɪtɪv" }
            ],
            grammar: {
                title: "Passive Voice (Voz Pasiva)",
                explanation: "Se usa cuando el foco está en la acción, no en quién la realiza.",
                examples: [
                    "The painting was created by Van Gogh. (La pintura fue creada por Van Gogh)",
                    "The museum is visited by thousands. (El museo es visitado por miles)",
                    "The exhibition will be opened tomorrow. (La exposición será abierta mañana)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cómo se dice 'obra maestra' en inglés?",
                    options: ["Masterpiece", "Painting", "Sculpture", "Exhibition"],
                    correct: 0
                }
            ]
        },
        {
            id: 16,
            title: "Medio Ambiente",
            difficulty: "Avanzado",
            vocabulary: [
                { english: "Environment", spanish: "Medio ambiente", pronunciation: "ɪnˈvaɪrənmənt" },
                { english: "Pollution", spanish: "Contaminación", pronunciation: "pəˈluʃən" },
                { english: "Recycling", spanish: "Reciclaje", pronunciation: "riˈsaɪklɪŋ" },
                { english: "Climate", spanish: "Clima", pronunciation: "ˈklaɪmət" },
                { english: "Sustainability", spanish: "Sostenibilidad", pronunciation: "səˌsteɪnəˈbɪləti" },
                { english: "Renewable", spanish: "Renovable", pronunciation: "rɪˈnuəbəl" },
                { english: "Conservation", spanish: "Conservación", pronunciation: "ˌkɑnsərˈveɪʃən" },
                { english: "Ecosystem", spanish: "Ecosistema", pronunciation: "ˈikoʊˌsɪstəm" },
                { english: "Biodiversity", spanish: "Biodiversidad", pronunciation: "ˌbaɪoʊdaɪˈvɜrsəti" },
                { english: "Carbon footprint", spanish: "Huella de carbono", pronunciation: "ˈkɑrbən ˈfʊtprɪnt" }
            ],
            grammar: {
                title: "Conditional Sentences (Oraciones Condicionales)",
                explanation: "Se usan para expresar condiciones y sus resultados.",
                examples: [
                    "If we recycle more, we will help the environment. (Si reciclamos más, ayudaremos al medio ambiente)",
                    "If everyone used renewable energy, pollution would decrease. (Si todos usaran energía renovable, la contaminación disminuiría)",
                    "If you care about the planet, you should reduce waste. (Si te importa el planeta, deberías reducir el desperdicio)"
                ]
            },
            practiceExercises: [
                {
                    type: "vocabulary",
                    question: "¿Cómo se dice 'sostenibilidad' en inglés?",
                    options: ["Sustainability", "Environment", "Recycling", "Climate"],
                    correct: 0
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

// Sistema de Logros y Gamificación
const ACHIEVEMENTS_SYSTEM = {
    achievements: [
        {
            id: 'first_lesson',
            title: 'Primer Paso',
            description: 'Completa tu primera lección',
            icon: '🎯',
            xpReward: 50,
            unlocked: false
        },
        {
            id: 'streak_7',
            title: 'Constancia',
        description: '7 días consecutivos de estudio',
            icon: '🔥',
            xpReward: 100,
            unlocked: false
        },
        {
            id: 'streak_30',
            title: 'Dedicación',
        description: '30 días consecutivos de estudio',
            icon: '💎',
            xpReward: 300,
            unlocked: false
        },
        {
            id: 'vocabulary_100',
            title: 'Palabras Maestro',
            description: 'Aprende 100 palabras',
            icon: '📚',
            xpReward: 150,
            unlocked: false
        },
        {
            id: 'vocabulary_500',
            title: 'Léxico Rico',
            description: 'Aprende 500 palabras',
            icon: '📖',
            xpReward: 400,
            unlocked: false
        },
        {
            id: 'lessons_10',
            title: 'Estudiante Aplicado',
            description: 'Completa 10 lecciones',
            icon: '🎓',
            xpReward: 200,
            unlocked: false
        },
        {
            id: 'lessons_50',
            title: 'Experto en Aprendizaje',
            description: 'Completa 50 lecciones',
            icon: '👨‍🎓',
            xpReward: 500,
            unlocked: false
        },
        {
            id: 'perfect_score',
            title: 'Perfección',
            description: 'Obtén 100% en un ejercicio',
            icon: '⭐',
            xpReward: 75,
            unlocked: false
        },
        {
            id: 'practice_master',
            title: 'Maestro de la Práctica',
            description: 'Completa 100 ejercicios de práctica',
            icon: '🏋️',
            xpReward: 250,
            unlocked: false
        },
        {
            id: 'level_up_3',
            title: 'Ascenso Rápido',
            description: 'Sube 3 niveles',
            icon: '🚀',
            xpReward: 300,
            unlocked: false
        }
    ],
    
    // Verificar logros
    checkAchievements() {
        const user = getCurrentUser();
        if (!user) return;
        
        const unlockedAchievements = [];
        
        this.achievements.forEach(achievement => {
            if (achievement.unlocked) return; // Ya desbloqueado
            
            let shouldUnlock = false;
            
            switch(achievement.id) {
                case 'first_lesson':
                    shouldUnlock = appState.lessonsCompleted >= 1;
                    break;
                case 'streak_7':
                    shouldUnlock = appState.streakDays >= 7;
                    break;
                case 'streak_30':
                    shouldUnlock = appState.streakDays >= 30;
                    break;
                case 'vocabulary_100':
                    shouldUnlock = appState.vocabularyWordsLearned >= 100;
                    break;
                case 'vocabulary_500':
                    shouldUnlock = appState.vocabularyWordsLearned >= 500;
                    break;
                case 'lessons_10':
                    shouldUnlock = appState.lessonsCompleted >= 10;
                    break;
                case 'lessons_50':
                    shouldUnlock = appState.lessonsCompleted >= 50;
                    break;
                case 'perfect_score':
                    // Se verifica en handleExerciseAnswer
                    break;
                case 'practice_master':
                    shouldUnlock = (appState.grammarExercises || 0) >= 100;
                    break;
                case 'level_up_3':
                    shouldUnlock = appState.currentLevel >= 3;
                    break;
            }
            
            if (shouldUnlock) {
                achievement.unlocked = true;
                unlockedAchievements.push(achievement);
                appState.currentXP += achievement.xpReward;
                this.showAchievementNotification(achievement);
            }
        });
        
        if (unlockedAchievements.length > 0) {
            updateUI();
            saveProgress();
        }
    },
    
    // Mostrar notificación de logro
    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification achievement-popup';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-text">
                    <h4>¡Logro Desbloqueado!</h4>
                    <p><strong>${achievement.title}</strong></p>
                    <p>${achievement.description}</p>
                    <span class="achievement-xp">+${achievement.xpReward} XP</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    },
    
    // Cargar logros del usuario
    loadUserAchievements() {
        const user = getCurrentUser();
        if (!user) return;
        
        const userAchievements = JSON.parse(localStorage.getItem(`achievements_${user.email}`) || '[]');
        
        this.achievements.forEach(achievement => {
            const userAchievement = userAchievements.find(ua => ua.id === achievement.id);
            if (userAchievement) {
                achievement.unlocked = userAchievement.unlocked;
                achievement.unlockedAt = userAchievement.unlockedAt;
            }
        });
    },
    
    // Guardar logros del usuario
    saveUserAchievements() {
        const user = getCurrentUser();
        if (!user) return;
        
        const achievementsToSave = this.achievements.map(achievement => ({
            id: achievement.id,
            unlocked: achievement.unlocked,
            unlockedAt: achievement.unlockedAt
        }));
        
        localStorage.setItem(`achievements_${user.email}`, JSON.stringify(achievementsToSave));
    },
    
    // Obtener logros desbloqueados
    getUnlockedAchievements() {
        return this.achievements.filter(achievement => achievement.unlocked);
    },
    
    // Obtener progreso de logros
    getAchievementProgress() {
        const user = getCurrentUser();
        if (!user) return { unlocked: 0, total: 0, percentage: 0 };
        
        const unlocked = this.getUnlockedAchievements().length;
        const total = this.achievements.length;
        const percentage = Math.round((unlocked / total) * 100);
        
        return { unlocked, total, percentage };
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

// Categorías de vocabulario expandidas
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
        description: "Palabras y frases útiles para viajar",
        vocabulary: [
            { english: "Airport", spanish: "Aeropuerto", pronunciation: "ˈɛrˌpɔrt" },
            { english: "Ticket", spanish: "Boleto", pronunciation: "ˈtɪkɪt" },
            { english: "Passport", spanish: "Pasaporte", pronunciation: "ˈpæspɔrt" },
            { english: "Luggage", spanish: "Equipaje", pronunciation: "ˈlʌɡɪdʒ" },
            { english: "Boarding pass", spanish: "Pase de abordar", pronunciation: "ˈbɔrdɪŋ pæs" },
            { english: "Where is the hotel?", spanish: "¿Dónde está el hotel?", pronunciation: "wɛr ɪz ðə hoʊˈtɛl" },
            { english: "I need a taxi", spanish: "Necesito un taxi", pronunciation: "aɪ niːd ə ˈtæksi" },
            { english: "How much does it cost?", spanish: "¿Cuánto cuesta?", pronunciation: "haʊ mʌʧ dʌz ɪt kɔst" }
        ]
    },
    food: {
        name: "Comida",
        description: "Alimentos y gastronomía",
        lessons: [4, 12]
    },
    emotions: {
        name: "Emociones y estados de ánimo",
        description: "Palabras para expresar cómo te sientes",
        vocabulary: [
            { english: "Happy", spanish: "Feliz", pronunciation: "ˈhæpi" },
            { english: "Sad", spanish: "Triste", pronunciation: "sæd" },
            { english: "Angry", spanish: "Enojado", pronunciation: "ˈæŋɡri" },
            { english: "Tired", spanish: "Cansado", pronunciation: "ˈtaɪərd" },
            { english: "Excited", spanish: "Emocionado", pronunciation: "ɪkˈsaɪtɪd" },
            { english: "Worried", spanish: "Preocupado", pronunciation: "ˈwɜːrid" },
            { english: "Surprised", spanish: "Sorprendido", pronunciation: "sərˈpraɪzd" },
            { english: "Bored", spanish: "Aburrido", pronunciation: "bɔːrd" }
        ]
    },
    home: {
        name: "Hogar y objetos cotidianos",
        description: "Palabras para la casa y objetos de uso diario",
        vocabulary: [
            { english: "House", spanish: "Casa", pronunciation: "haʊs" },
            { english: "Room", spanish: "Habitación", pronunciation: "ruːm" },
            { english: "Kitchen", spanish: "Cocina", pronunciation: "ˈkɪʧɪn" },
            { english: "Bathroom", spanish: "Baño", pronunciation: "ˈbæθruːm" },
            { english: "Chair", spanish: "Silla", pronunciation: "ʧɛər" },
            { english: "Table", spanish: "Mesa", pronunciation: "ˈteɪbəl" },
            { english: "Bed", spanish: "Cama", pronunciation: "bɛd" },
            { english: "Window", spanish: "Ventana", pronunciation: "ˈwɪndoʊ" }
        ]
    },
    health: {
        name: "Salud y emergencias",
        description: "Vocabulario para situaciones médicas y de emergencia",
        vocabulary: [
            { english: "Doctor", spanish: "Doctor", pronunciation: "ˈdɑktər" },
            { english: "Hospital", spanish: "Hospital", pronunciation: "ˈhɑːspɪtəl" },
            { english: "Pharmacy", spanish: "Farmacia", pronunciation: "ˈfɑːrməsi" },
            { english: "Medicine", spanish: "Medicina", pronunciation: "ˈmɛdɪsɪn" },
            { english: "I feel sick", spanish: "Me siento mal", pronunciation: "aɪ fiːl sɪk" },
            { english: "Call an ambulance!", spanish: "¡Llame una ambulancia!", pronunciation: "kɔːl æn ˈæmbjələns" },
            { english: "Pain", spanish: "Dolor", pronunciation: "peɪn" },
            { english: "Allergy", spanish: "Alergia", pronunciation: "ˈælərdʒi" }
        ]
    },
    work: {
        name: "Trabajo y oficina",
        description: "Palabras comunes en el entorno laboral",
        vocabulary: [
            { english: "Office", spanish: "Oficina", pronunciation: "ˈɑːfɪs" },
            { english: "Boss", spanish: "Jefe", pronunciation: "bɒs" },
            { english: "Meeting", spanish: "Reunión", pronunciation: "ˈmiːtɪŋ" },
            { english: "Colleague", spanish: "Compañero de trabajo", pronunciation: "ˈkɒliːɡ" },
            { english: "Deadline", spanish: "Fecha límite", pronunciation: "ˈdɛdlaɪn" },
            { english: "Salary", spanish: "Salario", pronunciation: "ˈsæləri" },
            { english: "I have a question", spanish: "Tengo una pregunta", pronunciation: "aɪ hæv ə ˈkwɛsʧən" },
            { english: "Can you help me?", spanish: "¿Puedes ayudarme?", pronunciation: "kæn juː hɛlp miː" }
        ]
    },
    shopping: {
        name: "Compras y ropa",
        description: "Vocabulario para ir de compras y hablar de ropa",
        vocabulary: [
            { english: "Store", spanish: "Tienda", pronunciation: "stɔːr" },
            { english: "Price", spanish: "Precio", pronunciation: "praɪs" },
            { english: "Discount", spanish: "Descuento", pronunciation: "ˈdɪskaʊnt" },
            { english: "Shirt", spanish: "Camisa", pronunciation: "ʃɜːrt" },
            { english: "Pants", spanish: "Pantalones", pronunciation: "pænts" },
            { english: "Dress", spanish: "Vestido", pronunciation: "drɛs" },
            { english: "How much is this?", spanish: "¿Cuánto cuesta esto?", pronunciation: "haʊ mʌʧ ɪz ðɪs" },
            { english: "Can I try it on?", spanish: "¿Puedo probármelo?", pronunciation: "kæn aɪ traɪ ɪt ɒn" }
        ]
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

// Sistema de pronunciación mejorado
function speakText(text, language = 'en-US', rate = 0.8) {
    if ('speechSynthesis' in window) {
        // Detener cualquier pronunciación anterior
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        utterance.rate = rate;
        utterance.volume = 1;
        
        // Esperar a que las voces estén disponibles
        const speakWithVoice = () => {
        const voices = speechSynthesis.getVoices();
            const englishVoice = voices.find(voice => 
                voice.lang.startsWith('en') && (voice.name.includes('US') || voice.name.includes('en-US'))
            ) || voices.find(voice => voice.lang.startsWith('en'));
            
        if (englishVoice) {
            utterance.voice = englishVoice;
        }
        
        speechSynthesis.speak(utterance);
        };
        
        // Si las voces ya están disponibles, usar directamente
        if (speechSynthesis.getVoices().length > 0) {
            speakWithVoice();
        } else {
            // Esperar a que las voces se carguen
            speechSynthesis.onvoiceschanged = speakWithVoice;
        }
        
        return true;
    }
        return false;
}

// Función para practicar pronunciación con grabación
async function practicePronunciation(text) {
    const btn = document.querySelector('.practice-btn[title="Grabar tu pronunciación"]');
    if (!btn) return;
    
    btn.disabled = true;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-microphone"></i> Grabando...';
    showNotification('Grabando... Habla ahora', 'info');
    
    try {
        const audioUrl = await recordAudio();
        showNotification('¡Grabación completada!', 'success');
        
        // Crear reproductor de audio para la grabación
        const audioContainer = document.createElement('div');
        audioContainer.className = 'audio-comparison';
        audioContainer.innerHTML = `
            <div class="audio-section">
                <h5>Tu pronunciación:</h5>
                <audio controls src="${audioUrl}">
                    Tu navegador no soporta el elemento de audio.
                </audio>
            </div>
            <div class="audio-section">
                <h5>Pronunciación correcta:</h5>
                <button class="btn btn-primary" onclick="speakText('${text.replace(/'/g, "\\'")}', 'en-US')">
                    <i class="fas fa-volume-up"></i> Escuchar
                </button>
            </div>
            <div class="comparison-tips">
                <p><strong>Consejo:</strong> Escucha ambas pronunciaciones y compara. Presta atención a la entonación y los sonidos.</p>
            </div>
        `;
        
        // Insertar el reproductor después del botón de grabar
        const practiceContainer = btn.closest('.pronunciation-practice');
        if (practiceContainer) {
            // Remover reproductor anterior si existe
            const existingPlayer = practiceContainer.querySelector('.audio-comparison');
            if (existingPlayer) existingPlayer.remove();
            practiceContainer.appendChild(audioContainer);
        }
        
    } catch (error) {
        showNotification('Error al grabar audio. Verifica los permisos del micrófono.', 'error');
    }
    
    btn.innerHTML = originalHTML;
    btn.disabled = false;
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
    
    // Guardar logros del usuario
    ACHIEVEMENTS_SYSTEM.saveUserAchievements();
}

function loadProgress() {
    const saved = localStorage.getItem('englishLearningProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        Object.assign(appState, progress);
    }
    
    // Cargar logros del usuario
    ACHIEVEMENTS_SYSTEM.loadUserAchievements();
    
        updateUI();
}

function updateUI() {
    document.getElementById('currentLevel').textContent = appState.currentLevel;
    document.getElementById('currentXP').textContent = appState.currentXP;
    document.getElementById('streakDays').textContent = appState.streakDays;
    document.getElementById('lessonsCompleted').textContent = appState.lessonsCompleted;
    // Actualizar contador de logros usando el nuevo sistema
    const achievementProgress = ACHIEVEMENTS_SYSTEM.getAchievementProgress();
    document.getElementById('achievementsEarned').textContent = achievementProgress.unlocked;
    
    // Actualizar barra de progreso del nivel
    const xpForNextLevel = getXPForNextLevel(appState.currentLevel);
    const xpInCurrentLevel = appState.currentXP % LEVEL_SYSTEM.xpPerLevel;
    const progressPercentage = (xpInCurrentLevel / LEVEL_SYSTEM.xpPerLevel) * 100;
    
    // Actualizar elementos visuales de la barra de progreso
    const progressFill = document.getElementById('levelProgressFill');
    const progressText = document.getElementById('levelProgressText');
    
    if (progressFill && progressText) {
        progressFill.style.width = `${progressPercentage}%`;
        progressText.textContent = `${Math.round(progressPercentage)}%`;
    }
    
    // Actualizar información del usuario en el header
    updateUserDisplay();
    
    // Mostrar nivel MCER en el header si hay usuario
    const user = getCurrentUser();
    if (user && user.mcer) {
        const levelElement = document.getElementById('currentLevel');
        if (levelElement) {
            levelElement.textContent = `${appState.currentLevel} (${user.mcer})`;
        }
    }
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
            // Sincronizar práctica con la lección actual de aprendizaje
            practiceLessonIndex = syncPracticeWithLearning();
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

    // Verificar si la lección ya fue completada
    const isCompleted = isLessonCompleted(appState.currentLesson);
    const lessonHeader = document.querySelector('.lesson-header');
    
    // Agregar o actualizar indicador de completado
    let completedBadge = lessonHeader.querySelector('.completed-badge');
    if (isCompleted) {
        if (!completedBadge) {
            completedBadge = document.createElement('span');
            completedBadge.className = 'completed-badge';
            lessonHeader.appendChild(completedBadge);
        }
        completedBadge.innerHTML = `<i class="fas fa-check-circle"></i> Completada`;
    }else if (completedBadge) {
        completedBadge.remove();
    }

    // Cargar vocabulario
    const vocabularyGrid = document.getElementById('vocabularyGrid');
    vocabularyGrid.innerHTML = '';
    
    currentLesson.vocabulary.forEach(item => {
        const vocabItem = document.createElement('div');
        vocabItem.className = 'vocabulary-item';
        // Escapar comillas simples para el atributo onclick
        const safeEnglish = item.english.replace(/'/g, "\\'");
        vocabItem.innerHTML = `
                                <div class="vocab-header">
                                    <div class="english">${item.english}</div>
                <div class="pronunciation-buttons">
                    <button class="speak-btn" onclick="speakText('${safeEnglish}', 'en-US')" title="Escuchar pronunciación">
                                        <i class="fas fa-volume-up"></i>
                                    </button>
                </div>
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

    // Agregar tarjeta de pronunciación si no existe
    if (!document.querySelector('.mode-card[data-mode="pronunciation"]')) {
        const pronunciationCard = document.createElement('div');
        pronunciationCard.className = 'mode-card';
        pronunciationCard.setAttribute('data-mode', 'pronunciation');
        pronunciationCard.innerHTML = `
            <i class="fas fa-microphone"></i>
            <h3>Pronunciación</h3>
            <p>Graba y compara tu voz</p>
        `;
        document.querySelector('.practice-modes').appendChild(pronunciationCard);
    }

    // Mostrar información de sincronización
    const syncInfo = document.createElement('div');
    syncInfo.className = 'sync-info';
    syncInfo.innerHTML = `
        <div class="sync-message">
            <i class="fas fa-sync-alt"></i>
            <span>Los ejercicios de práctica están sincronizados con tu lección actual de aprendizaje</span>
        </div>
    `;
    
    // Insertar antes de los mode cards
    const practiceModes = document.querySelector('.practice-modes');
    if (practiceModes && !document.querySelector('.sync-info')) {
        practiceModes.insertBefore(syncInfo, practiceModes.firstChild);
    }

    document.querySelectorAll('.mode-card').forEach(card => {
        card.onclick = () => {
            const mode = card.dataset.mode;
            loadPracticeExercise(mode);
            document.querySelector('.practice-modes').style.display = 'none';
            practiceArea.style.display = 'block';
        };
    });
}

// --- Filtrado de lecciones según nivel MCER ---
function getUserLevelMCER() {
    // Buscar el usuario actual y su nivel MCER
    const session = JSON.parse(localStorage.getItem('englishLearningSession') || 'null');
    if (session && session.email) {
        const users = JSON.parse(localStorage.getItem('englishLearningUsers') || '[]');
        const user = users.find(u => u.email === session.email);
        if (user && user.mcer) return user.mcer;
        if (user && user.level) {
            // Fallback: deducir MCER por nombre de nivel
            if (user.level.toLowerCase().includes('principiante')) return 'A1';
            if (user.level.toLowerCase().includes('básico')) return 'A2';
            if (user.level.toLowerCase().includes('intermedio')) return 'B1';
            if (user.level.toLowerCase().includes('avanzado')) return 'B2';
        }
    }
    // Si no hay usuario, por defecto A1
    return 'A1';
}

function getAllowedLessonsByLevel() {
    const mcer = getUserLevelMCER();
    // Relación MCER -> dificultad
    const allowedDifficulties = [];
    if (mcer === 'A1') allowedDifficulties.push('Principiante');
    if (mcer === 'A2') allowedDifficulties.push('Principiante', 'Básico');
    if (mcer === 'B1') allowedDifficulties.push('Principiante', 'Básico', 'Intermedio');
    if (mcer === 'B2' || mcer === 'C1' || mcer === 'C2') allowedDifficulties.push('Principiante', 'Básico', 'Intermedio', 'Avanzado');
    // Filtrar lecciones
    return LESSONS_DATABASE.level1.filter(lesson => allowedDifficulties.includes(lesson.difficulty));
}

// Función para sincronizar la lección de práctica con la lección de aprendizaje
function syncPracticeWithLearning() {
    const allowedLessons = getAllowedLessonsByLevel();
    if (allowedLessons.length === 0) return;
    
    // Buscar la lección actual de aprendizaje en las lecciones permitidas
    const currentLearningLesson = LESSONS_DATABASE.level1[appState.currentLesson];
    const practiceLessonIndex = allowedLessons.findIndex(lesson => lesson.id === currentLearningLesson.id);
    
    if (practiceLessonIndex !== -1) {
        // Si la lección actual está en las permitidas, usarla
        return practiceLessonIndex;
    } else {
        // Si no está, usar la primera lección permitida
        return 0;
    }
}

// --- Cambios en práctica ---
function loadPracticeExercise(mode) {
    const practiceArea = document.getElementById('practiceArea');
    const allowedLessons = getAllowedLessonsByLevel();
    if (allowedLessons.length === 0) {
        practiceArea.innerHTML = '<div class="error">No hay lecciones disponibles para tu nivel actual.</div>';
        return;
    }

    // Sincronizar con la lección de aprendizaje
    practiceLessonIndex = syncPracticeWithLearning();
    
    // Asegurar que el índice esté dentro de rango
    if (practiceLessonIndex >= allowedLessons.length) practiceLessonIndex = 0;
    const currentLesson = allowedLessons[practiceLessonIndex];
    
    let exerciseHTML = '';
    switch(mode) {
        case 'vocabulary':
            exerciseHTML = createVocabularyExercise(currentLesson);
            break;
        case 'grammar':
            exerciseHTML = createGrammarExercise(currentLesson);
            break;
        case 'listening':
            // Usar el nuevo sistema de listening mejorado
            const userLevel = getUserLevelMCER();
            const availableExercises = LISTENING_SYSTEM.exercises.filter(ex => {
                const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
                const userLevelIndex = levelOrder.indexOf(userLevel);
                const exerciseLevelIndex = levelOrder.indexOf(ex.difficulty);
                return exerciseLevelIndex <= userLevelIndex;
            });
            
            if (availableExercises.length > 0) {
                const exerciseIndex = practiceLessonIndex % availableExercises.length;
                LISTENING_SYSTEM.createListeningExercise(availableExercises[exerciseIndex]);
                return; // Salir temprano ya que createListeningExercise maneja el HTML
            } else {
                exerciseHTML = createListeningExercise(currentLesson); // Fallback al sistema anterior
            }
            break;
        case 'pronunciation':
            exerciseHTML = createPronunciationPractice(currentLesson);
            break;
    }
    
    // Mostrar el nombre de la lección actual en la cabecera
    const lessonTitle = currentLesson.title || '';
    const currentLessonNumber = practiceLessonIndex + 1;
    const totalLessons = allowedLessons.length;
    
    practiceArea.innerHTML = `
        <div class="practice-header">
            <div class="practice-nav-buttons">
                <button class="btn btn-secondary" onclick="backToPracticeModes()">
                    <i class="fas fa-arrow-left"></i> Volver
                </button>
                <button class="btn btn-primary" onclick="nextPracticeLesson('${mode}')" id="nextPracticeBtn">
                    <i class="fas fa-arrow-right"></i> Siguiente Lección
                </button>
            </div>
            <div class="practice-info">
                <h3>${mode.charAt(0).toUpperCase() + mode.slice(1)}</h3>
                <div class="practice-lesson-info">
                    <span class="practice-lesson-title">Lección: <strong>${lessonTitle}</strong></span>
                    <span class="practice-lesson-counter">${currentLessonNumber} de ${totalLessons}</span>
                </div>
            </div>
        </div>
        ${exerciseHTML}
    `;
    
    // Reasignar event listeners inmediatamente
    setTimeout(() => {
        reattachOptionBtnListeners();
    }, 50);
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
    // Seleccionar una frase o palabra del vocabulario de la lección
    const vocab = lesson.vocabulary[Math.floor(Math.random() * lesson.vocabulary.length)];
    const safeEnglish = vocab.english.replace(/'/g, "\\'");
    
    // Crear ejercicios de comprensión auditiva
    const listeningExercises = [
        {
            type: 'word',
            text: vocab.english,
            question: `¿Qué palabra escuchaste?`,
            options: [
                vocab.english,
                vocab.spanish,
                vocab.english.split('').reverse().join(''), // Opción incorrecta
                vocab.english.toUpperCase()
            ]
        },
        {
            type: 'phrase',
            text: `Hello, how are you?`,
            question: `¿Qué frase escuchaste?`,
            options: [
                'Hello, how are you?',
                'Hi, how are you?',
                'Hello, how do you do?',
                'Hi, how do you do?'
            ]
        },
        {
            type: 'question',
            text: `What is your name?`,
            question: `¿Qué pregunta escuchaste?`,
            options: [
                'What is your name?',
                'What is your age?',
                'Where are you from?',
                'How old are you?'
            ]
        }
    ];
    
    const exercise = listeningExercises[Math.floor(Math.random() * listeningExercises.length)];
    
    return `
        <div class="exercise-container">
            <h4><i class="fas fa-headphones"></i> Ejercicio de Comprensión Auditiva</h4>
            <div class="listening-exercise">
                <div class="audio-player">
                    <div class="audio-controls">
                        <button class="play-btn" data-text="${exercise.text.replace(/"/g, '&quot;')}" title="Reproducir audio">
                            <i class="fas fa-play"></i>
                </button>
                        <button class="pause-btn" title="Pausar" style="display: none;">
                            <i class="fas fa-pause"></i>
                        </button>
                </div>
                    <div class="speed-controls">
                        <label>Velocidad:</label>
                        <select onchange="changeListeningSpeed(this.value)">
                            <option value="0.7">Lento</option>
                            <option value="1.0" selected>Normal</option>
                            <option value="1.3">Rápido</option>
                        </select>
            </div>
                    <div class="audio-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 0%"></div>
        </div>
                        <div class="time-display">
                            <span class="current-time">0:00</span> / <span class="total-time">0:00</span>
                        </div>
                    </div>
                </div>
                
                <div class="transcript-section">
                    <button class="show-transcript-btn" onclick="toggleTranscript()" title="Mostrar/ocultar transcripción">
                        <i class="fas fa-eye"></i> Mostrar Transcripción
            </button>
                    <div class="transcript-container" style="display: none;">
                        <div class="transcript-text">${exercise.text}</div>
        </div>
                </div>
                
                <div class="questions-section">
                    <h4><i class="fas fa-question-circle"></i> ${exercise.question}</h4>
                    <div class="questions-container">
                        <div class="question-card">
                            <div class="options-grid">
                                ${exercise.options.map((option, index) => `
                                    <button class="option-btn" data-correct="${option === exercise.text}" onclick="handleListeningAnswer(this)">
                                        ${String.fromCharCode(65 + index)}. ${option}
                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                    
                <div class="exercise-actions">
                    <button class="btn btn-secondary" onclick="resetListeningExercise()">
                        <i class="fas fa-redo"></i> Repetir
                    </button>
                    <button class="btn btn-primary" onclick="checkListeningAnswers()">
                        <i class="fas fa-check"></i> Verificar Respuesta
                    </button>
                </div>
                
                <div class="exercise-result" style="display: none;">
                    <h4>Resultado</h4>
                    <p class="result-message"></p>
                    <button class="btn btn-primary" onclick="nextListeningExercise()">
                        <i class="fas fa-arrow-right"></i> Siguiente Ejercicio
                    </button>
                </div>
                </div>
        </div>
    `;
}

function createPronunciationPractice(lesson) {
    // Elegir una palabra aleatoria del vocabulario de la lección
    const vocab = lesson.vocabulary[Math.floor(Math.random() * lesson.vocabulary.length)];
    const safeEnglish = vocab.english.replace(/'/g, "\\'");
    return `
        <div class="exercise-container">
            <h4>Practica la pronunciación de:</h4>
            <div class="pronunciation-practice">
                <div class="english">${vocab.english}</div>
                <button class="speak-btn" onclick="speakText('${safeEnglish}', 'en-US')" title="Escuchar pronunciación">
                    <i class="fas fa-volume-up"></i>
                    </button>
                <button class="practice-btn" onclick="practicePronunciation('${safeEnglish}')" title="Grabar tu pronunciación">
                        <i class="fas fa-microphone"></i> Grabar
                    </button>
            </div>
        </div>
    `;
}

// Variables globales para el ejercicio de listening
let currentListeningAudio = null;
let listeningAudioSpeed = 1.0;
let selectedListeningAnswer = null;

// Función para reproducir audio del ejercicio de listening
function playListeningAudio(text) {
    // Verificar si Web Speech API está disponible
    if (!window.speechSynthesis) {
        showNotification('Tu navegador no soporta audio. Intenta con Chrome o Edge.', 'error');
        return;
    }
    
    // Cancelar audio anterior si existe
    if (currentListeningAudio) {
        speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = listeningAudioSpeed;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Mostrar botón de pausa
    const playBtn = document.querySelector('.play-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    if (playBtn && pauseBtn) {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    }
    
    // Simular progreso del audio
    let progress = 0;
    const progressFill = document.querySelector('.audio-progress .progress-fill');
    const currentTimeSpan = document.querySelector('.current-time');
    const totalTimeSpan = document.querySelector('.total-time');
    
    const progressInterval = setInterval(() => {
        progress += 2;
        if (progressFill) progressFill.style.width = `${progress}%`;
        if (currentTimeSpan) currentTimeSpan.textContent = formatTime(Math.floor(progress / 2));
        if (totalTimeSpan) totalTimeSpan.textContent = formatTime(Math.floor(100 / 2));
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            if (playBtn && pauseBtn) {
                playBtn.style.display = 'inline-block';
                pauseBtn.style.display = 'none';
            }
            if (progressFill) progressFill.style.width = '0%';
            if (currentTimeSpan) currentTimeSpan.textContent = '0:00';
        }
    }, 100);
    
    utterance.onend = () => {
        clearInterval(progressInterval);
        if (playBtn && pauseBtn) {
            playBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'none';
        }
        if (progressFill) progressFill.style.width = '0%';
        if (currentTimeSpan) currentTimeSpan.textContent = '0:00';
    };
    
    utterance.onerror = (event) => {
        console.error('Error en audio:', event);
        clearInterval(progressInterval);
        if (playBtn && pauseBtn) {
            playBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'none';
        }
        if (progressFill) progressFill.style.width = '0%';
        if (currentTimeSpan) currentTimeSpan.textContent = '0:00';
        showNotification('Error al reproducir audio. Intenta nuevamente.', 'error');
    };
    
    currentListeningAudio = utterance;
    
    try {
        speechSynthesis.speak(utterance);
        console.log('Reproduciendo audio:', text);
    } catch (error) {
        console.error('Error al iniciar audio:', error);
        showNotification('Error al reproducir audio. Intenta con otro navegador.', 'error');
    }
}

// Función para pausar audio del ejercicio de listening
function pauseListeningAudio() {
    if (currentListeningAudio) {
        speechSynthesis.cancel();
        currentListeningAudio = null;
    }
    
    const playBtn = document.querySelector('.play-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    if (playBtn && pauseBtn) {
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
    }
    
    const progressFill = document.querySelector('.audio-progress .progress-fill');
    const currentTimeSpan = document.querySelector('.current-time');
    if (progressFill) progressFill.style.width = '0%';
    if (currentTimeSpan) currentTimeSpan.textContent = '0:00';
}

// Función para cambiar velocidad del audio
function changeListeningSpeed(speed) {
    listeningAudioSpeed = parseFloat(speed);
    if (currentListeningAudio) {
        currentListeningAudio.rate = listeningAudioSpeed;
    }
}

// Función para mostrar/ocultar transcripción
function toggleTranscript() {
    const transcriptContainer = document.querySelector('.transcript-container');
    const showBtn = document.querySelector('.show-transcript-btn');
    
    if (transcriptContainer && showBtn) {
        if (transcriptContainer.style.display === 'none') {
            transcriptContainer.style.display = 'block';
            showBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Ocultar Transcripción';
        } else {
            transcriptContainer.style.display = 'none';
            showBtn.innerHTML = '<i class="fas fa-eye"></i> Mostrar Transcripción';
        }
    }
}

// Función para manejar selección de respuesta
function handleListeningAnswer(button) {
    // Remover selección anterior
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Seleccionar nueva respuesta
    button.classList.add('selected');
    selectedListeningAnswer = button;
}

// Función para verificar respuestas
function checkListeningAnswers() {
    if (!selectedListeningAnswer) {
        showNotification('Por favor selecciona una respuesta', 'warning');
        return;
    }
    
    const isCorrect = selectedListeningAnswer.getAttribute('data-correct') === 'true';
    const resultDiv = document.querySelector('.exercise-result');
    const resultMessage = resultDiv.querySelector('.result-message');
    
    if (isCorrect) {
        resultMessage.innerHTML = '<span style="color: var(--success-color);">✅ ¡Correcto! Has identificado bien el audio.</span>';
        playSuccessSound();
        addXP(15);
        showNotification('¡Excelente comprensión auditiva! +15 XP', 'success');
    } else {
        resultMessage.innerHTML = '<span style="color: var(--error-color);">❌ Incorrecto. Intenta escuchar el audio nuevamente.</span>';
        playFailSound();
        showNotification('Sigue practicando tu comprensión auditiva', 'info');
    }
    
    resultDiv.style.display = 'block';
    
    // Deshabilitar botones de opciones
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.getAttribute('data-correct') === 'true') {
            btn.style.background = 'var(--success-color)';
            btn.style.color = 'white';
        }
    });
}

// Función para resetear ejercicio
function resetListeningExercise() {
    selectedListeningAnswer = null;
    
    // Resetear botones
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('selected');
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
    });
    
    // Ocultar resultado
    const resultDiv = document.querySelector('.exercise-result');
    if (resultDiv) resultDiv.style.display = 'none';
    
    // Resetear audio
    pauseListeningAudio();
    
    // Ocultar transcripción
    const transcriptContainer = document.querySelector('.transcript-container');
    const showBtn = document.querySelector('.show-transcript-btn');
    if (transcriptContainer) transcriptContainer.style.display = 'none';
    if (showBtn) showBtn.innerHTML = '<i class="fas fa-eye"></i> Mostrar Transcripción';
}

// Función para siguiente ejercicio
function nextListeningExercise() {
    // Cargar nuevo ejercicio de listening
    const allowedLessons = getAllowedLessonsByLevel();
    const currentLesson = allowedLessons[practiceLessonIndex];
    const practiceArea = document.getElementById('practiceArea');
    
    if (practiceArea) {
        practiceArea.innerHTML = createListeningExercise(currentLesson);
        resetListeningExercise();
    }
}

// Función auxiliar para formatear tiempo
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Función para probar el audio (para debugging)
function testAudio() {
    if (!window.speechSynthesis) {
        console.error('Web Speech API no disponible');
        showNotification('Web Speech API no disponible en este navegador', 'error');
        return;
    }
    
    const testText = 'Hello, this is a test of the audio system.';
    console.log('Probando audio con:', testText);
    
    const utterance = new SpeechSynthesisUtterance(testText);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.volume = 1;
    
    utterance.onstart = () => console.log('Audio iniciado');
    utterance.onend = () => console.log('Audio terminado');
    utterance.onerror = (event) => console.error('Error en audio:', event);
    
    speechSynthesis.speak(utterance);
    showNotification('Probando audio... Deberías escuchar "Hello, this is a test"', 'info');
}

// Función para probar el ejercicio de listening específicamente
function testListeningExercise() {
    console.log('Probando ejercicio de listening...');
    playListeningAudio('Hello, how are you?');
}

function backToPracticeModes() {
    document.querySelector('.practice-modes').style.display = 'grid';
    document.getElementById('practiceArea').style.display = 'none';
}

// Función para avanzar a la siguiente lección de práctica
function nextPracticeLesson(mode) {
    const allowedLessons = getAllowedLessonsByLevel();
    
    // Avanzar al siguiente índice
    practiceLessonIndex++;
    
    // Si llegamos al final, volver al inicio
    if (practiceLessonIndex >= allowedLessons.length) {
        practiceLessonIndex = 0;
        showNotification('¡Has completado todas las lecciones de práctica! Volviendo al inicio. 🔄', 'info');
    } else {
        showNotification('Avanzando a la siguiente lección de práctica... 🚀', 'success');
    }
    
    // Cargar el ejercicio con la nueva lección
    loadPracticeExercise(mode);
    
    // Reasignar event listeners
    setTimeout(() => {
        reattachOptionBtnListeners();
    }, 50);
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
    if (!chartContainer || chartContainer.nodeName !== 'CANVAS') {
        console.warn('No se encontró el canvas para el gráfico de progreso.');
        return;
    }
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
    
    // Cargar panel de logros
    loadAchievementsPanel();
    
    // Cargar panel de estadísticas detalladas
    loadDetailedStatsPanel();
}

function loadDetailedStatsPanel() {
    const progressContainer = document.querySelector('.progress-container');
    if (!progressContainer) return;
    
    // Verificar si ya existe el panel de estadísticas
    let statsPanel = progressContainer.querySelector('.stats-dashboard');
    if (!statsPanel) {
        statsPanel = document.createElement('div');
        statsPanel.className = 'stats-dashboard';
        progressContainer.appendChild(statsPanel);
    }
    

    
    statsPanel.innerHTML = STATISTICS_SYSTEM.createDetailedStatsPanel();
}

function loadAchievementsPanel() {
    const progressContainer = document.querySelector('.progress-container');
    if (!progressContainer) return;
    
    // Verificar si ya existe el panel de logros
    let achievementsPanel = progressContainer.querySelector('.achievements-panel');
    if (!achievementsPanel) {
        achievementsPanel = document.createElement('div');
        achievementsPanel.className = 'achievements-panel';
        progressContainer.appendChild(achievementsPanel);
    }
    
    const achievementProgress = ACHIEVEMENTS_SYSTEM.getAchievementProgress();
    
    achievementsPanel.innerHTML = `
        <div class="achievements-header">
            <h3 class="achievements-title">
                <i class="fas fa-trophy"></i> Logros y Recompensas
            </h3>
            <div class="achievements-progress">
                <span>${achievementProgress.unlocked}/${achievementProgress.total}</span>
                <span>(${achievementProgress.percentage}%)</span>
            </div>
        </div>
        <div class="achievements-grid">
            ${ACHIEVEMENTS_SYSTEM.achievements.map(achievement => `
                <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
                    <div class="achievement-card-header">
                        <div class="achievement-card-icon">
                            ${achievement.icon}
                        </div>
                        <h4 class="achievement-card-title">${achievement.title}</h4>
                    </div>
                    <p class="achievement-card-description">${achievement.description}</p>
                    <div class="achievement-card-reward">
                        <span class="achievement-xp-reward">+${achievement.xpReward} XP</span>
                        ${achievement.unlocked && achievement.unlockedAt ? 
                            `<span class="achievement-unlock-date">Desbloqueado: ${new Date(achievement.unlockedAt).toLocaleDateString()}</span>` : 
                            '<span class="achievement-unlock-date">No desbloqueado</span>'
                        }
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Sistema de logros
function checkAchievements() {
    // Verificar logros usando el nuevo sistema
    ACHIEVEMENTS_SYSTEM.checkAchievements();
}

function unlockAchievement(achievement) {
    // Función legacy - ahora usa ACHIEVEMENTS_SYSTEM
    ACHIEVEMENTS_SYSTEM.showAchievementNotification(achievement);
}

// Event listeners para ejercicios (ya manejados en la inicialización principal)

// --- Sonidos de feedback ---
// Función para crear sonidos usando Web Audio API
function createSound(frequency, duration, type = 'sine') {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
        console.log('Audio no disponible:', e);
    }
}

// Sonidos de feedback usando Web Audio API
function playSuccessSound() {
    createSound(800, 0.3, 'sine'); // Sonido agudo para éxito
}

function playFailSound() {
    createSound(200, 0.5, 'sawtooth'); // Sonido grave para fallo
}

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
    
    // Emojis motivadores
    const emojis = ['🎉', '🚀', '👏', '💪', '🌟', '🔥', '😃', '🥳', '🏆', '😎'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    if (isCorrect) {
        if (resultDiv) {
            resultDiv.innerHTML = `<div class="success exercise-success-animate">¡Correcto! ${randomEmoji} ¡Sigue así!</div>`;
        }
        appState.currentXP += 10;
        playSuccessSound();
        practiceStreak++;
        
        // Verificar logro de puntuación perfecta (si es el primer ejercicio correcto de la sesión)
        if (practiceStreak === 1) {
            // Verificar si ya tiene el logro de puntuación perfecta
            const perfectScoreAchievement = ACHIEVEMENTS_SYSTEM.achievements.find(a => a.id === 'perfect_score');
            if (perfectScoreAchievement && !perfectScoreAchievement.unlocked) {
                perfectScoreAchievement.unlocked = true;
                perfectScoreAchievement.unlockedAt = new Date().toISOString();
                appState.currentXP += perfectScoreAchievement.xpReward;
                ACHIEVEMENTS_SYSTEM.showAchievementNotification(perfectScoreAchievement);
            }
        }
    } else {
        if (resultDiv) {
        resultDiv.innerHTML = '<div class="error">Incorrecto. Intenta de nuevo.</div>';
        }
        playFailSound();
        practiceStreak = 0;
    }
    
    updateUI();
    saveProgress();
    
    // Registrar actividad en estadísticas
    STATISTICS_SYSTEM.recordActivity('exercise_completed', {
        type: 'vocabulary',
        success: isCorrect,
        xpEarned: isCorrect ? 10 : 0
    });
    
    setTimeout(() => {
        // Si estamos en la sección de práctica y modo vocabulario, gramática o listening, avanzar a la siguiente pregunta
        const practiceArea = document.getElementById('practiceArea');
        if (practiceArea && practiceArea.offsetParent !== null) {
            // Buscar el título de la sección para saber el modo
            const header = practiceArea.querySelector('.practice-header h3');
            if (header) {
                const modo = header.textContent.trim().toLowerCase();
                if (['vocabulario', 'gramática', 'comprensión'].includes(modo)) {
                    // Avance automático de lección tras 5 aciertos
                    const allowedLessons = getAllowedLessonsByLevel();
                    if (isCorrect && practiceStreak >= 5) {
                        practiceStreak = 0;
                        practiceLessonIndex++;
                        if (practiceLessonIndex >= allowedLessons.length) {
                            practiceLessonIndex = 0;
                            showNotification('¡Felicidades! Has completado todas las lecciones de tu nivel. ¡Sigue practicando para subir de nivel! 🎓', 'success');
                        } else {
                            showNotification('¡Avanzas a la siguiente lección de tu nivel! 🚀', 'success');
                        }
                        loadPracticeExercise(modo === 'vocabulario' ? 'vocabulary' : modo === 'gramática' ? 'grammar' : 'listening');
                        return;
                    }
                    if (isCorrect) {
                        loadPracticeExercise(modo === 'vocabulario' ? 'vocabulary' : modo === 'gramática' ? 'grammar' : 'listening');
                        return;
                    }
                }
            }
        }
        
        // Volver a habilitar botones para siguiente ejercicio
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = false;
            btn.style.background = '';
            btn.style.color = '';
        });
        if (resultDiv) {
        resultDiv.innerHTML = '';
        }
    }, 1200);
}

// Reasignar event listeners a los botones de opción tras recargar pregunta
function reattachOptionBtnListeners() {
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.onclick = function() { handleExerciseAnswer(btn); };
    });
}

// Delegación de eventos global (por si acaso)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('option-btn')) {
        handleExerciseAnswer(e.target);
    }
});

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
    const currentLessonId = appState.currentLesson;
    
    // Verificar si la lección ya fue completada
    if (isLessonCompleted(currentLessonId)) {
        showNotification('Esta lección ya fue completada anteriormente.', 'info');
        // Solo avanzar a la siguiente lección sin sumar XP
        appState.currentLesson++;
        if (appState.currentLesson >= LESSONS_DATABASE.level1.length) {
            appState.currentLesson = 0; // Volver al inicio si se completaron todas
        }
        loadCurrentLesson();
        return;
    }
    
    // Marcar lección como completada y sumar XP
    markLessonCompleted(currentLessonId);
    appState.lessonsCompleted++;
    appState.currentXP += LEVEL_SYSTEM.xpPerLesson;
    appState.vocabularyWordsLearned += LESSONS_DATABASE.level1[currentLessonId].vocabulary.length;
    
    // Actualizar progreso semanal
    const today = new Date().getDay();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = dayNames[today];
    appState.weeklyProgress[currentDay] += LEVEL_SYSTEM.xpPerLesson;
    
    // Verificar si subió de nivel
    const leveledUp = checkLevelUp();
    
    // Avanzar a la siguiente lección
    appState.currentLesson++;
    if (appState.currentLesson >= LESSONS_DATABASE.level1.length) {
        appState.currentLesson = 0; // Volver al inicio si se completaron todas
    }
    
    updateUI();
    saveProgress();
    checkAchievements();
    
    // Verificar logros específicos después de completar lección
    ACHIEVEMENTS_SYSTEM.checkAchievements();
    
    // Registrar actividad en estadísticas
    STATISTICS_SYSTEM.recordActivity('lesson_completed', {
        lessonId: currentLessonId,
        xpEarned: LEVEL_SYSTEM.xpPerLesson,
        success: true
    });
    
    // Cargar siguiente lección
    loadCurrentLesson();
    
    // Sincronizar práctica con la nueva lección
    if (document.getElementById('practice').classList.contains('active')) {
        // Si estamos en la sección de práctica, actualizar para mostrar la nueva lección
        const practiceArea = document.getElementById('practiceArea');
        if (practiceArea && practiceArea.style.display !== 'none') {
            // Si hay un ejercicio activo, recargarlo con la nueva lección
            const header = practiceArea.querySelector('.practice-header h3');
            if (header) {
                const modo = header.textContent.trim().toLowerCase();
                if (['vocabulario', 'gramática', 'comprensión', 'pronunciación'].includes(modo)) {
                    const modeMap = {
                        'vocabulario': 'vocabulary',
                        'gramática': 'grammar',
                        'comprensión': 'listening',
                        'pronunciación': 'pronunciation'
                    };
                    loadPracticeExercise(modeMap[modo]);
                }
            }
        }
    }
    
    // Mostrar notificación
    const xpMessage = leveledUp ? 
        `¡Lección completada! +${LEVEL_SYSTEM.xpPerLesson} XP` : 
        `¡Lección completada! +${LEVEL_SYSTEM.xpPerLesson} XP`;
    showNotification(xpMessage, 'success');
}

function reviewLesson() {
    showNotification('Repasando lección actual...', 'info');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Para mensajes largos, usar un diseño diferente
    if (message.length > 100) {
        notification.style.maxWidth = '400px';
        notification.style.padding = '1.5m';
    }
    
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Para mensajes largos, mostrar por más tiempo
    const duration = message.length >10? 5000 : 3000;
    setTimeout(() => {
        notification.remove();
    }, duration);
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
        
        // Verificar logros de racha después de actualizar
        ACHIEVEMENTS_SYSTEM.checkAchievements();
        
        // Registrar actividad de racha
        STATISTICS_SYSTEM.recordActivity('streak_updated', {
            streakDays: appState.streakDays,
            xpEarned: 0
        });
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
    
    // Agregar sección de palabras difíciles al inicio
    const difficultWords = getDifficultWords();
    if (difficultWords.length > 0) {
        const difficultCard = document.createElement('div');
        difficultCard.className = 'category-card difficult-words-card';
        difficultCard.onclick = () => loadDifficultWordsSection();
        
        difficultCard.innerHTML = `
            <h3><span style="font-size:1.2em">🚩</span> Palabras Difíciles</h3>
            <p>Repasa las palabras que has marcado como difíciles</p>
            <div class="category-stats">
                <span>${difficultWords.length} palabras</span>
                <span>Para repasar</span>
            </div>
            <div class="category-progress">
                <div class="category-progress-fill" style="width: 100%; background: linear-gradient(90deg, #ff6b6b, #ee5a24);"></div>
            </div>
        `;
        
        categoriesGrid.appendChild(difficultCard);
    }
    
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
            ${vocabulary.map((item, index) => `
                <div class="vocabulary-item-detail" data-word-index="${index}">
                    <div class="vocab-header">
                        <div class="english">${item.english}</div>
                        <button class="speak-btn" onclick="speakText('${item.english}', 'en-US')" title="Escuchar pronunciación">
                            <i class="fas fa-volume-up"></i>
                        </button>
                        <button class="difficult-btn" 
                                data-english="${item.english}"
                                data-spanish="${item.spanish}"
                                data-pronunciation="${item.pronunciation}"
                                title="${isWordDifficult(item) ? 'Quitar de difíciles' : 'Marcar como difícil'}">
                            ${isWordDifficult(item) ? '🚩' : '🏳️'}
                        </button>
                    </div>
                    <div class="spanish">${item.spanish}</div>
                    <div class="pronunciation">[${item.pronunciation}]</div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Agregar event listeners para los botones de palabras difíciles
    const difficultButtons = vocabularyDetail.querySelectorAll('.difficult-btn');
    difficultButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wordObj = {
                english: this.getAttribute('data-english'),
                spanish: this.getAttribute('data-spanish'),
                pronunciation: this.getAttribute('data-pronunciation')
            };
            toggleDifficultWord(wordObj);
        });
    });
    
    // Agregar event listeners para los botones de audio del ejercicio de listening
    const playBtn = vocabularyDetail.querySelector('.play-btn');
    const pauseBtn = vocabularyDetail.querySelector('.pause-btn');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            const text = this.getAttribute('data-text');
            console.log('Reproduciendo audio:', text);
            playListeningAudio(text);
        });
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            pauseListeningAudio();
        });
    }
}

// --- Autenticación básica (modal) ---

// Mostrar modal y overlay
function showAuthModal() {
    console.log('Mostrando modal de autenticación...');
    const authOverlay = document.getElementById('authOverlay');
    const authModal = document.getElementById('authModal');
    const mainApp = document.getElementById('mainApp');
    
    if (authOverlay && authModal && mainApp) {
        authOverlay.style.display = 'block';
        authModal.style.display = 'block';
        mainApp.style.filter = 'blur(2px)';
        console.log('Modal de autenticación mostrado correctamente');
    } else {
        console.error('Error: No se encontraron elementos del modal de autenticación');
        console.log('authOverlay:', authOverlay);
        console.log('authModal:', authModal);
        console.log('mainApp:', mainApp);
    }
}
// Ocultar modal y overlay
function hideAuthModal() {
    document.getElementById('authOverlay').style.display = 'none';
    document.getElementById('authModal').style.display = 'none';
    document.getElementById('mainApp').style.filter = 'none';
}

// Mostrar modal de diagnóstico
function showDiagnosticModal(onFinish) {
    document.getElementById('diagnosticModal').style.display = 'block';
    document.getElementById('authOverlay').style.display = 'block';
    document.getElementById('mainApp').style.filter = 'blur(2px)';
    // Reset formulario y resultado
    document.getElementById('diagnosticForm').reset();
    document.getElementById('diagnosticResult').style.display = 'none';
    document.getElementById('diagnosticForm').style.display = 'block';
    // Guardar callback para finalizar
    window._diagnosticOnFinish = onFinish;
}
// Ocultar modal de diagnóstico
function hideDiagnosticModal() {
    document.getElementById('diagnosticModal').style.display = 'none';
    document.getElementById('authOverlay').style.display = 'none';
    document.getElementById('mainApp').style.filter = 'none';
}
// Evaluar respuestas y sugerir nivel MCER
function evaluateDiagnostic(formData) {
    // Respuestas correctas: q1=a, q2=c, q3=b, q4=a, q5=b, q6=b, q7=b, q8=c, q9=c, q10=a, q11=c, q12=b
    let score = 0;
    if (formData.get('q1') === 'a') score++;
    if (formData.get('q2') === 'c') score++;
    if (formData.get('q3') === 'b') score++;
    if (formData.get('q4') === 'a') score++;
    if (formData.get('q5') === 'b') score++;
    if (formData.get('q6') === 'b') score++;
    if (formData.get('q7') === 'b') score++;
    if (formData.get('q8') === 'c') score++;
    if (formData.get('q9') === 'c') score++;
    if (formData.get('q10') === 'a') score++;
    if (formData.get('q11') === 'c') score++;
    if (formData.get('q12') === 'b') score++;
    // Asignar nivel según score
    let level = '', mcer = '';
    if (score <= 3) { level = 'Principiante'; mcer = 'A1'; }
    else if (score <= 6) { level = 'Básico'; mcer = 'A2'; }
    else if (score <= 9) { level = 'Intermedio'; mcer = 'B1'; }
    else { level = 'Avanzado'; mcer = 'B2'; }
    return { level, mcer, score };
}
// Mostrar resultado y permitir ajuste
function showDiagnosticResult(result) {
    const resultDiv = document.getElementById('diagnosticResult');
    
    // Obtener el nombre del usuario del formulario de registro
    const userName = document.getElementById('registerName') ? document.getElementById('registerName').value.trim() : '';
    
    let niveles = [
        { label: 'Principiante', mcer: 'A1', mensaje: '¡Perfecto para comenzar desde cero! Te guiaremos paso a paso.' },
        { label: 'Básico', mcer: 'A2', mensaje: '¡Buen trabajo! Ya tienes bases, sigamos avanzando.' },
        { label: 'Intermedio', mcer: 'B1', mensaje: '¡Muy bien! Puedes desenvolverte en situaciones cotidianas.' },
        { label: 'Avanzado', mcer: 'B2', mensaje: '¡Excelente! Tienes un dominio sólido del inglés.' }
    ];
    let nivelActual = niveles.find(n => n.label === result.level) || niveles[0];
    let nivelOptions = niveles.map(n =>
        `<option value="${n.label}|${n.mcer}" ${n.label === result.level ? 'selected' : ''}>${n.label} (${n.mcer})</option>`
    ).join('');
    
    const saludo = userName ? `¡Hola ${userName}!` : '¡Hola!';
    
    resultDiv.innerHTML = `
        <h3>Resultado del Diagnóstico</h3>
        <p>${saludo}</p>
        <p>Tu nivel sugerido es: <strong>${result.level} (${result.mcer})</strong></p>
        <p>${nivelActual.mensaje}</p>
        <label>Ajustar nivel si lo consideras necesario:</label><br>
        <select id="diagnosticLevelSelect">${nivelOptions}</select>
        <br><br>
        <button class="btn btn-violet" id="acceptDiagnosticBtn">Aceptar y Continuar</button>
    `;
    resultDiv.style.display = 'block';
    document.getElementById('diagnosticForm').style.display = 'none';
    // Evento aceptar
    document.getElementById('acceptDiagnosticBtn').onclick = function() {
        const val = document.getElementById('diagnosticLevelSelect').value;
        const [level, mcer] = val.split('|');
        if (window._diagnosticOnFinish) window._diagnosticOnFinish({ level, mcer });
        hideDiagnosticModal();
    };
}
// Interceptar envío del diagnóstico
const diagnosticForm = document.getElementById('diagnosticForm');
if (diagnosticForm) {
    diagnosticForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(diagnosticForm);
        const result = evaluateDiagnostic(formData);
        showDiagnosticResult(result);
    });
}

// Alternar entre formularios
function setupAuthTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.getAttribute('data-tab');
            if (target === 'login') {
                document.getElementById('loginForm').classList.add('active');
            } else {
                document.getElementById('registerForm').classList.add('active');
                }
            });
        });
}

// Registrar usuario
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    if (!name || !email || !password) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }
    let users = JSON.parse(localStorage.getItem('englishLearningUsers') || '[]');
    if (users.find(u => u.email === email)) {
        showNotification('Ya existe una cuenta con ese email', 'error');
        return;
    }
    // Mostrar diagnóstico tras registro
    showDiagnosticModal(function(diagnostic) {
        users.push({ name, email, password, level: diagnostic.level, mcer: diagnostic.mcer });
        localStorage.setItem('englishLearningUsers', JSON.stringify(users));
        
        // Mostrar mensaje de bienvenida elaborado
        showWelcomeMessage(name, diagnostic.level, diagnostic.mcer);
        
        hideAuthModal(); // Ocultar el modal de autenticación después del diagnóstico
        document.querySelector('.auth-tab[data-tab="login"]').click();
    });
}

// Iniciar sesión
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    let users = JSON.parse(localStorage.getItem('englishLearningUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        showNotification('Email o contraseña incorrectos', 'error');
        return;
    }
    localStorage.setItem('englishLearningSession', JSON.stringify({
        email: user.email, 
        name: user.name 
    }));
    hideAuthModal();
    
    // Mostrar mensaje de bienvenida
    showNotification(`👋 ¡Bienvenido de vuelta, ${user.name}!`, 'success');
    
    // Actualizar la visualización del usuario inmediatamente
    updateUserDisplay();
    
    // Cargar el progreso del usuario
        loadProgress();
    
    // Actualizar la UI
    updateUI();
    
    // Cargar la lección actual
        loadCurrentLesson();
}

// Función para obtener el usuario actual
function getCurrentUser() {
    const session = JSON.parse(localStorage.getItem('englishLearningSession') || 'null');
    if (session && session.email) {
        const users = JSON.parse(localStorage.getItem('englishLearningUsers') || '[]');
        const user = users.find(u => u.email === session.email);
        return user;
    }
    return null;
}

// Función para actualizar la visualización del usuario en el header
function updateUserDisplay() {
    const user = getCurrentUser();
    const userDisplay = document.getElementById('userDisplay');
    
    if (user && userDisplay) {
        const userLevel = user.mcer || 'A1'; // Usar el nivel MCER del usuario o A1 por defecto
        userDisplay.innerHTML = `
            <div class="user-info">
                <i class="fas fa-user-graduate"></i>
                <div class="user-details">
                    <span class="user-name">${user.name}</span>
                    <span class="user-level">${userLevel}</span>
                </div>
            </div>
        `;
        userDisplay.style.display = 'flex';
    } else if (userDisplay) {
        userDisplay.style.display = 'none';
    }
}

// Verificar sesión al cargar
function checkAuth() {
    console.log('Verificando autenticación...');
    const session = JSON.parse(localStorage.getItem('englishLearningSession') || 'null');
    console.log('Sesión encontrada:', session);
    
    if (session && session.email) {
        console.log('Usuario autenticado, ocultando modal...');
        hideAuthModal();
        updateUserDisplay();
        loadProgress();
        updateUI();
        loadCurrentLesson();
    } else {
        console.log('Usuario no autenticado, mostrando modal...');
        showAuthModal();
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('englishLearningSession');
    updateUserDisplay();
    showAuthModal();
}

// Asignar eventos
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando aplicación...');
    setupAuthTabs();
    checkAuth();
    
    // Configurar navegación
    initializeNavigation();
    
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
    
    // Event listeners para autenticación
    const registerForm = document.getElementById('registerForm');
    if (registerForm) registerForm.addEventListener('submit', handleRegister);
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
});
// --- Fin autenticación modal --- 

// Sistema de niveles y XP mejorado
const LEVEL_SYSTEM = {
    xpPerLevel: 200, // XP requerido para subir de nivel
    xpPerLesson: 50, // XP por lección completada
    xpPerExercise: 10 // XP por ejercicio completado
};

// Función para calcular el nivel basado en XP total
function calculateLevel(xp) {
    return Math.floor(xp / LEVEL_SYSTEM.xpPerLevel) + 1;
}

// Función para calcular XP necesario para el siguiente nivel
function getXPForNextLevel(currentLevel) {
    return currentLevel * LEVEL_SYSTEM.xpPerLevel;
}

// Función para verificar si una lección ya fue completada
function isLessonCompleted(lessonId) {
    return appState.userProgress[lessonId] && appState.userProgress[lessonId].completed;
}

// Función para marcar una lección como completada
function markLessonCompleted(lessonId) {
    if (!appState.userProgress[lessonId]) appState.userProgress[lessonId] = {};
    appState.userProgress[lessonId].completed = true;
    appState.userProgress[lessonId].completedAt = new Date().toISOString();
}

// Función para verificar si el usuario subió de nivel
function checkLevelUp() {
    const newLevel = calculateLevel(appState.currentXP);
    if (newLevel > appState.currentLevel) {
        appState.currentLevel = newLevel;
        practiceLessonIndex = 0;
        showNotification(`¡Nivel ${newLevel} alcanzado! 🎉 Nuevas lecciones de práctica desbloqueadas.`, 'success');
        return true;
    }
    return false;
}

// Función para mostrar mensaje de bienvenida elaborado
function showWelcomeMessage(name, level, mcer) {
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcome-message';
    welcomeDiv.innerHTML = `
        <div class="welcome-content">
            <div class="welcome-header">
                <div class="welcome-icon">🎓</div>
                <div class="welcome-sparkles">
                    <span>✨</span><span>⭐</span><span>✨</span>
                </div>
            </div>
            <h3>¡Bienvenido a English Learning!</h3>
            <p class="welcome-name">Hola, <strong>${name}</strong></p>
            <div class="welcome-level-container">
                <p class="welcome-level">Tu nivel asignado es:</p>
                <span class="level-badge">${level} (${mcer})</span>
            </div>
            <p class="welcome-text">¡Estás listo para comenzar tu viaje de aprendizaje del inglés!</p>
            <div class="welcome-features">
                <div class="feature-item">
                    <i class="fas fa-book"></i>
                    <span>Aprender</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-dumbbell"></i>
                    <span>Practicar</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-comments"></i>
                    <span>Aplicar</span>
                </div>
            </div>
            <button class="btn btn-violet welcome-btn" id="closeWelcomeBtn">
                <i class="fas fa-rocket"></i> ¡Comenzar Aprendizaje!
            </button>
        </div>
    `;
    document.body.appendChild(welcomeDiv);
    // Cerrar al hacer click en el botón
    const closeBtn = welcomeDiv.querySelector('#closeWelcomeBtn');
    if (closeBtn) {
        closeBtn.onclick = () => {
            if (welcomeDiv.parentElement) welcomeDiv.remove();
        };
    }
    // Remover automáticamente después de 10 segundos
    setTimeout(() => {
        if (welcomeDiv.parentElement) {
            welcomeDiv.remove();
        }
    }, 10000);
}

// Sistema de Listening Mejorado
const LISTENING_SYSTEM = {
    // Base de datos de ejercicios de listening
    exercises: [
        {
            id: 'listening_1',
            title: 'Saludos y Presentaciones',
            difficulty: 'A1',
            audioUrl: null, // Usar Web Speech API en su lugar
            transcript: 'Hello, my name is Sarah. Nice to meet you!',
            questions: [
                {
                    question: '¿Cuál es el nombre de la persona?',
                    options: ['Sarah', 'Susan', 'Sara', 'Sally'],
                    correct: 0
                },
                {
                    question: '¿Qué está haciendo la persona?',
                    options: ['Despidiéndose', 'Presentándose', 'Preguntando la hora', 'Ordenando comida'],
                    correct: 1
                }
            ],
            vocabulary: ['hello', 'name', 'nice', 'meet']
        },
        {
            id: 'listening_2',
            title: 'En el Restaurante',
            difficulty: 'A2',
            audioUrl: null, // Usar Web Speech API en su lugar
            transcript: 'I would like to order a pizza and a glass of water, please.',
            questions: [
                {
                    question: '¿Qué quiere ordenar la persona?',
                    options: ['Una hamburguesa', 'Una pizza', 'Una ensalada', 'Un sandwich'],
                    correct: 1
                },
                {
                    question: '¿Qué bebida pide?',
                    options: ['Coca cola', 'Agua', 'Café', 'Té'],
                    correct: 1
                }
            ],
            vocabulary: ['order', 'pizza', 'glass', 'water', 'please']
        },
        {
            id: 'listening_3',
            title: 'Conversación Casual',
            difficulty: 'B1',
            audioUrl: null,
            transcript: 'The weather is really nice today. I think I will go for a walk in the park.',
            questions: [
                {
                    question: '¿Cómo está el clima?',
                    options: ['Lluvioso', 'Agradable', 'Frío', 'Caluroso'],
                    correct: 1
                },
                {
                    question: '¿Qué planea hacer la persona?',
                    options: ['Quedarse en casa', 'Ir al parque', 'Ir de compras', 'Ver una película'],
                    correct: 1
                }
            ],
            vocabulary: ['weather', 'nice', 'walk', 'park']
        },
        {
            id: 'listening_4',
            title: 'En el Aeropuerto',
            difficulty: 'A2',
            audioUrl: null,
            transcript: 'Excuse me, where is the departure gate for flight 123?',
            questions: [
                {
                    question: '¿Qué está preguntando la persona?',
                    options: ['El precio del boleto', 'La puerta de embarque', 'El horario del vuelo', 'La ubicación del baño'],
                    correct: 1
                },
                {
                    question: '¿Cuál es el número del vuelo?',
                    options: ['123', '321', '132', '213'],
                    correct: 0
                }
            ],
            vocabulary: ['excuse', 'departure', 'gate', 'flight']
        },
        {
            id: 'listening_5',
            title: 'Conversación de Trabajo',
            difficulty: 'B1',
            audioUrl: null,
            transcript: 'I have a meeting at 3 PM tomorrow. Can you send me the agenda?',
            questions: [
                {
                    question: '¿Cuándo es la reunión?',
                    options: ['Hoy a las 3 PM', 'Mañana a las 3 PM', 'Esta semana', 'El próximo mes'],
                    correct: 1
                },
                {
                    question: '¿Qué pide la persona?',
                    options: ['Un café', 'La agenda', 'Un taxi', 'Un documento'],
                    correct: 1
                }
            ],
            vocabulary: ['meeting', 'tomorrow', 'send', 'agenda']
        },
        {
            id: 'listening_6',
            title: 'En la Tienda',
            difficulty: 'A2',
            audioUrl: null,
            transcript: 'How much does this shirt cost? Do you have it in blue?',
            questions: [
                {
                    question: '¿Qué está preguntando sobre el precio?',
                    options: ['Un pantalón', 'Una camisa', 'Un zapato', 'Un sombrero'],
                    correct: 1
                },
                {
                    question: '¿En qué color lo quiere?',
                    options: ['Rojo', 'Azul', 'Verde', 'Negro'],
                    correct: 1
                }
            ],
            vocabulary: ['much', 'cost', 'shirt', 'blue']
        },
        {
            id: 'listening_7',
            title: 'Conversación Familiar',
            difficulty: 'B1',
            audioUrl: null,
            transcript: 'What time will you be home for dinner? I\'m making your favorite pasta.',
            questions: [
                {
                    question: '¿Qué está preguntando?',
                    options: ['El precio de la cena', 'La hora de llegada', 'El menú del restaurante', 'El clima'],
                    correct: 1
                },
                {
                    question: '¿Qué está preparando para la cena?',
                    options: ['Pollo', 'Pasta', 'Ensalada', 'Sopa'],
                    correct: 1
                }
            ],
            vocabulary: ['time', 'home', 'dinner', 'favorite', 'pasta']
        },
        {
            id: 'listening_8',
            title: 'En el Hospital',
            difficulty: 'B2',
            audioUrl: null,
            transcript: 'The doctor will see you in about 15 minutes. Please fill out this form while you wait.',
            questions: [
                {
                    question: '¿Cuánto tiempo debe esperar?',
                    options: ['5 minutos', '15 minutos', '30 minutos', '1 hora'],
                    correct: 1
                },
                {
                    question: '¿Qué debe hacer mientras espera?',
                    options: ['Ir a casa', 'Llenar un formulario', 'Tomar medicamentos', 'Hacer ejercicio'],
                    correct: 1
                }
            ],
            vocabulary: ['doctor', 'minutes', 'fill', 'form', 'wait']
        },
        {
            id: 'listening_9',
            title: 'Conversación Académica',
            difficulty: 'B2',
            audioUrl: null,
            transcript: 'Your research paper is due next Friday. Make sure to include proper citations.',
            questions: [
                {
                    question: '¿Cuándo vence el trabajo?',
                    options: ['Hoy', 'Mañana', 'El próximo viernes', 'El próximo mes'],
                    correct: 2
                },
                {
                    question: '¿Qué debe incluir el trabajo?',
                    options: ['Fotos', 'Citas apropiadas', 'Música', 'Videos'],
                    correct: 1
                }
            ],
            vocabulary: ['research', 'paper', 'due', 'include', 'citations']
        },
        {
            id: 'listening_10',
            title: 'Conversación Social Avanzada',
            difficulty: 'C1',
            audioUrl: null,
            transcript: 'I\'ve been thinking about traveling to Europe this summer. Have you ever been there?',
            questions: [
                {
                    question: '¿Qué está considerando hacer?',
                    options: ['Comprar una casa', 'Viajar a Europa', 'Cambiar de trabajo', 'Estudiar'],
                    correct: 1
                },
                {
                    question: '¿Cuándo planea viajar?',
                    options: ['En invierno', 'En primavera', 'En verano', 'En otoño'],
                    correct: 2
                }
            ],
            vocabulary: ['thinking', 'traveling', 'Europe', 'summer', 'ever']
        }
    ],
    
    // Crear ejercicio de listening mejorado
    createListeningExercise(exercise) {
        const practiceArea = document.getElementById('practiceArea');
        
        practiceArea.innerHTML = `
            <div class="practice-header">
                <button class="back-btn" onclick="backToPracticeModes()">
                    <i class="fas fa-arrow-left"></i> Volver
                </button>
                <h3><i class="fas fa-headphones"></i> Comprensión Auditiva</h3>
                <div class="difficulty-badge">${exercise.difficulty}</div>
            </div>
            
            <div class="listening-exercise">
                <div class="audio-player">
                    <div class="audio-controls">
                        <button class="play-btn" id="playBtn" onclick="LISTENING_SYSTEM.playAudio()">
                            <i class="fas fa-play"></i> Reproducir
                        </button>
                        <button class="pause-btn" id="pauseBtn" onclick="LISTENING_SYSTEM.pauseAudio()" style="display: none;">
                            <i class="fas fa-pause"></i> Pausar
                        </button>
                        <div class="speed-controls">
                            <label>Velocidad:</label>
                            <select id="speedSelect" onchange="LISTENING_SYSTEM.changeSpeed()">
                                <option value="0.5">0.5x</option>
                                <option value="0.75">0.75x</option>
                                <option value="1" selected>1x</option>
                                <option value="1.25">1.25x</option>
                                <option value="1.5">1.5x</option>
                            </select>
                        </div>
                    </div>
                    <div class="audio-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="audioProgress"></div>
                        </div>
                        <span class="time-display" id="timeDisplay">0:00 / 0:00</span>
                    </div>
                </div>
                
                <div class="transcript-section">
                    <h4><i class="fas fa-file-text"></i> Transcripción</h4>
                    <div class="transcript-container">
                        <p class="transcript-text" id="transcriptText">${exercise.transcript}</p>
                        <button class="show-transcript-btn" id="showTranscriptBtn" onclick="LISTENING_SYSTEM.toggleTranscript()">
                            <i class="fas fa-eye"></i> Mostrar Transcripción
                        </button>
                    </div>
                </div>
                
                <div class="vocabulary-section">
                    <h4><i class="fas fa-book"></i> Vocabulario Clave</h4>
                    <div class="vocabulary-list">
                        ${exercise.vocabulary.map(word => `
                            <div class="vocab-item">
                                <span class="word">${word}</span>
                                <button class="speak-btn" onclick="speakText('${word}', 'en-US')">
                                    <i class="fas fa-volume-up"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="questions-section">
                    <h4><i class="fas fa-question-circle"></i> Preguntas de Comprensión</h4>
                    <div class="questions-container">
                        ${exercise.questions.map((q, index) => `
                            <div class="question-card">
                                <h5>Pregunta ${index + 1}</h5>
                                <p>${q.question}</p>
                                <div class="options-grid">
                                    ${q.options.map((option, optIndex) => `
                                        <button class="option-btn" data-question="${index}" data-option="${optIndex}" data-correct="${optIndex === q.correct}">
                                            ${option}
                                        </button>
                                    `).join('')}
                                </div>
                                <div class="question-feedback" id="feedback-${index}" style="display: none;"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="exercise-actions">
                    <button class="btn btn-primary" onclick="LISTENING_SYSTEM.checkAnswers()">
                        <i class="fas fa-check"></i> Verificar Respuestas
                    </button>
                    <button class="btn btn-secondary" onclick="LISTENING_SYSTEM.resetExercise()">
                        <i class="fas fa-redo"></i> Reiniciar
                    </button>
                </div>
            </div>
        `;
        
        // Inicializar audio
        this.initializeAudio(exercise.audioUrl);
        
        // Adjuntar event listeners
        this.attachEventListeners();
    },
    
    // Inicializar audio
    initializeAudio(audioUrl) {
        if (audioUrl) {
            // Si hay URL de audio, usar el archivo
            this.audio = new Audio(audioUrl);
            this.audio.preload = 'metadata';
            
            this.audio.addEventListener('loadedmetadata', () => {
                this.updateTimeDisplay();
            });
            
            this.audio.addEventListener('timeupdate', () => {
                this.updateProgress();
            });
            
            this.audio.addEventListener('ended', () => {
                this.onAudioEnd();
            });
            
            this.audio.addEventListener('error', (e) => {
                console.log('Error cargando audio:', e);
                this.audio = null;
                this.showAudioUnavailableMessage();
            });
        } else {
            // Si no hay URL, usar Web Speech API
            this.audio = null;
            this.showAudioUnavailableMessage();
        }
    },
    
    // Mostrar mensaje cuando el audio no está disponible (SISTEMA ANTIGUO - NO USAR)
    showAudioUnavailableMessage() {
        // Este sistema está deprecado - usar playListeningAudio en su lugar
        console.warn('Sistema de audio antiguo detectado - usar playListeningAudio');
    },
    
    // Reproducir audio
    playAudio() {
        if (this.audio) {
            this.audio.play();
            document.getElementById('playBtn').style.display = 'none';
            document.getElementById('pauseBtn').style.display = 'inline-block';
        } else {
            // Si no hay audio, usar Web Speech API para leer la transcripción
            const transcriptText = document.getElementById('transcriptText');
            if (transcriptText) {
                speakText(transcriptText.textContent, 'en-US');
            }
        }
    },
    
    // Pausar audio
    pauseAudio() {
        if (this.audio) {
            this.audio.pause();
            document.getElementById('playBtn').style.display = 'inline-block';
            document.getElementById('pauseBtn').style.display = 'none';
        }
    },
    
    // Cambiar velocidad
    changeSpeed() {
        const speed = parseFloat(document.getElementById('speedSelect').value);
        if (this.audio) {
            this.audio.playbackRate = speed;
        }
        // Nota: La velocidad no se puede cambiar para Web Speech API
    },
    
    // Actualizar progreso del audio
    updateProgress() {
        if (this.audio) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            document.getElementById('audioProgress').style.width = `${progress}%`;
            this.updateTimeDisplay();
        } else {
            // Si no hay audio, mostrar progreso simulado
            document.getElementById('audioProgress').style.width = '0%';
        }
    },
    
    // Actualizar display de tiempo
    updateTimeDisplay() {
        if (this.audio) {
            const current = this.formatTime(this.audio.currentTime);
            const total = this.formatTime(this.audio.duration);
            document.getElementById('timeDisplay').textContent = `${current} / ${total}`;
        } else {
            // Si no hay audio, mostrar tiempo simulado
            document.getElementById('timeDisplay').textContent = '0:00 / 0:00';
        }
    },
    
    // Formatear tiempo
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    },
    
    // Audio terminado
    onAudioEnd() {
        document.getElementById('playBtn').style.display = 'inline-block';
        document.getElementById('pauseBtn').style.display = 'none';
    },
    
    // Mostrar/ocultar transcripción
    toggleTranscript() {
        const transcriptText = document.getElementById('transcriptText');
        const showBtn = document.getElementById('showTranscriptBtn');
        
        if (transcriptText.style.display === 'none') {
            transcriptText.style.display = 'block';
            showBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Ocultar Transcripción';
        } else {
            transcriptText.style.display = 'none';
            showBtn.innerHTML = '<i class="fas fa-eye"></i> Mostrar Transcripción';
        }
    },
    
    // Adjuntar event listeners
    attachEventListeners() {
        const optionButtons = document.querySelectorAll('.option-btn');
        console.log('Adjuntando event listeners a', optionButtons.length, 'botones');
        
        optionButtons.forEach((btn, index) => {
            // Remover event listeners previos para evitar duplicados
            btn.removeEventListener('click', this.handleOptionClick);
            
            // Agregar nuevo event listener
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleOptionClick(e.target);
            });
            
            console.log(`Botón ${index}: data-question="${btn.dataset.question}", data-option="${btn.dataset.option}"`);
        });
    },
    
    // Manejar clic en opción
    handleOptionClick(button) {
        // Verificar que el botón tenga los datos necesarios
        if (!button.dataset.question) {
            console.warn('Botón sin data-question:', button);
            return;
        }
        
        const questionIndex = button.dataset.question;
        console.log('Seleccionando pregunta:', questionIndex, 'opción:', button.dataset.option);
        
        // Remover selección previa de la misma pregunta
        const sameQuestionButtons = document.querySelectorAll(`[data-question="${questionIndex}"]`);
        sameQuestionButtons.forEach(btn => {
            btn.classList.remove('selected');
            btn.style.background = '';
            btn.style.color = '';
        });
        
        // Seleccionar nueva opción
        button.classList.add('selected');
        button.style.background = 'var(--primary-color)';
        button.style.color = 'white';
        
        console.log('Botones de la pregunta', questionIndex, ':', sameQuestionButtons.length);
    },
    
    // Verificar respuestas
    checkAnswers() {
        let correctAnswers = 0;
        const totalQuestions = document.querySelectorAll('.question-card').length;
        
        document.querySelectorAll('.question-card').forEach((card, index) => {
            const selectedOption = card.querySelector('.option-btn.selected');
            const feedback = card.querySelector('.question-feedback');
            
            if (selectedOption) {
                const isCorrect = selectedOption.dataset.correct === 'true';
                
                if (isCorrect) {
                    correctAnswers++;
                    selectedOption.style.background = 'var(--success-color)';
                    selectedOption.style.color = 'white';
                    feedback.innerHTML = '<div class="success"><i class="fas fa-check"></i> ¡Correcto!</div>';
                } else {
                    selectedOption.style.background = 'var(--error-color)';
                    selectedOption.style.color = 'white';
                    
                    // Mostrar respuesta correcta
                    const correctOption = card.querySelector('[data-correct="true"]');
                    correctOption.style.background = 'var(--success-color)';
                    correctOption.style.color = 'white';
                    correctOption.style.border = '2px solid var(--success-color)';
                    
                    feedback.innerHTML = '<div class="error"><i class="fas fa-times"></i> Incorrecto</div>';
                }
                
                feedback.style.display = 'block';
            } else {
                feedback.innerHTML = '<div class="warning"><i class="fas fa-exclamation-triangle"></i> Selecciona una respuesta</div>';
                feedback.style.display = 'block';
            }
        });
        
        // Mostrar resultado final
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        const resultMessage = `
            <div class="exercise-result">
                <h4>Resultado: ${correctAnswers}/${totalQuestions} (${percentage}%)</h4>
                <p>${this.getResultMessage(percentage)}</p>
            </div>
        `;
        
        // Agregar resultado al final
        const exerciseActions = document.querySelector('.exercise-actions');
        const existingResult = document.querySelector('.exercise-result');
        if (existingResult) {
            existingResult.remove();
        }
        
        exerciseActions.insertAdjacentHTML('beforebegin', resultMessage);
        
        // Sumar XP basado en el resultado
        const xpEarned = Math.round((correctAnswers / totalQuestions) * 20);
        appState.currentXP += xpEarned;
        updateUI();
        saveProgress();
        
        // Mostrar animación de éxito/fracaso
        if (percentage >= 70) {
            playSuccessSound();
            showNotification(`¡Excelente! Ganaste ${xpEarned} XP`, 'success');
        } else {
            playFailSound();
            showNotification(`¡Sigue practicando! Ganaste ${xpEarned} XP`, 'info');
        }
        
        // Avanzar automáticamente a la siguiente lección después de 3 segundos
        setTimeout(() => {
            this.nextListeningExercise();
        }, 3000);
    },
    
    // Obtener mensaje de resultado
    getResultMessage(percentage) {
        if (percentage >= 90) return '¡Excelente! Tienes una comprensión auditiva muy buena. 🎉';
        if (percentage >= 70) return '¡Muy bien! Tu comprensión auditiva es buena. 👍';
        if (percentage >= 50) return 'Bien, pero puedes mejorar. Sigue practicando. 💪';
        return 'Necesitas más práctica. No te rindas, sigue escuchando. 📚';
    },
    
    // Reiniciar ejercicio
    resetExercise() {
        // Limpiar selecciones
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
            btn.style.background = '';
            btn.style.color = '';
            btn.style.border = '';
        });
        
        // Ocultar feedback
        document.querySelectorAll('.question-feedback').forEach(feedback => {
            feedback.style.display = 'none';
        });
        
        // Remover resultado
        const existingResult = document.querySelector('.exercise-result');
        if (existingResult) {
            existingResult.remove();
        }
        
        // Reiniciar audio
        if (this.audio) {
            this.audio.currentTime = 0;
            this.pauseAudio();
        }
        
        // Ocultar transcripción
        const transcriptText = document.getElementById('transcriptText');
        const showBtn = document.getElementById('showTranscriptBtn');
        if (transcriptText) {
            transcriptText.style.display = 'none';
            showBtn.innerHTML = '<i class="fas fa-eye"></i> Mostrar Transcripción';
        }
    },
    
    // Avanzar al siguiente ejercicio de listening
    nextListeningExercise() {
        // Obtener el nivel del usuario
        const userLevel = getUserLevelMCER();
        const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
        const userLevelIndex = levelOrder.indexOf(userLevel);
        
        // Filtrar ejercicios disponibles para el nivel del usuario
        const availableExercises = this.exercises.filter(ex => {
            const exerciseLevelIndex = levelOrder.indexOf(ex.difficulty);
            return exerciseLevelIndex <= userLevelIndex;
        });
        
        if (availableExercises.length === 0) {
            showNotification('No hay más ejercicios disponibles para tu nivel', 'info');
            backToPracticeModes();
            return;
        }
        
        // Seleccionar un ejercicio aleatorio diferente al actual
        let currentExerciseId = null;
        const currentExerciseTitle = document.querySelector('.listening-exercise h3')?.textContent;
        if (currentExerciseTitle) {
            const currentExercise = this.exercises.find(ex => 
                currentExerciseTitle.includes(ex.title)
            );
            if (currentExercise) {
                currentExerciseId = currentExercise.id;
            }
        }
        
        const remainingExercises = availableExercises.filter(ex => ex.id !== currentExerciseId);
        const nextExercise = remainingExercises.length > 0 
            ? remainingExercises[Math.floor(Math.random() * remainingExercises.length)]
            : availableExercises[Math.floor(Math.random() * availableExercises.length)];
        
        // Crear el siguiente ejercicio
        this.createListeningExercise(nextExercise);
        
        // Mostrar notificación
        showNotification(`Nuevo ejercicio: ${nextExercise.title}`, 'info');
        
        // Reproducir audio automáticamente después de 1 segundo
        setTimeout(() => {
            const transcriptText = document.getElementById('transcriptText');
            if (transcriptText) {
                playListeningAudio(transcriptText.textContent);
            }
        }, 1000);
    }
};

// Sistema de Estadísticas Detalladas
const STATISTICS_SYSTEM = {
    // Metas personalizadas del usuario
    goals: {
        dailyStudyTime: 30, // minutos
        weeklyLessons: 5,
        monthlyXP: 500,
        vocabularyGoal: 100
    },
    
    // Historial de actividades
    activityHistory: [],
    
    // Inicializar sistema
    init() {
        this.loadUserGoals();
        this.loadActivityHistory();
    },
    
    // Cargar metas del usuario
    loadUserGoals() {
        const user = getCurrentUser();
        if (!user) return;
        
        const savedGoals = localStorage.getItem(`goals_${user.email}`);
        if (savedGoals) {
            this.goals = { ...this.goals, ...JSON.parse(savedGoals) };
        }
    },
    
    // Guardar metas del usuario
    saveUserGoals() {
        const user = getCurrentUser();
        if (!user) return;
        
        localStorage.setItem(`goals_${user.email}`, JSON.stringify(this.goals));
    },
    
    // Cargar historial de actividades
    loadActivityHistory() {
        const user = getCurrentUser();
        if (!user) return;
        
        const savedHistory = localStorage.getItem(`activity_history_${user.email}`);
        if (savedHistory) {
            this.activityHistory = JSON.parse(savedHistory);
        }
    },
    
    // Guardar historial de actividades
    saveActivityHistory() {
        const user = getCurrentUser();
        if (!user) return;
        
        localStorage.setItem(`activity_history_${user.email}`, JSON.stringify(this.activityHistory));
    },
    
    // Registrar actividad
    recordActivity(type, details) {
        const activity = {
            id: Date.now(),
            type: type,
            details: details,
            timestamp: new Date().toISOString(),
            xpEarned: details.xpEarned || 0
        };
        
        this.activityHistory.unshift(activity);
        
        // Mantener solo los últimos 100 registros
        if (this.activityHistory.length > 100) {
            this.activityHistory = this.activityHistory.slice(0, 100);
        }
        
        this.saveActivityHistory();
    },
    
    // Obtener estadísticas generales
    getGeneralStats() {
        const totalXP = appState.currentXP;
        const totalLessons = appState.lessonsCompleted;
        const streakDays = appState.streakDays;
        const vocabularyWords = appState.vocabularyWordsLearned || 0;
        
        // Calcular tiempo total de estudio (estimado)
        const totalStudyTime = totalLessons * 15; // 15 minutos por lección
        
        // Calcular nivel de compromiso
        const commitmentLevel = this.calculateCommitmentLevel();
        
        return {
            totalXP,
            totalLessons,
            streakDays,
            vocabularyWords,
            totalStudyTime,
            commitmentLevel,
            currentLevel: appState.currentLevel
        };
    },
    
    // Calcular nivel de compromiso
    calculateCommitmentLevel() {
        const recentActivities = this.activityHistory.filter(activity => {
            const activityDate = new Date(activity.timestamp);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return activityDate >= weekAgo;
        });
        
        const dailyActivities = {};
        recentActivities.forEach(activity => {
            const date = new Date(activity.timestamp).toDateString();
            dailyActivities[date] = (dailyActivities[date] || 0) + 1;
        });
        
        const activeDays = Object.keys(dailyActivities).length;
        const averageActivities = recentActivities.length / 7;
        
        if (activeDays >= 6 && averageActivities >= 3) return 'Muy Alto';
        if (activeDays >= 4 && averageActivities >= 2) return 'Alto';
        if (activeDays >= 2 && averageActivities >= 1) return 'Medio';
        return 'Bajo';
    },
    
    // Obtener análisis de fortalezas y debilidades
    getStrengthsWeaknesses() {
        const activities = this.activityHistory.slice(0, 50); // Últimas 50 actividades
        
        const typeCounts = {};
        const successRates = {};
        
        activities.forEach(activity => {
            const type = activity.type;
            typeCounts[type] = (typeCounts[type] || 0) + 1;
            
            if (activity.details.success !== undefined) {
                if (!successRates[type]) {
                    successRates[type] = { total: 0, successful: 0 };
                }
                successRates[type].total++;
                if (activity.details.success) {
                    successRates[type].successful++;
                }
            }
        });
        
        // Calcular tasas de éxito
        const rates = {};
        Object.keys(successRates).forEach(type => {
            const rate = (successRates[type].successful / successRates[type].total) * 100;
            rates[type] = Math.round(rate);
        });
        
        // Identificar fortalezas y debilidades
        const strengths = [];
        const weaknesses = [];
        
        Object.keys(rates).forEach(type => {
            if (rates[type] >= 80) {
                strengths.push({ type, rate: rates[type] });
            } else if (rates[type] <= 50) {
                weaknesses.push({ type, rate: rates[type] });
            }
        });
        
        return {
            strengths: strengths.sort((a, b) => b.rate - a.rate),
            weaknesses: weaknesses.sort((a, b) => a.rate - b.rate),
            typeCounts,
            rates
        };
    },
    
    // Obtener progreso hacia metas
    getGoalsProgress() {
        const stats = this.getGeneralStats();
        const recentActivities = this.activityHistory.filter(activity => {
            const activityDate = new Date(activity.timestamp);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return activityDate >= weekAgo;
        });
        
        const weeklyXP = recentActivities.reduce((total, activity) => total + (activity.xpEarned || 0), 0);
        const weeklyLessons = recentActivities.filter(activity => activity.type === 'lesson_completed').length;
        
        return {
            dailyStudyTime: {
                current: Math.min(stats.totalStudyTime / 7, this.goals.dailyStudyTime),
                goal: this.goals.dailyStudyTime,
                percentage: Math.min((stats.totalStudyTime / 7 / this.goals.dailyStudyTime) * 100, 100)
            },
            weeklyLessons: {
                current: weeklyLessons,
                goal: this.goals.weeklyLessons,
                percentage: Math.min((weeklyLessons / this.goals.weeklyLessons) * 100, 100)
            },
            monthlyXP: {
                current: weeklyXP * 4, // Estimación mensual
                goal: this.goals.monthlyXP,
                percentage: Math.min(((weeklyXP * 4) / this.goals.monthlyXP) * 100, 100)
            },
            vocabularyGoal: {
                current: stats.vocabularyWords,
                goal: this.goals.vocabularyGoal,
                percentage: Math.min((stats.vocabularyWords / this.goals.vocabularyGoal) * 100, 100)
            }
        };
    },
    
    // Crear panel de estadísticas detalladas
    createDetailedStatsPanel() {
        const stats = this.getGeneralStats();
        const goalsProgress = this.getGoalsProgress();
        const strengthsWeaknesses = this.getStrengthsWeaknesses();
        
        return `
            <div class="stats-dashboard">
                <div class="stats-header">
                    <h3><i class="fas fa-chart-line"></i> Estadísticas Detalladas</h3>
                    <button class="btn btn-secondary" onclick="STATISTICS_SYSTEM.showGoalsModal()">
                        <i class="fas fa-cog"></i> Configurar Metas
                    </button>
                </div>
                
                <!-- Estadísticas Generales -->
                <div class="stats-section">
                    <h4><i class="fas fa-info-circle"></i> Resumen General</h4>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon">🎯</div>
                            <div class="stat-content">
                                <h5>Nivel Actual</h5>
                                <span class="stat-value">${stats.currentLevel}</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">⭐</div>
                            <div class="stat-content">
                                <h5>XP Total</h5>
                                <span class="stat-value">${stats.totalXP}</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">📚</div>
                            <div class="stat-content">
                                <h5>Lecciones Completadas</h5>
                                <span class="stat-value">${stats.totalLessons}</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">🔥</div>
                            <div class="stat-content">
                                <h5>Racha Actual</h5>
                                <span class="stat-value">${stats.streakDays} días</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">📖</div>
                            <div class="stat-content">
                                <h5>Palabras Aprendidas</h5>
                                <span class="stat-value">${stats.vocabularyWords}</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">⏱️</div>
                            <div class="stat-content">
                                <h5>Tiempo de Estudio</h5>
                                <span class="stat-value">${stats.totalStudyTime} min</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Progreso hacia Metas -->
                <div class="stats-section">
                    <h4><i class="fas fa-bullseye"></i> Progreso hacia Metas</h4>
                    <div class="goals-grid">
                        ${Object.entries(goalsProgress).map(([goal, data]) => `
                            <div class="goal-card">
                                <div class="goal-header">
                                    <h5>${this.getGoalTitle(goal)}</h5>
                                    <span class="goal-percentage">${Math.round(data.percentage)}%</span>
                                </div>
                                <div class="goal-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${data.percentage}%"></div>
                                    </div>
                                </div>
                                <div class="goal-details">
                                    <span>${data.current} / ${data.goal}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Fortalezas y Debilidades -->
                <div class="stats-section">
                    <h4><i class="fas fa-chart-bar"></i> Análisis de Rendimiento</h4>
                    <div class="performance-analysis">
                        <div class="strengths-section">
                            <h5><i class="fas fa-thumbs-up"></i> Fortalezas</h5>
                            ${strengthsWeaknesses.strengths.length > 0 ? 
                                strengthsWeaknesses.strengths.map(strength => `
                                    <div class="strength-item">
                                        <span class="strength-type">${this.getActivityTypeName(strength.type)}</span>
                                        <span class="strength-rate">${strength.rate}%</span>
                                    </div>
                                `).join('') : 
                                '<p class="no-data">Aún no hay suficientes datos para identificar fortalezas.</p>'
                            }
                        </div>
                        <div class="weaknesses-section">
                            <h5><i class="fas fa-exclamation-triangle"></i> Áreas de Mejora</h5>
                            ${strengthsWeaknesses.weaknesses.length > 0 ? 
                                strengthsWeaknesses.weaknesses.map(weakness => `
                                    <div class="weakness-item">
                                        <span class="weakness-type">${this.getActivityTypeName(weakness.type)}</span>
                                        <span class="weakness-rate">${weakness.rate}%</span>
                                    </div>
                                `).join('') : 
                                '<p class="no-data">¡Excelente! No se identificaron áreas de mejora.</p>'
                            }
                        </div>
                    </div>
                </div>
                
                <!-- Historial de Actividades -->
                <div class="stats-section">
                    <h4><i class="fas fa-history"></i> Actividad Reciente</h4>
                    <div class="activity-history">
                        ${this.activityHistory.slice(0, 10).map(activity => `
                            <div class="activity-item">
                                <div class="activity-icon">
                                    ${this.getActivityIcon(activity.type)}
                                </div>
                                <div class="activity-content">
                                    <div class="activity-title">${this.getActivityTitle(activity.type)}</div>
                                    <div class="activity-time">${this.formatActivityTime(activity.timestamp)}</div>
                                </div>
                                ${activity.xpEarned > 0 ? 
                                    `<div class="activity-xp">+${activity.xpEarned} XP</div>` : ''
                                }
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },
    
    // Mostrar modal de configuración de metas
    showGoalsModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-bullseye"></i> Configurar Metas Personales</h3>
                    <button class="close-btn" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="goalsForm">
                        <div class="form-group">
                            <label>Tiempo de estudio diario (minutos)</label>
                            <input type="number" id="dailyStudyTime" value="${this.goals.dailyStudyTime}" min="5" max="180">
                        </div>
                        <div class="form-group">
                            <label>Lecciones por semana</label>
                            <input type="number" id="weeklyLessons" value="${this.goals.weeklyLessons}" min="1" max="20">
                        </div>
                        <div class="form-group">
                            <label>XP mensual objetivo</label>
                            <input type="number" id="monthlyXP" value="${this.goals.monthlyXP}" min="100" max="2000">
                        </div>
                        <div class="form-group">
                            <label>Palabras de vocabulario objetivo</label>
                            <input type="number" id="vocabularyGoal" value="${this.goals.vocabularyGoal}" min="10" max="1000">
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">Guardar Metas</button>
                            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listener para guardar metas
        document.getElementById('goalsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.goals.dailyStudyTime = parseInt(document.getElementById('dailyStudyTime').value);
            this.goals.weeklyLessons = parseInt(document.getElementById('weeklyLessons').value);
            this.goals.monthlyXP = parseInt(document.getElementById('monthlyXP').value);
            this.goals.vocabularyGoal = parseInt(document.getElementById('vocabularyGoal').value);
            
            this.saveUserGoals();
            modal.remove();
            
            // Recargar panel de estadísticas
            if (document.getElementById('progress').classList.contains('active')) {
                loadProgressChart();
            }
            
            showNotification('Metas actualizadas correctamente. 🎯', 'success');
        });
    },
    
    // Funciones auxiliares
    getGoalTitle(goal) {
        const titles = {
            dailyStudyTime: 'Tiempo Diario',
            weeklyLessons: 'Lecciones Semanales',
            monthlyXP: 'XP Mensual',
            vocabularyGoal: 'Vocabulario'
        };
        return titles[goal] || goal;
    },
    
    getActivityTypeName(type) {
        const names = {
            lesson_completed: 'Lecciones',
            exercise_completed: 'Ejercicios',
            vocabulary_learned: 'Vocabulario',
            achievement_unlocked: 'Logros',
            streak_updated: 'Racha'
        };
        return names[type] || type;
    },
    
    getActivityIcon(type) {
        const icons = {
            lesson_completed: '📚',
            exercise_completed: '✏️',
            vocabulary_learned: '📖',
            achievement_unlocked: '🏆',
            streak_updated: '🔥'
        };
        return icons[type] || '📝';
    },
    
    getActivityTitle(type) {
        const titles = {
            lesson_completed: 'Lección Completada',
            exercise_completed: 'Ejercicio Completado',
            vocabulary_learned: 'Vocabulario Aprendido',
            achievement_unlocked: 'Logro Desbloqueado',
            streak_updated: 'Racha Actualizada'
        };
        return titles[type] || 'Actividad';
    },
    
    formatActivityTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Hace un momento';
        if (diffMins < 60) return `Hace ${diffMins} min`;
        if (diffHours < 24) return `Hace ${diffHours} h`;
        if (diffDays < 7) return `Hace ${diffDays} días`;
        return date.toLocaleDateString();
    }
};

// ===== INICIALIZACIÓN DE LA APLICACIÓN =====
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando English Learning App...');
    
    // Inicializar sistemas
    try {
        // Verificar Web Speech API
        if ('speechSynthesis' in window) {
            console.log('✅ Web Speech API disponible');
            // Cargar voces disponibles
            speechSynthesis.onvoiceschanged = function() {
                const voices = speechSynthesis.getVoices();
                console.log(`✅ ${voices.length} voces cargadas`);
            };
        } else {
            console.warn('⚠️ Web Speech API no disponible');
        }
        
        // Inicializar sistema de estadísticas
        STATISTICS_SYSTEM.init();
        console.log('✅ Sistema de estadísticas inicializado');
        
        // Inicializar sistema de logros
        ACHIEVEMENTS_SYSTEM.loadUserAchievements();
        console.log('✅ Sistema de logros inicializado');
        
        // Cargar progreso guardado
        loadProgress();
        console.log('✅ Progreso cargado');
        
        // Configurar navegación
        initializeNavigation();
        console.log('✅ Navegación inicializada');
        
        // Configurar pestañas de autenticación
        setupAuthTabs();
        console.log('✅ Pestañas de autenticación configuradas');
        
        // Verificar autenticación
        checkAuth();
        console.log('✅ Autenticación verificada');
        
        // Actualizar UI
        updateUI();
        console.log('✅ UI actualizada');
        
        // Verificar racha diaria (después de que todos los sistemas estén inicializados)
        checkDailyStreak();
        console.log('✅ Racha diaria verificada');
        
        console.log('🎉 English Learning App inicializada correctamente');
        
    } catch (error) {
        console.error('❌ Error durante la inicialización:', error);
    }
}); 

// --- Palabras difíciles ---
function getDifficultWords() {
    const user = getCurrentUser();
    if (!user) return [];
    const key = `difficult_words_${user.email}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function saveDifficultWords(words) {
    const user = getCurrentUser();
    if (!user) return;
    const key = `difficult_words_${user.email}`;
    localStorage.setItem(key, JSON.stringify(words));
}

function isWordDifficult(wordObj) {
    const difficult = getDifficultWords();
    return difficult.some(w => w.english === wordObj.english && w.spanish === wordObj.spanish);
}

function toggleDifficultWord(wordObj) {
    let difficult = getDifficultWords();
    const wasDifficult = isWordDifficult(wordObj);
    
    if (wasDifficult) {
        difficult = difficult.filter(w => !(w.english === wordObj.english && w.spanish === wordObj.spanish));
        showNotification(`"${wordObj.english}" removida de palabras difíciles`, 'info');
    } else {
        difficult.push(wordObj);
        showNotification(`"${wordObj.english}" marcada como difícil`, 'success');
    }
    
    saveDifficultWords(difficult);
    
    // Actualizar visualmente el botón que se hizo clic
    const clickedButton = event.target.closest('.difficult-btn');
    if (clickedButton) {
        if (wasDifficult) {
            clickedButton.innerHTML = '🏳️';
            clickedButton.title = 'Marcar como difícil';
        } else {
            clickedButton.innerHTML = '🚩';
            clickedButton.title = 'Quitar de difíciles';
        }
    }
    
    // Refrescar vista si estamos en detalle
    if (document.getElementById('vocabularyDetail').style.display === 'block') {
        // Recargar detalle actual
        const currentCategory = document.getElementById('vocabularyDetail').getAttribute('data-category');
        if (currentCategory) loadVocabularyDetail(currentCategory);
    }
    
    // Refrescar sección de difíciles si está visible
    if (document.getElementById('difficultWordsSection')) {
        loadDifficultWordsSection();
    }
}

function loadDifficultWordsSection() {
    const difficult = getDifficultWords();
    const categoriesGrid = document.getElementById('categoriesGrid');
    const vocabularyDetail = document.getElementById('vocabularyDetail');
    
    // Ocultar categorías y mostrar detalle
    categoriesGrid.style.display = 'none';
    vocabularyDetail.style.display = 'block';
    
    if (difficult.length === 0) {
        vocabularyDetail.innerHTML = `
            <button class="back-button" onclick="loadVocabularyCategories()">
                <i class="fas fa-arrow-left"></i> Volver a Categorías
            </button>
            <h3><span style="font-size:1.2em">🚩</span> Palabras Difíciles</h3>
            <p>No tienes palabras marcadas como difíciles aún. ¡Marca algunas palabras mientras estudias!</p>
        `;
        return;
    }
    
    vocabularyDetail.innerHTML = `
        <button class="back-button" onclick="loadVocabularyCategories()">
            <i class="fas fa-arrow-left"></i> Volver a Categorías
        </button>
        <h3>
            <span style="font-size:1.2em">🚩</span> Palabras Difíciles - ${difficult.length} palabras
        </h3>
        <p>Repasa estas palabras que has marcado como difíciles para mejorar tu vocabulario.</p>
        <div class="vocabulary-list">
            ${difficult.map(item => `
                <div class="vocabulary-item-detail">
                    <div class="vocab-header">
                        <div class="english">${item.english}</div>
                        <button class="speak-btn" onclick="speakText('${item.english}', 'en-US')" title="Escuchar pronunciación">
                            <i class="fas fa-volume-up"></i>
                        </button>
                        <button class="difficult-btn" 
                                data-english="${item.english}"
                                data-spanish="${item.spanish}"
                                data-pronunciation="${item.pronunciation}"
                                title="Quitar de difíciles">
                            🚩
                        </button>
                    </div>
                    <div class="spanish">${item.spanish}</div>
                    <div class="pronunciation">[${item.pronunciation}]</div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Agregar event listeners para los botones de palabras difíciles
    const difficultButtons = vocabularyDetail.querySelectorAll('.difficult-btn');
    difficultButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wordObj = {
                english: this.getAttribute('data-english'),
                spanish: this.getAttribute('data-spanish'),
                pronunciation: this.getAttribute('data-pronunciation')
            };
            toggleDifficultWord(wordObj);
        });
    });
}