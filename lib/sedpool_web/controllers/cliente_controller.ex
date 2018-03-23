defmodule SedpoolWeb.ClienteController do
  use SedpoolWeb, :controller

  alias Sedpool.Account
  alias Sedpool.Account.Cliente
  alias Sedpool.Repo

#  def index(conn, _params) do
#    clientes = Account.list_clientes()
#    render(conn, "index.html", clientes: clientes)
#  end
  def index(conn, params) do
    page = Cliente
            |> Repo.paginate(params)
    render(conn, "index.html", clientes: page.entries, page: page)
  end



  def new(conn, _params) do
    changeset = Account.change_cliente(%Cliente{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"cliente" => cliente_params}) do
    case Account.create_cliente(cliente_params) do
      {:ok, cliente} ->
        conn
        |> put_flash(:info, "Cliente created successfully.")
        |> redirect(to: cliente_path(conn, :show, cliente))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    cliente = Account.get_cliente!(id)
    render(conn, "show.html", cliente: cliente)
  end

  def edit(conn, %{"id" => id}) do
    cliente = Account.get_cliente!(id)
    changeset = Account.change_cliente(cliente)
    render(conn, "edit.html", cliente: cliente, changeset: changeset)
  end

  def update(conn, %{"id" => id, "cliente" => cliente_params}) do
    cliente = Account.get_cliente!(id)

    case Account.update_cliente(cliente, cliente_params) do
      {:ok, cliente} ->
        conn
        |> put_flash(:info, "Cliente updated successfully.")
        |> redirect(to: cliente_path(conn, :show, cliente))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", cliente: cliente, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    cliente = Account.get_cliente!(id)
    {:ok, _cliente} = Account.delete_cliente(cliente)

    conn
    |> put_flash(:info, "Cliente deleted successfully.")
    |> redirect(to: cliente_path(conn, :index))
  end
end
