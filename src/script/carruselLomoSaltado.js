import {Splide} from '@splidejs/splide'
import imagenCorteCarnes460 from 'url:../img/corte_carnes.jpg?as=webp&width=460&quality=80'
import imagenCorteCarnes1024 from 'url:../img/corte_carnes.jpg?as=webp&width=1024&quality=80'
import imagenCorteCarnes1920 from 'url:../img/corte_carnes.jpg?as=webp&width=1920&quality=75'

import imagenAjis460 from 'url:../img/ajis.jpg?as=webp&width=460&quality=80'
import imagenAjis1024 from 'url:../img/ajis.jpg?as=webp&width=1024&quality=80'
import imagenAjis1920 from 'url:../img/ajis.jpg?as=webp&width=1920&quality=75'

import imagenArrozBlanco460 from 'url:../img/arroz_blanco.jpg?as=webp&width=460&quality=80'
import imagenArrozBlanco1024 from 'url:../img/arroz_blanco.jpg?as=webp&width=1024&quality=80'
import imagenArrozBlanco1920 from 'url:../img/arroz_blanco.jpg?as=webp&width=1920&quality=75'

export const imagenesLomoSaltado = [
   {
      srcset: `${imagenCorteCarnes460} 460w, ${imagenCorteCarnes1024} 1024w, ${imagenCorteCarnes1920} 1920w`,
      src: imagenCorteCarnes1920,
      alt: "Imagen de diferentes cortes en una pieza de carne"
   },
   {
      srcset: `${imagenAjis460} 460w, ${imagenAjis1024} 1024w, ${imagenAjis1920} 1920w`,
      src: imagenAjis1920,
      alt: "Imagen de varios ajís"
   },
   {
      srcset: `${imagenArrozBlanco460} 460w, ${imagenArrozBlanco1024} 1024w, ${imagenArrozBlanco1920} 1920w`,
      src: imagenArrozBlanco1920,
      alt: "Imagen de arroz blanco cocido"
   }
];

export async function carruselImagenes(id, imagenes, opciones={}) {
   const contenedor = document.getElementById(id);
   contenedor.innerHTML = `
      <section class="splide" id="splide-${id}">
         <div class="splide__track">
            <ul class="splide__list">
               ${imagenes.map(imagen => `
                  <li class="splide__slide">
                     <img
                     srcset="${imagen.srcset}"
                     sizes="(min-width: 1025px) 1920px, (min-width: 460px) 1024px, 460px"
                     src="${imagen.src}" alt="${imagen.alt}" style="width:100%; display:block;" loading="lazy">
                  </li>`
               ).join('')}
            </ul>
         </div>
      </section>`
   const elementoSplide = document.getElementById(`splide-${id}`);
   if (!elementoSplide) {
      return;
   }
   const splide = new Splide(elementoSplide, {
      type: 'loop',
      perPage: 1,
      autoplay: true,
      ...opciones
   });
   splide.mount();
   return splide;
};