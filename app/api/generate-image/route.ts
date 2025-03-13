import { NextResponse } from 'next/server';

// URL base de Stable Diffusion WebUI
const SD_BASE_URL = 'https://6347134411d59eb777.gradio.live';

// Parámetros por defecto para la generación de imágenes
const defaultNegativePrompt = "deformed, distorted, disfigured, poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, disconnected limbs, mutation, mutated, ugly, disgusting, amputation";
const defaultSteps = 20;
const defaultCfgScale = 7.5;
const defaultSampler = "Euler a";
const defaultSeed = -1;
const defaultWidth = 512;
const defaultHeight = 512;

export async function POST(req: Request) {
  try {
    // Extraer el prompt del cuerpo de la solicitud
    const body = await req.json();
    const { prompt } = body;

    console.log("Prompt recibido:", prompt);

    if (!prompt) {
      return NextResponse.json(
        { error: "Se requiere un prompt para generar la imagen" },
        { status: 400 }
      );
    }

    // Generar un ID de sesión único
    const sessionHash = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Preparar los datos para la API de Gradio
    const gradioData = {
      fn_index: 13, // Este es el índice de la función txt2img en Stable Diffusion WebUI
      data: [
        prompt, // prompt
        defaultNegativePrompt, // negative_prompt
        "None", // Estilo (None para usar el predeterminado)
        defaultSteps, // Pasos de generación
        defaultSampler, // Sampler
        defaultCfgScale, // CFG Scale
        defaultSeed, // Seed (-1 para aleatorio)
        1, // Batch count
        1, // Batch size
        defaultWidth, // Width
        defaultHeight, // Height
        false, // Restore faces
        false, // Tiling
        false, // Hires fix
        0, // Denoising strength
        0, // Hires steps
        0, // Hires upscaler
        defaultWidth, // Hires width
        defaultHeight, // Hires height
        "", // Refiner checkpoint
        0, // Refiner switch at
        false, // Enable controlnet
        [], // Controlnet params
        "", // Script
        {}, // Script args
      ],
      session_hash: sessionHash,
    };

    console.log("Intentando generar imagen con Gradio...");

    try {
      // Primero intentamos unir a la cola
      console.log("Uniéndose a la cola de Gradio...");
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
      
      if (!queueResponse.ok) {
        console.log(`Error al unirse a la cola: ${queueResponse.status} ${queueResponse.statusText}`);
        throw new Error(`Error al unirse a la cola: ${queueResponse.statusText}`);
      }
      
      const queueData = await queueResponse.json();
      console.log("Respuesta de la cola:", queueData);
      
      // Ahora enviamos el prompt para generar la imagen
      console.log("Enviando solicitud a Gradio para generar imagen...");
      const response = await fetch(`${SD_BASE_URL}/run/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gradioData),
      });
      
      console.log("Estado de la respuesta:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error de la API de Gradio:", errorText);
        throw new Error(`Error al generar la imagen: ${response.statusText}`);
      }
      
      // Procesar la respuesta
      const data = await response.json();
      console.log("Respuesta de Gradio recibida");
      
      // Extraer la URL de la imagen de la respuesta
      if (data && data.data && data.data[0] && data.data[0][0]) {
        const imageUrl = data.data[0][0];
        console.log("Imagen generada correctamente");
        
        return NextResponse.json({ imageUrl });
      } else {
        console.error("Formato de respuesta inesperado:", data);
        throw new Error("No se pudo extraer la URL de la imagen de la respuesta");
      }
    } catch (gradioError: any) {
      console.error("Error con la API de Gradio:", gradioError);
      
      // Si falla Gradio, intentamos con la API alternativa
      console.log("Intentando con API alternativa...");
      
      // Intentar con la API estándar de Gradio como fallback
      const fallbackData = {
        data: [
          prompt, // prompt
          defaultNegativePrompt, // negative_prompt
          1, // num_images
          defaultCfgScale, // guidance_scale
          defaultSteps, // num_steps
          defaultSeed, // seed
          defaultWidth, // width
          defaultHeight // height
        ]
      };
      
      const fallbackResponse = await fetch(`${SD_BASE_URL}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fallbackData),
      });
      
      if (!fallbackResponse.ok) {
        const errorText = await fallbackResponse.text();
        console.error("Error de la API alternativa:", errorText);
        return NextResponse.json(
          { error: `No se pudo generar la imagen: ${gradioError.message}` },
          { status: 500 }
        );
      }
      
      const fallbackData2 = await fallbackResponse.json();
      
      if (fallbackData2 && fallbackData2.data && fallbackData2.data[0] && fallbackData2.data[0][0]) {
        const imageUrl = fallbackData2.data[0][0];
        console.log("Imagen generada correctamente con API alternativa");
        
        return NextResponse.json({ imageUrl });
      } else {
        return NextResponse.json(
          { error: "No se pudo generar la imagen con ninguna de las APIs disponibles" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error al generar la imagen:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud de generación de imagen" },
      { status: 500 }
    );
  }
} 