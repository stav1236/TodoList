import React, { Component } from "react";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = { missions: [1, 2, 3], selectedMission: null };
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
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.missions.map((mission, index) => (
            <li onClick={this.updateSelectedMission} value={index} key={index}>
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
