export const getIpAddress = async () => {
  try {
    const res = await fetch('https://ipinfo.io/ip');
    const data = await res.json();
    return data.ip;
  } catch (error) {
    console.log(error);
    return "";
  }
}