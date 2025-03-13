import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Image, MessageSquare, User, Sparkles, Zap, Wand2 } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Creator Platform | Generate Images, Characters & Chat with AI",
  description:
    "Create stunning AI-generated images, design unique characters, and chat with advanced AI models. Try our powerful creative tools today.",
  openGraph: {
    title: "AI Creator Platform | Generate Images, Characters & Chat with AI",
    description:
      "Create stunning AI-generated images, design unique characters, and chat with advanced AI models. Try our powerful creative tools today.",
  },
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="hero-section py-20 md:py-32" aria-labelledby="hero-heading">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1
                id="hero-heading"
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
              >
                <span className="gradient-text">AI Creator Platform</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Create stunning images, design unique characters, and chat with AI models
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild size="lg" className="animate-pulse-glow">
                <Link href="/generate-images">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/chat">
                  Try AI Chat <MessageSquare className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-muted/30" aria-labelledby="features-heading">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
            <h2 id="features-heading" className="text-3xl font-bold tracking-tighter md:text-4xl">
              Everything You Need to Create with AI
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Our platform provides powerful tools to unleash your creativity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="feature-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Image className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold">Image Generation</h3>
                <p className="text-muted-foreground mt-2">
                  Create stunning AI-generated images with simple text prompts. Perfect for creative projects, marketing
                  materials, or inspiration.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/generate-images">
                    Try Now <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="feature-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold">Character Creation</h3>
                <p className="text-muted-foreground mt-2">
                  Design and customize unique AI characters with personalities, appearances, and behaviors. Use them in
                  your projects or chat.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/create-characters">
                    Try Now <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="feature-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold">AI Chat</h3>
                <p className="text-muted-foreground mt-2">
                  Engage in conversations with our AI models or your custom-created characters. Perfect for storytelling
                  or creative exploration.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/chat">
                    Try Now <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24" aria-labelledby="why-us-heading">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
                Why Choose Us
              </div>
              <div className="space-y-2">
                <h2 id="why-us-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Advanced AI Technology at Your Fingertips
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Our platform leverages cutting-edge AI models to deliver exceptional results
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Sparkles className="mt-1 h-6 w-6 text-primary flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold">State-of-the-art Models</h3>
                    <p className="text-muted-foreground">
                      Access the latest AI technology without any technical expertise required
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Zap className="mt-1 h-6 w-6 text-primary flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold">Lightning Fast Results</h3>
                    <p className="text-muted-foreground">Generate images and responses in seconds, not minutes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Wand2 className="mt-1 h-6 w-6 text-primary flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold">Endless Creativity</h3>
                    <p className="text-muted-foreground">No limits to what you can create with our powerful AI tools</p>
                  </div>
                </div>
              </div>
              <div>
                <Button asChild size="lg" className="mt-4">
                  <Link href="/generate-images">
                    Start Creating Now <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square overflow-hidden rounded-xl animate-float">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl"
                  aria-hidden="true"
                />
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="Example of AI generated art showcasing the platform's capabilities"
                  className="object-cover w-full h-full rounded-xl"
                  width={500}
                  height={500}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-muted/30" aria-labelledby="cta-heading">
        <div className="container px-4 md:px-6 text-center">
          <h2 id="cta-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Ready to Get Started?
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mb-8">
            Join thousands of creators using our platform to bring their ideas to life
          </p>
          <Button asChild size="lg" className="animate-pulse-glow">
            <Link href="/login">
              Create Your Account <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

