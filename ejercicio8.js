/* ============================================================
   EJERCICIO 8 · Finally: siempre se limpia   (SOLUCIÓN)
   ============================================================

   QUÉ PASA AHORA
   La función cargarDatos pone cargando = true al empezar y
   cargando = false al terminar. Pero si JSON.parse falla, la
   función se corta antes y cargando se queda en true para
   siempre: la pantalla se quedaría con «Cargando…»
   eternamente.

   LO QUE SE HACE
   1. Envuelve el JSON.parse en un try/catch/finally.
   2. En el catch, muestra «No se pudo cargar:» y el
      error.message, y devuelve null.
   3. En el finally, pon cargando = false y muestra «Carga
      terminada». Así se ejecuta SIEMPRE, haya error o no.
   4. «Listo» solo debe salir cuando todo ha ido bien
      (dentro del try).

   RESULTADO ESPERADO
      --- Texto válido ---
      Cargando…
      Listo
      Carga terminada
      Resultado: (el objeto) | cargando = false
      --- Texto roto ---
      Cargando…
      No se pudo cargar: (mensaje del error)
      Carga terminada
      Resultado: null | cargando = false

   POR QUÉ ESTÁ BIEN
   El finally garantiza que cargando vuelve a false pase lo
   que pase. Es justo para eso: limpiar, cerrar, ocultar
   avisos... cosas que tienen que ocurrir tanto si todo va
   bien como si no.

   ============================================================ */
// ----- NO TOQUES ESTO -----
let cargando = false;       // true mientras se está cargando

// ----- SOLUCIÓN -----
function cargarDatos(texto) {
  cargando = true;
  console.log("Cargando…");
  try {
    const datos = JSON.parse(texto);
    console.log("Listo");                         // solo si todo ha ido bien
    return datos;
  } catch (error) {
    console.log("No se pudo cargar:", error.message);
    return null;
  } finally {
    cargando = false;                             // SIEMPRE se ejecuta, aunque haya return o error
    console.log("Carga terminada");
  }
}

console.log("--- Texto válido ---");
console.log("Resultado:", cargarDatos('{"ok": true}'), "| cargando =", cargando);

console.log("--- Texto roto ---");
console.log("Resultado:", cargarDatos("{mal"), "| cargando =", cargando);

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

comprobar("con texto válido devuelve el objeto",         () => cargarDatos('{"a":1}').a === 1);
comprobar("con texto válido, cargando termina en false", () => { cargarDatos('{"a":1}'); return cargando === false; });
comprobar("con texto roto devuelve null",                () => cargarDatos("{mal") === null);
comprobar("con texto roto, cargando termina en false",   () => { cargarDatos("{mal"); return cargando === false; });
