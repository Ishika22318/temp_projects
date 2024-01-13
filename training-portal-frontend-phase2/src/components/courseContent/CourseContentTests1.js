import * as React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  testLink:{
    textDecoration: "none !important",
     color: "inherit"
  },
  testLinkDiv:{
    color: "#0D4896",
    display: "flex",
    alignItems: "center",
  },
  marginLeft:{
    marginLeft:10
  }
}));

export default function CourseContentTests({label,description,link}) {
  const classes=useStyles()
  return (
    <Link
      data-testid="testLink"
      to={link}
      className={classes.testLink}
      target="_blank"
    >
      <Box mt={4}>
        <Card>
          <CardContent>
            <div
              className={classes.testLinkDiv}
            >
              {label=="Assessment"?<span data-testid="Icon"><MenuBookIcon /></span>:<span data-testid="ElseIcon">< DescriptionIcon /></span>}
              <Typography
                variant="h5"
                component="div"
                className={classes.marginLeft}
              >
                {label}
              </Typography>
            </div>
            <Typography
              sx={{ fontSize: 14, mt: 2 }}
              color="text.secondary"
              gutterBottom
            >
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Link>
  );
}
