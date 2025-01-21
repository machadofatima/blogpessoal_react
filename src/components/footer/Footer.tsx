import { FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'

function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-pink-600 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-l font-bold'>
                            Fátima Machado | Blog Pessoal | Copyright: {data}
                        </p>
                    <p className='text-l'>Acesse nossas redes sociais</p>
                    <div className='flex gap-2'>
                        <LinkedinLogo size={40} weight='bold' />
                        <InstagramLogo size={40} weight='bold' />
                        <FacebookLogo size={40} weight='bold' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer