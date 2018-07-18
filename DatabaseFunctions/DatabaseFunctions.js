
export const readFromDatabase = (path,id)=>{
   return fetch('https://xendre-login-f7129.firebaseio.com/users/'+path+'/'+id+'.json')
}

export const writeInDatabase = (path,id,token,obj) => {
return fetch('https://xendre-login-f7129.firebaseio.com/users/'+path+'/'+id+'.json?auth='+token, {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": 'application/json' 
          }
        })
}

export const writeInDatabasePut = (path,id,token,obj)=>{
return fetch('https://xendre-login-f7129.firebaseio.com/users/'+path+'/'+id+'.json?auth='+token, {
          method: 'PUT',
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": 'application/json' 
          }
        })
}

export const readAllFromDatabase = (path) =>{
    return fetch('https://xendre-login-f7129.firebaseio.com/users/'+path+'/.json')
}


export const updateInDatabase = (path,parent,child,token,obj) =>{
  return fetch('https://xendre-login-f7129.firebaseio.com/users/'+path+'/'+parent+'/'+child+'.json?auth='+token, {
    method: 'PUT',
    body: JSON.stringify(obj),
headers :{
  "Content-Type": 'application/json'   
}
  })
}
