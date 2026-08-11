(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))l(a);new MutationObserver(a=>{for(const e of a)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const e={};return a.integrity&&(e.integrity=a.integrity),a.referrerPolicy&&(e.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?e.credentials="include":a.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(a){if(a.ep)return;a.ep=!0;const e=n(a);fetch(a.href,e)}})();let r=null,p="todos",u="volume",L="";const v=document.getElementById("loader"),$=document.getElementById("week-select-global"),F=document.getElementById("branch-search-input");async function H(){try{const i=await fetch("./data/dashboard_data.json");if(!i.ok)throw new Error("Falha ao carregar o arquivo JSON de dados");r=await i.json(),v&&(v.style.display="none"),r&&(z(),w())}catch(i){console.error("Erro na inicialização do painel:",i),v&&(v.innerHTML=`
        <div style="color: #ef4444; font-weight: 700; font-size: 1.2rem;">🚨 Erro ao carregar dados</div>
        <p style="margin-top: 0.5rem; color: #475569;">Por favor, verifique se o arquivo public/data/dashboard_data.json foi criado.</p>
      `)}}function z(){$&&($.value="todos",p="todos",$.addEventListener("change",t=>{p=t.target.value,w()}));const i=document.querySelectorAll(".btn-toggle");i.forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-metric");n&&(u=n,i.forEach(l=>l.classList.remove("active")),t.classList.add("active"),w())})}),F&&F.addEventListener("input",t=>{L=t.target.value.toLowerCase().trim(),r&&T()})}function w(){r&&(D(),G(),N(),R(),O(),T(),setTimeout(()=>{q()},80))}function D(){if(!r)return;const i=document.getElementById("kpi-container");if(!i)return;let t=r.kpis.volumeFormatado,n=r.kpis.faturamentoFormatado,l=r.kpis.pedidosFormatado,a=r.kpis.filiaisTotal;if(p!=="todos"&&r.semanal[p]){const e=r.semanal[p].kpis;t=e.volumeFormatado,n=e.faturamentoFormatado,l=e.pedidosFormatado,a=e.filiaisTotal}i.innerHTML=`
    <!-- Card Volume Total -->
    <div class="kpi-card ${u==="volume"?"gold-border":""}">
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
    <div class="kpi-card ${u==="faturamento"?"gold-border":""}">
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
        <span class="kpi-value">${a}</span>
      </div>
    </div>
  `}function G(){if(!r)return;const i=document.getElementById("simple-legend-container");if(!i)return;const t=[...r.mesorregionais].sort((n,l)=>n.name.localeCompare(l.name));i.innerHTML=t.map(n=>{const l=n.filiais||[],a=l.map(e=>e.name.replace("Loja ","").replace("Unidade Avançada ","UA ")).join(", ");return`
      <div class="simple-legend-row">
        <span class="legend-reg-badge">${n.name}</span>
        <span class="legend-reg-count">(${l.length} lojas):</span>
        <span class="legend-reg-stores">${a}</span>
      </div>
    `}).join("")}function N(){if(!r)return;const i=document.getElementById("podium-branch-tag"),t=document.getElementById("podium-region-tag"),n=u==="volume"?"Volume (TN)":"Faturamento (R$)";i&&(i.textContent=n),t&&(t.textContent=n);let l=r.rankings.filiais,a=r.mesorregionais;p!=="todos"&&r.semanal[p]&&(l=r.semanal[p].rankings.filiais,a=r.semanal[p].rankings.mesorregionais);const e=[...l].sort((d,c)=>u==="volume"?c.toneladas-d.toneladas:c.faturamento-d.faturamento),s=[...a].sort((d,c)=>u==="volume"?c.toneladas-d.toneladas:c.faturamento-d.faturamento);j("podium-branches",e.slice(0,3).map(d=>({title:d.name,subText:d.mesoregion||"",valueFormatted:u==="volume"?d.toneladasFormatado:d.faturamentoFormatado}))),j("podium-regions",s.slice(0,3).map(d=>{const c=(d.filiais||[]).slice(0,3).map(f=>f.name.replace("Loja ","").replace("Unidade Avançada ","UA ")).join(", ");return{title:d.name,subText:c?`Top Lojas: ${c}`:`${d.filiais?d.filiais.length:0} Lojas`,valueFormatted:u==="volume"?d.toneladasFormatado:d.faturamentoFormatado}}))}function j(i,t){const n=document.getElementById(i);if(!n)return;if(t.length<3){n.innerHTML='<p style="text-align:center; color:var(--text-light); padding:1rem 0">Dados insuficientes para pódio</p>';return}const l=t[0],a=t[1],e=t[2];n.innerHTML=`
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
        <div class="podium-name" style="font-size:0.95rem; font-weight:800">${l.title}</div>
        <div class="podium-filial" style="font-weight:600" title="${l.subText}">${l.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value" style="font-size:1.15rem">${l.valueFormatted}</span>
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
  `}function R(){if(!r)return;const i=document.getElementById("mesoregions-list");if(!i)return;let t=r.mesorregionais;p!=="todos"&&r.semanal[p]&&(t=r.semanal[p].rankings.mesorregionais);const n=[...t].sort((e,s)=>u==="volume"?s.toneladas-e.toneladas:s.faturamento-e.faturamento),l=n.reduce((e,s)=>e+s.toneladas,0)||1,a=n.reduce((e,s)=>e+s.faturamento,0)||1;i.innerHTML=n.map(e=>{const s=u==="volume"?e.toneladasFormatado:e.faturamentoFormatado,d=u==="volume"?e.faturamentoFormatado:e.toneladasFormatado,c=u==="volume"?e.toneladas/l*100:e.faturamento/a*100,f=e.filiais?e.filiais.length:0;return`
      <div class="region-item">
        <div class="region-meta">
          <span class="region-title">${e.name}</span>
          <div class="region-value-group">
            <span class="region-value ${u==="volume"?"text-green":"text-gold"}">${s}</span>
            <span class="region-percent">Share: ${c.toFixed(1)}%</span>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-bar ${u==="faturamento"?"bar-gold":""}" data-width="${c.toFixed(1)}%"></div>
        </div>
        <span class="analyst-name">${f} Lojas ativas • ${u==="volume"?"Faturamento: "+d:"Volume: "+d}</span>
      </div>
    `}).join("")}function O(){if(!r)return;const i=document.getElementById("weekly-evolution-list");if(!i)return;const t=r.semanasResumo;if(t.length===0)return;const n=Math.max(...t.map(o=>o.toneladas))||1,l=Math.max(...t.map(o=>o.faturamento))||1,a=700,e=220,s=35,d=40,c=50,f=50,M=a-c-f,h=e-s-d,E=t.length,b=M/(E-1),y=[],x=[];t.forEach((o,m)=>{const g=c+m*b,k=s+(1-o.toneladas/n)*h,S=s+(1-o.faturamento/l)*h;y.push({x:g,y:k,data:o}),x.push({x:g,y:S,data:o})});const C=y.map((o,m)=>m===0?`M ${o.x} ${o.y}`:`L ${o.x} ${o.y}`).join(" "),B=x.map((o,m)=>m===0?`M ${o.x} ${o.y}`:`L ${o.x} ${o.y}`).join(" "),V=[0,.33,.66,1].map(o=>{const m=s+o*h;return`<line x1="${c}" y1="${m}" x2="${a-f}" y2="${m}" stroke="#f1f5f9" stroke-width="1.5" stroke-dasharray="4 4" />`}).join(""),P=t.map((o,m)=>{const g=c+m*b,k=`Sem ${m+1}`;return`<text x="${g}" y="${e-12}" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">${k}</text>`}).join(""),A=y.map(o=>`
    <g class="chart-point-group">
      <circle cx="${o.x}" cy="${o.y}" r="6" fill="#2d6a4f" stroke="#ffffff" stroke-width="2.5" />
      <text x="${o.x}" y="${o.y-10}" text-anchor="middle" font-size="10" font-weight="800" fill="#1b4332">${o.data.toneladasFormatado}</text>
    </g>
  `).join(""),I=x.map(o=>`
    <g class="chart-point-group">
      <circle cx="${o.x}" cy="${o.y}" r="6" fill="#d4af37" stroke="#ffffff" stroke-width="2.5" />
      <text x="${o.x}" y="${o.y+20}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#b89218">${o.data.faturamentoFormatado}</text>
    </g>
  `).join("");i.innerHTML=`
    <div class="line-chart-wrapper">
      <svg viewBox="0 0 ${a} ${e}" class="line-chart-svg" preserveAspectRatio="xMidYMid meet">
        <!-- Definições de Gradientes -->
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

        <!-- Linhas de Grade -->
        ${V}

        <!-- Caminho da Linha de Faturamento (Dourada) -->
        <path d="${B}" fill="none" stroke="url(#fatGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Caminho da Linha de Volume (Verde) -->
        <path d="${C}" fill="none" stroke="url(#volGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Pontos da Linha de Faturamento -->
        ${I}

        <!-- Pontos da Linha de Volume -->
        ${A}

        <!-- Eixo X com Nomes das Semanas -->
        ${P}
      </svg>
    </div>
  `}function T(){if(!r)return;const i=document.getElementById("branches-table-body");if(!i)return;let t=r.rankings.filiais;p!=="todos"&&r.semanal[p]&&(t=r.semanal[p].rankings.filiais);let n=t.filter(e=>{const s=e.name.toLowerCase().includes(L),d=e.mesoregion?e.mesoregion.toLowerCase().includes(L):!1;return s||d});n.sort((e,s)=>u==="volume"?s.toneladas-e.toneladas:s.faturamento-e.faturamento);const l=t.reduce((e,s)=>e+s.toneladas,0)||1,a=t.reduce((e,s)=>e+s.faturamento,0)||1;if(n.length===0){i.innerHTML='<tr><td colspan="8" style="text-align: center; color: var(--text-light); padding:1.5rem 0">Nenhuma loja encontrada com o filtro digitado.</td></tr>';return}i.innerHTML=n.map((e,s)=>{const d=e.toneladas/l*100,c=e.faturamento/a*100;return`
      <tr>
        <td><span class="rank-pos ${s<3?"top-rank":""}">${s+1}</span></td>
        <td><strong>${e.name}</strong></td>
        <td><span class="region-badge">${e.mesoregion||"Não Mapeado"}</span></td>
        <td class="text-right ${u==="volume"?"text-green":""}" style="font-weight:700">${e.toneladasFormatado}</td>
        <td class="text-right" style="color:var(--medium-green)">${d.toFixed(2)}%</td>
        <td class="text-right ${u==="faturamento"?"text-gold":""}" style="font-weight:700">${e.faturamentoFormatado}</td>
        <td class="text-right" style="color:var(--accent-gold)">${c.toFixed(2)}%</td>
        <td class="text-right">${e.pedidos?e.pedidos.toLocaleString("pt-BR"):"-"}</td>
      </tr>
    `}).join("")}function q(){document.querySelectorAll(".progress-bar").forEach(t=>{const n=t.getAttribute("data-width");n&&(t.style.width=n)})}document.addEventListener("DOMContentLoaded",H);
