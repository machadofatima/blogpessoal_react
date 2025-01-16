import { Link } from "react-router-dom" 

function Navbar() {
    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-pink-600 text-white'>
            
            <div className="container flex justify-between font-roboto text-lg">
                    <Link to="/home">Blog Pessoal</Link>
 
                    <div className='flex gap-4'>
                        Postagens 
                        <span className="text-gray-400"> | </span>
                        Temas
                        <span className="text-gray-500"> | </span>
                        Cadastrar Tema
                        <span className="text-gray-500"> | </span>
                        Perfil
                        <span className="text-gray-500"> | </span>
                        Sair
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default Navbar