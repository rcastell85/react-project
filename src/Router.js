import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Peliculas from "./components/Peliculas";
import SeccionPruebas from "./components/SeccionPruebas";
import Error from "./components/Error";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Blog from './components/Blog';
import Formulario from './components/Formulario';
import Search from './components/Search';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';

class Router extends Component {

    render(){  

        return(
            <BrowserRouter>

                <Header/>  

                    {/*Configurar rutas y paginas*/}  
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/blog" component={Blog} />
                        <Route exact path="/formulario" component={Formulario} />
                        <Route exact path="/peliculas" component={Peliculas} />
                        <Route exact path="/blog/articulo/:id" component={Article}/>
                        <Route exact path="/blog/crear" component={CreateArticle}/>
                        <Route exact path="/blog/busqueda/:search" component={Search} />
                        <Route exact path="/blog/editar/:id" component={EditArticle} />

                        <Route exact path="/redirect/:search" render={
                            props => {
                                var search = props.match.params.search;
                                return( 
                                    <Redirect to={'/blog/busqueda/' + search} />
                                )
                            }
                        } />

                        <Route exact path="/ejemplo" render={
                            () => ( 
                                <>
                                    <h1>hola desde ejemplo</h1>
                                    <SeccionPruebas saludo="Holaaaaaa"/>
                                </>
                            )
                        }/>
                        <Route exact path="/ejemplo2" render={
                            () => ( 
                                <>
                                    <h1>hola desde ejemplo Numero 2</h1>
                                    <h2>Esto es un ejemplo</h2>
                                </>
                            )
                        }/>
                        <Route exact path="/pruebas/:nombre/:apellido?" render={
                            (props) => {
                                var nombre = props.match.params.nombre;
                                var apellido;

                                if(props.match.params.apellido){
                                    apellido = props.match.params.apellido;
                                } else {
                                    apellido = '';
                                }
                                

                                return ( 
                                <>
                                    <div id="content">
                                        <h1 className="subheader">hola desde pruebas</h1>
                                        <h2>El nombre es: {nombre + ' ' + apellido}</h2>
                                    </div>
                                </>
                            )}
                        }/>

                        <Route component={Error} />
                    </Switch>

                    <div className="clearfix"></div>

                <Footer />

            </BrowserRouter>
        );
    }

}

export default Router;