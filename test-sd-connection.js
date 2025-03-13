// Script para probar la conexión con la API de Stable Diffusion WebUI
// Ejecutar con: node test-sd-connection.js

// Importamos fetch para hacer peticiones HTTP
const fetch = require('node-fetch');

// URL base de la API de Stable Diffusion WebUI
const SD_BASE_URL = 'https://6347134411d59eb777.gradio.live';

// Función para probar la conexión
async function testSDConnection() {
  console.log('=== PRUEBA DE CONEXIÓN CON STABLE DIFFUSION WEBUI ===');
  console.log(`URL base: ${SD_BASE_URL}`);
  
  try {
    // Verificamos si el servidor está activo
    console.log('\nVerificando si el servidor está activo...');
    const response = await fetch(SD_BASE_URL);
    console.log(`Estado del servidor: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      console.log('✅ El servidor está activo y responde correctamente.');
      
      // Intentamos obtener la configuración de Gradio
      try {
        const htmlResponse = await response.text();
        console.log('Analizando la respuesta HTML para encontrar la configuración de Gradio...');
        
        const gradioMatch = htmlResponse.match(/gradio_config\s*=\s*(\{.*?\});/s);
        if (gradioMatch && gradioMatch[1]) {
          console.log('✅ Se encontró configuración de Gradio en la página.');
          
          try {
            // Intentamos extraer y parsear la configuración de Gradio
            const configText = gradioMatch[1].replace(/\\'/g, "'");
            const config = JSON.parse(configText);
            
            if (config.api_endpoints) {
              console.log('\nEndpoints API encontrados:');
              console.log(config.api_endpoints);
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
          console.log('❌ No se encontró configuración de Gradio en la página.');
        }
      } catch (e) {
        console.log('Error al analizar la página HTML:', e.message);
      }
      
      // Probamos diferentes endpoints
      console.log('\n=== PROBANDO ENDPOINTS ===');
      
      // 1. Probamos el endpoint de cola
      try {
        console.log('\nProbando endpoint de cola (/queue/join)...');
        const sessionHash = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        
        const queueResponse = await fetch(`${SD_BASE_URL}/queue/join`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fn_index: 13,
            session_hash: sessionHash,
          }),
        });
        
        console.log(`Estado: ${queueResponse.status} ${queueResponse.statusText}`);
        
        if (queueResponse.ok) {
          const queueData = await queueResponse.json();
          console.log('✅ Endpoint de cola funciona correctamente.');
          console.log('Respuesta:', JSON.stringify(queueData, null, 2));
          
          // 2. Probamos el endpoint de generación de imágenes
          console.log('\nProbando endpoint de generación (/run/predict)...');
          
          const gradioData = {
            fn_index: 13,
            data: [
              "un gato astronauta en el espacio, alta calidad, detallado", // prompt
              "deformed, distorted, disfigured, poorly drawn, bad anatomy", // negative_prompt
              "None", // Estilo
              20, // Pasos
              "Euler a", // Sampler
              7.5, // CFG Scale
              -1, // Seed
              1, // Batch count
              1, // Batch size
              512, // Width
              512, // Height
              false, // Restore faces
              false, // Tiling
              false, // Hires fix
              0, // Denoising strength
              0, // Hires steps
              0, // Hires upscaler
              512, // Hires width
              512, // Hires height
              "", // Refiner checkpoint
              0, // Refiner switch at
              false, // Enable controlnet
              [], // Controlnet params
              "", // Script
              {}, // Script args
            ],
            session_hash: sessionHash,
          };
          
          const predictResponse = await fetch(`${SD_BASE_URL}/run/predict`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(gradioData),
          });
          
          console.log(`Estado: ${predictResponse.status} ${predictResponse.statusText}`);
          
          if (predictResponse.ok) {
            const predictData = await predictResponse.json();
            console.log('✅ Endpoint de generación funciona correctamente.');
            
            if (predictData && predictData.data && predictData.data[0] && predictData.data[0][0]) {
              console.log('Imagen generada correctamente.');
              // La URL de la imagen puede ser muy larga, así que solo mostramos el principio
              const imageUrl = predictData.data[0][0];
              console.log('URL de la imagen (primeros 100 caracteres):', 
                typeof imageUrl === 'string' ? imageUrl.substring(0, 100) + '...' : 'No es una cadena');
            } else {
              console.log('❌ No se pudo extraer la URL de la imagen de la respuesta.');
              console.log('Estructura de la respuesta:', JSON.stringify(predictData, null, 2).substring(0, 500) + '...');
            }
          } else {
            console.log('❌ Error en el endpoint de generación.');
            try {
              const errorText = await predictResponse.text();
              console.log('Detalles del error:', errorText.substring(0, 200));
            } catch (e) {
              console.log('No se pudo obtener el texto del error');
            }
          }
        } else {
          console.log('❌ Error en el endpoint de cola.');
          try {
            const errorText = await queueResponse.text();
            console.log('Detalles del error:', errorText.substring(0, 200));
          } catch (e) {
            console.log('No se pudo obtener el texto del error');
          }
        }
      } catch (e) {
        console.log('Error al probar los endpoints:', e.message);
      }
      
      // 3. Probamos el endpoint alternativo
      try {
        console.log('\nProbando endpoint alternativo (/api/predict)...');
        
        const alternativeData = {
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
        
        const altResponse = await fetch(`${SD_BASE_URL}/api/predict`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(alternativeData),
        });
        
        console.log(`Estado: ${altResponse.status} ${altResponse.statusText}`);
        
        if (altResponse.ok) {
          const altData = await altResponse.json();
          console.log('✅ Endpoint alternativo funciona correctamente.');
          
          if (altData && altData.data && altData.data[0] && altData.data[0][0]) {
            console.log('Imagen generada correctamente con endpoint alternativo.');
            const imageUrl = altData.data[0][0];
            console.log('URL de la imagen (primeros 100 caracteres):', 
              typeof imageUrl === 'string' ? imageUrl.substring(0, 100) + '...' : 'No es una cadena');
          } else {
            console.log('❌ No se pudo extraer la URL de la imagen de la respuesta.');
            console.log('Estructura de la respuesta:', JSON.stringify(altData, null, 2).substring(0, 500) + '...');
          }
        } else {
          console.log('❌ Error en el endpoint alternativo.');
          try {
            const errorText = await altResponse.text();
            console.log('Detalles del error:', errorText.substring(0, 200));
          } catch (e) {
            console.log('No se pudo obtener el texto del error');
          }
        }
      } catch (e) {
        console.log('Error al probar el endpoint alternativo:', e.message);
      }
    } else {
      console.log('❌ El servidor no responde correctamente.');
    }
  } catch (error) {
    console.error('❌ Error al conectar con el servidor:');
    console.error(error);
  }
}

// Ejecutar la prueba
console.log('Iniciando prueba de conexión...');
testSDConnection()
  .then(() => {
    console.log('\n=== PRUEBA COMPLETADA ===');
  })
  .catch((error) => {
    console.error('\n=== ERROR EN LA PRUEBA ===');
    console.error(error);
  }); 