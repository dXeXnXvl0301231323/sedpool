defmodule Sedpool.Repo.Migrations.CreatePedidos do
  use Ecto.Migration

  def change do
    create table(:pedidos) do
      add :filial_pedidos, :string
      add :num_pedidos, :string
      add :tipo_pedidos, :string
      add :cliente_pedidos, :string
      add :lojacli_pedidos, :string
      add :tipocli_pedidos, :string
      add :condpag_pedidos, :string
      add :tabela_pedidos, :string
      add :vend1_pedidos, :string
      add :mennota_pedidos, :string
      add :emissao_pedidos, :string
      add :nota_pedidos, :string

      timestamps()
    end

  end
end
