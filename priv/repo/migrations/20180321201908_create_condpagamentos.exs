defmodule Sedpool.Repo.Migrations.CreateCondpagamentos do
  use Ecto.Migration

  def change do
    create table(:condpagamentos) do
      add :filial_condpagamento, :string
      add :codigo_condpagamento, :string
      add :tipo_condpagamento, :string
      add :descricao_condpagamento, :string

      timestamps()
    end

  end
end
