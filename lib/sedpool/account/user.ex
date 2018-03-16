defmodule Sedpool.Account.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Sedpool.Account.User


  schema "users" do
    field :email, :string
    field :password, :string
	        # Virtual Fields #
    field :plain_password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    timestamps()
  end

        @required_fields ~w(email plain_password password_confirmation)
        @optional_fields ~w()

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, @required_fields, @optional_fields)
    |> validate_required([:email])
    |> validate_format(:email, ~r/@/)
    |> validate_length(:plain_password, min: 6)
    |> unique_constraint(:email)
    |> encrypt_password
  end

  defp encrypt_password(changeset) do
    plain_password = get_change(changeset, :plain_password)

    if plain_password do
      encrypted_password = Comeonin.Argon2.hashpwsalt(plain_password)
      put_change(changeset, :password, encrypted_password)
    else  
      changeset
    end
  end


end
