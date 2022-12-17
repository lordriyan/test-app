import Head from "next/head";

import _ from "lodash";

import { withSessionSsr } from "@/lib/withSession";
import BottomNavigation from "@/components/BottomNavigation";
import Scaffold from "@/components/Scaffold";
import { MdPersonOutline } from "react-icons/md";

export default function Account({ user }) {

    return (
        <>
            <Head>
                <title>My Account</title>
            </Head>
            {/* Header */}
            <Scaffold title="My Account" />
            <div className="flex items-center justify-center flex-col">
                <div className="text-9xl my-8 bg-[#C4C4C4] text-white rounded-full w-fit p-5">
                    <MdPersonOutline />
                </div>
                <div className="text-xl">
                    { user.firstname } { user.lastname }
                </div>
                <div className="text-xs opacity-50">
                    { user.email }
                </div>
            </div>
            <BottomNavigation />
        </>
    )
}

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req }) {
        const { user } = req.session;

        // Check if user's session exist, redirect if not
        if (_.isEmpty(user)) return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }

        return {
            props: {
                user
            }
        }

    }
)
