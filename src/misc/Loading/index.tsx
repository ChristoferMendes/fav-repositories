import { FaSpinner } from 'react-icons/fa'

import { Container } from './styles'


export const Loading = () => {
  return (
    <Container>
      <FaSpinner size={27} />
    </Container>
  )
}