"use client"
import { useState } from "react"

export function InstallCommand({ cmd }: { cmd: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="term">
      <span className="term-prompt">$</span>
      <code className="term-cmd">{cmd}</code>
      <span className="term-cursor" aria-hidden="true">▊</span>
      <button
        className="term-copy"
        onClick={async () => {
          await navigator.clipboard.writeText(cmd)
          setCopied(true)
          setTimeout(() => setCopied(false), 1600)
        }}
        aria-label="Copy install command"
      >
        {copied ? "✓ copied" : "copy"}
      </button>
    </div>
  )
}
