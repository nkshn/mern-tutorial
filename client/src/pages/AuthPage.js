import React from 'react';

export const AuthPage = () => {
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 className="">Сократи силку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title" style={{ marginBottom: 30 }}>
              Авторизация
            </span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action" style={{ textAlign: 'right' }}>
            <button
              className="btn grey lighten-1 black-text"
              style={{ marginRight: 20 }}
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
            <button className="btn yellow darken-4" disabled={loading}>
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
