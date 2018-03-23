defmodule SedpoolWeb.ProdutoController do
  use SedpoolWeb, :controller

  alias Sedpool.Account
  alias Sedpool.Account.Produto
  alias Sedpool.Repo

#  def index(conn, _params) do
#    produtos = Account.list_produtos()
#    render(conn, "index.html", produtos: produtos)
#  end
  def index(conn, params) do
    page = Produto
            |> Repo.paginate(params)
    render(conn, "index.html", produtos: page.entries, page: page)
  end


  def new(conn, _params) do
    changeset = Account.change_produto(%Produto{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"produto" => produto_params}) do
    case Account.create_produto(produto_params) do
      {:ok, produto} ->
        conn
        |> put_flash(:info, "Produto created successfully.")
        |> redirect(to: produto_path(conn, :show, produto))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    produto = Account.get_produto!(id)
    render(conn, "show.html", produto: produto)
  end

  def edit(conn, %{"id" => id}) do
    produto = Account.get_produto!(id)
    changeset = Account.change_produto(produto)
    render(conn, "edit.html", produto: produto, changeset: changeset)
  end

  def update(conn, %{"id" => id, "produto" => produto_params}) do
    produto = Account.get_produto!(id)

    case Account.update_produto(produto, produto_params) do
      {:ok, produto} ->
        conn
        |> put_flash(:info, "Produto updated successfully.")
        |> redirect(to: produto_path(conn, :show, produto))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", produto: produto, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    produto = Account.get_produto!(id)
    {:ok, _produto} = Account.delete_produto(produto)

    conn
    |> put_flash(:info, "Produto deleted successfully.")
    |> redirect(to: produto_path(conn, :index))
  end
end
