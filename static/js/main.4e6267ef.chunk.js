(this.webpackJsonpbrush=this.webpackJsonpbrush||[]).push([[0],{136:function(e,t,a){},138:function(e,t,a){},139:function(e,t,a){},144:function(e,t,a){"use strict";a.r(t);var i=a(1),n=a(0),r=a.n(n),s=a(17),o=a.n(s),l=(a(136),a(6)),c=a(155),d=a(2),h=function(e){};h.isSelected=[],h.deselectAll=function(){h.isSelected.fill(!1)},h.getColumnNames=function(){return["isSelected","A","B","A + B","A * B"]},h.getDomain=function(e,t){return[-2,2]},h.values=[],h.getValues=function(e){if(h.values.length!==e){var t=d.c(0,.5);h.values=[];for(var a=0;a<e;a++){var i=t(),n=t();h.values[a]=[!1,i,n,i+n,i*n]}}return h.values};var u=h,b=function(e){};b.draw=function(e,t,a,i,n,r,s){var o=n.getContext("2d"),l=u.getColumnNames();o.fillStyle="#000000",o.fontSize="14px";var c=l[s];o.fillText(c,e+a/2-o.measureText(c).width/2,t+i-i/2+4),o.fontSize="10px",c=(""+u.getDomain(r,s)[0]).slice(0,4),o.fillText(c,e+4,t+i-4),c=(""+u.getDomain(r,s)[1]).slice(0,3),o.fillText(c,e+a-3-o.measureText(c).width,t+12)};var m=b,j=function(e){};j.padding=10,j.normalize=function(e){var t=e.x,a=e.y,i=e.width,n=e.height;return i<0&&(t+=i,i=-i),n<0&&(a+=n,n=-n),{x:t,y:a,width:i,height:n}},j.isWithin=function(e,t,a){var i=j.normalize(t);return void 0!==a&&(i.x-=a,i.y-=a,i.width+=2*a,i.height+=2*a),i.x<=e.x&&e.x<i.x+i.width&&i.y<=e.y&&e.y<i.y+i.height},j.draw=function(e,t,a,i,n,r,s,o,l,c,h){var b=n.getContext("2d"),m=j.padding,f=u.getValues(r),p=d.e().domain(u.getDomain(r,s)).range([e+m,e+a-m]),g=d.e().domain(u.getDomain(r,o)).range([t+i-m,t+m]),v=c;if(void 0===v){var x=(v=b.createImageData(a,i)).data;f.forEach((function(n){var r=p(n[s])-e,c=g(n[o])-t;if(0<=r&&r<a&&0<=c&&c<i){var d=Math.floor(c)*(4*a)+4*Math.floor(r);x[d]=Math.round(0+x[d]*(1-l)),x[d+1]=Math.round(0+x[d+1]*(1-l)),x[d+2]=Math.round(0+x[d+2]*(1-l)),x[d+3]=Math.round(255*l+x[d+3]*(1-l))}}))}var w=b.createImageData(a,i);w.data.set(v.data);var O=w.data;if(void 0!==h)h.forEach((function(n){var r=p(f[n][s])-e,c=g(f[n][o])-t;if(0<=r&&r<a&&0<=c&&c<i){var d=Math.floor(c)*(4*a)+4*Math.floor(r);O[d]=Math.round(255+O[d]*(1-l))}}));else{var y=0;f.forEach((function(n){if(u.isSelected[y]){var r=p(n[s])-e,c=g(n[o])-t;if(0<=r&&r<a&&0<=c&&c<i){var d=Math.floor(c)*(4*a)+4*Math.floor(r);O[d]=Math.round(255+O[d]*(1-l))}}y++}))}return b.putImageData(w,e,t,m,m,a-2*m,i-2*m),v},j.select=function(e,t,a,i,n,r,s,o){var l=j.padding,c=[],h=u.getValues(n),b=d.e().domain(u.getDomain(n,r)).range([e+l,e+a-l]),m=d.e().domain(u.getDomain(n,s)).range([t+i-l,t+l]),f=b.invert(Math.min(o.x,o.x+o.width)),p=b.invert(Math.max(o.x,o.x+o.width)),g=m.invert(Math.max(o.y,o.y+o.height)),v=m.invert(Math.min(o.y,o.y+o.height)),x=0;return h.forEach((function(e){u.isSelected[x]=f<=e[r]&&e[r]<p&&g<=e[s]&&e[s]<v,u.isSelected[x]&&c.push(x),x++})),c};var f=j,p=(a(138),function e(t){var a=Object(n.useRef)(),r=t.nData,s=t.opacity,o=200,c=200,h=u.getColumnNames().length,b=(h-1)*o,m=(h-1)*c;return Object(n.useEffect)((function(){var t=d.f(a.current.childNodes[1]);t.selectAll("*").remove();var i=t.append("g").selectAll("g").data(d.b(d.d(h-1),d.d(h-1))).join("g").attr("transform",(function(e){var t=Object(l.a)(e,2),a=t[0],i=t[1];return"translate(".concat(a*o,",").concat(i*c,")")})),n=d.a().extent([[2,2],[o,c]]).on("start",(function(t){if(t.sourceEvent){var a=t.sourceEvent.target.parentNode;e.brushNode!==a&&(d.f(e.brushNode).call(n.move,null),e.brushNode=a),e.selectedRows=void 0,u.deselectAll()}})).on("brush end",(function(t){if(e.selectedRows=void 0,u.deselectAll(),t.selection){var i=t.sourceEvent?t.sourceEvent.offsetX:400,n=t.sourceEvent?t.sourceEvent.offsetY:200,l=t.selection[0][0],d=t.selection[0][1],h=t.selection[1][0],b=t.selection[1][1],m=Math.floor(i/o),j=Math.floor(n/c),p=m*o,g=j*c;e.selectedRows=m===j?[]:f.select(p,g,o,c,r,m+1,j+1,{x:p+l,y:g+d,width:h-l,height:b-d})}e.draw(o,c,a,r,s)}));i.call(n),e.brush=n;var b=i.filter((function(e,t){return 9===t}));b.call(n.move,[[60,60],[100,100]]),e.brushNode=b.node()})),Object(i.jsxs)("div",{ref:a,children:[Object(i.jsx)("canvas",{width:b,height:m}),Object(i.jsx)("svg",{width:b,height:m})]})});p.bitmaps=void 0,p.selectedRows=void 0,p.brush=void 0,p.brushNode=void 0,p.clear=function(){u.deselectAll(),p.bitmaps=void 0,p.selectedRows=void 0,p.brushNode&&p.brush&&(d.f(p.brushNode).call(p.brush.move,null),p.brushNode=void 0)},p.draw=function(e,t,a,i,n){if(a){var r=a.current.firstChild,s=r.getContext("2d"),o=u.getColumnNames().length;if(s){s.clearRect(0,0,(o-1)*e,(o-1)*t),s.strokeStyle="#939ba1";for(var l=1;l<o-1;l++)s.moveTo(l*e+.5,0),s.lineTo(l*e+.5,(o-1)*t),s.moveTo(0,l*t+.5),s.lineTo((o-1)*e,l*t+.5);s.stroke();var c=!p.bitmaps;c&&(p.bitmaps=[]);for(var d=1;d<o;d++)for(var h=1;h<o;h++){var b=(d-1)*e,j=(h-1)*t;d===h?m.draw(b,j,e,t,r,i,d):c?(void 0===p.bitmaps[d-1]&&(p.bitmaps[d-1]=[]),p.bitmaps[d-1][h-1]=f.draw(b,j,e,t,r,i,d,h,n)):f.draw(b,j,e,t,r,i,d,h,n,p.bitmaps[d-1][h-1],p.selectedRows)}}}};var g=p,v=(a(139),function e(){var t=Object(n.useState)(e.getPower(12)),a=Object(l.a)(t,2),r=a[0],s=a[1],o=Object(n.useState)(.5),d=Object(l.a)(o,2),h=d[0],u=d[1];return Object(i.jsxs)("div",{className:"Column",children:[Object(i.jsxs)("div",{className:"Description",children:[Object(i.jsx)("h1",{children:"Optimized Brushing"}),Object(i.jsx)("p",{children:"Brushing is a basic technique of exploratory data analysis, developed in the 1970s and 1980s (Fishkeller, Friedman, and Tukey, 1974) (Becker and Cleveland, 1987) (Stuetzle, 1987).  Back then, analysts were happy to brush a few hundred points.  On modern hardware, we can brush many more."}),Object(i.jsx)("p",{children:"Drag the brush to select the points.  Drag the corners to resize the brush.  Drag a rectangle in any plot to create a new brush."}),Object(i.jsx)(g,{nData:r,opacity:h})]}),Object(i.jsxs)("div",{className:"GridControls",children:[Object(i.jsx)("label",{children:"Points:"}),Object(i.jsx)(c.a,{defaultValue:12,step:1,min:6,max:18,valueLabelDisplay:"auto",marks:!0,valueLabelFormat:function(t){return e.getPower(t).toExponential()},onChangeCommitted:function(t,a){g.clear(),s(e.getPower(a))}}),Object(i.jsx)("label",{children:"Transparency:"}),Object(i.jsx)(c.a,{defaultValue:.5,step:.01,min:0,max:1,valueLabelDisplay:"auto",onChangeCommitted:function(e,t){g.clear(),u(1-t)}})]}),Object(i.jsxs)("div",{className:"Description",children:[Object(i.jsx)("h2",{children:"Design Notes"}),Object(i.jsxs)("p",{children:["This implements ",Object(i.jsx)("a",{href:"http://www.sci.utah.edu/~kpotter/Library/Papers/becker:1987:BS/index.html",children:"Becker and Cleveland's scatter plot matrix"})," (Becker and Cleveland, 1987), with the following optimizations:"]}),Object(i.jsxs)("ol",{children:[Object(i.jsx)("li",{children:"Points are drawn as a single pixel."}),Object(i.jsx)("li",{children:"CANVAS is used because it performs faster than SVG."}),Object(i.jsx)("li",{children:"Deselected points are cached in bitmaps, so that drawing a plot requires only bit-blitting, then drawing the selected points."}),Object(i.jsx)("li",{children:"Iteration is done over a list of selected points, smaller than the entire data set."})]}),Object(i.jsx)("p",{children:"To minimize distraction, the matrix displays no axes, but only data ranges.  The purpose of this graph is not to show precise locations of points, but to reveal patterns, particularly two-dimensional relationships."}),Object(i.jsx)("p",{children:'Transparency mitigates overplotting (Wegman and Luo, 2002).  (This does not implement Wegman\'s "saturation brushing" (Wegman and Luo, 1997)).'}),Object(i.jsx)("p",{children:"Colors are chosen to emphasize the data.  Black on white gives maximum emphasis.  The red selection color draws attention.  The grid, being less important, is gray.  For the same reason, the brush could be gray; but blue is the default selection color in most web browsers."}),Object(i.jsx)("p",{children:"Affordances are visible.  The user can see the handles to resize the brush.  This eases the learning curve for novice users.  To minimize distraction from the data display, handles are displayed only when they can be used."}),Object(i.jsxs)("p",{children:["The brush is ",Object(i.jsx)("em",{children:"persistent"})," rather than ",Object(i.jsx)("em",{children:"transient"}),", as suggested by (Tidwell, 2006).  A persistent brush reduces errors, by enabling the user to adjust the brush.  A persistent brush also enables users to share the path of their exploration."]}),Object(i.jsx)("br",{}),Object(i.jsx)("h2",{children:"References"}),Object(i.jsxs)("ul",{children:[Object(i.jsxs)("li",{children:['Becker, R. and Cleveland, W. (1987). "Brushing Scatterplots". Technometrics. 29 (2): 127-142. ',Object(i.jsx)("a",{href:"https://doi.org/10.2307/1269768",children:"https://doi.org/10.2307/1269768"}),"."]}),Object(i.jsx)("br",{}),Object(i.jsxs)("li",{children:["Fishkeller, Friedman, and Tukey (1974). \u201cPRIM-9: An Interactive Multidimensional Data Display and Analysis System\u201d SLAC-PUB-1408. Stanford, CA: Stanford Linear Accelerator Center. ",Object(i.jsx)("a",{href:"https://www.researchgate.net/publication/245345268_An_interactive_multidimensional_data_display_and_analysis_system",children:"https://www.researchgate.net/publication/245345268_An_interactive_multidimensional_data_display_and_analysis_system"}),"."]}),Object(i.jsx)("br",{}),Object(i.jsxs)("li",{children:['Stuetzle, W. (1987). "Plot Windows". Journal of the American Statistical Association. 82 (398): 466-475. ',Object(i.jsx)("a",{href:"https://doi.org/10.2307/2289448",children:"https://doi.org/10.2307/2289448"}),"."]}),Object(i.jsx)("br",{}),Object(i.jsxs)("li",{children:["Tidwell, J. (2006). Designing Interfaces, First Edition, 182. Sebastopol CA: O'Reilly Media.",Object(i.jsx)("a",{href:"https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/",children:"https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/"}),"."]}),Object(i.jsx)("br",{}),Object(i.jsxs)("li",{children:["Wegman, E. and Luo, Q. (1997). \u201cHigh dimensional clustering using parallel coordinates and the grand tour.\u201d Computing Science and Statistics, 28, 352-360. ",Object(i.jsx)("a",{href:"https://www.researchgate.net/publication/2357383_High_Dimensional_Clustering_Using_Parallel_Coordinates_and_the_Grand_Tour",children:"https://www.researchgate.net/publication/2357383_High_Dimensional_Clustering_Using_Parallel_Coordinates_and_the_Grand_Tour"}),"."]}),Object(i.jsx)("br",{}),Object(i.jsxs)("li",{children:['Wegman, E. and Luo, Q. (2002). "On Methods of Computer Graphics for Visualizing Densities". Journal of Computational and Graphical Statistics 11, (1), 137-162. ',Object(i.jsx)("a",{href:"https://doi.org/10.1198/106186002317375659",children:"https://doi.org/10.1198/106186002317375659"}),"."]}),Object(i.jsx)("br",{})]})]}),Object(i.jsx)("a",{href:"https://github.com/hemanrobinson/brush/",children:"Code Shared on GitHub"})]})});v.getPower=function(e){return(e%3===0?1:e%3===1?2:5)*Math.pow(10,Math.floor(e/3))};var x=v;o.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(x,{})}),document.getElementById("root"))}},[[144,1,2]]]);
//# sourceMappingURL=main.4e6267ef.chunk.js.map