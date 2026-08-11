(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(t){if(t.ep)return;t.ep=!0;const e=a(t);fetch(t.href,e)}})();let r=null,p="todos",d="volume",w="todas",F="";const x=document.getElementById("loader"),b=document.getElementById("week-select-global"),j=document.getElementById("branch-search-input");async function R(){try{const i=await fetch("./data/dashboard_data.json");if(!i.ok)throw new Error("Falha ao carregar o arquivo JSON de dados");r=await i.json(),x&&(x.style.display="none"),r&&(G(),M())}catch(i){console.error("Erro na inicialização do painel:",i),x&&(x.innerHTML=`
        <div style="color: #ef4444; font-weight: 700; font-size: 1.2rem;">🚨 Erro ao carregar dados</div>
        <p style="margin-top: 0.5rem; color: #475569;">Por favor, verifique se o arquivo public/data/dashboard_data.json foi criado.</p>
      `)}}function G(){b&&(b.value="todos",p="todos",b.addEventListener("change",a=>{p=a.target.value,M()}));const i=document.querySelectorAll(".btn-toggle");i.forEach(a=>{a.addEventListener("click",()=>{const n=a.getAttribute("data-metric");n&&(d=n,i.forEach(t=>t.classList.remove("active")),a.classList.add("active"),M())})});const o=document.getElementById("podium-region-filter");o&&(o.value="todas",w="todas",o.addEventListener("change",a=>{w=a.target.value,B()})),j&&j.addEventListener("input",a=>{F=a.target.value.toLowerCase().trim(),r&&C()})}function M(){r&&(O(),D(),B(),W(),_(),K(),C(),setTimeout(()=>{Y()},80))}function O(){if(!r)return;const i=document.getElementById("kpi-container");if(!i)return;let o=r.kpis.volumeFormatado,a=r.kpis.faturamentoFormatado,n=r.kpis.pedidosFormatado,t=r.kpis.filiaisTotal;if(p!=="todos"&&r.semanal[p]){const e=r.semanal[p].kpis;o=e.volumeFormatado,a=e.faturamentoFormatado,n=e.pedidosFormatado,t=e.filiaisTotal}i.innerHTML=`
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
        <span class="kpi-value text-green">${o}</span>
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
        <span class="kpi-value">${a}</span>
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
        <span class="kpi-value">${n}</span>
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
  `}function D(){if(!r)return;const i=document.getElementById("simple-legend-container");if(!i)return;const o=[...r.mesorregionais].sort((a,n)=>a.name.localeCompare(n.name));i.innerHTML=o.map(a=>{const n=a.filiais||[],t=n.map(e=>e.name.replace("Loja ","").replace("Unidade Avançada ","UA ")).join(", ");return`
      <div class="simple-legend-row">
        <span class="legend-reg-badge">${a.name}</span>
        <span class="legend-reg-count">(${n.length} lojas):</span>
        <span class="legend-reg-stores">${t}</span>
      </div>
    `}).join("")}function B(){if(!r)return;const i=document.getElementById("podium-branch-tag"),o=d==="volume"?"Volume (TN)":"Faturamento (R$)";i&&(i.textContent=o);let a=r.rankings.filiais;p!=="todos"&&r.semanal[p]&&(a=r.semanal[p].rankings.filiais),w!=="todas"&&(a=a.filter(t=>t.mesoregion===w));const n=[...a].sort((t,e)=>d==="volume"?e.toneladas-t.toneladas:e.faturamento-t.faturamento);q("podium-branches",n.slice(0,3).map(t=>({title:t.name,subText:t.mesoregion||"",valueFormatted:d==="volume"?t.toneladasFormatado:t.faturamentoFormatado})))}function q(i,o){const a=document.getElementById(i);if(!a)return;if(o.length===0){a.innerHTML='<p style="text-align:center; color:var(--text-light); padding:2rem 0; font-weight:600">Nenhuma loja encontrada para a regional selecionada neste período.</p>';return}if(o.length<3){const s=o[0],c=o[1]||null;a.innerHTML=`
      ${c?`
      <!-- 2º Lugar -->
      <div class="podium-step rank-2">
        <div class="podium-avatar-wrapper">
          <div class="podium-badge-icon silver" title="2º Lugar">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="9" r="6"></circle>
              <path d="M15.5 15.5L18 22l-6-3-6 3 2.5-6.5"></path>
            </svg>
          </div>
          <div class="podium-name">${c.title}</div>
          <div class="podium-filial" title="${c.subText}">${c.subText}</div>
        </div>
        <div class="podium-spot">
          <span class="podium-value">${c.valueFormatted}</span>
          <span class="podium-label-tag">2º Lugar</span>
        </div>
      </div>`:""}

      <!-- 1º Lugar (Campeão) -->
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
    `;return}const n=o[0],t=o[1],e=o[2];a.innerHTML=`
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
        <div class="podium-filial" title="${t.subText}">${t.subText}</div>
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
        <div class="podium-name" style="font-size:0.95rem; font-weight:800">${n.title}</div>
        <div class="podium-filial" style="font-weight:600" title="${n.subText}">${n.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value" style="font-size:1.15rem">${n.valueFormatted}</span>
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
  `}function W(){if(!r)return;const i=document.getElementById("mesoregions-list");if(!i)return;let o=r.mesorregionais;p!=="todos"&&r.semanal[p]&&(o=r.semanal[p].rankings.mesorregionais);const a=[...o].sort((e,s)=>d==="volume"?s.toneladas-e.toneladas:s.faturamento-e.faturamento),n=a.reduce((e,s)=>e+s.toneladas,0)||1,t=a.reduce((e,s)=>e+s.faturamento,0)||1;i.innerHTML=a.map(e=>{const s=d==="volume"?e.toneladasFormatado:e.faturamentoFormatado,c=d==="volume"?e.faturamentoFormatado:e.toneladasFormatado,f=d==="volume"?e.toneladas/n*100:e.faturamento/t*100,k=e.filiais?e.filiais.length:0;return`
      <div class="region-item">
        <div class="region-meta">
          <span class="region-title">${e.name}</span>
          <div class="region-value-group">
            <span class="region-value ${d==="volume"?"text-green":"text-gold"}">${s}</span>
            <span class="region-percent">Share: ${f.toFixed(1)}%</span>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-bar ${d==="faturamento"?"bar-gold":""}" data-width="${f.toFixed(1)}%"></div>
        </div>
        <span class="analyst-name">${k} Lojas ativas • ${d==="volume"?"Faturamento: "+c:"Volume: "+c}</span>
      </div>
    `}).join("")}function _(){if(!r)return;const i=document.getElementById("top-sellers-list");if(!i)return;let o=r.rankings.vendedores;p!=="todos"&&r.semanal[p]&&(o=r.semanal[p].rankings.vendedores);const a=[...o].sort((n,t)=>d==="volume"?t.toneladas-n.toneladas:t.faturamento-n.faturamento).slice(0,10);if(a.length===0){i.innerHTML='<p style="text-align:center; color:var(--text-light); padding:1rem 0">Nenhum vendedor no período</p>';return}i.innerHTML=a.map((n,t)=>{const e=d==="volume"?n.toneladasFormatado:n.faturamentoFormatado,s=d==="volume"?n.faturamentoFormatado:n.toneladasFormatado;let c="rank-pos-default";return t===0?c="rank-pos-1":t===1?c="rank-pos-2":t===2&&(c="rank-pos-3"),`
      <div class="seller-item">
        <span class="seller-rank-badge ${c}">${t+1}</span>
        <div class="seller-info">
          <div class="seller-name-row">
            <span class="seller-name">${n.name}</span>
            <span class="seller-val ${d==="volume"?"text-green":"text-gold"}">${e}</span>
          </div>
          <span class="seller-sub">${n.filial} • ${d==="volume"?"Fat: "+s:"Vol: "+s}</span>
        </div>
      </div>
    `}).join("")}function K(){if(!r)return;const i=document.getElementById("weekly-evolution-list");if(!i)return;const o=r.semanasResumo;if(o.length===0)return;const a=Math.max(...o.map(l=>l.toneladas))||1,n=Math.max(...o.map(l=>l.faturamento))||1,t=900,e=320,s=60,c=60,f=70,k=70,E=t-f-k,L=e-s-c,V=o.length,T=E/(V-1),y=[],$=[];o.forEach((l,u)=>{const m=f+u*T,v=s+(1-l.toneladas/a)*L,g=s+(1-l.faturamento/n)*L;y.push({x:m,y:v,data:l}),$.push({x:m,y:g,data:l})});const H=y.map((l,u)=>u===0?`M ${l.x} ${l.y}`:`L ${l.x} ${l.y}`).join(" "),P=$.map((l,u)=>u===0?`M ${l.x} ${l.y}`:`L ${l.x} ${l.y}`).join(" "),S=[0,.33,.66,1].map(l=>{const u=s+l*L;return`<line x1="${f}" y1="${u}" x2="${t-k}" y2="${u}" stroke="#f1f5f9" stroke-width="1.5" stroke-dasharray="4 4" />`}).join(""),z=o.map((l,u)=>{const m=f+u*T,v=`Semana ${u+1}`;return`<text x="${m}" y="${e-15}" text-anchor="middle" font-size="12" font-weight="700" fill="#475569">${v}</text>`}).join(""),I=o.map((l,u)=>{const m=y[u],v=$[u];let g=m.y-24,h=v.y+26;return v.y<m.y-10?(h=v.y-24,g=m.y+26):Math.abs(m.y-v.y)<15&&(g=m.y-24,h=v.y+26),h>262&&(h=262),g>262&&(g=262),`
      <g class="chart-clean-labels">
        <text x="${m.x}" y="${g}" text-anchor="middle" font-size="11.5" font-weight="800" fill="#1b4332" stroke="#ffffff" stroke-width="5" stroke-linejoin="round" paint-order="stroke fill">${m.data.toneladasFormatado}</text>
        <text x="${v.x}" y="${h}" text-anchor="middle" font-size="11" font-weight="700" fill="#b89218" stroke="#ffffff" stroke-width="5" stroke-linejoin="round" paint-order="stroke fill">${v.data.faturamentoFormatado}</text>
      </g>
    `}).join(""),A=y.map(l=>`
    <circle cx="${l.x}" cy="${l.y}" r="6.5" fill="#2d6a4f" stroke="#ffffff" stroke-width="2.5" />
  `).join(""),N=$.map(l=>`
    <circle cx="${l.x}" cy="${l.y}" r="6.5" fill="#d4af37" stroke="#ffffff" stroke-width="2.5" />
  `).join("");i.innerHTML=`
    <div class="line-chart-wrapper">
      <svg viewBox="0 0 ${t} ${e}" class="line-chart-svg" preserveAspectRatio="xMidYMid meet">
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

        ${S}

        <path d="${P}" fill="none" stroke="url(#fatGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="${H}" fill="none" stroke="url(#volGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

        ${N}
        ${A}

        ${I}

        ${z}
      </svg>
    </div>
  `}function C(){if(!r)return;const i=document.getElementById("branches-table-body");if(!i)return;let o=r.rankings.filiais;p!=="todos"&&r.semanal[p]&&(o=r.semanal[p].rankings.filiais);let a=o.filter(e=>{const s=e.name.toLowerCase().includes(F),c=e.mesoregion?e.mesoregion.toLowerCase().includes(F):!1;return s||c});a.sort((e,s)=>d==="volume"?s.toneladas-e.toneladas:s.faturamento-e.faturamento);const n=o.reduce((e,s)=>e+s.toneladas,0)||1,t=o.reduce((e,s)=>e+s.faturamento,0)||1;if(a.length===0){i.innerHTML='<tr><td colspan="8" style="text-align: center; color: var(--text-light); padding:1.5rem 0">Nenhuma loja encontrada com o filtro digitado.</td></tr>';return}i.innerHTML=a.map((e,s)=>{const c=e.toneladas/n*100,f=e.faturamento/t*100;return`
      <tr>
        <td><span class="rank-pos ${s<3?"top-rank":""}">${s+1}</span></td>
        <td><strong>${e.name}</strong></td>
        <td><span class="region-badge">${e.mesoregion||"Não Mapeado"}</span></td>
        <td class="text-right ${d==="volume"?"text-green":""}" style="font-weight:700">${e.toneladasFormatado}</td>
        <td class="text-right" style="color:var(--medium-green)">${c.toFixed(2)}%</td>
        <td class="text-right ${d==="faturamento"?"text-gold":""}" style="font-weight:700">${e.faturamentoFormatado}</td>
        <td class="text-right" style="color:var(--accent-gold)">${f.toFixed(2)}%</td>
        <td class="text-right">${e.pedidos?e.pedidos.toLocaleString("pt-BR"):"-"}</td>
      </tr>
    `}).join("")}function Y(){document.querySelectorAll(".progress-bar").forEach(o=>{const a=o.getAttribute("data-width");a&&(o.style.width=a)})}document.addEventListener("DOMContentLoaded",R);
