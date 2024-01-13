import React, { useState, useEffect } from 'react';
import {TextField, Button, Checkbox, Select, Grid, MenuItem, FormControl, Paper, Box, Chip, Stack,FormLabel, FormControlLabel, RadioGroup, Radio, Divider, InputAdornment,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import * as styles from './EditFormStyles';
import { editBatchApi, getCoursesAndJobRolesApi } from '../../services/batchapi';
import { menuBoxStyle } from './EditFormStyles'; // Adjust the path as needed
import { handleError } from "../../utils/handleError";
import { batchDetailsAPI  } from '../../services/batchapi';
import {fetchUsersData} from '../../utils/usersAPI';
import CircularProgress from "@mui/material/CircularProgress";
const programs=['Generic Training', 'Soft Skills Training', 'Technical Skills Training' , 'Certification Training'];
const EditForm = () => {
  const location = useLocation();
  const batchId = location.state ? location.state.id : null;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [batchStatus, setBatchStatus] = useState('');
  const [about, setAbout] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [roles , setRoles] = useState([]);
  const [allCourses , setAllCourses] = useState([]);
  const [courses , setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchInterns, setSearchInterns] = useState('');
  const [batchEndDateUnavailable, setBatchEndDateUnavailable] = useState(false);
  const [selectedSearchResults, setSelectedSearchResults] = useState([]);
  const [interns , setInterns] = useState([]);
  const format_date = (date) => date ? new Date(date).toISOString().split('T')[0] : '';
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  

  const handleSearchChange = (e) => {
    setSearchInterns(e.target.value);
    setMenuOpen(!!e.target.value);
  };

  const handleSearchClick = ()=>{
    setMenuOpen(!menuOpen);
    setSearchInterns("");
  }

  const handleEditBatch = () => {
    navigate("/batch");
  };
  const fetchDataFromApi = async()=>{
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.clear();
        navigate("/401");
      }

      const { data} = await batchDetailsAPI(batchId);
      const {courses, jobRoles} = await getCoursesAndJobRolesApi();
      setAllCourses(courses);
      setRoles(jobRoles);
      const usersJson = await fetchUsersData();
      const users  = usersJson.data;
      console.log("Users" , users);
      let fetchedInterns = [];
      let fetchedSelectedInterns=[];

      console.log(users);

      users.map((user , index)=>{
          if(user.role === "Intern" )
          {
            fetchedInterns.push({name:user.name , id:user.id , email:user.email});
            if(user.batchId.includes(batchId) )
            {
              fetchedSelectedInterns.push({name:user.name , id:user.id , email:user.email});
            }
          }
          
        })
        setInterns(fetchedInterns);
        setSelectedSearchResults(fetchedSelectedInterns);
        const batchData = data.data;
        setAbout(batchData.description);
        setSelectedPrograms(batchData.program);
        setName(batchData.batch_name);
        setSelectedRoles(batchData.role.map((singleRole)=>singleRole.id));
        setStartDate(format_date(batchData.start_date));
        setEndDate(format_date(batchData.end_date));
        setBatchStatus(batchData.status);
        setBatchEndDateUnavailable(!batchData.end_date);
        const refractoreSelectedCourses =   courses.filter((singleCourse)=>{
          return singleCourse.data.some((c)=>batchData.coursesID.includes(c._id));
        })
        setSelectedCourses(refractoreSelectedCourses);
        let roleIds = batchData.role.map((batch)=>batch.id);
       let filteredCourses = courses.filter((singleCourse)=>{
       //let present = singleCourse.data.some((c) => roleIds.includes(c.jobRole));

       let present = (!singleCourse.data.some((c)=>c.courseType==="Technical Skills Training") && singleCourse.data.some((c)=>batchData.program.includes(c.courseType)) ) || (singleCourse.data.every((c)=>c.courseType==="Technical Skills Training") && singleCourse.data.some((c)=>roleIds.includes(c.jobRole)));
      console.log(present);
      return present;

       // return present;
       })
       setCourses(filteredCourses);
      setIsLoading(false);
    }
    catch (error) {
      handleError(error, navigate)
    }
  }

  useEffect(() => {
   filter();
  }, [ selectedPrograms, selectedRoles]);


  // const filter = ()=>{
  //   console.log("Removing");
  //   console.log("selectedRoles",selectedRoles);

  //   let selectedCoursesToShow = selectedCourses.filter((singleCourse)=>{
  //     let present = singleCourse.data.some((c)=>selectedRoles.includes(c.jobRole));
  //     console.log(present);
  //     return present;
  //   })
  //   setSelectedCourses(selectedCoursesToShow);

  //   let filteredCourses = allCourses.filter((singleCourse)=>{
  //     let present = singleCourse.data.some((c)=>selectedRoles.includes(c.jobRole));
  //     console.log(present);
  //     return present;
  //   })
  //   console.log("filteredcourses",filteredCourses);
  //   setCourses(filteredCourses);
  // }


  
  const filter = ()=>{
    console.log("Removing" , selectedPrograms);
    console.log("selectedRoles",selectedRoles);

    let selectedCoursesToShow = selectedCourses.filter((singleCourse)=>{
      let present = (!singleCourse.data.some((c)=>c.courseType==="Technical Skills Training") && singleCourse.data.some((c)=>selectedPrograms.includes(c.courseType)) ) || (singleCourse.data.every((c)=>c.courseType==="Technical Skills Training") && selectedPrograms.includes("Technical Skills Training") && singleCourse.data.some((c)=>selectedRoles.includes(c.jobRole)));
      console.log(present);
      return present;
    })
    setSelectedCourses(selectedCoursesToShow);

    let filteredCourses = allCourses.filter((singleCourse)=>{
      let present = (!singleCourse.data.some((c)=>c.courseType==="Technical Skills Training") && singleCourse.data.some((c)=>selectedPrograms.includes(c.courseType)) ) || (singleCourse.data.every((c)=>c.courseType==="Technical Skills Training") && selectedPrograms.includes("Technical Skills Training") && singleCourse.data.some((c)=>selectedRoles.includes(c.jobRole)));
      console.log(present);
      return present;
    })
    console.log("filteredcourses",filteredCourses);
    setCourses(filteredCourses);
  }


  useEffect(() => {
    fetchDataFromApi();
  }, [batchId]);

  const isFormValid = () => (
    name.trim() !== '' &&
    selectedRoles.length > 0 &&
    selectedPrograms.length > 0 && 
    startDate !== '' &&
    selectedCourses.length > 0 &&
    (!batchEndDateUnavailable || (batchEndDateUnavailable && endDate === ''))
  );
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid()) {

      let selectedCoursesID = selectedCourses
      .map((course) => {
        if(course.data.every((c)=>c.courseType==="Technical Skills Training"))
        {
          return course.data.filter((d)=>selectedRoles.includes(d.jobRole)).map((c)=>c._id);
        }
        else{
          return course.data.filter((d)=>selectedPrograms.includes(d.courseType)).map((c)=>c._id);
        }
      });


      // let selectedCoursesID = selectedCourses
      // .map((course) => {
      //   return course.data.filter((d)=>selectedRoles.includes(d.jobRole)).map((c)=>c._id);
      // });
      selectedCoursesID=[].concat(...selectedCoursesID)
      const updatedData = {
        batch_name: name,
        description: about,
        role: selectedRoles,
        start_date: startDate,
        end_date: batchEndDateUnavailable ? null : endDate,
        status: batchStatus,
        updated_on: new Date(),
        program: selectedPrograms,
        coursesID:selectedCoursesID,
      };
          console.log("Batch Data to upload:" , updatedData);
          const internsToAdd = selectedSearchResults.map((intern)=>intern.id);
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            localStorage.clear();
            navigate("/401");
          }
          const res = await editBatchApi(updatedData , batchId , internsToAdd);
          console.log(res);

        
          if(res.message === 'batch name must be unique')
          {
              alert('batch name must be unique');
          }
          else{
            navigate("/batch");
          }

        }
        catch (error) {
          handleError(error, navigate)
        }
  };
}

  return (

    <div>

    { isLoading && (
      <div className="loader-class-learning col-12 ">
        <Stack
          sx={{ color: "grey.600" }}
          spacing={3}
          className="col-1 mx-auto"
          style={{ marginTop: "30vh" }}
        >
          <CircularProgress color="inherit" />
        </Stack>
      </div>
      ) 
  }

{
  !isLoading &&
    <Box maxWidth="100%" style={{ background: '#FFFFFF' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <label>Batch name</label>
          <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} margin="normal" required />
          <label>About this batch</label>
          <TextField fullWidth multiline rows={3} value={about} onChange={(e) => setAbout(e.target.value)} style={{ padding: '0px 20px 20px 0' }} />
          <Divider></Divider>
          <FormControl fullWidth  style={styles.chooseRolesFormControl}> 
            <FormLabel>Batch status</FormLabel>
            <RadioGroup row name="row-radio-buttons-group" value={batchStatus} onChange={(e) => setBatchStatus(e.target.value)}>
              {['In Progress', 'Completed', 'Blocked'].map(status => (
                <FormControlLabel
                  key={status}
                  value={status}
                  control={<Radio checked={batchStatus === status} />}
                  label={status}
                />
              ))}
            </RadioGroup>
          </FormControl>



          <Grid container display="flex" alignItems="center" justifyContent="start">
            <Grid item xs={5.5} sm={4}>
              <label>Batch starts from</label>
              <TextField
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item sm={4} xs={5.5} style={{ marginLeft: '20px' }}>
              <label>Batch ends on</label>
              <TextField
                type="date"
                value={batchEndDateUnavailable ? '' : endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                inputProps={{ min: startDate, disabled: batchEndDateUnavailable }}
              />
            </Grid>
          </Grid>

          <FormControlLabel
            control={
              <Checkbox
                checked={batchEndDateUnavailable}
                onChange={() => {
                  setBatchEndDateUnavailable(!batchEndDateUnavailable);
                  setEndDate('');
                }}
              />
            }
            label="Batch end date isn't available"
          />
          <br></br>



          <label>*Choose program</label>
          <FormControl fullWidth display="flex" alignItems="center" justifyContent="space-between" style={{ padding: '15px 20px 30px 0' }}>
              <Select multiple data-testid="programField" value={selectedPrograms}
                onChange={(e) => setSelectedPrograms(e.target.value)}
                renderValue={(selected) => (selected.map((value)=> (
                  <Chip 
                    label={value} 
                    variant="outlined"
                    onDelete={()=>setSelectedPrograms(
                      selectedPrograms.filter((item) => item !== value)
                    )}
                    deleteIcon={
                      <CancelIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    } 
                    sx={{ mr: 1 }}
                  />)))
                }
              >
                {programs.map((program) => (
                  <MenuItem key={program} value={program}>
                    <Checkbox 
                      checked={selectedPrograms.includes(program)}
                    />
                  {program}
                  </MenuItem>
                ))}
              </Select> 
          </FormControl>








<Box style={{ ...menuBoxStyle, display: menuOpen ? 'block' : 'none' }}>
            {interns
              .filter((intern) => intern.name.toLowerCase().includes(searchInterns.toLowerCase()))
              .map((intern) => (
                <MenuItem key={intern.name}>
                  <Checkbox
                    checked={selectedSearchResults.some(function(obj) {
                      return obj.email === intern.email;
                    })}
                    onChange={() => {
                      if (selectedSearchResults.some(function(obj){ return obj.email === intern.email;})) {
                        setSelectedSearchResults(prevResults => prevResults.filter(item => item.email !== intern.email));
                      } else {
                        setSelectedSearchResults(prevResults => [...prevResults, intern]);
                      }
                    }}
                  />
                  <div>
                    <span style={{ color: '#5C5C5C' }}>{intern.name}</span>
                    <br />
                    <span style={{ color: '#999999' }}>{intern.email}</span>
                  </div>
                </MenuItem>
              ))}
          </Box>








          




          <div style={{ marginTop: '10px' }}>
            <label>Choose roles</label>
            <FormControl fullWidth  style={styles.chooseRolesFormControl}>
              <Select
                value={selectedRoles}
                multiple
                onChange={(e) => setSelectedRoles(e.target.value)}
                required
                renderValue={(selected) => (
                  <Stack direction="row" spacing={1}>
                    {selected.map((item, index) => (
                      <Chip
                        key={item}
                        label={roles.filter((role)=>role._id===item)[0].roleName}
                        variant="outlined"
                        onDelete={() =>
                          setSelectedRoles((prevSelected) =>
                            prevSelected.filter((role) => role !== item)
                          )
                        }
                        deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
                        sx={{ mr: 1 }}
                      />
                    ))}
                  </Stack>
                )}
              >
                {roles.map((role) => (
                  <MenuItem key={role._id} value={role._id}>
                    <Checkbox checked={selectedRoles.includes(role._id)} />
                    {role.roleName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>


                  






          <div style={{ marginTop: '8px' }}>
          <label>*Choose courses</label>
          <FormControl fullWidth display="flex" alignItems="center" justifyContent="space-between" style={{ padding: '15px 20px 30px 0' }}>
              <Select
                multiple
                value={selectedCourses}
                onChange={(e) => setSelectedCourses(e.target.value)}
                renderValue={(selected) => (selected.map((value)=> (
                  <Chip 
                    key={value}
                    label={courses.find((course) => course.courseName === value.courseName).courseName
                    } 
                    variant="outlined"
                    onDelete={()=>setSelectedCourses(
                      selectedCourses.filter((item) => item !== value)
                    )}
                    deleteIcon={
                      <CancelIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    } 
                    sx={{ mr: 1 }}
                  />
                )))
                }
              >

                {courses.map((course) => (
                  <MenuItem key={course.data} value={course}>
                    <Checkbox 
                    checked={selectedCourses.includes(course)}
                    />
                  {course.courseName}
                  </MenuItem>
                ))}
              </Select> 
          </FormControl>


          </div>

          <div style={{ marginTop: '8px' }}>
            <label>Choose interns</label>
            <FormControl fullWidth  style={styles.chooseRolesFormControl}>
              <TextField
                value={searchInterns}
                onChange={handleSearchChange}
                onClick={handleSearchClick}
                fullWidth
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <div>
              {selectedSearchResults.map((result) => (
                <Chip
                  key={result.name}
                  label={result.name}
                  variant="outlined"
                  onDelete={() => setSelectedSearchResults(prevResults => prevResults.filter(item => item.id !== result.id))}
                  deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
                  sx={{ mr: 1, marginBottom: '8px' }}
                />
              ))}
            </div>
          </div>

          <Box mt={2} style={styles.buttonStyle}>
            <Button onClick={handleEditBatch} color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={!isFormValid()}>
              Update
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
}
</div>
  );
};

export default EditForm;