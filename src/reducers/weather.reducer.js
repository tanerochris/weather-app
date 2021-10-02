import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  FETCH_WEATHER_REFRESH,
} from '../constants/constants';

const initState = {
    isFetching: false,
    isSuccess: false,
    error: '',
    fetch_from: 1,
    weatherData: []
}
const weatherReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_WEATHER_REQUEST:
            return {...state, isFetching: true, isSuccess: false}
        case FETCH_WEATHER_SUCCESS:
            return {...state, isFetching: false, isSuccess: true, error: '',
                weatherData: action.data }
        case FETCH_WEATHER_FAILURE:
            return {...state, isFetching: false, isSuccess: false,
                error: action.error}
        case FETCH_WEATHER_REFRESH:
            return {...state, isSuccess: false, isFetching: false}
        default:
            return state
    }
}
export default weatherReducer;