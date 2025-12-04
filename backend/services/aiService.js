const Groq = require('groq-sdk');

//console.log('API Key cargada:', process.env.GROQ_API_KEY ? 'Si' : 'No');
//console.log('Primeros caracteres:', process.env.GROQ_API_KEY?.substring(0, 10));

// Inicializar cliente de Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Función para generar rutina personalizada
const generateRoutine = async (userProfile) => {
    try {
        console.log('Generando rutina para:', userProfile);
        
        // Construir el prompt basado en el perfil del usuario
        const prompt = buildPrompt(userProfile);
        
        // Llamar a la API de Groq
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Eres un entrenador personal experto. Genera rutinas de ejercicio personalizadas en formato JSON válido."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 2000
        });
        
        // Obtener la respuesta
        const response = completion.choices[0].message.content;
        console.log('Respuesta de IA recibida');
        
        // Intentar parsear el JSON
        try {
            // Limpiar el formato markdown si existe
            let cleanResponse = response;
            
            // Quitar ```json del inicio si existe
            if (cleanResponse.startsWith('```json')) {
                cleanResponse = cleanResponse.substring(7); // Quitar ```json
            } else if (cleanResponse.startsWith('```')) {
                cleanResponse = cleanResponse.substring(3); // Quitar ```
            }
            
            // Quitar ``` del final si existe
            if (cleanResponse.endsWith('```')) {
                cleanResponse = cleanResponse.substring(0, cleanResponse.length - 3);
            }
            
            // Quitar saltos de línea extra y espacios
            cleanResponse = cleanResponse.trim();
            
            console.log('Intentando parsear JSON limpio...');
            const routine = JSON.parse(cleanResponse);
            return routine;
            
        } catch (parseError) {
            console.error('Error parseando JSON:', parseError);
            console.error('Respuesta que no se pudo parsear:', response.substring(0, 200));
            return { 
                error: 'Formato inválido', 
                rawResponse: response 
            };
        }
        
    } catch (error) {
        console.error('Error generando rutina:', error);
        throw error;
    }
};

// Función para construir el prompt basado en el perfil
const buildPrompt = (profile) => {
    const goalTranslations = {
        'ganar_musculo': 'ganar masa muscular',
        'perder_peso': 'perder peso',
        'resistencia': 'mejorar resistencia cardiovascular',
        'fuerza': 'aumentar fuerza',
        'tonificar': 'tonificar el cuerpo',
        'salud_general': 'mejorar salud general'
    };
    
    const levelTranslations = {
        'beginner': 'principiante',
        'intermediate': 'intermedio',
        'advanced': 'avanzado'
    };
    
    const goal = goalTranslations[profile.primaryGoal] || profile.primaryGoal;
    const level = levelTranslations[profile.fitnessLevel] || profile.fitnessLevel;
    
    return `
    Crea una rutina de entrenamiento personalizada con estos datos:
    
    PERFIL DEL USUARIO:
    - Edad: ${profile.age} años
    - Peso: ${profile.weight} kg
    - Altura: ${profile.height} cm
    - Sexo: ${profile.gender || 'no especificado'}
    - Nivel fitness: ${level}
    - Objetivo principal: ${goal}
    - Días disponibles: ${profile.trainingDays} días por semana
    - Limitaciones: ${profile.limitations || 'Ninguna'}
    
    REQUISITOS:
    1. La rutina debe ser para ${profile.trainingDays} días a la semana
    2. Apropiada para nivel ${level}
    3. Enfocada en ${goal}
    4. Duración de 1 semana (se puede repetir 4 veces)
    
    RESPONDE ÚNICAMENTE CON UN JSON VÁLIDO con esta estructura exacta:
    {
        "nombreRutina": "Nombre descriptivo de la rutina",
        "descripcion": "Breve descripción de la rutina",
        "duracionSemanas": 1,
        "diasPorSemana": ${profile.trainingDays},
        "nivel": "${level}",
        "objetivo": "${goal}",
        "semana": {
            "dias": [
                {
                    "dia": 1,
                    "nombreDia": "Ejemplo: Pecho y Tríceps",
                    "ejercicios": [
                        {
                            "nombre": "Nombre del ejercicio",
                            "series": 3,
                            "repeticiones": "12-15",
                            "descanso": "60 segundos",
                            "notas": "Técnica o consejos"
                        }
                    ]
                }
            ]
        },
        "recomendaciones": [
            "Recomendación 1",
            "Recomendación 2",
            "Recomendación 3"
        ],
        "notaProgresion": "Esta rutina se puede repetir durante 4 semanas, aumentando el peso un 5-10% cada semana"
    }`;
};

// Exportar las funciones
module.exports = {
    generateRoutine
};