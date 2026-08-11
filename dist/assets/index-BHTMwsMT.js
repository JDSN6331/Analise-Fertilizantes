(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const e of a)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const e={};return a.integrity&&(e.integrity=a.integrity),a.referrerPolicy&&(e.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?e.credentials="include":a.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(a){if(a.ep)return;a.ep=!0;const e=n(a);fetch(a.href,e)}})();let l=null,p="todos",c="volume",L="";const g=document.getElementById("loader"),$=document.getElementById("week-select-global"),F=document.getElementById("branch-search-input");async function A(){try{const s=await fetch("./data/dashboard_data.json");if(!s.ok)throw new Error("Falha ao carregar o arquivo JSON de dados");l=await s.json(),g&&(g.style.display="none"),l&&(z(),w())}catch(s){console.error("Erro na inicialização do painel:",s),g&&(g.innerHTML=`
        <div style="color: #ef4444; font-weight: 700; font-size: 1.2rem;">🚨 Erro ao carregar dados</div>
        <p style="margin-top: 0.5rem; color: #475569;">Por favor, verifique se o arquivo public/data/dashboard_data.json foi criado.</p>
      `)}}function z(){$&&($.value="todos",p="todos",$.addEventListener("change",t=>{p=t.target.value,w()}));const s=document.querySelectorAll(".btn-toggle");s.forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-metric");n&&(c=n,s.forEach(o=>o.classList.remove("active")),t.classList.add("active"),w())})}),F&&F.addEventListener("input",t=>{L=t.target.value.toLowerCase().trim(),l&&j()})}function w(){l&&(N(),D(),R(),G(),O(),q(),j(),setTimeout(()=>{U()},80))}function N(){if(!l)return;const s=document.getElementById("kpi-container");if(!s)return;let t=l.kpis.volumeFormatado,n=l.kpis.faturamentoFormatado,o=l.kpis.pedidosFormatado,a=l.kpis.filiaisTotal;if(p!=="todos"&&l.semanal[p]){const e=l.semanal[p].kpis;t=e.volumeFormatado,n=e.faturamentoFormatado,o=e.pedidosFormatado,a=e.filiaisTotal}s.innerHTML=`
    <!-- Card Volume Total -->
    <div class="kpi-card ${c==="volume"?"gold-border":""}">
      <div class="kpi-icon-wrapper">
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
    <div class="kpi-card ${c==="faturamento"?"gold-border":""}">
      <div class="kpi-icon-wrapper">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M6 12h.01M18 12h.01"></path>
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
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </div>
      <div class="kpi-details">
        <span class="kpi-label">Pedidos Emitidos</span>
        <span class="kpi-value">${o}</span>
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
        <span class="kpi-value">${a}</span>
      </div>
    </div>
  `}function D(){if(!l)return;const s=document.getElementById("simple-legend-container");if(!s)return;const t=[...l.mesorregionais].sort((n,o)=>n.name.localeCompare(o.name));s.innerHTML=t.map(n=>{const o=n.filiais||[],a=o.map(e=>e.name.replace("Loja ","").replace("Unidade Avançada ","UA ")).join(", ");return`
      <div class="simple-legend-row">
        <span class="legend-reg-badge">${n.name}</span>
        <span class="legend-reg-count">(${o.length} lojas):</span>
        <span class="legend-reg-stores">${a}</span>
      </div>
    `}).join("")}function R(){if(!l)return;const s=document.getElementById("podium-branch-tag"),t=document.getElementById("podium-region-tag"),n=c==="volume"?"Volume (TN)":"Faturamento (R$)";s&&(s.textContent=n),t&&(t.textContent=n);let o=l.rankings.filiais,a=l.mesorregionais;p!=="todos"&&l.semanal[p]&&(o=l.semanal[p].rankings.filiais,a=l.semanal[p].rankings.mesorregionais);const e=[...o].sort((d,u)=>c==="volume"?u.toneladas-d.toneladas:u.faturamento-d.faturamento),i=[...a].sort((d,u)=>c==="volume"?u.toneladas-d.toneladas:u.faturamento-d.faturamento);T("podium-branches",e.slice(0,3).map(d=>({title:d.name,subText:d.mesoregion||"",valueFormatted:c==="volume"?d.toneladasFormatado:d.faturamentoFormatado}))),T("podium-regions",i.slice(0,3).map(d=>{const u=(d.filiais||[]).slice(0,3).map(f=>f.name.replace("Loja ","").replace("Unidade Avançada ","UA ")).join(", ");return{title:d.name,subText:u?`Top Lojas: ${u}`:`${d.filiais?d.filiais.length:0} Lojas`,valueFormatted:c==="volume"?d.toneladasFormatado:d.faturamentoFormatado}}))}function T(s,t){const n=document.getElementById(s);if(!n)return;if(t.length<3){n.innerHTML='<p style="text-align:center; color:var(--text-light); padding:1rem 0">Dados insuficientes para pódio</p>';return}const o=t[0],a=t[1],e=t[2];n.innerHTML=`
    <!-- 2º Lugar -->
    <div class="podium-step rank-2">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon silver" title="2º Lugar">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="9" r="6"></circle>
            <path d="M15.5 15.5L18 22l-6-3-6 3 2.5-6.5"></path>
          </svg>
        </div>
        <div class="podium-name">${a.title}</div>
        <div class="podium-filial" title="${a.subText}">${a.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value">${a.valueFormatted}</span>
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
        <div class="podium-name" style="font-size:0.95rem; font-weight:800">${o.title}</div>
        <div class="podium-filial" style="font-weight:600" title="${o.subText}">${o.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value" style="font-size:1.15rem">${o.valueFormatted}</span>
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
        <div class="podium-name">${e.title}</div>
        <div class="podium-filial" title="${e.subText}">${e.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value">${e.valueFormatted}</span>
        <span class="podium-label-tag">3º Lugar</span>
      </div>
    </div>
  `}function G(){if(!l)return;const s=document.getElementById("mesoregions-list");if(!s)return;let t=l.mesorregionais;p!=="todos"&&l.semanal[p]&&(t=l.semanal[p].rankings.mesorregionais);const n=[...t].sort((e,i)=>c==="volume"?i.toneladas-e.toneladas:i.faturamento-e.faturamento),o=n.reduce((e,i)=>e+i.toneladas,0)||1,a=n.reduce((e,i)=>e+i.faturamento,0)||1;s.innerHTML=n.map(e=>{const i=c==="volume"?e.toneladasFormatado:e.faturamentoFormatado,d=c==="volume"?e.faturamentoFormatado:e.toneladasFormatado,u=c==="volume"?e.toneladas/o*100:e.faturamento/a*100,f=e.filiais?e.filiais.length:0;return`
      <div class="region-item">
        <div class="region-meta">
          <span class="region-title">${e.name}</span>
          <div class="region-value-group">
            <span class="region-value ${c==="volume"?"text-green":"text-gold"}">${i}</span>
            <span class="region-percent">Share: ${u.toFixed(1)}%</span>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-bar ${c==="faturamento"?"bar-gold":""}" data-width="${u.toFixed(1)}%"></div>
        </div>
        <span class="analyst-name">${f} Lojas ativas • ${c==="volume"?"Faturamento: "+d:"Volume: "+d}</span>
      </div>
    `}).join("")}function O(){if(!l)return;const s=document.getElementById("top-sellers-list");if(!s)return;let t=l.rankings.vendedores;p!=="todos"&&l.semanal[p]&&(t=l.semanal[p].rankings.vendedores);const n=[...t].sort((o,a)=>c==="volume"?a.toneladas-o.toneladas:a.faturamento-o.faturamento).slice(0,6);if(n.length===0){s.innerHTML='<p style="text-align:center; color:var(--text-light); padding:1rem 0">Nenhum vendedor no período</p>';return}s.innerHTML=n.map((o,a)=>{const e=c==="volume"?o.toneladasFormatado:o.faturamentoFormatado,i=c==="volume"?o.faturamentoFormatado:o.toneladasFormatado;return`
      <div class="seller-item">
        <div class="seller-rank-badge ${a<3?"top-rank":""}">${a+1}</div>
        <div class="seller-info">
          <div class="seller-name-row">
            <span class="seller-name">${o.name}</span>
            <span class="seller-val ${c==="volume"?"text-green":"text-gold"}">${e}</span>
          </div>
          <span class="seller-sub">${o.filial} • ${c==="volume"?"Fat: "+i:"Vol: "+i}</span>
        </div>
      </div>
    `}).join("")}function q(){if(!l)return;const s=document.getElementById("weekly-evolution-list");if(!s)return;const t=l.semanasResumo;if(t.length===0)return;const n=Math.max(...t.map(r=>r.toneladas))||1,o=Math.max(...t.map(r=>r.faturamento))||1,a=900,e=230,i=35,d=40,u=60,f=60,M=a-u-f,h=e-i-d,E=t.length,b=M/(E-1),y=[],k=[];t.forEach((r,m)=>{const v=u+m*b,x=i+(1-r.toneladas/n)*h,P=i+(1-r.faturamento/o)*h;y.push({x:v,y:x,data:r}),k.push({x:v,y:P,data:r})});const B=y.map((r,m)=>m===0?`M ${r.x} ${r.y}`:`L ${r.x} ${r.y}`).join(" "),C=k.map((r,m)=>m===0?`M ${r.x} ${r.y}`:`L ${r.x} ${r.y}`).join(" "),V=[0,.33,.66,1].map(r=>{const m=i+r*h;return`<line x1="${u}" y1="${m}" x2="${a-f}" y2="${m}" stroke="#f1f5f9" stroke-width="1.5" stroke-dasharray="4 4" />`}).join(""),S=t.map((r,m)=>{const v=u+m*b,x=`Semana ${m+1}`;return`<text x="${v}" y="${e-10}" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">${x}</text>`}).join(""),H=y.map(r=>`
    <g class="chart-point-group">
      <circle cx="${r.x}" cy="${r.y}" r="6.5" fill="#2d6a4f" stroke="#ffffff" stroke-width="2.5" />
      <text x="${r.x}" y="${r.y-11}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#1b4332">${r.data.toneladasFormatado}</text>
    </g>
  `).join(""),I=k.map(r=>`
    <g class="chart-point-group">
      <circle cx="${r.x}" cy="${r.y}" r="6.5" fill="#d4af37" stroke="#ffffff" stroke-width="2.5" />
      <text x="${r.x}" y="${r.y+22}" text-anchor="middle" font-size="10" font-weight="700" fill="#b89218">${r.data.faturamentoFormatado}</text>
    </g>
  `).join("");s.innerHTML=`
    <div class="line-chart-wrapper">
      <svg viewBox="0 0 ${a} ${e}" class="line-chart-svg" preserveAspectRatio="xMidYMid meet">
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

        ${V}

        <!-- Linha Faturamento (Dourada) -->
        <path d="${C}" fill="none" stroke="url(#fatGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Linha Volume (Verde) -->
        <path d="${B}" fill="none" stroke="url(#volGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

        ${I}
        ${H}
        ${S}
      </svg>
    </div>
  `}function j(){if(!l)return;const s=document.getElementById("branches-table-body");if(!s)return;let t=l.rankings.filiais;p!=="todos"&&l.semanal[p]&&(t=l.semanal[p].rankings.filiais);let n=t.filter(e=>{const i=e.name.toLowerCase().includes(L),d=e.mesoregion?e.mesoregion.toLowerCase().includes(L):!1;return i||d});n.sort((e,i)=>c==="volume"?i.toneladas-e.toneladas:i.faturamento-e.faturamento);const o=t.reduce((e,i)=>e+i.toneladas,0)||1,a=t.reduce((e,i)=>e+i.faturamento,0)||1;if(n.length===0){s.innerHTML='<tr><td colspan="8" style="text-align: center; color: var(--text-light); padding:1.5rem 0">Nenhuma loja encontrada com o filtro digitado.</td></tr>';return}s.innerHTML=n.map((e,i)=>{const d=e.toneladas/o*100,u=e.faturamento/a*100;return`
      <tr>
        <td><span class="rank-pos ${i<3?"top-rank":""}">${i+1}</span></td>
        <td><strong>${e.name}</strong></td>
        <td><span class="region-badge">${e.mesoregion||"Não Mapeado"}</span></td>
        <td class="text-right ${c==="volume"?"text-green":""}" style="font-weight:700">${e.toneladasFormatado}</td>
        <td class="text-right" style="color:var(--medium-green)">${d.toFixed(2)}%</td>
        <td class="text-right ${c==="faturamento"?"text-gold":""}" style="font-weight:700">${e.faturamentoFormatado}</td>
        <td class="text-right" style="color:var(--accent-gold)">${u.toFixed(2)}%</td>
        <td class="text-right">${e.pedidos?e.pedidos.toLocaleString("pt-BR"):"-"}</td>
      </tr>
    `}).join("")}function U(){document.querySelectorAll(".progress-bar").forEach(t=>{const n=t.getAttribute("data-width");n&&(t.style.width=n)})}document.addEventListener("DOMContentLoaded",A);
