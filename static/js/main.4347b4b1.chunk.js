(this.webpackJsonpbrush=this.webpackJsonpbrush||[]).push([[0],{136:function(e,t,s){},137:function(e,t,s){},139:function(e,t,s){},143:function(e,t,s){"use strict";s.r(t);var a=s(1),r=s.n(a),i=s(34),n=s.n(i),o=(s(136),s(3)),c=s(153),l=s(5),h=function(e){};h.selectedRows=[],h.deselectAll=function(){h.selectedRows=[]},h.getColumnNames=function(){return["A","B","A * B","sin( A / B )"]},h.getDomain=function(e,t){return[l.d(h.getValues(e),(function(e){return e[t]})),l.c(h.getValues(e),(function(e){return e[t]}))]},h.values=[],h.getValues=function(e){if(h.values.length!==e){var t=l.e(0,.5);h.values=[];for(var s=0;s<e;s++){var a=t(),r=t();h.values[s]=[a,r,a*r,0===r?0:Math.sin(a/r)]}}return h.values};var d=h,u=function(e){};u.draw=function(e,t,s,a,r,i,n){var o=r.getContext("2d"),c=d.getColumnNames();o.fillStyle="#000000",o.font="14px Verdana";var l=c[n];o.fillText(l,e+s/2-o.measureText(l).width/2,t+a-a/2+4),o.font="12px Verdana",l=""+Math.round(10*d.getDomain(i,n)[0])/10,o.fillText(l,e+4,t+a-4),l=""+Math.round(10*d.getDomain(i,n)[1])/10,o.fillText(l,e+s-3-o.measureText(l).width,t+12)};var b=u,p=function(e){};p.padding=10,p.normalize=function(e){var t=e.x,s=e.y,a=e.width,r=e.height;return a<0&&(t+=a,a=-a),r<0&&(s+=r,r=-r),{x:t,y:s,width:a,height:r}},p.isWithin=function(e,t,s){var a=p.normalize(t);return void 0!==s&&(a.x-=s,a.y-=s,a.width+=2*s,a.height+=2*s),a.x<=e.x&&e.x<a.x+a.width&&a.y<=e.y&&e.y<a.y+a.height},p.draw=function(e,t,s,a,r,i,n,o,c,l,h){var u=o.getContext("2d"),b=p.padding,j=n[r],f=n[i],g=j.length,m=d.getValues(g),v=s*a*4,x=h;if(void 0===x){var w=(x=u.createImageData(s,a)).data;m.forEach((function(e,t){var r=j[t],i=4*((a-f[t])*s+r);0<=i&&i+3<v&&(w[i]=Math.round(0+w[i]*(1-c)),w[i+1]=Math.round(0+w[i+1]*(1-c)),w[i+2]=Math.round(0+w[i+2]*(1-c)),w[i+3]=Math.round(255*c+w[i+3]*(1-c)))}))}var O=u.createImageData(s,a);O.data.set(x.data);var y=O.data;return l.forEach((function(e){var t=j[e],r=4*((a-f[e])*s+t);0<=r&&r+3<v&&(y[r]=Math.round(255+y[r]*(1-c)))})),u.putImageData(O,e,t,b,b,s-2*b,a-2*b),x},p.select=function(e,t,s,a,r,i,n,o){for(var c=[],l=n[r],h=n[i],d=l.length,u=Math.floor(Math.min(o.x,o.x+o.width)-e),b=Math.floor(Math.max(o.x,o.x+o.width)-e),p=a-Math.floor(Math.max(o.y,o.y+o.height)-t),j=a-Math.floor(Math.min(o.y,o.y+o.height)-t),f=0;f<d;f++){var g=l[f],m=h[f];u<=g&&g<b&&p<m&&m<=j&&c.push(f)}return c};var j=p,f=(s(137),s(0)),g=function e(t){var s=Object(a.useRef)(),r=t.nData,i=t.opacity,n=200,c=200,h=d.getColumnNames().length,u=d.getValues(r),b=h*n,p=h*c;e.scaled=[];for(var g=[],m=0;m<h;m++){e.scaled[m]=new Uint16Array(r);var v=m*n;g[m]=l.g().domain(d.getDomain(r,m)).range([v+j.padding,v+n-j.padding])}return u.forEach((function(t,s){for(var a=0;a<h;a++){var r=a*n;e.scaled[a][s]=Math.round(g[a](t[a])-r)}})),Object(a.useEffect)((function(){e.canvas=l.h(s.current.childNodes[0]);var t=l.h(s.current.childNodes[1]);t.selectAll("*").remove();var a=t.append("g").selectAll("g").data(l.b(l.f(h),l.f(h))).join("g").attr("transform",(function(e){var t=Object(o.a)(e,2),s=t[0],a=t[1];return"translate(".concat(s*n,",").concat(a*c,")")})),u=function(e,t){var s;return function(){for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];clearTimeout(s),s=setTimeout((function(){clearTimeout(s),e.apply(void 0,r)}),t)}}(e.draw,1),b=l.a().extent([[2,2],[n,c]]).on("start",(function(t){if(t.sourceEvent){var s=t.sourceEvent.target.parentNode;if(e.brushNode!==s)l.h(e.brushNode).call(b.move,null),e.brushNode=s,d.deselectAll();else if(t.selection){var a,r,i=t.selection[0][0],o=t.selection[0][1],h=t.selection[1][0],u=t.selection[1][1];if(t.sourceEvent.touches){var p=t.sourceEvent.touches[0];a=p.clientX-e.canvas.getBoundingClientRect().x,r=p.clientY-e.canvas.getBoundingClientRect().y}else a=t.sourceEvent.offsetX,r=t.sourceEvent.offsetY;var f=Math.floor(a/n),g=Math.floor(r/c),m=f*n,v=g*c;j.isWithin({x:a,y:r},{x:m+i,y:v+o,width:h-i,height:u-o})||d.deselectAll()}}})).on("brush",(function(t){var a=document.getElementById("textarea");if(t.selection){var o,l,h=t.selection[0][0],b=t.selection[0][1],p=t.selection[1][0],f=t.selection[1][1];if(t.sourceEvent)if(t.sourceEvent.touches){var g=t.sourceEvent.touches[0];a.value+="onBrush "+g+"  "+e.canvas.getBoundingClientRect()+"\n",o=g.clientX-e.canvas.getBoundingClientRect().x,l=g.clientY-e.canvas.getBoundingClientRect().y}else o=t.sourceEvent.offsetX,l=t.sourceEvent.offsetY;else o=n*Math.floor(1),l=0;var m=Math.floor(o/n),v=Math.floor(l/c),x=m*n,w=v*c;m===v?d.deselectAll():(d.selectedRows=j.select(x,w,n,c,m,v,e.scaled,{x:x+h,y:w+b,width:p-h,height:f-b}),e.bitmaps&&e.bitmaps[m]&&j.draw(x,w,n,c,m,v,e.scaled,s.current.firstChild,i,d.selectedRows,e.bitmaps[m][v]))}u(n,c,s,r,i,!1)})).on("end",(function(t){e.draw(n,c,s,r,i,!0)}));a.call(b),e.brushNode=t.node().firstChild.childNodes[4],l.h(e.brushNode).call(b.move,[[40,40],[80,80]])})),Object(f.jsxs)("div",{ref:s,children:[Object(f.jsx)("canvas",{width:b,height:p}),Object(f.jsx)("svg",{width:b,height:p})]})};g.bitmaps=void 0,g.canvas=void 0,g.brushNode=void 0,g.scaled=void 0,g.clear=function(){d.deselectAll(),g.bitmaps=void 0},g.draw=function(e,t,s,a,r,i){if(s){var n=s.current.firstChild,o=n.getContext("2d"),c=d.getColumnNames().length;if(o){if(i){o.clearRect(0,0,c*e,c*t),o.strokeStyle="#939ba1";for(var l=1;l<c;l++)o.moveTo(l*e+.5,0),o.lineTo(l*e+.5,c*t),o.moveTo(0,l*t+.5),o.lineTo(c*e,l*t+.5);o.stroke()}var h=!g.bitmaps;h&&(g.bitmaps=[]);for(var u=0;u<c;u++)for(var p=0;p<c;p++){var f=u*e,m=p*t;u===p?i&&b.draw(f,m,e,t,n,a,u):h?(void 0===g.bitmaps[u]&&(g.bitmaps[u]=[]),g.bitmaps[u][p]=j.draw(f,m,e,t,u,p,g.scaled,n,r,d.selectedRows)):j.draw(f,m,e,t,u,p,g.scaled,n,r,d.selectedRows,g.bitmaps[u][p])}}}};var m=g,v=(s(139),s.p+"static/media/becker.ed8ef60d.png"),x=s.p+"static/media/cleveland.70d2e3e7.png",w=function e(){var t=Object(a.useState)(e.getPower(14)),s=Object(o.a)(t,2),r=s[0],i=s[1],n=Object(a.useState)(.5),l=Object(o.a)(n,2),h=l[0],d=l[1];return Object(f.jsxs)("div",{className:"Column",children:[Object(f.jsxs)("div",{className:"Description",children:[Object(f.jsx)("h1",{children:"Optimized Brushing"}),Object(f.jsx)("p",{children:"Brushing is a basic technique of exploratory data analysis, developed in the 1970s and 1980s.  Back then, analysts were happy to brush a few hundred points.  On modern hardware, we can brush many more."}),Object(f.jsx)("p",{children:"Drag the brush to select the points.  Drag the edges to resize the brush.  Drag a rectangle in any plot to create a new brush."}),Object(f.jsx)("p",{children:"Use the sliders to adjust the number of points and their transparency."}),Object(f.jsx)(m,{nData:r,opacity:h}),Object(f.jsx)("br",{}),Object(f.jsx)("textarea",{id:"textarea",rows:"10",columns:"120"}),Object(f.jsx)("br",{})]}),Object(f.jsxs)("div",{className:"GridControls",children:[Object(f.jsx)("label",{children:"Points per Plot:"}),Object(f.jsx)(c.a,{defaultValue:14,step:1,min:9,max:18,valueLabelDisplay:"auto",marks:!0,valueLabelFormat:function(t){var s=e.getPower(t);return s>=1e6?s=s/1e6+"M":s>=1e3&&(s=s/1e3+"K"),s},onChange:function(t,s){m.clear(),i(e.getPower(s))}}),Object(f.jsx)("span",{}),Object(f.jsx)("label",{children:"Transparency:"}),Object(f.jsx)(c.a,{defaultValue:.5,step:.01,min:0,max:.99,valueLabelDisplay:"auto",onChange:function(e,t){m.clear(),d(1-t)}})]}),Object(f.jsxs)("div",{className:"Description",children:[Object(f.jsx)("h2",{children:"Design Notes"}),Object(f.jsxs)("p",{className:"center",children:[Object(f.jsx)("a",{href:"https://www.datavis.ca/milestones/index.php?group=1975%2B&mid=ms259",children:Object(f.jsx)("img",{title:"Dr. Richard Becker",alt:"Dr. Richard Becker",src:v})}),"\xa0\xa0\xa0\xa0\xa0",Object(f.jsx)("a",{href:"https://www.datavis.ca/milestones/index.php?group=1975%2B&mid=ms259",children:Object(f.jsx)("img",{title:"Dr. William Cleveland",alt:"Dr. William Cleveland",src:x})}),Object(f.jsx)("br",{})]}),Object(f.jsxs)("p",{children:["This design derives from the ",Object(f.jsx)("a",{href:"http://www.sci.utah.edu/~kpotter/Library/Papers/becker:1987:BS/index.html",children:"scatter plot matrix"})," of ",Object(f.jsx)("a",{href:"https://www.researchgate.net/scientific-contributions/Richard-A-Becker-7076158",children:"Richard Becker"})," and ",Object(f.jsx)("a",{href:"https://www.cerias.purdue.edu/site/people/faculty/view/709",children:"William Cleveland"})," (Becker and Cleveland, 1987).  The implementation uses code from the ",Object(f.jsx)("a",{href:"https://observablehq.com/collection/@d3/d3-brush",children:"d3-brush collection"}),"."]}),Object(f.jsx)("p",{children:'The goal of the scatter plot matrix is not to locate points, but to find patterns in the data.  Therefore, there are no axes, only data ranges.  This increases Tufte\'s "Data-Ink Ratio" (Tufte, 1983).'}),Object(f.jsx)("p",{children:"Colors emphasize the data.   Black on white gives maximum emphasis.  The red selection color draws attention.  The grid, being less important, is gray."}),Object(f.jsx)("p",{children:"For the same reason, the brush could be gray.  However, usability tests pointed out that blue is the standard selection color (Ho, 2016).  Following standards eases the user's learning curve."}),Object(f.jsxs)("p",{children:[Object(f.jsx)("a",{href:"https://github.com/d3/d3-brush",children:"D3's brush"})," is ",Object(f.jsx)("em",{children:"persistent"})," rather than ",Object(f.jsx)("em",{children:"transient"}),".  A persistent brush reduces errors, by enabling the user to resize the brush (Tidwell, 2010).  A persistent brush also helps users share their explorations, through screen shots for example."]}),Object(f.jsxs)("p",{children:["Transparency shows density, via ",Object(f.jsx)("a",{href:"https://en.wikipedia.org/wiki/Alpha_compositing",children:"alpha blending"}),".  This gives scatter plots the expressive power of contour plots, while still displaying individual points (Wegman and Luo, 2002)."]}),Object(f.jsx)("p",{children:"The following optimizations improve performance:"}),Object(f.jsxs)("ol",{children:[Object(f.jsx)("li",{children:"Drawing in a single CANVAS element avoids the need to allocate thousands of SVG elements."}),Object(f.jsx)("li",{children:"Each row of data is drawn as a single pixel, to display large data sets with minimal drawing code."}),Object(f.jsxs)("li",{children:["Deselected points are cached, so drawing a plot requires only a fast ",Object(f.jsx)("a",{href:"https://en.wikipedia.org/wiki/Bit_blit",children:"bit blit"}),", then drawing the selected points."]}),Object(f.jsx)("li",{children:"Selected row indices are cached, so drawing selected points iterates over a short list, not the entire data set."}),Object(f.jsxs)("li",{children:["Pixel coordinates are cached, per ",Object(f.jsx)("a",{href:"https://observablehq.com/@fil",children:"Fil"}),"'s suggestion, to speed drawing and selection."]}),Object(f.jsxs)("li",{children:["The brushing interaction is ",Object(f.jsx)("a",{href:"https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086",children:"debounced"}),", also per ",Object(f.jsx)("a",{href:"https://observablehq.com/@fil",children:"Fil"}),"'s suggestion, to improve drawing for large data sets."]})]}),Object(f.jsx)("p",{children:"Performance varies, but most desktops can display hundreds of thousands of points per plot.  So a 4x4 matrix can brush several million points.  As our hardware improves, we'll see these numbers grow."}),Object(f.jsx)("br",{}),Object(f.jsx)("h2",{children:"References"}),Object(f.jsxs)("ul",{children:[Object(f.jsxs)("li",{children:['Becker, R. and Cleveland, W. (1987). "Brushing Scatterplots". Technometrics. 29 (2): 127-142. ',Object(f.jsx)("a",{href:"https://doi.org/10.2307/1269768",children:"https://doi.org/10.2307/1269768"}),"."]}),Object(f.jsx)("br",{}),Object(f.jsxs)("li",{children:["Ho, Y. (2016). Personal communication. ",Object(f.jsx)("a",{href:"https://www.linkedin.com/in/yang-ho-94b14860/",children:"https://www.linkedin.com/in/yang-ho-94b14860/"})]}),Object(f.jsx)("br",{}),Object(f.jsxs)("li",{children:["Tidwell, J. (2010). Designing Interfaces: Patterns for Effective Interaction Design, Second Edition, 312-314.  Sebastopol CA: O'Reilly Media. ",Object(f.jsx)("a",{href:"https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/",children:"https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/"}),"."]}),Object(f.jsx)("br",{}),Object(f.jsxs)("li",{children:["Tufte, E. (1983). The Visual Display of Quantitative Information, First Edition, 91-105.  Cheshire CN: Graphics Press. ",Object(f.jsx)("a",{href:"https://www.edwardtufte.com/tufte/",children:"https://www.edwardtufte.com/tufte/"}),"."]}),Object(f.jsx)("br",{}),Object(f.jsxs)("li",{children:['Wegman, E. and Luo, Q. (2002). "On Methods of Computer Graphics for Visualizing Densities". Journal of Computational and Graphical Statistics 11, (1), 137-162. ',Object(f.jsx)("a",{href:"https://doi.org/10.1198/106186002317375659",children:"https://doi.org/10.1198/106186002317375659"}),"."]}),Object(f.jsx)("br",{})]})]}),Object(f.jsx)("a",{href:"https://github.com/hemanrobinson/brush/",children:"Code Shared on GitHub"})]})};w.getPower=function(e){return(e%3===0?1:e%3===1?2:5)*Math.pow(10,Math.floor(e/3))};var O=w;n.a.render(Object(f.jsx)(r.a.StrictMode,{children:Object(f.jsx)(O,{})}),document.getElementById("root"))}},[[143,1,2]]]);
//# sourceMappingURL=main.4347b4b1.chunk.js.map