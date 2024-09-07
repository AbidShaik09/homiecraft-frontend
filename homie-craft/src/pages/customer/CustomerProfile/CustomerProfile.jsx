import React, { useState } from 'react'
import ButtonPrimary from '../../../components/button/primary/ButtonPrimary'
import ButtonSecondary from '../../../components/button/secondary/ButtonSecondary'
import './CustomerProfile.css'
import CreateIcon from '@mui/icons-material/Create';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
function CustomerProfile() {
  let [changeAddress, setChangeAddress] = useState(false)
  let [changePersonal, setChangePersonal] = useState(false)

  const profilePicURL = 'https://th.bing.com/th/id/OIP.0YmnhQc7kf0h3EEYRAkgjQAAAA?rs=1&pid=ImgDetMain'

  let userData = {
    name: 'user Name',
    mobile: '1234567890',
    profilePicURL: 'https://images.hitpaw.com/topics/3d/profile-photo-1.jpg',
    houseNumber: 'User Adderss',
    city: 'User City',
    state: 'User State',
    pinCode: 'User Pincode'

  }

  let [name, setName] = useState(userData.name)
  let [mobile, setMobile] = useState(userData.mobile)
  let [house, setHouse] = useState(userData.houseNumber)
  let [city, setCity] = useState(userData.city)
  let [state, setState] = useState(userData.state)
  let [pinCode, setPinCode] = useState(userData.pinCode)
  const navhook = useNavigate()
  const ordersHandler = () => {
    navhook('/orders')
  }
  const wishlistHandler = () => {
    console.log("Wishlist button clicked")
    navhook('/wishlist')

  }
  const personalHandler = () => {

    console.log("Edit Personal Details successful")
    setChangePersonal(false)


  }
  const addressHandler = () => {

    console.log("address change successful")
    setChangeAddress(false)

  }

  const enableChangePersonal = () => {
    setChangePersonal(true)
  }

  const enableChangeAddress = () => {
    setChangeAddress(true)
  }

  const changeProfilePic = () => {
    console.log("Change Profile Button Clicked")
  }
  const removeProfilePic = () => {
    console.log('Remove Profile Pic')
  }
  return (
    <div className='d-flex justify-content-center row'>
      <div className=' d-flex  align-items-center justify-content-center pagecontainer'>
        {

          <>
            <div className='container'>

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
              <div className='container d-flex justify-content-center align-items-center' >

                <table className='table2 '>




                  <tr className=' '>
                    <td className='bold larger grey '>
                      User Name
                    </td>
                    <td>
                      <input type="text" disabled={!changePersonal} value={name} onChange={e => setName(e.target.value)} />
                    </td>
                  </tr>
                  <tr className=' '>
                    <td className='bold larger grey '>
                      Mobile
                    </td>
                    <td>
                      <input type="text" disabled={!changePersonal} value={mobile} onChange={e => setMobile(e.target.value)} />

                    </td>

                  </tr>
                </table>

                <div className='btn justify-self-end'>
                  {!changePersonal && (
                    <CreateIcon
                      fontSize="large"
                      onClick={enableChangePersonal} // Enable editing on click
                    />
                  )}
                  {changePersonal && (
                    <SaveIcon fontSize="large"
                      onClick={personalHandler} />
                  )}
                </div>
              </div>


            </div>
            <div className='container p-3' >


              <h3 className='subheading'>Address</h3>
              <div className='container d-flex justify-content-center align-items-center' >

                <table className='table2 '>




                  <tr className=' '>
                    <td className='bold larger grey '>
                      H.No
                    </td>
                    <td>
                      <input type="text" disabled={!changeAddress} value={house} onChange={e => setHouse(e.target.value)} />
                    </td>
                  </tr>
                  <tr className=' '>
                    <td className='bold larger grey '>
                      City
                    </td>
                    <td>
                      <input type="text" disabled={!changeAddress} value={city} onChange={e => setCity(e.target.value)} />

                    </td>

                  </tr>
                  <tr className=' '>
                    <td className='bold larger grey '>
                      State
                    </td>
                    <td>
                      <input type="text" disabled={!changeAddress} value={state} onChange={e => setState(e.target.value)} />
                    </td>
                  </tr>
                  <tr className=' '>
                    <td className='bold larger grey '>
                      PinCode
                    </td>
                    <td>
                      <input type="text" disabled={!changeAddress} value={pinCode} onChange={e => setPinCode(e.target.value)} />
                    </td>
                  </tr>

                </table>

                <div className='btn justify-self-end'>
                  {!changeAddress && (
                    <CreateIcon
                      fontSize="large"
                      onClick={enableChangeAddress} // Enable editing on click
                    />
                  )}
                  {changeAddress && (
                    <SaveIcon fontSize="large"
                      onClick={addressHandler} />
                  )}
                </div>

              </div>
             
            </div>
            

          </>


        }


      </div>
      <div className=' profileButtons '>
                <ButtonSecondary name='Orders' action={ordersHandler} />
                <ButtonPrimary name='Wishlist' action={wishlistHandler} />
              </div>

    </div>

  )
}

export default CustomerProfile
