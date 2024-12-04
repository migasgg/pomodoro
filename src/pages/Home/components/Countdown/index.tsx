import { useContext, useEffect } from "react"
import { CountdownContainer, Separator } from "./styles"
import { differenceInSeconds } from "date-fns"
import { CycleContext } from "../.."

export function Countdown() {
  const { activeCycle, markCurrentCycleAtFinished, setSecondPassed, amountSecondPassed } =
    useContext(CycleContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAtFinished()

          setSecondPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, markCurrentCycleAtFinished, setSecondPassed])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, "0")
  const second = String(secondsAmount).padStart(2, `0`)

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}: ${second}`
    }
  }, [minutes, second])

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
