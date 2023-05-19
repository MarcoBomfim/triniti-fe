import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addActorRequest } from './actorsSlice';
import { makeStyles, ThemeProvider } from '@mui/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, Snackbar, SnackbarContent } from '@mui/material';

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    backgroundColor: '#F7EAEA', // Light pinkish red
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px', // Adjust the spacing as desired
  },
  header: {
    color: '#6A0D2F', // Deep red
    marginBottom: '24px', // Adjust the spacing as desired
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#F7EAEA', // Same as page background
    padding: '30px',
  },
  formField: {
    marginBottom: '16px',
  },
  buttonContainer: {
    marginTop: '16px'
  },
  submitButton: {
    color: '#FFFFFF', // White
    backgroundColor: '#A40E4C', // Deep wine
    marginBottom: '16px', // Adjust the spacing as desired
    '&:hover': {
      backgroundColor: '#790B38', // Darker wine
    },
    '&.MuiButton-contained': {
      color: '#FFFFFF', // White
      backgroundColor: '#A40E4C', // Deep wine
      '&:hover': {
        backgroundColor: '#790B38', // Darker wine
      },
    },
  },
  backButton: {
    color: '#E84D76', // Lighter shade of wine
    marginBottom: '16px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.MuiButton-contained': {
      color: '#FFFFFF', // White
      backgroundColor: '#A40E4C', // Deep wine
      '&:hover': {
        backgroundColor: '#790B38', // Darker wine
      },
    },
  },
});

// Define the component
const CreateActorPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const actor = {
      firstName,
      lastName,
      age: parseInt(age),
    };

    dispatch(addActorRequest(actor))
    .then(() => {
      setFirstName('');
      setLastName('');
      setAge('');
      setSuccessOpen(true);
    })
    .catch(() => {
      setErrorOpen(true);
    });

    setFirstName('');
    setLastName('');
    setAge('');
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Container maxWidth="sm">
          <Typography variant="h4" className={classes.header}>
            Create Actor
          </Typography>

          <Box textAlign="center" marginBottom="16px" className={classes.buttonContainer}>
            <Button
              variant="contained"
              className={classes.backButton}
              onClick={() => window.history.back()}
            >
              Back
            </Button>
          </Box>

          <form onSubmit={handleSubmit} className={classes.formContainer}>
            <TextField
              label="First Name"
              variant="outlined"
              className={classes.formField}
              fullWidth
              margin="dense"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              className={classes.formField}
              fullWidth
              margin="dense"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <TextField
              label="Age"
              type="number"
              variant="outlined"
              className={classes.formField}
              fullWidth
              margin="dense"
              value={age}
              onChange={e => setAge(e.target.value)}
            />
            <Box textAlign="center" className={classes.buttonContainer}>
              <Button
                type="submit"
                variant="contained"
                className={classes.submitButton}
              >
                Create
              </Button>
            </Box>
          </form>
        </Container>
        <Snackbar
          open={successOpen}
          autoHideDuration={3000}
          onClose={handleSuccessClose}
        >
          <SnackbarContent
            message="Actor created successfully!"
            style={{ backgroundColor: '#00C853' }} // Green color
          />
        </Snackbar>

        {/* Error Alert */}
        <Snackbar
          open={errorOpen}
          autoHideDuration={3000}
          onClose={handleErrorClose}
        >
          <SnackbarContent
            message="Failed to create actor!"
            style={{ backgroundColor: '#D50000' }} // Red color
          />
        </Snackbar>
      </div>
    </ThemeProvider>
  );
};

export default CreateActorPage;