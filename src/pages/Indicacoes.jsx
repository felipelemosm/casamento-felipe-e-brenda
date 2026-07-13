// Fotos: salve em src/assets/indicacoes/ com o nome do slug do item
// (ex.: hotel-pousada-pilar.jpg). Cartões sem foto são renderizados sem
// imagem, sem quebrar o layout.
const photos = import.meta.glob('../assets/indicacoes/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

function photoFor(slug) {
  const entry = Object.entries(photos).find(([path]) =>
    path.split('/').pop().replace(/\.(jpg|jpeg|png|webp)$/i, '') === slug,
  )
  return entry ? entry[1] : null
}

function mapsUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

const HOSPEDAGEM = [
  {
    slug: 'hotel-pousada-pilar',
    name: 'Pousada do Pilar',
    text: 'Pousada tradicional de Pitangui, no clima acolhedor da cidade histórica.',
    map: 'Pousada do Pilar, Pitangui MG',
  },
  {
    slug: 'hotel-pousada-economica',
    name: 'Pousada Econômica Pitangui',
    text: 'Opção simples e bem avaliada, com café da manhã elogiado pelos hóspedes.',
    map: 'Pousada Econômica Pitangui, Pitangui MG',
  },
  {
    slug: 'hotel-libras',
    name: 'Hotel Libras',
    text: 'Hotel indicado para famílias, com estrutura confortável e boa localização.',
    map: 'Hotel Libras, Pitangui MG',
  },
]

const PASSEIOS = [
  {
    slug: 'passeio-matriz',
    name: 'Matriz Nossa Senhora do Pilar',
    text: 'O maior templo de Pitangui, em estilo neogótico (1921), com pinturas sacras no interior. É também onde acontecem as missas de domingo.',
    map: 'Matriz Nossa Senhora do Pilar, Pitangui MG',
  },
  {
    slug: 'passeio-centro',
    name: 'Centro Histórico',
    text: 'Fundada em 1715 por bandeirantes, a "Cidade-presépio" guarda casarões coloniais, o Chafariz da Praça, o Sobrado do Padre Belchior e capelas centenárias.',
    map: 'Centro Histórico, Pitangui MG',
  },
  {
    slug: 'passeio-cristo',
    name: 'Cristo Redentor da Serra da Cruz do Monte',
    text: 'No alto da serra, o mirante com o Cristo oferece a vista mais bonita de Pitangui — vale subir no fim de tarde.',
    map: 'Cristo Redentor, Pitangui MG',
  },
  {
    slug: 'passeio-natureza',
    name: 'Rios e matas da região',
    text: 'Os rios Pará e São João, as matas do Céu e da Rocinha e a mina d\'água da Gameleira são o lado natureza da cidade, para quem estica a estadia.',
    map: 'Rio Pará, Pitangui MG',
  },
]

function RecCard({ item }) {
  const photo = photoFor(item.slug)
  return (
    <article className="rec-card">
      {photo && <img className="rec-photo" src={photo} alt={item.name} loading="lazy" />}
      <div className="rec-body">
        <h4 className="rec-name">{item.name}</h4>
        <p className="rec-text">{item.text}</p>
        <a className="btn ghost rec-link" target="_blank" rel="noopener noreferrer"
          href={mapsUrl(item.map)}>
          Ver no mapa
        </a>
      </div>
    </article>
  )
}

function RecGroup({ eyebrow, title, sub, items }) {
  return (
    <div className="rec-group">
      <div className="rec-group-eyebrow">{eyebrow}</div>
      <h3 className="rec-group-title">{title}</h3>
      {sub && <p className="rec-group-sub">{sub}</p>}
      <div className="rec-grid">
        {items.map((item) => <RecCard key={item.slug} item={item} />)}
      </div>
    </div>
  )
}

export default function Indicacoes() {
  return (
    <section className="section">
      <div className="section-eyebrow">Para quem vem de fora</div>
      <h2 className="section-title script">Indicações</h2>
      <div className="section-intro">
        <p className="section-sub">
          Reunimos aqui sugestões de onde ficar, onde se arrumar e o que conhecer em
          Pitangui. São indicações com carinho, para que o fim de semana do casamento
          seja também um passeio.
        </p>
      </div>

      <RecGroup
        eyebrow="Onde ficar"
        title="Hospedagem em Pitangui"
        sub="Pousadas e hotel na cidade — reserve cedo: o fim de semana da festa deve lotar."
        items={HOSPEDAGEM}
      />

      <div className="rec-group">
        <div className="rec-group-eyebrow">Para se arrumar</div>
        <h3 className="rec-group-title">Beleza no grande dia</h3>
        <div className="beauty-card">
          <div className="beauty-icon" aria-hidden="true">💄</div>
          <div>
            <h4 className="rec-name">Maquiadora indicada pelos noivos</h4>
            <p className="rec-text">
              Em breve divulgaremos aqui o contato da maquiadora — ela também atende
              convidadas, mediante agendamento antecipado.
            </p>
            <p className="rec-text">
              Uma dica: a cerimônia é às 11h de domingo e o comércio da cidade fecha
              cedo — agende o horário com bastante antecedência.
            </p>
          </div>
        </div>
      </div>

      <RecGroup
        eyebrow="Para conhecer"
        title="Passeios em Pitangui"
        sub="A cidade mais antiga da região central de Minas, fundada em 1715."
        items={PASSEIOS}
      />
    </section>
  )
}
