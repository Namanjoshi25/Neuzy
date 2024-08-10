import Header from 'components/Header'
import React from 'react'
import { Img ,Text} from 'components'
import { useSelector } from 'react-redux'
import SideBarNavbar from 'components/SideBarNavbar'
import AuthorProfileCard from 'components/AuthorProfileCard'
import AuthorNewsList from 'components/AuthorNewsList'

function AuthorHomepage() {
  
 /*  return (
    <div className='w-full flex flex-col h-screen'>
    <SideBarNavbar/>
      
      
    </div>
  ) */


 

    return (
      <div className="w-screen h-screen flex">
        <SideBarNavbar className=" h-full max-h-screen overflow-y-auto " />
        <div className="w-5/6 h-full flex flex-col">
          <div className="flex-1 h-1/6 mt-3">
            <AuthorProfileCard />
          </div>
          <div className="flex-1 h-5/6">
            <AuthorNewsList />
          </div>
        </div>
      </div>
    );
};

export default AuthorHomepage;


