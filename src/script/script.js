import Splide from '@splidejs/splide'
import '@splidejs/splide/dist/css/splide.min.css'
import {format} from 'date-fns';
import {es} from 'date-fns/locale';

import imagenIngredientesCeviche460 from 'url:../img/ingredientes_ceviche.png?as=webp&quality=80'
import imagenIngredientesCeviche1024 from 'url:../img/ingredientes_ceviche.png?as=webp&quality=80'
import imagenIngredientesCeviche1920 from 'url:../img/ingredientes_ceviche.png?as=webp&quality=75'

import imagenPescadoCrudo460 from 'url:../img/pescado_crudo.png?as=webp&quality=80'
import imagenPescadoCrudo1024 from 'url:../img/pescado_crudo.png?as=webp&quality=80'
import imagenPescadoCrudo1920 from 'url:../img/pescado_crudo.png?as=webp&quality=75'

import imagenCevicheChoclo460 from 'url:../img/ceviche_choclo.png?as=webp&quality=80'
import imagenCevicheChoclo1024 from 'url:../img/ceviche_choclo.png?as=webp&quality=80'
import imagenCevicheChoclo1920 from 'url:../img/ceviche_choclo.png?as=webp&quality=75'

import imagenCorteCarnes460 from 'url:../img/corte_carnes.png?as=webp&quality=80'
import imagenCorteCarnes1024 from 'url:../img/corte_carnes.png?as=webp&quality=80'
import imagenCorteCarnes1920 from 'url:../img/corte_carnes.png?as=webp&quality=75'

import imagenAjis460 from 'url:../img/ajis.png?as=webp&quality=80'
import imagenAjis1024 from 'url:../img/ajis.png?as=webp&quality=80'
import imagenAjis1920 from 'url:../img/ajis.png?as=webp&quality=75'

import imagenArrozBlanco460 from 'url:../img/arroz_blanco.png?as=webp&quality=80'
import imagenArrozBlanco1024 from 'url:../img/arroz_blanco.png?as=webp&quality=80'
import imagenArrozBlanco1920 from 'url:../img/arroz_blanco.png?as=webp&quality=75'

const imagenesCeviche = [
   {
      srcset: `${imagenIngredientesCeviche460} 460w, ${imagenIngredientesCeviche1024} 1024w, ${imagenIngredientesCeviche1920} 1920w`,
      src: imagenIngredientesCeviche1920,
      alt: "Imagen de los ingredientes de un ceviche"
   },
   {
      srcset: `${imagenPescadoCrudo460} 460w, ${imagenPescadoCrudo1024} 1024w, ${imagenPescadoCrudo1920} 1920w`,
      src: imagenPescadoCrudo1920,
      alt: "Imagen de un pescado fresco crudo"
   },
   {
      srcset: `${imagenCevicheChoclo460} 460w, ${imagenCevicheChoclo1024} 1024w, ${imagenCevicheChoclo1920} 1920w`,
      src: imagenCevicheChoclo1920,
      alt: "Imagen de un ceviche con choclo"
   }
]

const imagenesLomoSaltado = [
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
]

function carruselImagenes(id, imagenes, opciones={}) {
   const contenedor = document.getElementById(id);
   contenedor.innerHTML = `
      <section class="splide">
         <div class="splide__track">
            <ul class="splide__list">
               ${imagenes.map(imagen => `
                  <li class="splide__slide">
                     <img
                     srcset="${imagen.srcset}"
                     sizes="(min-width: 1025px) 1920px, (min-width: 460px) 1024px, 460px"
                     src="${imagen.src}" alt="${imagen.alt}" style="width:100%; display:block;">
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
