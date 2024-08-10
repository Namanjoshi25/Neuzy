import React from 'react'
import { Img ,Text} from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function index(props  ) {
  


 
  return (
    <div className=' w-3/4 h-[100px]  mb-2 flex items-center justify-between    shadow-md ' >
    <div className='flex ml-3'>
    <Img className=" h-16 w-16 rounded-full" src={props.images[0]}></Img>
     <div className='flex flex-col ml-2 items-start'>
     <p className='font-semibold mb-1'>{props.title}</p>
     <p className=' text-sm text-black-900_7f'>{props.summary}</p>
     </div>

    </div>
      <div className='flex items-end mr-5'>
        <button  onClick={(e)=>props.handleDelete(props._id)} className=' ml-2 hover:text-red-500 transition-transform  ease-in-out'>  <FontAwesomeIcon size="lg" icon={faTrash} /> </button>
        <Link to={`/author/update-news/${props._id}`}>
        <button className='ml-2 hover:text-green-500'>  <FontAwesomeIcon size='lg' icon={faEdit} /> </button>
        </Link>
      </div>


      </div>
  )
}

export default index