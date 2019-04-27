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


//custom components
import AddDetails from './components/AddDetails.jsx';
import Settings from './components/Settings.jsx';
import Results from './components/Results.jsx';

import { SnackbarProvider } from 'notistack';

function TabContainer(props) {


  function getDetails(){
    fetch('http://127.0.0.1:8888/matches/get-matches', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function(response) {
      return response.json();
    }).then(function(myJson) {
      console.log(myJson);
  });
  }
  getDetails();

  const bull = <span className={styles.bullet}>•</span>;

  return (
    <Card className={styles.card}>
     <CardContent>
       <Typography className={styles.title} color="textSecondary" gutterBottom>
         Word of the Day
       </Typography>
       <Typography variant="h5" component="h2">
         be
         {bull}
         nev
         {bull}o{bull}
         lent
       </Typography>
       <Typography className={styles.pos} color="textSecondary">
         adjective
       </Typography>
       <Typography component="p">
         well meaning and kindly.
         <br />
         {'"a benevolent smile"'}
       </Typography>
     </CardContent>
     <CardActions>
       <Button size="small">Learn More</Button>
     </CardActions>
   </Card>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flex:1,
    flexGrow: 1,
    justifyContent: 'center',
alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    justifyContent: 'center',
alignItems: 'center',
flex:1
  },
  input: {
    display: 'none',
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      padding:10
    },
    media: {
  height: 0,
  paddingTop: '56.25%', // 16:9,
  marginTop:'30'
}
});


class SimpleTabs extends React.Component {
  state = {
  value: 0,
  age: '',
  name: 'hai',
  labelWidth: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (

      <SnackbarProvider maxSnack={3}>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} centered>
            <Tab label="Match Results" />
            <Tab label="Add Details" />
            <Tab label="Settings" />
          </Tabs>
        </AppBar>
        {value === 0 && <Results>Match Results</Results>}
        {value === 1 && <AddDetails>Add Details</AddDetails>}
        {value === 2 && <Settings>Settings</Settings>}
        </div>
      </SnackbarProvider>

    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
