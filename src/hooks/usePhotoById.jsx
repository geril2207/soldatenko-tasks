import { useQuery } from 'react-query'
import { PhotoService } from '../services/photo.service'

export const usePhotoById = (id) => {
  const { isLoading, data } = useQuery('get single photo', () =>
    PhotoService.getPhotoById(id)
  )

  return { isLoading, data }
}
