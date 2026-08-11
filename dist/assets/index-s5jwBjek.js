(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))l(a);new MutationObserver(a=>{for(const e of a)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function i(a){const e={};return a.integrity&&(e.integrity=a.integrity),a.referrerPolicy&&(e.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?e.credentials="include":a.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(a){if(a.ep)return;a.ep=!0;const e=i(a);fetch(a.href,e)}})();let n=null,c="todos",d="volume",m="";const p=document.getElementById("loader"),g=document.getElementById("week-select-global"),h=document.getElementById("branch-search-input");async function w(){try{const s=await fetch("./data/dashboard_data.json");if(!s.ok)throw new Error("Falha ao carregar o arquivo JSON de dados");n=await s.json(),p&&(p.style.display="none"),n&&(F(),v())}catch(s){console.error("Erro na inicialização do painel:",s),p&&(p.innerHTML=`
        <div style="color: #ef4444; font-weight: 700; font-size: 1.2rem;">🚨 Erro ao carregar dados</div>
        <p style="margin-top: 0.5rem; color: #475569;">Por favor, verifique se o arquivo public/data/dashboard_data.json foi criado.</p>
      `)}}function F(){g&&g.addEventListener("change",t=>{c=t.target.value,v()});const s=document.querySelectorAll(".btn-toggle");s.forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-metric");i&&(d=i,s.forEach(l=>l.classList.remove("active")),t.classList.add("active"),v())})}),h&&h.addEventListener("input",t=>{m=t.target.value.toLowerCase().trim(),n&&k()})}function v(){n&&(x(),b(),$(),L(),k(),setTimeout(()=>{T()},80))}function x(){if(!n)return;const s=document.getElementById("kpi-container");if(!s)return;let t=n.kpis.volumeFormatado,i=n.kpis.faturamentoFormatado,l=n.kpis.pedidosFormatado,a=n.kpis.filiaisTotal;if(c!=="todos"&&n.semanal[c]){const e=n.semanal[c].kpis;t=e.volumeFormatado,i=e.faturamentoFormatado,l=e.pedidosFormatado,a=e.filiaisTotal}s.innerHTML=`
    <!-- Card Volume Total -->
    <div class="kpi-card ${d==="volume"?"gold-border":""}">
      <div class="kpi-icon-wrapper">
        <!-- Flaticon Weight / Ton Icon -->
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      </div>
      <div class="kpi-details">
        <span class="kpi-label">Volume Total (TN)</span>
        <span class="kpi-value text-green">${t}</span>
      </div>
    </div>

    <!-- Card Faturamento Total -->
    <div class="kpi-card ${d==="faturamento"?"gold-border":""}">
      <div class="kpi-icon-wrapper">
        <!-- Flaticon Currency / Dollar Badge Icon -->
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M6 12h.01M18 12h.01"></path>
        </svg>
      </div>
      <div class="kpi-details">
        <span class="kpi-label">Faturamento Total (R$)</span>
        <span class="kpi-value">${i}</span>
      </div>
    </div>

    <!-- Card Volume de Pedidos -->
    <div class="kpi-card">
      <div class="kpi-icon-wrapper">
        <!-- Flaticon Receipt / Invoice Icon -->
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
        <span class="kpi-value">${l}</span>
      </div>
    </div>

    <!-- Card Lojas Ativas -->
    <div class="kpi-card">
      <div class="kpi-icon-wrapper">
        <!-- Flaticon Storefront Icon -->
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </div>
      <div class="kpi-details">
        <span class="kpi-label">Lojas com Vendas</span>
        <span class="kpi-value">${a}</span>
      </div>
    </div>
  `}function b(){if(!n)return;const s=document.getElementById("podium-branch-tag"),t=document.getElementById("podium-region-tag"),i=d==="volume"?"Volume (TN)":"Faturamento (R$)";s&&(s.textContent=i),t&&(t.textContent=i);let l=n.rankings.filiais,a=n.mesorregionais;c!=="todos"&&n.semanal[c]&&(l=n.semanal[c].rankings.filiais,a=n.semanal[c].rankings.mesorregionais);const e=[...l].sort((r,u)=>d==="volume"?u.toneladas-r.toneladas:u.faturamento-r.faturamento),o=[...a].sort((r,u)=>d==="volume"?u.toneladas-r.toneladas:u.faturamento-r.faturamento);y("podium-branches",e.slice(0,3).map(r=>({title:r.name,subText:r.mesoregion||"",valueFormatted:d==="volume"?r.toneladasFormatado:r.faturamentoFormatado}))),y("podium-regions",o.slice(0,3).map(r=>({title:r.name,subText:r.filiais?`${r.filiais.length} Lojas na Regional`:"Regional Geográfica",valueFormatted:d==="volume"?r.toneladasFormatado:r.faturamentoFormatado})))}function y(s,t){const i=document.getElementById(s);if(!i)return;if(t.length<3){i.innerHTML='<p style="text-align:center; color:var(--text-light); padding:1rem 0">Dados insuficientes para pódio</p>';return}const l=t[0],a=t[1],e=t[2];i.innerHTML=`
    <!-- 2º Lugar -->
    <div class="podium-step rank-2">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon">2</div>
        <div class="podium-name">${a.title}</div>
        <div class="podium-filial">${a.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value">${a.valueFormatted}</span>
        <span class="podium-label-tag">2º Lugar</span>
      </div>
    </div>

    <!-- 1º Lugar -->
    <div class="podium-step rank-1">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon">👑</div>
        <div class="podium-name" style="font-size:0.95rem; font-weight:800">${l.title}</div>
        <div class="podium-filial" style="font-weight:600">${l.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value" style="font-size:1.15rem">${l.valueFormatted}</span>
        <span class="podium-label-tag">Campeão 🏆</span>
      </div>
    </div>

    <!-- 3º Lugar -->
    <div class="podium-step rank-3">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon">3</div>
        <div class="podium-name">${e.title}</div>
        <div class="podium-filial">${e.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value">${e.valueFormatted}</span>
        <span class="podium-label-tag">3º Lugar</span>
      </div>
    </div>
  `}function $(){if(!n)return;const s=document.getElementById("mesoregions-list");if(!s)return;let t=n.mesorregionais;c!=="todos"&&n.semanal[c]&&(t=n.semanal[c].rankings.mesorregionais);const i=[...t].sort((e,o)=>d==="volume"?o.toneladas-e.toneladas:o.faturamento-e.faturamento),l=i.reduce((e,o)=>e+o.toneladas,0)||1,a=i.reduce((e,o)=>e+o.faturamento,0)||1;s.innerHTML=i.map(e=>{const o=d==="volume"?e.toneladasFormatado:e.faturamentoFormatado,r=d==="volume"?e.faturamentoFormatado:e.toneladasFormatado,u=d==="volume"?e.toneladas/l*100:e.faturamento/a*100,f=e.filiais?e.filiais.length:0;return`
      <div class="region-item">
        <div class="region-meta">
          <span class="region-title">${e.name}</span>
          <div class="region-value-group">
            <span class="region-value ${d==="volume"?"text-green":"text-gold"}">${o}</span>
            <span class="region-percent">Share: ${u.toFixed(1)}%</span>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-bar ${d==="faturamento"?"bar-gold":""}" data-width="${u.toFixed(1)}%"></div>
        </div>
        <span class="analyst-name">${f>0?f+" lojas ativas":"Regional Geográfica"} • ${d==="volume"?"Faturamento: "+r:"Volume: "+r}</span>
      </div>
    `}).join("")}function L(){if(!n)return;const s=document.getElementById("weekly-evolution-list");if(!s)return;const t=n.semanasResumo,i=Math.max(...t.map(a=>a.toneladas))||1,l=Math.max(...t.map(a=>a.faturamento))||1;s.innerHTML=t.map(a=>{const e=a.toneladas/i*100,o=a.faturamento/l*100;return`
      <div class="weekly-bar-item">
        <div class="weekly-bar-meta">
          <span class="weekly-bar-title">${a.label}</span>
          <div class="weekly-bar-values">
            <span class="weekly-val-ton">${a.toneladasFormatado}</span>
            <span class="weekly-val-fat" style="font-size:0.75rem; color:var(--text-light)">(${a.faturamentoFormatado})</span>
          </div>
        </div>
        <div class="weekly-bar-tracks">
          <!-- Barra de Volume (Verde) -->
          <div class="weekly-track" title="Volume em Toneladas (TN)">
            <div class="weekly-fill-ton" data-width="${e.toFixed(1)}%"></div>
          </div>
          <!-- Barra de Faturamento (Dourada) -->
          <div class="weekly-track" title="Faturamento em Reais (R$)">
            <div class="weekly-fill-fat" data-width="${o.toFixed(1)}%"></div>
          </div>
        </div>
      </div>
    `}).join("")}function k(){if(!n)return;const s=document.getElementById("branches-table-body");if(!s)return;let t=n.rankings.filiais;c!=="todos"&&n.semanal[c]&&(t=n.semanal[c].rankings.filiais);let i=t.filter(e=>{const o=e.name.toLowerCase().includes(m),r=e.mesoregion?e.mesoregion.toLowerCase().includes(m):!1;return o||r});i.sort((e,o)=>d==="volume"?o.toneladas-e.toneladas:o.faturamento-e.faturamento);const l=t.reduce((e,o)=>e+o.toneladas,0)||1,a=t.reduce((e,o)=>e+o.faturamento,0)||1;if(i.length===0){s.innerHTML='<tr><td colspan="8" style="text-align: center; color: var(--text-light); padding:1.5rem 0">Nenhuma loja encontrada com o filtro digitado.</td></tr>';return}s.innerHTML=i.map((e,o)=>{const r=e.toneladas/l*100,u=e.faturamento/a*100;return`
      <tr>
        <td><span class="rank-pos ${o<3?"top-rank":""}">${o+1}</span></td>
        <td><strong>${e.name}</strong></td>
        <td><span class="region-badge">${e.mesoregion||"Não Mapeado"}</span></td>
        <td class="text-right ${d==="volume"?"text-green":""}" style="font-weight:700">${e.toneladasFormatado}</td>
        <td class="text-right" style="color:var(--medium-green)">${r.toFixed(2)}%</td>
        <td class="text-right ${d==="faturamento"?"text-gold":""}" style="font-weight:700">${e.faturamentoFormatado}</td>
        <td class="text-right" style="color:var(--accent-gold)">${u.toFixed(2)}%</td>
        <td class="text-right">${e.pedidos?e.pedidos.toLocaleString("pt-BR"):"-"}</td>
      </tr>
    `}).join("")}function T(){document.querySelectorAll(".progress-bar, .weekly-fill-ton, .weekly-fill-fat").forEach(t=>{const i=t.getAttribute("data-width");i&&(t.style.width=i)})}document.addEventListener("DOMContentLoaded",w);
