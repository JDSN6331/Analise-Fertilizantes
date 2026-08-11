// ==========================================================================
// PAINEL DE VENDAS DE FERTILIZANTE DE SOLO — CONTROLE MULTI-MÊS E MÊS VIGENTE
// ==========================================================================

interface KPIs {
  faturamentoTotal: number;
  faturamentoFormatado: string;
  pedidosTotal: number;
  pedidosFormatado: string;
  embalagensTotal: number;
  embalagensFormatado: string;
  volumeTotal: number;
  volumeFormatado: string;
  vendedoresTotal: number;
  filiaisTotal: number;
}

interface Filial {
  name: string;
  faturamento: number;
  faturamentoFormatado: string;
  toneladas: number;
  toneladasFormatado: string;
  embalagens: number;
  pedidos: number;
  mesoregion?: string;
  gerenteLoja?: string;
  share?: number;
  shareToneladas?: number;
}

interface Mesorregional {
  name: string;
  faturamento: number;
  faturamentoFormatado: string;
  share: number;
  toneladas: number;
  toneladasFormatado: string;
  shareToneladas: number;
  pedidos: number;
  embalagens: number;
  filiais: Filial[];
}

interface Vendedor {
  name: string;
  faturamento: number;
  faturamentoFormatado: string;
  toneladas: number;
  toneladasFormatado: string;
  pedidos: number;
  filial: string;
}

interface Rankings {
  filiais: Filial[];
  vendedores: Vendedor[];
  produtos: any[];
}

interface SemanaData {
  kpis: KPIs;
  rankings: {
    vendedores: Vendedor[];
    filiais: Filial[];
    produtos: any[];
    mesorregionais: Mesorregional[];
  };
}

interface SemanaResumo {
  semana: string;
  label: string;
  faturamento: number;
  faturamentoFormatado: string;
  toneladas: number;
  toneladasFormatado: string;
}

interface MonthData {
  monthKey: string;
  label: string;
  monthNum: string;
  kpis: KPIs;
  mesorregionais: Mesorregional[];
  naoMapeados: any;
  rankings: Rankings;
  semanal: { [key: string]: SemanaData };
  semanasResumo: SemanaResumo[];
}

interface AvailableMonth {
  id: string;
  label: string;
  monthNum: string;
}

interface DashboardData {
  latestMonth: string;
  availableMonths: AvailableMonth[];
  months: { [monthKey: string]: MonthData };
}

// ==========================================================================
// ESTADO GLOBAL DA APLICAÇÃO
// ==========================================================================
let dashboardData: DashboardData | null = null;
let selectedMonth: string = ''; // ID do mês selecionado (ex: '2026-08')
let selectedWeek: string = 'todos'; // 'todos' ou '1', '2', '3', '4', '5'
let selectedMetric: 'volume' | 'faturamento' = 'volume'; // 'volume' (TN) ou 'faturamento' (R$)
let selectedPodiumRegion: string = 'todas'; // 'todas' ou 'REGIONAL - 1' .. '6'
let searchQuery: string = '';

// Elementos do DOM
const loader = document.getElementById('loader') as HTMLElement;
const monthSelect = document.getElementById('month-select-global') as HTMLSelectElement;
const weekSelect = document.getElementById('week-select-global') as HTMLSelectElement;
const searchInput = document.getElementById('branch-search-input') as HTMLInputElement;
const headerPeriodBadge = document.getElementById('header-period-badge') as HTMLElement;
const weeklyEvolutionTitleSpan = document.getElementById('weekly-evolution-title-span') as HTMLElement;

// Helper auxiliar para obter os dados do mês selecionado
function getCurrentMonthData(): MonthData | null {
  if (!dashboardData || !selectedMonth || !dashboardData.months[selectedMonth]) {
    return null;
  }
  return dashboardData.months[selectedMonth];
}

