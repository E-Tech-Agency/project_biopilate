import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [visible, setVisible] = useState({ password: false, confirm: false });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password !== data.confirm_password) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await axios.patch(
        `http://localhost:8000/api/set_new_password/`,
        data
      );
      toast.success(res.data.message);
      toast.info("Essayez de vous connecter avec votre nouveau mot de passe.");
      nav("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleVisibility = (field: "password" | "confirm") => {
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Réinitialiser le mot de passe</CardTitle>
            <CardDescription>
              Entrez votre nouveau mot de passe ci-dessous pour réinitialiser votre mot de passe.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-6">
              {/* Mot de passe */}
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative w-full">
                <Input
                  id="password"
                  type={visible.password ? "text" : "password"}
                  required
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  className="bg-gray-50 border border-marron font-lato text-gray-900 text-sm sm:text-base block w-full p-2.5 pr-12"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center px-3 bg-gray-100 border-l border-marron text-gray-800 text-lg cursor-pointer hover:bg-gray-200 transition duration-150 ease-in-out"
                  onClick={() => toggleVisibility("password")}
                >
                  {visible.password ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              {/* Confirmer le mot de passe */}
              <Label htmlFor="confirm_password">Confirmer le mot de passe</Label>
              <div className="relative w-full">
                <Input
                  id="confirm_password"
                  type={visible.confirm ? "text" : "password"}
                  required
                  value={data.confirm_password}
                  onChange={(e) => setData({ ...data, confirm_password: e.target.value })}
                  className="bg-gray-50 border border-marron font-lato text-gray-900 text-sm sm:text-base block w-full p-2.5 pr-12"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center px-3 bg-gray-100 border-l border-marron text-gray-800 text-lg cursor-pointer hover:bg-gray-200 transition duration-150 ease-in-out"
                  onClick={() => toggleVisibility("confirm")}
                >
                  {visible.confirm ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              {/* Error message */}
              {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Changer le mot de passe
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
