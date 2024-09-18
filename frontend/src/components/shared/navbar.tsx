import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SVGProps, SetStateAction } from "react";
import { JSX } from "react/jsx-runtime";
import { ModeToggle } from "./mode-toggle";

export function Navbar({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}) {
  console.log(isLoggedIn);

  const navigate = useNavigate();
  // const nav = () => { navigate("/login-register") }
  const login = () => {
    navigate("/login");
  };
  const register = () => {
    navigate("/register");
  };

  const logout = async () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login-register");
  };

  const handleSmoothScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
      {/* <div className="w-[150px]">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <MountainIcon className="h-6 w-6" />
          <span>logo</span>
        </Link>
      </div> */}
      <nav className="flex items-center justify-center flex-1 gap-6 text-sm font-medium">
        <Link
          to="/dashboard"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
        >
          Cours
        </Link>
        <Link
          to="/Teaches-biopilate"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
        >
          Formations{" "}
        </Link>
        <a
          href="#footer"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          onClick={handleSmoothScroll}
        >
          Blog
        </a>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        {isLoggedIn ? (
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        ) : (
          <div>
            <Button variant="default" onClick={login}>
              Login
            </Button>{" "}
            <Button variant="default" onClick={register}>
              Register
            </Button>
          </div>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}

function MountainIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
