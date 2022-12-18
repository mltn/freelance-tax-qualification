export default function ResultsButton({
  isResultsBtnDisabled,
  showResultsModal,
}) {
  return (
    <div className="m-3 flex mx-auto">
      <button
        className={
          (isResultsBtnDisabled ? "opacity-50 cursor-not-allowed" : "") +
          " mx-4 mb-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
        }
        onClick={() => {
          if (!isResultsBtnDisabled) {
            showResultsModal();
          }
        }}
      >
        Pogledajte rezultat
      </button>
    </div>
  );
}
