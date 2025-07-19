import { PhysicianAssistant } from "../components/physician-assistant"
import { ComplianceFooter } from "../components/compliance-footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <PhysicianAssistant />
      </div>
      <ComplianceFooter />
    </div>
  )
}
