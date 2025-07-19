"use client"

import { useState } from "react"
import { User, Settings, Bell, Shield, Save, Edit, Stethoscope, Building, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import type { PhysicianProfile, FilterOptions, NotificationSettings } from "../types/medical"

interface PhysicianProfileProps {
  profile: PhysicianProfile
  onProfileUpdate: (profile: PhysicianProfile) => void
}

const specialties = [
  "General Practitioner",
  "Cardiologist",
  "Oncologist", 
  "Endocrinologist",
  "Neurologist",
  "Psychiatrist",
  "Dermatologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Rheumatologist",
  "Emergency Medicine",
  "Internal Medicine",
  "Family Medicine",
  "Pediatrics",
  "Geriatrics",
  "Infectious Diseases",
  "Nephrology",
  "Urology",
  "Orthopedics",
  "Anesthesiology"
]

const dataSources = [
  "PubMed/MEDLINE",
  "Cochrane Library", 
  "ClinicalTrials.gov",
  "Embase",
  "NICE Guidelines",
  "UpToDate",
  "BMJ Best Practice",
  "ACP Journal Club",
  "Systematic Reviews"
]

export function PhysicianProfileSettings({ profile, onProfileUpdate }: PhysicianProfileProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [tempProfile, setTempProfile] = useState<PhysicianProfile>(profile)

  const handleSave = () => {
    onProfileUpdate(tempProfile)
    setIsEditing(false)
    setIsOpen(false)
  }

  const updatePreferences = (key: keyof NonNullable<PhysicianProfile['preferences']>, value: any) => {
    setTempProfile({
      ...tempProfile,
      preferences: {
        ...tempProfile.preferences,
        [key]: value
      }
    })
  }

  const updateNotificationSettings = (key: keyof NotificationSettings, value: any) => {
    setTempProfile({
      ...tempProfile,
      preferences: {
        ...tempProfile.preferences,
        notificationSettings: {
          ...tempProfile.preferences?.notificationSettings,
          [key]: value
        }
      }
    })
  }

  const updateDefaultFilters = (key: keyof FilterOptions, value: any) => {
    setTempProfile({
      ...tempProfile,
      preferences: {
        ...tempProfile.preferences,
        defaultFilters: {
          ...tempProfile.preferences?.defaultFilters,
          [key]: value
        }
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
          <Settings className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Physician Profile & Preferences
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Customize your clinical assistant experience
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Profile Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="text-blue-600 hover:bg-blue-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Medical Specialty</Label>
                <Select
                  value={tempProfile.specialty}
                  onValueChange={(value) => setTempProfile({ ...tempProfile, specialty: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  value={tempProfile.institution}
                  onChange={(e) => setTempProfile({ ...tempProfile, institution: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="license">License Number</Label>
                <Input
                  id="license"
                  value={tempProfile.licenseNumber}
                  onChange={(e) => setTempProfile({ ...tempProfile, licenseNumber: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Profile Summary Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{tempProfile.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className="bg-blue-100 text-blue-800">
                    {tempProfile.specialty}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>{tempProfile.institution}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>{tempProfile.licenseNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Preferred Data Sources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Preferred Data Sources</h3>
            <p className="text-sm text-gray-600">
              Select your preferred medical literature sources for research synthesis
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dataSources.map((source) => (
                <div key={source} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={source}
                    checked={tempProfile.preferences?.preferredSources?.includes(source) || false}
                    onChange={(e) => {
                      const current = tempProfile.preferences?.preferredSources || []
                      const updated = e.target.checked
                        ? [...current, source]
                        : current.filter(s => s !== source)
                      updatePreferences('preferredSources', updated)
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor={source} className="text-sm">
                    {source}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Default Search Filters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Default Search Preferences</h3>
            <p className="text-sm text-gray-600">
              Set your default filters for evidence searches
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Default Date Range</Label>
                <Select
                  value={tempProfile.preferences?.defaultFilters?.dateRange || "last-2-years"}
                  onValueChange={(value) => updateDefaultFilters('dateRange', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-year">Last 12 months</SelectItem>
                    <SelectItem value="last-2-years">Last 2 years</SelectItem>
                    <SelectItem value="last-5-years">Last 5 years</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Preferred Study Types</Label>
                <Select
                  value={tempProfile.preferences?.defaultFilters?.studyType || "all"}
                  onValueChange={(value) => updateDefaultFilters('studyType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All study types</SelectItem>
                    <SelectItem value="Meta-analysis">Meta-analyses</SelectItem>
                    <SelectItem value="RCT">Randomized Controlled Trials</SelectItem>
                    <SelectItem value="Systematic Review">Systematic Reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Geographic Focus</Label>
                <Select
                  value={tempProfile.preferences?.defaultFilters?.region || "all"}
                  onValueChange={(value) => updateDefaultFilters('region', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All regions</SelectItem>
                    <SelectItem value="North America">North America</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Global">Global/Multi-regional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Publication Status</Label>
                <Select
                  value={tempProfile.preferences?.defaultFilters?.publicationStatus || "peer-reviewed"}
                  onValueChange={(value) => updateDefaultFilters('publicationStatus', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All publications</SelectItem>
                    <SelectItem value="peer-reviewed">Peer-reviewed only</SelectItem>
                    <SelectItem value="preprint">Include preprints</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notification Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notification Preferences
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">New Study Alerts</p>
                  <p className="text-sm text-gray-500">Get notified when new relevant studies are published</p>
                </div>
                <Switch
                  checked={tempProfile.preferences?.notificationSettings?.newStudyAlerts || false}
                  onCheckedChange={(checked) => updateNotificationSettings('newStudyAlerts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Weekly Evidence Digest</p>
                  <p className="text-sm text-gray-500">Receive a weekly summary of important studies in your specialty</p>
                </div>
                <Switch
                  checked={tempProfile.preferences?.notificationSettings?.weeklyDigest || false}
                  onCheckedChange={(checked) => updateNotificationSettings('weeklyDigest', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Safety Alerts</p>
                  <p className="text-sm text-gray-500">Important drug safety and clinical warnings</p>
                </div>
                <Switch
                  checked={tempProfile.preferences?.notificationSettings?.safetyAlerts !== false}
                  onCheckedChange={(checked) => updateNotificationSettings('safetyAlerts', checked)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}