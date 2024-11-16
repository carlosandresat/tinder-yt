'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface FormData {
  description: string;
  profilePicture: File | null;
  profilePicturePreview: string | null;
  yesNoQuestion: string;
  programmingLanguages: string[];
  scaleQuestion: number;
}

export function ProfileForm() {
  const [formData, setFormData] = useState<FormData>({
    description: '',
    profilePicture: null,
    profilePicturePreview: null,
    yesNoQuestion: '',
    programmingLanguages: [],
    scaleQuestion: 5,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFormData(prev => ({
        ...prev,
        profilePicture: file,
        profilePicturePreview: URL.createObjectURL(file)
      }))
    }
  }

  const handleToggleChange = (value: string[]) => {
    setFormData(prev => ({ ...prev, programmingLanguages: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to a server
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Crea tu perfil</CardTitle>
        <CardDescription>Responde las siguientes preguntas cuidadosamente y con sinceridad para encontrar a tu match más compatible 💯</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="profilePicture">Foto de Perfil</Label>
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                {formData.profilePicturePreview ? (
                  <AvatarImage src={formData.profilePicturePreview} alt="Profile picture preview" />
                ) : (
                  <AvatarFallback>Foto</AvatarFallback>
                )}
              </Avatar>
              <Input
                id="profilePicture"
                name="profilePicture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Tell us about yourself"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          

          <div className="space-y-2">
            <fieldset>
              <legend className="text-sm font-medium">Do you enjoy coding?</legend>
              <RadioGroup
                name="yesNoQuestion"
                value={formData.yesNoQuestion}
                onValueChange={(value) => setFormData(prev => ({ ...prev, yesNoQuestion: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No</Label>
                </div>
              </RadioGroup>
            </fieldset>
          </div>

          <div className="space-y-2">
            <Label htmlFor="programmingLanguages">What programming languages do you know?</Label>
            <ToggleGroup
              type="multiple"
              value={formData.programmingLanguages}
              onValueChange={handleToggleChange}
              className="flex flex-wrap gap-2"
              variant="outline"
            >
              <ToggleGroupItem value="javascript" aria-label="Toggle JavaScript">
                JavaScript
              </ToggleGroupItem>
              <ToggleGroupItem value="python" aria-label="Toggle Python">
                Python
              </ToggleGroupItem>
              <ToggleGroupItem value="java" aria-label="Toggle Java">
                Java
              </ToggleGroupItem>
              <ToggleGroupItem value="csharp" aria-label="Toggle C#">
                C#
              </ToggleGroupItem>
              <ToggleGroupItem value="ruby" aria-label="Toggle Ruby">
                Ruby
              </ToggleGroupItem>
              <ToggleGroupItem value="go" aria-label="Toggle Go">
                Go
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scaleQuestion">How would you rate your coding skills? (0-10)</Label>
            <Slider
              id="scaleQuestion"
              min={0}
              max={10}
              step={1}
              value={[formData.scaleQuestion]}
              onValueChange={(value) => setFormData(prev => ({ ...prev, scaleQuestion: value[0] }))}
            />
            <div className="text-center" aria-live="polite">
              {formData.scaleQuestion}
            </div>
          </div>

          <Button type="submit" className="w-full">Ingresar Respuestas</Button>
        </form>
      </CardContent>
    </Card>
  )
}