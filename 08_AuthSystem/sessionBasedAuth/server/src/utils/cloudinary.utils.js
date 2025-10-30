import {v2 as cloudinary} from 'cloudinary'
import {v1 as uuidv4} from 'uuid'

export const uploadFileOnCloudinary = async (files = []) => {
  const promises = files.map(file => (
    Promise.resolve(cloudinary.uploader.upload(file.path, {
      resource_type: 'auto',
      folder: 'image/',
      public_id: uuidv4(),
    }))
  ))

  try {
    const uploadedData = await Promise.all(promises)
    const data = uploadedData.map(res => ({
      public_id : res.public_id,
      url : res.secure_url
    }));
    return {success : true, data};
  } catch (error) {
     return {success : false, data : error}
  }
}

