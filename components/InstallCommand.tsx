"use client"
import { useState } from "react"

export function InstallCommand({ cmd }: { cmd: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="install-command">
      <code>{cmd}</code>
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(cmd)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        }}
        aria-label="Copy install command"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  )
}
