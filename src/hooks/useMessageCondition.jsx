import { useEffect, useState } from 'react'

export const useMessageCondition = () => {
  const [condition, setCondition] = useState(false)
  useEffect(() => {
    const handler = setTimeout(() => {
      setCondition(false)
    }, 2000)
    return () => {
      clearTimeout(handler)
    }
  }, [condition])
  return [condition, setCondition]
}
