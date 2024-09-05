import OrangeCard from '../../components/orangeCard/OrangeCard'

const Home = () => {
  let categories = [{
    title: "Women's Fashion",
    description: "this is a collection of WoMen's clothes",
    image: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/04/30/12/sustainable-fashion-brands-women-indybest-0.jpg"
  }, 
  {
    title: "Men's Fashion",
    description: "this is a collection of Men's clothes",
    image: "https://th.bing.com/th/id/OIP.0oxXnJ17HjSmlMkYE6I9-QHaEo?rs=1&pid=ImgDetMain"
  }, {
    title: "Men's Fashion",
    description: "this is a collection of Men's clothes",
    image: "https://th.bing.com/th/id/OIP.0oxXnJ17HjSmlMkYE6I9-QHaEo?rs=1&pid=ImgDetMain"
  },
  {
    title: "Men's Fashion",
    description: "this is a collection of Men's clothes",
    image: "https://th.bing.com/th/id/OIP.0oxXnJ17HjSmlMkYE6I9-QHaEo?rs=1&pid=ImgDetMain"
  }, {
    title: "Men's Fashion",
    description: "this is a collection of Men's clothes",
    image: "https://th.bing.com/th/id/OIP.0oxXnJ17HjSmlMkYE6I9-QHaEo?rs=1&pid=ImgDetMain"
  },
  {
    title: "Men's Fashion",
    description: "this is a collection of Men's clothes",
    image: "https://th.bing.com/th/id/OIP.0oxXnJ17HjSmlMkYE6I9-QHaEo?rs=1&pid=ImgDetMain"
  }, {
    title: "Men's Fashion",
    description: "this is a collection of Men's clothes",
    image: "https://th.bing.com/th/id/OIP.0oxXnJ17HjSmlMkYE6I9-QHaEo?rs=1&pid=ImgDetMain"
  }]
  return (
    <>
    <div class="mt-2" style={{width:"full", backgroundColor:"chocolate",height:"50vh"}}>Banner</div>
    
      <div className="container  mt-5 mb-5 p-3 pr-5 rounded" style={{display:"flex",flexWrap:"wrap",gap:"25px",alignItems:"center",justifyContent:"center"}}>
      {
        categories.map((c)=>{
          return (
            <div class="rounded " style={{boxShadow: "0 0 10px 2px rgba(0, 0, 0, 0.5)"}}>
            <OrangeCard image={c.image} title={c.title} description={c.description}/>
            </div>
          )
        })
      }
      </div>
    </>
  )
}
export default Home
