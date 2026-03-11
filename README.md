# Guía de Despliegue - Restaurante Frontend 🚀

Este documento detalla los pasos necesarios para desplegar la aplicación en **GitHub Pages** y las correcciones realizadas para que el enrutamiento funcione correctamente.

## 🔗 Enlace del Proyecto
Tu aplicación está disponible en:
[https://dan97dd-97.github.io/restaurante_frontend/](https://dan97dd-97.github.io/restaurante_frontend/)

---

## 🛠️ Correcciones Realizadas (Importante)

Para que una aplicación de React con `react-router-dom` funcione en una subcarpeta de GitHub (como `/restaurante_frontend/`), se han necesitado dos ajustes clave:

1.  **`vite.config.js`**:
    Se ha añadido `base: "/restaurante_frontend/"`. Esto asegura que los archivos JS y CSS se carguen desde la ruta correcta.

2.  **`src/main.jsx`**:
    Se ha configurado el `basename` en el `<BrowserRouter>`:
    ```jsx
    <BrowserRouter basename={import.meta.env.BASE_URL}>
    ```
    Esto le dice a React Router que todas las rutas comienzan después de `/restaurante_frontend/`, evitando errores 404 al navegar.

---

## 🚀 Cómo Desplegar Cambios

Cada vez que hagas cambios en el código y quieras verlos reflejados en internet, sigue estos pasos:

1.  **Asegúrate de que tu código esté en GitHub:**
    ```bash
    git add .
    git commit -m "Descripción de tus cambios"
    git push
    ```

2.  **Ejecuta el comando de despliegue:**
    Desde la carpeta `restaurante_frontend`, ejecuta:
    ```bash
    npm run deploy
    ```

### ¿Qué hace `npm run deploy`?
-   Ejecuta `npm run build` para generar la carpeta `dist` con el código optimizado.
-   Usa la librería `gh-pages` para subir esa carpeta a la rama `gh-pages` de tu repositorio.
-   GitHub detecta esa rama y actualiza la web automáticamente.

---

## ⚠️ Nota sobre la API
La aplicación utiliza un archivo `.env.production` para conectar con el backend. Asegúrate de que la URL en ese archivo sea la correcta para el entorno de producción.
