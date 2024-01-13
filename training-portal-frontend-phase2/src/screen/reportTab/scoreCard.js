import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SCORECARD } from '../../utils/constants';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  score_out_of: {
    fontSize: '65%',
    fontWeight: '500',
    display: 'inline-block',
    padding: '0 0.5%',
  },
  score_card: {
    boxShadow: '0px 1px 3px #c2c1c1',
    border: '2px solid #D9DAE4',
    margin: '2%',
    paddingBottom: '0%',
    paddingTop: '0%',
    borderRadius: '15px !important',
    width: '96%',
    height: '100%',
  },
  container: {
    color: '#0e4d94',
    padding: '0.5rem',
    paddingTop: '0.1rem',
    mariginTop: '0%',
  },
  box1: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  average_score: {
    fontSize: '2.2rem',
    fontWeight: '500',
    marginTop: '0%',
    marginRight: theme.spacing(1),
  },
  total_score: {
    paddingTop: '14%',
  },
  remark: {
    padding: '1%',
    fontSize: '1.5rem',
    float: 'right',
    textAlign: 'right',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  scores: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  score_box: {
    color: 'white',
    margin: 'auto',
    padding: '3%',
    height: '100%',
    width: '100% !important',
    textAlign: 'center',
  },
  scoreboxBlue: {
    backgroundColor: '#0D4896',
    paddingBottom: '1rem',
  },
  scoreboxGreen: {
    backgroundColor: '#068955',
    paddingBottom: '1rem',
  },
}));

export default function ScoreCard({ scoreData }) {
  const classes = useStyles();
  return (
    <>
      {scoreData && (
        <Card className={classes.score_card}>
          <CardContent>
            <div className={classes.container} data-testid='score-card'>
              <div>
                <Typography variant='h2' className={classes.average_score}>
                  {scoreData.data.averageScore}
                  <Typography variant='body2' className={classes.score_out_of}>
                    {' of 4'}
                  </Typography>
                </Typography>
              </div>

              <div className={classes.box1}>
                <div>
                  <Typography
                    variant='subtitle1'
                    className={classes.total_score}
                  >
                    Total Score
                  </Typography>
                </div>
                <div>
                  <Typography variant='body1' className={classes.remark}>
                    {scoreData.data.grade}
                  </Typography>
                </div>
              </div>
              <hr />
            </div>

            <Grid container spacing={2} className={classes.scores}>
              {SCORECARD.map((data, index) => (
                <Grid item xs={6} sm={4} md lg key={index}>
                  <div
                    className={`${classes.score_box} ${
                      classes[`scorebox${data.color}`]
                    }`}
                  >
                    <Typography variant='h5'>
                      {scoreData.data[data.dataKey]}
                    </Typography>
                    <Typography variant='subtitle1'>{data.label}</Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  );
}
