import Icon from './Icon';
import CreateFactForm from './CreateFactForm';
import Button from './ui/Button';
import Modal from './ui/Modal';

function Header() {
  return (
    <header className='font-sono-extra-bold grid w-full grid-cols-2 gap-5'>
      <Icon />

      <Modal>
        <Modal.Open modalId='create-fact'>
          <Button className='justify-self-end px-5'>Share a fact</Button>
        </Modal.Open>

        <Modal.Window modalId='create-fact' title='Share a fact'>
          <CreateFactForm />
        </Modal.Window>
      </Modal>
    </header>
  );
}

export default Header;
