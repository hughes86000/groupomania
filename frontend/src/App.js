import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import ModifyPost from "./pages/ModifyPost";
import MyPost from "./pages/MyPost";


const App = () => {
    // On crée notre variable pour useContext

    return (// On passe ses paramètres à chaque composant



            <BrowserRouter>
                <Routes>

                    <Route path="/signin" element={<SignInForm/>}/>
                    <Route path="/signup" element={<SignUpForm/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/product/:id" element={<ModifyPost/>}/>
                    <Route path="/mypost" element={<MyPost/>}/>

                </Routes>
            </BrowserRouter>

    );
};

export default App;

