
type ErrorFallbackArgs = {
  error: Error,
  resetErrorBoundary: () => void
}

function ErrorFallback( {error, resetErrorBoundary}: ErrorFallbackArgs) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default ErrorFallback