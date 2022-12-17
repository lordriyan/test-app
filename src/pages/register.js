import { withSessionSsr } from "@/lib/withSession";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import _ from "lodash"
import { useRouter } from 'next/router'
import ModalAlert from "@/components/ModalAlert";
import Scaffold from "@/components/Scaffold";


export default function Register() {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState(false)

    const handleRegister = async (event) => {
        event.preventDefault() // Disable default action

        setIsLoading(true) // Run button spinner animation

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: event.target.email.value,
                password: event.target.password.value,
                firstname: event.target.firstname.value,
                lastname: event.target.lastname.value,
                confirmpassword: event.target.confirmpassword.value
            }),
        })

        const result = await response.json()

        setIsLoading(false) // Stop button spinner animation

        if (result.ok) {
            setModal({
                title: "Congratulations !",
                message: "Registration is successful",
                button: <div onClick={() => {
                    setModal(false)
                    router.push('/')
                }} className="cursor-pointer border border-primary text-sm p-1 bg-primary text-white rounded text-center">Log in</div>
            }) // Show modal error
        }
        else {
            setModal({
                title: "Oops !",
                message: "Registration failed, Please check your data.",
                button: <div onClick={() => setModal(false)} className="cursor-pointer border border-red-600 text-sm p-1 bg-red-300 text-red-600 rounded text-center">Ok</div>
            }) // Show modal error

            // Clear the form
            event.target.email.value = "";
            event.target.password.value = "";
            event.target.firstname.value = "";
            event.target.lastname.value = "";
            event.target.confirmpassword.value = "";
        }
    }

    return (<>
        <Head>
            <title>Form Register</title>
        </Head>
        {/* Header */}
        <Scaffold title="Form Register" />
        <div className="flex justify-center items-center w-screen my-10">
            <div className="w-full sm:w-96 px-11">
                {/* Form */}
                <form onSubmit={handleRegister} className="flex flex-col">
                    <div className="flex flex-col gap-2 my-2">
                        <label htmlFor="firstname" className="text-[#666] text-xs">First Name</label>
                        <input id="firstname" type="text" name="firstname" className="border-[#A1A1A1] py-1.5 px-2 text-sm border rounded" />
                    </div>
                    <div className="flex flex-col gap-2 my-2">
                        <label htmlFor="lastname" className="text-[#666] text-xs">Last Name</label>
                        <input id="lastname" type="text" name="lastname" className="border-[#A1A1A1] py-1.5 px-2 text-sm border rounded" />
                    </div>
                    <div className="flex flex-col gap-2 my-2">
                        <label htmlFor="email" className="text-[#666] text-xs">Email</label>
                        <input id="email" type="email" name="email" className="border-[#A1A1A1] py-1.5 px-2 text-sm border rounded" />
                    </div>
                    <div className="flex flex-col gap-2 my-2">
                        <label htmlFor="password" className="text-[#666] text-xs">Password</label>
                        <input id="password" type="password" name="password" className="border-[#A1A1A1] py-1.5 px-2 text-sm border rounded" />
                    </div>
                    <div className="flex flex-col gap-2 my-2">
                        <label htmlFor="confirmpassword" className="text-[#666] text-xs">Confirm Password</label>
                        <input id="confirmpassword" type="password" name="confirmpassword" className="border-[#A1A1A1] py-1.5 px-2 text-sm border rounded" />
                    </div>
                    <div className="flex justify-between items-center mb-11 mt-4">
                        <button type="submit" className="w-full text-white bg-primary text-sm py-2.5 px-4 rounded text-center inline-flex items-center justify-center">
                            <div>
                                {
                                    isLoading && <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                }
                                {
                                    isLoading ? 'Loading...' : 'Register'
                                }
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <ModalAlert
            show={!_.isEmpty(modal)}
            title={modal.title}
            message={modal.message}
            button={modal.button}
        />
    </>
    )
}

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session;

        // Check if user's session exist, redirect if logged
        if (!_.isEmpty(user)) return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }

        return {
            props: {}
        }

    }
)
