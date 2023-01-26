import React from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { NavLink } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import { auth } from '../firebaseCfg/firebase.js'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/notesAppAuth')
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  return (
    <>
      <nav>
        <div className="nav-wrapper blue-grey">
          <NavLink
            to="/notesAppAuth/homepage"
            className="brand-logo center"
            id="navL"
          >
            Заметки
          </NavLink>
          <ul className="right">
            <li className="hide-on-med-and-down">
              <NavLink to="/notesAppAuth/homepage" id="navL">
                Список дел
              </NavLink>
            </li>
            <li className="hide-on-med-and-down">
              <NavLink to="/notesAppAuth/homepage/about" id="navL">
                Информация
              </NavLink>
            </li>
            <li>
              <NavLink to="/notesAppAuth" id="navL">
                <LogoutIcon
                  onClick={() => handleSignOut()}
                  className="logout-icon"
                />
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
