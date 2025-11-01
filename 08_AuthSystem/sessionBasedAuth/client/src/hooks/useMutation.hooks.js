import { useState } from 'react'
import { toast } from 'react-toastify'
import { toastUpdate } from '../helper/toast.helper'

export const useMutation = (mutationFn) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [mutate] = mutationFn()
  const [error, setError] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const executeMutate = async ({ toastMessage, args, callback }) => {
    const toastId = toast.loading(toastMessage)
    setIsLoading(true)

    try {
      const { data, error } = await mutate(args)
      if (data?.success) {
        setData(data?.data)
        toastUpdate({
          toastId,
          message: data?.message || 'Successfully created request ',
          type: 'success',
        })
        setIsSuccess(true);
        if(callback) callback();
      } else {
        setError(error)
        toastUpdate({
          toastId,
          message:
            error?.data?.message ||
            'We get error during creating a new request',
          type: 'error',
        })
      }
    } catch (error) {
      console.log(error)
      setError(error)
      toastUpdate({
        toastId,
        message: error.message || 'We get error during creating a new request',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {executeMutate, data, error, isSuccess, isLoading}
}
