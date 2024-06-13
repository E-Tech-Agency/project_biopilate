import img from "@/assets/hero_img.jpg"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { SVGProps } from "react"

export default function Hero() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-16 lg:py-20 container mx-auto px-4 md:px-6">
            <div className="order-2 md:order-1">
                <img
                    src={img}
                    alt="Product Image"
                    width={600}
                    height={600}
                    className="w-full rounded-lg overflow-hidden"
                />
            </div>
            <div className="order-1 md:order-2 space-y-4">
                <div className="flex items-center gap-2">
                    <Link to="#" className="flex items-center gap-2 font-semibold" >
                        <Package2Icon className="h-6 w-6" />
                        <span className="text-2xl">Boumendil</span>
                    </Link>
                    <Badge variant="secondary" className="hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                        Products
                    </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">PremiumProducts</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-[500px]">
                    Elevate your style with our premium products. From high-quality fabrics to premium
                </p>
            </div>
        </section>
    )
}

function Package2Icon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
        </svg>
    )
}