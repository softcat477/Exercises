const LoginForm = (handleLogin,
  username, setUsername,
  password, setPassword) => {
  return (
    <>
      <form onSubmit={handleLogin} className="login-form">
        <div>
          username <input type="text"
            id="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password <input type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </>
  )
}

export default LoginForm