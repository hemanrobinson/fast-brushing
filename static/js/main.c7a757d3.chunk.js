(this.webpackJsonpbrush=this.webpackJsonpbrush||[]).push([[0],{87:function(e,t,a){},89:function(e,t,a){},90:function(e,t,a){},95:function(e,t,a){"use strict";a.r(t);var i=a(1),n=a(0),s=a.n(n),r=a(15),o=a.n(r),l=(a(87),a(10)),c=a(106),d=a(3),h=function(e){};h.isSelected=[],h.deselectAll=function(){h.isSelected.fill(!1)},h.getColumnNames=function(){return["isSelected","A","B","A + B","A * B"]},h.getDomain=function(e,t){return[-2,2]},h.values=[],h.getValues=function(e){if(h.values.length!==e){var t=d.b(0,.5);h.values=[];for(var a=0;a<e;a++){var i=t(),n=t();h.values[a]=[!1,i,n,i+n,i*n]}}return h.values};var u=h,b=function(e){};b.draw=function(e,t,a,i,n,s,r){var o=n.getContext("2d"),l=u.getColumnNames();o.fillStyle="#000000",o.fontSize="14px";var c=l[r];o.fillText(c,e+a/2-o.measureText(c).width/2,t+i-i/2+4),o.fontSize="10px",c=(""+u.getDomain(s,r)[0]).slice(0,4),o.fillText(c,e+4,t+i-4),c=(""+u.getDomain(s,r)[1]).slice(0,3),o.fillText(c,e+a-3-o.measureText(c).width,t+12)};var m=b,j=function(e){};j.padding=10,j.normalize=function(e){var t=e.x,a=e.y,i=e.width,n=e.height;return i<0&&(t+=i,i=-i),n<0&&(a+=n,n=-n),{x:t,y:a,width:i,height:n}},j.isWithin=function(e,t,a){var i=j.normalize(t);return void 0!==a&&(i.x-=a,i.y-=a,i.width+=2*a,i.height+=2*a),i.x<=e.x&&e.x<i.x+i.width&&i.y<=e.y&&e.y<i.y+i.height},j.draw=function(e,t,a,i,n,s,r,o,l,c,h){var b=n.getContext("2d"),m=j.padding,p=u.getValues(s),g=d.c().domain(u.getDomain(s,r)).range([e+m,e+a-m]),f=d.c().domain(u.getDomain(s,o)).range([t+i-m,t+m]),x=c;if(void 0===x){var v=(x=b.createImageData(a,i)).data;p.forEach((function(n){var s=g(n[r])-e,c=f(n[o])-t;if(0<=s&&s<a&&0<=c&&c<i){var d=Math.floor(c)*(4*a)+4*Math.floor(s);v[d]=Math.round(0+v[d]*(1-l)),v[d+1]=Math.round(0+v[d+1]*(1-l)),v[d+2]=Math.round(0+v[d+2]*(1-l)),v[d+3]=Math.round(255*l+v[d+3]*(1-l))}}))}var w=b.createImageData(a,i);w.data.set(x.data);var O=w.data;if(void 0!==h)h.forEach((function(n){var s=g(p[n][r])-e,c=f(p[n][o])-t;if(0<=s&&s<a&&0<=c&&c<i){var d=Math.floor(c)*(4*a)+4*Math.floor(s);O[d]=Math.round(255+O[d]*(1-l))}}));else{var y=0;p.forEach((function(n){if(u.isSelected[y]){var s=g(n[r])-e,c=f(n[o])-t;if(0<=s&&s<a&&0<=c&&c<i){var d=Math.floor(c)*(4*a)+4*Math.floor(s);O[d]=Math.round(255+O[d]*(1-l))}}y++}))}return b.putImageData(w,e,t,m,m,a-2*m,i-2*m),x},j.select=function(e,t,a,i,n,s,r,o){var l=j.padding,c=[],h=u.getValues(n),b=d.c().domain(u.getDomain(n,s)).range([e+l,e+a-l]),m=d.c().domain(u.getDomain(n,r)).range([t+i-l,t+l]),p=b.invert(Math.min(o.x,o.x+o.width)),g=b.invert(Math.max(o.x,o.x+o.width)),f=m.invert(Math.max(o.y,o.y+o.height)),x=m.invert(Math.min(o.y,o.y+o.height)),v=0;return h.forEach((function(e){u.isSelected[v]=p<=e[s]&&e[s]<g&&f<=e[r]&&e[r]<x,u.isSelected[v]&&c.push(v),v++})),c};var p=j,g=(a(89),function e(t){var a=Object(n.useRef)(),s=t.nData,r=t.opacity,o=200,l=200,c=u.getColumnNames().length,h=(c-1)*o,b=(c-1)*l,m=d.a().on("start",(function(t){e.selectedRows=void 0,u.deselectAll()})).on("brush end",(function(t){if(e.selectedRows=void 0,u.deselectAll(),t.selection){var i=t.selection[0][0],n=t.selection[0][1],c=t.selection[1][0],d=t.selection[1][1],h=Math.floor(i/o),b=Math.floor(n/l),m=h*o,j=b*l;e.selectedRows=h===b?[]:p.select(m,j,o,l,s,h+1,b+1,{x:i,y:n,width:c-i,height:d-n})}e.draw(o,l,a,s,r)}));return Object(n.useEffect)((function(){e.draw(o,l,a,s,r),d.d(a.current.childNodes[1]).call(m).call(m.move,[[460,260],[500,300]])})),Object(i.jsxs)("div",{ref:a,children:[Object(i.jsx)("canvas",{width:h,height:b}),Object(i.jsx)("svg",{width:h,height:b})]})});g.bitmaps=void 0,g.selectedRows=void 0,g.clear=function(){g.bitmaps=void 0,g.selectedRows=void 0,u.deselectAll()},g.draw=function(e,t,a,i,n){if(a){var s=a.current.firstChild,r=s.getContext("2d"),o=u.getColumnNames().length;if(r){r.clearRect(0,0,(o-1)*e,(o-1)*t),r.strokeStyle="#a0a0a0";for(var l=1;l<o-1;l++)r.moveTo(l*e+.5,0),r.lineTo(l*e+.5,(o-1)*t),r.moveTo(0,l*t+.5),r.lineTo((o-1)*e,l*t+.5);r.stroke();var c=!g.bitmaps;c&&(g.bitmaps=[]);for(var d=1;d<o;d++)for(var h=1;h<o;h++){var b=(d-1)*e,j=(h-1)*t;d===h?m.draw(b,j,e,t,s,i,d):c?(void 0===g.bitmaps[d-1]&&(g.bitmaps[d-1]=[]),g.bitmaps[d-1][h-1]=p.draw(b,j,e,t,s,i,d,h,n)):p.draw(b,j,e,t,s,i,d,h,n,g.bitmaps[d-1][h-1],g.selectedRows)}}}};var f=g,x=(a(90),function e(){var t=Object(n.useState)(e.getPower(12)),a=Object(l.a)(t,2),s=a[0],r=a[1],o=Object(n.useState)(.5),d=Object(l.a)(o,2),h=d[0],u=d[1];return Object(i.jsxs)("div",{className:"Column",children:[Object(i.jsxs)("div",{className:"Description",children:[Object(i.jsx)("h1",{children:"Optimized Brushing"}),Object(i.jsx)("p",{children:"Brushing is a basic technique of exploratory data analysis, developed in the 1970s and 1980s (Fishkeller, Friedman, and Tukey, 1974) (Becker and Cleveland, 1987) (Stuetzle, 1987).  Back then, analysts were happy to brush a few hundred points.  On modern hardware, we can brush many more."}),Object(i.jsx)("p",{children:"Drag the brush to select the points.  Drag the corners to resize the brush.  Drag a rectangle in any plot to create a new brush."}),Object(i.jsx)(f,{nData:s,opacity:h})]}),Object(i.jsxs)("div",{className:"GridControls",children:[Object(i.jsx)("label",{children:"Points:"}),Object(i.jsx)(c.a,{defaultValue:12,step:1,min:6,max:18,valueLabelDisplay:"auto",marks:!0,valueLabelFormat:function(t){return e.getPower(t).toExponential()},onChangeCommitted:function(t,a){f.clear(),r(e.getPower(a))}}),Object(i.jsx)("label",{children:"Transparency:"}),Object(i.jsx)(c.a,{defaultValue:.5,step:.01,min:0,max:1,valueLabelDisplay:"auto",onChangeCommitted:function(e,t){f.clear(),u(1-t)}})]}),Object(i.jsxs)("div",{className:"Description",children:[Object(i.jsx)("h2",{children:"Design Notes"}),Object(i.jsxs)("p",{children:["This implements ",Object(i.jsx)("a",{href:"http://www.sci.utah.edu/~kpotter/Library/Papers/becker:1987:BS/index.html",children:"Becker and Cleveland's scatter plot matrix"})," (Becker and Cleveland, 1987), with the following optimizations:"]}),Object(i.jsxs)("ol",{children:[Object(i.jsx)("li",{children:"Points are drawn as a single pixel."}),Object(i.jsx)("li",{children:"CANVAS is used because it performs faster than SVG."}),Object(i.jsx)("li",{children:"Deselected points are cached in bitmaps, so that drawing a plot requires only bit-blitting, then drawing the selected points."}),Object(i.jsx)("li",{children:"Iteration is done over a list of selected points, smaller than the entire data set."})]}),Object(i.jsx)("p",{children:"To minimize distraction, the matrix displays no axes, but only data ranges.  The purpose of this graph is not to show precise locations of points, but to reveal patterns, particularly two-dimensional relationships."}),Object(i.jsx)("p",{children:'Transparency mitigates overplotting (Wegman and Luo, 2002).  (This does not implement Wegman\'s "saturation brushing" (Wegman and Luo, 1997)).'}),Object(i.jsx)("p",{children:"Colors are chosen to emphasize the data.  Black on white gives maximum emphasis.  The red selection color draws attention.  The grid, being less important, is gray.  For the same reason, the brush could be gray; but blue is the default selection color in most web browsers."}),Object(i.jsx)("p",{children:"Affordances are visible.  The user can see the handles to resize the brush.  This eases the learning curve for novice users.  To minimize distraction from the data display, handles are displayed only when they can be used."}),Object(i.jsxs)("p",{children:["The brush is ",Object(i.jsx)("em",{children:"persistent"})," rather than ",Object(i.jsx)("em",{children:"transient"}),", as suggested by (Tidwell, 2006).  A persistent brush reduces errors, by enabling the user to adjust the brush.  A persistent brush also enables users to share the path of their exploration."]}),Object(i.jsx)("br",{}),Object(i.jsx)("h2",{children:"References"}),Object(i.jsxs)("ul",{children:[Object(i.jsxs)("li",{children:['Becker, R. and Cleveland, W. (1987). "Brushing Scatterplots". Technometrics. 29 (2): 127-142. ',Object(i.jsx)("a",{href:"https://doi.org/10.2307/1269768",children:"https://doi.org/10.2307/1269768"}),"."]}),Object(i.jsx)("br",{}),Object(i.jsxs)("li",{children:["Fishkeller, Friedman, and Tukey (1974). \u201cPRIM-9: An Interactive Multidimensional Data Display and Analysis System\u201d SLAC-PUB-1408. Stanford, CA: Stanford Linear Accelerator Center. ",Object(i.jsx)("a",{href:"https://www.researchgate.net/publication/245345268_An_interactive_multidimensional_data_display_and_analysis_system",children:"https://www.researchgate.net/publication/245345268_An_interactive_multidimensional_data_display_and_analysis_system"}),"."]}),Object(i.jsx)("br",{}),Object(i.jsxs)("li",{children:['Stuetzle, W. (1987). "Plot Windows". Journal of the American Statistical Association. 82 (398): 466-475. ',Object(i.jsx)("a",{href:"https://doi.org/10.2307/2289448",children:"https://doi.org/10.2307/2289448"}),"."]}),Object(i.jsx)("br",{}),Object(i.jsxs)("li",{children:["Tidwell, J. (2006). Designing Interfaces, First Edition, 182. Sebastopol CA: O'Reilly Media.",Object(i.jsx)("a",{href:"https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/",children:"https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/"}),"."]}),Object(i.jsx)("br",{}),Object(i.jsxs)("li",{children:["Wegman, E. and Luo, Q. (1997). \u201cHigh dimensional clustering using parallel coordinates and the grand tour.\u201d Computing Science and Statistics, 28, 352-360. ",Object(i.jsx)("a",{href:"https://www.researchgate.net/publication/2357383_High_Dimensional_Clustering_Using_Parallel_Coordinates_and_the_Grand_Tour",children:"https://www.researchgate.net/publication/2357383_High_Dimensional_Clustering_Using_Parallel_Coordinates_and_the_Grand_Tour"}),"."]}),Object(i.jsx)("br",{}),Object(i.jsxs)("li",{children:['Wegman, E. and Luo, Q. (2002). "On Methods of Computer Graphics for Visualizing Densities". Journal of Computational and Graphical Statistics 11, (1), 137-162. ',Object(i.jsx)("a",{href:"https://doi.org/10.1198/106186002317375659",children:"https://doi.org/10.1198/106186002317375659"}),"."]}),Object(i.jsx)("br",{})]})]}),Object(i.jsx)("a",{href:"https://github.com/hemanrobinson/brush/",children:"Code Shared on GitHub"})]})});x.getPower=function(e){return(e%3===0?1:e%3===1?2:5)*Math.pow(10,Math.floor(e/3))};var v=x;o.a.render(Object(i.jsx)(s.a.StrictMode,{children:Object(i.jsx)(v,{})}),document.getElementById("root"))}},[[95,1,2]]]);
//# sourceMappingURL=main.c7a757d3.chunk.js.map