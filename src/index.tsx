import 'arcgis-js-api/themes/light/main.css';
import './config';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { WebMapComponent } from './components/webmapview';

/**
 * React portion of application
 */
ReactDOM.render(
	<div className="main">
		<WebMapComponent />
	</div>,
	document.getElementById('app')
);
