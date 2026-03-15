# Configurar Imagen de Fondo del Hero

Para cambiar la imagen de fondo de la página principal:

## Opción 1: Usando una imagen del proyecto

1. Coloca tu imagen en la carpeta `public/Banners/`
2. Abre el archivo `src/components/HomePage/HomePage.js`
3. Busca la línea:
   ```javascript
   heroBackgroundImage: '/Banners/banner2.avif',
   ```
4. Cambia la ruta por la de tu imagen:
   ```javascript
   heroBackgroundImage: '/Banners/tu-imagen.jpg',
   ```

## Opción 2: Usando una URL externa

Puedes usar una imagen desde internet:
```javascript
heroBackgroundImage: 'https://ejemplo.com/imagen.jpg',
```

## Personalizar el Texto del Hero

En el mismo archivo `HomePage.vue`, busca:
```html
<h1 class="hero-main-title">Amor desde<br>el <span class="highlight">primer latido.</span></h1>
<p class="hero-main-subtitle">Cuidamos de tu salud y la de tu familia con los mejores especialistas</p>
```

Cambia el texto según tus necesidades.

## Ajustar la Altura

En `src/components/HomePage/HomePage.css`, busca:
```css
.hero-main {
  height: 500px;
}
```

Cambia `500px` por la altura que prefieras (ejemplo: `600px`, `400px`, etc.)
