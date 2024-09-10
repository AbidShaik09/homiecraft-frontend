import { useEffect, useState } from 'react'
import Banner from '../../components/banner/Banner'
import OrangeCard from '../../components/orangeCard/OrangeCard'
import { getCategories } from '../../repository/categoryRepository/categoryRepository';


const Home = () => {
  const [categories,setCategories] = useState([]);
  useEffect(()=>{
    getCategories().then(res=>setCategories(res))     
  },[])
  return (
    <>
    <div class=" m-auto mt-3 rounded">
      <Banner image="https://ei7sbsqceej.exactdn.com/wp-content/uploads/2022/07/Scrolling-Banner-for-Websites.jpg"/>
    </div>
    
      <div className="container   mt-5 mb-5 p-3 pr-5 rounded" style={{display:"flex",flexWrap:"wrap",gap:"25px",alignItems:"center",justifyContent:"center"}}>
      {
        categories.map((c)=>{
          return (
            <div className="rounded" style={{boxShadow: "0 0 0px 2px rgba(0, 0, 0, 0.5)"}}>
            <OrangeCard image={c.image} title={c.title} id= {c.id} />
            </div>
          )
        })
      }
      </div>
    </>
  )
}
export default Home
