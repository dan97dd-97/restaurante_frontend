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
### Despliegue en local

### 1. Backend

```bash
cd backend
docker compose up -d
```

- El backend corre en: http://localhost:4000

### 2. Frontend

- El frontend consume la API del **backend** para mostrar categorías, productos y manejar interacciones del usuario.