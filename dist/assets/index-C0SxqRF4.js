(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=a(t);fetch(t.href,n)}})();let m=null,p="vendedores",L=0,E="",y="todos",v="todos";const b=document.getElementById("loader"),B=document.querySelectorAll(".nav-tab"),C=document.querySelectorAll(".tab-content"),M=document.querySelectorAll(".sub-nav-btn"),H=document.querySelectorAll(".ranking-view"),u=document.getElementById("ranking-search-input");async function S(){try{const o=await fetch("./data/dashboard_data.json");if(!o.ok)throw new Error("Falha ao carregar o arquivo JSON de dados");m=await o.json(),b&&(b.style.display="none"),m&&(A(),N(m),P(m),w(m))}catch(o){console.error("Erro na inicialização do painel:",o),b&&(b.innerHTML=`
        <div style="color: #ef4444; font-weight: 700; font-size: 1.2rem;">🚨 Erro ao carregar dados</div>
        <p style="margin-top: 0.5rem; color: #475569;">Por favor, verifique se o arquivo public/data/dashboard_data.json foi criado.</p>
      `)}}function A(){B.forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-tab");s&&j(s)})}),M.forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-ranking");s&&V(s)})}),u&&u.addEventListener("input",a=>{E=a.target.value.toLowerCase(),m&&w(m)});const o=document.getElementById("week-select-filter");o&&o.addEventListener("change",a=>{y=a.target.value,m&&w(m)});const e=document.getElementById("region-week-select");e&&e.addEventListener("change",a=>{v=a.target.value,m&&T(m)})}function j(o){B.forEach(e=>{e.getAttribute("data-tab")===o?e.classList.add("active"):e.classList.remove("active")}),C.forEach(e=>{e.id===`tab-${o}`?e.classList.add("active"):e.classList.remove("active")}),o==="overview"&&m&&setTimeout(()=>{I()},50)}function V(o){p=o,M.forEach(e=>{e.getAttribute("data-ranking")===o?e.classList.add("active"):e.classList.remove("active")}),H.forEach(e=>{e.id===`ranking-view-${o}`?e.classList.add("active"):e.classList.remove("active")}),u&&(u.value="",E=""),m&&w(m)}function I(){document.querySelectorAll(".progress-bar, .bar-fill, .chart-fill, .weekly-fill-ton, .weekly-fill-fat").forEach(e=>{const a=e.getAttribute("data-width");a&&(e.style.width=a)})}function $(o,e,a=!1){const s=document.getElementById(o);if(!s)return;if(e.length===0){s.innerHTML='<p style="text-align:center; color:var(--text-light); padding:2rem 0">Nenhum dado disponível</p>';return}const t=e[0].value||1;s.innerHTML=e.map((n,i)=>{const d=n.value/t*100;return`
      <div class="chart-item">
        <div class="chart-rank ${i===0?"first":""}">${i+1}</div>
        <div class="chart-info">
          <div class="chart-label-row">
            <span class="chart-name">${n.name}</span>
            <span class="chart-val ${a?"fat":""}">${n.valueFormatted}</span>
          </div>
          <div class="chart-track">
            <div class="chart-fill ${a?"fat":""}" data-width="${d.toFixed(1)}%"></div>
          </div>
        </div>
      </div>
    `}).join("")}function N(o){const e=o.kpis,a=document.getElementById("kpi-container");a&&(a.innerHTML=`
      <!-- Faturamento -->
      <div class="kpi-card gold-border">
        <div class="kpi-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div class="kpi-details">
          <span class="kpi-label">Faturamento Total</span>
          <span class="kpi-value">${e.faturamentoFormatado}</span>
        </div>
      </div>

      <!-- Volume em Toneladas -->
      <div class="kpi-card gold-border">
        <div class="kpi-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <div class="kpi-details">
          <span class="kpi-label">Volume Total Solo</span>
          <span class="kpi-value">${e.volumeFormatado}</span>
        </div>
      </div>

      <!-- Pedidos -->
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
          <span class="kpi-label">Volume de Pedidos</span>
          <span class="kpi-value">${e.pedidosFormatado}</span>
        </div>
      </div>

      <!-- Vendedores Ativos -->
      <div class="kpi-card">
        <div class="kpi-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
          </svg>
        </div>
        <div class="kpi-details">
          <span class="kpi-label">Vendedores Ativos</span>
          <span class="kpi-value">${e.vendedoresTotal.toLocaleString("pt-BR")}</span>
        </div>
      </div>
    `);const s=document.getElementById("overview-regions-list");s&&(s.innerHTML=o.mesorregionais.map(r=>`
      <div class="region-item">
        <div class="region-meta">
          <span class="region-title">${r.name}</span>
          <div class="region-value-group">
            <span class="region-value" style="color:var(--medium-green)">${r.toneladasFormatado}</span>
            <span class="region-percent">Part. Volume: ${r.shareToneladas.toFixed(2)}%</span>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-bar" data-width="${r.shareToneladas.toFixed(1)}%"></div>
        </div>
        <span class="analyst-name">Responsável: ${r.analista} • Receita: ${r.faturamentoFormatado} (Part. Faturamento: ${r.share.toFixed(1)}%)</span>
      </div>
    `).join(""));const t=document.getElementById("weekly-evolution-list");if(t&&o.semanasResumo){const r=Math.max(...o.semanasResumo.map(l=>l.faturamento))||1,c=Math.max(...o.semanasResumo.map(l=>l.toneladas))||1;t.innerHTML=o.semanasResumo.map(l=>{const g=l.toneladas/c*100,R=l.faturamento/r*100;return`
        <div class="weekly-bar-item">
          <div class="weekly-bar-meta">
            <span class="weekly-bar-title">${l.label}</span>
            <div class="weekly-bar-values">
              <span class="weekly-val-ton">${l.toneladasFormatado}</span>
              <span class="weekly-val-fat" style="font-size:0.75rem; color:var(--text-light)">(${l.faturamentoFormatado})</span>
            </div>
          </div>
          <div class="weekly-bar-tracks">
            <!-- Barra de Volume (Verde) -->
            <div class="weekly-track" title="Volume em Toneladas">
              <div class="weekly-fill-ton" data-width="${g.toFixed(1)}%"></div>
            </div>
            <!-- Barra de Receita (Dourada) -->
            <div class="weekly-track" title="Faturamento em Reais">
              <div class="weekly-fill-fat" data-width="${R.toFixed(1)}%"></div>
            </div>
          </div>
        </div>
      `}).join("")}const n=document.getElementById("unmapped-total"),i=document.getElementById("unmapped-share"),d=document.getElementById("unmapped-list");n&&(n.textContent=o.naoMapeados.toneladasFormatado),i&&(i.textContent=`${o.naoMapeados.shareToneladasTotal.toFixed(2)}%`),d&&(o.naoMapeados.filiais.length===0?d.innerHTML='<tr><td colspan="4" style="text-align: center; color: var(--text-light)">Todas as lojas com vendas estão mapeadas!</td></tr>':d.innerHTML=o.naoMapeados.filiais.map(r=>`
        <tr>
          <td><strong style="color:#b91c1c">${r.name}</strong></td>
          <td class="text-right">${r.faturamentoFormatado}</td>
          <td class="text-right">${r.toneladasFormatado}</td>
          <td class="text-right" style="color:#b91c1c; font-weight:600">${r.shareToneladas?r.shareToneladas.toFixed(2):0}%</td>
        </tr>
      `).join(""));const x=o.rankings.filiais.slice(0,5).map(r=>({name:r.name,value:r.toneladas,valueFormatted:r.toneladasFormatado}));$("chart-branches-ton",x,!1);const k=[...o.rankings.filiais].sort((r,c)=>c.faturamento-r.faturamento).slice(0,5).map(r=>({name:r.name,value:r.faturamento,valueFormatted:r.faturamentoFormatado}));$("chart-branches-fat",k,!0);const f=o.rankings.produtos.slice(0,5).map(r=>({name:r.name,value:r.toneladas,valueFormatted:r.toneladasFormatado}));$("chart-products-ton",f,!1);const h=[...o.rankings.produtos].sort((r,c)=>c.faturamento-r.faturamento).slice(0,5).map(r=>({name:r.name,value:r.faturamento,valueFormatted:r.faturamentoFormatado}));$("chart-products-fat",h,!0),setTimeout(()=>{I()},100)}function P(o){const e=document.getElementById("region-buttons-container");if(!e)return;e.innerHTML=o.mesorregionais.map((s,t)=>`
    <button class="btn-region ${t===L?"active":""}" data-idx="${t}">
      ${s.name.replace("REGIONAL - ","")}
    </button>
  `).join("");const a=e.querySelectorAll(".btn-region");a.forEach(s=>{s.addEventListener("click",()=>{L=parseInt(s.getAttribute("data-idx")||"0"),a.forEach(n=>n.classList.remove("active")),s.classList.add("active"),T(o)})}),T(o)}function T(o){var r;let e=o.mesorregionais[L];const a=document.getElementById("region-detail-wrapper");if(!e||!a)return;if(v!=="todos"&&o.semanal&&o.semanal[v]){const l=o.semanal[v].rankings.mesorregionais.find(g=>g.name===e.name);l?e=l:e={name:e.name,analista:e.analista,faturamento:0,faturamentoFormatado:"R$ 0,00",share:0,toneladas:0,toneladasFormatado:"0,00 Ton",shareToneladas:0,pedidos:0,embalagens:0,filiais:[],topVendedores:[]}}a.style.display="grid";const s=document.getElementById("region-name-title"),t=document.getElementById("region-analyst-name"),n=document.getElementById("region-kpi-fat"),i=document.getElementById("region-kpi-share"),d=document.getElementById("region-kpi-vol"),x=document.getElementById("region-kpi-share-ton"),k=document.getElementById("region-sellers-badge");s&&(s.textContent=e.name),t&&(t.textContent=e.analista),d&&(d.textContent=e.toneladasFormatado),x&&(x.textContent=`${e.shareToneladas.toFixed(2)}% do Volume Cooxupé`),n&&(n.textContent=e.faturamentoFormatado),i&&(i.textContent=`${e.share.toFixed(2)}% da Receita Cooxupé`),k&&(k.textContent=v!=="todos"?`Semana ${v}`:"Julho Acumulado");const f=document.getElementById("region-branches-list");if(f)if(e.filiais.length===0)f.innerHTML='<p style="color:var(--text-light); text-align:center; padding:1rem 0">Nenhuma filial com vendas no período selecionado</p>';else{const c=((r=e.filiais[0])==null?void 0:r.toneladas)||1;f.innerHTML=e.filiais.map(l=>{const g=l.toneladas/c*100;return`
          <div class="bar-item">
            <div class="bar-labels">
              <span class="bar-name" style="font-size:0.82rem; font-weight:600">${l.name}</span>
              <span class="bar-value" style="font-size:0.82rem; font-weight:700; color:var(--medium-green)">${l.toneladasFormatado} <span style="font-weight:normal; color:var(--text-light); font-size:0.75rem">(${l.faturamentoFormatado})</span></span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" data-width="${g.toFixed(1)}%"></div>
            </div>
          </div>
        `}).join("")}const h=document.getElementById("region-sellers-list");h&&(e.topVendedores.length===0?h.innerHTML='<tr><td colspan="5" class="text-light" style="text-align:center; padding:1.5rem 0">Nenhum vendedor registrado nesta regional e período</td></tr>':h.innerHTML=e.topVendedores.map((c,l)=>`
        <tr>
          <td><span class="rank-pos">${l+1}</span></td>
          <td><strong>${c.name}</strong></td>
          <td>${c.filial}</td>
          <td class="text-right text-green" style="font-weight:700">${c.toneladasFormatado}</td>
          <td class="text-right" style="color:var(--text-medium)">${c.faturamentoFormatado}</td>
        </tr>
      `).join("")),setTimeout(()=>{a.querySelectorAll(".bar-fill").forEach(l=>{const g=l.getAttribute("data-width");g&&(l.style.width=g)})},100)}function F(o,e,a){const s=document.getElementById(o);if(!s)return;if(e.length<3){s.style.display="none";return}s.style.display="flex";const t=e[0],n=e[1],i=e[2];s.innerHTML=`
    <!-- Segundo Colocado -->
    <div class="podium-step rank-2">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon">2</div>
        <div class="podium-name">${n.name}</div>
        <div class="podium-filial">${n.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value" style="color:var(--medium-green); font-size:0.95rem">${n.valueFormatted}</span>
        <span class="podium-label-tag">2º Lugar</span>
      </div>
    </div>

    <!-- Primeiro Colocado -->
    <div class="podium-step rank-1">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon">👑</div>
        <div class="podium-name" style="font-size:0.95rem; font-weight:800">${t.name}</div>
        <div class="podium-filial" style="font-weight:600">${t.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value" style="font-size:1.2rem; color:var(--medium-green)">${t.valueFormatted}</span>
        <span class="podium-label-tag">${a} 🏆</span>
      </div>
    </div>

    <!-- Terceiro Colocado -->
    <div class="podium-step rank-3">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon">3</div>
        <div class="podium-name">${i.name}</div>
        <div class="podium-filial">${i.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value" style="color:var(--medium-green); font-size:0.95rem">${i.valueFormatted}</span>
        <span class="podium-label-tag">3º Lugar</span>
      </div>
    </div>
  `}function w(o){u&&(p==="vendedores"?u.placeholder="Buscar vendedor por nome ou filial...":p==="regioes"?u.placeholder="Buscar regional por nome ou responsável...":p==="filiais"?u.placeholder="Buscar filial por nome ou regional...":p==="produtos"&&(u.placeholder="Buscar produto por nome ou código..."));const e=E.trim();let a=o.rankings,s=o.mesorregionais;y!=="todos"&&o.semanal&&o.semanal[y]&&(a=o.semanal[y].rankings,s=o.semanal[y].rankings.mesorregionais),p==="vendedores"?z(a.vendedores,e):p==="regioes"?O(s,e):p==="filiais"?D(a.filiais,e):p==="produtos"&&W(a.produtos,e)}function z(o,e){const a=o.filter(t=>t.name.toLowerCase().includes(e)||t.filial.toLowerCase().includes(e));if(e===""&&a.length>=3){const t=a.slice(0,3).map(n=>({name:n.name,valueFormatted:n.toneladasFormatado,subText:n.faturamentoFormatado}));F("podium-vendedores",t,"Melhor Vendedor")}else{const t=document.getElementById("podium-vendedores");t&&(t.style.display="none")}const s=document.getElementById("vendedores-ranking-tbody");if(s){const t=e===""&&a.length>=3?a.slice(3):a,n=e===""&&a.length>=3?4:1;t.length===0?s.innerHTML='<tr><td colspan="6" style="text-align: center; color: var(--text-light); padding:1.5rem 0">Nenhum vendedor encontrado com o filtro aplicado.</td></tr>':s.innerHTML=t.map((i,d)=>`
        <tr>
          <td><span class="rank-pos">${n+d}</span></td>
          <td><strong>${i.name}</strong></td>
          <td>${i.filial}</td>
          <td class="text-right text-green" style="font-weight:700">${i.toneladasFormatado}</td>
          <td class="text-right" style="color:var(--text-medium)">${i.faturamentoFormatado}</td>
          <td class="text-right">${i.pedidos.toLocaleString("pt-BR")}</td>
        </tr>
      `).join("")}}function O(o,e){const a=o.filter(t=>t.name.toLowerCase().includes(e)||t.analista.toLowerCase().includes(e));if(e===""&&a.length>=3){const t=a.slice(0,3).map(n=>({name:n.name.replace("REGIONAL - ",""),valueFormatted:n.toneladasFormatado,subText:`Analista: ${n.analista}`}));F("podium-regioes",t,"Regional Líder")}else{const t=document.getElementById("podium-regioes");t&&(t.style.display="none")}const s=document.getElementById("regioes-ranking-tbody");if(s){const t=e===""&&a.length>=3?a.slice(3):a,n=e===""&&a.length>=3?4:1;t.length===0&&a.length===0?s.innerHTML='<tr><td colspan="7" style="text-align: center; color: var(--text-light); padding:1.5rem 0">Nenhuma regional encontrada com o filtro aplicado.</td></tr>':s.innerHTML=t.map((i,d)=>`
        <tr>
          <td><span class="rank-pos">${n+d}</span></td>
          <td><strong>${i.name}</strong></td>
          <td>${i.analista}</td>
          <td class="text-right text-green" style="font-weight:700">${i.toneladasFormatado}</td>
          <td class="text-right" style="font-weight:600">${i.shareToneladas.toFixed(2)}%</td>
          <td class="text-right" style="color:var(--text-medium)">${i.faturamentoFormatado}</td>
          <td class="text-right" style="font-size:0.8rem; color:var(--text-light)">${i.share.toFixed(2)}%</td>
        </tr>
      `).join("")}}function D(o,e){const a=o.filter(t=>t.name.toLowerCase().includes(e)||t.mesoregion&&t.mesoregion.toLowerCase().includes(e));if(e===""&&a.length>=3){const t=a.slice(0,3).map(n=>({name:n.name,valueFormatted:n.toneladasFormatado,subText:n.faturamentoFormatado}));F("podium-filiais",t,"Filial Líder")}else{const t=document.getElementById("podium-filiais");t&&(t.style.display="none")}const s=document.getElementById("filiais-ranking-tbody");if(s){const t=e===""&&a.length>=3?a.slice(3):a,n=e===""&&a.length>=3?4:1;t.length===0?s.innerHTML='<tr><td colspan="8" style="text-align: center; color: var(--text-light); padding:1.5rem 0">Nenhuma filial encontrada com o filtro aplicado.</td></tr>':s.innerHTML=t.map((i,d)=>`
        <tr>
          <td><span class="rank-pos">${n+d}</span></td>
          <td><strong>${i.name}</strong></td>
          <td><span class="badge ${i.mesoregion&&i.mesoregion!=="Não Mapeado"?"badge-primary":"badge-gold"}">${i.mesoregion||"Não Mapeada"}</span></td>
          <td class="text-right text-green" style="font-weight:700">${i.toneladasFormatado}</td>
          <td class="text-right" style="font-weight:600"><strong>${i.shareToneladas?i.shareToneladas.toFixed(2):0}%</strong></td>
          <td class="text-right" style="color:var(--text-medium)">${i.faturamentoFormatado}</td>
          <td class="text-right" style="font-size:0.8rem; color:var(--text-light)">${i.share?i.share.toFixed(2):0}%</td>
          <td class="text-right">${i.pedidos.toLocaleString("pt-BR")}</td>
        </tr>
      `).join("")}}function W(o,e){const a=o.filter(t=>t.name.toLowerCase().includes(e)||t.code.includes(e));if(e===""&&a.length>=3){const t=a.slice(0,3).map(n=>({name:n.name,valueFormatted:n.toneladasFormatado,subText:`Cód: ${n.code}`}));F("podium-produtos",t,"Insumo Líder")}else{const t=document.getElementById("podium-produtos");t&&(t.style.display="none")}const s=document.getElementById("produtos-ranking-tbody");if(s){const t=e===""&&a.length>=3?a.slice(3):a,n=e===""&&a.length>=3?4:1;t.length===0?s.innerHTML='<tr><td colspan="6" style="text-align: center; color: var(--text-light); padding:1.5rem 0">Nenhum produto encontrado com o filtro aplicado.</td></tr>':s.innerHTML=t.map((i,d)=>`
        <tr>
          <td><span class="rank-pos">${n+d}</span></td>
          <td><code>${i.code}</code></td>
          <td><strong>${i.name}</strong></td>
          <td class="text-right text-green" style="font-weight:700">${i.toneladasFormatado}</td>
          <td class="text-right" style="color:var(--text-medium)">${i.faturamentoFormatado}</td>
          <td class="text-right">${i.embalagens.toLocaleString("pt-BR")}</td>
        </tr>
      `).join("")}}document.addEventListener("DOMContentLoaded",S);
