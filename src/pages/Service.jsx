import React from "react";
import "@/styles/service.css";
import { services } from "@/data/servicesData";

const Service = () => {
  return (
    <section id="service" className="service-section">
      <div className="service-container">
        <div className="service-heading-tag">What I Offer</div>
        <h3>
          Crafting digital experiences
          <br />
          one line of code at a time
        </h3>

        <div className="service-cards">
          {services.map((svc) => (
            <article className="service-card" key={svc.id}>
              <h4 className="service-title">{svc.title}</h4>
              {svc.subtitle && (
                <div className="service-subtitle">{svc.subtitle}</div>
              )}
              <p className="service-desc">{svc.description}</p>
              {svc.tags && svc.tags.length > 0 && (
                <div className="service-tags">
                  {svc.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="service-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;