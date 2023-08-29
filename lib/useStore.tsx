import { useState, useEffect } from 'react' 


/* Helps for hydration problem 
waits on the client side for hydration
*/
const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    let onechange= false
    if(!data){
      setData(result)
      return;
    }
      
    for(let v in result)
        if( result[v] !== data[v])
            console.log('onechange', 
                onechange =true, 
                v, result[v], data[v] )
    if(onechange)
        setData(result)
  }, [result])

  return data
}

export default useStore