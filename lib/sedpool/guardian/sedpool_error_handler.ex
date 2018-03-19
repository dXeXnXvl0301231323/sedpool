defmodule Sedpool.SedpoolErrorHandler do
  import Plug.Conn

  alias Sedpool.Account
  alias Sedpool.Account.User

  def auth_error(conn, {type, reason}, _opts) do
	conn
	|> Phoenix.Controller.redirect(to: SedpoolWeb.Router.Helpers.session_path(conn, :new))
  end
end
