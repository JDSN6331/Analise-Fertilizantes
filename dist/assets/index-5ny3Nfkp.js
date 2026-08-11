(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const e of a)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(a){const e={};return a.integrity&&(e.integrity=a.integrity),a.referrerPolicy&&(e.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?e.credentials="include":a.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(a){if(a.ep)return;a.ep=!0;const e=s(a);fetch(a.href,e)}})();let r=null,p="todos",c="volume",b="";const $=document.getElementById("loader"),w=document.getElementById("week-select-global"),j=document.getElementById("branch-search-input");async function z(){try{const n=await fetch("./data/dashboard_data.json");if(!n.ok)throw new Error("Falha ao carregar o arquivo JSON de dados");r=await n.json(),$&&($.style.display="none"),r&&(N(),F())}catch(n){console.error("Erro na inicialização do painel:",n),$&&($.innerHTML=`
        <div style="color: #ef4444; font-weight: 700; font-size: 1.2rem;">🚨 Erro ao carregar dados</div>
        <p style="margin-top: 0.5rem; color: #475569;">Por favor, verifique se o arquivo public/data/dashboard_data.json foi criado.</p>
      `)}}function N(){w&&(w.value="todos",p="todos",w.addEventListener("change",t=>{p=t.target.value,F()}));const n=document.querySelectorAll(".btn-toggle");n.forEach(t=>{t.addEventListener("click",()=>{const s=t.getAttribute("data-metric");s&&(c=s,n.forEach(o=>o.classList.remove("active")),t.classList.add("active"),F())})}),j&&j.addEventListener("input",t=>{b=t.target.value.toLowerCase().trim(),r&&E()})}function F(){r&&(G(),D(),O(),q(),U(),W(),E(),setTimeout(()=>{_()},80))}function G(){if(!r)return;const n=document.getElementById("kpi-container");if(!n)return;let t=r.kpis.volumeFormatado,s=r.kpis.faturamentoFormatado,o=r.kpis.pedidosFormatado,a=r.kpis.filiaisTotal;if(p!=="todos"&&r.semanal[p]){const e=r.semanal[p].kpis;t=e.volumeFormatado,s=e.faturamentoFormatado,o=e.pedidosFormatado,a=e.filiaisTotal}n.innerHTML=`
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
        <span class="kpi-value">${s}</span>
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
  `}function D(){if(!r)return;const n=document.getElementById("simple-legend-container");if(!n)return;const t=[...r.mesorregionais].sort((s,o)=>s.name.localeCompare(o.name));n.innerHTML=t.map(s=>{const o=s.filiais||[],a=o.map(e=>e.name.replace("Loja ","").replace("Unidade Avançada ","UA ")).join(", ");return`
      <div class="simple-legend-row">
        <span class="legend-reg-badge">${s.name}</span>
        <span class="legend-reg-count">(${o.length} lojas):</span>
        <span class="legend-reg-stores">${a}</span>
      </div>
    `}).join("")}function O(){if(!r)return;const n=document.getElementById("podium-branch-tag"),t=document.getElementById("podium-region-tag"),s=c==="volume"?"Volume (TN)":"Faturamento (R$)";n&&(n.textContent=s),t&&(t.textContent=s);let o=r.rankings.filiais,a=r.mesorregionais;p!=="todos"&&r.semanal[p]&&(o=r.semanal[p].rankings.filiais,a=r.semanal[p].rankings.mesorregionais);const e=[...o].sort((l,u)=>c==="volume"?u.toneladas-l.toneladas:u.faturamento-l.faturamento),i=[...a].sort((l,u)=>c==="volume"?u.toneladas-l.toneladas:u.faturamento-l.faturamento);M("podium-branches",e.slice(0,3).map(l=>({title:l.name,subText:l.mesoregion||"",valueFormatted:c==="volume"?l.toneladasFormatado:l.faturamentoFormatado}))),M("podium-regions",i.slice(0,3).map(l=>{const u=(l.filiais||[]).slice(0,3).map(h=>h.name.replace("Loja ","").replace("Unidade Avançada ","UA ")).join(", ");return{title:l.name,subText:u?`Top Lojas: ${u}`:`${l.filiais?l.filiais.length:0} Lojas`,valueFormatted:c==="volume"?l.toneladasFormatado:l.faturamentoFormatado}}))}function M(n,t){const s=document.getElementById(n);if(!s)return;if(t.length<3){s.innerHTML='<p style="text-align:center; color:var(--text-light); padding:1rem 0">Dados insuficientes para pódio</p>';return}const o=t[0],a=t[1],e=t[2];s.innerHTML=`
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
  `}function q(){if(!r)return;const n=document.getElementById("mesoregions-list");if(!n)return;let t=r.mesorregionais;p!=="todos"&&r.semanal[p]&&(t=r.semanal[p].rankings.mesorregionais);const s=[...t].sort((e,i)=>c==="volume"?i.toneladas-e.toneladas:i.faturamento-e.faturamento),o=s.reduce((e,i)=>e+i.toneladas,0)||1,a=s.reduce((e,i)=>e+i.faturamento,0)||1;n.innerHTML=s.map(e=>{const i=c==="volume"?e.toneladasFormatado:e.faturamentoFormatado,l=c==="volume"?e.faturamentoFormatado:e.toneladasFormatado,u=c==="volume"?e.toneladas/o*100:e.faturamento/a*100,h=e.filiais?e.filiais.length:0;return`
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
        <span class="analyst-name">${h} Lojas ativas • ${c==="volume"?"Faturamento: "+l:"Volume: "+l}</span>
      </div>
    `}).join("")}function U(){if(!r)return;const n=document.getElementById("top-sellers-list");if(!n)return;let t=r.rankings.vendedores;p!=="todos"&&r.semanal[p]&&(t=r.semanal[p].rankings.vendedores);const s=[...t].sort((o,a)=>c==="volume"?a.toneladas-o.toneladas:a.faturamento-o.faturamento).slice(0,10);if(s.length===0){n.innerHTML='<p style="text-align:center; color:var(--text-light); padding:1rem 0">Nenhum vendedor no período</p>';return}n.innerHTML=s.map((o,a)=>{const e=c==="volume"?o.toneladasFormatado:o.faturamentoFormatado,i=c==="volume"?o.faturamentoFormatado:o.toneladasFormatado;let l="rank-pos-default";return a===0?l="rank-pos-1":a===1?l="rank-pos-2":a===2&&(l="rank-pos-3"),`
      <div class="seller-item">
        <span class="seller-rank-badge ${l}">${a+1}</span>
        <div class="seller-info">
          <div class="seller-name-row">
            <span class="seller-name">${o.name}</span>
            <span class="seller-val ${c==="volume"?"text-green":"text-gold"}">${e}</span>
          </div>
          <span class="seller-sub">${o.filial} • ${c==="volume"?"Fat: "+i:"Vol: "+i}</span>
        </div>
      </div>
    `}).join("")}function W(){if(!r)return;const n=document.getElementById("weekly-evolution-list");if(!n)return;const t=r.semanasResumo;if(t.length===0)return;const s=Math.max(...t.map(d=>d.toneladas))||1,o=Math.max(...t.map(d=>d.faturamento))||1,a=900,e=280,i=45,l=55,u=70,h=70,C=a-u-h,L=e-i-l,B=t.length,T=C/(B-1),k=[],x=[];t.forEach((d,m)=>{const f=u+m*T,v=i+(1-d.toneladas/s)*L,g=i+(1-d.faturamento/o)*L;k.push({x:f,y:v,data:d}),x.push({x:f,y:g,data:d})});const V=k.map((d,m)=>m===0?`M ${d.x} ${d.y}`:`L ${d.x} ${d.y}`).join(" "),S=x.map((d,m)=>m===0?`M ${d.x} ${d.y}`:`L ${d.x} ${d.y}`).join(" "),H=[0,.33,.66,1].map(d=>{const m=i+d*L;return`<line x1="${u}" y1="${m}" x2="${a-h}" y2="${m}" stroke="#f1f5f9" stroke-width="1.5" stroke-dasharray="4 4" />`}).join(""),I=t.map((d,m)=>{const f=u+m*T,v=`Semana ${m+1}`;return`<text x="${f}" y="${e-12}" text-anchor="middle" font-size="12" font-weight="700" fill="#475569">${v}</text>`}).join(""),P=t.map((d,m)=>{const f=k[m],v=x[m];let g=f.y-12,y=v.y+18;return v.y<f.y-10?(y=v.y-12,g=f.y+18):Math.abs(f.y-v.y)<15&&(g=f.y-12,y=v.y+18),y>232&&(y=232),g>232&&(g=232),`
      <g class="chart-clean-labels">
        <!-- Rótulo Volume (TN) -->
        <text x="${f.x}" y="${g}" text-anchor="middle" font-size="11" font-weight="800" fill="#1b4332">${f.data.toneladasFormatado}</text>
        <!-- Rótulo Faturamento (R$) -->
        <text x="${v.x}" y="${y}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#b89218">${v.data.faturamentoFormatado}</text>
      </g>
    `}).join(""),A=k.map(d=>`
    <circle cx="${d.x}" cy="${d.y}" r="6" fill="#2d6a4f" stroke="#ffffff" stroke-width="2.5" />
  `).join(""),R=x.map(d=>`
    <circle cx="${d.x}" cy="${d.y}" r="6" fill="#d4af37" stroke="#ffffff" stroke-width="2.5" />
  `).join("");n.innerHTML=`
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

        <!-- 1. Linhas de Grade -->
        ${H}

        <!-- 2. Linhas do Gráfico -->
        <path d="${S}" fill="none" stroke="url(#fatGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="${V}" fill="none" stroke="url(#volGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

        <!-- 3. Círculos dos Vértices -->
        ${R}
        ${A}

        <!-- 4. Rótulos Limpos Sem Caixas de Texto (com travamento e afaste inteligente) -->
        ${P}

        <!-- 5. Eixo X com Nomes das Semanas -->
        ${I}
      </svg>
    </div>
  `}function E(){if(!r)return;const n=document.getElementById("branches-table-body");if(!n)return;let t=r.rankings.filiais;p!=="todos"&&r.semanal[p]&&(t=r.semanal[p].rankings.filiais);let s=t.filter(e=>{const i=e.name.toLowerCase().includes(b),l=e.mesoregion?e.mesoregion.toLowerCase().includes(b):!1;return i||l});s.sort((e,i)=>c==="volume"?i.toneladas-e.toneladas:i.faturamento-e.faturamento);const o=t.reduce((e,i)=>e+i.toneladas,0)||1,a=t.reduce((e,i)=>e+i.faturamento,0)||1;if(s.length===0){n.innerHTML='<tr><td colspan="8" style="text-align: center; color: var(--text-light); padding:1.5rem 0">Nenhuma loja encontrada com o filtro digitado.</td></tr>';return}n.innerHTML=s.map((e,i)=>{const l=e.toneladas/o*100,u=e.faturamento/a*100;return`
      <tr>
        <td><span class="rank-pos ${i<3?"top-rank":""}">${i+1}</span></td>
        <td><strong>${e.name}</strong></td>
        <td><span class="region-badge">${e.mesoregion||"Não Mapeado"}</span></td>
        <td class="text-right ${c==="volume"?"text-green":""}" style="font-weight:700">${e.toneladasFormatado}</td>
        <td class="text-right" style="color:var(--medium-green)">${l.toFixed(2)}%</td>
        <td class="text-right ${c==="faturamento"?"text-gold":""}" style="font-weight:700">${e.faturamentoFormatado}</td>
        <td class="text-right" style="color:var(--accent-gold)">${u.toFixed(2)}%</td>
        <td class="text-right">${e.pedidos?e.pedidos.toLocaleString("pt-BR"):"-"}</td>
      </tr>
    `}).join("")}function _(){document.querySelectorAll(".progress-bar").forEach(t=>{const s=t.getAttribute("data-width");s&&(t.style.width=s)})}document.addEventListener("DOMContentLoaded",z);
