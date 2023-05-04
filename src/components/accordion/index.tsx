import { useState } from "react";

type AccordionProps = {
  avatar_url: string;
  title?: string;
  children: React.ReactNode;
};

export function Accordion  ({ avatar_url, title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md p-[15px]" onClick={() => setIsOpen(!isOpen)} role="button">
      <div className="flex items-center">
        <div>
          <img className="inline-block h-9 w-9 rounded-full" src={avatar_url} alt=""/>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{title}</p>
          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View Github</p>
        </div>
      </div>
      {isOpen && children}
    </div>
  );
};
