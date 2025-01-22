import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem"

function Home() {
  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-r from-pink-300 via-orange-300 to-yellow-200 flex justify-center items-center py-10">
        <div className="max-w-7xl flex flex-col items-center text-center">
          <h2 className="text-9xl font-gelasio text-white mb-4">Olá!</h2>
          <p className="text-3xl font-instrument-serif text-white mb-6">Expresse aqui seus pensamentos e opiniões</p>
          
          <ModalPostagem />


        </div>


        <div className="max-w-7xl flex flex-col items-center mt-6">
          <img
            src="https://ik.imagekit.io/machadofatima/Blog%20Pessoal/blog_home.svg?updatedAt=1737471099611"
            alt="Imagem da Página Home"
            width="700px"
          />
        </div>
      </div>

      <ListaPostagens />


    </>
  );
}

export default Home;
