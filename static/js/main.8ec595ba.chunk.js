(this.webpackJsonpbrush=this.webpackJsonpbrush||[]).push([[0],{83:function(e,t,i){},85:function(e,t,i){},86:function(e,t,i){},91:function(e,t,i){"use strict";i.r(t);var a=i(1),n=i(0),o=i.n(n),s=i(15),r=i.n(s),h=(i(83),i(23)),c=i(102),d=i(5),l=function(e){};l.isSelected=[],l.deselectAll=function(){l.isSelected.fill(!1)},l.getColumnNames=function(){return["isSelected","A","B","A + B","A * B"]},l.getDomain=function(e,t){return[-2,2]},l.values=[],l.getValues=function(e){if(l.values.length!==e){var t=d.a(0,.5);l.values=[];for(var i=0;i<e;i++){var a=t(),n=t();l.values[i]=[!1,a,n,a+n,a*n]}}return l.values};var u=l,f=function(e){};f.draw=function(e,t,i,a,n,o,s){var r=n.getContext("2d"),h=u.getColumnNames();r.fillStyle="#000000",r.fontSize="14px";var c=h[s];r.fillText(c,e+i/2-r.measureText(c).width/2,t+a-a/2+4),r.fontSize="10px",c=(""+u.getDomain(o,s)[0]).slice(0,4),r.fillText(c,e+4,t+a-4),c=(""+u.getDomain(o,s)[1]).slice(0,3),r.fillText(c,e+i-3-r.measureText(c).width,t+12)};var b=f,v=function(e){};v.padding=10,v.normalize=function(e){var t=e.x,i=e.y,a=e.width,n=e.height;return a<0&&(t+=a,a=-a),n<0&&(i+=n,n=-n),{x:t,y:i,width:a,height:n}},v.isWithin=function(e,t,i){var a=v.normalize(t);return void 0!==i&&(a.x-=i,a.y-=i,a.width+=2*i,a.height+=2*i),a.x<=e.x&&e.x<a.x+a.width&&a.y<=e.y&&e.y<a.y+a.height},v.draw=function(e,t,i,a,n,o,s,r,h,c,l){var f=n.getContext("2d"),b=v.padding,w=u.getValues(o),g=d.b().domain(u.getDomain(o,s)).range([e+b,e+i-b]),m=d.b().domain(u.getDomain(o,r)).range([t+a-b,t+b]),x=c;if(void 0===x){var p=(x=f.createImageData(i,a)).data;w.forEach((function(n){var o=g(n[s])-e,c=m(n[r])-t;if(0<=o&&o<i&&0<=c&&c<a){var d=Math.floor(c)*(4*i)+4*Math.floor(o);p[d]=Math.round(0+p[d]*(1-h)),p[d+1]=Math.round(0+p[d+1]*(1-h)),p[d+2]=Math.round(0+p[d+2]*(1-h)),p[d+3]=Math.round(255*h+p[d+3]*(1-h))}}))}var y=f.createImageData(i,a);y.data.set(x.data);var j=y.data;if(void 0!==l)l.forEach((function(n){var o=g(w[n][s])-e,c=m(w[n][r])-t;if(0<=o&&o<i&&0<=c&&c<a){var d=Math.floor(c)*(4*i)+4*Math.floor(o);j[d]=Math.round(255+j[d]*(1-h))}}));else{var M=0;w.forEach((function(n){if(u.isSelected[M]){var o=g(n[s])-e,c=m(n[r])-t;if(0<=o&&o<i&&0<=c&&c<a){var d=Math.floor(c)*(4*i)+4*Math.floor(o);j[d]=Math.round(255+j[d]*(1-h))}}M++}))}return f.putImageData(y,e,t,b,b,i-2*b,a-2*b),x},v.select=function(e,t,i,a,n,o,s,r){var h=v.padding,c=[],l=u.getValues(n),f=d.b().domain(u.getDomain(n,o)).range([e+h,e+i-h]),b=d.b().domain(u.getDomain(n,s)).range([t+a-h,t+h]),w=f.invert(Math.min(r.x,r.x+r.width)),g=f.invert(Math.max(r.x,r.x+r.width)),m=b.invert(Math.max(r.y,r.y+r.height)),x=b.invert(Math.min(r.y,r.y+r.height)),p=0;return l.forEach((function(e){u.isSelected[p]=w<=e[o]&&e[o]<g&&m<=e[s]&&e[s]<x,u.isSelected[p]&&c.push(p),p++})),c};var w=v,g=(i(85),function e(t){var i=200,o=200,s=Object(n.useRef)(),r=t.nData,h=t.opacity,c=u.getColumnNames().length,d=function(t){e.onMouseUp(t,i,o,s,r,h)};return Object(n.useEffect)((function(){var t=e.brush;e.downLocation={x:t.x,y:t.y};var a={type:"mouseup",nativeEvent:{offsetX:t.x+t.width,offsetY:t.y+t.height}};e.onMouseUp(a,i,o,s,r,h),e.draw(i,o,s,r,h)})),Object(a.jsx)("canvas",{width:(c-1)*i,height:(c-1)*o,ref:s,onMouseDown:function(t){e.onMouseDown(t)},onMouseMove:d,onMouseUp:d})});g.handleSize=3,g.isGrowing=!1,g.isXMin=!1,g.isYMin=!1,g.isMoving=!1,g.isWithin=!1,g.bitmaps=void 0,g.selectedRows=void 0,g.brush={x:460,y:260,width:40,height:40},g.downLocation={x:-1,y:-1},g.clear=function(){g.bitmaps=void 0,g.selectedRows=void 0,u.deselectAll(),g.brush={x:-1,y:-1,width:0,height:0},g.downLocation={x:-1,y:-1}},g.onMouseDown=function(e){var t=g.handleSize,i=t/2,a=2*t,n=e.nativeEvent.offsetX,o=e.nativeEvent.offsetY,s=g.brush;if(e.preventDefault(),g.downLocation.x=n,g.downLocation.y=o,w.isWithin({x:n,y:o},s,g.handleSize)){var r=!1,h=!1,c=!1,d=!1;s.width>=0?Math.abs(s.x+s.width-i-n)<=a?h=!0:Math.abs(s.x+i-n)<=a&&(r=!0):Math.abs(s.x+s.width+i-n)<=a?r=!0:Math.abs(s.x-i-n)<=a&&(h=!0),s.height>=0?Math.abs(s.y+s.height-i-o)<=a?c=!0:Math.abs(s.y+i-o)<=a&&(d=!0):Math.abs(s.y+s.height+i-o)<=a?d=!0:Math.abs(s.y-i-o)<=a&&(c=!0),g.isGrowing=!1,g.isMoving=!1,(r||h)&&(c||d)?(g.isGrowing=!0,g.isXMin=r,g.isYMin=c):g.isMoving=!0}else g.brush.x=n,g.brush.y=o,g.brush.width=0,g.brush.height=0,g.isGrowing=!0,g.isXMin=!1,g.isYMin=!0,g.isMoving=!1;g.isWithin=!0},g.onMouseUp=function(e,t,i,a,n,o){var s=g.downLocation.x,r=g.downLocation.y,h=e.nativeEvent.offsetX,c=e.nativeEvent.offsetY,d=Math.floor(s/t),l=Math.floor(r/i),f=d*t,b=l*i,v=g.brush;if(s<0||r<0){var m=Math.floor(h/t),x=Math.floor(c/i),p=Math.floor(v.x/t),y=Math.floor(v.y/i),j=m===p&&x===y;if(g.isWithin!==j){if(g.isWithin=j,!j){var M=a.current,O=p*t,S=y*i;M.getContext("2d").clearRect(O+1,S+1,t-1,i-1),w.draw(O,S,t,i,M,n,p+1,y+1,o,g.bitmaps[p][y],g.selectedRows)}g.drawBrush(a)}}else d===l?"mouseup"===e.type&&(u.deselectAll(),g.selectedRows=void 0,g.draw(t,i,a,n,o)):(g.isGrowing?(h=Math.min(f+t-1,Math.max(f+1,h)),c=Math.min(b+i-1,Math.max(b+1,c)),g.isXMin?(v.width-=h-v.x,v.x=h):v.width=h-v.x,g.isYMin?v.height=c-v.y:(v.height-=c-v.y,v.y=c)):g.isMoving&&(v.x+=h-s,v.y+=c-r,g.downLocation.x=h,g.downLocation.y=c,v.x<f+1&&(v.x=f+1),v.x>f+t-1-v.width&&(v.x=f+t-1-v.width),v.y<b+1&&(v.y=b+1),v.y>b+i-1-v.height&&(v.y=b+i-1-v.height)),g.selectedRows=w.select(f,b,t,i,n,d+1,l+1,v),g.draw(t,i,a,n,o));"mouseup"===e.type&&(g.downLocation.x=-1,g.downLocation.y=-1,g.isGrowing=!1,g.isXMin=!1,g.isYMin=!1,g.isMoving=!1,v.width<0&&(v.x+=v.width,v.width=-v.width),v.height<0&&(v.y+=v.height,v.height=-v.height))},g.draw=function(e,t,i,a,n){if(i){var o=i.current,s=o.getContext("2d"),r=u.getColumnNames().length;if(s){s.clearRect(0,0,(r-1)*e,(r-1)*t),s.strokeStyle="#a0a0a0";for(var h=1;h<r-1;h++)s.moveTo(h*e+.5,0),s.lineTo(h*e+.5,(r-1)*t),s.moveTo(0,h*t+.5),s.lineTo((r-1)*e,h*t+.5);s.stroke();var c=!g.bitmaps;c&&(g.bitmaps=[]);for(var d=1;d<r;d++)for(var l=1;l<r;l++){var f=(d-1)*e,v=(l-1)*t;d===l?b.draw(f,v,e,t,o,a,d):c?(void 0===g.bitmaps[d-1]&&(g.bitmaps[d-1]=[]),g.bitmaps[d-1][l-1]=w.draw(f,v,e,t,o,a,d,l,n)):w.draw(f,v,e,t,o,a,d,l,n,g.bitmaps[d-1][l-1],g.selectedRows)}g.drawBrush(i)}}},g.drawBrush=function(e){var t=g.brush;if(t.x>=0&&t.y>=0){var i=g.handleSize,a=w.normalize(t);a.x=Math.floor(a.x)+.5,a.y=Math.floor(a.y)+.5,a.width=Math.round(a.width),a.height=Math.round(a.height);var n=e.current.getContext("2d");n.strokeStyle="#99bbdd",n.fillStyle="#99bbdd",n.strokeRect(a.x,a.y,a.width,a.height),g.isWithin&&a.width>=i&&a.height>=i&&(n.fillRect(a.x+1,a.y+1,i,i),n.fillRect(a.x+a.width-i-1,a.y+1,i,i),n.fillRect(a.x+1,a.y+a.height-i-1,i,i),n.fillRect(a.x+a.width-i-1,a.y+a.height-i-1,i,i))}};var m=g,x=(i(86),function e(){var t=Object(n.useState)(e.getPower(12)),i=Object(h.a)(t,2),o=i[0],s=i[1],r=Object(n.useState)(.5),d=Object(h.a)(r,2),l=d[0],u=d[1];return Object(a.jsxs)("div",{className:"Column",children:[Object(a.jsx)("div",{className:"Description",children:Object(a.jsx)("h1",{children:"Better Brushing"})}),Object(a.jsx)("div",{className:"GridPlots",children:Object(a.jsx)(m,{nData:o,opacity:l})}),Object(a.jsxs)("div",{className:"GridControls",children:[Object(a.jsx)("label",{children:"Points:"}),Object(a.jsx)(c.a,{defaultValue:12,step:1,min:6,max:18,valueLabelDisplay:"auto",marks:!0,valueLabelFormat:function(t){return e.getPower(t).toExponential()},onChangeCommitted:function(t,i){m.clear(),s(e.getPower(i))}}),Object(a.jsx)("label",{children:"Transparency:"}),Object(a.jsx)(c.a,{defaultValue:.5,step:.01,min:0,max:1,valueLabelDisplay:"auto",onChangeCommitted:function(e,t){m.clear(),u(1-t)}})]}),Object(a.jsxs)("div",{className:"Description",children:[Object(a.jsxs)("p",{children:["Brushing is a basic technique of exploratory data analysis, developed in the 1970s (",Object(a.jsx)("a",{href:"https://www.researchgate.net/publication/245345268_An_interactive_multidimensional_data_display_and_analysis_system",children:"Fishkeller, Friedman, and Tukey"}),") and 1980s (",Object(a.jsx)("a",{href:"https://www.jstor.org/stable/1269768?seq=1",children:"Becker and Cleveland"}),"; ",Object(a.jsx)("a",{href:"https://www.jstor.org/stable/2289448?seq=1",children:"Stuetzle"}),")."]}),Object(a.jsx)("p",{children:"Back then, analysts were happy to brush a few hundred points.  On modern hardware, we can brush a million."}),Object(a.jsx)("p",{children:"To optimize performance, CANVAS is used here instead of SVG, and bitmap images are cached of the deselected points.  So drawing a plot requires only bit-blitting an image, then drawing the selected points."})]}),Object(a.jsxs)("div",{className:"Description",children:[Object(a.jsx)("h2",{children:"About This User Interface"}),Object(a.jsx)("p",{children:"Over the years, software products have implemented brushing in many ways.  Attention to the points below can improve usability."}),Object(a.jsxs)("p",{children:["It's best to make the brush ",Object(a.jsx)("em",{children:"persistent"})," rather than ",Object(a.jsx)("em",{children:"transient"}),".  A persistent brush reduces errors by giving the user repeated chances to adjust the brush size.  Also, a persistent brush supports sharing the data exploration."]}),Object(a.jsx)("p",{children:"Handles to resize the brush ease the learning curve for novice users.  To minimize interference with the data, handles are shown only when they can be used."}),Object(a.jsx)("p",{children:"Some brushing implementations increase the size of selected points.  Increased size increases overplotting, so it's better to use color."}),Object(a.jsx)("p",{children:"Colors are chosen to emphasize the data.  Black on white gives maximum emphasis.  The red selection color draws attention.  The grid, being less important, is gray.  For the same reason, the brush could be drawn in gray; however, blue is the default selection color in most web browsers."})]}),Object(a.jsx)("a",{href:"https://github.com/hemanrobinson/brush/",children:"Code Shared on GitHub"})]})});x.getPower=function(e){return(e%3===0?1:e%3===1?2:5)*Math.pow(10,Math.floor(e/3))};var p=x;r.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(p,{})}),document.getElementById("root"))}},[[91,1,2]]]);
//# sourceMappingURL=main.8ec595ba.chunk.js.map