import React from 'react'
import "./Vacancies.scss";
import Input from '../../components/Input/Input';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVacancies } from '../../store/api/vacancyApi';

const Vacancies = () => {

  const {id} = useParams(); //gets project id in which we want to add a vacancy

  const projects = useSelector(state => state.project.projects);
  const project = projects.find(project => project.id === parseInt(id));

  const fields = ["Design", "Development", "Marketing"];

  const {register, handleSubmit, formState: {errors}, reset} = useForm();

  const dispatch = useDispatch();

  

  const handleCreateVacancy = async (data) => {
    const res = await fetch(`/api/projects/${id}/vacancies`, {
      method: "POST",
      body: JSON.stringify({
        country: data.country,
        description: data.description,
        experience: data.experience,
        field: data.field,
        id: Date.now(),
        name: data.name,
        project_id: parseInt(id)
      })
    })

    if(res.ok){
      dispatch(fetchVacancies(id));
      reset();
    }

  }

  return (
    <>
      <h3 className="section-title">Create vacancy for "{project.name}"</h3>
      {errors.name && <p className='error'>{errors.name.message}</p>}
      {errors.field && <p className='error'>{errors.field.message}</p>}
      {errors.experience && <p className='error'>{errors.experience.message}</p>}
      {errors.country && <p className='error'>{errors.country.message}</p>}
      
      <form className="create-form" onSubmit={handleSubmit(handleCreateVacancy)}>
        <Input name={"name"}
        type={"text"}
        label={"Name"}
        register={register}
        rules={{
          required: {
            value: true,
            message: "Name is required"
        },
        minLength: {
            value: 2,
            message: "Name should contain at least 2 characters"
        }
        }}
         />

        <div className="select">
          <label>Field</label>
          <select defaultValue={"select"} {...register("field", {
            validate: (data) => {
              return data !== "select" || "Please select the field"; //check wether field was selected or not. If not - error comes up
            }
          })}>
              <option value={"select"} disabled>Select</option>
              {
                  fields.map(field => <option key={field} value={field}>{field}</option>)
              }
          </select>
        </div>

        <Input 
        type={"text"}
        name={"experience"} 
        label={"Experience"}
        register={register}
        rules={{
          required: {
            value: true,
            message: "Experience is required"
        },
        minLength: {
            value: 4,
            message: "Experience field should containt at least 4 characters"
        }
        }}
        />

        <Input
        type={"text"}
        name={"country"} 
        label={"Country"}
        register={register}
        rules={{
          required: {
            value: true,
            message: "Country is required"
        },
        minLength: {
            value: 3,
            message: "Country field should containt at least 3 characters"
        }
        }}
        />

        <div className="description">
            <label >Description</label>
            <textarea {...register("description")} />
        </div>
            <button className='btn' type='submit'>Create vacancy</button>
      </form>
    </>
  )
}

export default Vacancies