import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { Container } from "./styles"

export const RenderHearts = () => {
  const [click, setClick] = useState(false);

  return (
    <Container onClick={() => setClick(!click)}>
      {click ? <FaHeart /> : <FaRegHeart />}
    </Container>
  )
}