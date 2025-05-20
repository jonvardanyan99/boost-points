import axios from 'axios';

export function uploadFileToAWS(url: string, file: File) {
  return axios.put(url, file, { headers: { 'Content-Type': '' } });
}

export function extractKeyFromPresignedUrl(url: string) {
  return new URL(url).pathname.slice(1);
}
