import { useEffect } from "react"
import { Unit, useLengthContext } from "../../contexts/LengthContext"
import { Container } from "./styles"

export const LengthConverter = () => {
  const {state, changeSi, changeUnit} = useLengthContext()

  const teste = (value: number) => {
    console.log('seilakk')
  }

  return(
    <Container>
      <LengthItem unit={state.si} onChangeHandler={changeSi} id={1} />
      <br/><br/>
      <LengthItem unit={state.others[0]} onChangeHandler={changeUnit} id={0} />
      <br/><br/>
      <LengthItem unit={state.others[1]} onChangeHandler={changeUnit} id={1} />
      <br/><br/>
      <LengthItem unit={state.others[2]} onChangeHandler={changeUnit} id={2} />
    </Container>
  )
}

interface LenghtItemProps {
  unit: Unit,
  id: number,
  onChangeHandler: (value: number, id: number) => {} | void
}

export const LengthItem = ({unit, id, onChangeHandler}: LenghtItemProps) => {
  return(
    <>
      <label htmlFor={unit.name}>{unit.name}({unit.symbol})</label>
      <br/>
      <input type='number' step={0.1} id={unit.name} value={unit.value} onChange={(e) => onChangeHandler(parseFloat(e.target.value), id)} />
    </>
  )
}