import { toast } from "react-toastify"

export const toastUpdate = ({toastId, message, type}) => {
  toast.update(toastId, {
    render: message,
    type: type,
    isLoading: false,
    autoClose: 1000,
  })
}