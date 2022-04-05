import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Input,
  Modal,
} from 'reactstrap'
import { useDebounceEffect } from '../../hooks/useDebounce'
import { UserService } from '../../services/user.service'

const PhotoSearchUserModal = ({ active }) => {
  const [searchInput, setSearchInput] = useState('')
  const [usersList, setUsersList] = useState([])
  const {
    data: response,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useQuery('user search', () => UserService.findUser(searchInput), {
    enabled: false,
  })
  useDebounceEffect(
    () => {
      refetch()
    },
    200,
    [searchInput]
  )
  useEffect(() => {
    if (response?.data?.data) {
      console.log(response.data.data)
      setUsersList(response.data.data)
    }
  }, [response?.data?.data])
  console.log(isLoading, isRefetching, usersList.length, searchInput)
  return (
    <Modal isOpen={true} centered>
      <Card>
        <CardBody className="p-4">
          <h5 className="text-center">
            Выберите пользователя с которым хотите поделиться
          </h5>
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {!usersList.length &&
            (!isLoading || !isRefetching) &&
            !!searchInput && (
              <DropdownItem>По вашему запросу ничего не найдено</DropdownItem>
            )}
          {!!usersList.length && (
            <Dropdown isOpen={true}>
              <DropdownMenu className="w-100">
                {usersList.map((item, index) => (
                  <DropdownItem
                    key={`${item.id}_${index}`}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        className="me-2"
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                      </svg>
                      <div>{`${item.firstname} ${item.surname} ${item.phone}`}</div>
                    </div>
                    <div className="btn btn-primary btn-sm">Выбрать</div>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
          <Button color="primary" className="text-center">
            Отмена
          </Button>
        </CardBody>
      </Card>
    </Modal>
  )
}

export default PhotoSearchUserModal
