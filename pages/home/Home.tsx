function Home() {
    return (
        <>
            <div className="bg-gradient-to-r from-pink-300 via-orange-300 to-yellow-200 flex justify-center items-center h-screen">
                <div className="container grid grid-cols-2 text-white">

                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className="text-7xl font-diamond">Seja Bem-Vinde!</h2>
                        <p className="text-xl">Expresse aqui seus pensamentos e opiniões</p>

                        <div className="flex justify-around gap-4">
                            <div className="rounded text-white 
                                            border-white border-solid border-2 py-2 px-4"
                            >
                                Nova Postagem
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="https://ik.imagekit.io/machadofatima/Projeto%20Portfolio/index_blog.webp?updatedAt=1736982390508"
                            alt="Imagem da Página Home"
                            className="w-2/3"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
