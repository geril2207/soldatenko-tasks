import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { UserService } from '../../services/user.service'
import styles from './Header.module.css'

const Header = () => {
  const { data: response, isLoading } = useQuery(
    'user info',
    UserService.getUserInfo
  )
  const firstname = response?.data?.data?.firstname
  const surname = response?.data?.data?.surname
  const displayName =
    firstname && surname
      ? `${surname} ${firstname}`
      : isLoading
      ? 'Загрузка'
      : ''
  function logout() {
    localStorage.removeItem('token')
    return (window.location.href = 'login')
  }
  return (
    <div className={`${styles.wrapper} `}>
      <div
        className={`${styles.container} container d-flex justify-content-between`}
      >
        <Link className={styles.link} to={'/photoList'}>
          <div>Фотографии</div>
        </Link>
        <div className={styles.header_name}>{displayName}</div>
        <div className={styles.logout} onClick={logout}>
          Выйти
        </div>
      </div>
    </div>
  )
}

export default Header
