import React from 'react'

const Error = (props) => {
    return <div className="error-message">
        <p>{props.message}</p>
        <h1>Try refreshing...</h1>
    </div>
}

export default Error