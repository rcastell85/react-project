import React, {Component} from 'react';


class SeccionPruebas extends Component {

    state = {
        contador: 0
    }
   
    sumar = () => {
        this.setState({
            contador: (this.state.contador + 1)
        })
    }

    restar = () => {
        this.setState({
            contador: (this.state.contador - 1)
        })
    }

    render(){
        return (
            <section id="content">
                <h2 className="subheader">Últimos artículos</h2>

                <p>
                    este es App js
                </p>

                {this.props.saludo &&
                    <h1>{this.props.saludo}</h1>
                }

                <h2 className="subheader">Estado</h2>
                <p>
                   Contador: {this.state.contador}
                </p>
                <p>
                    <input type="button" value="Sumar" onClick={this.sumar} />
                    <input type="button" value="Restar" onClick={this.restar} />
                </p>
            </section>
        )
    }
}

export default SeccionPruebas;