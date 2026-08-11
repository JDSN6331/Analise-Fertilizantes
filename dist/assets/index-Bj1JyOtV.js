(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const e of a)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const e={};return a.integrity&&(e.integrity=a.integrity),a.referrerPolicy&&(e.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?e.credentials="include":a.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(a){if(a.ep)return;a.ep=!0;const e=n(a);fetch(a.href,e)}})();let l=null,p="todos",c="volume",w="";const y=document.getElementById("loader"),L=document.getElementById("week-select-global"),j=document.getElementById("branch-search-input");async function N(){try{const i=await fetch("./data/dashboard_data.json");if(!i.ok)throw new Error("Falha ao carregar o arquivo JSON de dados");l=await i.json(),y&&(y.style.display="none"),l&&(G(),b())}catch(i){console.error("Erro na inicialização do painel:",i),y&&(y.innerHTML=`
        <div style="color: #ef4444; font-weight: 700; font-size: 1.2rem;">🚨 Erro ao carregar dados</div>
        <p style="margin-top: 0.5rem; color: #475569;">Por favor, verifique se o arquivo public/data/dashboard_data.json foi criado.</p>
      `)}}function G(){L&&(L.value="todos",p="todos",L.addEventListener("change",t=>{p=t.target.value,b()}));const i=document.querySelectorAll(".btn-toggle");i.forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-metric");n&&(c=n,i.forEach(s=>s.classList.remove("active")),t.classList.add("active"),b())})}),j&&j.addEventListener("input",t=>{w=t.target.value.toLowerCase().trim(),l&&M()})}function b(){l&&(R(),D(),O(),q(),W(),U(),M(),setTimeout(()=>{X()},80))}function R(){if(!l)return;const i=document.getElementById("kpi-container");if(!i)return;let t=l.kpis.volumeFormatado,n=l.kpis.faturamentoFormatado,s=l.kpis.pedidosFormatado,a=l.kpis.filiaisTotal;if(p!=="todos"&&l.semanal[p]){const e=l.semanal[p].kpis;t=e.volumeFormatado,n=e.faturamentoFormatado,s=e.pedidosFormatado,a=e.filiaisTotal}i.innerHTML=`
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
        <span class="kpi-value">${s}</span>
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
  `}function D(){if(!l)return;const i=document.getElementById("simple-legend-container");if(!i)return;const t=[...l.mesorregionais].sort((n,s)=>n.name.localeCompare(s.name));i.innerHTML=t.map(n=>{const s=n.filiais||[],a=s.map(e=>e.name.replace("Loja ","").replace("Unidade Avançada ","UA ")).join(", ");return`
      <div class="simple-legend-row">
        <span class="legend-reg-badge">${n.name}</span>
        <span class="legend-reg-count">(${s.length} lojas):</span>
        <span class="legend-reg-stores">${a}</span>
      </div>
    `}).join("")}function O(){if(!l)return;const i=document.getElementById("podium-branch-tag"),t=document.getElementById("podium-region-tag"),n=c==="volume"?"Volume (TN)":"Faturamento (R$)";i&&(i.textContent=n),t&&(t.textContent=n);let s=l.rankings.filiais,a=l.mesorregionais;p!=="todos"&&l.semanal[p]&&(s=l.semanal[p].rankings.filiais,a=l.semanal[p].rankings.mesorregionais);const e=[...s].sort((d,u)=>c==="volume"?u.toneladas-d.toneladas:u.faturamento-d.faturamento),r=[...a].sort((d,u)=>c==="volume"?u.toneladas-d.toneladas:u.faturamento-d.faturamento);T("podium-branches",e.slice(0,3).map(d=>({title:d.name,subText:d.mesoregion||"",valueFormatted:c==="volume"?d.toneladasFormatado:d.faturamentoFormatado}))),T("podium-regions",r.slice(0,3).map(d=>{const u=(d.filiais||[]).slice(0,3).map(h=>h.name.replace("Loja ","").replace("Unidade Avançada ","UA ")).join(", ");return{title:d.name,subText:u?`Top Lojas: ${u}`:`${d.filiais?d.filiais.length:0} Lojas`,valueFormatted:c==="volume"?d.toneladasFormatado:d.faturamentoFormatado}}))}function T(i,t){const n=document.getElementById(i);if(!n)return;if(t.length<3){n.innerHTML='<p style="text-align:center; color:var(--text-light); padding:1rem 0">Dados insuficientes para pódio</p>';return}const s=t[0],a=t[1],e=t[2];n.innerHTML=`
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
        <div class="podium-name" style="font-size:0.95rem; font-weight:800">${s.title}</div>
        <div class="podium-filial" style="font-weight:600" title="${s.subText}">${s.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value" style="font-size:1.15rem">${s.valueFormatted}</span>
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
  `}function q(){if(!l)return;const i=document.getElementById("mesoregions-list");if(!i)return;let t=l.mesorregionais;p!=="todos"&&l.semanal[p]&&(t=l.semanal[p].rankings.mesorregionais);const n=[...t].sort((e,r)=>c==="volume"?r.toneladas-e.toneladas:r.faturamento-e.faturamento),s=n.reduce((e,r)=>e+r.toneladas,0)||1,a=n.reduce((e,r)=>e+r.faturamento,0)||1;i.innerHTML=n.map(e=>{const r=c==="volume"?e.toneladasFormatado:e.faturamentoFormatado,d=c==="volume"?e.faturamentoFormatado:e.toneladasFormatado,u=c==="volume"?e.toneladas/s*100:e.faturamento/a*100,h=e.filiais?e.filiais.length:0;return`
      <div class="region-item">
        <div class="region-meta">
          <span class="region-title">${e.name}</span>
          <div class="region-value-group">
            <span class="region-value ${c==="volume"?"text-green":"text-gold"}">${r}</span>
            <span class="region-percent">Share: ${u.toFixed(1)}%</span>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-bar ${c==="faturamento"?"bar-gold":""}" data-width="${u.toFixed(1)}%"></div>
        </div>
        <span class="analyst-name">${h} Lojas ativas • ${c==="volume"?"Faturamento: "+d:"Volume: "+d}</span>
      </div>
    `}).join("")}function W(){if(!l)return;const i=document.getElementById("top-sellers-list");if(!i)return;let t=l.rankings.vendedores;p!=="todos"&&l.semanal[p]&&(t=l.semanal[p].rankings.vendedores);const n=[...t].sort((s,a)=>c==="volume"?a.toneladas-s.toneladas:a.faturamento-s.faturamento).slice(0,10);if(n.length===0){i.innerHTML='<p style="text-align:center; color:var(--text-light); padding:1rem 0">Nenhum vendedor no período</p>';return}i.innerHTML=n.map((s,a)=>{const e=c==="volume"?s.toneladasFormatado:s.faturamentoFormatado,r=c==="volume"?s.faturamentoFormatado:s.toneladasFormatado;let d="rank-pos-default";return a===0?d="rank-pos-1":a===1?d="rank-pos-2":a===2&&(d="rank-pos-3"),`
      <div class="seller-item">
        <span class="seller-rank-badge ${d}">${a+1}</span>
        <div class="seller-info">
          <div class="seller-name-row">
            <span class="seller-name">${s.name}</span>
            <span class="seller-val ${c==="volume"?"text-green":"text-gold"}">${e}</span>
          </div>
          <span class="seller-sub">${s.filial} • ${c==="volume"?"Fat: "+r:"Vol: "+r}</span>
        </div>
      </div>
    `}).join("")}function U(){if(!l)return;const i=document.getElementById("weekly-evolution-list");if(!i)return;const t=l.semanasResumo;if(t.length===0)return;const n=Math.max(...t.map(o=>o.toneladas))||1,s=Math.max(...t.map(o=>o.faturamento))||1,a=900,e=260,r=50,d=45,u=70,h=70,E=a-u-h,$=e-r-d,B=t.length,F=E/(B-1),k=[],x=[];t.forEach((o,m)=>{const f=u+m*F,g=r+(1-o.toneladas/n)*$,v=r+(1-o.faturamento/s)*$;k.push({x:f,y:g,data:o}),x.push({x:f,y:v,data:o})});const C=k.map((o,m)=>m===0?`M ${o.x} ${o.y}`:`L ${o.x} ${o.y}`).join(" "),V=x.map((o,m)=>m===0?`M ${o.x} ${o.y}`:`L ${o.x} ${o.y}`).join(" "),S=[0,.33,.66,1].map(o=>{const m=r+o*$;return`<line x1="${u}" y1="${m}" x2="${a-h}" y2="${m}" stroke="#f1f5f9" stroke-width="1.5" stroke-dasharray="4 4" />`}).join(""),H=t.map((o,m)=>{const f=u+m*F,g=`Semana ${m+1}`;return`<text x="${f}" y="${e-10}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#475569">${g}</text>`}).join(""),I=k.map(o=>{const m=o.data.toneladasFormatado,f=m.length*6.5+16,g=o.x-f/2,v=o.y-28;return`
      <g class="chart-label-group">
        <rect x="${g}" y="${v}" width="${f}" height="18" rx="4" fill="#ffffff" stroke="rgba(45, 106, 79, 0.25)" stroke-width="1" />
        <text x="${o.x}" y="${v+13}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#1b4332">${m}</text>
      </g>
    `}).join(""),P=x.map(o=>{const m=o.data.faturamentoFormatado,f=m.length*6.2+16,g=o.x-f/2,v=o.y+12;return`
      <g class="chart-label-group">
        <rect x="${g}" y="${v}" width="${f}" height="18" rx="4" fill="#ffffff" stroke="rgba(212, 175, 55, 0.3)" stroke-width="1" />
        <text x="${o.x}" y="${v+13}" text-anchor="middle" font-size="10" font-weight="700" fill="#b89218">${m}</text>
      </g>
    `}).join(""),A=k.map(o=>`
    <circle cx="${o.x}" cy="${o.y}" r="6.5" fill="#2d6a4f" stroke="#ffffff" stroke-width="2.5" />
  `).join(""),z=x.map(o=>`
    <circle cx="${o.x}" cy="${o.y}" r="6.5" fill="#d4af37" stroke="#ffffff" stroke-width="2.5" />
  `).join("");i.innerHTML=`
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
        ${S}

        <!-- 2. Linhas do Gráfico (Fundo) -->
        <path d="${V}" fill="none" stroke="url(#fatGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="${C}" fill="none" stroke="url(#volGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

        <!-- 3. Círculos nos Vértices -->
        ${z}
        ${A}

        <!-- 4. Rótulos com Fundo Branco (Frente das Linhas para não serem cortados) -->
        ${P}
        ${I}

        <!-- 5. Eixo X com Nomes das Semanas -->
        ${H}
      </svg>
    </div>
  `}function M(){if(!l)return;const i=document.getElementById("branches-table-body");if(!i)return;let t=l.rankings.filiais;p!=="todos"&&l.semanal[p]&&(t=l.semanal[p].rankings.filiais);let n=t.filter(e=>{const r=e.name.toLowerCase().includes(w),d=e.mesoregion?e.mesoregion.toLowerCase().includes(w):!1;return r||d});n.sort((e,r)=>c==="volume"?r.toneladas-e.toneladas:r.faturamento-e.faturamento);const s=t.reduce((e,r)=>e+r.toneladas,0)||1,a=t.reduce((e,r)=>e+r.faturamento,0)||1;if(n.length===0){i.innerHTML='<tr><td colspan="8" style="text-align: center; color: var(--text-light); padding:1.5rem 0">Nenhuma loja encontrada com o filtro digitado.</td></tr>';return}i.innerHTML=n.map((e,r)=>{const d=e.toneladas/s*100,u=e.faturamento/a*100;return`
      <tr>
        <td><span class="rank-pos ${r<3?"top-rank":""}">${r+1}</span></td>
        <td><strong>${e.name}</strong></td>
        <td><span class="region-badge">${e.mesoregion||"Não Mapeado"}</span></td>
        <td class="text-right ${c==="volume"?"text-green":""}" style="font-weight:700">${e.toneladasFormatado}</td>
        <td class="text-right" style="color:var(--medium-green)">${d.toFixed(2)}%</td>
        <td class="text-right ${c==="faturamento"?"text-gold":""}" style="font-weight:700">${e.faturamentoFormatado}</td>
        <td class="text-right" style="color:var(--accent-gold)">${u.toFixed(2)}%</td>
        <td class="text-right">${e.pedidos?e.pedidos.toLocaleString("pt-BR"):"-"}</td>
      </tr>
    `}).join("")}function X(){document.querySelectorAll(".progress-bar").forEach(t=>{const n=t.getAttribute("data-width");n&&(t.style.width=n)})}document.addEventListener("DOMContentLoaded",N);
