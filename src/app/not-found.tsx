import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import IconBox from "@/components/ui/IconBox"
import Reveal from "@/components/ui/Reveal"
import SiteIcon from "@/components/ui/SiteIcon"

export default function NotFound() {
  return (
    <section className="not-found-page">
      <Container className="auth-page auth-page--missing">
        <Reveal type="card" mode="fold">
        <Card className="auth-card">
          <div className="not-found-card__icon" aria-hidden="true">
            <IconBox round tone="purple">
              <SiteIcon name="compass" />
            </IconBox>
          </div>
          <div className="not-found-card__copy">
            <h2>Error 404</h2>
            <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          </div>
          <div className="not-found-card__actions">
            <Button href="/">Back Home</Button>
          </div>
        </Card>
        </Reveal>
      </Container>
    </section>
  )
}
