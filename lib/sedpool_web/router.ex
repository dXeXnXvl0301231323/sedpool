defmodule SedpoolWeb.Router do
  use SedpoolWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :browser_session do
    plug Sedpool.SedpoolAccessPipeline
    plug Sedpool.Plug.SetCurrentUser
  end

  pipeline :ensure_auth do
    plug Guardian.Plug.EnsureAuthenticated
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", SedpoolWeb do
    pipe_through [:browser, :browser_session]
    get "/", PageController, :index

    resources "/users", UserController
    resources "/vendedores", VendedorController
    resources "/produtos", ProdutoController
    resources "/clientes", ClienteController
    resources "/condpagamentos", CondpagController
    resources "/tbprecos", TbprecoController
    resources "/itenspedidos", ItenspedidoController

    get "/login", SessionController, :new
    post "/login", SessionController, :create
    get "/logout", SessionController, :destroy

#    get "/register", RegistrationController, :new
#    post "/register", RegistrationController, :create
#get "/*path", ErrorController, :index
  end

  scope "/", SedpoolWeb do
    pipe_through [:browser, :browser_session, :ensure_auth]
#    resources "/users", UserController
#    resources "/vendedores", VendedorController
#    resources "/produtos", ProdutoController

  end
 
  # Other scopes may use custom stacks.
  # scope "/api", SedpoolWeb do
  #   pipe_through :api
  # end
end
