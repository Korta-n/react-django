export const parseDate = (isoDate) => {
  return new Date(Date.parse(isoDate)).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: 'numeric',
  });
};
