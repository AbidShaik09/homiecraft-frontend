import { useEffect, useState } from 'react'
import Banner from '../../components/banner/Banner'
import ItemHolder from '../../components/itemHolder/ItemHolder';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import { useHomieCraftContext } from '../../context/HomieCraftContext';


const Home = () => {
  const [isLoading,setIsLoading]= useState(true)
  
  const {token, setToken,userType,setUserType} = useHomieCraftContext();
  let myCrafterId = localStorage.getItem("crafterId");
  const [crafts,setCrafts] = useState([]);
  useEffect(()=>{
  
    axios.get("http://localhost:5265/crafts")
    .then(res => {
      let x = res.data; 
      x = x.filter(c => c.crafterId != myCrafterId);
    
      setCrafts(x); 
      setIsLoading(false); 
    })
  },[])
  const banner={img1:'http://localhost:5265/images/carousal1.png',"img2":'http://localhost:5265/images/carousal2.jpg'}
  return (
    <>

<Container className="m-auto mt-3 rounded">
  <Banner 
    image='http://localhost:5265/images/c3.jpg' 
    
  />
</Container>
    { isLoading?<Typography sx={{display:"flex", justifyContent:"center",height:"300px", alignItems:"center"}}>Loading...</Typography>:crafts.length==0?<Container sx={{display:"flex", justifyContent:"center",height:"300px", alignItems:"center"}}><Typography>No Items Available</Typography></Container>:<ItemHolder items ={crafts}/>} 
    
    </>
  )
}
export default Home
