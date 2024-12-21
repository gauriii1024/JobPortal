import React from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const {loading} = useSelector(store=> store.auth);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullname: "",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  });
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name] : e.target.value});
  } 
  const changeFileHandler = (e) => {
    setInput({...input, file:e.target.files?.[0]});
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers:{
          "Content-type":"multipart/form-data"
        },
        withCredentials: true,
      });
      console.log("Response:", res); 
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        // Safely access error response message
        toast.error(error.response.data.message || "An error occurred.");
      } else {
        toast.error("Network error or server is not responding.");
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
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label> Full Name</Label>
            <Input type="text" 
            value={input.fullname}
            onChange={changeEventHandler}
            name="fullname"/>
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" placeholder="xyz@gmail.com" 
            value={input.email}
            onChange={changeEventHandler}
            name="email"/>
          </div>
          <div className="my-2">
            <Label>Phone No.</Label>
            <Input type="number" placeholder="" 
            value={input.phoneNumber}
            onChange={changeEventHandler}
            name="phoneNumber"/>
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" placeholder="" value={input.password}
            onChange={changeEventHandler}
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
            <div className='flex items-center gap-2'>
                <Label>Profile</Label>
                <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
                />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> </Button> :
            <Button type="submit" className="w-full my-4" >SignUp</Button>
          }          <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
