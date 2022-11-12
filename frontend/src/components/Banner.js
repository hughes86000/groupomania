
import React from 'react';
import logo from "../assets/images/icon-left-font-monochrome-white.png";
import {useNavigate} from "react-router-dom";





const Banner = () => {

    const navigate = useNavigate()
    // On supprime le localstorage pour déconnecter l'utilisateur
    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('productCart')
        navigate('/signin')
    }
    // On redirige vers la page principale
    const news = (e) => {
        e.preventDefault()
        navigate('/')
    }
    // On redirige vers la page ou les posts de l'utilisateur sont afficher
    const myPosts = (e) => {
        e.preventDefault()
        navigate('/mypost')
    }


    return (
        <header>
        <div className="banner">
            <img src={logo} alt="Logo groupomania" className="logo"/>

        </div>
            <nav className="button-div">
            <div className="disconnect-icon" onClick={logout}>
                <button className="button-banner">Déconnexion</button>
            </div>
            <div className="disconnect-icon" onClick={news}>
                <button className="button-banner">Fil d'actualité</button>
            </div>
                <div className="disconnect-icon" onClick={myPosts}>
                    <button className="button-banner">Mes postes</button>
                </div>
            </nav>
    </header>

    );
};

export default Banner;