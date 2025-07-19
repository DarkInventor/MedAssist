"use client"

import { useState } from "react"
import { Filter, X, Calendar, FileText, Globe, Star, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { FilterOptions } from "../types/medical"

interface AdvancedFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  studyCount: number
}

export function AdvancedFilters({ filters, onFiltersChange, studyCount }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempFilters, setTempFilters] = useState<FilterOptions>(filters)

  const handleApplyFilters = () => {
    onFiltersChange(tempFilters)
    setIsOpen(false)
  }

  const handleResetFilters = () => {
    const defaultFilters: FilterOptions = {
      dateRange: "last-2-years",
      studyType: "all",
      region: "all",
      publicationStatus: "all",
      includePreprints: false,
    }
    setTempFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.dateRange !== "all") count++
    if (filters.studyType !== "all") count++
    if (filters.region !== "all") count++
    if (filters.publicationStatus !== "all") count++
    if (filters.minQualityScore && filters.minQualityScore > 0) count++
    if (filters.includePreprints) count++
    return count
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100 relative">
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
          {getActiveFilterCount() > 0 && (
            <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5">
              {getActiveFilterCount()}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2 text-blue-600" />
            Advanced Evidence Filters
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Refine your search to find the most relevant medical literature
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Date Range */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-900 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Publication Date Range
            </Label>
            <Select
              value={tempFilters.dateRange}
              onValueChange={(value: FilterOptions["dateRange"]) =>
                setTempFilters({ ...tempFilters, dateRange: value })
              }
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

          {/* Study Type */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-900 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Study Type
            </Label>
            <Select
              value={tempFilters.studyType}
              onValueChange={(value: FilterOptions["studyType"]) =>
                setTempFilters({ ...tempFilters, studyType: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All study types</SelectItem>
                <SelectItem value="Meta-analysis">Meta-analyses</SelectItem>
                <SelectItem value="RCT">Randomized Controlled Trials</SelectItem>
                <SelectItem value="Systematic Review">Systematic Reviews</SelectItem>
                <SelectItem value="Cohort">Cohort Studies</SelectItem>
                <SelectItem value="Case Study">Case Studies</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Geographic Region */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-900 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Geographic Region
            </Label>
            <Select
              value={tempFilters.region}
              onValueChange={(value: FilterOptions["region"]) =>
                setTempFilters({ ...tempFilters, region: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All regions</SelectItem>
                <SelectItem value="North America">North America</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
                <SelectItem value="Asia">Asia</SelectItem>
                <SelectItem value="Global">Global/Multi-regional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Publication Status */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-900">Publication Status</Label>
            <Select
              value={tempFilters.publicationStatus}
              onValueChange={(value: FilterOptions["publicationStatus"]) =>
                setTempFilters({ ...tempFilters, publicationStatus: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All publications</SelectItem>
                <SelectItem value="peer-reviewed">Peer-reviewed only</SelectItem>
                <SelectItem value="preprint">Preprints only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quality Score */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-900 flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Minimum Quality Score
            </Label>
            <div className="px-3">
              <Slider
                value={[tempFilters.minQualityScore || 0]}
                onValueChange={([value]) =>
                  setTempFilters({ ...tempFilters, minQualityScore: value })
                }
                max={10}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 (Any)</span>
                <span className="font-medium">
                  {tempFilters.minQualityScore || 0}/10
                </span>
                <span>10 (Highest)</span>
              </div>
            </div>
          </div>

          {/* Include Preprints */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="include-preprints"
              checked={tempFilters.includePreprints}
              onCheckedChange={(checked) =>
                setTempFilters({ ...tempFilters, includePreprints: !!checked })
              }
            />
            <Label htmlFor="include-preprints" className="text-sm">
              Include preprint studies (not yet peer-reviewed)
            </Label>
          </div>

          {/* Results Preview */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-900 font-semibold">Filter Preview</p>
                <p className="text-blue-700 text-sm">
                  These filters will show approximately <span className="font-semibold">{studyCount}</span> studies
                </p>
              </div>
              <Download className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t">
          <Button variant="ghost" onClick={handleResetFilters} className="text-gray-600">
            Reset All
          </Button>
          <div className="flex space-x-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyFilters} className="bg-blue-600 hover:bg-blue-700">
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}