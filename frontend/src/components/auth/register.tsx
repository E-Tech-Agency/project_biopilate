import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { LogRegError } from "@/types/types";
import { Switch } from "../ui/switch";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogOverlay,
    DialogFooter,
    DialogDescription,
} from "../ui/dialog";
import { AlertDialog } from "../ui/alert-dialog";
import { AlertDialogAfterRegister } from "./alert-dialog";

export function RegisterForm({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<SetStateAction<boolean>> }) {
    const navigate = useNavigate();
    const [verifyCode, setVerifyCode] = useState({
        otp: "",
    });
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        is_supplier: false
    });
    const [alert, setAlert] = useState<boolean>(false);
    const [error, setError] = useState<LogRegError>();
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = initializeGoogleLogin;
            document.body.appendChild(script);
        };

        const initializeGoogleLogin = () => {
            google.accounts.id.initialize({
                client_id: '84824279187-i984iquv2b83e4gf9b5jort0p770v21g.apps.googleusercontent.com',
                callback: handleLoginWithGoogle,
            });
            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                { text: "continue_with", width: "350px", shape: "circle", size: "large", theme: "outline" }
            );
        };

        loadGoogleScript();
    }, []);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data.password !== data.confirm_password) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const res = await axios.post('http://localhost:8000/api/register/', data);
            setData({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                confirm_password: "",
                is_supplier: false
            })
            toast.success(res.data.message);
            setDialogOpen(true);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errors: LogRegError = err.response?.data;
                setError({
                    first_name: errors.first_name,
                    last_name: errors.last_name,
                    email: errors.email,
                    password: errors.password,
                    confirm_password: errors.confirm_password,
                });
            }
        }
    }
    const handleLoginWithGoogle = async (response)=>{
        console.log("id_token", response)
        const payload = {
            access_token: response.credential,
            is_supplier: data.is_supplier
        }
       try {
        const server_res = await  axios.post('http://localhost:8000/api/google/', payload);
        console.log(server_res.data);
        
        localStorage.setItem('token', server_res.data.access_token);
        localStorage.setItem('refresh_token', server_res.data.refresh_token);
        localStorage.setItem('is_supplier', server_res.data.is_supplier);
        localStorage.setItem('is_supperuser', server_res.data.is_supplier);
        setIsLoggedIn(true);
        navigate('/dashboard');
       } catch (error) {
        console.log(error);
        
       }
    }
    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.loading("Verifying...");
        try {
            const res = await axios.post('http://localhost:8000/api/verify/', verifyCode);
            toast.dismiss();
            toast.success(res.data.message);
            setDialogOpen(false);
            setAlert(true);
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                const errors = err.response?.data;
                toast.error(errors.message);
            }
        }
    }
    return (
        <>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    {error?.first_name && <p className="text-red-500">{error.first_name[0]}</p>}
                                    <Input id="first-name" placeholder="Max" required value={data.first_name} onChange={(e) => setData({ ...data, first_name: e.target.value })} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="last-name">Last name</Label>
                                    {error?.last_name && <p className="text-red-500">{error.last_name[0]}</p>}
                                    <Input id="last-name" placeholder="Robinson" required value={data.last_name} onChange={(e) => setData({ ...data, last_name: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                {error?.email && <li className="text-red-500">{error.email[0]}</li>}
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                {error?.password && <li className="text-red-500">{error.password[0]}</li>}
                                <Input id="password" type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Confirm Password</Label>
                                {error?.confirm_password && <li className="text-red-500">{error.confirm_password[0]}</li>}
                                <Input id="password" type="password" value={data.confirm_password} onChange={(e) => setData({ ...data, confirm_password: e.target.value })} />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="supplier-checked" defaultChecked={data.is_supplier} onCheckedChange={(checked) => setData({ ...data, is_supplier: checked })} />
                                <Label htmlFor="supplier-checked">Are you a supplier? <br /> <div className="text-sm text-pretty text-inherit text-start">if you are a supplier, check this box even if you signup with google</div></Label>
                            </div>
                            <Button type="submit" className="w-full">
                                Create an account
                            </Button>
                            
                            <div id="signInDiv" className='w-full'></div>
                            
                            
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Dialog open={dialogOpen} onOpenChange={(open) => open && setDialogOpen(true)}>
                <DialogOverlay />
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Verification code</DialogTitle>
                        <DialogDescription>
                            Please enter the verification code sent to your email
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleVerify}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="code" className="text-right">
                                    Code :
                                </Label>
                                <Input
                                    id="code"
                                    className="col-span-3"
                                    required
                                    value={verifyCode.otp}
                                    onChange={(e) => setVerifyCode({ ...verifyCode, otp: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit"> submit</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <AlertDialog open={alert}>
                <AlertDialogAfterRegister setAlert={setAlert} />
            </AlertDialog>
        </>
    );
}
