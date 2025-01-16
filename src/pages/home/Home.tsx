function Home() {
    return (
        <>
            <div className="w-screen h-screen bg-gradient-to-r from-pink-300 via-orange-300 to-yellow-200 flex justify-center items-center py-10">
                <div className="max-w-7xl flex flex-col items-center text-center">
                    <h2 className="text-5xl font-extrabold text-white mb-4">Seja Bem Vinde!</h2>
                    <p className="text-xl text-white mb-6">Expresse aqui seus pensamentos e opiniões</p>
                </div>

                <div className="max-w-7xl flex flex-col items-center mt-6">
                    <img
                        src="https://ik.imagekit.io/machadofatima/Projeto%20Portfolio/index_blog.webp?updatedAt=1736982390508"
                        alt="Imagem da Página Home"
                        width="400px"
                    />
                </div>
            </div>
        </>
    );
}

export default Home;
