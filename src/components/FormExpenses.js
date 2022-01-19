import React from "react";
import { connect } from "react-redux";
import SelectCurrency from "./SelectCurrency";
import SelectPayment from "./SelectPayment";
import SelectTag from "./SelectTag";

import { saveExpense, thunkCurrencyAPI } from "../actions/index";
import currenciesAPI from "./test2";
import '../style/FormExpenses.css';

class FormExpenses extends React.Component {
  constructor() {
    super();

    this.state = {
      value: "",
      description: "",
      method: "Dinheiro",
      currency: "USD",
      tag: "Alimentação",
      id: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    console.log("ENTROU");
    const { value, description, method, currency, tag, id } = this.state;
    const { addExpense } = this.props;
    // essa requição é independente
    const exchangeRates = await currenciesAPI();
    // console.log("EXCHANGERATES =>", exchangeRates);
    const expense = {
      id,
      value,
      description,
      method,
      currency,
      tag,
      exchangeRates,
    };
    addExpense(expense);

    this.setState({
      value,
      description,
      method,
      currency,
      tag,
      id: id + 1,
    });
  }

  render() {
    const { value, description, currency } = this.state;
    return (
      <form className="container-form">
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            type="text"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
        </label>

        <SelectCurrency value={currency} onChange={this.handleChange} />

        <SelectPayment onChange={this.handleChange} />

        <SelectTag onChange={this.handleChange} />

        <button type="button" onClick={this.handleClick}>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

FormExpenses.defaultProps = {
  currencies: [],
};

const mapDispatchToProps = (dispatch) => ({
  addExpense: (...expense) => dispatch(saveExpense(...expense)),
  getCurrency: () => dispatch(thunkCurrencyAPI()),
});

export default connect(null, mapDispatchToProps)(FormExpenses);
