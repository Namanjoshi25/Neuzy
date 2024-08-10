import { Button, Heading } from 'components'
import React, { useState } from 'react'

function FilterComponent({toggleFilter ,onApplyFilter}) {
    const [categoryToggle ,setCategoryToggle] = useState(0)
    const [dateToggle ,setDateToggle] = useState(0)


    const handleToggle = (e)=>{
        setCategoryToggle(e.target.id)
     }
     const dateToggleHandler = (e)=>{
        setDateToggle(e.target.id)
     }

     const handleFilter= ()=>{
        const filters ={
            category : categoryToggle >=0 && categoryMap[categoryToggle-1] ||"",
            dateRange : dateToggle  >= 0 && dateMap[dateToggle-1] || ""
        }
       onApplyFilter(filters);
       toggleFilter();
     }

    const categoryMap =[ 
        {id: 1 ,name:"Health"},
       {id: 2, name: "Life"},
        {id :3, name :"Entertainment"},
       { id : 4, name :"Finance"},
       { id : 5, name:"Political"}
        // Add more mappings if needed
      ];
      const dateMap =[ 
        {id: 1 ,name:"Today"},
       {id: 2, name: "This Week"},
        {id :3, name :"This Month"},
       
        // Add more mappings if needed
      ];
  return (
    <div className=' p-8 absolute top-[5%] flex flex-col gap-5 left-1/2 transform -translate-x-1/2 transition duration-500 ease-in-out  h-[370px] w-[60%]  rounded-sm  bg-white-A700 border-2 border-black-900 z-10'>
         <div className=' flex  justify-between'>
            <Heading size='xl' as="h2"> Filter News</Heading>
         <button
         onClick={toggleFilter} 
         >
            <img src="images/close.png" alt="close" className=" h-[18px] object-contain" />
         </button>
         </div>
         <div className="category">
           <Heading> Category News</Heading>
            <div className='w-full flex gap-3  mt-2'>
                {categoryMap.map((category,index)=>(
                    
            <button key={"categoryFilter" + index} onClick={handleToggle} id={category.id}  className={`rounded-lg self-start w-[143px] h-9 ${category.id == categoryToggle ?  "bg-blue_gray-900 text-white-A700" : "bg-gray-50 text-black-900"}  flex items-center justify-center`} >{category.name}</button>

                ))}
           

            </div>
           
         </div>
         <div className="newspertime flex-col">
         <Heading> News Post Time</Heading>
            
          <div className='flex w-full  gap-3 rounded-lg mt-2 '>
            {dateMap.map((date,index)=>(
          <button key={"dateFilter" + index} onClick={dateToggleHandler} id={date.id} className={`rounded-lg self-start w-[143px] h-9 ${date.id == dateToggle ?  "bg-blue_gray-900 text-white-A700" : "bg-gray-50 text-black-900" }`}  >{date.name}</button>

            ))}
       

          </div>
            
            
         </div>
         <Button onClick={handleFilter} className='w-[142px] bg-blue_gray-900  text-white-A700 rounded-lg mt-5'>
            Apply Now
         </Button>
        
        </div>
  )
}

export default FilterComponent