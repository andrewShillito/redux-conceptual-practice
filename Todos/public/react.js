function generateId () {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

function List(props) {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={item.id}>
          <span>
            {item.name}
          </span>
          <button onClick={() => props.remove(item)}>
            X
          </button>
        </li>
      ))}
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
  removeItem = (todo) => {
    this.props.store.dispatch(removeTodoAction(todo.id));
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
        <List 
          items={this.props.todos}
          remove={this.removeItem}
        />
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
  removeItem = (goal) => {
    this.props.store.dispatch(removeGoalAction(goal.id));
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
        <List 
          items={this.props.goals}
          remove={this.removeItem}
          />
      </div>
    );
  }
}

class App extends React.Component {
  componentDidMount () {
    const { store } = this.props;
    store.subscribe(() => this.forceUpdate());
  }
  render() {
    const { store } = this.props;
    const { todos, goals } = store.getState();
    
    return (
      <div>
        <Todos todos={todos} store={this.props.store}/>
        <Goals goals={goals} store={this.props.store}/>
      </div>
    );
  }
}

ReactDOM.render(<App store={store}/>, 
    document.querySelector("#app"));