import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdArrowBackIos, MdCancel, MdMenu, MdOutlineClose, MdOutlineSearch } from "react-icons/md";

export default function Scaffold({ title }) {
    const router = useRouter()
    const [menu, setMenu] = useState(false)

    const handleLogout = async () => {
        const responses = await fetch('/api/auth/logout')
        if (responses.ok) router.push('/login')
    }

    if (!_.isEmpty(title)) return <>
        <div className="container h-[60px] items-center sm:my-3 mx-auto px-7 sm:shadow-xl flex gap-3">
            {/* Menu Button */}
            <div className="flex justify-center items-center relative">
                <div onClick={() => router.back()} className="cursor-pointer opacity-70 hover:opacity-100 text-2xl">
                    <MdArrowBackIos />
                </div>
            </div>
            <div className="mr-10 font-bold text-center sm:text-left sm:mr-0 flex-grow">
                {title}
            </div>
        </div>
    </>

    return <>
        <div className="container sm:my-3 mx-auto px-7 sm:shadow-xl flex justify-between flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
                {/* Menu Button */}
                <div className="flex justify-center items-center relative">
                    <div onClick={() => setMenu(!menu)} className="cursor-pointer opacity-70 hover:opacity-100 text-2xl">
                        {
                            menu ? <MdOutlineClose />
                                : <MdMenu />
                        }
                    </div>
                    {/* Menu */}
                    {
                        menu &&
                        <div className="absolute bg-white px-2 border rounded top-8 left-0 z-50 shadow-xl whitespace-nowrap min-w-[136px]">
                            <div className="my-3 text-sm">
                                <Link href="/userlist" className="p-2 block cursor-pointer opacity-70 hover:opacity-100">
                                    User list
                                </Link>
                                <div className="p-2 block cursor-pointer opacity-70 hover:opacity-100" onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>
                            <div className="text-[8px] p-2">v 1.0.0</div>
                        </div>
                    }
                </div>
                {/* Logo */}
                <div className="mr-10 sm:mr-0 flex-grow sm:flex-grow-0 flex justify-center items-center">
                    <div className="relative w-[100px] h-[60px] scale-75">
                        <Image src={'/assets/Logo Apps.png'} fill alt="Logo App" />
                    </div>
                </div>
            </div>
            {/* Search Bar */}
            <div className="flex-grow flex items-center justify-end">
                <div className="w-full sm:w-1/2 relative text-[#6f6f6f]">
                    <input type="text" className="border bg-[#F1F1F1] rounded p-1 px-3 w-full" placeholder="Search" />
                    <div className="absolute right-0 top-0 m-2.5 flex gap-1 items-center">
                        <MdCancel />
                        <MdOutlineSearch />
                    </div>
                </div>
            </div>
        </div>
    </>
}