import { useEffect, useState } from 'react'
import { BACKEND_ENDPOINT } from '../config.js'

const INITIAL = {
  nome: '',
  whatsapp: '',
  origem: '',
  saida: '',
  chegada: '',
  vagas: '3',
  obs: '',
}

// O Sheets pode converter "07:00" em data completa de 1899; extrai só o HH:mm.
function formatHora(valor) {
  const match = String(valor).match(/\b(\d{1,2}):(\d{2})/)
  return match ? `${match[1].padStart(2, '0')}:${match[2]}` : String(valor)
}

function waLink(numero, nome) {
  let digits = numero.replace(/\D/g, '')
  if (!digits.startsWith('55') && digits.length <= 11) digits = `55${digits}`
  const msg = `Olá, ${nome}! Vi sua carona no site do casamento do Felipe e da Brenda e tenho interesse. 🚗`
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`
}

export default function Caronas() {
  const [caronas, setCaronas] = useState(null) // null = carregando
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  function update(field) {
    return (event) => setForm({ ...form, [field]: event.target.value })
  }

  function fetchCaronas() {
    if (!BACKEND_ENDPOINT) {
      setCaronas([])
      return
    }
    fetch(`${BACKEND_ENDPOINT}?action=caronas`)
      .then((res) => res.json())
      .then((data) => setCaronas(Array.isArray(data.caronas) ? data.caronas : []))
      .catch(() => setCaronas([]))
  }

  useEffect(fetchCaronas, [])

  async function handleSubmit(event) {
    event.preventDefault()
    if (!BACKEND_ENDPOINT) return
    setStatus('sending')
    try {
      await fetch(BACKEND_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ tipo: 'carona', ...form }),
      })
      setStatus('sent')
      setForm(INITIAL)
      setTimeout(fetchCaronas, 1500)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section">
      <div className="section-eyebrow">Vamos juntos</div>
      <h2 className="section-title script">Caronas</h2>
      <div className="section-intro">
        <p className="section-sub">
          Tem lugar sobrando no carro, ou está precisando de uma carona até Pitangui no
          domingo de manhã? Este mural conecta os convidados.
        </p>
        <p className="section-sub">
          Quem oferece publica a carona abaixo; quem precisa chama direto no WhatsApp
          para combinar.
        </p>
      </div>

      {!BACKEND_ENDPOINT && (
        <p className="rsvp-soon">
          O mural de caronas abrirá em breve por aqui. Enquanto isso, combine nos grupos
          dos convidados. 🚗
        </p>
      )}

      <div className="caronas-list">
        <h3 className="caronas-subtitle">Caronas publicadas</h3>
        {caronas === null ? (
          <p className="weather-loading">Carregando caronas…</p>
        ) : caronas.length === 0 ? (
          <p className="caronas-empty">
            Nenhuma carona publicada ainda — seja a primeira pessoa a oferecer! 💛
          </p>
        ) : (
          <div className="caronas-grid">
            {caronas.map((carona, index) => (
              <article className="carona-card" key={index}>
                <div className="carona-head">
                  <span className="carona-icon" aria-hidden="true">🚗</span>
                  <div>
                    <div className="carona-nome">{carona.nome}</div>
                    <div className="carona-vagas">
                      {carona.vagas} {Number(carona.vagas) === 1 ? 'vaga' : 'vagas'}
                    </div>
                  </div>
                </div>
                <div className="carona-rota">
                  <strong>{carona.origem}</strong> → Pitangui
                </div>
                <div className="carona-horarios">
                  Saída {formatHora(carona.saida)} · chegada prevista {formatHora(carona.chegada)}
                </div>
                {carona.obs && <p className="carona-obs">{carona.obs}</p>}
                <a className="btn carona-wa" target="_blank" rel="noopener noreferrer"
                  href={waLink(carona.whatsapp, carona.nome)}>
                  Chamar no WhatsApp
                </a>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="caronas-form-wrap">
        <h3 className="caronas-subtitle">Ofereça uma carona</h3>
        {status === 'sent' ? (
          <div className="carona-sent">
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Carona publicada — obrigado por ajudar! 🤍 Ela aparece no mural em
              instantes.
            </p>
            <button className="btn" style={{ marginTop: '1.2rem' }} onClick={() => setStatus('idle')}>
              Publicar outra carona
            </button>
          </div>
        ) : (
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Seu nome</span>
              <input type="text" required value={form.nome} onChange={update('nome')}
                autoComplete="name" placeholder="Quem está dirigindo" />
            </label>

            <label className="field">
              <span>WhatsApp (com DDD)</span>
              <input type="tel" required value={form.whatsapp} onChange={update('whatsapp')}
                placeholder="(31) 99999-9999" />
            </label>

            <label className="field">
              <span>De onde você sai?</span>
              <input type="text" required value={form.origem} onChange={update('origem')}
                placeholder="Bairro e cidade — ex.: Savassi, Belo Horizonte" />
            </label>

            <div className="carona-times">
              <label className="field">
                <span>Saída prevista</span>
                <input type="time" required value={form.saida} onChange={update('saida')} />
              </label>
              <label className="field">
                <span>Chegada prevista</span>
                <input type="time" required value={form.chegada} onChange={update('chegada')} />
              </label>
              <label className="field">
                <span>Vagas no carro</span>
                <input type="number" min="1" max="8" required value={form.vagas}
                  onChange={update('vagas')} />
              </label>
            </div>

            <label className="field">
              <span>Observações (opcional)</span>
              <textarea rows="2" value={form.obs} onChange={update('obs')}
                placeholder="Ponto de encontro, espaço para mala, volta no mesmo dia…" />
            </label>

            <p className="carona-aviso">
              Ao publicar, seu nome e WhatsApp ficam visíveis para quem acessar o site —
              é assim que os interessados falam com você.
            </p>

            {status === 'error' && (
              <p className="rsvp-error">
                Não conseguimos publicar sua carona. Verifique sua internet e tente de novo.
              </p>
            )}

            <button className="btn rsvp-submit" type="submit"
              disabled={!BACKEND_ENDPOINT || status === 'sending'}>
              {status === 'sending' ? 'Publicando…' : 'Publicar carona'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
