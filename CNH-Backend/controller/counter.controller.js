import { CounterModel } from "../Models/counter.model.js"

const counterNormalIncrement = async (req,res)=>{
    const normalCounter = await CounterModel.findOne({name:"normal"});
    if(!normalCounter){
        //create a new document and return
        const newNormal = await CounterModel.create({
            name:"normal",
            value:0
        })

        return res
        .status(200)
        .json({
            "status" : 200,
            "message":"New Normal Counter created",
            "data": newNormal?.value
        })
    }

    //update existing value by 1
    const updatedNormalCounter = await CounterModel.findOneAndUpdate(
        {name:"normal"},
        {value:normalCounter.value+1},
        {new:true}
    )

    return res
        .status(200)
        .json({
            "status" : 200,
            "message":"old normal count is updated",
            "data": updatedNormalCounter?.value
        })
}

const counterNormalDecrement = async (req,res)=>{
    const normalCounter = await CounterModel.findOne({name:"normal"})
    if(!normalCounter){
        return res
            .status(400)
            .json({
                "status" : 400,
                "message": "Normal counter not found",
                "data":""

            })
    }

    const updatedNormalCounter = await CounterModel.findOneAndUpdate(
        {name:"normal"},
        {value:normalCounter.value-1},
        {new:true}
    )

    return res
        .status(200)
        .json({
            "status":200,
            "message":"Old Normal count is updated",
            "data" : updatedNormalCounter?.value
        })

}

const getCounters = async(req,res)=>{
    const normalCounter = await CounterModel.findOne(
        {
            name:"normal"
        }
    )

    const emergencyCounter = await CounterModel.findOne(
        {
            name:"emergency"
        }
    )

    return res
        .status(200)
        .json(
            {
                "status":"200",
                "message":"Counter values fethed",
                "data": {normalCounter,emergencyCounter}
            }
        )
}

const counterEmergencyIncrement = async (req,res)=>{
    const emergencyCounter = await CounterModel.findOne({name:"emergency"});
    if(!emergencyCounter){
        console.log("creating new emergency count");
        //create a new document and return
        const newEmergency = await CounterModel.create({
            name:"emergency",
            value:0
        })

        return res
        .status(200)
        .json({
            "status" : 200,
            "message":"New Emergency Counter created",
            "data": newEmergency?.value
        })
    }

    //update existing value by 1
    const updatedEmergencyCounter = await CounterModel.findOneAndUpdate(
        {name:"emergency"},
        {value:emergencyCounter.value+1},
        {new:true}
    )

    return res
        .status(200)
        .json({
            "status" : 200,
            "message":"old emergency count is updated",
            "data": updatedEmergencyCounter?.value
        })
}

const counterEmergencyDecrement = async (req,res)=>{
    const emergencyCounter = await CounterModel.findOne({name:"emergency"})
    if(!emergencyCounter){
        return res
            .status(400)
            .json({
                "status" : 400,
                "message": "Emergency counter not found",
                "data":""

            })
    }

    const updatedEmergencyCounter = await CounterModel.findOneAndUpdate(
        {name:"emergency"},
        {value:emergencyCounter.value-1},
        {new:true}
    )

    return res
        .status(200)
        .json({
            "status":200,
            "message":"Old Emergency count is updated",
            "data" : updatedEmergencyCounter?.value
        })

}


export {
    counterNormalIncrement,
    counterNormalDecrement,
    getCounters,
    counterEmergencyDecrement,
    counterEmergencyIncrement
}