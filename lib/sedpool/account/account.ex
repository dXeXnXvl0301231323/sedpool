defmodule Sedpool.Account do
  @moduledoc """
  The Account context.
  """

  import Ecto.Query, warn: false
  alias Sedpool.Repo

  alias Sedpool.Account.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  def get_user_by_email!(email), do: Repo.get_by!(User, email: email)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end


 def get_user_by_email(email), do: Repo.get_by(User, email: email)

  def authenticate(%{"email" => email, "password" => password}) do
    user = get_user_by_email(email)
    case check_password(user, password) do
      true -> {:ok, user}
      _ -> {:error, "Invalid email/password combination."}
    end
  end
  def authenticate(_), do: {:error, "Invalid email/password combination."}

  defp check_password(user, password) do
    case user do
      nil -> Comeonin.Argon2.dummy_checkpw()
      _ -> Comeonin.Argon2.checkpw(password, user.password_hash)
    end
  end









  alias Sedpool.Account.Vendedor

  @doc """
  Returns the list of vendedores.

  ## Examples

      iex> list_vendedores()
      [%Vendedor{}, ...]

  """
  def list_vendedores do
    Repo.all(Vendedor)
  end

  @doc """
  Gets a single vendedor.

  Raises `Ecto.NoResultsError` if the Vendedor does not exist.

  ## Examples

      iex> get_vendedor!(123)
      %Vendedor{}

      iex> get_vendedor!(456)
      ** (Ecto.NoResultsError)

  """
  def get_vendedor!(id), do: Repo.get!(Vendedor, id)

  @doc """
  Creates a vendedor.

  ## Examples

      iex> create_vendedor(%{field: value})
      {:ok, %Vendedor{}}

      iex> create_vendedor(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_vendedor(attrs \\ %{}) do
    %Vendedor{}
    |> Vendedor.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a vendedor.

  ## Examples

      iex> update_vendedor(vendedor, %{field: new_value})
      {:ok, %Vendedor{}}

      iex> update_vendedor(vendedor, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_vendedor(%Vendedor{} = vendedor, attrs) do
    vendedor
    |> Vendedor.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Vendedor.

  ## Examples

      iex> delete_vendedor(vendedor)
      {:ok, %Vendedor{}}

      iex> delete_vendedor(vendedor)
      {:error, %Ecto.Changeset{}}

  """
  def delete_vendedor(%Vendedor{} = vendedor) do
    Repo.delete(vendedor)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking vendedor changes.

  ## Examples

      iex> change_vendedor(vendedor)
      %Ecto.Changeset{source: %Vendedor{}}

  """
  def change_vendedor(%Vendedor{} = vendedor) do
    Vendedor.changeset(vendedor, %{})
  end

  alias Sedpool.Account.Produto

  @doc """
  Returns the list of produtos.

  ## Examples

      iex> list_produtos()
      [%Produto{}, ...]

  """
  def list_produtos do
    Repo.all(Produto)
  end

  @doc """
  Gets a single produto.

  Raises `Ecto.NoResultsError` if the Produto does not exist.

  ## Examples

      iex> get_produto!(123)
      %Produto{}

      iex> get_produto!(456)
      ** (Ecto.NoResultsError)

  """
  def get_produto!(id), do: Repo.get!(Produto, id)

  @doc """
  Creates a produto.

  ## Examples

      iex> create_produto(%{field: value})
      {:ok, %Produto{}}

      iex> create_produto(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_produto(attrs \\ %{}) do
    %Produto{}
    |> Produto.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a produto.

  ## Examples

      iex> update_produto(produto, %{field: new_value})
      {:ok, %Produto{}}

      iex> update_produto(produto, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_produto(%Produto{} = produto, attrs) do
    produto
    |> Produto.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Produto.

  ## Examples

      iex> delete_produto(produto)
      {:ok, %Produto{}}

      iex> delete_produto(produto)
      {:error, %Ecto.Changeset{}}

  """
  def delete_produto(%Produto{} = produto) do
    Repo.delete(produto)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking produto changes.

  ## Examples

      iex> change_produto(produto)
      %Ecto.Changeset{source: %Produto{}}

  """
  def change_produto(%Produto{} = produto) do
    Produto.changeset(produto, %{})
  end
end
