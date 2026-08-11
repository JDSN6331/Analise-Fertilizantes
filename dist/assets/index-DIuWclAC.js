(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}})();let p=null,g="vendedores",$=0,b="";const k=document.getElementById("loader"),w=document.querySelectorAll(".nav-tab"),M=document.querySelectorAll(".tab-content"),E=document.querySelectorAll(".sub-nav-btn"),C=document.querySelectorAll(".ranking-view"),v=document.getElementById("ranking-search-input");async function T(){try{const a=await fetch("./data/dashboard_data.json");if(!a.ok)throw new Error("Falha ao carregar o arquivo JSON de dados");p=await a.json(),k&&(k.style.display="none"),p&&(F(),I(p),R(p),x(p))}catch(a){console.error("Erro na inicialização do painel:",a),k&&(k.innerHTML=`
        <div style="color: #ef4444; font-weight: 700; font-size: 1.2rem;">🚨 Erro ao carregar dados</div>
        <p style="margin-top: 0.5rem; color: #475569;">Por favor, verifique se o arquivo public/data/dashboard_data.json foi criado.</p>
      `)}}function F(){w.forEach(a=>{a.addEventListener("click",()=>{const e=a.getAttribute("data-tab");e&&H(e)})}),E.forEach(a=>{a.addEventListener("click",()=>{const e=a.getAttribute("data-ranking");e&&S(e)})}),v&&v.addEventListener("input",a=>{b=a.target.value.toLowerCase(),p&&x(p)})}function H(a){w.forEach(e=>{e.getAttribute("data-tab")===a?e.classList.add("active"):e.classList.remove("active")}),M.forEach(e=>{e.id===`tab-${a}`?e.classList.add("active"):e.classList.remove("active")}),a==="overview"&&p&&setTimeout(()=>{B()},50)}function S(a){g=a,E.forEach(e=>{e.getAttribute("data-ranking")===a?e.classList.add("active"):e.classList.remove("active")}),C.forEach(e=>{e.id===`ranking-view-${a}`?e.classList.add("active"):e.classList.remove("active")}),v&&(v.value="",b=""),p&&x(p)}function B(){document.querySelectorAll(".progress-bar, .bar-fill").forEach(e=>{const o=e.getAttribute("data-width");o&&(e.style.width=o)})}function I(a){var f;const e=a.kpis,o=document.getElementById("kpi-container");o&&(o.innerHTML=`
      <!-- Faturamento -->
      <div class="kpi-card gold-border">
        <div class="kpi-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div class="kpi-details">
          <span class="kpi-label">Faturamento Período</span>
          <span class="kpi-value">${e.faturamentoFormatado}</span>
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
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <div class="kpi-details">
          <span class="kpi-label">Volume de Pedidos</span>
          <span class="kpi-value">${e.pedidosFormatado}</span>
        </div>
      </div>

      <!-- Clientes Cooperados -->
      <div class="kpi-card">
        <div class="kpi-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div class="kpi-details">
          <span class="kpi-label">Cooperados Atendidos</span>
          <span class="kpi-value">${e.clientesTotal.toLocaleString("pt-BR")}</span>
        </div>
      </div>

      <!-- Volume Físico -->
      <div class="kpi-card gold-border">
        <div class="kpi-icon-wrapper">
          <!-- Fertilizer bucket / truck weight representer -->
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <div class="kpi-details">
          <span class="kpi-label">Volume Total Movido</span>
          <span class="kpi-value" style="font-size: 1.15rem;">${e.volumeFormatado}</span>
        </div>
      </div>
    `);const s=document.getElementById("overview-regions-list");s&&(s.innerHTML=a.mesorregionais.map(r=>`
      <div class="region-item">
        <div class="region-meta">
          <span class="region-title">${r.name}</span>
          <div class="region-value-group">
            <span class="region-value">${r.faturamentoFormatado}</span>
            <span class="region-percent">${r.share.toFixed(2)}%</span>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-bar" data-width="${r.share.toFixed(1)}%"></div>
        </div>
        <span class="analyst-name">Analista: ${r.analista} — ${r.filiais.length} lojas</span>
      </div>
    `).join(""));const t=document.getElementById("unmapped-count"),i=document.getElementById("unmapped-list"),d=document.getElementById("unmapped-total"),n=document.getElementById("unmapped-share");t&&(t.textContent=a.naoMapeados.filiais.length.toString()),d&&(d.textContent=a.naoMapeados.faturamentoFormatado),n&&(n.textContent=`${a.naoMapeados.shareTotal.toFixed(2)}%`),i&&(a.naoMapeados.filiais.length===0?i.innerHTML='<tr><td colspan="4" style="text-align: center; color: var(--text-light)">Todas as lojas estão mapeadas em mesorregiões!</td></tr>':i.innerHTML=a.naoMapeados.filiais.map(r=>`
        <tr>
          <td><strong style="color:#b91c1c">${r.name}</strong></td>
          <td class="text-right">${r.faturamentoFormatado}</td>
          <td class="text-right">${r.pedidos.toLocaleString("pt-BR")}</td>
          <td class="text-right" style="color:#b91c1c; font-weight:600">${r.share?r.share.toFixed(2):0}%</td>
        </tr>
      `).join(""));const m=document.getElementById("groups-list");if(m){const r=((f=a.rankings.grupos[0])==null?void 0:f.faturamento)||1;m.innerHTML=a.rankings.grupos.slice(0,5).map(u=>{const l=u.faturamento/r*100;return`
        <div class="bar-item">
          <div class="bar-labels">
            <span class="bar-name">${u.name}</span>
            <span class="bar-value" style="font-weight:700; color:var(--primary-green)">${u.faturamentoFormatado} (${u.share.toFixed(1)}%)</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" data-width="${l.toFixed(1)}%"></div>
          </div>
        </div>
      `}).join("")}const h=document.getElementById("top-products-summary");h&&(h.innerHTML=a.rankings.produtos.slice(0,5).map((r,u)=>`
      <div class="product-top-item">
        <div class="product-rank-badge">${u+1}</div>
        <div class="product-details-mini">
          <span class="product-details-name">${r.name}</span>
          <span class="product-details-group">Cód: ${r.code} • ${r.group}</span>
        </div>
        <div class="product-price-kpi">${r.faturamentoFormatado}</div>
      </div>
    `).join("")),setTimeout(()=>{B()},100)}function R(a){const e=document.getElementById("region-buttons-container");if(!e)return;e.innerHTML=a.mesorregionais.map((s,t)=>`
    <button class="btn-region ${t===$?"active":""}" data-idx="${t}">
      ${s.name.replace("REGIONAL - ","")}
    </button>
  `).join("");const o=e.querySelectorAll(".btn-region");o.forEach(s=>{s.addEventListener("click",()=>{$=parseInt(s.getAttribute("data-idx")||"0"),o.forEach(i=>i.classList.remove("active")),s.classList.add("active"),L(a)})}),L(a)}function L(a){var u;const e=a.mesorregionais[$],o=document.getElementById("region-detail-wrapper");if(!e||!o)return;o.style.display="grid";const s=document.getElementById("region-name-title"),t=document.getElementById("region-analyst-name"),i=document.getElementById("region-kpi-fat"),d=document.getElementById("region-kpi-share"),n=document.getElementById("region-kpi-vol"),m=document.getElementById("region-kpi-emb");s&&(s.textContent=e.name),t&&(t.textContent=e.analista),i&&(i.textContent=e.faturamentoFormatado),d&&(d.textContent=`${e.share.toFixed(2)}% do Total S/A`),n&&(n.textContent=e.kgl.toLocaleString("pt-BR")+" Kg/L"),m&&(m.textContent=e.embalagens.toLocaleString("pt-BR"));const h=document.getElementById("region-branches-list");if(h){const l=((u=e.filiais[0])==null?void 0:u.faturamento)||1;h.innerHTML=e.filiais.map(c=>{const y=c.faturamento/l*100;return`
        <div class="bar-item">
          <div class="bar-labels">
            <span class="bar-name" style="font-size:0.82rem; font-weight:600">${c.name}</span>
            <span class="bar-value" style="font-size:0.82rem; font-weight:700; color:var(--medium-green)">${c.faturamentoFormatado}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" data-width="${y.toFixed(1)}%"></div>
          </div>
        </div>
      `}).join("")}const f=document.getElementById("region-sellers-list");f&&(e.topVendedores.length===0?f.innerHTML='<tr><td colspan="4" class="text-light" style="text-align:center">Nenhum vendedor registrado nesta regional</td></tr>':f.innerHTML=e.topVendedores.map((l,c)=>`
        <tr>
          <td><span class="rank-pos">${c+1}</span></td>
          <td><strong>${l.name}</strong></td>
          <td>${l.filial}</td>
          <td class="text-right text-green">${l.faturamentoFormatado}</td>
        </tr>
      `).join(""));const r=document.getElementById("region-clients-list");r&&(e.topClientes.length===0?r.innerHTML='<tr><td colspan="4" class="text-light" style="text-align:center">Nenhum cliente registrado nesta regional</td></tr>':r.innerHTML=e.topClientes.map((l,c)=>`
        <tr>
          <td><span class="rank-pos">${c+1}</span></td>
          <td><strong>${l.name}</strong> <span style="font-size:0.75rem; color:var(--text-light)">(${l.matricula})</span></td>
          <td>${l.filial}</td>
          <td class="text-right text-gold">${l.faturamentoFormatado}</td>
        </tr>
      `).join("")),setTimeout(()=>{o.querySelectorAll(".bar-fill").forEach(c=>{const y=c.getAttribute("data-width");y&&(c.style.width=y)})},100)}function x(a){v&&(g==="vendedores"?v.placeholder="Buscar vendedor por nome ou filial...":g==="clientes"?v.placeholder="Buscar cooperado por nome, matrícula ou filial...":g==="filiais"?v.placeholder="Buscar filial por nome ou mesorregião...":g==="produtos"&&(v.placeholder="Buscar produto por nome, código ou grupo..."));const e=b.trim();g==="vendedores"?j(a.rankings.vendedores,e):g==="clientes"?A(a.rankings.clientes,e):g==="filiais"?P(a.rankings.filiais,e):g==="produtos"&&N(a.rankings.produtos,e)}function j(a,e){const o=a.filter(i=>i.name.toLowerCase().includes(e)||i.filial.toLowerCase().includes(e)),s=document.getElementById("podium-vendedores"),t=document.getElementById("vendedores-ranking-tbody");if(s)if(e===""&&o.length>=3){s.style.display="flex";const i=o[0],d=o[1],n=o[2];s.innerHTML=`
        <!-- Segundo Colocado -->
        <div class="podium-step rank-2">
          <div class="podium-avatar-wrapper">
            <div class="podium-badge-icon">2</div>
            <div class="podium-name">${d.name}</div>
            <div class="podium-filial">${d.filial}</div>
          </div>
          <div class="podium-spot">
            <span class="podium-value">${d.faturamentoFormatado}</span>
            <span class="podium-label-tag">Semeador de Prata</span>
          </div>
        </div>

        <!-- Primeiro Colocado -->
        <div class="podium-step rank-1">
          <div class="podium-avatar-wrapper">
            <div class="podium-badge-icon">
              <!-- Trophy crown -->
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:26px; height:26px">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
                <path d="M12 2a4 4 0 0 1 4 4v5a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"></path>
              </svg>
            </div>
            <div class="podium-name" style="font-size:0.95rem; font-weight:800">${i.name}</div>
            <div class="podium-filial" style="font-weight:600">${i.filial}</div>
          </div>
          <div class="podium-spot">
            <span class="podium-value">${i.faturamentoFormatado}</span>
            <span class="podium-label-tag">Semeador de Ouro 👑</span>
          </div>
        </div>

        <!-- Terceiro Colocado -->
        <div class="podium-step rank-3">
          <div class="podium-avatar-wrapper">
            <div class="podium-badge-icon">3</div>
            <div class="podium-name">${n.name}</div>
            <div class="podium-filial">${n.filial}</div>
          </div>
          <div class="podium-spot">
            <span class="podium-value">${n.faturamentoFormatado}</span>
            <span class="podium-label-tag">Semeador de Bronze</span>
          </div>
        </div>
      `}else s.style.display="none";if(t){const i=e===""&&o.length>=3?o.slice(3):o,d=e===""&&o.length>=3?4:1;i.length===0?t.innerHTML='<tr><td colspan="5" style="text-align: center; color: var(--text-light)">Nenhum vendedor encontrado com o filtro aplicado.</td></tr>':t.innerHTML=i.map((n,m)=>`
        <tr>
          <td><span class="rank-pos">${d+m}</span></td>
          <td><strong>${n.name}</strong></td>
          <td>${n.filial}</td>
          <td class="text-right text-green">${n.faturamentoFormatado}</td>
          <td class="text-right">${n.pedidos.toLocaleString("pt-BR")}</td>
        </tr>
      `).join("")}}function A(a,e){const o=a.filter(i=>i.name.toLowerCase().includes(e)||i.matricula.includes(e)||i.filial.toLowerCase().includes(e)),s=document.getElementById("podium-clientes"),t=document.getElementById("clientes-ranking-tbody");if(s)if(e===""&&o.length>=3){s.style.display="flex";const i=o[0],d=o[1],n=o[2];s.innerHTML=`
        <!-- Segundo Colocado -->
        <div class="podium-step rank-2">
          <div class="podium-avatar-wrapper">
            <div class="podium-badge-icon">2</div>
            <div class="podium-name">${d.name}</div>
            <div class="podium-filial">Mat: ${d.matricula} • ${d.filial}</div>
          </div>
          <div class="podium-spot">
            <span class="podium-value">${d.faturamentoFormatado}</span>
            <span class="podium-label-tag">Produtor Especial</span>
          </div>
        </div>

        <!-- Primeiro Colocado -->
        <div class="podium-step rank-1">
          <div class="podium-avatar-wrapper">
            <div class="podium-badge-icon">🌾</div>
            <div class="podium-name" style="font-size:0.95rem; font-weight:800">${i.name}</div>
            <div class="podium-filial" style="font-weight:600">Mat: ${i.matricula} • ${i.filial}</div>
          </div>
          <div class="podium-spot">
            <span class="podium-value">${i.faturamentoFormatado}</span>
            <span class="podium-label-tag">Cultivador de Ouro 👑</span>
          </div>
        </div>

        <!-- Terceiro Colocado -->
        <div class="podium-step rank-3">
          <div class="podium-avatar-wrapper">
            <div class="podium-badge-icon">3</div>
            <div class="podium-name">${n.name}</div>
            <div class="podium-filial">Mat: ${n.matricula} • ${n.filial}</div>
          </div>
          <div class="podium-spot">
            <span class="podium-value">${n.faturamentoFormatado}</span>
            <span class="podium-label-tag">Grande Colheita</span>
          </div>
        </div>
      `}else s.style.display="none";if(t){const i=e===""&&o.length>=3?o.slice(3):o,d=e===""&&o.length>=3?4:1;i.length===0?t.innerHTML='<tr><td colspan="6" style="text-align: center; color: var(--text-light)">Nenhum cooperado encontrado com o filtro aplicado.</td></tr>':t.innerHTML=i.map((n,m)=>`
        <tr>
          <td><span class="rank-pos">${d+m}</span></td>
          <td><strong>${n.name}</strong></td>
          <td><code>${n.matricula}</code></td>
          <td>${n.filial}</td>
          <td class="text-right text-gold">${n.faturamentoFormatado}</td>
          <td class="text-right">${n.pedidos.toLocaleString("pt-BR")}</td>
        </tr>
      `).join("")}}function P(a,e){const o=a.filter(t=>t.name.toLowerCase().includes(e)||t.mesoregion&&t.mesoregion.toLowerCase().includes(e)),s=document.getElementById("filiais-ranking-tbody");s&&(o.length===0?s.innerHTML='<tr><td colspan="7" style="text-align: center; color: var(--text-light)">Nenhuma filial encontrada com o filtro aplicado.</td></tr>':s.innerHTML=o.map((t,i)=>`
        <tr>
          <td><span class="rank-pos">${i+1}</span></td>
          <td><strong>${t.name}</strong></td>
          <td><span class="badge ${t.mesoregion&&t.mesoregion!=="Não Mapeado"?"badge-primary":"badge-gold"}">${t.mesoregion||"Não Mapeado"}</span></td>
          <td class="text-right text-green">${t.faturamentoFormatado}</td>
          <td class="text-right"><strong>${t.share?t.share.toFixed(2):0}%</strong></td>
          <td class="text-right">${t.pedidos.toLocaleString("pt-BR")}</td>
          <td class="text-right">${t.embalagens.toLocaleString("pt-BR")}</td>
        </tr>
      `).join(""))}function N(a,e){const o=a.filter(t=>t.name.toLowerCase().includes(e)||t.code.includes(e)||t.group.toLowerCase().includes(e)),s=document.getElementById("produtos-ranking-tbody");s&&(o.length===0?s.innerHTML='<tr><td colspan="7" style="text-align: center; color: var(--text-light)">Nenhum produto encontrado com o filtro aplicado.</td></tr>':s.innerHTML=o.map((t,i)=>`
        <tr>
          <td><span class="rank-pos">${i+1}</span></td>
          <td><code>${t.code}</code></td>
          <td><strong>${t.name}</strong></td>
          <td><span class="badge badge-primary">${t.group}</span></td>
          <td class="text-right text-green">${t.faturamentoFormatado}</td>
          <td class="text-right">${t.embalagens.toLocaleString("pt-BR")}</td>
          <td class="text-right">${t.kglFormatado}</td>
        </tr>
      `).join(""))}document.addEventListener("DOMContentLoaded",T);
