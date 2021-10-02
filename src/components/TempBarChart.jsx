import React, { useLayoutEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import { calcTemp } from '../helpers/helper'

const TempBarChart = (props) => {
    const [style, setStyle] = useState({})
    // Format and map weather segments to barchart data format
    const barData = props.segments.map(segment => {
        const time = Object.keys(segment)[0]
        const temperature = Object.values(segment)[0]
        const timeArray = time.split(':')
        const hours = parseInt(timeArray[0])
        let amPm = 'AM'
        if (hours >= 12) {
            amPm = 'PM'
        }
        const timeString = `${timeArray[0]}:${timeArray[1]} ${amPm}`
        const temp = calcTemp(props.unit, temperature)
        return [timeString, temp]
    })

    useLayoutEffect(() => {
        // set style on barchart after it has renderd
        setStyle(state => ({...state,
            height: '300px',
            padding: '1em',
            background: 'white',
            borderRadius: '5px'
        }))
    }, [])

    return <div className="temp-bar-chart">
        <Chart 
            chartType="Bar"
            height={'300px'}
            className="bar-chart"
            data={[
                ['Time segment', 'Temperature'],
                ...barData
            ]}
            style={style}
            options={{
                // Material design options
                chart: {
                    title: 'Temperature Bar Chart',
                    subtitle: props.title,
                    chartArea: { 
                        width: '50%',
                    },
                },
                colors: ['#5D5F71'],
                legend: { position: 'none' },
              }}
            loader={<div  className="barchart-loader">Loading bar chart for {props.title}</div>}
        />
    </div>
/*     <CircularProgress className="barchart-loader" color="inherit" />
 */}
export default TempBarChart