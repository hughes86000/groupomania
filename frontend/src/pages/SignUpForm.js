//Formulaire d'inscription

import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import logo from "../assets/images/icon-left-font-monochrome-white.png";
import {useNavigate} from "react-router-dom";


const SignUpForm = () => {

    const navigate = useNavigate();

    //Contrôle des champs du formulaire
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    //Contrôle de la sécurité du password
    const [passwordCheck, setPasswordCheck] = useState('');

    //Regex pour le controle du password
    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    let testPassword = strongRegex.test(password);

    // Fonction contrôle du formulaire et création d'un utilisateur
    const handleLogin = (e) => {
        e.preventDefault();

        // On vérifie que tous les champs ne soit pas vides
        if (nom === "" || prenom === "" || password === "" || email === "") {
            alert("Pensez à bien remplir tous les champs du formulaire 😉");


            // On teste la sécurité du password
        } else if (!testPassword) {
            alert("Le mot de passe doit comprendre 8 caractères dont deux chiffre, sans espaces. Ainsi qu'une lettre majuscule et minuscule.");
        }
        // On teste la confirmation du password
        else if (passwordCheck !== password) {
            alert('Veuillez confirmer votre mot de passe');

            // Si tout est bon on fait envoie nos informations à la base de donnée
        } else {

            fetch("http://localhost:4000/api/auth/signup", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    nom,
                    prenom,
                    email,
                    password
                }),


            })
                .then((res) => {
                    if (res.status === 201) {
                    alert('Vous allez être redirigé vers la page de connexion ')
                        navigate('/signin')
                    }else {
                        alert('Adresse mail non valide ou déja utilisée')
                    }



                })
                .catch((err) => {
                    console.log(err);
                });
    }}




// On retourne le rendu HTML
return (


    <main className="card-login position-signup">
        <div className="banner">
            <img src={logo} alt="Logo groupomania" className="logo"/>
        </div>

        <p className="text-logo">Renforcer votre esprit d'équipe </p>


        <div className="form-login" style={{height: '1000px'}}>
            <p className="title">INSCRIPTION</p>
            {/*On passe la fonction handleLogin au submit du formulaire,
                pour envoyer toutes les donnés à l'API*/}
            <form action="" onSubmit={handleLogin}>
                {/*On écoute tous les champs*/}
                <input type="text" placeholder="Nom" aria-label="Veuillez renseigner votre nom" onChange={(e) => setNom(e.target.value)}
                       value={nom}/>
                <br/>
                <input type="text" placeholder="Prénom" aria-label="Veuillez renseigner votre prénom" onChange={(e) => setPrenom(e.target.value)}
                       value={prenom}/>

                <br/>

                <input type="email" placeholder="Email" aria-label="Veuillez renseigner votre email" onChange={(e) => setEmail(e.target.value)}
                       value={email}/>
                <br/>
                <input type="password" placeholder="Mot de passe" aria-label="Veuillez renseigner votre mot de passe" onChange={(e) => setPassword(e.target.value)}
                       value={password} />
                <input type="password" placeholder="Confirmer votre mot de passe" aria-label="Veuillez confirmer votre mot de passe"
                       onChange={(e) => setPasswordCheck(e.target.value)}
                       value={passwordCheck}/>
                <br/>
                <button type="submit"> S'INSCRIRE</button>
                <p className="txt-password">Votre mot de passe doit comporter au moins 8 caractères, dont au moins
                    une majuscule, une minuscule, et deux chiffres.
                </p>
                <hr className="police-separator"/>
                <p>Vous avez déjà un compte ?</p>
                <NavLink to="/signin">
                    <button aria-label="Redirection vers la page de connexion">SE CONNECTER</button>
                </NavLink>

            </form>
        </div>
    </main>

);
}
;

export default SignUpForm;