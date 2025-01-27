import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem";

function Home() {
  return (
    <>
      <div className="w-screen h-screen bg-[#EFECE5] flex justify-center items-center py-10 border-b-2 border-[#917C78]">
        <div className="max-w-7xl flex flex-col items-center text-center">
          <h2 className="text-9xl font-gelasio text-[#594A42] mb-4">Olá!</h2>
          <p className="text-2xl font-gelasio text-[#2F2D2C] mb-6">Expresse aqui seus pensamentos e opiniões</p>

          <div className="flex justify-around gap-4">
            <ModalPostagem />
          </div>
        </div>

        <div className="max-w-7xl flex flex-col items-center mt-6">
          <img
            src="https://ik.imagekit.io/machadofatima/Blog%20Pessoal/Typing-bro.svg?updatedAt=1737758666233"
            alt="Imagem da Página Home"
            width="400px"
          />
        </div>
      </div>

      <ListaPostagens />
    </>
  );
}

export default Home;