// ==========================================================================
// INICIALIZAÇÃO
// ==========================================================================
async function init() {
  try {
    const response = await fetch('./data/dashboard_data.json');
    if (!response.ok) {
      throw new Error('Falha ao carregar o arquivo JSON de dados');
    }
    dashboardData = await response.json();

    if (loader) loader.style.display = 'none';

    if (dashboardData) {
      // Definir o mês padrão como o mês mais recente (latestMonth)
      selectedMonth = dashboardData.latestMonth || dashboardData.availableMonths[0]?.id || '';
      
      populateMonthSelectOptions();
      updateWeekSelectOptions();
      setupEventListeners();
      renderDashboard();
    }
  } catch (error) {
    console.error('Erro na inicialização do painel:', error);
    if (loader) {
      loader.innerHTML = `
        <div style="color: #ef4444; font-weight: 700; font-size: 1.2rem;">🚨 Erro ao carregar dados</div>
        <p style="margin-top: 0.5rem; color: #475569;">Por favor, verifique se o arquivo public/data/dashboard_data.json foi criado.</p>
      `;
    }
  }
}

// Preencher o seletor de meses
function populateMonthSelectOptions() {
  if (!dashboardData || !monthSelect) return;
  monthSelect.innerHTML = dashboardData.availableMonths.map(m => `
    <option value="${m.id}">${m.label}${m.id === dashboardData?.latestMonth ? ' (Mês Vigente)' : ''}</option>
  `).join('');
  monthSelect.value = selectedMonth;
}

// Preencher o seletor de semanas dinamicamente de acordo com o mês selecionado
function updateWeekSelectOptions() {
  const currentMonthData = getCurrentMonthData();
  if (!currentMonthData || !weekSelect) return;

  const semanasResumo = currentMonthData.semanasResumo || [];
  
  let optionsHtml = `<option value="todos">${currentMonthData.label} (Mês Completo)</option>`;
  semanasResumo.forEach((sem, idx) => {
    const weekNum = (idx + 1).toString();
    optionsHtml += `<option value="${weekNum}">${sem.label}</option>`;
  });

  weekSelect.innerHTML = optionsHtml;
  weekSelect.value = selectedWeek;
}

// Configuração dos Event Listeners
function setupEventListeners() {
  // Listener do Seletor de Mês
  if (monthSelect) {
    monthSelect.addEventListener('change', (e) => {
      selectedMonth = (e.target as HTMLSelectElement).value;
      selectedWeek = 'todos';
      updateWeekSelectOptions();
      renderDashboard();
    });
  }

  // Listener do Seletor de Semana
  if (weekSelect) {
    weekSelect.addEventListener('change', (e) => {
      selectedWeek = (e.target as HTMLSelectElement).value;
      renderDashboard();
    });
  }

  // Alternador de Métrica (Volume vs Faturamento)
  const toggleBtns = document.querySelectorAll('.btn-toggle');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const metric = btn.getAttribute('data-metric') as 'volume' | 'faturamento';
      if (metric) {
        selectedMetric = metric;
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderDashboard();
      }
    });
  });

  // Filtro de Regional do Pódio
  const podiumRegionSelect = document.getElementById('podium-region-filter') as HTMLSelectElement;
  if (podiumRegionSelect) {
    podiumRegionSelect.value = 'todas';
    selectedPodiumRegion = 'todas';
    podiumRegionSelect.addEventListener('change', (e) => {
      selectedPodiumRegion = (e.target as HTMLSelectElement).value;
      renderPodiums();
    });
  }

  // Input de Busca por Filial
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = (e.target as HTMLInputElement).value.toLowerCase().trim();
      renderBranchesTable();
    });
  }
}

// ==========================================================================
// RENDERIZAÇÃO COMPLETA DO DASHBOARD
// ==========================================================================
function renderDashboard() {
  const currentMonthData = getCurrentMonthData();
  if (!currentMonthData) return;

  // Atualizar textos dinâmicos do cabeçalho e títulos
  if (headerPeriodBadge) {
    headerPeriodBadge.textContent = `Período ${currentMonthData.label}`;
  }
  if (weeklyEvolutionTitleSpan) {
    weeklyEvolutionTitleSpan.textContent = `(${currentMonthData.label})`;
  }

  renderKPIs();
  renderRegionalLegend();
  renderPodiums();
  renderMesoregions();
  renderTopSellers();
  renderWeeklyEvolution();
  renderBranchesTable();
  
  setTimeout(() => {
    animateBars();
  }, 80);
}

