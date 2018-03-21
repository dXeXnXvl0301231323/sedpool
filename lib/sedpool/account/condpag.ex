defmodule Sedpool.Account.Condpag do
  use Ecto.Schema
  import Ecto.Changeset


  schema "condpagamentos" do
    field :codigo_condpagamento, :string
    field :descricao_condpagamento, :string
    field :filial_condpagamento, :string
    field :tipo_condpagamento, :string

    timestamps()
  end

  @doc false
  def changeset(condpag, attrs) do
    condpag
    |> cast(attrs, [:filial_condpagamento, :codigo_condpagamento, :tipo_condpagamento, :descricao_condpagamento])
    |> validate_required([:filial_condpagamento, :codigo_condpagamento, :tipo_condpagamento, :descricao_condpagamento])
  end
end
