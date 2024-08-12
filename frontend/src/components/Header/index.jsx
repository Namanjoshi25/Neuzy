import React, { useEffect, useState } from "react";
import { Text, Img, Heading, Button } from "./..";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "axios/axios.config";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "store/authSlice";
import { authorLogout } from "store/authorAuthSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faHamburger } from "@fortawesome/free-solid-svg-icons";

export default function Header({ ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [isMenuOpen, setIsMenuOpen] = useState(false);


  
  const authStatus = useSelector(state => state.auth.status);
  


  
  const handleLogout = ()=>{
    
      dispatch(logout());
      localStorage.removeItem("accessToken")
    navigate("/login")
    

  }
  
  const navLinks = [
    {
      name : "Sport",
      page : "/allBlog?category=Sport",
      status : authStatus
    },
    {
      name : "Health",
      page : "/allBlog?category=Health",
      status : authStatus
    },
    {
      name : "Political",
      page : "/allBlog?category=Political",
      status : authStatus
    },
    {
      name : "finance",
      page : "/allBlog?category=Finance",
      status : authStatus
    },
    {
      name : "Life",
      page : "/allBlog?category=Life",
      status : authStatus
    },
    {
      name : "Entertainment",
      page : "/allBlog?category=Entertainment",
      status : authStatus
    }
    ,
    {
      name: "Quick News",
      page:"/news/video-news",
      status : authStatus
    }
   

  ]
 



    
 return (
    <>
      <header className="sm:px-8 px-4 py-4 z-10 w-full bg-blue_gray-900">
        <nav className="flex justify-between items-center max-container">
          <a href="/" className="text-3xl font-bold">
            <img src="\images\img_header_logo.svg" alt="" />
          </a>
          <ul className="flex-1 flex justify-center items-center gap-10   md:hidden sm:hidden">
            {navLinks.filter(item => item.status).map((item) => (
              <li key={item.name}>
                <Link
                  to={item.page}
                  className="font-montserrat text-white-A700 font-semibold  leading-normal text-lg text-slate-gray"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {authStatus ? 
          <Button  size="lg" className="  text-white-A700 " onClick={handleLogout}>
             <Text size="xl" className=" !font-semibold" >Logout</Text>
          </Button>
         
        
        :
        <>
        <div className=" flex items-end">
        <Link to={"/author/login"} className=" text-white-A700 mr-3 font-semibold" > 
        <Text size="xl" className=" !font-semibold" >Author</Text>
         </Link>
         <Link to={"/login"} className=" text-white-A700 mr-3 font-semibold" >
         <Text size="xl" className=" !font-semibold" >Login</Text>
          </Link>
          <Link to={"/register"} className=" text-white-A700 ml-2 font-semibold" >
          <Text size="xl" className=" !font-semibold" >Register</Text>
          </Link>

        </div>
      
        </>
        
          
          }
          </ul>
          
        
          <div
            className="hidden  sm:block md:block max-lg:block cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            {isMenuOpen ? <FontAwesomeIcon  className=" text-white-A700" size="lg" icon={faClose} /> : <FontAwesomeIcon className=" text-white-A700" size="lg" icon={faHamburger}/>   }
            
          </div>
        </nav>
      </header>
      {isMenuOpen && (
        <div>
          <nav className="fixed top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-slate-100  ">
            <div
              className="hidden sm:block md:block max-lg:block fixed right-0  px-8 py-4 cursor-pointer"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              
            
            </div>
            <ul className=" lg:hidden flex flex-col items-center justify-center h-full ">
              {navLinks.filter(item => item.status).map((item) => (
                <li key={item.name}>
                  <Link
                   to={item.page}
                    className="font-montserrat leading-normal text-lg text-slate-gray"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
