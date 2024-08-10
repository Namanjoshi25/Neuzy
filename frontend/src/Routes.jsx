import React from "react";
import { useRoutes } from "react-router-dom";

import NotFound from "pages/NotFound";
import Homepage from "pages/Homepage";
import SingleBlog from "pages/SingleBlog";
import AllBlog from "pages/AllBlog";
import Login from "pages/Login";
import Register from "pages/Register";
import AuthorLogin from "pages/AuthorLogin";
import AuthorHomepage from "pages/AuthorHomepage";
import NewsUpdate from 'pages/NewsUpdate'
import AddNews from 'pages/AddNews'
import AuthorProfile from 'pages/AuthorProfile'
import AuthorNews from "pages/AuthorNews"
import ExploreAuthor from 'pages/ExploreAuthor'
import VideoNews from "pages/VideoNews"
import SingleVideo from "pages/SingleVideo"
import AddVideo from 'pages/AddVideo'
import AuthorQuickVideo from 'pages/AuthorQuickVideo'
import UpdateVideo from 'pages/UpdateVideo'


const ProjectRoutes = () => {
  let element = useRoutes([
    
  
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/singleblog/:id",
      element: <SingleBlog />,
    },
    {
      path: "/allblog",
      element: <AllBlog />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path : "/author/login",
      element  : <AuthorLogin/>
    },
    {
      path : "/author",
      element : <AuthorHomepage/>
    },
    {
      path : "/author/update-news/:id",
      element : <NewsUpdate/>
    },{
      path:"/author/add-news",
      element:<AddNews/>
    },
    {
      path : "/author/profile/",
      element : <AuthorProfile/>

    },
    {
      path : "/author/news",
      element : <AuthorNews/>
    },
    {
      path : "news/:authorId",
      element : <ExploreAuthor/>
    },
    {
      path : "/news/video-news",
      element : <VideoNews/>
    },
    {
      path : "/news/singleVideo/:id",
      element : <SingleVideo/>
    },
    {
      path : "/author/quick-video",
      element : <AuthorQuickVideo/>
    },
    {
      path : "/author/add-video",
      element: <AddVideo/>
    },
    {
      path : "/author/update-video/:id",
      element : <UpdateVideo/>
    }
  ]);

  return element;
};

export default ProjectRoutes;
