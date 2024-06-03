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
            "value": newNormal?.value
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
            "value": updatedNormalCounter?.value
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
                "value":""

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
            "value" : updatedNormalCounter?.value
        })

}

export {
    counterNormalIncrement,
    counterNormalDecrement
}