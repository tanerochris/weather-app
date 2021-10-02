import React from 'react'
import { useDispatch } from 'react-redux';
import { calcTemp } from '../helpers/helper'
import { SELECT_CARD } from '../constants/constants';

const WeatherCard = (props) => {
    const segment_temps = props.weather_segments_temp
    const tempSum = segment_temps.reduce((a, b) => a + Object.values(b)[0], 0)
    const avgTempK = tempSum/segment_temps.length
    const temperature = calcTemp(props.unit, avgTempK)
    const dispatch = useDispatch()
    // Show weather segments on bar chart for selected card 
    const showOnBar = () => {
        dispatch({type: SELECT_CARD, currSelectedCard: props})
    }
    
    return  <div className="weather-card" onClick={() => showOnBar()}>
               <div className="title"><span>Temperature</span></div>
               <div className="temp">
                   <span>{temperature}</span>
                   <img src={`https://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`} />
               </div>
               <div className="date"><span>{props.date}</span></div>
        </div>
}
export default WeatherCard