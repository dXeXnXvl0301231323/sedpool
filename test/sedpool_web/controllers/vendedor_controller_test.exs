defmodule SedpoolWeb.VendedorControllerTest do
  use SedpoolWeb.ConnCase

  alias Sedpool.Account

  @create_attrs %{cod_vendedor: "some cod_vendedor", nome_vendedor: "some nome_vendedor"}
  @update_attrs %{cod_vendedor: "some updated cod_vendedor", nome_vendedor: "some updated nome_vendedor"}
  @invalid_attrs %{cod_vendedor: nil, nome_vendedor: nil}

  def fixture(:vendedor) do
    {:ok, vendedor} = Account.create_vendedor(@create_attrs)
    vendedor
  end

  describe "index" do
    test "lists all vendedores", %{conn: conn} do
      conn = get conn, vendedor_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Vendedores"
    end
  end

  describe "new vendedor" do
    test "renders form", %{conn: conn} do
      conn = get conn, vendedor_path(conn, :new)
      assert html_response(conn, 200) =~ "New Vendedor"
    end
  end

  describe "create vendedor" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, vendedor_path(conn, :create), vendedor: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == vendedor_path(conn, :show, id)

      conn = get conn, vendedor_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Vendedor"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, vendedor_path(conn, :create), vendedor: @invalid_attrs
      assert html_response(conn, 200) =~ "New Vendedor"
    end
  end

  describe "edit vendedor" do
    setup [:create_vendedor]

    test "renders form for editing chosen vendedor", %{conn: conn, vendedor: vendedor} do
      conn = get conn, vendedor_path(conn, :edit, vendedor)
      assert html_response(conn, 200) =~ "Edit Vendedor"
    end
  end

  describe "update vendedor" do
    setup [:create_vendedor]

    test "redirects when data is valid", %{conn: conn, vendedor: vendedor} do
      conn = put conn, vendedor_path(conn, :update, vendedor), vendedor: @update_attrs
      assert redirected_to(conn) == vendedor_path(conn, :show, vendedor)

      conn = get conn, vendedor_path(conn, :show, vendedor)
      assert html_response(conn, 200) =~ "some updated cod_vendedor"
    end

    test "renders errors when data is invalid", %{conn: conn, vendedor: vendedor} do
      conn = put conn, vendedor_path(conn, :update, vendedor), vendedor: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Vendedor"
    end
  end

  describe "delete vendedor" do
    setup [:create_vendedor]

    test "deletes chosen vendedor", %{conn: conn, vendedor: vendedor} do
      conn = delete conn, vendedor_path(conn, :delete, vendedor)
      assert redirected_to(conn) == vendedor_path(conn, :index)
      assert_error_sent 404, fn ->
        get conn, vendedor_path(conn, :show, vendedor)
      end
    end
  end

  defp create_vendedor(_) do
    vendedor = fixture(:vendedor)
    {:ok, vendedor: vendedor}
  end
end
