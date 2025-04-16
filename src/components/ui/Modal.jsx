import { CircleX } from 'lucide-react';
import { AnimatePresence, motion as m } from 'motion/react';
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
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className='fixed top-0 right-0 h-full w-full p-3 backdrop-blur-md md:p-5'
    >
      {children}
    </m.div>
  );
}

function Open({ children, modalId }) {
  const { open } = useModalContext();

  return cloneElement(children, { onClick: () => open(modalId) });
}

function Window({ children, modalId, title, titleIcon }) {
  const { close, modal } = useModalContext();

  return createPortal(
    <AnimatePresence>
      {modal === modalId && (
        <Overlay>
          <m.section
            key={modalId}
            exit={{ opacity: 0, y: 30 }}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.2 }}
            className='relative mx-auto w-full max-w-4xl rounded-lg bg-neutral-700 p-5 shadow md:p-7'
          >
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='font-sono-extra-bold flex items-center gap-1 text-2xl text-neutral-300 uppercase'>
                {titleIcon}
                {title}
              </h3>

              <Button
                icon={<CircleX className='size-7' />}
                variant='danger'
                onClick={close}
              ></Button>
            </div>

            {children}
          </m.section>
        </Overlay>
      )}
    </AnimatePresence>,
    document.body,
  );
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
