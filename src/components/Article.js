import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import swal from 'sweetalert';
import Sidebar from './Sidebar';
import Moment from 'react-moment';
import 'moment/locale/es';
import imageDefault from '../assets/images/imagenDefault.png';

class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    }

    componentWillMount(){
        this.getArticle();
    }

    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'succes'
                })
            })
            .catch( err => {
                this.setState({
                    article: false,
                    status: 'success'
                });
            });
    }

    deleteArticle = id => {
        

            swal({
                title: "Estas seguro de querer borrar el artículo?",
                text: "Una vez borrado, no podras recuperarlo",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {

                if (willDelete) {
                    axios.delete(this.url + 'article/' + id)
                    .then(res => {
                        this.setState({
                            article: res.data.article,
                            status: 'deleted'
                        });
                    });
                    swal("El archivo ha sido borrado correctamente!", {
                        icon: "success",
                    });
                } 

              });
    }

    render() {

        if (this.state.status === 'deleted') {
            return <Redirect to="/blog" />
        }
        var article = this.state.article;

        return (
            <div className="center">
                <section id="content">
                    {article &&
                        <article className="article-item article-detail" key={article._id}>
                            <div className="image-wrap">
                                {article.image !== null ? ( 
                                    <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                ) : (
                                    <img src={imageDefault} alt={article.title} />
                                )
                                }
                            </div>

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow>{article.date}</Moment>
                            </span>
                            <p>
                                {article.content}
                            </p>
                            <div id="btnsBox">
                                <div>
                                    <button onClick={
                                        () => {
                                            this.deleteArticle(article._id)
                                        }
                                    } 
                                    className="btn btn-danger">Eliminar</button>

                                    <Link to={"/blog/editar/" + article._id} className="btn btn-warning">Editar</Link>
                                </div>
                                <div>
                                    <Link to="/blog" className="btn btn-warning">Volver</Link>
                                </div>
                            </div>
                            

                            <div className="clearfix"></div>
                        </article>
                    }

                    {!article && this.state.status === 'success' &&
                        <div id="article">
                            <h2 className="subheader">El articulo no existe</h2>
                            <p>Intenta de nuevo mas tarde</p>
                        </div>
                    }

                    {this.state.status == null &&
                        <div id="article">
                            <h2 className="subheader">Cargando...</h2>
                            <p>Espere unos segundos</p>
                        </div>
                    }

                </section>

                <Sidebar />
            </div>
        )
    }

}

export default Article;