export default function AvailRow() {
  return (
    <div className="flex items-center justify-center gap-[7px]">
      <span className="relative flex h-[7px] w-[7px]">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-60" />
        <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-[#4ade80]" />
      </span>
      <span className="text-[11px] font-semibold text-[#4ade80]">
        Available for opportunities
      </span>
    </div>
  )
}