# Libreria Online

Aplicacion web de eCommerce para una libreria online desarrollada con React y Vite. El proyecto permite navegar un catalogo de libros, ver el detalle de cada producto, administrar un carrito de compras, iniciar sesion y gestionar datos desde un panel de administracion conectado a Firebase.

## Tecnologias

- React 19
- Vite
- React Router DOM
- Context API
- Firebase Authentication
- Cloud Firestore
- React Bootstrap y Bootstrap 5
- Styled Components
- React Icons y Lucide React
- React Helmet Async

## Funcionalidades principales

- Catalogo de libros cargado desde Firestore.
- Filtros y busqueda por libros.
- Vista de detalle por ruta dinamica.
- Carrito de compras con estado global.
- Checkout con registro de ordenes.
- Login y perfil de usuario con Firebase Auth.
- Rutas protegidas para `/perfil` y `/admin`.
- Panel de administracion para gestionar libros y cupones.
- Carga y actualizacion del catalogo mediante boton de admin.
- Ofertas en libros seleccionados con precio original y precio final.
- Vista institucional `/nosotros`.
- Soporte para rutas SPA en despliegues con `public/_redirects`.

## Colecciones de Firestore

La aplicacion utiliza estas colecciones:

- `libros`: catalogo principal de libros.
- `cupones`: codigos de descuento.
- `ordenes`: ordenes generadas durante el checkout.
- `equipo`: datos auxiliares usados por secciones institucionales.

Importante: el catalogo principal se lee desde la coleccion `libros`.

## Rutas

- `/`: inicio.
- `/productos`: catalogo de libros.
- `/producto/:id`: detalle de un libro.
- `/carrito`: carrito de compras.
- `/login`: acceso de usuario.
- `/perfil`: perfil protegido.
- `/admin`: panel de administracion protegido.
- `/nosotros`: informacion institucional.

## Instalacion local

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Compilar para produccion:

```bash
npm run build
```

Vista previa del build:

```bash
npm run preview
```

Si `npm` falla en esta PC por la instalacion global, se puede ejecutar con:

```bash
node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run dev
```

## Variables de entorno

Crear un archivo `.env` en la raiz del proyecto con las credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

El archivo `src/services/firebase.js` toma estos valores para inicializar Firebase, Firestore y Authentication.

## Inicializar Firestore

El proyecto incluye una utilidad de seed en:

```text
src/utils/seed.js
```

Para cargar o actualizar los 12 libros iniciales:

1. Configurar correctamente el archivo `.env`.
2. Iniciar la app con `npm run dev`.
3. Iniciar sesion desde `/login`.
4. Entrar a `/admin`.
5. Presionar el boton `Actualizar libros en Firebase`.
6. Confirmar la accion.

La importacion usa `writeBatch` y carga los datos en la coleccion `libros`. Cada libro tiene un ID fijo, por lo que el boton sirve para crear o actualizar el catalogo sin duplicar esos 12 libros.

## Panel de administracion

Desde `/admin` se puede:

- Importar el catalogo inicial en Firestore.
- Actualizar el catalogo base de 12 libros.
- Ver libros cargados.
- Crear nuevos libros.
- Editar libros existentes.
- Eliminar libros con confirmacion.
- Crear y borrar cupones de descuento.

## Datos del catalogo inicial

El seed carga 12 libros, dos por categoria:

- Tecnico
- Terror
- Romantico
- Suspenso
- Metafisico
- Espiritual

Las imagenes de portada se sirven desde `public/images`.

## Despliegue

El proyecto puede desplegarse en Vercel o Netlify. Para Netlify, `public/_redirects` permite que las rutas internas de React Router funcionen al recargar la pagina.
