import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductsContainer from "../../components/ProductsContainer/ProductsContainer";

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

    const pages = [];
    for(let i = 0; i < numberOfPage; i++) {
        pages.push(i + 1);
    }

    useEffect(() => {
        fetch('http://localhost:5000/productsCount')
        .then(res => res.json())
        .then(data => setTotalCount(data));
    }, []);

    const { data: filterName, isLoading: isFilterNameLoading, refetch: reload } = useQuery({
        queryKey: ['filterName'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/filterOption');
            return res.data;
        }
    });

    // console.log(filterName)

    const { data: availableProducts, isLoading, refetch } = useQuery({
        queryKey: ['availableProducts', currentPage, itemsParPage, brandName, searchName, priceRange, sortPrice, categoryName],
        queryFn: async () => {
            // const res = await axios.get(`http://localhost:5000/allProducts?page=${currentPage}&size=${itemsParPage}&brand=${brandName}&search=${searchName}&priceRange=${priceRange}&sortPrice=${sortPrice}&category=${categoryName}`);
            const res = await axios.get(`http://localhost:5000/allProducts?page=${currentPage}&size=${itemsParPage}&brandName=${brandName}&searchName=${searchName}&priceRange=${priceRange}&sortPrice=${sortPrice}&categoryName=${categoryName}`);
            return res.data;
        }
    });

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
        return <div>Loading...</div>;
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

            <select onChange={(e) => setCategoryName(e.target.value)}  id="category" name="category"
                    className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                    {totalCategory.map(category => <option key={category} value={category}>{category}</option>)}
                </select>

                <select onChange={(e)=> setBrandName(e.target.value)} id="brand" name="brand"
                    className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                    {totalBrand.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                </select>

                <select onChange={(e)=>setPriceRange(e.target.value)} id="range" name="range"
                    className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                    <option value="Low">Low Price</option>
                    <option value="Mid">Mid Price</option>
                    <option value="High">High Price</option>
                </select>

                <select onChange={(e)=>setSortPrice(e.target.value)} id="sort" name="sort"
                    className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                    <option value="HighToLow">High to Low</option>
                    <option value="LowToHigh">Low to High</option>
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
