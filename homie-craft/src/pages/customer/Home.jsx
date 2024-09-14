import { useEffect, useState } from 'react'
import Banner from '../../components/banner/Banner'
import OrangeCard from '../../components/orangeCard/OrangeCard'
import { getCategories } from '../../repository/categoryRepository/categoryRepository';
import ItemHolder from '../../components/itemHolder/ItemHolder';
import { getAllCrafts } from '../../repository/craftRepository/craftRepository';
import axios from 'axios';


const Home = () => {
  //const [categories,setCategories] = useState([]);
  const [crafts,setCrafts] = useState([]);
  useEffect(()=>{
  //  getCategories().then(res=>setCategories(res))
  //  getAllCrafts().then(res=>setCrafts(res))  
  axios.get("http://localhost:5265/crafts").then(res=>setCrafts(res.data));
  },[])
  const banner={img1:'https://th.bing.com/th/id/OIP.6gylWG2R4Nnu-5xMBbFrzAHaE7?w=260&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',"img2":'https://biblioottawalibrary.ca/sites/default/files/art_supplies.jpg'}
  return (
    <>
    <div class=" m-auto mt-3 rounded">
      <Banner image='https://biblioottawalibrary.ca/sites/default/files/art_supplies.jpg'/>
    </div>
    <ItemHolder items ={crafts}/>
    </>
  )
}
export default Home
