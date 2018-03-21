defmodule SedpoolWeb.ClienteControllerTest do
  use SedpoolWeb.ConnCase

  alias Sedpool.Account

  @create_attrs %{cnpj_cliente: "some cnpj_cliente", cod_cliente: "some cod_cliente", cod_municipio_cliente: "some cod_municipio_cliente", endereco_cliente: "some endereco_cliente", estado_cliente: "some estado_cliente", fantasia_cliente: "some fantasia_cliente", municipio_cliente: "some municipio_cliente", nome_cliente: "some nome_cliente", pais_cliente: "some pais_cliente", tbpreco_cliente: "some tbpreco_cliente", tipo_cliente: "some tipo_cliente", vendedor_cliente: "some vendedor_cliente"}
  @update_attrs %{cnpj_cliente: "some updated cnpj_cliente", cod_cliente: "some updated cod_cliente", cod_municipio_cliente: "some updated cod_municipio_cliente", endereco_cliente: "some updated endereco_cliente", estado_cliente: "some updated estado_cliente", fantasia_cliente: "some updated fantasia_cliente", municipio_cliente: "some updated municipio_cliente", nome_cliente: "some updated nome_cliente", pais_cliente: "some updated pais_cliente", tbpreco_cliente: "some updated tbpreco_cliente", tipo_cliente: "some updated tipo_cliente", vendedor_cliente: "some updated vendedor_cliente"}
  @invalid_attrs %{cnpj_cliente: nil, cod_cliente: nil, cod_municipio_cliente: nil, endereco_cliente: nil, estado_cliente: nil, fantasia_cliente: nil, municipio_cliente: nil, nome_cliente: nil, pais_cliente: nil, tbpreco_cliente: nil, tipo_cliente: nil, vendedor_cliente: nil}

  def fixture(:cliente) do
    {:ok, cliente} = Account.create_cliente(@create_attrs)
    cliente
  end

  describe "index" do
    test "lists all clientes", %{conn: conn} do
      conn = get conn, cliente_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Clientes"
    end
  end

  describe "new cliente" do
    test "renders form", %{conn: conn} do
      conn = get conn, cliente_path(conn, :new)
      assert html_response(conn, 200) =~ "New Cliente"
    end
  end

  describe "create cliente" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, cliente_path(conn, :create), cliente: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == cliente_path(conn, :show, id)

      conn = get conn, cliente_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Cliente"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, cliente_path(conn, :create), cliente: @invalid_attrs
      assert html_response(conn, 200) =~ "New Cliente"
    end
  end

  describe "edit cliente" do
    setup [:create_cliente]

    test "renders form for editing chosen cliente", %{conn: conn, cliente: cliente} do
      conn = get conn, cliente_path(conn, :edit, cliente)
      assert html_response(conn, 200) =~ "Edit Cliente"
    end
  end

  describe "update cliente" do
    setup [:create_cliente]

    test "redirects when data is valid", %{conn: conn, cliente: cliente} do
      conn = put conn, cliente_path(conn, :update, cliente), cliente: @update_attrs
      assert redirected_to(conn) == cliente_path(conn, :show, cliente)

      conn = get conn, cliente_path(conn, :show, cliente)
      assert html_response(conn, 200) =~ "some updated cnpj_cliente"
    end

    test "renders errors when data is invalid", %{conn: conn, cliente: cliente} do
      conn = put conn, cliente_path(conn, :update, cliente), cliente: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Cliente"
    end
  end

  describe "delete cliente" do
    setup [:create_cliente]

    test "deletes chosen cliente", %{conn: conn, cliente: cliente} do
      conn = delete conn, cliente_path(conn, :delete, cliente)
      assert redirected_to(conn) == cliente_path(conn, :index)
      assert_error_sent 404, fn ->
        get conn, cliente_path(conn, :show, cliente)
      end
    end
  end

  defp create_cliente(_) do
    cliente = fixture(:cliente)
    {:ok, cliente: cliente}
  end
end
