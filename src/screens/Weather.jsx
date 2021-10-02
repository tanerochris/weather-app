import React from 'react'
import { connect } from 'react-redux'
import { Container, Grid } from '@mui/material'
import ControlsDisplay from '../components/ControlsDisplay.jsx'
import {
    MOBILE_DISPLAY,
    PAGE_SIZE_MOBILE,
    PAGE_SIZE_TABDESK
} from '../constants/constants'
import WeatherCard from '../components/WeatherCard.jsx'
import TempBarChart from '../components/TempBarChart.jsx'
import Error from '../components/Error.jsx'

const Weather = (props) => {
    let isMobile = false
    let pageSize = 0
    let displayedTemps = []
    let currSelectedCard = {}
    const { weatherData, error: errorMessage } = props.weatherInfo
    const { start_index: startIndex, unit, curr_selected_card} = props.controls
    
    // select page size based on screen size
    if (props.controls.display === MOBILE_DISPLAY) {
        isMobile = true
        pageSize = PAGE_SIZE_MOBILE
    } else {
        pageSize = PAGE_SIZE_TABDESK
    }

    if (weatherData.length) {
        // Cards to display per page
        displayedTemps = weatherData.slice(startIndex, startIndex + pageSize)
    }
    // Select card to display info on bar chart
    if (displayedTemps.length)
        currSelectedCard = curr_selected_card || displayedTemps[0]

    return  <Container>
                <Grid container
                 justifyContent="center"
                 alignItems="center"
                 spacing={2}>
                    <Grid item sm={3} md={3} className={isMobile ? 'is-hidden': ''}>
                    </Grid>
                    <Grid className="main-container" item sm={6} md={6}>
                        <div className="controls">
                            <ControlsDisplay 
                                value={unit}
                                startIndex={startIndex}
                                numWeatherSegs={weatherData.length}
                                numDispTemps={displayedTemps.length}
                                pageSize={pageSize}
                                showButtons={errorMessage ? false : true}
                            />              
                        </div>
                        { errorMessage && <Error message={errorMessage} />}
                        <div className="weather-display">
                            {
                               !errorMessage && displayedTemps.map( (el, idx) => <WeatherCard key={idx} unit={unit} {...el} />) 
                            }
                        </div>
                        <div className="temp-segment-chart">
                            {    !errorMessage && displayedTemps.length ?
                                <TempBarChart title={currSelectedCard.date} unit={unit} segments={currSelectedCard.weather_segments_temp} /> 
                                : null
                            }
                        </div>
                    </Grid>
                    <Grid item sm={3} md={3} className={isMobile ? 'is-hidden': ''}>
                    </Grid>
                </Grid>
            </Container>
}

const mapStateToProps = (state) => ({weatherInfo: state.weatherReducer, controls: state.controlReducer})

export default connect(mapStateToProps, null)(Weather);