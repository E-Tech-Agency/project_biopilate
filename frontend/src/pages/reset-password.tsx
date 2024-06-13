import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { toast } from "sonner";

export function ResetPassword() {
    const nav = useNavigate();
    const { id, token } = useParams();
    const [data, setData] = useState({
        id: id,
        token: token,
        password: "",
        confirm_password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data.password !== data.confirm_password) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await axios.patch(`http://localhost:8000/api/set_new_password/`, data)
            toast.success(res.data.message);
            toast.info("Try login in with new password");
            nav("/login-register");
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleSubmit}>
            <Card className="w-full max-w-sm ">
                <CardHeader>
                    <CardTitle className="text-2xl">Reset password</CardTitle>
                    <CardDescription>
                        Enter your new password below to reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">password</Label>
                        <Input id="password" type="password" required value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                    </div>
                    <div className="grid gap-2">

                        <Label htmlFor="confirm password">Confirm password</Label>
                        {error && <li className="text-red-500">{error}</li>}
                        <Input id="password" type="password" required value={data.confirm_password} onChange={(e) => setData({ ...data, confirm_password: e.target.value })} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit">Change password</Button>
                </CardFooter>
            </Card>
            </form>
        </div>
    )
}