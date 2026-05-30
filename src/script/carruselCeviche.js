import {Splide} from '@splidejs/splide'
import imagenIngredientesCeviche460 from 'url:../img/ingredientes_ceviche.jpg?as=webp&width=460&quality=80'
import imagenIngredientesCeviche1024 from 'url:../img/ingredientes_ceviche.jpg?as=webp&width=1024&quality=80'
import imagenIngredientesCeviche1920 from 'url:../img/ingredientes_ceviche.jpg?as=webp&width=1920&quality=75'

import imagenPescadoCrudo460 from 'url:../img/pescado_crudo.jpg?as=webp&width=460&quality=80'
import imagenPescadoCrudo1024 from 'url:../img/pescado_crudo.jpg?as=webp&width=1024&quality=80'
import imagenPescadoCrudo1920 from 'url:../img/pescado_crudo.jpg?as=webp&width=1920&quality=75'

import imagenCevicheChoclo460 from 'url:../img/ceviche_choclo.jpg?as=webp&width=460&quality=80'
import imagenCevicheChoclo1024 from 'url:../img/ceviche_choclo.jpg?as=webp&width=1024&quality=80'
import imagenCevicheChoclo1920 from 'url:../img/ceviche_choclo.jpg?as=webp&width=1920&quality=75'

export const imagenesCeviche = [
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
