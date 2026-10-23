// An interactive orbital diagram; labels and native buttons remain usable without canvas.
const canvas=document.querySelector('#solar-canvas'),ctx=canvas.getContext('2d');
const host=document.querySelector('.solar-stage'),control=document.querySelector('#solar-motion'),label=document.querySelector('.solar-live-label');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const planets=[
 {name:'Mercury',color:'#aaa7a2',r:51,size:5,speed:.28,angle:4.0},
 {name:'Venus',color:'#dcb578',r:77,size:8,speed:.23,angle:2.5},
 {name:'Earth',color:'#4b9dcc',r:105,size:9,speed:.19,angle:.8},
 {name:'Mars',color:'#c96b4a',r:135,size:7,speed:.16,angle:5.3},
 {name:'Jupiter',color:'#d4b18e',r:169,size:16,speed:.10,angle:3.5},
 {name:'Saturn',color:'#dfc999',r:202,size:13,speed:.076,angle:1.55},
 {name:'Uranus',color:'#82ced1',r:235,size:11,speed:.057,angle:4.55},
 {name:'Neptune',color:'#557ddb',r:267,size:11,speed:.043,angle:.2}
];
let width=0,height=0,scale=1,dpr=1,time=0,last=0,selected=0,hovered=-1,visible=true,localPaused=reduce.matches,globalPaused=document.body.classList.contains('effects-paused');
const hits=[];let starSeed=42;const random=()=>{starSeed=(starSeed*1664525+1013904223)>>>0;return starSeed/4294967296};
const stars=Array.from({length:100},()=>({x:random(),y:random(),a:.12+random()*.35,r:.35+random()*.65}));
function stopped(){return localPaused||globalPaused||reduce.matches}
function sync(){control.textContent=localPaused?'Play orbits':'Pause orbits';control.setAttribute('aria-pressed',String(localPaused));control.setAttribute('aria-label',localPaused?'Play solar system orbits':'Pause solar system orbits')}
function select(index){document.querySelector(`[data-service="${index}"]`)?.click()}
function sphere(p,x,y,r){
 ctx.save();ctx.translate(x,y);const dx=width*.5-x,dy=height*.48-y,a=Math.atan2(dy,dx);
 const shade=ctx.createRadialGradient(Math.cos(a)*r*.45,Math.sin(a)*r*.45,r*.05,0,0,r*1.1);shade.addColorStop(0,p.color);shade.addColorStop(.55,p.color);shade.addColorStop(1,'#14101b');
 ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fillStyle=shade;ctx.fill();ctx.save();ctx.clip();
 if(p.name==='Jupiter'||p.name==='Saturn'){
  for(let k=-4;k<=4;k++){ctx.beginPath();ctx.lineWidth=r*.14;ctx.strokeStyle=k%2?'#825d393f':'#fff0cb42';const yb=k*r*.22;ctx.moveTo(-r,yb);ctx.bezierCurveTo(-r*.3,yb+r*.18*Math.sin(time*.25+k),r*.3,yb-r*.05,r,yb);ctx.stroke()}
 }else if(p.name==='Earth'){
  ctx.fillStyle='#8cbe8555';for(let k=0;k<4;k++){ctx.beginPath();ctx.ellipse(Math.sin(k*2+time*.2)*r*.55,Math.cos(k*3)*r*.55,r*.25,r*.4,k,0,Math.PI*2);ctx.fill()}
  ctx.strokeStyle='#f1f7fc5c';ctx.lineWidth=r*.12;ctx.beginPath();ctx.arc(0,0,r*.6,.1,1.9);ctx.stroke();
 }else if(p.name==='Mercury'||p.name==='Mars'){
  ctx.fillStyle='#25191935';for(let k=0;k<6;k++){ctx.beginPath();ctx.arc(Math.sin(k*3)*r*.6,Math.cos(k*5)*r*.6,r*.12,0,Math.PI*2);ctx.fill()}
 }
 ctx.restore();ctx.restore();
 if(p.name==='Saturn'){ctx.save();ctx.translate(x,y);ctx.rotate(-.35);ctx.beginPath();ctx.ellipse(0,0,r*1.85,r*.51,0,0,Math.PI*2);ctx.strokeStyle='#c6b49aab';ctx.lineWidth=r*.26;ctx.stroke();ctx.beginPath();ctx.ellipse(0,0,r*2.15,r*.6,0,0,Math.PI*2);ctx.strokeStyle='#baa3874d';ctx.lineWidth=r*.1;ctx.stroke();ctx.restore()}
}
function draw(){
 if(!ctx||!width||!height)return;ctx.clearRect(0,0,width,height);hits.length=0;
 stars.forEach(s=>{ctx.fillStyle=`rgba(229,220,241,${s.a})`;ctx.beginPath();ctx.arc(s.x*width,s.y*height,s.r,0,Math.PI*2);ctx.fill()});
 const cx=width*.5,cy=height*.48,flatten=.81;
 planets.forEach((p,i)=>{ctx.beginPath();ctx.ellipse(cx,cy,p.r*scale,p.r*scale*flatten,0,0,Math.PI*2);ctx.lineWidth=i===selected?1.2:.8;ctx.strokeStyle=i===selected?'#bc8bb968':'#9f8ba027';ctx.stroke()});
 ctx.save();
 const sun=ctx.createRadialGradient(cx-6*scale,cy-7*scale,2*scale,cx,cy,25*scale);sun.addColorStop(0,'#fff6c7');sun.addColorStop(.4,'#ffd268');sun.addColorStop(1,'#e77927');ctx.fillStyle=sun;ctx.beginPath();ctx.arc(cx,cy,24*scale,0,Math.PI*2);ctx.fill();ctx.restore();
 ctx.fillStyle='#f5d08a';ctx.font=`${Math.max(9,10*scale)}px Manrope, sans-serif`;ctx.textAlign='center';ctx.fillText('SUN',cx,cy+40*scale);
 planets.forEach((p,i)=>{
  const angle=p.angle+time*p.speed,x=cx+Math.cos(angle)*p.r*scale,y=cy+Math.sin(angle)*p.r*scale*flatten,r=Math.max(3.5,p.size*scale);
  hits.push({x,y,r,index:i});sphere(p,x,y,r);
  if(i===selected||i===hovered){ctx.beginPath();ctx.arc(x,y,r+5,0,Math.PI*2);ctx.strokeStyle=i===selected?'#f5b2d8':'#ffffff88';ctx.lineWidth=1.2;ctx.stroke()}
  if(i===selected){label.textContent=p.name.toUpperCase();label.style.left=x+'px';label.style.top=(y-r-9)+'px'}
 });
}
function resize(){width=host.clientWidth;height=host.clientHeight;scale=Math.min(width/620,height/510);dpr=Math.min(devicePixelRatio||1,1.7);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx?.setTransform(dpr,0,0,dpr,0,0);draw()}
function hit(e){const b=canvas.getBoundingClientRect(),x=e.clientX-b.left,y=e.clientY-b.top;return [...hits].reverse().find(p=>Math.hypot(x-p.x,y-p.y)<Math.max(18,p.r+8))?.index??-1}
canvas.addEventListener('pointermove',e=>{hovered=hit(e);canvas.style.cursor=hovered>=0?'pointer':'default';if(stopped())draw()},{passive:true});
canvas.addEventListener('pointerleave',()=>{hovered=-1;if(stopped())draw()});
canvas.addEventListener('click',e=>{const i=hit(e);if(i>=0)select(i);else{const b=canvas.getBoundingClientRect();if(Math.hypot(e.clientX-b.left-width*.5,e.clientY-b.top-height*.48)<30*scale)select(0)}});
control.addEventListener('click',()=>{localPaused=!localPaused;sync();draw()});
window.addEventListener('portfolio-service',e=>{selected=e.detail.index;draw()});
window.addEventListener('portfolio-motion',e=>{globalPaused=e.detail.paused;draw()});
reduce.addEventListener('change',()=>{if(reduce.matches)localPaused=true;sync();draw()});
if('ResizeObserver' in window)new ResizeObserver(resize).observe(host);else window.addEventListener('resize',resize,{passive:true});
if('IntersectionObserver' in window)new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)draw()},{rootMargin:'100px'}).observe(host);
function tick(now){requestAnimationFrame(tick);const dt=Math.min((now-last)/1000,.05);last=now;if(document.hidden||!visible)return;if(!stopped()){time+=dt;draw()}}
sync();resize();requestAnimationFrame(tick);
