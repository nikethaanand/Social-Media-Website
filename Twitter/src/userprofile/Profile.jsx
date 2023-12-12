
import React from 'react'
import Topbar from '../Navbar/topBar';
import Twitterprofilephoto from '../assets/Twitterprofilephoto.png';

export default function Profile() {
    return (<>
    


    <Topbar />

    <img src={Twitterprofilephoto} alt="Logo" className="Twitter-logo" />
    </>
        );
    }