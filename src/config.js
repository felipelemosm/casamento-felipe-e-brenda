// ---------- Back-end (Google Apps Script) ----------
// URL do App da Web que recebe confirmações de presença e mensagens aos noivos.
// Siga o passo a passo em backend/README.md e cole aqui a URL gerada
// (termina em /exec). Enquanto estiver vazia, as páginas de confirmação e
// mensagens exibem um aviso de "em breve".
export const BACKEND_ENDPOINT = 'https://script.google.com/macros/s/AKfycby2217YS5jm2AYj_zmnt82dftDuWs0359KlT7I6iCDD5qmRlN2xczu8hY7cd0NNoL2zJA/exec'

// ---------- Presentes ----------
// Chave PIX dos noivos (aparece na janela de presente, com botão de copiar).
export const PIX_KEY = 'felipemlemosm@icloud.com'

// Link de pagamento por cartão (Nubank Cobrar / Mercado Pago / Banco Inter).
// Cole aqui o link da sua "maquininha virtual"; enquanto vazio, o botão de
// cartão fica desabilitado.
export const CARD_PAYMENT_LINK = ''

// ---------- Lista de presentes UNIFICADA (compartilhada entre os dois sites) ----------
// Os dois sites (civil e religioso) usam ESTE MESMO endpoint para a lista de
// presentes, para que "já comprado" apareça igual nos dois. Aponta para o Apps
// Script do site RELIGIOSO (mesma planilha, aba "Presentes"). O RSVP/mensagens/
// caronas continuam usando o BACKEND_ENDPOINT do civil, acima.
export const GIFT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbybC6c9D1RjAci0Fz0JGmzzjU8HKQr2oF4q-trkIEN33NX1GkiEy06-pOy-BddInP3T/exec'


// ---------- Mensagens UNIFICADAS (compartilhadas entre os dois sites) ----------
// Como os presentes, o mural de mensagens é único: os dois sites gravam e leem
// as mensagens deste mesmo endpoint (Apps Script do site religioso, aba
// "Mensagens"), para que o mural seja o mesmo nos dois.
export const MESSAGES_ENDPOINT = 'https://script.google.com/macros/s/AKfycbybC6c9D1RjAci0Fz0JGmzzjU8HKQr2oF4q-trkIEN33NX1GkiEy06-pOy-BddInP3T/exec'
