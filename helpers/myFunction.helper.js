const fs = require('fs')

readData=()=>{
    try {
        data = JSON.parse(fs.readFileSync('data.json').toString())
    } catch (error) {
        data=[]
    }
    return data
    
}

writeData =(data)=>{
    fs.writeFileSync('data.json',JSON.stringify(data))
}

addData = (task)=>{
    allData = readData()
    try {
        allData.push(task)
        writeData(allData)
        result ={
            status:true
        }
    } catch (error) {
        result ={
            status:false,
            errMsg:error
        }
    }
    return result

}

module.exports ={
    addData,
    writeData,
    readData
}