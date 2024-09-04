import React from 'react'
import ButtonPrimary from '../../components/button/primary/ButtonPrimary'
import ButtonSecondary from '../../components/button/secondary/ButtonSecondary'
import './CustomerProfile.css'
import CreateIcon from '@mui/icons-material/Create';
import { Navigate, useNavigate } from 'react-router-dom';
function CustomerProfile() {

  const profilePicURL = 'https://th.bing.com/th/id/OIP.0YmnhQc7kf0h3EEYRAkgjQAAAA?rs=1&pid=ImgDetMain'

  let userData = {
    name: 'user Name',
    profilePicURL: 'https://images.hitpaw.com/topics/3d/profile-photo-1.jpg',
    address: 'User Adderss' ,
    City:'User City', 
    State:'User State', 
    PinCode :'User Pincode'


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
         
          <div className='col-auto' >
            <table className='table table-responsive'>
              <tr>
                <td className='bold'>
                  Name
                </td>
                <td>
                  {userData.name}
                </td>
                <td>
                  <div className='btn'>

                    <CreateIcon fontSize="large" />

                  </div>
                </td>
              </tr>

              <tr>
                <td className='bold'>
                  Address
                </td>
                <td>
                  {userData.address}
                </td>
                <td >
                  <div className='btn'>

                    <CreateIcon fontSize="large" />

                  </div>
                </td>
              </tr>
              <tr>
                <td className='bold'>
                  city
                </td>
                <td>
                  {userData.city}
                </td>
                <td >
                  <div className='btn'>

                    <CreateIcon fontSize="large" />

                  </div>
                </td>
              </tr>
              <tr>
                <td className='bold'>
                  state
                </td>
                <td>
                  {userData.state}
                </td>
                <td >
                  <div className='btn'>

                    <CreateIcon fontSize="large" />

                  </div>
                </td>
              </tr>
              <tr>
                <td className='bold'>
                  Pincode
                </td>
                <td>
                  {userData.PinCode}
                </td>
                <td >
                  <div className='btn'>

                    <CreateIcon fontSize="large" />

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
