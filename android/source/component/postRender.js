import React, { Component } from 'react';
import {
	View,
	Image,
	Text,
	Dimensions,
	ScrollView,
	TouchableOpacity
} from 'react-native';

import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { CommonStyles, PostDetailStyles, StyleConfig } from '../style';
import { getImageSource } from '../common';
import Navbar from './navbar';

class PostRender extends Component {

	constructor(props) {
		super(props);

		this.state = {
			cover: null
		};

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount(){
		let cover = getImageSource();
		this.setState({
			cover: cover
		});
	}

	componentWillUnmount(){
		this.setState({
			cover: null
		});
	}
	
	renderParallaxScrollComponent(){
		return (
			<ScrollView 
        		showsVerticalScrollIndicator = {false}
				showsHorizontalScrollIndicator = {false}>
        	</ScrollView>
		)
	}

	renderParallaxBackground(postInfo){
		return (
			<View style={ CommonStyles.headerBackground } key="parallax-background">
	            <Animatable.Image 
	            	resizeMode="cover"
		            style={ CommonStyles.headerBackgroundImage } 
		            source={{uri: this.state.cover }}
	            	ref={(view)=>{this.parallaxBackground = view}} >
	            </Animatable.Image>		
	            <View style={ CommonStyles.headerBackgroundMask }/>
	        </View>
		)
	}

	renderParallaxForeground(postInfo){
		
		let postTitle = _.truncate(postInfo.title, { length : 50 });

		return (
			<Animatable.View 
				key="parallax-foreground"
				ref={(view)=>{ this.parallaxForeground = view}}
				style={ PostDetailStyles.headerContainer } > 
	            <Text style={ PostDetailStyles.headerTitleText }>
	              { postTitle }
	            </Text>

	            <View style={ PostDetailStyles.headerMetaContainer }>
		            <View style={ PostDetailStyles.headerMetaInfo }>
		            	<Image style={ PostDetailStyles.metaAuthorAvatar } 
		            		source={{ uri: postInfo.authorAvatar }}/>
			            <Text style={ PostDetailStyles.metaAuthorName }>
			              { postInfo.authorName }
			            </Text>
		            </View>
		            <Text style={ PostDetailStyles.metaRight }>
		              { postInfo.published }
		            </Text>
	            </View>
            </Animatable.View> 
		)
	}

	renderParallaxStickyHeader(postInfo){
		return (
			<Navbar 
				backgroundImage = { {uri: this.state.cover} }
				leftIconName = { postInfo.authorAvatar }
				title={ postInfo.authorName }/>
		);
	}

	render() {

		let { post } = this.props;

		return (
			<ParallaxScrollView
		        headerBackgroundColor="#111"
		        ref={(view)=>{this.parallaxView = view}}
		        stickyHeaderHeight={ StyleConfig.navbarHeight }
		        parallaxHeaderHeight={ StyleConfig.parallaxHeaderHeight }
		        renderScrollComponent={()=> this.renderParallaxScrollComponent()}
		        renderBackground={() => this.renderParallaxBackground(post)}
		        renderForeground={() => this.renderParallaxForeground(post)}
		        renderStickyHeader={() => this.renderParallaxStickyHeader(post)}>
		        
		        { this.props.children }

			</ParallaxScrollView>
		);
	}
}

export default PostRender;