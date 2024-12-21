import React from 'react';
import SearchIcon from '@mui/icons-material/Search'; // Importing SearchIcon from Material UI
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '../common/FavoriteBorderIcon';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navigation.css';
import { useSelector } from 'react-redux';
import { countCartItems } from '../../store/features/cart';

const Navigation = ({variant="default"}) => {
 const cartLength = useSelector(countCartItems);
const navigate= useNavigate();

  return (
    <nav className="flex items-center py-6 px-16 justify-between gap-40">
      <div className="flex items-center gap-6">
        {/* LOGO */}
        <a className="text-3xl text-black font-bold gap-8" href="/">SakiShop</a>
      </div>

{ variant ==="default" &&
 <div className="flex flex-wrap items-center gap-10 flex-1">
 {/* Nav items */}
 <ul className="flex gap-14 text-gray-600 hover:text-black">
   <li><NavLink to="/" className={({isActive})=> isActive ? 'active-link':""}> Shop </NavLink></li>
   <li><NavLink to="/men"  className={({isActive})=> isActive ? 'active-link':""}>Men</NavLink></li>
   <li>< NavLink to="/women" className={({isActive})=> isActive ? 'active-link':""}>Womens</NavLink></li>
   <li><NavLink to="/kids" className={({isActive})=> isActive ? 'active-link':""}>Kids</NavLink></li>
 </ul>
</div>
}
     
{ variant ==="default" &&


<div className="flex justify-center">
{/* Search bar */}
<div className="border rounded flex items-center overflow-hidden">
  <input 
    type="text" 
    className="px-4 py-2 outline-none" 
    placeholder="Search" 
  />
  <button className="flex items-center justify-center px-4">
    <SearchIcon className="text-gray-600 hover:text-black transition-colors duration-300" />
  </button>
</div>
</div>
}

      <div className="flex flex-wrap items-center gap-4">
        {/* Action Items */}
        { variant ==="default" &&
        <ul className="flex gap-8">
        <li>
          <button>
            <FavoriteBorderIcon className="text-gray-600 hover:text-black transition-colors duration-300" />
          </button>
        </li>
        <li>
          <button  onClick={()=>navigate('/account-details/profile')}>
            <PersonIcon className="text-gray-600 hover:text-black transition-colors duration-300" />
          </button>
        </li>
        <li>
          <Link to="/cart-items" className="flex items-center gap-2">
            <ShoppingCartIcon className="text-gray-600 hover:text-black transition-colors duration-300" />
            {cartLength> 0 &&
            <div className='absolute ml-6 inline-flex items-center justify-center h-6 w-6 bg-black text-white  rounded-full border-2 text-xs border-white '>{cartLength}</div>
}
          </Link>
        </li>
      </ul>
}

{/*auth*/}
        {
variant === "auth" &&
<ul className='flex gap-8'>
  <li className='text-black border border-black hover:bg-slate-100 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none'><NavLink to="/v1/login" className={({isActive})=> isActive ? 'active-link':""} >Login</NavLink></li>
  <li className='text-black border border-black hover:bg-slate-100 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none'><NavLink to="/v1/register" className={({isActive})=> isActive ? 'active-link':""}>Register</NavLink></li>
</ul>
        }
      </div>
    </nav>
  );
};


export default Navigation;
