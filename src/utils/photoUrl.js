export function getPhotoSrc(url) {
  if (!url || url.startsWith('http') || url.startsWith('data:')) return url;
  return `data:image/jpeg;base64,${url}`;
}
