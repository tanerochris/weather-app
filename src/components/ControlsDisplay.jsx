import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Radio, FormControlLabel, RadioGroup, IconButton, Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import  { CELC, FAREN, CHANGE_UNIT, FETCH_WEATHER_NEXT, FETCH_WEATHER_PREV, FETCH_RESET_WEATHER_FETCH, FETCH_WEATHER_REFRESH } from '../constants/constants'
import { Refresh } from '@mui/icons-material';

const ControlsMobileDisplay = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const state = useSelector(state => state.weatherReducer)
    let showNextBtn = false
    let showPrevBtn = false
    const tempsLeft = state.weatherData.slice(props.startIndex + props.pageSize)
    const numTempsLeft = tempsLeft.length

    if (props.startIndex > 0)
        showPrevBtn = true
    if (numTempsLeft)
        showNextBtn = true
    if (!props.showButtons) {
        showPrevBtn = false
        showNextBtn = false
    }
    // dispatch an event when temperature unit is changed
    const changeUnit = (value) => {
        value === CELC ? dispatch({type: CHANGE_UNIT, unit: CELC}) : 
        dispatch({type: CHANGE_UNIT, unit: FAREN})
    }
    // show next set of weather cards
    const nextBtn = () => {
        if (numTempsLeft) {
            dispatch({type: FETCH_WEATHER_NEXT})
        }
    }
    // show previous set of weather cards
    const prevBtn = () => {
        if (props.startIndex > 0) {
            dispatch({type: FETCH_WEATHER_PREV})
        }
    }
    // refresh weather cards
    const refresh = () => {
        dispatch({type: FETCH_WEATHER_REFRESH})
        history.push('/')
    }
    return  <div className="mobile-control-display">
                <RadioGroup
                    aria-label="change-unit"
                    value={props.value}
                    row
                    className="unit-control"
                    onChange={() => changeUnit(document.activeElement.value)}
                    >
                        <FormControlLabel className="temp-unit" value={CELC} control={<Radio className="radio"/>} label={CELC} />
                        <FormControlLabel className="temp-unit" value={FAREN} control={<Radio className="radio"/>} label={FAREN} />
                </RadioGroup>
                <div className="button-group-mobile">
                    <IconButton disabled={!showPrevBtn} className={`prev-next ${showPrevBtn ? '' : 'is-hidden'}`}  onClick={() => prevBtn()}>
                        <ArrowBackIcon />
                    </IconButton>
                    
                    <Button className="refresh" onClick={() => refresh()}><Refresh /> Refresh</Button>
                    <IconButton disabled={!showNextBtn} className={`prev-next ${showNextBtn ? '' : 'is-hidden'}`}  onClick={() => nextBtn()}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </div>
            </div>
}

export default ControlsMobileDisplay