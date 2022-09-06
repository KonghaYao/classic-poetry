import { FC } from "react";
import { NavLink } from "react-router-dom";

export const Home: FC = () => {
    return (
        <div>
            <NavLink to={`/lunyu`}>论语</NavLink>
            <NavLink to={`/sishuwujing`}>四书五经</NavLink>
        </div>
    );
};
