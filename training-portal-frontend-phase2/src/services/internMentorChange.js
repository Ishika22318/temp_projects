export const internMentorChange = (selected, userData, handleChange, assignmentType) => {
  const updatedAssignedAssignments = [];
  const removedAssignments = [];

  for (const assignment of selected) {
    const [name, email] = assignment.split("|");
    const assignmentExists = userData[assignmentType].some((item) => item.email === email);

    if (!assignmentExists) {
      updatedAssignedAssignments.push({ name, email });
    }
  }

  for (const assignment of userData[assignmentType]) {
    const email = assignment.email;
    if (!selected.includes(`${assignment.name}|${email}`)) {
      removedAssignments.push(email);
    }
  }

  const updatedAssignments = userData[assignmentType].filter((item) => !removedAssignments.includes(item.email));
  handleChange({
    target: {
      name: assignmentType,
      value: [...updatedAssignments, ...updatedAssignedAssignments],
    },
  });
};
