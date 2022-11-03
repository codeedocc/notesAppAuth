import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export const AboutPage = () => {
  const history = useNavigate()

  return (
    <>
      <Navbar />
      <div className="container aboutPage">
        <div className="row">
          <div>
            <div className="card">
              <div className="card-image">
                <img
                  src="https://filearchive.cnews.ru/img/news/2021/08/18/shutterstock1716854038.jpg"
                  alt=""
                ></img>
                <span className="card-title">Социальные сети</span>
              </div>
              <div className="card-content">
                <p>Проект был создан в рамках обучения React & TypeScript.</p>
              </div>
              <div className="card-action">
                <a
                  href="https://t.me/flower171"
                  style={{ color: '#607d8b', fontWeight: 'bold' }}
                >
                  Telegram
                </a>
                <a
                  href="https://github.com/codeedocc"
                  style={{ color: '#607d8b', fontWeight: 'bold' }}
                >
                  Github
                </a>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn blue-grey"
          onClick={() => history('/notesAppAuth/homepage')}
        >
          Обратно к списку дел
        </button>
      </div>
    </>
  )
}
