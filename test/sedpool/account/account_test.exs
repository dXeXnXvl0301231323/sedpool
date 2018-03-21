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

  describe "produtos" do
    alias Sedpool.Account.Produto

    @valid_attrs %{codigo_produto: "some codigo_produto", descricao_produto: "some descricao_produto", filial_produto: "some filial_produto", grupo_produto: "some grupo_produto", tipo_produto: "some tipo_produto", unidade_medida_produto: "some unidade_medida_produto"}
    @update_attrs %{codigo_produto: "some updated codigo_produto", descricao_produto: "some updated descricao_produto", filial_produto: "some updated filial_produto", grupo_produto: "some updated grupo_produto", tipo_produto: "some updated tipo_produto", unidade_medida_produto: "some updated unidade_medida_produto"}
    @invalid_attrs %{codigo_produto: nil, descricao_produto: nil, filial_produto: nil, grupo_produto: nil, tipo_produto: nil, unidade_medida_produto: nil}

    def produto_fixture(attrs \\ %{}) do
      {:ok, produto} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Account.create_produto()

      produto
    end

    test "list_produtos/0 returns all produtos" do
      produto = produto_fixture()
      assert Account.list_produtos() == [produto]
    end

    test "get_produto!/1 returns the produto with given id" do
      produto = produto_fixture()
      assert Account.get_produto!(produto.id) == produto
    end

    test "create_produto/1 with valid data creates a produto" do
      assert {:ok, %Produto{} = produto} = Account.create_produto(@valid_attrs)
      assert produto.codigo_produto == "some codigo_produto"
      assert produto.descricao_produto == "some descricao_produto"
      assert produto.filial_produto == "some filial_produto"
      assert produto.grupo_produto == "some grupo_produto"
      assert produto.tipo_produto == "some tipo_produto"
      assert produto.unidade_medida_produto == "some unidade_medida_produto"
    end

    test "create_produto/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Account.create_produto(@invalid_attrs)
    end

    test "update_produto/2 with valid data updates the produto" do
      produto = produto_fixture()
      assert {:ok, produto} = Account.update_produto(produto, @update_attrs)
      assert %Produto{} = produto
      assert produto.codigo_produto == "some updated codigo_produto"
      assert produto.descricao_produto == "some updated descricao_produto"
      assert produto.filial_produto == "some updated filial_produto"
      assert produto.grupo_produto == "some updated grupo_produto"
      assert produto.tipo_produto == "some updated tipo_produto"
      assert produto.unidade_medida_produto == "some updated unidade_medida_produto"
    end

    test "update_produto/2 with invalid data returns error changeset" do
      produto = produto_fixture()
      assert {:error, %Ecto.Changeset{}} = Account.update_produto(produto, @invalid_attrs)
      assert produto == Account.get_produto!(produto.id)
    end

    test "delete_produto/1 deletes the produto" do
      produto = produto_fixture()
      assert {:ok, %Produto{}} = Account.delete_produto(produto)
      assert_raise Ecto.NoResultsError, fn -> Account.get_produto!(produto.id) end
    end

    test "change_produto/1 returns a produto changeset" do
      produto = produto_fixture()
      assert %Ecto.Changeset{} = Account.change_produto(produto)
    end
  end
end
