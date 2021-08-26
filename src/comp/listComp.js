
import react , { useEffect, useState }from 'react'
function ListComp() {
 let [dataState, setData] = useState([])
 let LoadApidata = async function() {
   fetch('./data.json').then(response => {
      return response.json();
  }).then(response => {
   displaylogic(response.data)
  })
 }
 function displaylogic(params) {
   let data = {}
   let ldata=[]
  
  for(let i=0 ;i<params.length; i++){
    if(!data[params[i]['product_id']]){
      data[params[i]['product_id']]  = true
      ldata.push(params[i])
    }else{
      ldata.forEach((item)=>{
      if(item['product_id']==params[i]['product_id']){
        item['quantity'] = item['quantity'] + params[i]['quantity']
       }
      })
    }
  }
  setData(ldata);
 }
  useEffect(()=>{
    LoadApidata()
  },[])
  

  return (
    <div className="App">
    <ol>
      {
    dataState?dataState.map((item)=>{
    return <li key={item.id}>{item.product_id}  {item.quantity}</li>
    }):null
      }
    </ol>
    </div>
  );
}

export default ListComp;
