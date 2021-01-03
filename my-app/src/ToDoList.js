import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missions: ["לצחצח שיניים", "לקרוא ספר", "לישון"],
      selectedMission: null,
    };
  }

  addiMission = () => {
    this.setState({
      missions: [
        ...this.state.missions,
        document.getElementById("missionName").value,
      ],
    });
  };

  removeMission = () => {
    const array = [...this.state.missions];
    if (this.state.selectedMission != null) {
      array.splice(this.state.selectedMission, 1);
    }
    this.setState({
      missions: [...array],
      selectedMission: null,
    });
  };

  updateSelectedMission = async (event) => {
    await this.setState({
      selectedMission: event.target.value,
    });
    if (event.target.className.includes("active")) {
      event.target.className = " list-group-item";
    } else {
      event.target.className += " active";
    }
  };

  render() {
    return (
      <div>
        <ul className="list-group w-25">
          {this.state.missions.map((mission, index) => (
            <li
              className="list-group-item"
              onClick={this.updateSelectedMission}
              value={index}
              key={index}
            >
              {mission}
            </li>
          ))}
        </ul>
        <input id="missionName"></input>
        <button onClick={this.addiMission}>Add</button>
        <button onClick={this.removeMission}>Remove</button>
      </div>
    );
  }
}

export default ToDoList;
