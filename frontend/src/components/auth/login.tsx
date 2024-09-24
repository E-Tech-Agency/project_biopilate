import { toast } from "sonner";
import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import login_pic from "@/assets/images/login-pic.jpg";
import "@/styles/index.css";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog"; // Ensure these are imported correctly
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

interface PasswordHideProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export function LoginForm({
  setIsLoggedIn,
}: {
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const register = () => {
    navigate("/register");
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login/", data);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      localStorage.setItem("is_supplier", res.data.is_supplier);
      localStorage.setItem("is_superuser", res.data.is_superuser);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data;
        setError(errors.detail);
      }
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/password_reset/",
        { email: data.email }
      );
      toast.success(res.data.message);
      toast.info("Check your email for password reset instructions");
      setDialogOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data;
        setError(errors.detail);
      }
    }
  };

  const [visible, setVisible] = useState(false);

  const PasswordHide = ({ visible, setVisible }: PasswordHideProps) => {
    return (
      <div onClick={() => setVisible(!visible)}>
        {visible ? <FaEyeSlash /> : <FaEye />}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white w-[100vw]">
        <div className="w-full relative flex max-md:flex-wrap justify-evenly items-start sm:items-center min-h-[650px] ">
          {/* back button */}
          <Link
            to="/"
            className="absolute top-0 left-0 w-12 h-12 rounded-full bg-marron flex justify-center items-center mt-8 ml-8 z-10"
          >
            <FaArrowLeftLong className="text-bgColor text-xl" />
          </Link>

          <div className="md:w-[50%] max-md:absolute max-md:z-[1] tr">
            <img
              src={login_pic}
              alt=""
              className="h-[350px] sm:h-[650px] object-cover"
            />
          </div>
          <div className="py-8 px-4 sm:px-8 text-gray-950 font-ebGaramond bg-white sm:bg-opacity-80 rounded-[20px] w-full max-w-md xl:max-w-lg flex flex-grow flex-col min-w-[290px] mx-4 sm:mx-auto max-sm:my-auto z-[1] max-sm:shadow-lg max-sm:mt-64">
            <div className="mb-6">
              <h1 className="text-marron text-3xl sm:text-6xl font-bold">
                Bienvenue
              </h1>
              <p className="text-sm sm:text-lg my-2 font-lato">
                Vous devez être connecté pour accéder à votre espace.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="w-full">
              {error && <li className="text-red-500">{error}</li>}
              <div className="mb-5">
                <label
                  className="block text-sm sm:text-xl font-bold mb-2"
                  htmlFor="email"
                >
                  Adresse Email
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-50 text-gray-800 text-lg">
                    <HiOutlineEnvelope />
                  </span>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-marron border-l-0 font-lato text-gray-900 text-sm sm:text-base rounded-none rounded-r-md block w-full p-2.5"
                    required
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="mb-5">
                <label
                  className="block text-sm sm:text-xl font-bold mb-2"
                  htmlFor="password"
                >
                  Mot de passe
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-100 text-gray-500 text-lg">
                    <FaLock />
                  </span>
                  <input
                    id="password"
                    type={visible ? "text" : "password"}
                    required
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    className="bg-gray-50 border border-marron border-r-0 font-lato text-gray-900 text-sm sm:text-base block w-full p-2.5"
                  />
                  <div className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-marron bg-gray-100 text-gray-800 text-lg cursor-pointer hover:bg-gray-200 transition duration-150 ease-in-out">
                    <PasswordHide visible={visible} setVisible={setVisible} />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap justify-between ">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded-sm text-marron focus:ring-0 focus:ring-marron"
                    />
                    <span className="ml-2 font-lato text-sm sm:text-base">
                      Se souvenir de moi
                    </span>
                  </label>

                  <Button
                    onClick={() => setDialogOpen(true)}
                    variant={"link"}
                    className="ml-auto pr-0 text-gray-800 text-base font-lato font-medium underline"
                  >
                    Mot de passe oublié ?
                  </Button>
                </div>
              </div>
              <button
                type="submit"
                className="reserver-button flex mx-auto mb-3 flex-col justify-center items-center text-sm sm:text-base font-bold font-lato rounded-lg w-full py-2 sm:py-3 bg-bgColor text-marron"
              >
                Connexion
              </button>
              <div className="mt-4 flex flex-wrap justify-between">
                <div className="flex items-center gap-2">
                  <p className="font-lato text-sm sm:text-base">
                    Vous n’avez pas de compte ?
                  </p>
                </div>
                <Button
                  onClick={register}
                  variant={"link"}
                  className="ml-auto pr-0 text-gray-800 text-base font-lato font-medium underline"
                >
                  Créer un compte
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Dialog for password reset */}
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
  );
}
