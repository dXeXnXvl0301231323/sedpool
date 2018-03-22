defmodule SedpoolWeb.PedidoControllerTest do
  use SedpoolWeb.ConnCase

  alias Sedpool.Account

  @create_attrs %{cliente_pedidos: "some cliente_pedidos", condpag_pedidos: "some condpag_pedidos", emissao_pedidos: "some emissao_pedidos", filial_pedidos: "some filial_pedidos", lojacli_pedidos: "some lojacli_pedidos", mennota_pedidos: "some mennota_pedidos", nota_pedidos: "some nota_pedidos", num_pedidos: "some num_pedidos", tabela_pedidos: "some tabela_pedidos", tipo_pedidos: "some tipo_pedidos", tipocli_pedidos: "some tipocli_pedidos", vend1_pedidos: "some vend1_pedidos"}
  @update_attrs %{cliente_pedidos: "some updated cliente_pedidos", condpag_pedidos: "some updated condpag_pedidos", emissao_pedidos: "some updated emissao_pedidos", filial_pedidos: "some updated filial_pedidos", lojacli_pedidos: "some updated lojacli_pedidos", mennota_pedidos: "some updated mennota_pedidos", nota_pedidos: "some updated nota_pedidos", num_pedidos: "some updated num_pedidos", tabela_pedidos: "some updated tabela_pedidos", tipo_pedidos: "some updated tipo_pedidos", tipocli_pedidos: "some updated tipocli_pedidos", vend1_pedidos: "some updated vend1_pedidos"}
  @invalid_attrs %{cliente_pedidos: nil, condpag_pedidos: nil, emissao_pedidos: nil, filial_pedidos: nil, lojacli_pedidos: nil, mennota_pedidos: nil, nota_pedidos: nil, num_pedidos: nil, tabela_pedidos: nil, tipo_pedidos: nil, tipocli_pedidos: nil, vend1_pedidos: nil}

  def fixture(:pedido) do
    {:ok, pedido} = Account.create_pedido(@create_attrs)
    pedido
  end

  describe "index" do
    test "lists all pedidos", %{conn: conn} do
      conn = get conn, pedido_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Pedidos"
    end
  end

  describe "new pedido" do
    test "renders form", %{conn: conn} do
      conn = get conn, pedido_path(conn, :new)
      assert html_response(conn, 200) =~ "New Pedido"
    end
  end

  describe "create pedido" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, pedido_path(conn, :create), pedido: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == pedido_path(conn, :show, id)

      conn = get conn, pedido_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Pedido"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, pedido_path(conn, :create), pedido: @invalid_attrs
      assert html_response(conn, 200) =~ "New Pedido"
    end
  end

  describe "edit pedido" do
    setup [:create_pedido]

    test "renders form for editing chosen pedido", %{conn: conn, pedido: pedido} do
      conn = get conn, pedido_path(conn, :edit, pedido)
      assert html_response(conn, 200) =~ "Edit Pedido"
    end
  end

  describe "update pedido" do
    setup [:create_pedido]

    test "redirects when data is valid", %{conn: conn, pedido: pedido} do
      conn = put conn, pedido_path(conn, :update, pedido), pedido: @update_attrs
      assert redirected_to(conn) == pedido_path(conn, :show, pedido)

      conn = get conn, pedido_path(conn, :show, pedido)
      assert html_response(conn, 200) =~ "some updated cliente_pedidos"
    end

    test "renders errors when data is invalid", %{conn: conn, pedido: pedido} do
      conn = put conn, pedido_path(conn, :update, pedido), pedido: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Pedido"
    end
  end

  describe "delete pedido" do
    setup [:create_pedido]

    test "deletes chosen pedido", %{conn: conn, pedido: pedido} do
      conn = delete conn, pedido_path(conn, :delete, pedido)
      assert redirected_to(conn) == pedido_path(conn, :index)
      assert_error_sent 404, fn ->
        get conn, pedido_path(conn, :show, pedido)
      end
    end
  end

  defp create_pedido(_) do
    pedido = fixture(:pedido)
    {:ok, pedido: pedido}
  end
end
