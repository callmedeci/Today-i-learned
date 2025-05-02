import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Input from './Input';

function PasswordToggleInput(props) {
  const [inputType, setInputType] = useState('password');

  function handleShowPassword() {
    setInputType('text');
  }

  function handleHidePassword() {
    setInputType('password');
  }

  return (
    <Input
      {...props}
      className='flex-row-reverse'
      type={inputType}
      icon={
        <span className='cursor-pointer'>
          {inputType === 'password' ? (
            <Eye
              className='size-4 md:size-6 xl:size-7'
              onClick={handleShowPassword}
            />
          ) : (
            <EyeOff
              className='size-4 md:size-6 xl:size-7'
              onClick={handleHidePassword}
            />
          )}
        </span>
      }
    />
  );
}

export default PasswordToggleInput;
