import React from 'react'

const Title = ({title, data}) => {
    console.log('title comp')
    return (
        <>
            <h1>title {title}</h1>
            {data.map(val=>val)}
        </>
    )
}

export const MemoizedTitle = React.memo(Title);

