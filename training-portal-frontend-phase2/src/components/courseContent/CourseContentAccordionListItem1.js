import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: '4px',
  },
  icon: {
    marginLeft: '5px',
  },
}));

export default function CourseContentAccordionListItem({ courseItem }) {
  const classes=useStyles()
  return (
    <div className={classes.container}>
      <ArrowRightIcon />
      <span className={classes.icon}>{courseItem}</span>
    </div>
  );
}
