"use client"

import { useState } from "react"
import { Upload, Shield, X, UserCheck, AlertTriangle, FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import type { PatientContext } from "../types/medical"

interface PatientContextProps {
  context: PatientContext | null
  onContextChange: (context: PatientContext | null) => void
}

export function PatientContextUpload({ context, onContextChange }: PatientContextProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempContext, setTempContext] = useState<PatientContext>(
    context || {
      age: "",
      gender: "",
      conditions: [],
      medications: [],
      allergies: [],
      isAnonymized: true,
    }
  )
  const [newCondition, setNewCondition] = useState("")
  const [newMedication, setNewMedication] = useState("")
  const [newAllergy, setNewAllergy] = useState("")

  const handleSave = () => {
    if (tempContext.isAnonymized) {
      onContextChange(tempContext)
      setIsOpen(false)
    }
  }

  const handleClear = () => {
    onContextChange(null)
    setTempContext({
      age: "",
      gender: "",
      conditions: [],
      medications: [],
      allergies: [],
      isAnonymized: true,
    })
    setIsOpen(false)
  }

  const addCondition = () => {
    if (newCondition.trim()) {
      setTempContext({
        ...tempContext,
        conditions: [...(tempContext.conditions || []), newCondition.trim()]
      })
      setNewCondition("")
    }
  }

  const removeCondition = (index: number) => {
    setTempContext({
      ...tempContext,
      conditions: tempContext.conditions?.filter((_, i) => i !== index) || []
    })
  }

  const addMedication = () => {
    if (newMedication.trim()) {
      setTempContext({
        ...tempContext,
        medications: [...(tempContext.medications || []), newMedication.trim()]
      })
      setNewMedication("")
    }
  }

  const removeMedication = (index: number) => {
    setTempContext({
      ...tempContext,
      medications: tempContext.medications?.filter((_, i) => i !== index) || []
    })
  }

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setTempContext({
        ...tempContext,
        allergies: [...(tempContext.allergies || []), newAllergy.trim()]
      })
      setNewAllergy("")
    }
  }

  const removeAllergy = (index: number) => {
    setTempContext({
      ...tempContext,
      allergies: tempContext.allergies?.filter((_, i) => i !== index) || []
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`text-gray-600 hover:bg-gray-100 ${context ? 'bg-blue-50 text-blue-700' : ''}`}
        >
          <Upload className="w-4 h-4 mr-2" />
          Patient Context
          {context && (
            <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
              Active
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
            Anonymous Patient Context
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Add anonymized patient information to get more relevant research recommendations
          </p>
        </DialogHeader>

        {/* HIPAA Compliance Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-green-900 mb-1">HIPAA/PIPEDA Compliant</h4>
              <p className="text-green-800 text-sm leading-relaxed">
                This system does not store patient identifiers. All data is processed anonymously and 
                used only to improve research relevance. Data is automatically purged after session ends.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Demographics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age-range">Age Range</Label>
              <Select 
                value={tempContext.age} 
                onValueChange={(value) => setTempContext({ ...tempContext, age: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-30">18-30 years</SelectItem>
                  <SelectItem value="31-45">31-45 years</SelectItem>
                  <SelectItem value="46-60">46-60 years</SelectItem>
                  <SelectItem value="61-75">61-75 years</SelectItem>
                  <SelectItem value="75+">75+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={tempContext.gender} 
                onValueChange={(value) => setTempContext({ ...tempContext, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="not-specified">Not specified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Medical Conditions */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Medical Conditions</Label>
            <div className="flex space-x-2">
              <Input
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                placeholder="e.g., Type 2 Diabetes, Hypertension"
                onKeyPress={(e) => e.key === "Enter" && addCondition()}
              />
              <Button 
                type="button" 
                onClick={addCondition}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {tempContext.conditions && tempContext.conditions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tempContext.conditions.map((condition, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-blue-50 text-blue-800 border-blue-200"
                  >
                    {condition}
                    <button
                      type="button"
                      onClick={() => removeCondition(index)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Current Medications */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Current Medications</Label>
            <div className="flex space-x-2">
              <Input
                value={newMedication}
                onChange={(e) => setNewMedication(e.target.value)}
                placeholder="e.g., Metformin, Lisinopril"
                onKeyPress={(e) => e.key === "Enter" && addMedication()}
              />
              <Button 
                type="button" 
                onClick={addMedication}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {tempContext.medications && tempContext.medications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tempContext.medications.map((medication, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-purple-50 text-purple-800 border-purple-200"
                  >
                    {medication}
                    <button
                      type="button"
                      onClick={() => removeMedication(index)}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Allergies */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Known Allergies</Label>
            <div className="flex space-x-2">
              <Input
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                placeholder="e.g., Penicillin, Sulfa drugs"
                onKeyPress={(e) => e.key === "Enter" && addAllergy()}
              />
              <Button 
                type="button" 
                onClick={addAllergy}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {tempContext.allergies && tempContext.allergies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tempContext.allergies.map((allergy, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-red-50 text-red-800 border-red-200"
                  >
                    {allergy}
                    <button
                      type="button"
                      onClick={() => removeAllergy(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Anonymization Confirmation */}
          <div className="border-t pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymized"
                checked={tempContext.isAnonymized}
                onCheckedChange={(checked) =>
                  setTempContext({ ...tempContext, isAnonymized: !!checked })
                }
              />
              <Label htmlFor="anonymized" className="text-sm">
                I confirm this information contains no patient identifiers and is properly anonymized
              </Label>
            </div>
            {!tempContext.isAnonymized && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                  <p className="text-red-800 text-sm">
                    You must confirm anonymization before proceeding to maintain HIPAA compliance.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t">
          <Button variant="ghost" onClick={handleClear} className="text-red-600 hover:bg-red-50">
            Clear All
          </Button>
          <div className="flex space-x-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!tempContext.isAnonymized}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Context
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}