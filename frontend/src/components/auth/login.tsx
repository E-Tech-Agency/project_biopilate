
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
        <>
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                    {error && <li className="text-red-500">{error}</li>}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            value={data.email}
                            onChange={(e) => setData({...data, email: e.target.value})}
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Button onClick={()=>setDialogOpen(true)} variant={"link"} className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </Button>
                        </div>
                        <Input id="password" type="password" required value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </div>
                </form>
            </CardContent>
        </Card>
        <Dialog open={dialogOpen}>
                <DialogOverlay />
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Password reset</DialogTitle>
                        <DialogDescription>
                            Please enter email to reset your password
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleForgotPassword}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="code" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    className="col-span-3"
                                    required
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit"> submit</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
