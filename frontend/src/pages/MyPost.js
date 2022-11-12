import React, {useEffect, useState} from 'react';
import axios from "axios";
import Banner from "../components/Banner";
import CardPost from "../components/CardPost";

const MyPost = () => {

    const user = JSON.parse(localStorage.getItem('productCart'));
    const userId = user.userId;
    const [posts, setPosts] = useState([]);

    // Call API pour récupérer tous les postes
    useEffect(() => {
        axios.get('http://localhost:4000/api/post', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((res) => {
                setPosts(res.data);


            })
            .catch((error) => {
                console.error(error);
            });

    }, [user.token]);

    let userPost = posts.filter(post => {
        return post.userId === userId
    })


    return (
        userPost.length > 0 ?
        <>
            <div className="loadingbg">
                <div className="loader"></div>
            </div>
            <nav>
            <Banner/>
            </nav>


            <main style={{backgroundColor: "#f7f7fc", padding: "50px 0 150px 0"}}>
                    {userPost.slice().reverse().map((post, index) => (<CardPost key={index} post={post}/>))}
            </main>

        </>
    :
            <>
                <div className="loadingbg">
                    <div className="loader"></div>
                </div>
            <Banner/>
                <div className="div">
                <div className="mypost-div">
                <h2 className="mypost-text">Vous n'avez pas encore publié de poste, présentez vous à vos collègues pour faire plus ample connaissance !</h2>
                </div>
                </div>
            </>
    );
};

export default MyPost;

