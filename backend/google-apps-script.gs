/**
 * Back-end do site do casamento civil — Google Apps Script.
 * Recebe registros de presentes (aba "Presentes"), confirmações de presença (aba "Confirmações"), mensagens aos noivos
 * (aba "Mensagens") e caronas (aba "Caronas"); devolve mensagens para o
 * slideshow da home e caronas para o mural.
 *
 * Instruções completas de instalação: backend/README.md
 */
const RSVP_SHEET = 'Confirmações';
const MESSAGES_SHEET = 'Mensagens';
const CARONAS_SHEET = 'Caronas';

function getSheet(name, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) sheet = spreadsheet.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = e.parameter;

    if (p.tipo === 'presente') {
      const sheet = getSheet('Presentes',
        ['Data', 'Presente', 'Valor de referência (R$)', 'Nome', 'Dedicatória']);
      sheet.appendRow([
        new Date(),
        p.presente || '',
        Number(p.valor || 0),
        p.nome || '',
        p.dedicatoria || '',
      ]);
    } else if (p.tipo === 'mensagem') {
      const sheet = getSheet(MESSAGES_SHEET, ['Data', 'Nome', 'Mensagem', 'Exibir']);
      // Coluna "Exibir": troque para "Não" na planilha para tirar uma mensagem do site.
      sheet.appendRow([new Date(), p.nome || '', p.mensagem || '', 'Sim']);
    } else if (p.tipo === 'carona') {
      const sheet = getSheet(CARONAS_SHEET,
        ['Data', 'Nome', 'WhatsApp', 'Origem', 'Saída', 'Chegada', 'Vagas', 'Observações', 'Exibir']);
      // Coluna "Exibir": troque para "Não" para tirar uma carona do mural
      // (ex.: quando as vagas acabarem ou a pedido do motorista).
      sheet.appendRow([
        new Date(),
        p.nome || '',
        p.whatsapp || '',
        p.origem || '',
        // apóstrofo força texto — sem ele o Sheets converte "07:00" em data de 1899
        "'" + (p.saida || ''),
        "'" + (p.chegada || ''),
        Number(p.vagas || 0),
        p.obs || '',
        'Sim',
      ]);
    } else {
      const sheet = getSheet(RSVP_SHEET,
        ['Data', 'Nome', 'Contato', 'Presença', 'Pessoas confirmadas', 'Mensagem']);
      sheet.appendRow([
        new Date(),
        p.nome || '',
        p.contato || '',
        p.presenca === 'sim' ? 'Sim' : 'Não',
        p.pessoas || '',
        p.mensagem || '',
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function visibleRows(sheetName, columns) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName);
  const rows = [];
  if (sheet && sheet.getLastRow() > 1) {
    const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, columns).getValues();
    values.forEach(function (row) {
      const exibir = String(row[columns - 1]).toLowerCase();
      if (exibir !== 'não' && exibir !== 'nao') rows.push(row);
    });
  }
  return rows;
}

function doGet(e) {
  const action = e && e.parameter && e.parameter.action;

  if (action === 'mensagens') {
    const mensagens = visibleRows(MESSAGES_SHEET, 4).map(function (row) {
      return { nome: row[1], mensagem: row[2] };
    });
    return ContentService.createTextOutput(JSON.stringify({ mensagens: mensagens }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'caronas') {
    const caronas = visibleRows(CARONAS_SHEET, 9).map(function (row) {
      return {
        nome: row[1],
        whatsapp: String(row[2]),
        origem: row[3],
        saida: String(row[4]),
        chegada: String(row[5]),
        vagas: row[6],
        obs: row[7],
      };
    });
    return ContentService.createTextOutput(JSON.stringify({ caronas: caronas }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput('Site Felipe & Brenda (civil): back-end no ar ✔');
}

// ---------------------------------------------------------------------------
// UTILITÁRIO (rodar UMA vez, à mão): envia as mensagens já deixadas nas
// confirmações deste site (aba "Confirmações") para o mural UNIFICADO, que fica
// na planilha do site religioso. Marca cada linha migrada na coluna
// "Migrada p/ mural" — pode rodar de novo sem duplicar.
// Como rodar: no editor do Apps Script, selecione a função
// "enviarMensagensDasConfirmacoesAoMural" no topo e clique em ▷ Executar.
// ---------------------------------------------------------------------------
function enviarMensagensDasConfirmacoesAoMural() {
  // endpoint do mural (Apps Script do site religioso)
  const MURAL_ENDPOINT = 'https://script.google.com/macros/s/AKfycbybC6c9D1RjAci0Fz0JGmzzjU8HKQr2oF4q-trkIEN33NX1GkiEy06-pOy-BddInP3T/exec';
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rsvp = ss.getSheetByName(RSVP_SHEET);
  if (!rsvp || rsvp.getLastRow() < 2) {
    Logger.log('Nenhuma confirmação para migrar.');
    return;
  }

  // garante uma coluna de controle "Migrada p/ mural"
  const lastCol = rsvp.getLastColumn();
  const header = rsvp.getRange(1, 1, 1, lastCol).getValues()[0];
  let ctrlCol = header.indexOf('Migrada p/ mural') + 1;
  if (ctrlCol === 0) {
    ctrlCol = lastCol + 1;
    rsvp.getRange(1, ctrlCol).setValue('Migrada p/ mural');
  }

  const rows = rsvp.getRange(2, 1, rsvp.getLastRow() - 1, Math.max(6, ctrlCol)).getValues();
  let enviadas = 0;
  for (let i = 0; i < rows.length; i++) {
    const nome = String(rows[i][1] || '').trim();
    const msg = String(rows[i][5] || '').trim();
    const jaMigrada = String(rows[i][ctrlCol - 1] || '').toLowerCase() === 'sim';
    if (!msg || jaMigrada) continue;
    UrlFetchApp.fetch(MURAL_ENDPOINT, {
      method: 'post',
      payload: { tipo: 'mensagem', nome: nome, mensagem: msg },
      muteHttpExceptions: true,
    });
    rsvp.getRange(i + 2, ctrlCol).setValue('Sim');
    enviadas++;
    Utilities.sleep(400);
  }
  Logger.log('Mensagens enviadas ao mural: ' + enviadas);
}
