import {
    CHANGE_DISPLAY,
    CHANGE_UNIT,
    CELC,
    MOBILE_DISPLAY,
    TABLET_DESKTOP_DISPLAY,
    FETCH_WEATHER_NEXT,
    FETCH_WEATHER_PREV,
    PAGE_SIZE_MOBILE,
    PAGE_SIZE_TABDESK,
    SELECT_CARD
  } from '../constants/constants';
  
    const initState = {
        display: TABLET_DESKTOP_DISPLAY,
        unit: CELC,
        start_index: 0,
        curr_selected_card: null
    }
    
    const controlReducer = (state = initState, action) => {
        switch (action.type) {
            case CHANGE_DISPLAY:
                return {...state, display: action.display}
            case CHANGE_UNIT:
                return {...state, unit: action.unit}
            case FETCH_WEATHER_NEXT:
                const newStartIndex = state.display === MOBILE_DISPLAY ?
                    state.start_index + PAGE_SIZE_MOBILE : state.start_index + PAGE_SIZE_TABDESK
                return {...state, start_index: newStartIndex}
            case FETCH_WEATHER_PREV:
                let newStartPrevIndex = state.display === MOBILE_DISPLAY ?
                    state.start_index - PAGE_SIZE_MOBILE : state.start_index - PAGE_SIZE_TABDESK
                if (newStartPrevIndex < 0)
                    newStartPrevIndex = 0
                return {...state, start_index: newStartPrevIndex}
            case SELECT_CARD:
                return {...state, curr_selected_card: action.currSelectedCard}
            default:
                return state
        }
    }
    export default controlReducer;