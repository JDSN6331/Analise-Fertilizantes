(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function i(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(t){if(t.ep)return;t.ep=!0;const e=i(t);fetch(t.href,e)}})();let n=null,c="todos",d="volume",m="";const p=document.getElementById("loader"),h=document.getElementById("week-select-global"),k=document.getElementById("branch-search-input");async function $(){try{const s=await fetch("./data/dashboard_data.json");if(!s.ok)throw new Error("Falha ao carregar o arquivo JSON de dados");n=await s.json(),p&&(p.style.display="none"),n&&(b(),v())}catch(s){console.error("Erro na inicialização do painel:",s),p&&(p.innerHTML=`
        <div style="color: #ef4444; font-weight: 700; font-size: 1.2rem;">🚨 Erro ao carregar dados</div>
        <p style="margin-top: 0.5rem; color: #475569;">Por favor, verifique se o arquivo public/data/dashboard_data.json foi criado.</p>
      `)}}function b(){h&&h.addEventListener("change",a=>{c=a.target.value,v()});const s=document.querySelectorAll(".btn-toggle");s.forEach(a=>{a.addEventListener("click",()=>{const i=a.getAttribute("data-metric");i&&(d=i,s.forEach(l=>l.classList.remove("active")),a.classList.add("active"),v())})}),k&&k.addEventListener("input",a=>{m=a.target.value.toLowerCase().trim(),n&&w()})}function v(){n&&(L(),F(),T(),M(),w(),setTimeout(()=>{B()},80))}function L(){if(!n)return;const s=document.getElementById("kpi-container");if(!s)return;let a=n.kpis.volumeFormatado,i=n.kpis.faturamentoFormatado,l=n.kpis.pedidosFormatado,t=n.kpis.filiaisTotal;if(c!=="todos"&&n.semanal[c]){const e=n.semanal[c].kpis;a=e.volumeFormatado,i=e.faturamentoFormatado,l=e.pedidosFormatado,t=e.filiaisTotal}s.innerHTML=`
    <!-- Card Volume Total -->
    <div class="kpi-card ${d==="volume"?"gold-border":""}">
      <div class="kpi-icon-wrapper">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      </div>
      <div class="kpi-details">
        <span class="kpi-label">Volume Total (TN)</span>
        <span class="kpi-value text-green">${a}</span>
      </div>
    </div>

    <!-- Card Faturamento Total -->
    <div class="kpi-card ${d==="faturamento"?"gold-border":""}">
      <div class="kpi-icon-wrapper">
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </div>
      <div class="kpi-details">
        <span class="kpi-label">Lojas com Vendas</span>
        <span class="kpi-value">${t}</span>
      </div>
    </div>
  `}function F(){if(!n)return;const s=document.getElementById("podium-branch-tag"),a=document.getElementById("podium-region-tag"),i=d==="volume"?"Volume (TN)":"Faturamento (R$)";s&&(s.textContent=i),a&&(a.textContent=i);let l=n.rankings.filiais,t=n.mesorregionais;c!=="todos"&&n.semanal[c]&&(l=n.semanal[c].rankings.filiais,t=n.semanal[c].rankings.mesorregionais);const e=[...l].sort((r,u)=>d==="volume"?u.toneladas-r.toneladas:u.faturamento-r.faturamento),o=[...t].sort((r,u)=>d==="volume"?u.toneladas-r.toneladas:u.faturamento-r.faturamento);y("podium-branches",e.slice(0,3).map(r=>({title:r.name,subText:r.mesoregion||"",valueFormatted:d==="volume"?r.toneladasFormatado:r.faturamentoFormatado}))),y("podium-regions",o.slice(0,3).map(r=>({title:r.name,subText:r.filiais?`${r.filiais.length} Lojas na Regional`:"Regional Geográfica",valueFormatted:d==="volume"?r.toneladasFormatado:r.faturamentoFormatado})))}function y(s,a){const i=document.getElementById(s);if(!i)return;if(a.length<3){i.innerHTML='<p style="text-align:center; color:var(--text-light); padding:1rem 0">Dados insuficientes para pódio</p>';return}const l=a[0],t=a[1],e=a[2];i.innerHTML=`
    <!-- 2º Lugar -->
    <div class="podium-step rank-2">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon silver" title="2º Lugar">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="9" r="6"></circle>
            <path d="M15.5 15.5L18 22l-6-3-6 3 2.5-6.5"></path>
          </svg>
        </div>
        <div class="podium-name">${t.title}</div>
        <div class="podium-filial">${t.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value">${t.valueFormatted}</span>
        <span class="podium-label-tag">2º Lugar</span>
      </div>
    </div>

    <!-- 1º Lugar (Campeão - Coroa Flaticon Style) -->
    <div class="podium-step rank-1">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon gold" title="1º Lugar Campeão">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"></path>
            <path d="M5 20h14"></path>
          </svg>
        </div>
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
        <div class="podium-badge-icon bronze" title="3º Lugar">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="9" r="6"></circle>
            <path d="M15.5 15.5L18 22l-6-3-6 3 2.5-6.5"></path>
          </svg>
        </div>
        <div class="podium-name">${e.title}</div>
        <div class="podium-filial">${e.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value">${e.valueFormatted}</span>
        <span class="podium-label-tag">3º Lugar</span>
      </div>
    </div>
  `}function T(){if(!n)return;const s=document.getElementById("mesoregions-list");if(!s)return;let a=n.mesorregionais;c!=="todos"&&n.semanal[c]&&(a=n.semanal[c].rankings.mesorregionais);const i=[...a].sort((e,o)=>d==="volume"?o.toneladas-e.toneladas:o.faturamento-e.faturamento),l=i.reduce((e,o)=>e+o.toneladas,0)||1,t=i.reduce((e,o)=>e+o.faturamento,0)||1;s.innerHTML=i.map(e=>{const o=d==="volume"?e.toneladasFormatado:e.faturamentoFormatado,r=d==="volume"?e.faturamentoFormatado:e.toneladasFormatado,u=d==="volume"?e.toneladas/l*100:e.faturamento/t*100,g=e.filiais||[],x=g.map(f=>`<span class="store-chip" title="${f.name}">${f.name}</span>`).join("");return`
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
        <div class="region-stores-wrapper">
          <div class="region-stores-header">
            <span class="stores-count-label"><strong>${g.length} Lojas</strong> nesta regional (${d==="volume"?"Faturamento: "+r:"Volume: "+r}):</span>
          </div>
          <div class="store-chips-container">
            ${x}
          </div>
        </div>
      </div>
    `}).join("")}function M(){if(!n)return;const s=document.getElementById("weekly-evolution-list");if(!s)return;const a=n.semanasResumo,i=Math.max(...a.map(t=>t.toneladas))||1,l=Math.max(...a.map(t=>t.faturamento))||1;s.innerHTML=a.map(t=>{const e=t.toneladas/i*100,o=t.faturamento/l*100;return`
      <div class="weekly-bar-item">
        <div class="weekly-bar-meta">
          <span class="weekly-bar-title">${t.label}</span>
          <div class="weekly-bar-values">
            <span class="weekly-val-ton">${t.toneladasFormatado}</span>
            <span class="weekly-val-fat" style="font-size:0.75rem; color:var(--text-light)">(${t.faturamentoFormatado})</span>
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
    `}).join("")}function w(){if(!n)return;const s=document.getElementById("branches-table-body");if(!s)return;let a=n.rankings.filiais;c!=="todos"&&n.semanal[c]&&(a=n.semanal[c].rankings.filiais);let i=a.filter(e=>{const o=e.name.toLowerCase().includes(m),r=e.mesoregion?e.mesoregion.toLowerCase().includes(m):!1;return o||r});i.sort((e,o)=>d==="volume"?o.toneladas-e.toneladas:o.faturamento-e.faturamento);const l=a.reduce((e,o)=>e+o.toneladas,0)||1,t=a.reduce((e,o)=>e+o.faturamento,0)||1;if(i.length===0){s.innerHTML='<tr><td colspan="8" style="text-align: center; color: var(--text-light); padding:1.5rem 0">Nenhuma loja encontrada com o filtro digitado.</td></tr>';return}s.innerHTML=i.map((e,o)=>{const r=e.toneladas/l*100,u=e.faturamento/t*100;return`
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
    `}).join("")}function B(){document.querySelectorAll(".progress-bar, .weekly-fill-ton, .weekly-fill-fat").forEach(a=>{const i=a.getAttribute("data-width");i&&(a.style.width=i)})}document.addEventListener("DOMContentLoaded",$);
