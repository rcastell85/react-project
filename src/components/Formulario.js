import React, { Component } from 'react';
import Sidebar from './Sidebar';

class Formulario extends Component {

    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    bioRef = React.createRef();
    genHombreRef = React.createRef();
    genMujerRef = React.createRef();
    genOtroRef = React.createRef();

    state = {
        user: {}
    }

    recibirForm = (e) => {
        e.preventDefault();

        var genero;

        if (this.genHombreRef.current.checked) {
            genero = this.genHombreRef.current.value;
        } else if (this.genMujerRef.current.checked) {
            genero = this.genMujerRef.current.value;
        } else if (this.genOtroRef.current.checked) {
            genero = this.genOtroRef.current.value;
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellido: this.apellidoRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero
        }
        
        //Asignamos el valor de user al estado
        this.setState({
            user: user
        });
    }

    render() {
        if (this.state.user) {
            var user = this.state.user;
        }

        return (
            <div id="formulario">  
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Formulario</h1>

                        {/*Mostrar datos del formulario */}
                        {Object.keys(user).length !== 0 &&
                            <div id="user-data">
                                <p>Nombre: <strong>{user.nombre}</strong></p>
                                <p>Apellido: <strong>{user.apellido}</strong></p>
                                <p>Biografia: <strong>{user.bio}</strong></p>
                                <p>Género: <strong>{user.genero}</strong></p>
                            </div>
                        }

                        
                        <form className="mid-form" onSubmit={this.recibirForm} onChange={this.recibirForm} >
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidoRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={this.bioRef}></textarea>
                            </div>

                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.genHombreRef} /> Hombre 
                                <input type="radio" name="genero" value="mujer" ref={this.genMujerRef} /> Mujer 
                                <input type="radio" name="genero" value="otro" ref={this.genOtroRef} /> Otro
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success" />
                        </form>

                    </div>
                </div>

                <Sidebar />
            </div>
        )
    }

}

export default Formulario;