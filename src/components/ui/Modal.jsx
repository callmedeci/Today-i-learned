import { CircleX } from 'lucide-react';
import { cloneElement, createContext, use, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

const ModalContext = createContext();

function Modal({ children }) {
  const [modal, setModal] = useState(null);

  const close = () => setModal('');
  const open = setModal;

  return (
    <ModalContext.Provider value={{ open, close, modal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = use(ModalContext);

  if (!context) throw new Error('useModalContext used outside its provider');

  return context;
}

function Overlay({ children }) {
  return (
    <div className='fixed top-0 right-0 h-full w-full p-3 backdrop-blur-md md:p-5'>
      {children}
    </div>
  );
}

function Open({ children, modalId }) {
  const { open } = useModalContext();

  return cloneElement(children, { onClick: () => open(modalId) });
}

function Window({ children, modalId, title }) {
  const { close, modal } = useModalContext();

  if (modal !== modalId) return null;

  return createPortal(
    <Overlay>
      <section className='relative mx-auto w-full max-w-4xl rounded-lg bg-neutral-700 p-5 shadow md:p-7'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='font-sono-extra-bold text-2xl uppercase'> {title}</h3>

          <Button
            icon={<CircleX className='size-7' />}
            variant='danger'
            onClick={close}
          ></Button>
        </div>

        {children}
      </section>
    </Overlay>,
    document.body,
  );
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
