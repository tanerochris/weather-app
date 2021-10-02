import axios from 'axios'
import moment from 'moment'
import {
    FETCH_WEATHER_REQUEST,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE,
    WEATHER_APP_KEY,
    SEGMENTS_PER_FETCH
  } from '../constants/constants'

const reduceWeatherData = (rawWeatherData) => {
    let weatherDataBag = {} // each key will represent a date
    // loop through each element
    for ( let weather of rawWeatherData) {
        const dateTime = weather.dt_txt.split(' ')
        const dateKey = dateTime[0]
        const segmentKey = dateTime[1]
        const dateText = moment(dateKey).format('DD ddd. YYYY')
        // add new day data to record
        if (!weatherDataBag[dateKey]) {
            weatherDataBag = {
                ...weatherDataBag,
                [dateKey]: {
                    weather: weather.weather,
                    date: dateText,
                    weather_segments_temp: []
                }
            }
        } else  {
            const weatherInfo = {
                weather: weather.weather,
                date: dateText
            }
            Object.assign(weatherDataBag[dateKey], weatherInfo)
        }
        weatherDataBag[dateKey].weather_segments_temp.push({[segmentKey]: weather.main.temp})
    }
    return Object.values(weatherDataBag)
}

const fetchWeather = (numOfPages) => async (dispatch) => {
    dispatch({type: FETCH_WEATHER_REQUEST})
    try {
        const numOfSegments = numOfPages ? numOfPages * SEGMENTS_PER_FETCH : SEGMENTS_PER_FETCH
        const weather_url = `https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=${WEATHER_APP_KEY}&cnt=${numOfSegments}`
        const response = await axios.get(weather_url)

        if (response.status === 200 && response.data.cod === '200') {
            let weatherData = []
            if (response.data.list)
                weatherData = reduceWeatherData(response.data.list)
            dispatch({type: FETCH_WEATHER_SUCCESS, data: weatherData})
        } else dispatch({type: FETCH_WEATHER_FAILURE, error: 'A problem occured while connecting to server.'})
    } catch (e) {
        // console.log(e)
        dispatch({type: FETCH_WEATHER_FAILURE, error: 'A problem occured while connecting to server.'})
    }
}
export { fetchWeather }