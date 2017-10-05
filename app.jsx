
class Model {

      constructor() {
            this.todos = [
                      {
                        text: "Jim Hoskins",
                        score: 31,
                        id: 1,
                      },
                      {
                        text: "Andree Hoskins",
                        score: 35,
                        id: 2,
                      },
                      {
                        text: "Alena Hoskins",
                        score: 42,
                        id: 3,
                      },
            ];
            this.inputValue = null;
            this.render = undefined;
      }

      subscribe(render) {
            this.render = render;
      }
      inform() {
            console.log(this.todos.map(e => e.text));
            this.render();
      }
      addTodo(text) {
            this.todos.push({
                  id: Utils.uuid(),
                  text: text,
                  completed: false
            });
            this.inform();
      }
      updateTodo(index, todo) {
            this.todos[index] = todo;
            this.inform();
      }
      removeTodo(todo) {
            this.todos = this.todos.filter(item => item !== todo);
            this.inform();
      }
}

const Header = props => {
      return (
            <div className="header">
                  <h1>Scoreboard</h1>
                  <table className="stats">
                        <tr>
                              <td>PLAYERS:</td>
                              <td>3</td>
                        </tr>
                        <tr>
                              <td>TOTAL POINTS:</td>
                              <td>108</td>
                        </tr>
                  </table>
                  <div id="root" className="stopwatch">     
                  </div>
            </div>
      );
}


const App = ({ title, model }) => {
      const items = model.todos.map((todo, index) => {
            return (

                  <li className='player' key={todo.id}>
                        
                        <div className='player-name'>
                        <input className='input-name'
                              type="text"
                              value={todo.text}
                              onChange={e =>
                                    model.updateTodo(index, {
                                          id: todo.id,
                                          text: e.target.value,
                                          completed: todo.completed
                                    })}
                        />
                        <button className="remove-player" onClick={() => model.removeTodo(todo)}>X</button>
                        </div>
                        
                        <div className='player-score counter'>
                        <button className='counter-action decrement'>-</button>
                        <span className='counter-score'>{todo.score}</span>
                        <button className='counter-action increment'>+</button>
                        </div> 
                  </li>
            );
      });
      return (
            <div className="scoreboard">
                  <Header/>
                  <div>
                   <ul>{items}</ul>
                  </div>
                  
                  <div className='add-player-form'>
                        <form
                              onSubmit={e => {
                                    e.preventDefault();
                                    model.addTodo(model.inputValue);
                              }}
                        >
                              <input type="text" placeholder='ENTER A NAME' onChange={e => (model.inputValue = e.target.value)} />

                              <button type="submit">Add Item</button>
                        </form>
                        
                  </div>

            </div>
      );
};

let model = new Model();
let counter = 1;
let render = () => {
      console.log('render times: ', counter++);
      ReactDOM.render(
            <App title="Scoreboard" model={model} />,
            document.getElementById('container')
      );
};


model.subscribe(render);
render(); 