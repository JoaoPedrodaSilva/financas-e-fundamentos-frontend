import { FaInstagram, FaFacebookSquare, FaLinkedin, FaYoutube, FaSpotify } from "react-icons/fa"


export const CommunityPage = () => (
    <section className='h-full flex flex-col justify-center items-center gap-4 px-5 lg:px-20'>
        <h1 className='text-white text-2xl sm:text-3xl lg:text-4xl self-center text-center mb-6 sm:mb-12'>
            Junte-se a nossa comunidade!
        </h1>
        <div className="flex flex-wrap gap-7 justify-center items-center text-4xl lg:text-5xl text-white">
            <a className="basis-1/5" href="https://www.instagram.com/financasefundamentos/" target='_blank' rel='noreferrer'>
                <FaInstagram />
            </a>
            <a className="basis-1/5" href="https://www.facebook.com/financasefundamentos" target='_blank' rel='noreferrer'>
                <FaFacebookSquare />
            </a>
            <a className="basis-1/5" href="https://www.linkedin.com/company/financasefundamentos" target='_blank' rel='noreferrer'>
                <FaLinkedin />
            </a>
            <a className="basis-1/5" href="https://www.youtube.com/channel/UCA23qmZxZI2ghbVTQGOvs5w" target='_blank' rel='noreferrer'>
                <FaYoutube />
            </a>
            <a className="basis-1/5" href="https://open.spotify.com/show/1j2CtvGwUbg3Ggfo3ihjk8" target='_blank' rel='noreferrer'>
                <FaSpotify />
            </a>
        </div>
    </section>
)