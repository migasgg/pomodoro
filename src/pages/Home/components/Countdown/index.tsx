import { CountdownContainer, Separator } from "./styles"

export function Countdown() {
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{second[0]}</span>
      <span>{second[1]}</span>
    </CountdownContainer>
  )
}
