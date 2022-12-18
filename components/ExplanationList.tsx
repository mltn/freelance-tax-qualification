import SingleExplanation from "./SingleExplanation";

type Props = {
  explanations: string[];
  passStatusEmoji: string;
};

export default function ExplanationList({ explanations, passStatusEmoji }) {
  // max height is 90% of viewport height with scrollable content
  return (
    <div className="overflow-y-auto max-h-[80vh]">
      {explanations.map((explanation, index) => (
        <SingleExplanation
          explanation={explanation}
          passStatusEmoji={passStatusEmoji}
          key={index}
        />
      ))}
    </div>
  );
}
