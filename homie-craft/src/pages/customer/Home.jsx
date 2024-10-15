import { useEffect, useState } from 'react'
import Banner from '../../components/banner/Banner'
import OrangeCard from '../../components/orangeCard/OrangeCard'
import { getCategories } from '../../repository/categoryRepository/categoryRepository';
import ItemHolder from '../../components/itemHolder/ItemHolder';
import { getAllCrafts } from '../../repository/craftRepository/craftRepository';
import axios from 'axios';
import { Container } from '@mui/material';


const Home = () => {
  //const [categories,setCategories] = useState([]);
  const [crafts,setCrafts] = useState([]);
  useEffect(()=>{
  //  getCategories().then(res=>setCategories(res))
  //  getAllCrafts().then(res=>setCrafts(res))  
  axios.get("http://localhost:5265/crafts").then(res=>setCrafts(res.data));
  },[])
  const banner={img1:'http://localhost:5265/images/2_cropped.webp',"img2":'https://biblioottawalibrary.ca/sites/default/files/art_supplies.jpg'}
  return (
    <>
    <Container class=" m-auto mt-3 rounded">
      <Banner image='http://localhost:5265/images/b1.jpg'/>
    </Container>
    <ItemHolder items ={crafts}/>
    </>
  )
}
export default Home
