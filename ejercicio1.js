/* ============================================================
   EJERCICIO 1 · Controla el error   (SOLUCIÓN)
   ============================================================

   QUÉ PASA AHORA
   Este programa se rompe: el texto no es un JSON válido (le
   falta el valor de «edad») y JSON.parse lanza un error que
   nadie controla. El programa se para y la última línea no
   llega a ejecutarse.

   LO QUE SE HACE
   1. Ejecuta el archivo y mira el error que sale.
   2. Mete el código que falla dentro de un try { ... }.
   3. En el catch, muestra «No se pudo leer el texto:»
      seguido de error.message.
   4. Comprueba que ahora el programa llega hasta «Fin del
      programa».

   RESULTADO ESPERADO
      No se pudo leer el texto: (aquí sale el mensaje del error)
      Fin del programa

   POR QUÉ ESTÁ BIEN
   El error se lanza en JSON.parse. Con el try/catch lo
   atrapamos, avisamos de qué ha pasado (con el mensaje real
   del error) y el programa continúa. La variable datos se
   declara fuera del try para poder usarla después.

   ============================================================ */
// ----- NO TOQUES ESTO -----
const textoRoto = '{"nombre": "Ana", "edad": }';   // falta el valor de "edad"

// ----- SOLUCIÓN -----
let datos = null;                    // declarada FUERA del try para poder usarla después
try {
  datos = JSON.parse(textoRoto);     // aquí se lanza el error
  console.log("Datos leídos:", datos);
} catch (error) {
  // Mensaje útil: qué ha pasado y por qué (no un catch vacío)
  console.log("No se pudo leer el texto:", error.message);
}

console.log("Fin del programa");
