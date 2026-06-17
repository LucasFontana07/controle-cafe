
let nota=0;
const stars=document.getElementById('stars');
for(let i=1;i<=5;i++){
 const s=document.createElement('span');
 s.textContent='★';
 s.onclick=()=>{nota=i;paint()};
 stars.appendChild(s);
}
function paint(){
 [...stars.children].forEach((x,idx)=>x.className=idx<nota?'on':'');
}
function dados(){return JSON.parse(localStorage.getItem('cafes')||'[]')}
function salvarDados(v){localStorage.setItem('cafes',JSON.stringify(v))}

function salvar(){
 const arr=dados();
 arr.push({
 id:Date.now(),
 marca:marca.value,variedade:variedade.value,sabores:sabores.value,
 metodo:metodo.value,moagem:moagem.value,receita:receita.value,
 data:data.value,nota
 });
 salvarDados(arr);
 document.querySelectorAll('input').forEach(x=>x.value='');
 nota=0; paint(); render();
}

function excluir(id){
 salvarDados(dados().filter(x=>x.id!==id));
 render();
}

function render(){
 let arr=dados();
 arr=arr.filter(x=>
 x.marca.toLowerCase().includes(fMarca.value.toLowerCase()) &&
 x.variedade.toLowerCase().includes(fVariedade.value.toLowerCase()) &&
 x.metodo.toLowerCase().includes(fMetodo.value.toLowerCase()) &&
 (!fNota.value || x.nota==fNota.value)
 );

 lista.innerHTML=arr.map(x=>`<tr>
 <td>${x.data||''}</td><td>${x.marca}</td><td>${x.metodo}</td>
 <td>${x.moagem}</td><td>${'⭐'.repeat(x.nota)}</td>
 <td><button onclick="excluir(${x.id})">Excluir</button></td></tr>`).join('');

 const all=dados();
 total.textContent=all.length;
 media.textContent=all.length?(all.reduce((a,b)=>a+b.nota,0)/all.length).toFixed(1):0;

 const map={};
 all.forEach(x=>{
   const k=x.receita+'|'+x.metodo+'|'+x.moagem;
   if(!map[k]) map[k]={r:x.receita,m:x.metodo,g:x.moagem,n:[]};
   map[k].n.push(x.nota);
 });
 ranking.innerHTML=Object.values(map)
 .map(x=>({...x,avg:x.n.reduce((a,b)=>a+b,0)/x.n.length}))
 .sort((a,b)=>b.avg-a.avg)
 .map(x=>`<tr><td>${x.r}</td><td>${x.m}</td><td>${x.g}</td><td>${x.avg.toFixed(1)} ⭐</td></tr>`).join('');
}
render();
