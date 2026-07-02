"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Download, Image as ImageIcon, Loader2 } from "lucide-react"

const formats = [
  { value: "png", label: "PNG", mime: "image/png" },
  { value: "jpeg", label: "JPEG", mime: "image/jpeg" },
  { value: "webp", label: "WebP", mime: "image/webp" },
  { value: "gif", label: "GIF", mime: "image/gif" },
  { value: "bmp", label: "BMP", mime: "image/bmp" },
]

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [targetFormat, setTargetFormat] = useState("png")
  const [quality, setQuality] = useState(90)
  const [converting, setConverting] = useState(false)
  const [convertedUrl, setConvertedUrl] = useState<string>("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setConvertedUrl("")
  }

  const handleConvert = () => {
    if (!file || !preview) return
    setConverting(true)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.drawImage(img, 0, 0)

      const format = formats.find((f) => f.value === targetFormat)
      if (!format) return

      const qualityVal = format.value === "jpeg" || format.value === "webp" ? quality / 100 : undefined
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            setConvertedUrl(url)
          }
          setConverting(false)
        },
        format.mime,
        qualityVal
      )
    }
    img.src = preview
  }

  const handleDownload = () => {
    if (!convertedUrl) return
    const a = document.createElement("a")
    a.href = convertedUrl
    const name = file?.name?.split(".")[0] || "converted"
    a.download = `${name}.${targetFormat}`
    a.click()
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {!file ? (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800/50 p-8 transition-colors hover:border-blue-400 dark:hover:border-blue-500">
              <Upload className="mb-2 size-8 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Click to upload or drag & drop an image
              </span>
              <span className="mt-1 text-xs text-zinc-400">PNG, JPEG, WebP, GIF, BMP</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
                  <ImageIcon className="absolute inset-0 m-auto size-8 text-zinc-300" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Preview" className="size-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-zinc-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setPreview(""); setConvertedUrl("") }}>
                  Change
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Target Format
                  </label>
                  <select
                    value={targetFormat}
                    onChange={(e) => setTargetFormat(e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    {formats.map((f) => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                </div>
                {(targetFormat === "jpeg" || targetFormat === "webp") && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Quality: {quality}%
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={quality}
                      onChange={(e) => setQuality(parseInt(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={handleConvert} disabled={converting}>
                  {converting ? <Loader2 className="size-4 animate-spin" /> : null}
                  {converting ? "Converting..." : "Convert Image"}
                </Button>
                {convertedUrl && (
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="size-4" />
                    Download {targetFormat.toUpperCase()}
                  </Button>
                )}
              </div>
              {convertedUrl && (
                <div className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30 p-3 text-center text-sm text-green-700 dark:text-green-300">
                  Conversion complete! Click download to save your file.
                </div>
              )}
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </CardContent>
    </Card>
  )
}
