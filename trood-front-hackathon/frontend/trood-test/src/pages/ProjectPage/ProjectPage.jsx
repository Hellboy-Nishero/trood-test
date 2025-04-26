import React, { useEffect, useRef } from 'react'
import "./ProjectPage.scss";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router'
import Input from '../../components/Input/Input';
import { Controller, useForm } from 'react-hook-form';
import { fetchProjects } from '../../store/api/projectApi';
import DatePicker from 'react-datepicker';
import { fetchVacancies } from '../../store/api/vacancyApi';

const ProjectPage = () => {

    const {id} = useParams();

    const projects = useSelector(state => state.project.projects);
    const vacancies = useSelector(state => state.project.vacancies);
    const project = projects.find(project => project.id === parseInt(id));

    const [day, month, year] = project.deadline.split("."); //destructure deadline to convert it into date-object later
    const date = new Date(year, month-1, day); //converts deadline into date-object

    const {register, control, watch} = useForm({
        defaultValues: {
            description: project.description,
            deadline: date,
            experience: project.experience
        }
    });

    const inputRef = useRef(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const watchedFields = watch();

    const handleDeleteProject = async () => {
        const res = await fetch(`/api/projects/${id}`, { //explaining to this URL-name is in my vite.config.js
            method: "DELETE"
        })

        if(res.ok){
            navigate("/");
            dispatch(fetchProjects());
        }
    }

    const handleUpdateProject = async (updatedData) => {
        const res = await fetch(`/api/projects/${id}`, {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                id: parseInt(id),
                name: project.name,
                experience: updatedData.experience,
                deadline: updatedData.deadline.toLocaleString().split(",")[0],
                description: updatedData.description
            })
        })

        if(res.ok){
            dispatch(fetchProjects());
        } else {
            console.log("Fail");
        }
    }

    const navigateToAddVacancy = () => {
        navigate(`/${id}/vacancies`)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleUpdateProject(watchedFields);
        }, 1000)

        return () => clearTimeout(timeout);
    }, [watchedFields]);

    useEffect(() => {
            dispatch(fetchVacancies(id));
    }, [])


  return (
    <>
        {
        project && 
        <>
            <div className="project-header">
                <h3 className="section-title">{project.name}</h3>
                <button className='btn' onClick={handleDeleteProject}>Delete project</button>
            </div>

            <div className="project-main">
                <form className="edit-form">
                    <Input type={"text"} 
                    label={"Experience"} 
                    name={"experience"} 
                    register={register} 
                    value={project.experience}
                    rules={{
                        minLength: {
                            value: 4,
                            message: "Experience field should containt at least 4 characters"
                        }
                    }} />
                    <div className="date">
                    <label>Deadline</label>
                    <Controller
                    control={control}
                    name="deadline"
                    defaultValue={date}
                    render={({field}) => (
                        <DatePicker
                        selected={field.value} 
                        dateFormat={"dd.MM.yyyy"} 
                        onChange={(date) => field.onChange(date)} 
                        ref={inputRef}/>
                    )} />
                </div>
                    <div className="description">
                        <label >Description</label>
                        <textarea 
                        {...register("description")} 
                        defaultValue={project.description} 
                        />
                    </div>
                </form>

                <button className='btn' onClick={navigateToAddVacancy}>Add vacancy</button>

                <h3 className="section-title">Hired people</h3>

                <div className="hired-people">
                    {
                        vacancies && vacancies.map(vacancy => 
                        {if(vacancy.project_id === parseInt(id)){
                            return (
                                <div className="employee" key={vacancy.id}>
                                <div className="employee__info">
                                    <h3 className="employee__position">{vacancy.field}</h3>
                                    <h4 className="employee__name">{vacancy.name}</h4>
                                </div>
        
                                <p className="employee__description">{vacancy.description}</p>
        
                                <div className="employee__rate-container">
                                    <span className="employee__rate">9/10</span>
                                </div>
                                <Link to={`vacancies/${vacancy.id}`} className='employee__more'>More →</Link>
                            </div>
                            )
                            } 
                        }
                        )
                    }
                </div>
            </div>
        </>
        }

    </>
  )
}

export default ProjectPage