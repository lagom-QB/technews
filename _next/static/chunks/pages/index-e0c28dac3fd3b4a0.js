(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{4746:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return w}});var s=n(9008),r=n.n(s),i=n(7160),a=n.n(i),o=n(29),l=n(7794),c=n.n(l),d=n(7294),u=n(81),h=n.n(u),p=n(2967),m=n(5893);function _(t){return Object.keys(t).reduce((function(e,n){return t[e]>t[n]?e:n}))}function f(t){return Object.keys(t).reduce((function(e,n){return t[e]<t[n]?e:n}))}function x(t){var e=this,n=10,s=p.Ys("#plot").append("svg").attr("viewBox",[0,0,1300,80]).attr("width",1100).attr("height",180);return s.selectAll("circles").append("g").data(t).enter().append("circle").attr("cx",(function(t,e){return 12*(e+1)})).attr("cy",(function(t){var e=new Date(t.data.created).toLocaleString().split(" ")[1].split(":"),n=60*e[0]+e[1];return console.log("cy",parseInt(n.slice(3))+10),parseInt(n.slice(3,n.length))+10})).attr("r",(function(t){var e=new Date(t.data.created).toLocaleString().split(" ")[1].split(":");return console.log("radius ...",parseInt(e[1])+parseInt(e[2])),parseInt(e[1])+parseInt(e[2])})).attr("fill","#7ED26D").on("mouseover",(function(t){p.Ys(e).style("opacity",.8).attr("fill","#7ED26D").attr("stroke","white").attr("stroke-width",.4),s.append("text").attr("id","tooltip").style("opacity",.8).attr("fill","black").attr("transform","translate(600,9"+2*n+")").style("font-size",30).text(t.toElement.innerHTML.split(",")[1].split("<")[0])})).on("mouseout",(function(t){p.td_("#tooltip").remove(),p.Ys(this).style("opacity",.6).attr("fill","#0C9CDF").attr("stroke","grey").attr("stroke-width",.4)})).attr("opacity",.8).attr("stroke","white").attr("stroke-width",.4).append("div").text((function(t){return console.log("times",new Date(t.data.created).toLocaleString([],{hour:"2-digit",minute:"2-digit"})),new Date(t.data.created).toLocaleString([],{hour:"2-digit",minute:"2-digit"})})),console.log("checking...",s.node()),s.node()}var j=function(){var t=(0,d.useState)(null),e=t[0],n=t[1],s=(0,d.useState)(null),r=s[0],i=s[1],a=(0,d.useState)(null),l=a[0],u=a[1],p=(0,d.useState)(!0),j=p[0],w=p[1],g=(0,d.useState)(null),b=g[0],y=g[1],v=null;return(0,d.useRef)(null),(0,d.useEffect)((function(){var t=function(){var t=(0,o.Z)(c().mark((function t(){return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:fetch("https://www.reddit.com/r/technews/hot.json?limit=100000").then((function(t){return t.json()})).then((function(t){var e=t.data.children,s="";n(e),e.forEach((function(t){s+=" "+new Date(t.data.created).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})})),u(s.slice(7).replace(/[.,?!;()"'-]/g," ").replace(/\s+/g," ").toLowerCase().split(" ").reduce((function(t,e){return t.hasOwnProperty(e)||(t[e]=0),t[e]++,t}),{})),(v=x(e))&&(console.log("plot 1...",v),y(v))})).catch((function(t){console.error("Error fetching data :\n"+t),i(t)})).finally((function(){w(!1)}));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}),[]),j?"loading...":r?"Error !"+r:(console.log("results ...",b,typeof b),(0,m.jsxs)("div",{className:h().data,children:[(0,m.jsx)("span",{className:h().title,children:"Data sample"}),(0,m.jsx)("ol",{className:h().list,children:e.slice(0,4).map((function(t,e){return(0,m.jsxs)("li",{className:h().listItem,children:[(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("a",{href:t.data.url,target:"_blank",children:t.data.title}),(0,m.jsx)("br",{}),"By "+t.data.author+" recieving "+t.data.num_comments+" comments and "+t.data.num_crossposts+" crossposts ",(0,m.jsx)("br",{}),(0,m.jsx)("a",{href:"https://www.reddit.com"+t.data.permalink,target:"_blank",children:"[Reddit Post]"}),(0,m.jsx)("br",{}),"@",new Date(t.data.created_utc).toLocaleString().split(" ")[1]]}),(0,m.jsx)("hr",{})]},e)}))}),(0,m.jsxs)("div",{className:h().plotDiv,children:[(0,m.jsx)("br",{}),(0,m.jsx)("span",{className:h().title,children:"How often do these people post at given times?"}),(0,m.jsx)("div",{className:h().plot,id:"plot",children:b}),(0,m.jsx)("hr",{}),(0,m.jsxs)("div",{className:h().text,children:["I realised ",(0,m.jsxs)("u",{children:[l[f(l)]," "]})," post was/were made at ",(0,m.jsx)("code",{className:h().conclude,children:f(l)})," ","while ",(0,m.jsxs)("u",{children:[l[_(l)]," "]})," posts was/were made at",(0,m.jsx)("code",{className:h().conclude,children:_(l)})]})]})]}))};function w(){return(0,m.jsxs)("div",{className:a().container,children:[(0,m.jsxs)(r(),{children:[(0,m.jsx)("title",{children:"Reddit Analysis"}),(0,m.jsx)("meta",{name:"description",content:"Analyzing r/technews subreddit"}),(0,m.jsx)("link",{rel:"icon",href:"/analysis.png"})]}),(0,m.jsxs)("main",{className:a().main,children:[(0,m.jsxs)("h1",{className:a().title,children:["An analysis of the"," ",(0,m.jsx)("a",{href:"http://reddit.com/r/technews",target:"_blank",children:"r/technews"})," ","data of the current month"]}),(0,m.jsxs)("p",{className:a().description,children:["The goal of this project is to explore the data and present insights drawn from the data ",(0,m.jsx)("br",{}),"This data is being pulled using the"," ",(0,m.jsx)("a",{href:"https://www.reddit.com/r/technews/hot.json",target:"_blank",children:"reddit API"}),".","\n ","The ",(0,m.jsx)("code",{className:a().code,children:"r/technews"})," subreddit contains interesting technology news."]}),(0,m.jsxs)("div",{className:a().info,children:["By ",(0,m.jsx)("p",{style:{textDecoration:"underline",display:"inline"},children:"Quinsy Brenda"})]}),(0,m.jsxs)("div",{className:a().text,children:["This data concerns the current month and year.",(0,m.jsx)("br",{}),(0,m.jsx)("a",{href:"http://reddit.com/r/technews",target:"_blank",children:"r/technews"})," ","has ",(0,m.jsx)("em",{children:"470000+"})," subscribers. It shows how often the posts are being crossposted, and what the population is talking about recently. For the recent posts, I use the previous and current day to look at frequent words.",(0,m.jsx)("br",{}),"After the cleaning, analysing and poking around in the data, I found the following columns to be interesting:",(0,m.jsxs)("ol",{children:[(0,m.jsx)("li",{children:"title"}),(0,m.jsx)("li",{children:"all_awardings"}),(0,m.jsx)("li",{children:"author"}),(0,m.jsx)("li",{children:"permalink"}),(0,m.jsx)("li",{children:"upvote_ratio"}),(0,m.jsx)("li",{children:"total_awards_recieved"}),(0,m.jsx)("li",{children:"score"}),(0,m.jsx)("li",{children:"num_comments"}),(0,m.jsx)("li",{children:"num_crossposts"})]}),"I also found it necessary to calculate the Day and Time of creation of each post because it will be important in my analysis."]}),(0,m.jsx)(j,{}),(0,m.jsx)("div",{className:a().text,children:"In the future, what would be interesting to explore?"})]})]})}},5557:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(4746)}])},81:function(t){t.exports={data:"aboutTime_data__Da9Ga",title:"aboutTime_title__b280z",list:"aboutTime_list__T95y5",listItem:"aboutTime_listItem__558Vr",plotDiv:"aboutTime_plotDiv__p2_EW",plot:"aboutTime_plot__q9pdP",text:"aboutTime_text__KBZng",conclude:"aboutTime_conclude__nrGjR"}},7160:function(t){t.exports={container:"Home_container__bCOhY",main:"Home_main__nLjiQ",title:"Home_title__T09hD",footer:"Home_footer____T7K",description:"Home_description__41Owk",text:"Home_text__upzyl",info:"Home_info__dvX16",code:"Home_code__suPER",grid:"Home_grid__GxQ85",card:"Home_card___LpL1",logo:"Home_logo__27_tb"}}},function(t){t.O(0,[806,774,888,179],(function(){return e=5557,t(t.s=e);var e}));var e=t.O();_N_E=e}]);