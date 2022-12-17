import Head from "next/head";

import _ from "lodash";

import BottomNavigation from "@/components/BottomNavigation";
import Scaffold from "@/components/Scaffold";
import { MdAdd, MdPersonOutline } from "react-icons/md";
import { useEffect, useState } from "react";

export default function AccountList() {
    const [user, setUser] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/user');
            const result = await response.json()
            setUser(result)
        }
        fetchData()
    }, [])


    return (
        <>
            <Head>
                <title>User List</title>
            </Head>
            {/* Header */}
            <Scaffold title="User List" />
            <div className="container my-10 mx-auto px-7 sm:px-0 flex gap-3 flex-col">
                {
                    user.map((i, n) =>
                        <div key={i.id} className="flex items-center gap-5 bg-white shadow-md p-6">
                            <div className="text-5xl bg-[#C4C4C4] text-white rounded-full w-fit p-3">
                                <MdPersonOutline />
                            </div>
                            <div>
                                <div className="text-xl font-semibold">
                                    {i.firstname} {i.lastname}
                                </div>
                                <div className="text-xs opacity-60">
                                    {i.email}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <BottomNavigation>
                {/* Dummy FAB */}
                <div className="absolute -translate-y-full -top-10 right-10 shadow-xl bg-primary w-16 h-16 rounded-full z-50 flex items-center justify-center text-white text-5xl">
                    <MdAdd />
                </div>
            </BottomNavigation>
        </>
    )
}

