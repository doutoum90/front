import { PUBLIC_MENU, ADDRESS, PHONE, MAIL, SOCIAL_MEDIA, COPYRIGHT, OTHER_LINKS } from '../constantes';

export const usePublicFooter = () => {
    const handleEmailClick = (email: string) => {
        window.location.href = `mailto:${email}`;
    };

    return {
        menuItems: PUBLIC_MENU,
        address: ADDRESS,
        phone: PHONE,
        email: MAIL,
        socialMedia: SOCIAL_MEDIA,
        copyright: COPYRIGHT,
        otherLinks: OTHER_LINKS,
        handleEmailClick
    };
}; 