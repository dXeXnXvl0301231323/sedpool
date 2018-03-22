defmodule SedpoolWeb.ItenspedidoControllerTest do
  use SedpoolWeb.ConnCase

  alias Sedpool.Account

  @create_attrs %{cli_itenspedidos: "some cli_itenspedidos", descont_itenspedidos: "some descont_itenspedidos", descri_itenspedidos: "some descri_itenspedidos", filial_itenspedidos: "some filial_itenspedidos", item_itenspedidos: "some item_itenspedidos", loja_itenspedidos: "some loja_itenspedidos", num_itenspedidos: "some num_itenspedidos", prcven_itenspedidos: "some prcven_itenspedidos", produto_itenspedidos: "some produto_itenspedidos", prunit_itenspedidos: "some prunit_itenspedidos", qtdven_itenspedidos: "some qtdven_itenspedidos", um_itenspedidos: "some um_itenspedidos", valor_itenspedidos: "some valor_itenspedidos"}
  @update_attrs %{cli_itenspedidos: "some updated cli_itenspedidos", descont_itenspedidos: "some updated descont_itenspedidos", descri_itenspedidos: "some updated descri_itenspedidos", filial_itenspedidos: "some updated filial_itenspedidos", item_itenspedidos: "some updated item_itenspedidos", loja_itenspedidos: "some updated loja_itenspedidos", num_itenspedidos: "some updated num_itenspedidos", prcven_itenspedidos: "some updated prcven_itenspedidos", produto_itenspedidos: "some updated produto_itenspedidos", prunit_itenspedidos: "some updated prunit_itenspedidos", qtdven_itenspedidos: "some updated qtdven_itenspedidos", um_itenspedidos: "some updated um_itenspedidos", valor_itenspedidos: "some updated valor_itenspedidos"}
  @invalid_attrs %{cli_itenspedidos: nil, descont_itenspedidos: nil, descri_itenspedidos: nil, filial_itenspedidos: nil, item_itenspedidos: nil, loja_itenspedidos: nil, num_itenspedidos: nil, prcven_itenspedidos: nil, produto_itenspedidos: nil, prunit_itenspedidos: nil, qtdven_itenspedidos: nil, um_itenspedidos: nil, valor_itenspedidos: nil}

  def fixture(:itenspedido) do
    {:ok, itenspedido} = Account.create_itenspedido(@create_attrs)
    itenspedido
  end

  describe "index" do
    test "lists all itenspedidos", %{conn: conn} do
      conn = get conn, itenspedido_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Itenspedidos"
    end
  end

  describe "new itenspedido" do
    test "renders form", %{conn: conn} do
      conn = get conn, itenspedido_path(conn, :new)
      assert html_response(conn, 200) =~ "New Itenspedido"
    end
  end

  describe "create itenspedido" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, itenspedido_path(conn, :create), itenspedido: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == itenspedido_path(conn, :show, id)

      conn = get conn, itenspedido_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Itenspedido"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, itenspedido_path(conn, :create), itenspedido: @invalid_attrs
      assert html_response(conn, 200) =~ "New Itenspedido"
    end
  end

  describe "edit itenspedido" do
    setup [:create_itenspedido]

    test "renders form for editing chosen itenspedido", %{conn: conn, itenspedido: itenspedido} do
      conn = get conn, itenspedido_path(conn, :edit, itenspedido)
      assert html_response(conn, 200) =~ "Edit Itenspedido"
    end
  end

  describe "update itenspedido" do
    setup [:create_itenspedido]

    test "redirects when data is valid", %{conn: conn, itenspedido: itenspedido} do
      conn = put conn, itenspedido_path(conn, :update, itenspedido), itenspedido: @update_attrs
      assert redirected_to(conn) == itenspedido_path(conn, :show, itenspedido)

      conn = get conn, itenspedido_path(conn, :show, itenspedido)
      assert html_response(conn, 200) =~ "some updated cli_itenspedidos"
    end

    test "renders errors when data is invalid", %{conn: conn, itenspedido: itenspedido} do
      conn = put conn, itenspedido_path(conn, :update, itenspedido), itenspedido: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Itenspedido"
    end
  end

  describe "delete itenspedido" do
    setup [:create_itenspedido]

    test "deletes chosen itenspedido", %{conn: conn, itenspedido: itenspedido} do
      conn = delete conn, itenspedido_path(conn, :delete, itenspedido)
      assert redirected_to(conn) == itenspedido_path(conn, :index)
      assert_error_sent 404, fn ->
        get conn, itenspedido_path(conn, :show, itenspedido)
      end
    end
  end

  defp create_itenspedido(_) do
    itenspedido = fixture(:itenspedido)
    {:ok, itenspedido: itenspedido}
  end
end
