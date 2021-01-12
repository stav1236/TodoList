import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { lightGreen, red, grey } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const AddButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(lightGreen.A400),
    backgroundColor: lightGreen.A400,
    "&:hover": {
      backgroundColor: lightGreen.A700,
    },
    border: "0.1vw solid",
    borderColor: grey[900],
  },
}))(Button);

const DeleteButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[600],
    },
    border: "0.1vw solid",
    borderColor: grey[900],
  },
}))(Button);

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missions: ["לצחצח שיניים", "לקרוא ספר", "לישון"],
      selectedMissions: [],
    };
  }

  addiMission = () => {
    const HebrewChars = new RegExp("^[\u0590-\u05FF]+$");
    const missionName = document.getElementById("newMissionNameInput").value;
    if (!missionName) {
      alertify.warning("יש להכניס שם משימה");
    } else if (this.state.missions.includes(missionName)) {
      alertify.warning("לא ניתן להוסיף משימה קיימת");
    } else if (!HebrewChars.test(missionName)) {
      alertify.warning("שם משימה יכול להכיל רק אותיות");

    } else {
      this.setState({
        missions: [...this.state.missions, missionName],
      });
    }
  };

  removeMission = () => {
    let array = [...this.state.missions];
    [...this.state.selectedMissions].forEach((missionNameToRemove) => {
      const indexToRemove = this.state.missions.indexOf(missionNameToRemove);
      array.splice(indexToRemove, 1);
    });
    this.setState({
      missions: [...array],
      selectedMissions: [],
    });
  };

  updateSelectedMission = async (event) => {
    const selectedMissionName = event.target.innerText;
    if (this.state.selectedMissions.includes(selectedMissionName)) {
      await this.setState({
        selectedMissions: [...this.state.selectedMissions].filter(
          (item) => item !== selectedMissionName
        ),
      });
    } else {
      await this.setState({
        selectedMissions: [...this.state.selectedMissions, selectedMissionName],
      });
    }
  };

  render() {
    return (
      <Box width="25%">
        <List>
          {this.state.missions.map((mission, index) => (
            <ListItem
              style={{ textAlign: "center" }}
              divider={true}
              onClick={this.updateSelectedMission}
              button
              key={index}
              selected={this.state.selectedMissions.includes(mission)}
            >
              <ListItemText primary={mission} value={index} />
            </ListItem>
          ))}
        </List>
        <TextField
          id="newMissionNameInput"
          size="small"
          label="שם משימה"
          variant="outlined"
        ></TextField>
        <AddButton onClick={this.addiMission}>Add</AddButton>
        <DeleteButton border={6} onClick={this.removeMission}>
          Remove
        </DeleteButton>
      </Box>
    );
  }
}

export default ToDoList;