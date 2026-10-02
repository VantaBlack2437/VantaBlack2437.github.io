import { contactLinks } from "../data/portfolio.js";

export default function Contact() {
  return (
    <section className="contact wrap" aria-labelledby="contact-title">
      <div className="contact-row">
        <div>
          <span className="eyebrow">07 / Keep in touch</span>
          <h2 id="contact-title">Good things start<br />with a working prototype.</h2>
        </div>
        <div className="contact-actions">
          <a className="button-link" href="mailto:kvishesh.dev@gmail.com">kvishesh.dev@gmail.com <span aria-hidden="true">↗</span></a>
          {contactLinks.map(({ label, href, external }) => (
            <a className="text-link" href={href} key={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}