import React from 'react';

class SelectPayment extends React.Component {
  render() {
    const { onChange } = this.props;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          onChange={ onChange }
          name="method"
          id="method"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartao de debito">Cartão de débito</option>
          <option value="Cartao de credito">Cartão de crédito</option>
        </select>
      </label>
    );
  }
}

export default SelectPayment;
