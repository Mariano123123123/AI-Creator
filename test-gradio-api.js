// Script para probar la conexión con la API de Stable Diffusion WebUI
// Ejecutar con: node test-gradio-api.js

// Importamos fetch para hacer peticiones HTTP
const fetch = require('node-fetch');

// URL base de la API de Stable Diffusion WebUI
const SD_BASE_URL = 'https://6347134411d59eb777.gradio.live';

// Posibles endpoints a probar
const endpoints = [
  '/sdapi/v1/txt2img',         // API estándar de AUTOMATIC1111
  '/api/predict',              // API de Gradio
  '/run/predict',              // Otro posible endpoint de Gradio
  '/queue/join',               // Endpoint para unirse a la cola de Gradio
  '/api/queue/join',           // Variante del endpoint de cola
  '/run/txt2img',              // Posible endpoint para txt2img
  '/api/txt2img',              // Variante para txt2img
  '/api/v1/generate',          // Posible endpoint de generación
  '/api/v1/txt2img',           // Variante de txt2img
  '/api/v1/predict',           // Variante de predict
  '/api/v1/queue/join'         // Variante de queue/join
];

// Función para probar la conexión con diferentes endpoints
async function testSDConnection() {
  console.log('=== PRUEBA DE CONEXIÓN CON STABLE DIFFUSION WEBUI ===');
  console.log(`URL base: ${SD_BASE_URL}`);
  
  // Primero verificamos si el servidor está activo
  try {
    console.log('\nVerificando si el servidor está activo...');
    const response = await fetch(SD_BASE_URL);
    console.log(`Estado del servidor: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      console.log('✅ El servidor está activo y responde correctamente.');
      
      // Intentamos obtener información sobre la interfaz
      try {
        const htmlResponse = await response.text();
        const gradioMatch = htmlResponse.match(/gradio_config\s*=\s*(\{.*?\});/s);
        
        if (gradioMatch && gradioMatch[1]) {
          console.log('\nSe encontró configuración de Gradio en la página:');
          try {
            // Intentamos extraer y parsear la configuración de Gradio
            const configText = gradioMatch[1].replace(/\\'/g, "'");
            const config = JSON.parse(configText);
            
            if (config.api_endpoints) {
              console.log('Endpoints API encontrados:');
              console.log(config.api_endpoints);
              
              // Añadimos los endpoints encontrados a nuestra lista
              for (const endpoint of config.api_endpoints) {
                if (!endpoints.includes(endpoint)) {
                  endpoints.push(endpoint);
                }
              }
            }
            
            if (config.components) {
              console.log(`\nComponentes encontrados: ${config.components.length}`);
              // Buscamos componentes de tipo txt2img
              const txt2imgComponents = config.components.filter(c => 
                c.type === 'txt2img' || 
                c.id === 'txt2img' || 
                (c.props && c.props.elem_id === 'txt2img')
              );
              
              if (txt2imgComponents.length > 0) {
                console.log('Componentes txt2img encontrados:');
                console.log(txt2imgComponents.map(c => c.id || c.type));
              }
            }
          } catch (e) {
            console.log('Error al parsear la configuración:', e.message);
          }
        } else {
          console.log('No se encontró configuración de Gradio en la página.');
        }
      } catch (e) {
        console.log('Error al analizar la página HTML:', e.message);
      }
    } else {
      console.log('❌ El servidor no responde correctamente.');
      return;
    }
  } catch (error) {
    console.error('❌ Error al conectar con el servidor:');
    console.error(error);
    return;
  }
  
  // Ahora probamos cada endpoint
  for (const endpoint of endpoints) {
    console.log(`\n=== Probando endpoint: ${endpoint} ===`);
    
    try {
      let testData;
      
      // Preparamos los datos según el endpoint
      if (endpoint.includes('sdapi/v1/txt2img')) {
        // Datos para la API estándar de AUTOMATIC1111
        testData = {
          prompt: "un gato astronauta en el espacio, alta calidad, detallado",
          negative_prompt: "deformed, distorted, disfigured, poorly drawn, bad anatomy",
          steps: 20,
          cfg_scale: 7.5,
          width: 512,
          height: 512,
          sampler_name: "Euler a",
          seed: -1
        };
      } else if (endpoint.includes('queue/join')) {
        // Datos para unirse a la cola
        testData = {
          fn_index: 0,
          data: [
            "un gato astronauta en el espacio, alta calidad, detallado",
            "deformed, distorted, disfigured, poorly drawn, bad anatomy",
            1,
            7.5,
            20,
            -1,
            512,
            512
          ],
          session_hash: "xyz" + Date.now()
        };
      } else {
        // Datos para la API de Gradio
        testData = {
          data: [
            "un gato astronauta en el espacio, alta calidad, detallado", // prompt
            "deformed, distorted, disfigured, poorly drawn, bad anatomy", // negative_prompt
            1, // num_images
            7.5, // guidance_scale
            20, // num_steps
            -1, // seed
            512, // width
            512 // height
          ]
        };
      }
      
      console.log('Enviando petición de prueba...');
      console.log('Datos enviados:', JSON.stringify(testData, null, 2));
      
      const startTime = Date.now();
      
      const response = await fetch(`${SD_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });
      
      const endTime = Date.now();
      const timeElapsed = (endTime - startTime) / 1000;
      
      console.log(`Tiempo de respuesta: ${timeElapsed.toFixed(2)} segundos`);
      console.log(`Estado de la respuesta: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Petición exitosa. Respuesta recibida (resumida):');
        
        // Mostramos un resumen de la respuesta para no saturar la consola
        if (endpoint.includes('sdapi/v1/txt2img') && data.images) {
          console.log(`Imágenes generadas: ${data.images.length}`);
          console.log('Primera imagen (base64 truncado):', data.images[0].substring(0, 50) + '...');
        } else if (endpoint.includes('queue/join') && data.hash) {
          console.log('Hash de la cola:', data.hash);
          console.log('Posición en la cola:', data.queue_position);
        } else {
          const dataStr = JSON.stringify(data, null, 2);
          console.log(dataStr.length > 500 ? dataStr.substring(0, 500) + '...' : dataStr);
        }
        
        console.log('\n✅ Endpoint funcional: ' + endpoint);
        return endpoint; // Devolvemos el primer endpoint que funciona
      } else {
        console.log(`❌ Error en la petición: ${response.status} ${response.statusText}`);
        try {
          const errorText = await response.text();
          console.log(`Detalles del error: ${errorText.substring(0, 200)}...`);
        } catch (e) {
          console.log('No se pudo obtener el texto del error');
        }
      }
    } catch (error) {
      console.error(`❌ Error al conectar con el endpoint ${endpoint}:`);
      console.error(error.message);
    }
  }
  
  console.log('\n❌ Ningún endpoint funcionó correctamente.');
  return null;
}

// Ejecutar la prueba
console.log('Iniciando prueba de conexión...');
testSDConnection()
  .then((workingEndpoint) => {
    if (workingEndpoint) {
      console.log(`\n=== PRUEBA COMPLETADA CON ÉXITO ===`);
      console.log(`Endpoint funcional encontrado: ${workingEndpoint}`);
      console.log(`URL completa: ${SD_BASE_URL}${workingEndpoint}`);
    } else {
      console.log('\n=== PRUEBA COMPLETADA SIN ÉXITO ===');
      console.log('No se encontró ningún endpoint funcional.');
      console.log('Posibles razones:');
      console.log('1. La API no está habilitada en el servidor de Stable Diffusion WebUI.');
      console.log('2. Se requiere autenticación para acceder a la API.');
      console.log('3. Los formatos de datos enviados no son correctos para esta instancia.');
      console.log('\nSugerencia: Intenta iniciar Stable Diffusion WebUI con los parámetros:');
      console.log('python launch.py --share --api');
    }
  })
  .catch((error) => {
    console.error('\n=== ERROR EN LA PRUEBA ===');
    console.error(error);
  }); 