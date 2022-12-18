import ExplanationList from "./ExplanationList";
import { PassStatus } from "../interfaces";
import { passedEmoji, failedEmoji, unknownEmoji } from "./StatusEmoji";

function passStatusMessage(passStatus: PassStatus) {
  let passMessage = (
    <strong>da nije moguće odrediti samostalnost/nesamostalnost</strong>
  );
  switch (passStatus) {
    case PassStatus.Passed:
      passMessage = (
        <span>
          na <strong>samostalnost {passedEmoji}</strong>
        </span>
      );
      break;
    case PassStatus.Failed:
      passMessage = (
        <span>
          na <strong>nesamostalnost {failedEmoji}</strong>
        </span>
      );
      break;
    default:
      break;
  }
  return <span>Rezultati upitnika ukazuju {passMessage}</span>;
}

export default function ResultsModal({ explanations, passStatus, hideModal }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="overflow-auto inset-0 w-full h-full flex justify-center items-center">
          <div className="bg-white rounded-sm shadow-xl p-4 max-w-lg ">
            <ExplanationList
              explanations={explanations}
              passStatusEmoji={
                passStatus === PassStatus.Passed ? passedEmoji : failedEmoji
              }
            />
            <div className="flex flex-row justify-end"><button
              className={"bg-blue-500 hover:bg-blue-700 text-white text-right "
                + "font-bold py-1 px-2 ml-4"}
              onClick={hideModal}
            >
              Zatvori
            </button></div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
