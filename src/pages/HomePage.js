import React, { useEffect, useRef, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebaseCfg/firebase.js'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { set, ref, onValue, remove, update } from 'firebase/database'
import '../styles/homePage.css'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import DoneSharpIcon from '@mui/icons-material/DoneSharp'
import { Navbar } from '../components/Navbar.js'
import { AlertMessage } from '../components/AlertMessage.js'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export default function HomePage() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [tempUidd, setTempUidd] = useState('')
  const [addAlert, setAddAlert] = useState(false)
  const [removeAlert, setRemoveAlert] = useState(false)
  const [warningAlert, setWarningAlert] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const onAdd = () => {
    setAddAlert(!addAlert)
    setTimeout(() => {
      setAddAlert((prev) => !prev)
    }, 3000)
  }

  const onRemove = () => {
    setRemoveAlert(!removeAlert)
    setTimeout(() => {
      setRemoveAlert((prev) => !prev)
    }, 3000)
  }

  const onWarning = () => {
    setWarningAlert(!warningAlert)
    setTimeout(() => {
      setWarningAlert((prev) => !prev)
    }, 3000)
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([])
          const data = snapshot.val()
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo])
            })
          }
        })
      } else if (!user) {
        navigate('/notesAppAuth')
      }
    })
  }, [])

  // add
  const writeToDatabase = () => {
    if (todo.trim() !== '') {
      const uidd = uid()
      set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
        todo: todo,
        uidd: uidd,
        completed: false,
      })

      setTodo('')

      if (addAlert) {
        return
      } else {
        onAdd()
      }
    } else if (todo.trim() === '') {
      if (warningAlert) {
        return
      } else {
        onWarning()
      }
    }
  }

  const writeToDatabaseKeyPress = (e) => {
    if (e.key === 'Enter' && todo.trim() !== '' && !isEdit) {
      const uidd = uid()
      set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
        todo: todo,
        uidd: uidd,
        completed: false,
      })

      setTodo('')
      if (addAlert) {
        return
      } else {
        onAdd()
      }
    } else if (e.key === 'Enter' && todo.trim() === '') {
      if (warningAlert) {
        setTodo('')
        return
      } else {
        onWarning()
        setTodo('')
      }
    }
  }

  // update
  const handleUpdate = (todo) => {
    inputRef.current.focus()
    setIsEdit(true)
    setTodo(todo.todo)
    setTempUidd(todo.uidd)
  }

  // delete
  const handleDelete = (uid) => {
    if (!isEdit) {
      remove(ref(db, `/${auth.currentUser.uid}/${uid}`))

      if (removeAlert) {
        return
      } else {
        onRemove()
      }
    }
  }

  //confirm update
  const handleEditConfirm = () => {
    if (todo.trim() === '') {
      remove(ref(db, `/${auth.currentUser.uid}/${tempUidd}`))
      setTodo('')
      setIsEdit(false)

      if (removeAlert) {
        return
      } else {
        onRemove()
        return
      }
    }

    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd,
    })

    setTodo('')
    setIsEdit(false)
  }

  // change to done
  const handleChanger = (uidd) => {
    update(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      completed: (todos.completed = !todos.completed),
    })
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <AlertMessage
          addAlert={addAlert}
          removeAlert={removeAlert}
          warningAlert={warningAlert}
        />
        <div className="wrap">
          <div className="input-field wrap__item">
            <input
              ref={inputRef}
              placeholder="Добавьте заметку..."
              className="add-edit-input wrap__input"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              id="title"
              onKeyPress={writeToDatabaseKeyPress}
            ></input>

            {isEdit ? (
              <CheckIcon
                onClick={handleEditConfirm}
                className="add-confirm-icon"
              />
            ) : (
              <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
            )}
          </div>
        </div>

        {!todos.length && (
          <p style={{ textAlign: 'center', fontSize: '20px' }}>
            Заметок нет, добавьте что нибудь!
          </p>
        )}

        <TransitionGroup>
          {todos.map((todo) => {
            const classes = ['todo']
            if (todo.completed) {
              classes.push('done')
            }

            const word = todo.todo
            const wordMiddle = word.match(/(https?:\/\/[^\s]+)/)

            if (wordMiddle) {
              return (
                <CSSTransition
                  key={todo.uidd}
                  classNames={'note'}
                  timeout={500}
                >
                  <div className={classes.join(' ')}>
                    <DoneSharpIcon
                      fontSize="large"
                      className="change-button"
                      onClick={() => handleChanger(todo.uidd)}
                    />

                    <a
                      href={word.substring(
                        wordMiddle.index,
                        wordMiddle.index + wordMiddle[0].length
                      )}
                    >
                      <span>{word}</span>
                    </a>

                    <EditIcon
                      fontSize="large"
                      onClick={() => handleUpdate(todo)}
                      className="edit-button"
                    />
                    <DeleteIcon
                      fontSize="large"
                      onClick={() => handleDelete(todo.uidd)}
                      className="delete-button"
                    />
                  </div>
                </CSSTransition>
              )
            } else {
              return (
                <CSSTransition
                  key={todo.uidd}
                  classNames={'note'}
                  timeout={500}
                >
                  <div className={classes.join(' ')}>
                    <DoneSharpIcon
                      fontSize="large"
                      className="change-button"
                      onClick={() => handleChanger(todo.uidd)}
                    />

                    <span>{word}</span>

                    <EditIcon
                      fontSize="large"
                      onClick={() => handleUpdate(todo)}
                      className="edit-button"
                    />
                    <DeleteIcon
                      fontSize="large"
                      onClick={() => handleDelete(todo.uidd)}
                      className="delete-button"
                    />
                  </div>
                </CSSTransition>
              )
            }
          })}
        </TransitionGroup>
      </div>
    </>
  )
}
