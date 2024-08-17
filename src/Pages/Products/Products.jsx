import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductsContainer from "../../components/ProductsContainer/ProductsContainer";
// import './Products.css'


const Products = () => {
    const [products, setProducts] = useState([]);
    const [itemsParPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPage,setNumberofPage] = useState(0)
    const [totalCount , setTotalCount] = useState(0)

    
    

    const pages = [];
    for(let i = 0; i < numberOfPage; i++){
        pages.push(i+1);
    }

    useEffect(()=>{
        fetch('http://localhost:5000/productsCount')
        .then(res => res.json())
        .then(data => setTotalCount(data))
    },[])

   

    

    const {data:availableProducts, isLoading, refetch} = useQuery({
        queryKey:['availableProducts'],
        queryFn: async()=>{
            const res = await axios.get(`http://localhost:5000/allProducts?page=${currentPage}&size=${itemsParPage}`)
            return res.data;
        }
    })

    useEffect(()=>{
        const numberOfPages = Math.ceil(totalCount.count / 10);
        setNumberofPage(numberOfPages);
        // console.log(numberOfPages)
    },[totalCount.count])

     if(isLoading){
        return <div>Loading</div>
     }
     

     const getCurrentPage = e =>{
        setCurrentPage(parseInt(e.target.innerText))
        refetch();
    }
     
      //previous btn
      const handlebtnNext = (value) =>{
        
        
        if(value == 'previous'){
           if(currentPage > 1){
              setCurrentPage(currentPage - 1)
              refetch();
           }
        }else{
              if(currentPage < pages.length){
                  setCurrentPage(currentPage + 1)
                  refetch();
              }
              // setCurrentPage(currentPage + 1)
        }
  }
//   console.log(currentPage)

//   console.log(currentPage)
    return (
        <div>
            <Hero></Hero>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-[100px]">
            {
                availableProducts.map(product =><ProductsContainer product={product} key={product.id}></ProductsContainer>)
            }

            
            </div>
            <div className="my-6 flex border justify-center items-center gap-3 ">
            <button onClick={()=>handlebtnNext('previous')}>Previous</button>
            {
                pages.map((page,idx) => <button key={idx}
                    className={currentPage === page && 'selected btn '}
                    onClick={getCurrentPage}>{page}</button>)
            }
            <button onClick={()=>handlebtnNext('next')}>next</button>
            </div>
        </div>
    );
};

export default Products;