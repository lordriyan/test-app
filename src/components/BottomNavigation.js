import Link from "next/link";
import { useRouter } from "next/router";
import { MdAddShoppingCart, MdOutlineHome, MdPersonOutline } from "react-icons/md";

export default function BottomNavigation({ children }) {
    const router = useRouter()

    return <div className="fixed bottom-0 left-0 w-screen">
        <div className="relative container flex justify-around mx-auto px-7 py-5 sm:px-0 shadow-[0_-8px_30px_-20px_rgba(0,0,0,0.6)] bg-white z-50">
            {
                [
                    {
                        icon: <MdOutlineHome />,
                        name: "Home",
                        path: "/"
                    },
                    {
                        icon: <MdAddShoppingCart />,
                        name: "Cart",
                        path: ""
                    },
                    {
                        icon: <MdPersonOutline />,
                        name: "Account",
                        path: "/user"
                    }
                ].map((i, n) =>
                    <Link href={i.path} key={i.name}>
                        <div className={`flex flex-col items-center justify-center ${router.asPath == i.path ? 'text-primary' : ''} cursor-pointer`}>
                            <div className="text-4xl">
                                {i.icon}
                            </div>
                            <div>
                                {i.name}
                            </div>
                        </div>
                    </Link>
                )
            }
            {children}
        </div>
    </div>
}