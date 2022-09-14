import { FC } from "react";
import { SearchBox } from "react-instantsearch-hooks-web";
import { useParams } from "react-router-dom";

export const SearchPage: FC = () => {
    const params = useParams();
    console.log(params);
    return (
        <div>
            <SearchBox></SearchBox>
        </div>
    );
};
