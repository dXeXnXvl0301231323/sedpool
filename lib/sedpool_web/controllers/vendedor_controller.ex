defmodule SedpoolWeb.VendedorController do
  use SedpoolWeb, :controller

  alias Sedpool.Account
  alias Sedpool.Account.Vendedor

  def index(conn, _params) do
    vendedores = Account.list_vendedores()
    render(conn, "index.html", vendedores: vendedores)
  end

  def new(conn, _params) do
    changeset = Account.change_vendedor(%Vendedor{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"vendedor" => vendedor_params}) do
    case Account.create_vendedor(vendedor_params) do
      {:ok, vendedor} ->
        conn
        |> put_flash(:info, "Vendedor criado com successo.")
        |> redirect(to: vendedor_path(conn, :show, vendedor))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    vendedor = Account.get_vendedor!(id)
    render(conn, "show.html", vendedor: vendedor)
  end

  def edit(conn, %{"id" => id}) do
    vendedor = Account.get_vendedor!(id)
    changeset = Account.change_vendedor(vendedor)
    render(conn, "edit.html", vendedor: vendedor, changeset: changeset)
  end

  def update(conn, %{"id" => id, "vendedor" => vendedor_params}) do
    vendedor = Account.get_vendedor!(id)

    case Account.update_vendedor(vendedor, vendedor_params) do
      {:ok, vendedor} ->
        conn
        |> put_flash(:info, "Vendedor atualizado com successo!")
        |> redirect(to: vendedor_path(conn, :show, vendedor))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", vendedor: vendedor, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    vendedor = Account.get_vendedor!(id)
    {:ok, _vendedor} = Account.delete_vendedor(vendedor)

    conn
    |> put_flash(:info, "Vendedor deletado com sucesso.")
    |> redirect(to: vendedor_path(conn, :index))
  end
end
