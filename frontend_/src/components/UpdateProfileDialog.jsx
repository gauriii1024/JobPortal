import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        fullname:user?.fullname,
        email:user?.email,
        phoneNumber: user?.phoneNumber,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills?.map(skill=> skill),
        file:user?.profile?.resume
    });

    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.targetvalue})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(input)
    }

    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        
        setInput({...input, file})
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData,{
                headers: {
                    'Content-Type' : 'multipart/form-data'
                },
                withCrediantials: true

            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast(error(error.response.data.message));
        }setOpen(false);
        console.log(input);
    }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" name="name"  type='text'
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" 
                className="text-right">
                  Email
                </Label>
                <Input id="email" name="email" type='email' 
                onChange={changeEventHandler} 
                value={input.email} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Number
                </Label>
                <Input id="number" name="number" 
                onChange={changeEventHandler}
                value={input.phoneNumber} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" 
                value={input.bio} className="text-right">
                  Bio
                </Label>
                <Input id="bio" name="bio" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" 
                value={input.skills} className="text-right">
                  Skills
                </Label>
                <Input id="skills" name="skills" 
                onChange={changeEventHandler}className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file"
                value={input.resume}  className="text-right">
                Resume
                </Label>
                <Input id="file" name="file" 
                type="file" className="col-span-3"
                accept="application/pdf" 
                onChange={fileChangeHandler}
                />
              </div>
            </div>
          </form>
          <DialogFooter>
          {
            loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> </Button> :
            <Button type="submit" className="w-full my-4" >Update Profile</Button>
          }
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default UpdateProfileDialog;