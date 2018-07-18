const validate = (val, rules,field) => {
  let msg = [];
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case "isEmail":
        isValid = isValid && emailValidator(val)
        if(!isValid){
        msg.push(field+ " must be email");
        }
        break;
      case "minLength":
        isValid = isValid && minLengthValidator(val, rules[rule]);
        if(!isValid){
          msg.push(field+ " must be atleast "+rules[rule]+' character');
          }
        break;
      case "notEmpty":
        isValid = isValid && notEmptyValidator(val);
        if(!isValid){
          msg.push(field+" can't be left blank ");
          }
        break;
        case 'onlyNumber':
        isValid = isValid && onlyNumberValidator(val);
        if(!isValid){
          msg.push(field+" must be Number ");
          }
          break;
      default:
        isValid = true;
    }
  }
  if (msg.length != 0)
  {
    alert (msg);
  }
  return isValid;
};  

  const emailValidator = val => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      val
    );
  };
  
  const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
  };
  
  const equalToValidator = (val, checkValue) => {
    return val === checkValue;
  };
  
  const notEmptyValidator = (val) => {
    return val.trim() !== "";
  };
  
  const onlyNumberValidator = (val) =>{
 return !isNaN(val);
  };
  
  export default validate;
  