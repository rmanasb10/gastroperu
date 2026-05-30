import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import {carruselImagenes as carruselCeviche, imagenesCeviche} from './carruselCeviche.js';
import {carruselImagenes as carruselLomoSaltado, imagenesLomoSaltado} from './carruselLomoSaltado.js';

document.addEventListener("DOMContentLoaded", async() => {
   const rutaActual = window.location.pathname;
   const barraNavegación = document.querySelectorAll(".nav-item a");
   barraNavegación.forEach(item => {
      if (item.getAttribute("href") === rutaActual || item.href === window.location.href) {
         item.classList.add('active');
      }
   })
   const fechaActual = document.getElementById("fechaActual");
   if(fechaActual) {
      const hoy = Date.now();
      const formatoFecha = format(hoy, "d 'de' MMMM 'de' yyyy", {
         locale: es
      })
      fechaActual.innerText = `Receta actualizada a ${formatoFecha}`;
   }
   if (document.getElementById("carruselCeviche")) {
      carruselCeviche("carruselCeviche", imagenesCeviche, {
         interval: 5000,
         arrows: true
      });
   }
   if (document.getElementById("carruselLomoSaltado")) {
      carruselLomoSaltado("carruselLomoSaltado", imagenesLomoSaltado, {
         interval: 5000,
         arrows: true
      });
   }
});
