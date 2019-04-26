import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
class Results extends React.Component {

  constructor() {
    super();
    this.state = {
    matches:[],
    }
  }


  componentDidMount() {
    var that = this;
    fetch('http://127.0.0.1:8888/matches', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function(response) {
      return response.json();
    }).then(function(myJson) {
      that.setState({ matches:myJson});
  });
  }

  render() {

    let that = this;


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
            Match Results
          </Typography>
          <Typography component="div">
          {this.state.matches.map((item, key) =>
            <Card key={key} className={styles.card} style={{marginTop:4}}>
             <CardContent>
              <Grid container spacing={24}>
              <Grid item xs={4} sm={4} style={{ textAlign: "center" }}>
                <img src={item._teamOneId.logoUrl} alt="Team 1" style={{width:100,float:'left'}}/>
              </Grid>
              <Grid item xs={4} sm={4} style={{ textAlign: "center" }}>
               <Typography className={styles.title} color="textSecondary" gutterBottom>
                 {item._teamOneId.name}
                 <br/>
                 {item.teamOneScore}
               </Typography>
               <Typography variant="h5" component="h2">
                 Vs
               </Typography>
               <Typography className={styles.pos} color="textSecondary">
                 {item.teamTwoScore}
                 <br/>
                 {item._teamTwoId.name}
               </Typography>
               </Grid>
               <Grid item xs={4} sm={4} style={{ textAlign: "right" }}>
                 <img src={item._teamTwoId.logoUrl} alt="Team 2" style={{width:100,float:'right'}}/>
               </Grid>
               </Grid>
             </CardContent>
           </Card>

          )}
          </Typography>
          </Grid>
          </Grid>
          </div>
  );}
}

const styles = theme => ({});

export default Results;
