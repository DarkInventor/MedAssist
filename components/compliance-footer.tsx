"use client"

import { Shield, Lock, FileText, Award, Globe, Database } from "lucide-react"

export function ComplianceFooter() {
  return (
    <div className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Compliance & Security */}
          <div>
            <h4 className="font-semibold text-white mb-4">Compliance & Security</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-slate-300">HIPAA / PIPEDA Compliant</span>
              </div>
              <div className="flex items-center space-x-3">
                <Lock className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-slate-300">FDA 510(k) Cleared</span>
              </div>
            </div>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Data Sources</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Database className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-slate-300">PubMed & Cochrane Library</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-indigo-400" />
                <span className="text-sm text-slate-300">ClinicalTrials.gov</span>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-teal-400" />
                <span className="text-sm text-slate-300">Real-time Literature Updates</span>
              </div>
            </div>
          </div>

          {/* Enterprise Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Enterprise Edition</h4>
            <div className="space-y-2">
              <p className="text-sm text-slate-300">MedAssist AI v2.1.0</p>
              <p className="text-sm text-slate-300">Enterprise Clinical Assistant</p>
              <p className="text-xs text-slate-400 mt-4">© 2024 MedAssist Technologies Inc.</p>
              <p className="text-xs text-slate-400">All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
