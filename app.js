
let dados=JSON.parse(localStorage.getItem('receitas')||'[]');
const lista=document.getElementById('lista');
function save(){localStorage.setItem('receitas',JSON.stringify(dados));}
function render(){
const f=(document.getElementById('filtro').value||'').toLowerCase();
const itens=dados.filter(r=>(r.nome+r.cafe).toLowerCase().includes(f));
document.getElementById('total').textContent=dados.length;
document.getElementById('media').textContent=dados.length?(dados.reduce((a,b)=>a+b.nota,0)/dados.length).toFixed(1):0;
lista.innerHTML='';
itens.sort((a,b)=>b.nota-a.nota).forEach(r=>{
lista.innerHTML+=`<div class="item"><b>${r.nome}</b><br>${r.cafe}<br>⭐${r.nota}<br>${r.conclusao}<br>
<button onclick="del(${r.id})">Excluir</button></div>`;
});
}
form.onsubmit=e=>{
e.preventDefault();
dados.push({id:Date.now(),nome:nome.value,cafe:cafe.value,metodo:metodo.value,moagem:moagem.value,degustacao:degustacao.value,conclusao:conclusao.value,nota:Number(nota.value)});
save();form.reset();render();
};
filtro.oninput=render;
function del(id){dados=dados.filter(x=>x.id!==id);save();render();}
render();
