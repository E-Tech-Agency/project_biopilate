import { LoginForm } from "@/components/auth/login";
import { RegisterForm } from "@/components/auth/register";
import { Separator } from "@/components/ui/separator";
import { SetStateAction } from "react";

const LogReg = ({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<SetStateAction<boolean>> }) => {
    return (
        <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                Sign Up or Sign In
            </h1>
            <div className="flex flex-row items-center justify-center h-screen gap-9">
                <RegisterForm setIsLoggedIn={setIsLoggedIn} />
                <Separator orientation="vertical" className="h-1/2" />
                <LoginForm setIsLoggedIn={setIsLoggedIn} />
            </div>
        </div>
    )
}

export default LogReg