defmodule SedpoolWeb.ItenspedidoController do
  use SedpoolWeb, :controller

  alias Sedpool.Account
  alias Sedpool.Account.Itenspedido

  def index(conn, _params) do
    itenspedidos = Account.list_itenspedidos()
    render(conn, "index.html", itenspedidos: itenspedidos)
  end

  def new(conn, _params) do
    changeset = Account.change_itenspedido(%Itenspedido{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"itenspedido" => itenspedido_params}) do
    case Account.create_itenspedido(itenspedido_params) do
      {:ok, itenspedido} ->
        conn
        |> put_flash(:info, "Itenspedido created successfully.")
        |> redirect(to: itenspedido_path(conn, :show, itenspedido))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    itenspedido = Account.get_itenspedido!(id)
    render(conn, "show.html", itenspedido: itenspedido)
  end

  def edit(conn, %{"id" => id}) do
    itenspedido = Account.get_itenspedido!(id)
    changeset = Account.change_itenspedido(itenspedido)
    render(conn, "edit.html", itenspedido: itenspedido, changeset: changeset)
  end

  def update(conn, %{"id" => id, "itenspedido" => itenspedido_params}) do
    itenspedido = Account.get_itenspedido!(id)

    case Account.update_itenspedido(itenspedido, itenspedido_params) do
      {:ok, itenspedido} ->
        conn
        |> put_flash(:info, "Itenspedido updated successfully.")
        |> redirect(to: itenspedido_path(conn, :show, itenspedido))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", itenspedido: itenspedido, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    itenspedido = Account.get_itenspedido!(id)
    {:ok, _itenspedido} = Account.delete_itenspedido(itenspedido)

    conn
    |> put_flash(:info, "Itenspedido deleted successfully.")
    |> redirect(to: itenspedido_path(conn, :index))
  end
end
