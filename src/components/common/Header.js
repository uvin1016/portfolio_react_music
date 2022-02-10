import {NavLink} from 'react-router-dom';

function Header(){
    return (
        <header>
            <div className="inner">
                <h1><NavLink exact to="/">UFOLIO</NavLink></h1>
            </div>
        </header>
    )
}

export default Header;