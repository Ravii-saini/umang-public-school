import { PortableText as PT } from "@portabletext/react";

export function PortableText({ value }: { value: any }) {
  if (!value) return null;
  return (
    <PT
      value={value}
      components={{
        block: {
          normal: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>
        },
        marks: {
          strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
          em: ({ children }) => <em className="italic text-slate-700">{children}</em>
        }
      }}
    />
  );
}
