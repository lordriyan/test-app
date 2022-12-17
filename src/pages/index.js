import Head from "next/head";
import Image from "next/image";

import _ from "lodash";

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import { withSessionSsr } from "@/lib/withSession";
import BottomNavigation from "@/components/BottomNavigation";
import Scaffold from "@/components/Scaffold";

export default function Home({ user }) {

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            {/* Header */}
            <Scaffold />
            {/* Carousel */}
            <div className="container mx-auto p-7 sm:p-0 rounded overflow-clip">
                <Splide aria-label="My Favorite Images">
                    <SplideSlide>
                        <div className="relative w-full pb-[40%]">
                            <Image src="https://picsum.photos/548/275" fill style={{ objectFit: "cover" }} alt="Image 1" />
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="relative w-full pb-[40%]">
                            <Image src="https://picsum.photos/548/274" fill style={{ objectFit: "cover" }} alt="Image 2" />
                        </div>
                    </SplideSlide>
                </Splide>
            </div>
            {/* Group Button */}
            <div className="container mx-auto px-7 sm:p-0 flex gap-3 sm:my-5 flex-wrap">
                {
                    [
                        {
                            icon: "card_giftcard_24pxsad.svg",
                            name: "Material"
                        },
                        {
                            icon: "build_24px_outlined.svg",
                            name: "Tools"
                        },
                        {
                            icon: "perm_data_setting_24px_outlined.svg",
                            name: "Fitting"
                        },
                        {
                            icon: "view_carousel_24px.svg",
                            name: "Ceramics"
                        },
                        {
                            icon: "layers_24px_outlined.svg",
                            name: "Acrylic"
                        },
                        {
                            icon: "category_24px.svg",
                            name: "Other"
                        },
                    ].map((i, n) =>
                        <div key={n} className="bg-[#F1F1F1] w-1/4 sm:w-1/12 flex-grow py-5 flex flex-col justify-center items-center gap-2 rounded">
                            <div className="relative w-10 h-10">
                                <Image src={`/assets/${i.icon}`} alt={i.name} fill style={{ objectPosition: "center" }} />
                            </div>
                            <div className="text-sm text-primary">
                                {i.name}
                            </div>
                        </div>
                    )
                }
            </div>
            <BottomNavigation />
        </>
    )
}

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session;

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
