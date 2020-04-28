import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import Global from '../Global';
import Sidebar from './Sidebar';

// Validar formularios y alertas

class CreateArticle extends Component{
    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    componentWillMount(){
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este Campo es requerido',
                alpha_num_space: 'Este campo no puede contener caracteres especiales'
            }
        });
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
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
            axios.post(this.url + 'save', this.state.article)
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
                                'Artículo Creado',
                                'El artículo ha sido creado correctamente',
                                'success'
                            )
                    } else {
                        this.setState({
                            status: 'success'
                        })

                        swal(
                            'Artículo Creado',
                            'El artículo ha sido creado correctamente',
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
            selectedFile: e.target.files[0]
        })
        
    }

    render(){

        if (this.state.status === 'success') {
            return <Redirect to='/blog' />
        }

        return(
            <div className="center">
                <section id="content"> 
                    <h1 className="subheader">Crear artículo</h1>

                    <form className="mid-form" onSubmit={this.saveArticle} >
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} />

                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState}></textarea>

                            {this.validator.message('content', this.state.article.content, 'required|alpha_num_space')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange}/>
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </div>
                    </form>
                </section>

                <Sidebar />
            </div>
        )
    }
}

export default CreateArticle;
