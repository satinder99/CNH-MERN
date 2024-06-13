import React, { useEffect, useState } from 'react'
import { socket } from '../socket';

function UpdateCounter() {
    
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
        setNormalCounter(result.data?.normalCounter?.value);
        setEmergencyCounter(result.data?.emergencyCounter?.value);
        console.log(result.data.emergencyCounter?.value)
      }
    )
    .catch(
      (err)=>{
        console.log("an error occured while fetching counters value",err);
      }
    )
  })

  const onIncrement = (e)=>{
    console.log(e.target.id)
    if(e.target.id == "normal-inc"){
        console.log("incresing the normal count by 1");
        fetch("http://localhost:3000/counter/increment-normal",{
            method:"PATCH"
        })
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
              //setNormalCounter(result.data);
              socket.emit("incrementNormal",{
                normal:result.data,
                emergency:emergencyCounter
              })
              console.log("new value : ",result.data)
            }
          )
          .catch(
            (err)=>{
              console.log("an error occured while fetching counters value",err);
            }
          )
    }
    else{
        fetch("http://localhost:3000/counter/increment-emergency",{
            method:"PATCH"
        })
        .then((result)=>{
            return result.json();
        })
        .then((result)=>{
            if(result.status != "200"){
                console.log("some error occured !!!")
            }

            //setEmergencyCounter(result.data);
            socket.emit("incrementEmergency",{
              normal:normalCounter,
              emergency:result.data
            })
        })
        .catch((err)=>{
            console.log("an error occured while fetching counters value",err);
        })
    }
}

const onDecrement = (e)=>{
    console.log(e.target.id)
    if(e.target.id == "normal-dec"){
        console.log("decreasing the normal count by 1");
        fetch("http://localhost:3000/counter/decrement-normal",{
            method:"PATCH"
        })
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
              //setNormalCounter(result.data);
              socket.emit("decrementNormal",{
                normal:result.data,
                emergency:emergencyCounter
              })
              console.log("new value : ",result.data)
            }
          )
          .catch(
            (err)=>{
              console.log("an error occured while fetching counters value",err);
            }
          )
    }
    else{
        fetch("http://localhost:3000/counter/decrement-emergency",{
            method:"PATCH"
        })
        .then((result)=>{
            return result.json();
        })
        .then((result)=>{
            if(result.status != "200"){
                console.log("some error occured !!!")
            }
            //setEmergencyCounter(result.data);
            socket.emit("decrementEmergency",{
              normal:normalCounter,
              emergency:result.data
            })
        })
        .catch((err)=>{
            console.log("an error occured while fetching counters value",err);
        })
    }
}


  return (
    <>
        <div>
            <div id="normal-counter">
                {normalCounter}
            </div>
            <div id="emergency-counter">
                {emergencyCounter}
            </div>
        </div>

        <div>
            <div>
                <button onClick={onIncrement} id="normal-inc">Increment Normal</button>
                <button onClick={onDecrement} id="normal-dec">Decrement Normal</button>
            </div>
            <div>
                <button onClick={onIncrement} id="emergency-inc">Increment Emergency`</button>
                <button onClick={onDecrement} id="emergency-dec">Decrement Emergency</button>
            </div>
        </div>
    </>
  )
}

export default UpdateCounter