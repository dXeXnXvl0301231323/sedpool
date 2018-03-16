defmodule Sedpool.AuthAccessPipeline do
  use Guardian.Plug.Pipeline, otp_app: :sedpool
	plug Guardian.Plug.Pipeline, module: Sedpool.Guardian, error_handler: App.Web.SessionController


  plug Guardian.Plug.VerifySession
  plug Guardian.Plug.VerifyHeader
  # plug Guardian.Plug.EnsureSedpoolenticated
  plug Guardian.Plug.LoadResource, allow_blank: true
end
