import axiosInstance from 'axios/axios.config';
import { Input } from 'components'
import AllBlogCardnews1 from 'components/AllBlogCardnews1';
import React,{useState} from 'react'

function Search() {
    const [query , setQuery] = useState("")
    const [searchResponse ,setSearchResponse] = useState([])
    const debounce =  (func,delay)=>{
        let timeout;
        return function (...args){
          clearTimeout(timeout);
          timeout =setTimeout(()=>func.apply(this,args),delay)
        }
       }
       const search = async(query)=>{
        if(query=="") {
            setSearchResponse([])
            return
        }
        const res = await axiosInstance.get(`/news/all-news?query=${query}`)
        setSearchResponse(res.data.data)
       
        
       }
       
      
       const handleSearchChange = debounce(search,1000)
      
       const inputSearchChange =(e)=>{
       
      setQuery(e)
      handleSearchChange(e)
       }
       console.log(searchResponse);
  return (
    <div className='relative'>
   {searchResponse.length > 0 && (
  
        <div className="absolute z-10      bg-gray-100  w-[625px] mt-20   bg-white border border-gray-300 rounded shadow max-h-40 overflow-y-auto">
          {searchResponse.length > 0 ? (
            searchResponse.map((result, index) => (
                <AllBlogCardnews1 {...result} key={"searchNews" + index} />
            
            ))
          ) : (
            <div className="p-2">No results found</div>
          )}
        </div>
      )}

  
        <Input
    size="md"
    shape="square"
    name="search"
    value={query}
    placeholder={`Search New here...`}
    className="flex-grow tracking-[-0.50px] md:p-5 sm:pr-5"
    onChange ={inputSearchChange}
  />
 
    </div>
  )
}

export default Search