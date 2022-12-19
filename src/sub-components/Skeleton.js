import React from 'react'

export default function Skeleton({ w = 0, h = 0, s = "", count = 1 }) {
    const rows = []
    for (let i = 0; i < count; i++) {
        rows.push(<div className={`skeleton w-${w} h-${h} ${s} rounded-lg`} key={Math.random()}></div>)
    }
    return (
        <>
            {rows}
        </>
    )
}
