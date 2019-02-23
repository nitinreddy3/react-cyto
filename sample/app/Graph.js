import React, { Component } from 'react';
import { ReactCytoscape, cytoscape } from '../../lib';
import { Grid, Row, Col, Button, ButtonToolbar, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import './style.css'
import { graphEdges } from './data';
import $ from 'jquery';
import qtip from 'cytoscape-qtip';
import Tippy from 'tippy.js'


class Graph extends Component {

	getElements() {
		return {
			nodes: [],
			edges: graphEdges
		}
	}

	cyRef(cy) {
		this.cy = cy;
		// console.log('CY', cy.nodes());
		cy.on('tap', 'node', function (evt) {
			var node = evt.target;
			console.log('node ', node.id());
			node.popper({
				content: () => {
				  let div = document.createElement('div');

				  div.innerHTML = 'Popper content';

				  document.body.appendChild(div);

				  return div;
				},
				// renderedPosition: () => ({ x: 200, y: 300 }),
				popper: {}, // my popper options here,
				position: {
							  my: 'top center',
							  at: 'bottom center'
							},
							show: {
							  event: 'mouseover'
							},
							hide: {
							  event: 'mouseout'
							},
							style: {
							  classes: 'qtip-bootstrap',
							  tip: {
								width: 16,
								height: 8
							  }
							}
			  });
			let ref = node.popperRef(); // used only for positioning

			console.log('ref', ref);
			// using tippy ^4.0.0
			// let tippy = new Tippy(ref, { // tippy options:
			// 	content: () => {
			// 		let content = document.createElement('div');

			// 		content.innerHTML = 'Tippy content';

			// 		return content;
			// 	},
			// 	trigger: 'manual' // probably want manual mode
			// });

			// node.on('tap', () => tippy.show());
		});
	}

	render() {

		return (
			<Grid>
				<Row>
					<Col sm="12">
						<ReactCytoscape containerID="cy"
							style={[{
								selector: 'edge',
								css: {
									'content': 'data(synName)' || 'data(name)',
									'curve-style': 'bezier',
									'target-arrow-shape': 'triangle'
								}
							},
							{
								selector: 'node',
								css: {
									'content': 'data(synName)' || 'data(name)',
									'background-color': 'data(color)'
								}
							}]}
							elements={this.getElements()}
							cyRef={(cy) => { this.cyRef(cy) }}
							cytoscapeOptions={{ wheelSensitivity: 0.1 }}
							layout={{ name: 'grid' }} />
					</Col>
				</Row>
			</Grid>
		);
	}

}

export default Graph;