import { db } from '../services/firebase.js';
import { addDoc, collection, doc, getDocs, writeBatch } from 'firebase/firestore';

export const catalogoLibros = [
  {
    titulo: 'React - practico',
    autor: 'Pello Xabier Altadill Izura',
    categoria: 'Tecnico',
    precio: 18500,
    stock: 8,
    imagen: '/images/React-práctico.webp',
    descripcion:
      'React es una de las herramientas mas relevantes del desarrollo web actual, utilizada por empresas como Airbnb y Netflix. Esta obra enseña a organizar interfaces en componentes reutilizables y gestionar el HTML mediante un DOM virtual. Tambien aborda front-end, escritorio, React Native y aplicaciones full-stack con Next.js.',
  },
  {
    titulo: 'JavaScript Moderno',
    autor: 'Jay Nans y Roger Beans-Rivet',
    categoria: 'Tecnico',
    precio: 21400,
    stock: 5,
    imagen: '/images/JavaScript-Moderna.webp',
    descripcion:
      'Una guia completa para todos los niveles que conecta los principios basicos con tecnicas de vanguardia. Incluye fundamentos, manipulacion del DOM, Node.js, closures, programacion asincronica, diseño basado en eventos, optimizacion, depuracion con Jest y estandares ES6+.',
  },
  {
    titulo: 'La casa de los silencios',
    autor: 'Victor Ironcrusher',
    categoria: 'Terror',
    precio: 17200,
    stock: 6,
    imagen: '/images/La-casa-de-los-silencios.webp',
    descripcion:
      'Una novela corta de terror psicologico sobre una estudiante de historia que investiga una casa abandonada en un pueblo remoto. Su atmosfera inquietante y lenguaje accesible la vuelven ideal para lectores de nivel B1-B2 de español.',
  },
  {
    titulo: 'Sombras en el bosque',
    autor: 'Phoebe Locke',
    categoria: 'Terror',
    precio: 15800,
    stock: 9,
    imagen: '/images/Sombras-en-el-bosque.webp',
    descripcion:
      'Un thriller que conecta un asesinato en 1990, una desaparicion en el año 2000 y un juicio en 2018, todos vinculados por la figura siniestra de El hombre alto. Recomendado para fans de Stephen King y Stranger Things.',
  },
  {
    titulo: 'Cartas para Abril',
    autor: 'Paula Ramos',
    categoria: 'Romantico',
    precio: 14900,
    stock: 10,
    imagen: '/images/Cartas-para-Abril.webp',
    descripcion:
      'Un relato sobre lo dificil que resulta madurar. La protagonista narra su vida caotica despues de un verano intenso y sus constantes tropiezos en la flor de la vida.',
  },
  {
    titulo: 'Un beso al aire',
    autor: 'Sandra Miro',
    categoria: 'Romantico',
    precio: 13600,
    stock: 7,
    imagen: '/images/Un-beso-al -aire.webp',
    descripcion:
      'La historia de Gabriela y Adrian. Lo que empieza como una cena casual se transforma en una relacion que altera prioridades y sueños, demostrando que algunos amores merecen cada latido.',
  },
  {
    titulo: 'El ultimo testigo',
    autor: 'John Grisham',
    categoria: 'Suspenso',
    precio: 18900,
    stock: 5,
    imagen: '/images/El-último-testigo.webp',
    descripcion:
      'Un drama judicial que funciona como precuela de El soborno. Presenta el primer juicio por asesinato de una jueza y la lucha entre un defensor desbordado y un fiscal ambicioso.',
  },
  {
    titulo: 'En sus sueños',
    autor: 'Blake Pierce',
    categoria: 'Suspenso',
    precio: 20100,
    stock: 4,
    imagen: '/images/En-sus-sueños.webp',
    descripcion:
      'Septima entrega de la serie de la sheriff Jenna Graves. En este caso debe detener a un asesino que usa el terror y los sueños lucidos como arma para provocar ataques al corazon.',
  },
  {
    titulo: 'Muchas vidas, muchos maestros',
    autor: 'Brian Weiss',
    categoria: 'Metafisico',
    precio: 16300,
    stock: 8,
    imagen: '/images/muchas-vidas-muchos-maestros.webp',
    descripcion:
      'El jefe de psiquiatria del hospital Mount Sinai relata su experiencia con una paciente que, bajo hipnosis, recordo vidas pasadas y contacto con Maestros espirituales. Un best-seller que une ciencia y metafisica.',
  },
  {
    titulo: 'Metafisica para todos',
    autor: 'Gabriel Padilla Lopez',
    categoria: 'Metafisico',
    precio: 15200,
    stock: 6,
    imagen: '/images/Metafísica para todos.webp',
    descripcion:
      'Un manual de espiritualidad para Trabajadores de Luz. Propone el despertar de la conciencia a traves de la comprension del poder y la voluntad divina.',
  },
  {
    titulo: 'Tu alma tiene un plan',
    autor: 'Lisa A. Barnett',
    categoria: 'Espiritual',
    precio: 14100,
    stock: 9,
    imagen: '/images/Tu-alma-tiene-un-plan.webp',
    descripcion:
      'Basado en la sabiduria de los Registros Akasicos, este libro ayuda a identificar contratos sagrados y patrones karmicos para alinearse con el proposito vital del alma.',
  },
  {
    titulo: 'El viajero espiritual: un recorrido por los jardines del alma',
    autor: 'Asuncion Gomez Garcia',
    categoria: 'Espiritual',
    precio: 12900,
    stock: 11,
    imagen: '/images/El-viajero-espiritual.webp',
    descripcion:
      'Una invitacion a una aventura interior para aprender a comunicarse con guias espirituales y comprender que sucede despues de la muerte.',
  },
];

const initialTeam = [
  { nombre: 'Anibal Carreira', rol: 'Fundador & Director', emoji: '📚' },
  { nombre: 'Lucia Fernandez', rol: 'Editora en Jefe', emoji: '✍️' },
  { nombre: 'Mateo Diaz', rol: 'Asesor Tecnico', emoji: '💻' },
];

const initialCoupons = [
  { codigo: 'TALENTOLAB', descuento: 15 },
  { codigo: 'REACT2026', descuento: 20 },
];

export async function importarCatalogo() {
  const librosCollection = collection(db, 'libros');
  const librosSnapshot = await getDocs(librosCollection);

  if (!librosSnapshot.empty) {
    return {
      success: true,
      skipped: true,
      message: 'La coleccion libros ya tiene documentos. No se importaron duplicados.',
    };
  }

  const batch = writeBatch(db);

  catalogoLibros.forEach((libro) => {
    const nuevoDocRef = doc(librosCollection);
    batch.set(nuevoDocRef, libro);
  });

  await batch.commit();

  return {
    success: true,
    skipped: false,
    message: 'Los 12 libros fueron guardados exitosamente en Firestore.',
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
