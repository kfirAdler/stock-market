import React from 'react';
import { Button } from 'primereact/button';

interface CancelBtnProps {
    text: string;
}

const CancelBtn: React.FC<CancelBtnProps> = ({ text }) => {
    return (
        <Button
            label={text}
            icon="pi pi-times" // 'pi pi-times' is the PrimeReact class for the times (X) icon
            iconPos="right"
            className="p-button-danger"
        />
    );
};

export default CancelBtn;