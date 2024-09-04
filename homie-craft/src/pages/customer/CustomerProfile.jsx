import React from 'react'
import ButtonPrimary from '../../components/button/primary/ButtonPrimary'
import ButtonSecondary from '../../components/button/secondary/ButtonSecondary'
import './CustomerProfile.css'
function CustomerProfile() {

  const profilePicURL = 'https://th.bing.com/th/id/OIP.0YmnhQc7kf0h3EEYRAkgjQAAAA?rs=1&pid=ImgDetMain'

  let userData = {
    name: 'user Name',
    profilePicURL: 'https://th.bing.com/th/id/OIP.0YmnhQc7kf0h3EEYRAkgjQAAAA?rs=1&pid=ImgDetMain',
    address: 'User Adderss , City, State, PinCode etc.. '


  }

  const wishlistHandler = () => {
    console.log("Wishlist button clicked")
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
            <img className='userProfile' src={userData.profilePicURL} />
            
          </div>
          <div className=' profileButtons '> 
              <ButtonPrimary  name='Change' action={changeProfilePic} />
              <ButtonSecondary  name='Remove' action={removeProfilePic} />
            </div>

          <div className='container '>
            <table className='table table-container'>
              <tr>
                <td className='bold'>
                  Name
                </td>
                <td>
                  {userData.name}
                </td>
                <td>
                  <button>Edit</button>
                </td>
              </tr>

              <tr>
                <td className='bold'>
                  Address
                </td>
                <td>
                  {userData.address}
                </td>
                <td>
                  <button>Edit</button>
                </td>
              </tr>
            </table>

          </div>
          <div className=' profileButtons '>
              <ButtonSecondary name='Orders' action={changeProfilePic} />
              <ButtonPrimary name='Wishlist' action={removeProfilePic} />
          </div>

        </>


      }


    </div>
  )
}

export default CustomerProfile
