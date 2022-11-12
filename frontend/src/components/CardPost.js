import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const CardPost = ({post}) => {

    const navigate = useNavigate();
    // On récupère token et userId du localStorage
    const user = JSON.parse(localStorage.getItem('productCart'));
    const userId = user.userId;
    const [id, setId] = useState('');
    const [isAdmin, setIsAdmin] = useState()
    const [liked, setLiked] = useState(post.usersLiked.includes(userId));
    const [numberLike, setNumberLike] = useState(post.usersLiked.length);

    // Call api for userId
    useEffect(() => {
        setLiked(post.usersLiked.includes(userId))
        axios({
            method: "get", url: "http://localhost:4000/api/auth", credentials: true,

            headers: {
                'Authorization': `Bearer ${user.token}`
            },

            params: {
                userId
            }
        })
            .then((res) => {
                setId(res.data._id);
                setIsAdmin(res.data.isAdmin);


            })
            .catch((err) => {
                console.log(err);
            });

    }, [user.token, userId]);


    // Like a post
    const like = () => {


        fetch("http://localhost:4000/api/post/like", {
            method: "post", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`

            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                like: 1, userId: id, id: post._id

            })
        })
            .then((res) => {

                setLiked(true);
                setNumberLike(numberLike + 1);


            })
            .catch((err) => {
                console.log(err);
            });


    };
    // dislike a post
    const dislike = () => {

        fetch("http://localhost:4000/api/post/like", {
            method: "post", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`

            },

            body: JSON.stringify({
                like: 0, userId: id, id: post._id

            })
        })
            .then((res) => {
                setLiked(false);
                console.log(res);
                setNumberLike(numberLike - 1);


            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Redirection to modify product
    const modifyProduct = () => {
        navigate(`/product/${post._id}`);
    };

    // On transforme la date renvoyer par mongoDB
    const d = post.updatedAt;
    const date = Array.from(d);
    const Date = date[0] + date[1] + date[2] + date[3] + date[4] + date[5] + date[6] + date[7] + date[8] + date[9] + '-' + date[11] + date[12] + date[13] + date[14] + date[15];


    return (

        <>
        <article className="card-post">
            <div className="card-header">
                <p className="card-name">{post.nom} {post.prenom}</p>
                <p className="card-date">{Date}</p>
            </div>
            <img src={post.imageUrl} alt="" className="card-img"/>
            <p className="card-text">{post.description}</p>
            <div className="card-logo">

                {/*if user like post*/}
                {liked === true && (<button className="card-post-button-like" aria-label="button for dislike"><i
                    className="fa-regular fa-heart like" onClick={dislike}></i></button>)}
                {/*/!*if user dislike post*!/*/}
                {liked === false && (<button className="card-post-button-like" aria-label="button for like"><i
                    className="fa-regular fa-heart" onClick={like}></i></button>)}

                {/*<button className="card-post-button-like" aria-label="button for comment"><i*/}
                {/*    className="fa-regular fa-comment"></i></button>*/}
                {/*<button className="card-post-button-like" aria-label="button retweet"><i*/}
                {/*    className="fa-solid fa-retweet "></i></button>*/}


                {/*if post was created by user or if user isAdmin*/}
                {id === post.userId && (<button className="modify-button" onClick={modifyProduct}>Modifier</button>) ||
                isAdmin && (<button className="modify-button" onClick={modifyProduct}>Modifier</button>)}


            </div>
            {/*if post.userLiked.length === 0*/}
            {numberLike === 0 && (<p className="card-post-number-like">{numberLike} like</p>)}
            {/*if post.userLiked.length === 1*/}
            {numberLike === 1 && (<p className="card-post-number-like">{numberLike} like</p>)}
            {/*if post.userLiked.length > 1*/}
            {numberLike > 1 && (<p className="card-post-number-like">{numberLike} likes</p>)}




        </article>
        </>
    );
};

export default CardPost;