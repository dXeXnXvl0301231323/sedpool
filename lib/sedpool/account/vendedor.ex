defmodule Sedpool.Account.Vendedor do
  use Ecto.Schema
  import Ecto.Changeset


  schema "vendedores" do
    field :cod_vendedor, :string
    field :nome_vendedor, :string
#	 belongs_to :users, Sedpool.Account.User
	has_many :users, Sedpool.Account.User
    timestamps()
  end

  @doc false
  def changeset(vendedor, attrs) do
    vendedor
    |> cast(attrs, [:cod_vendedor, :nome_vendedor])
    |> validate_required([:cod_vendedor, :nome_vendedor])
  end
end
