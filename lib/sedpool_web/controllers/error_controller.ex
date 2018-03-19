defmodule SedpoolWeb.ErrorController do
  use SedpoolWeb, :controller

  def index(conn, _params) do
    redirect(conn, to: "/")
  end
end
