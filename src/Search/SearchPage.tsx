import { FC } from "react";
import { SearchBox } from "./SearchBox";
import { useParams } from "react-router-dom";

export const SearchPage: FC = () => {
    const params = useParams();
    console.log(params);
    return (
        <div>
            <SearchBox></SearchBox>
            <link
                href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite.css"
                rel="stylesheet"></link>
        </div>
    );
};
