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
  return (
    <>
    <div class=" m-auto mt-3 rounded">
      <Banner image="https://ei7sbsqceej.exactdn.com/wp-content/uploads/2022/07/Scrolling-Banner-for-Websites.jpg"/>
    </div>
    <ItemHolder items ={crafts}/>
    </>
  )
}
export default Home
