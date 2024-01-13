import CourseContentAccordionListItem from "../components/courseContent/CourseContentAccordionListItem"
import {  render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const data="HTML syntax"



test("renders components", () => {
  render(
    <BrowserRouter>
      <CourseContentAccordionListItem courseItem={data} />
    </BrowserRouter>
  );
});
