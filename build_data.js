const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Criar pasta public/data se não existir
const dataDir = path.join(__dirname, 'public', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Carregar arquivos
console.log('Carregando planilhas...');
const workbookSales = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const sheetSales = workbookSales.Sheets[workbookSales.SheetNames[0]];
const rowsSales = xlsx.utils.sheet_to_json(sheetSales);

const workbookRegion = xlsx.readFile('FILIAL - MESOREGIAO v1.xlsx');
// Usar a aba 'Base' que contém a configuração atualizada das regionais
const sheetRegion = workbookRegion.Sheets['Base'] || workbookRegion.Sheets[workbookRegion.SheetNames[0]];
const rowsRegion = xlsx.utils.sheet_to_json(sheetRegion);

// Helper para obter o código/prefixo da filial (ex: "L01" de "L01:Loja Matriz")
function getPrefix(name) {
  if (!name) return '';
  const idx = name.indexOf(':');
  if (idx !== -1) {
    return name.substring(0, idx).trim();
  }
  return name.trim();
}

const MONTH_NAMES = {
  '01': 'Janeiro',
  '02': 'Fevereiro',
  '03': 'Março',
  '04': 'Abril',
  '05': 'Maio',
  '06': 'Junho',
  '07': 'Julho',
  '08': 'Agosto',
  '09': 'Setembro',
  '10': 'Outubro',
  '11': 'Novembro',
  '12': 'Dezembro'
};

function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-');
  const name = MONTH_NAMES[month] || month;
  return `${name}/${year}`;
}

// Cálculo dinâmico de semanas por calendário (Domingo a Sábado)
function getMonthWeeks(year, monthNum) {
  const daysInMonth = new Date(Date.UTC(year, monthNum, 0)).getUTCDate();
  const weeks = [];
  let weekNum = 1;
  let currentStart = 1;

  for (let d = 1; d <= daysInMonth; d++) {
    const jsDate = new Date(Date.UTC(year, monthNum - 1, d));
    const dayOfWeek = jsDate.getUTCDay(); // 0 = Domingo, 6 = Sábado

    if (dayOfWeek === 6 || d === daysInMonth) {
      const mStr = String(monthNum).padStart(2, '0');
      const sStr = String(currentStart).padStart(2, '0');
      const eStr = String(d).padStart(2, '0');
      const label = currentStart === d
        ? `Semana ${weekNum} (${sStr}/${mStr})`
        : `Semana ${weekNum} (${sStr} a ${eStr}/${mStr})`;
      
      weeks.push({
        semana: weekNum,
        startDay: currentStart,
        endDay: d,
        label: label
      });
      weekNum++;
      currentStart = d + 1;
    }
  }
  return weeks;
}

// Mapear regionais utilizando a coluna B: MESOREGIÃO GEOGRÁFICA
const regionMapByPrefix = {};
const regionMapByName = {};

rowsRegion.forEach(r => {
  const filial = r['FILIAL'] ? String(r['FILIAL']).trim() : '';
  const filialCode = r['Filial Código'] ? String(r['Filial Código']).trim() : getPrefix(filial);
  const mesoregion = r['MESOREGIÃO GEOGRÁFICA'] ? String(r['MESOREGIÃO GEOGRÁFICA']).trim() : 'OUTRAS';
  const gerenteLoja = r['Gerente'] ? String(r['Gerente']).trim() : '';

  if (filial || filialCode) {
    const data = { mesoregion, gerenteLoja, originalName: filial };
    if (filial) regionMapByName[filial] = data;
    if (filialCode) regionMapByPrefix[filialCode] = data;
    const prefix = getPrefix(filial);
    if (prefix) regionMapByPrefix[prefix] = data;
  }
});

