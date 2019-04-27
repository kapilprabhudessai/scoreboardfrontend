import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withSnackbar } from "notistack";
import Constants from "../constants";

class AddDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      teamOneId: "",
      teamTwoId: "",
      teamOneScore: 0,
      teamTwoScore: 0,
      teams: []
    };
  }


  setTeamOne = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  setTeamTwo = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  setTeams = teams => {
    this.setState({ teams: teams });
  };
  componentDidMount() {
    console.log(Constants);
    var that = this;
    fetch(Constants.API_URL+"/teams", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        var teams = [];
        for (var i in myJson) {
          teams.push({ id: myJson[i]._id, name: myJson[i].name });
        }
        that.setState({ teams: teams });
      });
  }

  render() {
    let that = this;
    let saveDetails = function() {

      if (that.state.teamOneId === "") {
        that.props.enqueueSnackbar("Select Team 1", { variant: "error" });
        return;
      }
      if (that.state.teamTwoId === "") {
        that.props.enqueueSnackbar("Select Team 2", { variant: "error"});
        return;
      }
      if(that.state.teamOneId === that.state.teamTwoId){
        that.props.enqueueSnackbar("There should be 2 different teams", { variant: "error"});
        return;
      }
      fetch(Constants.API_URL+"/matches/add-match-stat", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          teamOneId: that.state.teamOneId,
          teamOneScore: that.state.teamOneScore,
          teamTwoId: that.state.teamTwoId,
          teamTwoScore: that.state.teamTwoScore
        })
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          that.props.enqueueSnackbar("Match Details Added Successfully!", { variant: "success"});
          that.setState({
            teamOneId: "",
            teamTwoId: "",
            teamOneScore: 0,
            teamTwoScore: 0,
          });
        });
    };



    return (
      <div className={styles.root}>
        <Grid container spacing={24}>
          <Grid item md={4} sm={4} />
          <Grid item xs={4} sm={4} style={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              component="h3"
              style={{ paddingTop: 10, paddingLeft: 10 }}
            >
              Add Details
              <Typography component="small">
                Add oponents & their scores
              </Typography>
            </Typography>
            <Typography component="div">
              <FormControl className={styles.formControl}>
                <InputLabel htmlFor="teamOneId">Team 1</InputLabel>
                <Select
                  key="teamOne"
                  value={this.state.teamOneId}
                  onChange={this.setTeamOne}
                  style={{ width: 400 }}
                  inputProps={{
                    name: "teamOneId",
                    id: "teamOneId"
                  }}
                >
                  {this.state.teams.map((item, key) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <br />
              <FormControl className={styles.formControl}>
                <TextField
                  id="teamOneScore"
                  label="Team 1 Score"
                  value={this.state.teamOneScore}
                  onChange={this.handleChange("teamOneScore")}
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  className={styles.textField}
                  style={{ width: 400 }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                />
              </FormControl>

              <br />
              <FormControl className={styles.formControl}>
                <InputLabel htmlFor="teamTwoId">Team 2</InputLabel>
                <Select
                  key="teamTwo"
                  value={this.state.teamTwoId}
                  onChange={this.setTeamTwo}
                  style={{ width: 400 }}
                  inputProps={{
                    name: "teamTwoId",
                    id: "teamTwoId"
                  }}
                >
                  {this.state.teams.map((item, key) => (
                    <MenuItem key={item.id2} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <br />
              <FormControl className={styles.formControl}>
                <TextField
                  id="teamTwoScore"
                  label="Team 2 Score"
                  value={this.state.teamTwoScore}
                  onChange={this.handleChange("teamTwoScore")}
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  className={styles.textField}
                  style={{ width: 400 }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                />
              </FormControl>
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={saveDetails}
                className={styles.button}
              >
                Save
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({});

export default withSnackbar(AddDetails);
