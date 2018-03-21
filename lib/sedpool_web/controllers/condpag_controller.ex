defmodule SedpoolWeb.CondpagController do
  use SedpoolWeb, :controller

  alias Sedpool.Account
  alias Sedpool.Account.Condpag

  def index(conn, _params) do
    condpagamentos = Account.list_condpagamentos()
    render(conn, "index.html", condpagamentos: condpagamentos)
  end

  def new(conn, _params) do
    changeset = Account.change_condpag(%Condpag{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"condpag" => condpag_params}) do
    case Account.create_condpag(condpag_params) do
      {:ok, condpag} ->
        conn
        |> put_flash(:info, "Condpag created successfully.")
        |> redirect(to: condpag_path(conn, :show, condpag))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    condpag = Account.get_condpag!(id)
    render(conn, "show.html", condpag: condpag)
  end

  def edit(conn, %{"id" => id}) do
    condpag = Account.get_condpag!(id)
    changeset = Account.change_condpag(condpag)
    render(conn, "edit.html", condpag: condpag, changeset: changeset)
  end

  def update(conn, %{"id" => id, "condpag" => condpag_params}) do
    condpag = Account.get_condpag!(id)

    case Account.update_condpag(condpag, condpag_params) do
      {:ok, condpag} ->
        conn
        |> put_flash(:info, "Condpag updated successfully.")
        |> redirect(to: condpag_path(conn, :show, condpag))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", condpag: condpag, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    condpag = Account.get_condpag!(id)
    {:ok, _condpag} = Account.delete_condpag(condpag)

    conn
    |> put_flash(:info, "Condpag deleted successfully.")
    |> redirect(to: condpag_path(conn, :index))
  end
end
