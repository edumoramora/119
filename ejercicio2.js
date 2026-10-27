/* ============================================================
   EJERCICIO 2 · Un valor por defecto   (SOLUCIÓN)
   ============================================================

   QUÉ PASA AHORA
   La función leerPuntos recibe un texto con un número (por
   ejemplo «42») y lo convierte con JSON.parse. Pero si el
   texto no es válido, la función lanza un error y rompe todo
   lo que la llame.

   LO QUE SE HACE
   1. Ejecuta el archivo: verás que el comprobador marca ✘
      en varias pruebas.
   2. Dentro de la función, envuelve JSON.parse en un
      try/catch.
   3. Si falla, la función tiene que devolver 0 en vez de
      romper el programa.
   4. Vuelve a ejecutar hasta que todo salga con ✔.

   RESULTADO ESPERADO
      ✔ leerPuntos("42") devuelve 42
      ✔ leerPuntos("hola") devuelve 0
      (y así con todas las pruebas)

   POR QUÉ ESTÁ BIEN
   El try/catch va DENTRO de la función: quien la usa ya no
   tiene que preocuparse. El catch no se queda callado: avisa
   y devuelve un valor seguro (0).

   ============================================================ */
// ----- SOLUCIÓN -----
function leerPuntos(texto) {
  try {
    return JSON.parse(texto);
  } catch (error) {
    console.log("  (aviso) Puntos no válidos («" + texto + "»): se usa 0");
    return 0;                        // el «plan B»: siempre devolvemos un número
  }
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

comprobar('leerPuntos("42") devuelve 42',     () => leerPuntos("42") === 42);
comprobar('leerPuntos("17") devuelve 17',     () => leerPuntos("17") === 17);
comprobar('leerPuntos("hola") devuelve 0',    () => leerPuntos("hola") === 0);
comprobar('leerPuntos("") devuelve 0',        () => leerPuntos("") === 0);
comprobar('leerPuntos("4x") devuelve 0',      () => leerPuntos("4x") === 0);
