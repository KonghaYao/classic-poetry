import { createContext } from "react";
import { InnerObjectType } from "./CommonBook";
export type BookContextType = {
    books: InnerObjectType[];
    matched: InnerObjectType;
    root: string;
};
export const BookContext = createContext<BookContextType>(undefined as any);
