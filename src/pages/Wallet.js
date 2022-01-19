import React from 'react';
import FormExpenses from '../components/FormExpenses';
import Table from '../components/Table';

import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormExpenses />
        <Table />
      </div>
    );
  }
}

export default Wallet;
