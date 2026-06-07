import {Splide} from '@splidejs/splide'
import {format} from 'date-fns';
import {es} from 'date-fns/locale';

import imagenAjis460 from 'url:../img/ajis.jpg?as=webp&width=460&quality=80'
import imagenAjis700 from 'url:../img/ajis.jpg?as=webp&width=700&quality=80'
import imagenAjis800 from 'url:../img/ajis.jpg?as=webp&width=800&quality=75'

import imagenArrozBlanco460 from 'url:../img/arroz_blanco.jpg?as=webp&width=460&quality=80'
import imagenArrozBlanco700 from 'url:../img/arroz_blanco.jpg?as=webp&width=700&quality=80'
import imagenArrozBlanco800 from 'url:../img/arroz_blanco.jpg?as=webp&width=800&quality=75'

const imagenesLomoSaltado = [
   {
      srcset: `${imagenAjis460} 460w, ${imagenAjis700} 700w, ${imagenAjis800} 800w`,
      src: imagenAjis800,
      alt: "Imagen de varios ajís",
   },
   {
      srcset: `${imagenArrozBlanco460} 460w, ${imagenArrozBlanco700} 700w, ${imagenArrozBlanco800} 800w`,
      src: imagenArrozBlanco800,
      alt: "Imagen de arroz blanco cocido",
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