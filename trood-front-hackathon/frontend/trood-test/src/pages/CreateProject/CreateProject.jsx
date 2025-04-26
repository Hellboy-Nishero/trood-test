import React from 'react'
import "./CreateProject.scss";
import Input from '../../components/Input/Input'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchProjects } from '../../store/api/projectApi';

const CreateProject = () => {

    // const fields = ["Design", "Development", "Marketing"];

    const {register, handleSubmit, formState: { errors }, control, reset} = useForm();

    const date = new Date();

    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        const id = Date.now();

        const res = await fetch("/api/projects", { //explaining to this URL-name is in my vite.config.js
            method: "POST",
            body: JSON.stringify({
                deadline: data.date.toLocaleString().split(",")[0],
                description: data.description,
                experience: data.experience,
                id: id,
                name: data.name
            })
        })
        if(res.ok){
            reset();
            dispatch(fetchProjects());
        }
    }

    localStorage.clear();
  return (
    <>
        <h3 className="section-title">Creating project</h3>
        {errors.name && <p className='error'>{errors.name.message}</p>}
        {errors.experience && <p className='error'>{errors.experience.message}</p>}
        <form className="create-form" onSubmit={handleSubmit(onSubmit)}>
            <Input type={"text"} label={"Name"} register={register} name={"name"} rules={{ 
                //added simple validation
                required: {
                    value: true,
                    message: "Name is required"
                },
                minLength: {
                    value: 2,
                    message: "Name should contain at least 2 characters"
                }
            }} />

            {/*There is a field input on figma but it's impossible to insert this field into database because of missing of this field in the database */}

            {/* <div className="select">
                <label>Field</label>
                <select name="" id="" defaultValue={"Select"} {...register("field")}>
                    <option value={"select"} disabled>Select</option>
                    {
                        fields.map(field => <option key={field} value={field}>{field}</option>)
                    }
                </select>
            </div> */}
            
            <Input type={"text"} label={"Experience"} register={register} name={"experience"} rules={{
                required: {
                    value: true,
                    message: "Experience is required"
                },
                minLength: {
                    value: 4,
                    message: "Experience field should containt at least 4 characters"
                }
            }} />

            <div className="date">
                <label>Deadline</label>
                <Controller
                control={control}
                name="date"
                defaultValue={date}
                render={({field}) => (
                    <DatePicker
                    selected={field.value} 
                    dateFormat={"dd.MM.yyyy"} 
                    onChange={(date) => field.onChange(date)}/>
                )} />
            </div>

            {/*In documentation doesn't say that description is required, so I assume it's optional */}
            <div className="description">
                <label >Description</label>
                <textarea {...register("description")} />
            </div>
            <button className='btn' type='submit'>Create project</button>
        </form>


    </>
  )
}

export default CreateProject