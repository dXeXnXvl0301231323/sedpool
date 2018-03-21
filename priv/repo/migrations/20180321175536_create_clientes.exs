defmodule Sedpool.Repo.Migrations.CreateClientes do
  use Ecto.Migration

  def change do
    create table(:clientes) do
      add :cod_cliente, :string
      add :nome_cliente, :string
      add :fantasia_cliente, :string
      add :cnpj_cliente, :string
      add :endereco_cliente, :string
      add :vendedor_cliente, :string
      add :tipo_cliente, :string
      add :tbpreco_cliente, :string
      add :pais_cliente, :string
      add :estado_cliente, :string
      add :cod_municipio_cliente, :string
      add :municipio_cliente, :string

      timestamps()
    end

  end
end
