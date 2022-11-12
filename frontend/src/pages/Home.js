///// Page d'accueil, on y liste tous les postes /////

import Banner from "../components/Banner";
import PostList from "../components/PostList";
import {Navigate} from "react-router-dom"

const Home = () => {
    let user = JSON.parse(localStorage.getItem('productCart'));



    return (
        user ?
        <div>
            <Banner/>
            <div className="loadingbg">
                <div className="loader"></div>
            </div>
            <PostList/>
        </div>
            : <Navigate to="/signin" replace={true}/>

    );

};

export default Home;


