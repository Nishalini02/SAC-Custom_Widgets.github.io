(function() { 
let template = document.createElement("template");
 template.innerHTML = `
 <style>
 :host {
 border-radius: 25px;
 border-width: 4px;
 border-color: black;
 border-style: solid;
 display: block;
 },
.grid{
    position:relative;
    padding:5px 0 5px 0;
    height:100%;
    width:100%;
    border-left:2px solid black;
    }
.chart-wrap{
  margin-left:50px;
  font-family:sans-serif;
  .title{
    font-weight:bold;
    font-size:1.62em;
    padding:0.5em 0 1.8em 0;
    text-align:center;
    white-space:nowrap;
  },
  .bar {
    width: var(--bar-value);
    height:50px;
    margin: 30px;    
    background-color:#F16335;
   }
 </style>
 <div class = "chart-wrap horizontal">
  <div class="grid">
<div class="bar" style="--bar-value:85%;" data-name="My Widget" title="My Widget 85%">
</div>
</div>
</div>
 ;
class Bar extends HTMLElement {
    constructor() {
      super();

      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(prepared.content.cloneNode(true));

      this._root = this._shadowRoot.getElementById("root");

      this._props = {};

      this.render();
    }

    onCustomWidgetResize(width, height) {
      this.render();
    }

    set myDataSource(dataBinding) {
      this._myDataSource = dataBinding;
      this.render();
    }


      if (!this._myDataSource || this._myDataSource.state !== "success") {
        return;
      }

      const dimension = this._myDataSource.metadata.feeds.dimensions.values[0];
      const measure = this._myDataSource.metadata.feeds.measures.values[0];
      const data = this._myDataSource.data.map((data) => {
        return {
          name: data[dimension].label,
          value: data[measure].raw,
        };
      });
   customElements.define("com-demo-barchart", Bar);
})();