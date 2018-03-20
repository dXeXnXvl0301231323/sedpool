defmodule SedpoolWeb.UserController do
  use SedpoolWeb, :controller

  alias Sedpool.Account
  alias Sedpool.Account.User
  alias Sedpool.Account.Vendedor
  alias Sedpool.Repo
  import Ecto.Query

  def index(conn, _params) do
    users = Account.list_users()
    render(conn, "index.html", users: users)
  end

  def new(conn, _params) do
    changeset = Account.change_user(%User{})
#    render(conn, "new.html", changeset: changeset)
     render(conn, "new.html", changeset: changeset, vendedor: Repo.all(from(c in Vendedor, select: {c.cod_vendedor, c.cod_vendedor})))
  end

  def create(conn, %{"user" => user_params}) do
#    case Account.create_user(user_params) do
    changeset = User.changeset(%User{}, user_params)
        case Repo.insert(changeset) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "Usuário criado com sucesso.")
        |> redirect(to: user_path(conn, :show, user))
      {:error, %Ecto.Changeset{} = changeset} ->
#        render(conn, "new.html", changeset: changeset)
	render(conn, "new.html", changeset: changeset, vendedor: Repo.all(from(c in Vendedor, select: {c.cod_vendedor, c.cod_vendedor})))
    end
  end

  def show(conn, %{"id" => id}) do
    user = Account.get_user!(id)
    render(conn, "show.html", user: user)
  end

  def edit(conn, %{"id" => id}) do
    user = Account.get_user!(id)
    changeset = Account.change_user(user)
#    render(conn, "edit.html", user: user, changeset: changeset)
	    render(conn, "edit.html", user: user, changeset: changeset, vendedor: Repo.all(from(c in Vendedor, select: {c.cod_vendedor, c.cod_vendedor})))
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Account.get_user!(id)

    case Account.update_user(user, user_params) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "Usuário atualizado com sucesso.")
        |> redirect(to: user_path(conn, :show, user))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", user: user, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Account.get_user!(id)
    {:ok, _user} = Account.delete_user(user)

    conn
    |> put_flash(:info, "Usuário excluído com sucesso.")
    |> redirect(to: user_path(conn, :index))
  end
end
