defmodule Argon2.Base do
  @moduledoc """
  Lower-level api for Argon2.

  These functions can be useful if you want more control over some
  of the options. In most cases, you will not need to call these
  functions directly.
  """

  @compile {:autoload, false}
  @on_load {:init, 0}

  def init do
    path = :filename.join(:code.priv_dir(:argon2_elixir), 'argon2_nif')
    :erlang.load_nif(path, 0)
  end

  @doc """
  Hash a password using Argon2.
  """
  def hash_nif(t_cost, m_cost, parallelism, password, salt, raw, hashlen, hashspace, encodedlen, argon2_type, argon2_version)
  def hash_nif(_, _, _, _, _, _, _, _, _, _, _), do: exit(:nif_library_not_loaded)

  @doc """
  Verify a password using Argon2.
  """
  def verify_nif(stored_hash, password, argon2_type)
  def verify_nif(_, _, _), do: exit(:nif_library_not_loaded)

  @doc """
  Translate the error code to an error message.
  """
  def error_nif(error_code)
  def error_nif(_), do: exit(:nif_library_not_loaded)

  @doc """
  Calculate the length of the encoded hash.
  """
  def encodedlen_nif(t_cost, m_cost, parallelism, saltlen, hashlen, argon2_type)
  def encodedlen_nif(_, _, _, _, _, _), do: exit(:nif_library_not_loaded)

  @doc """
  Hash a password using Argon2.

  ## Configurable parameters

  The following three parameters can be set in the config file:

    * t_cost - time cost
      * the amount of computation, given in number of iterations
      * 6 is the default
    * m_cost - memory usage
      * 16 is the default - this will produce a memory usage of 2 ^ 16 KiB (64 MiB)
    * parallelism - number of parallel threads
      * 1 is the default

  If you are hashing passwords in your tests, it can be useful to add
  the following to the `config/test.exs` file:

      config :argon2_elixir,
        t_cost: 2,
        m_cost: 12

  NB. do not use these values in production.

  ## Options

  There are six options (t_cost, m_cost and parallelism can be used
  to override the values set in the config):

    * t_cost - time cost
    * m_cost - memory usage
    * parallelism - number of parallel threads
    * format - output format
      * this value can be
        * :encoded - encoded with Argon2 crypt format
        * :raw_hash - raw hash output in hexadecimal format
        * :report - raw hash and encoded hash, together with the options used
      * :encoded is the default
    * hashlen - length of the hash (in bytes)
      * the default is 32
    * argon2_type - Argon2 type
      * this value should be 0 (Argon2d), 1 (Argon2i) or 2 (Argon2id)
      * the default is 1 (Argon2i)

  """
  def hash_password(password, salt, opts \\ [])
  def hash_password(password, salt, opts) when is_binary(password) and is_binary(salt) do
    {t, m, p, raw_hash, encoded_hash, hashlen, argon2_type} = options = get_opts(opts)
    encodedlen = if encoded_hash,
      do: encodedlen_nif(t, m, p, byte_size(salt), hashlen, argon2_type), else: 0
    hash_nif(t, m, p, password, salt, raw_hash, hashlen, hashlen * 2 + 1, encodedlen, argon2_type, 0)
    |> handle_result(options)
  end
  def hash_password(_, _, _) do
    raise ArgumentError, "Wrong type - password and salt should be strings"
  end

  defp get_opts(opts) do
    {raw_hash, encoded_hash} = case opts[:format] do
                                 :raw_hash -> {1, false}
                                 :report -> {1, true}
                                 _ -> {0, true}
                               end
    {Keyword.get(opts, :t_cost, Application.get_env(:argon2_elixir, :t_cost, 6)),
     Keyword.get(opts, :m_cost, Application.get_env(:argon2_elixir, :m_cost, 16)),
     Keyword.get(opts, :parallelism, Application.get_env(:argon2_elixir, :parallelism, 1)),
     raw_hash,
     encoded_hash,
     Keyword.get(opts, :hashlen, 32),
     Keyword.get(opts, :argon2_type, 1)}
  end

  defp handle_result(result, _) when is_integer(result) do
    msg = error_nif(result) |> :binary.list_to_bin
    raise ArgumentError, msg
  end
  defp handle_result({[], encoded}, _), do: :binary.list_to_bin(encoded)
  defp handle_result({raw, []}, _), do: :binary.list_to_bin(raw)
  defp handle_result({raw, encoded}, options) do
    {:binary.list_to_bin(raw), :binary.list_to_bin(encoded), options}
  end
end
