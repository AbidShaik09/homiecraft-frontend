import Banner from '../../components/banner/Banner'
import OrangeCard from '../../components/orangeCard/OrangeCard'

const Home = () => {
  let categories = [{
    id:'women-fashion',
    title: "Women's Fashion",
    description: "this is a collection of WoMen's clothes",
    image: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/04/30/12/sustainable-fashion-brands-women-indybest-0.jpg"
  }, 
  {
    id: "men-fashion",
    title: "Men's Fashion",
    description: "this is a collection of Men's clothes",
    image: "https://th.bing.com/th/id/OIP.0oxXnJ17HjSmlMkYE6I9-QHaEo?rs=1&pid=ImgDetMain"
  }, {
    id: "kid-fashion",
    title: "Kid's Fashion",
    description: "this is a collection of Men's clothes",
    image: "https://th.bing.com/th/id/OIP.0oxXnJ17HjSmlMkYE6I9-QHaEo?rs=1&pid=ImgDetMain"
  },
  {
    id: "accessories",
    title: "Accessories",
    description: "this is a collection of Men's clothes",
    image: "https://th.bing.com/th/id/OIP.0oxXnJ17HjSmlMkYE6I9-QHaEo?rs=1&pid=ImgDetMain"
  }, {
    id: "ornaments",
    title: "Ornaments",
    description: "this is a collection of Men's clothes",
    image: "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
  },
  {
    id: "water-bottles",
    title: "Water Bottles",
    description: "this is a collection of Men's clothes dshf f sdf sdf sd f sdfsd f sdf sdf dsff  fd fds fd df dsc  ",
    image: "https://th.bing.com/th/id/OIP.0oxXnJ17HjSmlMkYE6I9-QHaEo?rs=1&pid=ImgDetMain"
  }, {
    id: "gadgets",
    title: "Gadgets",
    description: "this is a collection of Men's clothes",
    image: "https://th.bing.com/th/id/OIP.0oxXnJ17HjSmlMkYE6I9-QHaEo?rs=1&pid=ImgDetMain"
  }]
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
