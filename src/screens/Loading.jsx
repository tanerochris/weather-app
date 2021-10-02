import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { connect, useSelector } from 'react-redux'
import { fetchWeather } from '../actions/fetchWeather'
  
const Loading = (props) => {
    const history = useHistory()
    const state = useSelector((state) => state)

    useEffect(() => {
        let timeout = null

        if (!props.weatherInfo.isFetching && !props.weatherInfo.isSuccess)
            props.fetchWeather()
        if (props.weatherInfo.isSuccess) {
            timeout = setTimeout(() => history.push('/weather'), 1000)
        }
        if (props.weatherInfo.error)
            history.push('/weather')
            
        return () => {
            clearTimeout(timeout)
        }
    }, [state])

    return <div className="loader-container">
            <div className="loader">
                <CircularProgress size="8em" color="inherit" />
            </div>
        </div>
}

const mapStateToProps = (state) => ({weatherInfo: state.weatherReducer })

export default connect(mapStateToProps, { fetchWeather })(Loading);