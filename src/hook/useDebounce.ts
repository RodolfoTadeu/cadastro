type Debounce = {
  fn: () => void,
  delay: number  
}

type Args = {
  args: [number, string, boolean]
}

export const useDebounce = ({fn, delay}: Debounce) => {
  function debouncedFn({...args}: Args) {
    //fn(...args);
  }

  return debouncedFn;
}