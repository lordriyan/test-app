import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
    return <>
        <Head>
            <link rel="shortcut icon" href="/assets/favicon.png" type="image/x-icon" />
        </Head>
        <Component {...pageProps} />
    </>
}
