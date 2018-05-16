import WebMap = require('esri/WebMap');
// import MapView = require('esri/views/SceneView');
import MapView = require('esri/views/MapView');
import FeatureLayer = require('esri/layers/FeatureLayer');
import Layer = require('esri/layers/Layer');
import WebMap = require('esri/WebMap');
import Map = require('esri/Map');
import Extent = require('esri/geometry/Extent');
import SketchViewModel = require('esri/widgets/Sketch/SketchViewModel');
import Graphic = require('esri/Graphic');
import * as React from 'react';

interface ComponentProps {}

export class WebMapComponent extends React.Component<ComponentProps, {}> {
	mapDiv: any;
	sketchViewModel: any;
	layer: any;

	componentDidMount() {
		let map = new Map({
			basemap: 'streets'
		});

		let initialExtent = new Extent({
			xmin: -13045631,
			xmax: -13042853,
			ymin: 4034880,
			ymax: 4034881,
			spatialReference: 102100
		});

		let view = new MapView({
			map: map,
			container: this.mapDiv,
			extent: initialExtent
		});

		Layer.fromPortalItem({
			portalItem: {
				// autocasts as new PortalItem()
				id: '511b97fc0d364367b127f8ba5c89ad13'
			}
		}).then(layer => {
			this.layer = layer;
			map.add(layer);
		});

		// Set up sketch tool
		this.sketchViewModel = new SketchViewModel({
			view: view
		});

		this.sketchViewModel.on('draw-complete', this.addGraphic.bind(this));
	}

	render() {
		return (
			<div>
				<div>
					<button onClick={this.addPoint.bind(this)}>Add Point</button>
				</div>
				<div
					className="webmap"
					ref={element => (this.mapDiv = element)}
					style={{ height: '600px' }}
				/>
			</div>
		);
	}

	addPoint() {
		this.sketchViewModel.create('point');
	}

	addGraphic(evt) {
		let graphic = new Graphic({
			geometry: evt.geometry,
			attributes: {}
		});
		this.layer
			.applyEdits({
				addFeatures: [graphic]
			})
			.then(results => {
				console.log('apply edits done');
				console.log(results);
			});
	}
}
