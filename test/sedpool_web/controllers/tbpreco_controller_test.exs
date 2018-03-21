defmodule SedpoolWeb.TbprecoControllerTest do
  use SedpoolWeb.ConnCase

  alias Sedpool.Account

  @create_attrs %{codproduto_tbpreco: "some codproduto_tbpreco", codtabela_tbpreco: "some codtabela_tbpreco", filial_tbpreco: "some filial_tbpreco", item_tbpreco: "some item_tbpreco", precovenda_tbpreco: "some precovenda_tbpreco", valordesconto_tbpreco: "some valordesconto_tbpreco"}
  @update_attrs %{codproduto_tbpreco: "some updated codproduto_tbpreco", codtabela_tbpreco: "some updated codtabela_tbpreco", filial_tbpreco: "some updated filial_tbpreco", item_tbpreco: "some updated item_tbpreco", precovenda_tbpreco: "some updated precovenda_tbpreco", valordesconto_tbpreco: "some updated valordesconto_tbpreco"}
  @invalid_attrs %{codproduto_tbpreco: nil, codtabela_tbpreco: nil, filial_tbpreco: nil, item_tbpreco: nil, precovenda_tbpreco: nil, valordesconto_tbpreco: nil}

  def fixture(:tbpreco) do
    {:ok, tbpreco} = Account.create_tbpreco(@create_attrs)
    tbpreco
  end

  describe "index" do
    test "lists all tbprecos", %{conn: conn} do
      conn = get conn, tbpreco_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Tbprecos"
    end
  end

  describe "new tbpreco" do
    test "renders form", %{conn: conn} do
      conn = get conn, tbpreco_path(conn, :new)
      assert html_response(conn, 200) =~ "New Tbpreco"
    end
  end

  describe "create tbpreco" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, tbpreco_path(conn, :create), tbpreco: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == tbpreco_path(conn, :show, id)

      conn = get conn, tbpreco_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Tbpreco"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, tbpreco_path(conn, :create), tbpreco: @invalid_attrs
      assert html_response(conn, 200) =~ "New Tbpreco"
    end
  end

  describe "edit tbpreco" do
    setup [:create_tbpreco]

    test "renders form for editing chosen tbpreco", %{conn: conn, tbpreco: tbpreco} do
      conn = get conn, tbpreco_path(conn, :edit, tbpreco)
      assert html_response(conn, 200) =~ "Edit Tbpreco"
    end
  end

  describe "update tbpreco" do
    setup [:create_tbpreco]

    test "redirects when data is valid", %{conn: conn, tbpreco: tbpreco} do
      conn = put conn, tbpreco_path(conn, :update, tbpreco), tbpreco: @update_attrs
      assert redirected_to(conn) == tbpreco_path(conn, :show, tbpreco)

      conn = get conn, tbpreco_path(conn, :show, tbpreco)
      assert html_response(conn, 200) =~ "some updated codproduto_tbpreco"
    end

    test "renders errors when data is invalid", %{conn: conn, tbpreco: tbpreco} do
      conn = put conn, tbpreco_path(conn, :update, tbpreco), tbpreco: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Tbpreco"
    end
  end

  describe "delete tbpreco" do
    setup [:create_tbpreco]

    test "deletes chosen tbpreco", %{conn: conn, tbpreco: tbpreco} do
      conn = delete conn, tbpreco_path(conn, :delete, tbpreco)
      assert redirected_to(conn) == tbpreco_path(conn, :index)
      assert_error_sent 404, fn ->
        get conn, tbpreco_path(conn, :show, tbpreco)
      end
    end
  end

  defp create_tbpreco(_) do
    tbpreco = fixture(:tbpreco)
    {:ok, tbpreco: tbpreco}
  end
end
