defmodule Sedpool.AccountTest do
  use Sedpool.DataCase

  alias Sedpool.Account

  describe "vendedores" do
    alias Sedpool.Account.Vendedor

    @valid_attrs %{cod_vendedor: "some cod_vendedor", nome_vendedor: "some nome_vendedor"}
    @update_attrs %{cod_vendedor: "some updated cod_vendedor", nome_vendedor: "some updated nome_vendedor"}
    @invalid_attrs %{cod_vendedor: nil, nome_vendedor: nil}

    def vendedor_fixture(attrs \\ %{}) do
      {:ok, vendedor} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Account.create_vendedor()

      vendedor
    end

    test "list_vendedores/0 returns all vendedores" do
      vendedor = vendedor_fixture()
      assert Account.list_vendedores() == [vendedor]
    end

    test "get_vendedor!/1 returns the vendedor with given id" do
      vendedor = vendedor_fixture()
      assert Account.get_vendedor!(vendedor.id) == vendedor
    end

    test "create_vendedor/1 with valid data creates a vendedor" do
      assert {:ok, %Vendedor{} = vendedor} = Account.create_vendedor(@valid_attrs)
      assert vendedor.cod_vendedor == "some cod_vendedor"
      assert vendedor.nome_vendedor == "some nome_vendedor"
    end

    test "create_vendedor/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Account.create_vendedor(@invalid_attrs)
    end

    test "update_vendedor/2 with valid data updates the vendedor" do
      vendedor = vendedor_fixture()
      assert {:ok, vendedor} = Account.update_vendedor(vendedor, @update_attrs)
      assert %Vendedor{} = vendedor
      assert vendedor.cod_vendedor == "some updated cod_vendedor"
      assert vendedor.nome_vendedor == "some updated nome_vendedor"
    end

    test "update_vendedor/2 with invalid data returns error changeset" do
      vendedor = vendedor_fixture()
      assert {:error, %Ecto.Changeset{}} = Account.update_vendedor(vendedor, @invalid_attrs)
      assert vendedor == Account.get_vendedor!(vendedor.id)
    end

    test "delete_vendedor/1 deletes the vendedor" do
      vendedor = vendedor_fixture()
      assert {:ok, %Vendedor{}} = Account.delete_vendedor(vendedor)
      assert_raise Ecto.NoResultsError, fn -> Account.get_vendedor!(vendedor.id) end
    end

    test "change_vendedor/1 returns a vendedor changeset" do
      vendedor = vendedor_fixture()
      assert %Ecto.Changeset{} = Account.change_vendedor(vendedor)
    end
  end
end
