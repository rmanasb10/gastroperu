import {Splide} from '@splidejs/splide'
import {format} from 'date-fns';
import {es} from 'date-fns/locale';

import imagenPescadoCrudo460 from 'url:../img/pescado_crudo.jpg?as=webp&width=460&quality=80'
import imagenPescadoCrudo700 from 'url:../img/pescado_crudo.jpg?as=webp&width=700&quality=80'
import imagenPescadoCrudo800 from 'url:../img/pescado_crudo.jpg?as=webp&width=800&quality=75'

import imagenCevicheChoclo460 from 'url:../img/ceviche_choclo.jpg?as=webp&width=460&quality=80'
import imagenCevicheChoclo700 from 'url:../img/ceviche_choclo.jpg?as=webp&width=700&quality=80'
import imagenCevicheChoclo800 from 'url:../img/ceviche_choclo.jpg?as=webp&width=800&quality=75'

const imagenesCeviche = [
   {
      srcset: `${imagenPescadoCrudo460} 460w, ${imagenPescadoCrudo700} 700w, ${imagenPescadoCrudo800} 800w`,
      src: imagenPescadoCrudo800,
      alt: "Imagen de un pescado fresco crudo",
   },
   {
      srcset: `${imagenCevicheChoclo460} 460w, ${imagenCevicheChoclo700} 700w, ${imagenCevicheChoclo800} 800w`,
      src: imagenCevicheChoclo800,
      alt: "Imagen de un ceviche con choclo",
   }
];

function carruselImagenes(id, imagenes, opciones = {}) {
   return new Promise((resolve) => {
      const contenedor = document.getElementById(id);
      const lista = contenedor.querySelector(".splide__list");
      imagenes.forEach(imagen => {
         const li = document.createElement("li");
         li.className = "splide__slide";
         li.innerHTML = `<img srcset="${imagen.srcset}" sizes="(min-width: 1025px) 800px, (min-width: 460px) 700px, 460px" src="${imagen.src}" alt="${imagen.alt}" width="800" height="533" loading="lazy" decoding="async" style="width:100%; display:block;">`;
         lista.appendChild(li);
      })
      const splide = new Splide(contenedor.querySelector(".splide"), {
         type: 'loop',
         perPage: 1,
         autoplay: true,
         ...opciones
      });
      splide.mount();
      resolve(splide);
   });
}

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
      carruselImagenes("carruselCeviche", imagenesCeviche, {
         interval: 5000,
         arrows: false,
         pagination: false,
      });
   }
});