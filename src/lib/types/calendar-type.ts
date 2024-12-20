export type TypeValue = "ALL" | "GELI" | "GPKE" | "KOV" | "MABIS";

type TypeName = {
  value: TypeValue;
  label: string;
};

export const typeNames: TypeName[] = [
  { value: "ALL", label: "alle" },
  { value: "GELI", label: "GeLi Gas" },
  { value: "GPKE", label: "GPKE" },
  { value: "KOV", label: "KoV" },
  { value: "MABIS", label: "MaBiS" },
] as const;
