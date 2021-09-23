import {
  category_container,
  category_header,
  category_content_posts,
  line,
} from './Category.module.css';
import { Post } from '../Post';
export const Category = ({ details }) => {
  return (
    <div className={category_container}>
      <p className={category_header}>- {details.name.toUpperCase()} -</p>
      <hr className={line} />

      <span>Posts:</span>
      <ul className={category_content_posts}>
        {details.posts.map((post) => (
          <li>
            <Post details={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};
