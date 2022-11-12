import React, {useEffect, useState,} from 'react';
import axios from "axios";




const CreatePost = (props) => {
    const user = JSON.parse(localStorage.getItem('productCart'));
    const userId = user.userId;
    const [description, setDescription] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [id, setId] = useState('');

    const [postImgInput, setPostImgInput] = useState('');
    const [imgPostFile, setImgPostFile] = useState();




    // Call API for user information
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

                setNom(res.data.nom);
                setPrenom(res.data.prenom);
                setId(res.data._id);


            })
            .catch((err) => {
                console.log(err);
            });

    }, [user.token, userId]);


    // Call API for create post
    const Post = (e) => {
        e.preventDefault();
        console.log(e.target.description.value);


        if (description !== "") {


            const formData = new FormData();


            formData.append("userId", userId);
            formData.append("nom", nom);
            formData.append("prenom", prenom);
            formData.append("description", e.target.description.value);
            formData.append("imagePost", imgPostFile);



            axios.post("http://localhost:4000/api/post", formData, {headers: {'Authorization': `Bearer ${user.token}`}})
                .then((res) => {

                    console.log(res);
                    props.setPosts([...props.posts, res.data])
                    setDescription('')
                    setPostImgInput('')
                    setImgPostFile('')







                })
                .catch((err) => {
                    console.log(err);
                });

        } else {
            alert('Veuillez écrire du contenu dans votre poste');
        }

    };



    const handleImg = (e) => {
        e.preventDefault()
        setPostImgInput(e.target.value)
        setImgPostFile(e.target.files[0])
    };


    return(<>
            <main className="div-create-post">
                <div className="create-post" aria-label="Créer un post">
                    <h3>Quoi de neuf {nom} ?</h3>
                    <form onSubmit={(e) => Post(e)} encType="multipart/form-data">
                        <div className="create-post-redaction">

                <textarea aria-label="Champ pour ajouter un description à votre poste" maxLength="500" className="create-post-input" rows="7" cols="5"
                          name="description"
                          placeholder="Commencer à rédiger un post" onChange={(e) => setDescription(e.target.value)}
                          value={description}/>
                        </div>
                        <div className="create-post-footer">
                            {/*<button className="create-post-button" type="file">*/}

                            {/*    <i className="fa-regular fa-image"></i>*/}
                            {/*    <p className="create-post-footer-text">Photo</p>*/}

                            {/*</button>*/}
                            {/*<button className="create-post-button">*/}

                            {/*    <i className="fa-brands fa-youtube"></i>*/}
                            {/*    <p className="create-post-footer-text">Vidéo</p>*/}

                            {/*</button>*/}
                            <label className="input-label" htmlFor="imagePost">Ajouter une image :</label>
                            <input type="file" name="imagePost" id="imagePost" accept='image/png, image/jpeg, image/jpg, image/gif' onChange={handleImg} value={postImgInput}/>

                            <button className="create-post-button" type="submit" aria-label="Publier votre poste">

                                <i className="fa-solid fa-share"></i>
                                <p className="create-post-footer-text">Publier</p>

                            </button>
                        </div>


                    </form>
                </div>
            </main>
        </>)


};

export default CreatePost;