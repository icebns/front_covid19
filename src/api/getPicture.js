
import axios from '../requestpic'

  
/** ———————————file——————————————*/
export const addPictureApi = (file)=> axios.post("/upload",{
    "file":file
}) 

 