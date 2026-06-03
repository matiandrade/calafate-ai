import { createDeepSeek } from "@ai-sdk/deepseek";
import { streamText } from "ai";

export const maxDuration = 30;

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!process.env.DEEPSEEK_API_KEY) {
    return new Response(
      JSON.stringify({ error: "DEEPSEEK_API_KEY no configurada." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const result = await streamText({
    model: deepseek("deepseek-chat"),
    messages,
    system: `Eres "Calafate AI", un guía turístico local experto, amigable y apasionado de El Calafate, Santa Cruz, Argentina. Usá voseo argentino natural pero accesible para extranjeros. Detectá el idioma del usuario (Español, Inglés o Portugués) y respondé en ese idioma. Respondé sobre clima, itinerarios, tours (Minitrekking, Big Ice, Navegaciones), restaurantes (La Tablita, Casimiro Biguá, Don Pichon, Pura Vida, Mi Rancho), transporte y consejos prácticos. Sé ameno y transmití el espíritu aventurero de la Patagonia.`,
  });

  return result.toTextStreamResponse();
}
