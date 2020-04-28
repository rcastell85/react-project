import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import Global from '../Global';
import Sidebar from './Sidebar';
import imageDefault from '../assets/images/imagenDefault.png';

// 1. Recoger el id del articulo a editar
// 2. Crear un metodo para sacr el objeto del backend
// 3. Repoblar / rellenar el formulario con la informacion
// 4. Actualizar el objeto haciendo una peticion al backend

class EditArticle extends Component{
    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();
    idArticle = null;
    

    state = {
        article: {},
        status: null,
        selectedFile: null, 
        changed: false
    }

    componentWillMount(){
        this.idArticle = this.props.match.params.id;
        this.getArticle(this.idArticle);

        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este Campo es requerido',
                alpha_num_space: 'Este campo no puede contener caracteres especiales'
            }
        });
    }

    getArticle = id => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                })
            })
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        })

        this.validator.showMessages();
        this.forceUpdate();
    }

    saveArticle = e => {
        e.preventDefault();

        // Rellenar state con formulario
        this.changeState();

        // Validaciones
        if (this.validator.allValid()) {

            // Hacer peticion http por post para guardar articulo
            axios.put(this.url + 'article/' + this.idArticle, this.state.article)
            .then(res => {
                if (res.data.article) {
                    this.setState({
                        article: res.data.article,
                        status: 'waiting'
                    })

                    // Subir la imagen
                    if (this.state.selectedFile !== null) {
                        // Sacar el id del articulo
                        var articleID = this.state.article._id; 

                        // Crear form data y añadir fichero 
                        const formData = new FormData();

                        formData.append(
                            'file0',
                            this.state.selectedFile,
                            this.state.selectedFile.name
                        );

                        //  Peticion AJAX
                        axios.post(this.url + 'upload-image/' + articleID, formData)
                            .then(res => {
                                if (res.data.article) {
                                    this.setState({
                                        article: res.data.article,
                                        status: 'success'
                                    });
                                } else {
                                    this.setState({
                                        article: res.data.article,
                                        status: 'failed'
                                    });
                                }
                            })

                            swal(
                                'Artículo editado',
                                'El artículo ha sido editado correctamente',
                                'success'
                            )
                    } else {
                        this.setState({
                            status: 'success'
                        })

                        swal(
                            'Artículo editado',
                            'El artículo ha sido editado correctamente',
                            'success'
                        )
                    }

                } else {
                    this.setState({
                        status: 'failed'
                    })
                }
            })

        } else {
            this.setState({
                status: 'failed'
            })

            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    fileChange = e => {
        e.preventDefault();

        this.setState({
            selectedFile: e.target.files[0],
            changed: true
        })
    }

    render(){
        var imageUrl;

        if (this.state.status === 'success') {
            return <Redirect to='/blog' />
        }

        var article = this.state.article;

        if (    this.state.changed === false) {
            imageUrl = this.url + 'get-image/' + article.image;
        } else if (this.state.changed === true) {
            imageUrl = this.url + 'get-image/' + this.state.article.image;
        } else {
            imageUrl = imageDefault;
        }

        return(
            <div className="center">
                <section id="content"> 
                    <h1 className="subheader">Editar artículo</h1>

                    {article.title &&

                        <form className="mid-form" onSubmit={this.saveArticle} >
                            <div className="form-group">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState} />

                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" defaultValue={article.content} ref={this.contentRef} onChange={this.changeState}></textarea>

                                {this.validator.message('content', this.state.article.content, 'required|alpha_num_space')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <input type="file" name="file0" onChange={this.fileChange}/>
                                <div className="image-wrap">
                                    <img src={imageUrl} alt={article.title} className="thumb" />
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="form-group btns">
                                <input type="submit" value="Guardar" className="btn btn-success" />
                                <Link to={'/blog/articulo/' + article._id} className="btn btn-reg">Volver</Link>
                            </div>
                        </form>
                    }

                    {!article.title &&
                        <h2 className="subheader">Cargando...</h2>
                    }


                </section>

                <Sidebar />
            </div>
        )
    }
}

export default EditArticle;
