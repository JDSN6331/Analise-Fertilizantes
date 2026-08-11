(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();let l=null,g="vendedores",x=0,k="";const y=document.getElementById("loader"),w=document.querySelectorAll(".nav-tab"),T=document.querySelectorAll(".tab-content"),L=document.querySelectorAll(".sub-nav-btn"),F=document.querySelectorAll(".ranking-view"),p=document.getElementById("ranking-search-input");async function B(){try{const a=await fetch("./data/dashboard_data.json");if(!a.ok)throw new Error("Falha ao carregar o arquivo JSON de dados");l=await a.json(),y&&(y.style.display="none"),l&&(M(),H(l),I(l),b(l))}catch(a){console.error("Erro na inicialização do painel:",a),y&&(y.innerHTML=`
        <div style="color: #ef4444; font-weight: 700; font-size: 1.2rem;">🚨 Erro ao carregar dados</div>
        <p style="margin-top: 0.5rem; color: #475569;">Por favor, verifique se o arquivo public/data/dashboard_data.json foi criado.</p>
      `)}}function M(){w.forEach(a=>{a.addEventListener("click",()=>{const e=a.getAttribute("data-tab");e&&S(e)})}),L.forEach(a=>{a.addEventListener("click",()=>{const e=a.getAttribute("data-ranking");e&&C(e)})}),p&&p.addEventListener("input",a=>{k=a.target.value.toLowerCase(),l&&b(l)})}function S(a){w.forEach(e=>{e.getAttribute("data-tab")===a?e.classList.add("active"):e.classList.remove("active")}),T.forEach(e=>{e.id===`tab-${a}`?e.classList.add("active"):e.classList.remove("active")}),a==="overview"&&l&&setTimeout(()=>{E()},50)}function C(a){g=a,L.forEach(e=>{e.getAttribute("data-ranking")===a?e.classList.add("active"):e.classList.remove("active")}),F.forEach(e=>{e.id===`ranking-view-${a}`?e.classList.add("active"):e.classList.remove("active")}),p&&(p.value="",k=""),l&&b(l)}function E(){document.querySelectorAll(".progress-bar, .bar-fill").forEach(e=>{const s=e.getAttribute("data-width");s&&(e.style.width=s)})}function H(a){const e=a.kpis,s=document.getElementById("kpi-container");s&&(s.innerHTML=`
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
          <span class="kpi-label">Semeadores Ativos</span>
          <span class="kpi-value">${e.vendedoresTotal.toLocaleString("pt-BR")}</span>
        </div>
      </div>
    `);const n=document.getElementById("overview-regions-list");n&&(n.innerHTML=a.mesorregionais.map(i=>`
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
    `).join(""));const t=document.getElementById("unmapped-count"),o=document.getElementById("unmapped-list"),r=document.getElementById("unmapped-total"),d=document.getElementById("unmapped-share");t&&(t.textContent=a.naoMapeados.filiais.length.toString()),r&&(r.textContent=a.naoMapeados.toneladasFormatado),d&&(d.textContent=`${a.naoMapeados.shareToneladasTotal.toFixed(2)}%`),o&&(a.naoMapeados.filiais.length===0?o.innerHTML='<tr><td colspan="4" style="text-align: center; color: var(--text-light)">Todas as lojas com vendas estão mapeadas!</td></tr>':o.innerHTML=a.naoMapeados.filiais.map(i=>`
        <tr>
          <td><strong style="color:#b91c1c">${i.name}</strong></td>
          <td class="text-right">${i.faturamentoFormatado}</td>
          <td class="text-right">${i.toneladasFormatado}</td>
          <td class="text-right" style="color:#b91c1c; font-weight:600">${i.shareToneladas?i.shareToneladas.toFixed(2):0}%</td>
        </tr>
      `).join(""));const m=document.getElementById("top-branches-summary");m&&(m.innerHTML=a.rankings.filiais.slice(0,5).map((i,v)=>`
      <div class="product-top-item">
        <div class="product-rank-badge">${v+1}</div>
        <div class="product-details-mini">
          <span class="product-details-name">${i.name}</span>
          <span class="product-details-group">Regional: ${i.mesoregion||"Não Mapeada"}</span>
        </div>
        <div class="product-price-kpi" style="color:var(--medium-green)">${i.toneladasFormatado}<br><span style="font-size:0.7rem; color:var(--text-light); font-weight:normal">${i.faturamentoFormatado}</span></div>
      </div>
    `).join(""));const f=document.getElementById("top-products-summary");f&&(f.innerHTML=a.rankings.produtos.slice(0,5).map((i,v)=>`
      <div class="product-top-item">
        <div class="product-rank-badge">${v+1}</div>
        <div class="product-details-mini">
          <span class="product-details-name">${i.name}</span>
          <span class="product-details-group">Código: ${i.code}</span>
        </div>
        <div class="product-price-kpi" style="color:var(--medium-green)">${i.toneladasFormatado}<br><span style="font-size:0.7rem; color:var(--text-light); font-weight:normal">${i.faturamentoFormatado}</span></div>
      </div>
    `).join("")),setTimeout(()=>{E()},100)}function I(a){const e=document.getElementById("region-buttons-container");if(!e)return;e.innerHTML=a.mesorregionais.map((n,t)=>`
    <button class="btn-region ${t===x?"active":""}" data-idx="${t}">
      ${n.name.replace("REGIONAL - ","")}
    </button>
  `).join("");const s=e.querySelectorAll(".btn-region");s.forEach(n=>{n.addEventListener("click",()=>{x=parseInt(n.getAttribute("data-idx")||"0"),s.forEach(o=>o.classList.remove("active")),n.classList.add("active"),$(a)})}),$(a)}function $(a){var v;const e=a.mesorregionais[x],s=document.getElementById("region-detail-wrapper");if(!e||!s)return;s.style.display="grid";const n=document.getElementById("region-name-title"),t=document.getElementById("region-analyst-name"),o=document.getElementById("region-kpi-fat"),r=document.getElementById("region-kpi-share"),d=document.getElementById("region-kpi-vol"),m=document.getElementById("region-kpi-share-ton");n&&(n.textContent=e.name),t&&(t.textContent=e.analista),d&&(d.textContent=e.toneladasFormatado),m&&(m.textContent=`${e.shareToneladas.toFixed(2)}% do Volume S/A`),o&&(o.textContent=e.faturamentoFormatado),r&&(r.textContent=`${e.share.toFixed(2)}% da Receita S/A`);const f=document.getElementById("region-branches-list");if(f){const u=((v=e.filiais[0])==null?void 0:v.toneladas)||1;f.innerHTML=e.filiais.map(c=>{const h=c.toneladas/u*100;return`
        <div class="bar-item">
          <div class="bar-labels">
            <span class="bar-name" style="font-size:0.82rem; font-weight:600">${c.name}</span>
            <span class="bar-value" style="font-size:0.82rem; font-weight:700; color:var(--medium-green)">${c.toneladasFormatado} <span style="font-weight:normal; color:var(--text-light); font-size:0.75rem">(${c.faturamentoFormatado})</span></span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" data-width="${h.toFixed(1)}%"></div>
          </div>
        </div>
      `}).join("")}const i=document.getElementById("region-sellers-list");i&&(e.topVendedores.length===0?i.innerHTML='<tr><td colspan="5" class="text-light" style="text-align:center">Nenhum vendedor registrado nesta regional</td></tr>':i.innerHTML=e.topVendedores.map((u,c)=>`
        <tr>
          <td><span class="rank-pos">${c+1}</span></td>
          <td><strong>${u.name}</strong></td>
          <td>${u.filial}</td>
          <td class="text-right text-green" style="font-weight:700">${u.toneladasFormatado}</td>
          <td class="text-right" style="color:var(--text-medium)">${u.faturamentoFormatado}</td>
        </tr>
      `).join("")),setTimeout(()=>{s.querySelectorAll(".bar-fill").forEach(c=>{const h=c.getAttribute("data-width");h&&(c.style.width=h)})},100)}function b(a){p&&(g==="vendedores"?p.placeholder="Buscar vendedor por nome ou filial...":g==="filiais"?p.placeholder="Buscar filial por nome ou regional...":g==="produtos"&&(p.placeholder="Buscar produto por nome ou código..."));const e=k.trim();g==="vendedores"?A(a.rankings.vendedores,e):g==="filiais"?R(a.rankings.filiais,e):g==="produtos"&&j(a.rankings.produtos,e)}function A(a,e){const s=a.filter(o=>o.name.toLowerCase().includes(e)||o.filial.toLowerCase().includes(e)),n=document.getElementById("podium-vendedores"),t=document.getElementById("vendedores-ranking-tbody");if(n)if(e===""&&s.length>=3){n.style.display="flex";const o=s[0],r=s[1],d=s[2];n.innerHTML=`
        <!-- Segundo Colocado -->
        <div class="podium-step rank-2">
          <div class="podium-avatar-wrapper">
            <div class="podium-badge-icon">2</div>
            <div class="podium-name">${r.name}</div>
          </div>
          <div class="podium-spot">
            <span class="podium-value" style="color:var(--medium-green)">${r.toneladasFormatado}</span>
            <span class="podium-filial" style="font-size:0.75rem; margin-bottom:0.25rem">${r.faturamentoFormatado}</span>
            <span class="podium-label-tag">Semeador de Prata</span>
          </div>
        </div>

        <!-- Primeiro Colocado -->
        <div class="podium-step rank-1">
          <div class="podium-avatar-wrapper">
            <div class="podium-badge-icon">
              <!-- Trophy SVG crown -->
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:26px; height:26px">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
                <path d="M12 2a4 4 0 0 1 4 4v5a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"></path>
              </svg>
            </div>
            <div class="podium-name" style="font-size:0.95rem; font-weight:800">${o.name}</div>
          </div>
          <div class="podium-spot">
            <span class="podium-value" style="font-size:1.25rem; color:var(--medium-green)">${o.toneladasFormatado}</span>
            <span class="podium-filial" style="font-weight:600; margin-bottom:0.25rem">${o.faturamentoFormatado}</span>
            <span class="podium-label-tag">Semeador de Ouro 👑</span>
          </div>
        </div>

        <!-- Terceiro Colocado -->
        <div class="podium-step rank-3">
          <div class="podium-avatar-wrapper">
            <div class="podium-badge-icon">3</div>
            <div class="podium-name">${d.name}</div>
          </div>
          <div class="podium-spot">
            <span class="podium-value" style="color:var(--medium-green)">${d.toneladasFormatado}</span>
            <span class="podium-filial" style="font-size:0.75rem; margin-bottom:0.25rem">${d.faturamentoFormatado}</span>
            <span class="podium-label-tag">Semeador de Bronze</span>
          </div>
        </div>
      `}else n.style.display="none";if(t){const o=e===""&&s.length>=3?s.slice(3):s,r=e===""&&s.length>=3?4:1;o.length===0?t.innerHTML='<tr><td colspan="6" style="text-align: center; color: var(--text-light)">Nenhum vendedor encontrado com o filtro aplicado.</td></tr>':t.innerHTML=o.map((d,m)=>`
        <tr>
          <td><span class="rank-pos">${r+m}</span></td>
          <td><strong>${d.name}</strong></td>
          <td>${d.filial}</td>
          <td class="text-right text-green" style="font-weight:700">${d.toneladasFormatado}</td>
          <td class="text-right" style="color:var(--text-medium)">${d.faturamentoFormatado}</td>
          <td class="text-right">${d.pedidos.toLocaleString("pt-BR")}</td>
        </tr>
      `).join("")}}function R(a,e){const s=a.filter(t=>t.name.toLowerCase().includes(e)||t.mesoregion&&t.mesoregion.toLowerCase().includes(e)),n=document.getElementById("filiais-ranking-tbody");n&&(s.length===0?n.innerHTML='<tr><td colspan="8" style="text-align: center; color: var(--text-light)">Nenhuma filial encontrada com o filtro aplicado.</td></tr>':n.innerHTML=s.map((t,o)=>`
        <tr>
          <td><span class="rank-pos">${o+1}</span></td>
          <td><strong>${t.name}</strong></td>
          <td><span class="badge ${t.mesoregion&&t.mesoregion!=="Não Mapeado"?"badge-primary":"badge-gold"}">${t.mesoregion||"Não Mapeada"}</span></td>
          <td class="text-right text-green" style="font-weight:700">${t.toneladasFormatado}</td>
          <td class="text-right" style="font-weight:600"><strong>${t.shareToneladas?t.shareToneladas.toFixed(2):0}%</strong></td>
          <td class="text-right" style="color:var(--text-medium)">${t.faturamentoFormatado}</td>
          <td class="text-right" style="font-size:0.8rem; color:var(--text-light)">${t.share?t.share.toFixed(2):0}%</td>
          <td class="text-right">${t.pedidos.toLocaleString("pt-BR")}</td>
        </tr>
      `).join(""))}function j(a,e){const s=a.filter(t=>t.name.toLowerCase().includes(e)||t.code.includes(e)),n=document.getElementById("produtos-ranking-tbody");n&&(s.length===0?n.innerHTML='<tr><td colspan="6" style="text-align: center; color: var(--text-light)">Nenhum produto encontrado com o filtro aplicado.</td></tr>':n.innerHTML=s.map((t,o)=>`
        <tr>
          <td><span class="rank-pos">${o+1}</span></td>
          <td><code>${t.code}</code></td>
          <td><strong>${t.name}</strong></td>
          <td class="text-right text-green" style="font-weight:700">${t.toneladasFormatado}</td>
          <td class="text-right" style="color:var(--text-medium)">${t.faturamentoFormatado}</td>
          <td class="text-right">${t.embalagens.toLocaleString("pt-BR")}</td>
        </tr>
      `).join(""))}document.addEventListener("DOMContentLoaded",B);
