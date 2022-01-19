import React from "react";
import { connect } from "react-redux";

import { deleteExpense } from "../actions";

import '../style/Table.css';

class Table extends React.Component {
  render() {
    const { expenses, deleteExpenseOne } = this.props;
    // console.log("EXPENSES =>", expenses);
    return (
      <table className="container-table">
        <thead className="itens">
          <tr>
            <th>Moeda</th>
            <th>Valor</th>
            <th>Câmbio utilizado</th>
            <th>Moeda de conversão</th>
            <th>Valor Convertido</th>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de Pagamento</th>
            <th>Excluir</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense, index) => {
            const { value, description, method, tag, exchangeRates, currency } =
              expense;
            const { name, ask } = exchangeRates[currency];
            return (
              <tr key={index}>
                <td>{name}</td>
                <td>{value}</td>
                <td>{parseFloat(ask).toFixed(2)}</td>
                <td>Real</td>
                <td>{(ask * parseInt(value, 10)).toFixed(2)}</td>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>
                <button
                  type="button"
                  onClick={ () => deleteExpenseOne(expense) }
                  data-testid="delete-btn"
                >
                DELETAR
               </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
Table.defaultProps = {
  expenses: [],
};
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const sendDeleteExpense = (dispatch) => ({
  deleteExpenseOne: (expense) => dispatch(deleteExpense(expense)),
});
export default connect(mapStateToProps, sendDeleteExpense)(Table);
