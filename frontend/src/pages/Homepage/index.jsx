import React, { useEffect,useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Text, Heading, Img, Slider } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HomepageCard from "../../components/HomepageCard";
import HomepageColumn from "../../components/HomepageColumn";
import HomepageColumn1 from "../../components/HomepageColumn1";
import HomepageRowhowtomaximiz from "../../components/HomepageRowhowtomaximiz";
import HomepageRowhowtomaximiz1 from "../../components/HomepageRowhowtomaximiz1";
import HomepageRownewyorkninet from "../../components/HomepageRownewyorkninet";
import { current } from "@reduxjs/toolkit";
import axiosInstance from "axios/axios.config";
import { format } from 'date-fns';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "store/authSlice";
import { getCategoryClass } from "utils/categoryColor.util";
import { toast, ToastContainer ,Slide } from 'react-toastify';


export default function HomepagePage() {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);
  const [sliderState1, setSliderState1] = React.useState(0);
  const sliderRef1 = React.useRef(null);
  const dispatch = useDispatch()
  const navigate =useNavigate()

  const [allPosts ,setAllPosts] = useState([])
  const [hotTopicPosts ,setHotTopicPosts] = useState([])
  const [crimePosts ,setCrimePosts] = useState([])
  const [entertainmentPosts ,setEntertainmentPosts] = useState([])
  const [sportsPosts ,setSportsPosts] = useState([])
  const [financePosts ,setFinancePosts] = useState([])
  const [politicalPosts ,setPoliticalPosts] = useState([])
  const [lifeTopicPosts , setLifeTopicPosts] = useState([])
  const [healthPosts , setHealthPosts] = useState([])

  const user =  useSelector(state => state.auth);
  
  
  
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axiosInstance.get("/users/current-user");
        if (!res) {
          throw new Error("No response");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Please Refresh")
          dispatch(logout());
         navigate('/login');
        }
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(()=>{
    const allPost = async()=>{
      const res = await axiosInstance.get("/news/all-news" ,{
        headers :{
          "Content-Type": "application/json",
          
        
        }
      })
      if(res) {
        setAllPosts(res.data.data)  

        const hotTopic= res.data.data.filter(post => post.news.category === "Hot Topic") 
        setHotTopicPosts(hotTopic);
        const crime = res.data.data.filter(post => post.news.category === "Crime") 
        setCrimePosts(crime)
        const entertainment = res.data.data.filter(post=> post.news.category === "Entertainment")
        setEntertainmentPosts(entertainment)
        const sports = res.data.data.filter(post => post.news.category === "Sports"  )
        setSportsPosts(sports)
        const finance = res.data.data.filter(post => post.news.category === "Finance")
        setFinancePosts(finance)
        const political = res.data.data.filter(post => post.news.category === "Political Topic")
        setPoliticalPosts(political)
        const lifeTopic = res.data.data.filter(post => post.news.category === "Life Topic")
        setLifeTopicPosts(lifeTopic)
        const healthPosts = res.data.data.filter(post => post.news.category === "Health")
        setHealthPosts(healthPosts)
      }
   
    
      

    }

    allPost();
  },[])

