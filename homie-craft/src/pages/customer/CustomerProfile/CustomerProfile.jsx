import React from 'react'
import ButtonPrimary from '../../../components/button/primary/ButtonPrimary'
import ButtonSecondary from '../../../components/button/secondary/ButtonSecondary'
import './CustomerProfile.css'
import CreateIcon from '@mui/icons-material/Create';
import { Navigate, useNavigate } from 'react-router-dom';
function CustomerProfile() {

  const profilePicURL = 'https://th.bing.com/th/id/OIP.0YmnhQc7kf0h3EEYRAkgjQAAAA?rs=1&pid=ImgDetMain'

  let userData = {
    name: 'user Name',
    contact:'1234567890',
    profilePicURL: 'https://images.hitpaw.com/topics/3d/profile-photo-1.jpg',
    houseNumber: 'User Adderss' ,
    city:'User City', 
    state:'User State', 
    pinCode :'User Pincode'


  }
  const navhook = useNavigate()
  const ordersHandler = () => {
    navhook('/orders')
  }
  const wishlistHandler = () => {
    console.log("Wishlist button clicked")
    navhook('/wishlist')

  }
  const editAddress = () => {
    console.log("Edit Address Button Clicked")

  }
  const changeProfilePic = () => {
    console.log("Change Profile Button Clicked")
  }
  const removeProfilePic = () => {
    console.log('Remove Profile Pic')
  }
  return (

    <div>
      {

        <>
          <h3 className='heading'>Profile</h3>
          <div className="container profilePicArea">
            <div className='circleWrapper'>
              <img className='userProfile' src={userData.profilePicURL} />

            </div>

          </div>
          <div className=' profileButtons '>
            <ButtonPrimary name='Change' action={changeProfilePic} />
            <ButtonSecondary name='Remove' action={removeProfilePic} />
          </div>
         
          <div className='' >
            <table className='table '>
            <tr className='d-flex justify-content-between '>
                <td className='bold larger grey'>
                  Name
                </td>
                <td >
                  <div className='align-self-start'>
                  {userData.name}
                  </div>
                </td>
                <td className='align-self-end'> 
                  <div className='btn'>

                    <CreateIcon fontSize="large" />

                  </div>
                </td>
              </tr>
              <tr className='d-flex justify-content-between '>
                <td className='bold larger grey'>
                Mobile
                </td>
                <td>
                {userData.contact}
                </td>
                <td>
                  <div className='btn'>

                    <CreateIcon fontSize="large" />

                  </div>
                </td>
              </tr>

              <tr className='d-flex justify-content-between align-items-center '>
                
                <td className='bold larger grey '>
                  Address
                </td>
                <td >
                <table className='table margin'>
                <tr >
                    <td className='lessbold  grey'>
                      H.No
                    </td>
                    <td>
                      {userData.houseNumber}
                    </td>
                </tr>
                <tr >
                    <td className='lessbold grey'>
                      City
                    </td>
                    <td>
                      {userData.city}
                    </td>
                </tr>
                <tr>
                    <td className='lessbold  grey'>
                      State
                    </td>
                    <td>
                      {userData.state}
                    </td>
                </tr>
                <tr >
                    <td className='lessbold  grey'>
                      PinCode
                    </td>
                    <td>
                      {userData.pinCode}
                    </td>
                </tr>
                </table>
                </td>
                <td className=' '>
                  <div className='btn  '>
                    
                    <CreateIcon fontSize="large" className='' />

                  </div>
                </td>
              </tr>
            </table>

          </div>
        
          
          <div className=' profileButtons '>
            <ButtonSecondary name='Orders' action={ordersHandler} />
            <ButtonPrimary name='Wishlist' action={wishlistHandler} />
          </div>

        </>


      }


    </div>
  )
}

export default CustomerProfile
