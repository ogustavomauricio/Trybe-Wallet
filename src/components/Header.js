import React from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import '../style/Header.css';
// import Logo from '../images/coin.svg'

class Header extends React.Component {
  constructor() {
    super();

    this.getTotalExpenses = this.getTotalExpenses.bind(this);
  }

  getTotalExpenses() {
    const { expeses } = this.props;
    // const totalArray = expeses.map((expense) => expense.value);
    // // o acc começa em zero e vai se acumulando com os valores da expense.
    // const total1 = totalArray.reduce((acc, expense) => acc + Number(expense), 0);
    // console.log(expeses);
    // return total1.toFixed(2);
    const totalExpenses = expeses.reduce((total, acc) => {
      const { value, currency, exchangeRates } = acc;
      console.log("EXPENSES =>", value);
      const rate = parseFloat(exchangeRates[currency].ask);

      return total + parseFloat(value) * rate;
    }, 0);

    return totalExpenses.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header className="container-header">
        <div className="div-logo">
          {/* <img src={ Logo } alt="moeda" className="logo-header" /> */}
          <h2>Trybe Wallet</h2>
        </div>
        <div className="content-header">
          <span data-testid="email-field" className="email">
            {`Email:  ${email}`}
          </span>
          <span data-testid="total-field">
            {` Despesas Totais: ${this.getTotalExpenses()} `}
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </div>
      </header>
    );
  }
}
Header.defaultProps = {
  expenses: [],
};
// Header.propTypes = {
//   // fetchCurrencies: PropTypes.func.isRequired,
//   email: PropTypes.string.isRequired,
// };

// methodo para pegar o email salva no state da aplicação e colocar no conteúdo.
const mapStateToProps = (state) => ({
  email: state.user.email,
  expeses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
