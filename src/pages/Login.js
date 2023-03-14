import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      result: true,
      buttonClicked: false,
    };
  }

  handleButton = async (e) => {
    e.preventDefault();
    const { loginValue } = this.props;
    this.setState({ buttonClicked: true });
    await createUser({ name: loginValue });
    this.setState({ result: false, buttonClicked: false });
  };

  render() {
    const { buttonDisable, loginValue, onInputChange } = this.props;
    const { buttonClicked, result } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            name="loginValue"
            value={ loginValue }
            onChange={ onInputChange }
          />
          <button
            data-testid="login-submit-button"
            disabled={ buttonDisable }
            onClick={ this.handleButton }
          >
            Entrar
          </button>
          { buttonClicked && <div>Carregando...</div>}
          { !result && <Redirect to="/search" />}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginValue: PropTypes.string.isRequired,
  buttonDisable: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
export default Login;
