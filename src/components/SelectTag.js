import React from 'react';

class SelectTag extends React.Component {
  render() {
    const { onChange } = this.props;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          onChange={ onChange }
          name="tag"
          id="tag"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }
}

export default SelectTag;
