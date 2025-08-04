import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {Provider} from 'react-redux';
import {store} from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../../routerproject-react/src/Components/home.jsx';
import { Container } from './components/index.jsx';
import Login from './Login.jsx';
import AllPost from './pages/AllPost.jsx';
import Post from './pages/Post.jsx';
import EditPost from './pages/EditPost.jsx';
import AddPost from './pages/Addpost.jsx';
import {Protected as AuthLayout} from './AuthLayout.jsx';
import Signup from './components/Signup.jsx';





const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
       {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                  
                  
                    <AllPost/>
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                   
                   
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                   
                   
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
  
  <RouterProvider  router={router}/>
  </Provider>
   
  </StrictMode>,
)
