import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import GenericBtn from '../../Buttons/GenericBtn';



const Home: React.FC = () => {
    const [animate, setAnimate] = useState(true);

    useEffect(() => {
        setAnimate(false);
    }, []);


    return (
        <div className={`${styles.homeContainer} ${animate ? styles.animate : ''}`}>
            <h1 className={styles.title}>Personal Stock Market</h1>
            <GenericBtn href="/personal" text="Go To PSM" color="light-purple" icon="pi-arrow-right" />
        </div>
    );
};

export default Home;
