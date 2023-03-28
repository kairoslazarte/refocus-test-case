import {
    POKE_LIST_REQUEST,
    POKE_LIST_SUCCESS,
    POKE_LIST_FAIL
} from '../constants/pokeConstants'

export const pokesListReducer = (state = { pokes: [] }, action) => {
    switch(action.type) {
        case POKE_LIST_REQUEST:
            return { loading: true, pokes: [] }
        case POKE_LIST_SUCCESS:
            return {
                loading: false,
                pokes: action.payload.results
            }
        case POKE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}