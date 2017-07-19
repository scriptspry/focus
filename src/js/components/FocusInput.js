import React, { Component } from 'react';

export default class SessionsList extends Component {
  constructor(props) {
    super(props);
    this.state = { newTodoValue: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkForEnter = this.checkForEnter.bind(this);
  }

  handleSubmit() {
    const { addTodo } = this.props;
    const { newTodoValue } = this.state;

    if (newTodoValue.trim().indexOf('\n') > 0) {
      newTodoValue.trim().split('\n').forEach((v) => {
        addTodo(v);
      });
    } else if (newTodoValue.length > 0) {
      addTodo(newTodoValue);
    }
  }

  handleChange(e) {
    this.setState({ newTodoValue: e.target.value });
  }

  checkForEnter(e) {
    if (e.which === 13 || e.keyCode === 13) {
      this.handleSubmit();
      this.setState({ newTodoValue: '' });
    }
  }

  render() {
    const { newTodoValue } = this.state;
    const { placeholder } = this.props;

    return (
      <form>
        <textarea
          onKeyPress={this.checkForEnter}
          onChange={this.handleChange}
          placeholder={placeholder}
          value={newTodoValue}
          defaultValue={newTodoValue}
          rows={1}
          style={{ resize: 'none' }}
        ></textarea>
      </form>
    );
  }
}
