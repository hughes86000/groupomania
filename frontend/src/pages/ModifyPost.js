import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Banner from "../components/Banner";

const ModifyPost = () => {

    const user = JSON.parse(localStorage.getItem('productCart'));
    const userId = user.userId;
    const url = window.location.pathname;
    const postId = url.split('/')[2];
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [postImgInput, setPostImgInput] = useState('');
    const [imgPostFile, setImgPostFile] = useState();
    const [postData, setPostData] = useState('');
    const [userData, setUserData] = useState('');
    const [isAdmin, setIsAdmin] = useState('');

    useEffect(() => {
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

                setUserData(res.data);
                setIsAdmin(res.data.isAdmin);

            })
            .catch((err) => {
                console.log(err);
            });

    }, [user.token, userId]);



    // API call for post information
    useEffect(() => {
        axios({
            method: "get", url: `http://localhost:4000/api/post/${postId}`, credentials: true,

            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((res) => {

                setPostData(res.data);


            })
            .catch((err) => {
                console.log(err);
            });

    }, [postId, user.token], );


    // Call API for modify post
    const modifyPost = (e) => {
        e.preventDefault();


        const formData = new FormData();


        formData.append("description", e.target.description.value);
        formData.append("imagePost", imgPostFile);
        


        axios.put(`http://localhost:4000/api/post/${postData._id}`, formData, {headers: {'Authorization': `Bearer ${user.token}`}})
            .then((res) => {

                console.log(res);
                navigate('/');

            })
            .catch((err) => {
                console.log(err);
            });


    };

    // For listen input file
    const handleImg = (e) => {
        e.preventDefault();
        setPostImgInput(e.target.value);
        setImgPostFile(e.target.files[0]);
    };

    // For delete post
    const deletePost = (e) => {
        e.preventDefault();

        axios.delete(`http://localhost:4000/api/post/${postData._id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            },

            data: {
                isAdmin
            }
        })
            .then((res) => {
                navigate('/')


            })
            .catch((error) => {
                console.error(error);
            });




    };


    return (

        <>
            <Banner/>

            <main className="div-create-post"   style={{padding: "55px 0"}}>
                <div className="create-post" aria-label="Créer un post">
                    <label htmlFor="description" className="create-post-label">Modifier votre post :</label>
                    <img src={postData.imageUrl} alt="" style={{width: "100%", marginBottom: "30px"}}/>
                    <form onSubmit={(e) => modifyPost(e)} encType="multipart/form-data">
                        <div className="create-post-redaction">
                            <textarea maxLength="500" className="create-post-input" rows="7" cols="5"
                                      id="description"
                                      name="description"
                                      onChange={(e) => setDescription(e.target.value)}
                                      defaultValue={postData.description}/>
                        </div>
                        {/*<button className="create-post-button" type="file">*/}

                        {/*    <i className="fa-regular fa-image"></i>*/}
                        {/*    <p className="create-post-footer-text">Photo</p>*/}

                        {/*</button>*/}
                        {/*<button className="create-post-button">*/}

                        {/*    <i className="fa-brands fa-youtube"></i>*/}
                        {/*    <p className="create-post-footer-text">Vidéo</p>*/}

                        {/*</button>*/}
                        <label className="modify-post-input-label" htmlFor="imagePost">Changer d'image :</label>

                        <input type="file" name="imagePost" id="imagePost"
                               accept="image/png, image/jpeg, image/jpg, image/gif" onChange={handleImg}
                               value={postImgInput} className="create-post-input-file"/>


                        <div className="modify-post-footer">

                            <button className="create-post-button" type="submit">

                                <i className="fa-solid fa-share"></i>
                                <p className="create-post-footer-text" aria-label="Publier votre poste">Publier</p>

                            </button>

                            <button className="create-post-button">

                                <p className="create-post-footer-text" aria-label="Supprimer votre poste"
                                   onClick={deletePost}>Supprimer</p>

                            </button>
                        </div>


                    </form>
                </div>
            </main>
        </>

    );
};

export default ModifyPost;