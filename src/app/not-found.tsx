import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"

export default function NotFound() {
  return (
    <section className="page-fade">
      <Container className="auth-page auth-page--missing">
        <Card className="auth-card">
          <h2>Error 404</h2>
          <p>Page not found</p>
          <Button href="/">Back Home</Button>
        </Card>
      </Container>
    </section>
  )
}
