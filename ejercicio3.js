/* ============================================================
   EJERCICIO 3 · Que el bucle no se pare   (SOLUCIÓN)
   ============================================================

   QUÉ PASA AHORA
   Recorremos una lista de textos JSON y saludamos a cada
   persona. Pero hay textos rotos, y el primero que falla
   detiene TODO el bucle: los siguientes ni se miran.

   LO QUE SE HACE
   1. Ejecuta el archivo y mira dónde se para.
   2. Pon el try/catch DENTRO del for, alrededor de lo que
      puede fallar (no alrededor de todo el for).
   3. En el catch, suma 1 a fallidos y muestra «El texto N
      no es válido» (N = posición, empezando en 1).
   4. Fíjate en que, si el try/catch está dentro del bucle,
      un fallo no impide que se procese el siguiente texto.

   RESULTADO ESPERADO
      --- Procesando ---
      Hola, Ana
      Hola, Luis
      El texto 3 no es válido
      Hola, Eva
      El texto 5 no es válido
      3 correctos y 2 fallidos

   POR QUÉ ESTÁ BIEN
   El try/catch está dentro del for, así que cada texto se
   protege por separado: un texto roto cuenta como fallido y
   el bucle sigue. Si estuviera fuera, el primer error
   saldría del bucle.

   ============================================================ */
// ----- NO TOQUES ESTO -----
const textos = [
  '{"nombre":"Ana"}',
  '{"nombre":"Luis"}',
  'esto no es json',
  '{"nombre":"Eva"}',
  '{nombre: Marta}'
];

// ----- SOLUCIÓN -----
function procesar(textos) {
  let correctos = 0;
  let fallidos = 0;

  for (let i = 0; i < textos.length; i++) {
    try {                                  // el try/catch DENTRO del for: cada vuelta se protege sola
      const persona = JSON.parse(textos[i]);
      console.log("Hola, " + persona.nombre);
      correctos++;
    } catch (error) {
      fallidos++;
      console.log("El texto " + (i + 1) + " no es válido");   // i + 1: las personas cuentan desde 1
    }
  }

  return { correctos, fallidos };
}

console.log("--- Procesando ---");
const resultado = procesar(textos);
console.log(resultado.correctos + " correctos y " + resultado.fallidos + " fallidos");

// ============================================================
// COMPROBADOR · no lo toques
// Prueba tu código y te dice qué funciona (✔) y qué no (✘).
// ============================================================
function comprobar(descripcion, prueba) {
  const consoleLog = console.log;
  console.log = () => {};                  // silencia los console.log de tu función mientras se prueba
  let resultado;
  try {
    resultado = (prueba() ? "✔ " : "✘ ") + descripcion;
  } catch (error) {
    resultado = "✘ " + descripcion + "   → falló con " + error.name;
  } finally {
    console.log = consoleLog;              // pase lo que pase, se restaura console.log
  }
  console.log(resultado);
}

comprobar("procesar(textos) cuenta 3 correctos", () => procesar(textos).correctos === 3);
comprobar("procesar(textos) cuenta 2 fallidos",  () => procesar(textos).fallidos === 2);
comprobar("con una lista vacía devuelve 0 y 0",  () => { const r = procesar([]); return r.correctos === 0 && r.fallidos === 0; });
