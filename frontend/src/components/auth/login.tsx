
import { toast } from "sonner";
import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogOverlay,
    DialogFooter,
    DialogDescription,
} from "../ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { LuPhone } from "react-icons/lu";
import login_pic from "../../assets/images/login-pic.jpg";

export function LoginForm({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<SetStateAction<boolean>> }) {
    const nav = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [data,setData] = useState({
        email: "",
        password: ""
    })
    const [error,setError] = useState<string | null>(null)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/login/', data)
            localStorage.setItem('token',res.data.access_token);
            localStorage.setItem('refresh_token',res.data.refresh_token);
            localStorage.setItem('is_supplier',res.data.is_supplier);
            localStorage.setItem('is_superuser',res.data.is_superuser);
            setIsLoggedIn(true);
            nav("/dashboard");
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errors = error.response?.data;
                setError(errors.detail);
            }
        }
    }
    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/password_reset/', {email: data.email})
            toast.success(res.data.message);
            toast.info("Check your email for password reset instructions");
            setDialogOpen(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errors = error.response?.data;
                setError(errors.detail);
            }
        }
    }
    return (
        // <>
        // <Card className="mx-auto max-w-sm">
        //     <CardHeader>
        //         <CardTitle className="text-2xl">Login</CardTitle>
        //         <CardDescription>
        //             Enter your email below to login to your account
        //         </CardDescription>
        //     </CardHeader>
        //     <CardContent>
        //         <form onSubmit={handleSubmit}>
        //         <div className="grid gap-4">
        //             {error && <li className="text-red-500">{error}</li>}
        //             <div className="grid gap-2">
        //                 <Label htmlFor="email">Email</Label>
        //                 <Input
        //                     id="email"
        //                     type="email"
        //                     placeholder="m@example.com"
        //                     required
        //                     value={data.email}
        //                     onChange={(e) => setData({...data, email: e.target.value})}
        //                 />
        //             </div>
        //             <div className="grid gap-2">
        //                 <div className="flex items-center">
        //                     <Label htmlFor="password">Password</Label>
        //                     <Button onClick={()=>setDialogOpen(true)} variant={"link"} className="ml-auto inline-block text-sm underline">
        //                         Forgot your password?
        //                     </Button>
        //                 </div>
        //                 <Input id="password" type="password" required value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
        //             </div>
        //             <Button type="submit" className="w-full">
        //                 Login
        //             </Button>
        //         </div>
        //         </form>
        //     </CardContent>
        // </Card>
        // <Dialog open={dialogOpen}>
        //         <DialogOverlay />
        //         <DialogContent className="sm:max-w-[425px]">
        //             <DialogHeader>
        //                 <DialogTitle>Password reset</DialogTitle>
        //                 <DialogDescription>
        //                     Please enter email to reset your password
        //                 </DialogDescription>
        //             </DialogHeader>
        //             <form onSubmit={handleForgotPassword}>
        //                 <div className="grid gap-4 py-4">
        //                     <div className="grid grid-cols-4 items-center gap-4">
        //                         <Label htmlFor="code" className="text-right">
        //                             Email
        //                         </Label>
        //                         <Input
        //                             id="email"
        //                             className="col-span-3"
        //                             required
        //                             type="email"
        //                             value={data.email}
        //                             onChange={(e) => setData({ ...data, email: e.target.value })}
                                    
        //                         />
        //                     </div>
        //                 </div>
        //                 <DialogFooter>
        //                     <Button type="submit"> submit</Button>
        //                 </DialogFooter>
        //             </form>
        //         </DialogContent>
        // </Dialog>
        // </>
        <div className="relative flex justify-evenly items-center min-h-[700px] bg-white">
            <button className="absolute top-0 left-0 w-12 h-12 rounded-full bg-marron flex justify-center items-center mt-8 ml-8 z-10">
                <FaArrowLeftLong className="text-bgColor text-xl" />
            </button>
            <div className="w-[50%]"><img src={login_pic} alt="" className="h-full object-cover" /></div>
            <div className="py-8 px-4 sm:px-8 text-gray-950 font-ebGaramond bg-white bg-opacity-50 rounded-[20px] w-full max-w-md xl:max-w-lg flex flex-grow min-w-[300px] mx-auto">
        
            <form className="w-full">
            <div className="mb-5">
          <label    
            className="block font-ebGaramond text-sm sm:text-xl font-bold mb-2"
            htmlFor="name"
          >
            Nom et prénom
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-50 text-gray-500 text-lg">
              <FaRegUser />
            </span>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-marron border-l-0 text-gray-900 text-sm sm:text-base rounded-none rounded-r-md block w-full p-2.5"
              required
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            className="block font-ebGaramond text-sm sm:text-xl font-bold mb-2"
            htmlFor="email"
          >
            Adresse Email
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-50 text-gray-500 text-lg">
              <HiOutlineEnvelope />
            </span>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-marron border-l-0 text-gray-900 text-sm sm:text-base rounded-none rounded-r-md block w-full p-2.5"
              required
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            className="block font-ebGaramond text-sm sm:text-xl font-bold mb-2"
            htmlFor="phone"
          >
            Numéro de téléphone
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-50 text-gray-500 text-lg">
              <LuPhone />
            </span>
            <input
              type="number"
              id="phone"
              className="bg-gray-50 border border-marron border-l-0 text-gray-900 text-sm sm:text-base rounded-none rounded-r-md block w-full p-2.5"
              required
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            className="block font-ebGaramond text-sm sm:text-xl font-bold mb-2"
            htmlFor="subject"
          >
            Objet
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="subject"
              className="bg-gray-50 border border-marron text-gray-900 text-sm sm:text-base rounded-md block w-full p-2.5"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="reserver-button flex mx-auto mb-3 flex-col justify-center items-center text-base sm:text-lg font-bold rounded-lg w-full py-2 sm:py-3 bg-bgColor text-marron"
        >
          Envoyer
        </button>
      </form>
    </div>
        </div>
    )
}
