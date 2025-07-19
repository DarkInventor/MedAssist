"use client"

import { PhysicianAssistant } from "./components/physician-assistant"
import { ComplianceFooter } from "./components/compliance-footer"

export default function PhysicianAssistantApp() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <PhysicianAssistant />
      </div>
      <ComplianceFooter />
    </div>
  )
}
