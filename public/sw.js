/* Este archivo debe estar colocado en la carpeta raíz del sitio.
 * 
 * Cualquier cambio en el contenido de este archivo hace que el service
 * worker se reinstale. */

/**
 * Cambia el número de la versión cuando cambia el contenido de los
 * archivos.
 * 
 * El número a la izquierda del punto (.), en este caso <q>1</q>, se
 * conoce como número mayor y se cambia cuando se realizan
 * modificaciones grandes o importantes.
 * 
 * El número a la derecha del punto (.), en este caso <q>00</q>, se
 * conoce como número menor y se cambia cuando se realizan
 * modificaciones menores.
 */
const VERSION = "1.0"

/**
 * Nombre de la carpeta de caché.
 */
const CACHE = "pwamd"

/**
 * Archivos requeridos para que la aplicación funcione fuera de
 * línea.
 */
const ARCHIVOS = [
 "ayuda.html",
 "css/estilos.css",
 "css/material-symbols-outlined.css",
 "css/transicion_pestanas.css",
 "favicon.ico",
 "fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].codepoints",
 "fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf",
 "fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2",
 "fonts/Roboto-Italic-VariableFont_wdth,wght.ttf",
 "fonts/Roboto-VariableFont_wdth,wght.ttf",
 "img/Escultura_de_coyote.jpeg",
 "img/icono2048.png",
 "img/maskable_icon.png",
 "img/maskable_icon_x128.png",
 "img/maskable_icon_x192.png",
 "img/maskable_icon_x384.png",
 "img/maskable_icon_x48.png",
 "img/maskable_icon_x512.png",
 "img/maskable_icon_x72.png",
 "img/maskable_icon_x96.png",
 "img/pexels-craig-dennis-3701822.jpg",
 "img/pexels-moises-patrício-10961948.jpg",
 "img/screenshot_horizontal.png",
 "img/screenshot_vertical.png",
 "index.html",
 "js/nav-tab-fixed.js",
 "js/registraServiceWorker.js",
 "libclienteweb/ES_APPLE.js",
 "libclienteweb/getAttribute.js",
 "libclienteweb/manejaErrores.js",
 "libclienteweb/muestraError.js",
 "libclienteweb/ProblemDetailsError.js",
 "libclienteweb/querySelector.js",
 "libclienteweb/resaltaSiEstasEn.js",
 "libmde/md-app-bar.js",
 "libmde/md-list.css",
 "libmde/md-tab.css",
 "material-tokens/css/baseline.css",
 "material-tokens/css/colors.css",
 "material-tokens/css/elevation.css",
 "material-tokens/css/motion.css",
 "material-tokens/css/palette.css",
 "material-tokens/css/shape.css",
 "material-tokens/css/state.css",
 "material-tokens/css/theme/dark.css",
 "material-tokens/css/theme/light.css",
 "material-tokens/css/typography.css",
 "site.webmanifest",
 "ungap/es.js",
 "/"
]

// Verifica si el código corre dentro de un service worker.
if (self instanceof ServiceWorkerGlobalScope) {
 // Evento al empezar a instalar el servide worker,
 self.addEventListener("install",
  (/** @type {ExtendableEvent} */ evt) => {
   console.log("El service worker se está instalando.")
   evt.waitUntil(llenaElCache())
  })

 // Evento al solicitar información a la red.
 self.addEventListener("fetch", (/** @type {FetchEvent} */ evt) => {
  if (evt.request.method === "GET") {
   evt.respondWith(buscaLaRespuestaEnElCache(evt))
  }
 })

 // Evento cuando el service worker se vuelve activo.
 self.addEventListener("activate",
  () => console.log("El service worker está activo."))
}

async function llenaElCache() {
 console.log("Intentando cargar caché:", CACHE)
 // Borra todos los cachés.
 const keys = await caches.keys()
 for (const key of keys) {
  await caches.delete(key)
 }
 // Abre el caché de este service worker.
 const cache = await caches.open(CACHE)
 // Carga el listado de ARCHIVOS.
 await cache.addAll(ARCHIVOS)
 console.log("Cache cargado:", CACHE)
 console.log("Versión:", VERSION)
}

/** @param {FetchEvent} evt */
async function buscaLaRespuestaEnElCache(evt) {
 // Abre el caché.
 const cache = await caches.open(CACHE)
 const request = evt.request
 /* Busca la respuesta a la solicitud en el contenido del caché, sin
  * tomar en cuenta la parte después del símbolo "?" en la URL. */
 const response = await cache.match(request, { ignoreSearch: true })
 if (response === undefined) {
  /* Si no la encuentra, empieza a descargar de la red y devuelve
   * la promesa. */
  return fetch(request)
 } else {
  // Si la encuentra, devuelve la respuesta encontrada en el caché.
  return response
 }
}
