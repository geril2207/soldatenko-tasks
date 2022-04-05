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

const PhotoSearchUserModal = ({ active, submitHandler, closeHandler }) => {
  const [searchInput, setSearchInput] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const {
    data: response = null,
    isError,
    refetch,
  } = useQuery('user search', () => UserService.findUser(searchInput), {
    enabled: false,
  })
  useDebounceEffect(
    () => {
      if (searchInput !== '') {
        refetch()
      }
    },
    0,
    [searchInput]
  )
  return (
    <Modal isOpen={active} centered toggle={closeHandler}>
      <Card>
        <CardBody className="p-4">
          <h5 className="text-center">
            Выберите пользователя с которым хотите поделиться
          </h5>
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Введите данные пользователя"
          />
          <Dropdown
            toggle={() => undefined}
            isOpen={!!searchInput}
            className="userlist__dropdown"
          >
            <DropdownMenu className="w-100">
              {isError && (
                <DropdownItem>
                  Что-то пошло не так. Попробуйте перезагрузить страницу
                </DropdownItem>
              )}
              {!response?.data?.data.length && !!searchInput && (
                <DropdownItem>По вашему запросу ничего не найдено</DropdownItem>
              )}
              {!!response?.data?.data.length &&
                response?.data?.data.map((item, index) => (
                  <DropdownItem
                    key={`${item.id}_${index}`}
                    className="d-flex align-items-center justify-content-between }"
                    onClick={() => setSelectedUser(item.id)}
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
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </Dropdown>
          <div className="text-end w-100">
            <Button className="text-center me-3" onClick={closeHandler}>
              Отмена
            </Button>
            <Button
              color="primary"
              className="text-center"
              style={{ width: '200px' }}
              onClick={() => submitHandler(selectedUser)}
            >
              Поделиться
            </Button>
          </div>
        </CardBody>
      </Card>
    </Modal>
  )
}

export default PhotoSearchUserModal