// Formatadores auxiliares (Padronizado estritamente para TN)
function formatCurrency(val) {
  return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function formatNumber(val) {
  return val.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
}
function formatTon(val) {
  return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' TN';
}

// Helper para formatar o nome do vendedor: Primeiro Nome + Filial
function formatSellerName(rawName, filialName) {
  if (!rawName || rawName === 'Desconhecido') return 'Desconhecido';
  const parts = rawName.split(',');
  let firstName = '';
  if (parts.length > 1) {
    firstName = parts[1].trim().split(' ')[0];
  } else {
    firstName = rawName.trim().split(' ')[0];
  }
  if (!firstName) firstName = rawName;
  return `${firstName} - ${filialName}`;
}

// Estrutura de acumulação por mês
const monthDataMap = {};

function getOrCreateMonthData(monthKey, year, monthNum, monthStr) {
  if (!monthDataMap[monthKey]) {
    const monthWeeks = getMonthWeeks(year, monthNum);
    const semanalAgg = {};

    monthWeeks.forEach(w => {
      semanalAgg[w.semana] = {
        semana: w.semana,
        label: w.label,
        faturamento: 0,
        toneladas: 0,
        pedidos: 0,
        filiais: {},
        vendedores: {},
        produtos: {}
      };
    });

    monthDataMap[monthKey] = {
      monthKey,
      label: formatMonthLabel(monthKey),
      monthNum: monthStr,
      monthWeeks,
      totalFaturamento: 0,
      totalEmbalagens: 0,
      totalToneladas: 0,
      totalPedidos: 0,
      sellersSet: new Set(),
      filiaisSet: new Set(),
      filiaisAgg: {},
      sellersAgg: {},
      productsAgg: {},
      semanalAgg
    };
  }
  return monthDataMap[monthKey];
}

console.log('Processando linhas da planilha de vendas (Filtro: grupo "Fertilizante Solo")...');
rowsSales.forEach(r => {
  const filialRaw = r['Filial'];
  if (!filialRaw || typeof filialRaw !== 'string' || filialRaw.includes('Total') || filialRaw.includes('Filtros')) {
    return;
  }

  const group = r['Grupo - Nome'] ? r['Grupo - Nome'].trim() : '';
  if (group !== 'Fertilizante Solo') {
    return;
  }

  const serialDate = r['DATA'];
  if (typeof serialDate !== 'number') {
    return;
  }

  const jsDate = new Date((serialDate - 25569) * 86400 * 1000);
  const year = jsDate.getUTCFullYear();
  const monthNum = jsDate.getUTCMonth() + 1;
  const monthStr = String(monthNum).padStart(2, '0');
  const day = jsDate.getUTCDate();
  const monthKey = `${year}-${monthStr}`;

  const mData = getOrCreateMonthData(monthKey, year, monthNum, monthStr);

  const fat = parseFloat(r['Faturamento']) || 0;
  const emb = parseFloat(r['Qtde Embalagem']) || 0;
  const kgl = parseFloat(r['Qtde Kg/L']) || 0;
  
  const sellerRaw = r['Vendedor'] ? r['Vendedor'].trim() : 'Desconhecido';
  const itemDesc = r['Item - Descrição'] ? r['Item - Descrição'].trim() : 'Desconhecido';
  const itemCode = r['Item'] ? r['Item'].toString().trim() : '';
  const productKey = itemCode ? `[${itemCode}] ${itemDesc}` : itemDesc;

  // Localizar a semana correspondente com base no dia do mês
  const semObj = mData.monthWeeks.find(w => day >= w.startDay && day <= w.endDay);
  const semNum = semObj ? semObj.semana : 0;

  mData.totalFaturamento += fat;
  mData.totalEmbalagens += emb;
  mData.totalToneladas += kgl; 
  mData.totalPedidos++;

  mData.sellersSet.add(sellerRaw);
  const fKey = filialRaw.trim();
  mData.filiaisSet.add(fKey);

  if (!mData.filiaisAgg[fKey]) {
    mData.filiaisAgg[fKey] = { name: fKey, faturamento: 0, toneladas: 0, embalagens: 0, pedidos: 0 };
  }
  mData.filiaisAgg[fKey].faturamento += fat;
  mData.filiaisAgg[fKey].toneladas += kgl;
  mData.filiaisAgg[fKey].embalagens += emb;
  mData.filiaisAgg[fKey].pedidos++;

  if (!mData.sellersAgg[sellerRaw]) {
    mData.sellersAgg[sellerRaw] = { rawName: sellerRaw, faturamento: 0, toneladas: 0, pedidos: 0, filial: fKey };
  }
  mData.sellersAgg[sellerRaw].faturamento += fat;
  mData.sellersAgg[sellerRaw].toneladas += kgl;
  mData.sellersAgg[sellerRaw].pedidos++;

  if (!mData.productsAgg[productKey]) {
    mData.productsAgg[productKey] = { name: itemDesc, code: itemCode, faturamento: 0, toneladas: 0, embalagens: 0, group };
  }
  mData.productsAgg[productKey].faturamento += fat;
  mData.productsAgg[productKey].toneladas += kgl;
  mData.productsAgg[productKey].embalagens += emb;

  if (semNum > 0 && mData.semanalAgg[semNum]) {
    const sem = mData.semanalAgg[semNum];
    sem.faturamento += fat;
    sem.toneladas += kgl;
    sem.pedidos++;

    if (!sem.filiais[fKey]) {
      sem.filiais[fKey] = { name: fKey, faturamento: 0, toneladas: 0, pedidos: 0 };
    }
    sem.filiais[fKey].faturamento += fat;
    sem.filiais[fKey].toneladas += kgl;
    sem.filiais[fKey].pedidos++;

    if (!sem.vendedores[sellerRaw]) {
      sem.vendedores[sellerRaw] = { rawName: sellerRaw, faturamento: 0, toneladas: 0, pedidos: 0, filial: fKey };
    }
    sem.vendedores[sellerRaw].faturamento += fat;
    sem.vendedores[sellerRaw].toneladas += kgl;
    sem.vendedores[sellerRaw].pedidos++;

    if (!sem.produtos[productKey]) {
      sem.produtos[productKey] = { name: itemDesc, code: itemCode, faturamento: 0, toneladas: 0 };
    }
    sem.produtos[productKey].faturamento += fat;
    sem.produtos[productKey].toneladas += kgl;
  }
});

// Ordenar meses em ordem decrescente (ex: 2026-08, 2026-07)
const sortedMonthKeys = Object.keys(monthDataMap).sort().reverse();
console.log('Meses detectados na planilha:', sortedMonthKeys);

if (sortedMonthKeys.length === 0) {
  console.error('Nenhum dado válido encontrado para o grupo Fertilizante Solo!');
  process.exit(1);
}

const availableMonths = sortedMonthKeys.map(mKey => ({
  id: mKey,
  label: monthDataMap[mKey].label,
  monthNum: monthDataMap[mKey].monthNum
}));

const monthsExportMap = {};

sortedMonthKeys.forEach(mKey => {
  const mData = monthDataMap[mKey];
  const mesoregionsAgg = {};
  const unmappedFiliais = [];

  Object.values(mData.filiaisAgg).forEach(f => {
    const mapping = regionMapByName[f.name] || regionMapByPrefix[getPrefix(f.name)];
    if (mapping) {
      f.mesoregion = mapping.mesoregion;
      f.gerenteLoja = mapping.gerenteLoja;
      
      if (!mesoregionsAgg[mapping.mesoregion]) {
        mesoregionsAgg[mapping.mesoregion] = {
          name: mapping.mesoregion,
          faturamento: 0,
          toneladas: 0,
          embalagens: 0,
          pedidos: 0,
          filiais: []
        };
      }
      mesoregionsAgg[mapping.mesoregion].faturamento += f.faturamento;
      mesoregionsAgg[mapping.mesoregion].toneladas += f.toneladas;
      mesoregionsAgg[mapping.mesoregion].embalagens += f.embalagens;
      mesoregionsAgg[mapping.mesoregion].pedidos += f.pedidos;
      mesoregionsAgg[mapping.mesoregion].filiais.push(f);
    } else {
      f.mesoregion = 'Não Mapeado';
      unmappedFiliais.push(f);
    }
  });

  Object.values(mesoregionsAgg).forEach(m => {
    m.filiais.sort((a, b) => b.toneladas - a.toneladas); 
    
    m.filiais.forEach(f => {
      f.faturamentoFormatado = formatCurrency(f.faturamento);
      f.toneladasFormatado = formatTon(f.toneladas);
      f.share = (f.faturamento / mData.totalFaturamento) * 100;
      f.shareToneladas = (f.toneladas / mData.totalToneladas) * 100;
    });

    m.faturamentoFormatado = formatCurrency(m.faturamento);
    m.toneladasFormatado = formatTon(m.toneladas);
    
    m.share = (m.faturamento / mData.totalFaturamento) * 100;
    m.shareToneladas = (m.toneladas / mData.totalToneladas) * 100;
  });

  const filiaisRanking = Object.values(mData.filiaisAgg)
    .sort((a, b) => b.toneladas - a.toneladas)
    .map(f => ({
      ...f,
      faturamentoFormatado: formatCurrency(f.faturamento),
      toneladasFormatado: formatTon(f.toneladas),
      share: (f.faturamento / mData.totalFaturamento) * 100,
      shareToneladas: (f.toneladas / mData.totalToneladas) * 100
    }));

  const vendedoresRanking = Object.values(mData.sellersAgg)
    .sort((a, b) => b.toneladas - a.toneladas)
    .map(s => ({
      name: formatSellerName(s.rawName, s.filial),
      faturamento: s.faturamento,
      faturamentoFormatado: formatCurrency(s.faturamento),
      toneladas: s.toneladas,
      toneladasFormatado: formatTon(s.toneladas),
      pedidos: s.pedidos,
      filial: s.filial
    }));

  const produtosRanking = Object.values(mData.productsAgg)
    .sort((a, b) => b.toneladas - a.toneladas)
    .map(p => ({
      ...p,
      faturamentoFormatado: formatCurrency(p.faturamento),
      toneladasFormatado: formatTon(p.toneladas)
    }));

  const semanalExport = {};
  const semanasResumo = [];

  Object.values(mData.semanalAgg).forEach(sem => {
    const vRanking = Object.values(sem.vendedores)
      .sort((a, b) => b.toneladas - a.toneladas)
      .map(s => ({
        name: formatSellerName(s.rawName, s.filial),
        faturamento: s.faturamento,
        faturamentoFormatado: formatCurrency(s.faturamento),
        toneladas: s.toneladas,
        toneladasFormatado: formatTon(s.toneladas),
        pedidos: s.pedidos,
        filial: s.filial
      }));

    const fRanking = Object.values(sem.filiais)
      .sort((a, b) => b.toneladas - a.toneladas)
      .map(f => {
        const mapping = regionMapByName[f.name] || regionMapByPrefix[getPrefix(f.name)];
        return {
          name: f.name,
          faturamento: f.faturamento,
          faturamentoFormatado: formatCurrency(f.faturamento),
          toneladas: f.toneladas,
          toneladasFormatado: formatTon(f.toneladas),
          pedidos: f.pedidos,
          mesoregion: mapping ? mapping.mesoregion : 'Não Mapeado',
          share: sem.faturamento > 0 ? (f.faturamento / sem.faturamento) * 100 : 0,
          shareToneladas: sem.toneladas > 0 ? (f.toneladas / sem.toneladas) * 100 : 0
        };
      });

    const pRanking = Object.values(sem.produtos)
      .sort((a, b) => b.toneladas - a.toneladas)
      .map(p => ({
        name: p.name,
        code: p.code,
        faturamento: p.faturamento,
        faturamentoFormatado: formatCurrency(p.faturamento),
        toneladas: p.toneladas,
        toneladasFormatado: formatTon(p.toneladas),
        embalagens: 0
      }));

    const regionalWeekly = {};
    fRanking.forEach(f => {
      if (f.mesoregion && f.mesoregion !== 'Não Mapeado') {
        const regName = f.mesoregion;
        if (!regionalWeekly[regName]) {
          regionalWeekly[regName] = {
            name: regName,
            faturamento: 0,
            toneladas: 0,
            pedidos: 0,
            filiais: []
          };
        }
        regionalWeekly[regName].faturamento += f.faturamento;
        regionalWeekly[regName].toneladas += f.toneladas;
        regionalWeekly[regName].pedidos += f.pedidos;
        regionalWeekly[regName].filiais.push(f);
      }
    });

    const mRanking = Object.values(regionalWeekly)
      .sort((a, b) => b.toneladas - a.toneladas)
      .map(r => {
        r.faturamentoFormatado = formatCurrency(r.faturamento);
        r.toneladasFormatado = formatTon(r.toneladas);
        r.share = sem.faturamento > 0 ? (r.faturamento / sem.faturamento) * 100 : 0;
        r.shareToneladas = sem.toneladas > 0 ? (r.toneladas / sem.toneladas) * 100 : 0;
        return r;
      });

    semanalExport[sem.semana] = {
      kpis: {
        faturamentoTotal: sem.faturamento,
        faturamentoFormatado: formatCurrency(sem.faturamento),
        volumeTotal: sem.toneladas,
        volumeFormatado: formatTon(sem.toneladas),
        pedidosTotal: sem.pedidos,
        pedidosFormatado: formatNumber(sem.pedidos),
        vendedoresTotal: new Set(Object.values(sem.vendedores).map(v => v.rawName)).size,
        filiaisTotal: Object.keys(sem.filiais).length
      },
      rankings: {
        vendedores: vRanking,
        filiais: fRanking,
        produtos: pRanking,
        mesorregionais: mRanking
      }
    };

    semanasResumo.push({
      semana: `Semana ${sem.semana}`,
      label: sem.label,
      faturamento: sem.faturamento,
      faturamentoFormatado: formatCurrency(sem.faturamento),
      toneladas: sem.toneladas,
      toneladasFormatado: formatTon(sem.toneladas)
    });
  });

  monthsExportMap[mKey] = {
    monthKey: mKey,
    label: mData.label,
    monthNum: mData.monthNum,
    kpis: {
      faturamentoTotal: mData.totalFaturamento,
      faturamentoFormatado: formatCurrency(mData.totalFaturamento),
      pedidosTotal: mData.totalPedidos,
      pedidosFormatado: formatNumber(mData.totalPedidos),
      embalagensTotal: mData.totalEmbalagens,
      embalagensFormatado: formatNumber(mData.totalEmbalagens),
      volumeTotal: mData.totalToneladas,
      volumeFormatado: formatTon(mData.totalToneladas),
      vendedoresTotal: mData.sellersSet.size,
      filiaisTotal: mData.filiaisSet.size
    },
    mesorregionais: Object.values(mesoregionsAgg).sort((a, b) => b.toneladas - a.toneladas),
    naoMapeados: {
      filiais: unmappedFiliais
    },
    rankings: {
      filiais: filiaisRanking,
      vendedores: vendedoresRanking,
      produtos: produtosRanking
    },
    semanal: semanalExport,
    semanasResumo
  };
});

const finalData = {
  latestMonth: sortedMonthKeys[0], // O mês mais recente (ex: 2026-08)
  availableMonths: availableMonths,
  months: monthsExportMap
};

fs.writeFileSync(path.join(dataDir, 'dashboard_data.json'), JSON.stringify(finalData, null, 2), 'utf-8');
console.log(`dashboard_data.json atualizado com sucesso com calendário Domingo-Sábado! Mês mais recente: ${finalData.latestMonth} (${monthDataMap[finalData.latestMonth].label})`);
