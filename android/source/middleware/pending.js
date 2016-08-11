import * as types from '../constant/actiontype';

let sequenceList = {};
const minPendingTime = 500;

/*
*  I just use this to fix a bugs about when the request is too quickly, the RefreshControl can't update the refreshing.
*  It's a bug, but I don't know how to fix it, so use this hack way to do it.
* */

export default function ({dispatch}) {
	return next => action => {

		const { meta={}, payload } = action;
		const { sequence={}, category, pending } = meta;
		if(pending === true){
			if (sequence.type == 'start') {
				sequenceList[sequence.id] = {
					start: new Date().getTime()
				};
				return next(action);
			}

			if (sequence.type == 'next' && sequenceList[sequence.id]) {
				let start = sequenceList[sequence.id].start;
				let end = new Date().getTime();
				let leftTime = minPendingTime - (end - start);
				delete sequenceList[sequence.id];
				if (leftTime < 0) {
					return next(action);
				}
				else {
					return setTimeout(()=> {
						next(action);
					}, leftTime);
				}
			}
		}
		return next(action);
	};
}