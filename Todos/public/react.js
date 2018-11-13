function generateId () {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

function List(props) {
  return (
    <ul>
      <li>List</li>
    </ul>
  );
}

class Todos extends React.Component {
  addItem = (event) => {
      event.preventDefault();
      const name = this.input.value;
      this.input.value = '';
      this.props.store.dispatch(addTodoAction({
          name,
          complete: false,
          id: generateId(),
      }));
  }
  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <input 
            type="text"
            placeholder="Add Todo"
            ref = {(input) => this.input = input}
        />
        <button onClick={this.addItem}>Add Todo</button>
        <List />
      </div>
    );
  }
}

class Goals extends React.Component {
  addGoal = (e) => {
    e.preventDefault();
    const name = this.input.value;
    this.input.value = '';
    this.props.store.dispatch(addGoalAction({
      name,
      id: generateId(),
    }));
  }
  render() {
    return (
      <div>
        <h1>Goals</h1>
        <input 
          type="text"
          placeholder="Add Goal"
          ref = {(input) => this.input = input}
        />
        <button onClick={this.addGoal}>Add Goal</button>
        <List />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Todos store={this.props.store}/>
        <Goals store={this.props.store}/>
      </div>
    );
  }
}

ReactDOM.render(<App store={store}/>, 
    document.querySelector("#app"));