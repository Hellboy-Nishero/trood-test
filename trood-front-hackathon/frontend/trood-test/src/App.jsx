import {Routes, Route, BrowserRouter} from 'react-router';
import Layout from './pages/Layout';
import Projects from './pages/Projects/Projects';
import Vacancies from './pages/Vacancies/Vacancies';
import { Provider } from 'react-redux';
import store from './store/store.js';
import CreateProject from './pages/CreateProject/CreateProject.jsx';
import ProjectPage from './pages/ProjectPage/ProjectPage.jsx';
import VacancyPage from './pages/VacancyPage/VacancyPage.jsx';

function App() {


  return (
    <>
    <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Projects />} />
              <Route path='create-project' element={<CreateProject />} />
              <Route path=':id' element={<ProjectPage />} />
              <Route path=':id/vacancies' element={<Vacancies />} />
              <Route path=':id/vacancies/:vacancyId' element={<VacancyPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
