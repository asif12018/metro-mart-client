

const Navbar = () => {
  const navlink = <>
   <li><a>Login</a></li>
    <li><a>Register</a></li>
      
      </>


    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="flex-1">
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