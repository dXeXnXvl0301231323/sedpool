defmodule Sedpool.SedpoolErrorHandler do
  import Plug.Conn

  alias Sedpool.Account
  alias Sedpool.Account.User

#  def auth_error(conn, {type, reason}, _opts) do
#    body = Poison.encode!(%{message: to_string(type)})
#    send_resp(conn, 401, body)
#  end

#  def auth_error(conn, {type, reason}, _opts) do
#    body = to_string(type)
#    conn
#    |> put_resp_content_type("text/plain")
#    |> send_resp(401, body)
#  end

  def auth_error(conn, {type, reason}, _opts) do
	conn
	|> Phoenix.Controller.redirect(to: SedpoolWeb.Router.Helpers.session_path(conn, :new))
  end
end
