import PropTypes from 'prop-types'
import React from 'react'
import { observer } from 'mobx-react'

@observer
class CustomLabel extends React.Component {
  render() {
    // eslint-disable-next-line
    const { formType, children, htmlFor } = this.props
    if (formType === 'details') {
      return <label htmlFor="">{children}</label>
    } else {
      return <label htmlFor={htmlFor}>{children}</label>
    }
  }
}

CustomLabel.propTypes = {
  formType: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  htmlFor: PropTypes.any.isRequired,
}

export default CustomLabel
