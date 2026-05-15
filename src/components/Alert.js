import React from 'react'
import './Alert.css'

const Alert = (props) => {
  const capitalize=(word)=>{
    if(word==='danger'){
      word='error'
    }
    const lower=word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);
  }

  const getAlertIcon = (type) => {
    switch(type) {
      case 'success':
        return 'fa-check-circle';
      case 'error':
      case 'danger':
        return 'fa-exclamation-circle';
      case 'warning':
        return 'fa-warning';
      case 'info':
        return 'fa-info-circle';
      default:
        return 'fa-info-circle';
    }
  }

  return (
    <div className="alert-container">
      {props.alert && (
        <div className={`alert-box alert-${props.alert.type}`} role="alert">
          <div className="alert-content">
            <i className={`fa-solid ${getAlertIcon(props.alert.type)}`}></i>
            <div className="alert-message">
              <strong>{capitalize(props.alert.type)}</strong>
              <p>{props.alert.msg}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Alert
