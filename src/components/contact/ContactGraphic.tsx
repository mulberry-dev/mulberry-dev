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

    <svg className="contact-graphic__mark" viewBox="0 0 214 180" fill="none">
      <path
        className="contact-graphic__link"
        d="M28 36 L68 72"
        strokeWidth="1.2"
      />
      <path
        className="contact-graphic__link"
        d="M172 42 L146 70"
        strokeWidth="1.2"
      />
      <path
        className="contact-graphic__link"
        d="M158 148 L128 118"
        strokeWidth="1.2"
      />
      <path
        className="contact-graphic__link"
        d="M154 92 L168 92"
        strokeWidth="1.2"
      />

      <circle className="contact-graphic__dot" cx="28" cy="36" r="3.2" />
      <circle className="contact-graphic__dot contact-graphic__dot--purple" cx="172" cy="42" r="2.6" />
      <circle className="contact-graphic__dot" cx="158" cy="148" r="3" />

      <path
        className="contact-graphic__bubble"
        d="M50 30h82c10 0 18 8 18 18v50c0 10-8 18-18 18H92l-16 18v-18H50c-10 0-18-8-18-18V48c0-10 8-18 18-18Z"
        strokeWidth="1.5"
      />

      <path
        className="contact-graphic__code"
        d="M82 62 68 80l14 18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="contact-graphic__code"
        d="M110 62l14 18-14 18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g className="contact-graphic__persona" transform="translate(188 92)">
        <circle className="contact-graphic__user-disc" r="18" strokeWidth="1.45" />
        <circle className="contact-graphic__user" cy="-3.4" r="4.2" strokeWidth="1.4" />
        <path
          className="contact-graphic__user"
          d="M-8.4 10.6c1.1-3.9 4.1-6 8.4-6s7.3 2.1 8.4 6"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  </div>
)

export default ContactGraphic
