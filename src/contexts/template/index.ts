import { createContext } from 'react';
import { TemplateContextType } from './template.type';

const TemplateContext = createContext<TemplateContextType>({});

const TemplateContextProvider = TemplateContext.Provider;

export { TemplateContext, TemplateContextProvider };
