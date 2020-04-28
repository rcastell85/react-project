import React, { Component } from 'react';
import Pelicula from './Pelicula';
import Slider from './Slider';
import Sidebar from './Sidebar';

class Peliculas extends Component {

    state = {}

    componentWillMount(){
        this.setState({
            peliculas: [
                {
                    titulo: "Batman vs Supeman",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTAnGi1qp34vKNlU7trB3KAW2cY7X2mK23jxRAlDXR1E9SBFesm&usqp=CAU"
                },
                {
                    titulo: "Gran Torino",
                    image: "https://i.blogs.es/743b2d/grantorinof1/450_1000.jpg"
                },
                {
                    titulo: "La milla verde",
                    image: "https://2.bp.blogspot.com/-wx6dl7CEq0U/VMbQV5Ntv0I/AAAAAAAADqU/S7RfNZpNYc4/s1600/green%2B1.jpg"
                }
            ],
            nombre: "Robert Castellanos",
            favorita: {}
        })
    }


    cambiarTitulo = () => {
        var { peliculas } = this.state;

        peliculas[2].titulo = "Batman Begins";

        this.setState({
            peliculas
        })
    }

    favorita = (peli, i) => {
        this.setState({
            favorita: peli
        })
    }

    render() {
        var pStyle = {
            background: 'green',
            color: 'white'
        }

        return (
            <div id="peliculas"> 
                <Slider 
                    title="Peliculas"
                    size="slider-small"
                />

                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader">Listado de Peliculas</h2>
                        <p>Seleccion de peliculas de {this.state.nombre}</p>
                        <button onClick={this.cambiarTitulo}>Cambiar titulo</button>
                        

                        {this.state.favorita.titulo ?   // Equivalente a condicional IF(si es solo if sin else puede ser con &&)
                            (   
                                <div className="favorita" style={pStyle}>
                                    <p>La pelicula favorita es: {this.state.favorita.titulo}</p>
                                </div>
                            ) : ( // else
                                <div className="favorita" style={pStyle}>
                                    <p>La pelicula favorita es: </p>
                                </div>
                            )
                        }

                        <div id="articles">
                        {
                            this.state.peliculas.map((pelicula, i) => {
                                return(
                                    <Pelicula 
                                        key={i} 
                                        pelicula={pelicula}
                                        indice={i}
                                        marcarFavorita={this.favorita}
                                    />
                                )
                            })
                        }
                        </div>
                    </div>
                </div>

                <Sidebar />
            </div>

            
        )
    }

}

export default Peliculas;