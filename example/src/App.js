import React, { Component } from "react";

import QuickSelect from "react-quick-select";
import numberToWords from "number-to-words";

const range = (lowEnd, highEnd) => {
  let arr = [];
  while (lowEnd <= highEnd) {
    arr.push(lowEnd++);
  }
  return arr;
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      color: 0
    };
  }

  optionRenderer(option) {
    return <b style={{ margin: "0 10px" }}>{option.label}</b>;
  }

  colorRenderer(option) {
    return (
      <div style={{ color: option.label, padding: "5px 30px" }}>
        {option.label}
      </div>
    );
  }

  render() {
    const numberOptions = range(1, 100).map(number => {
      return { value: number, label: numberToWords.toWords(number) };
    });

    const colorOptions = [
      "red",
      "green",
      "blue",
      "yellow",
      "pink",
      "black"
    ].map(color => {
      return { value: color, label: color };
    });

    return (
      <div className="App">
        <div>
          My favorite number is
          <QuickSelect
            options={numberOptions}
            selected={this.state.number}
            height="500px"
            width="300px"
            trigger={this.optionRenderer}
            onSelect={(o, i) => {
              console.log(i);
              this.setState({ ...this.state, number: i });
            }}
          />
          and my favorite color is
          <QuickSelect
            options={colorOptions}
            selected={this.state.color}
            trigger={this.optionRenderer}
            renderer={this.colorRenderer}
            onSelect={(o, i) => {
              this.setState({ ...this.state, color: i });
            }}
          />
        </div>
      </div>
    );
  }
}
