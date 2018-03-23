defmodule SedpoolWeb.PedidoController do
  use SedpoolWeb, :controller

  alias Sedpool.Account
  alias Sedpool.Account.Pedido
  alias Sedpool.Account.Vendedor
  alias Sedpool.Account.Condpag
  alias Sedpool.Repo
  import Ecto.Query  

#  def index(conn, _params) do
#    pedidos = Account.list_pedidos()
#    render(conn, "index.html", pedidos: pedidos)
#  end
  def index(conn, params) do
    page = Pedido
            |> Repo.paginate(params)
    render(conn, "index.html", pedidos: page.entries, page: page)
  end

  def new(conn, _params) do
    changeset = Account.change_pedido(%Pedido{})
#    render(conn, "new.html", changeset: changeset)
     render(conn, "new.html", changeset: changeset, condpagamento: Repo.all(from(c in Condpag, select: {c.descricao_condpagamento, c.codigo_condpagamento})), cod_vendedor: Repo.all(from(c in Vendedor, select: {c.cod_vendedor, c.cod_vendedor})))

  end

  def create(conn, %{"pedido" => pedido_params}) do
    case Account.create_pedido(pedido_params) do
      {:ok, pedido} ->
        conn
        |> put_flash(:info, "Pedido created successfully.")
        |> redirect(to: pedido_path(conn, :show, pedido))
      {:error, %Ecto.Changeset{} = changeset} ->
#        render(conn, "new.html", changeset: changeset)
     render(conn, "new.html", changeset: changeset, cod_vendedor: Repo.all(from(c in Vendedor, select: {c.cod_vendedor, c.cod_vendedor})))
    end
  end

  def show(conn, %{"id" => id}) do
    pedido = Account.get_pedido!(id)
    render(conn, "show.html", pedido: pedido)
  end

  def edit(conn, %{"id" => id}) do
    pedido = Account.get_pedido!(id)
    changeset = Account.change_pedido(pedido)
#    render(conn, "edit.html", pedido: pedido, changeset: changeset)
     render(conn, "new.html", changeset: changeset, cod_vendedor: Repo.all(from(c in Vendedor, select: {c.cod_vendedor, c.cod_vendedor})))
  end

  def update(conn, %{"id" => id, "pedido" => pedido_params}) do
    pedido = Account.get_pedido!(id)

    case Account.update_pedido(pedido, pedido_params) do
      {:ok, pedido} ->
        conn
        |> put_flash(:info, "Pedido updated successfully.")
        |> redirect(to: pedido_path(conn, :show, pedido))
      {:error, %Ecto.Changeset{} = changeset} ->
#        render(conn, "edit.html", pedido: pedido, changeset: changeset)
        render(conn, "new.html", changeset: changeset, cod_vendedor: Repo.all(from(c in Vendedor, select: {c.cod_vendedor, c.cod_vendedor})))

    end
  end

  def delete(conn, %{"id" => id}) do
    pedido = Account.get_pedido!(id)
    {:ok, _pedido} = Account.delete_pedido(pedido)

    conn
    |> put_flash(:info, "Pedido deleted successfully.")
    |> redirect(to: pedido_path(conn, :index))
  end
end
