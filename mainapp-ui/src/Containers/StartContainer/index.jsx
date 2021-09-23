// import {
//   start_container,
//   start_shadow_paragraph,
//   start_paragraph,
//   status,
//   status_paragraph,
import { start_container, start_article, tech_tab } from './StartContainer.module.css';
import { SuccessICO } from '../../Components/Icons/SuccessICO';
import { GitHubICO } from '../../Components/Icons/GitHubICO';
export const StartContainer = () => {
  return (
    // <div>
    //   <p className={start_paragraph}>This is Django + React project</p>
    //   <p className={start_shadow_paragraph}>you can view it's source code in my GitHub</p>
    // </div>
    // <GitHubICO />
    // <div className={status}>
    //   <p className={status_paragraph}>If you see this message - project started correctly</p>
    //   <SuccessICO />
    // </div>
    <div className={start_container}>
      <div className={start_article}>
        <p>Dear, Customer</p>
        <p>
          This is <span className={tech_tab}>Django</span> + <span className={tech_tab}>React</span>{' '}
          project
        </p>
        <p>maded by myself [ Kortan: "Kirill Lappo" ]</p>
      </div>
    </div>
  );
};
