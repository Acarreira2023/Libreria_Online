import { db } from '../services/firebase.js';
import { addDoc, collection, doc, writeBatch, getDocs } from 'firebase/firestore';

export const catalogoLibros = [
  {
    id: 'react-practico',
    titulo: 'React - practico',
    autor: 'Pello Xabier Altadill Izura',
    categoria: 'Tecnico',
    precio: 18500,
    stock: 8,
    imagen: '/images/React-pr\u00e1ctico.webp',
    descripcion:
      'React es una de las herramientas mas relevantes del desarrollo web actual, utilizada por empresas como Airbnb y Netflix. Esta obra ense\u00f1a a organizar interfaces en componentes reutilizables y gestionar el HTML mediante un DOM virtual. Tambien aborda front-end, escritorio, React Native y aplicaciones full-stack con Next.js.',
    oferta: true,
    descuento: 15,
  },
  {
    id: 'javascript-moderno',
    titulo: 'JavaScript Moderno',
    autor: 'Jay Nans y Roger Beans-Rivet',
    categoria: 'Tecnico',
    precio: 21400,
    stock: 5,
    imagen: '/images/JavaScript-Moderna.webp',
    descripcion:
      'Una guia completa para todos los niveles que conecta los principios basicos con tecnicas de vanguardia. Incluye fundamentos, manipulacion del DOM, Node.js, closures, programacion asincronica, dise\u00f1o basado en eventos, optimizacion, depuracion con Jest y estandares ES6+.',
    oferta: false,
    descuento: 0,
  },
  {
    id: 'la-casa-de-los-silencios',
    titulo: 'La casa de los silencios',
    autor: 'Victor Ironcrusher',
    categoria: 'Terror',
    precio: 17200,
    stock: 6,
    imagen: '/images/La-casa-de-los-silencios.webp',
    descripcion:
      'Una novela corta de terror psicologico sobre una estudiante de historia que investiga una casa abandonada en un pueblo remoto. Su atmosfera inquietante y lenguaje accesible la vuelven ideal para lectores de nivel B1-B2 de espa\u00f1ol.',
    oferta: true,
    descuento: 10,
  },
  {
    id: 'sombras-en-el-bosque',
    titulo: 'Sombras en el bosque',
    autor: 'Phoebe Locke',
    categoria: 'Terror',
    precio: 15800,
    stock: 9,
    imagen: '/images/Sombras-en-el-bosque.webp',
    descripcion:
      'Un thriller que conecta un asesinato en 1990, una desaparicion en el a\u00f1o 2000 y un juicio en 2018, todos vinculados por la figura siniestra de El hombre alto. Recomendado para fans de Stephen King y Stranger Things.',
    oferta: false,
    descuento: 0,
  },
  {
    id: 'cartas-para-abril',
    titulo: 'Cartas para Abril',
    autor: 'Paula Ramos',
    categoria: 'Romantico',
    precio: 14900,
    stock: 10,
    imagen: '/images/Cartas-para-Abril.webp',
    descripcion:
      'Un relato sobre lo dificil que resulta madurar. La protagonista narra su vida caotica despues de un verano intenso y sus constantes tropiezos en la flor de la vida.',
    oferta: false,
    descuento: 0,
  },
  {
    id: 'un-beso-al-aire',
    titulo: 'Un beso al aire',
    autor: 'Sandra Miro',
    categoria: 'Romantico',
    precio: 13600,
    stock: 7,
    imagen: '/images/Un-beso-al -aire.webp',
    descripcion:
      'La historia de Gabriela y Adrian. Lo que empieza como una cena casual se transforma en una relacion que altera prioridades y sue\u00f1os, demostrando que algunos amores merecen cada latido.',
    oferta: true,
    descuento: 12,
  },
  {
    id: 'el-ultimo-testigo',
    titulo: 'El ultimo testigo',
    autor: 'John Grisham',
    categoria: 'Suspenso',
    precio: 18900,
    stock: 5,
    imagen: '/images/El-último-testigo.webp',
    descripcion:
      'Un drama judicial que funciona como precuela de El soborno. Presenta el primer juicio por asesinato de una jueza y la lucha entre un defensor desbordado y un fiscal ambicioso.',
    oferta: true,
    descuento: 15,
  },
  {
    id: 'en-sus-suenos',
    titulo: 'En sus sueños',
    autor: 'Blake Pierce',
    categoria: 'Suspenso',
    precio: 20100,
    stock: 4,
    imagen: '/images/En-sus-sueños.webp',
    descripcion:
      'Septima entrega de la serie de la sheriff Jenna Graves. En este caso debe detener a un asesino que usa el terror y los sue\u00f1os lucidos como arma para provocar ataques al corazon.',
    oferta: false,
    descuento: 0,
  },
  {
    id: 'muchas-vidas-muchos-maestros',
    titulo: 'Muchas vidas, muchos maestros',
    autor: 'Brian Weiss',
    categoria: 'Metafisico',
    precio: 16300,
    stock: 8,
    imagen: '/images/muchas-vidas-muchos-maestros.webp',
    descripcion:
      'El jefe de psiquiatria del hospital Mount Sinai relata su experiencia con una paciente que, bajo hipnosis, recordo vidas pasadas y contacto con Maestros espirituales. Un best-seller que une ciencia y metafisica.',
    oferta: true,
    descuento: 20,
  },
  {
    id: 'metafisica-para-todos',
    titulo: 'Metafisica para todos',
    autor: 'Gabriel Padilla Lopez',
    categoria: 'Metafisico',
    precio: 15200,
    stock: 6,
    imagen: '/images/Metafísica para todos.webp',
    descripcion:
      'Un manual de espiritualidad para Trabajadores de Luz. Propone el despertar de la conciencia a traves de la comprension del poder y la voluntad divina.',
    oferta: false,
    descuento: 0,
  },
  {
    id: 'tu-alma-tiene-un-plan',
    titulo: 'Tu alma tiene un plan',
    autor: 'Lisa A. Barnett',
    categoria: 'Espiritual',
    precio: 14100,
    stock: 9,
    imagen: '/images/Tu-alma-tiene-un-plan.webp',
    descripcion:
      'Basado en la sabiduria de los Registros Akasicos, este libro ayuda a identificar contratos sagrados y patrones karmicos para alinearse con el proposito vital del alma.',
    oferta: false,
    descuento: 0,
  },
  {
    id: 'el-viajero-espiritual',
    titulo: 'El viajero espiritual: un recorrido por los jardines del alma',
    autor: 'Asuncion Gomez Garcia',
    categoria: 'Espiritual',
    precio: 12900,
    stock: 11,
    imagen: '/images/El-viajero-espiritual.webp',
    descripcion:
      'Una invitacion a una aventura interior para aprender a comunicarse con guias espirituales y comprender que sucede despues de la muerte.',
    oferta: true,
    descuento: 10,
  },
];

