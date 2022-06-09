import {useState, useEffect} from 'react'
import { Typography, Grid, Box, Stack, Button, Container, TextField, IconButton, Divider, LinearProgress} from '@mui/material'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'

import axios from 'axios'
import moment from 'moment'
const App = () => {
  const [fileUpload, setFileUpload] = useState({})
  const [fileUploadProgress, setFileUploadProgress] = useState(0)
  const [filesUploads, setFilesUploads] = useState([])
  const [filesUploadsProgress, setFilesUploadsProgress] = useState(0)
  const [error, setError] = useState('')
  const [getFile, setGetFile] = useState([])
  const [getFiles, setGetFiles] = useState([])
  const [title, setTitle] = useState('')

  const getFileUpload = async ()=>{
    try{
      const {data : { data }} = await axios.get('/api/single')
      setGetFile(data)
    } catch (error) {
        const message = error.response ? error.response.data.message : error.message
        setError(message)
    }
  }
  const getFilesUpload = async ()=>{
    try{
      const {data : { data }} = await axios.get('/api/multi')
      setGetFiles(data)
    } catch (error) {
        const message = error.response ? error.response.data.message : error.message
        setError(message)
    }
  }
  useEffect(()=>{
    getFileUpload()
  }, [getFile])
  useEffect(()=>{
    getFilesUpload()
  }, [getFiles])
  const loadingOption = {
    onUploadProgress: (progressEvent)=>{
      const { total, loaded} = progressEvent;
      const precentage = Math.floor(((loaded /1000) * 100) / (total / 1000))
      setFileUploadProgress(precentage)
    }
  }
  const loadingOptionMulti = {
    onUploadProgress: (progressEvent)=>{
      const { total, loaded} = progressEvent;
      const precentage = Math.floor(((loaded /1000) * 100) / (total / 1000))
      setFilesUploadsProgress(precentage)
    }
  }
  const handleSingleFile = async(e)=>{
    e.preventDefault()
    try{
      const formData = new FormData()
      formData.append('image', fileUpload)
      const {data } = await axios.post('/api/single', formData, loadingOption)
    } catch (error) {
        const message = error.response ? error.response.data.message : error.message
        setError(message)
    }
    
  }
  const handleMultiFile = async(e)=>{
    e.preventDefault()
    try{
      const formData = new FormData()
      formData.append('title', title)
      for(let i = 0; i < filesUploads.length; i++){
        formData.append('images', filesUploads[i])
      }
      const { data } = await axios.post('/api/multi', formData, loadingOptionMulti)
    } catch (error) {
        const message = error.response ? error.response.data.message : error.message
        setError(message)
    }
  }
  
  const ActionsWrapper = styled(Box)(()=>({
    position: 'absolute',
    top: '40px',
    left: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    width: '100%',
    padding: '0 1rem',
    gap: '4rem'
  }))
  const IocnButtonWrapper = styled(IconButton)(()=>({
    background: '#f50202',
    color: '#fff',
    opacity: .4,
    ':hover': {
      background: '#f50202',
      opacity: 1
    }
  }))
  return (
    <Container maxWidth='lg'>
      <Typography variant='h4'  my={4} sx={{textAlign: 'center', fontWeight: 'bold'}}>UPLOAD FILES </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Stack spacing={4}>
            <Typography variant='h6'>Single File</Typography>
            <Box>
              <Button variant='contained' component='label' color='secondary' fullWidth >
                <CloudUploadIcon />
                &nbsp;
                Select Single File
                <input type='file' hidden onChange={(e)=>setFileUpload(e.target.files[0])} />
              </Button>
            </Box>
            <Button variant='contained' fullWidth onClick={handleSingleFile} >Upload</Button>
            <Box sx={{display: 'flex', gap: 3, alignItems: 'center'}}>
              <Box sx={{flexGrow: 1}}><LinearProgress  value={fileUploadProgress} variant='determinate' sx={{width:'100%',background: fileUploadProgress < 50 ? 'error': 'primary'}}/></Box>
              <Typography variant='body1'>%{fileUploadProgress}</Typography>

              </Box>
            <Grid container spacing={2}>
              {getFile && getFile.map((item)=>(
                <Grid item xs={12} sm={6} key={item._id} sx={{position: 'relative'}}>
                  <img src={`http://localhost:5000/${item.filePath}`} loading='lazy' style={{height: '14rem', maxWidth: '100%', borderRadius: '12px', backgroundSize: 'cover'}} alt={item.fileName} />
                  <ActionsWrapper>
                    <Typography variant='caption'>{moment(item.createdAt).startOf('ss').fromNow()}</Typography>
                    <IocnButtonWrapper size='small'>
                      <DeleteIcon  />
                    </IocnButtonWrapper>
                  </ActionsWrapper>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={4}>
            <Typography variant='h6'>Multi Files</Typography>
            <TextField type='text' size='small' fullWidth variant='outlined' label='Title...' value={title} onChange={(e)=>setTitle(e.target.value)} />
            <Box>
              <Button variant='contained' component='label' color='secondary' fullWidth>
                <CloudUploadIcon />
                &nbsp;
                Select Multi Files
                <input type='file' multiple hidden onChange={(e)=>setFilesUploads(e.target.files)}/>
              </Button>
            </Box>
            <Button variant='contained' fullWidth onClick={handleMultiFile} >Upload</Button>
            <Box sx={{display: 'flex', gap: 3, alignItems: 'center'}}>
            <Box sx={{flexGrow: 1}}><LinearProgress  value={filesUploadsProgress} variant='determinate' sx={{width:'100%', background:filesUploadsProgress < 50 ? 'error': 'primary'}} /></Box>
            <Typography variant='body1'>%{filesUploadsProgress}</Typography>

            </Box>
          {getFiles && getFiles.map((item)=>(
            <Container key={item._id}>
              <Typography variant='h6'>{item.title.toUpperCase()}</Typography>
              <Typography variant='caption'>{moment(item.createdAt).startOf('ss').fromNow()}</Typography>
              <Grid container spacing={2}>
                  {item.files.map((image, index)=>(
                    <Grid item xs={12} sm={6} key={index} sx={{position: 'relative'}}>
                      <img src={`http://localhost:5000/${image.filePath}`} loading='lazy' style={{height: '14rem', maxWidth: '100%', borderRadius: '12px', backgroundSize: 'cover'}} alt={image.fileName} />
                      <ActionsWrapper>
                        <IocnButtonWrapper size='small'>
                          <DeleteIcon  />
                        </IocnButtonWrapper>
                      </ActionsWrapper>
                    </Grid>
                  ))}
                  <Divider />
              </Grid>
            </Container>
          ))}
          </Stack>
        </Grid>
        
      </Grid>
    </Container>
  )
}

export default App