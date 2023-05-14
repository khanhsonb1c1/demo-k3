import { Link } from 'react-router-dom';


function TheHeader() {
    return (
        <header>
        {/* <h1>pandas</h1> */}
        <nav>
            {/* <a >Home page</a> */}
            <Link to={'/'}>Home page</Link>
            <Link to={'/'}>Tickets management</Link>
            <Link to={'/contact'}>Contact</Link>
            <Link to={'/about'}>About me</Link>
           
        </nav>
    </header>
    );
}

export default TheHeader;