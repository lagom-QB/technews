(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{4403:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return C}});var r=n(9008),s=n.n(r),a=n(7160),o=n.n(a),i=n(7294),l=n(29),c=n(7794),d=n.n(c),h=n(1136),u=n.n(h),f=n(4763),p=n(5893),m=function(e,t,n){console.log("Creating first chart here...");var r=1,s=e,a=f.Ys("#plot").append("svg").attr("viewBox",[0,0,1300,80]).attr("width",1100).attr("height",180);return a.selectAll("mycircle").append("g").data(s).enter().append("circle").attr("cx",(function(e,t){return 12*(t+1)})).attr("cy",(function(e){var t=new Date(e.data.created).toLocaleString().split(" ")[1].split(":"),n=60*t[0]+t[1];return parseInt(n.slice(3,n.length))+10})).attr("stroke","white").attr("stroke-width",.4).attr("r",(function(e){var t=new Date(e.data.created).toLocaleString().split(" ")[1].split(":");return parseInt(t[1])+parseInt(t[2])})).attr("fill","red").attr("opacity",.8).on("mouseover",(function(e){f.Ys(undefined).style("opacity",.8).attr("fill","#7ED26D").attr("stroke","white").attr("stroke-width",.4),a.append("text").attr("id","tooltip").style("opacity",.8).attr("fill","black").attr("transform","translate(600,9"+2*r+")").style("font-size",30).text(e.toElement.innerHTML.split(",")[1].split("<")[0])})).on("mouseout",(function(e){f.td_("#tooltip").transition().delay(5).remove(),f.Ys(this).style("opacity",.8).attr("fill","#0C9CDF").attr("stroke","white").attr("stroke-width",.4)})).append("div").text((function(e){return new Date(e.data.created_utc).toLocaleString()})),a.node()?(n(!1),console.log("Created the First graph")):console.log("unable to create the first graph",a.node()),a.node()};function w(e){return Object.keys(e).reduce((function(t,n){return e[t]>e[n]?t:n}))}function _(e){return Object.keys(e).reduce((function(t,n){return e[t]<e[n]?t:n}))}var x=function(){var e=(0,i.useState)(null),t=e[0],n=e[1],r=(0,i.useState)(null),s=r[0],a=r[1],o=(0,i.useState)(null),c=o[0],h=o[1],f=(0,i.useState)(!0),x=f[0],j=f[1],g=(0,i.useState)(!0),y=(g[0],g[1]),v=(0,i.useRef)(null);return(0,i.useEffect)((function(){var e=function(){var e=(0,l.Z)(d().mark((function e(){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("https://www.reddit.com/r/technews/hot.json?limit=100000").then((function(e){if(e.ok)return e.json();throw e})).then((function(e){n(e.data.children);var t="";e.data.children.map((function(e,n){t+=" "+new Date(e.data.created).toLocaleTimeString()}));h(t.replace(/[.,?!;()"'-]/g," ").replace(/\s+/g," ").toLowerCase().split(" ").reduce((function(e,t){return e.hasOwnProperty(t)||(e[t]=0),e[t]++,e}),{})),console.log("times ..",c);var r=m(e.data.children,0,y);console.log("plot 1...",r),v.current&&v.current.appendChild(r)})).catch((function(e){console.error("Error fetching data :\t"+e),a(e)})).finally((function(){j(!1)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),x?"loading...":s?"Error !"+s:(0,p.jsxs)("div",{className:u().data,children:[(0,p.jsx)("span",{className:u().title,children:"Data sample"}),(0,p.jsx)("ol",{className:u().list,children:t.slice(0,2).map((function(e,t){return(0,p.jsxs)("li",{className:u().listItem,children:[(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("a",{href:e.data.url,target:"_blank",children:e.data.title}),(0,p.jsx)("br",{}),"By "+(0,p.jsx)("span",{style:{color:"blue"},children:"obj.data.author"})+" recieving "+e.data.num_comments+" comments and "+e.data.num_crossposts+" crossposts ",(0,p.jsx)("br",{}),(0,p.jsx)("a",{href:"https://www.reddit.com"+e.data.permalink,target:"_blank",children:"[Reddit Post]"}),(0,p.jsx)("br",{}),"@",new Date(e.data.created_utc).toLocaleString().split(" ")[1]]}),(0,p.jsx)("hr",{})]},t)}))}),(0,p.jsxs)("div",{className:u().plotDiv,children:[(0,p.jsx)("br",{}),(0,p.jsx)("span",{className:u().title,children:"How often do the people post at given times?"}),(0,p.jsx)(i.Suspense,{fallback:"Building chart...",children:(0,p.jsx)("div",{className:u().plot,ref:v,id:"plot"})}),(0,p.jsx)("hr",{}),(0,p.jsxs)("div",{className:u().text,children:["I realised ",(0,p.jsxs)("u",{children:[c[_(c)]," "]})," post was/were made at ",(0,p.jsx)("code",{className:u().conclude,children:_(c)})," ","while ",(0,p.jsxs)("u",{children:[c[w(c)]," "]})," posts was/were made at",(0,p.jsx)("code",{className:u().conclude,children:w(c)})]})]})]})},j=n(2640),g=n(9499),y=n(2571),v=n.n(y),b=function(e,t,n){console.log("Creating second chart here...");var r={top:40,right:3,bottom:1,left:100},s=1300-r.left-r.right,a=3e3-r.top-r.bottom,o=f.Ys("#wordsPlot").append("svg").attr("viewBox",[0,0,1300,1700]).attr("preserveAspectRatio","xMidYMid meet").attr("transform","translate(0,"+r.top+")");return function(e,t,n,r,s){f.Ly_()(Object.values(t));var a=f.BYU().domain([1,14]).range([n.left,r-n.right]),o=f.tiA().range([0,s/2]).domain(Object.keys(t)).padding(.1);e.append("g").attr("class",".plot").attr("transform","translate(-5,45)").selectAll("myRect").data(Object.entries(t)).enter().append("rect").attr("x",Math.abs(a(0)+n.left)).attr("y",(function(e){return o(e[0])})).attr("width",(function(e){return a(e[1])})).attr("ry",3).attr("fill",(function(e,t){return f.sXR("pink","darkgrey")(f.LGj()())})).attr("height",o.bandwidth()-10),function(e,t,n){e.append("g").attr("transform","translate(10,"+t/1.94+")").call(f.LLu(n)).selectAll("text").style("text-anchor","end").style("font-size",18)}(e,s,a),function(e,t,n){e.append("g").attr("transform","translate("+t.left+","+t.top+")").call(f.y4O(n)).selectAll("text").style("text-anchor","end").style("font-size",14)}(e,n,o)}(o.append("g"),e,r,s,a),function(e){e.append("text").attr("transform","translate(500,-30)").attr("x",50).attr("y",50).attr("font-size","2.6rem").attr("font-family","monospace").attr("fill","grey").text("Count of Common Words")}(o),o.node()?(n(!1),console.log("Created the Second graph")):console.log("unable to create the second graph",o.node()),o.node()},k=function(e){var t=["me","my","myself","we","our","ours","ourselves","you","you're","you've","you'll","you'd","your","yours","yourself","yourselves","he","him","his","himself","she","she's","her","hers","herself","it","it's","its","itself","they","them","their","theirs","themselves","what","which","who","whom","this","that","that'll","these","those","am","is","are","was","were","be","been","being","have","has","had","having","do","does","did","doing","an","the","and","but","if","or","because","as","until","while","of","at","by","for","with","about","against","between","into","through","during","before","after","above","below","to","from","up","down","in","out","on","off","over","under","again","further","then","once","here","there","when","where","why","how","all","any","both","each","few","more","most","other","some","such","no","nor","not","only","own","same","so","than","too","very","can","will","just","don","don't","should","should've","now","ll","re","ve","ain","aren","aren't","couldn","couldn't","didn","didn't","doesn","doesn't","hadn","hadn't","hasn","hasn't","haven","haven't","isn","isn't","ma","mightn","mightn't","mustn","mustn't","needn","needn't","shan","shan't","shouldn","shouldn't","wasn","wasn't","weren","weren't","won","won't","wouldn","wouldn't"],n={},r=e.replace(/[.]/g,"").split(/\s/).reduce((function(e,t){return Object.assign(e,(0,g.Z)({},t,e[t]?e[t]+1:1))}),{});return Object.entries(r).forEach((function(e){var r=(0,j.Z)(e,2),s=r[0],a=r[1];a>1&s.length>1&&isNaN(parseFloat(s))&&!isFinite(s)&&t.indexOf(s.toLowerCase())<=0&&(n[s]=a)})),n};function N(e){return Object.keys(e).reduce((function(t,n){return e[t]>e[n]?t:n}))}function S(e){return Object.keys(e).reduce((function(t,n){return e[t]<e[n]?t:n}))}var O=function(){var e=(0,i.useState)(null),t=(e[0],e[1]),n=(0,i.useState)(null),r=n[0],s=n[1],a=(0,i.useState)(!0),o=a[0],c=a[1],h=(0,i.useState)(!0),u=h[0],f=h[1],m=(0,i.useState)(null),w=(m[0],m[1]),_=(0,i.useState)(!0),x=_[0],j=_[1],g=(0,i.useRef)(null);return(0,i.useEffect)((function(){var e=function(){var e=(0,l.Z)(d().mark((function e(){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("https://www.reddit.com/r/technews/hot.json?limit=100000").then((function(e){if(e.ok)return e.json();throw e})).then((function(e){t(e.data.children);var n="";e.data.children.map((function(e,t){n+=" "+e.data.title}));w(n);var r=k(n),s=b(r,0,j);if(f(r),console.log("plot 2...",s),g.current){if(x)return"building Chart...";g.current.appendChild(s)}})).catch((function(e){console.error("Error :\t"+e),s(e)})).finally((function(){c(!1)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),o?"\nloading...":r?"Error !"+r:(0,p.jsx)("div",{className:v().data,children:(0,p.jsxs)("div",{className:v().wordsPlotDiv,children:[(0,p.jsx)("br",{}),(0,p.jsx)("span",{className:v().title,children:"How often do the words from the posts occur?"}),(0,p.jsx)("div",{className:v().wordsPlot,ref:g,id:"wordsPlot",children:(0,p.jsx)("div",{className:v().wordsGraph,id:"wordsGraph"})}),(0,p.jsx)("hr",{}),(0,p.jsxs)("div",{className:v().text,children:["I realised the most common word is"," ",(0,p.jsx)("code",{className:v().conclude,children:N(u)})," ","used"," ",(0,p.jsx)("code",{className:v().conclude,children:u[N(u)]})," ","times while the least used word was",(0,p.jsx)("code",{className:v().conclude,children:S(u)})," ","used"," ",(0,p.jsx)("code",{className:v().conclude,children:u[S(u)]})," ","times."]})]})})};function C(){return(0,p.jsxs)("div",{className:o().container,children:[(0,p.jsxs)(s(),{children:[(0,p.jsx)("title",{children:"Reddit Analysis"}),(0,p.jsx)("meta",{name:"description",content:"Analyzing r/technews subreddit"}),(0,p.jsx)("link",{rel:"icon",href:"/analysis.png"})]}),(0,p.jsxs)("main",{className:o().main,children:[(0,p.jsxs)("h1",{className:o().title,children:["An analysis of the"," ",(0,p.jsx)("a",{href:"http://reddit.com/r/technews",target:"_blank",children:"r/technews"})," ","data of the current month"]}),(0,p.jsxs)("p",{className:o().description,children:["The goal of this project is to explore the data and present insights drawn from the data ",(0,p.jsx)("br",{}),"This data is being pulled using the"," ",(0,p.jsx)("a",{href:"https://www.reddit.com/r/technews/hot.json",target:"_blank",children:"reddit API"}),".","\n ","The ",(0,p.jsx)("code",{className:o().code,children:"r/technews"})," subreddit contains interesting technology news."]}),(0,p.jsxs)("div",{className:o().info,children:["By ",(0,p.jsx)("p",{style:{textDecoration:"underline",display:"inline"},children:"Quinsy Brenda"})]}),(0,p.jsxs)("div",{className:o().text,children:["This data concerns the current month and year.",(0,p.jsx)("br",{}),(0,p.jsx)("a",{href:"http://reddit.com/r/technews",target:"_blank",children:"r/technews"})," ","has ",(0,p.jsx)("em",{children:"470000+"})," subscribers. It shows how often the posts are being crossposted, and what the population is talking about recently. For the recent posts, I use the previous and current day to look at frequent words.",(0,p.jsx)("br",{}),"After the cleaning, analysing and poking around in the data, I found the following columns to be interesting:",(0,p.jsxs)("ol",{children:[(0,p.jsx)("li",{children:"title"}),(0,p.jsx)("li",{children:"all_awardings"}),(0,p.jsx)("li",{children:"author"}),(0,p.jsx)("li",{children:"permalink"}),(0,p.jsx)("li",{children:"upvote_ratio"}),(0,p.jsx)("li",{children:"total_awards_recieved"}),(0,p.jsx)("li",{children:"score"}),(0,p.jsx)("li",{children:"num_comments"}),(0,p.jsx)("li",{children:"num_crossposts"})]}),"I also found it necessary to calculate the Day and Time of creation of each post because it will be important in my analysis."]}),(0,p.jsxs)(i.Suspense,{fallback:"Loading Graphs ...",children:[(0,p.jsx)(x,{}),(0,p.jsx)(O,{})]}),(0,p.jsx)("div",{className:o().text,children:"In the future, what would be interesting to explore?"})]})]})}},5557:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(4403)}])},1136:function(e){e.exports={data:"fetcher_data__KqTMW",title:"fetcher_title__mCSm1",list:"fetcher_list__BeyPO",listItem:"fetcher_listItem__6zxUj",plotDiv:"fetcher_plotDiv__aErjS",plot:"fetcher_plot___WIbq",text:"fetcher_text__g3SaB",conclude:"fetcher_conclude__7ysMe"}},2571:function(e){e.exports={data:"fetcher1_data__l53j_",title:"fetcher1_title__FVGHh",list:"fetcher1_list__27NEn",listItem:"fetcher1_listItem__tlXLy",wordsPlot:"fetcher1_wordsPlot__bn7fg",text:"fetcher1_text__9XfkP",conclude:"fetcher1_conclude__4W4Os"}},7160:function(e){e.exports={container:"Home_container__bCOhY",main:"Home_main__nLjiQ",title:"Home_title__T09hD",footer:"Home_footer____T7K",description:"Home_description__41Owk",text:"Home_text__upzyl",info:"Home_info__dvX16",code:"Home_code__suPER",grid:"Home_grid__GxQ85",card:"Home_card___LpL1",logo:"Home_logo__27_tb"}}},function(e){e.O(0,[552,774,888,179],(function(){return t=5557,e(e.s=t);var t}));var t=e.O();_N_E=t}]);