# eCommerce Librería Online

Este proyecto consiste en una aplicación web de eCommerce completa, funcional y responsiva de una librería en línea.

La aplicación implementa una arquitectura modular con división en componentes contenedores y presentacionales, un sistema de estado global para el carrito de compras y la sesión de usuarios, y conexión directa a la base de datos y autenticación en la nube con **Firebase**.

---

## 🚀 Tecnologías Utilizadas

- **Frontend Core**: React 19 (Vite) & React Router DOM v7
- **Bases de Datos & Auth**: Firebase v10 (Firestore & Authentication)
- **Estilización & UI**:
  - **React-Bootstrap** & Bootstrap 5 (Grillas responsivas y componentes UX)
  - **Styled-components** (Estilos dinámicos y micro-animaciones premium)
  - **React Icons** (Iconografía interactiva y accesible)
- **SEO & Metadata**: React Helmet Async (Gestión dinámica de `<title>` y `<meta>` por vista)

---

## 📌 Requerimientos Implementados

### 1. Gestión de Estado Global y Autenticación
- **CarritoContext (Context API)**: Estado global para gestionar la adición de libros, remoción individual, vaciado completo y cálculo automático del total de la compra y la cantidad de ítems.
- **AuthContext (Firebase Auth)**: Contexto de sesión para el registro y login de usuarios conectados a Firebase Authentication.
- **Rutas Protegidas**: Rutas privadas `/perfil` y `/admin` protegidas mediante un componente `ProtectedRoute` que redirige a `/login` si no hay sesión activa.

### 2. Integración con Firestore y CRUD
- **Carga Dinámica**: Catálogo y detalles consumidos directamente desde la colección `productos` de Firestore.
- **Administración Completa (CRUD)**:
  - **Create**: Formulario validado para agregar nuevos libros.
  - **Read**: Visualización de existencias de libros en una tabla interactiva.
  - **Update**: Edición de campos de libros existentes en Firestore.
  - **Delete**: Eliminación de registros con un **Modal de Confirmación** para evitar borrados accidentales.
- **Gestión de Cupones**: Panel para crear y borrar cupones de descuento en tiempo real mediante `addDoc` y `deleteDoc`.

### 3. Usabilidad, Búsqueda y Paginación
- **Búsqueda en Tiempo Real**: Barra de filtrado reactiva en el catálogo principal que busca coincidencias en título o autor mientras el usuario escribe.
- **Paginación**: Paginador dinámico para segmentar los libros (6 por página) optimizando la carga visual.
- **Checkout con Transacción**: Formulario que valida los datos del comprador y guarda una orden en la colección `ordenes` de Firestore, reduciendo automáticamente el stock de los productos comprados.

### 4. Componentes
- **Asistentes**: Componente reutilizable `Asistente` por props que renderiza las tarjetas del staff pedagógico.
- **Nosotros**: Consumo asincrónico del archivo local `nosotros.json` con manejo de estados de carga (Spinner) y error.
- **Footer Dinámico**: Carga dinámica del equipo de staff desde la colección `equipo` de Firestore.

---

## 🛠️ Instalación y Configuración Local

Sigue los siguientes pasos para instalar y ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio e instalar dependencias
```bash
# Instalar dependencias
npm install
```

### 2. Configurar las Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto (puedes tomar como referencia el archivo `.env.example`) y completa los campos con las credenciales de tu proyecto de Firebase:

```env
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain_aqui
VITE_FIREBASE_PROJECT_ID=tu_project_id_aqui
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket_aqui
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id_aqui
VITE_FIREBASE_APP_ID=tu_app_id_aqui
```

### 3. Ejecutar el servidor de desarrollo
```bash
# Iniciar servidor local
npm run dev
```

---

## 🗃️ Inicializar la Base de Datos (Seeding)

Para facilitar la evaluación y evitar ingresar datos manualmente en Firestore, la aplicación incluye una utilidad de auto-poblado de base de datos.
1. Inicia sesión con cualquier cuenta o crea una nueva en `/login`.
2. Dirígete al panel `/admin` (a través del botón "Mi Perfil" o el enlace "Admin" del menú).
3. Haz clic en el botón amarillo **"Poblar Base de Datos"**.
4. ¡Listo! Esto subirá de forma automática los 12 libros de muestra, los integrantes del equipo para el Footer y los cupones válidos (`TALENTOLAB` y `REACT2026`) a tu Firestore.

---

## 📦 Construcción para Producción

Para compilar y optimizar la aplicación para su despliegue en Vercel o Netlify:
```bash
npm run build
```

*Nota para Netlify: El archivo `public/_redirects` ya está configurado para dar soporte a las rutas internas del SPA.*
