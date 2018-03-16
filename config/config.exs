
use Mix.Config


config :sedpool,
  ecto_repos: [Sedpool.Repo]


config :sedpool, SedpoolWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "/G2A1JjJkYHpJblF8+VFJGCektoq56qt7zEQBkyXKFErb+B218/cyQSOOtPZwFy6",
  render_errors: [view: SedpoolWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Sedpool.PubSub,
           adapter: Phoenix.PubSub.PG2]

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

  config :sedpool, Sedpool.Guardian,
  allowed_algos: ["HS512"],
  verify_module: Guardian.JWT,
  issuer: "Sedpool",
  ttl: { 30, :days },
  allowed_drift: 2000,
  verify_issuer: true,
  secret_key: "BxHVjx+3nwex2Vjc8xrDukui7rIz+mye8Yrj370INHCRBACwZW1XV7udX/9Xm44O",
  serializer: Sedpool.GuardianSerializer


import_config "#{Mix.env}.exs"
