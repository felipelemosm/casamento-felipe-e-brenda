import Weather from '../components/Weather.jsx'
import VenueCard from '../components/VenueCard.jsx'

const photos = import.meta.glob('../assets/locais/local-civil*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const LOCAL_PHOTO = Object.values(photos)[0] ?? null

export default function Cerimonia() {
  return (
    <section className="section">
      <div className="section-eyebrow">O grande dia</div>
      <h2 className="section-title script">A Celebração</h2>
      <div className="section-intro">
        <p className="section-sub">
          A cerimônia civil acontecerá em Pitangui-MG, às <strong>11h da manhã de
          domingo</strong>. Logo depois, no mesmo endereço, seguimos para o almoço e a
          festa — que se estende até o café da tarde.
        </p>
        <p className="section-sub">
          Pedimos aos convidados que cheguem com cerca de 15 minutos de antecedência.
        </p>
      </div>

      <VenueCard
        kind="Cerimônia Civil & Festa"
        name="Celebração em Pitangui"
        detail="Rua Antônio Figueiras, 127 — Pitangui · MG, CEP 35650-000"
        time="Domingo, 06 · 09 · 2026 — 11h"
        photo={LOCAL_PHOTO}
        photoAlt="Local da celebração em Pitangui"
        mapQuery="Rua Antônio Figueiras, 127, Pitangui MG"
        wazeQuery="Rua Antônio Figueiras 127 Pitangui MG"
        mapTitle="Mapa do local da celebração em Pitangui"
      />

      <Weather />
    </section>
  )
}
