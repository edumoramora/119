/* ============================================================
   EJERCICIO 9 · Reto: leer un valor guardado   (SOLUCIÓN)
   ============================================================

   QUÉ PASA AHORA
   Esto es lo que hace una web cuando lee una cookie: busca
   el valor, lo descodifica con decodeURIComponent y lo
   convierte con JSON.parse. Pero esa línea puede fallar de
   DOS formas distintas: la cookie puede tener un % mal
   escrito (URIError) o un JSON roto (SyntaxError).

   LO QUE SE HACE
   1. Ejecuta el archivo: el programa se rompe en la cookie
      «tema».
   2. Protege la línea que descodifica y convierte con un
      try/catch.
   3. Si la cookie está dañada, devuelve porDefecto y avisa
      en consola de qué cookie es y qué tipo de error ha
      sido.
   4. RETO EXTRA: atrapa solo los dos errores que esperas
      (SyntaxError y URIError). Si llega cualquier otro
      error, vuélvelo a lanzar con throw error: no lo
      escondas.

   RESULTADO ESPERADO
      usuario → (el objeto con nombre Ana)
      puntos → 42
      tema → (valor por defecto)
      roto → (valor por defecto)
      mala → (valor por defecto)
      noexiste → (valor por defecto)
      (y, si quieres, un aviso por cada cookie dañada)

   POR QUÉ ESTÁ BIEN
   Hay DOS errores esperables, y los dos se tratan igual:
   cookie dañada, se usa el valor por defecto. Pero fíjate en
   el throw error del final: si ocurre algo que NO
   esperábamos (un fallo nuestro, por ejemplo), no lo
   escondemos: lo volvemos a lanzar. Un catch currado atrapa
   lo que sabe manejar.

   ============================================================ */
// ----- NO TOQUES ESTO: unas cookies de ejemplo (algunas están dañadas a propósito) -----
const cookies = [
  "tema=oscuro",                                             // no es JSON
  "usuario=" + encodeURIComponent('{"nombre":"Ana"}'),       // JSON válido
  "puntos=" + encodeURIComponent("42"),                      // JSON válido
  "roto=" + encodeURIComponent('{"nombre":'),                // JSON roto
  "mala=%E0%A4%A"                                            // un % mal escrito
].join("; ");

// ----- SOLUCIÓN -----
function leerCookie(texto, nombre, porDefecto) {
  const trozo = texto.split("; ").find(c => c.startsWith(nombre + "="));
  if (!trozo) return porDefecto;                // la cookie no existe

  const valor = trozo.slice(nombre.length + 1);

  try {
    return JSON.parse(decodeURIComponent(valor));
  } catch (error) {
    // Solo atrapamos los dos errores que ESPERAMOS: una cookie dañada
    if (error instanceof SyntaxError || error instanceof URIError) {
      console.log("  (aviso) La cookie «" + nombre + "» está dañada (" + error.name + "): se usa el valor por defecto");
      return porDefecto;
    }
    throw error;       // cualquier otro error es una sorpresa: NO se esconde, se vuelve a lanzar
  }
}

for (const nombre of ["usuario", "puntos", "tema", "roto", "mala", "noexiste"]) {
  console.log(nombre + " →", leerCookie(cookies, nombre, "(valor por defecto)"));
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

comprobar("«usuario» devuelve el objeto con nombre Ana", () => leerCookie(cookies, "usuario", null).nombre === "Ana");
comprobar("«puntos» devuelve 42",                        () => leerCookie(cookies, "puntos", 0) === 42);
comprobar("«tema» (no es JSON) devuelve el valor por defecto", () => leerCookie(cookies, "tema", "X") === "X");
comprobar("«roto» (JSON roto) devuelve el valor por defecto",  () => leerCookie(cookies, "roto", "X") === "X");
comprobar("«mala» (% mal escrito) devuelve el valor por defecto", () => leerCookie(cookies, "mala", "X") === "X");
comprobar("«noexiste» devuelve el valor por defecto",    () => leerCookie(cookies, "noexiste", "X") === "X");
comprobar("RETO: un error inesperado NO se esconde",     () => {
  try { leerCookie(null, "x", "X"); return false; }      // texto null: split falla con un TypeError
  catch (e) { return e instanceof TypeError; }
});
