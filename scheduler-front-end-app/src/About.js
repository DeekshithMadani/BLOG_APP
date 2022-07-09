import React from 'react';
import {Link} from 'react-router-dom';

const About = () => {
    return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"80vh",flexDirection:"column"}}>
        <h2>A simple Blog Application</h2>
        <br/>
        <Link to='/dashboard'>Back to Dashboard</Link>
    </div>
}

export default About;