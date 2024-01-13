import CourseContentAccordion from "../components/courseContent/CourseContentAccordion"
import {  render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const data=
{
        "topic": "Introduction to HTML",
        "subtopics": [
          "HTML syntax",
          "Basic document structure",
          "HTML tags and elements"
        ]
      }


test("renders components", () => {
  render(
    <BrowserRouter>
      <CourseContentAccordion courseData={data} />
    </BrowserRouter>
  );
});
