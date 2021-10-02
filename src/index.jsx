import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ReactDOM from 'react-dom'
import { Provider, useDispatch } from 'react-redux'
import LoadingScreen from './screens/Loading.jsx'
import WeatherScreen from './screens/Weather.jsx'
import './style/global.scss'
import store from './store'
import { 
    MAX_MOBILE_WIDTH,
    CHANGE_DISPLAY,
    MOBILE_DISPLAY,
    TABLET_DESKTOP_DISPLAY
} from './constants/constants'


const WeatherApp = () => {
    const dispatch = useDispatch()
    // get screen size to determine which view to load
    const getScreenSize = () => {
      const width = window.innerWidth
      if (width > MAX_MOBILE_WIDTH)
          return dispatch({type: CHANGE_DISPLAY, display: TABLET_DESKTOP_DISPLAY})
      else return dispatch({type: CHANGE_DISPLAY, display: MOBILE_DISPLAY})
    }
    useEffect(() => {
      getScreenSize()
      // add event handler to track screen size changes
      window.addEventListener('resize', getScreenSize)
      return () => window.removeEventListener('resize', getScreenSize)
    }, [])

    return <Router>
        <Switch>
          <Route path="/weather">
            <WeatherScreen />
          </Route>
          <Route path="/">
            <LoadingScreen />
          </Route>
        </Switch>
    </Router>
}

ReactDOM.render(
  <Provider store={store}>
    <WeatherApp />
  </Provider>, document.getElementById("root"));