const initialTeam = [
  { nombre: 'Anibal Carreira', rol: 'Fundador & Director', emoji: '\ud83d\udcda' },
  { nombre: 'Lucia Fernandez', rol: 'Editora en Jefe', emoji: '\u270d\ufe0f' },
  { nombre: 'Mateo Diaz', rol: 'Asesor Tecnico', emoji: '\ud83d\udcbb' },
];

const initialCoupons = [
  { codigo: 'TALENTOLAB', descuento: 15 },
  { codigo: 'REACT2026', descuento: 20 },
];

export async function importarCatalogo() {
  const librosCollection = collection(db, 'libros');
  const batch = writeBatch(db);

  catalogoLibros.forEach(({ id, ...libro }) => {
    batch.set(doc(librosCollection, id), libro, { merge: true });
  });

  await batch.commit();

  return {
    success: true,
    skipped: false,
    message: 'Los 12 libros fueron cargados o actualizados exitosamente en Firestore.',
  };
}

async function seedCollectionIfEmpty(collectionName, items) {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);

  if (!snapshot.empty) {
    return;
  }

  await Promise.all(items.map((item) => addDoc(colRef, item)));
}

export async function seedDatabase() {
  const catalogResult = await importarCatalogo();

  await seedCollectionIfEmpty('equipo', initialTeam);
  await seedCollectionIfEmpty('cupones', initialCoupons);

  return catalogResult;
}
