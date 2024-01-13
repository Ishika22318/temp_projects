import React from 'react';
import moment from 'moment';
import { Box, Typography, Divider, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  week_card: {
    color: '#0D4896',
    justifyContent: 'center',
    display: 'inline-block',
    border: '1px solid #D9DAE4',
    padding: '1%',
    marginTop: '0%',
    marginBottom: '2%',
    marginLeft: '2%',
    width: 'calc(47% - 0%)',
    borderRadius: '15px !important',
    boxSizing: 'border-box',
    [theme.breakpoints.down('md')]: {
      width: 'calc(50% - 2% - 4px)',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 2% - 4px)',
      marginBottom: '2%',
    },
  },
  week_box: {
    fontFamily: 'Poppins',
    overflow: 'hidden !important',
    fontStyle: 'normal',
    textAlign: 'center',
    color: 'black',
    margin: '1rem 0.5rem',
    padding: '5%',
    border: '1px solid #D9DAE4',
    height: '70%',
    width: 'calc(20% - 5px)',
    flexGrow: 2,
    [theme.breakpoints.up('md')]: {
      flexBasis: '20%',
      margin: '1rem 0.5rem',
    },
    [theme.breakpoints.up('lg')]: {
      flexBasis: '20%',
      margin: '1rem 0.5rem',
    },
  },

  flexbox_container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  week_name: {
    fontSize: '1.5rem',
    color: '#0D4896',
  },
  week_date: {
    fontSize: 'medium',
    fontWeight: '500',
    padding: '1%',
    float: 'right',
    textAlign: 'right',
  },
  subtitle: {
    fontSize: '0.77rem',
    fontWeight: '400',
    justifyContent: 'center',
    marginTop: '0.0rem',
    lineHeight: '1.3',
  },
  mentor_feedback: {
    color: '#0D4897',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'flex-start',
  },
  feedback: {
    marginTop: theme.spacing(2),
    color: 'black',
  },
  feedback_icon: {
    color: '#0e4d94',
    marginRight: '1% !important',
    padding: 'auto',
    display: 'inline-block',
  },
}));

export default function WeekCard({ weekData }) {
  const classes = useStyles();
  const {
    weekId,
    startingDate,
    endingDate,
    assignment,
    mentorFeedbacks,
    timeManagement,
    overallAssessment,
    communicationSkill,
    attendanceParticipation,
  } = weekData;

  // Determine the background color and border color based on the score
  const getColor = (label, score) => {
    if (label === 'Overall Assessment') {
      score = score / 25;
    }
    if (label === 'Assignment') {
      score = score / 2.5;
    }

    switch (true) {
      case score < 2.5 && score > 0:
        return { bgColor: '#F9DCDF', borderColor: '#E93820' }; // red

      case score < 3.25 && score >= 2.5:
        return { bgColor: '#F7E6B5', borderColor: '#E8B321' }; // yellow

      default:
        return { bgColor: '', borderColor: '' };
    }
  };

  const scoreBoxes = [
    { label: 'Overall Assessment', score: overallAssessment },
    { label: 'Assignment', score: assignment },
    { label: 'Attendance & Participation', score: attendanceParticipation },
    { label: 'Time Management', score: timeManagement },
    { label: 'Communication Skills', score: communicationSkill },
  ];

  return (
    <div className={classes.week_card}>
      <Box>
        <Typography variant='h4' className={classes.week_name}>
          Week {weekId}
          <span className={classes.week_date}>
            {moment(startingDate).format('Do MMMM YYYY')} -{' '}
            {moment(endingDate).format('Do MMMM YYYY')}
          </span>
        </Typography>
      </Box>
      <hr />
      <Grid container spacing={2} className={classes.flexbox_container}>
        {scoreBoxes.map((scoreBox, index) => {
          const { bgColor, borderColor } = getColor(
            scoreBox.label,
            scoreBox.score
          );
          return (
            <Grid item xs={4} sm md={4} lg key={index}>
              <Box
                className={`${classes.week_box} ${classes.border}`}
                style={{
                  backgroundColor: bgColor,
                  borderColor: borderColor,
                  width: '100%', // The width will be 100% for all screen sizes.
                }}
              >
                <Typography variant='h5'>{scoreBox.score}</Typography>
                <Typography variant='subtitle1' className={classes.subtitle}>
                  {scoreBox.label}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Divider />
      <Box className={classes.feedback}>
        <Typography variant='h6' className={classes.mentor_feedback}>
          <Typography variant='body1' className={classes.feedback_icon}>
            <ModeCommentIcon />
          </Typography>
          Mentor's Feedback
        </Typography>
        <Typography variant='body1'>{mentorFeedbacks.join('. ')}</Typography>
      </Box>
       
    </div>
  );
}
