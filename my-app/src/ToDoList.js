import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

const activeMissionClass = "list-group-item active";
const unActiveMissionClass = "list-group-item";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missions: ["לצחצח שיניים", "לקרוא ספר", "לישון"],
      selectedMissions: [],
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
    let array = [...this.state.missions];
    [...this.state.selectedMissions].forEach((indexToRemove) => {
      array.splice(indexToRemove, 1);
    });
    this.setState({
      missions: [...array],
      selectedMissions: [],
    });
    document.getElementsByClassName(
      activeMissionClass
    )[0].className = unActiveMissionClass;
  };

  updateSelectedMission = async (event) => {
    if (event.target.className.includes(activeMissionClass)) {
      await this.setState({
        selectedMissions: [...this.state.selectedMissions].filter(
          (item) => item !== event.target.value
        ),
      });
      event.target.className = unActiveMissionClass;
    } else {
      await this.setState({
        selectedMissions: [...this.state.selectedMissions, event.target.value],
      });
      event.target.className = activeMissionClass;
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
