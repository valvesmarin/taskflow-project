**Objetivo de este documento:** Comparar ChatGPT-4 (OpenAI) y Claude 3.5 Sonnet (Anthropic) en tareas reales de desarrollo frontend con JavaScript y Tailwind CSS v4.

## 1. Explicación de conceptos técnicos
**Prompt usado:** "Explique closures, event loop y prototipos en JavaScript de forma clara para un desarrollador principiante."
- **ChatGPT:** Respuesta clara, buena estructura, ejemplos simples.
- **Claude:** Respuesta más profunda, con analogías excelentes y ejemplos de código más avanzados.
- **Ganador:** Claude (mejor profundidad).

## 2. Detección de errores
Envié 3 funciones con errores intencionales (hoisting, closure y DOM).
Claude identificó todos los errores + explicó el porqué en 1 línea. ChatGPT se equivocó en 1 de ellos.

## 3. Generación de código a partir de descripción natural
Pedí: "Crea una función para editar una tarea existente en mi app PulseTasks".
- ChatGPT: código funcional, pero repetitivo.
- Claude: código más limpio, con JSDoc y validaciones extras.
**Conclusión:** Claude ganó en 8/10 pruebas. Uso Claude para lógica compleja y ChatGPT para tareas rápidas.

Fecha: 10/03/2026