/*   <Helmet>
        <title>Naman's Application1</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet> */

      

  return (
    <>
           <ToastContainer position="top-right" autoClose={5000} hideProgressBar transition={Slide} />
        
    <div>
    {!user.status ?
    <div className=" text-2xl  font-bold  items-center justify-center ">
    <Header className="self-stretch" />
    <div className="flex   justify-center items-center w-full relative">
    <p className="font-poppins m-auto text-black text-2xl text-black-900_4c">
      !! Please login to read the news !!
    </p>
    </div>

   </div>
   
    
  :
  (
    <>
    {allPosts.length > 0 
    ?
     <div className="w-full bg-white-A700">
     <div className="flex flex-col items-center">

   {/*    //hotTopic posts */}
     <Header className="self-stretch" />
      <div className="mx-auto mt-[50px] flex w-full max-w-[1292px] flex-col gap-[49px] md:p-5">
         <div className="flex items-center gap-[50px] md:flex-col">
           <Img src={hotTopicPosts[0].news.images[0]}alt="image" className="h-[255px] w-[48%] object-cover md:w-full" />
           <div className="flex flex-1 flex-col items-start gap-[43px] md:self-stretch">
             <div className="flex flex-col items-start self-stretch">
               <div className="flex w-[20%] items-center gap-2.5 md:w-full  ">
                 <div className="h-[15px] w-[15px] rounded-[7px] bg-blue_gray-900  "  />
                 <Text size="3xl" as="p" className=" flex  tracking-[-0.50px] !text-blue_gray-900 ">
                   {hotTopicPosts[0].news.category}
                 </Text>
               </div>
               <Heading size="3xl" as="h1" className="mt-5 w-full !font-bold leading-[43px] tracking-[-0.50px]">
               {hotTopicPosts[0].news.title}
               </Heading>
               <Heading as="h2" className="mt-7 text-xl tracking-[-0.50px]">
                 {hotTopicPosts[0].news.location} {format(new Date(hotTopicPosts[0].news.createdAt), 'dd MMMM yyyy')}
               </Heading>
             </div>
             <Link
               to={`/singleBlog/${hotTopicPosts[0]._id}`}
               
       
               className="min-w-[108px] gap-[13px] tracking-[-0.50px] text-blue_gray-900 hover:text-blue-700"
               
             >
               Read More 
               <Img src="images/img_arrow_1.svg" alt="arrow 1" className="h-px w-[27px]" />
               
             </Link>
           </div>
         </div>
         <div className="flex gap-[55px] md:flex-col">
           {hotTopicPosts.slice(1,4).map((d, index) => (
             <HomepageRowhowtomaximiz {...d} key={"listhowtomaximi" + index} />
           ))}
         </div>
       </div> 

{/*        Latest Posts
 */}       <div className="container-sm mt-[118px] flex flex-col gap-[50px] md:p-5">
         <div className="flex items-center justify-between gap-5">
           <Heading size="3xl" as="h2" className="self-start tracking-[-0.50px]">
             Latest Release
           </Heading>
           <Link to={"/allBlog"}>
             <Button shape="round" className="min-w-[122px] self-end font-semibold tracking-[-0.50px] sm:px-5">
               View All
             </Button>
             </Link>
         </div>
         <div>
         
           <div className="flex gap-[50px] md:flex-col">
             <div className="flex w-[44%] flex-col items-start gap-[25px] md:w-full">
               <div className="relative h-[270px] self-stretch md:h-auto overflow-hidden">
                 <Img
                   src={allPosts[0].news.images[0]}
                   alt="News Image"
                   className="h-[270px] w-full object-cover overflow-hidden"
                 />
                 <div className="absolute  bottom-0 left-0 right-0 top-0 m-auto flex h-full w-full flex-col items-start gap-[190px] bg-gradient p-[13px] md:gap-[142px] sm:gap-[95px]">
                  <Text className={`${getCategoryClass(allPosts[0].news.category)} p-1`}>
                  {allPosts[0].news.category}
                  </Text>
                   <Text size="md" as="p" className="ml-[9px] tracking-[-0.50px] md:ml-0">
                    {allPosts[0].news.location}  , {format(new Date(allPosts[0].news.createdAt), 'dd MMMM yyyy')}
                   </Text>
                 </div>
               </div>
               <div className="flex flex-col gap-[15px] self-stretch">
                 <Heading size="2xl" as="h3" className="leading-[29px] tracking-[-0.50px]">
                   {allPosts[0].news.title}{" "}
                 </Heading>
                 <Text size="md" as="p" className="leading-[35px] tracking-[-0.50px] !text-black-900_7f">
                  {allPosts[0].news.summary}
                 </Text>
               </div>
               <Link to={`/singleblog/${allPosts[0]._id}`} className="  hover:underline text-blue-500">
               Read More
               </Link>
             </div>
             <div className="flex flex-1 flex-col gap-[50px] md:self-stretch">
               {allPosts.slice(1,3).map((d, index) => (
                 <HomepageRownewyorkninet
                   {...d}
                   key={"listnewyorknine" + index}
                 />
               ))}
             </div>
           </div>
         </div>
       </div>
    
   {/* Entertainment Slider section */}
       <div className="mt-[120px] flex justify-center self-stretch bg-black-900 py-12 md:py-5">
         <div className="container-sm flex items-center justify-center gap-[50px] md:flex-col md:p-5">
           <div className="relative h-[600px] flex-1 md:h-auto md:w-full md:flex-none md:self-stretch">
             <div className="flex h-[600px]  overflow-y-hidden w-full max-w-[796px] bg-[url(/public/images/img_background.png)] bg-cover bg-no-repeat md:h-auto">
               <Slider
                 autoPlay
                 autoPlayInterval={2000}
                 responsive={{ 0: { items: 1 }, 550: { items: 1 }, 1050: { items: 1 } }}
                 renderDotsItem={(props) => {
                   return props?.isActive ? (
                     <div className="mr-2.5 h-[15px] w-[15px] bg-white-A700" />
                   ) : (
                     <div className="mr-2.5 h-[15px] w-[15px] bg-white_A700_4f" />
                   );
                 }}
                 activeIndex={sliderState1}
                 onSlideChanged={(e) => {
                   setSliderState1(e?.item);
                 }}
                 ref={sliderRef1}
                 items={entertainmentPosts.slice(1,4).map((post) => (
                   <React.Fragment key={Math.random()}>
                       <div className="mt-[226px] flex w-[51%] justify-center pb-[70px] md:w-full md:pb-5">
                         <div className="flex w-full flex-col items-center gap-[50px]">
                           <div className="flex flex-col items-center gap-3 self-stretch">
                             <div className="flex w-[42%] items-center gap-2.5 md:w-full">
                               <div className="h-[15px] w-[15px] rounded-[7px] bg-blue_gray-900" />
                               <Text size="md" as="p" className={`tracking-[-0.50px] ${getCategoryClass(post.news.category)} `}>
                                 {post.news.category}
                               </Text>
                             </div>
                             <Heading
                               size="3xl"
                               as="h2"
                               className="w-full text-center leading-[43px] tracking-[-0.50px] !text-white-A700"
                             >
                               {post.news.title}
                             </Heading>
                           </div>
                           <Link to={`/singleBlog/${post._id}`}>
                           <Button
                             size="5xl"
                             variant="outline"
                             shape="round"
                             color="undefined_undefined"
                             className="min-w-[154px] !border font-semibold tracking-[-0.50px] text-white-A700 sm:px-5"
                           >
                             Read Now
                           </Button>
                           </Link>
                         </div>
                       </div>
                  
                   </React.Fragment>
                 ))}
               />
             </div>
           </div>
           <div className="flex w-[36%] flex-col gap-[43px] md:w-full">
             {entertainmentPosts.slice(4,9).map((d, index) => (
               <HomepageRowhowtomaximiz1 {...d} key={"leftnews" + index} />
             ))}
           </div>
         </div>
       </div>

       {/* Life topic slider section */}
       <div className="relative mt-[120px] h-[500px] self-stretch md:h-auto">
         <div className="flex h-[500px] w-full max-w-[1440px] bg-[url(/public/images/img_background_500x1440.png)] bg-cover bg-no-repeat md:h-auto">
           <Slider
             autoPlay
             autoPlayInterval={2000}
             responsive={{ 0: { items: 1 }, 550: { items: 1 }, 1050: { items: 1 } }}
             renderDotsItem={(props) => {
               return props?.isActive ? (
                 <div className="mr-2.5 h-[15px] w-[15px] bg-white-A700" />
               ) : (
                 <div className="mr-2.5 h-[15px] w-[15px] bg-white_A700_4f" />
               );
             }}
             activeIndex={sliderState}
             onSlideChanged={(e) => {
               setSliderState(e?.item);
             }}
             ref={sliderRef}
             items={lifeTopicPosts.slice(0,3).map((post,index) => (
               <React.Fragment key={Math.random()}>
                   <div className="container-sm mt-[127px] flex items-start justify-between gap-5 pr-[7px] md:flex-col md:p-5">
                     <div className="flex w-[49%] flex-col items-start md:w-full">
                       <div className="flex w-[13%] items-center gap-2.5 md:w-full">
                         <div className="h-[15px] w-[15px] rounded-[7px] bg-deep_orange-A400" />
                         <Text size="md" as="p" className={`tracking-[-0.50px] ${getCategoryClass(post.news.category)} `}>
                           {post.news.category}
                         </Text>
                       </div>
                       <Heading
                         size="4xl"
                         as="h2"
                         className="mt-[7px] w-full leading-[58px] tracking-[-0.50px] !text-white-A700 overflow-hidden"
                       >
                        {post.news.title}
                       </Heading>
                       <Link to={`/singleBlog/${post._id}`}>
                       <Button
                         size="5xl"
                         variant="outline"
                         shape="round"
                         color="undefined_undefined"
                         className="mt-[57px] min-w-[160px] !border font-semibold tracking-[-0.50px] text-white-A700 sm:px-5"
                       >
                         Read More
                       </Button>
                       </Link>
                     </div>
                     <Button
                       size="8xl"
                       variant="outline"
                       shape="circle"
                       color="undefined_undefined"
                       className="mt-7 w-[60px] rotate-[180deg] !rounded-[30px]"
                     >
                       <Img src="images/img_arrow_white_a700.svg" />
                     </Button>
                   </div>
              
               </React.Fragment>
             ))}
           />
         </div>
       </div>
       {/* Entertainment section */}
       <div className="container-sm mt-[119px] flex flex-col gap-[49px] md:p-5">
         <div className="flex flex-col gap-7">
           <div className="flex items-start justify-between gap-5">
             <Heading size="3xl" as="h2" className="tracking-[-0.50px]">
               Entertaiment{" "}
             </Heading>
             <Link to={"/allBlog?category=Entertainment"}>
               <Button shape="round" className="min-w-[122px] font-semibold tracking-[-0.50px] sm:px-5">
                 View All
               </Button>
        </Link>
           </div>
           <div className="h-px bg-black-900_7f" />
         </div>
         <div className="flex gap-5 pb-[33px] md:flex-col sm:pb-5">
           {entertainmentPosts.slice(0,3).map((d, index) => (
             <HomepageColumn {...d} key={"listtagone" + index} />
           ))}
         </div>
       </div>
       {/*Political section */}
       <div className="container-sm mt-[119px] flex flex-col gap-[49px] md:p-5">
         <div className="flex flex-col gap-7">
           <div className="flex items-start justify-between gap-5">
             <Heading size="3xl" as="h2" className="tracking-[-0.50px]">
               Political{" "}
             </Heading>
             <Link to={"/allBlog?category=Political"}>
               <Button shape="round" className="min-w-[122px] font-semibold tracking-[-0.50px] sm:px-5">
                 View All
               </Button>
             </Link>
           </div>
           <div className="h-px bg-black-900_7f" />
         </div>
         <div className="flex gap-[19px] pb-[33px] md:flex-col sm:pb-5">
           {politicalPosts.slice(0,3).map((d, index) => (
             <HomepageColumn1 {...d} key={"listpolitical" + index} />
           ))}
         </div>
       </div>
       {/*Sports section */}
       <div className="container-sm mt-[119px] flex flex-col gap-[49px] md:p-5">
         <div className="flex flex-col gap-7">
           <div className="flex items-start justify-between gap-5">
             <Heading size="3xl" as="h2" className="tracking-[-0.50px]">
               Sports{" "}
             </Heading>
             <Link to={"/allBlog?category=Sports"}>
               <Button shape="round" className="min-w-[122px] font-semibold tracking-[-0.50px] sm:px-5">
                 View All
               </Button>
            </Link>
           </div>
           <div className="h-px bg-black-900_7f" />
         </div>
         <div className="flex gap-[19px] pb-[33px] md:flex-col sm:pb-5">
           {sportsPosts.slice(0,3).map((d, index) => (
             <HomepageColumn1 {...d} key={"sports" + index} />
           ))}
         </div>
       </div>
       {/*Health section */}
       <div className="container-sm mt-[119px] flex flex-col gap-[49px] md:p-5">
         <div className="flex flex-col gap-7">
           <div className="flex items-start justify-between gap-5">
             <Heading size="3xl" as="h2" className="tracking-[-0.50px]">
               Health{" "}
             </Heading>
             <Link to={"/allBlog?category=Health"}>
               <Button shape="round" className="min-w-[122px] font-semibold tracking-[-0.50px] sm:px-5">
                 View All
               </Button>
            </Link>
           </div>
           <div className="h-px bg-black-900_7f" />
         </div>
         <div className="flex gap-[19px] pb-[33px] md:flex-col sm:pb-5">
           {healthPosts.slice(0,3).map((d, index) => (
             <HomepageColumn1 {...d} key={"health" + index} />
           ))}
         </div>
       </div>
       {/*Finance section */}
       <div className="container-sm mt-[119px] flex flex-col gap-[49px] md:p-5">
         <div className="flex flex-col gap-7">
           <div className="flex items-start justify-between gap-5">
             <Heading size="3xl" as="h2" className="tracking-[-0.50px]">
               Finance{" "}
             </Heading>
              <Link to={"/allBlog?category=Finance"}>
               <Button shape="round" className="min-w-[122px] font-semibold tracking-[-0.50px] sm:px-5">
                 View All
               </Button>
               </Link>
           </div>
           <div className="h-px bg-black-900_7f" />
         </div>
         <div className="flex gap-[19px] pb-[33px] md:flex-col sm:pb-5">
           {financePosts.slice(0,3).map((d, index) => (
             <HomepageColumn1 {...d} key={"finance" + index} />
           ))}
         </div>
       </div>
       
       <div className="container-sm mt-[120px] flex flex-col items-center justify-center gap-[30px] rounded-[20px] bg-gray-900 p-[37px] md:p-5">
         <div className="flex w-[54%] flex-col gap-[37px] md:w-full">
           <Heading size="4xl" as="h2" className="text-center leading-[58px] tracking-[-0.50px] !text-white-A700">
             Get the Latest Notifications and Info from Us
           </Heading>
           <Text size="xl" as="p" className="text-center leading-[35px] tracking-[-0.50px] !text-white-A700_b2">
             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
             industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type
             and scrambled.
           </Text>
         </div>
         <Button
           size="6xl"
           className="mb-[5px] min-w-[196px] rounded-[26px] border border-solid border-blue_gray-900 font-semibold tracking-[-0.50px] text-blue_gray-900 sm:px-5"
         >
           Subscribe Now
         </Button>
       </div>
       <Footer className="mt-[120px]" />
     </div>
   </div>
   :
   (<div className=" text-2xl  font-bold  items-center justify-center ">
    <Header/>
    <div className="flex   justify-center items-center w-full relative">
    <p className="font-poppins m-auto text-black text-2xl text-black-900_4c mt-9">
      !! No News found Please try again later  !!
    </p>
    </div>

   </div>
    )
    }
    </>
      
  )}
    </div>
    </>
  );
}

