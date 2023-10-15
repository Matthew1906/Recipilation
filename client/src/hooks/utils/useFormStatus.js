import { useContext } from 'react';
import { FormStatusContext } from '../../contexts';

const useFormStatus = () => {
  const context = useContext(FormStatusContext);
  return context;
};

export default useFormStatus;