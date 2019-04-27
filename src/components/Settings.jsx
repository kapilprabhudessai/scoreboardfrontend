import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { DropzoneArea } from "material-ui-dropzone";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withSnackbar } from "notistack";
import Constants from '../constants';

class Settings extends React.Component {
  state = {
    file: null,
    team_name: "",
    short_name: "",
    open: false,
    drid: 100,
    txid: 1
  };

  handleSave(files) {
    this.setState({
      file: files[0],
      open: false
    });
  }

  setTeamName(e) {
    this.setState({
      team_name: e.target.value
    });
  }

  render() {
    let that = this;
    let addTeam = function() {
      if (that.state.team_name === "") {
        that.props.enqueueSnackbar("Type the team name", { variant: "error" });
        return;
      }
      if (that.state.file == null) {
        that.props.enqueueSnackbar("Choose a logo for the team", {
          variant: "error"
        });
        return;
      }
      const data = new FormData();
      data.append("file", that.state.file);
      data.append("team_name", that.state.team_name);
      fetch(Constants.API_URL+"/teams/", {
        method: "POST",

        body: data
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          if (myJson.status === "success") {
            that.props.enqueueSnackbar("Team Added Successfully!", {
              variant: "success"
            });
            var drid = that.state.drid;
            drid++;
            var txid = that.state.txid;
            txid++;
            that.setState({
              file: null,
              team_name: "",
              short_name: "",
              open: false,
              files: [],
              drid: drid,
              txid: txid
            });
          } else if (myJson.status === "failure") {
            that.props.enqueueSnackbar(myJson.error_message, {
              variant: "error"
            });
          }
        });
    };

    let resetDatabase = function() {
      fetch(Constants.API_URL+"/matches/reset", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          var drid = that.state.drid;
          drid++;
          var txid = that.state.txid;
          txid++;
          that.setState({
            file: null,
            team_name: "",
            short_name: "",
            open: false,
            files: [],
            drid: drid,
            txid: txid
          });
          that.props.enqueueSnackbar(
            "Database has been reset. 10 Default teams have been added!",
            { variant: "success" }
          );
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
              Settings
              <Typography component="small">Add New Team</Typography>
            </Typography>
            <Typography component="div">
              <FormControl
                className={styles.container}
                style={{ width: 400 }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  key={this.state.txid}
                  required
                  id="team-name"
                  label="Team Name"
                  defaultValue=""
                  className={styles.textField}
                  margin="normal"
                  onChange={this.setTeamName.bind(this)}
                  inputProps={{
                    name: "team_name"
                  }}
                />
                <DropzoneArea
                  key={this.state.drid}
                  onChange={this.handleSave.bind(this)}
                  acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                  showPreviews={true}
                  maxFileSize={5000000}
                  filesLimit={1}
                />
              </FormControl>
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={addTeam}
                className={styles.button}
              >
                Add Team
              </Button>
              &nbsp;&nbsp;
              <Button
                variant="contained"
                color="secondary"
                onClick={resetDatabase}
                className={styles.button}
              >
                Reset Database
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({});

export default withSnackbar(Settings);
