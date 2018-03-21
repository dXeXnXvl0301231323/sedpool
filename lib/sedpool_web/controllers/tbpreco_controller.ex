defmodule SedpoolWeb.TbprecoController do
  use SedpoolWeb, :controller

  alias Sedpool.Account
  alias Sedpool.Account.Tbpreco

  def index(conn, _params) do
    tbprecos = Account.list_tbprecos()
    render(conn, "index.html", tbprecos: tbprecos)
  end

  def new(conn, _params) do
    changeset = Account.change_tbpreco(%Tbpreco{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"tbpreco" => tbpreco_params}) do
    case Account.create_tbpreco(tbpreco_params) do
      {:ok, tbpreco} ->
        conn
        |> put_flash(:info, "Tbpreco created successfully.")
        |> redirect(to: tbpreco_path(conn, :show, tbpreco))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    tbpreco = Account.get_tbpreco!(id)
    render(conn, "show.html", tbpreco: tbpreco)
  end

  def edit(conn, %{"id" => id}) do
    tbpreco = Account.get_tbpreco!(id)
    changeset = Account.change_tbpreco(tbpreco)
    render(conn, "edit.html", tbpreco: tbpreco, changeset: changeset)
  end

  def update(conn, %{"id" => id, "tbpreco" => tbpreco_params}) do
    tbpreco = Account.get_tbpreco!(id)

    case Account.update_tbpreco(tbpreco, tbpreco_params) do
      {:ok, tbpreco} ->
        conn
        |> put_flash(:info, "Tbpreco updated successfully.")
        |> redirect(to: tbpreco_path(conn, :show, tbpreco))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", tbpreco: tbpreco, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    tbpreco = Account.get_tbpreco!(id)
    {:ok, _tbpreco} = Account.delete_tbpreco(tbpreco)

    conn
    |> put_flash(:info, "Tbpreco deleted successfully.")
    |> redirect(to: tbpreco_path(conn, :index))
  end
end
