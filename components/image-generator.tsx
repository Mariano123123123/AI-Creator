"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Loader2, Sparkles, Wand2, ChevronUp, AlertCircle, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("webui")
  const { toast } = useToast()

  // URL de Stable Diffusion WebUI compartida
  const stableDiffusionUrl = "https://6347134411d59eb777.gradio.live"

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Error",
        description: "Por favor, ingresa un prompt",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    
    try {
      // Cambiamos a la pestaña de WebUI
      setActiveTab("webui")
      
      toast({
        title: "Redirigiendo a Stable Diffusion WebUI",
        description: "Por favor, usa la interfaz web para generar tu imagen.",
      })
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al intentar generar la imagen. Por favor, usa la interfaz web directamente.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
          <TabsTrigger value="webui">Stable Diffusion WebUI</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prompt" className="space-y-4">
          <div className="grid gap-6">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Wand2 className="h-5 w-5 text-primary" aria-hidden="true" />
                      <label htmlFor="prompt" className="text-lg font-medium">
                        Describe tu imagen
                      </label>
                    </div>
                    <Textarea
                      id="prompt"
                      placeholder="Describe la imagen que quieres crear... Por ejemplo: Un gato astronauta explorando un planeta alienígena colorido"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[120px] text-base resize-y border-primary/20 focus-visible:ring-primary"
                      aria-describedby="prompt-tips"
                    />
                  </div>

                  <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-md border-primary/20">
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex w-full justify-between p-4"
                        aria-expanded={isOpen}
                        aria-controls="tips-content"
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                          <span className="font-medium">Consejos para mejores resultados</span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4" id="tips-content">
                      <ul className="space-y-2 text-sm text-muted-foreground" id="prompt-tips">
                        <li className="flex items-start gap-2">
                          <span className="text-primary" aria-hidden="true">
                            •
                          </span>
                          <span>
                            Separa diferentes elementos con comas:{" "}
                            <span className="italic text-primary">
                              retrato de una mujer, ojos azules, cabello rubio, fantasía, detallado
                            </span>
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary" aria-hidden="true">
                            •
                          </span>
                          <span>
                            Incluye detalles de iluminación:{" "}
                            <span className="italic text-primary">iluminación de atardecer, iluminación de estudio, sombras dramáticas</span>
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary" aria-hidden="true">
                            •
                          </span>
                          <span>
                            Especifica ajustes de cámara: <span className="italic text-primary">primer plano, gran angular, bokeh</span>
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary" aria-hidden="true">
                            •
                          </span>
                          <span>
                            Añade indicadores de calidad:{" "}
                            <span className="italic text-primary">altamente detallado, enfoque nítido, 4K</span>
                          </span>
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>

                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full relative overflow-hidden group"
                    size="lg"
                    aria-label={isGenerating ? "Generando imagen..." : "Generar imagen"}
                  >
                    <span
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity"
                      aria-hidden="true"
                    />
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                        <span>Redirigiendo...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-5 w-5" aria-hidden="true" />
                        <span>Ir a Stable Diffusion WebUI</span>
                      </>
                    )}
                  </Button>
                  
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-sm">
                    <p className="font-medium">Nota:</p>
                    <p>La API de Stable Diffusion no está disponible. Al hacer clic en el botón, serás redirigido a la interfaz web para generar tu imagen.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="webui" className="space-y-4">
          <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Stable Diffusion WebUI</h3>
                <a 
                  href={stableDiffusionUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-primary hover:underline"
                >
                  Abrir en nueva ventana
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
              <div className="relative w-full" style={{ height: "calc(100vh - 200px)", minHeight: "600px" }}>
                <iframe
                  src={stableDiffusionUrl}
                  className="w-full h-full border-0 rounded-md"
                  title="Stable Diffusion WebUI"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-sm">
                <p className="font-medium">Nota:</p>
                <p>Esta es una interfaz directa a Stable Diffusion WebUI. Puedes usar todas las funciones disponibles en la interfaz web original.</p>
                <p className="mt-2">Si quieres usar la API directamente, necesitas iniciar Stable Diffusion WebUI con el parámetro <code>--api</code>.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

