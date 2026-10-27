/* ============================================================
   EJERCICIO 6 · Lanza tu propio error   (SOLUCIÓN)
   ============================================================

   QUÉ PASA AHORA
   La función dividir no se queja nunca: si divides entre
   cero devuelve Infinity y el programa sigue como si nada.
   Aquí el try/catch ya está hecho: tu trabajo es el otro
   lado, lanzar el error.

   LO QUE SE HACE
   1. Dentro de dividir, si b vale 0, lanza un error con
      throw new Error("No se puede dividir entre cero").
   2. No toques el try/catch de abajo: ya sabe atrapar el
      error que lances.
   3. Ejecuta y comprueba que la línea «Esta línea NO
      debería aparecer» ya no sale.

   RESULTADO ESPERADO
      10 / 2 = 5
      Error: No se puede dividir entre cero

   POR QUÉ ESTÁ BIEN
   throw lanza un error propio cuando los datos no son
   válidos. La función avisa de que algo va mal y quien la
   llama decide qué hacer con un catch. Como throw corta la
   función, ni hace falta un else.

   ============================================================ */
// ----- SOLUCIÓN -----
function dividir(a, b) {
  if (b === 0) {
    throw new Error("No se puede dividir entre cero");   // aquí la función se corta
  }
  return a / b;                                          // no hace falta else
}

// ----- NO TOQUES ESTO: aquí el catch ya está hecho -----
try {
  console.log("10 / 2 =", dividir(10, 2));
  console.log("5 / 0 =", dividir(5, 0));
  console.log("Esta línea NO debería aparecer");
} catch (error) {
  console.log("Error:", error.message);
}

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

comprobar("dividir(10, 2) devuelve 5",  () => dividir(10, 2) === 5);
comprobar("dividir(0, 5) devuelve 0",   () => dividir(0, 5) === 0);
comprobar("dividir(1, 0) lanza un error con el mensaje pedido", () => {
  try { dividir(1, 0); return false; }
  catch (e) { return e instanceof Error && e.message === "No se puede dividir entre cero"; }
});
