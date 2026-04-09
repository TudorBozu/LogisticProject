export function drawBarcode(canvas: HTMLCanvasElement, val: string, dark: boolean): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const W = 320, H = 72
  ctx.fillStyle = dark ? '#1e293b' : '#ffffff'
  ctx.fillRect(0, 0, W, H + 20)
  const chars = val.split('')
  let x = 8
  const barW = (W - 16) / (chars.length * 11 + 3)
  ctx.fillStyle = dark ? '#f1f5f9' : '#000000'
  for (const b of [1, 0, 1]) {
    if (b) ctx.fillRect(Math.round(x), 4, Math.max(1, Math.round(barW)), H - 4)
    x += barW
  }
  for (const ch of chars) {
    const code = ch.charCodeAt(0)
    const pattern = ((code * 37 + 13) % 256).toString(2).padStart(11, '0')
    for (const bit of pattern) {
      if (bit === '1') ctx.fillRect(Math.round(x), 4, Math.max(1, Math.round(barW)), H - 4)
      x += barW
    }
  }
  for (const b of [1, 0, 1, 0, 1]) {
    if (b) ctx.fillRect(Math.round(x), 4, Math.max(1, Math.round(barW)), H - 4)
    x += barW
  }
  ctx.font = '11px monospace'
  ctx.textAlign = 'center'
  ctx.fillText(val, W / 2, H + 16)
}
