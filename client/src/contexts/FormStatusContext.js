import { createContext, useState } from "react";
import { errorMessages } from "../utils/data";

export const FormStatusContext = createContext();
  
export function FormStatusProvider({ children }) {
  const [ status, setStatus ] = useState(false);
  const displayFormError = (message) => setStatus(errorMessages[message])
  const resetFormError = () => setStatus(false);
  return (
    <FormStatusContext.Provider value={{status, displayFormError, resetFormError}}>
      {children}
    </FormStatusContext.Provider>
  );
};