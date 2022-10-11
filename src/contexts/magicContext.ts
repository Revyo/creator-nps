import { createContext } from 'react';

// interface ContextType {
//   user: {
//     name: string;
//     email: string;
//     isLoggedIn: boolean;
//   };
//   auth: {
//     loginWithMagicLink: (name: string, email: string) => any;
//   };
// }

export const magicContext = createContext<any>({
  user: { name: '', email: '', isLoggedIn: false },
  auth: { loginWithMagicLink: Function },
});
