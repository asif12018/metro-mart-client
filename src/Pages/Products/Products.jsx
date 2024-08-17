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
    const [totalCategory, setTotalCategory] = useState([]);
    const [totalBrand, setTotalBrand] = useState([]);
    
    

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

    const {data:filterName, isLoading:isFilterNameLoading, refetch:reload} = useQuery({
        queryKey:['filterName'],
        queryFn: async()=>{
            const res = await axios.get('http://localhost:5000/filterOption')
            return res.data;
        }
    })

    // console.log('the name',filterName)

    //filtering the total category name, brand name list;
    useEffect(()=>{
        const uniqueCategories = [...new Set(filterName.map(product => product.category))];
        setTotalCategory(uniqueCategories);
      //filtering the brand name
        const uniqueBrands = [...new Set(filterName.map(product => product.brand))]
        setTotalBrand(uniqueBrands);

    },[filterName])

    useEffect(()=>{
        const numberOfPages = Math.ceil(totalCount.count / 10);
        setNumberofPage(numberOfPages);
        // console.log(numberOfPages)
    },[totalCount.count])

     if(isLoading || isFilterNameLoading){
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

            <form className="flex flex-col md:flex-row gap-3">
    <div className="flex">
        <input type="text" placeholder="Search for the tool you like"
			className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
			/>
        <button type="submit" className="bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1">Search</button>
    </div>
    <select id="category" name="category"
		className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
		{/* <option value="All" selected="">All</option>
		<option value="Freemium">Freemium</option>
		<option value="Free">Free</option>
		<option value="Paid">Paid</option> */}
        {
            totalCategory.map(category => <option value={category}>{category}</option>)
        }
	</select>

    {/**  brand name select   */}
    <select id="brand" name="brand"
		className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
		{/* <option value="All" selected="">All</option>
		<option value="Freemium">Freemium</option>
		<option value="Free">Free</option>
		<option value="Paid">Paid</option> */}
        {
            totalBrand.map(brand => <option value={brand}>{brand}</option>)
        }
	</select>

    {/**  sort name select  */}

    <select id="sort" name="sort"
		className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
		
		<option value="High to Low">High to Low</option>
		<option value="High to Low">Low to High</option>
       
	</select>

</form>

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