import { CheckCircle2, AlertCircle } from 'lucide-react'

export default function Banner({ type, message }) {
  const isSuccess = type === 'success'
  const color = isSuccess ? '#4ade80' : '#f87171'
  const Icon = isSuccess ? CheckCircle2 : AlertCircle

  return (
    <div
      className="flex items-center gap-2.5 px-4 py-3 rounded-lg text-[13px] font-medium mb-4"
      style={{ background: `${color}18`, border: `1px solid ${color}40`, color }}
    >
      <Icon size={16} />
      {message}
    </div>
  )
}