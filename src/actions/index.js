// Coloque aqui suas actions
export const USEREMAIL = 'USEREMAIL';

export const userEmail = (email) => ({
  type: USEREMAIL,
  email,
});

// ============== ACTIONS WALLET ===================
// ESSES SÃO OS TRÊS CASOS QUE ACONTECEM QUANDO EXISTE UMA REQUEST A API. ELA INICIA E PODE TROCAR O ESTADO DE LOADING PARA TRUE. REPONDE COM SUCESSO COLOCANDO LOADING PRA FALSE E A RESPOSTA OU FALHAR.
export const REQUEST_API = 'REQUEST_API';
export const SUCCESFUL_RESPONSE = 'SUCCESFUL_RESPONSE';
export const FAILED_RESPONSE = 'FAILED_RESPONSE';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const TOTAL_EXPENSE = 'TOTAL_EXPENSE';

export const requestAPI = () => ({
  type: REQUEST_API,
  isLoading: true,
});

export const getCurrenciesAPI = (currencies) => ({
  type: SUCCESFUL_RESPONSE,
  isLoading: false,
  currencies,
});

export const faledAPI = (msg) => ({
  type: FAILED_RESPONSE,
  isLoading: false,
  msg,
});

export const thunkCurrencyAPI = () => async (dispatch) => {
  try {
    // START NA requisição para a API
    dispatch(requestAPI());
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    // RESPONSTA DA API.
    const response = await request.json();
    // ENVIO A RESPOSTA DA API PARA O ESTADO GLOBAL DA APLICAÇÃO
    await dispatch(getCurrenciesAPI(response));
  } catch (error) {
    dispatch(faledAPI(error));
  }
};

export const saveExpense = (expenses) => ({
  type: SAVE_EXPENSE,
  expenses,
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});

export const totalExpense = (expenses) => ({
  type: TOTAL_EXPENSE,
  expenses,
})
