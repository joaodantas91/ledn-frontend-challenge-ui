import { QueryClient, QueryClientProvider } from 'react-query';
import DataExample from './DataExample';
import Screen from './components/Screen';
import Main from './components/Main';
import './global.css';
import {
  Link,
  Outlet,
} from "react-router-dom";
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { Languages } from './types/Languages';


const initialState = {
  language: '', 
  setLanguage: (() => {}) as Dispatch<SetStateAction<Languages>>
};

export const LanguageContext = createContext(initialState);

const App = () => {
  const queryClient = new QueryClient();

  
  

  const [language, setLanguage] = useState<Languages>(Languages.galacticBasic);

  


  return  (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={{language, setLanguage}}>

      
        <Main className={language}>
          <DataExample />
          <Screen>
            <div className='content'>
              <Outlet/>
            </div>
          </Screen>
          
        </Main>
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
