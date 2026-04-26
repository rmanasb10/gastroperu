import Splide from '@splidejs/splide'
import '@splidejs/splide/dist/css/splide.min.css'
import {format} from 'date-fns';
import {es} from 'date-fns/locale';

import imagenIngredientesCeviche from 'url:../img/ingredientes_ceviche.png'
import imagenIngredientesCevicheMovi from 'url:../img/ingredientes_ceviche-movil.webp'
import imagenIngredientesCevicheTablet from 'url:../img/ingredientes_ceviche-tablet.webp'
import imagenIngredientesCevicheEscritorio from 'url:../img/ingredientes_ceviche-escritorio.webp'
import imagenPescadoCrudo from 'url:../img/pescado_crudo.png'
import imagenPescadoCrudoMovil from 'url:../img/pescado_crudo-movil.webp'
import imagenPescadoCrudoTablet from 'url:../img/pescado_crudo-tablet.webp'
import imagenPescadoCrudoEscritorio from 'url:../img/pescado_crudo-escritorio.webp'
import imagenCevicheChoclo from 'url:../img/ceviche_choclo.png'
import imagenCevicheChocloMovil from 'url:../img/ceviche_choclo-movil.webp'
import imagenCevicheChocloTablet from 'url:../img/ceviche_choclo-tablet.webp'
import imagenCevicheChocloEscritorio from 'url:../img/ceviche_choclo-escritorio.webp'

import imagenCorteCarnes from 'url:../img/corte_carnes.png'
import imagenCorteCarnesMovil from 'url:../img/corte_carnes-movil.webp'
import imagenCorteCarnesTablet from 'url:../img/corte_carnes-tablet.webp'
import imagenCorteCarnesEscritorio from 'url:../img/corte_carnes-escritorio.webp'
import imagenAjis from 'url:../img/ajis.png'
import imagenAjisMovil from 'url:../img/ajis-movil.webp'
import imagenAjisTablet from 'url:../img/ajis-tablet.webp'
import imagenAjisEscritorio from 'url:../img/ajis-escritorio.webp'
import imagenArrozBlanco from 'url:../img/arroz_blanco.png'
import imagenArrozBlancoMovil from 'url:../img/arroz_blanco-movil.webp'
import imagenArrozBlancoTablet from 'url:../img/arroz_blanco-tablet.webp'
import imagenArrozBlancoEscritorio from 'url:../img/arroz_blanco-escritorio.webp'

const imagenesCeviche = [
   {
      defecto: imagenIngredientesCeviche,
      movil: imagenIngredientesCevicheMovi,
      tablet: imagenIngredientesCevicheTablet,
      escritorio: imagenIngredientesCevicheEscritorio,
      alt: "Imagen de los ingredientes de un ceviche"
   },
   {
      defecto: imagenPescadoCrudo,
      movil: imagenPescadoCrudoMovil,
      tablet: imagenPescadoCrudoTablet,
      escritorio: imagenPescadoCrudoEscritorio,
      alt: "Imagen de un pescado fresco crudo"
   },
   {
      defecto: imagenCevicheChoclo,
      movil: imagenCevicheChocloMovil,
      tablet: imagenCevicheChocloTablet,
      escritorio: imagenCevicheChocloEscritorio,
      alt: "Imagen de un ceviche con choclo"
   }
]

const imagenesLomoSaltado = [
   {
      url: imagenCorteCarnes,
      movil: imagenCorteCarnesMovil,
      tablet: imagenCorteCarnesTablet,
      escritorio: imagenCorteCarnesEscritorio,
      alt: "Imagen de diferentes cortes en una pieza de carne"
   },
   {
      url: imagenAjis,
      movil: imagenAjisMovil,
      tablet: imagenAjisTablet,
      escritorio: imagenAjisEscritorio,
      alt: "Imagen de varios ajís"
   },
   {
      url: imagenArrozBlanco,
      movil: imagenArrozBlancoMovil,
      tablet: imagenArrozBlancoTablet,
      escritorio: imagenArrozBlancoEscritorio,
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
                     <img srcset="${imagen.movil} 460w, ${imagen.tablet} 1024w, ${imagen.escritorio} 1025w"
                     sizes="(max-width: 460px) 460px, (max-width: 1024px) 1024px, 1025px"
                     src="${imagen.defecto}" alt="${imagen.alt}" style="width:100%; display:block;">
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
