import React, { Component } from 'react';
import {
	View,
	ListView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as PostAction from '../action/post';
import PostRow from '../component/postRow';
import Spinner from '../component/spinner';
import { CommonStyles } from '../style';

class PostList extends Component {
	
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: dataSource.cloneWithRows(props.posts||{}),
		};

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.posts && nextProps.posts.length && nextProps.posts !== this.props.posts) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(nextProps.posts)
			});
		}
	}

	renderListFooter() {
		if (this.props.ui && this.props.ui.pagePending) {
			return (
				<View style={ CommonStyles.pageContainer }>
					<Spinner/>
				</View>
			)
		}
		return null;
	}

	onListRowPress(post){
		this.props.router.toPost({
			id: post.id,
			category: this.props.category,
			post
		});
	}

	renderListRow(post) {
		if(post && post.id){
			return (
				<PostRow 
					key={ post.id } 
					post={ post } 
					category={ this.props.category }
					onRowPress={ (e)=>this.onListRowPress(e) } />
			)
		}
		return null;
	}

	render() {
		return (
			<ListView
				ref = {(view)=> this.listView = view }
				removeClippedSubviews
				enableEmptySections = { true }
				onEndReachedThreshold={ 10 }
				initialListSize={ 10 }
				pageSize = { 10 }
				pagingEnabled={ false }
				scrollRenderAheadDistance={ 150 }
				dataSource={ this.state.dataSource }
				renderRow={ (e)=>this.renderListRow(e) }
				renderFooter={ (e)=>this.renderListFooter(e) }>
			</ListView>
		);
	}
}

export default connect((state, props) => ({
  posts : state.post[props.category],
  ui: state.postListUI[props.category]
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}))(PostList);