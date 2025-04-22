import { useNavigate, useLocation } from "react-router-dom";
import { PUBLIC_MENU } from "../constantes";

export const usePublicHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleClientSpace = () => {
        navigate('/auth/login');
    };

    const isActiveRoute = (path: string) => {
        return location.pathname === path;
    };

    return {
        menuItems: PUBLIC_MENU,
        isActiveRoute,
        handleNavigate,
        handleLogoClick,
        handleClientSpace
    };
}; 