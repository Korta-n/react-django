import {
  footer,
  footer_info,
  section_header,
  footer_copyright,
  footer_links,
  info_section,
} from './Footer.module.css';
import { GitHubICO } from '../Icons/GitHubICO';
import { LinkedInICO } from '../Icons/LinkedInICO';
import { GmailICO } from '../Icons/GmailICO';

export const Footer = () => {
  return (
    <footer className={footer}>
      <div className={footer_info}>
        <div className={info_section}>
          <p className={section_header}>LOCATION</p>
          <p>Minsk,Belarus</p>
        </div>

        <div className={info_section}>
          <p className={section_header}>LINKS</p>

          <div className={footer_links}>
            <a href="https://github.com/Korta-n">
              <GitHubICO />
            </a>
            <a href="https://www.linkedin.com/in/kirill-lappo-9a9174204/">
              <LinkedInICO />
            </a>
            <a href="mailto:lappokirill@gmail.com">
              <GmailICO />
            </a>
          </div>
        </div>

        <div className={info_section}>
          <p className={section_header}>ABOUT</p>
          <p>
            This is example <br /> of Django + React project
          </p>
        </div>
      </div>

      <div className={footer_copyright}>
        <p>Copyright ©Kortan 2021</p>
      </div>
    </footer>
  );
};
