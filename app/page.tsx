import { PhysicianAssistant } from "../components/physician-assistant"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <PhysicianAssistant />
      </div>
    </div>
  )
}
