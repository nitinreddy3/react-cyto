import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cytoscape from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import cyqtip from 'cytoscape-qtip';
import cycola from 'cytoscape-cola';
import dagre from 'cytoscape-dagre';
import popper from 'cytoscape-popper';
import tippy from 'tippy.js'

cytoscape.use( cxtmenu );
cytoscape.use(cycola);
cytoscape.use(dagre);
cytoscape.use( cyqtip);
cytoscape.use(popper);
// cytoscape(tippy);

/** React cytoscape component
 * props : style, elements, layout, cyRef,styleContainer, cytoscapeOptions
 */
class ReactCytoscape extends Component {


	getCyID() {
		return this.props.containerID || 'cy';
	}

	getContainer() {
		let c = this.container;
		// console.log("container", c);
		return c;
	}

	defaultStyle() {
		return [
			{
				selector: 'node',
				css: {
					'content': function (ele) { return ele.data('label') || ele.data('id') },
					'text-valign': 'center',
					'text-halign': 'center'
				}
			},
			{
				selector: '$node > node',
				css: {
					'padding-top': '10px',
					'padding-left': '10px',
					'padding-bottom': '10px',
					'padding-right': '10px',
					'text-valign': 'top',
					'text-halign': 'center',
					'background-color': '#bbb'
				}
			},
			{
				selector: 'edge',
				css: {
					'target-arrow-shape': 'triangle'
				}
			},
			{
				selector: ':selected',
				css: {
					'background-color': 'black',
					'line-color': 'black',
					'target-arrow-color': 'black',
					'source-arrow-color': 'black'
				}
			}
		]
	}

	style() {
		return this.props.style || this.defaultStyle();
	}

	elements() {
		return this.props.elements || {};
	}

	layout() {
		return this.props.layout || { name: 'cola' };
	}

	cytoscapeOptions() {
		return this.props.cytoscapeOptions || {};
	}

	build() {
		let opts = Object.assign({
			container: this.getContainer(),

			boxSelectionEnabled: false,
			autounselectify: true,

			style: this.style(),
			elements: this.elements(),
			layout: this.layout(),
		}, this.cytoscapeOptions());

		this.cy = cytoscape(opts);
		// this.cy = cy.qtip({
		// 		content: function () {
		// 		  return 'name: ' + this.data('synName') + ' <br /> ' + 'createdBy: ' + this.data('createdBy') + ' <br /> ' + 'externalId: ' + this.data('externalId') + ' <br /> ' + 'externalKey: ' + this.data('externalKey');
		// 		},
		// 		position: {
		// 		  my: 'top center',
		// 		  at: 'bottom center'
		// 		},
		// 		show: {
		// 		  event: 'mouseover'
		// 		},
		// 		hide: {
		// 		  event: 'mouseout'
		// 		},
		// 		style: {
		// 		  classes: 'qtip-bootstrap',
		// 		  tip: {
		// 			width: 16,
		// 			height: 8
		// 		  }
		// 		}
		// 	  });
		
		// 	  this.cy = cy.contextMenus({
		// 		menuItems: [
		// 		  {
		// 			id: 'targetUrl',
		// 			content: 'go to target',
		// 			tooltipText: 'go to target',
		// 			selector: 'node, edge',
		// 			onClickFunction: function (event) {
		// 			  var target = event.target || event.cyTarget;
		// 			  window.open(target.data('targetUrl'), '_blank');
		// 			},
		// 			hasTrailingDivider: true
		// 		  }
		// 		]
		// 	  });

		if (this.props.cyRef) {
			this.props.cyRef(this.cy);
		}
		return this.cy;
	}

	componentWillUnmount() {
		this.clean();
	}

	componentDidMount() {
		this.build();
	}

	componentDidUpdate() {
		this.clean();
		this.build();
	}

	clean() {
		if (this.cy) {
			this.cy.destroy();
		}
	}

	render() {
		let style = this.props.styleContainer || {};
		let styleContainer = Object.assign({ height: "100%", width: "100%", display: "block" }, style);
		return <div className="graph" id={this.getCyID()} ref={(elt) => { this.container = elt }} style={styleContainer}></div>;
	}

}

export default ReactCytoscape;