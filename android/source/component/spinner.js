import React, { Component } from 'react';
import {
	ActivityIndicatorIOS,
	ProgressBarAndroid,
	Platform,
	ActivityIndicator
} from 'react-native';

import { StyleConfig } from '../style';

class Spinner extends Component {
	
	constructor(props) {
		super(props);
	}  

	render() {
		/*
		if (Platform.OS === 'android') {
			return (
				<ProgressBarAndroid 
					color={ StyleConfig.mainColor } 
					{...this.props} />
			)
		}
		return (
			<ActivityIndicatorIOS 
				animating={true} 
				color={ StyleConfig.mainColor }
				{...this.props} />
		)
		*/

		return (
			<ActivityIndicator 
				size = { 'small' }
				color={ StyleConfig.mainColor } 
				{...this.props} />
		)
	}
}

export default Spinner;


