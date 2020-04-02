(this["webpackJsonpmy-minesweeper-app"]=this["webpackJsonpmy-minesweeper-app"]||[]).push([[0],[,,,,,,,function(e,t,n){e.exports=n.p+"static/media/flag.4f2d7cfb.svg"},function(e,t,n){e.exports=n.p+"static/media/mine.364fd970.svg"},function(e,t,n){e.exports=n(18)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),s=n(6),r=n.n(s),l=n(1),o=n(2),c=n(3),u=n(4),h=(n(14),n(15),function(e){Object(u.a)(n,e);var t=Object(c.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,i=new Array(a),s=0;s<a;s++)i[s]=arguments[s];return(e=t.call.apply(t,[this].concat(i))).state={width:"",height:"",mines:""},e.onWidthInputChange=function(t){e.setState({width:Number(t.target.value)})},e.onHeightInputChange=function(t){e.setState({height:Number(t.target.value)})},e.onMinesInputChange=function(t){e.setState({mines:Number(t.target.value)})},e.onStartGameButtonClick=function(){e.props.onStartButonClick(e.state)},e}return Object(o.a)(n,[{key:"render",value:function(){return i.a.createElement("div",{className:"game-settings"},i.a.createElement("div",{className:"title"},"Settings:"),i.a.createElement("div",{className:"width-container"},i.a.createElement("div",{className:"label"},"Width:"),i.a.createElement("input",{className:"width-input",type:"number",value:this.state.width,onChange:this.onWidthInputChange})),i.a.createElement("div",{className:"height-container"},i.a.createElement("div",{className:"label"},"Height:"),i.a.createElement("input",{className:"height-input",type:"number",value:this.state.height,onChange:this.onHeightInputChange})),i.a.createElement("div",{className:"mines-container"},i.a.createElement("div",{className:"label"},"Mines:"),i.a.createElement("input",{className:"mines-input",type:"number",value:this.state.mines,onChange:this.onMinesInputChange})),i.a.createElement("button",{onClick:this.onStartGameButtonClick},"Start a new game"))}}]),n}(i.a.Component)),m=(n(16),n(17),n(7)),d=n.n(m),p=n(8),g=n.n(p),f=function(e){Object(u.a)(n,e);var t=Object(c.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,i=new Array(a),s=0;s<a;s++)i[s]=arguments[s];return(e=t.call.apply(t,[this].concat(i))).onClick=function(t){t.shiftKey?e.props.onCellToggle(e.props.item):e.props.item.isFlagged||e.props.onCellClick(e.props.item)},e}return Object(o.a)(n,[{key:"render",value:function(){var e="";this.props.item.isMine?e=i.a.createElement("img",{className:"mine-image",src:g.a,alt:"mine"}):this.props.item.isEmpty||(e=i.a.createElement("span",{className:"mines-count"},this.props.item.minesCount));var t=i.a.createElement("div",{className:"cell-data-layer"},e),n=this.props.item.isRevealed?"":i.a.createElement("div",{className:"cell-cover-layer",onClick:this.onClick}),a=this.props.item.isFlagged?i.a.createElement("div",{className:"cell-flag-layer",onClick:this.onClick},i.a.createElement("img",{className:"flag-image",src:d.a,alt:"flag"})):"";return i.a.createElement("td",{className:"cell"},t,n,a)}}]),n}(i.a.Component),v=function(e){Object(u.a)(n,e);var t=Object(c.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,i=new Array(a),s=0;s<a;s++)i[s]=arguments[s];return(e=t.call.apply(t,[this].concat(i))).state={flagsLefts:e.props.numberOfRemainingFlags,cellsArray:e.initCellsArray(),flaggedMinesCounter:0,isLost:!1,isWon:!1,isSupermanMode:!1},e.onSupermanModeCheckboxChange=function(t){e.setState({isSupermanMode:t.target.checked})},e.onCellToggle=function(t){if(!e.state.isWon&&!e.state.isLost)if(0!==e.state.flagsLefts||t.isFlagged){var n=e.state.cellsArray,a=e.state.flagsLefts,i=e.state.flaggedMinesCounter;n[t.point.y][t.point.x].isFlagged=!t.isFlagged,t.isFlagged?(a--,t.isMine&&i++):(a++,t.isMine&&i--);var s=i===e.props.numberOfMines;e.setState({cellsArray:n,flagsLefts:a,flaggedMinesCounter:i,isWon:s})}else alert("You don't have flags. /n In order to add a flag, you should first remove a flag from other cell.")},e.onCellClick=function(t){if(!e.state.isWon&&!e.state.isLost){var n=e.state.cellsArray;n[t.point.y][t.point.x].isMine?e.handleMineCellClick(n,t.point.x,t.point.y):(e.revealAdjacentEmptyCells(n,t.point.x,t.point.y),e.setState({cellsArray:n}))}},e}return Object(o.a)(n,[{key:"componentDidUpdate",value:function(e,t,n){e!==this.props&&this.setState({flagsLefts:this.props.numberOfRemainingFlags,cellsArray:this.initCellsArray(),flaggedMinesCounter:0,isLost:!1,isWon:!1,isSupermanMode:!1})}},{key:"revealAdjacentEmptyCells",value:function(e,t,n){var a=this;e[n][t].isRevealed=!0,e[n][t].isEmpty&&function(){for(var i=[{x:t,y:n}];i.length>0;){var s=i.shift();a.getCellsNeighbors(e,s.x,s.y).forEach((function(t){var n=e[t.y][t.x];n.isRevealed||n.isMine||(n.isRevealed=!0,n.isEmpty&&i.push(t))}))}}()}},{key:"getCellsNeighbors",value:function(e,t,n){var a=[];return this.isCellInBound(t+1,n)&&a.push({x:t+1,y:n}),this.isCellInBound(t+1,n-1)&&a.push({x:t+1,y:n-1}),this.isCellInBound(t+1,n+1)&&a.push({x:t+1,y:n+1}),this.isCellInBound(t,n-1)&&a.push({x:t,y:n-1}),this.isCellInBound(t,n+1)&&a.push({x:t,y:n+1}),this.isCellInBound(t-1,n)&&a.push({x:t-1,y:n}),this.isCellInBound(t-1,n-1)&&a.push({x:t-1,y:n-1}),this.isCellInBound(t-1,n+1)&&a.push({x:t-1,y:n+1}),a}},{key:"handleMineCellClick",value:function(e,t,n){e[n][t].isRevealed=!0,this.setState({cellsArray:e,isLost:!0})}},{key:"initCellsArray",value:function(){var e=this.createAnEmptyBoardArray();return this.addRandomizedMines(e),this.updateMinesCounts(e),e}},{key:"createAnEmptyBoardArray",value:function(){for(var e=[],t=0;t<this.props.height;t++){for(var n=[],a=0;a<this.props.width;a++)n.push({point:{x:a,y:t},isRevealed:!1,isFlagged:!1,isEmpty:!1,isMine:!1,minesCount:0});e.push(n)}return e}},{key:"addRandomizedMines",value:function(e){for(var t=0;t<this.props.numberOfMines;){var n=Math.floor(Math.random()*this.props.width),a=Math.floor(Math.random()*this.props.height);e[a][n].isMine||(e[a][n].isMine=!0,t++)}}},{key:"updateMinesCounts",value:function(e){for(var t=0;t<this.props.height;t++)for(var n=0;n<this.props.width;n++)e[t][n].isMine||(e[t][n].minesCount=this.calculateAdjacentMines(e,n,t),e[t][n].isEmpty=0===e[t][n].minesCount)}},{key:"calculateAdjacentMines",value:function(e,t,n){return this.isMine(e,t+1,n)+this.isMine(e,t+1,n-1)+this.isMine(e,t+1,n+1)+this.isMine(e,t,n-1)+this.isMine(e,t,n+1)+this.isMine(e,t-1,n)+this.isMine(e,t-1,n-1)+this.isMine(e,t-1,n+1)}},{key:"isMine",value:function(e,t,n){return this.isCellInBound(t,n)&&e[n][t].isMine}},{key:"isCellInBound",value:function(e,t){return e<this.props.width&&e>=0&&t<this.props.height&&t>=0}},{key:"getGameStatusLabel",value:function(){var e="";return this.state.isLost?e="You lost, let's start a new game":this.state.isWon&&(e="You won!!!"),e}},{key:"renderTableCellsTags",value:function(){var e=this;return this.state.cellsArray.map((function(t){return i.a.createElement("tr",{key:t[0].point.y},t.map((function(t){return i.a.createElement(f,{key:"".concat(t.point.x,",").concat(t.point.y),item:t,onCellClick:e.onCellClick,onCellToggle:e.onCellToggle})})))}))}},{key:"render",value:function(){var e=this.state.isSupermanMode?"board-container superman-mode":"board-container";return i.a.createElement("div",{className:"board"},i.a.createElement("div",{className:"game-status"},this.getGameStatusLabel()),i.a.createElement("div",{className:"superman-mode-checkbox-container"},i.a.createElement("input",{type:"checkbox",className:"superman-mode-checkbox",id:"superman-mode-checkbox",checked:this.state.isSupermanMode,onChange:this.onSupermanModeCheckboxChange}),i.a.createElement("label",{htmlFor:"superman-mode-checkbox"},"Superman mode")),i.a.createElement("div",{className:"remaining-flags-indicator"},"flags left: ",this.state.flagsLefts),i.a.createElement("table",{className:e,style:{minWidth:18*this.props.width}},i.a.createElement("tbody",null,this.renderTableCellsTags())))}}]),n}(i.a.Component),y=function(e){Object(u.a)(n,e);var t=Object(c.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,i=new Array(a),s=0;s<a;s++)i[s]=arguments[s];return(e=t.call.apply(t,[this].concat(i))).state={boardWidth:0,boardHeight:0,numberOfMines:0,numberOfRemainingFlags:0,shouldDisplayBoard:!1},e.onStartGameButtonClick=function(t){var n=e.getGameSettingsErrorMessage(t);n?alert(n):e.setState({boardWidth:t.width,boardHeight:t.height,numberOfMines:t.mines,numberOfRemainingFlags:t.mines,shouldDisplayBoard:!0})},e}return Object(o.a)(n,[{key:"getGameSettingsErrorMessage",value:function(e){var t=e.width*e.height,n="";return(e.width<=0||e.width>300)&&(n="Width must be between 1 and 300. Please enter a valid number \n\n"),(e.height<=0||e.height>300)&&(n+="Height must be between 1 and 300. Please enter a valid number \n\n"),e.mines>=t&&(n+="Number of mines cannot reach the number of cells. Please enter a valid number \n\n"),e.mines<=0&&(n+="Number of mines must be greater than 0. Please enter a valid number \n\n"),n}},{key:"renderBoard",value:function(){return this.state.shouldDisplayBoard?i.a.createElement(v,{width:this.state.boardWidth,height:this.state.boardHeight,numberOfMines:this.state.numberOfMines,numberOfRemainingFlags:this.state.numberOfRemainingFlags}):null}},{key:"render",value:function(){return i.a.createElement("div",{className:"my-minesweeper-app"},i.a.createElement("div",{className:"app-title"},"Minesweeper by Sivan Harel"),i.a.createElement(h,{onStartButonClick:this.onStartGameButtonClick}),this.renderBoard())}}]),n}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[9,1,2]]]);
//# sourceMappingURL=main.8334d3dd.chunk.js.map