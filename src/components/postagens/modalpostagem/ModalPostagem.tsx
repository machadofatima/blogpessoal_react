import Popup from 'reactjs-popup';
import FormPostagem from '../formpostagem/FormPostagem';

import 'reactjs-popup/dist/index.css';
import './ModalPostagem.css';

function ModalPostagem() {
  return (
    <>
      <Popup
        trigger={
          <button className="border rounded-2xl px-4 py-2 text-white bg-[#2F2D2C] hover:bg-[#92E3A9] hover:text-[#2F2D2C]">
            Nova Postagem
          </button>
        }
        modal>
        <FormPostagem />
      </Popup>
    </>
  );
}

export default ModalPostagem;