import {
	SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
    SEARCH_CLEAR
	
} from '../constants/searchConstants';

export const searchReducer = (state = {}, action) => {
	switch (action.type) {
		case SEARCH_REQUEST:
			return { loading: true };
		case SEARCH_SUCCESS:
			return { loading: false, searchResults: action.payload };
		case SEARCH_FAIL:
			return { loading: false, error: action.payload };
		case SEARCH_CLEAR:
			return {};
		default:
			return state;
	}
};
