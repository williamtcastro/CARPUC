import { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

export default function Radio({ name, label, options, ...rest }) {
  const inputRefs = useRef([])
  const { fieldName, registerField, defaultValue = '', error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs,
      getValue: refs => {
        return refs.current.find(input => input?.checked)?.value
      },
      setValue: (refs, id) => {
        const inputRef = refs.current.find(ref => ref.id === id)
        if (inputRef) inputRef.checked = true
      },
      clearValue: refs => {
        const inputRef = refs.current.find(ref => ref.checked === true)
        if (inputRef) inputRef.checked = false
      },
    })
  }, [fieldName, registerField])

  return (
    <div>
      {label && <p>{label}</p>}

      {options.map((option, index) => (
        <span key={option.id}>
          <input
            type="radio"
            ref={ref => {
              inputRefs.current[index] = ref
            }}
            id={option.id}
            name={name}
            defaultChecked={defaultValue.includes(option.id)}
            value={option.value}
            {...rest}
          />

          <label htmlFor={option.id} key={option.id} style={{ padding: '1rem'}}>
            {option.label}
          </label>
        </span>
      ))}

      {error && <span>{error}</span>}
    </div>
  )
}
