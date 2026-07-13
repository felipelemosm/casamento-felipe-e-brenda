import Countdown from '../components/Countdown.jsx'
import MessagesSlideshow from '../components/MessagesSlideshow.jsx'
import HeroPhotos from '../components/HeroPhotos.jsx'
import brasaoCompleto from '../assets/brasao-completo.svg'

export default function Home() {
  return (
    <section className="hero">
      <img src={brasaoCompleto} alt="Brasão de Felipe e Brenda" className="hero-crest" />
      <h1 className="hero-names script">
        Felipe <span className="amp">&amp;</span> Brenda
      </h1>
      <div className="hero-date">06 · 09 · 2026 — 11h</div>
      <div className="hero-place">Rua Antônio Figueiras, 127 · Pitangui, MG</div>

      <HeroPhotos />

      <Countdown />

      <p className="hero-invite">
        “Amamos, porque Deus nos amou primeiro”
        <span className="hero-invite-ref">São João 4, 19</span>
      </p>

      <MessagesSlideshow />
    </section>
  )
}
