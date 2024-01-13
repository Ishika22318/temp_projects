import React from "react";
import { Typography } from "@material-ui/core";

function ErrorPage({ message }) {
  return (
    <div data-testid="ErrorPage" >
      <Typography variant="h1" component="h1">
        Error Page
      </Typography>
      <Typography variant="body1" component="p">
        {message}
      </Typography>
      {/* Add additional error handling UI and logic as needed */}
    </div>
  );
}

export default ErrorPage;
