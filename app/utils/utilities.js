import moment from "moment";

export const guidGenerator = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
};

export const sumLoggedTime = (times) => {
  const sum = Object.values(times).reduce((a, b) => {
    return a + b;
  }, 0);
  return moment.utc(sum * 1000).format('HH:mm:ss');
};
