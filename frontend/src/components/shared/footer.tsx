
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SVGProps } from "react"

export default function Footer() {
    return (
        <footer id="footer" className="bg-gray-900 text-gray-300 py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-start gap-4">
                    <Link to="#" className="flex items-center gap-2">
                        <BoltIcon className="h-6 w-6 text-primary" />
                        <span className="font-bold text-xl">Boumendil</span>
                    </Link>
                    <p className="text-sm">
                        Boumendil is a leading e-commerce platform offering a wide range of high-quality products.
                    </p>
                    <div className="flex gap-4">
                        <Link to="#" className="text-gray-400 hover:text-gray-300">
                            <FacebookIcon className="h-5 w-5" />
                        </Link>
                        <Link to="#" className="text-gray-400 hover:text-gray-300">
                            <TwitterIcon className="h-5 w-5" />
                        </Link>
                        <Link to="#" className="text-gray-400 hover:text-gray-300">
                            <InstagramIcon className="h-5 w-5" />
                        </Link>
                        <Link to="#" className="text-gray-400 hover:text-gray-300">
                            <LinkedinIcon className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div className="grid gap-2">
                        <h4 className="font-semibold text-gray-200">Quick Links</h4>
                        <Link to="/" className="text-sm hover:text-gray-300">
                            Home
                        </Link>
                        <Link to="/dashboard" className="text-sm hover:text-gray-300">
                            Products
                        </Link>
                        <Link to="#" className="text-sm hover:text-gray-300">
                            About
                        </Link>
                        <a href="mailto:Boumendil@gmail.com" className="text-sm hover:text-gray-300">
                            Contact
                        </a>
                    </div>
                    <div className="grid gap-2">
                        <h4 className="font-semibold text-gray-200">Information</h4>
                        <Link to="#" className="text-sm hover:text-gray-300">
                            Privacy Policy
                        </Link>
                        <Link to="#" className="text-sm hover:text-gray-300">
                            Terms of Service
                        </Link>
                        <Link to="#" className="text-sm hover:text-gray-300">
                            Shipping & Returns
                        </Link>
                        <Link to="#" className="text-sm hover:text-gray-300">
                            FAQs
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-4">
                    <h4 className="font-semibold text-gray-200">Subscribe to our newsletter</h4>
                    <p className="text-sm">Get the latest updates and exclusive offers delivered straight to your inbox.</p>
                    <form className="flex gap-2 w-full">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-gray-800 border-gray-700 text-gray-300 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                        />
                        <Button type="submit" className="bg-primary text-gray-900 hover:bg-primary/90">
                            Subscribe
                        </Button>
                    </form>
                </div>
            </div>
            <div className="container mx-auto px-4 md:px-6 mt-8 border-t border-gray-700 pt-8 flex items-center justify-between">
                <p className="text-sm">&copy; 2024 Boumendil. All rights reserved.</p>
                <div className="flex gap-4">
                    <Link to="#" className="text-sm hover:text-gray-300">
                        Privacy Policy
                    </Link>
                    <Link to="#" className="text-sm hover:text-gray-300">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    )
}

function BoltIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <circle cx="12" cy="12" r="4" />
        </svg>
    )
}


function FacebookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    )
}


function InstagramIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    )
}


function LinkedinIcon(props:JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    )
}


function TwitterIcon(props:JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    )
}