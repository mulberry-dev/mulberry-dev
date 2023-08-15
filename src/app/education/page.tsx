"use client";

import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const certificates = [
  {
    id: 1,
    url: "https://i.ibb.co/4jPJSMd/carrera-De-Desarrollo-Full-Stack-INGTop10.png",
  },
  {
    id: 2,
    url: "https://i.ibb.co/zN2mLnJ/carrera-Desarrollo-Front-End-ing.png",
  },
  {
    id: 3,
    url: "https://i.ibb.co/GtXjbtc/636bccb78ae889000efd915d-ing.png",
  },
  {
    id: 4,
    url: "https://i.ibb.co/4jPJSMd/carrera-De-Desarrollo-Full-Stack-INGTop10.png",
  },
  {
    id: 5,
    url: "https://i.ibb.co/zN2mLnJ/carrera-Desarrollo-Front-End-ing.png",
  },
  {
    id: 6,
    url: "https://i.ibb.co/GtXjbtc/636bccb78ae889000efd915d-ing.png",
  },
  {
    id: 7,
    url: "https://i.ibb.co/zN2mLnJ/carrera-Desarrollo-Front-End-ing.png",
  },
  {
    id: 8,
    url: "https://i.ibb.co/GtXjbtc/636bccb78ae889000efd915d-ing.png",
  },
];

export default class NextJsCarousel extends Component {
  render() {
    return (
      <section>
        <div className="certificates_container animate__animated animate__fadeIn">
          <h2>Certifications</h2>
          <Carousel>
            {certificates.map((certificate) => (
              <div key={certificate.id}>
                <Image
                  src={certificate.url}
                  alt={`${certificate.id}-image`}
                  width={800}
                  height={500}
                  className="certificate_image"
                  style={{ objectFit: "contain" }}
                  loading="lazy"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </section>
    );
  }
}
