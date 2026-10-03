import { useState } from 'react'

export default function FormField({ label, value, onChange, type = 'text', multiline = false, maxLength, required = false }) {
  const [focused, setFocused] = useState(false)
  const Tag = multiline ? 'textarea' : 'input'

  return (
    <div>
      <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--card-text)' }}>
        {label} {required && <span style={{ color: '#f87171' }}>*</span>}
      </label>
      <Tag
        type={multiline ? undefined : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        maxLength={maxLength}
        rows={multiline ? 6 : undefined}
        className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors duration-150 resize-none"
        style={{
          background: 'var(--bg-3)',
          color: 'var(--card-text)',
          border: `1.5px solid ${focused ? 'var(--border-h)' : 'var(--border)'}`,
        }}
      />
      {maxLength && (
        <p className="text-right text-[10px] mt-1" style={{ color: 'var(--muted)' }}>
          {value.length} / {maxLength}
        </p>
      )}
    </div>
  )
}