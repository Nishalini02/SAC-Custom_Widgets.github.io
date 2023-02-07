(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Color Properties</legend>
				<table>
					<tr>
						<td>Color</td>
						<td><input id="bps_color" type="text" size="10" maxlength="10"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
		<style>
		:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;

	class BoxBps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							color: this.color
						}
					}
			}));
		}

		set color(newColor) {
			this._shadowRoot.getElementById("bps_color").value = newColor;
		}

		get color() {
			return this._shadowRoot.getElementById("bps_color").value;
		}
		 set myDataSource(dataBinding) {
      this._myDataSource = dataBinding;
      this.render();
    }

    async render() {
      await getScriptPromisify(
        "https://cdn.staticfile.org/echarts/5.0.0/echarts.min.js"
      );

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
	}

	customElements.define("com-demo-box-bps", BoxBps);
})();
