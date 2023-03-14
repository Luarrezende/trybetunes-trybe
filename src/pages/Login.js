import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      result: true,
      buttonClicked: false,
      loginValue: '',
      buttonDisable: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value, checked, type } = target;
    this.setState({
      [name]: (type === 'checkbox' ? checked : value),
    }, this.verify);
  };

  verify = () => {
    const { loginValue } = this.state;
    const number = 3;
    const isInput = (input) => input.length >= number;
    if (isInput(loginValue)) {
      this.setState({
        buttonDisable: false,
      });
    } else {
      this.setState({
        buttonDisable: true,
      });
    }
  };

  handleButton = async (e) => {
    e.preventDefault();
    const { loginValue } = this.state;
    this.setState({ buttonClicked: true });
    await createUser({ name: loginValue });
    this.setState({ result: false, buttonClicked: false });
  };

  render() {
    const { buttonClicked, result, loginValue, buttonDisable } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            name="loginValue"
            value={ loginValue }
            onChange={ this.onInputChange }
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

export default Login;
