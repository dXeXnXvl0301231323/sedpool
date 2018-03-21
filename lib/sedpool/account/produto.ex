defmodule Sedpool.Account.Produto do
  use Ecto.Schema
  import Ecto.Changeset


  schema "produtos" do
    field :codigo_produto, :string
    field :descricao_produto, :string
    field :filial_produto, :string
    field :grupo_produto, :string
    field :tipo_produto, :string
    field :unidade_medida_produto, :string

    timestamps()
  end

  @doc false
  def changeset(produto, attrs) do
    produto
    |> cast(attrs, [:filial_produto, :codigo_produto, :descricao_produto, :tipo_produto, :unidade_medida_produto, :grupo_produto])
    |> validate_required([:filial_produto, :codigo_produto, :descricao_produto, :tipo_produto, :unidade_medida_produto, :grupo_produto])
  end
end
