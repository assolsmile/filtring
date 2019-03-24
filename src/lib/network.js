import response from './serverResponse';

// simulate server call, in real project we can use axios
export const loadAll = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({data: response})
    }, 100);
  });
};
