defmodule Sedpool.Account.Tbpreco do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tbprecos" do
    field :codproduto_tbpreco, :string
    field :codtabela_tbpreco, :string
    field :filial_tbpreco, :string
    field :item_tbpreco, :string
    field :precovenda_tbpreco, :string
    field :valordesconto_tbpreco, :string

    timestamps()
  end

  @doc false
  def changeset(tbpreco, attrs) do
    tbpreco
    |> cast(attrs, [:filial_tbpreco, :item_tbpreco, :codtabela_tbpreco, :codproduto_tbpreco, :precovenda_tbpreco, :valordesconto_tbpreco])
    |> validate_required([:filial_tbpreco, :item_tbpreco, :codtabela_tbpreco, :codproduto_tbpreco, :precovenda_tbpreco, :valordesconto_tbpreco])
  end
end
