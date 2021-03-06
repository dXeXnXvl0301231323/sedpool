defmodule Sedpool.Account.Pedido do
  use Ecto.Schema
  import Ecto.Changeset


  schema "pedidos" do
    field :cliente_pedidos, :string
    field :condpag_pedidos, :string
    field :emissao_pedidos, :string
    field :filial_pedidos, :string
    field :lojacli_pedidos, :string
    field :mennota_pedidos, :string
    field :nota_pedidos, :string
    field :num_pedidos, :string
    field :tabela_pedidos, :string
    field :tipo_pedidos, :string
    field :tipocli_pedidos, :string
    field :vend1_pedidos, :string
    has_many :produtos, Sedpool.Account.Produto
    has_many :clientes, Sedpool.Account.Cliente
    has_many :condpagamentos, Sedpool.Account.Condpag
    has_many :itenspedidos, Sedpool.Account.Itenspedido
    has_many :tbprecos, Sedpool.Account.Tbpreco
    has_many :vendedores, Sedpool.Account.Vendedor
    has_many :users, Sedpool.Account.User

    timestamps()
  end

  @doc false
  def changeset(pedido, attrs) do
    pedido
    |> cast(attrs, [:filial_pedidos, :num_pedidos, :tipo_pedidos, :cliente_pedidos, :lojacli_pedidos, :tipocli_pedidos, :condpag_pedidos, :tabela_pedidos, :vend1_pedidos, :mennota_pedidos, :emissao_pedidos])
    |> validate_required([:filial_pedidos, :num_pedidos, :tipo_pedidos, :cliente_pedidos, :lojacli_pedidos, :tipocli_pedidos, :condpag_pedidos, :tabela_pedidos, :vend1_pedidos, :mennota_pedidos, :emissao_pedidos, :nota_pedidos])
  end
end
