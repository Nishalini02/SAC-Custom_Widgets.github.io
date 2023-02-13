var getScriptPromisify = (src) => {
  return new Promise((resolve) => {
    $.getScript(src, resolve);
  });
};
(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 10px;
			border-width: 2px;
			border-color: black;
			border-style: solid;
			display: block;
		} 
		body {
		  background: #fff;
		}
		
		.metric {
		  padding: 10%;
		}
		
		.metric svg {
		  max-width: 100%;
		}
		
		.metric path {
		  stroke-width: 75;
		  stroke: #ecf0f1;
		  fill: none;
		}
		
		.metric text {
		  font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
		}
		
		.metric.participation path.data-progress {
		  stroke: #27ae60;
		}
		
		.metric.participation text {
		  fill: #27ae60;
		}		
		</style>
		
		<div class="container">
		  <div class="row">
		 <div id="root" style="width: 100%; height: 100%;">
		    <div class="col-md-4 col-sm-4">
		      <div class="metric participation" data-ratio=".95">
		        <svg viewBox="0 0 1000 500">
			        <path d="M 50 500 L950 500"></path>
					<text class='percentage' text-anchor="middle" alignment-baseline="middle" x="500" y="200" font-size="140" font-weight="bold">0%</text>
					<text class='title' text-anchor="middle" alignment-baseline="middle" x="500" y="350" font-size="90" font-weight="normal"></text>
					<text class='title' text-anchor="middle" alignment-baseline="middle" x="25" y="485" font-size="20" font-weight="normal">0</text>
					<text class='title' text-anchor="middle" alignment-baseline="middle" x="975" y="485" font-size="20" font-weight="normal">100</text>
  	            </svg>
		      </div>
		    </div>
		  </div>
		</div>
	`;

	class Box extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.$style = shadowRoot.querySelector('style');			
			this.$svg = shadowRoot.querySelector('svg');
			this._root = this._shadowRoot.getElementById("root");
			
			this._props = {};
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
		async render() {
      await getScriptPromisify(
        "https://cdn.staticfile.org/echarts/5.0.0/echarts.min.js"
      );


      const dimension = this._myDataSource.metadata.feeds.dimensions.values[0];
      const measure = this._myDataSource.metadata.feeds.measures.values[0];
      const data = this._myDataSource.data.map((data) => {
        return {
          name: data[dimension].label,
          value: data[measure].raw,
        };
      });
	
	customElements.define("com-demo-progressbar", Box);
})();
