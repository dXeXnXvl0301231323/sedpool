defmodule Sedpool.Repo.Migrations.CreateTbprecos do
  use Ecto.Migration

  def change do
    create table(:tbprecos) do
      add :filial_tbpreco, :string
      add :item_tbpreco, :string
      add :codtabela_tbpreco, :string
      add :codproduto_tbpreco, :string
      add :precovenda_tbpreco, :string
      add :valordesconto_tbpreco, :string

      timestamps()
    end

  end
end
