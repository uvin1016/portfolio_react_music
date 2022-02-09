import {NavLink} from 'react-router-dom';

function Header(){
    let active = {color: "white"};

    return (
        <header>
            <div className="inner">
                <h1><NavLink exact to="/">UFOLIO</NavLink></h1>
                <NavLink activeStyle={active} to="/chat">Chat</NavLink>
            </div>
        </header>
    )
}

export default Header;