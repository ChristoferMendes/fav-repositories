import { Link } from "react-router-dom"
import { Container } from "./styles"

export const NotFound = () => {
  return (
    <Container>
      <h1>Page not found</h1>
      <Link to={'/'}><a>Home</a></Link>
    </Container>
  )
}