defmodule Auth.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :password_hash, :string
      add :username, :string
      add :nome, :string
      add :cod_vend, :string

      timestamps()
    end

    create unique_index(:users, [:email])

  end
end
