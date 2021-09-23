import { navBar, navLogo, linksList, blogs_header } from './NavBar.module.css';
import { Link } from 'react-router-dom';
export const NavBar = ({ links }) => {
  return (
    <div className={navBar}>
      <span className={navLogo}>
        <Link to="/">
          blogov<span>.net</span>
        </Link>
      </span>
      <ul className={linksList}>
        <li>All blogs:</li>
        {links.map((e) => (
          <li key={e.id}>
            <Link to={`/category/${e.id}`}>{e.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
