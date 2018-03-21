defmodule SedpoolWeb.ProdutoControllerTest do
  use SedpoolWeb.ConnCase

  alias Sedpool.Account

  @create_attrs %{codigo_produto: "some codigo_produto", descricao_produto: "some descricao_produto", filial_produto: "some filial_produto", grupo_produto: "some grupo_produto", tipo_produto: "some tipo_produto", unidade_medida_produto: "some unidade_medida_produto"}
  @update_attrs %{codigo_produto: "some updated codigo_produto", descricao_produto: "some updated descricao_produto", filial_produto: "some updated filial_produto", grupo_produto: "some updated grupo_produto", tipo_produto: "some updated tipo_produto", unidade_medida_produto: "some updated unidade_medida_produto"}
  @invalid_attrs %{codigo_produto: nil, descricao_produto: nil, filial_produto: nil, grupo_produto: nil, tipo_produto: nil, unidade_medida_produto: nil}

  def fixture(:produto) do
    {:ok, produto} = Account.create_produto(@create_attrs)
    produto
  end

  describe "index" do
    test "lists all produtos", %{conn: conn} do
      conn = get conn, produto_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Produtos"
    end
  end

  describe "new produto" do
    test "renders form", %{conn: conn} do
      conn = get conn, produto_path(conn, :new)
      assert html_response(conn, 200) =~ "New Produto"
    end
  end

  describe "create produto" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, produto_path(conn, :create), produto: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == produto_path(conn, :show, id)

      conn = get conn, produto_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Produto"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, produto_path(conn, :create), produto: @invalid_attrs
      assert html_response(conn, 200) =~ "New Produto"
    end
  end

  describe "edit produto" do
    setup [:create_produto]

    test "renders form for editing chosen produto", %{conn: conn, produto: produto} do
      conn = get conn, produto_path(conn, :edit, produto)
      assert html_response(conn, 200) =~ "Edit Produto"
    end
  end

  describe "update produto" do
    setup [:create_produto]

    test "redirects when data is valid", %{conn: conn, produto: produto} do
      conn = put conn, produto_path(conn, :update, produto), produto: @update_attrs
      assert redirected_to(conn) == produto_path(conn, :show, produto)

      conn = get conn, produto_path(conn, :show, produto)
      assert html_response(conn, 200) =~ "some updated codigo_produto"
    end

    test "renders errors when data is invalid", %{conn: conn, produto: produto} do
      conn = put conn, produto_path(conn, :update, produto), produto: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Produto"
    end
  end

  describe "delete produto" do
    setup [:create_produto]

    test "deletes chosen produto", %{conn: conn, produto: produto} do
      conn = delete conn, produto_path(conn, :delete, produto)
      assert redirected_to(conn) == produto_path(conn, :index)
      assert_error_sent 404, fn ->
        get conn, produto_path(conn, :show, produto)
      end
    end
  end

  defp create_produto(_) do
    produto = fixture(:produto)
    {:ok, produto: produto}
  end
end
