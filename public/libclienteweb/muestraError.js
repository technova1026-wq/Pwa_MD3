import { ProblemDetailsError } from "./ProblemDetailsError.js"

/**
 * Muestra los datos de una Error en la consola y en un cuadro de alerta.
 * @param { unknown } error descripción del error.
 */
export function muestraError(error) {

 if (error instanceof ProblemDetailsError) {

  const problemDetails = error.problemDetails

  let mensaje =
   typeof problemDetails["title"] === "string" ? problemDetails["title"] : ""
  if (typeof problemDetails["detail"] === "string") {
   if (mensaje !== "") {
    mensaje += "\n"
   }
   mensaje += problemDetails["detail"]
  }
  if (mensaje === "") {
   mensaje = "Error"
  }
  console.error(error, problemDetails)
  alert(mensaje)

 } else if (
  typeof error === "object" && error !== null && "message" in error
 ) {

  console.error(error)
  alert(error.message)

 } else {

  console.error("Error", error)
  alert("Error")

 }

}
