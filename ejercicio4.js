/* ============================================================
   EJERCICIO 4 · Algo que no existe   (SOLUCIÓN)
   ============================================================

   QUÉ PASA AHORA
   El alumno no tiene la propiedad «direccion». Al pedir
   alumno.direccion.calle, JavaScript intenta leer «calle» de
   undefined y lanza un TypeError.

   LO QUE SE HACE
   1. PARTE A. Controla el error con try/catch. Si el error
      es de tipo TypeError (mira error.name), muestra «Este
      alumno no tiene dirección».
   2. PARTE B. Ahora consigue lo mismo SIN try/catch,
      usando el operador ?. (acceso opcional) y ?? (valor
      por defecto): si no hay calle, que salga «sin calle».
   3. Contesta en el comentario del final: ¿cuál de las dos
      formas es mejor en este caso y por qué?

   RESULTADO ESPERADO
      Este alumno no tiene dirección
      Calle (parte B): sin calle

   POR QUÉ ESTÁ BIEN
   En la parte A el try/catch atrapa el TypeError. En la B ni
   siquiera hace falta: sabemos que la dirección puede
   faltar, y eso se resuelve mejor con ?. y ??. try/catch es
   para lo que NO controlas; si sabes que algo puede faltar,
   mira primero si existe.

   ============================================================ */
// ----- NO TOQUES ESTO -----
const alumno = { nombre: "Ana", notas: { mates: 8 } };   // OJO: no tiene "direccion"

// ----- PARTE A · con try/catch -----
try {
  console.log("Calle (parte A):", alumno.direccion.calle);
} catch (error) {
  if (error.name === "TypeError") {
    console.log("Este alumno no tiene dirección");     // sabemos exactamente qué ha pasado
  } else {
    throw error;                                       // si es otro error, NO lo escondemos
  }
}

// ----- PARTE B · sin try/catch -----
const calle = alumno.direccion?.calle ?? "sin calle";   // ?. no falla si direccion no existe
console.log("Calle (parte B):", calle);

// ----- RESPUESTA -----
// La B. Aquí ya sabemos que la dirección puede faltar, y eso se resuelve con una
// simple comprobación (?.). try/catch es para lo que NO controlamos (datos de fuera,
// textos que pueden venir rotos...). Usarlo aquí sería matar moscas a cañonazos.
