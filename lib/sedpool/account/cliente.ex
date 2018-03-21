defmodule Sedpool.Account.Cliente do
  use Ecto.Schema
  import Ecto.Changeset


  schema "clientes" do
    field :cnpj_cliente, :string
    field :cod_cliente, :string
    field :cod_municipio_cliente, :string
    field :endereco_cliente, :string
    field :estado_cliente, :string
    field :fantasia_cliente, :string
    field :municipio_cliente, :string
    field :nome_cliente, :string
    field :pais_cliente, :string
    field :tbpreco_cliente, :string
    field :tipo_cliente, :string
    field :vendedor_cliente, :string

    timestamps()
  end

  @doc false
  def changeset(cliente, attrs) do
    cliente
    |> cast(attrs, [:cod_cliente, :nome_cliente, :fantasia_cliente, :cnpj_cliente, :endereco_cliente, :vendedor_cliente, :tipo_cliente, :tbpreco_cliente, :pais_cliente, :estado_cliente, :cod_municipio_cliente, :municipio_cliente])
    |> validate_required([:cod_cliente, :nome_cliente, :fantasia_cliente, :cnpj_cliente, :endereco_cliente, :vendedor_cliente, :tipo_cliente, :tbpreco_cliente, :pais_cliente, :estado_cliente, :cod_municipio_cliente, :municipio_cliente])
  end
end
