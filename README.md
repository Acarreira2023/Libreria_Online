# Libreria Online

Proyecto de pre-entrega para el curso de React JS. Es una SPA creada con Vite que implementa catalogo de libros, detalle por ruta dinamica y carrito de compras con Context API.

## Tecnologias

- React
- Vite
- React Router DOM
- Context API
- CSS Modules

## Scripts

```bash
npm install
npm run dev
npm run build
```

Si el comando `npm` apunta a una instalacion global rota, en esta maquina funciono usando:

```bash
node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install
node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run dev
```

## Rutas

- `/`: Inicio.
- `/productos`: Catalogo completo.
- `/producto/:id`: Detalle de un libro.
- `/carrito`: Resumen del carrito.

## Datos

Los libros se cargan desde `public/data/productos.json` mediante `fetch`, simulando una API local.
