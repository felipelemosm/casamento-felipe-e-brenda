/**
 * Back-end do site do casamento civil — Google Apps Script.
 * Recebe confirmações de presença (aba "Confirmações"), mensagens aos noivos
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

    if (p.tipo === 'mensagem') {
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
        p.saida || '',
        p.chegada || '',
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
