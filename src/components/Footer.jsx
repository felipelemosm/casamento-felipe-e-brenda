import monograma from '../assets/brasao-monograma.png'

export default function Footer() {
  return (
    <footer className="footer">
      <img src={monograma} alt="" className="footer-crest" aria-hidden="true" />
      <div className="footer-names script">
        Felipe <span className="amp">&amp;</span> Brenda
      </div>
      <div className="footer-note">06 · 09 · 2026 — Pitangui · MG</div>
    </footer>
  )
}
