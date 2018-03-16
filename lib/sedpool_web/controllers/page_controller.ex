defmodule SedpoolWeb.PageController do
  use SedpoolWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
