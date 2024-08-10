import React, { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import { Img } from "components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

function AuthorProfileCard(props){

   
    

    const [author, setAuthor] = useState( {
        name: 'John Doe',
        email: 'john.doe@example.com',
        tagline: 'A passionate writer and journalist.',
        profileImg : "",
        socials: {
          twitter: 'https://twitter.com/johndoe',
          linkedin: 'https://linkedin.com/in/johndoe',
          facebook: 'https://facebook.com/johndoe',
        }});

        const authorData= useSelector(state => state.author) 
        useEffect(() => {
            if (authorData.authorStatus) {
              setAuthor(authorData.author);
            }
          }, [authorData]);

  return (
    <div className="container flex   h-1/6  mx-auto p-4">
    {authorData.authorStatus ? 
     <div className="bg-white flex   justify-around w-full h-20  shadow-md rounded p-4">
        <div className="  flex w-1/2 "> 
        <Img className="overflow-hidden rounded-2xl mr-2 " src= {author.profileImg}></Img>
        <div className="flex flex-col w-1/2 ml-2">
        <p><strong>Name:</strong> {author.name}</p>
        <p><strong>Email:</strong> <a href={`mailto:${author.email}`} className="text-blue-500">{author.email}</a></p>
        </div>
     
       <div className="flex flex-col items-center text-center">
       <strong>Tagline:</strong> 
       <p >{author.tagline}"</p>
       </div>
        </div>
        <div className="flex flex-col items-center mr-5 ">
        <p><strong>Socials:</strong></p>
        <ul className="list-none pl-0 flex">
          <li><a href={author.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 mr-2">     <FontAwesomeIcon icon={faTwitter} /> </a></li>
          <li><a href={author.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-500 mr-2"> <FontAwesomeIcon icon={faInstagram} /></a></li>
          <li><a href={author.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500 mr-2"> <FontAwesomeIcon icon={faFacebook} /></a></li>
        </ul>
        </div>
        
       
      </div>
    
    :
    <div>
        <h1>Please login to view the page</h1>
    </div>
    }
    </div>
    
     
  );
}


export default AuthorProfileCard