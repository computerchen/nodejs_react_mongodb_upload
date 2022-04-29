import React , {useState} from 'react'
import axios from 'axios'

const FilesUploadComponent = () => {
    const [profileImg,setProfileImg] = useState('')
    const [uploadFile,setUploadFile] = useState('')
    function onFileChange(e) {
        setProfileImg(e.target.files[0])
    }
    function onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('profileImg',profileImg)
        axios.post('http://localhost:5000/api/user-profile',formData,{}).then(res=>{
            console.log(res.data.userCreated.profileImg)
            setUploadFile(res.data.userCreated.profileImg)
        })
    }
    return (
        <div className='container'>
            <div className='row'>
                <form onSubmit={onSubmit}>
                    <h3>React File Upload</h3>
                    <div className='form-group'>
                        <input type='file' onChange={onFileChange}/>
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-primary' type='submit'>Upload</button>
                    </div>
                    <img src={uploadFile}></img>
                </form>
            </div>
        </div>
    )
}

export default FilesUploadComponent