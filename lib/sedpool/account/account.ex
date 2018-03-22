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

  alias Sedpool.Account.Cliente

  @doc """
  Returns the list of clientes.

  ## Examples

      iex> list_clientes()
      [%Cliente{}, ...]

  """
  def list_clientes do
    Repo.all(Cliente)
  end

  @doc """
  Gets a single cliente.

  Raises `Ecto.NoResultsError` if the Cliente does not exist.

  ## Examples

      iex> get_cliente!(123)
      %Cliente{}

      iex> get_cliente!(456)
      ** (Ecto.NoResultsError)

  """
  def get_cliente!(id), do: Repo.get!(Cliente, id)

  @doc """
  Creates a cliente.

  ## Examples

      iex> create_cliente(%{field: value})
      {:ok, %Cliente{}}

      iex> create_cliente(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_cliente(attrs \\ %{}) do
    %Cliente{}
    |> Cliente.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a cliente.

  ## Examples

      iex> update_cliente(cliente, %{field: new_value})
      {:ok, %Cliente{}}

      iex> update_cliente(cliente, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_cliente(%Cliente{} = cliente, attrs) do
    cliente
    |> Cliente.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Cliente.

  ## Examples

      iex> delete_cliente(cliente)
      {:ok, %Cliente{}}

      iex> delete_cliente(cliente)
      {:error, %Ecto.Changeset{}}

  """
  def delete_cliente(%Cliente{} = cliente) do
    Repo.delete(cliente)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking cliente changes.

  ## Examples

      iex> change_cliente(cliente)
      %Ecto.Changeset{source: %Cliente{}}

  """
  def change_cliente(%Cliente{} = cliente) do
    Cliente.changeset(cliente, %{})
  end

  alias Sedpool.Account.Condpag

  @doc """
  Returns the list of condpagamentos.

  ## Examples

      iex> list_condpagamentos()
      [%Condpag{}, ...]

  """
  def list_condpagamentos do
    Repo.all(Condpag)
  end

  @doc """
  Gets a single condpag.

  Raises `Ecto.NoResultsError` if the Condpag does not exist.

  ## Examples

      iex> get_condpag!(123)
      %Condpag{}

      iex> get_condpag!(456)
      ** (Ecto.NoResultsError)

  """
  def get_condpag!(id), do: Repo.get!(Condpag, id)

  @doc """
  Creates a condpag.

  ## Examples

      iex> create_condpag(%{field: value})
      {:ok, %Condpag{}}

      iex> create_condpag(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_condpag(attrs \\ %{}) do
    %Condpag{}
    |> Condpag.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a condpag.

  ## Examples

      iex> update_condpag(condpag, %{field: new_value})
      {:ok, %Condpag{}}

      iex> update_condpag(condpag, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_condpag(%Condpag{} = condpag, attrs) do
    condpag
    |> Condpag.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Condpag.

  ## Examples

      iex> delete_condpag(condpag)
      {:ok, %Condpag{}}

      iex> delete_condpag(condpag)
      {:error, %Ecto.Changeset{}}

  """
  def delete_condpag(%Condpag{} = condpag) do
    Repo.delete(condpag)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking condpag changes.

  ## Examples

      iex> change_condpag(condpag)
      %Ecto.Changeset{source: %Condpag{}}

  """
  def change_condpag(%Condpag{} = condpag) do
    Condpag.changeset(condpag, %{})
  end

  alias Sedpool.Account.Tbpreco

  @doc """
  Returns the list of tbprecos.

  ## Examples

      iex> list_tbprecos()
      [%Tbpreco{}, ...]

  """
  def list_tbprecos do
    Repo.all(Tbpreco)
  end

  @doc """
  Gets a single tbpreco.

  Raises `Ecto.NoResultsError` if the Tbpreco does not exist.

  ## Examples

      iex> get_tbpreco!(123)
      %Tbpreco{}

      iex> get_tbpreco!(456)
      ** (Ecto.NoResultsError)

  """
  def get_tbpreco!(id), do: Repo.get!(Tbpreco, id)

  @doc """
  Creates a tbpreco.

  ## Examples

      iex> create_tbpreco(%{field: value})
      {:ok, %Tbpreco{}}

      iex> create_tbpreco(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_tbpreco(attrs \\ %{}) do
    %Tbpreco{}
    |> Tbpreco.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a tbpreco.

  ## Examples

      iex> update_tbpreco(tbpreco, %{field: new_value})
      {:ok, %Tbpreco{}}

      iex> update_tbpreco(tbpreco, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_tbpreco(%Tbpreco{} = tbpreco, attrs) do
    tbpreco
    |> Tbpreco.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Tbpreco.

  ## Examples

      iex> delete_tbpreco(tbpreco)
      {:ok, %Tbpreco{}}

      iex> delete_tbpreco(tbpreco)
      {:error, %Ecto.Changeset{}}

  """
  def delete_tbpreco(%Tbpreco{} = tbpreco) do
    Repo.delete(tbpreco)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking tbpreco changes.

  ## Examples

      iex> change_tbpreco(tbpreco)
      %Ecto.Changeset{source: %Tbpreco{}}

  """
  def change_tbpreco(%Tbpreco{} = tbpreco) do
    Tbpreco.changeset(tbpreco, %{})
  end

  alias Sedpool.Account.Itenspedido

  @doc """
  Returns the list of itenspedidos.

  ## Examples

      iex> list_itenspedidos()
      [%Itenspedido{}, ...]

  """
  def list_itenspedidos do
    Repo.all(Itenspedido)
  end

  @doc """
  Gets a single itenspedido.

  Raises `Ecto.NoResultsError` if the Itenspedido does not exist.

  ## Examples

      iex> get_itenspedido!(123)
      %Itenspedido{}

      iex> get_itenspedido!(456)
      ** (Ecto.NoResultsError)

  """
  def get_itenspedido!(id), do: Repo.get!(Itenspedido, id)

  @doc """
  Creates a itenspedido.

  ## Examples

      iex> create_itenspedido(%{field: value})
      {:ok, %Itenspedido{}}

      iex> create_itenspedido(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_itenspedido(attrs \\ %{}) do
    %Itenspedido{}
    |> Itenspedido.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a itenspedido.

  ## Examples

      iex> update_itenspedido(itenspedido, %{field: new_value})
      {:ok, %Itenspedido{}}

      iex> update_itenspedido(itenspedido, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_itenspedido(%Itenspedido{} = itenspedido, attrs) do
    itenspedido
    |> Itenspedido.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Itenspedido.

  ## Examples

      iex> delete_itenspedido(itenspedido)
      {:ok, %Itenspedido{}}

      iex> delete_itenspedido(itenspedido)
      {:error, %Ecto.Changeset{}}

  """
  def delete_itenspedido(%Itenspedido{} = itenspedido) do
    Repo.delete(itenspedido)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking itenspedido changes.

  ## Examples

      iex> change_itenspedido(itenspedido)
      %Ecto.Changeset{source: %Itenspedido{}}

  """
  def change_itenspedido(%Itenspedido{} = itenspedido) do
    Itenspedido.changeset(itenspedido, %{})
  end

  alias Sedpool.Account.Pedido

  @doc """
  Returns the list of pedidos.

  ## Examples

      iex> list_pedidos()
      [%Pedido{}, ...]

  """
  def list_pedidos do
    Repo.all(Pedido)
  end

  @doc """
  Gets a single pedido.

  Raises `Ecto.NoResultsError` if the Pedido does not exist.

  ## Examples

      iex> get_pedido!(123)
      %Pedido{}

      iex> get_pedido!(456)
      ** (Ecto.NoResultsError)

  """
  def get_pedido!(id), do: Repo.get!(Pedido, id)

  @doc """
  Creates a pedido.

  ## Examples

      iex> create_pedido(%{field: value})
      {:ok, %Pedido{}}

      iex> create_pedido(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_pedido(attrs \\ %{}) do
    %Pedido{}
    |> Pedido.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a pedido.

  ## Examples

      iex> update_pedido(pedido, %{field: new_value})
      {:ok, %Pedido{}}

      iex> update_pedido(pedido, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_pedido(%Pedido{} = pedido, attrs) do
    pedido
    |> Pedido.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Pedido.

  ## Examples

      iex> delete_pedido(pedido)
      {:ok, %Pedido{}}

      iex> delete_pedido(pedido)
      {:error, %Ecto.Changeset{}}

  """
  def delete_pedido(%Pedido{} = pedido) do
    Repo.delete(pedido)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking pedido changes.

  ## Examples

      iex> change_pedido(pedido)
      %Ecto.Changeset{source: %Pedido{}}

  """
  def change_pedido(%Pedido{} = pedido) do
    Pedido.changeset(pedido, %{})
  end
end
