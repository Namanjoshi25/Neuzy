
import { Heading , Input,Img } from 'components'
import SideBarNavbar from 'components/SideBarNavbar'
import React ,{useRef,useCallback, useState, useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { set } from 'date-fns';
import authorAxiosInstance from 'axios/authorAxios.config';
import { updateAuthor } from 'store/authorAuthSlice';
import { toast, ToastContainer ,Slide } from 'react-toastify';

function index() {

  const author= useSelector(state => state.author.author)


  const dispatch = useDispatch();

    
    const [profileImg ,setProfileImg] = useState()
    

    
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    tagline: false,
    twitter: false,
    linkedin: false,
    facebook: false,
  });

  const [updatedAuthorDetails, setUpdatedAuthorDetails] = useState({
    name: author.name,
    email: author.email,
    tagline: author.tagline,
   
      twitter: author.twitter,
      instagram:author.instagram,
      facebook: author.facebook,
   
  });
  const [toggleProfileImg, setToggleProfileImg] = useState(false);


    const handleEditButton = useCallback((field) => {
        setIsEditing((prevState) => ({
          ...prevState,
          [field]: !prevState[field],
        }));
      }, []);
       const handleInputChange = useCallback((e, field) => {
       
        const { value } = e.target;
        setUpdatedAuthorDetails((prevState) => {
            switch (field) {
              case 'name':
                return { ...prevState, name: value };
              case 'email':
                return { ...prevState, email: value };
              case 'tagline':
                return { ...prevState, tagline: value };
              case 'twitter':
                return {
                
                    ...prevState, twitter: value 
                };
              case 'instagram':
                     return {
                
                        ...prevState, instagram: value 
                     }
              case 'facebook':
                return {
                
                    ...prevState, facebook: value 
                };
              default:
                return prevState;
            }
          });
      }, []); 

      const uploadProfileImg = async (e)=>{
        e.preventDefault()

        if(!profileImg) {
          toast.error("Please provide profile image")
          return
        }
        const formData = new FormData();
        formData.append('profileImg', profileImg);
        
        const res = await authorAxiosInstance.put(`/author/update-profile-image/${author._id}`,formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(res);

         if(res) {
          /* toast.success("Profile Image Updated") */
        dispatch( updateAuthor({profileImg : res.data.data.profileImg}))
        setToggleProfileImg(false)
        }
 
        

      }

      const handleSubmit = async(e)=>{
        e.preventDefault()

        const res = await authorAxiosInstance.put(`/author/update-author/${author._id}`,updatedAuthorDetails)
        if(res){
          toast.success("Author updated Successfully")
          dispatch(updateAuthor(res.data.data))
        }
        
      }
      

  return (
    <>
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar transition={Slide} />

    <div className=' !container flex  h-screen '>
        <SideBarNavbar/>
  
        <main className='   flex-1 mt-2 flex-col justify-center    items-center w-full'>
       
     <div className=' flex flex-1 mt-2 flex-col   w-full items-center   '> 
   <form   onSubmit={handleSubmit}   className="shadow-md mt-4 shadow-black-900_4c p-6 space-y-4 w-[420px]  ">
   <Heading size='3xl' className=' text-center'>Author Profile </Heading>
   <div className=' h-[1px] w-full bg-black-900_4c' />
   <div className=' flex w-full  justify-center items-center flex-col object-contain'>
    <Img className=" h-16 w-16  rounded-full mb-4 " src={author.profileImg}></Img>
   {toggleProfileImg ? 
   <div className='flex w-full  '>
    <input 
   type="file"
    className=" w-3/4 !border-2 !p-2 !border-black-900_4c    !rounded-lg"
    onChange={(e)=> setProfileImg(e.target.files[0])}
    />
    <div className=' flex justify-center items-center p-2'>
    <button onClick={uploadProfileImg} className= ' p-1 ml-2  bg-dark_blue  text-white-A700  rounded hover:bg-blue-700'>upload</button>

    </div>
   </div>
    :
    <p onClick={() => setToggleProfileImg(prev=> !prev)}  className="w-full ml-2  text-blue-500 text-center cursor-pointer  hover:underline">
    Update profile image
  </p>
   }
   </div>


   {Object.keys(author).filter(key => key !== 'profileImg' && key !=='_id' && key !=='createdAt' && key!=='updatedAt' && key!=="__v").map((key) => (
        <div key={key} className="mb-4 w-full !min-w-full">
          {isEditing[key] ? (
            <input
              type="text"
              value={updatedAuthorDetails[key]}
              className="!w-full !border-2 !p-3 !border-black-900_99 rounded-lg focus:ring-1  focus:outline-none focus:ring-black-900 text-ellipsis "
              onChange={(e) => handleInputChange(e, key)}
              
              
            />
          ) : (
            <p onClick={() => handleEditButton(key)} className="w-full border-2 p-3 border-black-900_99  ">
              {author[key]}
            </p>
          )}
        </div>
        
      ))}
  
 
   
   
  
  <div className=' flex items-center justify-center'>
  <button
     type="submit"
     className= "  bg-blue_gray-900 text-white-A700  p-2 rounded hover:bg-blue-700"
   >
     Submit
   </button>
  </div>
 </form>
 </div>
 
        </main>

    
    </div>
    </>
  )
}

export default index