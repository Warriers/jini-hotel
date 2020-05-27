import { v4 as uuidv4 } from "uuid"
import QRCode from "qrcode"

const generateQR = async () => {
  try {
    const text = uuidv4()
    return await QRCode.toDataURL(text)
  } catch (err) {
    console.error(err)
    return err
  }
}

export default generateQR