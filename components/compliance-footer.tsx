"use client"

import { Shield, Lock, FileText, Award, Globe, Database, Eye, Clock, Building, Users } from "lucide-react"

export function ComplianceFooter() {
  return (
    <div className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Compliance & Security */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-green-400" />
              Compliance & Security
            </h4>
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
              <div className="flex items-center space-x-3">
                <Eye className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-slate-300">Full Audit Trail</span>
              </div>
            </div>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center">
              <Database className="w-4 h-4 mr-2 text-purple-400" />
              Data Sources
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Database className="w-4 h-4 text-purple-400" />
                <div>
                  <span className="text-sm text-slate-300 block">PubMed/MEDLINE</span>
                  <span className="text-xs text-slate-400">35M+ Citations</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-indigo-400" />
                <div>
                  <span className="text-sm text-slate-300 block">Cochrane Library</span>
                  <span className="text-xs text-slate-400">Systematic Reviews</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-teal-400" />
                <div>
                  <span className="text-sm text-slate-300 block">ClinicalTrials.gov</span>
                  <span className="text-xs text-slate-400">400K+ Studies</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-slate-300">Real-time Updates</span>
              </div>
            </div>
          </div>

          {/* Coverage & Validation */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center">
              <Globe className="w-4 h-4 mr-2 text-indigo-400" />
              Coverage
            </h4>
            <div className="space-y-3">
              <div className="text-sm text-slate-300">
                <div className="font-medium">Medical Specialties</div>
                <div className="text-xs text-slate-400 mt-1">20+ Specialties Covered</div>
              </div>
              <div className="text-sm text-slate-300">
                <div className="font-medium">Global Guidelines</div>
                <div className="text-xs text-slate-400 mt-1">NICE, ACP, AHA, ESC</div>
              </div>
              <div className="text-sm text-slate-300">
                <div className="font-medium">Languages</div>
                <div className="text-xs text-slate-400 mt-1">English, French</div>
              </div>
              <div className="text-sm text-slate-300">
                <div className="font-medium">Update Frequency</div>
                <div className="text-xs text-slate-400 mt-1">Daily Synchronization</div>
              </div>
            </div>
          </div>

          {/* Enterprise Info */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center">
              <Building className="w-4 h-4 mr-2 text-blue-400" />
              Enterprise Edition
            </h4>
            <div className="space-y-3">
              <div className="text-sm text-slate-300">
                <div className="font-medium">OpenEvidence AI v3.2.1</div>
                <div className="text-xs text-slate-400 mt-1">Enterprise Clinical Assistant</div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-sm text-slate-300">Multi-tenant Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">On-premise Available</span>
              </div>
              <div className="text-xs text-slate-400 mt-4">
                <div>© 2024 OpenEvidence Technologies Inc.</div>
                <div className="mt-1">
                  <span className="text-indigo-400 hover:text-indigo-300 cursor-pointer">Privacy Policy</span>
                  <span className="mx-2">•</span>
                  <span className="text-indigo-400 hover:text-indigo-300 cursor-pointer">Terms of Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom disclaimer */}
        <div className="border-t border-slate-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="text-xs text-slate-400 max-w-2xl">
              <p className="mb-2">
                <strong className="text-slate-300">Medical Disclaimer:</strong> This AI system provides clinical decision support 
                for informational purposes only. Not intended to replace professional medical judgment, diagnosis, or treatment. 
                Always verify recommendations with current clinical guidelines and consult colleagues when appropriate.
              </p>
              <p>
                <strong className="text-slate-300">Data Privacy:</strong> No patient data is processed or stored. 
                All queries are logged for audit purposes but contain no identifiable information.
              </p>
            </div>
            <div className="text-xs text-slate-400 text-right">
              <div>Last Updated: January 2024</div>
              <div>Build: 3.2.1-enterprise</div>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
