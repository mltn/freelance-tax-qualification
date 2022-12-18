import React from "react";

type Props = {
  explanation: string;
  passStatusEmoji: string;
};

export default function SingleExplanation({ explanation, passStatusEmoji }) {
  return (
    <div className="border p-2 rounded-md border-gray-100 mt-2">
      <p className="mb-2 text-sm">
        {passStatusEmoji}
        &nbsp;
        {explanation}
      </p>
    </div>
  );
}
