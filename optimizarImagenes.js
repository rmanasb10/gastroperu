import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

const configuracion = {
   "movil": 300,
   "tableta": 400,
   "escritorio": 500
}
const directorio = "./src/img"

optimizarImagenes();

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
            .resize({ width: configuracion.tableta, height: configuracion.tableta, fit: "cover", withoutEnlargement: true })
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