(function(){
  var input=document.querySelector('.filter'); var grid=document.querySelector('.grid.filterable'); if(!input||!grid) return;
  var cards=Array.prototype.slice.call(grid.querySelectorAll('.card')); var count=document.querySelector('.count'); var sort=document.querySelector('.sort');
  function apply(){
    var q=input.value.trim().toLowerCase().split(/\s+/).filter(Boolean); var n=0;
    cards.forEach(function(c){var t=c.getAttribute('data-title'); var ok=q.every(function(w){return t.indexOf(w)>-1;}); c.classList.toggle('hidden',!ok); if(ok) n++;});
    if(count) count.textContent=q.length? n+' of '+cards.length+' pieces' : cards.length+' pieces';
  }
  input.addEventListener('input',apply); apply();
  if(sort){sort.addEventListener('change',function(){
    var v=sort.value; var arr=cards.slice();
    function price(c){return parseFloat(c.querySelector('.price').textContent.replace(/[^0-9.]/g,''))||0;}
    if(v==='price-asc') arr.sort(function(a,b){return price(a)-price(b);});
    else if(v==='price-desc') arr.sort(function(a,b){return price(b)-price(a);});
    else if(v==='title') arr.sort(function(a,b){return a.getAttribute('data-title')<b.getAttribute('data-title')?-1:1;});
    arr.forEach(function(c){grid.appendChild(c);});
  });}
  document.addEventListener('click',function(e){if(!e.target.closest('.site-header')) document.body.classList.remove('nav-open');});
})();
