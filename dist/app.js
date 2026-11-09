const $ = id => document.getElementById(id);
const fields = ['governorate','type','area'];
const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const esc = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let page = 1; const pageSize = 12;
function fill(id, index) { const select=$(id); [...new Set(providers.map(p=>p[index]).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'fr')).forEach(value=>select.add(new Option(value,value))); }
fill('governorate',0); fill('type',1); fill('area',3);
function render(){
 const query=norm($('search').value.trim());
 let found=providers.filter(p=>(!query || norm(p.join(' ')).includes(query)) && (! $('governorate').value || p[0]===$('governorate').value) && (!$('type').value || p[1]===$('type').value) && (!$('area').value || p[3]===$('area').value));
 if ($('sort').value==='name') found.sort((a,b)=>a[2].localeCompare(b[2],'fr'));
 if ($('sort').value==='location') found.sort((a,b)=>a[0].localeCompare(b[0],'fr') || a[2].localeCompare(b[2],'fr'));
 const pages=Math.max(1,Math.ceil(found.length/pageSize)); page=Math.min(page,pages);
 $('count').textContent=found.length.toLocaleString('fr-FR')+' résultat'+(found.length!==1?'s':'');
 $('results').innerHTML=found.slice((page-1)*pageSize,page*pageSize).map(p=>`<article class="card"><div class="card-top"><span class="category">${esc(p[1] || 'Prestataire')}</span><span class="card-icon">↗</span></div><h3>${esc(p[2] || 'Nom non renseigné')}</h3><div class="location">${esc(p[0])}${p[3]?' <span> / </span> '+esc(p[3]):''}</div><div class="card-details"><div><span class="detail-icon">⌖</span><p>${esc(p[4] || 'Adresse non renseignée')}</p></div><div><span class="detail-icon">☎</span><p>${p[5] ? esc(p[5]) : 'Téléphone non renseigné'}</p></div></div></article>`).join('');
 $('empty').hidden=found.length>0; $('page-info').textContent=found.length ? `Page ${page} sur ${pages} · ${found.length.toLocaleString('fr-FR')} résultats` : '';
 $('prev').disabled=page===1; $('next').disabled=page===pages;
}
function reset(){ $('search').value=''; fields.forEach(id=>$(id).value=''); $('sort').value='source'; page=1; render(); }
$('search').addEventListener('input',()=>{page=1;render()}); [...fields,'sort'].forEach(id=>$(id).addEventListener('change',()=>{page=1;render()})); $('reset').onclick=reset; $('clear-empty').onclick=reset;
$('prev').onclick=()=>{page--;render();$('results').scrollIntoView({behavior:'smooth',block:'start'})}; $('next').onclick=()=>{page++;render();$('results').scrollIntoView({behavior:'smooth',block:'start'})};
$('total').textContent=providers.length.toLocaleString('fr-FR'); render();

const themeToggle = $('theme-toggle');
function updateThemeButton() {
 const dark = document.documentElement.dataset.theme === 'dark';
 themeToggle.setAttribute('aria-pressed', String(dark));
 themeToggle.setAttribute('aria-label', dark ? 'Activer le mode clair' : 'Activer le mode sombre');
 themeToggle.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
 themeToggle.querySelector('.theme-label').textContent = dark ? 'Mode clair' : 'Mode sombre';
 document.querySelector('meta[name="theme-color"]').content = dark ? '#102522' : '#ffffff';
}
themeToggle.addEventListener('click', () => {
 const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
 document.documentElement.dataset.theme = theme;
 try { localStorage.setItem('nextcare-theme', theme); } catch (e) {}
 updateThemeButton();
});
updateThemeButton();
