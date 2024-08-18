import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductsContainer from "../../components/ProductsContainer/ProductsContainer";
import { Audio, Hourglass } from 'react-loader-spinner';
import { Helmet } from 'react-helmet-async';
const Products = () => {
    const [products, setProducts] = useState([]);
    const [itemsParPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPage, setNumberofPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [totalCategory, setTotalCategory] = useState([]);
    const [totalBrand, setTotalBrand] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [brandName, setBrandName] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [sortPrice, setSortPrice] = useState('');
    const [sortDate, setSortDate] = useState('');

    const pages = [];
    for(let i = 0; i < numberOfPage; i++) {
        pages.push(i + 1);
    }

    useEffect(() => {
        fetch('https://metro-mart-server.vercel.app/productsCount')
        .then(res => res.json())
        .then(data => setTotalCount(data));
    }, []);

    const { data: filterName, isLoading: isFilterNameLoading, refetch: reload } = useQuery({
        queryKey: ['filterName'],
        queryFn: async () => {
            const res = await axios.get('https://metro-mart-server.vercel.app/filterOption');
            return res.data;
        }
    });

    // console.log(filterName)

   

    const { data: availableProducts, isLoading, refetch } = useQuery({
        queryKey: ['availableProducts', currentPage, itemsParPage, brandName, searchName, priceRange, sortPrice, categoryName, sortDate],
        queryFn: async () => {
            // const res = await axios.get(`https://metro-mart-server.vercel.app/allProducts?page=${currentPage}&size=${itemsParPage}&brand=${brandName}&search=${searchName}&priceRange=${priceRange}&sortPrice=${sortPrice}&category=${categoryName}`);
            const res = await axios.get(`https://metro-mart-server.vercel.app/allProducts?page=${currentPage}&size=${itemsParPage}&brandName=${brandName}&searchName=${searchName}&priceRange=${priceRange}&sortPrice=${sortPrice}&categoryName=${categoryName}&sortDate=${sortDate}`);
            return res.data;
        }
    });

     //resetting total count based on the filter
    //  useEffect(()=>{
    //     if((!isLoading && (totalBrand.length > 0 || searchName.length > 0 || brandName.length > 0 || priceRange.length > 0 || categoryName.length > 0 || sortPrice.length > 0 ))){
    //         setTotalCount(availableProducts?.length)
    //     }
    //  },[totalBrand, searchName, brandName, priceRange, categoryName, sortPrice, availableProducts?.length, isLoading])
    // useEffect(() => {
    //     if (!isLoading) {
    //         const hasFilter = searchName || brandName || priceRange || categoryName || sortPrice;
    //         if (hasFilter) {
    //             setTotalCount(availableProducts?.length);
    //         } else {
    //             // Fetch the total count of all products when there are no filters
    //             fetch('https://metro-mart-server.vercel.app/productsCount')
    //             .then(res => res.json())
    //             .then(data => setTotalCount(data));
    //         }
    //     }
    // }, [searchName, brandName, priceRange, categoryName, sortPrice, availableProducts?.length, isLoading]);

    // Handle filtering form submission
    // const handleFilter = e => {
    //     e.preventDefault();
    //     setSearchName(e.target[0].value);
    //     setCategoryName(e.target.category.value);
    //     setBrandName(e.target.brand.value);
    //     setPriceRange(e.target.range.value);
    //     setSortPrice(e.target.sort.value);
    //     refetch();
        
    // }

    //search box function
    const handleSearch = e =>{
        e.preventDefault();
        setSearchName(e.target[0].value)
        refetch();
    }

 
    // console.log(categoryName)
   

    // Populate categories and brands for filtering options
    useEffect(() => {
        const uniqueCategories = [...new Set(filterName?.map(product => product.category))];
        setTotalCategory(uniqueCategories);

        const uniqueBrands = [...new Set(filterName?.map(product => product.brand))];
        setTotalBrand(uniqueBrands);
    }, [filterName]);

    useEffect(() => {
        const numberOfPages = Math.ceil(totalCount.count / 10);
        setNumberofPage(numberOfPages);
    }, [totalCount.count]);

    if (isLoading || isFilterNameLoading) {
        return <div className="h-screen w-screen flex justify-center items-center">
            <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
        />
        </div>;
    }

  

    const getCurrentPage = e => {
        setCurrentPage(parseInt(e.target.innerText));
        refetch();
    }

    // Handle next/previous pagination
    const handlebtnNext = (value) => {
        if (value === 'previous') {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                refetch();
            }
        } else {
            if (currentPage < pages.length) {
                setCurrentPage(currentPage + 1);
                refetch();
            }
        }
    }

    return (
        <div>
            <Helmet>
                <title>Products</title>
            </Helmet>
            <Hero />


            <div className="flex flex-col md:flex-row gap-3">
                  

            <form onSubmit={handleSearch} >
                <div className="flex">
                    <input type="text" placeholder="Search for the tool you like"
                        className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
                    />
                    <button type="submit" className="bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1">Search</button>
                </div>
               
            </form>

            <select onChange={(e) => {
                setCategoryName('');
                setCategoryName(e.target.value)
                
            }}  id="category" name="category"
                    className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                        <option value={''}>Select Category</option>
                    {totalCategory.map(category => <option key={category} value={category}>{category}</option>)}
                </select>

                <select onChange={(e)=> setBrandName(e.target.value)} id="brand" name="brand"
                    className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                        <option value={''}>Select Brand</option>
                    {totalBrand.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                </select>

                <select onChange={(e)=>setPriceRange(e.target.value)} id="range" name="range"
                    className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                    <option value="">Select price Range</option>
                    <option value="Low">Low Price</option>
                    <option value="Mid">Mid Price</option>
                    <option value="High">High Price</option>
                </select>

                <select onChange={(e)=>setSortPrice(e.target.value)} id="sort" name="sort"
                    className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                    <option value="">sort by price</option>
                    <option value="HighToLow">High to Low</option>
                    <option value="LowToHigh">Low to High</option>
                </select>
                <select onChange={(e)=>setSortDate(e.target.value)} id="sort" name="sort"
                    className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                    <option value="">sort by Date</option>
                    <option value="new">Newest to Oldest</option>
                    <option value="old">Oldest to Newest</option>
                </select>

            </div>

            

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-[100px]">
                {availableProducts.map(product => (
                    <ProductsContainer product={product} key={product.id} />
                ))}
            </div>

            <div className="my-6 flex border justify-center items-center gap-3">
                <button onClick={() => handlebtnNext('previous')}>Previous</button>
                {pages.map((page, idx) => (
                    <button key={idx}
                        className={currentPage === page ? 'selected btn' : ''}
                        onClick={getCurrentPage}>{page}</button>
                ))}
                <button onClick={() => handlebtnNext('next')}>Next</button>
            </div>
        </div>
    );
};

export default Products;
