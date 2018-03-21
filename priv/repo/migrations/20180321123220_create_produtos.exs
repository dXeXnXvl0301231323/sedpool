defmodule Sedpool.Repo.Migrations.CreateProdutos do
  use Ecto.Migration

  def change do
    create table(:produtos) do
      add :filial_produto, :string
      add :codigo_produto, :string
      add :descricao_produto, :string
      add :tipo_produto, :string
      add :unidade_medida_produto, :string
      add :grupo_produto, :string

      timestamps()
    end

  end
end
