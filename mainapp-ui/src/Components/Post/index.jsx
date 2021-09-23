import {
  post_container,
  post_header,
  post_header_title,
  post_header_author,
  post_details,
  post_details_content,
  post_actions,
  post_actions_createdAt,
  post_actions_like_button,
} from './Post.module.css';
import { parseDate } from '../../Utils/parseDate';
export const Post = ({ details: { title, content, pub_date } }) => {
  const createdAt = parseDate(pub_date);
  return (
    <div className={post_container}>
      <div className={post_header}>
        <p className={post_header_title}>{title}</p>
        <p className={post_header_author}>Author: None</p>
      </div>
      <div className={post_details}>
        <p className={post_details_content}>{content}</p>
      </div>
      <div className={post_actions}>
        <p className={post_actions_createdAt}>{createdAt}</p>
        <button className={post_actions_like_button}>Like</button>
      </div>
    </div>
  );
};
