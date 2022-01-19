// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
	REQUEST_API,
	SUCCESFUL_RESPONSE,
	FAILED_RESPONSE,
	SAVE_EXPENSE,
	DELETE_EXPENSE,
	TOTAL_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
  error: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };
	case SUCCESFUL_RESPONSE:
		return {
			...state,
			isLoading: false,
			currencies: Object.keys(action.currencies),
		};
	case FAILED_RESPONSE:
		return {
			...state,
			isLoading: false,
			error: action.msg,
		};
	case SAVE_EXPENSE:
		return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
	case DELETE_EXPENSE:
	  return {
		...state,
		expenses: [...state.expenses.filter((expense) => expense.id !== action.expense.id)],
	  };
	case TOTAL_EXPENSE:
		return{
			...state,
			expenses: action.expenses,
		}
  default:
    return state;
  }
};
export default wallet;
