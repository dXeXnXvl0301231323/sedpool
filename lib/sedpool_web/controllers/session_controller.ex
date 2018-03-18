defmodule SedpoolWeb.SessionController do
  use SedpoolWeb, :controller

  alias Sedpool.Account

  def new(conn, _params) do
    render conn, "index.html"
  end

  def create(conn, params) do
    IO.inspect(params)
    case Account.authenticate(params) do
      {:ok, user} ->
        conn
        |> Sedpool.Guardian.Plug.sign_in(user)
        |> put_flash(:info, "Login efetuado!")
        |> redirect(to: "/")
      _ -> 
        render conn, "index.html"
    end
  end

  def destroy(conn, _params) do
    conn
    |> Sedpool.Guardian.Plug.sign_out
    |> put_flash(:info, "Desconectado!")
    |> redirect(to: "/")
  end
end
