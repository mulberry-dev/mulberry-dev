const ContactGraphic = () => (
  <div className="contact-graphic" aria-hidden="true">
    <div className="contact-graphic__orbit contact-graphic__orbit--outer">
      <span className="contact-graphic__node contact-graphic__node--teal" />
    </div>
    <div className="contact-graphic__orbit contact-graphic__orbit--mid">
      <span className="contact-graphic__node contact-graphic__node--purple" />
    </div>
    <div className="contact-graphic__orbit contact-graphic__orbit--inner">
      <span className="contact-graphic__node contact-graphic__node--cyan" />
    </div>

    <svg className="contact-graphic__mark" viewBox="0 0 200 180" fill="none">
      <path
        className="contact-graphic__link"
        d="M28 36 L68 72"
        strokeWidth="1.2"
      />
      <path
        className="contact-graphic__link"
        d="M172 48 L138 78"
        strokeWidth="1.2"
      />
      <path
        className="contact-graphic__link"
        d="M158 148 L128 118"
        strokeWidth="1.2"
      />

      <circle className="contact-graphic__dot" cx="28" cy="36" r="3.2" />
      <circle className="contact-graphic__dot contact-graphic__dot--purple" cx="172" cy="48" r="2.6" />
      <circle className="contact-graphic__dot" cx="158" cy="148" r="3" />

      <path
        className="contact-graphic__bubble"
        d="M54 28h86c10 0 18 8 18 18v52c0 10-8 18-18 18H96l-18 20v-20H54c-10 0-18-8-18-18V46c0-10 8-18 18-18Z"
        strokeWidth="1.5"
      />

      <path
        className="contact-graphic__code"
        d="M86 62 72 80l14 18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="contact-graphic__code"
        d="M114 62l14 18-14 18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle className="contact-graphic__user" cx="164" cy="92" r="11" strokeWidth="1.3" />
      <circle className="contact-graphic__user" cx="164" cy="88" r="3.2" strokeWidth="1.3" />
      <path
        className="contact-graphic__user"
        d="M156.8 100.2c1.2-3.2 4-4.8 7.2-4.8s6 1.6 7.2 4.8"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  </div>
)

export default ContactGraphic
