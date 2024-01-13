import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PageTitle from '../../components/reportTab/pageTitle';
import ScoreCard from './scoreCard';
import WeekCard from './weekCard';
import { fetchData } from '../../utils/reportAPI';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({}));

export default function Report({ email }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [loader, setLoader] = useState(null);
  const [scoreData, setScoreData] = useState(null);
  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setLoader('loading');
      try {
        const data = await fetchData(email);
setScoreData(data);

        if (data && data.data && data.data.weeks) {
          setWeekData(data.data.weeks);
        } else {
          setWeekData([]);
        }
      } catch (error) {
        navigate('/500');
      }
      setLoader(null);
    };

    fetchDataFromAPI();
  }, []);

  return (
    <div className='col-12 px-0 mt-5 pt-3'>
      <div className={classes.root}>
        {email !== 'undefined' ? (
          ''
        ) : (
          <PageTitle key='title' title='Performance Report' />
        )}
        {loader === 'loading' ? (
          <div className='loader-class-learning col-12 '>
            <div className='spinner-learning mx-auto'></div>
          </div>
        ) : (
          <>
            <div data-testid='ScoreCard'>
              <ScoreCard scoreData={scoreData} />
            </div>
            <div className='dispweek' data-testid='WeekCard'>
              {weekData.map((week) => (
                <WeekCard key={week.weekId} weekData={week} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
