import React from 'react';
import { Button } from 'primereact/button';

interface ApproveBtnProps {
    text: string;
}

const ApproveBtn: React.FC<ApproveBtnProps> = ({ text }) => {
    return (
        <Button
            label={text}
            icon="pi pi-check" // 'pi pi-check' is the PrimeReact class for the checkmark icon
            iconPos="right"
            className="p-button-success"
        />
    );
};

export default ApproveBtn;
