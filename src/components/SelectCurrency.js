import React from "react";
import { connect } from "react-redux";

import { thunkCurrencyAPI } from '../actions/index';

class SelectCurrency extends React.Component {
  componentDidMount() {
    const { startRequstAPI } = this.props;
    startRequstAPI();
  };

  render() {
    const { value, onChange, currencies } = this.props;
    return (
      <label htmlFor="select-currency">
        Moeda:
        <select
          id="select-currency"
          name="currency"
          onChange={ onChange }
          value={ value }
        >
          {currencies.map((currency, index) => {
            if (currency === 'USDT') return '';
            return (
              <option key={ index }>{ currency }</option>
            );
          })}
        </select>
      </label>
    );
  }
}

SelectCurrency.defaultProps = {
  currency: undefined,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  startRequstAPI: () => dispatch(thunkCurrencyAPI())
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrency);
