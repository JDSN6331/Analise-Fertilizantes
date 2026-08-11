(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();let c=null,m="vendedores",b=0,k="";const y=document.getElementById("loader"),w=document.querySelectorAll(".nav-tab"),B=document.querySelectorAll(".tab-content"),T=document.querySelectorAll(".sub-nav-btn"),M=document.querySelectorAll(".ranking-view"),p=document.getElementById("ranking-search-input");async function I(){try{const a=await fetch("./data/dashboard_data.json");if(!a.ok)throw new Error("Falha ao carregar o arquivo JSON de dados");c=await a.json(),y&&(y.style.display="none"),c&&(C(),S(c),A(c),F(c))}catch(a){console.error("Erro na inicialização do painel:",a),y&&(y.innerHTML=`
        <div style="color: #ef4444; font-weight: 700; font-size: 1.2rem;">🚨 Erro ao carregar dados</div>
        <p style="margin-top: 0.5rem; color: #475569;">Por favor, verifique se o arquivo public/data/dashboard_data.json foi criado.</p>
      `)}}function C(){w.forEach(a=>{a.addEventListener("click",()=>{const e=a.getAttribute("data-tab");e&&R(e)})}),T.forEach(a=>{a.addEventListener("click",()=>{const e=a.getAttribute("data-ranking");e&&H(e)})}),p&&p.addEventListener("input",a=>{k=a.target.value.toLowerCase(),c&&F(c)})}function R(a){w.forEach(e=>{e.getAttribute("data-tab")===a?e.classList.add("active"):e.classList.remove("active")}),B.forEach(e=>{e.id===`tab-${a}`?e.classList.add("active"):e.classList.remove("active")}),a==="overview"&&c&&setTimeout(()=>{E()},50)}function H(a){m=a,T.forEach(e=>{e.getAttribute("data-ranking")===a?e.classList.add("active"):e.classList.remove("active")}),M.forEach(e=>{e.id===`ranking-view-${a}`?e.classList.add("active"):e.classList.remove("active")}),p&&(p.value="",k=""),c&&F(c)}function E(){document.querySelectorAll(".progress-bar, .bar-fill, .chart-fill").forEach(e=>{const n=e.getAttribute("data-width");n&&(e.style.width=n)})}function x(a,e,n=!1){const r=document.getElementById(a);if(!r)return;if(e.length===0){r.innerHTML='<p style="text-align:center; color:var(--text-light); padding:2rem 0">Nenhum dado disponível</p>';return}const t=e[0].value||1;r.innerHTML=e.map((o,s)=>{const d=o.value/t*100;return`
      <div class="chart-item">
        <div class="chart-rank ${s===0?"first":""}">${s+1}</div>
        <div class="chart-info">
          <div class="chart-label-row">
            <span class="chart-name">${o.name}</span>
            <span class="chart-val ${n?"fat":""}">${o.valueFormatted}</span>
          </div>
          <div class="chart-track">
            <div class="chart-fill ${n?"fat":""}" data-width="${d.toFixed(1)}%"></div>
          </div>
        </div>
      </div>
    `}).join("")}function S(a){const e=a.kpis,n=document.getElementById("kpi-container");n&&(n.innerHTML=`
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

      <!-- Volume em Toneladas (Foco Principal!) -->
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
    `);const r=document.getElementById("overview-regions-list");r&&(r.innerHTML=a.mesorregionais.map(i=>`
      <div class="region-item">
        <div class="region-meta">
          <span class="region-title">${i.name}</span>
          <div class="region-value-group">
            <span class="region-value" style="color:var(--medium-green)">${i.toneladasFormatado}</span>
            <span class="region-percent">${i.shareToneladas.toFixed(2)}% Ton</span>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-bar" data-width="${i.shareToneladas.toFixed(1)}%"></div>
        </div>
        <span class="analyst-name">Responsável: ${i.analista} • Receita: ${i.faturamentoFormatado} (${i.share.toFixed(1)}% Share Receita)</span>
      </div>
    `).join(""));const t=document.getElementById("unmapped-count"),o=document.getElementById("unmapped-list"),s=document.getElementById("unmapped-total"),d=document.getElementById("unmapped-share");t&&(t.textContent=a.naoMapeados.filiais.length.toString()),s&&(s.textContent=a.naoMapeados.toneladasFormatado),d&&(d.textContent=`${a.naoMapeados.shareToneladasTotal.toFixed(2)}%`),o&&(a.naoMapeados.filiais.length===0?o.innerHTML='<tr><td colspan="4" style="text-align: center; color: var(--text-light)">Todas as lojas com vendas estão mapeadas!</td></tr>':o.innerHTML=a.naoMapeados.filiais.map(i=>`
        <tr>
          <td><strong style="color:#b91c1c">${i.name}</strong></td>
          <td class="text-right">${i.faturamentoFormatado}</td>
          <td class="text-right">${i.toneladasFormatado}</td>
          <td class="text-right" style="color:#b91c1c; font-weight:600">${i.shareToneladas?i.shareToneladas.toFixed(2):0}%</td>
        </tr>
      `).join(""));const g=a.rankings.filiais.slice(0,5).map(i=>({name:i.name,value:i.toneladas,valueFormatted:i.toneladasFormatado}));x("chart-branches-ton",g,!1);const v=[...a.rankings.filiais].sort((i,l)=>l.faturamento-i.faturamento).slice(0,5).map(i=>({name:i.name,value:i.faturamento,valueFormatted:i.faturamentoFormatado}));x("chart-branches-fat",v,!0);const u=a.rankings.produtos.slice(0,5).map(i=>({name:i.name,value:i.toneladas,valueFormatted:i.toneladasFormatado}));x("chart-products-ton",u,!1);const f=[...a.rankings.produtos].sort((i,l)=>l.faturamento-i.faturamento).slice(0,5).map(i=>({name:i.name,value:i.faturamento,valueFormatted:i.faturamentoFormatado}));x("chart-products-fat",f,!0),setTimeout(()=>{E()},100)}function A(a){const e=document.getElementById("region-buttons-container");if(!e)return;e.innerHTML=a.mesorregionais.map((r,t)=>`
    <button class="btn-region ${t===b?"active":""}" data-idx="${t}">
      ${r.name.replace("REGIONAL - ","")}
    </button>
  `).join("");const n=e.querySelectorAll(".btn-region");n.forEach(r=>{r.addEventListener("click",()=>{b=parseInt(r.getAttribute("data-idx")||"0"),n.forEach(o=>o.classList.remove("active")),r.classList.add("active"),L(a)})}),L(a)}function L(a){var f;const e=a.mesorregionais[b],n=document.getElementById("region-detail-wrapper");if(!e||!n)return;n.style.display="grid";const r=document.getElementById("region-name-title"),t=document.getElementById("region-analyst-name"),o=document.getElementById("region-kpi-fat"),s=document.getElementById("region-kpi-share"),d=document.getElementById("region-kpi-vol"),g=document.getElementById("region-kpi-share-ton");r&&(r.textContent=e.name),t&&(t.textContent=e.analista),d&&(d.textContent=e.toneladasFormatado),g&&(g.textContent=`${e.shareToneladas.toFixed(2)}% do Volume Cooxupé`),o&&(o.textContent=e.faturamentoFormatado),s&&(s.textContent=`${e.share.toFixed(2)}% da Receita Cooxupé`);const v=document.getElementById("region-branches-list");if(v){const i=((f=e.filiais[0])==null?void 0:f.toneladas)||1;v.innerHTML=e.filiais.map(l=>{const h=l.toneladas/i*100;return`
        <div class="bar-item">
          <div class="bar-labels">
            <span class="bar-name" style="font-size:0.82rem; font-weight:600">${l.name}</span>
            <span class="bar-value" style="font-size:0.82rem; font-weight:700; color:var(--medium-green)">${l.toneladasFormatado} <span style="font-weight:normal; color:var(--text-light); font-size:0.75rem">(${l.faturamentoFormatado})</span></span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" data-width="${h.toFixed(1)}%"></div>
          </div>
        </div>
      `}).join("")}const u=document.getElementById("region-sellers-list");u&&(e.topVendedores.length===0?u.innerHTML='<tr><td colspan="5" class="text-light" style="text-align:center">Nenhum vendedor registrado nesta regional</td></tr>':u.innerHTML=e.topVendedores.map((i,l)=>`
        <tr>
          <td><span class="rank-pos">${l+1}</span></td>
          <td><strong>${i.name}</strong></td>
          <td>${i.filial}</td>
          <td class="text-right text-green" style="font-weight:700">${i.toneladasFormatado}</td>
          <td class="text-right" style="color:var(--text-medium)">${i.faturamentoFormatado}</td>
        </tr>
      `).join("")),setTimeout(()=>{n.querySelectorAll(".bar-fill").forEach(l=>{const h=l.getAttribute("data-width");h&&(l.style.width=h)})},100)}function $(a,e,n){const r=document.getElementById(a);if(!r)return;if(e.length<3){r.style.display="none";return}r.style.display="flex";const t=e[0],o=e[1],s=e[2];r.innerHTML=`
    <!-- Segundo Colocado -->
    <div class="podium-step rank-2">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon">2</div>
        <div class="podium-name">${o.name}</div>
        <div class="podium-filial" style="height:32px; overflow:hidden">${o.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value" style="color:var(--medium-green); font-size:0.95rem">${o.valueFormatted}</span>
        <span class="podium-label-tag">2º Lugar</span>
      </div>
    </div>

    <!-- Primeiro Colocado -->
    <div class="podium-step rank-1">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon">👑</div>
        <div class="podium-name" style="font-size:0.95rem; font-weight:800">${t.name}</div>
        <div class="podium-filial" style="font-weight:600; height:32px; overflow:hidden">${t.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value" style="font-size:1.2rem; color:var(--medium-green)">${t.valueFormatted}</span>
        <span class="podium-label-tag">${n} 🏆</span>
      </div>
    </div>

    <!-- Terceiro Colocado -->
    <div class="podium-step rank-3">
      <div class="podium-avatar-wrapper">
        <div class="podium-badge-icon">3</div>
        <div class="podium-name">${s.name}</div>
        <div class="podium-filial" style="height:32px; overflow:hidden">${s.subText}</div>
      </div>
      <div class="podium-spot">
        <span class="podium-value" style="color:var(--medium-green); font-size:0.95rem">${s.valueFormatted}</span>
        <span class="podium-label-tag">3º Lugar</span>
      </div>
    </div>
  `}function F(a){p&&(m==="vendedores"?p.placeholder="Buscar vendedor por nome ou filial...":m==="regioes"?p.placeholder="Buscar regional por nome ou responsável...":m==="filiais"?p.placeholder="Buscar filial por nome ou regional...":m==="produtos"&&(p.placeholder="Buscar produto por nome ou código..."));const e=k.trim();m==="vendedores"?j(a.rankings.vendedores,e):m==="regioes"?N(a.mesorregionais,e):m==="filiais"?P(a.rankings.filiais,e):m==="produtos"&&V(a.rankings.produtos,e)}function j(a,e){const n=a.filter(t=>t.name.toLowerCase().includes(e)||t.filial.toLowerCase().includes(e));if(e===""&&n.length>=3){const t=n.slice(0,3).map(o=>({name:o.name,valueFormatted:o.toneladasFormatado,subText:o.faturamentoFormatado}));$("podium-vendedores",t,"Melhor Vendedor")}else{const t=document.getElementById("podium-vendedores");t&&(t.style.display="none")}const r=document.getElementById("vendedores-ranking-tbody");if(r){const t=e===""&&n.length>=3?n.slice(3):n,o=e===""&&n.length>=3?4:1;t.length===0?r.innerHTML='<tr><td colspan="6" style="text-align: center; color: var(--text-light)">Nenhum vendedor encontrado com o filtro aplicado.</td></tr>':r.innerHTML=t.map((s,d)=>`
        <tr>
          <td><span class="rank-pos">${o+d}</span></td>
          <td><strong>${s.name}</strong></td>
          <td>${s.filial}</td>
          <td class="text-right text-green" style="font-weight:700">${s.toneladasFormatado}</td>
          <td class="text-right" style="color:var(--text-medium)">${s.faturamentoFormatado}</td>
          <td class="text-right">${s.pedidos.toLocaleString("pt-BR")}</td>
        </tr>
      `).join("")}}function N(a,e){const n=a.filter(t=>t.name.toLowerCase().includes(e)||t.analista.toLowerCase().includes(e));if(e===""&&n.length>=3){const t=n.slice(0,3).map(o=>({name:o.name.replace("REGIONAL - ",""),valueFormatted:o.toneladasFormatado,subText:`Analista: ${o.analista}`}));$("podium-regioes",t,"Regional Líder")}else{const t=document.getElementById("podium-regioes");t&&(t.style.display="none")}const r=document.getElementById("regioes-ranking-tbody");if(r){const t=e===""&&n.length>=3?n.slice(3):n,o=e===""&&n.length>=3?4:1;t.length===0&&n.length===0?r.innerHTML='<tr><td colspan="7" style="text-align: center; color: var(--text-light)">Nenhuma regional encontrada com o filtro aplicado.</td></tr>':r.innerHTML=t.map((s,d)=>`
        <tr>
          <td><span class="rank-pos">${o+d}</span></td>
          <td><strong>${s.name}</strong></td>
          <td>${s.analista}</td>
          <td class="text-right text-green" style="font-weight:700">${s.toneladasFormatado}</td>
          <td class="text-right" style="font-weight:600">${s.shareToneladas.toFixed(2)}%</td>
          <td class="text-right" style="color:var(--text-medium)">${s.faturamentoFormatado}</td>
          <td class="text-right" style="font-size:0.8rem; color:var(--text-light)">${s.share.toFixed(2)}%</td>
        </tr>
      `).join("")}}function P(a,e){const n=a.filter(t=>t.name.toLowerCase().includes(e)||t.mesoregion&&t.mesoregion.toLowerCase().includes(e));if(e===""&&n.length>=3){const t=n.slice(0,3).map(o=>({name:o.name,valueFormatted:o.toneladasFormatado,subText:o.faturamentoFormatado}));$("podium-filiais",t,"Filial Líder")}else{const t=document.getElementById("podium-filiais");t&&(t.style.display="none")}const r=document.getElementById("filiais-ranking-tbody");if(r){const t=e===""&&n.length>=3?n.slice(3):n,o=e===""&&n.length>=3?4:1;t.length===0?r.innerHTML='<tr><td colspan="8" style="text-align: center; color: var(--text-light)">Nenhuma filial encontrada com o filtro aplicado.</td></tr>':r.innerHTML=t.map((s,d)=>`
        <tr>
          <td><span class="rank-pos">${o+d}</span></td>
          <td><strong>${s.name}</strong></td>
          <td><span class="badge ${s.mesoregion&&s.mesoregion!=="Não Mapeado"?"badge-primary":"badge-gold"}">${s.mesoregion||"Não Mapeada"}</span></td>
          <td class="text-right text-green" style="font-weight:700">${s.toneladasFormatado}</td>
          <td class="text-right" style="font-weight:600"><strong>${s.shareToneladas?s.shareToneladas.toFixed(2):0}%</strong></td>
          <td class="text-right" style="color:var(--text-medium)">${s.faturamentoFormatado}</td>
          <td class="text-right" style="font-size:0.8rem; color:var(--text-light)">${s.share?s.share.toFixed(2):0}%</td>
          <td class="text-right">${s.pedidos.toLocaleString("pt-BR")}</td>
        </tr>
      `).join("")}}function V(a,e){const n=a.filter(t=>t.name.toLowerCase().includes(e)||t.code.includes(e));if(e===""&&n.length>=3){const t=n.slice(0,3).map(o=>({name:o.name,valueFormatted:o.toneladasFormatado,subText:`Cód: ${o.code}`}));$("podium-produtos",t,"Insumo Líder")}else{const t=document.getElementById("podium-produtos");t&&(t.style.display="none")}const r=document.getElementById("produtos-ranking-tbody");if(r){const t=e===""&&n.length>=3?n.slice(3):n,o=e===""&&n.length>=3?4:1;t.length===0?r.innerHTML='<tr><td colspan="6" style="text-align: center; color: var(--text-light)">Nenhum produto encontrado com o filtro aplicado.</td></tr>':r.innerHTML=t.map((s,d)=>`
        <tr>
          <td><span class="rank-pos">${o+d}</span></td>
          <td><code>${s.code}</code></td>
          <td><strong>${s.name}</strong></td>
          <td class="text-right text-green" style="font-weight:700">${s.toneladasFormatado}</td>
          <td class="text-right" style="color:var(--text-medium)">${s.faturamentoFormatado}</td>
          <td class="text-right">${s.embalagens.toLocaleString("pt-BR")}</td>
        </tr>
      `).join("")}}document.addEventListener("DOMContentLoaded",I);