// --------------------------------------------------------------------------
// 1. RENDERIZAR KPIS GERAIS
// --------------------------------------------------------------------------
function renderKPIs() {
  const currentMonthData = getCurrentMonthData();
  if (!currentMonthData) return;

  const kpiContainer = document.getElementById('kpi-container');
  if (!kpiContainer) return;

  let volVal = currentMonthData.kpis.volumeFormatado;
  let fatVal = currentMonthData.kpis.faturamentoFormatado;
  let pedVal = currentMonthData.kpis.pedidosFormatado;
  let filVal = currentMonthData.kpis.filiaisTotal;

  if (selectedWeek !== 'todos' && currentMonthData.semanal[selectedWeek]) {
    const wKpis = currentMonthData.semanal[selectedWeek].kpis;
    volVal = wKpis.volumeFormatado;
    fatVal = wKpis.faturamentoFormatado;
    pedVal = wKpis.pedidosFormatado;
    filVal = wKpis.filiaisTotal;
  }

  kpiContainer.innerHTML = `
    <!-- Card Volume Total -->
    <div class="kpi-card ${selectedMetric === 'volume' ? 'gold-border' : ''}">
      <div class="kpi-icon-wrapper">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      </div>
      <div class="kpi-details">
        <span class="kpi-label">Volume Total (TN)</span>
        <span class="kpi-value text-green">${volVal}</span>
      </div>
    </div>

    <!-- Card Faturamento Total -->
    <div class="kpi-card ${selectedMetric === 'faturamento' ? 'gold-border' : ''}">
      <div class="kpi-icon-wrapper">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M6 12h.01M18 12h.01"></path>
        </svg>
      </div>
      <div class="kpi-details">
        <span class="kpi-label">Faturamento Total (R$)</span>
        <span class="kpi-value">${fatVal}</span>
      </div>
    </div>

    <!-- Card Volume de Pedidos -->
    <div class="kpi-card">
      <div class="kpi-icon-wrapper">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </div>
      <div class="kpi-details">
        <span class="kpi-label">Pedidos Emitidos</span>
        <span class="kpi-value">${pedVal}</span>
      </div>
    </div>

    <!-- Card Lojas Ativas -->
    <div class="kpi-card">
      <div class="kpi-icon-wrapper">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </div>
      <div class="kpi-details">
        <span class="kpi-label">Lojas com Vendas</span>
        <span class="kpi-value">${filVal}</span>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 2. LEGENDA DE REGIONAIS E LOJAS
// --------------------------------------------------------------------------
function renderRegionalLegend() {
  const currentMonthData = getCurrentMonthData();
  if (!currentMonthData) return;

  const container = document.getElementById('simple-legend-container');
  if (!container) return;

  const sortedRegions = [...currentMonthData.mesorregionais].sort((a, b) => a.name.localeCompare(b.name));

  container.innerHTML = sortedRegions.map(reg => {
    const filiaisList = reg.filiais || [];
    const storeNames = filiaisList.map(f => f.name.replace('Loja ', '').replace('Unidade Avançada ', 'UA ')).join(', ');

    return `
      <div class="simple-legend-row">
        <span class="legend-reg-badge">${reg.name}</span>
        <span class="legend-reg-count">(${filiaisList.length} lojas):</span>
        <span class="legend-reg-stores">${storeNames}</span>
      </div>
    `;
  }).join('');
}

// --------------------------------------------------------------------------
// 3. RENDERIZAR PÓDIO ÚNICO DE LOJAS (COM FILTRO DINÂMICO POR MESORREGIÃO)
// --------------------------------------------------------------------------
function renderPodiums() {
  const currentMonthData = getCurrentMonthData();
  if (!currentMonthData) return;

  const branchTag = document.getElementById('podium-branch-tag');
  const labelSuffix = selectedMetric === 'volume' ? 'Volume (TN)' : 'Faturamento (R$)';
  if (branchTag) branchTag.textContent = labelSuffix;

  let branchesList: Filial[] = currentMonthData.rankings.filiais;

  if (selectedWeek !== 'todos' && currentMonthData.semanal[selectedWeek]) {
    branchesList = currentMonthData.semanal[selectedWeek].rankings.filiais;
  }

  // Filtrar por Regional se o seletor não for 'todas'
  if (selectedPodiumRegion !== 'todas') {
    branchesList = branchesList.filter(b => b.mesoregion === selectedPodiumRegion);
  }

  // Ordenar conforme métrica selecionada
  const sortedBranches = [...branchesList].sort((a, b) => 
    selectedMetric === 'volume' ? b.toneladas - a.toneladas : b.faturamento - a.faturamento
  );

  // Render Pódio Único de Lojas
  renderPodiumComponent('podium-branches', sortedBranches.slice(0, 3).map(b => ({
    title: b.name,
    subText: b.mesoregion || '',
    valueFormatted: selectedMetric === 'volume' ? b.toneladasFormatado : b.faturamentoFormatado
  })));
}

interface PodiumItem {
  title: string;
  subText: string;
  valueFormatted: string;
}

function renderPodiumComponent(containerId: string, items: PodiumItem[]) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:var(--text-light); padding:2rem 0; font-weight:600">Nenhuma loja encontrada para a regional selecionada neste período.</p>`;
    return;
  }

  if (items.length < 3) {
    const first = items[0];
    const second = items[1] || null;

    container.innerHTML = `
      ${second ? `
      <!-- 2º Lugar -->
      <div class="podium-step rank-2">
        <div class="podium-avatar-wrapper">
          <div class="podium-badge-icon silver" title="2º Lugar">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="9" r="6"></circle>
              <path d="M15.5 15.5L18 22l-6-3-6 3 2.5-6.5"></path>
            </svg>
          </div>
          <div class="podium-name">${second.title}</div>
          <div class="podium-filial" title="${second.subText}">${second.subText}</div>
        </div>
        <div class="podium-spot">
          <span class="podium-value">${second.valueFormatted}</span>
          <span class="podium-label-tag">2º Lugar</span>
        </div>
      </div>` : ''}

      <!-- 1º Lugar (Campeão) -->
      <div class="podium-step rank-1">
        <div class="podium-avatar-wrapper">
          <div class="podium-badge-icon gold" title="1º Lugar Campeão">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"></path>
              <path d="M5 20h14"></path>
            </svg>
          </div>
          <div class="podium-name" style="font-size:0.95rem; font-weight:800">${first.title}</div>
          <div class="podium-filial" style="font-weight:600" title="${first.subText}">${first.subText}</div>
        </div>
        <div class="podium-spot">
          <span class="podium-value" style="font-size:1.15rem">${first.valueFormatted}</span>
          <span class="podium-label-tag">1º Lugar Líder</span>
        </div>
      </div>
    `;
    return;
  }

  const first = items[0];
  const second = items[1];
  const third = items[2];

  container.innerHTML = `
    <!-- 2º Lugar -->
    <div class="podium-step rank-2">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon silver" title="2º Lugar">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="9" r="6"></circle>
            <path d="M15.5 15.5L18 22l-6-3-6 3 2.5-6.5"></path>
          </svg>
        </div>
        <div class="podium-name">${second.title}</div>
        <div class="podium-filial" title="${second.subText}">${second.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value">${second.valueFormatted}</span>
        <span class="podium-label-tag">2º Lugar</span>
      </div>
    </div>

    <!-- 1º Lugar (Campeão) -->
    <div class="podium-step rank-1">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon gold" title="1º Lugar Campeão">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"></path>
            <path d="M5 20h14"></path>
          </svg>
        </div>
        <div class="podium-name" style="font-size:0.95rem; font-weight:800">${first.title}</div>
        <div class="podium-filial" style="font-weight:600" title="${first.subText}">${first.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value" style="font-size:1.15rem">${first.valueFormatted}</span>
        <span class="podium-label-tag">1º Lugar Líder</span>
      </div>
    </div>

    <!-- 3º Lugar -->
    <div class="podium-step rank-3">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon bronze" title="3º Lugar">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="9" r="6"></circle>
            <path d="M15.5 15.5L18 22l-6-3-6 3 2.5-6.5"></path>
          </svg>
        </div>
        <div class="podium-name">${third.title}</div>
        <div class="podium-filial" title="${third.subText}">${third.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value">${third.valueFormatted}</span>
        <span class="podium-label-tag">3º Lugar</span>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 4. RENDERIZAR MESORREGIÕES GEOGRÁFICAS
// --------------------------------------------------------------------------
function renderMesoregions() {
  const currentMonthData = getCurrentMonthData();
  if (!currentMonthData) return;

  const container = document.getElementById('mesoregions-list');
  if (!container) return;

  let regionsList: Mesorregional[] = currentMonthData.mesorregionais;
  if (selectedWeek !== 'todos' && currentMonthData.semanal[selectedWeek]) {
    regionsList = currentMonthData.semanal[selectedWeek].rankings.mesorregionais;
  }

  const sorted = [...regionsList].sort((a, b) => 
    selectedMetric === 'volume' ? b.toneladas - a.toneladas : b.faturamento - a.faturamento
  );

  const totalVol = sorted.reduce((sum, r) => sum + r.toneladas, 0) || 1;
  const totalFat = sorted.reduce((sum, r) => sum + r.faturamento, 0) || 1;

  container.innerHTML = sorted.map(m => {
    const valStr = selectedMetric === 'volume' ? m.toneladasFormatado : m.faturamentoFormatado;
    const secondaryValStr = selectedMetric === 'volume' ? m.faturamentoFormatado : m.toneladasFormatado;
    const shareVal = selectedMetric === 'volume' 
      ? (m.toneladas / totalVol) * 100 
      : (m.faturamento / totalFat) * 100;
    
    const filiaisCount = m.filiais ? m.filiais.length : 0;

    return `
      <div class="region-item">
        <div class="region-meta">
          <span class="region-title">${m.name}</span>
          <div class="region-value-group">
            <span class="region-value ${selectedMetric === 'volume' ? 'text-green' : 'text-gold'}">${valStr}</span>
            <span class="region-percent">Share: ${shareVal.toFixed(1)}%</span>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-bar ${selectedMetric === 'faturamento' ? 'bar-gold' : ''}" data-width="${shareVal.toFixed(1)}%"></div>
        </div>
        <span class="analyst-name">${filiaisCount} Lojas ativas • ${selectedMetric === 'volume' ? 'Faturamento: ' + secondaryValStr : 'Volume: ' + secondaryValStr}</span>
      </div>
    `;
  }).join('');
}

// --------------------------------------------------------------------------
// 5. RENDERIZAR MELHORES VENDEDORES
// --------------------------------------------------------------------------
function renderTopSellers() {
  const currentMonthData = getCurrentMonthData();
  if (!currentMonthData) return;

  const container = document.getElementById('top-sellers-list');
  if (!container) return;

  let sellersList: Vendedor[] = currentMonthData.rankings.vendedores;
  if (selectedWeek !== 'todos' && currentMonthData.semanal[selectedWeek]) {
    sellersList = currentMonthData.semanal[selectedWeek].rankings.vendedores;
  }

  // Ordenar conforme métrica selecionada e pegar os Top 10
  const sorted = [...sellersList].sort((a, b) => 
    selectedMetric === 'volume' ? b.toneladas - a.toneladas : b.faturamento - a.faturamento
  ).slice(0, 10);

  if (sorted.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:var(--text-light); padding:1rem 0">Nenhum vendedor no período</p>`;
    return;
  }

  container.innerHTML = sorted.map((v, idx) => {
    const valStr = selectedMetric === 'volume' ? v.toneladasFormatado : v.faturamentoFormatado;
    const secStr = selectedMetric === 'volume' ? v.faturamentoFormatado : v.toneladasFormatado;

    let rankClass = 'rank-pos-default';
    if (idx === 0) rankClass = 'rank-pos-1';
    else if (idx === 1) rankClass = 'rank-pos-2';
    else if (idx === 2) rankClass = 'rank-pos-3';

    return `
      <div class="seller-item">
        <span class="seller-rank-badge ${rankClass}">${idx + 1}</span>
        <div class="seller-info">
          <div class="seller-name-row">
            <span class="seller-name">${v.name}</span>
            <span class="seller-val ${selectedMetric === 'volume' ? 'text-green' : 'text-gold'}">${valStr}</span>
          </div>
          <span class="seller-sub">${v.filial} • ${selectedMetric === 'volume' ? 'Fat: ' + secStr : 'Vol: ' + secStr}</span>
        </div>
      </div>
    `;
  }).join('');
}

