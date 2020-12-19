import React from 'react'

export default function square(props) {
    return (
        <div>
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        </div>
    )
}
