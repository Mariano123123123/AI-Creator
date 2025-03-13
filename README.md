# Generador de Imágenes con Stable Diffusion

Este proyecto es un generador de imágenes que utiliza Stable Diffusion WebUI para crear imágenes a partir de descripciones textuales (prompts).

## Características

- Interfaz de usuario moderna y fácil de usar
- Integración directa con Stable Diffusion WebUI mediante iframe
- Consejos para escribir mejores prompts
- Soporte para visualizar la interfaz de Stable Diffusion dentro de la aplicación

## Cambios Implementados

- Integración de la interfaz de Stable Diffusion WebUI directamente en la aplicación
- Creación de un sistema de pestañas para alternar entre el prompt y la interfaz web
- Implementación de un script de prueba para verificar la conexión con la API
- Mejora del manejo de errores y la experiencia del usuario

## Requisitos

- Node.js 18 o superior
- Una instancia de Stable Diffusion WebUI accesible

## Instalación

1. Clona este repositorio:
```bash
git clone <url-del-repositorio>
cd ImageGenerator
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Uso

### Generación de imágenes

1. Navega a la sección "Generar Imágenes" en la aplicación.
2. Escribe un prompt detallado describiendo la imagen que deseas crear.
3. Haz clic en "Ir a Stable Diffusion WebUI" para ser redirigido a la interfaz de Stable Diffusion.
4. Alternativamente, puedes usar directamente la pestaña "Stable Diffusion WebUI" para acceder a todas las funciones de la interfaz original.

### Consejos para mejores prompts

- Separa diferentes elementos con comas: `retrato de una mujer, ojos azules, cabello rubio, fantasía, detallado`
- Incluye detalles de iluminación: `iluminación de atardecer, iluminación de estudio, sombras dramáticas`
- Especifica ajustes de cámara: `primer plano, gran angular, bokeh`
- Añade indicadores de calidad: `altamente detallado, enfoque nítido, 4K`

## Configuración de Stable Diffusion WebUI

Para habilitar la API de Stable Diffusion WebUI y permitir la generación de imágenes directamente desde la aplicación (sin usar el iframe), sigue estos pasos:

1. Inicia Stable Diffusion WebUI con el parámetro `--api`:
```bash
python launch.py --share --api
```

2. Actualiza la URL de Stable Diffusion en el archivo `components/image-generator.tsx` con la URL de tu instancia.

## Solución de problemas

### La API de Stable Diffusion no responde

Si la API de Stable Diffusion no responde, asegúrate de que:

1. La instancia de Stable Diffusion WebUI esté en ejecución y sea accesible.
2. Hayas iniciado Stable Diffusion WebUI con el parámetro `--api`.
3. La URL en el archivo `components/image-generator.tsx` sea correcta.

### Error al generar imágenes

Si encuentras errores al generar imágenes:

1. Verifica que la instancia de Stable Diffusion WebUI esté funcionando correctamente.
2. Intenta usar directamente la interfaz web a través de la pestaña "Stable Diffusion WebUI".
3. Revisa los logs del servidor para obtener más información sobre el error.

## Licencia

Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo LICENSE para más detalles. 