// --------------------------------------------------------------------------
// 6. RENDERIZAR EVOLUÇÃO SEMANAL (MÁSCARA DE TEXTO SVG / HALO CONTRA LINHAS)
// --------------------------------------------------------------------------
function renderWeeklyEvolution() {
  const currentMonthData = getCurrentMonthData();
  if (!currentMonthData) return;

  const container = document.getElementById('weekly-evolution-list');
  if (!container) return;

  const resumo = currentMonthData.semanasResumo;
  if (resumo.length === 0) return;

  const maxVol = Math.max(...resumo.map(s => s.toneladas)) || 1;
  const maxFat = Math.max(...resumo.map(s => s.faturamento)) || 1;

  const svgWidth = 900;
  const svgHeight = 320;
  const paddingTop = 60;
  const paddingBottom = 60;
  const paddingLeft = 70;
  const paddingRight = 70;

  const usableWidth = svgWidth - paddingLeft - paddingRight;
  const usableHeight = svgHeight - paddingTop - paddingBottom;

  const numPoints = resumo.length;
  const stepX = usableWidth / (numPoints - 1);

  const volPoints: { x: number; y: number; data: SemanaResumo }[] = [];
  const fatPoints: { x: number; y: number; data: SemanaResumo }[] = [];

  resumo.forEach((s, idx) => {
    const x = paddingLeft + idx * stepX;
    const yVol = paddingTop + (1 - (s.toneladas / maxVol)) * usableHeight;
    const yFat = paddingTop + (1 - (s.faturamento / maxFat)) * usableHeight;

    volPoints.push({ x, y: yVol, data: s });
    fatPoints.push({ x, y: yFat, data: s });
  });

  const volPathD = volPoints.map((pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `L ${pt.x} ${pt.y}`)).join(' ');
  const fatPathD = fatPoints.map((pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `L ${pt.x} ${pt.y}`)).join(' ');

  const gridLines = [0, 0.33, 0.66, 1].map(pct => {
    const y = paddingTop + pct * usableHeight;
    return `<line x1="${paddingLeft}" y1="${y}" x2="${svgWidth - paddingRight}" y2="${y}" stroke="#f1f5f9" stroke-width="1.5" stroke-dasharray="4 4" />`;
  }).join('');

  const xAxisLabels = resumo.map((_, idx) => {
    const x = paddingLeft + idx * stepX;
    const labelText = `Semana ${idx + 1}`;
    return `<text x="${x}" y="${svgHeight - 15}" text-anchor="middle" font-size="12" font-weight="700" fill="#475569">${labelText}</text>`;
  }).join('');

  const dataLabels = resumo.map((_, idx) => {
    const ptVol = volPoints[idx];
    const ptFat = fatPoints[idx];

    let volY = ptVol.y - 24;
    let fatY = ptFat.y + 26;

    if (ptFat.y < ptVol.y - 10) {
      fatY = ptFat.y - 24;
      volY = ptVol.y + 26;
    } else if (Math.abs(ptVol.y - ptFat.y) < 15) {
      volY = ptVol.y - 24;
      fatY = ptFat.y + 26;
    }

    if (fatY > 262) fatY = 262;
    if (volY > 262) volY = 262;

    return `
      <g class="chart-clean-labels">
        <text x="${ptVol.x}" y="${volY}" text-anchor="middle" font-size="11.5" font-weight="800" fill="#1b4332" stroke="#ffffff" stroke-width="5" stroke-linejoin="round" paint-order="stroke fill">${ptVol.data.toneladasFormatado}</text>
        <text x="${ptFat.x}" y="${fatY}" text-anchor="middle" font-size="11" font-weight="700" fill="#b89218" stroke="#ffffff" stroke-width="5" stroke-linejoin="round" paint-order="stroke fill">${ptFat.data.faturamentoFormatado}</text>
      </g>
    `;
  }).join('');

  const volDots = volPoints.map((pt) => `
    <circle cx="${pt.x}" cy="${pt.y}" r="6.5" fill="#2d6a4f" stroke="#ffffff" stroke-width="2.5" />
  `).join('');

  const fatDots = fatPoints.map((pt) => `
    <circle cx="${pt.x}" cy="${pt.y}" r="6.5" fill="#d4af37" stroke="#ffffff" stroke-width="2.5" />
  `).join('');

  container.innerHTML = `
    <div class="line-chart-wrapper">
      <svg viewBox="0 0 ${svgWidth} ${svgHeight}" class="line-chart-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="volGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1b4332" />
            <stop offset="100%" stop-color="#40916c" />
          </linearGradient>
          <linearGradient id="fatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#b89218" />
            <stop offset="100%" stop-color="#f3df95" />
          </linearGradient>
        </defs>

        ${gridLines}

        <path d="${fatPathD}" fill="none" stroke="url(#fatGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="${volPathD}" fill="none" stroke="url(#volGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

        ${fatDots}
        ${volDots}

        ${dataLabels}

        ${xAxisLabels}
      </svg>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 7. RENDERIZAR TABELA COMPLETA DE LOJAS / FILIAIS
// --------------------------------------------------------------------------
function renderBranchesTable() {
  const currentMonthData = getCurrentMonthData();
  if (!currentMonthData) return;

  const tbody = document.getElementById('branches-table-body');
  if (!tbody) return;

  let branchesList: Filial[] = currentMonthData.rankings.filiais;
  if (selectedWeek !== 'todos' && currentMonthData.semanal[selectedWeek]) {
    branchesList = currentMonthData.semanal[selectedWeek].rankings.filiais;
  }

  let filtered = branchesList.filter(f => {
    const nameMatch = f.name.toLowerCase().includes(searchQuery);
    const regMatch = f.mesoregion ? f.mesoregion.toLowerCase().includes(searchQuery) : false;
    return nameMatch || regMatch;
  });

  filtered.sort((a, b) => 
    selectedMetric === 'volume' ? b.toneladas - a.toneladas : b.faturamento - a.faturamento
  );

  const totalVol = branchesList.reduce((sum, f) => sum + f.toneladas, 0) || 1;
  const totalFat = branchesList.reduce((sum, f) => sum + f.faturamento, 0) || 1;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-light); padding:1.5rem 0">Nenhuma loja encontrada com o filtro digitado.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((f, idx) => {
    const shareVol = (f.toneladas / totalVol) * 100;
    const shareFat = (f.faturamento / totalFat) * 100;

    return `
      <tr>
        <td><span class="rank-pos ${idx < 3 ? 'top-rank' : ''}">${idx + 1}</span></td>
        <td><strong>${f.name}</strong></td>
        <td><span class="region-badge">${f.mesoregion || 'Não Mapeado'}</span></td>
        <td class="text-right ${selectedMetric === 'volume' ? 'text-green' : ''}" style="font-weight:700">${f.toneladasFormatado}</td>
        <td class="text-right" style="color:var(--medium-green)">${shareVol.toFixed(2)}%</td>
        <td class="text-right ${selectedMetric === 'faturamento' ? 'text-gold' : ''}" style="font-weight:700">${f.faturamentoFormatado}</td>
        <td class="text-right" style="color:var(--accent-gold)">${shareFat.toFixed(2)}%</td>
        <td class="text-right">${f.pedidos ? f.pedidos.toLocaleString('pt-BR') : '-'}</td>
      </tr>
    `;
  }).join('');
}

// Helper para animar barras
function animateBars() {
  const bars = document.querySelectorAll('.progress-bar');
  bars.forEach(bar => {
    const width = (bar as HTMLElement).getAttribute('data-width');
    if (width) {
      (bar as HTMLElement).style.width = width;
    }
  });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);
