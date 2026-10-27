/* ============================================================
   EJERCICIO 7 · Valida y avisa   (SOLUCIÓN)
   ============================================================

   QUÉ PASA AHORA
   La función crearAlumno acepta cualquier cosa: nombres
   vacíos, edades que no son números, edades imposibles... Y
   el bucle de abajo tiene un catch vacío, así que no cuenta
   nada.

   LO QUE SE HACE
   1. En crearAlumno, lanza un error (con su propio mensaje
      en cada caso) si: el nombre está vacío (aunque solo
      tenga espacios); la edad no es un número; la edad es
      menor que 0 o mayor que 120.
   2. En el catch del bucle, muestra una línea que empiece
      por «Rechazado», con el nombre (o «(sin nombre)» si
      está vacío) y el motivo (error.message).
   3. Comprueba que al final salen 2 alumnos válidos.

   RESULTADO ESPERADO
      Rechazado (sin nombre): ...el motivo que hayas escrito...
      Rechazado Luis: ...
      Rechazado Eva: ...
      Rechazado Marta: ...
      Alumnos válidos: 2

   POR QUÉ ESTÁ BIEN
   Cada regla tiene su propio throw y su propio mensaje: así
   el catch puede explicar EXACTAMENTE qué ha fallado. El
   bucle sigue con el siguiente alumno gracias a que el
   try/catch está dentro.

   ============================================================ */
// ----- SOLUCIÓN (parte 1) -----
function crearAlumno(nombre, edad) {
  if (nombre.trim() === "") {
    throw new Error("El nombre no puede estar vacío");
  }
  if (typeof edad !== "number" || Number.isNaN(edad)) {
    throw new Error("La edad tiene que ser un número");
  }
  if (edad < 0 || edad > 120) {
    throw new Error("La edad tiene que estar entre 0 y 120");
  }
  return { nombre: nombre.trim(), edad: edad };
}

// ----- NO TOQUES ESTO -----
const datos = [["Ana", 20], ["", 30], ["Luis", "veinte"], ["Eva", -5], ["Marta", 130], ["Pablo", 19]];
const alumnos = [];

// ----- SOLUCIÓN (parte 2) -----
for (const [nombre, edad] of datos) {
  try {
    alumnos.push(crearAlumno(nombre, edad));
  } catch (error) {
    const quien = nombre.trim() === "" ? "(sin nombre)" : nombre;
    console.log("Rechazado " + quien + ": " + error.message);   // quién y por qué: un catch con información
  }
}
console.log("Alumnos válidos:", alumnos.length);

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

comprobar('crearAlumno("Ana", 20) devuelve el alumno', () => { const a = crearAlumno("Ana", 20); return a.nombre === "Ana" && a.edad === 20; });
comprobar('crearAlumno("Pablo", 19) funciona',          () => crearAlumno("Pablo", 19).nombre === "Pablo");
comprobar('un nombre vacío lanza un error',             () => (() => { try { crearAlumno("", 30); return false; } catch (e) { return true; } })());
comprobar('un nombre solo con espacios lanza un error', () => (() => { try { crearAlumno("   ", 30); return false; } catch (e) { return true; } })());
comprobar('una edad que no es número lanza un error',   () => (() => { try { crearAlumno("Luis", "veinte"); return false; } catch (e) { return true; } })());
comprobar('una edad negativa lanza un error',           () => (() => { try { crearAlumno("Eva", -5); return false; } catch (e) { return true; } })());
comprobar('una edad de 130 lanza un error',             () => (() => { try { crearAlumno("Marta", 130); return false; } catch (e) { return true; } })());
comprobar('quedan exactamente 2 alumnos válidos',       () => alumnos.length === 2);
