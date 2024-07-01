import { Circles } from 'react-loader-spinner'

export default function LoadingButton({
  isLoading,
  text,
  onClick,
}: {
  isLoading: boolean
  text: string
  onClick: Function
}) {
  return (
    <button
      type="button"
      className="inline-flex min-w-40 min-h-8 justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 sm:w-auto ml-auto mt-3 focus:outline-none focus:shadow-outline focus:bg-emerald-600"
      onClick={onClick}
    >
      {isLoading ? (
        <div data-testid="ai-loader">
          <Circles
            height="23"
            width="23"
            color="white"
            ariaLabel="circles-loading"
          />
        </div>
      ) : (
        text
      )}
    </button>
  )
}
