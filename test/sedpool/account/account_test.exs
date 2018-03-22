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

  describe "clientes" do
    alias Sedpool.Account.Cliente

    @valid_attrs %{cnpj_cliente: "some cnpj_cliente", cod_cliente: "some cod_cliente", cod_municipio_cliente: "some cod_municipio_cliente", endereco_cliente: "some endereco_cliente", estado_cliente: "some estado_cliente", fantasia_cliente: "some fantasia_cliente", municipio_cliente: "some municipio_cliente", nome_cliente: "some nome_cliente", pais_cliente: "some pais_cliente", tbpreco_cliente: "some tbpreco_cliente", tipo_cliente: "some tipo_cliente", vendedor_cliente: "some vendedor_cliente"}
    @update_attrs %{cnpj_cliente: "some updated cnpj_cliente", cod_cliente: "some updated cod_cliente", cod_municipio_cliente: "some updated cod_municipio_cliente", endereco_cliente: "some updated endereco_cliente", estado_cliente: "some updated estado_cliente", fantasia_cliente: "some updated fantasia_cliente", municipio_cliente: "some updated municipio_cliente", nome_cliente: "some updated nome_cliente", pais_cliente: "some updated pais_cliente", tbpreco_cliente: "some updated tbpreco_cliente", tipo_cliente: "some updated tipo_cliente", vendedor_cliente: "some updated vendedor_cliente"}
    @invalid_attrs %{cnpj_cliente: nil, cod_cliente: nil, cod_municipio_cliente: nil, endereco_cliente: nil, estado_cliente: nil, fantasia_cliente: nil, municipio_cliente: nil, nome_cliente: nil, pais_cliente: nil, tbpreco_cliente: nil, tipo_cliente: nil, vendedor_cliente: nil}

    def cliente_fixture(attrs \\ %{}) do
      {:ok, cliente} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Account.create_cliente()

      cliente
    end

    test "list_clientes/0 returns all clientes" do
      cliente = cliente_fixture()
      assert Account.list_clientes() == [cliente]
    end

    test "get_cliente!/1 returns the cliente with given id" do
      cliente = cliente_fixture()
      assert Account.get_cliente!(cliente.id) == cliente
    end

    test "create_cliente/1 with valid data creates a cliente" do
      assert {:ok, %Cliente{} = cliente} = Account.create_cliente(@valid_attrs)
      assert cliente.cnpj_cliente == "some cnpj_cliente"
      assert cliente.cod_cliente == "some cod_cliente"
      assert cliente.cod_municipio_cliente == "some cod_municipio_cliente"
      assert cliente.endereco_cliente == "some endereco_cliente"
      assert cliente.estado_cliente == "some estado_cliente"
      assert cliente.fantasia_cliente == "some fantasia_cliente"
      assert cliente.municipio_cliente == "some municipio_cliente"
      assert cliente.nome_cliente == "some nome_cliente"
      assert cliente.pais_cliente == "some pais_cliente"
      assert cliente.tbpreco_cliente == "some tbpreco_cliente"
      assert cliente.tipo_cliente == "some tipo_cliente"
      assert cliente.vendedor_cliente == "some vendedor_cliente"
    end

    test "create_cliente/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Account.create_cliente(@invalid_attrs)
    end

    test "update_cliente/2 with valid data updates the cliente" do
      cliente = cliente_fixture()
      assert {:ok, cliente} = Account.update_cliente(cliente, @update_attrs)
      assert %Cliente{} = cliente
      assert cliente.cnpj_cliente == "some updated cnpj_cliente"
      assert cliente.cod_cliente == "some updated cod_cliente"
      assert cliente.cod_municipio_cliente == "some updated cod_municipio_cliente"
      assert cliente.endereco_cliente == "some updated endereco_cliente"
      assert cliente.estado_cliente == "some updated estado_cliente"
      assert cliente.fantasia_cliente == "some updated fantasia_cliente"
      assert cliente.municipio_cliente == "some updated municipio_cliente"
      assert cliente.nome_cliente == "some updated nome_cliente"
      assert cliente.pais_cliente == "some updated pais_cliente"
      assert cliente.tbpreco_cliente == "some updated tbpreco_cliente"
      assert cliente.tipo_cliente == "some updated tipo_cliente"
      assert cliente.vendedor_cliente == "some updated vendedor_cliente"
    end

    test "update_cliente/2 with invalid data returns error changeset" do
      cliente = cliente_fixture()
      assert {:error, %Ecto.Changeset{}} = Account.update_cliente(cliente, @invalid_attrs)
      assert cliente == Account.get_cliente!(cliente.id)
    end

    test "delete_cliente/1 deletes the cliente" do
      cliente = cliente_fixture()
      assert {:ok, %Cliente{}} = Account.delete_cliente(cliente)
      assert_raise Ecto.NoResultsError, fn -> Account.get_cliente!(cliente.id) end
    end

    test "change_cliente/1 returns a cliente changeset" do
      cliente = cliente_fixture()
      assert %Ecto.Changeset{} = Account.change_cliente(cliente)
    end
  end

  describe "condpagamentos" do
    alias Sedpool.Account.Condpag

    @valid_attrs %{codigo_condpagamento: "some codigo_condpagamento", descricao_condpagamento: "some descricao_condpagamento", filial_condpagamento: "some filial_condpagamento", tipo_condpagamento: "some tipo_condpagamento"}
    @update_attrs %{codigo_condpagamento: "some updated codigo_condpagamento", descricao_condpagamento: "some updated descricao_condpagamento", filial_condpagamento: "some updated filial_condpagamento", tipo_condpagamento: "some updated tipo_condpagamento"}
    @invalid_attrs %{codigo_condpagamento: nil, descricao_condpagamento: nil, filial_condpagamento: nil, tipo_condpagamento: nil}

    def condpag_fixture(attrs \\ %{}) do
      {:ok, condpag} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Account.create_condpag()

      condpag
    end

    test "list_condpagamentos/0 returns all condpagamentos" do
      condpag = condpag_fixture()
      assert Account.list_condpagamentos() == [condpag]
    end

    test "get_condpag!/1 returns the condpag with given id" do
      condpag = condpag_fixture()
      assert Account.get_condpag!(condpag.id) == condpag
    end

    test "create_condpag/1 with valid data creates a condpag" do
      assert {:ok, %Condpag{} = condpag} = Account.create_condpag(@valid_attrs)
      assert condpag.codigo_condpagamento == "some codigo_condpagamento"
      assert condpag.descricao_condpagamento == "some descricao_condpagamento"
      assert condpag.filial_condpagamento == "some filial_condpagamento"
      assert condpag.tipo_condpagamento == "some tipo_condpagamento"
    end

    test "create_condpag/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Account.create_condpag(@invalid_attrs)
    end

    test "update_condpag/2 with valid data updates the condpag" do
      condpag = condpag_fixture()
      assert {:ok, condpag} = Account.update_condpag(condpag, @update_attrs)
      assert %Condpag{} = condpag
      assert condpag.codigo_condpagamento == "some updated codigo_condpagamento"
      assert condpag.descricao_condpagamento == "some updated descricao_condpagamento"
      assert condpag.filial_condpagamento == "some updated filial_condpagamento"
      assert condpag.tipo_condpagamento == "some updated tipo_condpagamento"
    end

    test "update_condpag/2 with invalid data returns error changeset" do
      condpag = condpag_fixture()
      assert {:error, %Ecto.Changeset{}} = Account.update_condpag(condpag, @invalid_attrs)
      assert condpag == Account.get_condpag!(condpag.id)
    end

    test "delete_condpag/1 deletes the condpag" do
      condpag = condpag_fixture()
      assert {:ok, %Condpag{}} = Account.delete_condpag(condpag)
      assert_raise Ecto.NoResultsError, fn -> Account.get_condpag!(condpag.id) end
    end

    test "change_condpag/1 returns a condpag changeset" do
      condpag = condpag_fixture()
      assert %Ecto.Changeset{} = Account.change_condpag(condpag)
    end
  end

  describe "tbprecos" do
    alias Sedpool.Account.Tbpreco

    @valid_attrs %{codproduto_tbpreco: "some codproduto_tbpreco", codtabela_tbpreco: "some codtabela_tbpreco", filial_tbpreco: "some filial_tbpreco", item_tbpreco: "some item_tbpreco", precovenda_tbpreco: "some precovenda_tbpreco", valordesconto_tbpreco: "some valordesconto_tbpreco"}
    @update_attrs %{codproduto_tbpreco: "some updated codproduto_tbpreco", codtabela_tbpreco: "some updated codtabela_tbpreco", filial_tbpreco: "some updated filial_tbpreco", item_tbpreco: "some updated item_tbpreco", precovenda_tbpreco: "some updated precovenda_tbpreco", valordesconto_tbpreco: "some updated valordesconto_tbpreco"}
    @invalid_attrs %{codproduto_tbpreco: nil, codtabela_tbpreco: nil, filial_tbpreco: nil, item_tbpreco: nil, precovenda_tbpreco: nil, valordesconto_tbpreco: nil}

    def tbpreco_fixture(attrs \\ %{}) do
      {:ok, tbpreco} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Account.create_tbpreco()

      tbpreco
    end

    test "list_tbprecos/0 returns all tbprecos" do
      tbpreco = tbpreco_fixture()
      assert Account.list_tbprecos() == [tbpreco]
    end

    test "get_tbpreco!/1 returns the tbpreco with given id" do
      tbpreco = tbpreco_fixture()
      assert Account.get_tbpreco!(tbpreco.id) == tbpreco
    end

    test "create_tbpreco/1 with valid data creates a tbpreco" do
      assert {:ok, %Tbpreco{} = tbpreco} = Account.create_tbpreco(@valid_attrs)
      assert tbpreco.codproduto_tbpreco == "some codproduto_tbpreco"
      assert tbpreco.codtabela_tbpreco == "some codtabela_tbpreco"
      assert tbpreco.filial_tbpreco == "some filial_tbpreco"
      assert tbpreco.item_tbpreco == "some item_tbpreco"
      assert tbpreco.precovenda_tbpreco == "some precovenda_tbpreco"
      assert tbpreco.valordesconto_tbpreco == "some valordesconto_tbpreco"
    end

    test "create_tbpreco/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Account.create_tbpreco(@invalid_attrs)
    end

    test "update_tbpreco/2 with valid data updates the tbpreco" do
      tbpreco = tbpreco_fixture()
      assert {:ok, tbpreco} = Account.update_tbpreco(tbpreco, @update_attrs)
      assert %Tbpreco{} = tbpreco
      assert tbpreco.codproduto_tbpreco == "some updated codproduto_tbpreco"
      assert tbpreco.codtabela_tbpreco == "some updated codtabela_tbpreco"
      assert tbpreco.filial_tbpreco == "some updated filial_tbpreco"
      assert tbpreco.item_tbpreco == "some updated item_tbpreco"
      assert tbpreco.precovenda_tbpreco == "some updated precovenda_tbpreco"
      assert tbpreco.valordesconto_tbpreco == "some updated valordesconto_tbpreco"
    end

    test "update_tbpreco/2 with invalid data returns error changeset" do
      tbpreco = tbpreco_fixture()
      assert {:error, %Ecto.Changeset{}} = Account.update_tbpreco(tbpreco, @invalid_attrs)
      assert tbpreco == Account.get_tbpreco!(tbpreco.id)
    end

    test "delete_tbpreco/1 deletes the tbpreco" do
      tbpreco = tbpreco_fixture()
      assert {:ok, %Tbpreco{}} = Account.delete_tbpreco(tbpreco)
      assert_raise Ecto.NoResultsError, fn -> Account.get_tbpreco!(tbpreco.id) end
    end

    test "change_tbpreco/1 returns a tbpreco changeset" do
      tbpreco = tbpreco_fixture()
      assert %Ecto.Changeset{} = Account.change_tbpreco(tbpreco)
    end
  end

  describe "itenspedidos" do
    alias Sedpool.Account.Itenspedido

    @valid_attrs %{cli_itenspedidos: "some cli_itenspedidos", descont_itenspedidos: "some descont_itenspedidos", descri_itenspedidos: "some descri_itenspedidos", filial_itenspedidos: "some filial_itenspedidos", item_itenspedidos: "some item_itenspedidos", loja_itenspedidos: "some loja_itenspedidos", num_itenspedidos: "some num_itenspedidos", prcven_itenspedidos: "some prcven_itenspedidos", produto_itenspedidos: "some produto_itenspedidos", prunit_itenspedidos: "some prunit_itenspedidos", qtdven_itenspedidos: "some qtdven_itenspedidos", um_itenspedidos: "some um_itenspedidos", valor_itenspedidos: "some valor_itenspedidos"}
    @update_attrs %{cli_itenspedidos: "some updated cli_itenspedidos", descont_itenspedidos: "some updated descont_itenspedidos", descri_itenspedidos: "some updated descri_itenspedidos", filial_itenspedidos: "some updated filial_itenspedidos", item_itenspedidos: "some updated item_itenspedidos", loja_itenspedidos: "some updated loja_itenspedidos", num_itenspedidos: "some updated num_itenspedidos", prcven_itenspedidos: "some updated prcven_itenspedidos", produto_itenspedidos: "some updated produto_itenspedidos", prunit_itenspedidos: "some updated prunit_itenspedidos", qtdven_itenspedidos: "some updated qtdven_itenspedidos", um_itenspedidos: "some updated um_itenspedidos", valor_itenspedidos: "some updated valor_itenspedidos"}
    @invalid_attrs %{cli_itenspedidos: nil, descont_itenspedidos: nil, descri_itenspedidos: nil, filial_itenspedidos: nil, item_itenspedidos: nil, loja_itenspedidos: nil, num_itenspedidos: nil, prcven_itenspedidos: nil, produto_itenspedidos: nil, prunit_itenspedidos: nil, qtdven_itenspedidos: nil, um_itenspedidos: nil, valor_itenspedidos: nil}

    def itenspedido_fixture(attrs \\ %{}) do
      {:ok, itenspedido} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Account.create_itenspedido()

      itenspedido
    end

    test "list_itenspedidos/0 returns all itenspedidos" do
      itenspedido = itenspedido_fixture()
      assert Account.list_itenspedidos() == [itenspedido]
    end

    test "get_itenspedido!/1 returns the itenspedido with given id" do
      itenspedido = itenspedido_fixture()
      assert Account.get_itenspedido!(itenspedido.id) == itenspedido
    end

    test "create_itenspedido/1 with valid data creates a itenspedido" do
      assert {:ok, %Itenspedido{} = itenspedido} = Account.create_itenspedido(@valid_attrs)
      assert itenspedido.cli_itenspedidos == "some cli_itenspedidos"
      assert itenspedido.descont_itenspedidos == "some descont_itenspedidos"
      assert itenspedido.descri_itenspedidos == "some descri_itenspedidos"
      assert itenspedido.filial_itenspedidos == "some filial_itenspedidos"
      assert itenspedido.item_itenspedidos == "some item_itenspedidos"
      assert itenspedido.loja_itenspedidos == "some loja_itenspedidos"
      assert itenspedido.num_itenspedidos == "some num_itenspedidos"
      assert itenspedido.prcven_itenspedidos == "some prcven_itenspedidos"
      assert itenspedido.produto_itenspedidos == "some produto_itenspedidos"
      assert itenspedido.prunit_itenspedidos == "some prunit_itenspedidos"
      assert itenspedido.qtdven_itenspedidos == "some qtdven_itenspedidos"
      assert itenspedido.um_itenspedidos == "some um_itenspedidos"
      assert itenspedido.valor_itenspedidos == "some valor_itenspedidos"
    end

    test "create_itenspedido/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Account.create_itenspedido(@invalid_attrs)
    end

    test "update_itenspedido/2 with valid data updates the itenspedido" do
      itenspedido = itenspedido_fixture()
      assert {:ok, itenspedido} = Account.update_itenspedido(itenspedido, @update_attrs)
      assert %Itenspedido{} = itenspedido
      assert itenspedido.cli_itenspedidos == "some updated cli_itenspedidos"
      assert itenspedido.descont_itenspedidos == "some updated descont_itenspedidos"
      assert itenspedido.descri_itenspedidos == "some updated descri_itenspedidos"
      assert itenspedido.filial_itenspedidos == "some updated filial_itenspedidos"
      assert itenspedido.item_itenspedidos == "some updated item_itenspedidos"
      assert itenspedido.loja_itenspedidos == "some updated loja_itenspedidos"
      assert itenspedido.num_itenspedidos == "some updated num_itenspedidos"
      assert itenspedido.prcven_itenspedidos == "some updated prcven_itenspedidos"
      assert itenspedido.produto_itenspedidos == "some updated produto_itenspedidos"
      assert itenspedido.prunit_itenspedidos == "some updated prunit_itenspedidos"
      assert itenspedido.qtdven_itenspedidos == "some updated qtdven_itenspedidos"
      assert itenspedido.um_itenspedidos == "some updated um_itenspedidos"
      assert itenspedido.valor_itenspedidos == "some updated valor_itenspedidos"
    end

    test "update_itenspedido/2 with invalid data returns error changeset" do
      itenspedido = itenspedido_fixture()
      assert {:error, %Ecto.Changeset{}} = Account.update_itenspedido(itenspedido, @invalid_attrs)
      assert itenspedido == Account.get_itenspedido!(itenspedido.id)
    end

    test "delete_itenspedido/1 deletes the itenspedido" do
      itenspedido = itenspedido_fixture()
      assert {:ok, %Itenspedido{}} = Account.delete_itenspedido(itenspedido)
      assert_raise Ecto.NoResultsError, fn -> Account.get_itenspedido!(itenspedido.id) end
    end

    test "change_itenspedido/1 returns a itenspedido changeset" do
      itenspedido = itenspedido_fixture()
      assert %Ecto.Changeset{} = Account.change_itenspedido(itenspedido)
    end
  end
end
