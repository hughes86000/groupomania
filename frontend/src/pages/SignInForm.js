//// Formulaire de connexion /////

import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/icon-left-font-monochrome-white.png";
import {useNavigate} from "react-router-dom";


const SignInForm = () => {

    //Écoute des champs du formulaire
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();


    //Call API for connect user
    const handleLogin = (e) => {

        e.preventDefault();
        //On vérifie que les champs ne soient pas vides
        if (password === "" || email === "") {
            alert("Pensez à bien remplir le champ email et mot de passe 😉");
            // On envoie l'email et le password a la DB
        } else {

            axios({
                method: "post", url: 'http://localhost:4000/api/auth/login', credentials: true, data: {
                    email, password
                },
            })
                .then((res) => {

                        // On stock le token et userId pour useContext
                        // On stock le token et userId dans le localstorage
                        localStorage.setItem("productCart", JSON.stringify(res.data));
                    alert('Connexion réussie');
                    navigate('/')



                })
                .catch((err) => {
                    alert("Paire identifiant/mot de passe incorrecte");
                });
        }

    };


    return (

        <main className="card-login position-signin">
            <div className="banner">
                <img src={logo} alt="Logo groupomania" className="logo"/>
            </div>
            <p className="text-logo">Renforcez votre esprit d'équipe </p>


            <div className="form-login">
                <p className="title">CONNEXION</p>
                {/*On passe la fonction qui contrôle et envoie les données à l'api*/}
                <form onSubmit={handleLogin}>
                    {/*On écoute les inputs*/}
                    <input type="text" placeholder="Email" autoComplete="username" aria-label="Veuillez renseignez votre adresse email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <br/>
                    <input type="password" placeholder="Mot de passe" aria-label="Veuillez renseignez votre mot de passe" onChange={(e) => setPassword(e.target.value)}
                           value={password} autoComplete="current-password"/>
                    <br/>
                    <button type="submit" aria-label="Connexion"> SE CONNECTER</button>
                    <p>Mot de passe oublié ?</p>
                    <hr className="police-separator"/>
                    <p>Pas encore de compte ?</p>
                    <NavLink to="/signup">
                        <button aria-label="Redirection vers la page d'inscription">S'INSCRIRE</button>
                    </NavLink>

                </form>
            </div>
        </main>);
};

export default SignInForm;