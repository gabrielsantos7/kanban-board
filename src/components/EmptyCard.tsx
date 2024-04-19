interface Props {
  setNodeRef: (node: HTMLElement | null) => void;
  style: {
    transition: string | undefined;
    transform: string | undefined;
  };
  isColumnContainer: boolean;
}

export function EmptyCard({ setNodeRef, style, isColumnContainer }: Props) {
  const columnClassName =
    'bg-column w-350px h-500px max-h-500px rounded-md flex flex-col opacity-40 border-2';
  const taskClassName =
    'bg-main h-[100px] min-h-[100px] rounded-xl p-2.5 flex items-center opacity-30 text-left  cursor-grab relative';
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border-2 border-rose-500 ${
        isColumnContainer ? columnClassName : taskClassName
      }`}
    />
  );
}
