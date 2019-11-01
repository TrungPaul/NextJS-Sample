import React from 'react'
import { observer } from 'mobx-react'

@observer
class CustomInput extends React.Component {
  componentDidMount() {
    //console.log('label', this.props)
  }
  render() {
    // eslint-disable-next-line
    const {
      formType,
      children,
      htmlFor,
      id,
      type,
      value,
      checked,
      onChange,
      onBlur,
      className,
      disabled,
    } = this.props
    if (formType === 'details') {
      return <div className="field-info1">{value}</div>
    } else {
      return (
        <input
          disabled={disabled}
          autoComplete="off"
          id={id}
          type={type}
          value={value}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          className={className}
        />
      )
    }
  }
}

export default CustomInput
