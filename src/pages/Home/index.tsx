import { HandPalm, Play } from "phosphor-react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { createContext, useState } from "react"
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles"
import { NewCycleForm } from "./components/NewCycleForm"
import { Countdown } from "./components/Countdown"

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  activeCycle: Cycle | undefined
  amountSecondPassed: number
  markCurrentCycleAtFinished: () => void
  setSecondPassed: (seconds: number) => void
}

export const CycleContext = createContext({} as CycleContextType)

const newCycleFormValidationScheme = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo precisa ser de no mínimo 5 minutos!")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos!"),
})

// type NewCycleFormData = zod.infer<typeof newCycleFormValidationScheme>

export function Home() {
  const [cycles, setCycle] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleID] = useState<string | null>(null)
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationScheme),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondPassed(second: number) {
    setAmountSecondPassed(second)
  }

  function markCurrentCycleAtFinished() {
    setCycle((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycle((state) => [...state, newCycle])
    setActiveCycleID(id)
    setAmountSecondPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setActiveCycleID(null)

    setCycle((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        } else {
          return cycle
        }
      })
    )
  }

  const task = watch("task")
  const isSubmitDisabled = !task

  console.log(cycles)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CycleContext.Provider
          value={{
            activeCycle,
            markCurrentCycleAtFinished,
            amountSecondPassed,
            setSecondPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CycleContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
