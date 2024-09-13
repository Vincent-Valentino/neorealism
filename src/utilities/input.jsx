import React from "react";
import {TextInputField} from "evergreen-ui";

function Input({label, placeholder}){
  return(
    <TextInputField
      label={label}
      description=" "
      placeholder={placeholder}
    />
  )
}

export default Input;