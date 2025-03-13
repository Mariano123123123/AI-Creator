"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Loader2, Save, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export function CharacterCreator() {
  const [isLoading, setIsLoading] = useState(false)
  const [characterImage, setCharacterImage] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Character saved successfully",
        description: "Your character is now ready to use in chat",
      })
    } catch (error) {
      toast({
        title: "Failed to save character",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateAvatar = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Set placeholder image
      setCharacterImage("/placeholder.svg?height=400&width=400")

      toast({
        title: "Avatar generated",
        description: "You can regenerate if you're not satisfied",
      })
    } catch (error) {
      toast({
        title: "Failed to generate avatar",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="personality">Personality</TabsTrigger>
          <TabsTrigger value="voice">Voice & Speech</TabsTrigger>
        </TabsList>

        <div className="grid md:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <TabsContent value="appearance" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Character Name</Label>
                    <Input id="name" placeholder="Enter character name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="25" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Physical Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select height" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short</SelectItem>
                        <SelectItem value="average">Average</SelectItem>
                        <SelectItem value="tall">Tall</SelectItem>
                        <SelectItem value="very-tall">Very Tall</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="build">Build</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select build" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slim">Slim</SelectItem>
                        <SelectItem value="athletic">Athletic</SelectItem>
                        <SelectItem value="average">Average</SelectItem>
                        <SelectItem value="muscular">Muscular</SelectItem>
                        <SelectItem value="heavy">Heavy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hair">Hair</Label>
                    <Input id="hair" placeholder="Describe hair color and style" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eyes">Eyes</Label>
                    <Input id="eyes" placeholder="Describe eye color" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clothing">Clothing Style</Label>
                    <Textarea id="clothing" placeholder="Describe typical clothing and style" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="personality" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Character Traits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Introvert</Label>
                      <Label>Extrovert</Label>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Analytical</Label>
                      <Label>Creative</Label>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Cautious</Label>
                      <Label>Adventurous</Label>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Serious</Label>
                      <Label>Playful</Label>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Background & Interests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="background">Background Story</Label>
                    <Textarea
                      id="background"
                      placeholder="Describe your character's background, history, and life experiences"
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">Interests & Hobbies</Label>
                    <Textarea
                      id="interests"
                      placeholder="What does your character enjoy doing?"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="knowledge">Knowledge & Expertise</Label>
                    <Textarea
                      id="knowledge"
                      placeholder="What subjects does your character know a lot about?"
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="voice" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Voice Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="voice-type">Voice Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select voice type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feminine-soft">Feminine (Soft)</SelectItem>
                        <SelectItem value="feminine-strong">Feminine (Strong)</SelectItem>
                        <SelectItem value="masculine-soft">Masculine (Soft)</SelectItem>
                        <SelectItem value="masculine-strong">Masculine (Strong)</SelectItem>
                        <SelectItem value="androgynous">Androgynous</SelectItem>
                        <SelectItem value="robotic">Robotic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Pitch</Label>
                      <span className="text-sm text-muted-foreground">Medium</span>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Speed</Label>
                      <span className="text-sm text-muted-foreground">Medium</span>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Speech Patterns</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="speech-style">Speech Style</Label>
                    <Textarea
                      id="speech-style"
                      placeholder="Describe how your character speaks (formal, casual, uses specific phrases, etc.)"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accent">Accent or Dialect</Label>
                    <Input id="accent" placeholder="Describe any accent or dialect" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="catchphrases">Catchphrases</Label>
                    <Textarea
                      id="catchphrases"
                      placeholder="Any phrases or expressions your character commonly uses"
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Character Avatar</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="w-full aspect-square bg-muted rounded-md overflow-hidden mb-4 relative">
                  {characterImage ? (
                    <Image
                      src={characterImage || "/placeholder.svg"}
                      alt="Character avatar"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No image yet
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button variant="outline" onClick={handleGenerateAvatar} disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generate"}
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Character
                </>
              )}
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

