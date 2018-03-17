defmodule SedpoolWeb.SessionController do
  use SedpoolWeb, :controller

  alias Sedpool.Account

  def new(conn, _params) do
    render conn, "index.html"
  end

  def create(conn, params) do
    user = Account.get_user_by_email! params["email"]
    valid = Comeonin.Argon2.checkpw(params["password"], user.password_hash)

    if valid do
      conn
      |> Sedpool.Guardian.Plug.sign_in(user)
      |> put_flash(:info, "Login efetuado!")
      |> redirect(to: "/")
    else
      render conn, "index.html"
    end
  end

  def destroy(conn, _params) do
    conn
    |> Sedpool.Guardian.Plug.sign_out
    |> put_flash(:info, "Logged out")
    |> redirect(to: "/")
  end
end
