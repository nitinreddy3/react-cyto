import React, { Component } from 'react';
import { ReactCytoscape, cytoscape } from '../../lib';
import { Grid, Row, Col, Button, ButtonToolbar, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import './style.css'
import { graphEdges } from './data';
import $ from 'jquery';
import qtip from 'cytoscape-qtip';



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
			// var node = evt.target;
			console.log('#cy ', $('#cy'));
			
		});
	}

	render() {

		return (
			<Grid>
				<Row>
					<Col sm="12">
						<ReactCytoscape containerID="cy"
							style = {[{
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