import { useState, useEffect } from 'react';
import axios from 'axios';
import { Category } from '../../Components/Category';
import { category_wrapper } from './CategoryWrapper.module.css';
export const CategoryWrapper = ({ match }) => {
  const [categoryDetails, setCategory] = useState(null);
  const id = match.params.id;

  useEffect(async () => {
    try {
      const { data: category } = await axios(`http://127.0.0.1:8000/api/category/${id}`);
      console.log(id, category);
      setCategory(category);
    } catch (e) {
      console.error(e);
    }
  }, [id]);
  return (
    <section className={category_wrapper}>
      {!categoryDetails ? (
        <div>
          <p>waiting :P</p>
        </div>
      ) : (
        <Category details={categoryDetails} />
      )}
    </section>
  );
};
