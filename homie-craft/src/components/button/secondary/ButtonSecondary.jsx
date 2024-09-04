import React from 'react'

function ButtonSecondary(params) {
    return (
        <div className='btn ' onClick={params.action} style={{ padding:'5px 25px', color:'#0d1b2a',backgroundColor: '#e0e1dd', borderRadius: '3px' }}>
            {params.name}
        </div>
    )
}

export default ButtonSecondary
