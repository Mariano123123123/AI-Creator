import { CharacterCreator } from "@/components/character-creator"

export default function CreateCharactersPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold">Character Creator</h1>
          <p className="text-muted-foreground">Design and customize unique AI characters and models</p>
        </div>

        <CharacterCreator />
      </div>
    </div>
  )
}

