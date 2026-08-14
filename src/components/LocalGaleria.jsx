import { useEffect, useState } from 'react'
import { useLightbox } from './Lightbox.jsx'

// Slideshow com as fotos do espaço da celebração em Pitangui. As imagens ficam
// em src/assets/locais-galeria/ (jpg, jpeg, png ou webp) e entram em ordem
// alfabética. Para adicionar mais, basta salvar o arquivo lá.
const files = import.meta.glob('../assets/locais-galeria/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const PHOTOS = Object.keys(files).sort().map((key) => files[key])

const INTERVAL_MS = 5000

export default function LocalGaleria() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const openLightbox = useLightbox()

  useEffect(() => {
    if (paused || PHOTOS.length < 2) return
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % PHOTOS.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused])

  if (PHOTOS.length === 0) return null

  function go(delta) {
    setIndex((current) => (current + delta + PHOTOS.length) % PHOTOS.length)
  }

  return (
    <div className="galeria venue-galeria">
      <h3 className="galeria-title script">O espaço</h3>
      <p className="galeria-sub">Um pouco mais do lugar que vai receber a nossa celebração.</p>
      <p className="galeria-hint">🔍 Clique na foto para ampliar e navegar por todas.</p>

      <div className="galeria-stage zoomable"
        onClick={() => openLightbox(PHOTOS, index, 'Local da celebração em Pitangui')}
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {PHOTOS.map((src, i) => (
          <img key={i} src={src} alt="Local da celebração em Pitangui"
            className={i === index ? 'visible' : undefined}
            loading={i === 0 ? 'eager' : 'lazy'} />
        ))}
        <button className="galeria-nav prev"
          onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Foto anterior">‹</button>
        <button className="galeria-nav next"
          onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Próxima foto">›</button>
      </div>

      <div className="galeria-dots" role="presentation">
        {PHOTOS.map((_, i) => (
          <button key={i} className={i === index ? 'dot active' : 'dot'}
            onClick={() => setIndex(i)} aria-label={`Foto ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}
