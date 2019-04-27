import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Constants from "../constants";

class Results extends React.Component {

  constructor() {
    super();
    this.state = {
    matches:[],
    }
  }


  componentDidMount() {
    var that = this;
    fetch(Constants.API_URL+'/matches', {
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




  return (


    <div className={styles.root}>
    <Grid container spacing={12}>
      <Grid item xs={12} sm={4}  md={4}  lg={24} xl={4}></Grid>
      <Grid item xs={12} sm={16} md={16} lg={24} xl={4} style={{ textAlign: "center" }}>
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
