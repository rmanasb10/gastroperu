import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

const configuracion = {
   "movil": 300,
   "tablet": 400,
   "escritorio": 500
}
const directorio = "./src/img"

// optimizarImagenes();
// optimizarLogotipo(`${directorio}/GastroPeru.png`);
// recortarImagen("ceviche.png");
// recortarImagen("lomo_saltado.png")

async function optimizarImagenes() {
   await fs.mkdir(directorio, { recursive: true });
   const archivos = await fs.readdir(directorio);
   for (const archivo of archivos) {
      const extension = path.extname(archivo).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(extension)) {
         continue;
      }
      const nombreArchivo = path.parse(archivo).name;
      const rutaArchivo = path.join(directorio, archivo);
      try {
         // Generar Versión Móvil
         await sharp(rutaArchivo)
            .resize({ width: configuracion.movil, height: configuracion.movil, fit: "cover", withoutEnlargement: true })
            .webp({ quality: 75 })
            .toFile(path.join(directorio, `${nombreArchivo}-movil.webp`));
         // Generar Versión Tableta
         await sharp(rutaArchivo)
            .resize({ width: configuracion.tablet, height: configuracion.tableta, fit: "cover", withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(path.join(directorio, `${nombreArchivo}-tablet.webp`));
         // Generar Versión Escritorio
         await sharp(rutaArchivo)
            .resize({ width: configuracion.escritorio, height: configuracion.escritorio, fit: "cover", withoutEnlargement: true })
            .webp({ quality: 85 })
            .toFile(path.join(directorio, `${nombreArchivo}-escritorio.webp`));
      } catch (err) {
         console.error(`Error procesando ${archivo}:`, err);
      }
   }
}

async function optimizarLogotipo(logotipo) {
   await sharp(logotipo)
   .webp({quality:90})
   .toFile(`${directorio}/GastroPeru.webp`);

   const metadata = await sharp(logotipo).metadata();
   await sharp(logotipo)
   .resize(metadata.width * 2, metadata.height * 2)
   .webp({quality: 90})
   .toFile(`${directorio}/GastroPeru-2x.webp`);

   await sharp(logotipo)
   .png({compressionLeve: 9})
   .toFile(`${directorio}/GastroPeru-optimizado.png`);
}

async function recortarImagen(imagen) {
   const nombreImagen = imagen.split(".")
   await sharp(`${directorio}/${imagen}`)
   .resize(460, 460, {
      fit: "cover",
      position: "centre"
   })
   .webp({quality: 85})
   .toFile(`${directorio}/${nombreImagen[0]}-para-movil.webp`);

   await sharp(`${directorio}/${imagen}`)
   .resize(1024, 600, {
      fit: "cover",
      position: "centre"
   })
   .webp({quality: 85})
   .toFile(`${directorio}/${nombreImagen[0]}-para-tablet.webp`);

   await sharp(`${directorio}/${imagen}`)
   .resize(1200, 500, {
      fit: "cover",
      position: "centre"
   })
   .webp({quality: 85})
   .toFile(`${directorio}/${nombreImagen[0]}-para-escritorio.webp`); 
}
