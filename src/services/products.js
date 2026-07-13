import { db } from './firebase.js';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';

export async function getProducts() {
  try {
    const colRef = collection(db, 'libros');
    const querySnapshot = await getDocs(colRef);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error('Error al obtener libros de Firestore:', error);
    throw new Error('No se pudo cargar el catalogo de libros desde la base de datos.');
  }
}

export async function getProductById(id) {
  try {
    const docRef = doc(db, 'libros', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return null;
    }
    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error('Error al obtener producto de Firestore por ID:', error);
    throw new Error('No se pudo obtener el detalle del libro desde la base de datos.');
  }
}
