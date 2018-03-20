defmodule Sedpool.Repo.Migrations.CreateVendedores do
  use Ecto.Migration

  def change do
    create table(:vendedores) do
      add :cod_vendedor, :string
      add :nome_vendedor, :string

      timestamps()
    end

  end
end
