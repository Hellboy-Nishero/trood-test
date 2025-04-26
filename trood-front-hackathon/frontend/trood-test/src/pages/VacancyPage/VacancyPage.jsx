import React, { useEffect } from 'react'
import "./VacancyPage.scss";
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Input from '../../components/Input/Input';
import { useForm } from 'react-hook-form';

const VacancyPage = () => {

    const {vacancyId} = useParams();
    const {id} = useParams();

    const vacancies = useSelector(state => state.project.vacancies);
    const vacancy = vacancies.find(vacancy => vacancy.id === parseInt(vacancyId));

    const fields = ["Design", "Development", "Marketing"];

    const navigate = useNavigate();

    const {register, formState: {errors }, watch} = useForm({
        defaultValues: {
            id: parseInt(vacancyId),
            project_id: vacancy.project_id,
            name: vacancy.name,
            description: vacancy.description,
            field: vacancy.field,
            country: vacancy.country,
            experience: vacancy.experience
        }
    });

    const watchedFields = watch();

    const handleDeleteVacancy = async () => {
        const res = await fetch(`/api/vacancies/${vacancyId}`, {
            method: "DELETE"
        })
        if(res.ok){
            navigate(`/${id}`);
        }
    }

    const handleUpdateVacancy = async (updatedData) => {
        const res = await fetch(`/api/vacancies/${vacancyId}`, {
            method: "PUT",
            body: JSON.stringify(updatedData)
        });
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleUpdateVacancy(watchedFields);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [watchedFields])
    

  return (
    <>
        <div className="vacancy-header">
            <h3 className="section-title">{vacancy.name}</h3>
            <button className='btn' onClick={handleDeleteVacancy}>Close vacancy</button>
        </div>

        <div className="vacancy-main">
            <form className="edit-form">
                <div className="select">
                    <label>Field</label>
                    <select defaultValue={vacancy.field} {...register("field")}>
                        {
                            fields.map(field => <option key={field} value={field}>{field}</option>)
                        }
                    </select>
                </div>

                <Input 
                type={"text"} 
                label={"Experience"} 
                name={"experience"} 
                register={register} 
                value={vacancy.experience}
                />


                <div className="description">
                    <label >Description</label>
                    <textarea {...register("description")} defaultValue={vacancy.description}/>
                </div>
            </form>
        </div>

    </>
  )
}

export default VacancyPage