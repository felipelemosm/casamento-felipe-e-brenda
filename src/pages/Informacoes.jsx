const INFOS = [
  {
    slug: 'traje',
    icon: '👗',
    eyebrow: 'Traje',
    title: 'Esporte fino',
    text: (
      <>
        <p>
          O dress code é <strong>esporte fino</strong>: elegante, mas sem cerimônia —
          não é ocasião de terno completo nem de gala.
        </p>
        <p>
          Pense em vestidos leves, camisa e calça de alfaiataria; um blazer é bem-vindo,
          gravata é opcional.
        </p>
      </>
    ),
  },
  {
    slug: 'pontualidade',
    icon: '🕰️',
    eyebrow: 'Pontualidade',
    title: 'Chegue com antecedência',
    text: (
      <>
        <p>
          Planeje chegar com cerca de <strong>15 minutos de antecedência</strong>.
          A cerimônia civil começará por volta das 11h.
        </p>
      </>
    ),
  },
  {
    slug: 'domingo',
    icon: '🏪',
    eyebrow: 'A cidade no domingo',
    title: 'Pitangui fecha cedo',
    text: (
      <>
        <p>
          Por ser domingo, <strong>muitos estabelecimentos da cidade estarão
          fechados</strong> — comércio, restaurantes e serviços.
        </p>
        <p>
          Planeje-se: abasteça o carro, traga o que precisar de farmácia e não conte com
          compras de última hora. De comida e bebida a festa cuida. 😉
        </p>
      </>
    ),
  },
  {
    slug: 'celebracao',
    icon: '🥂',
    eyebrow: 'A celebração',
    title: 'Do civil ao café da tarde',
    text: (
      <>
        <p>
          A cerimônia civil será às <strong>11h de domingo</strong> e, logo depois, no
          mesmo endereço, servimos o almoço.
        </p>
        <p>
          A festa segue à tarde e se estende até o <strong>café da tarde</strong> —
          reserve o domingo inteiro para celebrar com a gente.
        </p>
      </>
    ),
  },
  {
    slug: 'missa',
    icon: '⛪',
    eyebrow: 'Preceito dominical',
    title: 'Missa no domingo',
    text: (
      <>
        <p>
          Como a festa é num domingo, lembramos com carinho os convidados católicos do
          preceito dominical. A <strong>Matriz Nossa Senhora do Pilar</strong>
          {' '}(Praça Getúlio Vargas, centro de Pitangui, a poucos minutos do local) tem
          missas aos domingos.
        </p>
        <p>
          Os horários de referência são <strong>7h, 9h e 19h</strong> — a das 19h
          combina bem com o fim do café da tarde. Confirme com a paróquia:
          (37) 3271-4005.
        </p>
      </>
    ),
  },
]

export default function Informacoes() {
  return (
    <section className="section">
      <div className="section-eyebrow">Leia antes do grande dia</div>
      <h2 className="section-title script">Informações Importantes</h2>
      <div className="section-intro">
        <p className="section-sub">
          Alguns avisos com carinho, para que todos vivam esse domingo conosco com
          conforto e tranquilidade.
        </p>
      </div>

      <div className="infos">
        {INFOS.map((info, index) => (
          <article className="info-block" key={info.slug}>
            <div className="info-marker">
              <span className="info-icon" aria-hidden="true">{info.icon}</span>
            </div>
            <div className="info-content">
              <div className="info-eyebrow">{info.eyebrow}</div>
              <h3 className="info-title">{info.title}</h3>
              <div className="info-text">{info.text}</div>
            </div>
            {index < INFOS.length - 1 && (
              <div className="info-divider" aria-hidden="true">❦</div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
