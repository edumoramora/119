/* ============================================================
   EJERCICIO 5 · Cada error, su mensaje   (SOLUCIÓN)
   ============================================================

   QUÉ PASA AHORA
   Hay cuatro funciones: tres fallan de formas distintas y
   una no falla. La función explicar debería ejecutarlas sin
   romperse y devolver un texto que explique qué ha pasado.
   Ahora mismo no controla nada.

   LO QUE SE HACE
   1. Dentro de explicar, ejecuta funcion() dentro de un
      try/catch.
   2. Si no hay error, devuelve «Todo bien».
   3. En el catch, mira error.name y devuelve: SyntaxError
      → «El texto no tiene formato válido»; TypeError → «Se
      intentó usar algo que no existe»; ReferenceError →
      «Se usó una variable que no está definida».
   4. Para cualquier otro tipo de error, devuelve «Error
      desconocido: » seguido de error.message.

   RESULTADO ESPERADO
      El texto no tiene formato válido
      Se intentó usar algo que no existe
      Se usó una variable que no está definida
      Todo bien

   POR QUÉ ESTÁ BIEN
   Cada tipo de error cuenta una historia distinta, y
   error.name nos deja actuar de forma diferente en cada
   caso. El último else es importante: para un error que no
   conocemos devolvemos igualmente un mensaje con el motivo,
   en vez de esconderlo.

   ============================================================ */
// ----- NO TOQUES ESTO: cuatro funciones que fallan (o no) de formas distintas -----
function fallo1() { return JSON.parse("{mal"); }          // texto con formato roto
function fallo2() { const x = null; return x.length; }    // usar algo que no existe
function fallo3() { return variableQueNoExiste + 1; }     // variable sin declarar
function fallo4() { return 42; }                          // esta no falla

// ----- SOLUCIÓN -----
function explicar(funcion) {
  try {
    funcion();
    return "Todo bien";
  } catch (error) {
    // Cada tipo de error tiene su propio mensaje
    if (error.name === "SyntaxError") {
      return "El texto no tiene formato válido";
    } else if (error.name === "TypeError") {
      return "Se intentó usar algo que no existe";
    } else if (error.name === "ReferenceError") {
      return "Se usó una variable que no está definida";
    } else {
      return "Error desconocido: " + error.message;   // nunca dejamos un error sin explicar
    }
  }
}

console.log(explicar(fallo1));
console.log(explicar(fallo2));
console.log(explicar(fallo3));
console.log(explicar(fallo4));

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

comprobar("fallo1 → texto sin formato válido",  () => explicar(fallo1) === "El texto no tiene formato válido");
comprobar("fallo2 → algo que no existe",        () => explicar(fallo2) === "Se intentó usar algo que no existe");
comprobar("fallo3 → variable sin definir",      () => explicar(fallo3) === "Se usó una variable que no está definida");
comprobar("fallo4 → todo bien",                 () => explicar(fallo4) === "Todo bien");
comprobar("un error raro → «Error desconocido: …»", () => explicar(() => decodeURIComponent("%")).startsWith("Error desconocido: "));
