import { Boxes, Notebook } from 'lucide-react';
import CreateFactForm from './CreateFactForm';
import Icon from './Icon';
import Button from './ui/Button';
import Modal from './ui/Modal';

function Header() {
  return (
    <header className='font-sono-extra-bold grid w-full grid-cols-2 gap-5'>
      <Icon />

      <Modal>
        <Modal.Open modalId='create-fact'>
          <Button icon={<Boxes />} className='justify-self-end'>
            Share a fact
          </Button>
        </Modal.Open>

        <Modal.Window
          modalId='create-fact'
          title='Share a fact'
          titleIcon={<Notebook className='size-4 md:size-6 xl:size-7' />}
        >
          <CreateFactForm />
        </Modal.Window>
      </Modal>
    </header>
  );
}

export default Header;
