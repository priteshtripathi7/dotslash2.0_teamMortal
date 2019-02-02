import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  state = {
    name: "nothing"
  };

  handleClick = e => {
    // this.setState({
    //   name: "vartik"
    // });

    fetch("https://pokeapi.co/api/v2/pokemon/" + this.state.name)
      .then(data => {
        return data.json();
      })
      .then(json => {
        console.log(json);

        this.setState({
          name: json.name
        });
      });
  };

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <button className="button" onClick={this.handleClick}>
          click me!!
        </button>
        <input
          type="text"
          className="textfield"
          value={this.state.name}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
