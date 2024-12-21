import React from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { setUser } from '@/redux/authSlice'
import { Loader2 } from "lucide-react";


const Login = () => {
  const {loading} = useSelector((store => store.auth))
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email:"",
    password:"",
    role:"",
  });
  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name] : e.target.value});
  } 
  // const changeFileHandler = (e) => {
  //   setInput({...input, file:e.target.files?.[0]});
  // }
  const submitHandler = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("fullname", input.fullname);
    // formData.append("email", input.email);
    // formData.append("phoneNumber", input.phoneNumber);
    // formData.append("password", input.password);
    // formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers:{
          "Content-type":"application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto ">
        <form onSubmit={submitHandler} className="w-1/2 border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" placeholder="xyz@gmail.com" 
            value={input.email} name="email" 
            onChange={changeEventHandler}/>
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" placeholder="asdfghj" 
            value={input.password} onChange={changeEventHandler}
            name="password"/>
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup defaultValue="default" className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                className="cursor-pointer"/>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input type="radio" name="role" value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="cursor-pointer"/>
              <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> </Button> :
            <Button type="submit" className="w-full my-4" >Login</Button>
          }
          
          <span className="text-sm">Don't have an account? <Link to="/signUp" className="text-blue-600">SignUp</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;
