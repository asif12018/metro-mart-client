
const ProductsContainer = ({product}) => {
    return (
        <div className="card bg-base-100 w-auto shadow-xl">
  <figure>
    <img className="max-h-[200px]"
      src={product.image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{product.name}</h2>
    <h3 className="text-lg">{product.description}</h3>
    <p><span className="font-bold">Categories:</span> {product.category}</p>
    <p><span className="font-bold">Price:</span> {product.price}</p>
    <p><span className="font-bold">Rating:</span> {product.ratings}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    );
};

export default ProductsContainer;