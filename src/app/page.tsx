"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Compass,
  Send,
  Sparkles,
  MapPin,
  Calendar,
  CloudSnow,
  Utensils,
  Bus,
  Volume2,
  Globe,
  Loader2,
  HelpCircle,
} from "lucide-react";

const WELCOME_TEXT = `👋 **¡Hola, viajero! Bienvenido a El Calafate.** 

Soy tu guía turístico inteligente. Estoy aquí para ayudarte a planificar una experiencia inolvidable en la cuna de los glaciares más imponentes del mundo.

Te puedo guiar sobre:
* ❄️ **Excursiones:** Minitrekking, Big Ice o navegaciones.
* 🗺️ **Itinerarios:** De 1, 3 o 5 días por la región.
* 🍽️ **Gastronomía:** Dónde comer el mejor cordero patagónico y platos típicos.
* 🚌 **Logística:** Traslados al aeropuerto, colectivos al glaciar y viajes a El Chaltén.
* 🌤️ **Clima y ropa:** Consejos prácticos para que el viento no te sorprenda.

*Detectaré automáticamente si me hablas en **Español, Inglés o Portugués** y te responderé en tu idioma.* ¿Qué te gustaría descubrir hoy?`;

export default function Home() {
  const { messages, status, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: [
      {
        id: "welcome",
        role: "assistant" as const,
        parts: [{ type: "text" as const, text: WELCOME_TEXT }],
      },
    ],
  });

  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const quickPrompts = [
    {
      label: "Caminar sobre el glaciar",
      icon: <Sparkles className="w-4 h-4 text-sky-400" />,
      text: "¿Cuál es la diferencia entre el Minitrekking y el Big Ice, y cómo los reservo?",
    },
    {
      label: "Mejor Cordero Patagónico",
      icon: <Utensils className="w-4 h-4 text-sky-400" />,
      text: "¿Cuáles son los mejores restaurantes para probar el cordero patagónico al asador?",
    },
    {
      label: "Itinerario de 3 días",
      icon: <Calendar className="w-4 h-4 text-sky-400" />,
      text: "Recomiéndame un itinerario ideal de 3 días en El Calafate incluyendo El Chaltén.",
    },
    {
      label: "Cómo ir al glaciar",
      icon: <Bus className="w-4 h-4 text-sky-400" />,
      text: "¿Cómo puedo trasladarme desde el centro de El Calafate hasta las pasarelas del Glaciar Perito Moreno?",
    },
  ];

  const handleQuickPromptClick = (text: string) => {
    sendMessage({ text });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <main className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--color-secondary),_var(--color-background))] text-foreground flex flex-col overflow-x-hidden">
      {/* Background Decorative Glacier Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-10 pointer-events-none mix-blend-overlay" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/60 border-b border-border px-4 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-xl border border-primary/30 flex items-center justify-center">
              <Compass className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-sky-100 to-white bg-clip-text text-transparent">
                Calafate AI
              </h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                Guía Inteligente de la Patagonia
              </p>
            </div>
          </div>

          {/* Languages supported badge */}
          <div className="flex items-center gap-2 bg-secondary/80 border border-border px-3 py-1.5 rounded-full text-xs font-medium">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-muted-foreground">Soporte:</span>
            <span className="text-foreground font-semibold">ES • EN • PT</span>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left Side: Hero Brand Area & Quick Guides */}
        <div className="flex-1 flex flex-col justify-between py-4 lg:py-8 gap-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-400/20 rounded-full text-xs text-sky-300 font-medium">
              <MapPin className="w-3 h-3" /> El Calafate, Santa Cruz, Argentina
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-none">
              Explorá los <br />
              <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Glaciares Eternos
              </span>
            </h2>
            
            <p className="text-base text-muted-foreground max-w-md leading-relaxed">
              Descubrí la mística del Parque Nacional Los Glaciares. Conversá con nuestro guía local con IA y planificá tu Minitrekking, cenas de cordero patagónico o tu escapada a El Chaltén al instante.
            </p>
          </div>

          {/* Quick Access Grid */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-bold">
              <HelpCircle className="w-4 h-4 text-sky-500" /> Consultas populares de viajeros
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPromptClick(prompt.text)}
                  disabled={isLoading}
                  className="flex items-center gap-3 p-3 text-left rounded-xl bg-card/40 border border-border/80 hover:border-primary/50 hover:bg-secondary/40 transition-all duration-200 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="p-2 bg-secondary/80 rounded-lg group-hover:bg-primary/20 transition-colors">
                    {prompt.icon}
                  </div>
                  <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                    {prompt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Local Information Footer widgets */}
          <div className="border-t border-border/40 pt-6 grid grid-cols-3 gap-4 max-w-md">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Imperdible</p>
              <p className="text-xs font-semibold text-foreground">Perito Moreno</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Temporada Alta</p>
              <p className="text-xs font-semibold text-foreground">Octubre – Abril</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Aventura</p>
              <p className="text-xs font-semibold text-foreground">Caminata sobre Hielo</p>
            </div>
          </div>
        </div>

        {/* Right Side: Chatbot Central Terminal */}
        <div className="flex-1 lg:max-w-2xl w-full flex flex-col h-[60vh] lg:h-[78vh] rounded-2xl bg-card/40 border border-border backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          {/* Chat Terminal Header */}
          <div className="p-4 bg-secondary/30 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <p className="text-xs font-bold text-foreground">Anfitrión Patagónico Local</p>
                <p className="text-[10px] text-muted-foreground">Disponible online • Inteligente</p>
              </div>
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
            </div>
          </div>

          {/* Message History Scroller */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            style={{ scrollbarWidth: "thin" }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  (message.role as string) === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    (message.role as string) === "user"
                      ? "bg-primary text-primary-foreground font-medium shadow-md shadow-primary/10 rounded-tr-none"
                      : "bg-secondary/60 text-foreground border border-border/60 rounded-tl-none whitespace-pre-line"
                  }`}
                >
                  {message.parts?.map((part, i) =>
                    part.type === "text" ? (
                      <span key={i}>{part.text}</span>
                    ) : null
                  )}
                </div>
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary/60 border border-border/60 text-foreground rounded-2xl rounded-tl-none px-4 py-3 text-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
                  <span className="text-xs text-muted-foreground">Tu guía está escribiendo...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Console */}
          <div className="p-4 bg-secondary/10 border-t border-border">
            <form onSubmit={handleFormSubmit} className="flex gap-2 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribí tu consulta (ej. ¿Qué llevar para el Big Ice?)..."
                disabled={isLoading}
                className="flex-1 bg-secondary/80 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/80 focus:border-primary/80 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer flex items-center justify-center shadow-lg shadow-primary/15"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-center text-muted-foreground/60 mt-2.5">
              Calafate AI puede cometer errores. Considerá siempre reconfirmar reservas importantes directamente.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}
