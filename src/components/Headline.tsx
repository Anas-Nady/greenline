export default function Headline({
  text,
  isCentering = false,
}: {
  text: string;
  isCentering?: Boolean;
}) {
  return (
    <>
      <h2
        className={`${
          isCentering && "mx-auto"
        } relative text-3xl cursor-default w-fit sm:text-4xl my-5 text-gray-700 font-semibold`}
      >
        <span>{text}</span>
        <span className="absolute bottom-[50%] translate-y-[50%] -right-3 w-[6px] rounded-lg h-11 bg-green-400"></span>
      </h2>
    </>
  );
}
