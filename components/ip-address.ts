export const getIpAddress = async () => {
  try {
    const response = await fetch("https://ipapi.co/json/")
    const data = await response.json()
    return await data.ip
  } catch (error) {
    return "";
  }
}