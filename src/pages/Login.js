import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { userEmail } from '../actions/index';
import '../style/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
      login: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  handleClick() {
    const { sendEmail } = this.props;
    const { email } = this.state;
    this.setState({
      login: true,
    });

    sendEmail(email);
  }

  // função que altera o valor dos inputs e chama a validade login para verificar em "realtime"
  handleChange({ target }) {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.validateLogin();
      },
    );
  }

  // função que valida os inputs e habilita o botão entrar.
  validateLogin() {
    const { email, password } = this.state;
    let disabled = false;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const MIN_CHARACTERES = 6;

    disabled = !(emailRegex.test(email) && password.length >= MIN_CHARACTERES);

    this.setState({
      disabled,
    });
  }

  render() {
    const { email, password, disabled, login } = this.state;
    return (
      <main>
        <form className="container">
          <h3>Trybe Wallet</h3>
          <div className="input-field">
            <input
              type="text"
              id="email"
              name="email"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChange }
              placeholder="Email"
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              id="password"
              name="password"
              data-testid="password-input"
              value={ password }
              onChange={ this.handleChange }
              placeholder="Senha"
            />
          </div>
          <button
            type="submit"
            disabled={ disabled }
            onClick={ this.handleClick }
            className="button-login"
          >
            Entrar
          </button>
          {login ? <Redirect to="/carteira" /> : ''}
          <p>
            * O Botão ENTRAR só será habilitado após ser digitado um email e uma
            senha com mais de 6 caracteres
          </p>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // sendEmail um nome qualquer para representar userEmail. Afunção que está na action aguardando o dispatch para alterar o estado global da aplicação.
  sendEmail: (...email) => dispatch(userEmail(...email)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
