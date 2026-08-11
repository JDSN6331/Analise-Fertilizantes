(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();let i=null,c="todos",d="volume",p="";const m=document.getElementById("loader"),f=document.getElementById("week-select-global"),g=document.getElementById("branch-search-input");async function y(){try{const s=await fetch("./data/dashboard_data.json");if(!s.ok)throw new Error("Falha ao carregar o arquivo JSON de dados");i=await s.json(),m&&(m.style.display="none"),i&&(w(),v())}catch(s){console.error("Erro na inicialização do painel:",s),m&&(m.innerHTML=`
        <div style="color: #ef4444; font-weight: 700; font-size: 1.2rem;">🚨 Erro ao carregar dados</div>
        <p style="margin-top: 0.5rem; color: #475569;">Por favor, verifique se o arquivo public/data/dashboard_data.json foi criado.</p>
      `)}}function w(){f&&f.addEventListener("change",a=>{c=a.target.value,v()});const s=document.querySelectorAll(".btn-toggle");s.forEach(a=>{a.addEventListener("click",()=>{const n=a.getAttribute("data-metric");n&&(d=n,s.forEach(l=>l.classList.remove("active")),a.classList.add("active"),v())})}),g&&g.addEventListener("input",a=>{p=a.target.value.toLowerCase().trim(),i&&k()})}function v(){i&&(x(),b(),$(),F(),k(),setTimeout(()=>{L()},80))}function x(){if(!i)return;const s=document.getElementById("kpi-container");if(!s)return;let a=i.kpis.volumeFormatado,n=i.kpis.faturamentoFormatado,l=i.kpis.pedidosFormatado,t=i.kpis.filiaisTotal;if(c!=="todos"&&i.semanal[c]){const e=i.semanal[c].kpis;a=e.volumeFormatado,n=e.faturamentoFormatado,l=e.pedidosFormatado,t=e.filiaisTotal}s.innerHTML=`
    <!-- Card Volume Total -->
    <div class="kpi-card ${d==="volume"?"gold-border":""}">
      <div class="kpi-icon-wrapper">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
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
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      </div>
      <div class="kpi-details">
        <span class="kpi-label">Faturamento Total (R$)</span>
        <span class="kpi-value">${n}</span>
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
  `}function b(){if(!i)return;const s=document.getElementById("podium-branch-tag"),a=document.getElementById("podium-region-tag"),n=d==="volume"?"Volume (TN)":"Faturamento (R$)";s&&(s.textContent=n),a&&(a.textContent=n);let l=i.rankings.filiais,t=i.mesorregionais;c!=="todos"&&i.semanal[c]&&(l=i.semanal[c].rankings.filiais,t=i.semanal[c].rankings.mesorregionais);const e=[...l].sort((r,u)=>d==="volume"?u.toneladas-r.toneladas:u.faturamento-r.faturamento),o=[...t].sort((r,u)=>d==="volume"?u.toneladas-r.toneladas:u.faturamento-r.faturamento);h("podium-branches",e.slice(0,3).map(r=>({title:r.name,subText:r.mesoregion||"",valueFormatted:d==="volume"?r.toneladasFormatado:r.faturamentoFormatado}))),h("podium-regions",o.slice(0,3).map(r=>({title:r.name,subText:`Gerente: ${r.analista}`,valueFormatted:d==="volume"?r.toneladasFormatado:r.faturamentoFormatado})))}function h(s,a){const n=document.getElementById(s);if(!n)return;if(a.length<3){n.innerHTML='<p style="text-align:center; color:var(--text-light); padding:1rem 0">Dados insuficientes para pódio</p>';return}const l=a[0],t=a[1],e=a[2];n.innerHTML=`
    <!-- 2º Lugar -->
    <div class="podium-step rank-2">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon">2</div>
        <div class="podium-name">${t.title}</div>
        <div class="podium-filial">${t.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value">${t.valueFormatted}</span>
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
  `}function $(){if(!i)return;const s=document.getElementById("mesoregions-list");if(!s)return;let a=i.mesorregionais;c!=="todos"&&i.semanal[c]&&(a=i.semanal[c].rankings.mesorregionais);const n=[...a].sort((e,o)=>d==="volume"?o.toneladas-e.toneladas:o.faturamento-e.faturamento),l=n.reduce((e,o)=>e+o.toneladas,0)||1,t=n.reduce((e,o)=>e+o.faturamento,0)||1;s.innerHTML=n.map(e=>{const o=d==="volume"?e.toneladasFormatado:e.faturamentoFormatado,r=d==="volume"?e.faturamentoFormatado:e.toneladasFormatado,u=d==="volume"?e.toneladas/l*100:e.faturamento/t*100;return`
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
        <span class="analyst-name">Responsável: ${e.analista} • ${d==="volume"?"Faturamento: "+r:"Volume: "+r}</span>
      </div>
    `}).join("")}function F(){if(!i)return;const s=document.getElementById("weekly-evolution-list");if(!s)return;const a=i.semanasResumo,n=Math.max(...a.map(t=>t.toneladas))||1,l=Math.max(...a.map(t=>t.faturamento))||1;s.innerHTML=a.map(t=>{const e=t.toneladas/n*100,o=t.faturamento/l*100;return`
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
    `}).join("")}function k(){if(!i)return;const s=document.getElementById("branches-table-body");if(!s)return;let a=i.rankings.filiais;c!=="todos"&&i.semanal[c]&&(a=i.semanal[c].rankings.filiais);let n=a.filter(e=>{const o=e.name.toLowerCase().includes(p),r=e.mesoregion?e.mesoregion.toLowerCase().includes(p):!1;return o||r});n.sort((e,o)=>d==="volume"?o.toneladas-e.toneladas:o.faturamento-e.faturamento);const l=a.reduce((e,o)=>e+o.toneladas,0)||1,t=a.reduce((e,o)=>e+o.faturamento,0)||1;if(n.length===0){s.innerHTML='<tr><td colspan="8" style="text-align: center; color: var(--text-light); padding:1.5rem 0">Nenhuma loja encontrada com o filtro digitado.</td></tr>';return}s.innerHTML=n.map((e,o)=>{const r=e.toneladas/l*100,u=e.faturamento/t*100;return`
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
    `}).join("")}function L(){document.querySelectorAll(".progress-bar, .weekly-fill-ton, .weekly-fill-fat").forEach(a=>{const n=a.getAttribute("data-width");n&&(a.style.width=n)})}document.addEventListener("DOMContentLoaded",y);
