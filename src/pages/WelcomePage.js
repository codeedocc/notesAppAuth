import React, { useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebaseCfg/firebase.js'
import { useNavigate } from 'react-router-dom'
import '../styles/welcomePage.css'

export default function WelcomePage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [registerInformation, setRegisterInformation] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/notesAppAuth/homepage')
      }
    })
  }, [])

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/notesAppAuth/homepage')
      })
      .catch((err) => alert(err.message))
  }

  const handleRegister = () => {
    if (registerInformation.password !== registerInformation.confirmPassword) {
      alert('Пожалуйста, убедитесь, что пароли одинаковы.')
      return
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate('/notesAppAuth/homepage')
      })
      .catch((err) => alert(err.message))
  }

  return (
    <div className="welcome input-field">
      <h1>Заметки</h1>
      <div className="login-register-container">
        {isRegistering ? (
          <>
            <input
              type="email"
              placeholder="Введите email..."
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Введите пароль..."
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Повторите пароль..."
              value={registerInformation.confirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button
              className="blue-grey register-button"
              onClick={handleRegister}
            >
              Регистрация
            </button>
            <button
              className="white back-account-button"
              onClick={() => setIsRegistering(false)}
            >
              Назад
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              onChange={handleEmailChange}
              value={email}
            />
            <input
              type="password"
              onChange={handlePasswordChange}
              value={password}
              placeholder="Password"
            />
            <button className="blue-grey sign-in-button" onClick={handleSignIn}>
              Войти
            </button>
            <button
              className="white create-account-button"
              onClick={() => setIsRegistering(true)}
            >
              Создать аккаунт
            </button>
          </>
        )}
      </div>
    </div>
  )
}
