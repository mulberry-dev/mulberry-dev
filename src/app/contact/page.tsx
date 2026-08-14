"use client"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import CtaBanner from "@/components/ui/CtaBanner"
import IconBox from "@/components/ui/IconBox"
import PageTitle from "@/components/PageTitle"
import SectionHeader from "@/components/ui/SectionHeader"
import { LINKEDIN_URL } from "@/data/site"

const Contact = () => {
  return (
    <section id="contact" className="page-fade">
      <PageTitle title="Contact" />
      <Container className="contact-page">
        <div className="contact-hero">
          <SectionHeader
            badge="Contact me"
            title="Let's build"
            gradientText="something amazing"
            subtitle="I am always immersed in learning new technologies, driven by my commitment to developing specialized and scalable technology for new projects."
          />
          <div className="contact-graphic" aria-hidden="true">
            <div className="contact-graphic__glow" />
            <span>✉</span>
          </div>
        </div>

        <Card className="contact-panel">
          <div>
            <h2>Get in touch</h2>
            <div className="contact-row">
              <IconBox>in</IconBox>
              <div>
                <strong>LinkedIn</strong>
                <p>linkedin.com/in/santidev/</p>
                <span>Connect with me</span>
              </div>
            </div>
          </div>
          <div className="contact-panel__cta">
            <h2>Send me a message</h2>
            <p>Reach out on LinkedIn and I will get back to you there.</p>
            <Button href={LINKEDIN_URL} external>
              Message on LinkedIn
            </Button>
          </div>
        </Card>

        <CtaBanner
          icon={<IconBox round>↑</IconBox>}
          title="Let's create something great together"
          subtitle="Explore the work I have already shipped."
          actionHref="/portfolio"
          actionLabel="View my work →"
        />
      </Container>
    </section>
  )
}

export default Contact
