export const Rodape = () => (
    <footer className="flex flex-col sm:flex-row justify-center items-center gap-0 sm:gap-10 w-full text-xs lg:text-sm text-white px-5 lg:px-20 pb-1 pt-3 bg-gray-800">
        <p>
            &copy;Copyright. Finanças e Fundamentos - {new Date().getFullYear()}
        </p>
        <a href="https://joaopedrodeveloper.com" target='_blank' rel='noreferrer'>
            Desenvolvido por João Pedro Web Developer
        </a>
    </footer>
)
