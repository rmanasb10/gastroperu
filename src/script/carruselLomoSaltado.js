import {Splide} from '@splidejs/splide'
import {format} from 'date-fns';
import {es} from 'date-fns/locale';

import imagenCorteCarnes460 from 'url:../img/corte_carnes.jpg?as=webp&width=460&quality=80'
import imagenCorteCarnes700 from 'url:../img/corte_carnes.jpg?as=webp&width=700&quality=80'
import imagenCorteCarnes800 from 'url:../img/corte_carnes.jpg?as=webp&width=800&quality=75'

import imagenAjis460 from 'url:../img/ajis.jpg?as=webp&width=460&quality=80'
import imagenAjis700 from 'url:../img/ajis.jpg?as=webp&width=700&quality=80'
import imagenAjis800 from 'url:../img/ajis.jpg?as=webp&width=800&quality=75'

import imagenArrozBlanco460 from 'url:../img/arroz_blanco.jpg?as=webp&width=460&quality=80'
import imagenArrozBlanco700 from 'url:../img/arroz_blanco.jpg?as=webp&width=700&quality=80'
import imagenArrozBlanco800 from 'url:../img/arroz_blanco.jpg?as=webp&width=800&quality=75'

const imagenesLomoSaltado = [
   {
      srcset: `${imagenCorteCarnes460} 460w, ${imagenCorteCarnes700} 700w, ${imagenCorteCarnes800} 800w`,
      src: imagenCorteCarnes800,
      alt: "Imagen de diferentes cortes en una pieza de carne",
      isLCP: true
   },
   {
      srcset: `${imagenAjis460} 460w, ${imagenAjis700} 700w, ${imagenAjis800} 800w`,
      src: imagenAjis800,
      alt: "Imagen de varios ajís",
      isLCP: false
   },
   {
      srcset: `${imagenArrozBlanco460} 460w, ${imagenArrozBlanco700} 700w, ${imagenArrozBlanco800} 800w`,
      src: imagenArrozBlanco800,
      alt: "Imagen de arroz blanco cocido",
      isLCP: false
   }
];

function carruselImagenes(id, imagenes, opciones = {}) {
   return new Promise((resolve) => {
      const contenedor = document.getElementById(id);
      contenedor.innerHTML = `
         <section class="splide" id="splide-${id}">
            <div class="splide__track">
               <ul class="splide__list">
                  ${imagenes.map(imagen => `
                     <li class="splide__slide">
                        <img
                        srcset="${imagen.srcset}"
                        sizes="(min-width: 1025px) 800px, (min-width: 460px) 700px, 460px"
                        src="${imagen.src}"
                        alt="${imagen.alt}"
                        style="width:100%; display:block;"
                        ${imagen.isLCP
                           ? 'fetchpriority="high" loading="eager" decoding="sync"'
                           : 'loading="lazy" decoding="async"'
                        }>
                     </li>`
                  ).join('')}
               </ul>
            </div>
         </section>`;
      requestAnimationFrame(() => {
         const elementoSplide = document.getElementById(`splide-${id}`);
         if (!elementoSplide) {
            resolve(null);
            return;
         }
         const splide = new Splide(elementoSplide, {
            type: 'loop',
            perPage: 1,
            autoplay: true,
            ...opciones
         });
         splide.mount();
         resolve(splide);
      });
   });
};

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
   if (document.getElementById("carruselLomoSaltado")) {
      carruselImagenes("carruselLomoSaltado", imagenesLomoSaltado, {
         interval: 5000,
         arrows: false,
         pagination: false
      });
   }
});