# Formulario React - Panadería ELI (Unidad 2)

Migración del formulario de la Unidad 1 a React con Bootstrap.

## Archivos principales

- `src/App.js` - Componente principal con el formulario y validaciones (`useState`).
- `src/index.js` - Punto de entrada, importa Bootstrap y los estilos personalizados.
- `src/index.css` - Estilos personalizados (paleta lila de la marca).
- `public/index.html` - Plantilla HTML donde React monta la app.
- `package.json` - Dependencias y scripts del proyecto.

## Requisitos

- Node.js 16 o superior.
- npm 8 o superior.

## Instalación

1. Clona el repositorio:
   ```
   git clone <url-del-repositorio>
   cd <carpeta-del-repo>
   ```
2. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución

Inicia el servidor de desarrollo:

```
npm start
```

Abre `http://localhost:3000` en tu navegador.

## Validaciones

- Nombre: campo obligatorio.
- Correo: no puede estar vacío y debe tener formato válido.
- Contraseña: mínimo 8 caracteres.

Las validaciones son **dinámicas en tiempo real**: los mensajes aparecen bajo cada campo a medida que el usuario escribe (después del primer `blur`).

## Sesiones del proyecto (Unidad 2)

- **Sesión 1 - Introducción a React:** proyecto creado con React 18, componente `App.js` con inputs de Nombre, Correo y Contraseña.
- **Sesión 2 - Estilos con Bootstrap:** Bootstrap 5 instalado e importado en `index.js`. Se aplican clases `container`, `form-control`, `btn`, `form-label`, `alert`, etc. El formulario es responsivo.
- **Sesión 3 - Validaciones dinámicas:** `useState` controla los inputs y un objeto de errores derivado se calcula en cada render. Los mensajes de error aparecen en tiempo real bajo cada campo.

## Notas

El proyecto se generó con la estructura estándar de `create-react-app` (`react-scripts`). Si prefieres usar `npx create-react-app formulario-react` desde cero, puedes hacerlo y luego copiar el contenido de `src/App.js` y `src/index.css`.
