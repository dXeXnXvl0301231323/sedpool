defmodule Sedpool.SedpoolAccessPipeline do
  use Guardian.Plug.Pipeline, otp_app: :sedpool, error_handler: Sedpool.SedpoolErrorHandler, module: Sedpool.Guardian
#	plug Guardian.Plug.Pipeline, module: Sedpool.Guardian, error_handler: App.Web.SessionController

##  plug Guardian.Plug.VerifySession
##  plug Guardian.Plug.VerifyHeader
#   plug Guardian.Plug.EnsureAuthenticated
##  plug Guardian.Plug.LoadResource, allow_blank: true

  plug Guardian.Plug.VerifySession, claims: %{"typ" => "access"}
  plug Guardian.Plug.VerifyHeader, claims: %{"typ" => "access"}
  plug Guardian.Plug.LoadResource, allow_blank: true
end
