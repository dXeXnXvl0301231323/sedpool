defmodule SedpoolWeb.CondpagControllerTest do
  use SedpoolWeb.ConnCase

  alias Sedpool.Account

  @create_attrs %{codigo_condpagamento: "some codigo_condpagamento", descricao_condpagamento: "some descricao_condpagamento", filial_condpagamento: "some filial_condpagamento", tipo_condpagamento: "some tipo_condpagamento"}
  @update_attrs %{codigo_condpagamento: "some updated codigo_condpagamento", descricao_condpagamento: "some updated descricao_condpagamento", filial_condpagamento: "some updated filial_condpagamento", tipo_condpagamento: "some updated tipo_condpagamento"}
  @invalid_attrs %{codigo_condpagamento: nil, descricao_condpagamento: nil, filial_condpagamento: nil, tipo_condpagamento: nil}

  def fixture(:condpag) do
    {:ok, condpag} = Account.create_condpag(@create_attrs)
    condpag
  end

  describe "index" do
    test "lists all condpagamentos", %{conn: conn} do
      conn = get conn, condpag_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Condpagamentos"
    end
  end

  describe "new condpag" do
    test "renders form", %{conn: conn} do
      conn = get conn, condpag_path(conn, :new)
      assert html_response(conn, 200) =~ "New Condpag"
    end
  end

  describe "create condpag" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, condpag_path(conn, :create), condpag: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == condpag_path(conn, :show, id)

      conn = get conn, condpag_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Condpag"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, condpag_path(conn, :create), condpag: @invalid_attrs
      assert html_response(conn, 200) =~ "New Condpag"
    end
  end

  describe "edit condpag" do
    setup [:create_condpag]

    test "renders form for editing chosen condpag", %{conn: conn, condpag: condpag} do
      conn = get conn, condpag_path(conn, :edit, condpag)
      assert html_response(conn, 200) =~ "Edit Condpag"
    end
  end

  describe "update condpag" do
    setup [:create_condpag]

    test "redirects when data is valid", %{conn: conn, condpag: condpag} do
      conn = put conn, condpag_path(conn, :update, condpag), condpag: @update_attrs
      assert redirected_to(conn) == condpag_path(conn, :show, condpag)

      conn = get conn, condpag_path(conn, :show, condpag)
      assert html_response(conn, 200) =~ "some updated codigo_condpagamento"
    end

    test "renders errors when data is invalid", %{conn: conn, condpag: condpag} do
      conn = put conn, condpag_path(conn, :update, condpag), condpag: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Condpag"
    end
  end

  describe "delete condpag" do
    setup [:create_condpag]

    test "deletes chosen condpag", %{conn: conn, condpag: condpag} do
      conn = delete conn, condpag_path(conn, :delete, condpag)
      assert redirected_to(conn) == condpag_path(conn, :index)
      assert_error_sent 404, fn ->
        get conn, condpag_path(conn, :show, condpag)
      end
    end
  end

  defp create_condpag(_) do
    condpag = fixture(:condpag)
    {:ok, condpag: condpag}
  end
end
