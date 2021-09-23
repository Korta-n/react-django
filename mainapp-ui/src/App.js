import { useEffect, useState } from 'react';
import { NavBar } from './Components/NavBar';
import { mainContainer, main_content } from './App.module.css';
import { CategoryWrapper } from './Containers/CategoryContainer';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { StartContainer } from './Containers/StartContainer';
import { Footer } from './Components/Footer';

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    try {
      const { data: catagoriesData } = await axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/api/category',
      });
      setCategories(catagoriesData);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className={mainContainer}>
      <NavBar links={categories} />
      <section className={main_content}>
        <Switch>
          <Route exact path="/category/:id" component={CategoryWrapper} />
          <Route exact path="/" component={StartContainer} />
        </Switch>
      </section>
      <Footer />
    </div>
  );
};

export default App;
