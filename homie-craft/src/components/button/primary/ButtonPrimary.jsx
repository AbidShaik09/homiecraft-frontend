import React from 'react'

function ButtonPrimary(params) {
  return (
    <div className='btn ' onClick={params.action} style={{ padding:'5px 25px',backgroundColor: '#ff9900', borderRadius:'3px'}}>
        {params.name}
    </div>
  )
}

export default ButtonPrimary
