import Header from 'components/Header'
import React, { useEffect, useState } from 'react'
import { Img ,Text,Button} from 'components'
import { useDispatch, useSelector } from 'react-redux'
import authorAxiosInstance from 'axios/authorAxios.config'
import { useNavigate,Link } from 'react-router-dom'
import { authorLogout } from 'store/authorAuthSlice'
function SideBarNavbar( props){
    const {authorStatus ,author} = useSelector(state => state.author)
    
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = ()=>{
      
          
       
          dispatch(authorLogout())
          localStorage.removeItem("authorToken")
          navigate("/author/login")
        
    
    
    
      }

    /* useEffect(() => {
        
    async function fetchAuthorDetails(){
     const res = await authorAxiosInstance.get("/author/current-author")
      setAuthor(res.data.data)
     }
     fetchAuthorDetails()
    }, []); */
    const authorNavOptions =[
    {
      name : "My News",
      page:"/author/news",
      status: authorStatus
    },
    {
      name : "Profile",
      page:"/author/profile/",
      status: authorStatus
    },
    {
      name : "Add News",
      page:"/author/add-news",
      status: authorStatus
    },
    {
      name : "Quick Video",
      page:"/author/quick-video",
      status: authorStatus
    },
    {
      name : "Add Quick Video",
      page:"/author/add-video",
      status: authorStatus
    },
  ]

  return (
    <div className={`w-[220px] ${props.className}   flex flex-col justify-between bg-blue_gray-900`}>
    <div>
      <div className="py-5 w-full flex items-start text-white-A700 border-2 border-black-900">
      <Link to={"/author"}>
      <Img src="\images\img_header_logo.svg" alt="headerlogo" className="h-[33px] w-[105px] object-contain" />
      </Link>
       
      </div>
      <div className="mt-3 flex flex-col">
        <div className="text-gray-500 text-xs ml-3">MAIN MENU</div>
        <ul>
          {authorNavOptions.filter(item => item.status).map(item => (
            <li key={item.page} className="p-3 mt-2">
              <Link to={item.page} className="flex items-center">
                <Text size="sm" className="!font-semiBold cursor-pointer">
                  {item.name}
                </Text>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="p-4 text-white-A700 flex justify-between items-center">
        <div className="h-7  w-1/2 overflow-hidden rounded flex items-center justify-center">
        <Img className=" object-contain h-full" src={author.profileImg} alt='ProfileImg'></Img>

          <p className=' ml-2 text-sm'> {author.name}</p>
        </div>
      <div>
        
      </div>
      <Button onClick={handleLogout}>
      <Img className="h-4 "  src="/images/icons8-logout-50.png" alt="" />
      </Button>
        <Link to={"/author/profile"}>
        <Img  className="h-4  text-white-A700 " src="/images/icons8-settings-50.png" alt="" />
        </Link>
        
    </div>
  </div>
  );
}

export default SideBarNavbar