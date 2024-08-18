import { Link } from "react-router-dom";


const Navbar = () => {
  const navlink = <>
  <li><Link to={'/'}>Home</Link></li>
  <li><Link to={'/products'}>Products</Link></li>
  
   <li><Link to={'/login'}>Login</Link></li>
    <li><Link to={'/register'}>Register</Link></li>
      </>


    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="flex-1">
    <img className="w-[30px]" src={"https://i.postimg.cc/BZYKLryK/logo.png"} alt="" />
    <a className="btn btn-ghost text-xl">Metro Mart</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
     {
      navlink
     }
    </ul>
  </div>
</div>
        </div>
    );
};

export default Navbar;