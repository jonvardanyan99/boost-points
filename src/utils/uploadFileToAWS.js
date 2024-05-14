import axios from 'axios';

export function uploadFileToAWS(url, file) {
  return axios.put(url, file, { headers: { 'Content-Type': '' } });
}

export function extractKeyFromPresignedUrl(url) {
  return new URL(url).pathname.slice(1);
}
