import React from 'react'

export default function Alerts(props) {
    if(props.alert===null){
        return null;
      }
    return (
        <>
          <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{props.alert.message} </strong>{props.alert.message}
            <button
              type="button"
              className="btn-close"gradle init
    
              
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      );
}
