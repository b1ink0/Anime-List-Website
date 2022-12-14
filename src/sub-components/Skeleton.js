import React from 'react'

export default function Skeleton() {
  const rows = []
  for (let i = 0; i < 10; i++){
    rows.push( <div className="skeleton w-28 h-48 ml-3 rounded-lg" key={Math.random()}></div>)
  }
  return (
    <>
    {rows}
    </>
  )
}
