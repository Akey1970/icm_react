import React, {useState, useEffect} from 'react'
import {FormGroup, Label, FormText} from 'reactstrap'
import {DatePicker} from 'reactstrap-date-picker'

const Calwnder = () => {
  const [value, setValue]= useState(new Date().toISOString())
  const [fmtValue, setFmtValue]= useState(undefined)

  handleChange(value, formattedValue) {
    setValue(value)
    setFmtValue(formattedValue)
  }

  useEffect(( )=> {
    console.log(`Formatted value is ${fmtValue}`)
  }, [fmtValue])

  return (
    <FormGroup>
      <Label>My Date Picker</Label>
      <DatePicker id      = "example-datepicker" 
                  value   = {value} 
                  onChange= {(v,f) => handleChange(v, f)} />
      <FormText>Help</FormText>
    </FormGroup>
  )
}