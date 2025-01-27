import { ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }
    
    let component: ReactNode;

    if (usuario.token !== "") {

        component = (
            <div className='w-full flex justify-center py-4 bg-[#EFECE5] text-[#594A42] border-b-2 border-[#917C78]'> {/* Linha de borda abaixo da navbar */}
                <div className='container flex justify-between font-light font-instrument-sans text-lg'>
                    <Link to='/home' className="text-2xl font-geist font-normal text-[#594A42]">Blog Pessoal</Link>
                    
                    <div className='flex gap-4'>
                        <Link to='/postagens' className='hover:underline font-medium text-[#594A42]'>Postagens</Link> 
                        <span className="text-[#917C78]"> | </span>
                        <Link to='/temas' className='hover:underline font-medium text-[#594A42]'>Temas</Link> 
                        <span className="text-[#917C78]"> | </span>
                        <Link to='/cadastrartema' className='hover:underline font-medium text-[#594A42]'>Cadastrar tema</Link>
                        <span className="text-[#917C78]"> | </span>
                        <Link to='/perfil' className='hover:underline font-medium text-[#594A42]'>Perfil</Link> 
                        <span className="text-[#917C78]"> | </span>
                        <Link to='' onClick={logout} className='hover:underline font-medium text-[#594A42]'>Sair</Link>
                    </div>
                </div>
            </div>
        )

    }

    return (
        <>
        { component }
        </>
    )
}

export default Navbar;
