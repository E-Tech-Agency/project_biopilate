import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { SetStateAction, useEffect, useState } from "react";
import * as React from "react";
import axios from "axios";
import { toast } from "sonner";
import { LogRegError } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { AlertDialog } from "../ui/alert-dialog";
import { AlertDialogAfterRegister } from "./alert-dialog";
import { FaRegUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import { LuPhone } from "react-icons/lu";

import register_pic from "@/assets/images/register-pic.jpg";
import { Link } from "react-router-dom";
import "@/styles/index.css";
interface PasswordHideProps {
  visible: boolean;
  setVisible: (visible: boolean) => void; // Function to set the visibility state
}
// Declare the google object globally
declare global {
  interface Window {
    google: any;
  }
}

export function RegisterForm({
  setIsLoggedIn,
}: {
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };

  const [verifyCode, setVerifyCode] = useState({
    otp: "",
  });
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    is_supplier: false,
  });
  const [alert, setAlert] = useState<boolean>(false);
  const [error, setError] = useState<LogRegError>();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleLogin;
      document.body.appendChild(script);
    };

    const initializeGoogleLogin = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id:
            "84824279187-i984iquv2b83e4gf9b5jort0p770v21g.apps.googleusercontent.com",
          callback: handleLoginWithGoogle,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          {
            text: "continue_with",
            width: "100%",
            shape: "circle",
            size: "large",
            theme: "outline",
          }
        );
      }
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
      const res = await axios.post("http://141.94.23.119/api/register/", data);
      setData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: "",
        is_supplier: false,
      });
      toast.success(res.data.message);
      setDialogOpen(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errors: LogRegError = err.response?.data;
        setError({
          first_name: errors.first_name,
          last_name: errors.last_name,
          email: errors.email,
          phone_number: errors.phone_number,
          password: errors.password,
          confirm_password: errors.confirm_password,
        });
      }
    }
  };

  const handleLoginWithGoogle = async (response: any) => {
    console.log("id_token", response);
    const payload = {
      access_token: response.credential,
      is_supplier: data.is_supplier,
    };
    try {
      const server_res = await axios.post(
        "http://141.94.23.119/api/google/",
        payload
      );
      console.log(server_res.data);

      localStorage.setItem("token", server_res.data.access_token);
      localStorage.setItem("refresh_token", server_res.data.refresh_token);
      localStorage.setItem("is_supplier", server_res.data.is_supplier);
      localStorage.setItem("is_supperuser", server_res.data.is_supplier);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Verifying...");
    try {
      const res = await axios.post(
        "http://141.94.23.119/api/verify/",
        verifyCode
      );
      toast.dismiss();
      toast.success(res.data.message);
      setDialogOpen(false);
      setAlert(true);
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errors = err.response?.data;
        toast.error(errors.message);
      }
    }
  };
  const [visible, setVisible] = useState(false);

  const PasswordHide = ({ visible, setVisible }: PasswordHideProps) => {
    return (
      <div onClick={() => setVisible(!visible)}>
        {" "}
        {/* Wrap in an arrow function */}
        {visible ? <FaEyeSlash /> : <FaEye />}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white w-[100vw] h-[100vh] overflow-auto">
        <div className="w-full relative flex flex-row-reverse max-md:flex-wrap justify-evenly items-start sm:items-center min-h-[650px] h-full">
          {/* back button */}
          <Link
            to="/"
            className="absolute top-0 left-0 w-12 h-12 rounded-full bg-marron flex justify-center items-center mt-4 lg:mt-8 ml-4 lg:ml-8 z-10 tr"
          >
            <FaArrowLeftLong className="text-bgColor text-xl" />
          </Link>

          {/* image */}
          <div className="relative md:w-[50%] md:h-full  max-md:absolute tr">
            <img src={register_pic} alt="" className="md:h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 text-left  px-10 pb-20 z-10">
              <h1 className="text-base sm:text-lg md:text-2xl lg:text-5xl leading-normal text-white md:text-bgColor font-semibold font-ebGaramond mb-4">
                La forme physique, condition première du bonheur
              </h1>
              <h2 className="text-sm sm:text-base md:text-xl lg:text-4xl text-white mb-1">
                Joseph Hubertus Pilates
              </h2>
              <h3 className="text-xs sm:text-sm md:text-base lg:text-xl font-light text-white max-lg:mb-2 ">
                Inventeur de la méthode Pilates
              </h3>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black to-[70%] opacity-75 max-md:h-full " />
          </div>

          <div className="py-8 px-8 sm:px-8 text-gray-950 font-ebGaramond bg-white sm:bg-opacity-80 rounded-[20px] w-full h-[100vh] max-w-md xl:max-w-lg flex flex-grow flex-col min-w-[290px] mx-4 sm:mx-auto max-sm:my-auto z-30 max-sm:shadow-lg max-sm:mt-64 max-md:mt-44 max-lg:mt-20 tr">
            <div className="mb-6">
              <h1 className="text-marron text-3xl sm:text-6xl font-bold">
                Créer un compte
              </h1>
              <p className="text-sm sm:text-lg my-2 font-lato">
                Rejoignez la communauté Biopilates gratuitement
              </p>
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  className="block font-ebGaramond text-sm sm:text-xl font-bold mb-2"
                  htmlFor=" first_name"
                >
                  Nom et prénom
                </label>
                {error?.first_name && (
                  <p className="text-red-500">{error.first_name[0]}</p>
                )}
                {error?.last_name && (
                  <p className="text-red-500">{error.last_name[0]}</p>
                )}
                <div className="mt-1 flex space-x-2">
                  <div className="flex-grow flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-50 text-gray-500 text-lg">
                      <FaRegUser />
                    </span>
                    <input
                      type="text"
                      id=" first_name"
                      placeholder="Prénom"
                      value={data.first_name}
                      onChange={(e) =>
                        setData({ ...data, first_name: e.target.value })
                      }
                      className="bg-gray-50 border border-marron border-l-0 text-gray-900 text-sm sm:text-base rounded-none rounded-r-md block w-full p-2.5"
                    />
                  </div>
                  <div className="flex-grow flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-50 text-gray-500 text-lg">
                      <FaRegUser />
                    </span>
                    <input
                      id="last-name"
                      placeholder="Nom"
                      value={data.last_name}
                      onChange={(e) =>
                        setData({ ...data, last_name: e.target.value })
                      }
                      className="bg-gray-50 border border-marron border-l-0 text-gray-900 text-sm sm:text-base rounded-none rounded-r-md block w-full p-2.5"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label
                  className="block text-sm sm:text-xl font-bold mb-2"
                  htmlFor="email"
                >
                  Adresse Email
                </label>
                {error?.email && (
                  <p className="text-red-500">{error.email[0]}</p>
                )}
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-50 text-gray-800 text-lg">
                    <HiOutlineEnvelope />
                  </span>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-marron border-l-0 font-lato text-gray-900 text-sm sm:text-base rounded-none rounded-r-md block w-full p-2.5"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="mb-5">
                <label
                  className="block font-ebGaramond text-sm sm:text-xl font-bold mb-2"
                  htmlFor="phone_number"
                >
                  {error?.phone_number && (
                    <p className="text-red-500">{error.phone_number[0]}</p>
                  )}
                  Numéro de téléphone
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-50 text-gray-500 text-lg">
                    <LuPhone />
                  </span>
                  <input
                    type="number"
                    id="phone_number"
                    className="bg-gray-50 border border-marron border-l-0 text-gray-900 text-sm sm:text-base rounded-none rounded-r-md block w-full p-2.5"
                    value={data.phone_number}
                    onChange={(e) =>
                      setData({ ...data, phone_number: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="mb-5">
                <label
                  className="block text-sm sm:text-xl font-bold mb-2 text-gray-700"
                  htmlFor="password"
                >
                  Mot de passe
                </label>
                {error?.password && (
                  <li className="text-red-500 mb-1">{error.password[0]}</li>
                )}
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-100 text-gray-500 text-lg">
                    <FaLock />
                  </span>
                  <input
                    type={visible ? "text" : "password"} // Toggle between text and password
                    id="password"
                    className="bg-gray-100 border border-marron border-l-0 font-lato text-gray-900 text-sm sm:text-base block w-full p-2.5 transition duration-150 ease-in-out focus:outline-none focus:ring focus:ring-blue-500"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    placeholder="Entrez votre mot de passe"
                  />
                  <div className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-marron bg-gray-100 text-gray-800 text-lg cursor-pointer hover:bg-gray-200 transition duration-150 ease-in-out">
                    <PasswordHide visible={visible} setVisible={setVisible} />
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  className="block text-sm sm:text-xl font-bold mb-2 text-gray-700"
                  htmlFor="password"
                >
                  Confirmer le mot de passe
                </label>
                {error?.confirm_password && (
                  <li className="text-red-500">{error.confirm_password[0]}</li>
                )}
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-100 text-gray-500 text-lg">
                    <FaLock />
                  </span>
                  <input
                    type={visible ? "text" : "password"} // Toggle between text and password
                    id="password"
                    className="bg-gray-100 border border-marron border-l-0 font-lato text-gray-900 text-sm sm:text-base block w-full p-2.5 transition duration-150 ease-in-out focus:outline-none focus:ring focus:ring-blue-500"
                    value={data.confirm_password}
                    onChange={(e) =>
                      setData({ ...data, confirm_password: e.target.value })
                    }
                    placeholder="Entrez votre mot de passe"
                  />
                  <div className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-marron bg-gray-100 text-gray-800 text-lg cursor-pointer hover:bg-gray-200 transition duration-150 ease-in-out">
                    <PasswordHide visible={visible} setVisible={setVisible} />
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap justify-between ">
                <label className="inline-flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded-sm text-marron focus:ring-0 focus:ring-marron mt-1"
                  />

                  <span className="ml-2 font-lato text-sm sm:text-base">
                    J’accepte{" "}
                    <a href="" className="underline font-medium">
                      les conditions d’utilisation
                    </a>{" "}
                    et{" "}
                    <a href="" className="underline font-medium">
                      politique de confidentialité
                    </a>
                  </span>
                </label>
              </div>
              <div id="signInDiv" className="w-full rounded-lg"></div>
              <button
                type="submit"
                className="reserver-button flex mx-auto mb-2.5 flex-col justify-center items-center text-sm sm:text-base font-bold font-lato rounded-lg w-full py-2 sm:py-3 bg-bgColor text-marron"
              >
                Créer un compte
              </button>

              <div className="flex flex-wrap justify-between">
                <div className="flex items-center gap-2">
                  <p className="font-lato text-sm sm:text-base">
                    Vous avez déjà un compte ?
                  </p>
                </div>
                <Button
                  onClick={login}
                  variant={"link"}
                  className="ml-auto pr-0 text-gray-800 text-base font-lato font-medium underline"
                >
                  Se connecter
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => open && setDialogOpen(true)}
      >
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
                  onChange={(e) =>
                    setVerifyCode({ ...verifyCode, otp: e.target.value })
                  }
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
