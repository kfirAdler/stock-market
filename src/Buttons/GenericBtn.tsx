import React from 'react';
import { Button } from 'primereact/button';

interface GenericBtnProps {
    text: string;
    color: string;
    icon: string;
    href: string;
}

const GenericBtn: React.FC<GenericBtnProps> = ({ text, color, icon, href }) => {
    return (
        <a href={href} className="p-button-link">
            <Button
                label={text}
                icon={`pi ${icon}`} // Assuming icons are from PrimeIcons, adjust if necessary
                iconPos="right"
                className={`p-button-${color}`}
            />
        </a>
    );
};

export default GenericBtn;
