import { ImageGenerator } from "@/components/image-generator"

export default function GenerateImagesPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold">AI Image Generator</h1>
          <p className="text-muted-foreground">Create ultra-realistic images with artificial intelligence</p>
        </div>

        <ImageGenerator />
      </div>
    </div>
  )
}

