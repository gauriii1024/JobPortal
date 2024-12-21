import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2, User2Icon, LogOut } from "lucide-react";
import { Button } from "../button";
import Jobs from "@/components/Jobs";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {user} = useSelector(store => store.auth)
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          {/* <li><Link>Home</Link></li>
            <li><Link>Jobs</Link></li>
            <li><Link>Browse</Link></li> */}

          <ul className="flex font-medium items-center gap-5">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/browse">Browse</Link></li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
                <Link to="/login"><Button variant="outline">Login</Button></Link>
                <Link to="/signUp"><Button className="bg-[#6A38C2] hover:bg-[#5624ab]">SignUp</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Gauri Mernstack</h4>
                      <p className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button variant="link">Logout</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
