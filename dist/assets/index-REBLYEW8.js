(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const e of n.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&i(e)}).observe(document,{childList:!0,subtree:!0});function o(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(a){if(a.ep)return;a.ep=!0;const n=o(a);fetch(a.href,n)}})();let v=null,y="",c="todos",d="volume",j="todas",B="";const F=document.getElementById("loader"),x=document.getElementById("month-select-global"),w=document.getElementById("week-select-global"),V=document.getElementById("branch-search-input"),S=document.getElementById("header-period-badge"),H=document.getElementById("weekly-evolution-title-span");function h(){return!v||!y||!v.months[y]?null:v.months[y]}async function K(){var t;try{const s=await fetch("./data/dashboard_data.json");if(!s.ok)throw new Error("Falha ao carregar o arquivo JSON de dados");v=await s.json(),F&&(F.style.display="none"),v&&(y=v.latestMonth||((t=v.availableMonths[0])==null?void 0:t.id)||"",Y(),I(),U(),T())}catch(s){console.error("Erro na inicialização do painel:",s),F&&(F.innerHTML=`
        <div style="color: #ef4444; font-weight: 700; font-size: 1.2rem;">🚨 Erro ao carregar dados</div>
        <p style="margin-top: 0.5rem; color: #475569;">Por favor, verifique se o arquivo public/data/dashboard_data.json foi criado.</p>
      `)}}function Y(){!v||!x||(x.innerHTML=v.availableMonths.map(t=>`
    <option value="${t.id}">${t.label}${t.id===(v==null?void 0:v.latestMonth)?" (Mês Vigente)":""}</option>
  `).join(""),x.value=y)}function I(){const t=h();if(!t||!w)return;const s=t.semanasResumo||[];let o=`<option value="todos">${t.label} (Mês Completo)</option>`;s.forEach((i,a)=>{const n=(a+1).toString();o+=`<option value="${n}">${i.label}</option>`}),w.innerHTML=o,w.value=c}function U(){x&&x.addEventListener("change",o=>{y=o.target.value,c="todos",I(),T()}),w&&w.addEventListener("change",o=>{c=o.target.value,T()});const t=document.querySelectorAll(".btn-toggle");t.forEach(o=>{o.addEventListener("click",()=>{const i=o.getAttribute("data-metric");i&&(d=i,t.forEach(a=>a.classList.remove("active")),o.classList.add("active"),T())})});const s=document.getElementById("podium-region-filter");s&&(s.value="todas",j="todas",s.addEventListener("change",o=>{j=o.target.value,P()})),V&&V.addEventListener("input",o=>{B=o.target.value.toLowerCase().trim(),z()})}function T(){const t=h();t&&(S&&(S.textContent=`Período ${t.label}`),H&&(H.textContent=`(${t.label})`),J(),Q(),P(),Z(),ee(),te(),z(),setTimeout(()=>{oe()},80))}function J(){const t=h();if(!t)return;const s=document.getElementById("kpi-container");if(!s)return;let o=t.kpis.volumeFormatado,i=t.kpis.faturamentoFormatado,a=t.kpis.pedidosFormatado,n=t.kpis.filiaisTotal;if(c!=="todos"&&t.semanal[c]){const e=t.semanal[c].kpis;o=e.volumeFormatado,i=e.faturamentoFormatado,a=e.pedidosFormatado,n=e.filiaisTotal}s.innerHTML=`
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
        <span class="kpi-value">${a}</span>
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
        <span class="kpi-value">${n}</span>
      </div>
    </div>
  `}function Q(){const t=h();if(!t)return;const s=document.getElementById("simple-legend-container");if(!s)return;const o=[...t.mesorregionais].sort((i,a)=>i.name.localeCompare(a.name));s.innerHTML=o.map(i=>{const a=i.filiais||[],n=a.map(e=>e.name.replace("Loja ","").replace("Unidade Avançada ","UA ")).join(", ");return`
      <div class="simple-legend-row">
        <span class="legend-reg-badge">${i.name}</span>
        <span class="legend-reg-count">(${a.length} lojas):</span>
        <span class="legend-reg-stores">${n}</span>
      </div>
    `}).join("")}function P(){const t=h();if(!t)return;const s=document.getElementById("podium-branch-tag"),o=d==="volume"?"Volume (TN)":"Faturamento (R$)";s&&(s.textContent=o);let i=t.rankings.filiais;c!=="todos"&&t.semanal[c]&&(i=t.semanal[c].rankings.filiais),j!=="todas"&&(i=i.filter(n=>n.mesoregion===j));const a=[...i].sort((n,e)=>d==="volume"?e.toneladas-n.toneladas:e.faturamento-n.faturamento);X("podium-branches",a.slice(0,3).map(n=>({title:n.name,subText:n.mesoregion||"",valueFormatted:d==="volume"?n.toneladasFormatado:n.faturamentoFormatado})))}function X(t,s){const o=document.getElementById(t);if(!o)return;if(s.length===0){o.innerHTML='<p style="text-align:center; color:var(--text-light); padding:2rem 0; font-weight:600">Nenhuma loja encontrada para a regional selecionada neste período.</p>';return}if(s.length<3){const e=s[0],r=s[1]||null;o.innerHTML=`
      ${r?`
      <!-- 2º Lugar -->
      <div class="podium-step rank-2">
        <div class="podium-avatar-wrapper">
          <div class="podium-badge-icon silver" title="2º Lugar">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="9" r="6"></circle>
              <path d="M15.5 15.5L18 22l-6-3-6 3 2.5-6.5"></path>
            </svg>
          </div>
          <div class="podium-name">${r.title}</div>
          <div class="podium-filial" title="${r.subText}">${r.subText}</div>
        </div>
        <div class="podium-spot">
          <span class="podium-value">${r.valueFormatted}</span>
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
          <div class="podium-name" style="font-size:0.95rem; font-weight:800">${e.title}</div>
          <div class="podium-filial" style="font-weight:600" title="${e.subText}">${e.subText}</div>
        </div>
        <div class="podium-spot">
          <span class="podium-value" style="font-size:1.15rem">${e.valueFormatted}</span>
          <span class="podium-label-tag">1º Lugar Líder</span>
        </div>
      </div>
    `;return}const i=s[0],a=s[1],n=s[2];o.innerHTML=`
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

    <!-- 1º Lugar (Campeão) -->
    <div class="podium-step rank-1">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon gold" title="1º Lugar Campeão">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"></path>
            <path d="M5 20h14"></path>
          </svg>
        </div>
        <div class="podium-name" style="font-size:0.95rem; font-weight:800">${i.title}</div>
        <div class="podium-filial" style="font-weight:600" title="${i.subText}">${i.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value" style="font-size:1.15rem">${i.valueFormatted}</span>
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
        <div class="podium-name">${n.title}</div>
        <div class="podium-filial" title="${n.subText}">${n.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value">${n.valueFormatted}</span>
        <span class="podium-label-tag">3º Lugar</span>
      </div>
    </div>
  `}function Z(){const t=h();if(!t)return;const s=document.getElementById("mesoregions-list");if(!s)return;let o=t.mesorregionais;c!=="todos"&&t.semanal[c]&&(o=t.semanal[c].rankings.mesorregionais);const i=[...o].sort((e,r)=>d==="volume"?r.toneladas-e.toneladas:r.faturamento-e.faturamento),a=i.reduce((e,r)=>e+r.toneladas,0)||1,n=i.reduce((e,r)=>e+r.faturamento,0)||1;s.innerHTML=i.map(e=>{const r=d==="volume"?e.toneladasFormatado:e.faturamentoFormatado,p=d==="volume"?e.faturamentoFormatado:e.toneladasFormatado,g=d==="volume"?e.toneladas/a*100:e.faturamento/n*100,b=e.filiais?e.filiais.length:0;return`
      <div class="region-item">
        <div class="region-meta">
          <span class="region-title">${e.name}</span>
          <div class="region-value-group">
            <span class="region-value ${d==="volume"?"text-green":"text-gold"}">${r}</span>
            <span class="region-percent">Share: ${g.toFixed(1)}%</span>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-bar ${d==="faturamento"?"bar-gold":""}" data-width="${g.toFixed(1)}%"></div>
        </div>
        <span class="analyst-name">${b} Lojas ativas • ${d==="volume"?"Faturamento: "+p:"Volume: "+p}</span>
      </div>
    `}).join("")}function ee(){const t=h();if(!t)return;const s=document.getElementById("top-sellers-list");if(!s)return;let o=t.rankings.vendedores;c!=="todos"&&t.semanal[c]&&(o=t.semanal[c].rankings.vendedores);const i=[...o].sort((a,n)=>d==="volume"?n.toneladas-a.toneladas:n.faturamento-a.faturamento).slice(0,10);if(i.length===0){s.innerHTML='<p style="text-align:center; color:var(--text-light); padding:1rem 0">Nenhum vendedor no período</p>';return}s.innerHTML=i.map((a,n)=>{const e=d==="volume"?a.toneladasFormatado:a.faturamentoFormatado,r=d==="volume"?a.faturamentoFormatado:a.toneladasFormatado;let p="rank-pos-default";return n===0?p="rank-pos-1":n===1?p="rank-pos-2":n===2&&(p="rank-pos-3"),`
      <div class="seller-item">
        <span class="seller-rank-badge ${p}">${n+1}</span>
        <div class="seller-info">
          <div class="seller-name-row">
            <span class="seller-name">${a.name}</span>
            <span class="seller-val ${d==="volume"?"text-green":"text-gold"}">${e}</span>
          </div>
          <span class="seller-sub">${a.filial} • ${d==="volume"?"Fat: "+r:"Vol: "+r}</span>
        </div>
      </div>
    `}).join("")}function te(){const t=h();if(!t)return;const s=document.getElementById("weekly-evolution-list");if(!s)return;const o=t.semanasResumo;if(o.length===0)return;const i=Math.max(...o.map(l=>l.toneladas))||1,a=Math.max(...o.map(l=>l.faturamento))||1,n=900,e=320,r=60,p=60,g=70,b=70,D=n-g-b,E=e-r-p,A=o.length,C=D/(A-1),L=[],M=[];o.forEach((l,u)=>{const m=g+u*C,f=r+(1-l.toneladas/i)*E,k=r+(1-l.faturamento/a)*E;L.push({x:m,y:f,data:l}),M.push({x:m,y:k,data:l})});const N=L.map((l,u)=>u===0?`M ${l.x} ${l.y}`:`L ${l.x} ${l.y}`).join(" "),R=M.map((l,u)=>u===0?`M ${l.x} ${l.y}`:`L ${l.x} ${l.y}`).join(" "),O=[0,.33,.66,1].map(l=>{const u=r+l*E;return`<line x1="${g}" y1="${u}" x2="${n-b}" y2="${u}" stroke="#f1f5f9" stroke-width="1.5" stroke-dasharray="4 4" />`}).join(""),G=o.map((l,u)=>{const m=g+u*C,f=`Semana ${u+1}`;return`<text x="${m}" y="${e-15}" text-anchor="middle" font-size="12" font-weight="700" fill="#475569">${f}</text>`}).join(""),q=o.map((l,u)=>{const m=L[u],f=M[u];let k=m.y-24,$=f.y+26;return f.y<m.y-10?($=f.y-24,k=m.y+26):Math.abs(m.y-f.y)<15&&(k=m.y-24,$=f.y+26),$>262&&($=262),k>262&&(k=262),`
      <g class="chart-clean-labels">
        <text x="${m.x}" y="${k}" text-anchor="middle" font-size="11.5" font-weight="800" fill="#1b4332" stroke="#ffffff" stroke-width="5" stroke-linejoin="round" paint-order="stroke fill">${m.data.toneladasFormatado}</text>
        <text x="${f.x}" y="${$}" text-anchor="middle" font-size="11" font-weight="700" fill="#b89218" stroke="#ffffff" stroke-width="5" stroke-linejoin="round" paint-order="stroke fill">${f.data.faturamentoFormatado}</text>
      </g>
    `}).join(""),W=L.map(l=>`
    <circle cx="${l.x}" cy="${l.y}" r="6.5" fill="#2d6a4f" stroke="#ffffff" stroke-width="2.5" />
  `).join(""),_=M.map(l=>`
    <circle cx="${l.x}" cy="${l.y}" r="6.5" fill="#d4af37" stroke="#ffffff" stroke-width="2.5" />
  `).join("");s.innerHTML=`
    <div class="line-chart-wrapper">
      <svg viewBox="0 0 ${n} ${e}" class="line-chart-svg" preserveAspectRatio="xMidYMid meet">
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

        ${O}

        <path d="${R}" fill="none" stroke="url(#fatGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="${N}" fill="none" stroke="url(#volGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

        ${_}
        ${W}

        ${q}

        ${G}
      </svg>
    </div>
  `}function z(){const t=h();if(!t)return;const s=document.getElementById("branches-table-body");if(!s)return;let o=t.rankings.filiais;c!=="todos"&&t.semanal[c]&&(o=t.semanal[c].rankings.filiais);let i=o.filter(e=>{const r=e.name.toLowerCase().includes(B),p=e.mesoregion?e.mesoregion.toLowerCase().includes(B):!1;return r||p});i.sort((e,r)=>d==="volume"?r.toneladas-e.toneladas:r.faturamento-e.faturamento);const a=o.reduce((e,r)=>e+r.toneladas,0)||1,n=o.reduce((e,r)=>e+r.faturamento,0)||1;if(i.length===0){s.innerHTML='<tr><td colspan="8" style="text-align: center; color: var(--text-light); padding:1.5rem 0">Nenhuma loja encontrada com o filtro digitado.</td></tr>';return}s.innerHTML=i.map((e,r)=>{const p=e.toneladas/a*100,g=e.faturamento/n*100;return`
      <tr>
        <td><span class="rank-pos ${r<3?"top-rank":""}">${r+1}</span></td>
        <td><strong>${e.name}</strong></td>
        <td><span class="region-badge">${e.mesoregion||"Não Mapeado"}</span></td>
        <td class="text-right ${d==="volume"?"text-green":""}" style="font-weight:700">${e.toneladasFormatado}</td>
        <td class="text-right" style="color:var(--medium-green)">${p.toFixed(2)}%</td>
        <td class="text-right ${d==="faturamento"?"text-gold":""}" style="font-weight:700">${e.faturamentoFormatado}</td>
        <td class="text-right" style="color:var(--accent-gold)">${g.toFixed(2)}%</td>
        <td class="text-right">${e.pedidos?e.pedidos.toLocaleString("pt-BR"):"-"}</td>
      </tr>
    `}).join("")}function oe(){document.querySelectorAll(".progress-bar").forEach(s=>{const o=s.getAttribute("data-width");o&&(s.style.width=o)})}document.addEventListener("DOMContentLoaded",K);
