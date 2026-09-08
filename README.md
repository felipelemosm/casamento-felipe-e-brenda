# Site do Casamento Civil — Felipe & Brenda · 06.09.2026 · Pitangui-MG

Versão do site para o **casamento civil** (o site do religioso, em Belo Horizonte,
vive em `felipelemosm/felipe-e-brenda`). Mesma identidade visual: brasão dourado
(#C1A76B), fontes Snell Roundhand/Great Vibes e Forum.

Diferenças em relação ao site do religioso:

- Data/hora: **domingo, 6 de setembro de 2026, 11h**
- Local único: Rua Antônio Figueiras, 127 — Pitangui · MG (cerimônia + almoço + festa
  até o café da tarde; não há página de Recepção)
- Informações Importantes: traje esporte fino, preceito dominical (missas na Matriz
  Nossa Senhora do Pilar), aviso de comércio fechado no domingo
- Indicações: pousadas e passeios de **Pitangui**

Depois da celebração (08/09/2026) saíram do site as páginas de Caronas e de
Confirmação de Presença e o quadro de previsão do tempo — o site do religioso
mantém as três.

## Rodar localmente

```bash
npm install
npm run dev      # abre em http://localhost:5173
```

## Mensagens aos noivos

Usa uma **planilha separada** da do religioso: crie um segundo Apps Script seguindo
`backend/README.md` e cole a URL em `src/config.js` (`BACKEND_ENDPOINT`).

## Publicação

GitHub Pages via Actions (`.github/workflows/deploy.yml`) — push na `main` publica.
