defmodule Sedpool.Repo.Migrations.CreateItenspedidos do
  use Ecto.Migration

  def change do
    create table(:itenspedidos) do
      add :filial_itenspedidos, :string
      add :item_itenspedidos, :string
      add :produto_itenspedidos, :string
      add :um_itenspedidos, :string
      add :qtdven_itenspedidos, :string
      add :prcven_itenspedidos, :string
      add :valor_itenspedidos, :string
      add :cli_itenspedidos, :string
      add :loja_itenspedidos, :string
      add :descont_itenspedidos, :string
      add :num_itenspedidos, :string
      add :descri_itenspedidos, :string
      add :prunit_itenspedidos, :string

      timestamps()
    end

  end
end
