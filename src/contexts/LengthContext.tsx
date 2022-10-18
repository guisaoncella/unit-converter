import {format, config} from "mathjs";
import React, { createContext, useContext, useEffect, useReducer } from "react";

export type Unit = {
  name: string, 
  symbol: string, 
  value: number | '',
  ratio: number
}

const otherUnits = [
  {name: 'Quilômetro', symbol: 'km', value: 0.001, ratio: 0.001},
  {name: 'Centímetro', symbol: 'cm', value: 100, ratio: 100},
  {name: 'Polegada', symbol: 'in', value: 39.37007874, ratio: 39.37007874},
]

export const INITIAL_STATE = {
  si: {name: 'metro', symbol: 'm', value: 1, ratio: 1} as Unit,
  others: otherUnits as Unit[]
}

export const LengthContext = createContext({
  state: INITIAL_STATE, 
  changeSi: (value: number) => {},
  changeUnit: (value: number, id: number) => {} 
})

interface IProps {
  children: React.ReactNode
}

export const LengthContextProvider = ({children}: IProps) => {
  const [state, dispatch] = useReducer(lengthContextReducer, INITIAL_STATE)

  useEffect(() => {
    const others = state.others.map((unit: Unit) => {
      return {...unit, value: format(state.si.value * unit.ratio, {notation: 'auto', precision: 5})}
    }) 
    dispatch({type: 'unit', payload: others})
  },[state.si])

  const changeSi = (value: number) => {
    if((!value || value < 0) && value != 0){
      dispatch({type: 'si', payload: {...state.si, value: ''}})  
      return
    }
    dispatch({type: 'si', payload: {...state.si, value: value}})
  }

  const changeUnit = (value: number, id: number) => {
    const unit = state.others[id]
    changeSi(parseFloat(format((value / unit.ratio), {notation: "auto", precision: 5})))
  }

  return (
    <LengthContext.Provider value={{state, changeSi, changeUnit}}>
      {children}
    </LengthContext.Provider>
  )
}

export const useLengthContext = () => {
  const context = useContext(LengthContext)
  return context
}

interface IAction{
  type: string,
  payload?: any
}

export const lengthContextReducer = (state = INITIAL_STATE, action: IAction) => {
  switch (action.type) {
    case 'si':
      return {...state, si: action.payload}
    case 'unit':
      return {...state, others: action.payload} 
    default:
      throw new Error();
  }
}