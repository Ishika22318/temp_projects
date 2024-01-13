import React from "react";
import { render,screen } from "@testing-library/react";
import Overviewsection from "../components/learningtab/overview";


describe("Overviewsection Component", () => {
  const cardData = {
    course_progress: 2,
    total_course: 5,
    course_completed: 3,
    average_score: 3.5
  };

  it("displays course progress correctly", () => {
    const { getByText } = render(<Overviewsection classname='col-12 col-lg-4        mt-2 overview-card-body' progress={cardData.course_progress} outOff={cardData.total_course} cardHeading="Courses in progress" cardText='Lorem ipsum dolor sit amet. Vel temporibus aperiam est'/>);
    const courseProgress =  screen.getByText("2 of 5");
    expect(courseProgress).toBeInTheDocument();
  });

  it("displays courses completed correctly", () => {
    const { getByText } = render(<Overviewsection classname='col-12 col-lg-4 mx-lg-2  mt-2 overview-card-body' progress={cardData.course_completed} outOff={cardData.total_course} cardHeading="Courses completed"  cardText='Lorem ipsum dolor sit amet. Vel temporibus aperiam est'/>
    );
    const coursesCompleted = screen.getByText("3 of 5");
    expect(coursesCompleted).toBeInTheDocument();
  });

  it("displays average scores correctly", () => {
    const { getByText } = render(<Overviewsection classname='col-12 col-lg-4       mt-2 overview-card-body'progress={cardData.average_score} outOff='4' cardHeading="Average Scores" cardText='Lorem ipsum dolor sit amet. Vel temporibus aperiam est'/>
    );
    const averageScores =  screen.getByText("3.5 of 4");
    expect(averageScores).toBeInTheDocument();
  });
});
