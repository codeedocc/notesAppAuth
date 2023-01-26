import React from 'react'
import 'antd/dist/antd.min.css'
import { Alert } from 'antd'

export const AlertMessage = ({ addAlert, removeAlert, warningAlert }) => {
  return (
    <div className="alert">
      {addAlert && (
        <Alert
          type="success"
          message="Отлично! Вы добавили новую заметку!"
          closable
          showIcon
          style={{ marginTop: '1rem' }}
          className="alert-message"
        />
      )}
      {removeAlert && (
        <Alert
          type="error"
          message="Вы удалили заметку."
          closable
          showIcon
          style={{ marginTop: '1rem' }}
        />
      )}
      {warningAlert && (
        <Alert
          type="warning"
          message="Заметка не может быть пустой."
          closable
          showIcon
          style={{ marginTop: '1rem' }}
          className="alert-message"
        />
      )}
    </div>
  )
}
