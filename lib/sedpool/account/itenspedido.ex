defmodule Sedpool.Account.Itenspedido do
  use Ecto.Schema
  import Ecto.Changeset


  schema "itenspedidos" do
    field :cli_itenspedidos, :string
    field :descont_itenspedidos, :string
    field :descri_itenspedidos, :string
    field :filial_itenspedidos, :string
    field :item_itenspedidos, :string
    field :loja_itenspedidos, :string
    field :num_itenspedidos, :string
    field :prcven_itenspedidos, :string
    field :produto_itenspedidos, :string
    field :prunit_itenspedidos, :string
    field :qtdven_itenspedidos, :string
    field :um_itenspedidos, :string
    field :valor_itenspedidos, :string

    timestamps()
  end

  @doc false
  def changeset(itenspedido, attrs) do
    itenspedido
    |> cast(attrs, [:filial_itenspedidos, :item_itenspedidos, :produto_itenspedidos, :um_itenspedidos, :qtdven_itenspedidos, :prcven_itenspedidos, :valor_itenspedidos, :cli_itenspedidos, :loja_itenspedidos, :descont_itenspedidos, :num_itenspedidos, :descri_itenspedidos, :prunit_itenspedidos])
    |> validate_required([:filial_itenspedidos, :item_itenspedidos, :produto_itenspedidos, :um_itenspedidos, :qtdven_itenspedidos, :prcven_itenspedidos, :valor_itenspedidos, :cli_itenspedidos, :loja_itenspedidos, :descont_itenspedidos, :num_itenspedidos, :descri_itenspedidos, :prunit_itenspedidos])
  end
end
