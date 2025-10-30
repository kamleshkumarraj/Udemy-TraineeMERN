import fs from 'fs/promises';

export const deleteFile = async (files = []) => {
  if (files.length == 0) return;
  try {
    await Promise.all(files.map(file => fs.unlink(file?.path)));
    return {success : true}
  } catch (error) {
    return {success : false}
  }
}