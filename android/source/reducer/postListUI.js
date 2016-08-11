
import { postCategory, pageSize } from '../config';
import * as types from '../constant/actiontype';

let initialState = {};

Object.keys(postCategory).map((item)=> {
	initialState[item] = {
		pageEnabled: false,
		pageIndex: 1,
		pagePending: false,
		refreshPending: false
	}
});

export default function (state = initialState, action) {

	const { payload = [], meta={}, type, error } = action;
	const { sequence = {}, category, authorId } = meta;
	const pendingStatus = sequence.type === 'start';

	switch (type) {
		case types.FETCH_POSTS_BY_CATEGORY:
			return {
				...state,
				[category]: {
					...state[category],
					refreshPending: pendingStatus,
					pageEnabled: payload.length >= pageSize,
					pageIndex: initialState[category].pageIndex
				}
			};
		case types.FETCH_POSTS_BY_CATEGORY_WITHPAGE:
			return {
				...state,
				[category]: {
					...state[category],
					pagePending: pendingStatus,
					pageEnabled: payload.length >= pageSize,
					pageIndex: (!error && !pendingStatus) ? state[category].pageIndex + 1: state[category].pageIndex
				}
			};
		default:
			return state;
	}
}