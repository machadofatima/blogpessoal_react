import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const { handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        alert('O Usuário foi desconectado com sucesso!')
        navigate('/')
    }
    
    return (
        <>
            <div className='w-full flex justify-center py-4 bg-pink-400 text-white'>

                <div className='container flex justify-between font-roboto text-lg'>
                    <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>
                    
                    <div className='flex gap-4'>
                        Postagens
                         <span className="text-gray-400"> | </span>
                        <Link to='/temas' className='hover:underline'>Temas</Link>
                         <span className="text-gray-400"> | </span>
                        Cadastrar tema
                         <span className="text-gray-400"> | </span>
                        Perfil
	                     <span className="text-gray-400"> | </span>
                        <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar