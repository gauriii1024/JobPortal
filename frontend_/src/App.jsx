import { LogIn } from 'lucide-react';
import './App.css'
import Navbar from './components/ui/shared/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/jobs/description/:id',
    element:<JobDescription/>
  }
])

const App = () => {
  return (
    <div>
      <RouterProvider router = {appRouter}/>
    </div>
  )
}

export default App