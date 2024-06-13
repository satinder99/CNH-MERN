import React, { useEffect, useState } from 'react'
import { socket } from '../socket';

function displayCounter() {
  const [normalCounter,setNormalCounter] = useState(0);
  const [emergencyCounter,setEmergencyCounter] = useState(0);

  socket.on("updateCounters",(data)=>{
    setNormalCounter(data.normal)
    setEmergencyCounter(data.emergency)
  })

  useEffect(()=>{
    fetch("http://localhost:3000/counter/getCounters")
    .then(
      (result)=>{
        return result.json();
      }
    )
    .then(
      (result)=>{
        console.log(result);
        if(result.status != "200"){
          console.log("some error occured !!!")
        }
        setNormalCounter(result.data.normalCounter.value);
        setEmergencyCounter(result.data.emergencyCounter.value);
      }
    )
    .catch(
      (err)=>{
        console.log("an error occured while fetching counters value",err);
      }
    )
  })
  

  return (
    <div>
      <div id="normal-counter">
        {normalCounter}
      </div>
      <div id="emergency-counter">
        {emergencyCounter}
      </div>
    </div>
  )
}

export default displayCounter