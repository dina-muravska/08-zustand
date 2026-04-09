import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Dina Muravska</p>
          <p>
            Contact us:
            <a href="dina.muravska.25@gmail.com">dina.muravska.25@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
