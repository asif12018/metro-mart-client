import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Products = () => {
    const [products, setProducts] = useState([]);
    
    const {data:availableProducts, isLoading, refetch} = useQuery({
        queryKey:['availableProducts'],
        queryFn: async()=>{
            const res = await axios.get('http://localhost:5000/allProducts')
            return res.data;
        }
    })

     if(isLoading){
        return <div>Loading</div>
     }
     console.log(availableProducts);
    return (
        <div>
            <Hero></Hero>
        </div>
    );
};

export default Products;