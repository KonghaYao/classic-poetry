import { FC } from "react";
import { NavLink } from "react-router-dom";

export const Home: FC = () => {
    return (
        <div>
            <NavLink to={`/lunyu/index`}>论语</NavLink>
        </div>
    );
};
