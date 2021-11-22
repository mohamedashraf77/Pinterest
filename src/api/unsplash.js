import axios from 'axios';

export default axios.create({
  baseUrl: "https://api.unsplash.com/",
  headers: {
    Authorization: "Client-ID 9mXTBl2pJyMhGkfEjZvei671_6w8P3IGIJ0kiTMuQkY",
  },
});