import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductsContainer from "../ProductsContainer/ProductsContainer";
import { Link } from "react-router-dom";


const CardOverView = () => {
    const {data:product, isLoading, refetch} = useQuery({
        queryKey:['product'],
        queryFn: async() =>{
            const res = await axios.get('https://metro-mart-server.vercel.app/filterOption')
            return res.data
        }
    })

    if(isLoading){
        return <div>loading.......</div>
    }
    console.log(product)
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-[100px]">
                {product?.slice(0,4).map(product => (
                    <ProductsContainer product={product} key={product.id} />
                ))}
            </div>
            <div className="flex justify-center items-center my-8">
            <Link to={'/products'} className="btn btn-wide">See All</Link>
            </div>
        </div>
    );
};

export default CardOverView;