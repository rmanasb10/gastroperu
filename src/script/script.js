import Splide from '@splidejs/splide'
import '@splidejs/splide/dist/css/splide.min.css'
import {format} from 'date-fns';
import {es} from 'date-fns/locale';

import imagenIngredientesCeviche from 'url:../img/ingredientes_ceviche.png'
import imagenPescadoCrudo from 'url:../img/pescado_crudo.png'
import imagenCevicheChoclo from 'url:../img/ceviche_choclo.png'

import imagenCorteCarnes from 'url:../img/corte_carnes.png'
import imagenAjis from 'url:../img/ajis.png'
import imagenArrozBlanco from 'url:../img/arroz_blanco.png'

const imagenesCeviche = [
   {
      url: imagenIngredientesCeviche,
      alt: "Imagen de los ingredientes de un ceviche"
   },
   {
      url: imagenPescadoCrudo,
      alt: "Imagen de un pescado fresco crudo"
   },
   {
      url: imagenCevicheChoclo,
      alt: "Imagen de un ceviche con choclo"
   }
]

const imagenesLomoSaltado = [
   {
      url: imagenCorteCarnes,
      alt: "Imagen de diferentes cortes en una pieza de carne"
   },
   {
      url: imagenAjis,
      alt: "Imagen de varios ajís"
   },
   {
      url: imagenArrozBlanco,
      alt: "Imagen de arroz blanco cocido"
   }
]

function carruselImagenes(id, imagenes, opciones={}) {
   const contenedor = document.getElementById(id);
   contenedor.innerHTML = `
      <section class="splide">
         <div class="splide__track">
            <ul class="splide__list">
               ${imagenes.map(imagen => `
                  <li class="splide__slide">
                     <img src="${imagen.url}" alt="${imagen.alt}" style="width:100%; display:block;">
                  </li>`
               ).join('')}
            </ul>
         </div>
      </section>`
   const splide = new Splide(contenedor.querySelector('.splide'), {
      type: 'loop',
      perPage: 1,
      autoplay: true,
      ...opciones
   });
   splide.mount();
   return splide;
}

document.addEventListener("DOMContentLoaded", () => {
   const rutaActual = window.location.pathname;
   const barraNavegación = document.querySelectorAll(".nav-item a");
   barraNavegación.forEach(item => {
      if (item.getAttribute("href") === rutaActual || item.href === window.location.href) {
         item.classList.add('active');
      }
   })
   const fechaActual = document.getElementById("fechaActual");
   const hoy = Date.now();
   const formatoFecha = format(hoy, "d 'de' MMMM 'de' yyyy", {
      locale: es
   })
   fechaActual.innerText = `Receta actualizada a ${formatoFecha}`;
   if (document.getElementById("carruselCeviche")) {
      carruselImagenes("carruselCeviche", imagenesCeviche, {
         interval: 5000,
         arrows: true
      });
   }
   if (document.getElementById("carruselLomoSaltado")) {
      carruselImagenes("carruselLomoSaltado", imagenesLomoSaltado, {
         interval: 5000,
         arrows: true
      });
   }
});
