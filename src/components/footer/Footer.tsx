import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import { ReactNode, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


function Footer() {
    const data = new Date().getFullYear();
    const { usuario } = useContext(AuthContext);

    let component: ReactNode = null; 

    if (usuario.token !== "") {
        component = (
            <div className="flex justify-center bg-[#594A42] text-[#DED7D2]">
                <div className="container flex flex-col items-center py-4">
                    <p className="text-l font-bold">
                        Fátima Machado | Blog Pessoal | Copyright: {data}
                    </p>
                    <p className="text-l">Acesse nossas redes sociais</p>
                    <div className="flex gap-2">
                        <a
                            href="https://www.linkedin.com/in/machadofatima"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkedinLogo fill="currentColor" size={48} weight="duotone" />
                        </a>
                        <a
                            href="https://github.com/machadofatima/blogpessoal_react"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GithubLogo fill="currentColor" size={48} weight="duotone" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return <>{component}</>;
}

export default Footer;
