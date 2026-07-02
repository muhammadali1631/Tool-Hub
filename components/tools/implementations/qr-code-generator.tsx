"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const qrTypes = [
  { value: "url", label: "URL" },
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "sms", label: "SMS" },
  { value: "wifi", label: "Wi-Fi" },
  { value: "vcard", label: "vCard (Contact)" },
] as const

interface QrFields {
  url: string
  text: string
  email: string
  subject: string
  phone: string
  sms: string
  wifiSsid: string
  wifiPassword: string
  wifiEncryption: string
  vcardName: string
  vcardPhone: string
  vcardEmail: string
}

export default function QRCodeGenerator() {
  const [qrType, setQrType] = useState<string>("url")
  const [fgColor, setFgColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [fields, setFields] = useState<QrFields>({
    url: "", text: "", email: "", subject: "", phone: "", sms: "",
    wifiSsid: "", wifiPassword: "", wifiEncryption: "WPA",
    vcardName: "", vcardPhone: "", vcardEmail: "",
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState("")

  const updateField = (key: keyof QrFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }))
  }

  const getContent = useCallback(() => {
    switch (qrType) {
      case "url": return fields.url
      case "text": return fields.text
      case "email": return `mailto:${fields.email}?subject=${encodeURIComponent(fields.subject)}`
      case "phone": return `tel:${fields.phone}`
      case "sms": return `smsto:${fields.sms}`
      case "wifi": return `WIFI:T:${fields.wifiEncryption};S:${fields.wifiSsid};P:${fields.wifiPassword};;`
      case "vcard": return `BEGIN:VCARD\nVERSION:3.0\nFN:${fields.vcardName}\nTEL:${fields.vcardPhone}\nEMAIL:${fields.vcardEmail}\nEND:VCARD`
      default: return ""
    }
  }, [qrType, fields])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const content = getContent()
    if (!content) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      return
    }

    let cancelled = false

    import("qrcode").then((QRCode) => {
      if (cancelled) return
      QRCode.default.toCanvas(
        canvas,
        content,
        {
          width: 280,
          margin: 2,
          color: { dark: fgColor, light: bgColor },
        },
        (err: Error | null | undefined) => {
          if (!cancelled) {
            setError(err ? err.message : "")
          }
        }
      )
    }).catch(() => {
      if (!cancelled) setError("Failed to load QR code library")
    })

    return () => { cancelled = true }
  }, [getContent, fgColor, bgColor])

  const handleDownload = (format: "png" | "svg") => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (format === "png") {
      const link = document.createElement("a")
      link.download = "qrcode.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                QR Code Type
              </label>
              <select
                value={qrType}
                onChange={(e) => setQrType(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {qrTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            {qrType === "url" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">URL</label>
                <Input value={fields.url} onChange={(e) => updateField("url", e.target.value)} placeholder="https://example.com" />
              </div>
            )}
            {qrType === "text" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Text</label>
                <textarea
                  value={fields.text}
                  onChange={(e) => updateField("text", e.target.value)}
                  placeholder="Enter text..."
                  className="h-24 w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>
            )}
            {qrType === "email" && (
              <>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                  <Input value={fields.email} onChange={(e) => updateField("email", e.target.value)} placeholder="email@example.com" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Subject</label>
                  <Input value={fields.subject} onChange={(e) => updateField("subject", e.target.value)} placeholder="Email subject" />
                </div>
              </>
            )}
            {qrType === "phone" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Phone Number</label>
                <Input value={fields.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+1234567890" />
              </div>
            )}
            {qrType === "sms" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">SMS Number</label>
                <Input value={fields.sms} onChange={(e) => updateField("sms", e.target.value)} placeholder="+1234567890" />
              </div>
            )}
            {qrType === "wifi" && (
              <>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Network SSID</label>
                  <Input value={fields.wifiSsid} onChange={(e) => updateField("wifiSsid", e.target.value)} placeholder="Wi-Fi name" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
                  <Input value={fields.wifiPassword} onChange={(e) => updateField("wifiPassword", e.target.value)} placeholder="Wi-Fi password" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Encryption</label>
                  <select
                    value={fields.wifiEncryption}
                    onChange={(e) => updateField("wifiEncryption", e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None</option>
                  </select>
                </div>
              </>
            )}
            {qrType === "vcard" && (
              <>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Full Name</label>
                  <Input value={fields.vcardName} onChange={(e) => updateField("vcardName", e.target.value)} placeholder="John Doe" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Phone</label>
                  <Input value={fields.vcardPhone} onChange={(e) => updateField("vcardPhone", e.target.value)} placeholder="+1234567890" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                  <Input value={fields.vcardEmail} onChange={(e) => updateField("vcardEmail", e.target.value)} placeholder="john@example.com" />
                </div>
              </>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Foreground</label>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-10 w-full cursor-pointer rounded-lg border border-zinc-200 dark:border-zinc-700"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Background</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-10 w-full cursor-pointer rounded-lg border border-zinc-200 dark:border-zinc-700"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4">
              <canvas ref={canvasRef} width={280} height={280} className="size-[280px]" />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <Button onClick={() => handleDownload("png")} disabled={!getContent()}>
              <Download className="size-4" />
              Download PNG
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
