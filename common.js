const API = location.origin + '/api';
function getToken(){ return localStorage.getItem('token') || ''; }
async function api(path, opts={}){
  opts.headers = Object.assign({}, opts.headers||{}, {'Content-Type':'application/json','Authorization':'Bearer '+getToken()});
  const res = await fetch(API+path, opts);
  if(res.status===401) location.href='index.html';
  if(!res.ok) throw new Error(await res.text());
  return res.json();
}
function openModal(html){
  const m = document.getElementById('modal');
  m.innerHTML = `<div>${html}<div style='text-align:end;margin-top:8px'><button onclick="closeModal()">إغلاق</button></div></div>`;
  m.classList.remove('hidden');
}
function closeModal(){ document.getElementById('modal').classList.add('hidden'); }
window.API=API;window.api=api;window.openModal=openModal;window.closeModal=closeModal;
